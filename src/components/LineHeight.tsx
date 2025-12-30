import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { AlignJustify } from 'lucide-react'

interface LineHeightProps {
  typography: {
    fontFamily: string
    scale: number
    baseSize: number
  }
  lineHeight: {
    tight: number
    normal: number
    relaxed: number
  }
  setLineHeight: (lineHeight: any) => void
}

export default function LineHeight({ typography, lineHeight, setLineHeight }: LineHeightProps) {
  const handleChange = (key: string, value: number) => {
    setLineHeight({ ...lineHeight, [key]: value })
  }

  // Calculate font sizes from typography
  const typeSizes = {
    body: typography.baseSize * Math.pow(typography.scale, -1),
    h6: typography.baseSize * Math.pow(typography.scale, 0),
    h5: typography.baseSize * Math.pow(typography.scale, 1),
    h4: typography.baseSize * Math.pow(typography.scale, 2),
    h3: typography.baseSize * Math.pow(typography.scale, 3),
    h2: typography.baseSize * Math.pow(typography.scale, 4),
    h1: typography.baseSize * Math.pow(typography.scale, 5),
  }

  // Generate line height recommendations
  const lineHeightScale = {
    tight: {
      value: lineHeight.tight,
      use: 'Headlines, large text',
      recommendation: '1.0 - 1.3',
    },
    normal: {
      value: lineHeight.normal,
      use: 'UI elements, short text',
      recommendation: '1.4 - 1.6',
    },
    relaxed: {
      value: lineHeight.relaxed,
      use: 'Body copy, paragraphs',
      recommendation: '1.6 - 2.0',
    },
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Configuration */}
      <Card className="border-slate-200 shadow-lg shadow-slate-200/50">
        <CardHeader>
          <CardTitle className="text-2xl">Line Height Settings</CardTitle>
          <CardDescription>
            Configure your line height scale
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            {Object.entries(lineHeightScale).map(([key, data]) => (
              <div key={key} className="space-y-2">
                <div className="flex justify-between">
                  <Label className="capitalize">{key}</Label>
                  <span className="text-sm text-slate-600">{data.value}</span>
                </div>
                <Slider
                  value={[data.value * 100]}
                  onValueChange={([value]) => handleChange(key, value / 100)}
                  min={100}
                  max={250}
                  step={5}
                />
                <div className="flex justify-between text-xs text-slate-500">
                  <span>{data.use}</span>
                  <span>{data.recommendation}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <h4 className="text-sm font-medium flex items-center gap-2">
              <AlignJustify className="h-4 w-4" />
              Guidelines
            </h4>
            <div className="space-y-2 text-xs text-slate-600">
              <p><strong>Tight (1.0-1.3):</strong> Display text, headlines - maximizes impact</p>
              <p><strong>Normal (1.4-1.6):</strong> UI text, buttons - balances space</p>
              <p><strong>Relaxed (1.6-2.0):</strong> Body text - optimizes readability</p>
            </div>
          </div>

          <div className="p-4 bg-blue-50 rounded-xl border border-blue-200">
            <p className="text-xs text-blue-900">
              <strong>Formula:</strong> Line height = font size × multiplier. 
              Example: 16px × 1.5 = 24px line height.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Line Height Visualization */}
      <Card className="lg:col-span-2 border-slate-200 shadow-lg shadow-slate-200/50">
        <CardHeader>
          <CardTitle className="text-2xl">Line Height Scale</CardTitle>
          <CardDescription>
            Visual comparison of line height settings
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Comparison grid */}
          <div className="space-y-6">
            {Object.entries(lineHeightScale).map(([key, data]) => (
              <div key={key} className="space-y-3">
                <div className="flex items-baseline justify-between">
                  <div className="flex items-baseline gap-3">
                    <span className="text-xs font-mono text-slate-500 w-20 uppercase">{key}</span>
                    <span className="text-sm font-semibold text-slate-700">{data.value}</span>
                  </div>
                  <span className="text-xs text-slate-500">{data.use}</span>
                </div>
                <div className="p-6 bg-slate-50 rounded-xl border border-slate-200">
                  <p
                    className="text-slate-900"
                    style={{
                      fontSize: `${typography.baseSize}px`,
                      lineHeight: data.value,
                      fontFamily: typography.fontFamily,
                    }}
                  >
                    The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs. 
                    How vexingly quick daft zebras jump! The five boxing wizards jump quickly.
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Typography hierarchy with line heights */}
          <div className="mt-12 pt-8 border-t border-slate-200 space-y-6">
            <h3 className="text-lg font-semibold">Applied to Type Scale</h3>
            
            <div className="space-y-6">
              {[
                { level: 'H1', size: typeSizes.h1, lineHeight: lineHeight.tight, desc: 'Main headline' },
                { level: 'H2', size: typeSizes.h2, lineHeight: lineHeight.tight, desc: 'Section headline' },
                { level: 'H3', size: typeSizes.h3, lineHeight: lineHeight.normal, desc: 'Subsection headline' },
                { level: 'H4', size: typeSizes.h4, lineHeight: lineHeight.normal, desc: 'Card title' },
                { level: 'Body', size: typeSizes.body, lineHeight: lineHeight.relaxed, desc: 'Paragraph text' },
              ].map((item) => (
                <div key={item.level} className="p-6 bg-white rounded-xl border border-slate-200">
                  <div className="flex items-baseline justify-between mb-4">
                    <div className="flex items-baseline gap-3">
                      <span className="text-xs font-mono text-slate-500">{item.level}</span>
                      <span className="text-xs text-slate-600">
                        {item.size.toFixed(0)}px × {item.lineHeight} = {(item.size * item.lineHeight).toFixed(0)}px
                      </span>
                    </div>
                    <span className="text-xs text-slate-500">{item.desc}</span>
                  </div>
                  <p
                    style={{
                      fontSize: `${item.size}px`,
                      lineHeight: item.lineHeight,
                      fontFamily: typography.fontFamily,
                    }}
                    className="text-slate-900"
                  >
                    {item.level === 'Body' 
                      ? 'The quick brown fox jumps over the lazy dog. Typography is the art and technique of arranging type to make written language legible, readable, and appealing. Good line height improves readability significantly.'
                      : 'The Quick Brown Fox Jumps Over the Lazy Dog'
                    }
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Real-world example */}
          <div className="mt-8 space-y-4">
            <h3 className="text-lg font-semibold">Article Layout Example</h3>
            <div className="p-8 bg-white rounded-xl border border-slate-200 max-w-2xl">
              <h1
                style={{
                  fontSize: `${typeSizes.h2}px`,
                  lineHeight: lineHeight.tight,
                  fontFamily: typography.fontFamily,
                }}
                className="font-bold text-slate-900 mb-2"
              >
                The Power of Line Height
              </h1>
              <p
                style={{
                  fontSize: `${typeSizes.body}px`,
                  lineHeight: lineHeight.normal,
                  fontFamily: typography.fontFamily,
                }}
                className="text-slate-600 mb-6"
              >
                Understanding typography fundamentals • 5 min read
              </p>
              <p
                style={{
                  fontSize: `${typeSizes.body}px`,
                  lineHeight: lineHeight.relaxed,
                  fontFamily: typography.fontFamily,
                }}
                className="text-slate-700 mb-4"
              >
                Line height, also known as leading, is one of the most important factors in typography. 
                It dramatically affects readability and the overall feel of your design. Too tight, 
                and text becomes cramped and difficult to read. Too loose, and lines lose their 
                connection, making the reader work harder to follow along.
              </p>
              <p
                style={{
                  fontSize: `${typeSizes.body}px`,
                  lineHeight: lineHeight.relaxed,
                  fontFamily: typography.fontFamily,
                }}
                className="text-slate-700"
              >
                The ideal line height depends on context. Headlines can be tighter since they're 
                meant to grab attention. Body text needs more breathing room for comfortable reading. 
                Finding the right balance creates a harmonious rhythm that guides readers through your content.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
