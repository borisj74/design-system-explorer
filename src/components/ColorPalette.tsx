import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Download, RefreshCw, CheckCircle2, AlertTriangle, Sparkles, Save, Palette as PaletteIcon, Copy } from 'lucide-react'
import { Slider } from '@/components/ui/slider'
import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import ColorAdjustmentModule from './ColorAdjustmentModule'

interface ColorPaletteProps {
  colors: Record<string, string>
  setColors: (colors: Record<string, string>) => void
  activePalette: {id: string, name: string} | null
  setActivePalette: (palette: {id: string, name: string} | null) => void
}

interface SavedPalette {
  id: string
  name: string
  timestamp: number
  colors: Record<string, string>
}

// Utility function to calculate contrast ratio
function getContrastRatio(color1: string, color2: string): number {
  const getLuminance = (hex: string): number => {
    const rgb = parseInt(hex.slice(1), 16)
    const r = ((rgb >> 16) & 0xff) / 255
    const g = ((rgb >> 8) & 0xff) / 255
    const b = ((rgb >> 0) & 0xff) / 255

    const [rs, gs, bs] = [r, g, b].map(c => 
      c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
    )

    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs
  }

  const l1 = getLuminance(color1)
  const l2 = getLuminance(color2)
  const lighter = Math.max(l1, l2)
  const darker = Math.min(l1, l2)

  return (lighter + 0.05) / (darker + 0.05)
}

// Generate complementary color
function generateComplementary(hex: string): string {
  const rgb = parseInt(hex.slice(1), 16)
  const r = (rgb >> 16) & 0xff
  const g = (rgb >> 8) & 0xff
  const b = (rgb >> 0) & 0xff

  const compR = 255 - r
  const compG = 255 - g
  const compB = 255 - b

  return '#' + ((1 << 24) + (compR << 16) + (compG << 8) + compB).toString(16).slice(1).toUpperCase()
}

// Convert hex to HSL
function hexToHSL(hex: string): { h: number; s: number; l: number } {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  if (!result) return { h: 0, s: 0, l: 0 }

  let r = parseInt(result[1], 16) / 255
  let g = parseInt(result[2], 16) / 255
  let b = parseInt(result[3], 16) / 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h = 0
  let s = 0
  let l = (max + min) / 2

  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6
        break
      case g:
        h = ((b - r) / d + 2) / 6
        break
      case b:
        h = ((r - g) / d + 4) / 6
        break
    }
  }

  return { h: h * 360, s: s * 100, l: l * 100 }
}

// Convert HSL to hex
function hslToHex(h: number, s: number, l: number): string {
  s /= 100
  l /= 100
  const a = s * Math.min(l, 1 - l)
  const f = (n: number) => {
    const k = (n + h / 30) % 12
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, '0')
  }
  return `#${f(0)}${f(8)}${f(4)}`.toUpperCase()
}

// Adjust color to achieve target contrast ratio
function adjustColorForContrast(
  currentColor: string,
  backgroundColor: string,
  targetRatio: number
): string {
  const hsl = hexToHSL(currentColor)
  
  // Determine if we need to go lighter or darker
  const bgLuminance = getLuminance(backgroundColor)
  const shouldBeLighter = bgLuminance < 0.5
  
  // Binary search for the right lightness value
  let minL = 0
  let maxL = 100
  let bestL = hsl.l
  let bestDiff = Infinity
  let iterations = 0
  const maxIterations = 100

  while (iterations < maxIterations) {
    const testL = (minL + maxL) / 2
    const testColor = hslToHex(hsl.h, hsl.s, testL)
    const ratio = getContrastRatio(testColor, backgroundColor)
    const diff = Math.abs(ratio - targetRatio)

    if (diff < bestDiff) {
      bestDiff = diff
      bestL = testL
    }

    // If we're close enough, break
    if (diff < 0.01) break

    if (ratio < targetRatio) {
      // Need more contrast - go to extremes
      if (shouldBeLighter) {
        minL = testL
      } else {
        maxL = testL
      }
    } else {
      // Too much contrast - go towards middle
      if (shouldBeLighter) {
        maxL = testL
      } else {
        minL = testL
      }
    }

    iterations++
  }

  return hslToHex(hsl.h, hsl.s, bestL)
}

// Helper function to get luminance
function getLuminance(hex: string): number {
  const rgb = parseInt(hex.slice(1), 16)
  const r = ((rgb >> 16) & 0xff) / 255
  const g = ((rgb >> 8) & 0xff) / 255
  const b = ((rgb >> 0) & 0xff) / 255

  const [rs, gs, bs] = [r, g, b].map(c => 
    c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
  )

  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs
}

export default function ColorPalette({ 
  colors, 
  setColors, 
  activePalette, 
  setActivePalette
}: ColorPaletteProps) {
  const [hue, setHue] = useState(220)
  const [saturation, setSaturation] = useState(70)
  const [lightness, setLightness] = useState(50)
  
  // Track which color was just copied (for visual feedback)
  const [copiedColor, setCopiedColor] = useState<string | null>(null)
  
  // Track target contrast ratios for smooth slider interaction
  const [contrastTargets, setContrastTargets] = useState({
    primary: 7,
    secondary: 7,
    accent: 7,
  })

  // Helper to safely get color values with fallbacks
  const getColorSafe = (key: string, fallbackIndex: number = 0) => {
    const colorValues = Object.values(colors)
    return colors[key] || colorValues[fallbackIndex] || '#000000'
  }

  // Initialize contrast targets based on current colors
  useEffect(() => {
    const bg = getColorSafe('background', 3)
    setContrastTargets({
      primary: getContrastRatio(getColorSafe('primary', 0), bg),
      secondary: getContrastRatio(getColorSafe('secondary', 1), bg),
      accent: getContrastRatio(getColorSafe('accent', 2), bg),
    })
  }, []) // Only run on mount

  const handleColorChange = (key: string, value: string) => {
    setColors({ ...colors, [key]: value })
  }

  const handleAddColor = () => {
    // Generate a unique key
    const existingKeys = Object.keys(colors)
    let newKey = 'color'
    let counter = 1
    while (existingKeys.includes(newKey)) {
      newKey = `color${counter}`
      counter++
    }
    
    // Add new color with a random color
    const randomColor = `#${Math.floor(Math.random()*16777215).toString(16).padStart(6, '0').toUpperCase()}`
    setColors({ ...colors, [newKey]: randomColor })
  }

  const handleRemoveColor = (key: string) => {
    // Prevent removing the last color
    if (Object.keys(colors).length <= 1) {
      return
    }
    
    const newColors = { ...colors }
    delete newColors[key]
    setColors(newColors)
  }

  const handleRenameColor = (oldKey: string, newKey: string) => {
    // Don't rename if key hasn't changed or new key already exists
    if (oldKey === newKey || Object.keys(colors).includes(newKey)) {
      return false
    }
    
    const newColors: Record<string, string> = {}
    Object.keys(colors).forEach(key => {
      if (key === oldKey) {
        newColors[newKey] = colors[key]
      } else {
        newColors[key] = colors[key]
      }
    })
    setColors(newColors)
    return true
  }

  const generatePalette = () => {
    // Generate harmonious colors based on HSL
    const primary = `hsl(${hue}, ${saturation}%, ${lightness}%)`
    const secondary = `hsl(${(hue + 30) % 360}, ${saturation - 10}%, ${lightness + 20}%)`
    const accent = `hsl(${(hue + 180) % 360}, ${saturation + 10}%, ${lightness - 10}%)`
    
    // Convert HSL to hex for storage
    const hslToHex = (h: number, s: number, l: number) => {
      l /= 100
      const a = s * Math.min(l, 1 - l) / 100
      const f = (n: number) => {
        const k = (n + h / 30) % 12
        const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)
        return Math.round(255 * color).toString(16).padStart(2, '0')
      }
      return `#${f(0)}${f(8)}${f(4)}`.toUpperCase()
    }

    setColors({
      primary: hslToHex(hue, saturation, lightness),
      secondary: hslToHex((hue + 30) % 360, saturation - 10, lightness + 20),
      accent: hslToHex((hue + 180) % 360, saturation + 10, lightness - 10),
      background: '#FFFFFF',
      foreground: '#0F172A',
    })
  }

  const generateRandomPalette = () => {
    // Generate random but harmonious colors for existing color keys
    const randomHue = Math.floor(Math.random() * 360)
    const randomSaturation = Math.floor(Math.random() * 40) + 50 // 50-90%
    const randomLightness = Math.floor(Math.random() * 30) + 35 // 35-65%
    
    // Convert HSL to hex
    const hslToHex = (h: number, s: number, l: number) => {
      l /= 100
      const a = s * Math.min(l, 1 - l) / 100
      const f = (n: number) => {
        const k = (n + h / 30) % 12
        const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)
        return Math.round(255 * color).toString(16).padStart(2, '0')
      }
      return `#${f(0)}${f(8)}${f(4)}`.toUpperCase()
    }

    // Update sliders to match random values
    setHue(randomHue)
    setSaturation(randomSaturation)
    setLightness(randomLightness)

    // Generate new colors for all existing keys
    const newColors: Record<string, string> = {}
    const colorKeys = Object.keys(colors)
    
    colorKeys.forEach((key, index) => {
      // Generate variations for each color
      const hueOffset = (index * 60) % 360 // Spread colors across spectrum
      newColors[key] = hslToHex(
        (randomHue + hueOffset) % 360, 
        randomSaturation - (index % 3) * 10, 
        randomLightness + (index % 2) * 10
      )
    })

    setColors(newColors)
  }

  const handleCopyColor = (colorKey: string, colorValue: string) => {
    navigator.clipboard.writeText(colorValue)
    setCopiedColor(colorKey)
    
    // Clear the copied state after 2 seconds
    setTimeout(() => {
      setCopiedColor(null)
    }, 2000)
  }

  const exportCSS = () => {
    const primary = getColorSafe('primary', 0)
    const secondary = getColorSafe('secondary', 1)
    const accent = getColorSafe('accent', 2)
    const background = getColorSafe('background', 3)
    const foreground = getColorSafe('foreground', 4)
    
    const css = `/* Design System Colors */
:root {
  --color-primary: ${primary};
  --color-secondary: ${secondary};
  --color-accent: ${accent};
  --color-background: ${background};
  --color-foreground: ${foreground};
}

/* HSL variants for opacity control */
:root {
  --primary-h: ${parseInt(primary.slice(1, 3), 16)};
  --primary-s: ${parseInt(primary.slice(3, 5), 16)}%;
  --primary-l: ${parseInt(primary.slice(5, 7), 16)}%;
}`

    navigator.clipboard.writeText(css)
  }

  const exportFigma = () => {
    const figma = `Primary: ${getColorSafe('primary', 0)}
Secondary: ${getColorSafe('secondary', 1)}
Accent: ${getColorSafe('accent', 2)}
Background: ${getColorSafe('background', 3)}
Foreground: ${getColorSafe('foreground', 4)}`

    navigator.clipboard.writeText(figma)
  }

  const handleContrastChange = (colorKey: string, targetRatio: number) => {
    // Update the target for this color
    setContrastTargets({
      ...contrastTargets,
      [colorKey]: targetRatio,
    })
    
    // Adjust the actual color
    const bg = getColorSafe('background', 3)
    const currentColor = colors[colorKey as keyof typeof colors] || Object.values(colors)[0] || '#000000'
    const adjustedColor = adjustColorForContrast(
      currentColor,
      bg,
      targetRatio
    )
    setColors({ ...colors, [colorKey]: adjustedColor })
  }

  // Calculate contrast ratios with safe getters
  const bg = getColorSafe('background', 3)
  const primaryContrast = getContrastRatio(getColorSafe('primary', 0), bg)
  const secondaryContrast = getContrastRatio(getColorSafe('secondary', 1), bg)
  const accentContrast = getContrastRatio(getColorSafe('accent', 2), bg)

  const getContrastBadge = (ratio: number) => {
    if (ratio >= 7) return { label: 'AAA', variant: 'default' as const, icon: CheckCircle2 }
    if (ratio >= 4.5) return { label: 'AA', variant: 'secondary' as const, icon: CheckCircle2 }
    return { label: 'Fail', variant: 'destructive' as const, icon: AlertTriangle }
  }

  // Generate Tailwind-style color scale (50-950)
  const generateTailwindScale = (baseColor: string) => {
    const hexToHSL = (hex: string) => {
      const r = parseInt(hex.slice(1, 3), 16) / 255
      const g = parseInt(hex.slice(3, 5), 16) / 255
      const b = parseInt(hex.slice(5, 7), 16) / 255

      const max = Math.max(r, g, b)
      const min = Math.min(r, g, b)
      let h = 0, s = 0, l = (max + min) / 2

      if (max !== min) {
        const d = max - min
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min)

        switch (max) {
          case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break
          case g: h = ((b - r) / d + 2) / 6; break
          case b: h = ((r - g) / d + 4) / 6; break
        }
      }

      return { h: h * 360, s: s * 100, l: l * 100 }
    }

    const hslToHex = (h: number, s: number, l: number) => {
      l /= 100
      const a = s * Math.min(l, 1 - l) / 100
      const f = (n: number) => {
        const k = (n + h / 30) % 12
        const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)
        return Math.round(255 * color).toString(16).padStart(2, '0')
      }
      return `#${f(0)}${f(8)}${f(4)}`.toUpperCase()
    }

    const { h, s } = hexToHSL(baseColor)

    // Tailwind scale lightness values (approximated)
    const scale = {
      50: hslToHex(h, s, 97),
      100: hslToHex(h, s, 94),
      200: hslToHex(h, s, 86),
      300: hslToHex(h, s, 77),
      400: hslToHex(h, s, 66),
      500: baseColor, // Base color at 500
      600: hslToHex(h, s, 45),
      700: hslToHex(h, s, 36),
      800: hslToHex(h, s, 28),
      900: hslToHex(h, s, 19),
      950: hslToHex(h, s, 11),
    }

    return scale
  }

  // Save Color Palette
  const [showSavePaletteDialog, setShowSavePaletteDialog] = useState(false)
  const [paletteName, setPaletteName] = useState('')

  const savePalette = () => {
    if (!paletteName.trim()) return

    try {
      // Check if we're updating an existing palette
      const isUpdate = activePalette !== null
      
      const paletteData: SavedPalette = {
        id: isUpdate ? activePalette.id : Date.now().toString(),
        name: paletteName,
        timestamp: Date.now(),
        colors: { ...colors }, // Copy all current colors
      }

      console.log(isUpdate ? 'Updating palette:' : 'Saving palette:', paletteData)

      // Get existing palettes
      const saved = localStorage.getItem('saved-color-palettes')
      const palettes = saved ? JSON.parse(saved) : []
      
      let updatedPalettes
      if (isUpdate) {
        // Update existing palette
        updatedPalettes = palettes.map((p: SavedPalette) => 
          p.id === activePalette.id ? paletteData : p
        )
      } else {
        // Add new palette
        updatedPalettes = [paletteData, ...palettes]
      }
      
      localStorage.setItem('saved-color-palettes', JSON.stringify(updatedPalettes))
      
      console.log('Palettes after save:', updatedPalettes.length)
      
      // Set this as the active palette
      setActivePalette({ id: paletteData.id, name: paletteData.name })
      
      // Also trigger a custom event so VersionHistory can update
      window.dispatchEvent(new Event('paletteSaved'))
      
      setPaletteName('')
      setShowSavePaletteDialog(false)
      alert(`✓ Color palette "${paletteData.name}" ${isUpdate ? 'updated' : 'saved'} successfully!`)
    } catch (error) {
      console.error('Error saving palette:', error)
      alert('Failed to save palette. Please try again.')
    }
  }

  return (
    <>
      {/* Action Buttons - Above Modules, Aligned Right */}
      <div className="flex gap-3 mb-6 justify-end">
        <Button 
          variant="outline" 
          className="gap-2"
          onClick={generateRandomPalette}
        >
          <RefreshCw className="h-4 w-4" />
          Generate Random
        </Button>
        <Dialog 
          open={showSavePaletteDialog} 
          onOpenChange={(open) => {
            setShowSavePaletteDialog(open)
            // Pre-fill name when opening dialog
            if (open && activePalette) {
              setPaletteName(activePalette.name)
            } else if (!open) {
              setPaletteName('')
            }
          }}
        >
          <DialogTrigger asChild>
            <Button variant="outline" className="gap-2">
              <Save className="h-4 w-4" />
              {activePalette ? 'Update Palette' : 'Save Palette'}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {activePalette ? 'Update Color Palette' : 'Save Color Palette'}
              </DialogTitle>
              <DialogDescription>
                {activePalette 
                  ? `Update "${activePalette.name}" with the current colors`
                  : 'Give your color palette a memorable name to save it for later'
                }
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label>Palette Name</Label>
                <Input
                  placeholder="e.g., Ocean Blue, Sunset Warm, Brand Primary"
                  value={paletteName}
                  onChange={(e) => setPaletteName(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && savePalette()}
                />
              </div>
              
              {/* Preview of colors being saved */}
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <p className="text-xs font-semibold text-slate-700 mb-2">Colors in this palette:</p>
                <div className="flex gap-2">
                  {Object.entries(colors).map(([key, value]) => (
                    <div key={key} className="flex-1 space-y-1">
                      <div
                        className="w-full h-12 rounded-lg border border-slate-200"
                        style={{ backgroundColor: value }}
                      />
                      <p className="text-xs text-slate-600 capitalize truncate">{key}</p>
                    </div>
                  ))}
                </div>
              </div>

              <Button onClick={savePalette} className="w-full" disabled={!paletteName.trim()}>
                <Save className="h-4 w-4 mr-2" />
                {activePalette ? 'Update Palette' : 'Save Palette'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Color Generator */}
      <Card className="border-slate-200 shadow-lg shadow-slate-200/50">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <CardTitle className="text-2xl">Palette Generator</CardTitle>
                {activePalette && (
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="gap-1.5">
                      <PaletteIcon className="h-3 w-3" />
                      {activePalette.name}
                    </Badge>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setActivePalette(null)}
                      className="h-6 w-6 p-0 hover:bg-red-50 hover:text-red-600"
                      title="Clear palette (create new instead of update)"
                    >
                      <span className="text-lg">×</span>
                    </Button>
                  </div>
                )}
              </div>
              <CardDescription>
                {activePalette 
                  ? `Editing "${activePalette.name}" palette - Click × to create a new palette instead`
                  : 'Generate harmonious color palettes or define custom values'
                }
              </CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <ColorAdjustmentModule 
            colors={colors} 
            onColorChange={handleColorChange}
            onAddColor={handleAddColor}
            onRemoveColor={handleRemoveColor}
            onRenameColor={handleRenameColor}
          />
        </CardContent>
      </Card>

      {/* Tailwind Color Scales - Right Side */}
      <Card className="lg:col-span-2 border-slate-200 shadow-lg shadow-slate-200/50">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-2">
            <Sparkles className="h-6 w-6" />
            Tailwind Color Scales
          </CardTitle>
          <CardDescription>
            Complete Tailwind-compatible color scales (50-950) for all your system colors.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Dynamic Color Scales */}
          {Object.entries(colors).map(([colorName, colorValue]) => (
            <div key={colorName} className="space-y-3">
              <div className="flex items-center gap-2">
                <div 
                  className="w-4 h-4 rounded-full" 
                  style={{ backgroundColor: colorValue }}
                />
                <h4 className="font-semibold text-lg capitalize">{colorName}</h4>
              </div>
              <div className="grid grid-cols-11 gap-2">
                {Object.entries(generateTailwindScale(colorValue)).map(([shade, color]) => {
                  const colorKey = `${colorName}-${shade}`
                  const isCopied = copiedColor === colorKey
                  
                  return (
                    <div key={shade} className="space-y-2">
                      <div
                        className="relative w-full aspect-square rounded-lg cursor-pointer hover:scale-105 transition-transform hover:ring-2 hover:ring-slate-400"
                        style={{ backgroundColor: color as string }}
                        onClick={() => handleCopyColor(colorKey, color as string)}
                        title={`Click to copy ${color}`}
                      >
                        {isCopied && (
                          <div className="absolute inset-0 flex items-center justify-center bg-black/20 rounded-lg animate-in fade-in duration-200">
                            <Copy className="h-6 w-6 text-white drop-shadow-lg" />
                          </div>
                        )}
                      </div>
                      <p className="text-xs text-center text-slate-600">{shade}</p>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
    </>
  )
}
