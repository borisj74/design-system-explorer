import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
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
            <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
              <h3 className="font-semibold mb-3" style={{ fontFamily: typography.fontFamily }}>
                Expenses
              </h3>
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
            </div>

            {/* Bar Chart - Compact */}
            <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold" style={{ fontFamily: typography.fontFamily }}>Monthly Trend</h3>
                <div style={{ fontSize: '18px', fontWeight: '700', fontFamily: typography.fontFamily }}>$12.5K</div>
              </div>
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
            </div>
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
                <div key={idx} className="bg-slate-50 rounded-lg p-3 border border-slate-200">
                  <div className="text-sm mb-1" style={{ fontFamily: typography.fontFamily }}>{stat.title}</div>
                  <div className="text-xl font-bold mb-0.5" style={{ fontFamily: typography.fontFamily }}>{stat.value}</div>
                  <div className="text-xs text-slate-500 mb-2" style={{ fontFamily: typography.fontFamily }}>{stat.prev} last</div>
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
                </div>
              )
            })}
          </div>

          {/* Button Variations - Compact 3 columns */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { title: 'Depth', shadow: true },
              { title: 'Soft', soft: true },
              { title: 'Flat', flat: true },
            ].map((style, idx) => (
              <div key={idx} className="space-y-2">
                <h4 className="text-sm font-semibold mb-2" style={{ fontFamily: typography.fontFamily }}>
                  {style.title}
                </h4>
                {['Default', 'Hover', 'Active', 'Disabled'].map((state, i) => (
                  <button
                    key={i}
                    disabled={state === 'Disabled'}
                    style={{
                      width: '100%',
                      padding: `${sp.sm}px ${sp.md}px`,
                      fontSize: `${fontSize.sm}px`,
                      fontWeight: '500',
                      borderRadius: `${radius.md}px`,
                      backgroundColor: style.soft ? primaryColor + '30' : primaryColor,
                      color: style.soft ? primaryColor : backgroundColor,
                      border: 'none',
                      cursor: state === 'Disabled' ? 'not-allowed' : 'pointer',
                      fontFamily: typography.fontFamily,
                      boxShadow: style.shadow ? (state === 'Active' ? '0 1px 0 0 rgba(0,0,0,0.2)' : '0 3px 0 0 rgba(0,0,0,0.2)') : 'none',
                      transform: style.shadow && state === 'Active' ? 'translateY(2px)' : 'none',
                      opacity: state === 'Disabled' ? 0.4 : state === 'Hover' ? 0.9 : 1,
                    }}
                  >
                    {state}
                  </button>
                ))}
              </div>
            ))}
          </div>

          {/* Form Elements - Compact */}
          <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
            <h3 className="font-semibold mb-3" style={{ fontFamily: typography.fontFamily }}>Form Components</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium mb-1" style={{ fontFamily: typography.fontFamily }}>Email</label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  style={{
                    width: '100%',
                    padding: `${sp.sm}px ${sp.md}px`,
                    fontSize: `${fontSize.sm}px`,
                    borderRadius: `${radius.md}px`,
                    border: `1px solid ${secondaryColor}40`,
                    backgroundColor: backgroundColor,
                    fontFamily: typography.fontFamily,
                    outline: 'none',
                  }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" style={{ fontFamily: typography.fontFamily }}>Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  style={{
                    width: '100%',
                    padding: `${sp.sm}px ${sp.md}px`,
                    fontSize: `${fontSize.sm}px`,
                    borderRadius: `${radius.md}px`,
                    border: `1px solid ${secondaryColor}40`,
                    backgroundColor: backgroundColor,
                    fontFamily: typography.fontFamily,
                    outline: 'none',
                  }}
                />
              </div>
            </div>
          </div>

{/* Navigation Elements - Breadcrumbs & Search */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* Breadcrumbs */}
            <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
              <h3 className="font-semibold mb-3 text-sm" style={{ fontFamily: typography.fontFamily }}>Breadcrumbs</h3>
              <div className="flex items-center gap-2 text-sm">
                {['Dashboard', 'Projects', 'Design System'].map((item, idx, arr) => (
                  <div key={idx} className="flex items-center gap-2">
                    <span 
                      style={{ 
                        color: idx === arr.length - 1 ? foregroundColor : secondaryColor,
                        fontFamily: typography.fontFamily,
                        fontWeight: idx === arr.length - 1 ? '500' : '400',
                        cursor: idx === arr.length - 1 ? 'default' : 'pointer',
                      }}
                    >
                      {item}
                    </span>
                    {idx < arr.length - 1 && <span style={{ color: secondaryColor }}>/</span>}
                  </div>
                ))}
              </div>
            </div>

            {/* Search Input */}
            <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
              <h3 className="font-semibold mb-3 text-sm" style={{ fontFamily: typography.fontFamily }}>Search</h3>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search components..."
                  style={{
                    width: '100%',
                    padding: `${sp.sm}px ${sp.md}px ${sp.sm}px ${sp.xl}px`,
                    fontSize: `${fontSize.sm}px`,
                    borderRadius: `${radius.md}px`,
                    border: `1px solid ${secondaryColor}40`,
                    backgroundColor: backgroundColor,
                    fontFamily: typography.fontFamily,
                    outline: 'none',
                  }}
                />
                <Search 
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4" 
                  style={{ color: secondaryColor }} 
                />
              </div>
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
                <div
                  key={idx}
                  style={{
                    padding: `${sp.lg}px`,
                    borderRadius: `${radius.lg}px`,
                    backgroundColor: backgroundColor,
                    border: `2px solid ${color}`,
                    boxShadow: shadow.md,
                  }}
                >
                  <h3 style={{ fontSize: `${fontSize.lg}px`, fontWeight: '700', fontFamily: typography.fontFamily, marginBottom: `${sp.xs}px` }}>
                    {product.title}
                  </h3>
                  <div style={{ fontSize: '32px', fontWeight: '800', fontFamily: typography.fontFamily, color: color, marginBottom: `${sp.md}px` }}>
                    {product.price}
                    <span style={{ fontSize: `${fontSize.sm}px`, color: secondaryColor, fontWeight: '400' }}>/mo</span>
                  </div>
                  <div className="space-y-2">
                    {product.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <div style={{ width: '16px', height: '16px', borderRadius: '50%', backgroundColor: color + '20', marginTop: '2px', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <div style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: color }}></div>
                        </div>
                        <span style={{ fontSize: `${fontSize.sm}px`, fontFamily: typography.fontFamily, color: foregroundColor }}>
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                  <button
                    style={{
                      width: '100%',
                      marginTop: `${sp.md}px`,
                      padding: `${sp.sm}px`,
                      fontSize: `${fontSize.sm}px`,
                      fontWeight: '500',
                      borderRadius: `${radius.md}px`,
                      backgroundColor: color,
                      color: backgroundColor,
                      border: 'none',
                      cursor: 'pointer',
                      fontFamily: typography.fontFamily,
                    }}
                  >
                    Get Started
                  </button>
                </div>
              )
            })}
          </div>

          {/* Toggle Switches & Progress Bars */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* Toggles */}
            <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
              <h3 className="font-semibold mb-3 text-sm" style={{ fontFamily: typography.fontFamily }}>Toggle Switches</h3>
              <div className="space-y-3">
                {['Enable notifications', 'Dark mode', 'Auto-save'].map((label, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <span style={{ fontSize: `${fontSize.sm}px`, fontFamily: typography.fontFamily }}>{label}</span>
                    <div
                      style={{
                        width: '44px',
                        height: '24px',
                        borderRadius: '12px',
                        backgroundColor: idx === 0 ? primaryColor : secondaryColor + '30',
                        position: 'relative',
                        cursor: 'pointer',
                        transition: 'background-color 0.2s',
                      }}
                    >
                      <div
                        style={{
                          width: '20px',
                          height: '20px',
                          borderRadius: '50%',
                          backgroundColor: backgroundColor,
                          position: 'absolute',
                          top: '2px',
                          left: idx === 0 ? '22px' : '2px',
                          transition: 'left 0.2s',
                          boxShadow: shadow.sm,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Progress Bars */}
            <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
              <h3 className="font-semibold mb-3 text-sm" style={{ fontFamily: typography.fontFamily }}>Progress</h3>
              <div className="space-y-3">
                {[
                  { label: 'Upload', value: 75, color: getColorByIndex(0) },
                  { label: 'Processing', value: 45, color: getColorByIndex(1) },
                  { label: 'Complete', value: 100, color: getColorByIndex(2) },
                ].map((item, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between mb-1">
                      <span style={{ fontSize: `${fontSize.xs}px`, fontFamily: typography.fontFamily, color: secondaryColor }}>{item.label}</span>
                      <span style={{ fontSize: `${fontSize.xs}px`, fontFamily: typography.fontFamily, color: secondaryColor }}>{item.value}%</span>
                    </div>
                    <div style={{ width: '100%', height: '8px', backgroundColor: secondaryColor + '20', borderRadius: `${radius.sm}px`, overflow: 'hidden' }}>
                      <div style={{ width: `${item.value}%`, height: '100%', backgroundColor: item.color, transition: 'width 0.3s' }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Tags & Badges */}
          <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
            <h3 className="font-semibold mb-3 text-sm" style={{ fontFamily: typography.fontFamily }}>Tags & Badges</h3>
            <div className="flex flex-wrap gap-2">
              {['React', 'TypeScript', 'Design', 'UI/UX', 'Frontend', 'Tailwind'].map((tag, idx) => (
                <span
                  key={idx}
                  style={{
                    padding: `${sp.xs}px ${sp.sm}px`,
                    fontSize: `${fontSize.xs}px`,
                    fontWeight: '500',
                    borderRadius: `${radius.sm}px`,
                    backgroundColor: getColorByIndex(idx % colorValues.length) + '15',
                    color: getColorByIndex(idx % colorValues.length),
                    border: `1px solid ${getColorByIndex(idx % colorValues.length)}30`,
                    fontFamily: typography.fontFamily,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Simple Data Table */}
          <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
            <h3 className="font-semibold mb-3 text-sm" style={{ fontFamily: typography.fontFamily }}>Data Table</h3>
            <div style={{ borderRadius: `${radius.md}px`, overflow: 'hidden', border: `1px solid ${secondaryColor}20` }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ backgroundColor: primaryColor, color: backgroundColor }}>
                    {['Component', 'Status', 'Updated'].map((header, idx) => (
                      <th key={idx} style={{ padding: `${sp.sm}px ${sp.md}px`, textAlign: 'left', fontSize: `${fontSize.xs}px`, fontWeight: '600', fontFamily: typography.fontFamily }}>
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: 'Button', status: 'Complete', date: 'Today' },
                    { name: 'Input', status: 'In Progress', date: 'Yesterday' },
                    { name: 'Modal', status: 'Review', date: '2 days ago' },
                  ].map((row, idx) => (
                    <tr key={idx} style={{ backgroundColor: idx % 2 === 0 ? backgroundColor : secondaryColor + '05', borderTop: `1px solid ${secondaryColor}10` }}>
                      <td style={{ padding: `${sp.sm}px ${sp.md}px`, fontSize: `${fontSize.sm}px`, fontFamily: typography.fontFamily, color: foregroundColor }}>
                        {row.name}
                      </td>
                      <td style={{ padding: `${sp.sm}px ${sp.md}px` }}>
                        <span style={{ 
                          padding: `${sp.xs / 2}px ${sp.sm}px`, 
                          fontSize: `${fontSize.xs}px`, 
                          borderRadius: `${radius.sm}px`,
                          backgroundColor: getColorByIndex(idx) + '15',
                          color: getColorByIndex(idx),
                          fontFamily: typography.fontFamily,
                        }}>
                          {row.status}
                        </span>
                      </td>
                      <td style={{ padding: `${sp.sm}px ${sp.md}px`, fontSize: `${fontSize.sm}px`, fontFamily: typography.fontFamily, color: secondaryColor }}>
                        {row.date}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Design Token Showcases */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* Typography Scale */}
            <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
              <h3 className="font-semibold mb-3 text-sm" style={{ fontFamily: typography.fontFamily }}>Typography</h3>
              <div className="space-y-2">
                {Object.entries(fontSize).slice(0, 4).map(([key, value]) => (
                  <div key={key} className="flex items-center gap-2">
                    <div className="w-8 text-xs font-mono text-slate-500">{key}</div>
                    <div style={{ fontFamily: typography.fontFamily, fontSize: `${value}px`, color: foregroundColor }}>
                      Aa
                    </div>
                    <div className="text-xs text-slate-400 ml-auto">{Math.round(value)}px</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Spacing Scale */}
            <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
              <h3 className="font-semibold mb-3 text-sm" style={{ fontFamily: typography.fontFamily }}>Spacing</h3>
              <div className="space-y-2">
                {Object.entries(sp).map(([key, value]) => (
                  <div key={key} className="flex items-center gap-2">
                    <div className="w-8 text-xs font-mono text-slate-500">{key}</div>
                    <div 
                      style={{ 
                        width: `${value}px`,
                        height: '16px',
                        backgroundColor: primaryColor,
                        borderRadius: '2px',
                      }}
                    />
                    <div className="text-xs text-slate-400 ml-auto">{value}px</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Border Radius */}
            <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
              <h3 className="font-semibold mb-3 text-sm" style={{ fontFamily: typography.fontFamily }}>Radius</h3>
              <div className="space-y-3">
                {Object.entries(radius).map(([key, value]) => (
                  <div key={key} className="flex items-center gap-2">
                    <div className="w-8 text-xs font-mono text-slate-500">{key}</div>
                    <div 
                      style={{ 
                        width: '40px',
                        height: '40px',
                        backgroundColor: getColorByIndex(1),
                        borderRadius: `${value}px`,
                      }}
                    />
                    <div className="text-xs text-slate-400 ml-auto">{value}px</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Shadow and Line Height */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* Shadows */}
            <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
              <h3 className="font-semibold mb-3 text-sm" style={{ fontFamily: typography.fontFamily }}>
                Shadows
              </h3>
              <div className="space-y-3">
                {Object.entries(shadow).map(([key, value]) => (
                  <div key={key} className="space-y-2">
                    <div className="text-xs font-mono text-slate-500">{key}</div>
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
              </div>
            </div>

            {/* Line Height */}
            <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
              <h3 className="font-semibold mb-3 text-sm" style={{ fontFamily: typography.fontFamily }}>
                Line Height
              </h3>
              <div className="space-y-3">
                {Object.entries(lineHeight).map(([key, value]) => (
                  <div key={key}>
                    <div className="text-xs font-mono text-slate-500 mb-1">
                      {key}: {value}
                    </div>
                    <p 
                      style={{ 
                        fontFamily: typography.fontFamily,
                        fontSize: `${fontSize.sm}px`,
                        lineHeight: value,
                        color: foregroundColor,
                        backgroundColor: secondaryColor + '10',
                        padding: `${sp.xs}px ${sp.sm}px`,
                        borderRadius: `${radius.sm}px`,
                      }}
                    >
                      The quick brown fox jumps over the lazy dog.
                    </p>
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
