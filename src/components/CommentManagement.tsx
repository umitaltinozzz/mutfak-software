'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Filter, 
  Search, 
  Star, 
  MessageSquare, 
  Clock, 
  AlertTriangle,
  CheckCircle,
  Send,
  Bot,
  RefreshCw,
  Eye,
  MoreHorizontal,
  ArrowRight,
  User,
  MapPin,
  Calendar,
  ThumbsUp,
  ThumbsDown,
  Sparkles,
  Brain,
  Tag,
  Heart
} from 'lucide-react'

interface Comment {
  id: string
  platform: 'Google' | 'Yemeksepeti' | 'Tripadvisor' | 'Form'
  rating: number
  content: string
  customer: {
    name: string
    email?: string
    phone?: string
    avatar?: string
  }
  timestamp: string
  status: 'pending' | 'responded' | 'archived'
  sentiment: 'positive' | 'negative' | 'neutral'
  tableNumber?: string
  location?: string
  isRead: boolean
  tags: string[]
  aiAnalysis?: {
    category: string
    urgency: 'low' | 'medium' | 'high'
    suggestedResponse: string
    keywords: string[]
  }
}

interface FilterOptions {
  platform: string
  rating: string
  status: string
  sentiment: string
  timeRange: string
}

const CommentManagement = () => {
  const [selectedComment, setSelectedComment] = useState<Comment | null>(null)
  const [comments, setComments] = useState<Comment[]>([])
  const [filteredComments, setFilteredComments] = useState<Comment[]>([])
  const [filters, setFilters] = useState<FilterOptions>({
    platform: 'all',
    rating: 'all',
    status: 'all',
    sentiment: 'all',
    timeRange: 'all'
  })
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedComments, setSelectedComments] = useState<string[]>([])
  const [responseText, setResponseText] = useState('')
  const [isGeneratingAI, setIsGeneratingAI] = useState(false)

  // Mock data
  useEffect(() => {
    const mockComments: Comment[] = [
      {
        id: '1',
        platform: 'Google',
        rating: 2,
        content: 'Yemek çok geç geldi ve soğuktu. Garson ilgisizdi. Bir daha gelmem.',
        customer: {
          name: 'Ahmet Yılmaz',
          email: 'ahmet@email.com',
          avatar: '👨'
        },
        timestamp: '2024-01-15T10:30:00Z',
        status: 'pending',
        sentiment: 'negative',
        tableNumber: 'Masa 7',
        isRead: false,
        tags: ['servis', 'yemek', 'hız'],
        aiAnalysis: {
          category: 'Servis Kalitesi',
          urgency: 'high',
          suggestedResponse: 'Merhaba Ahmet Bey, yaşadığınız olumsuz deneyim için çok üzgünüz. Konuyla ilgili derhal gerekli önlemleri alacağız.',
          keywords: ['geç', 'soğuk', 'ilgisiz']
        }
      },
      {
        id: '2',
        platform: 'Yemeksepeti',
        rating: 5,
        content: 'Harika bir deneyimdi! Yemekler çok lezzetliydi ve teslimat hızlıydı.',
        customer: {
          name: 'Zeynep Kaya',
          email: 'zeynep@email.com',
          avatar: '👩'
        },
        timestamp: '2024-01-15T09:15:00Z',
        status: 'responded',
        sentiment: 'positive',
        isRead: true,
        tags: ['lezzet', 'teslimat'],
        aiAnalysis: {
          category: 'Genel Memnuniyet',
          urgency: 'low',
          suggestedResponse: 'Çok teşekkür ederiz Zeynep Hanım! Bu güzel yorumunuz için minnettarız.',
          keywords: ['harika', 'lezzetli', 'hızlı']
        }
      },
      {
        id: '3',
        platform: 'Form',
        rating: 1,
        content: 'Hijyen kurallarına dikkat edilmiyor. Masalar kirli, çatal kaşık lekeliydi.',
        customer: {
          name: 'Mehmet Öz',
          phone: '0532 123 45 67',
          avatar: '👨‍💼'
        },
        timestamp: '2024-01-15T08:45:00Z',
        status: 'pending',
        sentiment: 'negative',
        tableNumber: 'Masa 3',
        isRead: false,
        tags: ['hijyen', 'temizlik'],
        aiAnalysis: {
          category: 'Hijyen ve Temizlik',
          urgency: 'high',
          suggestedResponse: 'Sayın Mehmet Bey, hijyen konusundaki endişeniz çok önemli. Size özel bir indirim kodu gönderebiliriz.',
          keywords: ['hijyen', 'kirli', 'lekeli']
        }
      }
    ]
    
    setComments(mockComments)
    setFilteredComments(mockComments)
    setSelectedComment(mockComments[0])
  }, [])

  // Filtreleme
  useEffect(() => {
    let filtered = comments.filter(comment => {
      const matchesSearch = comment.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           comment.customer.name.toLowerCase().includes(searchQuery.toLowerCase())
      
      const matchesPlatform = filters.platform === 'all' || comment.platform === filters.platform
      const matchesRating = filters.rating === 'all' || comment.rating.toString() === filters.rating
      const matchesStatus = filters.status === 'all' || comment.status === filters.status
      const matchesSentiment = filters.sentiment === 'all' || comment.sentiment === filters.sentiment
      
      return matchesSearch && matchesPlatform && matchesRating && matchesStatus && matchesSentiment
    })
    
    setFilteredComments(filtered)
  }, [comments, filters, searchQuery])

  const generateAIResponse = async () => {
    if (!selectedComment?.aiAnalysis) return
    
    setIsGeneratingAI(true)
    
    // AI yanıt simülasyonu
    setTimeout(() => {
      setResponseText(selectedComment.aiAnalysis.suggestedResponse)
      setIsGeneratingAI(false)
    }, 2000)
  }

  const sendResponse = () => {
    if (!selectedComment || !responseText.trim()) return
    
    // Yanıt gönderme simülasyonu
    const updatedComments = comments.map(comment => 
      comment.id === selectedComment.id 
        ? { ...comment, status: 'responded' as const, isRead: true }
        : comment
    )
    
    setComments(updatedComments)
    setResponseText('')
    
    // Toast bildirim göster
    alert('Yanıt başarıyla gönderildi!')
  }

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'Google': return '🗺️'
      case 'Yemeksepeti': return '🍕'
      case 'Tripadvisor': return '✈️'
      case 'Form': return '📝'
      default: return '💬'
    }
  }

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'text-green-600 bg-green-50 dark:bg-green-900/20'
      case 'negative': return 'text-red-600 bg-red-50 dark:bg-red-900/20'
      default: return 'text-gray-600 bg-gray-50 dark:bg-gray-900/20'
    }
  }

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'bg-red-500'
      case 'medium': return 'bg-yellow-500'
      default: return 'bg-green-500'
    }
  }

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sol Panel - Filtreler */}
      <div className="w-80 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Yorum Yönetimi
          </h2>
          
          {/* Arama */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Yorum veya müşteri ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="form-input w-full pl-10"
            />
          </div>

          {/* Hızlı Filtreler */}
          <div className="space-y-3">
            <button
              onClick={() => setFilters({ ...filters, status: 'pending', sentiment: 'negative' })}
              className="w-full p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl text-left hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="font-medium text-red-700 dark:text-red-300">Acil Yanıt Gerekli</span>
                <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs">
                  {comments.filter(c => c.status === 'pending' && c.sentiment === 'negative').length}
                </span>
              </div>
            </button>

            <button
              onClick={() => setFilters({ ...filters, status: 'pending' })}
              className="w-full p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl text-left hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="font-medium text-blue-700 dark:text-blue-300">Yanıt Bekleyenler</span>
                <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs">
                  {comments.filter(c => c.status === 'pending').length}
                </span>
              </div>
            </button>
          </div>
        </div>

        {/* Detaylı Filtreler */}
        <div className="p-6 space-y-4 flex-1 overflow-y-auto">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Platform
            </label>
            <select
              value={filters.platform}
              onChange={(e) => setFilters({ ...filters, platform: e.target.value })}
              className="form-input w-full"
            >
              <option value="all">Tüm Platformlar</option>
              <option value="Google">Google</option>
              <option value="Yemeksepeti">Yemeksepeti</option>
              <option value="Tripadvisor">Tripadvisor</option>
              <option value="Form">Özel Form</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Puan
            </label>
            <select
              value={filters.rating}
              onChange={(e) => setFilters({ ...filters, rating: e.target.value })}
              className="form-input w-full"
            >
              <option value="all">Tüm Puanlar</option>
              <option value="1">1 Yıldız</option>
              <option value="2">2 Yıldız</option>
              <option value="3">3 Yıldız</option>
              <option value="4">4 Yıldız</option>
              <option value="5">5 Yıldız</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Durum
            </label>
            <select
              value={filters.status}
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              className="form-input w-full"
            >
              <option value="all">Tüm Durumlar</option>
              <option value="pending">Yanıt Bekliyor</option>
              <option value="responded">Yanıtlandı</option>
              <option value="archived">Arşivlendi</option>
            </select>
          </div>

          <button
            onClick={() => setFilters({
              platform: 'all',
              rating: 'all',
              status: 'all',
              sentiment: 'all',
              timeRange: 'all'
            })}
            className="w-full btn-premium btn-ghost"
          >
            Filtreleri Temizle
          </button>
        </div>
      </div>

      {/* Orta Panel - Yorum Listesi */}
      <div className="w-96 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <h3 className="font-semibold text-gray-900 dark:text-white">
            Yorumlar ({filteredComments.length})
          </h3>
          
          {selectedComments.length > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">{selectedComments.length} seçili</span>
              <button className="btn-premium btn-primary text-xs">
                Toplu İşlem
              </button>
            </div>
          )}
        </div>

        <div className="flex-1 overflow-y-auto">
          {filteredComments.length === 0 ? (
            <div className="empty-state">
              <MessageSquare className="empty-state-icon" />
              <h4 className="empty-state-title">Yorum Bulunamadı</h4>
              <p className="empty-state-description">
                Arama kriterlerinize uygun yorum bulunmuyor.
              </p>
            </div>
          ) : (
            <div className="space-y-1 p-2">
              {filteredComments.map((comment) => (
                <motion.div
                  key={comment.id}
                  layoutId={comment.id}
                  onClick={() => setSelectedComment(comment)}
                  className={`p-4 rounded-xl cursor-pointer transition-all ${
                    selectedComment?.id === comment.id
                      ? 'bg-blue-50 dark:bg-blue-900/20 border-2 border-blue-200 dark:border-blue-800'
                      : 'hover:bg-gray-50 dark:hover:bg-gray-700/50 border-2 border-transparent'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={selectedComments.includes(comment.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedComments([...selectedComments, comment.id])
                          } else {
                            setSelectedComments(selectedComments.filter(id => id !== comment.id))
                          }
                        }}
                        className="rounded"
                        onClick={(e) => e.stopPropagation()}
                      />
                      
                      <div className="w-8 h-8 bg-white dark:bg-gray-800 rounded-lg flex items-center justify-center text-lg shadow-sm">
                        {getPlatformIcon(comment.platform)}
                      </div>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-sm text-gray-900 dark:text-white">
                          {comment.customer.name}
                        </span>
                        {!comment.isRead && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        )}
                      </div>
                      
                      <div className="flex items-center gap-1 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 ${
                              i < comment.rating
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300 dark:text-gray-600'
                            }`}
                          />
                        ))}
                        <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">
                          {comment.platform}
                        </span>
                      </div>
                      
                      <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2 mb-2">
                        {comment.content}
                      </p>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {new Date(comment.timestamp).toLocaleDateString('tr-TR')}
                        </span>
                        
                        <div className="flex items-center gap-1">
                          <div className={`w-2 h-2 rounded-full ${getUrgencyColor(comment.aiAnalysis?.urgency || 'low')}`}></div>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSentimentColor(comment.sentiment)}`}>
                            {comment.sentiment === 'positive' ? 'Olumlu' : comment.sentiment === 'negative' ? 'Olumsuz' : 'Nötr'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Sağ Panel - Detay ve Yanıt */}
      <div className="flex-1 flex flex-col bg-white dark:bg-gray-800">
        {selectedComment ? (
          <>
            {/* Yorum Detayı */}
            <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex-1 overflow-y-auto">
              <div className="space-y-6">
                {/* Başlık */}
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    Yorum Detayı
                  </h3>
                  <div className="flex items-center gap-2">
                    <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Müşteri Bilgileri */}
                <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center text-white text-xl">
                      {selectedComment.customer.avatar}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">
                        {selectedComment.customer.name}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {selectedComment.customer.email || selectedComment.customer.phone}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(selectedComment.timestamp).toLocaleDateString('tr-TR')}</span>
                    </div>
                    {selectedComment.tableNumber && (
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>{selectedComment.tableNumber}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Yorum İçeriği */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < selectedComment.rating
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300 dark:text-gray-600'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      {selectedComment.platform}
                    </span>
                  </div>
                  
                  <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-4">
                    <p className="text-gray-900 dark:text-white leading-relaxed">
                      {selectedComment.content}
                    </p>
                  </div>
                </div>

                {/* Etiketler */}
                {selectedComment.tags.length > 0 && (
                  <div>
                    <h5 className="font-medium text-gray-900 dark:text-white mb-2">Etiketler</h5>
                    <div className="flex flex-wrap gap-2">
                      {selectedComment.tags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-xs font-medium"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* AI Analizi */}
                {selectedComment.aiAnalysis && (
                  <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-xl p-4 border border-purple-200 dark:border-purple-800">
                    <div className="flex items-center gap-2 mb-3">
                      <Brain className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                      <h5 className="font-semibold text-purple-900 dark:text-purple-100">AI Analizi</h5>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Tag className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          Kategori: {selectedComment.aiAnalysis.category}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          Aciliyet: 
                          <span className={`ml-1 px-2 py-1 rounded-full text-xs ${
                            selectedComment.aiAnalysis.urgency === 'high' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300' :
                            selectedComment.aiAnalysis.urgency === 'medium' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300' :
                            'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
                          }`}>
                            {selectedComment.aiAnalysis.urgency === 'high' ? 'Yüksek' :
                             selectedComment.aiAnalysis.urgency === 'medium' ? 'Orta' : 'Düşük'}
                          </span>
                        </span>
                      </div>
                      
                      <div>
                        <span className="text-sm font-medium text-gray-900 dark:text-white block mb-1">
                          Anahtar Kelimeler:
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {selectedComment.aiAnalysis.keywords.map((keyword, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded text-xs"
                            >
                              {keyword}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Yanıt Alanı */}
            <div className="p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-gray-900 dark:text-white">Yanıt Ver</h4>
                  <div className="flex items-center gap-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={generateAIResponse}
                      disabled={isGeneratingAI}
                      className="btn-premium btn-secondary text-sm"
                    >
                      {isGeneratingAI ? (
                        <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      ) : (
                        <Sparkles className="w-4 h-4 mr-2" />
                      )}
                      AI Önerisi
                    </motion.button>
                  </div>
                </div>

                <div>
                  <textarea
                    value={responseText}
                    onChange={(e) => setResponseText(e.target.value)}
                    placeholder="Yanıtınızı buraya yazın..."
                    className="form-input w-full h-32 resize-none"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <span>{responseText.length}/500 karakter</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button className="btn-premium btn-ghost">
                      Şablon Kullan
                    </button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={sendResponse}
                      disabled={!responseText.trim()}
                      className="btn-premium btn-primary"
                    >
                      <Send className="w-4 h-4 mr-2" />
                      Yanıtı Gönder
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <MessageSquare className="w-16 h-16 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Yorum Seçin
              </h4>
              <p className="text-gray-600 dark:text-gray-400">
                Detayları görüntülemek için soldaki listeden bir yorum seçin
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CommentManagement 