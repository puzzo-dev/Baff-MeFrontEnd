
import { HeroSection } from "@/components/home/HeroSection"
import { FeaturedProducts } from "@/components/home/FeaturedProducts"
import { FeaturedCollections } from "@/components/home/FeaturedCollections"
import { CollectionBanner } from "@/components/home/CollectionBanner"
import { Journal } from "@/components/home/Journal"
import { Newsletter } from "@/components/home/Newsletter"

export default function Home() {
  return (
    <main className="bg-background text-foreground">
      <HeroSection />
      <FeaturedCollections />
      <FeaturedProducts />
      <CollectionBanner />
      <Journal />
      <Newsletter />
    </main>
  )
}
