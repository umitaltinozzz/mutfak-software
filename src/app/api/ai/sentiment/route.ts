import { NextRequest, NextResponse } from "next/server"
import OpenAI from "openai"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

// Premium AI Sentiment Analysis
export async function POST(request: NextRequest) {
  let comment = ""
  
  try {
    const body = await request.json()
    const { comment: commentText, businessType = "restaurant", language = "tr" } = body
    comment = commentText

    if (!comment || comment.length < 5) {
      return NextResponse.json(
        { error: "Yorum metni çok kısa veya boş" },
        { status: 400 }
      )
    }

    // Premium AI Prompt - Türkçe restoran sektörü odaklı
    const prompt = `
Sen Türkiye'deki restoran ve hizmet sektörü için uzmanlaşmış bir AI analistisisin. 
Verilen müşteri yorumunu detaylı analiz et ve aşağıdaki JSON formatında yanıt ver:

{
  "sentiment": "positive" | "negative" | "neutral",
  "confidence": 0.0-1.0,
  "emotion": "happy" | "angry" | "disappointed" | "neutral" | "frustrated",
  "categories": ["servis", "lezzet", "hijyen", "fiyat", "ortam", "hız"], 
  "rootCause": {
    "primary": "string (ana sorun)",
    "secondary": "string (ikincil sorun)"
  },
  "keywords": ["anahtar", "kelimeler"],
  "severity": "low" | "medium" | "high" | "critical",
  "response": {
    "tone": "empathetic" | "professional" | "grateful",
    "suggestion": "string (müşteriye yanıt önerisi - Türkçe, samimi, 50-100 kelime)",
    "internal": "string (işletme için iç aksiyon önerisi)"
  },
  "priority": 1-10,
  "followUpNeeded": boolean
}

YORUM: "${comment}"

Özellikle dikkat et:
- Türk kültürüne uygun yanıt önerileri
- Restoran terminolojisi
- Duygusal zeka
- Pratik çözüm odaklı yaklaşım
`

    const completion = await openai.chat.completions.create({
      model: "gpt-4o", // Premium model
      messages: [
        {
          role: "system",
          content: "Sen Türkiye'deki restoran sektörü için uzmanlaşmış bir AI müşteri deneyimi analistisisin. Yüksek kaliteli, empati dolu ve aksiyona dönük analizler üretirsin."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.3, // Consistent results
      max_tokens: 1000,
      response_format: { type: "json_object" }
    })

    const result = completion.choices[0]?.message?.content

    if (!result) {
      throw new Error("AI yanıtı boş geldi")
    }

    let analysis
    try {
      analysis = JSON.parse(result)
    } catch (parseError) {
      console.error("AI JSON parse hatası:", parseError)
      throw new Error("AI yanıtı geçersiz format")
    }

    // Premium analytics metadata ekleme
    const enrichedAnalysis = {
      ...analysis,
      metadata: {
        model: "gpt-4o",
        timestamp: new Date().toISOString(),
        processingTime: Date.now(),
        language: language,
        businessType: businessType,
        tokenUsage: completion.usage?.total_tokens || 0
      },
      // Premium scoring algorithm
      overallScore: calculateOverallScore(analysis),
      actionPriority: determineActionPriority(analysis),
      escalationLevel: getEscalationLevel(analysis)
    }

    return NextResponse.json(enrichedAnalysis)

  } catch (error: any) {
    console.error("AI Sentiment Analysis Error:", error)
    
    // Premium error handling with fallback
    if (error.code === 'insufficient_quota') {
      return NextResponse.json(
        { 
          error: "AI servis kotası aşıldı. Lütfen admin ile iletişime geçin.",
          fallback: getFallbackAnalysis(comment)
        },
        { status: 429 }
      )
    }

    return NextResponse.json(
      { error: "Analiz sırasında hata oluştu: " + error.message },
      { status: 500 }
    )
  }
}

// Premium scoring algorithm
function calculateOverallScore(analysis: any): number {
  let score = 50 // Base score

  // Sentiment impact
  if (analysis.sentiment === "positive") score += 30
  else if (analysis.sentiment === "negative") score -= 30

  // Confidence impact
  score += (analysis.confidence - 0.5) * 20

  // Severity impact
  const severityImpact: Record<string, number> = {
    low: 5,
    medium: 0,
    high: -15,
    critical: -30
  }
  score += severityImpact[analysis.severity] || 0

  return Math.max(0, Math.min(100, Math.round(score)))
}

// Action priority determination
function determineActionPriority(analysis: any): "immediate" | "urgent" | "normal" | "low" {
  if (analysis.severity === "critical" || analysis.priority >= 8) return "immediate"
  if (analysis.severity === "high" || analysis.priority >= 6) return "urgent"
  if (analysis.sentiment === "negative" && analysis.priority >= 4) return "normal"
  return "low"
}

// Escalation level
function getEscalationLevel(analysis: any): "none" | "supervisor" | "manager" | "director" {
  const criticalKeywords = ["hijyen", "sağlık", "zehir", "alerji", "hasta"]
  const hasHealthIssue = criticalKeywords.some(keyword => 
    analysis.keywords?.some((k: string) => k.toLowerCase().includes(keyword))
  )

  if (hasHealthIssue || analysis.severity === "critical") return "director"
  if (analysis.severity === "high" || analysis.priority >= 8) return "manager"
  if (analysis.sentiment === "negative" && analysis.priority >= 5) return "supervisor"
  return "none"
}

// Fallback analysis when AI fails
function getFallbackAnalysis(comment: string) {
  const negativeWords = ["kötü", "berbat", "soğuk", "geç", "pis", "kaba"]
  const positiveWords = ["güzel", "lezzetli", "harika", "mükemmel", "temiz", "hızlı"]
  
  const hasNegative = negativeWords.some(word => comment.toLowerCase().includes(word))
  const hasPositive = positiveWords.some(word => comment.toLowerCase().includes(word))
  
  return {
    sentiment: hasNegative ? "negative" : hasPositive ? "positive" : "neutral",
    confidence: 0.6,
    response: {
      suggestion: hasNegative 
        ? "Üzgünüz, yaşadığınız olumsuzluk için. Bu durumu değerlendirip daha iyi hizmet verebilmek için çalışacağız."
        : "Geri bildiriminiz için teşekkür ederiz. Memnuniyetiniz bizim için çok değerli.",
      internal: "Manuel inceleme gerekli - AI servisi çalışmıyor"
    },
    fallback: true
  }
} 