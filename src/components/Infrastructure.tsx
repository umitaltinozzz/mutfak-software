'use client'

import { Shield, Cloud, Zap, Cpu } from 'lucide-react'
import { motion } from 'framer-motion'
import { useLanguage } from '@/lib/language-provider'

export default function Infrastructure() {
  const { t } = useLanguage()

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  }

  const infrastructureFeatures = [
    {
      icon: Cloud,
      titleKey: 'infrastructure.cloud.title',
      descriptionKey: 'infrastructure.cloud.description',
      bgColor: 'bg-primary-100 dark:bg-primary-900/30',
      hoverColor: 'group-hover:bg-primary-200 dark:group-hover:bg-primary-800/50',
      iconColor: 'text-primary-600 dark:text-primary-400'
    },
    {
      icon: Shield,
      titleKey: 'infrastructure.security.title',
      descriptionKey: 'infrastructure.security.description',
      bgColor: 'bg-success-100 dark:bg-success-900/30',
      hoverColor: 'group-hover:bg-success-200 dark:group-hover:bg-success-800/50',
      iconColor: 'text-success-600 dark:text-success-400'
    },
    {
      icon: Cpu,
      titleKey: 'infrastructure.api.title',
      descriptionKey: 'infrastructure.api.description',
      bgColor: 'bg-accent-100 dark:bg-accent-900/30',
      hoverColor: 'group-hover:bg-accent-200 dark:group-hover:bg-accent-800/50',
      iconColor: 'text-accent-600 dark:text-accent-400'
    },
    {
      icon: Zap,
      titleKey: 'infrastructure.performance.title',
      descriptionKey: 'infrastructure.performance.description',
      bgColor: 'bg-secondary-100 dark:bg-secondary-900/30',
      hoverColor: 'group-hover:bg-secondary-200 dark:group-hover:bg-secondary-800/50',
      iconColor: 'text-secondary-600 dark:text-secondary-400'
    }
  ]

  return (
    <section className="relative py-24 bg-white dark:bg-gray-950 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-premium rounded-full mix-blend-multiply filter blur-3xl opacity-10 dark:opacity-5 animate-blob"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-electric rounded-full mix-blend-multiply filter blur-3xl opacity-10 dark:opacity-5 animate-blob animation-delay-4000"></div>
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
            <span className="text-gradient-electric">{t('infrastructure.title')}</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
            {t('infrastructure.subtitle')}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {infrastructureFeatures.map((feature, index) => (
            <motion.div
              key={feature.titleKey}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={itemVariants}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group text-center"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
                className={`w-20 h-20 ${feature.bgColor} ${feature.hoverColor} rounded-3xl flex items-center justify-center mx-auto mb-6 transition-all duration-300 shadow-lg hover:shadow-xl dark:shadow-primary-500/20`}
              >
                <feature.icon className={`w-10 h-10 ${feature.iconColor}`} />
              </motion.div>
              
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                {t(feature.titleKey)}
              </h3>
              
              <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                {t(feature.descriptionKey)}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Technology Stack Visual */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={itemVariants}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20"
        >
          <div className="glass-card p-8 rounded-3xl border border-white/20 dark:border-white/10 text-center">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Enterprise-Grade Technology Stack
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {['Next.js', 'Railway', 'PostgreSQL', 'TypeScript'].map((tech, index) => (
                <motion.div
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                  className="bg-gradient-electric bg-opacity-10 dark:bg-opacity-20 rounded-2xl p-4 border border-primary-200 dark:border-primary-800"
                >
                  <div className="text-lg font-semibold text-gray-900 dark:text-white">
                    {tech}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 