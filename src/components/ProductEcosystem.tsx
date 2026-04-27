'use client'

import Link from 'next/link'
import { Star, QrCode, Settings, ArrowRight, Clock } from 'lucide-react'
import { motion } from 'framer-motion'
import { useLanguage } from '@/lib/language-provider'

export default function ProductEcosystem() {
  const { t } = useLanguage()

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  }

  const products = [
    {
      icon: Star,
      titleKey: 'ecosystem.reputation.title',
      statusKey: 'ecosystem.reputation.status',
      descriptionKey: 'ecosystem.reputation.description',
      ctaKey: 'ecosystem.reputation.cta',
      href: '/itibar-yonetimi',
      isActive: true,
      bgColor: 'bg-primary-100 dark:bg-primary-900/30',
      iconColor: 'text-primary-600 dark:text-primary-400',
      statusColor: 'text-success-600 dark:text-success-400',
      buttonStyle: 'btn-primary'
    },
    {
      icon: QrCode,
      titleKey: 'ecosystem.qr.title',
      statusKey: 'ecosystem.qr.status',
      badgeKey: 'ecosystem.qr.badge',
      descriptionKey: 'ecosystem.qr.description',
      ctaKey: 'ecosystem.qr.cta',
      href: '#',
      isActive: false,
      bgColor: 'bg-accent-100 dark:bg-accent-900/30',
      iconColor: 'text-accent-600 dark:text-accent-400',
      statusColor: 'text-accent-600 dark:text-accent-400',
      buttonStyle: 'btn-secondary',
      badgeColor: 'bg-accent-100 text-accent-800 dark:bg-accent-900/50 dark:text-accent-300'
    },
    {
      icon: Settings,
      titleKey: 'ecosystem.future.title',
      statusKey: 'ecosystem.future.status',
      badgeKey: 'ecosystem.future.badge',
      descriptionKey: 'ecosystem.future.description',
      ctaKey: 'ecosystem.future.cta',
      href: '#',
      isActive: false,
      bgColor: 'bg-secondary-100 dark:bg-secondary-900/30',
      iconColor: 'text-secondary-600 dark:text-secondary-400',
      statusColor: 'text-secondary-600 dark:text-secondary-400',
      buttonStyle: 'btn-secondary',
      badgeColor: 'bg-secondary-100 text-secondary-800 dark:bg-secondary-900/50 dark:text-secondary-300'
    }
  ]

  return (
    <section id="product-ecosystem" className="relative py-24 bg-gradient-to-br from-secondary-50 to-primary-50 dark:from-gray-900 dark:to-gray-800 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 -left-40 w-96 h-96 bg-gradient-premium rounded-full mix-blend-multiply filter blur-3xl opacity-10 dark:opacity-5 animate-blob"></div>
        <div className="absolute bottom-1/3 -right-40 w-96 h-96 bg-gradient-electric rounded-full mix-blend-multiply filter blur-3xl opacity-10 dark:opacity-5 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={itemVariants}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-gray-900 dark:text-white mb-6">
            <span className="text-gradient-electric">{t('ecosystem.title')}</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
            {t('ecosystem.subtitle')}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.titleKey}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={itemVariants}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="group relative"
            >
              <div className="glass-card p-8 rounded-3xl border border-white/20 dark:border-white/10 hover:border-white/30 dark:hover:border-white/20 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 h-full">
                {/* Badge */}
                {product.badgeKey && (
                  <div className="absolute top-6 right-6">
                    <span className={`${product.badgeColor} text-xs font-semibold px-3 py-1.5 rounded-full`}>
                      {t(product.badgeKey)}
                    </span>
                  </div>
                )}
                
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <motion.div 
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className={`w-12 h-12 ${product.bgColor} rounded-2xl flex items-center justify-center shadow-lg`}
                    >
                      <product.icon className={`w-6 h-6 ${product.iconColor}`} />
                    </motion.div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        {t(product.titleKey)}
                      </h3>
                      <span className={`text-sm font-medium flex items-center ${product.statusColor}`}>
                        {!product.isActive && <Clock className="inline w-3 h-3 mr-1" />}
                        {t(product.statusKey)}
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Description */}
                <p className="text-gray-600 dark:text-gray-300 mb-8 leading-relaxed flex-grow">
                  {t(product.descriptionKey)}
                </p>
                
                {/* CTA Button */}
                {product.isActive ? (
                  <Link
                    href={product.href}
                    className={`btn ${product.buttonStyle} w-full group flex items-center justify-center`}
                  >
                    {t(product.ctaKey)}
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                ) : (
                  <button 
                    className={`btn ${product.buttonStyle} w-full cursor-not-allowed opacity-75`}
                    disabled
                  >
                    {t(product.ctaKey)}
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Integration Visual */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={itemVariants}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-20 text-center"
        >
          <div className="relative">
            {/* Connection Lines */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full max-w-2xl h-0.5 bg-gradient-to-r from-transparent via-primary-300 dark:via-primary-600 to-transparent"></div>
            </div>
            
            {/* Center Hub */}
            <div className="relative inline-flex items-center justify-center">
              <div className="w-16 h-16 bg-gradient-electric rounded-full flex items-center justify-center shadow-glow-lg animate-pulse">
                <Settings className="w-8 h-8 text-white" />
              </div>
            </div>
          </div>
          
          <p className="mt-6 text-lg text-gray-600 dark:text-gray-300 font-medium">
            Tek panelden tüm çözümlerinizi yönetin
          </p>
        </motion.div>
      </div>
    </section>
  )
} 