import { useProducts } from "../../hooks/useProducts";
import { useState } from "react";
import { Edit2, Trash2, Plus, Save, X } from "lucide-react";

export default function ProductsList() {
  const { products, createProduct, updateProduct, deleteProduct } = useProducts();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<any>({});

  const handleSave = async () => {
    if (editingId) await updateProduct(editingId, form);
    else await createProduct(form);
    setEditingId(null);
    setForm({});
  };

  return (
    <div>
      <div className="flex justify-between mb-6">
        <h2 className="text-2xl font-bold">Produits</h2>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          onClick={() => setEditingId("new")}
        >
          <Plus className="w-5 h-5" /> Nouveau produit
        </button>
      </div>

      {editingId && (
        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <input
            type="text"
            placeholder="Nom"
            className="border p-2 rounded w-full mb-2"
            value={form.name || ""}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <input
            type="number"
            placeholder="Prix"
            className="border p-2 rounded w-full mb-2"
            value={form.price || ""}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
          />
          <textarea
            placeholder="Description"
            className="border p-2 rounded w-full mb-2"
            value={form.description || ""}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
          <div className="flex gap-2">
            <button onClick={handleSave} className="bg-blue-500 text-white px-4 py-2 rounded flex gap-1">
              <Save className="w-4 h-4" /> Enregistrer
            </button>
            <button
              onClick={() => {
                setEditingId(null);
                setForm({});
              }}
              className="bg-gray-500 text-white px-4 py-2 rounded flex gap-1"
            >
              <X className="w-4 h-4" /> Annuler
            </button>
          </div>
        </div>
      )}

      <div className="grid gap-4">
        {products.map((p) => (
          <div key={p.id} className="bg-white p-4 rounded-lg shadow flex justify-between items-center">
            <div>
              <h3 className="text-lg font-bold">{p.name}</h3>
              <p>{p.description}</p>
              <span className="text-orange-600 font-semibold">{p.price} CFA</span>
            </div>
            <div className="flex gap-2">
              <button
                className="bg-blue-500 text-white p-2 rounded"
                onClick={() => {
                  setEditingId(p.id!);
                  setForm(p);
                }}
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                className="bg-red-500 text-white p-2 rounded"
                onClick={() => deleteProduct(p.id!)}
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
