import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
process.env.SUPABASE_URL,
process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async (req, res) => {
const { product_id, author, content, rating } = JSON.parse(req.body);
const { data, error } = await supabase
.from("reviews")
.insert([{ product_id, author, content, rating }]);
if (error) return res.status(400).json({ error: error.message });
return res.status(200).json(data);
};
