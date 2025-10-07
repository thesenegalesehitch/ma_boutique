import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

export interface Review {
id?: string;
product_id: string;
author: string;
content: string;
rating: number;
is_approved?: boolean;
created_at?: string;
}

export function useReviews() {
const [reviews, setReviews] = useState<Review[]>([]);
const [loading, setLoading] = useState(false);

const fetchReviews = async () => {
setLoading(true);
const { data, error } = await supabase
.from("reviews")
.select("*")
.order("created_at", { ascending: false });
if (!error && data) setReviews(data);
setLoading(false);
};

const createReview = async (review: Omit<Review, "id" | "created_at">) => {
const { error } = await supabase.from("reviews").insert(review);
if (error) console.error(error);
else await fetchReviews();
};

const updateReview = async (id: string, updates: Partial<Review>) => {
const { error } = await supabase.from("reviews").update(updates).eq("id", id);
if (error) console.error(error);
else await fetchReviews();
};

const deleteReview = async (id: string) => {
const { error } = await supabase.from("reviews").delete().eq("id", id);
if (error) console.error(error);
else await fetchReviews();
};

useEffect(() => {
fetchReviews();
}, []);

return { reviews, loading, createReview, updateReview, deleteReview, fetchReviews };
}
