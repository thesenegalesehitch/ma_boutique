// 🗑️ /netlify/functions/deleteCategory.js
import { createClient } from "@supabase/supabase-js";
const supabase3 = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

export async function handler(event) {
  try {
    const { id } = JSON.parse(event.body);
    const { data, error } = await supabase3.from("categories").delete().eq("id", id);
    if (error) throw error;
    return { statusCode: 200, body: JSON.stringify(data) };
  } catch (err) {
    return { statusCode: 400, body: JSON.stringify({ error: err.message }) };
  }
}