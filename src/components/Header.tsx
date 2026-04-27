'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Menu, X, ChevronDown, Sparkles, Zap, Globe, Users, MessageCircle, Calendar,
  BarChart3, Shield, Award, Brain, Rocket, Star, ArrowRight, Phone, Mail,
  Sun, Moon, Palette, Languages
} from 'lucide-react'
import { useTheme } from '@/lib/theme-provider'
import { useLanguage } from '@/lib/language-provider'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isProductsOpen, setIsProductsOpen] = useState(false)
  const [isResourcesOpen, setIsResourcesOpen] = useState(false)
  const [isCompanyOpen, setIsCompanyOpen] = useState(false)
  const [isThemeOpen, setIsThemeOpen] = useState(false)
  const [isLanguageOpen, setIsLanguageOpen] = useState(false)
  const pathname = usePathname()
  const { theme, actualTheme, setTheme, toggleTheme } = useTheme()
  const { language, setLanguage, t } = useLanguage()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isActive = (path: string) => pathname === path

  const products = [
    {
      icon: MessageCircle,
      name: 'İtibar Yönetimi',
      description: 'AI destekli yorum analizi ve otomatik yanıtlama',
      href: '/itibar-yonetimi',
      color: 'text-primary-500',
      bgColor: 'bg-primary-50',
      badge: 'Popüler'
    },
    {
      icon: BarChart3,
      name: 'Akıllı Analitik',
      description: 'Gerçek zamanlı performans dashboard\'u',
      href: '/analitik',
      color: 'text-accent-500',
      bgColor: 'bg-accent-50',
      badge: 'Yeni'
    },
    {
      icon: Globe,
      name: 'QR Menü Pro',
      description: 'Profesyonel dijital menü sistemi',
      href: '/qr-menu',
      color: 'text-secondary-500',
      bgColor: 'bg-secondary-50',
      badge: 'Yakında'
    },
    {
      icon: Brain,
      name: 'AI Asistan',
      description: 'Yapay zeka destekli müşteri hizmetleri',
      href: '/ai-asistan',
      color: 'text-purple-500',
      bgColor: 'bg-purple-50',
      badge: 'Beta'
    }
  ]

  const resources = [
    {
      icon: Calendar,
      name: 'Demo Rezervasyonu',
      description: 'Uzmanlarımızla 1:1 görüşme',
      href: '/demo'
    },
    {
      icon: Star,
      name: 'Başarı Hikayeleri',
      description: 'Müşterilerimizin deneyimleri',
      href: '/basari-hikayeleri'
    },
    {
      icon: Award,
      name: 'Sertifikalar',
      description: 'Güvenlik ve kalite standartları',
      href: '/sertifikalar'
    },
    {
      icon: Phone,
      name: 'Destek Merkezi',
      description: '7/24 teknik destek hizmeti',
      href: '/destek'
    }
  ]

  const company = [
    {
      icon: Users,
      name: 'Hakkımızda',
      description: 'Vizyonumuz ve misyonumuz',
      href: '/hakkimizda'
    },
    {
      icon: Rocket,
      name: 'Kariyer',
      description: 'Takımımıza katıl',
      href: '/kariyer'
    },
    {
      icon: Mail,
      name: 'İletişim',
      description: 'Bizimle temasa geç',
      href: '/iletisim'
    }
  ]

  const dropdownVariants = {
    hidden: { 
      opacity: 0, 
      y: -10, 
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 }
  }

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'glass-strong py-4 shadow-premium-lg border-b border-white/10 dark:border-gray-800/50 backdrop-blur-xl bg-white/80 dark:bg-slate-900/80' 
          : 'bg-transparent py-6'
      }`}
    >
      {/* Premium Background Gradient */}
      <div className="absolute inset-0 bg-gradient-mesh opacity-5 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Premium Logo */}
          <Link href="/" className="group">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center space-x-4"
            >
              <div className="relative">
                <motion.div 
                  className="w-12 h-12 bg-gradient-electric rounded-2xl flex items-center justify-center shadow-glow-lg"
                  whileHover={{ rotate: 5, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Sparkles className="w-6 h-6 text-white" />
                </motion.div>
                <motion.div 
                  className="absolute -top-1 -right-1 w-4 h-4 bg-accent-500 rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
              <div className="hidden sm:block">
                <motion.div 
                  className="text-2xl font-display font-bold text-gradient-electric"
                  whileHover={{ scale: 1.02 }}
                >
                  Mutfak Yazılım
                </motion.div>
                <div className="text-xs text-gray-500 font-semibold tracking-wider uppercase">
                  Enterprise SaaS Platform
                </div>
              </div>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-2">
            {/* Ana Sayfa */}
            <Link href="/" className="group">
              <motion.div
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  isActive('/') 
                    ? 'text-primary-600 bg-primary-50 dark:bg-primary-900/30 dark:text-primary-400 shadow-inner-glow border border-primary-100 dark:border-primary-800' 
                    : 'text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50/80 dark:hover:bg-primary-900/20'
                }`}
              >
                {t('nav.home')}
              </motion.div>
            </Link>

            {/* Ürünler Dropdown */}
            <div className="relative group">
              <button
                onMouseEnter={() => setIsProductsOpen(true)}
                onMouseLeave={() => setIsProductsOpen(false)}
                className="flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold text-gray-700 hover:text-primary-600 hover:bg-primary-50/80 transition-all duration-300"
              >
                <span>Ürünler</span>
                <motion.div
                  animate={{ rotate: isProductsOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="w-4 h-4" />
                </motion.div>
              </button>

              <AnimatePresence>
                {isProductsOpen && (
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={dropdownVariants}
                    onMouseEnter={() => setIsProductsOpen(true)}
                    onMouseLeave={() => setIsProductsOpen(false)}
                    className="absolute top-full left-0 mt-2 w-96 glass-strong rounded-3xl shadow-premium-lg border border-white/20 p-8 overflow-hidden"
                  >
                    {/* Premium Background Effect */}
                    <div className="absolute inset-0 bg-gradient-mesh opacity-10 pointer-events-none" />
                    
                    <div className="relative space-y-4">
                      <div className="mb-6">
                        <h3 className="text-lg font-bold text-gradient-electric mb-2">
                          Ürün Ekosistemi
                        </h3>
                        <p className="text-sm text-gray-600">
                          İşletmenizi güçlendiren premium çözümler
                        </p>
                      </div>

                      {products.map((product, index) => (
                        <motion.div
                          key={product.href}
                          initial="hidden"
                          animate="visible"
                          variants={itemVariants}
                          transition={{ delay: index * 0.05 }}
                        >
                          <Link
                            href={product.href}
                            className="group block p-4 rounded-2xl hover:bg-white/10 transition-all duration-300 border border-transparent hover:border-white/20"
                          >
                            <div className="flex items-start space-x-4">
                              <motion.div 
                                className={`w-14 h-14 ${product.bgColor} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-glow`}
                                whileHover={{ rotate: 5 }}
                              >
                                <product.icon className={`w-7 h-7 ${product.color}`} />
                              </motion.div>
                              <div className="flex-1">
                                <div className="flex items-center space-x-3 mb-1">
                                  <h4 className="font-bold text-gray-900 group-hover:text-primary-600 transition-colors text-lg">
                                    {product.name}
                                  </h4>
                                  {product.badge && (
                                    <span className={`px-3 py-1 text-xs font-bold rounded-full ${
                                      product.badge === 'Popüler' ? 'bg-gradient-electric text-white' :
                                      product.badge === 'Yeni' ? 'bg-gradient-fire text-white' :
                                      product.badge === 'Beta' ? 'bg-gradient-premium text-white' :
                                      'bg-gray-100 text-gray-600'
                                    }`}>
                                      {product.badge}
                                    </span>
                                  )}
                                </div>
                                <p className="text-sm text-gray-600 group-hover:text-gray-800 transition-colors">
                                  {product.description}
                                </p>
                              </div>
                              <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-primary-500 group-hover:translate-x-1 transition-all opacity-0 group-hover:opacity-100" />
                            </div>
                          </Link>
                        </motion.div>
                      ))}

                      <motion.div 
                        className="mt-6 pt-6 border-t border-white/20"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        <Link 
                          href="/urunler"
                          className="flex items-center justify-center space-x-2 w-full py-3 bg-gradient-electric text-white rounded-2xl font-semibold hover:scale-105 transition-transform duration-300 shadow-glow"
                        >
                          <span>Tüm Ürünleri Gör</span>
                          <ArrowRight className="w-4 h-4" />
                        </Link>
                      </motion.div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Çözümler */}
            <Link href="/cozumler" className="group">
              <motion.div
                whileHover={{ y: -2 }}
                whileTap={{ y: 0 }}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  isActive('/cozumler') 
                    ? 'text-primary-600 bg-primary-50 shadow-inner-glow border border-primary-100' 
                    : 'text-gray-700 hover:text-primary-600 hover:bg-primary-50/80'
                }`}
              >
                Çözümler
              </motion.div>
            </Link>

            {/* Kaynaklar Dropdown */}
            <div className="relative group">
              <button
                onMouseEnter={() => setIsResourcesOpen(true)}
                onMouseLeave={() => setIsResourcesOpen(false)}
                className="flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold text-gray-700 hover:text-primary-600 hover:bg-primary-50/80 transition-all duration-300"
              >
                <span>Kaynaklar</span>
                <motion.div
                  animate={{ rotate: isResourcesOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="w-4 h-4" />
                </motion.div>
              </button>

              <AnimatePresence>
                {isResourcesOpen && (
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={dropdownVariants}
                    onMouseEnter={() => setIsResourcesOpen(true)}
                    onMouseLeave={() => setIsResourcesOpen(false)}
                    className="absolute top-full left-0 mt-2 w-80 glass-strong rounded-3xl shadow-premium-lg border border-white/20 p-6"
                  >
                    <div className="space-y-3">
                      {resources.map((resource, index) => (
                        <motion.div
                          key={resource.href}
                          initial="hidden"
                          animate="visible"
                          variants={itemVariants}
                          transition={{ delay: index * 0.05 }}
                        >
                          <Link
                            href={resource.href}
                            className="group flex items-center space-x-4 p-3 rounded-xl hover:bg-white/10 transition-all duration-300"
                          >
                            <div className="w-10 h-10 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                              <resource.icon className="w-5 h-5 text-gray-600" />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                                {resource.name}
                              </h4>
                              <p className="text-sm text-gray-600">
                                {resource.description}
                              </p>
                            </div>
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Şirket Dropdown */}
            <div className="relative group">
              <button
                onMouseEnter={() => setIsCompanyOpen(true)}
                onMouseLeave={() => setIsCompanyOpen(false)}
                className="flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold text-gray-700 hover:text-primary-600 hover:bg-primary-50/80 transition-all duration-300"
              >
                <span>Şirket</span>
                <motion.div
                  animate={{ rotate: isCompanyOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="w-4 h-4" />
                </motion.div>
              </button>

              <AnimatePresence>
                {isCompanyOpen && (
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={dropdownVariants}
                    onMouseEnter={() => setIsCompanyOpen(true)}
                    onMouseLeave={() => setIsCompanyOpen(false)}
                    className="absolute top-full right-0 mt-2 w-72 glass-strong rounded-3xl shadow-premium-lg border border-white/20 p-6"
                  >
                    <div className="space-y-3">
                      {company.map((item, index) => (
                        <motion.div
                          key={item.href}
                          initial="hidden"
                          animate="visible"
                          variants={itemVariants}
                          transition={{ delay: index * 0.05 }}
                        >
                          <Link
                            href={item.href}
                            className="group flex items-center space-x-4 p-3 rounded-xl hover:bg-white/10 transition-all duration-300"
                          >
                            <div className="w-10 h-10 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                              <item.icon className="w-5 h-5 text-gray-600" />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
                                {item.name}
                              </h4>
                              <p className="text-sm text-gray-600">
                                {item.description}
                              </p>
                            </div>
                          </Link>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>

          {/* Theme & Language Controls + CTA */}
          <div className="hidden lg:flex items-center space-x-2">
            {/* Theme Toggle */}
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onMouseEnter={() => setIsThemeOpen(true)}
                onMouseLeave={() => setIsThemeOpen(false)}
                className="w-12 h-12 glass rounded-2xl flex items-center justify-center border border-white/20 hover:border-white/30 transition-all duration-300 hover:bg-white/10"
              >
                <AnimatePresence mode="wait">
                  {actualTheme === 'dark' ? (
                    <motion.div
                      key="moon"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Moon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="sun"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Sun className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>

              <AnimatePresence>
                {isThemeOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    onMouseEnter={() => setIsThemeOpen(true)}
                    onMouseLeave={() => setIsThemeOpen(false)}
                    className="absolute top-full right-0 mt-2 w-48 glass-strong rounded-2xl shadow-premium-lg border border-white/20 p-4 z-50"
                  >
                    <div className="space-y-2">
                      <button
                        onClick={() => setTheme('light')}
                        className={`w-full flex items-center space-x-3 px-3 py-2 rounded-xl transition-all duration-200 ${
                          theme === 'light' 
                            ? 'bg-gradient-electric text-white shadow-glow' 
                            : 'hover:bg-white/10 text-gray-700 dark:text-gray-300'
                        }`}
                      >
                        <Sun className="w-4 h-4" />
                        <span className="text-sm font-medium">{t('theme.light')}</span>
                      </button>
                      <button
                        onClick={() => setTheme('dark')}
                        className={`w-full flex items-center space-x-3 px-3 py-2 rounded-xl transition-all duration-200 ${
                          theme === 'dark' 
                            ? 'bg-gradient-electric text-white shadow-glow' 
                            : 'hover:bg-white/10 text-gray-700 dark:text-gray-300'
                        }`}
                      >
                        <Moon className="w-4 h-4" />
                        <span className="text-sm font-medium">{t('theme.dark')}</span>
                      </button>
                      <button
                        onClick={() => setTheme('system')}
                        className={`w-full flex items-center space-x-3 px-3 py-2 rounded-xl transition-all duration-200 ${
                          theme === 'system' 
                            ? 'bg-gradient-electric text-white shadow-glow' 
                            : 'hover:bg-white/10 text-gray-700 dark:text-gray-300'
                        }`}
                      >
                        <Palette className="w-4 h-4" />
                        <span className="text-sm font-medium">{t('theme.system')}</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Language Toggle */}
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onMouseEnter={() => setIsLanguageOpen(true)}
                onMouseLeave={() => setIsLanguageOpen(false)}
                className="w-12 h-12 glass rounded-2xl flex items-center justify-center border border-white/20 hover:border-white/30 transition-all duration-300 hover:bg-white/10"
              >
                <Languages className="w-5 h-5 text-gray-700 dark:text-gray-300" />
              </motion.button>

              <AnimatePresence>
                {isLanguageOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    onMouseEnter={() => setIsLanguageOpen(true)}
                    onMouseLeave={() => setIsLanguageOpen(false)}
                    className="absolute top-full right-0 mt-2 w-44 glass-strong rounded-2xl shadow-premium-lg border border-white/20 p-4 z-50"
                  >
                    <div className="space-y-2">
                      <button
                        onClick={() => setLanguage('tr')}
                        className={`w-full flex items-center space-x-3 px-3 py-2 rounded-xl transition-all duration-200 ${
                          language === 'tr' 
                            ? 'bg-gradient-electric text-white shadow-glow' 
                            : 'hover:bg-white/10 text-gray-700 dark:text-gray-300'
                        }`}
                      >
                        <span className="text-lg">🇹🇷</span>
                        <span className="text-sm font-medium">{t('language.turkish')}</span>
                      </button>
                      <button
                        onClick={() => setLanguage('en')}
                        className={`w-full flex items-center space-x-3 px-3 py-2 rounded-xl transition-all duration-200 ${
                          language === 'en' 
                            ? 'bg-gradient-electric text-white shadow-glow' 
                            : 'hover:bg-white/10 text-gray-700 dark:text-gray-300'
                        }`}
                      >
                        <span className="text-lg">🇺🇸</span>
                        <span className="text-sm font-medium">{t('language.english')}</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Premium CTA Button */}
            <Link href="/demo" className="group ml-4">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="btn-premium px-8 py-3 text-sm font-bold rounded-2xl shadow-glow hover:shadow-glow-lg transition-all duration-300 group"
              >
                <span className="flex items-center space-x-2">
                  <Rocket className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                  <span>{t('nav.demo')}</span>
                </span>
              </motion.button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="w-12 h-12 glass rounded-2xl flex items-center justify-center border border-white/20 hover:border-white/30 transition-colors"
            >
              <AnimatePresence mode="wait">
                {isMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-6 h-6 text-gray-700" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="w-6 h-6 text-gray-700" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Premium Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden mt-6 glass-strong rounded-3xl border border-white/20 overflow-hidden"
            >
              <div className="p-6">
                <div className="space-y-4">
                  <Link href="/" className={`block px-4 py-3 rounded-xl font-semibold transition-colors ${
                    isActive('/') ? 'text-primary-600 bg-primary-50 dark:bg-primary-900/30 dark:text-primary-400' : 'text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50/50 dark:hover:bg-primary-900/20'
                  }`}>
                    {t('nav.home')}
                  </Link>
                  
                  <Link href="/itibar-yonetimi" className={`block px-4 py-3 rounded-xl font-semibold transition-colors ${
                    isActive('/itibar-yonetimi') ? 'text-primary-600 bg-primary-50' : 'text-gray-700 hover:text-primary-600 hover:bg-primary-50/50'
                  }`}>
                    İtibar Yönetimi
                  </Link>
                  
                  <Link href="/cozumler" className={`block px-4 py-3 rounded-xl font-semibold transition-colors ${
                    isActive('/cozumler') ? 'text-primary-600 bg-primary-50' : 'text-gray-700 hover:text-primary-600 hover:bg-primary-50/50'
                  }`}>
                    Çözümler
                  </Link>
                  
                  <Link href="/hakkimizda" className={`block px-4 py-3 rounded-xl font-semibold transition-colors ${
                    isActive('/hakkimizda') ? 'text-primary-600 bg-primary-50' : 'text-gray-700 hover:text-primary-600 hover:bg-primary-50/50'
                  }`}>
                    Hakkımızda
                  </Link>
                  
                  <Link href="/iletisim" className={`block px-4 py-3 rounded-xl font-semibold transition-colors ${
                    isActive('/iletisim') ? 'text-primary-600 bg-primary-50' : 'text-gray-700 hover:text-primary-600 hover:bg-primary-50/50'
                  }`}>
                    İletişim
                  </Link>
                </div>
                
                <div className="mt-6 pt-6 border-t border-white/20">
                  <Link href="/demo" className="block">
                    <motion.button
                      whileTap={{ scale: 0.98 }}
                      className="w-full btn-premium py-4 text-base font-bold rounded-2xl"
                    >
                      Ücretsiz Demo Al
                    </motion.button>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  )
}

export default Header 