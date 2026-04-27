import React, { useState } from 'react'
import { 
  View, 
  Text, 
  ScrollView, 
  StyleSheet, 
  TouchableOpacity, 
  SafeAreaView,
  StatusBar,
  TextInput,
  Alert,
  RefreshControl,
  Modal,
  Dimensions
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'

const { width, height } = Dimensions.get('window')

interface Review {
  id: string
  customer: string
  rating: number
  comment: string
  platform: 'Google' | 'Yemeksepeti' | 'Tripadvisor'
  date: string
  status: 'pending' | 'replied' | 'archived'
  urgent: boolean
  location?: string
}

const ReviewsScreen: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'pending' | 'replied' | 'urgent'>('all')
  const [refreshing, setRefreshing] = useState(false)
  const [selectedReview, setSelectedReview] = useState<Review | null>(null)
  const [replyText, setReplyText] = useState('')
  const [modalVisible, setModalVisible] = useState(false)

  const reviews: Review[] = [
    {
      id: '1',
      customer: 'Fatma Kaya',
      rating: 1,
      comment: 'Servis çok yavaştı, yemekler soğuktu. Personel ilgisiz davrandı.',
      platform: 'Google',
      date: '5 dakika önce',
      status: 'pending',
      urgent: true,
      location: 'Masa 5'
    },
    {
      id: '2',
      customer: 'Ahmet Yılmaz',
      rating: 5,
      comment: 'Muhteşem bir deneyim! Yemekler lezzetli, personel güler yüzlü.',
      platform: 'Yemeksepeti',
      date: '2 saat önce',
      status: 'replied',
      urgent: false
    },
    {
      id: '3',
      customer: 'Mehmet Özkan',
      rating: 2,
      comment: 'Beklediğim gibi değildi. Fiyat performans dengesiz.',
      platform: 'Tripadvisor',
      date: '1 gün önce',
      status: 'pending',
      urgent: true,
      location: 'Masa 12'
    },
    {
      id: '4',
      customer: 'Elif Demir',
      rating: 4,
      comment: 'Genel olarak memnun kaldım. Ortam çok güzeldi.',
      platform: 'Google',
      date: '2 gün önce',
      status: 'replied',
      urgent: false
    },
    {
      id: '5',
      customer: 'Can Yıldız',
      rating: 3,
      comment: 'Ortalama bir deneyim. Geliştirilmesi gereken noktalar var.',
      platform: 'Yemeksepeti',
      date: '3 gün önce',
      status: 'pending',
      urgent: false
    },
  ]

  const filters = [
    { key: 'all', label: 'Tümü', count: reviews.length },
    { key: 'pending', label: 'Bekleyenler', count: reviews.filter(r => r.status === 'pending').length },
    { key: 'replied', label: 'Yanıtlananlar', count: reviews.filter(r => r.status === 'replied').length },
    { key: 'urgent', label: 'Acil', count: reviews.filter(r => r.urgent).length },
  ]

  const filteredReviews = reviews.filter(review => {
    switch (selectedFilter) {
      case 'pending':
        return review.status === 'pending'
      case 'replied':
        return review.status === 'replied'
      case 'urgent':
        return review.urgent
      default:
        return true
    }
  })

  const onRefresh = () => {
    setRefreshing(true)
    setTimeout(() => {
      setRefreshing(false)
    }, 2000)
  }

  const handleReplyPress = (review: Review) => {
    setSelectedReview(review)
    setModalVisible(true)
  }

  const handleSendReply = () => {
    if (replyText.trim()) {
      Alert.alert('Başarılı', 'Yanıtınız gönderildi!')
      setReplyText('')
      setModalVisible(false)
      setSelectedReview(null)
    }
  }

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'Google':
        return '#4285F4'
      case 'Yemeksepeti':
        return '#FF6B35'
      case 'Tripadvisor':
        return '#00AA6C'
      default:
        return '#6B7280'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return '#F59E0B'
      case 'replied':
        return '#10B981'
      case 'archived':
        return '#6B7280'
      default:
        return '#6B7280'
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Bekliyor'
      case 'replied':
        return 'Yanıtlandı'
      case 'archived':
        return 'Arşivlendi'
      default:
        return 'Bilinmiyor'
    }
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
          <Text style={styles.headerTitle}>Yorum Yönetimi</Text>
          <TouchableOpacity style={styles.searchButton}>
            <Ionicons name="search" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* Filters */}
      <View style={styles.filtersContainer}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.filtersScroll}
        >
          {filters.map((filter) => (
            <TouchableOpacity
              key={filter.key}
              style={[
                styles.filterButton,
                selectedFilter === filter.key && styles.activeFilterButton
              ]}
              onPress={() => setSelectedFilter(filter.key as any)}
            >
              <Text style={[
                styles.filterText,
                selectedFilter === filter.key && styles.activeFilterText
              ]}>
                {filter.label}
              </Text>
              <View style={[
                styles.filterBadge,
                selectedFilter === filter.key && styles.activeFilterBadge
              ]}>
                <Text style={[
                  styles.filterBadgeText,
                  selectedFilter === filter.key && styles.activeFilterBadgeText
                ]}>
                  {filter.count}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Reviews List */}
      <ScrollView
        style={styles.reviewsList}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {filteredReviews.map((review) => (
          <View key={review.id} style={[
            styles.reviewCard,
            review.urgent && styles.urgentReview
          ]}>
            {/* Review Header */}
            <View style={styles.reviewHeader}>
              <View style={styles.reviewUser}>
                <View style={styles.avatarContainer}>
                  <Text style={styles.avatarText}>
                    {review.customer.split(' ').map(n => n[0]).join('')}
                  </Text>
                </View>
                <View style={styles.userInfo}>
                  <Text style={styles.customerName}>{review.customer}</Text>
                  <View style={styles.reviewMeta}>
                    <View style={[styles.platformBadge, { backgroundColor: getPlatformColor(review.platform) }]}>
                      <Text style={styles.platformText}>{review.platform}</Text>
                    </View>
                    {review.location && (
                      <View style={styles.locationBadge}>
                        <Ionicons name="location" size={12} color="#6B7280" />
                        <Text style={styles.locationText}>{review.location}</Text>
                      </View>
                    )}
                  </View>
                </View>
              </View>
              <View style={styles.reviewInfo}>
                <View style={styles.ratingContainer}>
                  {[...Array(5)].map((_, i) => (
                    <Ionicons
                      key={i}
                      name="star"
                      size={16}
                      color={i < review.rating ? '#F59E0B' : '#D1D5DB'}
                    />
                  ))}
                </View>
                <Text style={styles.reviewDate}>{review.date}</Text>
              </View>
            </View>

            {/* Review Content */}
            <Text style={styles.reviewComment}>{review.comment}</Text>

            {/* Review Actions */}
            <View style={styles.reviewActions}>
              <View style={styles.statusContainer}>
                <View style={[styles.statusBadge, { backgroundColor: getStatusColor(review.status) }]}>
                  <Text style={styles.statusText}>{getStatusLabel(review.status)}</Text>
                </View>
                {review.urgent && (
                  <View style={styles.urgentBadge}>
                    <Ionicons name="warning" size={12} color="#EF4444" />
                    <Text style={styles.urgentText}>Acil</Text>
                  </View>
                )}
              </View>

              <View style={styles.actionButtons}>
                {review.status === 'pending' && (
                  <TouchableOpacity
                    style={styles.replyButton}
                    onPress={() => handleReplyPress(review)}
                  >
                    <Ionicons name="chatbubble" size={14} color="#fff" />
                    <Text style={styles.replyButtonText}>Yanıtla</Text>
                  </TouchableOpacity>
                )}
                <TouchableOpacity style={styles.moreButton}>
                  <Ionicons name="ellipsis-horizontal" size={16} color="#6B7280" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Reply Modal */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Yanıt Gönder</Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}
              >
                <Ionicons name="close" size={24} color="#6B7280" />
              </TouchableOpacity>
            </View>

            {selectedReview && (
              <View style={styles.reviewSummary}>
                <Text style={styles.summaryCustomer}>{selectedReview.customer}</Text>
                <Text style={styles.summaryComment} numberOfLines={2}>
                  {selectedReview.comment}
                </Text>
              </View>
            )}

            <View style={styles.replyInputContainer}>
              <TextInput
                style={styles.replyInput}
                placeholder="Yanıtınızı yazın..."
                value={replyText}
                onChangeText={setReplyText}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />
            </View>

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>İptal</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.sendButton}
                onPress={handleSendReply}
              >
                <Text style={styles.sendButtonText}>Gönder</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
    paddingBottom: 20,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  searchButton: {
    padding: 8,
  },
  filtersContainer: {
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    paddingVertical: 10,
  },
  filtersScroll: {
    paddingHorizontal: 20,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 12,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
  },
  activeFilterButton: {
    backgroundColor: '#3B82F6',
  },
  filterText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
    marginRight: 6,
  },
  activeFilterText: {
    color: '#fff',
  },
  filterBadge: {
    backgroundColor: '#E5E7EB',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    minWidth: 20,
    alignItems: 'center',
  },
  activeFilterBadge: {
    backgroundColor: '#1E40AF',
  },
  filterBadgeText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#6B7280',
  },
  activeFilterBadgeText: {
    color: '#fff',
  },
  reviewsList: {
    flex: 1,
    padding: 20,
  },
  reviewCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  urgentReview: {
    borderLeftWidth: 4,
    borderLeftColor: '#EF4444',
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  reviewUser: {
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
  userInfo: {
    flex: 1,
  },
  customerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  reviewMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  platformBadge: {
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginRight: 8,
  },
  platformText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '600',
  },
  locationBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  locationText: {
    fontSize: 10,
    color: '#6B7280',
    marginLeft: 2,
  },
  reviewInfo: {
    alignItems: 'flex-end',
  },
  ratingContainer: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  reviewDate: {
    fontSize: 12,
    color: '#6B7280',
  },
  reviewComment: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 20,
    marginBottom: 16,
  },
  reviewActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusBadge: {
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 8,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  urgentBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF2F2',
    borderRadius: 12,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  urgentText: {
    color: '#EF4444',
    fontSize: 10,
    fontWeight: '600',
    marginLeft: 2,
  },
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  replyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3B82F6',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
  },
  replyButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  moreButton: {
    padding: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
    maxHeight: height * 0.8,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  closeButton: {
    padding: 4,
  },
  reviewSummary: {
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    padding: 12,
    marginBottom: 20,
  },
  summaryCustomer: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    marginBottom: 4,
  },
  summaryComment: {
    fontSize: 14,
    color: '#6B7280',
    fontStyle: 'italic',
  },
  replyInputContainer: {
    marginBottom: 20,
  },
  replyInput: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    minHeight: 100,
    backgroundColor: '#F9FAFB',
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6B7280',
  },
  sendButton: {
    flex: 1,
    backgroundColor: '#3B82F6',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  sendButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
})

export default ReviewsScreen 