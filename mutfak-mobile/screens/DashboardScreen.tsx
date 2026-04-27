import React, { useState } from 'react'
import { 
  View, 
  Text, 
  ScrollView, 
  StyleSheet, 
  TouchableOpacity, 
  SafeAreaView,
  StatusBar,
  Dimensions,
  Alert,
  RefreshControl
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'

const { width } = Dimensions.get('window')

const DashboardScreen: React.FC = () => {
  const [refreshing, setRefreshing] = useState(false)
  const [selectedPeriod, setSelectedPeriod] = useState('30d')

  const stats = [
    { id: 1, title: 'Toplam Yorum', value: '1,247', change: '+23', trend: 'up', icon: 'chatbubble' },
    { id: 2, title: 'Ortalama Puan', value: '4.6', change: '+0.2', trend: 'up', icon: 'star' },
    { id: 3, title: 'Yanıt Oranı', value: '%87', change: '+5%', trend: 'up', icon: 'checkmark-circle' },
    { id: 4, title: 'Bu Ay Yeni', value: '156', change: '+12', trend: 'up', icon: 'add-circle' },
  ]

  const recentActivity = [
    {
      id: 1,
      type: 'review',
      customer: 'Ahmet Yılmaz',
      rating: 5,
      comment: 'Muhteşem bir deneyim! Kesinlikle tekrar geleceğim.',
      platform: 'Google',
      time: '2 saat önce',
      urgent: false
    },
    {
      id: 2,
      type: 'review',
      customer: 'Fatma Kaya',
      rating: 1,
      comment: 'Servis çok yavaştı, yemekler soğuktu.',
      platform: 'Yemeksepeti',
      time: '5 dakika önce',
      urgent: true
    },
    {
      id: 3,
      type: 'review',
      customer: 'Mehmet Özkan',
      rating: 4,
      comment: 'Genel olarak memnun kaldım.',
      platform: 'Tripadvisor',
      time: '1 gün önce',
      urgent: false
    },
  ]

  const quickActions = [
    { id: 1, title: 'Yorum Yanıtla', icon: 'chatbubble-ellipses', color: '#3B82F6', count: 5 },
    { id: 2, title: 'QR Kod Oluştur', icon: 'qr-code', color: '#10B981', count: null },
    { id: 3, title: 'Rapor Görüntüle', icon: 'bar-chart', color: '#8B5CF6', count: null },
    { id: 4, title: 'Müşteri Ekle', icon: 'person-add', color: '#F59E0B', count: null },
  ]

  const onRefresh = () => {
    setRefreshing(true)
    setTimeout(() => {
      setRefreshing(false)
    }, 2000)
  }

  const handleQuickAction = (action: any) => {
    Alert.alert(action.title, 'Bu özellik yakında aktif olacak!')
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1F2937" />
      
      {/* Header */}
      <LinearGradient
        colors={['#1F2937', '#374151']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.greeting}>Merhaba,</Text>
            <Text style={styles.businessName}>Lezzet Durağı</Text>
          </View>
          <TouchableOpacity style={styles.notificationButton}>
            <Ionicons name="notifications" size={24} color="#fff" />
            <View style={styles.notificationBadge}>
              <Text style={styles.notificationCount}>3</Text>
            </View>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView
        style={styles.content}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {/* Stats Grid */}
        <View style={styles.statsContainer}>
          <Text style={styles.sectionTitle}>Genel Bakış</Text>
          <View style={styles.statsGrid}>
            {stats.map((stat) => (
              <View key={stat.id} style={styles.statCard}>
                <View style={styles.statHeader}>
                  <Ionicons name={stat.icon as any} size={20} color="#3B82F6" />
                  <View style={[styles.trendBadge, { backgroundColor: stat.trend === 'up' ? '#10B981' : '#EF4444' }]}>
                    <Text style={styles.trendText}>{stat.change}</Text>
                  </View>
                </View>
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statTitle}>{stat.title}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActionsContainer}>
          <Text style={styles.sectionTitle}>Hızlı İşlemler</Text>
          <View style={styles.quickActionsGrid}>
            {quickActions.map((action) => (
              <TouchableOpacity
                key={action.id}
                style={[styles.quickActionCard, { borderColor: action.color }]}
                onPress={() => handleQuickAction(action)}
              >
                <View style={[styles.quickActionIcon, { backgroundColor: action.color }]}>
                  <Ionicons name={action.icon as any} size={24} color="#fff" />
                </View>
                <Text style={styles.quickActionTitle}>{action.title}</Text>
                {action.count && (
                  <View style={styles.quickActionBadge}>
                    <Text style={styles.quickActionCount}>{action.count}</Text>
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Recent Activity */}
        <View style={styles.recentActivityContainer}>
          <Text style={styles.sectionTitle}>Son Aktiviteler</Text>
          <View style={styles.activityList}>
            {recentActivity.map((activity) => (
              <View key={activity.id} style={[styles.activityCard, activity.urgent && styles.urgentActivity]}>
                <View style={styles.activityHeader}>
                  <View style={styles.activityUser}>
                    <View style={styles.avatarContainer}>
                      <Text style={styles.avatarText}>
                        {activity.customer.split(' ').map(n => n[0]).join('')}
                      </Text>
                    </View>
                    <View style={styles.activityInfo}>
                      <Text style={styles.customerName}>{activity.customer}</Text>
                      <Text style={styles.platformName}>{activity.platform}</Text>
                    </View>
                  </View>
                  <View style={styles.activityMeta}>
                    <View style={styles.ratingContainer}>
                      {[...Array(5)].map((_, i) => (
                        <Ionicons
                          key={i}
                          name="star"
                          size={14}
                          color={i < activity.rating ? '#F59E0B' : '#D1D5DB'}
                        />
                      ))}
                    </View>
                    <Text style={styles.activityTime}>{activity.time}</Text>
                  </View>
                </View>
                <Text style={styles.activityComment} numberOfLines={2}>
                  {activity.comment}
                </Text>
                {activity.urgent && (
                  <TouchableOpacity style={styles.replyButton}>
                    <Text style={styles.replyButtonText}>Yanıtla</Text>
                  </TouchableOpacity>
                )}
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 25,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 16,
    color: '#D1D5DB',
  },
  businessName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  notificationButton: {
    position: 'relative',
    padding: 8,
  },
  notificationBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: '#EF4444',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationCount: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  statsContainer: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 15,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  statCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    width: (width - 50) / 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  trendBadge: {
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  trendText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  statTitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  quickActionsContainer: {
    marginBottom: 25,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  quickActionCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    width: (width - 50) / 2,
    alignItems: 'center',
    borderWidth: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    position: 'relative',
  },
  quickActionIcon: {
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  quickActionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1F2937',
    textAlign: 'center',
  },
  quickActionBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#EF4444',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quickActionCount: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  recentActivityContainer: {
    marginBottom: 25,
  },
  activityList: {
    gap: 12,
  },
  activityCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  urgentActivity: {
    borderLeftWidth: 4,
    borderLeftColor: '#EF4444',
  },
  activityHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  activityUser: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatarContainer: {
    backgroundColor: '#3B82F6',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  activityInfo: {
    flex: 1,
  },
  customerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
  },
  platformName: {
    fontSize: 12,
    color: '#6B7280',
  },
  activityMeta: {
    alignItems: 'flex-end',
  },
  ratingContainer: {
    flexDirection: 'row',
    marginBottom: 2,
  },
  activityTime: {
    fontSize: 12,
    color: '#6B7280',
  },
  activityComment: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
    marginBottom: 8,
  },
  replyButton: {
    backgroundColor: '#3B82F6',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    alignSelf: 'flex-start',
  },
  replyButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
})

export default DashboardScreen 