import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Progress } from '@/components/ui/progress'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
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
          {/* Compact 2-column layout for charts and stats */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Donut Chart - Compact */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base" style={{ fontFamily: typography.fontFamily }}>
                  Expenses
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4">
                  {/* Smaller donut */}
                  <div className="relative" style={{ width: '120px', height: '120px', flexShrink: 0 }}>
                    <svg viewBox="0 0 120 120" className="transform -rotate-90">
                      <circle cx="60" cy="60" r="42" fill="none" stroke="#f1f5f9" strokeWidth="24" />
                      {/* Draw segments for each color */}
                      {colorValues.slice(0, Math.min(colorValues.length, 6)).map((color, index) => {
                        const totalColors = Math.min(colorValues.length, 6)
                        const segmentSize = 1 / totalColors
                        const offset = -segmentSize * index
                        return (
                          <circle
                            key={index}
                            cx="60"
                            cy="60"
                            r="42"
                            fill="none"
                            stroke={color}
                            strokeWidth="24"
                            strokeDasharray={`${2 * Math.PI * 42 * segmentSize} ${2 * Math.PI * 42}`}
                            strokeDashoffset={`${2 * Math.PI * 42 * offset}`}
                          />
                        )
                      })}
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div style={{ fontSize: '16px', fontWeight: '700', fontFamily: typography.fontFamily }}>$14.9K</div>
                      </div>
                    </div>
                  </div>
                  {/* Compact legend */}
                  <div className="flex-1 space-y-1 text-sm">
                    {colorEntries.slice(0, Math.min(colorEntries.length, 6)).map(([name, color], idx) => {
                      const totalColors = Math.min(colorEntries.length, 6)
                      const amount = (14919 / totalColors).toFixed(0)
                      return (
                        <div key={idx} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: color }} />
                            <span className="truncate" style={{ fontFamily: typography.fontFamily, fontSize: '12px' }}>{name}</span>
                          </div>
                          <span style={{ fontWeight: '500', fontFamily: typography.fontFamily, fontSize: '12px' }}>
                            ${(parseInt(amount) / 1000).toFixed(1)}K
                          </span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Bar Chart - Compact */}
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base" style={{ fontFamily: typography.fontFamily }}>Monthly Trend</CardTitle>
                  <div style={{ fontSize: '18px', fontWeight: '700', fontFamily: typography.fontFamily }}>$12.5K</div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-24 flex items-end justify-between gap-1">
                  {[
                    { month: 'Jan', values: [40, 30, 20] },
                    { month: 'Feb', values: [20, 25, 35] },
                    { month: 'Mar', values: [15, 20, 10] },
                    { month: 'Apr', values: [35, 30, 25] },
                    { month: 'May', values: [30, 35, 50] },
                    { month: 'Jun', values: [25, 30, 20] },
                    { month: 'Jul', values: [35, 25, 30] },
                    { month: 'Aug', values: [45, 35, 25] },
                    { month: 'Sep', values: [30, 40, 35] },
                    { month: 'Oct', values: [25, 30, 40] },
                    { month: 'Nov', values: [40, 25, 30] },
                    { month: 'Dec', values: [50, 40, 35] },
                  ].map((item, idx) => (
                    <div key={idx} className="flex-1 flex flex-col items-center gap-1">
                      <div className="w-full flex flex-col gap-0.5" style={{ height: '70px' }}>
                        {item.values.map((height, i) => (
                          <div key={i} className="w-full" style={{ height: `${height}%`, backgroundColor: getColorByIndex(i), borderRadius: '2px' }} />
                        ))}
                      </div>
                      <span style={{ fontSize: '10px', color: secondaryColor }}>{item.month}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Stat Cards - Single Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {colorValues.slice(0, 3).map((color, idx) => {
              const stats = [
                { title: 'Income', value: '$15.9K', prev: '$18.8K', path: 'M 0,20 L 20,15 L 40,18 L 60,12 L 80,16 L 100,10' },
                { title: 'Expenses', value: '$12.5K', prev: '$10.2K', path: 'M 0,25 L 20,22 L 40,24 L 60,20 L 80,18 L 100,15' },
                { title: 'Savings', value: '$5.2K', prev: '$10.2K', path: 'M 0,15 L 20,18 L 40,25 L 60,20 L 80,12 L 100,14' },
              ]
              const stat = stats[idx] || stats[0]
              return (
                <Card key={idx}>
                  <CardContent className="pt-4">
                    <div className="text-sm mb-1" style={{ fontFamily: typography.fontFamily }}>{stat.title}</div>
                    <div className="text-xl font-bold mb-0.5" style={{ fontFamily: typography.fontFamily }}>{stat.value}</div>
                    <div className="text-xs text-muted-foreground mb-2" style={{ fontFamily: typography.fontFamily }}>{stat.prev} last</div>
                    <svg width="100%" height="30" viewBox="0 0 100 40" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id={`gradient${idx}`} x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" style={{ stopColor: color, stopOpacity: 0.3 }} />
                          <stop offset="100%" style={{ stopColor: color, stopOpacity: 0 }} />
                        </linearGradient>
                      </defs>
                      <path d={stat.path} fill="none" stroke={color} strokeWidth="2" />
                      <path d={`${stat.path} L 100,40 L 0,40 Z`} fill={`url(#gradient${idx})`} />
                    </svg>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {/* Button Variations using shadcn Button */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base" style={{ fontFamily: typography.fontFamily }}>Buttons</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 gap-3">
                <div className="space-y-2">
                  <h4 className="text-sm font-medium" style={{ fontFamily: typography.fontFamily }}>Default</h4>
                  <Button className="w-full">Primary</Button>
                  <Button variant="secondary" className="w-full">Secondary</Button>
                  <Button variant="outline" className="w-full">Outline</Button>
                  <Button variant="ghost" className="w-full">Ghost</Button>
                </div>
                <div className="space-y-2">
                  <h4 className="text-sm font-medium" style={{ fontFamily: typography.fontFamily }}>Destructive</h4>
                  <Button variant="destructive" className="w-full">Delete</Button>
                  <Button variant="outline" className="w-full text-destructive border-destructive hover:bg-destructive/10">Remove</Button>
                </div>
                <div className="space-y-2">
                  <h4 className="text-sm font-medium" style={{ fontFamily: typography.fontFamily }}>Sizes</h4>
                  <Button size="sm" className="w-full">Small</Button>
                  <Button size="default" className="w-full">Default</Button>
                  <Button size="lg" className="w-full">Large</Button>
                </div>
                <div className="space-y-2">
                  <h4 className="text-sm font-medium" style={{ fontFamily: typography.fontFamily }}>States</h4>
                  <Button className="w-full">Enabled</Button>
                  <Button disabled className="w-full">Disabled</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Form Elements using shadcn Input and Label */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base" style={{ fontFamily: typography.fontFamily }}>Form Components</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email" style={{ fontFamily: typography.fontFamily }}>Email</Label>
                  <Input id="email" type="email" placeholder="you@example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" style={{ fontFamily: typography.fontFamily }}>Password</Label>
                  <Input id="password" type="password" placeholder="••••••••" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Navigation Elements - Breadcrumbs & Search using shadcn components */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
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
