import { Metadata } from 'next'
import ReputationHero from '@/components/reputation/ReputationHero'
import LossAversion from '@/components/reputation/LossAversion'
import ReputationBenefits from '@/components/reputation/ReputationBenefits'
import ReputationProcess from '@/components/reputation/ReputationProcess'
import ReputationFeatures from '@/components/reputation/ReputationFeatures'
import ReputationPricing from '@/components/reputation/ReputationPricing'
import ReputationTestimonials from '@/components/reputation/ReputationTestimonials'
import ReputationFAQ from '@/components/reputation/ReputationFAQ'
import ReputationFinalCTA from '@/components/reputation/ReputationFinalCTA'

export const metadata: Metadata = {
  title: 'İtibar Yönetimi - Olumsuz Yorumları Fırsata Çevirin | Mutfak Yazılım',
  description: 'Müşterileriniz işletmenizden ayrılmadan önce neden mutsuz olduklarını öğrenin. Kötü yorumlar herkese açık platformlara yazılmadan önce müdahale edin, itibarınızı koruyun.',
}

export default function ReputationManagement() {
  return (
    <>
      <ReputationHero />
      <LossAversion />
      <ReputationBenefits />
      <ReputationProcess />
      <ReputationFeatures />
      <ReputationPricing />
      <ReputationTestimonials />
      <ReputationFAQ />
      <ReputationFinalCTA />
    </>
  )
} 