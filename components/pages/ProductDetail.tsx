import { useEffect, useState } from 'react';
import { useRoute, Link } from 'wouter';
import { Helmet } from 'react-helmet';
import { Product } from '@/lib/types';
import { apiRequest } from '@/lib/queryClient';
import ProductDetail from '@/components/products/ProductDetail';
import ProductCard from '@/components/products/ProductCard';

export default function ProductDetailPage() {
  const [, params] = useRoute('/product/:id');
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentUrl, setCurrentUrl] = useState('');
  
  // Set current URL for metadata and sharing
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentUrl(window.location.href);
    }
  }, []);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        setLoading(true);
        setError('');
        
        const productId = params?.id;
        if (!productId) {
          setError('Product ID is missing');
          return;
        }
        
        const productResponse = await apiRequest('GET', `/api/products/${productId}`, undefined);
        const productData = await productResponse.json();
        setProduct(productData);
        
        // Fetch related products
        const relatedResponse = await apiRequest('GET', `/api/products/related/${productId}`, undefined);
        const relatedData = await relatedResponse.json();
        setRelatedProducts(relatedData);
      } catch (error) {
        console.error('Error fetching product details', error);
        setError('Failed to load product details');
      } finally {
        setLoading(false);
      }
    };
    
    fetchProductData();
  }, [params?.id]);
  
  if (loading) {
    return (
      <div className="py-16 md:py-24 bg-white dark:bg-[#111111]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
            <div className="space-y-4">
              <div className="aspect-square bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
              <div className="grid grid-cols-4 gap-2">
                {[...Array(4)].map((_, index) => (
                  <div key={index} className="aspect-square bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <div className="h-8 bg-gray-200 dark:bg-gray-700 w-3/4 rounded"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 w-1/4 rounded"></div>
              <div className="h-6 bg-gray-200 dark:bg-gray-700 w-1/4 rounded"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 w-full rounded mb-2"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 w-full rounded mb-2"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 w-3/4 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (error || !product) {
    return (
      <div className="py-16 md:py-24 bg-white dark:bg-[#111111]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <i className="bx bx-error-circle text-primary text-5xl mb-4"></i>
            <h1 className="text-2xl font-orbitron font-bold mb-2">Product Not Found</h1>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              {error || 'The product you are looking for does not exist or has been removed.'}
            </p>
            <Link href="/products">
              <a className="bg-primary hover:bg-opacity-90 text-white px-6 py-2 rounded-md font-medium transition duration-200">
                Browse Products
              </a>
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <>
      <Helmet>
        <title>{product.name} | Baff-Me</title>
        <meta name="description" content={product.description.substring(0, 155) + '...'} />
        
        {/* Basic Open Graph Tags */}
        <meta property="og:title" content={`${product.name} | Baff-Me`} />
        <meta property="og:description" content={product.description.substring(0, 155) + '...'} />
        <meta property="og:image" content={product.images[0]} />
        <meta property="og:image:alt" content={product.name} />
        <meta property="og:type" content="product" />
        <meta property="og:url" content={currentUrl} />
        <meta property="og:site_name" content="Baff-Me" />
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${product.name} | Baff-Me`} />
        <meta name="twitter:description" content={product.description.substring(0, 155) + '...'} />
        <meta name="twitter:image" content={product.images[0]} />
        
        {/* Product-specific metadata */}
        <meta property="product:price:amount" content={product.price.toString()} />
        <meta property="product:price:currency" content="USD" />
        {product.category && <meta property="product:category" content={product.category} />}
      </Helmet>
      
      <section className="py-16 md:py-24 bg-white dark:bg-[#111111]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="mb-8 text-sm text-gray-500 dark:text-gray-400">
            <Link href="/">
              <a className="hover:text-primary">Home</a>
            </Link>
            <span className="mx-2">/</span>
            <Link href="/products">
              <a className="hover:text-primary">Products</a>
            </Link>
            <span className="mx-2">/</span>
            <span className="text-[#111111] dark:text-white">{product.name}</span>
          </div>
          
          <ProductDetail product={product} currentUrl={currentUrl} />
          
          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div className="mt-24">
              <h2 className="font-orbitron text-2xl font-bold text-[#111111] dark:text-white mb-8">
                YOU MAY ALSO LIKE
              </h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
