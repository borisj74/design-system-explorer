import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Progress } from '@/components/ui/progress'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Textarea } from '@/components/ui/textarea'
import { Separator } from '@/components/ui/separator'
import { Search } from 'lucide-react'

interface ComponentPreviewProps {
  colors: Record<string, string>
  typography: {
    fontFamily: string
    scale: number
    baseSize: number
  }
  spacing: {
    base: number
    scale: number
  }
  borderRadius: {
    base: number
    scale: number
  }
  shadows: {
    intensity: number
  }
  opacity: {
    values: number[]
  }
  lineHeight: {
    tight: number
    normal: number
    relaxed: number
  }
}

export default function ComponentPreview({ colors, typography, spacing, borderRadius, shadows, opacity, lineHeight }: ComponentPreviewProps) {
  // Helper to get color with fallback
  const getColor = (key: string, fallback: string) => colors[key] || fallback

  // Get all color values as an array
  const colorValues = Object.values(colors)
  const colorEntries = Object.entries(colors)

  // Safety check - if no colors, use defaults
  if (colorValues.length === 0) {
    return (
      <div className="space-y-4">
        <Card className="border-slate-200 shadow-lg shadow-slate-200/50">
          <CardHeader className="pb-3">
            <CardTitle className="text-xl">Live Preview</CardTitle>
            <CardDescription>
              Add some colors to see your design system in action
            </CardDescription>
          </CardHeader>
          <CardContent className="py-12 text-center text-slate-500">
            <p>No colors defined. Add colors in the Colors tab to see the preview.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Get primary colors with fallbacks
  const primaryColor = colorValues[0] || '#0F172A'
  const secondaryColor = colorValues[1] || '#64748B'
  const accentColor = colorValues[2] || '#F59E0B'
  const backgroundColor = getColor('background', '#FFFFFF')
  const foregroundColor = getColor('foreground', '#0F172A')

  // Helper to get color by index (cycles through all colors)
  const getColorByIndex = (index: number) => colorValues[index % colorValues.length]

  // Calculate spacing values
  const sp = {
    xs: spacing.base * Math.pow(spacing.scale, 0),
    sm: spacing.base * Math.pow(spacing.scale, 1),
    md: spacing.base * Math.pow(spacing.scale, 2),
    lg: spacing.base * Math.pow(spacing.scale, 3),
    xl: spacing.base * Math.pow(spacing.scale, 4),
  }

  // Calculate border radius values
  const radius = {
    sm: borderRadius.base * Math.pow(borderRadius.scale, 0),
    md: borderRadius.base * Math.pow(borderRadius.scale, 1),
    lg: borderRadius.base * Math.pow(borderRadius.scale, 2),
    xl: borderRadius.base * Math.pow(borderRadius.scale, 3),
  }

  // Calculate shadow values based on intensity
  const intensity = shadows.intensity / 100
  const shadow = {
    sm: `0 1px 2px 0 rgba(0, 0, 0, ${0.05 * intensity})`,
    md: `0 4px 6px -1px rgba(0, 0, 0, ${0.1 * intensity}), 0 2px 4px -1px rgba(0, 0, 0, ${0.06 * intensity})`,
    lg: `0 10px 15px -3px rgba(0, 0, 0, ${0.1 * intensity}), 0 4px 6px -2px rgba(0, 0, 0, ${0.05 * intensity})`,
    xl: `0 20px 25px -5px rgba(0, 0, 0, ${0.1 * intensity}), 0 10px 10px -5px rgba(0, 0, 0, ${0.04 * intensity})`,
  }

  // Calculate typography values
  const fontSize = {
    xs: typography.baseSize * 0.75,
    sm: typography.baseSize * 0.875,
    base: typography.baseSize,
    lg: typography.baseSize * typography.scale,
    xl: typography.baseSize * Math.pow(typography.scale, 2),
    '2xl': typography.baseSize * Math.pow(typography.scale, 3),
  }

  return (
    <div className="space-y-4">
      <Card className="border-slate-200 shadow-lg shadow-slate-200/50">
        <CardHeader className="pb-3">
          <CardTitle className="text-xl">Live Preview</CardTitle>
          <CardDescription>
            See your design system in action
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Charts Section */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base" style={{ fontFamily: typography.fontFamily }}>Charts</CardTitle>
              <CardDescription>Various chart types using your color palette</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Line Chart */}
                <div className="p-4 border rounded-lg">
                  <h4 className="text-sm font-medium mb-3" style={{ fontFamily: typography.fontFamily }}>Line Chart</h4>
                  <svg viewBox="0 0 200 100" className="w-full h-24">
                    {/* Grid lines */}
                    {[0, 25, 50, 75, 100].map((y) => (
                      <line key={y} x1="0" y1={y} x2="200" y2={y} stroke="#e2e8f0" strokeWidth="0.5" />
                    ))}
                    {/* Line 1 */}
                    <polyline
                      fill="none"
                      stroke={primaryColor}
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      points="0,70 33,50 66,60 100,30 133,45 166,25 200,35"
                    />
                    {/* Line 2 */}
                    <polyline
                      fill="none"
                      stroke={secondaryColor}
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      points="0,80 33,70 66,75 100,55 133,65 166,50 200,60"
                    />
                    {/* Line 3 */}
                    <polyline
                      fill="none"
                      stroke={accentColor}
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      points="0,90 33,85 66,80 100,70 133,75 166,65 200,70"
                    />
                    {/* Data points */}
                    {[0, 33, 66, 100, 133, 166, 200].map((x, i) => (
                      <circle key={i} cx={x} cy={[70, 50, 60, 30, 45, 25, 35][i]} r="3" fill={primaryColor} />
                    ))}
                  </svg>
                  <div className="flex justify-center gap-4 mt-2">
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-0.5" style={{ backgroundColor: primaryColor }} />
                      <span className="text-xs text-muted-foreground">Revenue</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-0.5" style={{ backgroundColor: secondaryColor }} />
                      <span className="text-xs text-muted-foreground">Costs</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-0.5" style={{ backgroundColor: accentColor }} />
                      <span className="text-xs text-muted-foreground">Profit</span>
                    </div>
                  </div>
                </div>

                {/* Area Chart */}
                <div className="p-4 border rounded-lg">
                  <h4 className="text-sm font-medium mb-3" style={{ fontFamily: typography.fontFamily }}>Area Chart</h4>
                  <svg viewBox="0 0 200 100" className="w-full h-24">
                    <defs>
                      <linearGradient id="areaGradient1" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" style={{ stopColor: primaryColor, stopOpacity: 0.4 }} />
                        <stop offset="100%" style={{ stopColor: primaryColor, stopOpacity: 0.05 }} />
                      </linearGradient>
                      <linearGradient id="areaGradient2" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" style={{ stopColor: accentColor, stopOpacity: 0.4 }} />
                        <stop offset="100%" style={{ stopColor: accentColor, stopOpacity: 0.05 }} />
                      </linearGradient>
                    </defs>
                    {/* Area 1 */}
                    <path
                      d="M0,60 Q25,40 50,50 T100,35 T150,45 T200,30 L200,100 L0,100 Z"
                      fill="url(#areaGradient1)"
                    />
                    <path
                      d="M0,60 Q25,40 50,50 T100,35 T150,45 T200,30"
                      fill="none"
                      stroke={primaryColor}
                      strokeWidth="2"
                    />
                    {/* Area 2 */}
                    <path
                      d="M0,75 Q25,65 50,70 T100,55 T150,65 T200,50 L200,100 L0,100 Z"
                      fill="url(#areaGradient2)"
                    />
                    <path
                      d="M0,75 Q25,65 50,70 T100,55 T150,65 T200,50"
                      fill="none"
                      stroke={accentColor}
                      strokeWidth="2"
                    />
                  </svg>
                  <div className="flex justify-center gap-4 mt-2">
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: primaryColor + '60' }} />
                      <span className="text-xs text-muted-foreground">Sales</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: accentColor + '60' }} />
                      <span className="text-xs text-muted-foreground">Orders</span>
                    </div>
                  </div>
                </div>

                {/* Bar Chart (Vertical) */}
                <div className="p-4 border rounded-lg">
                  <h4 className="text-sm font-medium mb-3" style={{ fontFamily: typography.fontFamily }}>Bar Chart</h4>
                  <svg viewBox="0 0 200 100" className="w-full h-24">
                    {/* Grid lines */}
                    {[25, 50, 75, 100].map((y) => (
                      <line key={y} x1="0" y1={y} x2="200" y2={y} stroke="#e2e8f0" strokeWidth="0.5" />
                    ))}
                    {/* Bars */}
                    {[
                      { x: 10, h1: 60, h2: 45, h3: 30 },
                      { x: 50, h1: 75, h2: 55, h3: 40 },
                      { x: 90, h1: 50, h2: 70, h3: 35 },
                      { x: 130, h1: 85, h2: 60, h3: 50 },
                      { x: 170, h1: 65, h2: 80, h3: 45 },
                    ].map((bar, i) => (
                      <g key={i}>
                        <rect x={bar.x} y={100 - bar.h1} width="10" height={bar.h1} fill={primaryColor} rx="2" />
                        <rect x={bar.x + 12} y={100 - bar.h2} width="10" height={bar.h2} fill={secondaryColor} rx="2" />
                        <rect x={bar.x + 24} y={100 - bar.h3} width="10" height={bar.h3} fill={accentColor} rx="2" />
                      </g>
                    ))}
                  </svg>
                  <div className="flex justify-center gap-3 mt-2">
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-3 rounded-sm" style={{ backgroundColor: primaryColor }} />
                      <span className="text-xs text-muted-foreground">Q1</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-3 rounded-sm" style={{ backgroundColor: secondaryColor }} />
                      <span className="text-xs text-muted-foreground">Q2</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-3 rounded-sm" style={{ backgroundColor: accentColor }} />
                      <span className="text-xs text-muted-foreground">Q3</span>
                    </div>
                  </div>
                </div>

                {/* Pie Chart */}
                <div className="p-4 border rounded-lg">
                  <h4 className="text-sm font-medium mb-3" style={{ fontFamily: typography.fontFamily }}>Pie Chart</h4>
                  <div className="flex items-center justify-center">
                    <svg viewBox="0 0 100 100" className="w-24 h-24">
                      {colorValues.slice(0, Math.min(colorValues.length, 5)).map((color, index) => {
                        const total = Math.min(colorValues.length, 5)
                        const segmentAngle = 360 / total
                        const startAngle = index * segmentAngle - 90
                        const endAngle = startAngle + segmentAngle
                        const startRad = (startAngle * Math.PI) / 180
                        const endRad = (endAngle * Math.PI) / 180
                        const x1 = 50 + 40 * Math.cos(startRad)
                        const y1 = 50 + 40 * Math.sin(startRad)
                        const x2 = 50 + 40 * Math.cos(endRad)
                        const y2 = 50 + 40 * Math.sin(endRad)
                        const largeArc = segmentAngle > 180 ? 1 : 0
                        return (
                          <path
                            key={index}
                            d={`M 50 50 L ${x1} ${y1} A 40 40 0 ${largeArc} 1 ${x2} ${y2} Z`}
                            fill={color}
                            stroke="white"
                            strokeWidth="1"
                          />
                        )
                      })}
                    </svg>
                  </div>
                  <div className="flex flex-wrap justify-center gap-2 mt-2">
                    {colorEntries.slice(0, Math.min(colorEntries.length, 5)).map(([name, color], idx) => (
                      <div key={idx} className="flex items-center gap-1">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
                        <span className="text-xs text-muted-foreground">{name}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Radar Chart */}
                <div className="p-4 border rounded-lg">
                  <h4 className="text-sm font-medium mb-3" style={{ fontFamily: typography.fontFamily }}>Radar Chart</h4>
                  <svg viewBox="0 0 200 200" className="w-full h-32">
                    {/* Background polygons */}
                    {[80, 60, 40, 20].map((r, i) => {
                      const points = [0, 1, 2, 3, 4, 5].map((j) => {
                        const angle = (j * 60 - 90) * (Math.PI / 180)
                        return `${100 + r * Math.cos(angle)},${100 + r * Math.sin(angle)}`
                      }).join(' ')
                      return (
                        <polygon
                          key={i}
                          points={points}
                          fill="none"
                          stroke="#e2e8f0"
                          strokeWidth="1"
                        />
                      )
                    })}
                    {/* Axis lines */}
                    {[0, 1, 2, 3, 4, 5].map((i) => {
                      const angle = (i * 60 - 90) * (Math.PI / 180)
                      return (
                        <line
                          key={i}
                          x1="100"
                          y1="100"
                          x2={100 + 80 * Math.cos(angle)}
                          y2={100 + 80 * Math.sin(angle)}
                          stroke="#e2e8f0"
                          strokeWidth="1"
                        />
                      )
                    })}
                    {/* Data polygon 1 */}
                    <polygon
                      points={[70, 55, 65, 50, 60, 75].map((r, i) => {
                        const angle = (i * 60 - 90) * (Math.PI / 180)
                        return `${100 + r * Math.cos(angle)},${100 + r * Math.sin(angle)}`
                      }).join(' ')}
                      fill={primaryColor + '30'}
                      stroke={primaryColor}
                      strokeWidth="2"
                    />
                    {/* Data polygon 2 */}
                    <polygon
                      points={[50, 70, 45, 65, 55, 40].map((r, i) => {
                        const angle = (i * 60 - 90) * (Math.PI / 180)
                        return `${100 + r * Math.cos(angle)},${100 + r * Math.sin(angle)}`
                      }).join(' ')}
                      fill={accentColor + '30'}
                      stroke={accentColor}
                      strokeWidth="2"
                    />
                    {/* Data points */}
                    {[70, 55, 65, 50, 60, 75].map((r, i) => {
                      const angle = (i * 60 - 90) * (Math.PI / 180)
                      return (
                        <circle
                          key={i}
                          cx={100 + r * Math.cos(angle)}
                          cy={100 + r * Math.sin(angle)}
                          r="3"
                          fill={primaryColor}
                        />
                      )
                    })}
                  </svg>
                  <div className="flex justify-center gap-4 mt-1">
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: primaryColor + '60' }} />
                      <span className="text-xs text-muted-foreground">Team A</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: accentColor + '60' }} />
                      <span className="text-xs text-muted-foreground">Team B</span>
                    </div>
                  </div>
                </div>

                {/* Horizontal Bar Chart */}
                <div className="p-4 border rounded-lg">
                  <h4 className="text-sm font-medium mb-3" style={{ fontFamily: typography.fontFamily }}>Horizontal Bars</h4>
                  <div className="space-y-2">
                    {[
                      { label: 'Product A', value: 85 },
                      { label: 'Product B', value: 65 },
                      { label: 'Product C', value: 45 },
                      { label: 'Product D', value: 75 },
                    ].map((item, idx) => (
                      <div key={idx} className="space-y-1">
                        <div className="flex justify-between text-xs">
                          <span style={{ fontFamily: typography.fontFamily }}>{item.label}</span>
                          <span className="text-muted-foreground">{item.value}%</span>
                        </div>
                        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all"
                            style={{
                              width: `${item.value}%`,
                              backgroundColor: getColorByIndex(idx),
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Button Variations using shadcn Button */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base" style={{ fontFamily: typography.fontFamily }}>Buttons</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 gap-3">
                <div className="space-y-2">
                  <h4 className="text-sm font-medium" style={{ fontFamily: typography.fontFamily }}>Primary</h4>
                  <Button className="w-full" style={{ backgroundColor: primaryColor, color: backgroundColor }}>Default</Button>
                  <Button className="w-full opacity-90" style={{ backgroundColor: primaryColor, color: backgroundColor }}>Hover</Button>
                  <Button className="w-full opacity-80" style={{ backgroundColor: primaryColor, color: backgroundColor }}>Active</Button>
                  <Button disabled className="w-full" style={{ backgroundColor: primaryColor, color: backgroundColor }}>Disabled</Button>
                </div>
                <div className="space-y-2">
                  <h4 className="text-sm font-medium" style={{ fontFamily: typography.fontFamily }}>Secondary</h4>
                  <Button variant="secondary" className="w-full" style={{ backgroundColor: secondaryColor + '20', color: secondaryColor }}>Default</Button>
                  <Button variant="secondary" className="w-full" style={{ backgroundColor: secondaryColor + '30', color: secondaryColor }}>Hover</Button>
                  <Button variant="secondary" className="w-full" style={{ backgroundColor: secondaryColor + '40', color: secondaryColor }}>Active</Button>
                  <Button variant="secondary" disabled className="w-full" style={{ backgroundColor: secondaryColor + '20', color: secondaryColor }}>Disabled</Button>
                </div>
                <div className="space-y-2">
                  <h4 className="text-sm font-medium" style={{ fontFamily: typography.fontFamily }}>Outline</h4>
                  <Button variant="outline" className="w-full" style={{ borderColor: primaryColor, color: primaryColor }}>Default</Button>
                  <Button variant="outline" className="w-full" style={{ borderColor: primaryColor, color: primaryColor, backgroundColor: primaryColor + '10' }}>Hover</Button>
                  <Button variant="outline" className="w-full" style={{ borderColor: primaryColor, color: primaryColor, backgroundColor: primaryColor + '20' }}>Active</Button>
                  <Button variant="outline" disabled className="w-full" style={{ borderColor: primaryColor, color: primaryColor }}>Disabled</Button>
                </div>
                <div className="space-y-2">
                  <h4 className="text-sm font-medium" style={{ fontFamily: typography.fontFamily }}>Accent</h4>
                  <Button className="w-full" style={{ backgroundColor: accentColor, color: foregroundColor }}>Default</Button>
                  <Button className="w-full opacity-90" style={{ backgroundColor: accentColor, color: foregroundColor }}>Hover</Button>
                  <Button className="w-full opacity-80" style={{ backgroundColor: accentColor, color: foregroundColor }}>Active</Button>
                  <Button disabled className="w-full" style={{ backgroundColor: accentColor, color: foregroundColor }}>Disabled</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Form and Navigation Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Payment Method Form */}
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-base" style={{ fontFamily: typography.fontFamily }}>Payment Method</CardTitle>
                <CardDescription>All transactions are secure and encrypted</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Name on Card */}
                <div className="space-y-2">
                  <Label htmlFor="name" style={{ fontFamily: typography.fontFamily }}>Name on Card</Label>
                  <Input id="name" placeholder="John Doe" />
                </div>

                {/* Card Number and CVV */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="col-span-2 space-y-2">
                    <Label htmlFor="cardNumber" style={{ fontFamily: typography.fontFamily }}>Card Number</Label>
                    <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                    <p className="text-xs text-muted-foreground">Enter your 16-digit number.</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvv" style={{ fontFamily: typography.fontFamily }}>CVV</Label>
                    <Input id="cvv" placeholder="123" />
                  </div>
                </div>

                {/* Month and Year */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <Label style={{ fontFamily: typography.fontFamily }}>Month</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="MM" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 12 }, (_, i) => (
                          <SelectItem key={i + 1} value={String(i + 1).padStart(2, '0')}>
                            {String(i + 1).padStart(2, '0')}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label style={{ fontFamily: typography.fontFamily }}>Year</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="YYYY" />
                      </SelectTrigger>
                      <SelectContent>
                        {Array.from({ length: 10 }, (_, i) => (
                          <SelectItem key={i} value={String(2024 + i)}>
                            {2024 + i}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Separator />

                {/* Billing Address */}
                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium" style={{ fontFamily: typography.fontFamily }}>Billing Address</h4>
                    <p className="text-sm text-muted-foreground">The billing address associated with your payment method</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="sameAddress" defaultChecked />
                    <Label htmlFor="sameAddress" className="font-normal" style={{ fontFamily: typography.fontFamily }}>
                      Same as shipping address
                    </Label>
                  </div>
                </div>

                <Separator />

                {/* Comments */}
                <div className="space-y-2">
                  <Label htmlFor="comments" style={{ fontFamily: typography.fontFamily }}>Comments</Label>
                  <Textarea id="comments" placeholder="Add any additional comments" rows={3} />
                </div>

                {/* Buttons */}
                <div className="flex gap-2 pt-2">
                  <Button style={{ backgroundColor: primaryColor, color: backgroundColor }}>Submit</Button>
                  <Button variant="outline">Cancel</Button>
                </div>
              </CardContent>
            </Card>

            {/* Breadcrumbs and Search */}
            <div className="space-y-4">
              {/* Breadcrumbs */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm" style={{ fontFamily: typography.fontFamily }}>Breadcrumbs</CardTitle>
                </CardHeader>
                <CardContent>
                  <Breadcrumb>
                    <BreadcrumbList>
                      <BreadcrumbItem>
                        <BreadcrumbLink href="#">Dashboard</BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator />
                      <BreadcrumbItem>
                        <BreadcrumbLink href="#">Projects</BreadcrumbLink>
                      </BreadcrumbItem>
                      <BreadcrumbSeparator />
                      <BreadcrumbItem>
                        <BreadcrumbPage>Design System</BreadcrumbPage>
                      </BreadcrumbItem>
                    </BreadcrumbList>
                  </Breadcrumb>
                </CardContent>
              </Card>

              {/* Search Input */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm" style={{ fontFamily: typography.fontFamily }}>Search</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="text"
                      placeholder="Search components..."
                      className="pl-10"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Product Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {colorValues.slice(0, 3).map((color, idx) => {
              const products = [
                { title: 'Pro Plan', price: '$29', features: ['Unlimited projects', 'Priority support', 'Advanced analytics'] },
                { title: 'Team Plan', price: '$79', features: ['Everything in Pro', '10 team members', 'Custom branding'] },
                { title: 'Enterprise', price: '$199', features: ['Everything in Team', 'Unlimited members', 'Dedicated support'] },
              ]
              const product = products[idx] || products[0]
              return (
                <Card
                  key={idx}
                  style={{
                    border: `2px solid ${color}`,
                  }}
                >
                  <CardHeader className="pb-2">
                    <CardTitle style={{ fontFamily: typography.fontFamily }}>
                      {product.title}
                    </CardTitle>
                    <div style={{ fontSize: '32px', fontWeight: '800', fontFamily: typography.fontFamily, color: color }}>
                      {product.price}
                      <span className="text-sm text-muted-foreground font-normal">/mo</span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {product.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <div style={{ width: '16px', height: '16px', borderRadius: '50%', backgroundColor: color + '20', marginTop: '2px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: color }}></div>
                        </div>
                        <span className="text-sm" style={{ fontFamily: typography.fontFamily }}>
                          {feature}
                        </span>
                      </div>
                    ))}
                    <Button
                      className="w-full mt-4"
                      style={{ backgroundColor: color }}
                    >
                      Get Started
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Toggle Switches & Progress Bars using shadcn components */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* Toggles using shadcn Switch */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm" style={{ fontFamily: typography.fontFamily }}>Toggle Switches</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {['Enable notifications', 'Dark mode', 'Auto-save'].map((label, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <Label htmlFor={`switch-${idx}`} style={{ fontFamily: typography.fontFamily }}>{label}</Label>
                    <Switch id={`switch-${idx}`} defaultChecked={idx === 0} />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Progress Bars using shadcn Progress */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm" style={{ fontFamily: typography.fontFamily }}>Progress</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { label: 'Upload', value: 75 },
                  { label: 'Processing', value: 45 },
                  { label: 'Complete', value: 100 },
                ].map((item, idx) => (
                  <div key={idx} className="space-y-2">
                    <div className="flex justify-between">
                      <Label style={{ fontFamily: typography.fontFamily }}>{item.label}</Label>
                      <span className="text-xs text-muted-foreground">{item.value}%</span>
                    </div>
                    <Progress value={item.value} />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Tags & Badges using shadcn Badge */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm" style={{ fontFamily: typography.fontFamily }}>Tags & Badges</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {['React', 'TypeScript', 'Design', 'UI/UX', 'Frontend', 'Tailwind'].map((tag, idx) => (
                  <Badge
                    key={idx}
                    variant={idx % 3 === 0 ? 'default' : idx % 3 === 1 ? 'secondary' : 'outline'}
                    style={{ fontFamily: typography.fontFamily }}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Simple Data Table using shadcn Table */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm" style={{ fontFamily: typography.fontFamily }}>Data Table</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead style={{ fontFamily: typography.fontFamily }}>Component</TableHead>
                    <TableHead style={{ fontFamily: typography.fontFamily }}>Status</TableHead>
                    <TableHead style={{ fontFamily: typography.fontFamily }}>Updated</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {[
                    { name: 'Button', status: 'Complete', date: 'Today' },
                    { name: 'Input', status: 'In Progress', date: 'Yesterday' },
                    { name: 'Modal', status: 'Review', date: '2 days ago' },
                  ].map((row, idx) => (
                    <TableRow key={idx}>
                      <TableCell style={{ fontFamily: typography.fontFamily }}>{row.name}</TableCell>
                      <TableCell>
                        <Badge variant={idx === 0 ? 'default' : idx === 1 ? 'secondary' : 'outline'}>
                          {row.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground" style={{ fontFamily: typography.fontFamily }}>{row.date}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Design Token Showcases */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* Typography Scale */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm" style={{ fontFamily: typography.fontFamily }}>Typography</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {Object.entries(fontSize).slice(0, 4).map(([key, value]) => (
                  <div key={key} className="flex items-center gap-2">
                    <div className="w-8 text-xs font-mono text-muted-foreground">{key}</div>
                    <div style={{ fontFamily: typography.fontFamily, fontSize: `${value}px` }}>
                      Aa
                    </div>
                    <div className="text-xs text-muted-foreground ml-auto">{Math.round(value)}px</div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Spacing Scale */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm" style={{ fontFamily: typography.fontFamily }}>Spacing</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {Object.entries(sp).map(([key, value]) => (
                  <div key={key} className="flex items-center gap-2">
                    <div className="w-8 text-xs font-mono text-muted-foreground">{key}</div>
                    <div
                      style={{
                        width: `${value}px`,
                        height: '16px',
                        backgroundColor: primaryColor,
                        borderRadius: '2px',
                      }}
                    />
                    <div className="text-xs text-muted-foreground ml-auto">{value}px</div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Border Radius */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm" style={{ fontFamily: typography.fontFamily }}>Radius</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {Object.entries(radius).map(([key, value]) => (
                  <div key={key} className="flex items-center gap-2">
                    <div className="w-8 text-xs font-mono text-muted-foreground">{key}</div>
                    <div
                      style={{
                        width: '40px',
                        height: '40px',
                        backgroundColor: getColorByIndex(1),
                        borderRadius: `${value}px`,
                      }}
                    />
                    <div className="text-xs text-muted-foreground ml-auto">{value}px</div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Shadow and Line Height */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* Shadows */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm" style={{ fontFamily: typography.fontFamily }}>
                  Shadows
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {Object.entries(shadow).map(([key, value]) => (
                  <div key={key} className="space-y-2">
                    <div className="text-xs font-mono text-muted-foreground">{key}</div>
                    <div
                      style={{
                        width: '100%',
                        height: '60px',
                        backgroundColor: backgroundColor,
                        borderRadius: `${radius.md}px`,
                        boxShadow: value,
                        border: `1px solid ${secondaryColor}20`,
                      }}
                    />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Line Height */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm" style={{ fontFamily: typography.fontFamily }}>
                  Line Height
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {Object.entries(lineHeight).map(([key, value]) => (
                  <div key={key}>
                    <div className="text-xs font-mono text-muted-foreground mb-1">
                      {key}: {value}
                    </div>
                    <p
                      className="bg-muted p-2 rounded-sm"
                      style={{
                        fontFamily: typography.fontFamily,
                        fontSize: `${fontSize.sm}px`,
                        lineHeight: value,
                      }}
                    >
                      The quick brown fox jumps over the lazy dog.
                    </p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
