import { useState, useRef, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface VisualColorPickerProps {
  label: string
  value: string
  onChange: (color: string) => void
}

export default function VisualColorPicker({ label, value, onChange }: VisualColorPickerProps) {
  const [hue, setHue] = useState(0)
  const [saturation, setSaturation] = useState(100)
  const [brightness, setBrightness] = useState(50)
  const [isDraggingSB, setIsDraggingSB] = useState(false)
  const [isDraggingHue, setIsDraggingHue] = useState(false)
  
  const sbPickerRef = useRef<HTMLDivElement>(null)
  const hueSliderRef = useRef<HTMLDivElement>(null)

  // Convert hex to HSB
  useEffect(() => {
    const hexToHSB = (hex: string) => {
      const r = parseInt(hex.slice(1, 3), 16) / 255
      const g = parseInt(hex.slice(3, 5), 16) / 255
      const b = parseInt(hex.slice(5, 7), 16) / 255

      const max = Math.max(r, g, b)
      const min = Math.min(r, g, b)
      const delta = max - min

      let h = 0
      if (delta !== 0) {
        if (max === r) h = ((g - b) / delta + (g < b ? 6 : 0)) / 6
        else if (max === g) h = ((b - r) / delta + 2) / 6
        else h = ((r - g) / delta + 4) / 6
      }

      const s = max === 0 ? 0 : (delta / max) * 100
      const v = max * 100

      setHue(h * 360)
      setSaturation(s)
      setBrightness(v)
    }

    if (value && /^#[0-9A-Fa-f]{6}$/.test(value)) {
      hexToHSB(value)
    }
  }, [value])

  // Convert HSB to hex
  const hsbToHex = (h: number, s: number, v: number) => {
    h = h / 360
    s = s / 100
    v = v / 100

    const i = Math.floor(h * 6)
    const f = h * 6 - i
    const p = v * (1 - s)
    const q = v * (1 - f * s)
    const t = v * (1 - (1 - f) * s)

    let r = 0, g = 0, b = 0
    switch (i % 6) {
      case 0: r = v; g = t; b = p; break
      case 1: r = q; g = v; b = p; break
      case 2: r = p; g = v; b = t; break
      case 3: r = p; g = q; b = v; break
      case 4: r = t; g = p; b = v; break
      case 5: r = v; g = p; b = q; break
    }

    const toHex = (n: number) => Math.round(n * 255).toString(16).padStart(2, '0')
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`
  }

  const updateColor = (h: number, s: number, v: number) => {
    const newColor = hsbToHex(h, s, v)
    onChange(newColor)
  }

  // Handle saturation/brightness picker
  const handleSBMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDraggingSB(true)
    handleSBMove(e)
  }

  const handleSBMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!sbPickerRef.current) return
    
    const rect = sbPickerRef.current.getBoundingClientRect()
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY
    
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width))
    const y = Math.max(0, Math.min(clientY - rect.top, rect.height))
    
    const newSaturation = (x / rect.width) * 100
    const newBrightness = 100 - (y / rect.height) * 100
    
    setSaturation(newSaturation)
    setBrightness(newBrightness)
    updateColor(hue, newSaturation, newBrightness)
  }

  // Handle hue slider
  const handleHueMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDraggingHue(true)
    handleHueMove(e)
  }

  const handleHueMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!hueSliderRef.current) return
    
    const rect = hueSliderRef.current.getBoundingClientRect()
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
    
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width))
    const newHue = (x / rect.width) * 360
    
    setHue(newHue)
    updateColor(newHue, saturation, brightness)
  }

  // Global mouse/touch handlers
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent | TouchEvent) => {
      if (isDraggingSB) handleSBMove(e as any)
      if (isDraggingHue) handleHueMove(e as any)
    }

    const handleMouseUp = () => {
      setIsDraggingSB(false)
      setIsDraggingHue(false)
    }

    if (isDraggingSB || isDraggingHue) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
      document.addEventListener('touchmove', handleMouseMove)
      document.addEventListener('touchend', handleMouseUp)
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('touchmove', handleMouseMove)
      document.removeEventListener('touchend', handleMouseUp)
    }
  }, [isDraggingSB, isDraggingHue, hue, saturation, brightness])

  return (
    <div className="p-6 bg-white rounded-3xl border border-slate-200 shadow-sm space-y-4">
      {/* Saturation/Brightness Picker */}
      <div
        ref={sbPickerRef}
        className="relative w-full h-64 rounded-2xl cursor-crosshair overflow-hidden"
        style={{
          background: `linear-gradient(to top, #000, transparent), linear-gradient(to right, #fff, hsl(${hue}, 100%, 50%))`
        }}
        onMouseDown={handleSBMouseDown}
        onTouchStart={handleSBMouseDown}
      >
        {/* Selector Circle */}
        <div
          className="absolute w-6 h-6 border-4 border-white rounded-full shadow-lg pointer-events-none"
          style={{
            left: `${saturation}%`,
            top: `${100 - brightness}%`,
            transform: 'translate(-50%, -50%)',
            boxShadow: '0 0 0 1px rgba(0,0,0,0.3), 0 2px 4px rgba(0,0,0,0.2)'
          }}
        />
      </div>

      {/* Hue Slider */}
      <div
        ref={hueSliderRef}
        className="relative w-full h-10 rounded-full cursor-pointer overflow-hidden"
        style={{
          background: 'linear-gradient(to right, #ff0000, #ffff00, #00ff00, #00ffff, #0000ff, #ff00ff, #ff0000)'
        }}
        onMouseDown={handleHueMouseDown}
        onTouchStart={handleHueMouseDown}
      >
        {/* Hue Selector */}
        <div
          className="absolute w-8 h-8 bg-white border-4 border-white rounded-full shadow-lg pointer-events-none"
          style={{
            left: `${(hue / 360) * 100}%`,
            top: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: `hsl(${hue}, 100%, 50%)`,
            boxShadow: '0 0 0 1px rgba(0,0,0,0.3), 0 2px 4px rgba(0,0,0,0.2)'
          }}
        />
      </div>

      {/* Hex Input */}
      <Input
        type="text"
        value={value.toUpperCase()}
        onChange={(e) => {
          const hexValue = e.target.value
          if (/^#[0-9A-Fa-f]{0,6}$/.test(hexValue)) {
            onChange(hexValue)
          }
        }}
        className="font-mono text-lg h-14 text-center border-slate-200 focus:border-slate-400"
        placeholder="#000000"
      />
    </div>
  )
}
