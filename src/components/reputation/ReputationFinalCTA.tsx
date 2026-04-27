'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Shield, CreditCard, Headphones, CheckCircle, Star, Trophy, Clock } from 'lucide-react'
import { useLanguage } from '@/lib/language-provider'

export default function ReputationFinalCTA() {
  const { t } = useLanguage()

  const features = [
    {
      icon: Shield,
      title: t('reputation.finalCta.feature1.title'),
      description: t('reputation.finalCta.feature1.description'),
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: CreditCard,
      title: t('reputation.finalCta.feature2.title'),
      description: t('reputation.finalCta.feature2.description'),
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Headphones,
      title: t('reputation.finalCta.feature3.title'),
      description: t('reputation.finalCta.feature3.description'),
      color: 'from-purple-500 to-pink-500'
    }
  ]

  const trustIndicators = [
    { icon: CheckCircle, text: t('reputation.finalCta.guarantee') },
    { icon: Shield, text: t('reputation.finalCta.ssl') },
    { icon: Clock, text: t('reputation.finalCta.uptime') },
    { icon: Trophy, text: t('reputation.finalCta.trusted') }
  ]

  const stats = [
    { value: '500+', label: 'Happy Customers' },
    { value: '99.9%', label: 'Uptime' },
    { value: '24/7', label: 'Support' },
    { value: '14', label: 'Days Free' }
  ]

  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-br from-slate-100 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-slate-900 text-gray-900 dark:text-white">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-100/30 via-purple-100/30 to-green-100/30 dark:from-blue-600/10 dark:via-purple-600/10 dark:to-green-600/10"></div>
        <div className="absolute top-20 left-20 w-96 h-96 bg-blue-200/30 dark:bg-blue-400/20 rounded-full mix-blend-normal dark:mix-blend-screen blur-xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-purple-200/30 dark:bg-purple-400/20 rounded-full mix-blend-normal dark:mix-blend-screen blur-xl animate-float-delayed"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-green-200/30 dark:bg-green-400/20 rounded-full mix-blend-normal dark:mix-blend-screen blur-xl animate-pulse-slow"></div>
        
        {/* Floating Elements */}
        <div className="absolute top-1/4 right-1/4 w-6 h-6 bg-blue-300/50 dark:bg-white/20 rounded-full animate-float"></div>
        <div className="absolute bottom-1/4 left-1/4 w-4 h-4 bg-purple-300/50 dark:bg-blue-300/30 rounded-full animate-float-delayed"></div>
        <div className="absolute top-3/4 right-1/3 w-8 h-8 bg-green-300/50 dark:bg-purple-300/20 rounded-full animate-pulse-slow"></div>
      </div>

      <div className="relative container mx-auto px-6">
        <div className="text-center max-w-5xl mx-auto">
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-200/50 via-purple-200/50 to-blue-200/50 dark:from-blue-600/20 dark:to-purple-600/20 rounded-full px-4 py-2 mb-6">
              <Star className="w-4 h-4 text-blue-600 dark:text-blue-300" />
              <span className="text-sm font-medium text-blue-600 dark:text-blue-300">Start Your Success Story</span>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              {t('reputation.finalCta.title')}
              <br />
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 dark:from-blue-300 dark:via-purple-300 dark:to-green-300 bg-clip-text text-transparent">
                {t('reputation.finalCta.titleHighlight')}
              </span>
            </h2>
            
            <p className="text-xl md:text-2xl mb-8 text-gray-700 dark:text-slate-300 leading-relaxed max-w-4xl mx-auto">
              {t('reputation.finalCta.subtitle')}
            </p>

            {/* Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="glass-card border border-gray-300 dark:border-white/20 p-4 rounded-2xl backdrop-blur-lg bg-gray-200/60 dark:bg-white/10 hover:bg-gray-200/80 dark:hover:bg-white/20 transition-all duration-300">
                    <div className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-slate-300">
                      {stat.label}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          {/* CTA Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="#"
                className="group relative inline-flex items-center px-8 py-4 rounded-2xl font-bold text-lg bg-gradient-to-r from-blue-500 to-green-500 text-white hover:from-blue-600 hover:to-green-600 transition-all duration-300 shadow-2xl shadow-blue-500/25 hover:shadow-blue-500/40"
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-400 to-green-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                <Shield className="mr-3 h-6 w-6" />
                {t('reputation.finalCta.trial')}
                <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/"
                className="group relative inline-flex items-center px-8 py-4 rounded-2xl font-bold text-lg border-2 border-gray-400 dark:border-white/30 text-gray-700 dark:text-white hover:bg-gray-200 dark:hover:bg-white hover:text-gray-900 dark:hover:text-slate-900 transition-all duration-300 backdrop-blur-lg"
              >
                {t('reputation.finalCta.home')}
              </Link>
            </motion.div>
          </motion.div>
          
          {/* Features Grid */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid md:grid-cols-3 gap-8 mb-16"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group text-center"
              >
                <div className="glass-card border border-gray-300 dark:border-white/20 p-8 rounded-3xl backdrop-blur-lg bg-gray-200/60 dark:bg-white/10 hover:bg-gray-200/80 dark:hover:bg-white/20 transition-all duration-500 hover:shadow-premium-lg">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-2xl`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-bold text-xl mb-4 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-700 dark:text-slate-300 leading-relaxed">
                    {feature.description}
                  </p>
                  
                  {/* Success indicator */}
                  <div className="mt-4 flex items-center justify-center gap-2">
                    <div className="w-2 h-2 bg-green-500 dark:bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-xs text-green-600 dark:text-green-300 font-medium">Active Feature</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Trust Indicators */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="pt-8 border-t border-gray-300 dark:border-white/20"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {trustIndicators.map((indicator, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  className="flex flex-col items-center text-center group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-gray-200/80 dark:bg-white/20 backdrop-blur-lg flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
                    <indicator.icon className="w-6 h-6 text-gray-700 dark:text-white" />
                  </div>
                  <p className="text-gray-700 dark:text-slate-300 text-sm font-medium leading-relaxed">
                    {indicator.text}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Final Encouragement */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-16 text-center"
          >
            <div className="glass-card border border-gray-300 dark:border-white/20 max-w-3xl mx-auto p-8 rounded-3xl backdrop-blur-lg bg-gradient-to-r from-gray-200/60 via-gray-200/40 to-gray-200/60 dark:from-white/10 dark:to-white/5">
              <div className="flex items-center justify-center gap-2 mb-4">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.8 + (i * 0.1) }}
                  >
                    <Star className="w-6 h-6 text-yellow-500 dark:text-yellow-400 fill-current" />
                  </motion.div>
                ))}
              </div>
              <p className="text-gray-900 dark:text-white text-lg font-medium">
                "The best reputation management decision we've ever made"
              </p>
              <p className="text-gray-600 dark:text-slate-400 text-sm mt-2">
                - 500+ satisfied customers
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
} 