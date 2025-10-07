import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

export interface Product {
  id?: string;
  name: string;
  description?: string;
  price: number;
  stock: number;
  image_url?: string;
  is_featured?: boolean;
  created_at?: string;
}

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    const { data, error } = await supabase.from("products").select("*").order("created_at", { ascending: false });
    if (!error) setProducts(data || []);
    setLoading(false);
  };

  const createProduct = async (product: Product) => {
    await supabase.from("products").insert(product);
    fetchProducts();
  };

  const updateProduct = async (id: string, updates: Partial<Product>) => {
    await supabase.from("products").update(updates).eq("id", id);
    fetchProducts();
  };

  const deleteProduct = async (id: string) => {
    await supabase.from("products").delete().eq("id", id);
    fetchProducts();
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return { products, loading, createProduct, updateProduct, deleteProduct, fetchProducts };
}
