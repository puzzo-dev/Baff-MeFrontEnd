
import { HeroSection } from "@/components/home/HeroSection"
import { FeaturedProducts } from "@/components/home/FeaturedProducts"
import { CollectionBanner } from "@/components/home/CollectionBanner"
import { Journal } from "@/components/home/Journal"
import { Newsletter } from "@/components/home/Newsletter"

export default function Home() {
  return (
    <main>
      <HeroSection />
      <FeaturedProducts />
      <CollectionBanner />
      <Journal />
      <Newsletter />
    </main>
  )
}
