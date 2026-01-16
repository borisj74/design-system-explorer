import { useState, useEffect } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Palette, Type, Boxes, Eye, Download, FileCode, Figma, Circle, Layers, Droplet, AlignJustify, Clock, GitCompare, Save } from 'lucide-react'
import ColorPalette from './components/ColorPalette'
import TypographySystem from './components/TypographySystem'
import SpacingSystem from './components/SpacingSystem'
import ComponentPreview from './components/ComponentPreview'
import BorderRadius from './components/BorderRadius'
import Shadow from './components/Shadow'
import Opacity from './components/Opacity'
import LineHeight from './components/LineHeight'
import VersionHistory from './components/VersionHistory'
import ComparisonMode from './components/ComparisonMode'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import './App.css'

function App() {
  const [colors, setColors] = useState<Record<string, string>>({
    primary: '#0F172A',
    secondary: '#64748B',
    accent: '#F59E0B',
    background: '#FFFFFF',
    foreground: '#0F172A',
  })

  const [typography, setTypography] = useState({
    fontFamily: 'system-ui, -apple-system, sans-serif',
    scale: 1.25,
    baseSize: 16,
  })

  const [spacing, setSpacing] = useState({
    base: 4,
    scale: 1.5,
  })

  const [borderRadius, setBorderRadius] = useState({
    base: 8,
    scale: 1.5,
  })

  const [shadows, setShadows] = useState({
    intensity: 100,
  })

  const [opacity, setOpacity] = useState({
    values: [0, 5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 95, 100],
  })

  const [lineHeight, setLineHeight] = useState({
    tight: 1.25,
    normal: 1.5,
    relaxed: 1.75,
  })

  // Helper to safely get color values with fallbacks
  const getColorValue = (key: string, fallback: string) => {
    return colors[key] || Object.values(colors)[0] || fallback
  }

  const getColorOrFirst = (index: number, fallback: string) => {
    const colorValues = Object.values(colors)
    return colorValues[index] || colorValues[0] || fallback
  }

  // Track currently loaded palette for update functionality
  const [activePalette, setActivePalette] = useState<{id: string, name: string} | null>(null)

  // Track currently loaded version
  const [activeVersion, setActiveVersion] = useState<{id: string, name: string} | null>(null)

  // Active tab control for navigation
  const [activeTab, setActiveTab] = useState('colors')

  // Preview save dialog state
  const [showPreviewSaveDialog, setShowPreviewSaveDialog] = useState(false)
  const [previewVersionName, setPreviewVersionName] = useState('')

  // Debug: Monitor colors state changes
  useEffect(() => {
    console.log('🎨 COLORS STATE CHANGED TO:', colors)
  }, [colors])

  // Generate complete CSS export
  const generateCSSExport = () => {
    const typeSizes = {
      body: typography.baseSize * Math.pow(typography.scale, -1),
      h6: typography.baseSize * Math.pow(typography.scale, 0),
      h5: typography.baseSize * Math.pow(typography.scale, 1),
      h4: typography.baseSize * Math.pow(typography.scale, 2),
      h3: typography.baseSize * Math.pow(typography.scale, 3),
      h2: typography.baseSize * Math.pow(typography.scale, 4),
      h1: typography.baseSize * Math.pow(typography.scale, 5),
    }

    const spacingValues = {
      xs: Math.round(spacing.base * Math.pow(spacing.scale, 0)),
      sm: Math.round(spacing.base * Math.pow(spacing.scale, 1)),
      md: Math.round(spacing.base * Math.pow(spacing.scale, 2)),
      lg: Math.round(spacing.base * Math.pow(spacing.scale, 3)),
      xl: Math.round(spacing.base * Math.pow(spacing.scale, 4)),
      '2xl': Math.round(spacing.base * Math.pow(spacing.scale, 5)),
      '3xl': Math.round(spacing.base * Math.pow(spacing.scale, 6)),
    }

    const radiusValues = {
      sm: Math.round(borderRadius.base * Math.pow(borderRadius.scale, 0)),
      md: Math.round(borderRadius.base * Math.pow(borderRadius.scale, 1)),
      lg: Math.round(borderRadius.base * Math.pow(borderRadius.scale, 2)),
      xl: Math.round(borderRadius.base * Math.pow(borderRadius.scale, 3)),
      '2xl': Math.round(borderRadius.base * Math.pow(borderRadius.scale, 4)),
      '3xl': Math.round(borderRadius.base * Math.pow(borderRadius.scale, 5)),
    }

    const i = shadows.intensity / 100
    const shadowValues = {
      xs: `0 1px 2px 0 rgba(0, 0, 0, ${0.05 * i})`,
      sm: `0 1px 3px 0 rgba(0, 0, 0, ${0.1 * i}), 0 1px 2px -1px rgba(0, 0, 0, ${0.1 * i})`,
      md: `0 4px 6px -1px rgba(0, 0, 0, ${0.1 * i}), 0 2px 4px -2px rgba(0, 0, 0, ${0.1 * i})`,
      lg: `0 10px 15px -3px rgba(0, 0, 0, ${0.1 * i}), 0 4px 6px -4px rgba(0, 0, 0, ${0.1 * i})`,
      xl: `0 20px 25px -5px rgba(0, 0, 0, ${0.1 * i}), 0 8px 10px -6px rgba(0, 0, 0, ${0.1 * i})`,
      '2xl': `0 25px 50px -12px rgba(0, 0, 0, ${0.25 * i})`,
      inner: `inset 0 2px 4px 0 rgba(0, 0, 0, ${0.06 * i})`,
    }

    return `/* ========================================
   DESIGN SYSTEM - CSS CUSTOM PROPERTIES
   Generated from Design System Explorer
   ======================================== */

:root {
  /* ============ COLORS ============ */
  --color-primary: ${getColorValue('primary', getColorOrFirst(0, '#0F172A'))};
  --color-secondary: ${getColorValue('secondary', getColorOrFirst(1, '#64748B'))};
  --color-accent: ${getColorValue('accent', getColorOrFirst(2, '#F59E0B'))};
  --color-background: ${getColorValue('background', '#FFFFFF')};
  --color-foreground: ${getColorValue('foreground', '#0F172A')};

  /* ============ TYPOGRAPHY ============ */
  --font-family: ${typography.fontFamily};
  --font-size-base: ${typography.baseSize}px;
  --font-scale: ${typography.scale};
  
  /* Type Scale */
  --font-size-body: ${typeSizes.body.toFixed(2)}px;
  --font-size-h6: ${typeSizes.h6.toFixed(2)}px;
  --font-size-h5: ${typeSizes.h5.toFixed(2)}px;
  --font-size-h4: ${typeSizes.h4.toFixed(2)}px;
  --font-size-h3: ${typeSizes.h3.toFixed(2)}px;
  --font-size-h2: ${typeSizes.h2.toFixed(2)}px;
  --font-size-h1: ${typeSizes.h1.toFixed(2)}px;

  /* Line Heights */
  --line-height-tight: ${lineHeight.tight};
  --line-height-normal: ${lineHeight.normal};
  --line-height-relaxed: ${lineHeight.relaxed};

  /* ============ SPACING ============ */
  --spacing-base: ${spacing.base}px;
  --spacing-scale: ${spacing.scale};
  
  /* Spacing Scale */
  --spacing-xs: ${spacingValues.xs}px;
  --spacing-sm: ${spacingValues.sm}px;
  --spacing-md: ${spacingValues.md}px;
  --spacing-lg: ${spacingValues.lg}px;
  --spacing-xl: ${spacingValues.xl}px;
  --spacing-2xl: ${spacingValues['2xl']}px;
  --spacing-3xl: ${spacingValues['3xl']}px;

  /* ============ BORDER RADIUS ============ */
  --radius-none: 0;
  --radius-sm: ${radiusValues.sm}px;
  --radius-md: ${radiusValues.md}px;
  --radius-lg: ${radiusValues.lg}px;
  --radius-xl: ${radiusValues.xl}px;
  --radius-2xl: ${radiusValues['2xl']}px;
  --radius-3xl: ${radiusValues['3xl']}px;
  --radius-full: 9999px;

  /* ============ SHADOWS ============ */
  --shadow-xs: ${shadowValues.xs};
  --shadow-sm: ${shadowValues.sm};
  --shadow-md: ${shadowValues.md};
  --shadow-lg: ${shadowValues.lg};
  --shadow-xl: ${shadowValues.xl};
  --shadow-2xl: ${shadowValues['2xl']};
  --shadow-inner: ${shadowValues.inner};

  /* ============ OPACITY ============ */
  --opacity-0: 0;
  --opacity-5: 0.05;
  --opacity-10: 0.10;
  --opacity-20: 0.20;
  --opacity-30: 0.30;
  --opacity-40: 0.40;
  --opacity-50: 0.50;
  --opacity-60: 0.60;
  --opacity-70: 0.70;
  --opacity-80: 0.80;
  --opacity-90: 0.90;
  --opacity-95: 0.95;
  --opacity-100: 1.00;
}

/* ============ BASE STYLES ============ */
body {
  font-family: var(--font-family);
  font-size: var(--font-size-base);
  line-height: var(--line-height-normal);
  color: var(--color-foreground);
  background-color: var(--color-background);
}

/* ============ TYPOGRAPHY ============ */
h1 {
  font-size: var(--font-size-h1);
  line-height: var(--line-height-tight);
  font-weight: 700;
  margin-bottom: var(--spacing-md);
}

h2 {
  font-size: var(--font-size-h2);
  line-height: var(--line-height-tight);
  font-weight: 700;
  margin-bottom: var(--spacing-md);
}

h3 {
  font-size: var(--font-size-h3);
  line-height: var(--line-height-normal);
  font-weight: 600;
  margin-bottom: var(--spacing-sm);
}

h4 {
  font-size: var(--font-size-h4);
  line-height: var(--line-height-normal);
  font-weight: 600;
  margin-bottom: var(--spacing-sm);
}

h5 {
  font-size: var(--font-size-h5);
  line-height: var(--line-height-normal);
  font-weight: 500;
  margin-bottom: var(--spacing-sm);
}

h6 {
  font-size: var(--font-size-h6);
  line-height: var(--line-height-normal);
  font-weight: 500;
  margin-bottom: var(--spacing-xs);
}

p {
  line-height: var(--line-height-relaxed);
  margin-bottom: var(--spacing-md);
}

/* ============ UTILITY CLASSES ============ */
/* Spacing */
.space-xs { margin: var(--spacing-xs); }
.space-sm { margin: var(--spacing-sm); }
.space-md { margin: var(--spacing-md); }
.space-lg { margin: var(--spacing-lg); }
.space-xl { margin: var(--spacing-xl); }

.gap-xs { gap: var(--spacing-xs); }
.gap-sm { gap: var(--spacing-sm); }
.gap-md { gap: var(--spacing-md); }
.gap-lg { gap: var(--spacing-lg); }
.gap-xl { gap: var(--spacing-xl); }

/* Colors */
.bg-primary { background-color: var(--color-primary); }
.bg-secondary { background-color: var(--color-secondary); }
.bg-accent { background-color: var(--color-accent); }

.text-primary { color: var(--color-primary); }
.text-secondary { color: var(--color-secondary); }
.text-accent { color: var(--color-accent); }

/* Border Radius */
.rounded-sm { border-radius: var(--radius-sm); }
.rounded-md { border-radius: var(--radius-md); }
.rounded-lg { border-radius: var(--radius-lg); }
.rounded-xl { border-radius: var(--radius-xl); }
.rounded-2xl { border-radius: var(--radius-2xl); }
.rounded-3xl { border-radius: var(--radius-3xl); }
.rounded-full { border-radius: var(--radius-full); }

/* Shadows */
.shadow-xs { box-shadow: var(--shadow-xs); }
.shadow-sm { box-shadow: var(--shadow-sm); }
.shadow-md { box-shadow: var(--shadow-md); }
.shadow-lg { box-shadow: var(--shadow-lg); }
.shadow-xl { box-shadow: var(--shadow-xl); }
.shadow-2xl { box-shadow: var(--shadow-2xl); }
.shadow-inner { box-shadow: var(--shadow-inner); }
`
  }

  // Generate Figma Variables JSON export
  const generateFigmaJSON = () => {
    // Generate Tokens Studio format (works with Tokens Studio plugin for Figma)
    const tokens: any = {}

    // Colors
    tokens.colors = {}
    Object.entries(colors).forEach(([name, value]) => {
      tokens.colors[name] = {
        value: value,
        type: "color"
      }
    })

    // Typography - needs pixel units
    tokens.fontSize = {
      body: { value: `${(typography.baseSize * Math.pow(typography.scale, -1)).toFixed(1)}px`, type: "fontSizes" },
      h6: { value: `${(typography.baseSize * Math.pow(typography.scale, 0)).toFixed(1)}px`, type: "fontSizes" },
      h5: { value: `${(typography.baseSize * Math.pow(typography.scale, 1)).toFixed(1)}px`, type: "fontSizes" },
      h4: { value: `${(typography.baseSize * Math.pow(typography.scale, 2)).toFixed(1)}px`, type: "fontSizes" },
      h3: { value: `${(typography.baseSize * Math.pow(typography.scale, 3)).toFixed(1)}px`, type: "fontSizes" },
      h2: { value: `${(typography.baseSize * Math.pow(typography.scale, 4)).toFixed(1)}px`, type: "fontSizes" },
      h1: { value: `${(typography.baseSize * Math.pow(typography.scale, 5)).toFixed(1)}px`, type: "fontSizes" }
    }

    // Spacing - needs pixel units
    tokens.spacing = {
      xs: { value: `${Math.round(spacing.base * Math.pow(spacing.scale, 0))}px`, type: "spacing" },
      sm: { value: `${Math.round(spacing.base * Math.pow(spacing.scale, 1))}px`, type: "spacing" },
      md: { value: `${Math.round(spacing.base * Math.pow(spacing.scale, 2))}px`, type: "spacing" },
      lg: { value: `${Math.round(spacing.base * Math.pow(spacing.scale, 3))}px`, type: "spacing" },
      xl: { value: `${Math.round(spacing.base * Math.pow(spacing.scale, 4))}px`, type: "spacing" },
      "2xl": { value: `${Math.round(spacing.base * Math.pow(spacing.scale, 5))}px`, type: "spacing" },
      "3xl": { value: `${Math.round(spacing.base * Math.pow(spacing.scale, 6))}px`, type: "spacing" }
    }

    // Border Radius - needs pixel units
    tokens.borderRadius = {
      sm: { value: `${Math.round(borderRadius.base * Math.pow(borderRadius.scale, 0))}px`, type: "borderRadius" },
      md: { value: `${Math.round(borderRadius.base * Math.pow(borderRadius.scale, 1))}px`, type: "borderRadius" },
      lg: { value: `${Math.round(borderRadius.base * Math.pow(borderRadius.scale, 2))}px`, type: "borderRadius" },
      xl: { value: `${Math.round(borderRadius.base * Math.pow(borderRadius.scale, 3))}px`, type: "borderRadius" },
      "2xl": { value: `${Math.round(borderRadius.base * Math.pow(borderRadius.scale, 4))}px`, type: "borderRadius" }
    }

    // Line Heights - unitless numbers
    tokens.lineHeights = {
      tight: { value: lineHeight.tight.toString(), type: "lineHeights" },
      normal: { value: lineHeight.normal.toString(), type: "lineHeights" },
      relaxed: { value: lineHeight.relaxed.toString(), type: "lineHeights" }
    }

    // Opacity - percentage strings
    tokens.opacity = {
      0: { value: "0%", type: "opacity" },
      5: { value: "5%", type: "opacity" },
      10: { value: "10%", type: "opacity" },
      20: { value: "20%", type: "opacity" },
      30: { value: "30%", type: "opacity" },
      40: { value: "40%", type: "opacity" },
      50: { value: "50%", type: "opacity" },
      60: { value: "60%", type: "opacity" },
      70: { value: "70%", type: "opacity" },
      80: { value: "80%", type: "opacity" },
      90: { value: "90%", type: "opacity" },
      95: { value: "95%", type: "opacity" },
      100: { value: "100%", type: "opacity" }
    }

    return tokens
  }

  const downloadFigmaJSON = () => {
    const json = JSON.stringify(generateFigmaJSON(), null, 2)
    const blob = new Blob([json], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `design-tokens-${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(link)
    link.click()
    setTimeout(() => {
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    }, 100)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  // Current state for version history
  const currentState = {
    colors,
    typography,
    spacing,
    borderRadius,
    shadows,
    opacity,
    lineHeight,
  }

  // Save version from preview
  const handleSaveVersionFromPreview = () => {
    if (!previewVersionName.trim()) return

    const newVersion = {
      id: Date.now().toString(),
      name: previewVersionName,
      timestamp: Date.now(),
      state: currentState,
    }

    // Get existing versions
    const saved = localStorage.getItem('design-system-versions')
    const versions = saved ? JSON.parse(saved) : []
    
    // Add new version
    const updatedVersions = [newVersion, ...versions]
    localStorage.setItem('design-system-versions', JSON.stringify(updatedVersions))
    
    setPreviewVersionName('')
    setShowPreviewSaveDialog(false)
    alert(`✓ Version "${newVersion.name}" saved successfully!\n\nGo to the Versions tab to view, restore, or manage your saved versions.`)
  }

  // Restore version handler
  const handleRestoreVersion = (state: any, versionInfo?: {id: string, name: string}, paletteInfo?: {id: string, name: string}) => {
    console.log('handleRestoreVersion called with state:', state)
    
    if (state.colors) {
      console.log('Setting colors to:', state.colors)
      setColors(state.colors)
      console.log('setColors called')
      
      // If version info provided, set it as active and navigate to preview
      if (versionInfo) {
        console.log('Setting active version:', versionInfo)
        setActiveVersion(versionInfo)
        setActiveTab('preview')
      }
      
      // If palette info provided, set it as active and navigate to colors tab
      if (paletteInfo) {
        console.log('Setting active palette:', paletteInfo)
        setActivePalette(paletteInfo)
        setActiveTab('colors')
      }
    }
    if (state.typography) {
      console.log('Setting typography')
      setTypography(state.typography)
    }
    if (state.spacing) {
      console.log('Setting spacing')
      setSpacing(state.spacing)
    }
    if (state.borderRadius) {
      console.log('Setting borderRadius')
      setBorderRadius(state.borderRadius)
    }
    if (state.shadows) {
      console.log('Setting shadows')
      setShadows(state.shadows)
    }
    if (state.opacity) {
      console.log('Setting opacity')
      setOpacity(state.opacity)
    }
    if (state.lineHeight) {
      console.log('Setting lineHeight')
      setLineHeight(state.lineHeight)
    }
    
    console.log('handleRestoreVersion completed')
  }

  return (
    <div className="min-h-dvh w-full bg-slate-50">
      <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <header className="mb-12 text-center">
          <h1 className="text-5xl font-bold text-balance mb-4 text-slate-900">
            Design System Explorer
          </h1>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto text-pretty">
            Build, test, and export your design tokens in real-time. Create cohesive systems with live component previews.
          </p>
        </header>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <div className="flex justify-center px-4">
            <TabsList className="inline-flex h-12 items-center rounded-xl bg-white p-1.5 shadow-lg shadow-slate-200/50 border border-slate-200 gap-1">
              <TabsTrigger value="colors" className="gap-2 data-[state=active]:bg-slate-900 data-[state=active]:text-white whitespace-nowrap flex-shrink-0">
                <Palette className="h-4 w-4 flex-shrink-0" />
                <span className="text-sm hidden min-[910px]:inline">Colors</span>
              </TabsTrigger>
              <TabsTrigger value="typography" className="gap-2 data-[state=active]:bg-slate-900 data-[state=active]:text-white whitespace-nowrap flex-shrink-0">
                <Type className="h-4 w-4 flex-shrink-0" />
                <span className="text-sm hidden min-[910px]:inline">Typography</span>
              </TabsTrigger>
              <TabsTrigger value="spacing" className="gap-2 data-[state=active]:bg-slate-900 data-[state=active]:text-white whitespace-nowrap flex-shrink-0">
                <Boxes className="h-4 w-4 flex-shrink-0" />
                <span className="text-sm hidden min-[910px]:inline">Spacing</span>
              </TabsTrigger>
              <TabsTrigger value="radius" className="gap-2 data-[state=active]:bg-slate-900 data-[state=active]:text-white whitespace-nowrap flex-shrink-0">
                <Circle className="h-4 w-4 flex-shrink-0" />
                <span className="text-sm hidden min-[910px]:inline">Radius</span>
              </TabsTrigger>
              <TabsTrigger value="shadows" className="gap-2 data-[state=active]:bg-slate-900 data-[state=active]:text-white whitespace-nowrap flex-shrink-0">
                <Layers className="h-4 w-4 flex-shrink-0" />
                <span className="text-sm hidden min-[910px]:inline">Shadows</span>
              </TabsTrigger>
              <TabsTrigger value="opacity" className="gap-2 data-[state=active]:bg-slate-900 data-[state=active]:text-white whitespace-nowrap flex-shrink-0">
                <Droplet className="h-4 w-4 flex-shrink-0" />
                <span className="text-sm hidden min-[910px]:inline">Opacity</span>
              </TabsTrigger>
              <TabsTrigger value="lineheight" className="gap-2 data-[state=active]:bg-slate-900 data-[state=active]:text-white whitespace-nowrap flex-shrink-0">
                <AlignJustify className="h-4 w-4 flex-shrink-0" />
                <span className="text-sm hidden min-[910px]:inline">Line Height</span>
              </TabsTrigger>
              <TabsTrigger value="preview" className="gap-2 data-[state=active]:bg-slate-900 data-[state=active]:text-white whitespace-nowrap flex-shrink-0">
                <Eye className="h-4 w-4 flex-shrink-0" />
                <span className="text-sm hidden min-[910px]:inline">Preview</span>
              </TabsTrigger>
              <TabsTrigger value="versions" className="gap-2 data-[state=active]:bg-slate-900 data-[state=active]:text-white whitespace-nowrap flex-shrink-0">
                <Clock className="h-4 w-4 flex-shrink-0" />
                <span className="text-sm hidden min-[910px]:inline">Versions</span>
              </TabsTrigger>
              <TabsTrigger value="compare" className="gap-2 data-[state=active]:bg-slate-900 data-[state=active]:text-white whitespace-nowrap flex-shrink-0">
                <GitCompare className="h-4 w-4 flex-shrink-0" />
                <span className="text-sm hidden min-[910px]:inline">Compare</span>
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="colors" className="space-y-6">
            <ColorPalette 
              colors={colors} 
              setColors={setColors} 
              activePalette={activePalette}
              setActivePalette={setActivePalette}
            />
          </TabsContent>

          <TabsContent value="typography" className="space-y-6">
            <TypographySystem typography={typography} setTypography={setTypography} />
          </TabsContent>

          <TabsContent value="spacing" className="space-y-6">
            <SpacingSystem spacing={spacing} setSpacing={setSpacing} />
          </TabsContent>

          <TabsContent value="radius" className="space-y-6">
            <BorderRadius borderRadius={borderRadius} setBorderRadius={setBorderRadius} />
          </TabsContent>

          <TabsContent value="shadows" className="space-y-6">
            <Shadow shadows={shadows} setShadows={setShadows} />
          </TabsContent>

          <TabsContent value="opacity" className="space-y-6">
            <Opacity opacity={opacity} setOpacity={setOpacity} />
          </TabsContent>

          <TabsContent value="lineheight" className="space-y-6">
            <LineHeight typography={typography} lineHeight={lineHeight} setLineHeight={setLineHeight} />
          </TabsContent>

          <TabsContent value="preview" className="space-y-6">
            {/* Save Version CTA */}
            <Card className="border border-gray-200 bg-white shadow-sm">
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <CardTitle className="text-xl flex items-center gap-2">
                        <Save className="h-5 w-5" />
                        Happy with your design?
                      </CardTitle>
                      {activeVersion && (
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="gap-1.5">
                            <Clock className="h-3 w-3" />
                            {activeVersion.name}
                          </Badge>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setActiveVersion(null)}
                            className="h-6 w-6 p-0 hover:bg-red-50 hover:text-red-600"
                            title="Clear loaded version"
                          >
                            <span className="text-lg">×</span>
                          </Button>
                        </div>
                      )}
                    </div>
                    <CardDescription className="text-base">
                      {activeVersion 
                        ? `Currently viewing "${activeVersion.name}" version. Make changes and save as a new version, or click × to clear.`
                        : 'Save this version of your design system so you can restore it later or compare it with other versions'
                      }
                    </CardDescription>
                  </div>
                  <Dialog open={showPreviewSaveDialog} onOpenChange={setShowPreviewSaveDialog}>
                    <DialogTrigger asChild>
                      <Button size="lg" className="gap-2 flex-shrink-0">
                        <Save className="h-4 w-4" />
                        Save This Version
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Save Design System Version</DialogTitle>
                        <DialogDescription>
                          Give this version a memorable name to identify it later
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 pt-4">
                        <div className="space-y-2">
                          <Label>Version Name</Label>
                          <Input
                            placeholder="e.g., Pre-Meeting v1, Dark Mode Test, Final Design"
                            value={previewVersionName}
                            onChange={(e) => setPreviewVersionName(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSaveVersionFromPreview()}
                            autoFocus
                          />
                        </div>
                        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                          <p className="text-xs font-semibold text-slate-700 mb-2">This version includes:</p>
                          <div className="grid grid-cols-2 gap-2 text-xs text-slate-600">
                            <div className="flex items-center gap-2">
                              <Palette className="h-3 w-3" />
                              <span>5 colors</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Type className="h-3 w-3" />
                              <span>Typography scale</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Boxes className="h-3 w-3" />
                              <span>Spacing system</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Circle className="h-3 w-3" />
                              <span>Border radius</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Layers className="h-3 w-3" />
                              <span>Shadow intensity</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Droplet className="h-3 w-3" />
                              <span>Opacity values</span>
                            </div>
                          </div>
                        </div>
                        <Button 
                          onClick={handleSaveVersionFromPreview} 
                          className="w-full gap-2"
                          disabled={!previewVersionName.trim()}
                        >
                          <Save className="h-4 w-4" />
                          Save Version
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
            </Card>

            <ComponentPreview 
              colors={colors} 
              typography={typography} 
              spacing={spacing}
              borderRadius={borderRadius}
              shadows={shadows}
              opacity={opacity}
              lineHeight={lineHeight}
            />
          </TabsContent>

          <TabsContent value="versions" className="space-y-6">
            <VersionHistory 
              currentState={currentState} 
              onRestore={handleRestoreVersion}
              activeVersion={activeVersion}
              setActiveVersion={setActiveVersion}
            />
          </TabsContent>

          <TabsContent value="compare" className="space-y-6">
            <ComparisonMode currentState={currentState} />
          </TabsContent>
        </Tabs>

        {/* Export CTAs */}
        <div className="mt-12 pt-8 border-t border-slate-200">
          <div className="flex gap-4 justify-center flex-wrap">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" size="lg" className="gap-2 shadow-sm">
                <FileCode className="h-4 w-4" />
                Export CSS
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl max-h-[80vh]">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <FileCode className="h-5 w-5" />
                  CSS Custom Properties Export
                </DialogTitle>
                <DialogDescription>
                  Copy this CSS and paste it into your stylesheet. All design tokens are included.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <Textarea
                  value={generateCSSExport()}
                  readOnly
                  className="font-mono text-xs h-96 resize-none"
                />
                <Button
                  onClick={() => {
                    copyToClipboard(generateCSSExport())
                    alert('CSS copied to clipboard!')
                  }}
                  className="w-full gap-2"
                >
                  <Download className="h-4 w-4" />
                  Copy to Clipboard
                </Button>
              </div>
            </DialogContent>
          </Dialog>

          <Button 
            size="lg" 
            className="gap-2 shadow-sm"
            onClick={downloadFigmaJSON}
          >
            <Figma className="h-4 w-4" />
            Export Figma
          </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
