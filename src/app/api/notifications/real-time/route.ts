import { NextRequest, NextResponse } from "next/server"

// Premium Real-Time Notifications with Server-Sent Events
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const businessId = searchParams.get('businessId')
  const userId = searchParams.get('userId')

  if (!businessId || !userId) {
    return NextResponse.json(
      { error: "Business ID ve User ID gerekli" },
      { status: 400 }
    )
  }

  // Create readable stream for SSE
  const stream = new ReadableStream({
    start(controller) {
      const encoder = new TextEncoder()

      // Send initial connection message
      const initialMessage = `data: ${JSON.stringify({
        type: 'connected',
        message: 'Real-time notifications aktif',
        timestamp: new Date().toISOString(),
        businessId,
        userId
      })}\n\n`
      
      controller.enqueue(encoder.encode(initialMessage))

      // Simulate real-time events (in production, this would be connected to your notification system)
      const interval = setInterval(() => {
        // Check for new notifications (this would be from your database/queue in real app)
        const notifications = getNotificationsForBusiness(businessId)
        
        if (notifications.length > 0) {
          notifications.forEach(notification => {
            const message = `data: ${JSON.stringify(notification)}\n\n`
            controller.enqueue(encoder.encode(message))
          })
        }

        // Send heartbeat every 30 seconds
        const heartbeat = `data: ${JSON.stringify({
          type: 'heartbeat',
          timestamp: new Date().toISOString()
        })}\n\n`
        controller.enqueue(encoder.encode(heartbeat))
      }, 30000)

      // Cleanup on connection close
      request.signal.addEventListener('abort', () => {
        clearInterval(interval)
        controller.close()
      })
    }
  })

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Cache-Control',
    },
  })
}

// Mock notification system (in production, this would query your database)
function getNotificationsForBusiness(businessId: string) {
  // This would typically fetch from Redis/Database with new notifications
  const mockNotifications = [
    {
      id: `notif_${Date.now()}`,
      type: 'new_review',
      priority: 'high',
      title: 'Yeni Kötü Yorum!',
      message: 'Servis yavaşlığı şikayeti geldi - Masa 12',
      data: {
        rating: 2,
        table: 'Masa 12',
        sentiment: 'negative',
        category: 'servis'
      },
      timestamp: new Date().toISOString(),
      businessId,
      requiresAction: true,
      actionUrl: '/dashboard/yorumlar',
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // 24 hours
    }
  ]

  // Randomly return notifications (simulate real-time activity)
  return Math.random() > 0.7 ? mockNotifications : []
}

// POST endpoint for sending custom notifications
export async function POST(request: NextRequest) {
  try {
    const notification = await request.json()

    // Validate notification
    if (!notification.businessId || !notification.message) {
      return NextResponse.json(
        { error: "BusinessId ve message gerekli" },
        { status: 400 }
      )
    }

    // In production, this would save to database and push to connected clients
    const enrichedNotification = {
      id: `notif_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date().toISOString(),
      type: notification.type || 'custom',
      priority: notification.priority || 'medium',
      ...notification
    }

    // Here you would:
    // 1. Save to database
    // 2. Push to Redis for real-time delivery
    // 3. Send push notifications if needed
    // 4. Log for analytics

    console.log("📱 Real-time notification sent:", enrichedNotification)

    return NextResponse.json({
      success: true,
      notificationId: enrichedNotification.id,
      message: "Bildirim gönderildi"
    })

  } catch (error: any) {
    console.error("Real-time notification error:", error)
    return NextResponse.json(
      { error: "Bildirim gönderilirken hata oluştu: " + error.message },
      { status: 500 }
    )
  }
} 