import { NextRequest, NextResponse } from "next/server"

// Premium Automation Workflows Engine
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const businessId = searchParams.get('businessId')

    if (!businessId) {
      return NextResponse.json(
        { error: "Business ID gerekli" },
        { status: 400 }
      )
    }

    const workflows = await getBusinessWorkflows(businessId)
    return NextResponse.json(workflows)

  } catch (error: any) {
    console.error("Workflows Get Error:", error)
    return NextResponse.json(
      { error: "Workflow'lar alınırken hata oluştu: " + error.message },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const workflow = await request.json()

    const validatedWorkflow = await createWorkflow(workflow)
    return NextResponse.json(validatedWorkflow)

  } catch (error: any) {
    console.error("Workflow Create Error:", error)
    return NextResponse.json(
      { error: "Workflow oluşturulurken hata oluştu: " + error.message },
      { status: 500 }
    )
  }
}

async function getBusinessWorkflows(businessId: string) {
  // Premium pre-configured workflows
  const workflows = [
    {
      id: "auto_response_negative",
      name: "Otomatik Olumsuz Yorum Yanıtı",
      description: "1-2 yıldızlı yorumlara otomatik empati dolu yanıt gönder",
      status: "active",
      type: "response_automation",
      trigger: {
        conditions: [
          { field: "rating", operator: "<=", value: 2 },
          { field: "sentiment", operator: "equals", value: "negative" }
        ],
        logic: "AND"
      },
      actions: [
        {
          type: "send_auto_response",
          template: "negative_empathy",
          delay: "5m",
          channel: "comment"
        },
        {
          type: "send_sms",
          template: "sorry_discount",
          delay: "30m",
          channel: "sms"
        },
        {
          type: "escalate",
          to: "manager",
          delay: "2h",
          condition: "no_response"
        }
      ],
      stats: {
        triggered: 89,
        successful: 82,
        effectiveness: 92.1
      }
    },

    {
      id: "positive_redirect",
      name: "Pozitif Yönlendirme",
      description: "4-5 yıldızlı müşterileri Google'a yönlendir",
      status: "active",
      type: "redirect_automation",
      trigger: {
        conditions: [
          { field: "rating", operator: ">=", value: 4 },
          { field: "sentiment", operator: "equals", value: "positive" }
        ],
        logic: "AND"
      },
      actions: [
        {
          type: "redirect_to_platform",
          platform: "google",
          delay: "immediate"
        },
        {
          type: "send_thank_you",
          template: "appreciation",
          delay: "1h",
          channel: "email"
        }
      ],
      stats: {
        triggered: 456,
        successful: 389,
        effectiveness: 85.3
      }
    },

    {
      id: "critical_alert",
      name: "Kritik Durum Alarmı",
      description: "Sağlık/hijyen şikayetlerinde anında alarm",
      status: "active",
      type: "alert_automation",
      trigger: {
        conditions: [
          { field: "keywords", operator: "contains", value: ["hijyen", "sağlık", "zehir", "alerji"] },
          { field: "severity", operator: "equals", value: "critical" }
        ],
        logic: "OR"
      },
      actions: [
        {
          type: "instant_alert",
          recipients: ["manager", "owner"],
          channels: ["sms", "push", "email"],
          delay: "immediate"
        },
        {
          type: "escalate",
          to: "director",
          delay: "15m",
          condition: "no_acknowledgment"
        },
        {
          type: "auto_response",
          template: "urgent_investigation",
          delay: "5m"
        }
      ],
      stats: {
        triggered: 12,
        successful: 12,
        effectiveness: 100
      }
    },

    {
      id: "peak_hour_management",
      name: "Yoğun Saat Yönetimi",
      description: "Yoğun saatlerde ekstra personel bildirimi",
      status: "active", 
      type: "operational_automation",
      trigger: {
        conditions: [
          { field: "time", operator: "between", value: ["19:00", "21:00"] },
          { field: "negative_count", operator: ">", value: 3 },
          { field: "response_time", operator: ">", value: "10m" }
        ],
        logic: "AND"
      },
      actions: [
        {
          type: "notify_staff",
          message: "Yoğun saat - ekstra dikkat gerekli",
          recipients: ["floor_manager"],
          delay: "immediate"
        },
        {
          type: "adjust_service_level",
          level: "high_priority",
          duration: "2h"
        }
      ],
      stats: {
        triggered: 23,
        successful: 21,
        effectiveness: 91.3
      }
    },

    {
      id: "loyalty_program",
      name: "Sadakat Programı",
      description: "Mükerrer pozitif müşterilere özel kampanya",
      status: "draft",
      type: "marketing_automation",
      trigger: {
        conditions: [
          { field: "customer_visits", operator: ">=", value: 3 },
          { field: "average_rating", operator: ">=", value: 4 },
          { field: "last_visit", operator: "within", value: "30d" }
        ],
        logic: "AND"
      },
      actions: [
        {
          type: "send_loyalty_offer",
          template: "vip_discount",
          discount: 15,
          delay: "1d"
        },
        {
          type: "add_to_vip_list",
          segment: "premium_customers"
        }
      ],
      stats: {
        triggered: 0,
        successful: 0,
        effectiveness: 0
      }
    }
  ]

  return {
    businessId,
    totalWorkflows: workflows.length,
    activeWorkflows: workflows.filter(w => w.status === "active").length,
    workflows,
    
    // Workflow Templates
    templates: {
      responses: [
        {
          id: "negative_empathy",
          name: "Empati Dolu Yanıt",
          content: "Yaşadığınız olumsuzluk için çok üzgünüz. Durumu araştırıp en kısa sürede size geri dönüş yapacağız. Memnuniyetiniz bizim için çok önemli."
        },
        {
          id: "appreciation",
          name: "Teşekkür Mesajı",
          content: "Bizi tercih ettiğiniz ve güzel yorumunuz için çok teşekkür ederiz. Sizi tekrar aramızda görmek dileğiyle!"
        },
        {
          id: "urgent_investigation",
          name: "Acil Durum Yanıtı",
          content: "Bu konuyla acil olarak ilgileniyoruz. Yönetimimiz sizinle iletişime geçecek. Lütfen [telefon] numarasından bize ulaşın."
        }
      ],
      
      smsTemplates: [
        {
          id: "sorry_discount",
          name: "Özür + İndirim",
          content: "Memnuniyetsizliğiniz için özür dileriz. Bu kodu kullanarak %20 indirimle tekrar gelebilirsiniz: {DISCOUNT_CODE}"
        },
        {
          id: "vip_discount", 
          name: "VIP İndirim",
          content: "Değerli müşterimiz, sadakatiniz için teşekkürler! Size özel %{DISCOUNT}indirim kodu: {CODE}"
        }
      ]
    },

    // Performance Metrics
    performance: {
      totalTriggered: workflows.reduce((sum, w) => sum + w.stats.triggered, 0),
      totalSuccessful: workflows.reduce((sum, w) => sum + w.stats.successful, 0),
      overallEffectiveness: 89.7,
      responseTimeImprovement: "+45%",
      customerSatisfactionIncrease: "+23%",
      manualWorkloadReduction: "+67%"
    }
  }
}

async function createWorkflow(workflowData: any) {
  const workflow = {
    id: `wf_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    ...workflowData,
    createdAt: new Date().toISOString(),
    status: "draft",
    stats: {
      triggered: 0,
      successful: 0,
      effectiveness: 0
    }
  }

  // Validate workflow structure
  if (!workflow.name || !workflow.trigger || !workflow.actions) {
    throw new Error("Workflow için name, trigger ve actions gerekli")
  }

  // In production, save to database
  console.log("✅ Yeni workflow oluşturuldu:", workflow.id)

  return workflow
}

// Execute workflow (called by triggers)
export async function executeWorkflow(workflowId: string, triggerData: any) {
  console.log(`🔄 Workflow çalıştırılıyor: ${workflowId}`, triggerData)
  
  // In production, this would:
  // 1. Fetch workflow from database
  // 2. Check trigger conditions
  // 3. Execute actions in sequence
  // 4. Log results
  // 5. Update statistics
  
  return {
    workflowId,
    executed: true,
    actions: ["auto_response_sent", "sms_scheduled", "manager_notified"],
    timestamp: new Date().toISOString()
  }
} 