'use client'

import { Star } from 'lucide-react'
import { motion } from 'framer-motion'
import { useLanguage } from '@/lib/language-provider'

export default function BrandTestimonials() {
  const { t } = useLanguage()

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  }

  const partners = [
    { nameKey: 'testimonials.partner1', initials: 'RG' },
    { nameKey: 'testimonials.partner2', initials: 'OZ' },
    { nameKey: 'testimonials.partner3', initials: 'KF' }
  ]

  return (
    <section className="relative py-24 bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-gray-900 dark:to-gray-800 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 -left-32 w-96 h-96 bg-gradient-fire rounded-full mix-blend-multiply filter blur-3xl opacity-10 dark:opacity-5 animate-blob"></div>
        <div className="absolute bottom-1/3 -right-32 w-96 h-96 bg-gradient-premium rounded-full mix-blend-multiply filter blur-3xl opacity-10 dark:opacity-5 animate-blob animation-delay-2000"></div>
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
            <span className="text-gradient-electric">{t('testimonials.title')}</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
            {t('testimonials.subtitle')}
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={itemVariants}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <div className="glass-card p-12 rounded-3xl border border-white/20 dark:border-white/10 text-center">
            {/* Stars */}
            <div className="flex justify-center mb-8">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.4 + i * 0.1 }}
                >
                  <Star className="w-8 h-8 text-yellow-400 fill-current mx-1" />
                </motion.div>
              ))}
            </div>
            
            {/* Quote */}
            <motion.blockquote
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-10 italic leading-relaxed font-medium"
            >
              {t('testimonials.quote')}
            </motion.blockquote>
            
            {/* Author */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={itemVariants}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex items-center justify-center space-x-6"
            >
              <div className="w-20 h-20 bg-gradient-electric rounded-full flex items-center justify-center shadow-glow">
                <span className="text-white font-bold text-xl">SO</span>
              </div>
              <div className="text-left">
                <p className="font-bold text-xl text-gray-900 dark:text-white">
                  {t('testimonials.author.name')}
                </p>
                <p className="text-gray-600 dark:text-gray-400 text-lg">
                  {t('testimonials.author.title')}
                </p>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Partners */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={itemVariants}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="mt-16 text-center"
        >
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-80">
            <div className="text-gray-600 dark:text-gray-400 font-semibold text-lg">
              {t('testimonials.partners')}
            </div>
            
            {partners.map((partner, index) => (
              <motion.div
                key={partner.nameKey}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
                className="flex items-center space-x-3"
              >
                <div className="w-10 h-10 bg-gradient-electric bg-opacity-20 dark:bg-opacity-30 rounded-xl flex items-center justify-center">
                  <span className="text-gray-700 dark:text-gray-300 font-semibold text-sm">
                    {partner.initials}
                  </span>
                </div>
                <span className="text-gray-600 dark:text-gray-400 font-medium">
                  {t(partner.nameKey)}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Additional Social Proof */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={itemVariants}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
        >
          {[
            { number: '98%', label: 'Müşteri Memnuniyeti' },
            { number: '50+', label: 'Aktif İş Ortağı' },
            { number: '24/7', label: 'Destek Hizmeti' }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 1.6 + index * 0.1 }}
              className="glass-card p-6 rounded-2xl border border-white/20 dark:border-white/10 text-center"
            >
              <div className="text-3xl font-bold text-gradient-electric mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600 dark:text-gray-400 font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
} 