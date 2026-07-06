

'use client'

import { useState, useRef, useEffect } from 'react'
import { 
  Pencil, Download, Trash2, Undo2, Redo2, Copy, 
  Highlighter, Eraser, Square, Circle, Minus, Type, 
  StickyNote, MoveRight, Layers, PaintBucket, Maximize2
} from 'lucide-react'

export default function Whiteboard() {
  const canvasRef = useRef(null)
  const containerRef = useRef(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [brushSize, setBrushSize] = useState(3)
  const [brushColor, setBrushColor] = useState('#3b82f6')
  const [tool, setTool] = useState('pencil') // pencil, highlighter, eraser, line, arrow, rectangle, circle, diamond, triangle, text, sticky
  const [fillShape, setFillShape] = useState(false)
  const [strokeStyle, setStrokeStyle] = useState('solid') // solid, dashed
  const [brushOpacity, setBrushOpacity] = useState(100)
  
  // Collaborative state layers
  const [notes, setNotes] = useState([])
  const [history, setHistory] = useState([])
  const [historyStep, setHistoryStep] = useState(-1)
  
  // Vector trace coordinates
  const [startX, setStartX] = useState(0)
  const [startY, setStartY] = useState(0)
  const [previewCanvas, setPreviewCanvas] = useState(null)
  const [textInput, setTextInput] = useState('')
  const [showTextInput, setShowTextInput] = useState(false)

  // Initialize and adjust canvas resolution settings
  useEffect(() => {
    const canvas = canvasRef.current
    if (canvas) {
      const rect = canvas.parentElement.getBoundingClientRect()
      canvas.width = rect.width
      canvas.height = 500
      
      drawCanvasBackground(canvas)
      
      // Seed initial trace history snapshot
      const initialData = canvas.toDataURL()
      setHistory([initialData])
      setHistoryStep(0)
    }
  }, [])

  // Renders the background engineering grid pattern
  const drawCanvasBackground = (canvas) => {
    const ctx = canvas.getContext('2d')
    ctx.fillStyle = '#09090b'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Render system dot matrix array
    ctx.fillStyle = 'rgba(255, 255, 255, 0.05)'
    const gridSpacing = 20
    for (let x = gridSpacing; x < canvas.width; x += gridSpacing) {
      for (let y = gridSpacing; y < canvas.height; y += gridSpacing) {
        ctx.beginPath()
        ctx.arc(x, y, 1.0, 0, 2 * Math.PI)
        ctx.fill()
      }
    }
  }

  const saveToHistory = () => {
    const canvas = canvasRef.current
    if (canvas) {
      const cleanHistory = history.slice(0, historyStep + 1)
      cleanHistory.push(canvas.toDataURL())
      setHistory(cleanHistory)
      setHistoryStep(cleanHistory.length - 1)
    }
  }

  const undo = () => {
    if (historyStep > 0) {
      const canvas = canvasRef.current
      const img = new Image()
      img.onload = () => {
        const ctx = canvas.getContext('2d')
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.drawImage(img, 0, 0)
      }
      img.src = history[historyStep - 1]
      setHistoryStep(historyStep - 1)
    }
  }

  const redo = () => {
    if (historyStep < history.length - 1) {
      const canvas = canvasRef.current
      const img = new Image()
      img.onload = () => {
        const ctx = canvas.getContext('2d')
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        ctx.drawImage(img, 0, 0)
      }
      img.src = history[historyStep + 1]
      setHistoryStep(historyStep + 1)
    }
  }

  const clearBoard = () => {
    const canvas = canvasRef.current
    if (canvas) {
      drawCanvasBackground(canvas)
      setNotes([])
      saveToHistory()
    }
  }

  // Native Vector Render Engine Configurator Layer
  const setupContextStyle = (ctx, currentTool) => {
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    
    // Line style mutations
    if (strokeStyle === 'dashed' && !['pencil', 'highlighter', 'eraser'].includes(currentTool)) {
      ctx.setLineDash([brushSize * 2, brushSize * 2])
    } else {
      ctx.setLineDash([])
    }

    if (currentTool === 'highlighter') {
      ctx.strokeStyle = brushColor
      ctx.lineWidth = brushSize * 4
      ctx.globalAlpha = 0.3
    } else if (currentTool === 'eraser') {
      ctx.strokeStyle = '#09090b' 
      ctx.lineWidth = brushSize * 5
      ctx.globalAlpha = 1.0
    } else {
      ctx.strokeStyle = brushColor
      ctx.lineWidth = brushSize
      ctx.globalAlpha = brushOpacity / 100
    }
  }

  const handleMouseDown = (e) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    setIsDrawing(true)
    setStartX(x)
    setStartY(y)

    if (tool === 'text') {
      setShowTextInput(true)
    } else if (tool === 'sticky') {
      const palette = ['#fef08a', '#bfdbfe', '#bbf7d0', '#fbcfe8']
      const newNote = {
        id: Date.now(),
        x: x - 50,
        y: y - 50,
        text: 'Concept node...',
        color: palette[notes.length % palette.length]
      }
      setNotes([...notes, newNote])
      setTool('pencil')
      setIsDrawing(false)
    } else if (['rectangle', 'circle', 'line', 'arrow', 'diamond', 'triangle'].includes(tool)) {
      setPreviewCanvas(canvas.toDataURL())
    }
  }

  const handleMouseMove = (e) => {
    if (!isDrawing) return

    const canvas = canvasRef.current
    if (!canvas) return

    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const ctx = canvas.getContext('2d')

    if (['pencil', 'highlighter', 'eraser'].includes(tool)) {
      ctx.beginPath()
      setupContextStyle(ctx, tool)
      ctx.moveTo(startX, startY)
      ctx.lineTo(x, y)
      ctx.stroke()
      setStartX(x)
      setStartY(y)
    } else if (['rectangle', 'circle', 'line', 'arrow', 'diamond', 'triangle'].includes(tool)) {
      if (previewCanvas) {
        const img = new Image()
        img.onload = () => {
          ctx.clearRect(0, 0, canvas.width, canvas.height)
          ctx.drawImage(img, 0, 0)
          
          ctx.beginPath()
          setupContextStyle(ctx, tool)

          const width = x - startX
          const height = y - startY

          if (tool === 'rectangle') {
            if (fillShape) {
              ctx.fillStyle = brushColor
              ctx.fillRect(startX, startY, width, height)
            } else {
              ctx.strokeRect(startX, startY, width, height)
            }
          } else if (tool === 'circle') {
            const radius = Math.sqrt(width ** 2 + height ** 2)
            ctx.arc(startX, startY, radius, 0, 2 * Math.PI)
            if (fillShape) {
              ctx.fillStyle = brushColor
              ctx.fill()
            } else {
              ctx.stroke()
            }
          } else if (tool === 'line') {
            ctx.moveTo(startX, startY)
            ctx.lineTo(x, y)
            ctx.stroke()
          } else if (tool === 'arrow') {
            ctx.moveTo(startX, startY)
            ctx.lineTo(x, y)
            ctx.stroke()
            
            // Calculate arrow head components
            const angle = Math.atan2(y - startY, x - startX)
            const arrowHeadLength = Math.max(10, brushSize * 3)
            ctx.beginPath()
            ctx.moveTo(x, y)
            ctx.lineTo(x - arrowHeadLength * Math.cos(angle - Math.PI / 6), y - arrowHeadLength * Math.sin(angle - Math.PI / 6))
            ctx.lineTo(x - arrowHeadLength * Math.cos(angle + Math.PI / 6), y - arrowHeadLength * Math.sin(angle + Math.PI / 6))
            ctx.closePath()
            ctx.fillStyle = brushColor
            ctx.fill()
          } else if (tool === 'diamond') {
            ctx.moveTo(startX + width / 2, startY)
            ctx.lineTo(x, startY + height / 2)
            ctx.lineTo(startX + width / 2, y)
            ctx.lineTo(startX, startY + height / 2)
            ctx.closePath()
            if (fillShape) {
              ctx.fillStyle = brushColor
              ctx.fill()
            } else {
              ctx.stroke()
            }
          } else if (tool === 'triangle') {
            ctx.moveTo(startX, y)
            ctx.lineTo(startX + width / 2, startY)
            ctx.lineTo(x, y)
            ctx.closePath()
            if (fillShape) {
              ctx.fillStyle = brushColor
              ctx.fill()
            } else {
              ctx.stroke()
            }
          }
        }
        img.src = previewCanvas
      }
    }
  }

  const handleMouseUp = () => {
    if (!isDrawing) return
    setIsDrawing(false)
    setPreviewCanvas(null)
    saveToHistory()
  }

  const addTextTextarea = () => {
    if (textInput.trim()) {
      const canvas = canvasRef.current
      if (canvas) {
        const ctx = canvas.getContext('2d')
        ctx.fillStyle = brushColor
        ctx.globalAlpha = brushOpacity / 100
        ctx.font = `600 ${brushSize * 2.5 + 13}px system-ui, sans-serif`
        ctx.fillText(textInput, startX, startY)
        saveToHistory()
      }
      setTextInput('')
      setShowTextInput(false)
    }
  }

  const updateNoteText = (id, newText) => {
    setNotes(notes.map(n => n.id === id ? { ...n, text: newText } : n))
  }

  const downloadCanvas = () => {
    const canvas = canvasRef.current
    if (canvas) {
      const link = document.createElement('a')
      link.download = 'studio-whiteboard-export.png'
      link.href = canvas.toDataURL()
      link.click()
    }
  }

  const copyCanvas = () => {
    const canvas = canvasRef.current
    if (canvas) {
      canvas.toBlob(blob => {
        navigator.clipboard.write([
          new ClipboardItem({ 'image/png': blob })
        ])
      })
    }
  }

  return (
    <div ref={containerRef} style={{ background: '#121214', borderRadius: 14, border: '1px solid #27272a', padding: 16, display: 'flex', flexDirection: 'column', gap: 14, userSelect: 'none', fontFamily: 'system-ui, sans-serif' }}>
      
      {/* Control Header Strip */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ padding: 8, background: 'rgba(59, 130, 246, 0.1)', borderRadius: 8, color: '#3b82f6', display: 'flex', alignItems: 'center' }}>
            <Layers size={16} />
          </div>
          <div>
            <h3 style={{ margin: 0, fontSize: '13px', fontWeight: 600, color: '#f4f4f5', tracking: '-0.01em' }}>Studio Canvas Pro</h3>
            <p style={{ margin: 0, fontSize: '11px', color: '#71717a' }}>Vector Wireframe Mesh Layer</p>
          </div>
        </div>

        {/* Global Control Station */}
        <div style={{ display: 'flex', gap: 4, background: '#18181b', padding: 3, borderRadius: 8, border: '1px solid #27272a' }}>
          <button onClick={undo} disabled={historyStep <= 0} style={{ background: 'transparent', border: 'none', borderRadius: 5, padding: '6px 8px', color: historyStep <= 0 ? '#3f3f46' : '#a1a1aa', cursor: historyStep <= 0 ? 'not-allowed' : 'pointer' }} title="Undo Action">
            <Undo2 size={14} />
          </button>
          <button onClick={redo} disabled={historyStep >= history.length - 1} style={{ background: 'transparent', border: 'none', borderRadius: 5, padding: '6px 8px', color: historyStep >= history.length - 1 ? '#3f3f46' : '#a1a1aa', cursor: historyStep >= history.length - 1 ? 'not-allowed' : 'pointer' }} title="Redo Action">
            <Redo2 size={14} />
          </button>
          <div style={{ width: '1px', background: '#27272a', margin: '4px 2px' }} />
          <button onClick={copyCanvas} style={{ background: 'transparent', border: 'none', borderRadius: 5, padding: '6px 8px', color: '#a1a1aa', cursor: 'pointer' }} title="Copy Array Framework">
            <Copy size={14} />
          </button>
          <button onClick={downloadCanvas} style={{ background: 'transparent', border: 'none', borderRadius: 5, padding: '6px 10px', color: '#3b82f6', fontSize: '11px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }} title="Export Trace Manifest">
            <Download size={13} /> Export
          </button>
          <button onClick={clearBoard} style={{ background: 'transparent', border: 'none', borderRadius: 5, padding: '6px 10px', color: '#ef4444', fontSize: '11px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4 }} title="Purge Frame Layer">
            <Trash2 size={13} /> Reset
          </button>
        </div>
      </div>

      {/* Floating Toolbar Deck */}
      <div style={{ display: 'flex', gap: 14, alignItems: 'center', flexWrap: 'wrap', padding: '8px 12px', background: '#18181b', borderRadius: 10, border: '1px solid #27272a' }}>
        <div style={{ display: 'flex', gap: 2, background: 'rgba(0,0,0,0.15)', padding: 3, borderRadius: 6, flexWrap: 'wrap' }}>
          {[
            { id: 'pencil', icon: <Pencil size={14} />, name: 'Pencil Node' },
            { id: 'highlighter', icon: <Highlighter size={14} />, name: 'Marker Highlight' },
            { id: 'eraser', icon: <Eraser size={14} />, name: 'Trace Eraser' },
            { id: 'line', icon: <Minus size={14} />, name: 'Segment Vector' },
            { id: 'arrow', icon: <MoveRight size={14} />, name: 'Flow Vector' },
            { id: 'rectangle', icon: <Square size={14} />, name: 'Matrix Bounds Block' },
            { id: 'circle', icon: <Circle size={14} />, name: 'Orb Matrix Block' },
            { id: 'diamond', icon: <Maximize2 size={14} style={{ transform: 'rotate(45deg)' }} />, name: 'Decision Diamond' },
            { id: 'triangle', icon: <span style={{ fontSize: '10px', fontWeight: 'bold', display: 'block', transform: 'translateY(-1px)' }}>▲</span>, name: 'Structural Triangle' },
            { id: 'text', icon: <Type size={14} />, name: 'Text Font String' },
            { id: 'sticky', icon: <StickyNote size={14} />, name: 'Post-it Interface Note' },
          ].map(t => (
            <button
              key={t.id}
              onClick={() => setTool(t.id)}
              title={t.name}
              style={{
                background: tool === t.id ? '#3b82f6' : 'transparent',
                border: 'none',
                borderRadius: 4,
                padding: '6px 10px',
                color: tool === t.id ? '#fff' : '#a1a1aa',
                cursor: 'pointer',
                transition: 'all 0.1s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {t.icon}
            </button>
          ))}
        </div>

        {/* Dynamic Parameter Adjustment Tuning Dock */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginLeft: 'auto', flexWrap: 'wrap' }}>
          {['rectangle', 'circle', 'diamond', 'triangle'].includes(tool) && (
            <label style={{ display: 'flex', alignItems: 'center', gap: 5, cursor: 'pointer', fontSize: '11px', color: '#a1a1aa' }}>
              <input type="checkbox" checked={fillShape} onChange={e => setFillShape(e.target.checked)} style={{ width: 13, height: 13, accentColor: '#3b82f6' }} />
              <PaintBucket size={12} style={{ color: fillShape ? '#3b82f6' : '#71717a' }} /> Fill Area
            </label>
          )}

          {/* Line Topology Selection Mapping */}
          {!['pencil', 'highlighter', 'eraser', 'text', 'sticky'].includes(tool) && (
            <div style={{ display: 'flex', background: 'rgba(0,0,0,0.2)', padding: 2, borderRadius: 4, border: '1px solid #27272a' }}>
              <button onClick={() => setStrokeStyle('solid')} style={{ border: 'none', background: strokeStyle === 'solid' ? '#27272a' : 'transparent', color: strokeStyle === 'solid' ? '#fff' : '#71717a', fontSize: '10px', padding: '3px 6px', borderRadius: 3, cursor: 'pointer' }}>Solid</button>
              <button onClick={() => setStrokeStyle('dashed')} style={{ border: 'none', background: strokeStyle === 'dashed' ? '#27272a' : 'transparent', color: strokeStyle === 'dashed' ? '#fff' : '#71717a', fontSize: '10px', padding: '3px 6px', borderRadius: 3, cursor: 'pointer' }}>Dash</button>
            </div>
          )}

          <div style={{ width: '1px', background: '#27272a', height: 16 }} />

          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontSize: '11px', color: '#71717a' }}>Palette:</span>
            <input
              type="color"
              value={brushColor}
              onChange={e => setBrushColor(e.target.value)}
              style={{ width: 22, height: 22, borderRadius: 4, border: '1px solid #27272a', cursor: 'pointer', background: 'transparent' }}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontSize: '11px', color: '#71717a' }}>Weight:</span>
            <input
              type="range"
              min="2"
              max="16"
              value={brushSize}
              onChange={e => setBrushSize(parseInt(e.target.value))}
              style={{ width: 65, accentColor: '#3b82f6', cursor: 'ew-resize' }}
            />
            <span style={{ fontSize: '11px', color: '#a1a1aa', width: 20, textAlign: 'right', fontFamily: 'monospace' }}>{brushSize}px</span>
          </div>

          {['pencil', 'rectangle', 'circle', 'diamond', 'triangle', 'line', 'arrow', 'text'].includes(tool) && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ fontSize: '11px', color: '#71717a' }}>Opacity:</span>
              <input
                type="range"
                min="10"
                max="100"
                value={brushOpacity}
                onChange={e => setBrushOpacity(parseInt(e.target.value))}
                style={{ width: 55, accentColor: '#3b82f6', cursor: 'ew-resize' }}
              />
              <span style={{ fontSize: '11px', color: '#a1a1aa', width: 26, textAlign: 'right', fontFamily: 'monospace' }}>{brushOpacity}%</span>
            </div>
          )}
        </div>
      </div>

      {/* Primary Interaction Board Window Canvas Frame wrapper */}
      <div style={{ position: 'relative', borderRadius: 10, overflow: 'hidden', border: '1px solid #27272a', background: '#09090b' }}>
        <canvas
          ref={canvasRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          style={{
            display: 'block',
            width: '100%',
            cursor: tool === 'eraser' ? 'cell' : 'crosshair',
          }}
        />

        {/* Dynamic Mounting Sticky Notes Layer Array */}
        {notes.map(note => (
          <div
            key={note.id}
            style={{
              position: 'absolute',
              top: note.y,
              left: note.x,
              background: note.color,
              width: 120,
              height: 120,
              padding: '8px 8px 24px 8px',
              borderRadius: 4,
              boxShadow: '0 10px 25px -5px rgba(0,0,0,0.6), 0 8px 10px -6px rgba(0,0,0,0.6)',
              display: 'flex',
              flexDirection: 'column',
              zIndex: 20,
            }}
          >
            <textarea
              value={note.text}
              onChange={e => updateNoteText(note.id, e.target.value)}
              style={{
                width: '100%',
                height: '100%',
                background: 'transparent',
                border: 'none',
                resize: 'none',
                outline: 'none',
                fontFamily: 'inherit',
                fontSize: '11px',
                color: '#18181b',
                fontWeight: 500,
                lineHeight: 1.3,
              }}
            />
            <button 
              onClick={() => setNotes(notes.filter(n => n.id !== note.id))}
              style={{ position: 'absolute', bottom: 4, right: 6, border: 'none', background: 'transparent', cursor: 'pointer', color: 'rgba(0,0,0,0.4)', fontSize: '10px', fontWeight: 600 }}
            >
              × Delete
            </button>
          </div>
        ))}
      </div>

      {/* Input Engine Dialog Node */}
      {showTextInput && (
        <div style={{ display: 'flex', gap: 6, padding: 8, background: '#18181b', borderRadius: 8, border: '1px solid #27272a' }}>
          <input
            autoFocus
            type="text"
            value={textInput}
            onChange={e => setTextInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && addTextTextarea()}
            placeholder="Input trace text string, press Enter..."
            style={{ flex: 1, background: '#09090b', border: '1px solid #27272a', borderRadius: 5, padding: '6px 10px', color: '#f4f4f5', fontSize: '12px', outline: 'none' }}
          />
          <button onClick={addTextTextarea} style={{ background: '#3b82f6', border: 'none', borderRadius: 5, padding: '6px 12px', color: '#fff', fontSize: '11px', fontWeight: 600, cursor: 'pointer' }}>
            Inject
          </button>
          <button onClick={() => { setShowTextInput(false); setTextInput('') }} style={{ background: 'transparent', border: '1px solid #27272a', borderRadius: 5, padding: '6px 12px', color: '#f43f5e', fontSize: '11px', cursor: 'pointer' }}>
            Drop
          </button>
        </div>
      )}

      {/* Status Output Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 2px', fontSize: '11px', color: '#52525b' }}>
        <span>Select structural vector tool arrays, click and draw over the canvas matrix viewport bounds.</span>
        <span>Array Node Stack: {historyStep + 1} / {history.length}</span>
      </div>
    </div>
  )
}