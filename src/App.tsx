import { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ShopPageEnhanced from './pages/ShopPageEnhanced';
import ContactPage from './pages/ContactPage';
import AdminLogin from './pages/AdminLogin';
import AdminDashboardNew from './pages/AdminDashboardNew';
import OrderModal from './components/OrderModal';
import CartDrawer from './components/CartDrawer';
import { Product } from './lib/supabase';
import { useCart } from './contexts/CartContext';

function AppContent() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const { isAdmin, loading } = useAuth();
  const { items, getTotalPrice, clearCart } = useCart();

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOrder = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleCloseOrderModal = () => {
    setSelectedProduct(null);
  };

  const handleCartCheckout = () => {
    if (items.length === 0) return;
    // Ici, vous pourriez implémenter la commande groupée
    alert(`Commande de ${items.length} produit(s) pour ${getTotalPrice().toLocaleString()} CFA`);
    // Pour l'instant, on vide le panier
    clearCart();
    setCartOpen(false);
  };

  if (currentPage === 'admin') {
    if (loading) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-orange-500 border-t-transparent"></div>
        </div>
      );
    }

    if (isAdmin) {
      return <AdminDashboardNew onLogout={() => setCurrentPage('home')} />;
    }

    return <AdminLogin onLoginSuccess={() => setCurrentPage('admin')} />;
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onCartClick={() => setCartOpen(true)}
      />

      {currentPage === 'home' && <HomePage onNavigate={handleNavigate} />}
      {currentPage === 'about' && <AboutPage />}
      {currentPage === 'shop' && <ShopPageEnhanced onOrder={handleOrder} />}
      {currentPage === 'contact' && <ContactPage />}

      <Footer />

      {selectedProduct && (
        <OrderModal product={selectedProduct} onClose={handleCloseOrderModal} />
      )}

      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        onCheckout={handleCartCheckout}
      />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
