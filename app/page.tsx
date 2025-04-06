
import { HeroSection } from '@/components/home/HeroSection'
import { FeaturedProducts } from '@/components/home/FeaturedProducts'
import { CollectionBanner } from '@/components/home/CollectionBanner'
import { Newsletter } from '@/components/home/Newsletter'
import { Journal } from '@/components/home/Journal'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedProducts />
      <CollectionBanner />
      <Journal />
      <Newsletter />
    </>
  )
}
