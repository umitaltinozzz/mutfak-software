'use client'

import { UserX, TrendingDown, Target, AlertTriangle, DollarSign, Users, Clock, Zap } from 'lucide-react'
import { useLanguage } from '@/lib/language-provider'
import { useTheme } from '@/lib/theme-provider'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

export default function LossAversion() {
  const { t } = useLanguage()
  const { theme } = useTheme()
  
  // Animated counter states
  const [customerLoss, setCustomerLoss] = useState(0)
  const [reputationLoss, setReputationLoss] = useState(0)
  const [operationalLoss, setOperationalLoss] = useState(0)
  const [totalLoss, setTotalLoss] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  // Counter animation effect
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 500)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (isVisible) {
      // Animate customer loss counter
      const customerTarget = 127000
      const customerIncrement = customerTarget / 100
      let customerCurrent = 0
      
      const customerInterval = setInterval(() => {
        customerCurrent += customerIncrement
        if (customerCurrent >= customerTarget) {
          customerCurrent = customerTarget
          clearInterval(customerInterval)
        }
        setCustomerLoss(Math.floor(customerCurrent))
      }, 30)

      // Animate reputation loss counter
      const reputationTarget = 89000
      const reputationIncrement = reputationTarget / 100
      let reputationCurrent = 0
      
      const reputationInterval = setInterval(() => {
        reputationCurrent += reputationIncrement
        if (reputationCurrent >= reputationTarget) {
          reputationCurrent = reputationTarget
          clearInterval(reputationInterval)
        }
        setReputationLoss(Math.floor(reputationCurrent))
      }, 35)

      // Animate operational loss counter
      const operationalTarget = 45000
      const operationalIncrement = operationalTarget / 100
      let operationalCurrent = 0
      
      const operationalInterval = setInterval(() => {
        operationalCurrent += operationalIncrement
        if (operationalCurrent >= operationalTarget) {
          operationalCurrent = operationalTarget
          clearInterval(operationalInterval)
        }
        setOperationalLoss(Math.floor(operationalCurrent))
      }, 40)

      // Animate total loss counter
      const totalTarget = 261000
      const totalIncrement = totalTarget / 100
      let totalCurrent = 0
      
      const totalInterval = setInterval(() => {
        totalCurrent += totalIncrement
        if (totalCurrent >= totalTarget) {
          totalCurrent = totalTarget
          clearInterval(totalInterval)
        }
        setTotalLoss(Math.floor(totalCurrent))
      }, 25)

      return () => {
        clearInterval(customerInterval)
        clearInterval(reputationInterval)
        clearInterval(operationalInterval)
        clearInterval(totalInterval)
      }
    }
  }, [isVisible])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  }

  const floatingAnimation = {
    y: [-10, 10, -10],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut" as const
    }
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY',
      maximumFractionDigits: 0
    }).format(value)
  }

  const lossData = [
    {
      icon: UserX,
      title: "Sessizce Giden Müşteriler",
      percentage: "%91 müşteri kaybı",
      amount: customerLoss,
      description: "Mutsuz müşterilerin %91'i bir daha asla geri dönmez. Sorunu bilmediğiniz için onları sonsuza dek kaybedersiniz.",
      bgColor: "from-red-500/20 to-red-600/20",
      iconColor: "from-red-500 to-red-600",
      badgeColor: "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400"
    },
    {
      icon: TrendingDown,
      title: "Online İtibar Krizleri",
      percentage: "%86 tereddüt oranı",
      amount: reputationLoss,
      description: "Google Maps veya Yemeksepeti'ne yazılan tek bir kötü yorum, potansiyel müşterilerinizin %86'sını kararından vazgeçirebilir.",
      bgColor: "from-orange-500/20 to-red-500/20",
      iconColor: "from-orange-500 to-red-600",
      badgeColor: "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400"
    },
    {
      icon: Target,
      title: "Operasyonel Görünmezlik",
      percentage: "Sonsuz döngü",
      amount: operationalLoss,
      description: "Hangi personelin, hangi ürünün veya hangi masanın sorunu yarattığını bilmeden aynı hatalar sonsuza döngüde tekrarlanıyor.",
      bgColor: "from-purple-500/20 to-red-500/20",
      iconColor: "from-purple-500 to-red-600",
      badgeColor: "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400"
    }
  ]

  return (
    <section className="section bg-gradient-to-b from-white via-red-50/20 to-white dark:from-gray-900 dark:via-red-950/20 dark:to-gray-900 relative overflow-hidden">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 -left-40 w-96 h-96 bg-gradient-to-r from-red-500/20 to-orange-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 -right-40 w-96 h-96 bg-gradient-to-l from-red-600/15 to-pink-500/10 rounded-full blur-3xl animate-pulse animation-delay-2000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-radial from-red-500/5 via-transparent to-transparent" />
      </div>

      {/* Floating Elements */}
      <motion.div
        animate={floatingAnimation}
        className="absolute top-20 left-20 w-4 h-4 bg-red-400 rounded-full opacity-60"
      />
      <motion.div
        animate={{
          ...floatingAnimation,
          transition: { ...floatingAnimation.transition, delay: 1 }
        }}
        className="absolute top-40 right-32 w-6 h-6 bg-orange-400 rounded-full opacity-40"
      />
      <motion.div
        animate={{
          ...floatingAnimation,
          transition: { ...floatingAnimation.transition, delay: 2 }
        }}
        className="absolute bottom-32 left-32 w-3 h-3 bg-red-500 rounded-full opacity-50"
      />
      
      <div className="container relative">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-red-500/10 to-orange-500/10 backdrop-blur-xl border border-red-200/50 dark:border-red-800/50 rounded-full text-red-700 dark:text-red-300 text-sm font-semibold mb-8 shadow-glow-red"
            >
              <div className="relative">
                <AlertTriangle className="w-5 h-5" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-ping"></div>
              </div>
              Kritik Maliyet Analizi
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-5xl lg:text-6xl font-black mb-8 leading-none"
            >
              <span className="text-gray-900 dark:text-white">Görmezden Geldiğiniz Her Kötü Yorum </span>
              <span className="bg-gradient-to-r from-red-600 via-red-700 to-red-800 dark:from-red-400 dark:via-red-300 dark:to-red-500 bg-clip-text text-transparent">
                Size Ne Kadar Mal Oluyor?
              </span>
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed"
            >
              Fark etmediğiniz sorunlar, sessizce büyüyerek işletmenizin gelecehiği tarhif ediyor. Rakipleriniz bu
              fırsatı kaçırmıyor.
            </motion.p>
          </motion.div>

          {/* Loss Analysis Cards */}
          <motion.div variants={itemVariants} className="grid lg:grid-cols-3 gap-8 mb-16">
            {lossData.map((item, index) => {
              const IconComponent = item.icon
              return (
                <motion.div 
                  key={index}
                  whileHover={{ y: -8, scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="group relative overflow-hidden"
                >
                  <div className="relative bg-white dark:bg-gray-800 backdrop-blur-xl border border-gray-200/50 dark:border-gray-700/50 rounded-3xl p-8 h-full shadow-xl hover:shadow-2xl transition-all duration-500">
                    
                    {/* Icon */}
                    <div className="relative mb-6 flex justify-center">
                      <div className={`w-20 h-20 bg-gradient-to-br ${item.iconColor} rounded-3xl flex items-center justify-center shadow-xl group-hover:shadow-2xl transition-all duration-500 group-hover:scale-110`}>
                        <IconComponent className="w-10 h-10 text-white" />
                        <div className="absolute inset-0 rounded-3xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      </div>
                    </div>

                    {/* Badge */}
                    <div className="text-center mb-4">
                      <div className={`inline-flex items-center gap-2 px-4 py-2 ${item.badgeColor} rounded-full text-sm font-bold`}>
                        <span>{item.percentage}</span>
                      </div>
                    </div>
                    
                    {/* Amount */}
                    <div className="text-4xl font-black text-red-600 dark:text-red-400 mb-2">
                      {formatCurrency(item.amount)}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 font-medium mb-4">
                      yıllık kayıp
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                      {item.title}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {item.description}
                    </p>

                    {/* Animated bottom accent */}
                    <div className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r ${item.iconColor} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-b-3xl`}></div>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>

          {/* Total Loss Summary */}
          <motion.div variants={itemVariants} className="text-center">
            <div className="bg-gradient-to-br from-red-500/10 via-orange-500/5 to-red-600/10 rounded-3xl p-12 border-2 border-red-200/50 dark:border-red-800/50 max-w-4xl mx-auto">
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
                <div className="text-5xl md:text-6xl font-black text-red-600 dark:text-red-400">
                  {formatCurrency(totalLoss)}+ 
                </div>
              </div>
              
              <h3 className="text-2xl md:text-3xl font-bold text-red-800 dark:text-red-300 mb-4">
                Yıllık Kayıp
              </h3>
              
              <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
                Ortalama bir işletme ziyan yollu kayıp potansiyeli
              </p>

              {/* Key Points */}
              <div className="grid md:grid-cols-3 gap-4 mt-8 text-sm">
                <div className="flex items-center justify-center gap-2 text-gray-600 dark:text-gray-400">
                  • Kayıp müşteriler
                </div>
                <div className="flex items-center justify-center gap-2 text-gray-600 dark:text-gray-400">
                  • Düşen satış 
                </div>
                <div className="flex items-center justify-center gap-2 text-gray-600 dark:text-gray-400">
                  • Operasyonel verimsizlik
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
} 