'use client'

import { Shield, Rocket, Brain, MessageSquare, CheckCircle, Target } from 'lucide-react'
import { useLanguage } from '@/lib/language-provider'

export default function ReputationBenefits() {
  const { t } = useLanguage()

  const benefits = [
    {
      icon: Shield,
      title: t('benefits.crisis.title'),
      description: t('benefits.crisis.description'),
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      iconColor: 'text-blue-600 dark:text-blue-400',
      borderColor: 'border-blue-200/50 dark:border-blue-800/50',
      hoverBorder: 'hover:border-blue-300 dark:hover:border-blue-700'
    },
    {
      icon: Rocket,
      title: t('benefits.positive.title'),
      description: t('benefits.positive.description'),
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      iconColor: 'text-green-600 dark:text-green-400',
      borderColor: 'border-green-200/50 dark:border-green-800/50',
      hoverBorder: 'hover:border-green-300 dark:hover:border-green-700'
    },
    {
      icon: Brain,
      title: t('benefits.data.title'),
      description: t('benefits.data.description'),
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
      iconColor: 'text-purple-600 dark:text-purple-400',
      borderColor: 'border-purple-200/50 dark:border-purple-800/50',
      hoverBorder: 'hover:border-purple-300 dark:hover:border-purple-700'
    },
    {
      icon: MessageSquare,
      title: t('benefits.loyalty.title'),
      description: t('benefits.loyalty.description'),
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50 dark:bg-orange-900/20',
      iconColor: 'text-orange-600 dark:text-orange-400',
      borderColor: 'border-orange-200/50 dark:border-orange-800/50',
      hoverBorder: 'hover:border-orange-300 dark:hover:border-orange-700'
    }
  ]

  return (
    <section className="section bg-gradient-to-br from-white via-blue-50/30 to-green-50/30 dark:from-gray-900 dark:via-blue-900/10 dark:to-green-900/10 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-500/5 via-transparent to-green-500/5 dark:from-blue-400/10 dark:to-green-400/10" />
      <div className="absolute -top-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-float" />
      <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-green-500/10 rounded-full blur-3xl animate-float-delayed" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-500/5 to-green-500/5 rounded-full blur-3xl animate-pulse-slow" />

      <div className="container relative">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100/80 to-green-100/80 dark:from-blue-900/30 dark:to-green-900/30 backdrop-blur-sm border border-blue-200/50 dark:border-blue-800/50 rounded-full text-blue-700 dark:text-blue-300 text-sm font-medium mb-6 animate-fade-in">
            <CheckCircle className="w-4 h-4" />
            İtibar Yönetimi Avantajları
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-gray-900 via-blue-700 to-green-700 dark:from-white dark:via-blue-300 dark:to-green-300 bg-clip-text text-transparent mb-6 leading-tight">
            {t('benefits.title')}
          </h2>
          
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
            {t('benefits.subtitle')}
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {benefits.map((benefit, index) => {
            const IconComponent = benefit.icon
            return (
              <div key={index} className="group relative">
                <div className={`glass-card p-8 h-full hover-lift transition-all duration-500 border-l-4 ${benefit.borderColor} ${benefit.hoverBorder} hover:shadow-premium-lg relative overflow-hidden`}>
                  {/* Card Background Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${benefit.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl`} />
                  
                  {/* Animated Border Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 -skew-x-12 translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000" />
                  
                  <div className="relative flex items-start space-x-6">
                    {/* Icon */}
                    <div className={`w-16 h-16 bg-gradient-to-br ${benefit.color} rounded-2xl flex items-center justify-center flex-shrink-0 shadow-premium-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1">
                      <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {benefit.title}
                      </h3>
                      
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                        {benefit.description}
                      </p>
                      
                      {/* Benefit Indicator */}
                      <div className="flex items-center mt-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                        <Target className={`w-4 h-4 mr-2 ${benefit.iconColor}`} />
                        <span className={`text-sm font-medium ${benefit.iconColor}`}>
                          Anında Aktif
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Progress Indicator */}
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600">
                    <div className={`h-full bg-gradient-to-r ${benefit.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left`} />
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Bottom CTA Section */}
        <div className="mt-20 text-center">
          <div className="glass-card max-w-3xl mx-auto p-10 border border-blue-200/50 dark:border-blue-800/50 hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-500 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-green-500/5 to-blue-500/5" />
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.1),transparent_50%)]" />
            
            <div className="relative">
              <div className="inline-flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-green-500 rounded-xl flex items-center justify-center shadow-premium-lg">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                  Hemen Başlayın
                </h3>
              </div>
              
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
                Bu avantajların tümü tek bir platformda. 30 gün ücretsiz deneme ile işletmenizin gücünü keşfedin.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="btn-premium hover-lift">
                  <span className="relative z-10">Ücretsiz Deneme Başlat</span>
                </button>
                <button className="px-8 py-4 border-2 border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl font-semibold transition-all duration-300 hover-scale">
                  Demo İzle
                </button>
              </div>
              
              {/* Trust Indicators */}
              <div className="flex items-center justify-center gap-6 mt-8 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Kredi Kartı Gerektirmez
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  Anında Kurulum
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  7/24 Destek
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 