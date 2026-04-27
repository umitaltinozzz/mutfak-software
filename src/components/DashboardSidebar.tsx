'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Home,
  MessageSquare,
  QrCode,
  BarChart3,
  Users,
  Settings,
  Bell,
  LogOut,
  Menu,
  X,
  Zap,
  Star,
  TrendingUp,
  Shield,
  Crown,
  Map,
  Send
} from 'lucide-react'

const navigation = [
  { name: 'Ana Panel', href: '/dashboard', icon: Home },
  { name: 'Yorumlar', href: '/dashboard/yorumlar', icon: MessageSquare, badge: '12' },
  { name: 'QR Kodlar', href: '/dashboard/qr-kodlar', icon: QrCode },
  { name: 'Mekan Zekası', href: '/dashboard/mekan-zekasi', icon: Map },
  { name: 'Analitik', href: '/dashboard/analitik', icon: BarChart3 },
  { name: 'İletişim', href: '/dashboard/iletisim', icon: Send },
  { name: 'Müşteriler', href: '/dashboard/musteriler', icon: Users },
  { name: 'Ayarlar', href: '/dashboard/ayarlar', icon: Settings },
]

interface DashboardSidebarProps {
  className?: string
}

export default function DashboardSidebar({ className }: DashboardSidebarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  return (
    <>
      {/* Mobile menu button */}
      <Button
        variant="glass"
        size="sm"
        className="fixed top-4 left-4 z-50 lg:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
      </Button>

      {/* Sidebar */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-40 w-72 transform transition-transform duration-300 ease-in-out lg:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full",
        className
      )}>
        {/* Premium glassmorphism background */}
        <div className="h-full bg-white/10 backdrop-blur-2xl border-r border-white/20 shadow-2xl">
          <div className="flex h-full flex-col">
            {/* Logo and brand */}
            <div className="flex items-center gap-3 px-6 py-8 border-b border-white/20">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <Crown className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900">Mutfak Yazılım</h1>
                <Badge variant="premium" className="text-xs mt-1">
                  <Zap className="w-3 h-3 mr-1" />
                  Premium
                </Badge>
              </div>
            </div>

            {/* Quick stats */}
            <div className="px-6 py-4 border-b border-white/20">
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 border border-white/30">
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm font-medium">4.8</span>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">Puan</p>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-3 border border-white/30">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-green-500" />
                    <span className="text-sm font-medium">+23%</span>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">Büyüme</p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 py-6 space-y-2">
              {navigation.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "group flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200",
                      isActive
                        ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                        : "text-gray-700 hover:bg-white/30 hover:text-gray-900"
                    )}
                  >
                    <item.icon className={cn(
                      "w-5 h-5 transition-colors",
                      isActive ? "text-white" : "text-gray-500 group-hover:text-gray-700"
                    )} />
                    <span className="flex-1">{item.name}</span>
                    {item.badge && (
                      <Badge 
                        variant={isActive ? "glass" : "warning"} 
                        className="text-xs"
                      >
                        {item.badge}
                      </Badge>
                    )}
                  </Link>
                )
              })}
            </nav>

            {/* Premium features section */}
            <div className="px-6 py-4 border-t border-white/20">
              <div className="bg-gradient-to-br from-purple-600/20 to-blue-600/20 rounded-xl p-4 border border-purple-200/30">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="w-4 h-4 text-purple-600" />
                  <span className="text-sm font-medium text-gray-900">Premium Özellikler</span>
                </div>
                <p className="text-xs text-gray-600 mb-3">
                  AI destekli analitik, gerçek zamanlı bildirimler ve daha fazlası
                </p>
                <Button variant="premium" size="sm" className="w-full text-xs">
                  Keşfet
                </Button>
              </div>
            </div>

            {/* User actions */}
            <div className="px-4 py-4 border-t border-white/20 space-y-2">
              <Link href="/dashboard/bildirimler">
                <Button variant="ghost" className="w-full justify-start text-gray-700 hover:text-gray-900">
                  <Bell className="w-4 h-4 mr-3" />
                  Bildirimler
                  <Badge variant="warning" className="ml-auto text-xs">3</Badge>
                </Button>
              </Link>
              <Button variant="ghost" className="w-full justify-start text-gray-700 hover:text-red-600">
                <LogOut className="w-4 h-4 mr-3" />
                Çıkış Yap
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  )
} 