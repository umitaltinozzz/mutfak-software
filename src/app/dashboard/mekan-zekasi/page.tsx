'use client'

import React, { useState, useRef, useCallback, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Eye, 
  Layers, 
  Square, 
  Circle, 
  Move, 
  RotateCcw, 
  Save, 
  Download, 
  Upload, 
  Grid,
  Zap,
  Users,
  TrendingUp,
  AlertTriangle,
  Settings,
  Camera,
  Maximize,
  Minimize,
  Plus,
  Minus,
  Info
} from 'lucide-react'

// Canvas element types
interface CanvasElement {
  id: string
  type: 'table' | 'wall' | 'object'
  x: number
  y: number
  width: number
  height: number
  rotation: number
  label?: string
  heatLevel?: number // 0-100, kullanılan yoğunluk
  complaints?: number // şikayet sayısı
  rating?: number // ortalama puan
  isSelected?: boolean
}

// Layer visibility state
interface LayerState {
  tables: boolean
  walls: boolean
  objects: boolean
}

const LocationIntelligence: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [elements, setElements] = useState<CanvasElement[]>([
    // Sample data - gerçek uygulamada API'den gelecek
    { id: '1', type: 'table', x: 100, y: 100, width: 80, height: 80, rotation: 0, label: 'Masa 1', heatLevel: 85, complaints: 3, rating: 4.2 },
    { id: '2', type: 'table', x: 200, y: 100, width: 80, height: 80, rotation: 0, label: 'Masa 2', heatLevel: 45, complaints: 0, rating: 4.8 },
    { id: '3', type: 'table', x: 300, y: 100, width: 80, height: 80, rotation: 0, label: 'Masa 3', heatLevel: 92, complaints: 5, rating: 3.1 },
    { id: '4', type: 'wall', x: 50, y: 50, width: 400, height: 20, rotation: 0, label: 'Duvar 1' },
    { id: '5', type: 'object', x: 150, y: 200, width: 60, height: 60, rotation: 0, label: 'Kasa' },
  ])
  
  const [layers, setLayers] = useState<LayerState>({
    tables: true,
    walls: true,
    objects: true
  })
  
  const [selectedTool, setSelectedTool] = useState<'select' | 'table' | 'wall' | 'object'>('select')
  const [selectedElement, setSelectedElement] = useState<string | null>(null)
  const [isPreviewMode, setIsPreviewMode] = useState(false)
  const [showGrid, setShowGrid] = useState(true)
  const [zoomLevel, setZoomLevel] = useState(1)
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [isDrawing, setIsDrawing] = useState(false)
  const [canvasSize, setCanvasSize] = useState({ width: 800, height: 600 })
  
  // Snap to grid function
  const snapToGrid = (value: number, gridSize: number = 20) => {
    return Math.round(value / gridSize) * gridSize
  }
  
  // Get heat map color based on heat level
  const getHeatColor = (heatLevel: number) => {
    if (heatLevel >= 80) return 'rgb(239, 68, 68)' // Red
    if (heatLevel >= 60) return 'rgb(245, 101, 101)' // Light red  
    if (heatLevel >= 40) return 'rgb(251, 191, 36)' // Yellow
    if (heatLevel >= 20) return 'rgb(34, 197, 94)' // Green
    return 'rgb(156, 163, 175)' // Gray
  }
  
  // Canvas drawing function
  const drawCanvas = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    
    // Draw grid if enabled
    if (showGrid && !isPreviewMode) {
      ctx.strokeStyle = 'rgba(156, 163, 175, 0.3)'
      ctx.lineWidth = 1
      
      const gridSize = 20
      for (let x = 0; x <= canvas.width; x += gridSize) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
        ctx.stroke()
      }
      
      for (let y = 0; y <= canvas.height; y += gridSize) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.stroke()
      }
    }
    
    // Draw elements by layer
    elements.forEach(element => {
      if (!layers[element.type === 'table' ? 'tables' : element.type === 'wall' ? 'walls' : 'objects']) {
        return
      }
      
      ctx.save()
      ctx.translate(element.x + element.width / 2, element.y + element.height / 2)
      ctx.rotate((element.rotation * Math.PI) / 180)
      
      // Draw element based on type
      switch (element.type) {
        case 'table':
          // Heat map background
          if (element.heatLevel !== undefined) {
            ctx.fillStyle = getHeatColor(element.heatLevel)
            ctx.globalAlpha = 0.7
            ctx.fillRect(-element.width / 2 - 10, -element.height / 2 - 10, element.width + 20, element.height + 20)
            ctx.globalAlpha = 1
          }
          
          // Table shape
          ctx.fillStyle = element.isSelected ? '#3b82f6' : '#f3f4f6'
          ctx.strokeStyle = element.isSelected ? '#1d4ed8' : '#d1d5db'
          ctx.lineWidth = 2
          ctx.fillRect(-element.width / 2, -element.height / 2, element.width, element.height)
          ctx.strokeRect(-element.width / 2, -element.height / 2, element.width, element.height)
          
          // Table number
          ctx.fillStyle = '#374151'
          ctx.font = '12px Inter'
          ctx.textAlign = 'center'
          ctx.fillText(element.label || '', 0, 4)
          
          // Heat level indicator
          if (element.heatLevel !== undefined && element.heatLevel > 70) {
            ctx.fillStyle = '#ef4444'
            ctx.beginPath()
            ctx.arc(element.width / 2 - 10, -element.height / 2 + 10, 4, 0, 2 * Math.PI)
            ctx.fill()
          }
          break
          
        case 'wall':
          ctx.fillStyle = element.isSelected ? '#6b7280' : '#9ca3af'
          ctx.fillRect(-element.width / 2, -element.height / 2, element.width, element.height)
          break
          
        case 'object':
          ctx.fillStyle = element.isSelected ? '#8b5cf6' : '#a78bfa'
          ctx.strokeStyle = element.isSelected ? '#7c3aed' : '#8b5cf6'
          ctx.lineWidth = 2
          ctx.fillRect(-element.width / 2, -element.height / 2, element.width, element.height)
          ctx.strokeRect(-element.width / 2, -element.height / 2, element.width, element.height)
          
          // Object label
          ctx.fillStyle = '#374151'
          ctx.font = '10px Inter'
          ctx.textAlign = 'center'
          ctx.fillText(element.label || '', 0, 4)
          break
      }
      
      ctx.restore()
    })
  }, [elements, layers, selectedElement, showGrid, isPreviewMode])
  
  // Handle canvas mouse events
  const handleCanvasMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (isPreviewMode) return
    
    const canvas = canvasRef.current
    if (!canvas) return
    
    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    if (selectedTool === 'select') {
      // Check if clicking on an element
      const clickedElement = elements.find(element => 
        x >= element.x && x <= element.x + element.width &&
        y >= element.y && y <= element.y + element.height
      )
      
      if (clickedElement) {
        setSelectedElement(clickedElement.id)
        setIsDragging(true)
        setDragOffset({
          x: x - clickedElement.x,
          y: y - clickedElement.y
        })
      } else {
        setSelectedElement(null)
      }
    } else {
      // Add new element
      const newElement: CanvasElement = {
        id: Date.now().toString(),
        type: selectedTool as 'table' | 'wall' | 'object',
        x: snapToGrid(x - 40),
        y: snapToGrid(y - 40),
        width: selectedTool === 'table' ? 80 : selectedTool === 'wall' ? 100 : 60,
        height: selectedTool === 'table' ? 80 : selectedTool === 'wall' ? 20 : 60,
        rotation: 0,
        label: selectedTool === 'table' ? `Masa ${elements.filter(e => e.type === 'table').length + 1}` : 
               selectedTool === 'wall' ? `Duvar ${elements.filter(e => e.type === 'wall').length + 1}` :
               `Obje ${elements.filter(e => e.type === 'object').length + 1}`,
        heatLevel: selectedTool === 'table' ? Math.floor(Math.random() * 100) : undefined,
        complaints: selectedTool === 'table' ? Math.floor(Math.random() * 6) : undefined,
        rating: selectedTool === 'table' ? 3 + Math.random() * 2 : undefined
      }
      
      setElements([...elements, newElement])
      setSelectedElement(newElement.id)
      setSelectedTool('select')
    }
  }
  
  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDragging || !selectedElement || isPreviewMode) return
    
    const canvas = canvasRef.current
    if (!canvas) return
    
    const rect = canvas.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    setElements(elements.map(element => 
      element.id === selectedElement
        ? { ...element, x: snapToGrid(x - dragOffset.x), y: snapToGrid(y - dragOffset.y) }
        : element
    ))
  }
  
  const handleCanvasMouseUp = () => {
    setIsDragging(false)
    setDragOffset({ x: 0, y: 0 })
  }
  
  // Update selected element in elements array
  useEffect(() => {
    setElements(elements.map(element => ({
      ...element,
      isSelected: element.id === selectedElement
    })))
  }, [selectedElement])
  
  // Draw canvas when elements or settings change
  useEffect(() => {
    drawCanvas()
  }, [drawCanvas])
  
  // Toggle layer visibility
  const toggleLayer = (layer: keyof LayerState) => {
    setLayers(prev => ({ ...prev, [layer]: !prev[layer] }))
  }
  
  // Delete selected element
  const deleteSelected = () => {
    if (selectedElement) {
      setElements(elements.filter(e => e.id !== selectedElement))
      setSelectedElement(null)
    }
  }
  
  // Clear all elements
  const clearCanvas = () => {
    setElements([])
    setSelectedElement(null)
  }
  
  // Get selected element details
  const selectedElementData = elements.find(e => e.id === selectedElement)
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="max-w-full mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Mekan Zekası & Isı Haritası
          </h1>
          <p className="text-gray-600">
            Restoranınızın yerleşim planını tasarlayın ve müşteri yoğunluğunu görselleştirin
          </p>
        </div>
        
        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Sidebar - Tools */}
          <div className="lg:col-span-1">
            <div className="premium-card p-4 mb-4">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Settings className="w-5 h-5" />
                Araçlar
              </h3>
              
              {/* Tool Selection */}
              <div className="grid grid-cols-2 gap-2 mb-4">
                <button
                  onClick={() => setSelectedTool('select')}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    selectedTool === 'select' 
                      ? 'border-blue-500 bg-blue-50 text-blue-600' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Move className="w-5 h-5 mx-auto mb-1" />
                  <span className="text-xs">Seç</span>
                </button>
                
                <button
                  onClick={() => setSelectedTool('table')}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    selectedTool === 'table' 
                      ? 'border-blue-500 bg-blue-50 text-blue-600' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Square className="w-5 h-5 mx-auto mb-1" />
                  <span className="text-xs">Masa</span>
                </button>
                
                <button
                  onClick={() => setSelectedTool('wall')}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    selectedTool === 'wall' 
                      ? 'border-blue-500 bg-blue-50 text-blue-600' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="w-5 h-2 bg-gray-400 mx-auto mb-2"></div>
                  <span className="text-xs">Duvar</span>
                </button>
                
                <button
                  onClick={() => setSelectedTool('object')}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    selectedTool === 'object' 
                      ? 'border-blue-500 bg-blue-50 text-blue-600' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Circle className="w-5 h-5 mx-auto mb-1" />
                  <span className="text-xs">Obje</span>
                </button>
              </div>
              
              {/* Canvas Controls */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Izgara</span>
                  <button
                    onClick={() => setShowGrid(!showGrid)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      showGrid ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      showGrid ? 'translate-x-6' : 'translate-x-1'
                    }`} />
                  </button>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Önizleme</span>
                  <button
                    onClick={() => setIsPreviewMode(!isPreviewMode)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      isPreviewMode ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      isPreviewMode ? 'translate-x-6' : 'translate-x-1'
                    }`} />
                  </button>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="mt-4 space-y-2">
                <button
                  onClick={deleteSelected}
                  disabled={!selectedElement}
                  className="w-full btn-danger disabled:opacity-50"
                >
                  Seçili Öğeyi Sil
                </button>
                
                <button
                  onClick={clearCanvas}
                  className="w-full btn-secondary"
                >
                  Tümünü Temizle
                </button>
              </div>
            </div>
            
            {/* Layers Panel */}
            <div className="premium-card p-4">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Layers className="w-5 h-5" />
                Katmanlar
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Square className="w-4 h-4 text-blue-500" />
                    <span className="text-sm">Masalar</span>
                  </div>
                  <button
                    onClick={() => toggleLayer('tables')}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      layers.tables ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      layers.tables ? 'translate-x-6' : 'translate-x-1'
                    }`} />
                  </button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-2 bg-gray-400 rounded-sm"></div>
                    <span className="text-sm">Duvarlar</span>
                  </div>
                  <button
                    onClick={() => toggleLayer('walls')}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      layers.walls ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      layers.walls ? 'translate-x-6' : 'translate-x-1'
                    }`} />
                  </button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Circle className="w-4 h-4 text-purple-500" />
                    <span className="text-sm">Objeler</span>
                  </div>
                  <button
                    onClick={() => toggleLayer('objects')}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      layers.objects ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                  >
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                      layers.objects ? 'translate-x-6' : 'translate-x-1'
                    }`} />
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Center - Canvas */}
          <div className="lg:col-span-2">
            <div className="premium-card p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Mekan Tasarımı</h3>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsPreviewMode(!isPreviewMode)}
                    className={`btn-premium ${isPreviewMode ? 'bg-blue-600' : ''}`}
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    {isPreviewMode ? 'Düzenleme' : 'Önizleme'}
                  </button>
                  <button className="btn-secondary">
                    <Download className="w-4 h-4 mr-2" />
                    İndir
                  </button>
                </div>
              </div>
              
              <div className="relative bg-white rounded-lg border-2 border-dashed border-gray-300 overflow-hidden">
                <canvas
                  ref={canvasRef}
                  width={800}
                  height={600}
                  className="block cursor-crosshair"
                  onMouseDown={handleCanvasMouseDown}
                  onMouseMove={handleCanvasMouseMove}
                  onMouseUp={handleCanvasMouseUp}
                  style={{ cursor: isPreviewMode ? 'default' : selectedTool === 'select' ? 'move' : 'crosshair' }}
                />
                
                {/* Heat Map Legend */}
                <div className="absolute top-4 left-4 bg-white rounded-lg shadow-lg p-3">
                  <div className="text-xs font-medium mb-2">Isı Haritası</div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <span className="text-xs">Çok Yoğun (80+)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <span className="text-xs">Orta (40-80)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-xs">Az (20-40)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                      <span className="text-xs">Boş (0-20)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Sidebar - Details */}
          <div className="lg:col-span-1">
            {/* Selected Element Details */}
            {selectedElementData && (
              <div className="premium-card p-4 mb-4">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Info className="w-5 h-5" />
                  Detaylar
                </h3>
                
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium mb-1">Etiket</label>
                    <input
                      type="text"
                      value={selectedElementData.label || ''}
                      onChange={(e) => setElements(elements.map(el => 
                        el.id === selectedElement ? { ...el, label: e.target.value } : el
                      ))}
                      className="w-full p-2 border border-gray-200 rounded-lg"
                    />
                  </div>
                  
                  {selectedElementData.type === 'table' && (
                    <>
                      <div>
                        <label className="block text-sm font-medium mb-1">Yoğunluk Seviyesi</label>
                        <div className="flex items-center gap-2">
                          <div className={`w-4 h-4 rounded-full ${
                            selectedElementData.heatLevel! >= 80 ? 'bg-red-500' :
                            selectedElementData.heatLevel! >= 60 ? 'bg-yellow-500' :
                            selectedElementData.heatLevel! >= 40 ? 'bg-green-500' : 'bg-gray-400'
                          }`}></div>
                          <span className="text-sm font-medium">{selectedElementData.heatLevel}%</span>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-1">Şikayet Sayısı</label>
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="w-4 h-4 text-red-500" />
                          <span className="text-sm">{selectedElementData.complaints} şikayet</span>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-1">Ortalama Puan</label>
                        <div className="flex items-center gap-2">
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map(star => (
                              <div
                                key={star}
                                className={`w-4 h-4 ${
                                  star <= (selectedElementData.rating || 0) ? 'text-yellow-400' : 'text-gray-300'
                                }`}
                              >
                                ★
                              </div>
                            ))}
                          </div>
                          <span className="text-sm">{selectedElementData.rating?.toFixed(1)}</span>
                        </div>
                      </div>
                    </>
                  )}
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Döndürme</label>
                    <input
                      type="range"
                      min="0"
                      max="360"
                      value={selectedElementData.rotation}
                      onChange={(e) => setElements(elements.map(el => 
                        el.id === selectedElement ? { ...el, rotation: parseInt(e.target.value) } : el
                      ))}
                      className="w-full"
                    />
                    <div className="text-xs text-gray-500 mt-1">{selectedElementData.rotation}°</div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Statistics */}
            <div className="premium-card p-4">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                İstatistikler
              </h3>
              
              <div className="space-y-4">
                <div className="metric-card">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Square className="w-4 h-4 text-blue-500" />
                      <span className="text-sm">Toplam Masa</span>
                    </div>
                    <span className="font-bold">{elements.filter(e => e.type === 'table').length}</span>
                  </div>
                </div>
                
                <div className="metric-card">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-red-500" />
                      <span className="text-sm">Problemli Masa</span>
                    </div>
                    <span className="font-bold text-red-600">
                      {elements.filter(e => e.type === 'table' && (e.heatLevel || 0) > 70).length}
                    </span>
                  </div>
                </div>
                
                <div className="metric-card">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-green-500" />
                      <span className="text-sm">Ortalama Yoğunluk</span>
                    </div>
                    <span className="font-bold">
                      {Math.round(elements.filter(e => e.type === 'table')
                        .reduce((sum, e) => sum + (e.heatLevel || 0), 0) / 
                        elements.filter(e => e.type === 'table').length) || 0}%
                    </span>
                  </div>
                </div>
                
                <div className="metric-card">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Zap className="w-4 h-4 text-yellow-500" />
                      <span className="text-sm">Toplam Şikayet</span>
                    </div>
                    <span className="font-bold">
                      {elements.filter(e => e.type === 'table')
                        .reduce((sum, e) => sum + (e.complaints || 0), 0)}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Quick Actions */}
              <div className="mt-4 space-y-2">
                <button className="w-full btn-premium">
                  <Camera className="w-4 h-4 mr-2" />
                  Anlık Görüntü Al
                </button>
                <button className="w-full btn-secondary">
                  <Upload className="w-4 h-4 mr-2" />
                  Plan Yükle
                </button>
                <button className="w-full btn-secondary">
                  <Save className="w-4 h-4 mr-2" />
                  Kaydet
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LocationIntelligence 