import { useEffect, useState } from "react";
import { supabase, Review } from "../lib/supabase";

export function useReviews() {
const [reviews, setReviews] = useState<Review[]>([]);
const [loading, setLoading] = useState(false);

const fetchReviews = async () => {
setLoading(true);
const { data, error } = await supabase
.from("reviews")
.select("*")
.order("created_at", { ascending: false });
if (error) console.error("Erreur chargement reviews :", error.message);
if (data) setReviews(data);
setLoading(false);

};

const createReview = async (review: Omit<Review, "id" | "created_at">) => {
const { error } = await supabase.from("reviews").insert([review]);
if (error) console.error(error.message);
else await fetchReviews();
};

const updateReview = async (id: string, updates: Partial<Review>) => {
const { error } = await supabase.from("reviews").update(updates).eq("id", id);
if (error) console.error(error.message);
else await fetchReviews();
};

const deleteReview = async (id: string) => {
const { error } = await supabase.from("reviews").delete().eq("id", id);
if (error) console.error(error.message);
else await fetchReviews();
};

useEffect(() => {
fetchReviews();
}, []);

return { reviews, loading, fetchReviews, createReview, updateReview, deleteReview };
}
