'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Settings, 
  User, 
  Users, 
  Zap, 
  Bell, 
  Shield, 
  Building, 
  Upload, 
  Plus, 
  Edit, 
  Trash2, 
  Link, 
  Check, 
  X, 
  Eye, 
  EyeOff, 
  Save,
  Crown,
  Mail,
  Phone,
  MapPin,
  Globe,
  CreditCard,
  Download,
  Key,
  Lock,
  AlertCircle
} from 'lucide-react'

// Types
interface BusinessProfile {
  name: string
  description: string
  address: string
  phone: string
  email: string
  website: string
  logo: string
  cuisine: string
  priceRange: string
  openingHours: {
    [key: string]: { open: string; close: string; closed: boolean }
  }
}

interface User {
  id: number
  name: string
  email: string
  role: string
  permissions: string[]
  lastLogin: string
  status: 'active' | 'inactive'
}

interface Integration {
  connected: boolean
  lastSync: string | null
  url?: string
}

interface IntegrationMap {
  [key: string]: Integration
}

const SettingsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'profile' | 'users' | 'integrations' | 'notifications' | 'subscription' | 'security'>('profile')
  const [showPassword, setShowPassword] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [hasChanges, setHasChanges] = useState(false)

  // Business Profile State
  const [businessProfile, setBusinessProfile] = useState<BusinessProfile>({
    name: 'Lezzet Durağı Restaurant',
    description: 'Geleneksel Türk mutfağının modern yorumu. Taze malzemeler ve özenle hazırlanmış lezzetler.',
    address: 'Atatürk Mah. Cumhuriyet Cad. No: 123 Kadıköy/İstanbul',
    phone: '+90 216 555 0123',
    email: 'info@lezzetduragi.com',
    website: 'www.lezzetduragi.com',
    logo: '/logo.png',
    cuisine: 'Türk Mutfağı',
    priceRange: '₺₺',
    openingHours: {
      monday: { open: '09:00', close: '22:00', closed: false },
      tuesday: { open: '09:00', close: '22:00', closed: false },
      wednesday: { open: '09:00', close: '22:00', closed: false },
      thursday: { open: '09:00', close: '22:00', closed: false },
      friday: { open: '09:00', close: '23:00', closed: false },
      saturday: { open: '10:00', close: '23:00', closed: false },
      sunday: { open: '10:00', close: '21:00', closed: false },
    }
  })

  // Users State
  const [users, setUsers] = useState<User[]>([
    { id: 1, name: 'Admin User', email: 'admin@lezzetduragi.com', role: 'admin', permissions: ['all'], lastLogin: '2024-01-15 14:30', status: 'active' },
    { id: 2, name: 'Ahmet Yılmaz', email: 'ahmet@lezzetduragi.com', role: 'manager', permissions: ['reviews', 'analytics'], lastLogin: '2024-01-15 10:15', status: 'active' },
    { id: 3, name: 'Fatma Kaya', email: 'fatma@lezzetduragi.com', role: 'staff', permissions: ['reviews'], lastLogin: '2024-01-14 16:45', status: 'active' },
  ])

  // Notification Settings
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    newReviews: true,
    negativeReviews: true,
    dailyReports: true,
    weeklyReports: false,
    systemUpdates: true,
    marketingEmails: false,
  })

  // Integration Settings
  const [integrations, setIntegrations] = useState<IntegrationMap>({
    google: { connected: true, lastSync: '2024-01-15 14:30', url: 'https://maps.google.com/restaurant/123' },
    tripadvisor: { connected: true, lastSync: '2024-01-15 14:25', url: 'https://tripadvisor.com/restaurant/456' },
    zomato: { connected: false, lastSync: null },
    yemeksepeti: { connected: true, lastSync: '2024-01-15 14:20', url: 'https://yemeksepeti.com/restaurant/789' },
    getir: { connected: false, lastSync: null },
  })

  // Security Settings
  const [securitySettings, setSecuritySettings] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    twoFactorEnabled: false,
    loginAlerts: true,
    sessionTimeout: '30',
  })

  const tabs = [
    { id: 'profile', label: 'İşletme Profili', icon: Building },
    { id: 'users', label: 'Kullanıcı Yönetimi', icon: Users },
    { id: 'integrations', label: 'Entegrasyonlar', icon: Zap },
    { id: 'notifications', label: 'Bildirimler', icon: Bell },
    { id: 'subscription', label: 'Abonelik', icon: Crown },
    { id: 'security', label: 'Güvenlik', icon: Shield },
  ]

  const dayLabels = {
    monday: 'Pazartesi',
    tuesday: 'Salı',
    wednesday: 'Çarşamba',
    thursday: 'Perşembe',
    friday: 'Cuma',
    saturday: 'Cumartesi',
    sunday: 'Pazar',
  }

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

  // Save handlers
  const saveBusinessProfile = async () => {
    if (!businessProfile.name.trim()) {
      showToast('İşletme adı boş olamaz!', 'error')
      return
    }
    
    if (!businessProfile.email.trim() || !businessProfile.email.includes('@')) {
      showToast('Geçerli bir email adresi giriniz!', 'error')
      return
    }

    setIsSaving(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      showToast('İşletme profili başarıyla güncellendi!', 'success')
      setHasChanges(false)
    } catch (error) {
      showToast('Kayıt işlemi sırasında bir hata oluştu!', 'error')
    } finally {
      setIsSaving(false)
    }
  }

  const saveNotificationSettings = async () => {
    setIsSaving(true)
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      showToast('Bildirim ayarları güncellendi!', 'success')
      setHasChanges(false)
    } catch (error) {
      showToast('Kayıt işlemi sırasında bir hata oluştu!', 'error')
    } finally {
      setIsSaving(false)
    }
  }

  const saveSecuritySettings = async () => {
    if (securitySettings.newPassword && securitySettings.newPassword !== securitySettings.confirmPassword) {
      showToast('Yeni şifreler eşleşmiyor!', 'error')
      return
    }

    if (securitySettings.newPassword && securitySettings.newPassword.length < 6) {
      showToast('Şifre en az 6 karakter olmalıdır!', 'error')
      return
    }

    setIsSaving(true)
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      showToast('Güvenlik ayarları güncellendi!', 'success')
      setSecuritySettings(prev => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      }))
      setHasChanges(false)
    } catch (error) {
      showToast('Kayıt işlemi sırasında bir hata oluştu!', 'error')
    } finally {
      setIsSaving(false)
    }
  }

  const addUser = () => {
    const newUser: User = {
      id: Date.now(),
      name: 'Yeni Kullanıcı',
      email: '',
      role: 'staff',
      permissions: ['reviews'],
      lastLogin: 'Hiç giriş yapmadı',
      status: 'inactive'
    }
    setUsers(prev => [newUser, ...prev])
    showToast('Yeni kullanıcı eklendi. Lütfen bilgilerini düzenleyin.', 'info')
    setHasChanges(true)
  }

  const deleteUser = (userId: number) => {
    if (userId === 1) {
      showToast('Ana admin kullanıcısı silinemez!', 'error')
      return
    }
    
    setUsers(prev => prev.filter(user => user.id !== userId))
    showToast('Kullanıcı silindi!', 'success')
    setHasChanges(true)
  }

  const toggleUserStatus = (userId: number) => {
    setUsers(prev => prev.map(user => 
      user.id === userId 
        ? { ...user, status: user.status === 'active' ? 'inactive' : 'active' }
        : user
    ))
    setHasChanges(true)
  }

  const connectIntegration = (platform: string) => {
    setIntegrations(prev => ({
      ...prev,
      [platform]: {
        connected: true,
        lastSync: new Date().toLocaleString('tr-TR')
      }
    }))
    showToast(`${platform} entegrasyonu başarıyla bağlandı!`, 'success')
    setHasChanges(true)
  }

  const disconnectIntegration = (platform: string) => {
    setIntegrations(prev => ({
      ...prev,
      [platform]: {
        connected: false,
        lastSync: null
      }
    }))
    showToast(`${platform} entegrasyonu kesildi!`, 'info')
    setHasChanges(true)
  }

  const syncIntegration = (platform: string) => {
    setIntegrations(prev => ({
      ...prev,
      [platform]: {
        ...prev[platform],
        lastSync: new Date().toLocaleString('tr-TR')
      }
    }))
    showToast(`${platform} verileri senkronize edildi!`, 'success')
  }

  const exportSettings = () => {
    const settingsData = {
      businessProfile,
      users: users.map(u => ({ ...u, id: undefined })), // Remove IDs for privacy
      notificationSettings,
      integrations,
      exportDate: new Date().toISOString()
    }
    
    const blob = new Blob([JSON.stringify(settingsData, null, 2)], { type: 'application/json' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = `ayarlar-yedegi-${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(link.href)
    
    showToast('Ayarlar başarıyla dışa aktarıldı!', 'success')
  }

  // Track changes
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasChanges) {
        e.preventDefault()
        e.returnValue = ''
      }
    }

    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [hasChanges])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Ayarlar
          </h1>
          <p className="text-gray-600">
            İşletmenizin dijital kimliğini ve ayarlarını yönetin
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="premium-card p-4">
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-left rounded-lg transition-all ${
                      activeTab === tab.id
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <tab.icon className="w-5 h-5" />
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {/* Business Profile */}
                {activeTab === 'profile' && (
                  <div className="premium-card p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-semibold">İşletme Profili</h3>
                      <button
                        onClick={() => setIsEditing(!isEditing)}
                        className="btn-secondary"
                      >
                        <Edit className="w-4 h-4 mr-2" />
                        {isEditing ? 'İptal' : 'Düzenle'}
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Logo Upload */}
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium mb-2">İşletme Logosu</label>
                        <div className="flex items-center gap-4">
                          <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                            <Building className="w-8 h-8 text-white" />
                          </div>
                          {isEditing && (
                            <button className="btn-secondary">
                              <Upload className="w-4 h-4 mr-2" />
                              Logo Değiştir
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Business Info */}
                      <div>
                        <label className="block text-sm font-medium mb-2">İşletme Adı</label>
                        {isEditing ? (
                          <input
                            type="text"
                            value={businessProfile.name}
                            onChange={(e) => {
                              setBusinessProfile(prev => ({ ...prev, name: e.target.value }))
                              setHasChanges(true)
                            }}
                            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                          />
                        ) : (
                          <div className="p-3 bg-gray-50 rounded-lg">{businessProfile.name}</div>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">İşletme Türü</label>
                        {isEditing ? (
                          <select
                            value={businessProfile.cuisine}
                            onChange={(e) => {
                              setBusinessProfile(prev => ({ ...prev, cuisine: e.target.value }))
                              setHasChanges(true)
                            }}
                            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="Türk Mutfağı">Türk Mutfağı</option>
                            <option value="İtalyan">İtalyan</option>
                            <option value="Çin">Çin</option>
                            <option value="Meksika">Meksika</option>
                            <option value="Fast Food">Fast Food</option>
                            <option value="Vegan">Vegan</option>
                            <option value="Deniz Ürünleri">Deniz Ürünleri</option>
                          </select>
                        ) : (
                          <div className="p-3 bg-gray-50 rounded-lg">{businessProfile.cuisine}</div>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">Telefon</label>
                        {isEditing ? (
                          <input
                            type="tel"
                            value={businessProfile.phone}
                            onChange={(e) => {
                              setBusinessProfile(prev => ({ ...prev, phone: e.target.value }))
                              setHasChanges(true)
                            }}
                            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                          />
                        ) : (
                          <div className="p-3 bg-gray-50 rounded-lg">{businessProfile.phone}</div>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium mb-2">E-posta</label>
                        {isEditing ? (
                          <input
                            type="email"
                            value={businessProfile.email}
                            onChange={(e) => {
                              setBusinessProfile(prev => ({ ...prev, email: e.target.value }))
                              setHasChanges(true)
                            }}
                            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                          />
                        ) : (
                          <div className="p-3 bg-gray-50 rounded-lg">{businessProfile.email}</div>
                        )}
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium mb-2">Adres</label>
                        {isEditing ? (
                          <textarea
                            value={businessProfile.address}
                            onChange={(e) => {
                              setBusinessProfile(prev => ({ ...prev, address: e.target.value }))
                              setHasChanges(true)
                            }}
                            className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                            rows={3}
                          />
                        ) : (
                          <div className="p-3 bg-gray-50 rounded-lg">{businessProfile.address}</div>
                        )}
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium mb-2">Subdomain</label>
                        <div className="flex items-center gap-2">
                          {isEditing ? (
                            <>
                              <input
                                type="text"
                                value={businessProfile.website}
                                onChange={(e) => {
                                  setBusinessProfile(prev => ({ ...prev, website: e.target.value }))
                                  setHasChanges(true)
                                }}
                                className="flex-1 p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                              />
                              <span className="text-gray-500">.mutfakyazilim.com</span>
                            </>
                          ) : (
                            <div className="p-3 bg-gray-50 rounded-lg">{businessProfile.website}</div>
                          )}
                        </div>
                      </div>
                    </div>

                    {isEditing && (
                      <div className="mt-6 flex justify-end gap-3">
                        <button
                          onClick={() => setIsEditing(false)}
                          className="btn-secondary"
                        >
                          İptal
                        </button>
                        <button
                          onClick={saveBusinessProfile}
                          disabled={isSaving}
                          className="btn-premium"
                        >
                          <Save className="w-4 h-4 mr-2" />
                          Kaydet
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* User Management */}
                {activeTab === 'users' && (
                  <div className="premium-card p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-semibold">Kullanıcı Yönetimi</h3>
                      <button
                        onClick={addUser}
                        className="btn-premium"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Yeni Kullanıcı
                      </button>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-3 px-4">Kullanıcı</th>
                            <th className="text-left py-3 px-4">Rol</th>
                            <th className="text-left py-3 px-4">Durum</th>
                            <th className="text-left py-3 px-4">Son Giriş</th>
                            <th className="text-left py-3 px-4">İşlemler</th>
                          </tr>
                        </thead>
                        <tbody>
                          {users.map((user) => (
                            <tr key={user.id} className="border-b hover:bg-gray-50">
                              <td className="py-3 px-4">
                                <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                    <User className="w-5 h-5 text-blue-600" />
                                  </div>
                                  <div>
                                    <div className="font-medium">{user.name}</div>
                                    <div className="text-sm text-gray-500">{user.email}</div>
                                  </div>
                                </div>
                              </td>
                              <td className="py-3 px-4">
                                <span className={`px-2 py-1 rounded-full text-xs ${
                                  user.role === 'Admin' ? 'bg-purple-100 text-purple-800' :
                                  user.role === 'Şube Müdürü' ? 'bg-blue-100 text-blue-800' :
                                  'bg-gray-100 text-gray-800'
                                }`}>
                                  {user.role}
                                </span>
                              </td>
                              <td className="py-3 px-4">
                                <span className={`px-2 py-1 rounded-full text-xs ${
                                  user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                }`}>
                                  {user.status === 'active' ? 'Aktif' : 'Pasif'}
                                </span>
                              </td>
                              <td className="py-3 px-4 text-sm text-gray-500">{user.lastLogin}</td>
                              <td className="py-3 px-4">
                                <div className="flex gap-2">
                                  <button className="btn-secondary text-sm">
                                    <Edit className="w-3 h-3" />
                                  </button>
                                  <button
                                    onClick={() => deleteUser(user.id)}
                                    className="btn-danger text-sm"
                                  >
                                    <Trash2 className="w-3 h-3" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Integrations */}
                {activeTab === 'integrations' && (
                  <div className="premium-card p-6">
                    <h3 className="text-lg font-semibold mb-6">Entegrasyonlar ve Kanallar</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {Object.entries(integrations).map(([platform, config]) => (
                        <div key={platform} className="border rounded-lg p-4">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="font-medium">{platform.charAt(0).toUpperCase() + platform.slice(1)}</h4>
                            <div className={`w-3 h-3 rounded-full ${
                              config.connected ? 'bg-green-500' : 'bg-gray-300'
                            }`} />
                          </div>
                          
                          {config.connected ? (
                            <div className="space-y-3">
                              <div>
                                <label className="block text-sm text-gray-600 mb-1">Bağlı URL</label>
                                <div className="text-sm bg-gray-50 p-2 rounded truncate">
                                  {config.url}
                                </div>
                              </div>
                              <div className="flex gap-2">
                                <button className="btn-secondary text-sm">
                                  <Edit className="w-3 h-3 mr-1" />
                                  Düzenle
                                </button>
                                <button
                                  onClick={() => disconnectIntegration(platform)}
                                  className="btn-danger text-sm"
                                >
                                  <X className="w-3 h-3 mr-1" />
                                  Bağlantıyı Kes
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div className="space-y-3">
                              <input
                                type="url"
                                placeholder="Platform URL'sini girin"
                                className="w-full p-2 border border-gray-200 rounded text-sm"
                              />
                              <button
                                onClick={() => connectIntegration(platform)}
                                className="btn-premium text-sm"
                              >
                                <Link className="w-3 h-3 mr-1" />
                                Bağla
                              </button>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Notifications */}
                {activeTab === 'notifications' && (
                  <div className="premium-card p-6">
                    <h3 className="text-lg font-semibold mb-6">Bildirim Ayarları</h3>
                    
                    <div className="space-y-6">
                      {[
                        { id: 'new_review', label: 'Yeni yorum geldiğinde E-posta gönder', checked: true },
                        { id: 'negative_review', label: 'Yeni 1-2 yıldızlı yorum geldiğinde Mobil bildirim gönder', checked: true },
                        { id: 'review_replied', label: 'Yorum yanıtlandığında Mobil bildirim gönder', checked: false },
                        { id: 'ai_credit', label: 'AI kredisi %10\'un altına düştüğünde uyar', checked: true },
                        { id: 'weekly_report', label: 'Haftalık özet raporu gönder', checked: true },
                        { id: 'monthly_report', label: 'Aylık performans raporu gönder', checked: false },
                      ].map((setting) => (
                        <div key={setting.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <span className="font-medium">{setting.label}</span>
                          <button
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                              setting.checked ? 'bg-blue-600' : 'bg-gray-200'
                            }`}
                          >
                            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              setting.checked ? 'translate-x-6' : 'translate-x-1'
                            }`} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Subscription */}
                {activeTab === 'subscription' && (
                  <div className="space-y-6">
                    {/* Current Plan */}
                    <div className="premium-card p-6">
                      <h3 className="text-lg font-semibold mb-4">Mevcut Plan</h3>
                      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="text-xl font-bold">Profesyonel Plan</h4>
                            <p className="text-purple-100">Aylık ₺299</p>
                          </div>
                          <Crown className="w-8 h-8" />
                        </div>
                        <p className="mt-3 text-sm">Sonraki fatura: 15 Nisan 2024</p>
                      </div>
                    </div>

                    {/* Usage */}
                    <div className="premium-card p-6">
                      <h3 className="text-lg font-semibold mb-4">Kullanım Hakları</h3>
                      <div className="space-y-4">
                        {[
                          { label: 'AI Token Kullanımı', used: 750, total: 1000, color: 'blue' },
                          { label: 'Aylık E-posta Hakkı', used: 1200, total: 2000, color: 'green' },
                          { label: 'Aylık SMS Hakkı', used: 450, total: 500, color: 'yellow' },
                        ].map((usage, index) => (
                          <div key={index} className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>{usage.label}</span>
                              <span>{usage.used}/{usage.total}</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className={`bg-${usage.color}-500 h-2 rounded-full`}
                                style={{ width: `${(usage.used / usage.total) * 100}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="premium-card p-6">
                      <h3 className="text-lg font-semibold mb-4">Fatura ve Plan</h3>
                      <div className="flex gap-3">
                        <button className="btn-premium">
                          <Download className="w-4 h-4 mr-2" />
                          Fatura Geçmişi
                        </button>
                        <button className="btn-secondary">
                          <CreditCard className="w-4 h-4 mr-2" />
                          Planı Değiştir
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Security */}
                {activeTab === 'security' && (
                  <div className="premium-card p-6">
                    <h3 className="text-lg font-semibold mb-6">Güvenlik Ayarları</h3>
                    
                    <div className="space-y-6">
                      {/* Password Change */}
                      <div>
                        <h4 className="font-medium mb-4">Şifre Değiştir</h4>
                        <div className="grid grid-cols-1 gap-4 max-w-md">
                          <div>
                            <label className="block text-sm font-medium mb-2">Mevcut Şifre</label>
                            <div className="relative">
                              <input
                                type={showPassword ? 'text' : 'password'}
                                value={securitySettings.currentPassword}
                                onChange={(e) => {
                                  setSecuritySettings(prev => ({ ...prev, currentPassword: e.target.value }))
                                  setHasChanges(true)
                                }}
                                className="w-full p-3 border border-gray-200 rounded-lg pr-10"
                              />
                              <button
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-3 text-gray-400"
                              >
                                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                              </button>
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">Yeni Şifre</label>
                            <input
                              type="password"
                              value={securitySettings.newPassword}
                              onChange={(e) => {
                                setSecuritySettings(prev => ({ ...prev, newPassword: e.target.value }))
                                setHasChanges(true)
                              }}
                              className="w-full p-3 border border-gray-200 rounded-lg"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">Yeni Şifre (Tekrar)</label>
                            <input
                              type="password"
                              value={securitySettings.confirmPassword}
                              onChange={(e) => {
                                setSecuritySettings(prev => ({ ...prev, confirmPassword: e.target.value }))
                                setHasChanges(true)
                              }}
                              className="w-full p-3 border border-gray-200 rounded-lg"
                            />
                          </div>
                          <button
                            onClick={saveSecuritySettings}
                            disabled={isSaving}
                            className="btn-premium w-fit"
                          >
                            <Lock className="w-4 h-4 mr-2" />
                            Şifreyi Güncelle
                          </button>
                        </div>
                      </div>

                      {/* API Keys */}
                      <div className="border-t pt-6">
                        <h4 className="font-medium mb-4">API Anahtarları</h4>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div>
                              <div className="font-medium">Twilio SMS API</div>
                              <div className="text-sm text-gray-500">SMS gönderimi için</div>
                            </div>
                            <button className="btn-secondary text-sm">
                              <Key className="w-3 h-3 mr-1" />
                              Yapılandır
                            </button>
                          </div>
                          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div>
                              <div className="font-medium">OpenAI API</div>
                              <div className="text-sm text-gray-500">AI analizi için</div>
                            </div>
                            <button className="btn-secondary text-sm">
                              <Key className="w-3 h-3 mr-1" />
                              Yapılandır
                            </button>
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
    </div>
  )
}

export default SettingsPage 