'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Users, 
  Search, 
  Filter, 
  Star, 
  MessageSquare, 
  Calendar, 
  Mail, 
  Phone, 
  MapPin, 
  TrendingUp, 
  TrendingDown,
  Eye,
  Edit,
  MoreHorizontal,
  UserPlus,
  Download,
  Send,
  Tag,
  Clock,
  Heart,
  AlertTriangle,
  CheckCircle,
  XCircle,
  BarChart3,
  PieChart,
  Target,
  Award,
  Zap,
  Gift,
  Crown,
  ThumbsUp,
  ThumbsDown,
  MessageCircle,
  ExternalLink,
  SortAsc,
  SortDesc,
  Grid,
  List,
  RefreshCw
} from 'lucide-react'

const CustomersPage: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [selectedSegment, setSelectedSegment] = useState<string>('all')
  const [selectedCustomer, setSelectedCustomer] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState<'name' | 'rating' | 'visits' | 'lastVisit'>('name')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')

  const customers = [
    {
      id: '1',
      name: 'Ahmet Yılmaz',
      email: 'ahmet@example.com',
      phone: '+90 532 123 45 67',
      avatar: null,
      rating: 4.8,
      totalReviews: 12,
      totalVisits: 24,
      lastVisit: '2 gün önce',
      joinDate: '2023-05-15',
      segment: 'vip',
      status: 'active',
      location: 'İstanbul',
      tags: ['Sadık Müşteri', 'Yüksek Harcama'],
      totalSpent: 2450,
      avgOrderValue: 102,
      favoriteItems: ['Adana Kebap', 'Baklava'],
      complaints: 0,
      compliments: 8,
      lastReview: 'Muhteşem bir deneyim! Kesinlikle tekrar geleceğim.',
      preferences: ['Balkon', 'Akşam saatleri'],
      birthdate: '1985-03-15',
      communicationPrefs: ['email', 'sms']
    },
    {
      id: '2',
      name: 'Fatma Kaya',
      email: 'fatma@example.com',
      phone: '+90 535 987 65 43',
      avatar: null,
      rating: 3.2,
      totalReviews: 5,
      totalVisits: 8,
      lastVisit: '1 hafta önce',
      joinDate: '2023-08-20',
      segment: 'risk',
      status: 'at-risk',
      location: 'Ankara',
      tags: ['Şikayetçi', 'Dikkatli'],
      totalSpent: 420,
      avgOrderValue: 52,
      favoriteItems: ['Çorba', 'Salata'],
      complaints: 3,
      compliments: 1,
      lastReview: 'Servis çok yavaştı, yemekler soğuktu.',
      preferences: ['Sakin ortam', 'Vejetaryen'],
      birthdate: '1990-07-22',
      communicationPrefs: ['email']
    },
    {
      id: '3',
      name: 'Mehmet Özkan',
      email: 'mehmet@example.com',
      phone: '+90 542 456 78 90',
      avatar: null,
      rating: 4.5,
      totalReviews: 8,
      totalVisits: 15,
      lastVisit: '3 gün önce',
      joinDate: '2023-02-10',
      segment: 'loyal',
      status: 'active',
      location: 'İzmir',
      tags: ['Düzenli', 'Aile'],
      totalSpent: 1280,
      avgOrderValue: 85,
      favoriteItems: ['Pide', 'Ayran'],
      complaints: 1,
      compliments: 4,
      lastReview: 'Çocuklarım çok sevdi, teşekkürler.',
      preferences: ['Aile masası', 'Hafta sonu'],
      birthdate: '1982-11-08',
      communicationPrefs: ['sms', 'whatsapp']
    },
  ]

  const segments = [
    { id: 'all', label: 'Tüm Müşteriler', count: 1247, color: 'gray' },
    { id: 'vip', label: 'VIP Müşteriler', count: 89, color: 'purple' },
    { id: 'loyal', label: 'Sadık Müşteriler', count: 324, color: 'blue' },
    { id: 'new', label: 'Yeni Müşteriler', count: 156, color: 'green' },
    { id: 'risk', label: 'Risk Altındaki', count: 47, color: 'red' },
    { id: 'inactive', label: 'Pasif Müşteriler', count: 231, color: 'gray' },
  ]

  const stats = [
    { label: 'Toplam Müşteri', value: '1,247', change: '+23', trend: 'up', icon: Users },
    { label: 'Ortalama Puan', value: '4.3', change: '+0.1', trend: 'up', icon: Star },
    { label: 'Müşteri Memnuniyeti', value: '%87', change: '+5%', trend: 'up', icon: Heart },
    { label: 'Tekrar Gelme Oranı', value: '%72', change: '+8%', trend: 'up', icon: RefreshCw },
  ]

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.phone.includes(searchTerm)
    const matchesSegment = selectedSegment === 'all' || customer.segment === selectedSegment
    return matchesSearch && matchesSegment
  })

  const getSegmentColor = (segment: string) => {
    switch (segment) {
      case 'vip': return 'purple'
      case 'loyal': return 'blue'
      case 'new': return 'green'
      case 'risk': return 'red'
      case 'inactive': return 'gray'
      default: return 'gray'
    }
  }

  const getSegmentLabel = (segment: string) => {
    switch (segment) {
      case 'vip': return 'VIP'
      case 'loyal': return 'Sadık'
      case 'new': return 'Yeni'
      case 'risk': return 'Risk'
      case 'inactive': return 'Pasif'
      default: return 'Standart'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'green'
      case 'at-risk': return 'red'
      case 'inactive': return 'gray'
      default: return 'gray'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
              Müşteri Yönetimi
            </h1>
            <p className="text-gray-600">
              Müşteri deneyimini optimize edin ve sadakati artırın
            </p>
          </div>
          <div className="flex gap-3">
            <button className="btn-secondary">
              <Download className="w-4 h-4 mr-2" />
              Dışa Aktar
            </button>
            <button className="btn-premium">
              <Send className="w-4 h-4 mr-2" />
              Toplu Mesaj
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
                <div className="flex items-center gap-2">
                  <stat.icon className="w-6 h-6 text-blue-600" />
                  <div className={`flex items-center gap-1 text-sm ${
                    stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {stat.trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                    {stat.change}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Filters and Controls */}
        <div className="premium-card p-4 mb-6">
          <div className="flex flex-wrap gap-4 items-center justify-between">
            {/* Search */}
            <div className="flex-1 min-w-72">
              <div className="relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Müşteri ara..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Segment Filter */}
            <div className="flex gap-2">
              {segments.map((segment) => (
                <button
                  key={segment.id}
                  onClick={() => setSelectedSegment(segment.id)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedSegment === segment.id
                      ? `bg-${segment.color}-600 text-white`
                      : `bg-${segment.color}-100 text-${segment.color}-700 hover:bg-${segment.color}-200`
                  }`}
                >
                  {segment.label}
                  <span className="ml-2 text-xs opacity-75">({segment.count})</span>
                </button>
              ))}
            </div>

            {/* View Mode and Sort */}
            <div className="flex items-center gap-2">
              <div className="flex gap-1 p-1 bg-gray-100 rounded-lg">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded ${viewMode === 'grid' ? 'bg-white shadow' : ''}`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded ${viewMode === 'list' ? 'bg-white shadow' : ''}`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-2 border border-gray-200 rounded-lg text-sm"
              >
                <option value="name">İsme Göre</option>
                <option value="rating">Puana Göre</option>
                <option value="visits">Ziyaret Sayısı</option>
                <option value="lastVisit">Son Ziyaret</option>
              </select>

              <button
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                className="btn-secondary p-2"
              >
                {sortOrder === 'asc' ? <SortAsc className="w-4 h-4" /> : <SortDesc className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>

        {/* Customer List */}
        <div className={`${viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}`}>
          {filteredCustomers.map((customer) => (
            <motion.div
              key={customer.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className={`premium-card p-6 hover:shadow-xl transition-all duration-300 ${
                viewMode === 'list' ? 'flex items-center gap-6' : ''
              }`}
            >
              {/* Customer Avatar */}
              <div className={`${viewMode === 'list' ? 'flex-shrink-0' : 'flex items-center justify-between mb-4'}`}>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">
                      {customer.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  {viewMode === 'list' && (
                    <div>
                      <h3 className="font-bold text-lg">{customer.name}</h3>
                      <p className="text-sm text-gray-600">{customer.email}</p>
                    </div>
                  )}
                </div>

                {viewMode === 'grid' && (
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full bg-${getStatusColor(customer.status)}-500`} />
                    <span className={`text-xs font-medium bg-${getSegmentColor(customer.segment)}-100 text-${getSegmentColor(customer.segment)}-700 px-2 py-1 rounded-full`}>
                      {getSegmentLabel(customer.segment)}
                    </span>
                  </div>
                )}
              </div>

              {/* Customer Info */}
              <div className={`${viewMode === 'list' ? 'flex-1' : ''}`}>
                {viewMode === 'grid' && (
                  <div className="mb-4">
                    <h3 className="font-bold text-lg mb-1">{customer.name}</h3>
                    <p className="text-sm text-gray-600">{customer.location}</p>
                  </div>
                )}

                {/* Stats */}
                <div className={`${viewMode === 'list' ? 'flex gap-8' : 'grid grid-cols-2 gap-4'} mb-4`}>
                  <div className="text-center">
                    <div className="flex items-center gap-1 justify-center">
                      <Star className="w-4 h-4 text-yellow-500" />
                      <span className="font-medium">{customer.rating}</span>
                    </div>
                    <div className="text-xs text-gray-500">Puan</div>
                  </div>
                  <div className="text-center">
                    <div className="font-medium">{customer.totalVisits}</div>
                    <div className="text-xs text-gray-500">Ziyaret</div>
                  </div>
                  <div className="text-center">
                    <div className="font-medium">{customer.totalReviews}</div>
                    <div className="text-xs text-gray-500">Yorum</div>
                  </div>
                  <div className="text-center">
                    <div className="font-medium">₺{customer.totalSpent}</div>
                    <div className="text-xs text-gray-500">Harcama</div>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {customer.tags.map((tag, index) => (
                    <span key={index} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Recent Activity */}
                <div className="text-sm text-gray-600 mb-4">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Son ziyaret: {customer.lastVisit}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className={`${viewMode === 'list' ? 'flex gap-2' : 'flex gap-2'}`}>
                <button
                  onClick={() => setSelectedCustomer(customer.id)}
                  className="btn-secondary text-sm"
                >
                  <Eye className="w-3 h-3 mr-1" />
                  Detay
                </button>
                <button className="btn-secondary text-sm">
                  <Mail className="w-3 h-3 mr-1" />
                  Mesaj
                </button>
                <button className="btn-secondary text-sm">
                  <MoreHorizontal className="w-3 h-3" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Customer Detail Modal */}
        <AnimatePresence>
          {selectedCustomer && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              >
                {(() => {
                  const customer = customers.find(c => c.id === selectedCustomer)
                  if (!customer) return null

                  return (
                    <div className="p-6">
                      {/* Header */}
                      <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold text-xl">
                              {customer.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div>
                            <h2 className="text-2xl font-bold">{customer.name}</h2>
                            <p className="text-gray-600">{customer.email}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <span className={`text-xs font-medium bg-${getSegmentColor(customer.segment)}-100 text-${getSegmentColor(customer.segment)}-700 px-2 py-1 rounded-full`}>
                                {getSegmentLabel(customer.segment)}
                              </span>
                              <span className={`text-xs font-medium bg-${getStatusColor(customer.status)}-100 text-${getStatusColor(customer.status)}-700 px-2 py-1 rounded-full`}>
                                {customer.status === 'active' ? 'Aktif' : customer.status === 'at-risk' ? 'Risk' : 'Pasif'}
                              </span>
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => setSelectedCustomer(null)}
                          className="btn-secondary"
                        >
                          <XCircle className="w-5 h-5" />
                        </button>
                      </div>

                      {/* Content */}
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Left Column - Stats */}
                        <div className="space-y-4">
                          <div className="premium-card p-4">
                            <h3 className="font-semibold mb-3">Genel Bakış</h3>
                            <div className="space-y-3">
                              <div className="flex justify-between">
                                <span className="text-sm text-gray-600">Ortalama Puan</span>
                                <div className="flex items-center gap-1">
                                  <Star className="w-4 h-4 text-yellow-500" />
                                  <span className="font-medium">{customer.rating}</span>
                                </div>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-sm text-gray-600">Toplam Ziyaret</span>
                                <span className="font-medium">{customer.totalVisits}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-sm text-gray-600">Toplam Harcama</span>
                                <span className="font-medium">₺{customer.totalSpent}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-sm text-gray-600">Ortalama Sipariş</span>
                                <span className="font-medium">₺{customer.avgOrderValue}</span>
                              </div>
                            </div>
                          </div>

                          <div className="premium-card p-4">
                            <h3 className="font-semibold mb-3">İletişim</h3>
                            <div className="space-y-3">
                              <div className="flex items-center gap-2">
                                <Phone className="w-4 h-4 text-gray-500" />
                                <span className="text-sm">{customer.phone}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Mail className="w-4 h-4 text-gray-500" />
                                <span className="text-sm">{customer.email}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-gray-500" />
                                <span className="text-sm">{customer.location}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Middle Column - Activity */}
                        <div className="space-y-4">
                          <div className="premium-card p-4">
                            <h3 className="font-semibold mb-3">Son Yorumlar</h3>
                            <div className="space-y-3">
                              <div className="border-l-4 border-blue-500 pl-3">
                                <div className="flex items-center gap-2 mb-1">
                                  <Star className="w-4 h-4 text-yellow-500" />
                                  <span className="text-sm font-medium">{customer.rating}</span>
                                  <span className="text-xs text-gray-500">3 gün önce</span>
                                </div>
                                <p className="text-sm text-gray-700">{customer.lastReview}</p>
                              </div>
                            </div>
                          </div>

                          <div className="premium-card p-4">
                            <h3 className="font-semibold mb-3">Favori Ürünler</h3>
                            <div className="space-y-2">
                              {customer.favoriteItems.map((item, index) => (
                                <div key={index} className="flex items-center gap-2">
                                  <Heart className="w-4 h-4 text-red-500" />
                                  <span className="text-sm">{item}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Right Column - Analytics */}
                        <div className="space-y-4">
                          <div className="premium-card p-4">
                            <h3 className="font-semibold mb-3">Davranış Analizi</h3>
                            <div className="space-y-3">
                              <div className="flex justify-between">
                                <span className="text-sm text-gray-600">Şikayet</span>
                                <span className={`font-medium ${customer.complaints > 0 ? 'text-red-600' : 'text-green-600'}`}>
                                  {customer.complaints}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-sm text-gray-600">Övgü</span>
                                <span className="font-medium text-green-600">{customer.compliments}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-sm text-gray-600">Tercihler</span>
                                <div className="text-right">
                                  {customer.preferences.map((pref, index) => (
                                    <div key={index} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full mb-1">
                                      {pref}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="premium-card p-4">
                            <h3 className="font-semibold mb-3">Etiketler</h3>
                            <div className="flex flex-wrap gap-2">
                              {customer.tags.map((tag, index) => (
                                <span key={index} className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="mt-6 flex gap-3">
                        <button className="btn-premium">
                          <Mail className="w-4 h-4 mr-2" />
                          Mesaj Gönder
                        </button>
                        <button className="btn-secondary">
                          <Edit className="w-4 h-4 mr-2" />
                          Düzenle
                        </button>
                        <button className="btn-secondary">
                          <Gift className="w-4 h-4 mr-2" />
                          Hediye Kuponu
                        </button>
                        <button className="btn-secondary">
                          <Tag className="w-4 h-4 mr-2" />
                          Etiket Ekle
                        </button>
                      </div>
                    </div>
                  )
                })()}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default CustomersPage 