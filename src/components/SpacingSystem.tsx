import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { Download, Ruler } from 'lucide-react'

interface SpacingSystemProps {
  spacing: {
    base: number
    scale: number
  }
  setSpacing: (spacing: any) => void
}

export default function SpacingSystem({ spacing, setSpacing }: SpacingSystemProps) {
  const handleChange = (key: string, value: number) => {
    setSpacing({ ...spacing, [key]: value })
  }

  // Generate spacing scale
  const generateScale = () => {
    const base = spacing.base
    const scale = spacing.scale
    
    return {
      '0': 0,
      'xs': Math.round(base * Math.pow(scale, 0)),
      'sm': Math.round(base * Math.pow(scale, 1)),
      'md': Math.round(base * Math.pow(scale, 2)),
      'lg': Math.round(base * Math.pow(scale, 3)),
      'xl': Math.round(base * Math.pow(scale, 4)),
      '2xl': Math.round(base * Math.pow(scale, 5)),
      '3xl': Math.round(base * Math.pow(scale, 6)),
      '4xl': Math.round(base * Math.pow(scale, 7)),
    }
  }

  const spacingScale = generateScale()

  const exportCSS = () => {
    const css = `/* Spacing System */
:root {
  --spacing-base: ${spacing.base}px;
  --spacing-scale: ${spacing.scale};
  
  /* Spacing Scale */
  --spacing-0: 0;
  --spacing-xs: ${spacingScale.xs}px;
  --spacing-sm: ${spacingScale.sm}px;
  --spacing-md: ${spacingScale.md}px;
  --spacing-lg: ${spacingScale.lg}px;
  --spacing-xl: ${spacingScale.xl}px;
  --spacing-2xl: ${spacingScale['2xl']}px;
  --spacing-3xl: ${spacingScale['3xl']}px;
  --spacing-4xl: ${spacingScale['4xl']}px;
}

/* Utility Classes */
.spacing-xs { margin: var(--spacing-xs); }
.spacing-sm { margin: var(--spacing-sm); }
.spacing-md { margin: var(--spacing-md); }
.spacing-lg { margin: var(--spacing-lg); }
.spacing-xl { margin: var(--spacing-xl); }
.spacing-2xl { margin: var(--spacing-2xl); }
.spacing-3xl { margin: var(--spacing-3xl); }
.spacing-4xl { margin: var(--spacing-4xl); }`

    navigator.clipboard.writeText(css)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Configuration */}
      <Card className="border-slate-200 shadow-lg shadow-slate-200/50">
        <CardHeader>
          <CardTitle className="text-2xl">Spacing Settings</CardTitle>
          <CardDescription>
            Configure your spacing scale
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label>Base Unit</Label>
              <span className="text-sm text-slate-600">{spacing.base}px</span>
            </div>
            <Slider
              value={[spacing.base]}
              onValueChange={([value]) => handleChange('base', value)}
              min={2}
              max={12}
              step={1}
            />
            <p className="text-xs text-slate-500">
              The fundamental spacing unit for your system
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label>Scale Multiplier</Label>
              <span className="text-sm text-slate-600">{spacing.scale.toFixed(2)}</span>
            </div>
            <Slider
              value={[spacing.scale * 100]}
              onValueChange={([value]) => handleChange('scale', value / 100)}
              min={120}
              max={200}
              step={5}
            />
            <p className="text-xs text-slate-500">
              How quickly spacing increases between steps
            </p>
          </div>

          <div className="pt-4 border-t border-slate-200">
            <Button onClick={exportCSS} variant="outline" className="w-full gap-2">
              <Download className="h-4 w-4" />
              Copy CSS
            </Button>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <h4 className="text-sm font-medium flex items-center gap-2">
              <Ruler className="h-4 w-4" />
              Common Base Units
            </h4>
            <div className="space-y-1 text-xs text-slate-600">
              <p><strong>4px:</strong> Most common, aligns with 8pt grid</p>
              <p><strong>8px:</strong> More spacious, simpler math</p>
              <p><strong>6px:</strong> Balanced, works with 12pt grid</p>
            </div>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <h4 className="text-sm font-medium">Scale Multipliers</h4>
            <div className="space-y-1 text-xs text-slate-600">
              <p><strong>1.25:</strong> Subtle progression</p>
              <p><strong>1.5:</strong> Balanced growth</p>
              <p><strong>1.618:</strong> Golden ratio</p>
              <p><strong>2.0:</strong> Dramatic jumps</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Spacing Scale Visualization */}
      <Card className="lg:col-span-2 border-slate-200 shadow-lg shadow-slate-200/50">
        <CardHeader>
          <CardTitle className="text-2xl">Spacing Scale</CardTitle>
          <CardDescription>
            Visual reference for your spacing system
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Scale bars */}
          <div className="space-y-4">
            {Object.entries(spacingScale)
              .filter(([key]) => key !== '0')
              .map(([key, value]) => (
                <div key={key} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono text-slate-500 w-8">{key}</span>
                      <span className="text-sm font-mono text-slate-700">{value}px</span>
                    </div>
                    <span className="text-xs text-slate-500">
                      {(value / spacing.base).toFixed(1)}× base
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-12 bg-slate-50 rounded-lg border border-slate-200 relative overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-slate-900 to-slate-700 rounded-lg transition-all duration-300 flex items-center justify-center text-white text-xs font-medium"
                        style={{ width: `${value}px`, maxWidth: '100%' }}
                      >
                        {value > 30 && `${value}px`}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>

          {/* Usage Examples */}
          <div className="mt-8 space-y-6">
            <h3 className="text-lg font-semibold">Usage Examples</h3>
            
            {/* Card Example */}
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-slate-700">Card Component</h4>
              <div
                className="border border-slate-200 rounded-xl bg-white"
                style={{ padding: `${spacingScale.lg}px` }}
              >
                <h5 className="font-semibold text-slate-900" style={{ marginBottom: `${spacingScale.sm}px` }}>
                  Card Title
                </h5>
                <p className="text-slate-600 text-sm" style={{ marginBottom: `${spacingScale.md}px` }}>
                  This card uses your spacing system: lg padding, sm title margin, md content margin.
                </p>
                <div className="flex gap-2">
                  <button
                    className="px-4 py-2 bg-slate-900 text-white rounded-lg text-sm"
                    style={{ padding: `${spacingScale.sm}px ${spacingScale.md}px` }}
                  >
                    Primary
                  </button>
                  <button
                    className="px-4 py-2 border border-slate-300 rounded-lg text-sm"
                    style={{ padding: `${spacingScale.sm}px ${spacingScale.md}px` }}
                  >
                    Secondary
                  </button>
                </div>
              </div>
            </div>

            {/* Stack Example */}
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-slate-700">Vertical Stack</h4>
              <div className="p-6 bg-slate-50 rounded-xl border border-slate-200">
                {['xs', 'sm', 'md', 'lg'].map((size) => (
                  <div key={size}>
                    <div className="h-8 bg-white rounded-lg border border-slate-200 flex items-center px-4 text-xs text-slate-600">
                      Item with {size} margin
                    </div>
                    <div style={{ height: `${spacingScale[size as keyof typeof spacingScale]}px` }} />
                  </div>
                ))}
                <div className="h-8 bg-white rounded-lg border border-slate-200 flex items-center px-4 text-xs text-slate-600">
                  Last item
                </div>
              </div>
            </div>

            {/* Grid Example */}
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-slate-700">Grid Layout</h4>
              <div
                className="grid grid-cols-4 p-6 bg-slate-50 rounded-xl border border-slate-200"
                style={{ gap: `${spacingScale.md}px` }}
              >
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="h-16 bg-white rounded-lg border border-slate-200 flex items-center justify-center text-xs text-slate-600"
                  >
                    Item {i + 1}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
