"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  TrendingUp, 
  TrendingDown, 
  Star, 
  MessageSquare, 
  Users, 
  DollarSign,
  Eye,
  BarChart3,
  Clock,
  AlertTriangle,
  CheckCircle2,
  Zap,
  Download,
  Bell,
  Settings,
  Mail,
  Phone
} from "lucide-react"

// Premium Dashboard Component
export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [stats, setStats] = useState({
    totalReviews: 0,
    averageRating: 0,
    pendingResponses: 0,
    thisMonthGrowth: 0,
    revenue: 0,
    activeUsers: 0,
  })
  const [showNotification, setShowNotification] = useState(false)

  // Mock data loading with animation
  useEffect(() => {
    const timer = setTimeout(() => {
      setStats({
        totalReviews: 1247,
        averageRating: 4.8,
        pendingResponses: 12,
        thisMonthGrowth: 23.5,
        revenue: 45680,
        activeUsers: 892,
      })
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  // Toast notification helper
  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
    setShowNotification(true)
    setTimeout(() => setShowNotification(false), 3000)
    
    // Create toast element
    const toast = document.createElement('div')
    toast.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg ${
      type === 'success' ? 'bg-green-500 text-white' : 
      type === 'error' ? 'bg-red-500 text-white' : 
      'bg-blue-500 text-white'
    }`
    toast.textContent = message
    document.body.appendChild(toast)
    
    setTimeout(() => {
      toast.remove()
    }, 3000)
  }

  // Action handlers
  const handleLiveView = () => {
    showToast('Canlı görünüm açılıyor...', 'info')
    router.push('/dashboard/yorumlar')
  }

  const handleAnalytics = () => {
    showToast('Analitik raporları açılıyor...', 'info')
    router.push('/dashboard/analitik')
  }

  const handleComments = () => {
    showToast('Yorum yönetimi açılıyor...', 'info')
    router.push('/dashboard/yorumlar')
  }

  const handleCustomerCommunication = () => {
    showToast('Müşteri iletişimi açılıyor...', 'info')
    router.push('/dashboard/iletisim')
  }

  const handleRevenueAnalysis = () => {
    showToast('Gelir analizi hazırlanıyor...', 'info')
    router.push('/dashboard/analitik')
  }

  const handleDetailedView = () => {
    showToast('Detaylı görünüm açılıyor...', 'info')
    router.push('/dashboard/mekan-zekasi')
  }

  const handleFilterReviews = () => {
    showToast('Yorum filtreleme açılıyor...', 'info')
    router.push('/dashboard/yorumlar')
  }

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  const StatCard = ({ 
    title, 
    value, 
    change, 
    icon: Icon, 
    trend, 
    premium = false,
    onClick
  }: {
    title: string
    value: string | number
    change?: string
    icon: any
    trend?: "up" | "down" | "neutral"
    premium?: boolean
    onClick?: () => void
  }) => (
    <Card 
      variant={premium ? "premium" : "glass"} 
      className="group hover:scale-105 transition-all duration-500 cursor-pointer overflow-hidden relative"
      onClick={onClick}
    >
      {/* Premium gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
        <CardTitle className="text-sm font-medium text-gray-600">{title}</CardTitle>
        <Icon className={`h-4 w-4 transition-colors duration-300 ${
          premium ? "text-purple-600" : "text-gray-400 group-hover:text-blue-600"
        }`} />
      </CardHeader>
      <CardContent className="relative z-10">
        <div className="text-2xl font-bold text-gray-900 mb-1">
          {typeof value === 'number' ? value.toLocaleString() : value}
        </div>
        {change && (
          <div className="flex items-center text-xs text-gray-600">
            {trend === "up" && <TrendingUp className="mr-1 h-3 w-3 text-green-500" />}
            {trend === "down" && <TrendingDown className="mr-1 h-3 w-3 text-red-500" />}
            <span className={
              trend === "up" ? "text-green-600" : 
              trend === "down" ? "text-red-600" : 
              "text-gray-600"
            }>
              {change}
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen">
      {/* Premium Top Bar */}
      <div className="bg-white/40 backdrop-blur-xl border-b border-white/20 sticky top-0 z-50">
        <div className="px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent">
                İşletme Kontrol Merkezi
              </h1>
              <p className="text-gray-600 text-sm mt-1">
                Hoş geldiniz, {session?.user?.name || "İşletme Sahibi"}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="glass" size="sm" onClick={handleLiveView}>
                <Eye className="w-4 h-4 mr-2" />
                Canlı Görünüm
              </Button>
              <Button variant="outline" size="sm" onClick={() => router.push('/dashboard/bildirimler')}>
                <Bell className="w-4 h-4 mr-2" />
                Bildirimler
                <Badge variant="destructive" className="ml-2">3</Badge>
              </Button>
              <Button variant="outline" size="sm" onClick={() => router.push('/dashboard/ayarlar')}>
                <Settings className="w-4 h-4 mr-2" />
                Ayarlar
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Premium Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Toplam Yorum"
            value={stats.totalReviews}
            change="+12% bu ay"
            icon={MessageSquare}
            trend="up"
            premium
            onClick={() => router.push('/dashboard/yorumlar')}
          />
          <StatCard
            title="Ortalama Puan"
            value={`${stats.averageRating} ⭐`}
            change="+0.3 bu ay"
            icon={Star}
            trend="up"
            onClick={() => router.push('/dashboard/analitik')}
          />
          <StatCard
            title="Bekleyen Yanıtlar"
            value={stats.pendingResponses}
            change="Acil: 3 adet"
            icon={AlertTriangle}
            trend="neutral"
            onClick={() => router.push('/dashboard/yorumlar?filter=pending')}
          />
          <StatCard
            title="Aylık Büyüme"
            value={`%${stats.thisMonthGrowth}`}
            change="Hedefin üzerinde"
            icon={TrendingUp}
            trend="up"
            onClick={() => router.push('/dashboard/analitik')}
          />
        </div>

        {/* Premium Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activity Premium Card */}
          <Card variant="premium" className="lg:col-span-2">
            <CardHeader>
              <CardTitle gradient>Son Aktiviteler</CardTitle>
              <CardDescription>
                Gerçek zamanlı işletme aktivite akışı
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { 
                    type: "review", 
                    content: "Yeni 5 yıldızlı yorum alındı", 
                    time: "2 dakika önce",
                    status: "positive",
                    action: () => router.push('/dashboard/yorumlar')
                  },
                  { 
                    type: "response", 
                    content: "Müşteri şikayetine yanıt verildi", 
                    time: "15 dakika önce",
                    status: "resolved",
                    action: () => router.push('/dashboard/yorumlar')
                  },
                  { 
                    type: "alert", 
                    content: "3 yıldızlı yorum - Müdahale gerekli", 
                    time: "1 saat önce",
                    status: "warning",
                    action: () => router.push('/dashboard/yorumlar?filter=negative')
                  },
                ].map((activity, index) => (
                  <div 
                    key={index} 
                    className="flex items-center gap-4 p-3 rounded-lg bg-white/50 backdrop-blur-sm hover:bg-white/70 cursor-pointer transition-colors"
                    onClick={activity.action}
                  >
                    <div className={`w-2 h-2 rounded-full ${
                      activity.status === "positive" ? "bg-green-500" :
                      activity.status === "resolved" ? "bg-blue-500" :
                      "bg-yellow-500"
                    }`} />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{activity.content}</p>
                      <p className="text-xs text-gray-500 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {activity.time}
                      </p>
                    </div>
                    <Badge variant={
                      activity.status === "positive" ? "success" :
                      activity.status === "resolved" ? "default" :
                      "warning"
                    }>
                      {activity.status === "positive" && <CheckCircle2 className="w-3 h-3 mr-1" />}
                      {activity.status === "resolved" && <CheckCircle2 className="w-3 h-3 mr-1" />}
                      {activity.status === "warning" && <AlertTriangle className="w-3 h-3 mr-1" />}
                      {activity.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions Premium Card */}
          <Card variant="glass">
            <CardHeader>
              <CardTitle>Hızlı İşlemler</CardTitle>
              <CardDescription>
                Sık kullanılan özelliklere anında erişim
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                className="w-full justify-start bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                onClick={handleAnalytics}
              >
                <BarChart3 className="w-4 h-4 mr-2" />
                Analitik Raporları
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start bg-white/50"
                onClick={handleComments}
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                Yorumları Yönet
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start bg-white/50"
                onClick={handleCustomerCommunication}
              >
                <Users className="w-4 h-4 mr-2" />
                Müşteri İletişimi
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start bg-white/50"
                onClick={handleRevenueAnalysis}
              >
                <DollarSign className="w-4 h-4 mr-2" />
                Gelir Analizi
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Premium Performance Overview */}
        <div className="mt-8">
          <Card variant="gradient" className="overflow-hidden">
            <CardHeader>
              <CardTitle className="text-xl">Performans Özeti</CardTitle>
              <CardDescription>
                Son 30 günlük detaylı performans analizi
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center cursor-pointer hover:scale-105 transition-transform" onClick={() => router.push('/dashboard/musteriler')}>
                  <div className="text-3xl font-bold text-blue-600 mb-2">98.5%</div>
                  <div className="text-sm text-gray-600">Müşteri Memnuniyeti</div>
                </div>
                <div className="text-center cursor-pointer hover:scale-105 transition-transform" onClick={() => router.push('/dashboard/yorumlar')}>
                  <div className="text-3xl font-bold text-green-600 mb-2">2.3 dk</div>
                  <div className="text-sm text-gray-600">Ortalama Yanıt Süresi</div>
                </div>
                <div className="text-center cursor-pointer hover:scale-105 transition-transform" onClick={() => router.push('/dashboard/analitik')}>
                  <div className="text-3xl font-bold text-purple-600 mb-2">+127%</div>
                  <div className="text-sm text-gray-600">Pozitif Yorum Artışı</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 