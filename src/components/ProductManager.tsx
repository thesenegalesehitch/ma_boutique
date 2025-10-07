import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, Package, X, Check } from 'lucide-react';
import { supabase, Product } from '../lib/supabase';
import ImageUploader from './ImageUploader';

interface ProductManagerProps {
  onUpdate: () => void;
}

interface Category {
  id: string;
  name: string;
}

export default function ProductManager({ onUpdate }: ProductManagerProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    category_id: '',
    images: [] as string[],
    is_featured: false,
    discount_percentage: '',
    original_price: '',
  });

  useEffect(() => {
    loadProducts();
    loadCategories();
  }, []);

  const loadProducts = async () => {
    const { data } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });
    if (data) setProducts(data);
  };

  const loadCategories = async () => {
    const { data } = await supabase
      .from('categories')
      .select('id, name')
      .order('name');
    if (data) setCategories(data);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const productData = {
      name: formData.name,
      description: formData.description,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock) || 0,
      category_id: formData.category_id || null,
      image_url: formData.images[0] || '',
      is_featured: formData.is_featured,
      discount_percentage: formData.discount_percentage ? parseInt(formData.discount_percentage) : 0,
      original_price: formData.original_price ? parseFloat(formData.original_price) : null,
    };

    if (editingId) {
      const { error } = await supabase
        .from('products')
        .update(productData)
        .eq('id', editingId);
      if (!error) {
        if (formData.images.length > 0) {
          await supabase.from('product_images').delete().eq('product_id', editingId);
          const imageData = formData.images.map((url, index) => ({
            product_id: editingId,
            image_url: url,
            display_order: index,
            is_primary: index === 0,
          }));
          await supabase.from('product_images').insert(imageData);
        }
        alert('Produit modifié avec succès');
        setEditingId(null);
      }
    } else {
      const { data, error } = await supabase
        .from('products')
        .insert(productData)
        .select()
        .single();

      if (!error && data && formData.images.length > 0) {
        const imageData = formData.images.map((url, index) => ({
          product_id: data.id,
          image_url: url,
          display_order: index,
          is_primary: index === 0,
        }));
        await supabase.from('product_images').insert(imageData);
        alert('Produit créé avec succès');
      }
    }

    resetForm();
    setLoading(false);
    loadProducts();
    onUpdate();
  };

  const handleEdit = async (product: Product) => {
    const { data: images } = await supabase
      .from('product_images')
      .select('image_url')
      .eq('product_id', product.id)
      .order('display_order');

    setFormData({
      name: product.name,
      description: product.description || '',
      price: product.price.toString(),
      stock: product.stock?.toString() || '0',
      category_id: product.category_id || '',
      images: images?.map(img => img.image_url) || (product.image_url ? [product.image_url] : []),
      is_featured: product.is_featured || false,
      discount_percentage: product.discount_percentage?.toString() || '',
      original_price: product.original_price?.toString() || '',
    });
    setEditingId(product.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Supprimer ce produit ? Cette action est irréversible.')) return;

    const { error } = await supabase.from('products').delete().eq('id', id);
    if (!error) {
      alert('Produit supprimé');
      loadProducts();
      onUpdate();
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      stock: '',
      category_id: '',
      images: [],
      is_featured: false,
      discount_percentage: '',
      original_price: '',
    });
    setShowForm(false);
    setEditingId(null);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center">
            <Package className="text-white" size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Produits</h2>
            <p className="text-sm text-gray-500">{products.length} produit(s)</p>
          </div>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all shadow-lg hover:shadow-xl"
          title={showForm ? 'Annuler' : 'Ajouter un produit'}
        >
          {showForm ? <X size={20} /> : <Plus size={20} />}
          {showForm ? 'Annuler' : 'Nouveau Produit'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-xl mb-6 space-y-4 border-2 border-blue-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Nom du produit *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 border-2 border-blue-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
                placeholder="Ex: Robe traditionnelle"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Catégorie
              </label>
              <select
                value={formData.category_id}
                onChange={(e) => setFormData({ ...formData, category_id: e.target.value })}
                className="w-full px-4 py-3 border-2 border-blue-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
              >
                <option value="">Aucune catégorie</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
              className="w-full px-4 py-3 border-2 border-blue-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
              placeholder="Décrivez votre produit..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Prix (CFA) *
              </label>
              <input
                type="number"
                required
                min="0"
                step="1"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full px-4 py-3 border-2 border-blue-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
                placeholder="25000"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Stock disponible *
              </label>
              <input
                type="number"
                required
                min="0"
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                className="w-full px-4 py-3 border-2 border-blue-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
                placeholder="10"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Réduction (%)
              </label>
              <input
                type="number"
                min="0"
                max="100"
                value={formData.discount_percentage}
                onChange={(e) => {
                  const discount = parseInt(e.target.value) || 0;
                  const price = parseFloat(formData.price) || 0;
                  setFormData({
                    ...formData,
                    discount_percentage: e.target.value,
                    original_price: discount > 0 ? price.toString() : '',
                  });
                }}
                className="w-full px-4 py-3 border-2 border-blue-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all outline-none"
                placeholder="0"
              />
            </div>
          </div>

          <ImageUploader
            images={formData.images}
            onChange={(images) => setFormData({ ...formData, images })}
            maxImages={5}
          />

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="is_featured"
              checked={formData.is_featured}
              onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
              className="w-5 h-5 text-blue-600 border-2 border-blue-300 rounded focus:ring-2 focus:ring-blue-200"
            />
            <label htmlFor="is_featured" className="text-sm font-semibold text-gray-700 cursor-pointer">
              Produit en vedette (affiché en priorité)
            </label>
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all font-semibold disabled:opacity-50 shadow-lg"
              title={loading ? 'Enregistrement en cours...' : 'Enregistrer le produit'}
            >
              <Check size={20} />
              {loading ? 'Enregistrement...' : editingId ? 'Modifier' : 'Créer'}
            </button>
            <button
              type="button"
              onClick={resetForm}
              className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all font-semibold"
              title="Annuler"
            >
              Annuler
            </button>
          </div>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.length === 0 ? (
          <div className="col-span-full text-center py-12 bg-gray-50 rounded-xl">
            <Package size={64} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500 text-lg">Aucun produit</p>
            <p className="text-gray-400 text-sm">Créez votre premier produit pour commencer</p>
          </div>
        ) : (
          products.map((product) => (
            <div
              key={product.id}
              className="bg-gradient-to-br from-white to-blue-50 rounded-xl border-2 border-blue-100 hover:border-blue-300 transition-all hover:shadow-xl group overflow-hidden"
            >
              {product.image_url && (
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-5">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-bold text-gray-800 text-lg flex-1">{product.name}</h3>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handleEdit(product)}
                      className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                      title="Modifier ce produit"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                      title="Supprimer ce produit"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
                {product.description && (
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
                )}
                <div className="flex items-center justify-between text-sm">
                  <span className="font-bold text-blue-600 text-lg">
                    {product.price.toLocaleString()} CFA
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                    (product.stock || 0) > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    Stock: {product.stock || 0}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
