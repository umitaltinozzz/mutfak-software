'use client'

import { motion } from 'framer-motion'
import { Star, Quote, Users, TrendingUp, Award } from 'lucide-react'
import { useLanguage } from '@/lib/language-provider'

export default function ReputationTestimonials() {
  const { t } = useLanguage()

  const testimonials = [
    {
      name: t('reputation.testimonials.testimonial1.name'),
      role: t('reputation.testimonials.testimonial1.role'),
      company: t('reputation.testimonials.testimonial1.company'),
      rating: 5,
      content: t('reputation.testimonials.testimonial1.content'),
      initials: 'AY',
      bgColor: 'from-blue-500/20 to-cyan-500/20',
      ringColor: 'ring-blue-500/30',
      iconColor: 'text-blue-400'
    },
    {
      name: t('reputation.testimonials.testimonial2.name'),
      role: t('reputation.testimonials.testimonial2.role'),
      company: t('reputation.testimonials.testimonial2.company'),
      rating: 5,
      content: t('reputation.testimonials.testimonial2.content'),
      initials: 'EK',
      bgColor: 'from-purple-500/20 to-pink-500/20',
      ringColor: 'ring-purple-500/30',
      iconColor: 'text-purple-400'
    },
    {
      name: t('reputation.testimonials.testimonial3.name'),
      role: t('reputation.testimonials.testimonial3.role'),
      company: t('reputation.testimonials.testimonial3.company'),
      rating: 5,
      content: t('reputation.testimonials.testimonial3.content'),
      initials: 'MÖ',
      bgColor: 'from-green-500/20 to-emerald-500/20',
      ringColor: 'ring-green-500/30',
      iconColor: 'text-green-400'
    }
  ]

  const stats = [
    { icon: Users, value: '500+', label: 'Happy Customers' },
    { icon: TrendingUp, value: '40%', label: 'Avg Improvement' },
    { icon: Award, value: '4.8/5', label: 'Avg Rating' }
  ]

  return (
    <section className="relative py-24 overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-200/20 dark:bg-blue-600/10 rounded-full mix-blend-multiply blur-xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-purple-200/20 dark:bg-purple-600/10 rounded-full mix-blend-multiply blur-xl animate-float-delayed"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-green-200/20 dark:bg-green-600/10 rounded-full mix-blend-multiply blur-xl animate-pulse-slow"></div>
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
            <Quote className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">Customer Success Stories</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-slate-900 via-blue-800 to-purple-800 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent">
              {t('reputation.testimonials.title')}
            </span>
          </h2>
          
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed">
            {t('reputation.testimonials.subtitle')}
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-3 gap-6 max-w-2xl mx-auto mb-16"
        >
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="glass-card border border-white/20 dark:border-white/10 p-4 rounded-2xl hover:scale-105 transition-all duration-300">
                <stat.icon className="w-6 h-6 text-blue-600 dark:text-blue-400 mx-auto mb-2 group-hover:scale-110 transition-transform duration-300" />
                <div className="text-2xl font-bold text-slate-900 dark:text-white">{stat.value}</div>
                <div className="text-sm text-slate-600 dark:text-slate-400">{stat.label}</div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="group"
            >
              <div className={`glass-card border border-white/20 dark:border-white/10 p-8 rounded-3xl backdrop-blur-lg bg-gradient-to-br ${testimonial.bgColor} hover:shadow-premium-lg transition-all duration-500 hover-lift`}>
                {/* Quote Icon */}
                <div className="relative mb-6">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${testimonial.bgColor} ${testimonial.ringColor} ring-2 flex items-center justify-center`}>
                    <Quote className={`w-6 h-6 ${testimonial.iconColor}`} />
                  </div>
                  
                  {/* Floating sparkles */}
                  <div className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-400 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 animate-ping"></div>
                  <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 delay-100 animate-ping"></div>
                </div>

                {/* Rating Stars */}
                <div className="flex items-center gap-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: 0.5 + (i * 0.1) }}
                    >
                      <Star className="w-5 h-5 text-yellow-400 fill-current drop-shadow-lg group-hover:scale-110 transition-transform duration-300" />
                    </motion.div>
                  ))}
                  <div className="ml-2 px-2 py-1 rounded-full bg-yellow-400/20 dark:bg-yellow-500/20">
                    <span className="text-xs font-medium text-yellow-700 dark:text-yellow-300">5.0</span>
                  </div>
                </div>
                
                {/* Testimonial Content */}
                <blockquote className="text-lg text-slate-700 dark:text-slate-200 mb-8 leading-relaxed font-medium italic">
                  "{testimonial.content}"
                </blockquote>
                
                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${testimonial.bgColor} ${testimonial.ringColor} ring-2 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <span className={`font-bold text-sm ${testimonial.iconColor}`}>
                      {testimonial.initials}
                    </span>
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {testimonial.role}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-500 font-medium">
                      {testimonial.company}
                    </p>
                  </div>
                </div>

                {/* Success indicator */}
                <div className="mt-6 flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-xs text-green-600 dark:text-green-400 font-medium">Verified Customer</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <div className="glass-card border border-white/20 dark:border-white/10 max-w-4xl mx-auto p-8 rounded-3xl backdrop-blur-lg bg-gradient-to-r from-blue-50/50 via-purple-50/50 to-green-50/50 dark:from-blue-900/20 dark:via-purple-900/20 dark:to-green-900/20">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              Join Our Success Stories
            </h3>
            <p className="text-slate-600 dark:text-slate-300 mb-6">
              Start your free trial today and see the results our customers are talking about.
            </p>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-premium px-8 py-4 rounded-xl font-semibold"
            >
              Start Free Trial
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  )
} 