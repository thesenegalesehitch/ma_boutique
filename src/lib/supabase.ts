import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  stock: number;
  is_featured: boolean;
  created_at: string;
  updated_at: string;
  category_id?: string;
  average_rating?: number;
  review_count?: number;
  discount_percentage?: number;
  original_price?: number;
}

export interface Order {
  id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  product_id: string | null;
  product_name: string;
  product_price: number;
  quantity: number;
  total_amount: number;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  created_at: string;
}

export interface SiteContent {
  id: string;
  page: string;
  section: string;
  content: string;
  updated_at: string;
}
