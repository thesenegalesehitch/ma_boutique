import { useCategories } from "../../hooks/useCategories";
import { useState } from "react";
import { Save, X, Edit2, Trash2, Plus } from "lucide-react";

export default function CategoryForm() {
  const { categories, createCategory, updateCategory, deleteCategory } = useCategories();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<any>({});

  const handleSave = async () => {
    if (editingId) await updateCategory(editingId, form);
    else await createCategory(form);
    setEditingId(null);
    setForm({});
  };

  return (
    <div>
      <div className="flex justify-between mb-6">
        <h2 className="text-2xl font-bold">Catégories</h2>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          onClick={() => setEditingId("new")}
        >
          <Plus className="w-5 h-5" /> Nouvelle catégorie
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
        {categories.map((cat) => (
          <div key={cat.id} className="bg-white p-4 rounded-lg shadow flex justify-between items-center">
            <div>
              <h3 className="text-lg font-bold">{cat.name}</h3>
              <p>{cat.description}</p>
            </div>
            <div className="flex gap-2">
              <button
                className="bg-blue-500 text-white p-2 rounded"
                onClick={() => {
                  setEditingId(cat.id!);
                  setForm(cat);
                }}
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                className="bg-red-500 text-white p-2 rounded"
                onClick={() => deleteCategory(cat.id!)}
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