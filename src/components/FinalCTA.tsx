'use client'

import Link from 'next/link'
import { ArrowRight, Phone, Check } from 'lucide-react'
import { motion } from 'framer-motion'
import { useLanguage } from '@/lib/language-provider'

export default function FinalCTA() {
  const { t } = useLanguage()

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  }

  const features = [
    { key: 'cta.feature1', icon: Check },
    { key: 'cta.feature2', icon: Check },
    { key: 'cta.feature3', icon: Check }
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

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={itemVariants}
          transition={{ duration: 0.6 }}
          className="text-center max-w-5xl mx-auto"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 dark:from-blue-300 dark:via-purple-300 dark:to-green-300 bg-clip-text text-transparent">
              {t('cta.title')}
            </span>
          </h2>
          <p className="text-xl md:text-2xl mb-8 text-gray-700 dark:text-slate-300 leading-relaxed max-w-4xl mx-auto">
            {t('cta.subtitle')}
          </p>
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={itemVariants}
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
                <Phone className="mr-3 h-6 w-6" />
                {t('cta.consultation')}
                <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/itibar-yonetimi"
                className="group relative inline-flex items-center px-8 py-4 rounded-2xl font-bold text-lg border-2 border-gray-400 dark:border-white/30 text-gray-700 dark:text-white hover:bg-gray-200 dark:hover:bg-white hover:text-gray-900 dark:hover:text-slate-900 transition-all duration-300 backdrop-blur-lg"
              >
                {t('cta.trial')}
              </Link>
            </motion.div>
          </motion.div>
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={itemVariants}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="pt-8 border-t border-gray-300 dark:border-white/20"
          >
            <div className="flex flex-wrap justify-center items-center gap-8 text-gray-600 dark:text-gray-300">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.key}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  className="flex items-center space-x-3"
                >
                  <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <Check className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm font-medium">{t(feature.key)}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Additional Floating Elements */}
        <div className="absolute top-20 left-10 w-4 h-4 bg-blue-300/40 dark:bg-white/20 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-6 h-6 bg-purple-300/40 dark:bg-white/20 rounded-full animate-pulse animation-delay-1000"></div>
        <div className="absolute top-1/2 left-20 w-3 h-3 bg-green-300/40 dark:bg-white/20 rounded-full animate-pulse animation-delay-2000"></div>
      </div>
    </section>
  )
} 