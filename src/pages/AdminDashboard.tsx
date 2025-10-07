import { useState, useEffect } from "react";
import {
  LogOut,
  Package,
  ShoppingCart,
  FileText,
  Plus,
  CreditCard as Edit2,
  Trash2,
  Save,
  X,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { supabase, Product, Order, SiteContent } from "../lib/supabase";

interface AdminDashboardProps {
  onLogout: () => void;
}

export default function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const { signOut } = useAuth();
  const [activeTab, setActiveTab] = useState<"products" | "orders" | "content">(
    "products"
  );
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [siteContent, setSiteContent] = useState<SiteContent[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState<any>({});

  useEffect(() => {
    loadData();
  }, [activeTab]);

  const loadData = async () => {
    try {
      if (activeTab === "products") {
        const { data, error } = await supabase
          .from("products")
          .select("*")
          .order("created_at", { ascending: false });
        if (error) throw error;
        setProducts(data || []);
      } else if (activeTab === "orders") {
        const { data, error } = await supabase
          .from("orders")
          .select("*")
          .order("created_at", { ascending: false });
        if (error) throw error;
        setOrders(data || []);
      } else if (activeTab === "content") {
        const { data, error } = await supabase
          .from("site_content")
          .select("*")
          .order("page");
        if (error) throw error;
        setSiteContent(data || []);
      }
    } catch (err: any) {
      console.error("Erreur chargement :", err.message);
    }
  };

  const handleLogout = async () => {
    await signOut();
    onLogout();
  };

  const handleDelete = async (id: string, table: string) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer cet élément ?")) {
      const { error } = await supabase.from(table).delete().eq("id", id);
      if (error) {
        console.error("Erreur suppression :", error.message);
        alert("Erreur : " + error.message);
      } else {
        loadData();
      }
    }
  };

  const handleSaveProduct = async () => {
    const productData = {
      name: formData.name?.trim() || null,
      description: formData.description?.trim() || null,
      price: formData.price ? parseFloat(formData.price) : 0,
      image_url: formData.image_url?.trim() || null,
      stock: formData.stock ? parseInt(formData.stock) : 0,
      is_featured: !!formData.is_featured,
    };

    try {
      let response;

      if (editingId) {
        response = await supabase
          .from("products")
          .update(productData)
          .eq("id", editingId)
          .select();
      } else {
        response = await supabase.from("products").insert([productData]).select();
      }

      const { error } = response;
      if (error) throw error;

      setEditingId(null);
      setShowAddForm(false);
      setFormData({});
      await loadData();
      alert("Produit enregistré avec succès !");
    } catch (err: any) {
      console.error("Erreur insertion produit :", err.message);
      alert("Erreur lors de l'enregistrement : " + err.message);
    }
  };

  const handleUpdateOrderStatus = async (id: string, status: string) => {
    const { error } = await supabase.from("orders").update({ status }).eq("id", id);
    if (error) console.error("Erreur maj commande :", error.message);
    else loadData();
  };

  const handleSaveContent = async (id: string) => {
    const { error } = await supabase
      .from("site_content")
      .update({ content: formData.content })
      .eq("id", id);
    if (error) console.error("Erreur mise à jour contenu :", error.message);
    else {
      setEditingId(null);
      setFormData({});
      loadData();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-gray-800">
              Tableau de bord Admin
            </h1>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-6 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              Déconnexion
            </button>
          </div>
        </div>

        <div className="flex gap-4 mb-8 overflow-x-auto">
          {[
            { id: "products", label: "Produits", icon: Package },
            { id: "orders", label: "Commandes", icon: ShoppingCart },
            { id: "content", label: "Contenu du site", icon: FileText },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? "bg-orange-500 text-white shadow-lg"
                    : "bg-white text-gray-600 hover:bg-gray-100"
                }`}
              >
                <Icon className="w-5 h-5" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {activeTab === "products" && (
          <div>
            <div className="flex justify-end mb-6">
              <button
                onClick={() => {
                  setShowAddForm(true);
                  setFormData({});
                }}
                className="flex items-center gap-2 px-6 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors"
              >
                <Plus className="w-5 h-5" />
                Ajouter un produit
              </button>
            </div>

            {(showAddForm || editingId) && (
              <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
                <h3 className="text-xl font-bold mb-4">
                  {editingId ? "Modifier le produit" : "Nouveau produit"}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Nom du produit"
                    value={formData.name || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="px-4 py-2 border rounded-lg"
                  />
                  <input
                    type="number"
                    placeholder="Prix (CFA)"
                    value={formData.price || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                    className="px-4 py-2 border rounded-lg"
                  />
                  <input
                    type="text"
                    placeholder="URL de l'image"
                    value={formData.image_url || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, image_url: e.target.value })
                    }
                    className="px-4 py-2 border rounded-lg"
                  />
                  <input
                    type="number"
                    placeholder="Stock"
                    value={formData.stock || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, stock: e.target.value })
                    }
                    className="px-4 py-2 border rounded-lg"
                  />
                  <textarea
                    placeholder="Description"
                    value={formData.description || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    className="px-4 py-2 border rounded-lg md:col-span-2"
                    rows={3}
                  />
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.is_featured || false}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          is_featured: e.target.checked,
                        })
                      }
                      className="w-5 h-5"
                    />
                    <span>Produit en vedette</span>
                  </label>
                </div>
                <div className="flex gap-3 mt-4">
                  <button
                    onClick={handleSaveProduct}
                    className="flex items-center gap-2 px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                  >
                    <Save className="w-5 h-5" />
                    Enregistrer
                  </button>
                  <button
                    onClick={() => {
                      setEditingId(null);
                      setShowAddForm(false);
                      setFormData({});
                    }}
                    className="flex items-center gap-2 px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                  >
                    <X className="w-5 h-5" />
                    Annuler
                  </button>
                </div>
              </div>
            )}

            <div className="grid grid-cols-1 gap-4">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="bg-white rounded-xl shadow p-6 flex items-center gap-6"
                >
                  <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    {product.image_url ? (
                      <img
                        src={product.image_url}
                        alt={product.name}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      <Package className="w-12 h-12 text-gray-400" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-800">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {product.description}
                    </p>
                    <div className="flex gap-4 mt-2">
                      <span className="text-orange-600 font-bold">
                        {product.price.toLocaleString()} CFA
                      </span>
                      <span className="text-gray-500">
                        Stock: {product.stock}
                      </span>
                      {product.is_featured && (
                        <span className="text-green-600 font-semibold">
                          ⭐ En vedette
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setEditingId(product.id);
                        setFormData(product);
                        setShowAddForm(false);
                      }}
                      className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                      <Edit2 className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(product.id, "products")}
                      className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "orders" && (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="bg-white rounded-xl shadow p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">
                      {order.customer_name}
                    </h3>
                    <p className="text-gray-600">{order.customer_email}</p>
                    <p className="text-gray-600">{order.customer_phone}</p>
                  </div>
                  <select
                    value={order.status}
                    onChange={(e) =>
                      handleUpdateOrderStatus(order.id, e.target.value)
                    }
                    className={`px-4 py-2 rounded-lg font-semibold ${
                      order.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : order.status === "confirmed"
                        ? "bg-blue-100 text-blue-800"
                        : order.status === "completed"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    <option value="pending">En attente</option>
                    <option value="confirmed">Confirmée</option>
                    <option value="completed">Complétée</option>
                    <option value="cancelled">Annulée</option>
                  </select>
                </div>
                <div className="border-t pt-4">
                  <p className="text-gray-700">
                    <strong>Produit:</strong> {order.product_name}
                  </p>
                  <p className="text-gray-700">
                    <strong>Quantité:</strong> {order.quantity}
                  </p>
                  <p className="text-orange-600 font-bold text-lg mt-2">
                    Total: {order.total_amount.toLocaleString()} CFA
                  </p>
                  <p className="text-gray-500 text-sm mt-2">
                    {new Date(order.created_at).toLocaleString("fr-FR")}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "content" && (
          <div className="space-y-4">
            {siteContent.map((content) => (
              <div key={content.id} className="bg-white rounded-xl shadow p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-bold text-gray-800 capitalize">
                      {content.page}
                    </h3>
                    <p className="text-gray-600 text-sm">{content.section}</p>
                  </div>
                  {editingId === content.id ? (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleSaveContent(content.id)}
                        className="p-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                      >
                        <Save className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => {
                          setEditingId(null);
                          setFormData({});
                        }}
                        className="p-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => {
                        setEditingId(content.id);
                        setFormData({ content: content.content });
                      }}
                      className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                      <Edit2 className="w-5 h-5" />
                    </button>
                  )}
                </div>
                {editingId === content.id ? (
                  <textarea
                    value={formData.content}
                    onChange={(e) =>
                      setFormData({ ...formData, content: e.target.value })
                    }
                    className="w-full px-4 py-2 border rounded-lg"
                    rows={4}
                  />
                ) : (
                  <p className="text-gray-700">{content.content}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

