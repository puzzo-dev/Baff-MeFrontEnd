
import HeroSection from '@/components/home/HeroSection'
import FeaturedProducts from '@/components/home/FeaturedProducts'
import Newsletter from '@/components/home/Newsletter'
import Journal from '@/components/home/Journal'

export default function Home() {
  return (
    <main>
      <HeroSection />
      <FeaturedProducts />
      <Journal />
      <Newsletter />
    </main>
  )
}
