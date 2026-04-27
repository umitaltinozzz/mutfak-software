import { Metadata } from 'next'
import Hero from '@/components/Hero'
import Vision from '@/components/Vision'
import ProductEcosystem from '@/components/ProductEcosystem'
import Infrastructure from '@/components/Infrastructure'
import BrandTestimonials from '@/components/BrandTestimonials'
import FinalCTA from '@/components/FinalCTA'
import Header from '@/components/Header'

export const metadata: Metadata = {
  title: 'Mutfak Yazılım - İşletmenizin Operasyonel Mükemmelliği İçin Tek Adres',
  description: 'Hizmet sektöründeki işletmelerin operasyonel zorluklarını verimliliği artıran, müşteri sadakati yaratan ve kârlılığınızı büyüten yazılım çözümlerine dönüştürüyoruz.',
}

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <Vision />
      <ProductEcosystem />
      <Infrastructure />
      <BrandTestimonials />
      <FinalCTA />
    </main>
  )
} 