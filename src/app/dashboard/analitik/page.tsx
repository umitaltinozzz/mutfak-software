'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  TrendingUp, 
  Download, 
  Calendar, 
  BarChart3, 
  PieChart, 
  LineChart, 
  Users, 
  MessageSquare,
  Star,
  AlertTriangle,
  Trophy,
  Target,
  Filter,
  RefreshCw,
  Eye,
  ArrowUp,
  ArrowDown
} from 'lucide-react'

// Sample data - gerçek uygulamada API'den gelecek
const performanceData = {
  platforms: [
    { name: 'Google', current: 4.6, previous: 4.4, reviews: 1234, color: '#4285f4' },
    { name: 'Yemeksepeti', current: 4.8, previous: 4.7, reviews: 856, color: '#ff6b35' },
    { name: 'Tripadvisor', current: 4.3, previous: 4.1, reviews: 432, color: '#00af87' },
    { name: 'Getir', current: 4.7, previous: 4.6, reviews: 267, color: '#5d4fb3' },
  ],
  monthlyReviews: [
    { month: 'Ocak', positive: 145, negative: 23, neutral: 42 },
    { month: 'Şubat', positive: 167, negative: 18, neutral: 38 },
    { month: 'Mart', positive: 198, negative: 15, neutral: 45 },
    { month: 'Nisan', positive: 234, negative: 12, neutral: 52 },
    { month: 'Mayıs', positive: 278, negative: 8, neutral: 48 },
    { month: 'Haziran', positive: 312, negative: 5, neutral: 55 },
  ],
  complaints: [
    { reason: 'Servis Yavaşlığı', count: 45, percentage: 32 },
    { reason: 'Personel Tavrı', count: 28, percentage: 20 },
    { reason: 'Soğuk Yemek', count: 24, percentage: 17 },
    { reason: 'Geç Teslimat', count: 18, percentage: 13 },
    { reason: 'Eksik Sipariş', count: 15, percentage: 11 },
    { reason: 'Diğer', count: 10, percentage: 7 },
  ],
  staff: [
    { name: 'Ahmet Yılmaz', role: 'Garson', reviews: 124, rating: 4.8, complaints: 2 },
    { name: 'Fatma Kaya', role: 'Aşçı', reviews: 98, rating: 4.6, complaints: 5 },
    { name: 'Mehmet Özkan', role: 'Garson', reviews: 87, rating: 4.5, complaints: 3 },
    { name: 'Ayşe Demir', role: 'Kasiyer', reviews: 76, rating: 4.7, complaints: 1 },
    { name: 'Ali Çelik', role: 'Garson', reviews: 65, rating: 4.4, complaints: 4 },
  ]
}

const Analytics: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'performance' | 'complaints' | 'staff'>('performance')
  const [dateRange, setDateRange] = useState('last30days')
  const [isLoading, setIsLoading] = useState(false)
  const [isExporting, setIsExporting] = useState<'pdf' | 'csv' | null>(null)

  const tabs = [
    { id: 'performance', label: 'Genel Performans', icon: TrendingUp },
    { id: 'complaints', label: 'Şikayet Analizi', icon: AlertTriangle },
    { id: 'staff', label: 'Personel Performansı', icon: Users },
  ]

  const dateRangeOptions = [
    { value: 'last7days', label: 'Son 7 Gün' },
    { value: 'last30days', label: 'Son 30 Gün' },
    { value: 'last3months', label: 'Son 3 Ay' },
    { value: 'last6months', label: 'Son 6 Ay' },
    { value: 'lastyear', label: 'Son 1 Yıl' },
    { value: 'custom', label: 'Özel Tarih' },
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

  const handleRefresh = () => {
    setIsLoading(true)
    showToast('Veriler yenileniyor...', 'info')
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      showToast('Veriler başarıyla yenilendi!', 'success')
    }, 2000)
  }

  const exportReport = (format: 'pdf' | 'csv') => {
    setIsExporting(format)
    showToast(`${format.toUpperCase()} raporu hazırlanıyor...`, 'info')
    
    // Simulate export process
    setTimeout(() => {
      // Create mock download
      const link = document.createElement('a')
      const currentDate = new Date().toISOString().split('T')[0]
      const fileName = `analitik-raporu-${currentDate}.${format}`
      
      if (format === 'pdf') {
        // Mock PDF creation
        const blob = new Blob(['%PDF-1.4 Mock PDF content'], { type: 'application/pdf' })
        link.href = URL.createObjectURL(blob)
      } else {
        // Mock CSV creation
        const csvContent = [
          'Platform,Toplam Yorum,Ortalama Puan,Pozitif %,Negatif %',
          'Google,1234,4.6,87,8',
          'Yemeksepeti,856,4.8,92,4',
          'Tripadvisor,432,4.3,78,12',
          'Getir,267,4.7,88,7'
        ].join('\n')
        const blob = new Blob([csvContent], { type: 'text/csv' })
        link.href = URL.createObjectURL(blob)
      }
      
      link.download = fileName
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(link.href)
      
      setIsExporting(null)
      showToast(`${format.toUpperCase()} raporu başarıyla indirildi!`, 'success')
    }, 3000)
  }

  const handleDateRangeChange = (newRange: string) => {
    setDateRange(newRange)
    showToast(`Tarih aralığı güncellendi: ${dateRangeOptions.find(opt => opt.value === newRange)?.label}`, 'info')
    
    // Simulate data refresh
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Analitik ve Raporlar
          </h1>
          <p className="text-gray-600">
            Veriye dayalı kararlar alın ve performansınızı optimize edin
          </p>
        </div>

        {/* Controls */}
        <div className="premium-card p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              {/* Date Range Selector */}
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-500" />
                <select 
                  value={dateRange} 
                  onChange={(e) => handleDateRangeChange(e.target.value)}
                  className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {dateRangeOptions.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Refresh Button */}
              <button
                onClick={handleRefresh}
                disabled={isLoading}
                className="btn-secondary flex items-center gap-2"
              >
                <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                {isLoading ? 'Yenileniyor...' : 'Yenile'}
              </button>
            </div>

            {/* Export Buttons */}
            <div className="flex gap-2">
              <button
                onClick={() => exportReport('pdf')}
                disabled={isExporting === 'pdf'}
                className="btn-premium flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                {isExporting === 'pdf' ? 'Hazırlanıyor...' : 'PDF İndir'}
              </button>
              <button
                onClick={() => exportReport('csv')}
                disabled={isExporting === 'csv'}
                className="btn-secondary flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                {isExporting === 'csv' ? 'Hazırlanıyor...' : 'CSV İndir'}
              </button>
            </div>
          </div>
        </div>

        {/* Loading Overlay */}
        {isLoading && (
          <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50 flex items-center justify-center">
            <div className="bg-white rounded-lg p-6 shadow-xl">
              <div className="flex items-center gap-3">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                <span className="text-gray-700">Veriler yükleniyor...</span>
              </div>
            </div>
          </div>
        )}

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
              {/* Performance Tab */}
              {activeTab === 'performance' && (
                <div className="space-y-6">
                  {/* Platform Performance */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white rounded-lg border p-6">
                      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <LineChart className="w-5 h-5" />
                        Platform Bazlı Puan Gelişimi
                      </h3>
                      <div className="space-y-4">
                        {performanceData.platforms.map((platform, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                            <div className="flex items-center gap-3">
                              <div 
                                className="w-4 h-4 rounded-full"
                                style={{ backgroundColor: platform.color }}
                              ></div>
                              <div>
                                <div className="font-medium">{platform.name}</div>
                                <div className="text-sm text-gray-500">{platform.reviews} yorum</div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-semibold">{platform.current.toFixed(1)}★</div>
                              <div className={`text-sm flex items-center gap-1 ${
                                platform.current > platform.previous ? 'text-green-600' : 'text-red-600'
                              }`}>
                                {platform.current > platform.previous ? (
                                  <ArrowUp className="w-3 h-3" />
                                ) : (
                                  <ArrowDown className="w-3 h-3" />
                                )}
                                {Math.abs(platform.current - platform.previous).toFixed(1)}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-white rounded-lg border p-6">
                      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <BarChart3 className="w-5 h-5" />
                        Aylık Yorum Hacmi
                      </h3>
                      <div className="space-y-3">
                        {performanceData.monthlyReviews.map((month, index) => (
                          <div key={index} className="flex items-center gap-3">
                            <div className="w-16 text-sm text-gray-600">{month.month}</div>
                            <div className="flex-1 flex gap-1">
                              <div 
                                className="bg-green-500 h-6 rounded-l-md flex items-center justify-center text-white text-xs font-medium"
                                style={{ width: `${(month.positive / (month.positive + month.negative + month.neutral)) * 100}%`, minWidth: '30px' }}
                              >
                                {month.positive}
                              </div>
                              <div 
                                className="bg-yellow-500 h-6 flex items-center justify-center text-white text-xs font-medium"
                                style={{ width: `${(month.neutral / (month.positive + month.negative + month.neutral)) * 100}%`, minWidth: '20px' }}
                              >
                                {month.neutral}
                              </div>
                              <div 
                                className="bg-red-500 h-6 rounded-r-md flex items-center justify-center text-white text-xs font-medium"
                                style={{ width: `${(month.negative / (month.positive + month.negative + month.neutral)) * 100}%`, minWidth: '15px' }}
                              >
                                {month.negative}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="flex items-center gap-4 mt-4 text-sm">
                        <div className="flex items-center gap-1">
                          <div className="w-3 h-3 bg-green-500 rounded"></div>
                          <span>Pozitif</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="w-3 h-3 bg-yellow-500 rounded"></div>
                          <span>Nötr</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="w-3 h-3 bg-red-500 rounded"></div>
                          <span>Negatif</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Detailed Metrics Table */}
                  <div className="bg-white rounded-lg border p-6">
                    <h3 className="text-lg font-semibold mb-4">Detaylı Platform Metrikleri</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-3 px-2">Platform</th>
                            <th className="text-left py-3 px-2">Toplam Yorum</th>
                            <th className="text-left py-3 px-2">Ortalama Puan</th>
                            <th className="text-left py-3 px-2">Pozitif %</th>
                            <th className="text-left py-3 px-2">Negatif %</th>
                            <th className="text-left py-3 px-2">Yanıt Süresi</th>
                          </tr>
                        </thead>
                        <tbody>
                          {performanceData.platforms.map((platform, index) => (
                            <tr key={index} className="border-b hover:bg-gray-50 cursor-pointer">
                              <td className="py-3 px-2 font-medium">{platform.name}</td>
                              <td className="py-3 px-2">{platform.reviews}</td>
                              <td className="py-3 px-2">{platform.current.toFixed(1)}★</td>
                              <td className="py-3 px-2 text-green-600">87%</td>
                              <td className="py-3 px-2 text-red-600">8%</td>
                              <td className="py-3 px-2">&lt; 2 saat</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* Complaints Analysis Tab */}
              {activeTab === 'complaints' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white rounded-lg border p-6">
                      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <PieChart className="w-5 h-5" />
                        Şikayet Kök Nedenleri
                      </h3>
                      <div className="space-y-3">
                        {performanceData.complaints.map((complaint, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                            <div className="flex items-center gap-3">
                              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                              <span className="font-medium">{complaint.reason}</span>
                            </div>
                            <div className="text-right">
                              <div className="font-semibold">{complaint.count}</div>
                              <div className="text-sm text-gray-500">%{complaint.percentage}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-white rounded-lg border p-6">
                      <h3 className="text-lg font-semibold mb-4">En Çok Şikayet Alan Ürünler</h3>
                      <div className="space-y-3">
                        {[
                          { name: 'Mercimek Çorbası', complaints: 12 },
                          { name: 'Adana Kebap', complaints: 8 },
                          { name: 'Pizza Margherita', complaints: 6 },
                          { name: 'Künefe', complaints: 4 },
                          { name: 'Lahmacun', complaints: 3 },
                        ].map((product, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                            <span className="font-medium">{product.name}</span>
                            <div className="flex items-center gap-2">
                              <div 
                                className="bg-red-500 h-3 rounded-full"
                                style={{ width: `${(product.complaints / 12) * 100}px` }}
                              ></div>
                              <span className="text-sm text-gray-600">{product.complaints}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Staff Performance Tab */}
              {activeTab === 'staff' && (
                <div className="bg-white rounded-lg border p-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Trophy className="w-5 h-5" />
                    Personel Performans Tablosu
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-2">Personel</th>
                          <th className="text-left py-3 px-2">Rol</th>
                          <th className="text-left py-3 px-2">Yorum Sayısı</th>
                          <th className="text-left py-3 px-2">Ortalama Puan</th>
                          <th className="text-left py-3 px-2">Şikayet</th>
                          <th className="text-left py-3 px-2">Durum</th>
                        </tr>
                      </thead>
                      <tbody>
                        {performanceData.staff.map((member, index) => (
                          <tr key={index} className="border-b hover:bg-gray-50 cursor-pointer">
                            <td className="py-3 px-2 font-medium">{member.name}</td>
                            <td className="py-3 px-2">{member.role}</td>
                            <td className="py-3 px-2">{member.reviews}</td>
                            <td className="py-3 px-2">{member.rating.toFixed(1)}★</td>
                            <td className="py-3 px-2">
                              <span className={`px-2 py-1 rounded-full text-xs ${
                                member.complaints === 0 ? 'bg-green-100 text-green-800' :
                                member.complaints <= 2 ? 'bg-yellow-100 text-yellow-800' :
                                'bg-red-100 text-red-800'
                              }`}>
                                {member.complaints}
                              </span>
                            </td>
                            <td className="py-3 px-2">
                              <span className={`px-2 py-1 rounded-full text-xs ${
                                member.rating >= 4.5 ? 'bg-green-100 text-green-800' :
                                member.rating >= 4.0 ? 'bg-yellow-100 text-yellow-800' :
                                'bg-red-100 text-red-800'
                              }`}>
                                {member.rating >= 4.5 ? 'Mükemmel' :
                                 member.rating >= 4.0 ? 'İyi' : 'Gelişim Gerekli'}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
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

export default Analytics 