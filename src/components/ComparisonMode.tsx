import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { GitCompare, ArrowLeftRight } from 'lucide-react'
import { useState, useEffect } from 'react'

interface Version {
  id: string
  name: string
  timestamp: number
  state: {
    colors: any
    typography: any
    spacing: any
    borderRadius: any
    shadows: any
    opacity: any
    lineHeight: any
  }
}

interface ComparisonModeProps {
  currentState: {
    colors: any
    typography: any
    spacing: any
    borderRadius: any
    shadows: any
    opacity: any
    lineHeight: any
  }
}

export default function ComparisonMode({ currentState }: ComparisonModeProps) {
  const [versions, setVersions] = useState<Version[]>([])
  const [leftVersion, setLeftVersion] = useState<string>('current')
  const [rightVersion, setRightVersion] = useState<string>('')

  useEffect(() => {
    const saved = localStorage.getItem('design-system-versions')
    if (saved) {
      const parsed = JSON.parse(saved)
      setVersions(parsed)
      if (parsed.length > 0 && !rightVersion) {
        setRightVersion(parsed[0].id)
      }
    }
  }, [])

  const getStateForVersion = (versionId: string) => {
    if (versionId === 'current') return currentState
    return versions.find(v => v.id === versionId)?.state || currentState
  }

  const leftState = getStateForVersion(leftVersion)
  const rightState = getStateForVersion(rightVersion)

  const getVersionName = (versionId: string) => {
    if (versionId === 'current') return 'Current'
    return versions.find(v => v.id === versionId)?.name || 'Unknown'
  }

  const swapVersions = () => {
    const temp = leftVersion
    setLeftVersion(rightVersion)
    setRightVersion(temp)
  }

  const getDifference = (leftVal: any, rightVal: any): 'same' | 'different' => {
    return JSON.stringify(leftVal) === JSON.stringify(rightVal) ? 'same' : 'different'
  }

  const renderColorComparison = () => {
    return (
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-3">
          <h4 className="font-semibold text-sm text-slate-700 flex items-center gap-2">
            {getVersionName(leftVersion)}
          </h4>
          <div className="grid grid-cols-5 gap-2">
            {Object.entries(leftState.colors).map(([key, value]: [string, any]) => (
              <div key={key} className="space-y-1">
                <div
                  className="w-full h-16 rounded-lg border-2 transition-all"
                  style={{
                    backgroundColor: value,
                    borderColor: getDifference(leftState.colors[key], rightState.colors[key]) === 'different'
                      ? '#F59E0B'
                      : 'transparent',
                  }}
                />
                <p className="text-xs text-slate-600 truncate capitalize">{key}</p>
                <p className="text-xs font-mono text-slate-500">{value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="font-semibold text-sm text-slate-700 flex items-center gap-2">
            {getVersionName(rightVersion)}
          </h4>
          <div className="grid grid-cols-5 gap-2">
            {Object.entries(rightState.colors).map(([key, value]: [string, any]) => (
              <div key={key} className="space-y-1">
                <div
                  className="w-full h-16 rounded-lg border-2 transition-all"
                  style={{
                    backgroundColor: value,
                    borderColor: getDifference(leftState.colors[key], rightState.colors[key]) === 'different'
                      ? '#F59E0B'
                      : 'transparent',
                  }}
                />
                <p className="text-xs text-slate-600 truncate capitalize">{key}</p>
                <p className="text-xs font-mono text-slate-500">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  const renderTypographyComparison = () => {
    const leftSizes = {
      h1: leftState.typography.baseSize * Math.pow(leftState.typography.scale, 5),
      h2: leftState.typography.baseSize * Math.pow(leftState.typography.scale, 4),
      h3: leftState.typography.baseSize * Math.pow(leftState.typography.scale, 3),
      body: leftState.typography.baseSize,
    }

    const rightSizes = {
      h1: rightState.typography.baseSize * Math.pow(rightState.typography.scale, 5),
      h2: rightState.typography.baseSize * Math.pow(rightState.typography.scale, 4),
      h3: rightState.typography.baseSize * Math.pow(rightState.typography.scale, 3),
      body: rightState.typography.baseSize,
    }

    return (
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-4">
          <h4 className="font-semibold text-sm text-slate-700">{getVersionName(leftVersion)}</h4>
          {Object.entries(leftSizes).map(([level, size]: [string, number]) => (
            <div
              key={level}
              className={`p-4 rounded-lg border ${
                getDifference(leftSizes[level as keyof typeof leftSizes], rightSizes[level as keyof typeof rightSizes]) === 'different'
                  ? 'border-amber-500 bg-amber-50'
                  : 'border-slate-200'
              }`}
            >
              <p className="text-xs text-slate-500 uppercase mb-1">{level}</p>
              <p
                style={{
                  fontSize: `${size}px`,
                  fontFamily: leftState.typography.fontFamily,
                  lineHeight: '1.2',
                }}
                className="text-slate-900 font-semibold"
              >
                Aa
              </p>
              <p className="text-xs text-slate-600 mt-1">{size.toFixed(0)}px</p>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <h4 className="font-semibold text-sm text-slate-700">{getVersionName(rightVersion)}</h4>
          {Object.entries(rightSizes).map(([level, size]: [string, number]) => (
            <div
              key={level}
              className={`p-4 rounded-lg border ${
                getDifference(leftSizes[level as keyof typeof leftSizes], rightSizes[level as keyof typeof rightSizes]) === 'different'
                  ? 'border-amber-500 bg-amber-50'
                  : 'border-slate-200'
              }`}
            >
              <p className="text-xs text-slate-500 uppercase mb-1">{level}</p>
              <p
                style={{
                  fontSize: `${size}px`,
                  fontFamily: rightState.typography.fontFamily,
                  lineHeight: '1.2',
                }}
                className="text-slate-900 font-semibold"
              >
                Aa
              </p>
              <p className="text-xs text-slate-600 mt-1">{size.toFixed(0)}px</p>
            </div>
          ))}
        </div>
      </div>
    )
  }

  const renderSpacingComparison = () => {
    const generateSpacing = (state: any) => ({
      xs: Math.round(state.spacing.base * Math.pow(state.spacing.scale, 0)),
      sm: Math.round(state.spacing.base * Math.pow(state.spacing.scale, 1)),
      md: Math.round(state.spacing.base * Math.pow(state.spacing.scale, 2)),
      lg: Math.round(state.spacing.base * Math.pow(state.spacing.scale, 3)),
    })

    const leftSpacing = generateSpacing(leftState)
    const rightSpacing = generateSpacing(rightState)

    return (
      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-3">
          <h4 className="font-semibold text-sm text-slate-700">{getVersionName(leftVersion)}</h4>
          {Object.entries(leftSpacing).map(([size, value]) => (
            <div
              key={size}
              className={`p-3 rounded-lg border ${
                getDifference(leftSpacing[size as keyof typeof leftSpacing], rightSpacing[size as keyof typeof rightSpacing]) === 'different'
                  ? 'border-amber-500 bg-amber-50'
                  : 'border-slate-200'
              }`}
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-mono uppercase">{size}</span>
                <span className="text-xs text-slate-600">{value}px</span>
              </div>
              <div className="bg-slate-900 rounded" style={{ width: `${value}px`, height: '4px' }} />
            </div>
          ))}
        </div>

        <div className="space-y-3">
          <h4 className="font-semibold text-sm text-slate-700">{getVersionName(rightVersion)}</h4>
          {Object.entries(rightSpacing).map(([size, value]) => (
            <div
              key={size}
              className={`p-3 rounded-lg border ${
                getDifference(leftSpacing[size as keyof typeof leftSpacing], rightSpacing[size as keyof typeof rightSpacing]) === 'different'
                  ? 'border-amber-500 bg-amber-50'
                  : 'border-slate-200'
              }`}
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-mono uppercase">{size}</span>
                <span className="text-xs text-slate-600">{value}px</span>
              </div>
              <div className="bg-slate-900 rounded" style={{ width: `${value}px`, height: '4px' }} />
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (versions.length === 0) {
    return (
      <Card className="border-slate-200 shadow-lg shadow-slate-200/50">
        <CardContent className="text-center py-12">
          <GitCompare className="h-12 w-12 text-slate-300 mx-auto mb-4" />
          <p className="text-slate-600 mb-2">No versions to compare</p>
          <p className="text-sm text-slate-500">
            Save at least one version to use comparison mode
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <Card className="border-slate-200 shadow-lg shadow-slate-200/50">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-2">
            <GitCompare className="h-6 w-6" />
            Comparison Mode
          </CardTitle>
          <CardDescription>
            Compare two versions side-by-side to see what changed
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Version Selectors */}
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <Select value={leftVersion} onValueChange={setLeftVersion}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="current">Current (Unsaved)</SelectItem>
                  {versions.map((version) => (
                    <SelectItem key={version.id} value={version.id}>
                      {version.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <Button
              variant="ghost"
              size="sm"
              onClick={swapVersions}
              className="flex-shrink-0"
            >
              <ArrowLeftRight className="h-4 w-4" />
            </Button>

            <div className="flex-1">
              <Select value={rightVersion} onValueChange={setRightVersion}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="current">Current (Unsaved)</SelectItem>
                  {versions.map((version) => (
                    <SelectItem key={version.id} value={version.id}>
                      {version.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center gap-2 p-3 bg-amber-50 border border-amber-200 rounded-lg">
            <Badge variant="secondary" className="bg-amber-500 text-white">
              Diff
            </Badge>
            <p className="text-sm text-amber-900">
              Highlighted items show differences between versions
            </p>
          </div>

          {/* Colors Comparison */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Colors</h3>
            {renderColorComparison()}
          </div>

          {/* Typography Comparison */}
          <div className="space-y-4 pt-6 border-t border-slate-200">
            <h3 className="text-lg font-semibold">Typography</h3>
            {renderTypographyComparison()}
          </div>

          {/* Spacing Comparison */}
          <div className="space-y-4 pt-6 border-t border-slate-200">
            <h3 className="text-lg font-semibold">Spacing</h3>
            {renderSpacingComparison()}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
