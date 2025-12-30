import { useState, useEffect } from 'react'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { RefreshCw, Save, Plus, X } from 'lucide-react'

interface ColorAdjustmentModuleProps {
  colors: Record<string, string>
  onColorChange: (key: string, value: string) => void
  onAddColor: () => void
  onRemoveColor: (key: string) => void
  onRenameColor: (oldKey: string, newKey: string) => boolean
}

export default function ColorAdjustmentModule({ 
  colors, 
  onColorChange,
  onAddColor,
  onRemoveColor,
  onRenameColor
}: ColorAdjustmentModuleProps) {
  const [selectedColor, setSelectedColor] = useState<string | null>(null)
  const [lightness, setLightness] = useState(50)
  const [chroma, setChroma] = useState(50)
  const [hue, setHue] = useState(0)
  const [alpha, setAlpha] = useState(1)
  const [editingName, setEditingName] = useState<string | null>(null)
  const [tempName, setTempName] = useState('')
  const [colorFormat, setColorFormat] = useState<'hex' | 'oklch'>('hex')

  // Convert hex to OKLCH (simplified approximation using HSL as proxy)
  const hexToOKLCH = (hex: string): string => {
    const { h, s, l } = hexToHSL(hex)
    // Approximate OKLCH values (L: 0-1, C: 0-0.4, H: 0-360)
    const oklchL = (l / 100).toFixed(3)
    const oklchC = (s / 250).toFixed(3) // Approximate chroma
    const oklchH = h.toFixed(0)
    return `oklch(${oklchL} ${oklchC} ${oklchH})`
  }

  // Convert OKLCH to hex (simplified)
  const oklchToHex = (oklch: string): string => {
    // Parse oklch(L C H) format
    const match = oklch.match(/oklch\(([\d.]+)\s+([\d.]+)\s+([\d.]+)\)/)
    if (!match) return '#000000'
    
    const l = parseFloat(match[1]) * 100 // Convert to 0-100
    const c = parseFloat(match[2]) * 250 // Convert to approximate saturation
    const h = parseFloat(match[3])
    
    return hslToHex(h, c, l)
  }

  // Convert hex to HSL (we'll use HSL as a proxy for LCH since they're similar)
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

  // Update sliders when a color is selected
  useEffect(() => {
    if (selectedColor && colors[selectedColor]) {
      const colorValue = colors[selectedColor]
      const { h, s, l } = hexToHSL(colorValue)
      setHue(Math.round(h))
      setChroma(Math.round(s))
      setLightness(Math.round(l))
      setAlpha(1)
    }
  }, [selectedColor, colors])

  // Update color when sliders change
  const handleSliderChange = (newLightness?: number, newChroma?: number, newHue?: number) => {
    if (!selectedColor) return

    const l = newLightness !== undefined ? newLightness : lightness
    const c = newChroma !== undefined ? newChroma : chroma
    const h = newHue !== undefined ? newHue : hue

    const newColor = hslToHex(h, c, l)
    onColorChange(selectedColor, newColor)
  }

  const handleNameEdit = (key: string) => {
    setEditingName(key)
    setTempName(key)
  }

  const handleNameSave = (oldKey: string) => {
    if (tempName && tempName !== oldKey) {
      const success = onRenameColor(oldKey, tempName)
      if (success && selectedColor === oldKey) {
        setSelectedColor(tempName)
      }
    }
    setEditingName(null)
  }

  const colorEntries = Object.entries(colors)

  return (
    <>
      {/* Format Selector */}
      <div className="mb-4">
        <Label className="text-sm font-medium mb-2 block">Color Format</Label>
        <Select value={colorFormat} onValueChange={(value: 'hex' | 'oklch') => setColorFormat(value)}>
          <SelectTrigger className="w-full rounded-xl border-2 border-slate-200 hover:border-slate-300">
            <SelectValue placeholder="Select format" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="hex">HEX</SelectItem>
            <SelectItem value="oklch">OKLCH</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Color List */}
      <div className="space-y-3">
        {colorEntries.map(([key, value]) => (
          <div
            key={key}
            className="relative w-full flex items-center gap-4 p-4 rounded-xl border-2 border-slate-200 hover:border-slate-300 transition-all group"
          >
            {/* Delete Button */}
            <button
              onClick={(e) => {
                e.stopPropagation()
                if (colorEntries.length > 1) {
                  onRemoveColor(key)
                  if (selectedColor === key) {
                    setSelectedColor(null)
                  }
                }
              }}
              className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-red-500 text-white hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
              title="Remove color"
              disabled={colorEntries.length <= 1}
            >
              <X className="h-3 w-3" />
            </button>

            {/* Color Swatch */}
            <div
              className="w-12 h-12 rounded-xl flex-shrink-0 cursor-pointer hover:scale-105 transition-transform border-2 border-slate-200"
              style={{ 
                backgroundColor: value
              }}
              onClick={() => setSelectedColor(key)}
              title="Click to adjust color"
            />
            
            <div className="flex-1 min-w-0">
              {/* Color Name - Editable */}
              {editingName === key ? (
                <Input
                  type="text"
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  onBlur={() => handleNameSave(key)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleNameSave(key)
                    if (e.key === 'Escape') setEditingName(null)
                  }}
                  onClick={(e) => e.stopPropagation()}
                  className="font-medium text-slate-900 mb-1 h-6 px-2"
                  autoFocus
                />
              ) : (
                <p 
                  className="font-medium text-slate-900 mb-1 cursor-text hover:text-blue-600"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleNameEdit(key)
                  }}
                  title="Click to rename"
                >
                  {key}
                </p>
              )}
              
              {/* Color Value Input - HEX or OKLCH */}
              <Input
                type="text"
                value={colorFormat === 'hex' ? value.toUpperCase() : hexToOKLCH(value)}
                onChange={(e) => {
                  e.stopPropagation()
                  const inputValue = e.target.value
                  
                  if (colorFormat === 'hex') {
                    // Validate and update hex
                    if (/^#[0-9A-Fa-f]{0,6}$/.test(inputValue)) {
                      onColorChange(key, inputValue)
                    }
                  } else {
                    // Validate and update OKLCH
                    if (/^oklch\(/.test(inputValue) || inputValue === '') {
                      try {
                        const hexValue = oklchToHex(inputValue)
                        if (hexValue) {
                          onColorChange(key, hexValue)
                        }
                      } catch (e) {
                        // Invalid OKLCH format, ignore
                      }
                    }
                  }
                }}
                onClick={(e) => e.stopPropagation()}
                className="font-mono text-sm h-8 px-2 border-slate-300"
                placeholder={colorFormat === 'hex' ? '#000000' : 'oklch(0.000 0.000 0)'}
              />
            </div>
          </div>
        ))}
        
        {/* Add Color Button */}
        <button
          onClick={onAddColor}
          className="w-full flex items-center justify-center gap-2 p-4 rounded-xl border-2 border-dashed border-slate-300 hover:border-slate-400 hover:bg-slate-50 transition-all text-slate-600 hover:text-slate-900"
        >
          <Plus className="h-5 w-5" />
          <span className="font-medium">Add Color</span>
        </button>
      </div>

      {/* Adjustment Dialog */}
      <Dialog open={selectedColor !== null} onOpenChange={(open) => !open && setSelectedColor(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {selectedColor}
            </DialogTitle>
          </DialogHeader>

          {selectedColor && colors[selectedColor] && (
            <div className="space-y-6 py-4">
              {/* Color Display */}
              <div className="flex items-center gap-4 p-4 rounded-xl border border-slate-200 bg-slate-50">
                <div
                  className="w-16 h-16 rounded-xl flex-shrink-0"
                  style={{ 
                    backgroundColor: colors[selectedColor],
                    border: '0.5px solid rgba(148, 163, 184, 0.2)'
                  }}
                />
                <p className="font-mono text-lg font-semibold">
                  {colors[selectedColor].toUpperCase()}
                </p>
              </div>

              {/* Lightness Slider */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <Label className="text-base font-semibold">Lightness</Label>
                  <span className="text-sm font-semibold text-slate-600">{lightness.toFixed(1)}%</span>
                </div>
                <Slider
                  value={[lightness]}
                  onValueChange={([value]) => {
                    setLightness(value)
                    handleSliderChange(value, undefined, undefined)
                  }}
                  min={0}
                  max={100}
                  step={0.1}
                  className="w-full"
                />
                <div
                  className="h-10 rounded-lg"
                  style={{
                    background: `linear-gradient(to right, #000000, ${hslToHex(hue, chroma, 50)}, #ffffff)`
                  }}
                />
              </div>

              {/* Chroma Slider */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <Label className="text-base font-semibold">Chroma</Label>
                  <span className="text-sm font-semibold text-slate-600">{chroma.toFixed(1)}%</span>
                </div>
                <Slider
                  value={[chroma]}
                  onValueChange={([value]) => {
                    setChroma(value)
                    handleSliderChange(undefined, value, undefined)
                  }}
                  min={0}
                  max={100}
                  step={0.1}
                  className="w-full"
                />
                <div
                  className="h-10 rounded-lg"
                  style={{
                    background: `linear-gradient(to right, ${hslToHex(hue, 0, lightness)}, ${hslToHex(hue, 100, lightness)})`
                  }}
                />
              </div>

              {/* Hue Slider */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <Label className="text-base font-semibold">Hue</Label>
                  <span className="text-sm font-semibold text-slate-600">{hue.toFixed(2)}</span>
                </div>
                <Slider
                  value={[hue]}
                  onValueChange={([value]) => {
                    setHue(value)
                    handleSliderChange(undefined, undefined, value)
                  }}
                  min={0}
                  max={360}
                  step={0.01}
                  className="w-full"
                />
                <div
                  className="h-10 rounded-lg"
                  style={{
                    background: 'linear-gradient(to right, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000)'
                  }}
                />
              </div>

              {/* Alpha Slider */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <Label className="text-base font-semibold">Alpha</Label>
                  <span className="text-sm font-semibold text-slate-600">{alpha.toFixed(3)}</span>
                </div>
                <Slider
                  value={[alpha * 100]}
                  onValueChange={([value]) => setAlpha(value / 100)}
                  min={0}
                  max={100}
                  step={0.1}
                  className="w-full"
                />
                <div
                  className="h-10 rounded-lg relative overflow-hidden"
                  style={{
                    backgroundImage: 'linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)',
                    backgroundSize: '16px 16px',
                    backgroundPosition: '0 0, 0 8px, 8px -8px, -8px 0px'
                  }}
                >
                  <div 
                    className="absolute inset-0"
                    style={{ 
                      backgroundColor: colors[selectedColor as keyof typeof colors],
                      opacity: alpha 
                    }}
                  />
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
