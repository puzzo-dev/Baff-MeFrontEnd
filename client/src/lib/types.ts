// Environment variables
export interface EnvVars {
  ERPNEXT_API_URL: string;
  ERPNEXT_API_KEY: string;
}

export const env = {
  ERPNEXT_API_URL: typeof window !== 'undefined' ? window?.env?.ERPNEXT_API_URL : process.env.VITE_ERPNEXT_API_URL || 'https://your-erpnext-instance',
  ERPNEXT_API_KEY: typeof window !== 'undefined' ? window?.env?.ERPNEXT_API_KEY : process.env.VITE_ERPNEXT_API_KEY || ''
};

declare global {
  interface Window {
    env: EnvVars;
  }
}


export interface Product {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  collection?: string;
  colors?: {
    name: string;
    hex: string;
  }[];
  sizes?: string[];
  details?: string[];
  isNew?: boolean;
  isTrending?: boolean;
  rating?: number;
  reviewCount?: number;
  createdAt?: string;
}

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  size: string;
  color: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string;
  category: string;
  author: string;
  publishDate: string;
  tags?: string[];
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  shippingAddress: Address;
  billingAddress: Address;
  paymentMethod: PaymentMethod;
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
}

export interface Address {
  firstName: string;
  lastName: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
  isDefault?: boolean;
}

export type PaymentMethod = 'credit_card' | 'paypal' | 'apple_pay' | 'google_pay';
export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

export interface User {
  id: string;
  email: string;
  username: string;
  firstName?: string;
  lastName?: string;
  addresses?: Address[];
  orders?: Order[];
}