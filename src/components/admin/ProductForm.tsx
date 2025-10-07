import { useState } from "react";
import { supabase } from "../../lib/supabase";
import { useCategories } from "../../hooks/useCategories";

export default function ProductForm({ onCreated }: { onCreated: () => void }) {
const { categories } = useCategories();
const [name, setName] = useState("");
const [price, setPrice] = useState("");
const [description, setDescription] = useState("");
const [categoryId, setCategoryId] = useState("");

const handleSubmit = async (e: React.FormEvent) => {
e.preventDefault();
const slug = name.toLowerCase().replace(/\s+/g, "-");
const { error } = await supabase.from("products").insert([
{ name, price: Number(price), description, category_id: categoryId, slug },
]);
if (error) alert("Erreur : " + error.message);
else {
setName("");
setPrice("");
setDescription("");
setCategoryId("");
onCreated();
}
};

return ( <form onSubmit={handleSubmit} className="p-4 bg-white shadow rounded mb-4"> <h3 className="font-bold mb-2">Ajouter un produit</h3>
<input
className="border p-2 mr-2 w-1/3"
placeholder="Nom"
value={name}
onChange={(e) => setName(e.target.value)}
required
/>
<input
className="border p-2 mr-2 w-1/4"
placeholder="Prix"
type="number"
value={price}
onChange={(e) => setPrice(e.target.value)}
required
/>
<select
className="border p-2 mr-2"
value={categoryId}
onChange={(e) => setCategoryId(e.target.value)}
required
> <option value="">Catégorie</option>
{categories.map((c) => ( <option key={c.id} value={c.id}>{c.name}</option>
))} </select>
<input
className="border p-2 mr-2 w-1/3"
placeholder="Description"
value={description}
onChange={(e) => setDescription(e.target.value)}
/> <button type="submit" className="bg-blue-500 text-white px-3 py-2 rounded">
Ajouter </button> </form>
);
}
