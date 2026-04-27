'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Bell, 
  Settings, 
  Check, 
  X, 
  Trash2, 
  Filter, 
  Search,
  Star,
  MessageSquare,
  AlertTriangle,
  CheckCircle,
  Info,
  Clock,
  Eye,
  EyeOff,
  Mail,
  Smartphone,
  Volume2,
  VolumeX,
  Zap,
  Users,
  TrendingUp,
  Calendar,
  Target,
  Bookmark,
  Archive,
  RefreshCw,
  Download,
  Share2,
  MoreHorizontal,
  ChevronDown,
  ChevronRight,
  Dot,
  AlertCircle,
  UserPlus,
  Heart,
  ThumbsUp,
  ThumbsDown,
  Reply,
  Forward,
  ExternalLink
} from 'lucide-react'

const NotificationsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'unread' | 'important' | 'archived'>('all')
  const [selectedNotifications, setSelectedNotifications] = useState<string[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState<'all' | 'reviews' | 'system' | 'marketing'>('all')

  const notifications = [
    {
      id: '1',
      type: 'review',
      title: 'Yeni 1 Yıldızlı Yorum',
      message: 'Fatma Kaya tarafından çok düşük puan verildi: "Servis çok yavaştı, yemekler soğuktu."',
      timestamp: '2 dakika önce',
      read: false,
      important: true,
      action: 'Yanıtla',
      icon: AlertTriangle,
      color: 'red',
      source: 'Google Maps',
      customer: 'Fatma Kaya',
      rating: 1,
      platform: 'google'
    },
    {
      id: '2',
      type: 'review',
      title: 'Yeni 5 Yıldızlı Yorum',
      message: 'Ahmet Yılmaz harika bir değerlendirme yaptı: "Muhteşem bir deneyim!"',
      timestamp: '15 dakika önce',
      read: false,
      important: false,
      action: 'Görüntüle',
      icon: Star,
      color: 'yellow',
      source: 'Yemeksepeti',
      customer: 'Ahmet Yılmaz',
      rating: 5,
      platform: 'yemeksepeti'
    },
    {
      id: '3',
      type: 'system',
      title: 'AI Kredi Uyarısı',
      message: 'AI token kullanımınız %85 seviyesine ulaştı. Yeni paket almayı düşünün.',
      timestamp: '1 saat önce',
      read: true,
      important: true,
      action: 'Paketi Görüntüle',
      icon: Zap,
      color: 'blue',
      source: 'Sistem',
      usage: '850/1000'
    },
    {
      id: '4',
      type: 'marketing',
      title: 'Kampanya Başarısı',
      message: 'Son e-posta kampanyanız %23 açılma oranına ulaştı. Harika bir performans!',
      timestamp: '2 saat önce',
      read: true,
      important: false,
      action: 'Detayları Gör',
      icon: TrendingUp,
      color: 'green',
      source: 'Pazarlama',
      stats: { sent: 156, opened: 36, clicked: 8 }
    },
    {
      id: '5',
      type: 'review',
      title: 'Yorum Yanıtlandı',
      message: 'Mehmet Özkan\'a verdiğiniz yanıt başarıyla gönderildi.',
      timestamp: '3 saat önce',
      read: true,
      important: false,
      action: 'Görüntüle',
      icon: Reply,
      color: 'blue',
      source: 'Tripadvisor',
      customer: 'Mehmet Özkan'
    },
    {
      id: '6',
      type: 'system',
      title: 'Haftalık Rapor Hazır',
      message: 'Bu haftanın performans raporu hazır. Ortalama puanınız 4.6\'ya yükseldi.',
      timestamp: '1 gün önce',
      read: false,
      important: false,
      action: 'Raporu İndir',
      icon: Download,
      color: 'purple',
      source: 'Sistem',
      stats: { rating: 4.6, reviews: 23, growth: '+12%' }
    },
    {
      id: '7',
      type: 'review',
      title: 'Yanıt Bekleyen Yorum',
      message: 'Elif Demir\'in 2 yıldızlı yorumu 24 saattir yanıtsız.',
      timestamp: '1 gün önce',
      read: false,
      important: true,
      action: 'Yanıtla',
      icon: Clock,
      color: 'orange',
      source: 'Google Maps',
      customer: 'Elif Demir',
      rating: 2,
      urgency: 'high'
    },
    {
      id: '8',
      type: 'system',
      title: 'Yeni Müşteri Kaydı',
      message: 'Bugün 5 yeni müşteri kaydı yapıldı. Müşteri tabanınız genişliyor!',
      timestamp: '2 gün önce',
      read: true,
      important: false,
      action: 'Müşterileri Gör',
      icon: UserPlus,
      color: 'green',
      source: 'Sistem',
      count: 5
    },
  ]

  const stats = [
    { label: 'Okunmamış', value: 4, color: 'blue' },
    { label: 'Önemli', value: 3, color: 'red' },
    { label: 'Bu Gün', value: 6, color: 'green' },
    { label: 'Bu Hafta', value: 8, color: 'purple' },
  ]

  const filteredNotifications = notifications.filter(notification => {
    const matchesTab = activeTab === 'all' || 
                     (activeTab === 'unread' && !notification.read) ||
                     (activeTab === 'important' && notification.important) ||
                     (activeTab === 'archived' && false) // archived notifications logic
    
    const matchesSearch = notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notification.message.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesFilter = filterType === 'all' || notification.type === filterType
    
    return matchesTab && matchesSearch && matchesFilter
  })

  const handleMarkAsRead = (notificationId: string) => {
    // Mark as read logic
    console.log('Marking as read:', notificationId)
  }

  const handleMarkAllAsRead = () => {
    // Mark all as read logic
    console.log('Marking all as read')
  }

  const handleDeleteNotification = (notificationId: string) => {
    // Delete notification logic
    console.log('Deleting notification:', notificationId)
  }

  const getNotificationIcon = (notification: any) => {
    const IconComponent = notification.icon
    return <IconComponent className={`w-5 h-5 text-${notification.color}-500`} />
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'review': return 'Yorum'
      case 'system': return 'Sistem'
      case 'marketing': return 'Pazarlama'
      default: return 'Genel'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
              Bildirimler
            </h1>
            <p className="text-gray-600">
              Önemli güncellemeler ve müşteri etkileşimlerinizi takip edin
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleMarkAllAsRead}
              className="btn-secondary"
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              Tümünü Okundu İşaretle
            </button>
            <button className="btn-secondary">
              <Settings className="w-4 h-4 mr-2" />
              Ayarlar
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="premium-card p-4 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`w-3 h-3 rounded-full bg-${stat.color}-500`} />
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="premium-card p-4 mb-6">
              <h3 className="font-semibold mb-4">Filtreler</h3>
              
              {/* Search */}
              <div className="relative mb-4">
                <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Bildirim ara..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>

              {/* Status Filter */}
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Durum</label>
                <div className="space-y-2">
                  {[
                    { id: 'all', label: 'Tümü', count: 8 },
                    { id: 'unread', label: 'Okunmamış', count: 4 },
                    { id: 'important', label: 'Önemli', count: 3 },
                    { id: 'archived', label: 'Arşivlenmiş', count: 0 },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id as any)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-all ${
                        activeTab === tab.id
                          ? 'bg-blue-600 text-white'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <span>{tab.label}</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        activeTab === tab.id
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-200 text-gray-600'
                      }`}>
                        {tab.count}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Type Filter */}
              <div>
                <label className="block text-sm font-medium mb-2">Tür</label>
                <select
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value as any)}
                  className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                >
                  <option value="all">Tüm Türler</option>
                  <option value="reviews">Yorumlar</option>
                  <option value="system">Sistem</option>
                  <option value="marketing">Pazarlama</option>
                </select>
              </div>
            </div>
          </div>

          {/* Notifications List */}
          <div className="lg:col-span-3">
            <div className="premium-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold">
                  Bildirimler ({filteredNotifications.length})
                </h3>
                <div className="flex gap-2">
                  <button className="btn-secondary text-sm">
                    <RefreshCw className="w-3 h-3 mr-1" />
                    Yenile
                  </button>
                  <button className="btn-secondary text-sm">
                    <Archive className="w-3 h-3 mr-1" />
                    Arşivle
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                {filteredNotifications.map((notification) => (
                  <motion.div
                    key={notification.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`relative p-4 rounded-lg border transition-all hover:shadow-md cursor-pointer ${
                      notification.read
                        ? 'bg-white border-gray-200'
                        : 'bg-blue-50 border-blue-200'
                    }`}
                  >
                    {/* Notification Header */}
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-3">
                        {getNotificationIcon(notification)}
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className={`font-medium ${
                              notification.read ? 'text-gray-900' : 'text-blue-900'
                            }`}>
                              {notification.title}
                            </h4>
                            {notification.important && (
                              <span className="w-2 h-2 bg-red-500 rounded-full" />
                            )}
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <span className={`text-xs px-2 py-1 rounded-full bg-${notification.color}-100 text-${notification.color}-700`}>
                              {getTypeLabel(notification.type)}
                            </span>
                            <span className="text-xs text-gray-500">
                              {notification.source}
                            </span>
                            <span className="text-xs text-gray-500">
                              {notification.timestamp}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {!notification.read && (
                          <button
                            onClick={() => handleMarkAsRead(notification.id)}
                            className="btn-secondary text-xs p-1"
                          >
                            <Eye className="w-3 h-3" />
                          </button>
                        )}
                        <button
                          onClick={() => handleDeleteNotification(notification.id)}
                          className="btn-secondary text-xs p-1 hover:bg-red-100 hover:text-red-600"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                    {/* Notification Content */}
                    <p className="text-sm text-gray-700 mb-3 pl-8">
                      {notification.message}
                    </p>

                    {/* Additional Info */}
                    {(notification.customer || notification.rating || notification.stats) && (
                      <div className="pl-8 mb-3">
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          {notification.customer && (
                            <div className="flex items-center gap-1">
                              <Users className="w-3 h-3" />
                              {notification.customer}
                            </div>
                          )}
                          {notification.rating && (
                            <div className="flex items-center gap-1">
                              <Star className="w-3 h-3" />
                              {notification.rating}/5
                            </div>
                          )}
                          {notification.stats && (
                            <div className="flex items-center gap-2">
                              {notification.stats.rating && (
                                <span>Puan: {notification.stats.rating}</span>
                              )}
                              {notification.stats.sent && (
                                <span>Gönderildi: {notification.stats.sent}</span>
                              )}
                              {notification.stats.opened && (
                                <span>Açıldı: {notification.stats.opened}</span>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Action Button */}
                    <div className="pl-8">
                      <button className={`btn-${notification.color === 'red' ? 'danger' : 'primary'} text-sm`}>
                        {notification.action}
                      </button>
                    </div>

                    {/* Unread indicator */}
                    {!notification.read && (
                      <div className="absolute left-2 top-4 w-2 h-2 bg-blue-500 rounded-full" />
                    )}
                  </motion.div>
                ))}

                {filteredNotifications.length === 0 && (
                  <div className="text-center py-12">
                    <Bell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">
                      Bildirim Bulunamadı
                    </h3>
                    <p className="text-gray-500">
                      Seçilen filtrelere uygun bildirim bulunmuyor.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotificationsPage 