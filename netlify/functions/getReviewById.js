import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
process.env.SUPABASE_URL,
process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async (req, res) => {
try {
const { id } = req.query;
const { data, error } = await supabase.from("reviews").select("*").eq("id", id).single();

```
if (error) throw error;
return res.status(200).json(data);
```

} catch (err) {
return res.status(400).json({ error: err.message });
}
};
