import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

export interface Category {
  id?: string;
  name: string;
  description?: string;
  created_at?: string;
}

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCategories = async () => {
    const { data, error } = await supabase.from("categories").select("*").order("created_at", { ascending: false });
    if (!error) setCategories(data || []);
    setLoading(false);
  };

  const createCategory = async (category: Category) => {
    await supabase.from("categories").insert(category);
    fetchCategories();
  };

  const updateCategory = async (id: string, updates: Partial<Category>) => {
    await supabase.from("categories").update(updates).eq("id", id);
    fetchCategories();
  };

  const deleteCategory = async (id: string) => {
    await supabase.from("categories").delete().eq("id", id);
    fetchCategories();
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return { categories, loading, createCategory, updateCategory, deleteCategory, fetchCategories };
}
