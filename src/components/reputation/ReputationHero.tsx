'use client'

import Link from 'next/link'
import { Play, ArrowRight, Star, CheckCircle, TrendingUp, MessageSquare, Clock, Zap, Search, Pizza, Plane, Brain, Sparkles, AlertTriangle, ShieldCheck } from 'lucide-react'
import { motion } from 'framer-motion'
import { useLanguage } from '@/lib/language-provider'
import { useState, useEffect } from 'react'

export default function ReputationHero() {
  const { t } = useLanguage()
  
  // Dashboard state for live animations
  const [dashboardData, setDashboardData] = useState({
    averageRating: 3.0,
    monthlyIncrease: 0.7,
    monthlyReviews: 347,
    reviewsGrowth: 89
  })
  
  // Client-side time to prevent hydration mismatch
  const [currentTime, setCurrentTime] = useState('')
  const [isClient, setIsClient] = useState(false)
  
  // Dynamic reviews data with flowing animation
  const [reviews, setReviews] = useState([
    {
      id: 1,
      platform: 'Google',
      rating: 5,
      text: 'Harika hizmet, personel çok ilgili!',
      timeAgo: 12,
      status: 'positive',
      color: 'blue'
    },
    {
      id: 2,
      platform: 'Yemeksepeti',
      rating: 2,
      text: 'Sipariş 20 dakika geç geldi',
      timeAgo: 34,
      status: 'negative',
      color: 'orange'
    },
    {
      id: 3,
      platform: 'Tripadvisor',
      rating: 5,
      text: 'Atmosfer muhteşem, tekrar geleceğim',
      timeAgo: 65,
      status: 'positive',
      color: 'green'
    }
  ])
  
  // Pool of new reviews to cycle through
  const reviewPool = [
    { platform: 'Google', rating: 4, text: 'Temiz ve düzenli mekan', status: 'positive', color: 'blue' },
    { platform: 'Yemeksepeti', rating: 1, text: 'Yemek soğuk geldi', status: 'negative', color: 'orange' },
    { platform: 'Tripadvisor', rating: 5, text: 'Mükemmel deneyim!', status: 'positive', color: 'green' },
    { platform: 'Google', rating: 3, text: 'Fiyatlar biraz yüksek', status: 'neutral', color: 'blue' },
    { platform: 'Yemeksepeti', rating: 5, text: 'Çok lezzetli, hızlı teslimat', status: 'positive', color: 'orange' },
    { platform: 'Tripadvisor', rating: 2, text: 'Servis yavaştı', status: 'negative', color: 'green' },
    { platform: 'Google', rating: 5, text: 'Personel çok yardımsever', status: 'positive', color: 'blue' },
    { platform: 'Yemeksepeti', rating: 1, text: 'Paket yırtık geldi', status: 'negative', color: 'orange' },
    { platform: 'Tripadvisor', rating: 4, text: 'Güzel manzara, iyi yemek', status: 'positive', color: 'green' },
    { platform: 'Google', rating: 2, text: 'Gürültülü ortam', status: 'negative', color: 'blue' },
  ]

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  }

  // Helper function to format time
  const formatTimeAgo = (seconds: number) => {
    if (seconds < 60) return `${seconds} sn önce`
    return `${Math.floor(seconds / 60)} dk önce`
  }

  // Real-time data simulation and client-side initialization
  useEffect(() => {
    // Initialize client-side state
    setIsClient(true)
    setCurrentTime(new Date().toLocaleTimeString('tr-TR'))
    
    // Update time every second
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString('tr-TR'))
    }, 1000)
    
    // Update dashboard data every 2 seconds - faster rating increase
    const dataInterval = setInterval(() => {
      setDashboardData(prev => ({
        averageRating: Math.min(5.0, prev.averageRating + (Math.random() * 0.08 + 0.02)), // Faster rating increase
        monthlyIncrease: prev.monthlyIncrease + (Math.random() * 0.03),
        monthlyReviews: prev.monthlyReviews + Math.floor(Math.random() * 3),
        reviewsGrowth: prev.reviewsGrowth + Math.floor(Math.random() * 2)
      }))
    }, 2000)

    // Update reviews every 4 seconds - flowing animation with EXACTLY 3 reviews
    const reviewInterval = setInterval(() => {
      setReviews(prevReviews => {
        // Update time for existing reviews
        const updatedReviews = prevReviews.map(review => ({
          ...review,
          timeAgo: review.timeAgo + 4
        }))

        // Always add a new review - flowing effect
        const newReview = reviewPool[Math.floor(Math.random() * reviewPool.length)]
        const newReviewWithId = {
          ...newReview,
          id: Date.now(),
          timeAgo: 0
        }
        
        // Add new review at top, remove oldest - ALWAYS 3 reviews
        return [newReviewWithId, ...updatedReviews].slice(0, 3)
      })
    }, 4000)

    return () => {
      clearInterval(timeInterval)
      clearInterval(dataInterval)
      clearInterval(reviewInterval)
    }
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-gray-900 dark:to-gray-800 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 -left-40 w-96 h-96 bg-gradient-premium rounded-full mix-blend-multiply filter blur-3xl opacity-10 dark:opacity-5 animate-blob"></div>
        <div className="absolute bottom-1/4 -right-40 w-96 h-96 bg-gradient-electric rounded-full mix-blend-multiply filter blur-3xl opacity-10 dark:opacity-5 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-mesh opacity-5 dark:opacity-3"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Side - Content */}
          <div className="text-center lg:text-left">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={itemVariants}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-gray-900 dark:text-white mb-8 leading-tight">
                {t('reputation.hero.title')}{' '}
                <span className="text-gradient-electric">{t('reputation.hero.titleHighlight')}</span>
              </h1>
            </motion.div>
            
            <motion.p
              initial="hidden"
              animate="visible"
              variants={itemVariants}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-12 leading-relaxed"
            >
              {t('reputation.hero.subtitle')}
            </motion.p>
            
            <motion.div
              initial="hidden"
              animate="visible"
              variants={itemVariants}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start items-center mb-12"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
            <Link
              href="#"
                  className="btn btn-primary btn-lg group shadow-2xl"
            >
                  {t('reputation.hero.trial')}
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
              </motion.div>
            
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
            <Link
              href="#"
                  className="btn btn-secondary btn-lg group shadow-xl"
            >
              <Play className="mr-2 h-5 w-5" />
                  {t('reputation.hero.video')}
            </Link>
              </motion.div>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={itemVariants}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-wrap justify-center lg:justify-start items-center gap-6 text-gray-600 dark:text-gray-400"
            >
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5 text-yellow-500" />
                <span className="text-sm font-medium">{t('reputation.hero.stat1')}</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span className="text-sm font-medium">{t('reputation.hero.stat2')}</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-blue-500" />
                <span className="text-sm font-medium">{t('reputation.hero.stat3')}</span>
              </div>
            </motion.div>
          </div>

          {/* Right Side - Interactive Dashboard - Exact Match */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative"
          >
            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-gray-200/50 dark:border-gray-700/50">
              
              {/* Dashboard Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">İtibar Yönetimi Dashboard</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Canlı veri akışı</p>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <div className="flex items-center space-x-1">
                    <Zap className="w-3 h-3 text-green-600 dark:text-green-400" />
                    <span className="text-xs text-green-600 dark:text-green-400 font-medium">Live</span>
                  </div>
                </div>
              </div>

              {/* Main Metrics Row */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                {/* Average Rating */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="text-left"
                >
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-3xl font-bold text-gray-900 dark:text-white">
                      {dashboardData.averageRating.toFixed(1)}★
                    </span>
                    <TrendingUp className="w-4 h-4 text-green-500" />
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Ortalama Puan</p>
                  <p className="text-xs text-green-600 font-medium">+{dashboardData.monthlyIncrease.toFixed(1)} bu ay</p>
                </motion.div>

                {/* Monthly Reviews */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="text-left"
                >
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                      {dashboardData.monthlyReviews}
                    </span>
                    <MessageSquare className="w-4 h-4 text-blue-500" />
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Bu Ay Yorum</p>
                  <p className="text-xs text-blue-600 font-medium">+{dashboardData.reviewsGrowth}% artış</p>
                </motion.div>
              </div>

              {/* Live Feedback Section */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white">Canlı Geri Bildirim Akışı</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Son güncelleme: şimdi</p>
                </div>

                {/* Reviews List */}
                <div className="space-y-3">
                  {reviews.map((review, index) => {
                    // Render the appropriate icon component
                    const renderIcon = () => {
                      if (review.platform === 'Google') {
                        return <Search className="w-4 h-4 text-white" />
                      } else if (review.platform === 'Yemeksepeti') {
                        return <Pizza className="w-4 h-4 text-white" />
                      } else if (review.platform === 'Tripadvisor') {
                        return <Plane className="w-4 h-4 text-white" />
                      }
                      return null
                    }

                    return (
                      <motion.div
                        key={review.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                        className={`p-3 rounded-xl border ${
                          review.status === 'positive' 
                            ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800' 
                            : review.status === 'negative'
                            ? 'bg-orange-50 border-orange-200 dark:bg-orange-900/20 dark:border-orange-800'
                            : 'bg-blue-50 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800'
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-start space-x-3">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                              review.color === 'blue' ? 'bg-blue-500' :
                              review.color === 'orange' ? 'bg-orange-500' : 'bg-green-500'
                            }`}>
                              {renderIcon()}
                            </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <span className="font-semibold text-sm text-gray-900 dark:text-white">
                                {review.platform}
                              </span>
                              <div className="flex items-center space-x-1">
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
                                                             {review.status === 'negative' && (
                                 <div className="flex items-center space-x-1 px-2 py-1 text-xs bg-orange-500 text-white rounded-full font-medium">
                                   <ShieldCheck className="w-3 h-3" />
                                   <span>Yakalandı</span>
                                 </div>
                               )}
                            </div>
                            <p className="text-xs text-gray-700 dark:text-gray-300 mb-1">
                              {review.text}
                            </p>
                                                         <div className="flex items-center space-x-2">
                               <span className="text-xs text-gray-500 dark:text-gray-400">
                                 {formatTimeAgo(review.timeAgo)}
                               </span>
                               {review.status === 'negative' && (
                                 <div className="flex items-center space-x-1">
                                   <Sparkles className="w-3 h-3 text-orange-500" />
                                   <span className="text-xs text-orange-600 dark:text-orange-400">
                                     Otomatik müdahale başlatıldı - Müşteriye SMS gönderildi
                                   </span>
                                 </div>
                               )}
                             </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                    )
                  })}
                </div>
              </div>

              {/* AI Insights Section */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1.1 }}
                className="p-4 rounded-xl bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/30 dark:to-pink-900/30 border border-purple-200 dark:border-purple-800"
              >
                <div className="flex items-center space-x-3">
                                     <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                     <Brain className="w-4 h-4 text-white" />
                   </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-semibold text-sm text-purple-900 dark:text-purple-100">
                        AI İç Görü
                      </span>
                      <span className="px-2 py-1 text-xs bg-purple-500 text-white rounded-full font-medium">
                        Yeni
                      </span>
                    </div>
                    <p className="text-xs text-purple-700 dark:text-purple-300">
                      Bu hafta en çok şikayet edilen konu: "Servis hızı". Özellikle 19:00-21:00 saatleri arasında. 
                      Öneri: Personel sayısını artırın.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-4 h-4 bg-primary-300 dark:bg-primary-600 rounded-full animate-pulse opacity-60"></div>
      <div className="absolute bottom-20 right-10 w-6 h-6 bg-secondary-300 dark:bg-secondary-600 rounded-full animate-pulse animation-delay-1000 opacity-60"></div>
      <div className="absolute top-1/2 left-20 w-3 h-3 bg-accent-300 dark:bg-accent-600 rounded-full animate-pulse animation-delay-2000 opacity-60"></div>
      <div className="absolute top-1/3 right-20 w-5 h-5 bg-yellow-300 dark:bg-yellow-600 rounded-full animate-pulse animation-delay-500 opacity-60"></div>
    </section>
  )
} 