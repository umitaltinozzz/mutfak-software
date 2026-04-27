'use client'

import { Check, Star, Crown, Zap, Shield, Sparkles, Building2 } from 'lucide-react'
import { motion } from 'framer-motion'
import { useState } from 'react'

export default function ReputationPricing() {
  const [hoveredPlan, setHoveredPlan] = useState<number | null>(null)

  const plans = [
    {
      name: 'Başlangıç',
      description: 'Tek şube için temel itibar yönetimi',
      price: '299',
      period: 'Ay',
      originalPrice: '499',
      features: [
        '1 Şube İçin Tam Kapsamlı İtibar Yönetimi',
        'Google, Yemeksepeti, Getir İzleme',
        'Otomatik Yorum Yanıtlama (AI)',
        'Temel Analitik Dashboard',
        'Email Destek (7/24)',
        'Mobil Uygulama Erişimi'
      ],
      cta: 'Hemen Başla',
      popular: false,
      color: 'from-blue-500 to-cyan-500',
      icon: Zap,
      stats: { reviews: '100+', response: '< 2 dk', rating: '4.5★' }
    },
    {
      name: 'Profesyonel',
      description: 'Büyüyen işletmeler için gelişmiş özellikler',
      price: '599',
      period: 'Ay',
      originalPrice: '899',
      features: [
        '1 Şube İçin Premium İtibar Yönetimi',
        'Tüm Platformlar (15+ Platform)',
        'Gelişmiş AI Yanıt Sistemi',
        'Detaylı Analitik ve Raporlama',
        'Rekabet Analizi',
        'WhatsApp Entegrasyonu',
        'Öncelikli Telefon Desteği',
        'Özel Hesap Yöneticisi'
      ],
      cta: 'Denemeyi Başlat',
      popular: true,
      color: 'from-purple-500 to-pink-500',
      icon: Crown,
      stats: { reviews: '500+', response: '< 30 sn', rating: '4.8★' }
    },
    {
      name: 'Enterprise',
      description: 'Çoklu şube ve kurumsal çözümler',
      price: 'Özel Fiyat',
      period: '',
      originalPrice: '',
      features: [
        'Sınırsız Şube Yönetimi',
        'Merkezi Dashboard & Raporlama',
        'Franchise Yönetim Sistemi',
        'API Entegrasyonu',
        'Beyaz Etiket Çözüm',
        'Özel AI Modeli Eğitimi',
        '7/24 Öncelikli Destek',
        'Yerinde Kurulum & Eğitim',
        'SLA Garantisi (99.9%)',
        'Dedicated Success Manager'
      ],
      cta: 'Teklif Al',
      popular: false,
      color: 'from-indigo-500 to-purple-600',
      icon: Building2,
      stats: { reviews: '∞', response: 'Anında', rating: '5.0★' }
    }
  ]

  return (
    <section className="section bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/20 dark:from-gray-900 dark:via-slate-900 dark:to-gray-800 relative overflow-hidden">
      <div className="container relative">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 backdrop-blur-xl border border-blue-200/50 dark:border-blue-800/50 rounded-full text-blue-700 dark:text-blue-300 text-sm font-semibold mb-8 shadow-2xl">
            <Sparkles className="w-5 h-5" />
            Şeffaf Fiyatlandırma
          </div>
          
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black mb-8 leading-none">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent">
              İşletmenize Uygun
            </span>
            <br />
            <span className="bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
              Planı Seçin
            </span>
          </h2>
          
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed font-medium">
            Tek şube için optimize edilmiş çözümler. Enterprise ile çoklu şube yönetimi.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => {
            const IconComponent = plan.icon
            const isHovered = hoveredPlan === index
            
            return (
              <motion.div 
                key={index}
                onHoverStart={() => setHoveredPlan(index)}
                onHoverEnd={() => setHoveredPlan(null)}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group relative"
              >
                {plan.popular && (
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 z-20">
                    <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-full text-sm font-bold flex items-center gap-2 shadow-2xl">
                      <Star className="w-4 h-4 fill-current animate-pulse" />
                      <span>En Popüler</span>
                    </div>
                  </div>
                )}

                <div className={`relative bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border-2 border-gray-200/50 dark:border-gray-700/50 rounded-3xl p-8 h-full transition-all duration-700 overflow-hidden ${plan.popular ? 'scale-105 border-purple-300/50 dark:border-purple-700/50' : 'hover:border-blue-300/50 dark:hover:border-blue-700/50'} shadow-xl`}>
                  
                  <div className="relative">
                    <div className="flex items-start justify-between mb-6">
                      <div className={`w-16 h-16 bg-gradient-to-br ${plan.color} rounded-2xl flex items-center justify-center shadow-2xl`}>
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                      
                      <div className="text-right">
                        <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">Aylık işlem</div>
                        <div className={`text-lg font-black bg-gradient-to-r ${plan.color} bg-clip-text text-transparent`}>
                          {plan.stats.reviews}
                        </div>
                      </div>
                    </div>

                    <div className="mb-6">
                      <h3 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white mb-2">
                        {plan.name}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 text-lg">
                        {plan.description}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="text-center p-3 bg-gradient-to-br from-green-50 to-green-100/50 dark:from-green-900/30 dark:to-green-800/20 rounded-xl border border-green-200/50 dark:border-green-700/50">
                        <div className="text-lg font-black text-green-600 dark:text-green-400">
                          {plan.stats.response}
                        </div>
                        <div className="text-xs text-green-700 dark:text-green-300 font-medium">
                          Yanıt Süresi
                        </div>
                      </div>
                      <div className="text-center p-3 bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-900/30 dark:to-blue-800/20 rounded-xl border border-blue-200/50 dark:border-blue-700/50">
                        <div className="text-lg font-black text-blue-600 dark:text-blue-400">
                          {plan.stats.rating}
                        </div>
                        <div className="text-xs text-blue-700 dark:text-blue-300 font-medium">
                          Ortalama Puan
                        </div>
                      </div>
                    </div>

                    <div className="mb-8 text-center">
                      {plan.price === 'Özel Fiyat' ? (
                        <div className={`text-4xl md:text-5xl font-black bg-gradient-to-r ${plan.color} bg-clip-text text-transparent`}>
                          {plan.price}
                        </div>
                      ) : (
                        <div className="space-y-2">
                          {plan.originalPrice && (
                            <div className="text-lg text-gray-500 dark:text-gray-400 line-through">
                              {plan.originalPrice} TL
                            </div>
                          )}
                          <div className="flex items-baseline justify-center gap-1">
                            <span className={`text-5xl md:text-6xl font-black bg-gradient-to-r ${plan.color} bg-clip-text text-transparent`}>
                              {plan.price}
                            </span>
                            <span className="text-xl text-gray-600 dark:text-gray-400 font-bold">TL</span>
                          </div>
                          <div className="text-gray-600 dark:text-gray-400 font-medium">
                            / {plan.period}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="mb-8">
                      <div className="space-y-4">
                        {plan.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-start gap-3">
                            <div className="w-5 h-5 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 shadow-lg">
                              <Check className="w-3 h-3 text-white" />
                            </div>
                            <span className="text-gray-700 dark:text-gray-300 leading-relaxed font-medium">
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <button className={`w-full py-4 px-6 rounded-2xl font-bold text-lg transition-all duration-500 shadow-xl ${
                      plan.popular
                        ? `bg-gradient-to-r ${plan.color} text-white shadow-purple-500/25 hover:shadow-purple-500/40 hover:shadow-2xl`
                        : 'bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 text-gray-900 dark:text-white hover:from-gray-200 hover:to-gray-300 dark:hover:from-gray-600 dark:hover:to-gray-500'
                    }`}>
                      {plan.cta}
                    </button>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
