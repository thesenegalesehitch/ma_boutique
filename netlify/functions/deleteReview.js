import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
process.env.SUPABASE_URL,
process.env.SUPABASE_SERVICE_ROLE_KEY
);

export default async (req, res) => {
try {
const { id } = JSON.parse(req.body);
const { error } = await supabase.from("reviews").delete().eq("id", id);

```
if (error) throw error;
return res.status(200).json({ message: "Review supprimée avec succès" });
```

} catch (err) {
return res.status(400).json({ error: err.message });
}
};
