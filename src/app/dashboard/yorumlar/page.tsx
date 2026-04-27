"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  MessageSquare, 
  Star, 
  Filter, 
  Search, 
  Clock, 
  Eye,
  Reply,
  MoreHorizontal,
  AlertTriangle,
  CheckCircle2,
  Zap,
  Brain,
  TrendingUp,
  TrendingDown,
  Heart,
  MapPin,
  Send,
  Bot,
  User,
  Smartphone,
  Globe
} from "lucide-react"

// Mock review data
const mockReviews = [
  {
    id: 1,
    customerName: "Ayşe Kaya",
    rating: 2,
    comment: "Servis çok yavaştı, yemekler soğuk geldi. Garson ilgisizdi.",
    source: "Google Maps",
    tableNumber: "12",
    timestamp: "2 dakika önce",
    status: "pending",
    aiSentiment: "negative",
    aiSuggestion: "Hızlı özür dileyin ve kişisel çözüm sunun",
    priority: "high"
  },
  {
    id: 2,
    customerName: "Mehmet Öz",
    rating: 5,
    comment: "Harika bir akşam geçirdik! Yemekler mükemmel, personel çok ilgiliydi.",
    source: "Yemeksepeti",
    tableNumber: "7",
    timestamp: "15 dakika önce",
    status: "responded",
    aiSentiment: "positive",
    aiSuggestion: "Pozitif yorumu paylaşmaya teşvik edin",
    priority: "low"
  },
  {
    id: 3,
    customerName: "Zeynep Demir",
    rating: 3,
    comment: "Ortam güzeldi ama fiyatlar biraz yüksek. Bekleme süresi uzundu.",
    source: "TripAdvisor",
    tableNumber: "5",
    timestamp: "1 saat önce",
    status: "pending",
    aiSentiment: "neutral",
    aiSuggestion: "Değer algısını düzeltmeye odaklanın",
    priority: "medium"
  }
]

export default function CommentManagementPage() {
  const [reviews, setReviews] = useState(mockReviews)
  const [filter, setFilter] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedReview, setSelectedReview] = useState<any>(null)
  const [aiResponse, setAiResponse] = useState("")

  // Real-time stats
  const stats = {
    total: reviews.length,
    pending: reviews.filter(r => r.status === "pending").length,
    positive: reviews.filter(r => r.aiSentiment === "positive").length,
    negative: reviews.filter(r => r.aiSentiment === "negative").length,
    avgRating: reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
  }

  // Filter reviews
  const filteredReviews = reviews.filter(review => {
    const matchesFilter = filter === "all" || 
      (filter === "pending" && review.status === "pending") ||
      (filter === "positive" && review.aiSentiment === "positive") ||
      (filter === "negative" && review.aiSentiment === "negative")
    
    const matchesSearch = review.comment.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.customerName.toLowerCase().includes(searchTerm.toLowerCase())
    
    return matchesFilter && matchesSearch
  })

  // Premium AI Response Generator
  const generateAiResponse = (review: any) => {
    const responses = {
      negative: `Merhaba ${review.customerName}, yaşadığınız olumsuzluk için gerçekten üzgünüz. Bu durumu derhal araştırıp çözüme kavuşturacağız. Size özel %20 indirim kodu: OZUR20. İletişim: 0555-123-4567`,
      positive: `${review.customerName}, bu güzel değerlendirmeniz için çok teşekkür ederiz! Sizin gibi değerli müşterilerimizi tekrar aramızda görmek için sabırsızlanıyoruz. 🙏`,
      neutral: `Merhaba ${review.customerName}, geri bildiriminiz için teşekkürler. Daha iyi hizmet verebilmek için çalışıyoruz. Bir sonraki ziyaretinizde farkı hissedeceğinizi umuyoruz.`
    }
    return responses[review.aiSentiment as keyof typeof responses] || responses.neutral
  }

  const StatCard = ({ title, value, change, icon: Icon, variant = "default" }: any) => (
    <Card variant={variant} className="hover:scale-105 transition-all duration-300">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {change && (
          <p className="text-xs text-muted-foreground">
            {change}
          </p>
        )}
      </CardContent>
    </Card>
  )

  const ReviewCard = ({ review }: { review: any }) => (
    <Card 
      variant="glass" 
      className={`mb-4 cursor-pointer transition-all duration-300 hover:shadow-xl ${
        review.priority === "high" ? "border-red-200 bg-red-50/50" :
        review.priority === "medium" ? "border-yellow-200 bg-yellow-50/50" :
        "border-green-200 bg-green-50/50"
      }`}
      onClick={() => setSelectedReview(review)}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`w-4 h-4 ${
                    star <= review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <Badge variant={
              review.aiSentiment === "positive" ? "success" :
              review.aiSentiment === "negative" ? "destructive" :
              "warning"
            } className="text-xs">
              <Brain className="w-3 h-3 mr-1" />
              AI: {review.aiSentiment}
            </Badge>
          </div>
          <Badge variant={review.status === "pending" ? "warning" : "success"}>
            {review.status === "pending" ? (
              <Clock className="w-3 h-3 mr-1" />
            ) : (
              <CheckCircle2 className="w-3 h-3 mr-1" />
            )}
            {review.status}
          </Badge>
        </div>
        <div className="flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4" />
            <span className="font-medium">{review.customerName}</span>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <div className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              Masa {review.tableNumber}
            </div>
            <div className="flex items-center gap-1">
              <Globe className="w-3 h-3" />
              {review.source}
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {review.timestamp}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-gray-700 mb-3">{review.comment}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs">
              <Zap className="w-3 h-3 mr-1" />
              Öncelik: {review.priority}
            </Badge>
          </div>
          <div className="flex gap-2">
            <Button size="sm" variant="outline">
              <Eye className="w-3 h-3 mr-1" />
              Detay
            </Button>
            <Button size="sm">
              <Reply className="w-3 h-3 mr-1" />
              Yanıtla
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-6">
      {/* Premium Header */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-purple-900 bg-clip-text text-transparent">
              Yorum Yönetim Merkezi
            </h1>
            <p className="text-gray-600 mt-1">
              AI destekli akıllı yorum analizi ve yanıtlama sistemi
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="bg-white/50 backdrop-blur-sm">
              <Filter className="w-4 h-4 mr-2" />
              Filtreler
            </Button>
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600">
              <Brain className="w-4 h-4 mr-2" />
              AI Analiz
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
          <StatCard
            title="Toplam Yorum"
            value={stats.total}
            change="+12% bu hafta"
            icon={MessageSquare}
            variant="premium"
          />
          <StatCard
            title="Bekleyen"
            value={stats.pending}
            change="Acil müdahale"
            icon={AlertTriangle}
            variant="glass"
          />
          <StatCard
            title="Pozitif"
            value={stats.positive}
            change="+5% artış"
            icon={TrendingUp}
            variant="glass"
          />
          <StatCard
            title="Negatif"
            value={stats.negative}
            change="Dikkat gerekli"
            icon={TrendingDown}
            variant="glass"
          />
          <StatCard
            title="Ortalama Puan"
            value={stats.avgRating.toFixed(1)}
            change="⭐ Mükemmel"
            icon={Star}
            variant="glass"
          />
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Yorum veya müşteri adı ile ara..."
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 bg-white/80 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            {["all", "pending", "positive", "negative"].map((filterType) => (
              <Button
                key={filterType}
                variant={filter === filterType ? "default" : "outline"}
                onClick={() => setFilter(filterType)}
                className={filter === filterType ? "bg-gradient-to-r from-blue-600 to-purple-600" : "bg-white/50"}
              >
                {filterType === "all" && "Tümü"}
                {filterType === "pending" && "Bekleyen"}
                {filterType === "positive" && "Pozitif"}
                {filterType === "negative" && "Negatif"}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Reviews List Column */}
        <div className="lg:col-span-2">
          <Card variant="glass" className="p-6">
            <CardHeader className="px-0 pt-0">
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                Güncel Yorumlar ({filteredReviews.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="px-0">
              <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                {filteredReviews.map((review) => (
                  <ReviewCard key={review.id} review={review} />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* AI Response Panel */}
        <div className="space-y-6">
          {selectedReview && (
            <Card variant="premium" className="sticky top-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bot className="w-5 h-5 text-purple-600" />
                  AI Yanıt Asistanı
                </CardTitle>
                <CardDescription>
                  {selectedReview.customerName} için önerilen yanıt
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-blue-50/50 rounded-lg border border-blue-200">
                  <div className="text-sm font-medium text-blue-800 mb-2">AI Önerisi:</div>
                  <div className="text-sm text-blue-700">{selectedReview.aiSuggestion}</div>
                </div>
                
                <textarea
                  className="w-full h-32 p-3 rounded-lg border border-gray-200 bg-white/90 backdrop-blur-sm resize-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Yanıtınızı yazın..."
                  value={aiResponse || generateAiResponse(selectedReview)}
                  onChange={(e) => setAiResponse(e.target.value)}
                />
                
                <div className="flex gap-2">
                  <Button className="flex-1 bg-gradient-to-r from-green-500 to-blue-500">
                    <Send className="w-4 h-4 mr-2" />
                    Gönder
                  </Button>
                  <Button variant="outline" onClick={() => setAiResponse(generateAiResponse(selectedReview))}>
                    <Zap className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Quick Actions */}
          <Card variant="glass">
            <CardHeader>
              <CardTitle>Hızlı İşlemler</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start bg-white/50">
                <Brain className="w-4 h-4 mr-2" />
                Toplu AI Analizi
              </Button>
              <Button variant="outline" className="w-full justify-start bg-white/50">
                <Send className="w-4 h-4 mr-2" />
                Toplu Yanıtlama
              </Button>
              <Button variant="outline" className="w-full justify-start bg-white/50">
                <Eye className="w-4 h-4 mr-2" />
                Detaylı Rapor
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 