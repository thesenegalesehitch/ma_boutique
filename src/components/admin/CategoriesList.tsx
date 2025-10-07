import { useCategories } from "../../hooks/useCategories";
import { Edit2, Trash2 } from "lucide-react";
import { useState } from "react";

export default function CategoriesList() {
  const { categories, deleteCategory, updateCategory } = useCategories();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<any>({});

  const handleEdit = (cat: any) => {
    setEditingId(cat.id);
    setEditForm(cat);
  };

  const handleSave = async () => {
    if (editingId) {
      await updateCategory(editingId, editForm);
      setEditingId(null);
      setEditForm({});
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditForm({});
  };

  if (!categories.length)
    return (
      <p className="text-gray-500 italic">
        Aucune catégorie trouvée. Ajoute-en une nouvelle.
      </p>
    );

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Liste des catégories</h2>
      <ul className="space-y-3">
        {categories.map((cat) => (
          <li
            key={cat.id}
            className="flex justify-between items-center border-b pb-2"
          >
            {editingId === cat.id ? (
              <div className="flex-1 mr-4">
                <input
                  type="text"
                  className="border p-2 rounded w-full mb-1"
                  value={editForm.name || ""}
                  onChange={(e) =>
                    setEditForm({ ...editForm, name: e.target.value })
                  }
                />
                <textarea
                  className="border p-2 rounded w-full"
                  value={editForm.description || ""}
                  onChange={(e) =>
                    setEditForm({ ...editForm, description: e.target.value })
                  }
                />
                <div className="flex gap-2 mt-2">
                  <button
                    onClick={handleSave}
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                  >
                    Sauvegarder
                  </button>
                  <button
                    onClick={handleCancel}
                    className="bg-gray-500 text-white px-3 py-1 rounded"
                  >
                    Annuler
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex justify-between w-full items-center">
                <div>
                  <p className="font-semibold">{cat.name}</p>
                  <p className="text-sm text-gray-600">{cat.description}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    className="bg-blue-500 text-white p-2 rounded"
                    onClick={() => handleEdit(cat)}
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
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
