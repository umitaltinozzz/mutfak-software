'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  Sparkles, Mail, Phone, MapPin, ArrowRight, Send, 
  Twitter, Linkedin, Instagram, Youtube, Facebook,
  Shield, Award, CheckCircle, Zap, Globe, Users,
  Heart, Star, Trophy, Lock, Eye, TrendingUp
} from 'lucide-react'
import { useLanguage } from '@/lib/language-provider'
import { useTheme } from '@/lib/theme-provider'

const Footer = () => {
  const { t } = useLanguage()
  const { theme } = useTheme()
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault()
    // Newsletter subscription logic
    setIsSubscribed(true)
    setEmail('')
    
    // Reset after 3 seconds
    setTimeout(() => setIsSubscribed(false), 3000)
  }

  const products = [
    { name: 'İtibar Yönetimi', nameKey: 'İtibar Yönetimi', href: '/itibar-yonetimi', badge: 'Popüler' },
    { name: 'Akıllı Analitik', nameKey: 'Akıllı Analitik', href: '/analitik', badge: 'Yeni' },
    { name: 'QR Menü Pro', nameKey: 'QR Menü Pro', href: '/qr-menu', badge: 'Yakında' },
    { name: 'AI Asistan', nameKey: 'AI Asistan', href: '/ai-asistan', badge: 'Beta' },
    { name: 'Müşteri Analizi', nameKey: 'Müşteri Analizi', href: '/musteri-analizi' },
    { name: 'Otomatik Yanıtlama', nameKey: 'Otomatik Yanıtlama', href: '/otomatik-yanitlama' }
  ]

  const solutions = [
    { name: 'Restoran Çözümleri', nameKey: 'Restoran Çözümleri', href: '/cozumler/restoran' },
    { name: 'Otel Yönetimi', nameKey: 'Otel Yönetimi', href: '/cozumler/otel' },
    { name: 'Perakende', nameKey: 'Perakende', href: '/cozumler/perakende' },
    { name: 'Sağlık Sektörü', nameKey: 'Sağlık Sektörü', href: '/cozumler/saglik' },
    { name: 'E-ticaret', nameKey: 'E-ticaret', href: '/cozumler/e-ticaret' },
    { name: 'Hizmet Sektörü', nameKey: 'Hizmet Sektörü', href: '/cozumler/hizmet' }
  ]

  const company = [
    { name: 'Hakkımızda', nameKey: 'Hakkımızda', href: '/hakkimizda' },
    { name: 'Vizyon & Misyon', nameKey: 'Vizyon & Misyon', href: '/vizyon-misyon' },
    { name: 'Takımımız', nameKey: 'Takımımız', href: '/takim' },
    { name: 'Kariyer', nameKey: 'Kariyer', href: '/kariyer' },
    { name: 'Basında Biz', nameKey: 'Basında Biz', href: '/basin' },
    { name: 'İletişim', nameKey: 'İletişim', href: '/iletisim' }
  ]

  const resources = [
    { name: 'Destek Merkezi', nameKey: 'Destek Merkezi', href: '/destek' },
    { name: 'API Dokümantasyonu', nameKey: 'API Dokümantasyonu', href: '/api-docs' },
    { name: 'Geliştirici Rehberi', nameKey: 'Geliştirici Rehberi', href: '/dev-guide' },
    { name: 'Başarı Hikayeleri', nameKey: 'Başarı Hikayeleri', href: '/basari-hikayeleri' },
    { name: 'Blog', nameKey: 'Blog', href: '/blog' },
    { name: 'Webinarlar', nameKey: 'Webinarlar', href: '/webinarlar' }
  ]

  const legal = [
    { name: t('footer.terms'), nameKey: 'footer.terms', href: '/kullanim-kosullari' },
    { name: t('footer.privacy'), nameKey: 'footer.privacy', href: '/gizlilik-politikasi' },
    { name: 'KVKK', nameKey: 'KVKK', href: '/kvkk' },
    { name: t('footer.cookies'), nameKey: 'footer.cookies', href: '/cerez-politikasi' },
    { name: 'SLA', nameKey: 'SLA', href: '/sla' },
    { name: 'Güvenlik', nameKey: 'Güvenlik', href: '/guvenlik' }
  ]

  const socialMedia = [
    { icon: Twitter, href: 'https://twitter.com/mutfakyazilim', label: 'Twitter', color: 'hover:text-blue-400' },
    { icon: Linkedin, href: 'https://linkedin.com/company/mutfakyazilim', label: 'LinkedIn', color: 'hover:text-blue-600' },
    { icon: Instagram, href: 'https://instagram.com/mutfakyazilim', label: 'Instagram', color: 'hover:text-pink-500' },
    { icon: Youtube, href: 'https://youtube.com/mutfakyazilim', label: 'YouTube', color: 'hover:text-red-500' },
    { icon: Facebook, href: 'https://facebook.com/mutfakyazilim', label: 'Facebook', color: 'hover:text-blue-700' }
  ]

  const trustBadges = [
    { icon: Shield, label: 'ISO 27001', subtitle: t('footer.trust.iso') },
    { icon: Award, label: 'SOC 2 Type II', subtitle: t('footer.trust.soc') },
    { icon: CheckCircle, label: 'GDPR Uyumlu', subtitle: t('footer.trust.gdpr') },
    { icon: Trophy, label: '99.9% Uptime', subtitle: t('footer.trust.uptime') },
    { icon: Lock, label: 'SSL Şifreli', subtitle: t('footer.trust.ssl') },
    { icon: Eye, label: 'Şeffaf Raporlama', subtitle: t('footer.trust.transparent') }
  ]

  const stats = [
    { value: '50K+', label: t('footer.stats.businesses'), icon: Users },
    { value: '2.5M+', label: t('footer.stats.transactions'), icon: TrendingUp },
    { value: '99.9%', label: t('footer.stats.uptime'), icon: Shield },
    { value: '4.9/5', label: t('footer.stats.satisfaction'), icon: Star }
  ]

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <footer id="footer" className="relative bg-gradient-to-br from-gray-100 via-gray-200 to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 text-gray-900 dark:text-white overflow-hidden">
      {/* Premium Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-mesh opacity-10 dark:opacity-5"></div>
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-electric rounded-full mix-blend-multiply filter blur-3xl opacity-10 dark:opacity-5 animate-blob"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-fire rounded-full mix-blend-multiply filter blur-3xl opacity-10 dark:opacity-5 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-gradient-premium rounded-full mix-blend-multiply filter blur-3xl opacity-10 dark:opacity-5 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            
            {/* Company Info & Newsletter */}
            <div className="lg:col-span-2">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={itemVariants}
                transition={{ duration: 0.6 }}
              >
                {/* Logo & Brand */}
                <div className="flex items-center space-x-4 mb-8">
                  <div className="relative">
                    <motion.div 
                      className="w-16 h-16 bg-gradient-electric rounded-3xl flex items-center justify-center shadow-glow-lg"
                      whileHover={{ rotate: 5, scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Sparkles className="w-8 h-8 text-white" />
                    </motion.div>
                    <motion.div 
                      className="absolute -top-2 -right-2 w-5 h-5 bg-accent-500 rounded-full"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </div>
                  <div>
                    <h3 className="text-3xl font-display font-bold text-gradient-electric">
                      Mutfak Yazılım
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 font-medium">
                      Enterprise SaaS Platform
                    </p>
                  </div>
                </div>

                <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-8">
                  {t('footer.brand.description')}
                </p>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-6 mb-12">
                  {stats.map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      variants={itemVariants}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="glass-card p-4 rounded-2xl border border-white/10 hover:border-white/20 dark:border-white/5 dark:hover:border-white/10 transition-colors group"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-electric rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                          <stat.icon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <div className="text-2xl font-bold text-gradient-electric">{stat.value}</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Newsletter */}
                <div className="glass-card p-8 rounded-3xl border border-white/20 dark:border-white/10">
                  <div className="flex items-center space-x-3 mb-4">
                    <Mail className="w-6 h-6 text-primary-400" />
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white">{t('footer.newsletter.title')}</h4>
                  </div>
                                      <p className="text-gray-600 dark:text-gray-400 mb-6">
                      {t('footer.newsletter.desc')}
                    </p>
                  
                  <form onSubmit={handleNewsletter} className="space-y-4">
                    <div className="relative">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder={t('footer.newsletter.placeholder')}
                        required
                        className="w-full px-6 py-4 bg-gray-200/80 dark:bg-white/10 border border-gray-300 dark:border-white/20 rounded-2xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-primary-400 focus:bg-gray-200 dark:focus:bg-white/20 transition-all"
                      />
                      <motion.button
                        type="submit"
                        disabled={isSubscribed}
                        className="absolute right-2 top-2 h-12 px-6 bg-gradient-electric text-white rounded-xl font-semibold shadow-glow hover:shadow-glow-lg disabled:opacity-70 disabled:cursor-not-allowed transition-all"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {isSubscribed ? (
                          <CheckCircle className="w-5 h-5" />
                        ) : (
                          <Send className="w-5 h-5" />
                        )}
                      </motion.button>
                    </div>
                    
                    {isSubscribed && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center space-x-2 text-green-400"
                      >
                        <CheckCircle className="w-4 h-4" />
                        <span className="text-sm">{t('footer.newsletter.success')}</span>
                      </motion.div>
                    )}
                  </form>
                </div>
              </motion.div>
            </div>

            {/* Products Column */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={itemVariants}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h3 className="text-xl font-bold mb-8 text-gradient-electric">{t('footer.product')}</h3>
              <ul className="space-y-4">
                {products.map((product, index) => (
                  <motion.li
                    key={product.name}
                    variants={itemVariants}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <Link 
                      href={product.href}
                      className="group flex items-center justify-between text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                    >
                      <span className="group-hover:translate-x-1 transition-transform">{product.name}</span>
                      {product.badge && (
                        <span className="text-xs bg-primary-500/20 text-primary-400 px-2 py-1 rounded-full border border-primary-500/30">
                          {product.badge}
                        </span>
                      )}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Solutions Column */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={itemVariants}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3 className="text-xl font-bold mb-8 text-gradient-electric">{t('footer.solutions')}</h3>
              <ul className="space-y-4">
                {solutions.map((solution, index) => (
                  <motion.li
                    key={solution.name}
                    variants={itemVariants}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <Link 
                      href={solution.href}
                      className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:translate-x-1 transition-all block"
                    >
                      {solution.name}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Company & Resources Column */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={itemVariants}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="space-y-8"
            >
              {/* Company */}
              <div>
                <h3 className="text-xl font-bold mb-6 text-gradient-electric">{t('footer.company')}</h3>
                <ul className="space-y-3">
                  {company.slice(0, 4).map((item, index) => (
                    <motion.li
                      key={item.name}
                      variants={itemVariants}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      <Link 
                        href={item.href}
                        className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:translate-x-1 transition-all block"
                      >
                        {item.name}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* Resources */}
              <div>
                <h3 className="text-xl font-bold mb-6 text-gradient-electric">{t('footer.resources')}</h3>
                <ul className="space-y-3">
                  {resources.slice(0, 4).map((item, index) => (
                    <motion.li
                      key={item.name}
                      variants={itemVariants}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      <Link 
                        href={item.href}
                        className="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:translate-x-1 transition-all block"
                      >
                        {item.name}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>

          {/* Trust Badges */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={itemVariants}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-16 pt-12 border-t border-gray-300 dark:border-white/10"
          >
            <h3 className="text-xl font-bold text-center mb-8 text-gradient-electric">Güvenlik & Uyumluluk</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {trustBadges.map((badge, index) => (
                <motion.div
                  key={badge.label}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={itemVariants}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="glass-card p-4 rounded-xl text-center border border-white/10 hover:border-white/20 dark:border-white/5 dark:hover:border-white/10 transition-colors group"
                >
                  <div className="w-12 h-12 bg-gradient-electric rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                    <badge.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-sm font-semibold mb-1">{badge.label}</div>
                  <div className="text-xs text-gray-400">{badge.subtitle}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={itemVariants}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-12 pt-8 border-t border-gray-300 dark:border-white/10"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start space-x-3">
                <Phone className="w-5 h-5 text-primary-500 dark:text-primary-400" />
                <span className="text-gray-700 dark:text-gray-300">{t('footer.contact.phone')}</span>
              </div>
              <div className="flex items-center justify-center md:justify-start space-x-3">
                <Mail className="w-5 h-5 text-primary-500 dark:text-primary-400" />
                <span className="text-gray-700 dark:text-gray-300">{t('footer.contact.email')}</span>
              </div>
              <div className="flex items-center justify-center md:justify-start space-x-3">
                <MapPin className="w-5 h-5 text-primary-500 dark:text-primary-400" />
                <span className="text-gray-700 dark:text-gray-300">{t('footer.contact.address')}</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-300 dark:border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              
              {/* Copyright */}
              <div className="text-gray-600 dark:text-gray-400 text-center md:text-left">
                {t('footer.rights')}
              </div>

              {/* Social Media */}
              <div className="flex items-center space-x-2">
                <span className="text-gray-600 dark:text-gray-400 mr-4">{t('footer.follow')}</span>
                {socialMedia.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-10 h-10 bg-gray-200 dark:bg-white/10 rounded-xl flex items-center justify-center text-gray-600 dark:text-gray-400 ${social.color} border border-gray-300 dark:border-white/10 hover:border-gray-400 dark:hover:border-white/20 transition-all`}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>

              {/* Legal Links */}
              <div className="flex items-center space-x-6 text-sm">
                {legal.slice(0, 3).map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer 