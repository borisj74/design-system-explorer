import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { Download, Type } from 'lucide-react'

interface TypographySystemProps {
  typography: {
    fontFamily: string
    scale: number
    baseSize: number
  }
  setTypography: (typography: any) => void
}

const fontOptions = [
  { value: 'system-ui, -apple-system, sans-serif', label: 'System UI' },
  { value: '"SF Pro Display", system-ui, sans-serif', label: 'SF Pro Display' },
  { value: '"Helvetica Neue", Helvetica, Arial, sans-serif', label: 'Helvetica' },
  { value: 'Georgia, "Times New Roman", serif', label: 'Georgia' },
  { value: '"Playfair Display", Georgia, serif', label: 'Playfair Display' },
  { value: '"IBM Plex Sans", system-ui, sans-serif', label: 'IBM Plex Sans' },
  { value: 'ui-monospace, "SF Mono", monospace', label: 'Monospace' },
]

export default function TypographySystem({ typography, setTypography }: TypographySystemProps) {
  const handleChange = (key: string, value: any) => {
    setTypography({ ...typography, [key]: value })
  }

  // Calculate type scale
  const generateScale = () => {
    const sizes = []
    const baseSize = typography.baseSize
    const ratio = typography.scale

    // Generate from h6 to h1
    for (let i = -1; i <= 4; i++) {
      const size = baseSize * Math.pow(ratio, i)
      sizes.push(Math.round(size * 100) / 100)
    }

    return {
      body: sizes[0],
      h6: sizes[1],
      h5: sizes[2],
      h4: sizes[3],
      h3: sizes[4],
      h2: sizes[5],
      h1: sizes[5] * ratio,
    }
  }

  const scale = generateScale()

  const exportCSS = () => {
    const css = `/* Typography System */
:root {
  --font-family: ${typography.fontFamily};
  --font-size-base: ${typography.baseSize}px;
  --font-scale: ${typography.scale};
  
  /* Type Scale */
  --font-size-body: ${scale.body}px;
  --font-size-h6: ${scale.h6}px;
  --font-size-h5: ${scale.h5}px;
  --font-size-h4: ${scale.h4}px;
  --font-size-h3: ${scale.h3}px;
  --font-size-h2: ${scale.h2}px;
  --font-size-h1: ${scale.h1}px;
}

body {
  font-family: var(--font-family);
  font-size: var(--font-size-base);
  line-height: 1.6;
}

h1 { font-size: var(--font-size-h1); line-height: 1.2; font-weight: 700; }
h2 { font-size: var(--font-size-h2); line-height: 1.3; font-weight: 700; }
h3 { font-size: var(--font-size-h3); line-height: 1.4; font-weight: 600; }
h4 { font-size: var(--font-size-h4); line-height: 1.4; font-weight: 600; }
h5 { font-size: var(--font-size-h5); line-height: 1.5; font-weight: 500; }
h6 { font-size: var(--font-size-h6); line-height: 1.5; font-weight: 500; }`

    navigator.clipboard.writeText(css)
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Configuration */}
      <Card className="border-slate-200 shadow-lg shadow-slate-200/50">
        <CardHeader>
          <CardTitle className="text-2xl">Typography Settings</CardTitle>
          <CardDescription>
            Configure your type system
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label>Font Family</Label>
            <Select
              value={typography.fontFamily}
              onValueChange={(value) => handleChange('fontFamily', value)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {fontOptions.map((font) => (
                  <SelectItem key={font.value} value={font.value}>
                    {font.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label>Base Size</Label>
              <span className="text-sm text-slate-600">{typography.baseSize}px</span>
            </div>
            <Slider
              value={[typography.baseSize]}
              onValueChange={([value]) => handleChange('baseSize', value)}
              min={12}
              max={24}
              step={1}
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label>Type Scale Ratio</Label>
              <span className="text-sm text-slate-600">{typography.scale.toFixed(2)}</span>
            </div>
            <Slider
              value={[typography.scale * 100]}
              onValueChange={([value]) => handleChange('scale', value / 100)}
              min={110}
              max={200}
              step={5}
            />
            <div className="flex justify-between text-xs text-slate-500 pt-1">
              <span>Minor Third (1.2)</span>
              <span>Major Third (1.25)</span>
              <span>Golden (1.618)</span>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200">
            <Button onClick={exportCSS} variant="outline" className="w-full gap-2">
              <Download className="h-4 w-4" />
              Copy CSS
            </Button>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <h4 className="text-sm font-medium flex items-center gap-2">
              <Type className="h-4 w-4" />
              Common Ratios
            </h4>
            <div className="space-y-1 text-xs text-slate-600">
              <p><strong>1.125:</strong> Major Second</p>
              <p><strong>1.200:</strong> Minor Third</p>
              <p><strong>1.250:</strong> Major Third</p>
              <p><strong>1.333:</strong> Perfect Fourth</p>
              <p><strong>1.414:</strong> Augmented Fourth</p>
              <p><strong>1.500:</strong> Perfect Fifth</p>
              <p><strong>1.618:</strong> Golden Ratio</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Type Scale Preview */}
      <Card className="lg:col-span-2 border-slate-200 shadow-lg shadow-slate-200/50">
        <CardHeader>
          <CardTitle className="text-2xl">Type Scale</CardTitle>
          <CardDescription>
            Preview your typography hierarchy
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {[
              { level: 'H1', size: scale.h1, weight: '700', sample: 'The quick brown fox jumps' },
              { level: 'H2', size: scale.h2, weight: '700', sample: 'The quick brown fox jumps over' },
              { level: 'H3', size: scale.h3, weight: '600', sample: 'The quick brown fox jumps over the lazy dog' },
              { level: 'H4', size: scale.h4, weight: '600', sample: 'The quick brown fox jumps over the lazy dog' },
              { level: 'H5', size: scale.h5, weight: '500', sample: 'The quick brown fox jumps over the lazy dog and runs away' },
              { level: 'H6', size: scale.h6, weight: '500', sample: 'The quick brown fox jumps over the lazy dog and runs away' },
              { level: 'Body', size: scale.body, weight: '400', sample: 'The quick brown fox jumps over the lazy dog and runs away into the forest' },
            ].map((item, index) => (
              <div
                key={index}
                className="p-6 rounded-2xl border border-slate-200 bg-white hover:border-slate-300 transition-colors"
              >
                <div className="flex items-baseline justify-between mb-3">
                  <div className="flex items-baseline gap-3">
                    <span className="text-xs font-mono text-slate-500 w-12">{item.level}</span>
                    <span className="text-sm text-slate-600 font-mono">
                      {item.size}px
                    </span>
                  </div>
                  <span className="text-xs text-slate-500">
                    Weight: {item.weight}
                  </span>
                </div>
                <p
                  style={{
                    fontFamily: typography.fontFamily,
                    fontSize: `${item.size}px`,
                    fontWeight: item.weight,
                    lineHeight: item.level.startsWith('H') ? '1.3' : '1.6',
                  }}
                  className="text-slate-900"
                >
                  {item.sample}
                </p>
              </div>
            ))}
          </div>

          {/* Font Pairing Example */}
          <div className="mt-8 p-8 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-white">
            <h3
              style={{
                fontFamily: typography.fontFamily,
                fontSize: `${scale.h3}px`,
                fontWeight: '700',
              }}
              className="mb-4"
            >
              Typography in Action
            </h3>
            <p
              style={{
                fontFamily: typography.fontFamily,
                fontSize: `${scale.body}px`,
                lineHeight: '1.7',
              }}
              className="text-slate-200"
            >
              A well-designed type system creates hierarchy, improves readability, and establishes 
              visual rhythm throughout your interface. The scale ratio you choose affects how 
              dramatically your headings differ from body text.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
