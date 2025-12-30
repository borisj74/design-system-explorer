import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { Layers } from 'lucide-react'

interface ShadowProps {
  shadows: {
    intensity: number
  }
  setShadows: (shadows: any) => void
}

export default function Shadow({ shadows, setShadows }: ShadowProps) {
  const handleChange = (value: number) => {
    setShadows({ intensity: value })
  }

  // Generate shadow scale based on intensity
  const generateShadows = () => {
    const i = shadows.intensity / 100

    return {
      xs: {
        name: 'Extra Small',
        css: `0 1px 2px 0 rgba(0, 0, 0, ${0.05 * i})`,
        use: 'Subtle elevation, hover states',
      },
      sm: {
        name: 'Small',
        css: `0 1px 3px 0 rgba(0, 0, 0, ${0.1 * i}), 0 1px 2px -1px rgba(0, 0, 0, ${0.1 * i})`,
        use: 'Buttons, chips, tags',
      },
      md: {
        name: 'Medium',
        css: `0 4px 6px -1px rgba(0, 0, 0, ${0.1 * i}), 0 2px 4px -2px rgba(0, 0, 0, ${0.1 * i})`,
        use: 'Cards, dropdowns',
      },
      lg: {
        name: 'Large',
        css: `0 10px 15px -3px rgba(0, 0, 0, ${0.1 * i}), 0 4px 6px -4px rgba(0, 0, 0, ${0.1 * i})`,
        use: 'Modals, popovers',
      },
      xl: {
        name: 'Extra Large',
        css: `0 20px 25px -5px rgba(0, 0, 0, ${0.1 * i}), 0 8px 10px -6px rgba(0, 0, 0, ${0.1 * i})`,
        use: 'Dialogs, drawers',
      },
      '2xl': {
        name: '2X Large',
        css: `0 25px 50px -12px rgba(0, 0, 0, ${0.25 * i})`,
        use: 'Large modals, overlays',
      },
      inner: {
        name: 'Inner',
        css: `inset 0 2px 4px 0 rgba(0, 0, 0, ${0.06 * i})`,
        use: 'Input fields, wells',
      },
    }
  }

  const shadowScale = generateShadows()

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Configuration */}
      <Card className="border-slate-200 shadow-lg shadow-slate-200/50">
        <CardHeader>
          <CardTitle className="text-2xl">Shadow Settings</CardTitle>
          <CardDescription>
            Configure your elevation system
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label>Shadow Intensity</Label>
              <span className="text-sm text-slate-600">{shadows.intensity}%</span>
            </div>
            <Slider
              value={[shadows.intensity]}
              onValueChange={([value]) => handleChange(value)}
              min={50}
              max={150}
              step={5}
            />
            <p className="text-xs text-slate-500">
              Adjust the overall darkness of shadows
            </p>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <h4 className="text-sm font-medium flex items-center gap-2">
              <Layers className="h-4 w-4" />
              Elevation Levels
            </h4>
            <div className="space-y-1 text-xs text-slate-600">
              <p><strong>XS-SM:</strong> UI elements (buttons, inputs)</p>
              <p><strong>MD-LG:</strong> Floating elements (cards, menus)</p>
              <p><strong>XL-2XL:</strong> Overlays (modals, dialogs)</p>
              <p><strong>Inner:</strong> Recessed elements (inputs)</p>
            </div>
          </div>

          <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
            <p className="text-xs text-blue-900">
              <strong>Tip:</strong> Use consistent shadow elevations to establish visual hierarchy. 
              Elements closer to the user should have larger, softer shadows.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Shadow Scale Visualization */}
      <Card className="lg:col-span-2 border-slate-200 shadow-lg shadow-slate-200/50">
        <CardHeader>
          <CardTitle className="text-2xl">Shadow Scale</CardTitle>
          <CardDescription>
            Visual reference for your elevation system
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Shadow examples grid */}
          <div className="space-y-6">
            {Object.entries(shadowScale).map(([key, value]) => (
              <div key={key} className="space-y-3">
                <div className="flex items-baseline justify-between">
                  <div className="flex items-baseline gap-3">
                    <span className="text-xs font-mono text-slate-500 w-12 uppercase">{key}</span>
                    <span className="text-sm font-semibold text-slate-700">{value.name}</span>
                  </div>
                  <span className="text-xs text-slate-500">{value.use}</span>
                </div>
                <div className="p-8 bg-gradient-to-br from-slate-50 to-white rounded-xl">
                  <div
                    className="w-full h-24 bg-white rounded-xl flex items-center justify-center text-slate-600 text-sm font-medium transition-transform hover:scale-105"
                    style={{ boxShadow: value.css }}
                  >
                    Hover to preview
                  </div>
                </div>
                <div className="pl-12">
                  <code className="text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded font-mono">
                    {value.css}
                  </code>
                </div>
              </div>
            ))}
          </div>

          {/* Real-world examples */}
          <div className="mt-12 pt-8 border-t border-slate-200 space-y-6">
            <h3 className="text-lg font-semibold">Real-World Examples</h3>
            
            {/* Button group */}
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-slate-700">Button States</h4>
              <div className="flex gap-4">
                <button
                  className="px-6 py-3 bg-slate-900 text-white rounded-lg font-medium"
                  style={{ boxShadow: shadowScale.sm.css }}
                >
                  Default
                </button>
                <button
                  className="px-6 py-3 bg-slate-900 text-white rounded-lg font-medium"
                  style={{ boxShadow: shadowScale.md.css }}
                >
                  Hover
                </button>
                <button
                  className="px-6 py-3 bg-slate-900 text-white rounded-lg font-medium"
                  style={{ boxShadow: shadowScale.xs.css }}
                >
                  Active
                </button>
              </div>
            </div>

            {/* Card stack */}
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-slate-700">Card Hierarchy</h4>
              <div className="relative h-48">
                {[
                  { elevation: '2xl', z: 30, y: 0, title: 'Modal' },
                  { elevation: 'lg', z: 20, y: 60, title: 'Popover' },
                  { elevation: 'md', z: 10, y: 120, title: 'Card' },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="absolute left-0 right-0 h-20 bg-white rounded-xl p-4 flex items-center justify-center font-medium text-slate-700"
                    style={{
                      boxShadow: shadowScale[item.elevation as keyof typeof shadowScale].css,
                      zIndex: item.z,
                      top: `${item.y}px`,
                    }}
                  >
                    {item.title}
                  </div>
                ))}
              </div>
            </div>

            {/* Input with inner shadow */}
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-slate-700">Form Elements</h4>
              <input
                type="text"
                placeholder="Input with inner shadow..."
                className="w-full px-4 py-3 bg-white border border-slate-200 rounded-lg outline-none focus:border-slate-400 transition-colors"
                style={{ boxShadow: shadowScale.inner.css }}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
