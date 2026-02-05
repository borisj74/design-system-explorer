import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Clock, Save, RotateCcw, Trash2, Upload, GitBranch, Palette } from 'lucide-react'
import { useState, useEffect } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'

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

interface SavedPalette {
  id: string
  name: string
  timestamp: number
  colors: {
    primary: string
    secondary: string
    accent: string
    background: string
    foreground: string
  }
}

interface VersionHistoryProps {
  currentState: {
    colors: any
    typography: any
    spacing: any
    borderRadius: any
    shadows: any
    opacity: any
    lineHeight: any
  }
  onRestore: (state: any, versionInfo?: {id: string, name: string}, paletteInfo?: {id: string, name: string}) => void
  activeVersion: {id: string, name: string} | null
  setActiveVersion: (version: {id: string, name: string} | null) => void
}

export default function VersionHistory({ currentState, onRestore, activeVersion, setActiveVersion }: VersionHistoryProps) {
  const [versions, setVersions] = useState<Version[]>(() => {
    const saved = localStorage.getItem('design-system-versions')
    return saved ? JSON.parse(saved) : []
  })
  
  const [savedPalettes, setSavedPalettes] = useState<SavedPalette[]>(() => {
    const saved = localStorage.getItem('saved-color-palettes')
    return saved ? JSON.parse(saved) : []
  })
  const [versionName, setVersionName] = useState('')
  const [showSaveDialog, setShowSaveDialog] = useState(false)
  
  // Confirmation dialogs for palettes
  const [paletteToRestore, setPaletteToRestore] = useState<SavedPalette | null>(null)
  const [paletteToDelete, setPaletteToDelete] = useState<SavedPalette | null>(null)
  
  // Confirmation dialogs for versions
  const [versionToLoad, setVersionToLoad] = useState<Version | null>(null)
  const [versionToDelete, setVersionToDelete] = useState<Version | null>(null)

  // Debug: Log savedPalettes whenever it changes
  useEffect(() => {
    console.log('savedPalettes updated:', savedPalettes.length, 'palettes')
    console.log('Palettes:', savedPalettes)
  }, [savedPalettes])

  // Listen for palette saved events
  useEffect(() => {
    const handlePaletteSaved = () => {
      const saved = localStorage.getItem('saved-color-palettes')
      console.log('Palette saved event received, loading from localStorage:', saved)
      setSavedPalettes(saved ? JSON.parse(saved) : [])
    }
    
    window.addEventListener('paletteSaved', handlePaletteSaved)
    return () => window.removeEventListener('paletteSaved', handlePaletteSaved)
  }, [])

  const saveVersion = () => {
    if (!versionName.trim()) return

    const newVersion: Version = {
      id: Date.now().toString(),
      name: versionName,
      timestamp: Date.now(),
      state: currentState,
    }

    const updatedVersions = [newVersion, ...versions]
    setVersions(updatedVersions)
    localStorage.setItem('design-system-versions', JSON.stringify(updatedVersions))
    setVersionName('')
    setShowSaveDialog(false)
  }

  const loadVersion = (version: Version) => {
    onRestore(version.state, { id: version.id, name: version.name })
    setVersionToLoad(null)
  }

  const confirmDeleteVersion = () => {
    if (!versionToDelete) return
    
    const updatedVersions = versions.filter(v => v.id !== versionToDelete.id)
    setVersions(updatedVersions)
    localStorage.setItem('design-system-versions', JSON.stringify(updatedVersions))
    setVersionToDelete(null)
  }

  const exportVersion = (version: Version) => {
    const json = JSON.stringify(version, null, 2)
    navigator.clipboard.writeText(json)
    alert(`✓ Version "${version.name}" copied to clipboard!\n\nYou can paste it into a text file to save it.`)
  }

  const importVersion = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const imported = JSON.parse(e.target?.result as string)
        const updatedVersions = [imported, ...versions]
        setVersions(updatedVersions)
        localStorage.setItem('design-system-versions', JSON.stringify(updatedVersions))
      } catch (error) {
        alert('Failed to import version. Please check the file format.')
      }
    }
    reader.readAsText(file)
  }

  const restorePalette = (palette: SavedPalette) => {
    console.log('restorePalette executing with:', palette)
    try {
      // Ensure we have valid color data
      if (!palette.colors || typeof palette.colors !== 'object') {
        console.error('Invalid palette data:', palette)
        alert('Invalid palette data')
        return
      }

      console.log('Calling onRestore with colors:', palette.colors)

      // Close dialog BEFORE restoring to ensure clean state update
      setPaletteToRestore(null)
      
      // Use setTimeout to ensure dialog closes before state update
      setTimeout(() => {
        // Restore the colors with palette info (undefined for versionInfo, paletteInfo last)
        onRestore({ colors: palette.colors }, undefined, { id: palette.id, name: palette.name })
        
        // Success feedback
        setTimeout(() => {
          alert(`✓ Loaded "${palette.name}" color palette!\n\nYou can now see your updated colors in the Colors tab.`)
        }, 100)
      }, 50)
    } catch (error) {
      console.error('Error restoring palette:', error)
      alert('Failed to load palette. Please try again.')
      setPaletteToRestore(null)
    }
  }

  const confirmDeletePalette = () => {
    if (!paletteToDelete) {
      console.error('No palette to delete')
      return
    }
    
    console.log('Executing delete for:', paletteToDelete.id, paletteToDelete.name)
    try {
      const updatedPalettes = savedPalettes.filter(p => p.id !== paletteToDelete.id)
      console.log('Palettes before delete:', savedPalettes.length)
      console.log('Palettes after delete:', updatedPalettes.length)
      
      setSavedPalettes(updatedPalettes)
      localStorage.setItem('saved-color-palettes', JSON.stringify(updatedPalettes))
      
      // Close dialog first
      setPaletteToDelete(null)
      
      setTimeout(() => {
        alert('✓ Palette deleted successfully!')
      }, 100)
    } catch (error) {
      console.error('Error deleting palette:', error)
      alert('Failed to delete palette. Please try again.')
      setPaletteToDelete(null)
    }
  }

  const exportPalette = (palette: SavedPalette) => {
    console.log('exportPalette called with:', palette)
    try {
      const json = JSON.stringify(palette, null, 2)
      navigator.clipboard.writeText(json)
      alert(`✓ Palette "${palette.name}" copied to clipboard!\n\nYou can paste it into a text file to save it.`)
    } catch (error) {
      console.error('Error exporting palette:', error)
      alert('Failed to export palette. Please try again.')
    }
  }

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 1) return 'Just now'
    if (diffMins < 60) return `${diffMins}m ago`
    if (diffHours < 24) return `${diffHours}h ago`
    if (diffDays < 7) return `${diffDays}d ago`
    return date.toLocaleDateString()
  }

  const getVersionSummary = (version: Version) => {
    const colors = Object.keys(version.state.colors).length
    const hasCustomTypography = version.state.typography.scale !== 1.25
    const hasCustomSpacing = version.state.spacing.scale !== 1.5
    
    const tags = []
    tags.push(`${colors} colors`)
    if (hasCustomTypography) tags.push('Custom type')
    if (hasCustomSpacing) tags.push('Custom spacing')
    
    return tags
  }

  return (
    <div className="space-y-6">
      <Card className="border-slate-200 shadow-lg shadow-slate-200/50">
        <CardHeader>
          <div className="flex flex-col sm:flex-row items-start justify-between gap-4">
            <div className="w-full sm:w-auto">
              <CardTitle className="text-2xl flex items-center gap-2">
                <Clock className="h-6 w-6" />
                Versions
              </CardTitle>
              <CardDescription className="max-w-2xl">
                Save complete snapshots of your entire design system (colors, typography, spacing, shadows, etc.) to create backup points you can restore later
              </CardDescription>
            </div>
            <div className="flex gap-2 w-full sm:w-auto sm:flex-shrink-0">
              <label htmlFor="import-version" className="flex-1 sm:flex-initial">
                <Button variant="outline" size="sm" className="gap-2 cursor-pointer w-full" asChild>
                  <span>
                    <Upload className="h-4 w-4" />
                    Import
                  </span>
                </Button>
              </label>
              <input
                id="import-version"
                type="file"
                accept=".json"
                onChange={importVersion}
                className="hidden"
              />
              <Dialog open={showSaveDialog} onOpenChange={setShowSaveDialog}>
                <DialogTrigger asChild className="flex-1 sm:flex-initial">
                  <Button size="sm" className="gap-2 w-full sm:w-auto">
                    <Save className="h-4 w-4" />
                    Save Version
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Save Current Version</DialogTitle>
                    <DialogDescription>
                      Give your design system snapshot a memorable name
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 pt-4">
                    <div className="space-y-2">
                      <Label>Version Name</Label>
                      <Input
                        placeholder="e.g., Dark Mode v1, Brand Refresh 2024"
                        value={versionName}
                        onChange={(e) => setVersionName(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && saveVersion()}
                      />
                    </div>
                    <Button onClick={saveVersion} className="w-full" disabled={!versionName.trim()}>
                      Save Version
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {versions.length === 0 ? (
            <div className="text-center py-12">
              <GitBranch className="h-12 w-12 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-600 mb-2">No versions saved yet</p>
              <p className="text-sm text-slate-500 mb-6">
                Save your current design system to create your first version
              </p>
              <Button onClick={() => setShowSaveDialog(true)} className="gap-2">
                <Save className="h-4 w-4" />
                Save First Version
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {versions.map((version) => (
                <div
                  key={version.id}
                  className="p-4 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    {/* Color Swatches */}
                    <div className="flex gap-1 flex-shrink-0">
                      {Object.entries(version.state.colors).map(([key, value]) => (
                        <div
                          key={key}
                          className="w-8 h-8 rounded border border-slate-200"
                          style={{ backgroundColor: value as string }}
                          title={key}
                        />
                      ))}
                    </div>
                    
                    {/* Version Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-1">
                        <h4 className="font-semibold text-slate-900 truncate">{version.name}</h4>
                        <span className="text-xs text-slate-500">{formatDate(version.timestamp)}</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {getVersionSummary(version).filter(tag => !tag.includes('colors')).map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 flex-shrink-0">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setVersionToLoad(version)}
                        className="gap-1.5"
                      >
                        <RotateCcw className="h-4 w-4" />
                        Load
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          const versionObj = versions.find(v => v.id === version.id)
                          if (versionObj) setVersionToDelete(versionObj)
                        }}
                        className="gap-1.5 text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Saved Color Palettes */}
      {savedPalettes.length > 0 && (
        <Card className="border-slate-200 shadow-lg shadow-slate-200/50">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <Palette className="h-6 w-6" />
              Saved Color Palettes
            </CardTitle>
            <CardDescription>
              Restore individual color palettes without changing other settings
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {savedPalettes.map((palette) => (
                <div
                  key={palette.id}
                  className="p-4 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    {/* Color Swatches */}
                    <div className="flex gap-1">
                      {Object.entries(palette.colors).map(([key, value]) => (
                        <div
                          key={key}
                          className="w-8 h-8 rounded border border-slate-200"
                          style={{ backgroundColor: value }}
                          title={key}
                        />
                      ))}
                    </div>
                    
                    {/* Palette Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-1">
                        <h4 className="font-semibold text-slate-900">{palette.name}</h4>
                        <span className="text-xs text-slate-500">
                          {formatDate(palette.timestamp)}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {Object.entries(palette.colors).map(([key, value]) => (
                          <span key={key} className="text-xs font-mono text-slate-500">
                            {value}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 flex-shrink-0">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          console.log('Load button clicked for:', palette.name)
                          setPaletteToRestore(palette)
                        }}
                        className="gap-1.5"
                      >
                        <RotateCcw className="h-4 w-4" />
                        Load
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          console.log('Delete button clicked for:', palette.id)
                          setPaletteToDelete(palette)
                        }}
                        className="gap-1.5 text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Load Version Confirmation Dialog */}
      <Dialog open={!!versionToLoad} onOpenChange={(open) => !open && setVersionToLoad(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Load Version</DialogTitle>
            <DialogDescription>
              Load "{versionToLoad?.name}"? This will update your entire design system and take you to the Preview tab.
            </DialogDescription>
          </DialogHeader>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setVersionToLoad(null)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={() => versionToLoad && loadVersion(versionToLoad)}
              className="flex-1"
            >
              Load Version
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Version Confirmation Dialog */}
      <Dialog open={!!versionToDelete} onOpenChange={(open) => !open && setVersionToDelete(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Version</DialogTitle>
            <DialogDescription>
              Delete "{versionToDelete?.name}"? This cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setVersionToDelete(null)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={confirmDeleteVersion}
              className="flex-1"
            >
              Delete Version
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Restore Palette Confirmation Dialog */}
      <Dialog open={!!paletteToRestore} onOpenChange={(open) => !open && setPaletteToRestore(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Load Color Palette</DialogTitle>
            <DialogDescription>
              Load "{paletteToRestore?.name}" color palette? This will update your colors and take you to the Colors tab.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            {paletteToRestore && (
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                <p className="text-xs font-semibold text-slate-700 mb-2">Colors in this palette:</p>
                <div className="flex gap-2">
                  {Object.entries(paletteToRestore.colors).map(([key, value]) => (
                    <div key={key} className="flex-1 space-y-1">
                      <div
                        className="w-full h-12 rounded-lg border border-slate-200"
                        style={{ backgroundColor: value }}
                      />
                      <p className="text-xs text-slate-600 capitalize truncate">{key}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => {
                  console.log('Load dialog Cancel clicked')
                  setPaletteToRestore(null)
                }}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  console.log('Load Palette button clicked in dialog')
                  if (paletteToRestore) {
                    console.log('Calling restorePalette with:', paletteToRestore)
                    restorePalette(paletteToRestore)
                  } else {
                    console.error('No paletteToRestore!')
                  }
                }}
                className="flex-1"
              >
                Load Palette
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Palette Confirmation Dialog */}
      <Dialog open={!!paletteToDelete} onOpenChange={(open) => !open && setPaletteToDelete(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Color Palette</DialogTitle>
            <DialogDescription>
              Delete "{paletteToDelete?.name}" color palette? This cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => {
                console.log('Delete dialog Cancel clicked')
                setPaletteToDelete(null)
              }}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                console.log('Delete Palette button clicked in dialog')
                if (paletteToDelete) {
                  console.log('Calling confirmDeletePalette')
                  confirmDeletePalette()
                } else {
                  console.error('No paletteToDelete!')
                }
              }}
              className="flex-1"
            >
              Delete Palette
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
