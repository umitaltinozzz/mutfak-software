'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ChevronUp, HelpCircle, MessageCircle, Phone, Mail, Shield, Zap } from 'lucide-react'
import { useLanguage } from '@/lib/language-provider'

export default function ReputationFAQ() {
  const { t } = useLanguage()
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const faqs = [
    {
      icon: Zap,
      question: t('reputation.faq.question1'),
      answer: t('reputation.faq.answer1'),
      category: 'Setup'
    },
    {
      icon: Shield,
      question: t('reputation.faq.question2'),
      answer: t('reputation.faq.answer2'),
      category: 'Security'
    },
    {
      icon: MessageCircle,
      question: t('reputation.faq.question3'),
      answer: t('reputation.faq.answer3'),
      category: 'Billing'
    },
    {
      icon: HelpCircle,
      question: t('reputation.faq.question4'),
      answer: t('reputation.faq.answer4'),
      category: 'Features'
    },
    {
      icon: Phone,
      question: t('reputation.faq.question5'),
      answer: t('reputation.faq.answer5'),
      category: 'Usage'
    },
    {
      icon: Mail,
      question: t('reputation.faq.question6'),
      answer: t('reputation.faq.answer6'),
      category: 'Support'
    }
  ]

  const supportChannels = [
    { icon: MessageCircle, label: 'Live Chat', description: '24/7 Available' },
    { icon: Phone, label: 'Phone Support', description: '+90 850 xxx xxxx' },
    { icon: Mail, label: 'Email Support', description: 'support@mutfakyazilim.com' }
  ]

  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-96 h-96 bg-blue-200/20 dark:bg-blue-600/10 rounded-full mix-blend-multiply blur-xl animate-float"></div>
        <div className="absolute bottom-20 left-20 w-72 h-72 bg-purple-200/20 dark:bg-purple-600/10 rounded-full mix-blend-multiply blur-xl animate-float-delayed"></div>
        <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-green-200/20 dark:bg-green-600/10 rounded-full mix-blend-multiply blur-xl animate-pulse-slow"></div>
      </div>

      <div className="relative container mx-auto px-6">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600/10 to-purple-600/10 dark:from-blue-400/20 dark:to-purple-400/20 rounded-full px-4 py-2 mb-4">
            <HelpCircle className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">FAQ</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-slate-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent">
              {t('reputation.faq.title')}
            </span>
          </h2>
          
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
            {t('reputation.faq.subtitle')}
          </p>
        </motion.div>

        {/* FAQ Grid */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <div className="glass-card border border-white/20 dark:border-white/10 rounded-2xl backdrop-blur-lg bg-white/50 dark:bg-slate-800/50 overflow-hidden hover:shadow-premium-lg transition-all duration-300">
                  <motion.button
                    className="w-full px-6 py-6 text-left flex items-center justify-between hover:bg-white/30 dark:hover:bg-slate-700/30 transition-all duration-300"
                    onClick={() => setOpenIndex(openIndex === index ? null : index)}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 dark:from-blue-400/30 dark:to-purple-400/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <faq.icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs px-2 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-medium">
                            {faq.category}
                          </span>
                        </div>
                        <span className="font-bold text-slate-900 dark:text-white text-lg group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                          {faq.question}
                        </span>
                      </div>
                    </div>
                    
                    <motion.div
                      animate={{ rotate: openIndex === index ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex-shrink-0 ml-4"
                    >
                      <ChevronDown className="w-6 h-6 text-slate-600 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300" />
                    </motion.div>
                  </motion.button>
                  
                  <AnimatePresence>
                    {openIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 border-t border-white/20 dark:border-white/10">
                          <motion.div
                            initial={{ y: -10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -10, opacity: 0 }}
                            transition={{ duration: 0.2, delay: 0.1 }}
                            className="pt-6"
                          >
                            <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg">
                              {faq.answer}
                            </p>
                            
                            {/* Success indicator */}
                            <div className="mt-4 flex items-center gap-2">
                              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                              <span className="text-xs text-green-600 dark:text-green-400 font-medium">
                                Helpful Answer
                              </span>
                            </div>
                          </motion.div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Support Channels */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-5xl mx-auto"
        >
          <div className="glass-card border border-white/20 dark:border-white/10 rounded-3xl backdrop-blur-lg bg-gradient-to-r from-blue-50/50 via-purple-50/50 to-green-50/50 dark:from-blue-900/20 dark:via-purple-900/20 dark:to-green-900/20 p-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                {t('reputation.faq.contact.title')}
              </h3>
              <p className="text-slate-600 dark:text-slate-300">
                Multiple ways to get the help you need
              </p>
            </div>

            {/* Support Options */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {supportChannels.map((channel, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="text-center group"
                >
                  <div className="glass-card border border-white/20 dark:border-white/10 p-6 rounded-2xl hover:shadow-premium-lg transition-all duration-300">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 dark:from-blue-400/30 dark:to-purple-400/30 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                      <channel.icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h4 className="font-bold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                      {channel.label}
                    </h4>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {channel.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="text-center">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-premium px-8 py-4 rounded-xl font-semibold"
              >
                {t('reputation.faq.contact.button')}
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 