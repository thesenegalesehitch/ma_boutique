// 🛒 /netlify/functions/createProduct.js
import { createClient } from "@supabase/supabase-js";
const supabase4 = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

export async function handler(event) {
  try {
    const body = JSON.parse(event.body);
    const { data, error } = await supabase4.from("products").insert(body).select("*");
    if (error) throw error;
    return { statusCode: 200, body: JSON.stringify(data) };
  } catch (err) {
    return { statusCode: 400, body: JSON.stringify({ error: err.message }) };
  }
}