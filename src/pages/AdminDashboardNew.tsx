import { useState, useEffect } from 'react';
import { LogOut, Package, ShoppingCart, FileText, Star, ArrowLeft } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import CategoryManager from '../components/CategoryManager';
import ProductManager from '../components/ProductManager';
import OrderManager from '../components/OrderManager';
import ReviewManager from '../components/ReviewManager';

interface AdminDashboardNewProps {
  onLogout: () => void;
}

type Tab = 'products' | 'categories' | 'orders' | 'reviews';

export default function AdminDashboardNew({ onLogout }: AdminDashboardNewProps) {
  const { signOut } = useAuth();
  const [activeTab, setActiveTab] = useState<Tab>('products');
  const [stats, setStats] = useState({
    products: 0,
    orders: 0,
    pendingOrders: 0,
    pendingReviews: 0,
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    const [productsRes, ordersRes, pendingOrdersRes, reviewsRes] = await Promise.all([
      supabase.from('products').select('id', { count: 'exact', head: true }),
      supabase.from('orders').select('id', { count: 'exact', head: true }),
      supabase.from('orders').select('id', { count: 'exact', head: true }).eq('status', 'pending'),
      supabase.from('reviews').select('id', { count: 'exact', head: true }).eq('is_approved', false),
    ]);

    setStats({
      products: productsRes.count || 0,
      orders: ordersRes.count || 0,
      pendingOrders: pendingOrdersRes.count || 0,
      pendingReviews: reviewsRes.count || 0,
    });
  };

  const handleLogout = async () => {
    await signOut();
    onLogout();
  };

  const tabs = [
    { id: 'products' as Tab, label: 'Produits', icon: Package, color: 'from-blue-600 to-cyan-600', count: stats.products },
    { id: 'categories' as Tab, label: 'Catégories', icon: FileText, color: 'from-purple-600 to-pink-600' },
    { id: 'orders' as Tab, label: 'Commandes', icon: ShoppingCart, color: 'from-orange-600 to-red-600', count: stats.orders, badge: stats.pendingOrders },
    { id: 'reviews' as Tab, label: 'Avis', icon: Star, color: 'from-yellow-600 to-orange-600', badge: stats.pendingReviews },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header fixe */}
      <div className="fixed top-0 left-0 right-0 z-40 bg-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all"
                title="Retour à l'accueil"
              >
                <ArrowLeft size={20} />
                <span className="hidden md:inline">Retour</span>
              </button>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Tableau de Bord Admin</h1>
                <p className="text-sm text-gray-500">Gérez votre boutique facilement</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-xl hover:from-red-700 hover:to-pink-700 transition-all shadow-lg hover:shadow-xl"
              title="Se déconnecter"
            >
              <LogOut size={20} />
              <span className="hidden md:inline">Déconnexion</span>
            </button>
          </div>
        </div>
      </div>

      {/* Navigation tabs */}
      <div className="fixed top-20 left-0 right-0 z-30 bg-white shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex gap-2 overflow-x-auto py-4 scrollbar-hide">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-3 px-6 py-3 rounded-xl font-semibold transition-all whitespace-nowrap relative ${
                    isActive
                      ? `bg-gradient-to-r ${tab.color} text-white shadow-lg`
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  title={`Gérer les ${tab.label.toLowerCase()}`}
                >
                  <Icon size={20} />
                  <span>{tab.label}</span>
                  {tab.count !== undefined && (
                    <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${
                      isActive ? 'bg-white/30' : 'bg-gray-300'
                    }`}>
                      {tab.count}
                    </span>
                  )}
                  {tab.badge !== undefined && tab.badge > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center animate-pulse">
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="container mx-auto px-4 pt-44 pb-20">
        <div className="animate-fadeIn">
          {activeTab === 'products' && <ProductManager onUpdate={loadStats} />}
          {activeTab === 'categories' && <CategoryManager />}
          {activeTab === 'orders' && <OrderManager onUpdate={loadStats} />}
          {activeTab === 'reviews' && <ReviewManager onUpdate={loadStats} />}
        </div>
      </div>
    </div>
  );
}
