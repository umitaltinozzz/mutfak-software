'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  TrendingUp, 
  TrendingDown, 
  MessageSquare, 
  Star, 
  Clock, 
  AlertCircle,
  CheckCircle,
  Eye,
  Users,
  MapPin,
  Calendar,
  Filter,
  Download,
  Sparkles,
  Activity
} from 'lucide-react'

// Mock veri tipleri
interface MetricData {
  totalReviews: number
  averageRating: number
  unansweredNegative: number
  monthlyGrowth: number
  responseTime: string
  positivePercentage: number
}

interface ReviewItem {
  id: string
  platform: 'Google' | 'Yemeksepeti' | 'Tripadvisor'
  rating: number
  comment: string
  customer: string
  timeAgo: string
  status: 'positive' | 'negative' | 'neutral'
  isAnswered: boolean
  tableNumber?: string
}

interface TrendData {
  date: string
  rating: number
  reviewCount: number
}

const DashboardMain = () => {
  const [timeFilter, setTimeFilter] = useState('30days')
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  // Mock veri
  const [metrics, setMetrics] = useState<MetricData>({
    totalReviews: 1247,
    averageRating: 4.3,
    unansweredNegative: 7,
    monthlyGrowth: 23.5,
    responseTime: '< 2 saat',
    positivePercentage: 87
  })

  const [recentReviews, setRecentReviews] = useState<ReviewItem[]>([
    {
      id: '1',
      platform: 'Google',
      rating: 5,
      comment: 'Harika bir deneyimdi! Personel çok ilgili ve yemekler lezzetliydi.',
      customer: 'Ahmet K.',
      timeAgo: '5 dk önce',
      status: 'positive',
      isAnswered: true,
      tableNumber: 'Masa 3'
    },
    {
      id: '2',
      platform: 'Yemeksepeti',
      rating: 2,
      comment: 'Sipariş çok geç geldi ve yemek soğuktu.',
      customer: 'Zeynep M.',
      timeAgo: '15 dk önce',
      status: 'negative',
      isAnswered: false,
      tableNumber: 'Online'
    },
    {
      id: '3',
      platform: 'Tripadvisor',
      rating: 4,
      comment: 'Genel olarak güzel bir yer, sadece biraz gürültülü.',
      customer: 'Mehmet S.',
      timeAgo: '1 saat önce',
      status: 'positive',
      isAnswered: true,
      tableNumber: 'Masa 7'
    }
  ])

  const [trendData] = useState<TrendData[]>([
    { date: '1 Haf', rating: 4.1, reviewCount: 45 },
    { date: '2 Haf', rating: 4.2, reviewCount: 52 },
    { date: '3 Haf', rating: 4.0, reviewCount: 38 },
    { date: '4 Haf', rating: 4.3, reviewCount: 61 }
  ])

  useEffect(() => {
    // Yükleme simülasyonu
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    
    return () => clearTimeout(timer)
  }, [])

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'Google': return '🗺️'
      case 'Yemeksepeti': return '🍕'
      case 'Tripadvisor': return '✈️'
      default: return '💬'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'positive': return 'border-green-500 bg-green-50 dark:bg-green-900/20'
      case 'negative': return 'border-red-500 bg-red-50 dark:bg-red-900/20'
      default: return 'border-gray-500 bg-gray-50 dark:bg-gray-900/20'
    }
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

  // Action handlers
  const handleDownloadReport = () => {
    showToast('Rapor indiriliyor...', 'info')
    
    // Simulate PDF generation
    setTimeout(() => {
      const link = document.createElement('a')
      link.href = '#'
      link.download = `performans-raporu-${new Date().toISOString().split('T')[0]}.pdf`
      
      showToast('Rapor başarıyla indirildi!', 'success')
    }, 2000)
  }

  const handleDetailedView = () => {
    showToast('Detaylı görünüm açılıyor...', 'info')
    router.push('/dashboard/mekan-zekasi')
  }

  const handleFilterReviews = () => {
    showToast('Yorum filtreleme açılıyor...', 'info')
    router.push('/dashboard/yorumlar')
  }

  const handleUrgentReply = (reviewId: string) => {
    showToast('Yorum yanıtlama açılıyor...', 'info')
    router.push(`/dashboard/yorumlar#${reviewId}`)
  }

  const handleTimeFilterChange = (filter: string) => {
    setTimeFilter(filter)
    setIsLoading(true)
    
    showToast(`Filtre güncellendi: ${filter}`, 'info')
    
    // Simulate data refresh
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }

  if (isLoading) {
    return (
      <div className="dashboard-content space-y-6">
        {/* Skeleton Loader */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="premium-card p-6">
              <div className="skeleton-title w-3/4" />
              <div className="skeleton h-8 w-1/2 mb-2" />
              <div className="skeleton-text w-full" />
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="dashboard-content space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            İşletme Panelinize Hoş Geldiniz
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            İşletmenizin anlık durumunu buradan takip edebilirsiniz
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <select
            value={timeFilter}
            onChange={(e) => handleTimeFilterChange(e.target.value)}
            className="form-input text-sm"
          >
            <option value="7days">Son 7 Gün</option>
            <option value="30days">Son 30 Gün</option>
            <option value="90days">Son 3 Ay</option>
          </select>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-premium btn-ghost"
            onClick={handleDownloadReport}
          >
            <Download className="w-4 h-4 mr-2" />
            Rapor İndir
          </motion.button>
        </div>
      </div>

      {/* Metrik Kartları */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="metric-card cursor-pointer"
          onClick={() => router.push('/dashboard/yorumlar')}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-white" />
            </div>
            <div className="metric-trend positive">
              <TrendingUp className="w-4 h-4 inline mr-1" />
              +{metrics.monthlyGrowth}%
            </div>
          </div>
          <div className="metric-value">{metrics.totalReviews.toLocaleString()}</div>
          <div className="metric-label">Toplam Yorum</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="metric-card cursor-pointer"
          onClick={() => router.push('/dashboard/analitik')}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center">
              <Star className="w-6 h-6 text-white" />
            </div>
            <div className="metric-trend positive">
              <TrendingUp className="w-4 h-4 inline mr-1" />
              +0.3
            </div>
          </div>
          <div className="metric-value">{metrics.averageRating.toFixed(1)}★</div>
          <div className="metric-label">Ortalama Puan</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="metric-card cursor-pointer"
          onClick={() => router.push('/dashboard/yorumlar?filter=negative')}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-red-600 rounded-xl flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-white" />
            </div>
            <div className="metric-trend negative">
              <TrendingDown className="w-4 h-4 inline mr-1" />
              -2
            </div>
          </div>
          <div className="metric-value">{metrics.unansweredNegative}</div>
          <div className="metric-label">Yanıtsız Olumsuz</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="metric-card cursor-pointer"
          onClick={() => router.push('/dashboard/yorumlar')}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center">
              <Clock className="w-6 h-6 text-white" />
            </div>
            <div className="metric-trend positive">
              <CheckCircle className="w-4 h-4 inline mr-1" />
              Hızlı
            </div>
          </div>
          <div className="metric-value text-2xl">{metrics.responseTime}</div>
          <div className="metric-label">Ortalama Yanıt</div>
        </motion.div>
      </div>

      {/* Ana İçerik Alanı */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sol Kolon - Puan Trendi */}
        <div className="lg:col-span-2 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="business-chart"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                Puan Trend Grafiği
              </h3>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <span className="text-sm text-gray-600 dark:text-gray-400">Puan</span>
                <div className="w-3 h-3 bg-purple-500 rounded-full ml-4"></div>
                <span className="text-sm text-gray-600 dark:text-gray-400">Yorum Sayısı</span>
              </div>
            </div>

            {/* Basit Grafik Görselleştirmesi */}
            <div className="space-y-4">
              {trendData.map((data, index) => (
                <div key={data.date} className="flex items-center gap-4">
                  <div className="w-16 text-sm text-gray-600 dark:text-gray-400">
                    {data.date}
                  </div>
                  <div className="flex-1 flex items-center gap-4">
                    <div className="flex-1 bg-gray-100 dark:bg-gray-800 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-700"
                        style={{ width: `${(data.rating / 5) * 100}%` }}
                      />
                    </div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-white w-12">
                      {data.rating}★
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 w-16">
                      {data.reviewCount} yorum
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Masa Isı Haritası Önizleme */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="premium-card p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                Masa Isı Haritası (Önizleme)
              </h3>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-premium btn-ghost text-sm"
                onClick={handleDetailedView}
              >
                <Eye className="w-4 h-4 mr-2" />
                Detaylı Görünüm
              </motion.button>
            </div>

            <div className="grid grid-cols-6 gap-2 max-w-md">
              {/* Masa simülasyonu */}
              {[...Array(18)].map((_, i) => {
                const status = i % 6 === 0 ? 'bad' : i % 4 === 0 ? 'neutral' : 'good'
                return (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.1 }}
                    className={`heatmap-table ${status} relative group cursor-pointer`}
                    onClick={() => router.push('/dashboard/mekan-zekasi')}
                  >
                    <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                      {i + 1}
                    </span>
                    
                    {/* Tooltip */}
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                      Masa {i + 1}: {status === 'good' ? '4.5★' : status === 'neutral' ? '3.2★' : '2.1★'}
                    </div>
                  </motion.div>
                )
              })}
            </div>

            <div className="flex items-center gap-6 mt-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-100 border-2 border-green-300 rounded"></div>
                <span className="text-gray-600 dark:text-gray-400">İyi (4+ yıldız)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-yellow-100 border-2 border-yellow-300 rounded"></div>
                <span className="text-gray-600 dark:text-gray-400">Normal (3-4 yıldız)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-red-100 border-2 border-red-300 rounded"></div>
                <span className="text-gray-600 dark:text-gray-400">Sorunlu (1-2 yıldız)</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Sağ Kolon - Son Geri Bildirimler */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="premium-card p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                Son Geri Bildirimler
              </h3>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-premium btn-ghost text-sm"
                onClick={handleFilterReviews}
              >
                <Filter className="w-4 h-4 mr-2" />
                Filtrele
              </motion.button>
            </div>

            <div className="space-y-4">
              {recentReviews.map((review, index) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  className={`comment-item ${review.status} p-4 rounded-xl cursor-pointer hover:shadow-md transition-shadow`}
                  onClick={() => router.push(`/dashboard/yorumlar#${review.id}`)}
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-white dark:bg-gray-800 rounded-lg flex items-center justify-center text-xl shadow-sm">
                      {getPlatformIcon(review.platform)}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-sm text-gray-900 dark:text-white">
                          {review.platform}
                        </span>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3 h-3 ${
                                i < review.rating
                                  ? 'text-yellow-400 fill-current'
                                  : 'text-gray-300 dark:text-gray-600'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {review.timeAgo}
                        </span>
                      </div>
                      
                      <p className="text-sm text-gray-700 dark:text-gray-300 mb-2 line-clamp-2">
                        {review.comment}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                          <Users className="w-3 h-3" />
                          <span>{review.customer}</span>
                          {review.tableNumber && (
                            <>
                              <MapPin className="w-3 h-3 ml-2" />
                              <span>{review.tableNumber}</span>
                            </>
                          )}
                        </div>
                        
                        {!review.isAnswered && review.status === 'negative' && (
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="btn-danger btn-sm"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleUrgentReply(review.id)
                            }}
                          >
                            Acil Yanıt
                          </motion.button>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Hızlı Aksiyonlar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
            className="premium-card p-6"
          >
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
              Hızlı Aksiyonlar
            </h3>
            
            <div className="space-y-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full btn-premium btn-primary text-sm justify-between"
              >
                <span className="flex items-center">
                  <AlertCircle className="w-4 h-4 mr-2" />
                  {metrics.unansweredNegative} Olumsuz Yanıtla
                </span>
                <span className="bg-white/20 px-2 py-1 rounded-full text-xs">
                  Acil
                </span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full btn-premium btn-secondary text-sm"
              >
                <Sparkles className="w-4 h-4 mr-2" />
                Yeni QR Kod Oluştur
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full btn-premium btn-ghost text-sm"
              >
                <Activity className="w-4 h-4 mr-2" />
                Analitik Raporu
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default DashboardMain 