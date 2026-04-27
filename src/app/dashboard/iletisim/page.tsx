'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { 
  Send, 
  Mail, 
  MessageSquare, 
  Users, 
  Upload, 
  Download, 
  Edit,
  Trash2,
  Plus,
  Star,
  Eye,
  Copy,
  Filter,
  Search,
  Settings,
  Smartphone,
  AtSign,
  CheckCircle,
  AlertCircle,
  User,
  Calendar,
  FileText,
  Phone,
  Image,
  Palette,
  Type,
  Save,
  RefreshCw,
  Target,
  Clock,
  XCircle,
  BarChart3,
  X,
  Play,
  Pause,
  Archive
} from 'lucide-react'

// Types
interface Campaign {
  id: number
  name: string
  type: string
  status: string
  sent: number
  delivered: number
  opened: number
  clicked: number
  created: string
}

// Mock data
const mockCustomers = [
  { id: 1, name: 'Ahmet Yılmaz', phone: '+90555123456', email: 'ahmet@example.com', lastVisit: '2024-01-15', rating: 4.5, segment: 'VIP' },
  { id: 2, name: 'Fatma Kaya', phone: '+90555123457', email: 'fatma@example.com', lastVisit: '2024-01-14', rating: 4.8, segment: 'Sadık' },
  { id: 3, name: 'Mehmet Öz', phone: '+90555123458', email: 'mehmet@example.com', lastVisit: '2024-01-13', rating: 4.2, segment: 'Normal' },
  { id: 4, name: 'Ayşe Demir', phone: '+90555123459', email: 'ayse@example.com', lastVisit: '2024-01-12', rating: 4.7, segment: 'VIP' },
  { id: 5, name: 'Ali Çelik', phone: '+90555123460', email: 'ali@example.com', lastVisit: '2024-01-11', rating: 4.3, segment: 'Sadık' },
]

const mockCampaigns: Campaign[] = [
  { id: 1, name: 'Yaz Kampanyası', type: 'SMS', status: 'Aktif', sent: 245, delivered: 240, opened: 180, clicked: 45, created: '2024-01-10' },
  { id: 2, name: 'Yeni Menü Tanıtımı', type: 'Email', status: 'Taslak', sent: 0, delivered: 0, opened: 0, clicked: 0, created: '2024-01-09' },
  { id: 3, name: 'Doğum Günü Kutlaması', type: 'SMS', status: 'Tamamlandı', sent: 156, delivered: 154, opened: 120, clicked: 30, created: '2024-01-08' },
]

const Communication: React.FC = () => {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('send')
  const [messageType, setMessageType] = useState<'sms' | 'email'>('sms')
  const [selectedCustomers, setSelectedCustomers] = useState<number[]>([])
  const [messageContent, setMessageContent] = useState('')
  const [emailSubject, setEmailSubject] = useState('')
  const [customerFilter, setCustomerFilter] = useState('')
  const [segmentFilter, setSegmentFilter] = useState('all')
  const [isSending, setIsSending] = useState(false)
  const [campaigns, setCampaigns] = useState<Campaign[]>(mockCampaigns)
  const [showCampaignModal, setShowCampaignModal] = useState(false)
  const [editingCampaign, setEditingCampaign] = useState<Campaign | null>(null)

  const tabs = [
    { id: 'send', label: 'Mesaj Gönder', icon: Send },
    { id: 'campaigns', label: 'Kampanyalar', icon: Target },
    { id: 'templates', label: 'Şablonlar', icon: Edit },
    { id: 'analytics', label: 'Analitik', icon: BarChart3 },
  ]

  const segments = [
    { value: 'all', label: 'Tüm Müşteriler', count: mockCustomers.length },
    { value: 'vip', label: 'VIP Müşteriler', count: mockCustomers.filter(c => c.segment === 'VIP').length },
    { value: 'recent', label: 'Yeni Müşteriler', count: mockCustomers.filter(c => c.segment === 'Sadık').length },
    { value: 'inactive', label: 'Pasif Müşteriler', count: mockCustomers.filter(c => c.segment === 'Normal').length },
  ]

  const smsTemplates = [
    { id: 1, name: 'Hoş Geldin', content: 'Merhaba {{name}}, restoranımıza hoş geldiniz! İlk siparişinizde %10 indirim için kodu kullanın: HOSGELDIN' },
    { id: 2, name: 'Rezervasyon Hatırlatma', content: 'Sayın {{name}}, bugün saat {{time}} için rezervasyonunuz bulunmaktadır. Görüşmek üzere!' },
    { id: 3, name: 'Doğum Günü Kutlama', content: 'Doğum gününüz kutlu olsun {{name}}! Özel gününüzde %20 indirim sizinle. Kodu: DOGUMGUNU' },
  ]

  const emailTemplates = [
    { id: 1, name: 'Yeni Menü Tanıtımı', subject: 'Yeni Lezzetler Sizi Bekliyor!', content: 'Sevgili {{name}}, yeni menümüzdeki özel lezzetleri keşfedin...' },
    { id: 2, name: 'Özel Davet', subject: 'Sadece Size Özel Davet', content: 'Merhaba {{name}}, size özel hazırladığımız etkinliğimize davetlisiniz...' },
  ]

  const handleSelectCustomer = (customerId: number) => {
    setSelectedCustomers(prev => 
      prev.includes(customerId) 
        ? prev.filter(id => id !== customerId)
        : [...prev, customerId]
    )
  }

  const handleSelectAllCustomers = () => {
    if (selectedCustomers.length === segments.length - 1) {
      setSelectedCustomers([])
    } else {
      setSelectedCustomers(segments.map(s => s.value === 'all' ? 0 : Number(s.value)).filter(id => id !== 0))
    }
  }

  const handleSendMessage = async () => {
    if (!messageContent.trim()) {
      showToast('Mesaj içeriği boş olamaz!', 'error')
      return
    }

    if (selectedCustomers.length === 0) {
      showToast('En az bir müşteri seçmelisiniz!', 'error')
      return
    }

    if (messageType === 'email' && !emailSubject.trim()) {
      showToast('Email konusu boş olamaz!', 'error')
      return
    }

    setIsSending(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      const selectedCustomerData = segments.filter(s => selectedCustomers.includes(Number(s.value))).map(s => ({
        ...s,
        id: Number(s.value)
      }))
      const messageTypeLabel = messageType === 'sms' ? 'SMS' : 'Email'
      
      showToast(`${messageTypeLabel} başarıyla gönderildi! (${selectedCustomerData.length} alıcı)`, 'success')
      
      // Reset form
      setMessageContent('')
      setEmailSubject('')
      setSelectedCustomers([])
      
      // Create new campaign record
      const newCampaign: Campaign = {
        id: Date.now(),
        name: `${messageTypeLabel} Kampanyası - ${new Date().toLocaleDateString()}`,
        type: messageType.toUpperCase(),
        status: 'Gönderildi',
        sent: selectedCustomerData.length,
        delivered: Math.floor(selectedCustomerData.length * 0.95),
        opened: Math.floor(selectedCustomerData.length * 0.75),
        clicked: Math.floor(selectedCustomerData.length * 0.25),
        created: new Date().toISOString().split('T')[0]
      }
      
      setCampaigns(prev => [newCampaign, ...prev])
      
    } catch (error) {
      showToast('Mesaj gönderilirken bir hata oluştu!', 'error')
    } finally {
      setIsSending(false)
    }
  }

  const handleUseTemplate = (template: any) => {
    setMessageContent(template.content)
    if (messageType === 'email' && template.subject) {
      setEmailSubject(template.subject)
    }
    showToast('Şablon uygulandı!', 'success')
  }

  const handleCampaignAction = (action: string, campaignId: number) => {
    const campaign = campaigns.find(c => c.id === campaignId)
    if (!campaign) return

    switch (action) {
      case 'edit':
        setEditingCampaign(campaign)
        setShowCampaignModal(true)
        break
      case 'pause':
        setCampaigns(prev => prev.map(c => 
          c.id === campaignId ? { ...c, status: 'Duraklatıldı' } : c
        ))
        showToast('Kampanya duraklatıldı!', 'info')
        break
      case 'resume':
        setCampaigns(prev => prev.map(c => 
          c.id === campaignId ? { ...c, status: 'Aktif' } : c
        ))
        showToast('Kampanya yeniden başlatıldı!', 'success')
        break
      case 'delete':
        setCampaigns(prev => prev.filter(c => c.id !== campaignId))
        showToast('Kampanya silindi!', 'info')
        break
      case 'duplicate':
        const duplicatedCampaign: Campaign = {
          ...campaign,
          id: Date.now(),
          name: `${campaign.name} (Kopya)`,
          status: 'Taslak',
          sent: 0,
          delivered: 0,
          opened: 0,
          clicked: 0,
          created: new Date().toISOString().split('T')[0]
        }
        setCampaigns(prev => [duplicatedCampaign, ...prev])
        showToast('Kampanya kopyalandı!', 'success')
        break
      case 'archive':
        setCampaigns(prev => prev.map(c => 
          c.id === campaignId ? { ...c, status: 'Arşivlendi' } : c
        ))
        showToast('Kampanya arşivlendi!', 'info')
        break
    }
  }

  const exportCampaignData = () => {
    const csvContent = [
      'Kampanya Adı,Tip,Durum,Gönderilen,Teslim Edilen,Açılan,Tıklanan,Oluşturulma Tarihi',
      ...campaigns.map(c => `${c.name},${c.type},${c.status},${c.sent},${c.delivered},${c.opened},${c.clicked},${c.created}`)
    ].join('\n')
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = `kampanya-raporu-${new Date().toISOString().split('T')[0]}.csv`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(link.href)
    
    showToast('Kampanya verileri CSV olarak indirildi!', 'success')
  }

  const filteredCustomers = segments.filter(s => {
    const matchesName = s.label.toLowerCase().includes(customerFilter.toLowerCase())
    const matchesSegment = segmentFilter === 'all' || s.value === segmentFilter
    return matchesName && matchesSegment
  })

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            İletişim ve Pazarlama
          </h1>
          <p className="text-gray-600">
            Müşterilerinizle etkili iletişim kurun ve pazarlama kampanyalarınızı yönetin
          </p>
        </div>

        {/* Tabs */}
        <div className="premium-card p-4 mb-6">
          <div className="flex flex-wrap gap-2 mb-6">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  activeTab === tab.id
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {/* Send Message Tab */}
              {activeTab === 'send' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Message Composition */}
                    <div className="message-composition">
                      <div className="section-header">
                        <h3>Mesaj Oluştur</h3>
                        <div className="message-type-toggle">
                          <button
                            onClick={() => setMessageType('sms')}
                            className={`type-button ${messageType === 'sms' ? 'active' : ''}`}
                          >
                            <Smartphone className="w-4 h-4" />
                            SMS
                          </button>
                          <button
                            onClick={() => setMessageType('email')}
                            className={`type-button ${messageType === 'email' ? 'active' : ''}`}
                          >
                            <Mail className="w-4 h-4" />
                            Email
                          </button>
                        </div>
                      </div>

                      {/* Email Subject */}
                      {messageType === 'email' && (
                        <div className="form-group">
                          <label>Email Konusu</label>
                          <input
                            type="text"
                            value={emailSubject}
                            onChange={(e) => setEmailSubject(e.target.value)}
                            placeholder="Email konusunu yazın..."
                            className="form-input"
                          />
                        </div>
                      )}

                      {/* Message Content */}
                      <div className="form-group">
                        <label>Mesaj İçeriği</label>
                        <textarea
                          value={messageContent}
                          onChange={(e) => setMessageContent(e.target.value)}
                          placeholder={messageType === 'sms' 
                            ? 'SMS içeriğinizi yazın... (160 karakter)'
                            : 'Email içeriğinizi yazın...'
                          }
                          className="form-textarea"
                          rows={messageType === 'sms' ? 4 : 8}
                          maxLength={messageType === 'sms' ? 160 : undefined}
                        />
                        {messageType === 'sms' && (
                          <div className="character-counter">
                            {messageContent.length}/160 karakter
                          </div>
                        )}
                      </div>

                      {/* Templates */}
                      <div className="templates-section">
                        <h4>Şablonlar</h4>
                        <div className="templates-grid">
                          {(messageType === 'sms' ? smsTemplates : emailTemplates).map(template => (
                            <button
                              key={template.id}
                              onClick={() => handleUseTemplate(template)}
                              className="template-button"
                            >
                              <div className="template-name">{template.name}</div>
                              <div className="template-preview">
                                {template.content.substring(0, 50)}...
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Send Button */}
                      <button
                        onClick={handleSendMessage}
                        disabled={isSending || selectedCustomers.length === 0}
                        className="send-button"
                      >
                        {isSending ? (
                          <>
                            <div className="spinner" />
                            Gönderiliyor...
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            Mesaj Gönder ({selectedCustomers.length})
                          </>
                        )}
                      </button>
                    </div>

                    {/* Customer Selection */}
                    <div className="customer-selection">
                      <div className="section-header">
                        <h3>Alıcı Seçimi</h3>
                        <div className="customer-stats">
                          {selectedCustomers.length} / {filteredCustomers.length} seçili
                        </div>
                      </div>

                      {/* Filters */}
                      <div className="filters">
                        <input
                          type="text"
                          value={customerFilter}
                          onChange={(e) => setCustomerFilter(e.target.value)}
                          placeholder="Müşteri ara..."
                          className="form-input"
                        />
                        <select
                          value={segmentFilter}
                          onChange={(e) => setSegmentFilter(e.target.value)}
                          className="form-select"
                        >
                          {segments.map(segment => (
                            <option key={segment.value} value={segment.value}>
                              {segment.label} ({segment.count})
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Select All */}
                      <button
                        onClick={handleSelectAllCustomers}
                        className="select-all-button"
                      >
                        <CheckCircle className="w-4 h-4" />
                        {selectedCustomers.length === segments.length - 1 ? 'Tümünü Kaldır' : 'Tümünü Seç'}
                      </button>

                      {/* Customer List */}
                      <div className="customer-list">
                        {filteredCustomers.map(segment => (
                          <div
                            key={segment.value}
                            className={`customer-item ${selectedCustomers.includes(Number(segment.value)) ? 'selected' : ''}`}
                            onClick={() => handleSelectCustomer(Number(segment.value))}
                          >
                            <div className="customer-info">
                              <div className="customer-name">{segment.label}</div>
                              <div className="customer-details">
                                <span className="customer-segment">{segment.label}</span>
                              </div>
                              <div className="customer-contact">
                                {segment.value === 'sms' ? 'SMS' : segment.value === 'email' ? 'Email' : ''}
                              </div>
                            </div>
                            <div className="customer-checkbox">
                              {selectedCustomers.includes(Number(segment.value)) && (
                                <CheckCircle className="w-5 h-5 text-blue-500" />
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Campaigns Tab */}
              {activeTab === 'campaigns' && (
                <div className="campaigns-tab">
                  <div className="campaigns-header">
                    <h3>Kampanya Yönetimi</h3>
                    <div className="campaigns-actions">
                      <button
                        onClick={exportCampaignData}
                        className="btn-secondary"
                      >
                        <Download className="w-4 h-4" />
                        Verileri İndir
                      </button>
                      <button
                        onClick={() => setShowCampaignModal(true)}
                        className="btn-primary"
                      >
                        <Plus className="w-4 h-4" />
                        Yeni Kampanya
                      </button>
                    </div>
                  </div>

                  <div className="campaigns-grid">
                    {campaigns.map(campaign => (
                      <div key={campaign.id} className="campaign-card">
                        <div className="campaign-header">
                          <div className="campaign-title">
                            <h4>{campaign.name}</h4>
                            <span className={`campaign-status ${campaign.status.toLowerCase()}`}>
                              {campaign.status}
                            </span>
                          </div>
                          <div className="campaign-actions">
                            <button
                              onClick={() => handleCampaignAction('edit', campaign.id)}
                              className="action-button"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            {campaign.status === 'Aktif' ? (
                              <button
                                onClick={() => handleCampaignAction('pause', campaign.id)}
                                className="action-button"
                              >
                                <Pause className="w-4 h-4" />
                              </button>
                            ) : campaign.status === 'Duraklatıldı' ? (
                              <button
                                onClick={() => handleCampaignAction('resume', campaign.id)}
                                className="action-button"
                              >
                                <Play className="w-4 h-4" />
                              </button>
                            ) : null}
                            <button
                              onClick={() => handleCampaignAction('duplicate', campaign.id)}
                              className="action-button"
                            >
                              <Archive className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleCampaignAction('delete', campaign.id)}
                              className="action-button danger"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        <div className="campaign-info">
                          <div className="campaign-type">
                            {campaign.type === 'SMS' ? (
                              <Smartphone className="w-4 h-4" />
                            ) : (
                              <Mail className="w-4 h-4" />
                            )}
                            {campaign.type}
                          </div>
                          <div className="campaign-date">
                            <Calendar className="w-4 h-4" />
                            {campaign.created}
                          </div>
                        </div>

                        <div className="campaign-stats">
                          <div className="stat-item">
                            <div className="stat-label">Gönderilen</div>
                            <div className="stat-value">{campaign.sent}</div>
                          </div>
                          <div className="stat-item">
                            <div className="stat-label">Teslim Edilen</div>
                            <div className="stat-value">{campaign.delivered}</div>
                          </div>
                          <div className="stat-item">
                            <div className="stat-label">Açılan</div>
                            <div className="stat-value">{campaign.opened}</div>
                          </div>
                          <div className="stat-item">
                            <div className="stat-label">Tıklanan</div>
                            <div className="stat-value">{campaign.clicked}</div>
                          </div>
                        </div>

                        <div className="campaign-progress">
                          <div className="progress-bar">
                            <div 
                              className="progress-fill"
                              style={{ width: `${(campaign.delivered / campaign.sent) * 100}%` }}
                            />
                          </div>
                          <div className="progress-label">
                            Teslimat Oranı: {campaign.sent > 0 ? Math.round((campaign.delivered / campaign.sent) * 100) : 0}%
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Templates Tab */}
              {activeTab === 'templates' && (
                <div className="templates-tab">
                  <div className="templates-header">
                    <h3>Mesaj Şablonları</h3>
                    <button className="btn-primary">
                      <Plus className="w-4 h-4" />
                      Yeni Şablon
                    </button>
                  </div>

                  <div className="templates-grid">
                    <div className="template-section">
                      <h4>SMS Şablonları</h4>
                      <div className="templates-list">
                        {smsTemplates.map(template => (
                          <div key={template.id} className="template-card">
                            <div className="template-header">
                              <h5>{template.name}</h5>
                              <div className="template-actions">
                                <button className="action-button">
                                  <Edit className="w-4 h-4" />
                                </button>
                                <button className="action-button danger">
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                            <div className="template-content">
                              {template.content}
                            </div>
                            <button
                              onClick={() => {
                                setMessageType('sms')
                                setActiveTab('send')
                                handleUseTemplate(template)
                              }}
                              className="use-template-button"
                            >
                              Kullan
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="template-section">
                      <h4>Email Şablonları</h4>
                      <div className="templates-list">
                        {emailTemplates.map(template => (
                          <div key={template.id} className="template-card">
                            <div className="template-header">
                              <h5>{template.name}</h5>
                              <div className="template-actions">
                                <button className="action-button">
                                  <Edit className="w-4 h-4" />
                                </button>
                                <button className="action-button danger">
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                            <div className="template-subject">
                              <strong>Konu:</strong> {template.subject}
                            </div>
                            <div className="template-content">
                              {template.content}
                            </div>
                            <button
                              onClick={() => {
                                setMessageType('email')
                                setActiveTab('send')
                                handleUseTemplate(template)
                              }}
                              className="use-template-button"
                            >
                              Kullan
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Analytics Tab */}
              {activeTab === 'analytics' && (
                <div className="analytics-tab">
                  <div className="analytics-header">
                    <h3>İletişim Analitikleri</h3>
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
                        <MessageSquare className="w-5 h-5" />
                        SMS İstatistikleri
                      </div>
                      <div className="analytics-stats">
                        <div className="stat-item">
                          <div className="stat-value">1,245</div>
                          <div className="stat-label">Toplam Gönderim</div>
                        </div>
                        <div className="stat-item">
                          <div className="stat-value">97%</div>
                          <div className="stat-label">Teslimat Oranı</div>
                        </div>
                        <div className="stat-item">
                          <div className="stat-value">75%</div>
                          <div className="stat-label">Açılma Oranı</div>
                        </div>
                        <div className="stat-item">
                          <div className="stat-value">15%</div>
                          <div className="stat-label">Tıklama Oranı</div>
                        </div>
                      </div>
                    </div>

                    <div className="analytics-card">
                      <div className="analytics-title">
                        <Mail className="w-5 h-5" />
                        Email İstatistikleri
                      </div>
                      <div className="analytics-stats">
                        <div className="stat-item">
                          <div className="stat-value">856</div>
                          <div className="stat-label">Toplam Gönderim</div>
                        </div>
                        <div className="stat-item">
                          <div className="stat-value">92%</div>
                          <div className="stat-label">Teslimat Oranı</div>
                        </div>
                        <div className="stat-item">
                          <div className="stat-value">45%</div>
                          <div className="stat-label">Açılma Oranı</div>
                        </div>
                        <div className="stat-item">
                          <div className="stat-value">8%</div>
                          <div className="stat-label">Tıklama Oranı</div>
                        </div>
                      </div>
                    </div>

                    <div className="analytics-card">
                      <div className="analytics-title">
                        <Target className="w-5 h-5" />
                        Segment Performansı
                      </div>
                      <div className="segment-stats">
                        <div className="segment-item">
                          <div className="segment-name">VIP Müşteriler</div>
                          <div className="segment-bar">
                            <div className="segment-fill" style={{ width: '95%' }} />
                          </div>
                          <div className="segment-value">95%</div>
                        </div>
                        <div className="segment-item">
                          <div className="segment-name">Sadık Müşteriler</div>
                          <div className="segment-bar">
                            <div className="segment-fill" style={{ width: '87%' }} />
                          </div>
                          <div className="segment-value">87%</div>
                        </div>
                        <div className="segment-item">
                          <div className="segment-name">Normal Müşteriler</div>
                          <div className="segment-bar">
                            <div className="segment-fill" style={{ width: '72%' }} />
                          </div>
                          <div className="segment-value">72%</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}

export default Communication 