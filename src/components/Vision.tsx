'use client'

import { Settings, Heart, TrendingUp } from 'lucide-react'
import { motion } from 'framer-motion'
import { useLanguage } from '@/lib/language-provider'

export default function Vision() {
  const { t } = useLanguage()

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  }

  const visionItems = [
    {
      icon: Settings,
      titleKey: 'vision.operational.title',
      descriptionKey: 'vision.operational.description',
      bgColor: 'bg-primary-100 dark:bg-primary-900/30',
      hoverColor: 'group-hover:bg-primary-200 dark:group-hover:bg-primary-800/50',
      iconColor: 'text-primary-600 dark:text-primary-400'
    },
    {
      icon: Heart,
      titleKey: 'vision.experience.title',
      descriptionKey: 'vision.experience.description',
      bgColor: 'bg-accent-100 dark:bg-accent-900/30',
      hoverColor: 'group-hover:bg-accent-200 dark:group-hover:bg-accent-800/50',
      iconColor: 'text-accent-600 dark:text-accent-400'
    },
    {
      icon: TrendingUp,
      titleKey: 'vision.growth.title',
      descriptionKey: 'vision.growth.description',
      bgColor: 'bg-success-100 dark:bg-success-900/30',
      hoverColor: 'group-hover:bg-success-200 dark:group-hover:bg-success-800/50',
      iconColor: 'text-success-600 dark:text-success-400'
    }
  ]

  return (
    <section className="relative py-24 bg-gray-50 dark:bg-gray-900 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-gradient-electric rounded-full mix-blend-multiply filter blur-3xl opacity-10 dark:opacity-5 animate-blob"></div>
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-gradient-fire rounded-full mix-blend-multiply filter blur-3xl opacity-10 dark:opacity-5 animate-blob animation-delay-2000"></div>
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
            <span className="text-gradient-electric">{t('vision.title')}</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
            {t('vision.subtitle')}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {visionItems.map((item, index) => (
            <motion.div
              key={item.titleKey}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={itemVariants}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="group text-center"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
                className={`w-20 h-20 ${item.bgColor} ${item.hoverColor} rounded-3xl flex items-center justify-center mx-auto mb-6 transition-all duration-300 shadow-lg hover:shadow-xl dark:shadow-primary-500/20`}
              >
                <item.icon className={`w-10 h-10 ${item.iconColor}`} />
              </motion.div>
              
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                {t(item.titleKey)}
              </h3>
              
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {t(item.descriptionKey)}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Additional Visual Elements */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={itemVariants}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-20 text-center"
        >
          <div className="inline-flex items-center space-x-4 glass-card px-8 py-4 rounded-2xl border border-white/20 dark:border-white/10">
            <div className="w-8 h-8 bg-gradient-electric rounded-full flex items-center justify-center">
              <Heart className="w-4 h-4 text-white animate-pulse" />
            </div>
            <span className="text-gray-700 dark:text-gray-300 font-medium">
              Made with ❤️ in Turkey
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 