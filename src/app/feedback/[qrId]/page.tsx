"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Star, 
  Heart, 
  ThumbsUp, 
  ThumbsDown, 
  Send, 
  ExternalLink,
  MapPin,
  Clock,
  Wifi,
  Battery,
  Signal
} from "lucide-react"

// Premium QR Feedback Page
export default function QRFeedbackPage() {
  const { qrId } = useParams()
  const router = useRouter()
  const [step, setStep] = useState("initial") // initial, rating, positive, negative, thank-you
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)
  const [feedback, setFeedback] = useState("")
  const [businessData, setBusinessData] = useState({
    name: "Bella Vista Restaurant",
    logo: "🍽️",
    tableNumber: "12",
    welcomeMessage: "İyi akşamlar! Deneyiminizi bizimle paylaşır mısınız?",
    primaryColor: "#3B82F6",
    accentColor: "#F59E0B"
  })

  // Dynamic greeting based on time
  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return "Günaydın!"
    if (hour < 18) return "İyi günler!"
    return "İyi akşamlar!"
  }

  // Premium star rating component
  const StarRating = ({ value, onChange, hover, onHover }: any) => (
    <div className="flex justify-center gap-2 py-4">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          className={`transform transition-all duration-300 hover:scale-125 ${
            star <= (hover || value) ? "scale-110" : "scale-100"
          }`}
          onMouseEnter={() => onHover(star)}
          onMouseLeave={() => onHover(0)}
          onClick={() => onChange(star)}
        >
          <Star
            className={`w-12 h-12 transition-all duration-300 ${
              star <= (hover || value)
                ? "fill-yellow-400 text-yellow-400 drop-shadow-lg"
                : "text-gray-300 hover:text-yellow-200"
            }`}
          />
        </button>
      ))}
    </div>
  )

  // Handle rating selection
  const handleRatingSelect = (selectedRating: number) => {
    setRating(selectedRating)
    setTimeout(() => {
      if (selectedRating >= 4) {
        setStep("positive")
      } else {
        setStep("negative")
      }
    }, 800)
  }

  // Mobile status bar component
  const MobileStatusBar = () => (
    <div className="flex justify-between items-center w-full text-xs text-white/80 p-2">
      <div className="flex items-center gap-1">
        <Clock className="w-3 h-3" />
        {new Date().toLocaleTimeString("tr-TR", { hour: "2-digit", minute: "2-digit" })}
      </div>
      <div className="flex items-center gap-2">
        <Signal className="w-3 h-3" />
        <Wifi className="w-3 h-3" />
        <Battery className="w-3 h-3" />
        <span>85%</span>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800 relative overflow-hidden">
      {/* Premium animated background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
      </div>

      {/* Mobile status bar */}
      <MobileStatusBar />

      <div className="relative z-10 px-4 pb-8 pt-2">
        {/* Initial Welcome Step */}
        {step === "initial" && (
          <div className="max-w-md mx-auto">
            {/* Business header */}
            <div className="text-center mb-8">
              <div className="text-6xl mb-4 animate-bounce">{businessData.logo}</div>
              <h1 className="text-2xl font-bold text-white mb-2">{businessData.name}</h1>
              <Badge variant="glass" className="text-white">
                <MapPin className="w-3 h-3 mr-1" />
                Masa {businessData.tableNumber}
              </Badge>
            </div>

            {/* Welcome card */}
            <Card variant="premium" className="text-center mb-8 transform hover:scale-105 transition-all duration-500">
              <CardHeader>
                <CardTitle className="text-xl text-gray-800">
                  {getGreeting()}
                </CardTitle>
                <CardDescription className="text-gray-600">
                  {businessData.welcomeMessage}
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Action buttons */}
            <div className="space-y-4">
              <Button 
                onClick={() => setStep("rating")}
                className="w-full py-6 text-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
              >
                <Heart className="w-5 h-5 mr-2" />
                Deneyimi Değerlendir
              </Button>
            </div>
          </div>
        )}

        {/* Rating Step */}
        {step === "rating" && (
          <div className="max-w-md mx-auto">
            <Card variant="premium" className="text-center mb-8 transform animate-slideInUp">
              <CardHeader>
                <CardTitle className="text-xl text-gray-800 mb-4">
                  Deneyiminizi puanlayın
                </CardTitle>
                <div className="mb-6">
                  <StarRating
                    value={rating}
                    onChange={handleRatingSelect}
                    hover={hoverRating}
                    onHover={setHoverRating}
                  />
                </div>
                {(hoverRating || rating) > 0 && (
                  <div className="text-sm text-gray-600 animate-fadeIn">
                    {hoverRating || rating === 1 && "Çok kötü 😞"}
                    {hoverRating || rating === 2 && "Kötü 😟"}
                    {hoverRating || rating === 3 && "Orta 😐"}
                    {hoverRating || rating === 4 && "İyi 😊"}
                    {hoverRating || rating === 5 && "Mükemmel! 🤩"}
                  </div>
                )}
              </CardHeader>
            </Card>
          </div>
        )}

        {/* Positive Feedback Step */}
        {step === "positive" && (
          <div className="max-w-md mx-auto">
            <Card variant="premium" className="text-center mb-8 transform animate-slideInUp">
              <CardHeader>
                <div className="text-6xl mb-4 animate-bounce">🎉</div>
                <CardTitle className="text-xl text-gray-800 mb-4">
                  Harika! Teşekkür ederiz
                </CardTitle>
                <CardDescription className="text-gray-600 mb-6">
                  Bu güzel deneyimi diğer müşterilerle paylaşır mısınız?
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button 
                  className="w-full py-4 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 shadow-xl"
                  onClick={() => window.open("https://maps.google.com", "_blank")}
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Google'da Yorum Yap
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full py-4 bg-white/80 backdrop-blur-sm"
                  onClick={() => window.open("https://yemeksepeti.com", "_blank")}
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Yemeksepeti'nde Puanla
                </Button>
                <Button 
                  variant="ghost" 
                  className="w-full text-white hover:bg-white/20"
                  onClick={() => setStep("thank-you")}
                >
                  Şimdi değil
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Negative Feedback Step */}
        {step === "negative" && (
          <div className="max-w-md mx-auto">
            <Card variant="premium" className="mb-8 transform animate-slideInUp">
              <CardHeader>
                <div className="text-5xl mb-4 text-center">😔</div>
                <CardTitle className="text-xl text-gray-800 mb-4 text-center">
                  Deneyiminizi iyileştirmek istiyoruz
                </CardTitle>
                <CardDescription className="text-gray-600 text-center mb-6">
                  Neler ters gitti? Lütfen bizimle paylaşın ki daha iyi hizmet verelim.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  className="w-full p-4 rounded-lg border border-gray-200 bg-white/90 backdrop-blur-sm resize-none h-32 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Yaşadığınız sorunu detaylarıyla açıklayabilir misiniz?"
                />
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    className="p-3 rounded-lg border border-gray-200 bg-white/90 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Adınız (isteğe bağlı)"
                  />
                  <input
                    type="tel"
                    className="p-3 rounded-lg border border-gray-200 bg-white/90 backdrop-blur-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Telefon"
                  />
                </div>
                <Button 
                  className="w-full py-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-xl"
                  onClick={() => setStep("thank-you")}
                  disabled={!feedback.trim()}
                >
                  <Send className="w-4 h-4 mr-2" />
                  Geri Bildirimi Gönder
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Thank You Step */}
        {step === "thank-you" && (
          <div className="max-w-md mx-auto">
            <Card variant="premium" className="text-center transform animate-slideInUp">
              <CardHeader>
                <div className="text-6xl mb-4 animate-pulse">💝</div>
                <CardTitle className="text-xl text-gray-800 mb-4">
                  Geri bildiriminiz alındı
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Değerli yorumunuz için teşekkür ederiz. Size daha iyi hizmet verebilmek için çalışacağız.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="text-sm text-gray-500">
                  Bu pencereyi kapatabilirsiniz.
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* Premium floating elements */}
      <div className="fixed bottom-4 right-4">
        <div className="w-3 h-3 bg-white/30 rounded-full animate-ping"></div>
      </div>
      <div className="fixed bottom-6 left-6">
        <div className="w-2 h-2 bg-yellow-300/40 rounded-full animate-bounce"></div>
      </div>
    </div>
  )
} 