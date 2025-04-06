
import { Metadata } from 'next'
import { getProduct } from '@/lib/actions'
import { ProductDetail } from '@/components/products/ProductDetail'

export async function generateMetadata({ params }: { params: { handle: string } }): Promise<Metadata> {
  const product = await getProduct(params.handle)
  return {
    title: `${product.title} | BAFF-ME`,
    description: product.description,
  }
}

export default async function ProductPage({ params }: { params: { handle: string } }) {
  const product = await getProduct(params.handle)
  return <ProductDetail product={product} />
}
