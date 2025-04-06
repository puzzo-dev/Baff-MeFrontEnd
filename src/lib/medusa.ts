
import Medusa from "@medusajs/medusa-js"

const MEDUSA_BACKEND_URL = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000"

export const createMedusaClient = () => {
  return new Medusa({ 
    baseUrl: MEDUSA_BACKEND_URL,
    maxRetries: 3
  })
}

// For client-side usage
export const medusa = createMedusaClient()

// For server-side usage
export async function getMedusaClient() {
  return createMedusaClient()
}
