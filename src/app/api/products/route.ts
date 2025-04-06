
import { NextResponse } from 'next/server'
import { db } from '@/lib/data'

export async function GET() {
  const products = await db.getProducts()
  return NextResponse.json(products)
}
