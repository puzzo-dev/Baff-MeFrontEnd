
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { products } from '@/lib/data'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const collection = searchParams.get('collection')
  
  let filteredProducts = products
  
  if (collection) {
    filteredProducts = products.filter(p => p.collection === collection)
  }

  return NextResponse.json(filteredProducts)
}
