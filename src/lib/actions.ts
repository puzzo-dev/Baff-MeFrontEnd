
'use server'

import { getMedusaClient } from './medusa'

export async function getProducts() {
  const medusa = await getMedusaClient()
  const { products } = await medusa.products.list()
  return products
}

export async function getFeaturedProducts() {
  const medusa = await getMedusaClient()
  const { products } = await medusa.products.list({
    is_featured: true
  })
  return products
}

export async function getProduct(handle: string) {
  const medusa = await getMedusaClient()
  const { product } = await medusa.products.retrieve(handle)
  return product
}
