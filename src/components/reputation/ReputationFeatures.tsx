'use client'

import { Brain, MessageSquare, BarChart3, Palette, Globe, Shield, Sparkles, Star, Zap } from 'lucide-react'
import { useLanguage } from '@/lib/language-provider'

export default function ReputationFeatures() {
  const { t } = useLanguage()

  const features = [
    {
      icon: Brain,
      title: t('features.ai.title'),
      description: t('features.ai.description'),
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
      iconColor: 'text-purple-600 dark:text-purple-400',
      borderColor: 'border-purple-200/50 dark:border-purple-800/50',
      hoverBorder: 'hover:border-purple-300 dark:hover:border-purple-700',
      badge: 'AI Powered'
    },
    {
      icon: MessageSquare,
      title: t('features.communication.title'),
      description: t('features.communication.description'),
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      iconColor: 'text-blue-600 dark:text-blue-400',
      borderColor: 'border-blue-200/50 dark:border-blue-800/50',
      hoverBorder: 'hover:border-blue-300 dark:hover:border-blue-700',
      badge: 'Multi-Channel'
    },
    {
      icon: Globe,
      title: t('features.platforms.title'),
      description: t('features.platforms.description'),
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      iconColor: 'text-green-600 dark:text-green-400',
      borderColor: 'border-green-200/50 dark:border-green-800/50',
      hoverBorder: 'hover:border-green-300 dark:hover:border-green-700',
      badge: 'Universal'
    },
    {
      icon: BarChart3,
      title: t('features.analytics.title'),
      description: t('features.analytics.description'),
      color: 'from-orange-500 to-orange-600',
      bgColor: 'bg-orange-50 dark:bg-orange-900/20',
      iconColor: 'text-orange-600 dark:text-orange-400',
      borderColor: 'border-orange-200/50 dark:border-orange-800/50',
      hoverBorder: 'hover:border-orange-300 dark:hover:border-orange-700',
      badge: 'Deep Insights'
    },
    {
      icon: Palette,
      title: t('features.customization.title'),
      description: t('features.customization.description'),
      color: 'from-pink-500 to-pink-600',
      bgColor: 'bg-pink-50 dark:bg-pink-900/20',
      iconColor: 'text-pink-600 dark:text-pink-400',
      borderColor: 'border-pink-200/50 dark:border-pink-800/50',
      hoverBorder: 'hover:border-pink-300 dark:hover:border-pink-700',
      badge: 'White Label'
    },
    {
      icon: Shield,
      title: t('features.subdomain.title'),
      description: t('features.subdomain.description'),
      color: 'from-indigo-500 to-indigo-600',
      bgColor: 'bg-indigo-50 dark:bg-indigo-900/20',
      iconColor: 'text-indigo-600 dark:text-indigo-400',
      borderColor: 'border-indigo-200/50 dark:border-indigo-800/50',
      hoverBorder: 'hover:border-indigo-300 dark:hover:border-indigo-700',
      badge: 'Enterprise'
    }
  ]

  return (
    <section className="section bg-gradient-to-br from-white via-blue-50/20 to-purple-50/20 dark:from-gray-900 dark:via-blue-900/10 dark:to-purple-900/10 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-500/5 via-transparent to-purple-500/5 dark:from-blue-400/10 dark:to-purple-400/10" />
      <div className="absolute -top-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl animate-float" />
      <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-float-delayed" />
      <div className="absolute top-1/4 right-1/4 w-60 h-60 bg-gradient-to-br from-green-500/10 to-blue-500/10 rounded-full blur-3xl animate-pulse-slow" />

      <div className="container relative">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100/80 to-purple-100/80 dark:from-blue-900/30 dark:to-purple-900/30 backdrop-blur-sm border border-blue-200/50 dark:border-blue-800/50 rounded-full text-blue-700 dark:text-blue-300 text-sm font-medium mb-6 animate-fade-in">
            <Sparkles className="w-4 h-4" />
            Güçlü Özellikler
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-gray-900 via-blue-700 to-purple-700 dark:from-white dark:via-blue-300 dark:to-purple-300 bg-clip-text text-transparent mb-6 leading-tight">
            {t('features.title')}
          </h2>
          
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
            {t('features.subtitle')}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon
            return (
              <div key={index} className="group relative">
                <div className={`glass-card p-8 h-full hover-lift transition-all duration-500 border-2 ${feature.borderColor} ${feature.hoverBorder} hover:shadow-premium-lg relative overflow-hidden`}>
                  {/* Background Gradient */}
                  <div className={`absolute inset-0 ${feature.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl`} />
                  
                  {/* Badge */}
                  <div className="absolute -top-2 -right-2 px-3 py-1 bg-gradient-to-r from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border border-gray-200 dark:border-gray-700 rounded-full text-xs font-semibold text-gray-600 dark:text-gray-400 shadow-lg">
                    {feature.badge}
                  </div>

                  {/* Animated shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 -skew-x-12 translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-1000" />

                  <div className="relative">
                    {/* Icon */}
                    <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6 shadow-premium-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 relative`}>
                      <IconComponent className="w-8 h-8 text-white" />
                      
                      {/* Sparkle effect */}
                      <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-0 group-hover:scale-100">
                        <Star className="w-3 h-3 text-white" />
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {feature.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg mb-6">
                      {feature.description}
                    </p>

                    {/* Feature highlight */}
                    <div className="flex items-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                      <Zap className={`w-4 h-4 mr-2 ${feature.iconColor}`} />
                      <span className={`text-sm font-medium ${feature.iconColor}`}>
                        Aktif Özellik
                      </span>
                    </div>

                    {/* Progress indicator */}
                    <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600">
                      <div className={`h-full bg-gradient-to-r ${feature.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left`} />
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Bottom Feature Highlight */}
        <div className="mt-20 text-center">
          <div className="glass-card max-w-4xl mx-auto p-10 border border-blue-200/50 dark:border-blue-800/50 hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-500 relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5" />
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.1),transparent_50%)]" />
            
            <div className="relative">
              <div className="inline-flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center shadow-premium-lg">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                  Enterprise Düzeyinde Güvenilirlik
                </h3>
              </div>
              
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                Tüm özellikler enterprise düzeyinde güvenlik, performans ve ölçeklenebilirlik ile desteklenir. 
                İşletmenizin boyutu ne olursa olsun maksimum verimlilik için tasarlandı.
              </p>
              
              {/* Feature Stats */}
              <div className="grid md:grid-cols-4 gap-6">
                <div className="text-center p-4 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-900/30 dark:to-blue-800/20 border border-blue-200/50 dark:border-blue-700/50">
                  <div className="text-2xl font-black text-blue-600 dark:text-blue-400 mb-1">
                    99.9%
                  </div>
                  <div className="text-sm text-blue-700 dark:text-blue-300 font-medium">
                    Uptime Garantisi
                  </div>
                </div>
                
                <div className="text-center p-4 rounded-xl bg-gradient-to-br from-purple-50 to-purple-100/50 dark:from-purple-900/30 dark:to-purple-800/20 border border-purple-200/50 dark:border-purple-700/50">
                  <div className="text-2xl font-black text-purple-600 dark:text-purple-400 mb-1">
                    24/7
                  </div>
                  <div className="text-sm text-purple-700 dark:text-purple-300 font-medium">
                    Teknik Destek
                  </div>
                </div>
                
                <div className="text-center p-4 rounded-xl bg-gradient-to-br from-green-50 to-green-100/50 dark:from-green-900/30 dark:to-green-800/20 border border-green-200/50 dark:border-green-700/50">
                  <div className="text-2xl font-black text-green-600 dark:text-green-400 mb-1">
                    SSL
                  </div>
                  <div className="text-sm text-green-700 dark:text-green-300 font-medium">
                    Şifreli Güvenlik
                  </div>
                </div>
                
                <div className="text-center p-4 rounded-xl bg-gradient-to-br from-orange-50 to-orange-100/50 dark:from-orange-900/30 dark:to-orange-800/20 border border-orange-200/50 dark:border-orange-700/50">
                  <div className="text-2xl font-black text-orange-600 dark:text-orange-400 mb-1">
                    API
                  </div>
                  <div className="text-sm text-orange-700 dark:text-orange-300 font-medium">
                    Açık Entegrasyon
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 