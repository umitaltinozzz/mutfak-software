"use client"

import React, { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import QRCode from 'qrcode'
import { 
  QrCode, 
  Download, 
  Printer,
  Edit,
  Trash2,
  Eye, 
  EyeOff,
  Copy,
  Plus,
  Palette,
  Settings,
  BarChart3,
  Calendar,
  Share2,
  Camera,
  Type,
  Image as ImageIcon,
  MapPin,
  Star,
  Users,
  Smartphone,
  Monitor,
  Tablet,
  RefreshCw,
  CheckCircle,
  AlertCircle,
  Save
} from 'lucide-react'

// Types
interface QRCode {
  id: number
  name: string
  type: 'table' | 'takeaway' | 'delivery' | 'general'
  tableNumber?: number
  url: string
  scans: number
  lastScan: string
  created: string
  active: boolean
  customization: {
    foregroundColor: string
    backgroundColor: string
    logoUrl?: string
    style: 'square' | 'round' | 'dots'
  }
}

const QRCodesPage = () => {
  const router = useRouter()
  const downloadRef = useRef<HTMLAnchorElement>(null)
  
  const [qrCodes, setQrCodes] = useState<QRCode[]>([
  {
    id: 1,
      name: 'Masa 1',
      type: 'table',
      tableNumber: 1,
      url: 'https://lezzetduragi.com/qr/table/1',
      scans: 145,
      lastScan: '2024-01-15 14:30',
      created: '2024-01-01',
      active: true,
      customization: {
        foregroundColor: '#000000',
        backgroundColor: '#ffffff',
        style: 'square'
      }
  },
  {
    id: 2,
      name: 'Masa 2',
      type: 'table',
      tableNumber: 2,
      url: 'https://lezzetduragi.com/qr/table/2',
      scans: 98,
      lastScan: '2024-01-15 12:15',
      created: '2024-01-01',
      active: true,
      customization: {
        foregroundColor: '#1f2937',
        backgroundColor: '#f9fafb',
        style: 'round'
      }
  },
  {
    id: 3,
      name: 'Paket Servis',
      type: 'takeaway',
      url: 'https://lezzetduragi.com/qr/takeaway',
      scans: 234,
      lastScan: '2024-01-15 16:45',
      created: '2024-01-01',
      active: true,
      customization: {
        foregroundColor: '#dc2626',
        backgroundColor: '#ffffff',
        style: 'dots'
      }
    },
  ])

  const [selectedQR, setSelectedQR] = useState<QRCode | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [modalType, setModalType] = useState<'create' | 'edit' | 'analytics'>('create')
  const [isGenerating, setIsGenerating] = useState(false)
  const [activeTab, setActiveTab] = useState('list')

  // Form states for creating/editing QR codes
  const [formData, setFormData] = useState({
    name: '',
    type: 'table' as 'table' | 'takeaway' | 'delivery' | 'general',
    tableNumber: 1,
    customization: {
      foregroundColor: '#000000',
      backgroundColor: '#ffffff',
      logoUrl: undefined as string | undefined,
      style: 'square' as 'square' | 'round' | 'dots'
    }
  })
  
  const [qrPreviewUrls, setQrPreviewUrls] = useState<{[key: number]: string}>({})
  const [previewUrl, setPreviewUrl] = useState<string>('')

  // Generate preview URLs for QR codes
  useEffect(() => {
    const generatePreviews = async () => {
      const urls: {[key: number]: string} = {}
      for (const qr of qrCodes) {
        try {
          urls[qr.id] = await generateQRCodeDataURL(qr)
        } catch (error) {
          console.error(`QR kod ${qr.id} önizlemesi oluşturulamadı:`, error)
        }
      }
      setQrPreviewUrls(urls)
    }
    
    generatePreviews()
  }, [qrCodes])

  // Generate preview for form data
  useEffect(() => {
    const generateFormPreview = async () => {
      if (formData.name && showModal && modalType !== 'analytics') {
        try {
          const mockQR: QRCode = {
            id: 0,
            name: formData.name,
            type: formData.type,
            tableNumber: formData.tableNumber,
            url: `https://lezzetduragi.com/qr/${formData.type}/${formData.tableNumber || 1}`,
            scans: 0,
            lastScan: 'Henüz taranmadı',
            created: new Date().toISOString().split('T')[0],
            active: true,
            customization: formData.customization
          }
          const url = await generateQRCodeDataURL(mockQR)
          setPreviewUrl(url)
        } catch (error) {
          console.error('Form önizlemesi oluşturulamadı:', error)
        }
      }
    }
    
    generateFormPreview()
  }, [formData, showModal, modalType])

  const tabs = [
    { id: 'list', label: 'QR Kod Listesi', icon: QrCode },
    { id: 'analytics', label: 'Analitik', icon: BarChart3 },
    { id: 'templates', label: 'Şablonlar', icon: Palette },
  ]

  const qrTypes = [
    { value: 'table', label: 'Masa QR Kodu', icon: MapPin },
    { value: 'takeaway', label: 'Paket Servis', icon: Smartphone },
    { value: 'delivery', label: 'Teslimat', icon: Monitor },
    { value: 'general', label: 'Genel', icon: QrCode },
  ]

  // Toast notification helper
  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    const toast = document.createElement('div')
    toast.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg ${
      type === 'success' ? 'bg-green-500 text-white' : 
      type === 'error' ? 'bg-red-500 text-white' : 
      'bg-blue-500 text-white'
    }`
    toast.textContent = message
    document.body.appendChild(toast)
    
    setTimeout(() => {
      toast.remove()
    }, 3000)
  }

  // Generate QR code Data URL using qrcode library
  const generateQRCodeDataURL = async (qr: QRCode): Promise<string> => {
    try {
      const options = {
        width: 256,
        margin: 2,
        color: {
          dark: qr.customization.foregroundColor,
          light: qr.customization.backgroundColor
        },
        type: 'image/png' as const
      }
      
      return await QRCode.toDataURL(qr.url, options)
    } catch (error) {
      console.error('QR kod oluşturma hatası:', error)
      // Fallback to simple colored square
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      canvas.width = 256
      canvas.height = 256
      
      if (ctx) {
        ctx.fillStyle = qr.customization.backgroundColor
        ctx.fillRect(0, 0, 256, 256)
        ctx.fillStyle = qr.customization.foregroundColor
        ctx.fillRect(32, 32, 192, 192)
        ctx.fillStyle = qr.customization.backgroundColor
        ctx.fillRect(112, 112, 32, 32)
      }
      
      return canvas.toDataURL('image/png')
    }
  }

  const handleCreateQR = async () => {
    if (!formData.name.trim()) {
      showToast('QR kod adı boş olamaz!', 'error')
      return
    }

    setIsGenerating(true)
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      const newQR: QRCode = {
        id: Date.now(),
        name: formData.name,
        type: formData.type,
        tableNumber: formData.type === 'table' ? formData.tableNumber : undefined,
        url: `https://lezzetduragi.com/qr/${formData.type}${formData.type === 'table' ? `/${formData.tableNumber}` : ''}`,
        scans: 0,
        lastScan: 'Henüz taranmadı',
        created: new Date().toISOString().split('T')[0],
        active: true,
        customization: formData.customization
      }
      
      setQrCodes(prev => [newQR, ...prev])
      setShowModal(false)
      resetForm()
      showToast('QR kod başarıyla oluşturuldu!', 'success')
      
    } catch (error) {
      showToast('QR kod oluşturulurken bir hata oluştu!', 'error')
    } finally {
      setIsGenerating(false)
    }
  }

  const handleEditQR = async () => {
    if (!selectedQR || !formData.name.trim()) {
      showToast('QR kod adı boş olamaz!', 'error')
      return
    }

    setIsGenerating(true)
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setQrCodes(prev => prev.map(qr => 
        qr.id === selectedQR.id 
          ? { 
              ...qr, 
              name: formData.name, 
              type: formData.type,
              tableNumber: formData.type === 'table' ? formData.tableNumber : undefined,
              customization: formData.customization 
            }
          : qr
      ))
      
      setShowModal(false)
      setSelectedQR(null)
      resetForm()
      showToast('QR kod başarıyla güncellendi!', 'success')
      
    } catch (error) {
      showToast('QR kod güncellenirken bir hata oluştu!', 'error')
    } finally {
      setIsGenerating(false)
    }
  }

  const handleDeleteQR = (qrId: number) => {
    setQrCodes(prev => prev.filter(qr => qr.id !== qrId))
    showToast('QR kod silindi!', 'success')
  }

  const handleToggleActive = (qrId: number) => {
    setQrCodes(prev => prev.map(qr => 
      qr.id === qrId ? { ...qr, active: !qr.active } : qr
    ))
    
    const qr = qrCodes.find(q => q.id === qrId)
    showToast(`QR kod ${qr?.active ? 'deaktive' : 'aktive'} edildi!`, 'info')
  }

  const handleDownloadQR = async (qr: QRCode) => {
    try {
      const dataURL = await generateQRCodeDataURL(qr)
      const link = document.createElement('a')
      link.href = dataURL
      link.download = `qr-${qr.name.toLowerCase().replace(/\s+/g, '-')}.png`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      showToast('QR kod indirildi!', 'success')
    } catch (error) {
      showToast('QR kod indirilemedi!', 'error')
    }
  }

  const handlePrintQR = async (qr: QRCode) => {
    try {
      const dataURL = await generateQRCodeDataURL(qr)
      const printWindow = window.open('', '_blank')
      
      if (printWindow) {
        printWindow.document.write(`
          <html>
            <head>
              <title>QR Kod - ${qr.name}</title>
              <style>
                body { 
                  margin: 0; 
                  display: flex; 
                  justify-content: center; 
                  align-items: center; 
                  min-height: 100vh;
                  font-family: Arial, sans-serif;
                }
                .container {
                  text-align: center;
                  padding: 20px;
                }
                img { 
                  max-width: 300px; 
                  margin: 20px 0;
                }
                h2 { margin: 0 0 10px 0; }
                p { margin: 5px 0; color: #666; }
              </style>
            </head>
            <body>
              <div class="container">
                <h2>${qr.name}</h2>
                <img src="${dataURL}" alt="QR Code" />
                <p>${qr.type === 'table' ? `Masa ${qr.tableNumber}` : qr.type}</p>
                <p>Lezzet Durağı Restaurant</p>
              </div>
            </body>
          </html>
        `)
        printWindow.document.close()
        printWindow.print()
      }
      
      showToast('QR kod yazdırma penceresi açıldı!', 'success')
    } catch (error) {
      showToast('QR kod yazdırılamadı!', 'error')
    }
  }

  const handleCopyURL = (url: string) => {
    navigator.clipboard.writeText(url).then(() => {
      showToast('URL kopyalandı!', 'success')
    }).catch(() => {
      showToast('URL kopyalanamadı!', 'error')
    })
  }

  const handleBulkDownload = async () => {
    showToast('Toplu indirme başlatılıyor...', 'info')
    
    try {
      for (let i = 0; i < qrCodes.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 500)) // Stagger downloads
        await handleDownloadQR(qrCodes[i])
      }
      showToast(`${qrCodes.length} QR kod indirildi!`, 'success')
    } catch (error) {
      showToast('Toplu indirme sırasında hata oluştu!', 'error')
    }
  }

  const openModal = (type: 'create' | 'edit' | 'analytics', qr?: QRCode) => {
    setModalType(type)
    
    if (type === 'edit' && qr) {
      setSelectedQR(qr)
      setFormData({
        name: qr.name,
        type: qr.type,
        tableNumber: qr.tableNumber || 1,
        customization: {
          ...qr.customization,
          logoUrl: qr.customization.logoUrl || undefined
        }
      })
    } else if (type === 'analytics' && qr) {
      setSelectedQR(qr)
    }
    
    setShowModal(true)
  }

  const resetForm = () => {
    setFormData({
      name: '',
      type: 'table',
      tableNumber: 1,
      customization: {
        foregroundColor: '#000000',
        backgroundColor: '#ffffff',
        logoUrl: '',
        style: 'square'
      }
    })
  }

  const generateBulkQRs = () => {
    const count = parseInt(prompt('Kaç adet masa QR kodu oluşturmak istiyorsiz?') || '0')
    
    if (count > 0 && count <= 50) {
      const newQRs: QRCode[] = []
      
      for (let i = 1; i <= count; i++) {
        const tableNumber = Math.max(...qrCodes.filter(qr => qr.tableNumber).map(qr => qr.tableNumber!), 0) + i
        
        newQRs.push({
          id: Date.now() + i,
          name: `Masa ${tableNumber}`,
          type: 'table',
          tableNumber,
          url: `https://lezzetduragi.com/qr/table/${tableNumber}`,
      scans: 0,
          lastScan: 'Henüz taranmadı',
          created: new Date().toISOString().split('T')[0],
          active: true,
          customization: {
            foregroundColor: '#000000',
            backgroundColor: '#ffffff',
            style: 'square'
          }
        })
      }
      
      setQrCodes(prev => [...newQRs, ...prev])
      showToast(`${count} adet QR kod oluşturuldu!`, 'success')
    } else if (count > 50) {
      showToast('En fazla 50 adet QR kod oluşturabilirsiniz!', 'error')
    }
  }

  return (
    <div className="qr-codes-page">
      <div className="page-header">
        <div>
          <h1>QR Kod Yönetimi</h1>
          <p>QR kodlarınızı oluşturun, düzenleyin ve takip edin</p>
        </div>
        
        <div className="header-actions">
          <button
            onClick={handleBulkDownload}
            className="btn-secondary"
          >
            <Download className="w-4 h-4" />
            Toplu İndir
          </button>
          
          <button
            onClick={generateBulkQRs}
            className="btn-secondary"
          >
            <Plus className="w-4 h-4" />
            Toplu Oluştur
          </button>
          
          <button
            onClick={() => openModal('create')}
            className="btn-primary"
          >
            <Plus className="w-4 h-4" />
            Yeni QR Kod
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs-container">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
          >
            <tab.icon className="w-5 h-5" />
            {tab.label}
          </button>
        ))}
          </div>

      {/* Content */}
      <div className="tab-content">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            {/* QR Codes List */}
            {activeTab === 'list' && (
              <div className="qr-codes-grid">
                {qrCodes.map(qr => (
                  <motion.div
                    key={qr.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={`qr-code-card ${!qr.active ? 'inactive' : ''}`}
                  >
                    <div className="qr-code-header">
                      <div className="qr-info">
                        <h3>{qr.name}</h3>
                        <span className={`qr-type ${qr.type}`}>
                          {qrTypes.find(t => t.value === qr.type)?.label}
                        </span>
                      </div>
                      
                      <div className="qr-actions">
                        <button
                          onClick={() => openModal('analytics', qr)}
                          className="action-button"
                          title="Analitik"
                        >
                          <BarChart3 className="w-4 h-4" />
                        </button>
                        
                        <button
                          onClick={() => openModal('edit', qr)}
                          className="action-button"
                          title="Düzenle"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        
                        <button
                          onClick={() => handleToggleActive(qr.id)}
                          className={`action-button ${qr.active ? 'active' : 'inactive'}`}
                          title={qr.active ? 'Deaktive Et' : 'Aktive Et'}
                        >
                          {qr.active ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                        </button>
                        
                        <button
                          onClick={() => handleDeleteQR(qr.id)}
                          className="action-button danger"
                          title="Sil"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* QR Code Visual */}
                    <div className="qr-code-visual">
                                            <div
                        className="qr-code-preview"
                        style={{
                          backgroundColor: qr.customization.backgroundColor,
                          border: `2px solid ${qr.customization.foregroundColor}20`
                        }}
                      >
                        {qrPreviewUrls[qr.id] ? (
                          <img 
                            src={qrPreviewUrls[qr.id]} 
                            alt={`QR kod - ${qr.name}`}
                            className="qr-image"
                          />
                        ) : (
                          <QrCode 
                            className="qr-icon" 
                            style={{ color: qr.customization.foregroundColor }}
                          />
                        )}
                      </div>
        </div>

        {/* Stats */}
                    <div className="qr-code-stats">
                      <div className="stat-item">
                        <Users className="w-4 h-4" />
                        <span>{qr.scans} tarama</span>
          </div>
                      <div className="stat-item">
                        <Calendar className="w-4 h-4" />
                        <span>{qr.lastScan}</span>
          </div>
        </div>

                    {/* URL */}
                    <div className="qr-code-url">
                      <input
                        type="text"
                        value={qr.url}
                        readOnly
                        className="url-input"
                      />
                      <button
                        onClick={() => handleCopyURL(qr.url)}
                        className="copy-button"
                        title="URL'yi Kopyala"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
        </div>

                    {/* Download Actions */}
                    <div className="qr-code-actions">
                      <button
                        onClick={() => handleDownloadQR(qr)}
                        className="btn-secondary"
                      >
                        <Download className="w-4 h-4" />
                        İndir
                      </button>
                      
                      <button
                        onClick={() => handlePrintQR(qr)}
                        className="btn-secondary"
                      >
                        <Printer className="w-4 h-4" />
                        Yazdır
                      </button>
                      
                      <button
                        onClick={() => window.open(qr.url, '_blank')}
                        className="btn-primary"
                      >
                        <Share2 className="w-4 h-4" />
                        Önizle
                      </button>
            </div>
                  </motion.div>
                ))}
                
                {qrCodes.length === 0 && (
                  <div className="empty-state">
                    <QrCode className="empty-icon" />
                    <h3>Henüz QR kod oluşturmadınız</h3>
                    <p>İlk QR kodunuzu oluşturmak için "Yeni QR Kod" butonuna tıklayın</p>
                    <button
                      onClick={() => openModal('create')}
                      className="btn-primary"
                    >
                      <Plus className="w-4 h-4" />
                      İlk QR Kodunu Oluştur
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Analytics Tab */}
            {activeTab === 'analytics' && (
              <div className="analytics-content">
                <div className="analytics-header">
                  <h3>QR Kod Analitikleri</h3>
                  <button 
                    onClick={() => router.push('/dashboard/analitik')}
                    className="btn-secondary"
                  >
                    <BarChart3 className="w-4 h-4" />
                    Detaylı Analitik
                  </button>
                </div>

                <div className="analytics-grid">
                  <div className="analytics-card">
                    <div className="analytics-title">
                      <QrCode className="w-5 h-5" />
                      Toplam QR Kodları
                    </div>
                    <div className="analytics-value">{qrCodes.length}</div>
                    <div className="analytics-change positive">
                      +{qrCodes.filter(qr => qr.active).length} aktif
                    </div>
                  </div>

                  <div className="analytics-card">
                    <div className="analytics-title">
                      <Users className="w-5 h-5" />
                      Toplam Tarama
                    </div>
                    <div className="analytics-value">
                      {qrCodes.reduce((sum, qr) => sum + qr.scans, 0)}
                    </div>
                    <div className="analytics-change positive">+15% bu ay</div>
                  </div>

                  <div className="analytics-card">
                    <div className="analytics-title">
                      <BarChart3 className="w-5 h-5" />
                      Ortalama Tarama
                    </div>
                    <div className="analytics-value">
                      {Math.round(qrCodes.reduce((sum, qr) => sum + qr.scans, 0) / qrCodes.length) || 0}
                    </div>
                    <div className="analytics-change">QR kod başına</div>
                  </div>

                  <div className="analytics-card">
                    <div className="analytics-title">
                      <Star className="w-5 h-5" />
                      En Popüler
                    </div>
                    <div className="analytics-value">
                      {qrCodes.sort((a, b) => b.scans - a.scans)[0]?.name || 'Yok'}
                    </div>
                    <div className="analytics-change">
                      {qrCodes.sort((a, b) => b.scans - a.scans)[0]?.scans || 0} tarama
                    </div>
                  </div>
                </div>

                {/* Top QR Codes */}
                <div className="top-qr-codes">
                  <h4>En Çok Taranan QR Kodları</h4>
                  <div className="top-qr-list">
                    {qrCodes
                      .sort((a, b) => b.scans - a.scans)
                      .slice(0, 5)
                      .map((qr, index) => (
                        <div key={qr.id} className="top-qr-item">
                          <div className="rank">#{index + 1}</div>
                          <div className="qr-info">
                            <div className="qr-name">{qr.name}</div>
                            <div className="qr-type">{qrTypes.find(t => t.value === qr.type)?.label}</div>
                          </div>
                          <div className="qr-scans">{qr.scans} tarama</div>
                          <div className="qr-progress">
                            <div 
                              className="progress-bar"
                              style={{ 
                                width: `${(qr.scans / Math.max(...qrCodes.map(q => q.scans))) * 100}%` 
                              }}
                            />
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            )}

            {/* Templates Tab */}
            {activeTab === 'templates' && (
              <div className="templates-content">
                <div className="templates-header">
                  <h3>QR Kod Şablonları</h3>
                  <p>Hazır şablonları kullanarak hızlıca QR kod oluşturun</p>
                </div>

                <div className="templates-grid">
                  <div className="template-card" onClick={() => openModal('create')}>
                    <div className="template-preview">
                      <QrCode className="template-icon" />
                    </div>
                    <div className="template-info">
                      <h4>Klasik Siyah</h4>
                      <p>Standart siyah-beyaz QR kod</p>
                    </div>
                  </div>

                  <div className="template-card" onClick={() => {
                    setFormData(prev => ({
                      ...prev,
                      customization: {
                        ...prev.customization,
                        foregroundColor: '#dc2626',
                        style: 'round'
                      }
                    }))
                    openModal('create')
                  }}>
                    <div className="template-preview red">
                      <QrCode className="template-icon" />
                    </div>
                    <div className="template-info">
                      <h4>Kırmızı Yuvarlak</h4>
                      <p>Kırmızı renkli yuvarlak köşeli</p>
                    </div>
                  </div>

                  <div className="template-card" onClick={() => {
                    setFormData(prev => ({
                      ...prev,
                      customization: {
                        ...prev.customization,
                        foregroundColor: '#059669',
                        style: 'dots'
                      }
                    }))
                    openModal('create')
                  }}>
                    <div className="template-preview green">
                      <QrCode className="template-icon" />
                    </div>
                    <div className="template-info">
                      <h4>Yeşil Noktalı</h4>
                      <p>Yeşil renkli nokta desenli</p>
                    </div>
                  </div>

                  <div className="template-card" onClick={() => {
                    setFormData(prev => ({
                      ...prev,
                      customization: {
                        ...prev.customization,
                        foregroundColor: '#7c3aed',
                        backgroundColor: '#f3f4f6'
                      }
                    }))
                    openModal('create')
                  }}>
                    <div className="template-preview purple">
                      <QrCode className="template-icon" />
                    </div>
                    <div className="template-info">
                      <h4>Mor Premium</h4>
                      <p>Mor renkli premium tasarım</p>
              </div>
            </div>
          </div>
        </div>
            )}
          </motion.div>
        </AnimatePresence>
          </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>
                {modalType === 'create' && 'Yeni QR Kod Oluştur'}
                {modalType === 'edit' && 'QR Kod Düzenle'}
                {modalType === 'analytics' && `${selectedQR?.name} - Analitik`}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="modal-close"
              >
                ×
              </button>
            </div>

            <div className="modal-body">
              {(modalType === 'create' || modalType === 'edit') && (
                <div className="qr-form">
                  <div className="form-group">
                    <label>QR Kod Adı</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="QR kod için bir isim girin"
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label>QR Kod Türü</label>
                    <div className="qr-type-grid">
                      {qrTypes.map(type => (
                        <button
                          key={type.value}
                          onClick={() => setFormData(prev => ({ ...prev, type: type.value as 'table' | 'takeaway' | 'delivery' | 'general' }))}
                          className={`qr-type-button ${formData.type === type.value ? 'active' : ''}`}
                        >
                          <type.icon className="w-5 h-5" />
                          {type.label}
                        </button>
                      ))}
          </div>
        </div>

                  {formData.type === 'table' && (
                    <div className="form-group">
                      <label>Masa Numarası</label>
                      <input
                        type="number"
                        value={formData.tableNumber}
                        onChange={(e) => setFormData(prev => ({ ...prev, tableNumber: parseInt(e.target.value) || 1 }))}
                        min="1"
                        className="form-input"
                      />
                    </div>
                  )}

                  <div className="customization-section">
                    <h4>Özelleştirme</h4>
                    
                    <div className="color-inputs">
                      <div className="form-group">
                        <label>Ön Plan Rengi</label>
                        <div className="color-input-group">
                          <input
                            type="color"
                            value={formData.customization.foregroundColor}
                            onChange={(e) => setFormData(prev => ({
                              ...prev,
                              customization: { ...prev.customization, foregroundColor: e.target.value }
                            }))}
                            className="color-input"
                          />
                          <input
                            type="text"
                            value={formData.customization.foregroundColor}
                            onChange={(e) => setFormData(prev => ({
                              ...prev,
                              customization: { ...prev.customization, foregroundColor: e.target.value }
                            }))}
                            className="form-input"
          />
        </div>
      </div>

                      <div className="form-group">
                        <label>Arka Plan Rengi</label>
                        <div className="color-input-group">
                          <input
                            type="color"
                            value={formData.customization.backgroundColor}
                            onChange={(e) => setFormData(prev => ({
                              ...prev,
                              customization: { ...prev.customization, backgroundColor: e.target.value }
                            }))}
                            className="color-input"
                          />
                          <input
                            type="text"
                            value={formData.customization.backgroundColor}
                            onChange={(e) => setFormData(prev => ({
                              ...prev,
                              customization: { ...prev.customization, backgroundColor: e.target.value }
                            }))}
                            className="form-input"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Stil</label>
                      <div className="style-options">
                        <button
                          onClick={() => setFormData(prev => ({
                            ...prev,
                            customization: { ...prev.customization, style: 'square' }
                          }))}
                          className={`style-button ${formData.customization.style === 'square' ? 'active' : ''}`}
                        >
                          Kare
                        </button>
                        <button
                          onClick={() => setFormData(prev => ({
                            ...prev,
                            customization: { ...prev.customization, style: 'round' }
                          }))}
                          className={`style-button ${formData.customization.style === 'round' ? 'active' : ''}`}
                        >
                          Yuvarlak
                        </button>
                        <button
                          onClick={() => setFormData(prev => ({
                            ...prev,
                            customization: { ...prev.customization, style: 'dots' }
                          }))}
                          className={`style-button ${formData.customization.style === 'dots' ? 'active' : ''}`}
                        >
                          Nokta
                        </button>
                      </div>
                    </div>
        </div>

                  {/* Preview */}
                  <div className="preview-section">
                    <h4>Önizleme</h4>
                    <div 
                      className="qr-preview"
                      style={{ 
                        backgroundColor: formData.customization.backgroundColor,
                        border: `2px solid ${formData.customization.foregroundColor}20`
                      }}
                    >
                      {previewUrl ? (
                        <img 
                          src={previewUrl} 
                          alt="QR kod önizlemesi"
                          className="qr-preview-image"
                        />
                      ) : (
                        <QrCode 
                          className="qr-preview-icon" 
                          style={{ color: formData.customization.foregroundColor }}
                        />
                      )}
                    </div>
                  </div>
                </div>
              )}

              {modalType === 'analytics' && selectedQR && (
                <div className="qr-analytics">
                  <div className="analytics-stats">
                    <div className="stat-card">
                      <div className="stat-icon">
                        <Users className="w-6 h-6" />
                      </div>
                      <div className="stat-info">
                        <div className="stat-value">{selectedQR.scans}</div>
                        <div className="stat-label">Toplam Tarama</div>
                      </div>
                </div>

                    <div className="stat-card">
                      <div className="stat-icon">
                        <Calendar className="w-6 h-6" />
                      </div>
                      <div className="stat-info">
                        <div className="stat-value">{selectedQR.lastScan}</div>
                        <div className="stat-label">Son Tarama</div>
                      </div>
                    </div>

                    <div className="stat-card">
                      <div className="stat-icon">
                        <BarChart3 className="w-6 h-6" />
                      </div>
                      <div className="stat-info">
                        <div className="stat-value">{Math.round(selectedQR.scans / 30) || 0}</div>
                        <div className="stat-label">Günlük Ortalama</div>
                      </div>
                    </div>
                  </div>

                  <div className="qr-info-detailed">
                    <h4>QR Kod Bilgileri</h4>
                    <div className="info-grid">
                      <div className="info-item">
                        <span className="info-label">Ad:</span>
                        <span className="info-value">{selectedQR.name}</span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">Tür:</span>
                        <span className="info-value">{qrTypes.find(t => t.value === selectedQR.type)?.label}</span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">URL:</span>
                        <span className="info-value">{selectedQR.url}</span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">Oluşturulma:</span>
                        <span className="info-value">{selectedQR.created}</span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">Durum:</span>
                        <span className={`info-status ${selectedQR.active ? 'active' : 'inactive'}`}>
                          {selectedQR.active ? 'Aktif' : 'Pasif'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              </div>

            {(modalType === 'create' || modalType === 'edit') && (
              <div className="modal-footer">
                <button
                  onClick={() => setShowModal(false)}
                  className="btn-secondary"
                >
                  İptal
                </button>
                <button
                  onClick={modalType === 'create' ? handleCreateQR : handleEditQR}
                  disabled={isGenerating}
                  className="btn-primary"
                >
                  {isGenerating ? (
                    <>
                      <div className="spinner" />
                      {modalType === 'create' ? 'Oluşturuluyor...' : 'Güncelleniyor...'}
                    </>
                  ) : (
                    <>
                      {modalType === 'create' ? (
                        <>
                          <Plus className="w-4 h-4" />
                          QR Kod Oluştur
                        </>
                      ) : (
                        <>
                          <Save className="w-4 h-4" />
                          Güncelle
                        </>
                      )}
                    </>
                  )}
                </button>
              </div>
            )}
              </div>
        </div>
      )}
    </div>
  )
} 

export default QRCodesPage 