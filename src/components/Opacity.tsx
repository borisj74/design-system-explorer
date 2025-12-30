import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Eye } from 'lucide-react'

interface OpacityProps {
  opacity: {
    values: number[]
  }
  setOpacity: (opacity: any) => void
}

export default function Opacity({ opacity, setOpacity }: OpacityProps) {
  // Standard opacity scale
  const opacityScale = {
    0: 0,
    5: 0.05,
    10: 0.10,
    20: 0.20,
    30: 0.30,
    40: 0.40,
    50: 0.50,
    60: 0.60,
    70: 0.70,
    80: 0.80,
    90: 0.90,
    95: 0.95,
    100: 1.00,
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Information */}
      <Card className="border-slate-200 shadow-lg shadow-slate-200/50">
        <CardHeader>
          <CardTitle className="text-2xl">Opacity Scale</CardTitle>
          <CardDescription>
            Standard transparency values
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <h4 className="text-sm font-medium flex items-center gap-2">
              <Eye className="h-4 w-4" />
              Common Use Cases
            </h4>
            <div className="space-y-2 text-xs text-slate-600">
              <p><strong>5-10%:</strong> Subtle backgrounds, hover states</p>
              <p><strong>20-30%:</strong> Disabled states, placeholders</p>
              <p><strong>40-60%:</strong> Overlays, glass morphism</p>
              <p><strong>70-90%:</strong> Semi-transparent UI elements</p>
              <p><strong>95-100%:</strong> Nearly opaque to fully opaque</p>
            </div>
          </div>

          <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
            <p className="text-xs text-blue-900">
              <strong>Best Practice:</strong> Use opacity for layering and hierarchy. 
              Combine with color to create depth without adding new colors to your palette.
            </p>
          </div>

          <div className="p-4 bg-amber-50 rounded-xl border border-amber-200">
            <p className="text-xs text-amber-900">
              <strong>Accessibility Note:</strong> Avoid using opacity for text below 60%. 
              Low-opacity text can fail WCAG contrast requirements.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Opacity Scale Visualization */}
      <Card className="lg:col-span-2 border-slate-200 shadow-lg shadow-slate-200/50">
        <CardHeader>
          <CardTitle className="text-2xl">Opacity Reference</CardTitle>
          <CardDescription>
            Visual guide for transparency levels
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Opacity swatches on dark */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-slate-700">On Dark Background</h4>
            <div className="p-8 bg-slate-900 rounded-2xl">
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {Object.entries(opacityScale).map(([key, value]) => (
                  <div key={key} className="space-y-2">
                    <div
                      className="w-full h-20 bg-white rounded-lg border border-white/20"
                      style={{ opacity: value }}
                    />
                    <div className="text-center">
                      <p className="text-xs font-mono text-white font-medium">{key}%</p>
                      <p className="text-xs font-mono text-slate-400">{value.toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Opacity swatches on light */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-slate-700">On Light Background</h4>
            <div className="p-8 bg-slate-50 rounded-2xl border border-slate-200">
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {Object.entries(opacityScale).map(([key, value]) => (
                  <div key={key} className="space-y-2">
                    <div
                      className="w-full h-20 bg-slate-900 rounded-lg"
                      style={{ opacity: value }}
                    />
                    <div className="text-center">
                      <p className="text-xs font-mono text-slate-900 font-medium">{key}%</p>
                      <p className="text-xs font-mono text-slate-500">{value.toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Real-world examples */}
          <div className="mt-8 space-y-6">
            <h3 className="text-lg font-semibold">Practical Examples</h3>
            
            {/* Overlay example */}
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-slate-700">Modal Overlays</h4>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { opacity: 40, label: 'Light (40%)' },
                  { opacity: 60, label: 'Medium (60%)' },
                  { opacity: 80, label: 'Dark (80%)' },
                ].map((item) => (
                  <div key={item.opacity} className="relative h-32 bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl overflow-hidden">
                    <div
                      className="absolute inset-0 bg-black flex items-center justify-center"
                      style={{ opacity: item.opacity / 100 }}
                    >
                      <span className="text-white font-medium text-sm">{item.label}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Glass morphism example */}
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-slate-700">Glass Morphism</h4>
              <div className="relative h-48 bg-gradient-to-br from-pink-400 via-purple-400 to-blue-400 rounded-2xl overflow-hidden p-8">
                <div className="absolute inset-8 bg-white/20 backdrop-blur-lg rounded-xl border border-white/30 p-6 flex flex-col justify-center">
                  <h5 className="text-white font-bold text-xl mb-2">Glass Card</h5>
                  <p className="text-white/90 text-sm">
                    Combining opacity with backdrop blur creates the popular glass morphism effect.
                  </p>
                </div>
              </div>
            </div>

            {/* Disabled states */}
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-slate-700">Disabled States</h4>
              <div className="flex gap-4">
                <button className="px-6 py-3 bg-slate-900 text-white rounded-lg font-medium">
                  Enabled
                </button>
                <button
                  className="px-6 py-3 bg-slate-900 text-white rounded-lg font-medium cursor-not-allowed"
                  style={{ opacity: 0.4 }}
                  disabled
                >
                  Disabled (40%)
                </button>
                <button
                  className="px-6 py-3 bg-slate-900 text-white rounded-lg font-medium cursor-not-allowed"
                  style={{ opacity: 0.3 }}
                  disabled
                >
                  Disabled (30%)
                </button>
              </div>
            </div>

            {/* Layered UI */}
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-slate-700">Layered UI Elements</h4>
              <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6">
                <div className="space-y-3">
                  {[
                    { text: 'Primary Content', opacity: 100 },
                    { text: 'Secondary Content', opacity: 80 },
                    { text: 'Tertiary Content', opacity: 60 },
                    { text: 'Background Content', opacity: 40 },
                  ].map((item) => (
                    <div
                      key={item.text}
                      className="p-4 bg-white rounded-lg"
                      style={{ opacity: item.opacity / 100 }}
                    >
                      <p className="text-slate-900 font-medium">{item.text}</p>
                      <p className="text-slate-600 text-sm">Opacity: {item.opacity}%</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
