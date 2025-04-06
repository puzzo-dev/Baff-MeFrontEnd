
import Medusa from "@medusajs/medusa-js";

const isBrowser = typeof window !== 'undefined';

const MEDUSA_BACKEND_URL = import.meta.env.VITE_MEDUSA_BACKEND_URL || "http://localhost:9000";

export const medusa = new Medusa({ 
  baseUrl: MEDUSA_BACKEND_URL,
  maxRetries: 3
});
