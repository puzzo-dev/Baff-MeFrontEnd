import { Helmet } from 'react-helmet';
import HeroSection from '@/components/home/HeroSection';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import CollectionBanner from '@/components/home/CollectionBanner';
import FeaturedProduct from '@/components/home/FeaturedProduct';
import Journal from '@/components/home/Journal';
import Newsletter from '@/components/home/Newsletter';

export default function Home() {
  return (
    <>
      <Helmet>
        <title>Baff-Me | Urban Fashion Redefined</title>
        <meta name="description" content="Discover bold, edgy streetwear at Baff-Me. Shop the latest urban fashion trends for both juniors and seniors." />
        <meta property="og:title" content="Baff-Me | Urban Fashion Redefined" />
        <meta property="og:description" content="Discover bold, edgy streetwear at Baff-Me. Shop the latest urban fashion trends." />
        <meta property="og:type" content="website" />
      </Helmet>
      
      <HeroSection />
      <FeaturedProducts />
      <CollectionBanner />
      <FeaturedProduct />
      <Journal />
      <Newsletter />
    </>
  );
}
