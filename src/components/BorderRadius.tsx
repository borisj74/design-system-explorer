import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { Circle } from 'lucide-react'

interface BorderRadiusProps {
  borderRadius: {
    base: number
    scale: number
  }
  setBorderRadius: (borderRadius: any) => void
}

export default function BorderRadius({ borderRadius, setBorderRadius }: BorderRadiusProps) {
  const handleChange = (key: string, value: number) => {
    setBorderRadius({ ...borderRadius, [key]: value })
  }

  // Generate border radius scale
  const generateScale = () => {
    const base = borderRadius.base
    const scale = borderRadius.scale
    
    return {
      none: 0,
      sm: Math.round(base * Math.pow(scale, 0)),
      md: Math.round(base * Math.pow(scale, 1)),
      lg: Math.round(base * Math.pow(scale, 2)),
      xl: Math.round(base * Math.pow(scale, 3)),
      '2xl': Math.round(base * Math.pow(scale, 4)),
      '3xl': Math.round(base * Math.pow(scale, 5)),
      full: 9999,
    }
  }

  const radiusScale = generateScale()

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Configuration */}
      <Card className="border-slate-200 shadow-lg shadow-slate-200/50">
        <CardHeader>
          <CardTitle className="text-2xl">Radius Settings</CardTitle>
          <CardDescription>
            Configure your border radius scale
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label>Base Unit</Label>
              <span className="text-sm text-slate-600">{borderRadius.base}px</span>
            </div>
            <Slider
              value={[borderRadius.base]}
              onValueChange={([value]) => handleChange('base', value)}
              min={2}
              max={16}
              step={1}
            />
            <p className="text-xs text-slate-500">
              The smallest border radius in your system
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label>Scale Multiplier</Label>
              <span className="text-sm text-slate-600">{borderRadius.scale.toFixed(2)}</span>
            </div>
            <Slider
              value={[borderRadius.scale * 100]}
              onValueChange={([value]) => handleChange('scale', value / 100)}
              min={120}
              max={250}
              step={5}
            />
            <p className="text-xs text-slate-500">
              How quickly radius increases between steps
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <h4 className="text-sm font-medium flex items-center gap-2">
              <Circle className="h-4 w-4" />
              Common Patterns
            </h4>
            <div className="space-y-1 text-xs text-slate-600">
              <p><strong>4px base:</strong> Sharp, modern aesthetic</p>
              <p><strong>8px base:</strong> Balanced, friendly feel</p>
              <p><strong>12px base:</strong> Soft, approachable</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Border Radius Scale Visualization */}
      <Card className="lg:col-span-2 border-slate-200 shadow-lg shadow-slate-200/50">
        <CardHeader>
          <CardTitle className="text-2xl">Border Radius Scale</CardTitle>
          <CardDescription>
            Visual reference for your corner radius system
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Scale preview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(radiusScale)
              .filter(([key]) => key !== 'none')
              .map(([key, value]) => (
                <div key={key} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-slate-500 uppercase">{key}</span>
                    <span className="text-sm font-mono text-slate-700">
                      {value === 9999 ? '∞' : `${value}px`}
                    </span>
                  </div>
                  <div
                    className="w-full h-24 bg-gradient-to-br from-slate-900 to-slate-700 shadow-lg transition-all duration-200 hover:scale-105"
                    style={{
                      borderRadius: value === 9999 ? '9999px' : `${value}px`,
                    }}
                  />
                </div>
              ))}
          </div>

          {/* Usage Examples */}
          <div className="mt-8 space-y-6">
            <h3 className="text-lg font-semibold">Usage Examples</h3>
            
            {/* Button Examples */}
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-slate-700">Button Styles</h4>
              <div className="flex flex-wrap gap-3">
                {['sm', 'md', 'lg', 'xl', 'full'].map((size) => (
                  <button
                    key={size}
                    className="px-6 py-3 bg-slate-900 text-white font-medium hover:bg-slate-800 transition-colors"
                    style={{
                      borderRadius: `${radiusScale[size as keyof typeof radiusScale]}px`,
                    }}
                  >
                    {size.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            {/* Card Examples */}
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-slate-700">Card Components</h4>
              <div className="grid grid-cols-3 gap-4">
                {['sm', 'lg', '2xl'].map((size) => (
                  <div
                    key={size}
                    className="p-4 bg-white border border-slate-200 shadow-sm"
                    style={{
                      borderRadius: `${radiusScale[size as keyof typeof radiusScale]}px`,
                    }}
                  >
                    <div className="w-full h-16 bg-slate-100 mb-3" style={{
                      borderRadius: `${Math.max(0, radiusScale[size as keyof typeof radiusScale] - 4)}px`,
                    }} />
                    <div className="space-y-2">
                      <div className="h-2 bg-slate-200 rounded" />
                      <div className="h-2 bg-slate-200 rounded w-2/3" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Avatar Examples */}
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-slate-700">Avatar Sizes</h4>
              <div className="flex items-end gap-4">
                {[
                  { size: 32, radius: 'sm' },
                  { size: 48, radius: 'md' },
                  { size: 64, radius: 'lg' },
                  { size: 80, radius: 'full' },
                ].map(({ size, radius }) => (
                  <div key={size} className="text-center space-y-2">
                    <div
                      className="bg-gradient-to-br from-amber-400 to-orange-500 mx-auto"
                      style={{
                        width: `${size}px`,
                        height: `${size}px`,
                        borderRadius: `${radiusScale[radius as keyof typeof radiusScale]}px`,
                      }}
                    />
                    <p className="text-xs text-slate-500">{radius}</p>
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
