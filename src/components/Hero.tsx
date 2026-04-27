'use client'

import React, { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import { motion, useAnimation, useInView, useMotionValue, useTransform, AnimatePresence } from 'framer-motion'
import { 
  ArrowRight, Sparkles, Zap, Shield, TrendingUp, Play, ChevronDown, 
  Users, Award, Globe, Rocket, Star, CheckCircle, Eye, Target,
  BarChart3, Clock, Trophy, Layers, Brain
} from 'lucide-react'
import { useLanguage } from '@/lib/language-provider'

// Advanced Particle System
const ParticleSystem = () => {
  const [particles, setParticles] = useState<Array<{
    id: number
    x: number
    y: number
    size: number
    speed: number
    opacity: number
    color: string
    delay: number
  }>>([])

  useEffect(() => {
    const particleCount = 50
    const colors = ['#0066FF', '#00FF88', '#FF6B35', '#8B5CF6', '#EC4899']
    
    const newParticles = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 6 + 2,
      speed: Math.random() * 3 + 1,
      opacity: Math.random() * 0.6 + 0.2,
      color: colors[Math.floor(Math.random() * colors.length)],
      delay: Math.random() * 8
    }))
    setParticles(newParticles)
  }, [])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full blur-sm"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            opacity: particle.opacity,
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, Math.random() * 50 - 25, 0],
            scale: [1, 1.5, 1],
            opacity: [particle.opacity, particle.opacity * 1.5, particle.opacity],
          }}
          transition={{
            duration: 8 + particle.speed,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: particle.delay,
          }}
        />
      ))}
    </div>
  )
}

// Premium 3D Floating Elements
const FloatingElements = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Large Premium Shapes */}
      <motion.div
        className="absolute top-20 left-20 w-32 h-32 bg-gradient-electric rounded-3xl opacity-20 blur-sm"
        animate={{
          y: [0, -30, 0],
          rotate: [0, 180, 360],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 12,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
      
      <motion.div
        className="absolute top-40 right-32 w-24 h-24 bg-gradient-fire rounded-2xl opacity-25"
        animate={{
          y: [0, -40, 0],
          x: [0, 20, 0],
          rotate: [0, -90, 0],
        }}
        transition={{
          duration: 10,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 2,
        }}
      />
      
      <motion.div
        className="absolute bottom-32 left-40 w-20 h-20 bg-gradient-premium rounded-full opacity-30"
        animate={{
          y: [0, -35, 0],
          scale: [1, 1.3, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 4,
        }}
      />
      
      {/* Geometric Patterns */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className={`absolute w-16 h-16 rounded-xl opacity-10 bg-gradient-to-br ${
            i % 3 === 0 ? 'from-primary-400 to-primary-600' :
            i % 3 === 1 ? 'from-secondary-400 to-secondary-600' :
            'from-accent-400 to-accent-600'
          }`}
          style={{
            top: `${20 + (i * 10)}%`,
            right: `${10 + (i * 8)}%`,
          }}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 6 + i,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: i * 0.5,
          }}
        />
      ))}
    </div>
  )
}

// Advanced Stats Counter with Visual Effects
const StatsCounter = ({ 
  value, 
  label, 
  prefix = '', 
  suffix = '',
  icon: Icon,
  color = 'text-primary-500'
}: { 
  value: number
  label: string
  prefix?: string
  suffix?: string
  icon: React.ComponentType<{ className?: string }>
  color?: string
}) => {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (inView && !isVisible) {
      setIsVisible(true)
      let start = 0
      const end = value
      const duration = 2500
      const increment = end / (duration / 16)

      const counter = setInterval(() => {
        start += increment
        if (start >= end) {
          setCount(end)
          clearInterval(counter)
        } else {
          setCount(Math.floor(start))
        }
      }, 16)

      return () => clearInterval(counter)
    }
  }, [inView, value, isVisible])

  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 30 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="relative group"
    >
      <div className="glass-card p-8 text-center hover:glass-strong transition-all duration-300 border border-white/10 hover:border-white/20">
        <div className="flex justify-center mb-4">
          <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${
            color.includes('primary') ? 'from-primary-400 to-primary-600' :
            color.includes('secondary') ? 'from-secondary-400 to-secondary-600' :
            'from-accent-400 to-accent-600'
          } flex items-center justify-center shadow-glow-lg group-hover:scale-110 transition-transform duration-300`}>
            <Icon className="w-8 h-8 text-white" />
          </div>
        </div>
        <div className={`text-4xl font-bold mb-2 ${color} font-display`}>
          {prefix}{count.toLocaleString()}{suffix}
        </div>
        <div className="text-gray-600 font-medium text-lg">{label}</div>
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
      </div>
    </motion.div>
  )
}

// Video Modal Component
const VideoModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/80 backdrop-blur-lg"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="relative w-full max-w-4xl aspect-video bg-black rounded-3xl overflow-hidden shadow-premium-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              className="w-full h-full"
              src="https://player.vimeo.com/video/123456789?autoplay=1"
              frameBorder="0"
              allow="autoplay; fullscreen"
              allowFullScreen
            />
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-colors"
            >
              ×
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Trust Badges Component
const TrustBadges = () => {
  const badges = [
    { icon: Shield, label: "ISO 27001", color: "text-green-500" },
    { icon: Award, label: "SOC 2", color: "text-blue-500" },
    { icon: CheckCircle, label: "GDPR", color: "text-purple-500" },
    { icon: Trophy, label: "99.9% Uptime", color: "text-orange-500" },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2, duration: 0.6 }}
      className="flex flex-wrap justify-center gap-6 mt-12"
    >
      {badges.map((badge, index) => (
        <motion.div
          key={badge.label}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.4 + index * 0.1, duration: 0.4 }}
          className="flex items-center space-x-3 glass px-6 py-3 rounded-xl border border-white/10 hover:border-white/20 transition-colors group"
        >
          <badge.icon className={`w-5 h-5 ${badge.color} group-hover:scale-110 transition-transform`} />
          <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors">
            {badge.label}
          </span>
        </motion.div>
      ))}
    </motion.div>
  )
}

export default function Hero() {
  const [isVideoOpen, setIsVideoOpen] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const { t } = useLanguage()

  // Mouse parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const stats = [
    { value: 50000, label: t('hero.stats.businesses'), suffix: "+", icon: Users, color: "text-primary-500" },
    { value: 2500000, label: t('hero.stats.transactions'), suffix: "+", icon: BarChart3, color: "text-secondary-500" },
    { value: 99.9, label: t('hero.stats.uptime'), suffix: "%", icon: Shield, color: "text-accent-500" },
    { value: 45, label: t('hero.stats.response'), suffix: "ms", icon: Zap, color: "text-purple-500" },
  ]

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-mesh dark:bg-gradient-to-br dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Dynamic Background Layers */}
      <div className="absolute inset-0">
        {/* Animated Gradient Mesh */}
        <div 
          className="absolute inset-0 opacity-40 transition-all duration-1000"
          style={{
            background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(6, 102, 255, 0.3) 0%, transparent 50%)`
          }}
        />
        
        {/* Grid Pattern with Parallax */}
        <motion.div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%230066FF' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1.5'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            transform: `translate(${mousePosition.x * 0.1}px, ${mousePosition.y * 0.1}px)`
          }}
        />

        {/* Floating Blobs */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-electric rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-fire rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-premium rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000" />
      </div>
      
      {/* Particle System */}
      <ParticleSystem />
      
      {/* 3D Floating Elements */}
      <FloatingElements />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center">
          {/* Premium Badge */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, ease: "backOut" }}
            className="inline-flex items-center px-8 py-4 mb-12 glass-strong rounded-full font-semibold shadow-premium-lg group hover:scale-105 transition-transform duration-300"
          >
            <div className="w-3 h-3 bg-accent-500 rounded-full animate-pulse mr-3" />
            <Sparkles className="w-6 h-6 mr-3 text-primary-500 group-hover:rotate-12 transition-transform" />
            <span className="text-gradient-electric font-bold text-lg">
              {t('hero.badge')}
            </span>
            <motion.div
              className="ml-3 w-2 h-2 bg-accent-500 rounded-full"
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            />
          </motion.div>

          {/* Hero Heading - Cinematic Size */}
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            className="text-6xl md:text-8xl lg:text-9xl font-display font-bold mb-8 leading-none tracking-tight"
          >
            <motion.span 
              className="block text-gradient-electric"
              animate={{ 
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
            >
              {t('hero.title.line1')}
            </motion.span>
            <motion.span 
              className="block text-gradient-premium mt-4"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
            >
              {t('hero.title.line2')}
            </motion.span>
          </motion.h1>

          {/* Premium Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="text-xl md:text-2xl lg:text-3xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed font-medium"
          >
            <span className="text-gradient font-semibold">{t('hero.subtitle.highlight1')}</span> {t('hero.subtitle')} 
            <span className="text-gradient font-semibold">{t('hero.subtitle.highlight2')}</span> ve 
            <span className="text-gradient font-semibold">{t('hero.subtitle.highlight3')}</span> {t('hero.subtitle.end')}
          </motion.p>

          {/* Premium CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16"
          >
            <Link href="/demo" className="group">
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="btn-premium text-lg px-10 py-5 rounded-2xl font-bold shadow-glow-lg hover:shadow-glow-xl transition-all duration-300 group"
              >
                <span className="flex items-center">
                  <Rocket className="w-6 h-6 mr-3 group-hover:rotate-12 transition-transform" />
                  {t('hero.cta.primary')}
                  <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform" />
                </span>
              </motion.button>
            </Link>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsVideoOpen(true)}
              className="group flex items-center space-x-4 glass-card px-8 py-5 rounded-2xl font-semibold text-lg hover:glass-strong transition-all duration-300 border border-white/20 hover:border-white/30"
            >
              <div className="w-14 h-14 bg-gradient-electric rounded-full flex items-center justify-center shadow-glow group-hover:shadow-glow-lg transition-shadow">
                <Play className="w-6 h-6 text-white ml-1" />
              </div>
              <span className="text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-gray-100 transition-colors">
                {t('hero.cta.secondary')}
              </span>
            </motion.button>
          </motion.div>

          {/* Trust Badges */}
          <TrustBadges />

          {/* Premium Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.4 }}
            className="mt-20"
          >
            <motion.h3
              className="text-2xl font-bold text-gray-600 dark:text-gray-400 mb-12 font-display"
              animate={{ 
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY }}
            >
              <span className="text-gradient">{t('hero.trust')}</span> - {t('hero.trust.subtitle')}
            </motion.h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.6 + index * 0.1 }}
                >
                  <StatsCounter
                    value={stat.value}
                    label={stat.label}
                    suffix={stat.suffix}
                    icon={stat.icon}
                    color={stat.color}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5, duration: 1 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
              className="flex flex-col items-center space-y-2 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
            >
              <span className="text-sm font-medium">{t('hero.scroll')}</span>
              <ChevronDown className="w-6 h-6" />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Video Modal */}
      <VideoModal isOpen={isVideoOpen} onClose={() => setIsVideoOpen(false)} />

      {/* Performance Optimized Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary-400 rounded-full animate-ping opacity-60" />
        <div className="absolute top-3/4 right-1/3 w-1 h-1 bg-accent-400 rounded-full animate-ping opacity-40 animation-delay-1000" />
        <div className="absolute bottom-1/3 left-1/2 w-1.5 h-1.5 bg-secondary-400 rounded-full animate-ping opacity-50 animation-delay-2000" />
      </div>
    </section>
  )
}