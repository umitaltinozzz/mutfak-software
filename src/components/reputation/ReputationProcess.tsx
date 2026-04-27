'use client'

import { UserPlus, QrCode, MessageCircle, ArrowRight, Clock, Play, CheckCircle2 } from 'lucide-react'
import { useLanguage } from '@/lib/language-provider'

export default function ReputationProcess() {
  const { t } = useLanguage()

  const steps = [
    {
      icon: UserPlus,
      title: t('process.step1.title'),
      description: t('process.step1.description'),
      time: t('process.step1.time'),
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50 dark:bg-blue-900/20',
      stepNumber: '01'
    },
    {
      icon: QrCode,
      title: t('process.step2.title'),
      description: t('process.step2.description'),
      time: t('process.step2.time'),
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50 dark:bg-purple-900/20',
      stepNumber: '02'
    },
    {
      icon: MessageCircle,
      title: t('process.step3.title'),
      description: t('process.step3.description'),
      time: t('process.step3.time'),
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50 dark:bg-green-900/20',
      stepNumber: '03'
    }
  ]

  return (
    <section className="section bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-500/5 via-transparent to-purple-500/5 dark:from-blue-400/10 dark:to-purple-400/10" />
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl animate-float" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-purple-500/10 to-green-500/10 rounded-full blur-3xl animate-float-delayed" />

      <div className="container relative">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-100/80 to-purple-100/80 dark:from-blue-900/30 dark:to-purple-900/30 backdrop-blur-sm border border-blue-200/50 dark:border-blue-800/50 rounded-full text-blue-700 dark:text-blue-300 text-sm font-medium mb-6 animate-fade-in">
            <Play className="w-4 h-4" />
            Kolay Kurulum Süreci
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-gray-900 via-blue-700 to-purple-700 dark:from-white dark:via-blue-300 dark:to-purple-300 bg-clip-text text-transparent mb-6 leading-tight">
            {t('process.title')}
          </h2>
          
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
            {t('process.subtitle')}
          </p>
        </div>

        {/* Process Timeline */}
        <div className="relative">
          {/* Connection Line */}
          <div className="hidden md:block absolute top-20 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-300 via-purple-300 to-green-300 dark:from-blue-600 dark:via-purple-600 dark:to-green-600 z-0">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-green-500 opacity-50 animate-pulse" />
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative z-10">
            {steps.map((step, index) => {
              const IconComponent = step.icon
              return (
                <div key={index} className="group relative">
                  {/* Timeline connector dots for mobile */}
                  {index < steps.length - 1 && (
                    <div className="md:hidden absolute left-8 top-20 w-0.5 h-16 bg-gradient-to-b from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-500" />
                  )}

                  <div className={`glass-card p-8 text-center hover-lift transition-all duration-500 border-2 border-gray-200/50 dark:border-gray-700/50 hover:border-blue-300 dark:hover:border-blue-600 relative overflow-hidden`}>
                    {/* Background Gradient */}
                    <div className={`absolute inset-0 ${step.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                    
                    {/* Step Number Background */}
                    <div className="absolute -top-2 -right-2 w-16 h-16 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-full border-4 border-white dark:border-gray-800 shadow-lg flex items-center justify-center">
                      <span className="text-lg font-black text-gray-400 dark:text-gray-500">
                        {step.stepNumber}
                      </span>
                    </div>

                    <div className="relative">
                      {/* Main Icon */}
                      <div className={`w-20 h-20 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-premium-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 relative`}>
                        <IconComponent className="w-10 h-10 text-white" />
                        
                        {/* Success checkmark overlay */}
                        <div className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-0 group-hover:scale-100">
                          <CheckCircle2 className="w-5 h-5 text-white" />
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {step.title}
                      </h3>

                      {/* Description */}
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6 text-lg">
                        {step.description}
                      </p>

                      {/* Time Indicator */}
                      <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 rounded-full text-gray-700 dark:text-gray-300 font-semibold">
                        <Clock className="w-4 h-4" />
                        ⏱️ {step.time}
                      </div>

                      {/* Progress bar */}
                      <div className="mt-6 w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                        <div className={`h-full bg-gradient-to-r ${step.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-1000 origin-left`} />
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Total Time Summary */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-4 px-8 py-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 backdrop-blur-sm border border-blue-200/50 dark:border-blue-800/50 rounded-2xl">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
              <Clock className="w-5 h-5 text-white" />
            </div>
            <div className="text-left">
              <div className="text-sm text-gray-500 dark:text-gray-400 font-medium">Toplam Kurulum Süresi</div>
              <div className="text-2xl font-black bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                5 Dakika
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-20">
          <div className="glass-card max-w-4xl mx-auto p-10 border-2 border-blue-200/50 dark:border-blue-800/50 hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-500 hover:shadow-premium-lg relative overflow-hidden text-center">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-green-500/5" />
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(59,130,246,0.1),transparent_50%)]" />
            
            <div className="relative">
              <div className="inline-flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center shadow-premium-lg">
                  <Play className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                  {t('process.cta.title')}
                </h3>
              </div>
              
              <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                {t('process.cta.description')}
              </p>
              
              <button className="btn-premium hover-lift group text-lg px-10 py-4">
                <span className="relative z-10 flex items-center gap-2">
                  {t('process.cta.button')}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>

              {/* Feature highlights */}
              <div className="grid md:grid-cols-3 gap-6 mt-10">
                <div className="flex items-center justify-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  Teknik Bilgi Gerektirmez
                </div>
                <div className="flex items-center justify-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  Anında Kurulum
                </div>
                <div className="flex items-center justify-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  7/24 Canlı Destek
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 