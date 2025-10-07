import { useState, useEffect } from 'react';
import { Home, Info, ShoppingBag, Mail, User, ShoppingCart } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  onCartClick: () => void;
}

export default function Navbar({ currentPage, onNavigate, onCartClick }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const { getTotalItems } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Accueil', icon: Home },
    { id: 'about', label: 'À Propos', icon: Info },
    { id: 'shop', label: 'Boutique', icon: ShoppingBag },
    { id: 'contact', label: 'Contact', icon: Mail },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white shadow-lg py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate('home')}>
          <ShoppingBag className={`w-8 h-8 transition-colors ${scrolled ? 'text-orange-600' : 'text-white'}`} />
          <span className={`text-xl font-bold transition-colors ${scrolled ? 'text-gray-800' : 'text-white'}`}>
            Boutique SN
          </span>
        </div>

        <div className="flex items-center gap-8">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`flex items-center gap-2 transition-all duration-300 relative group ${
                  scrolled ? 'text-gray-700' : 'text-white'
                } ${isActive ? 'font-semibold' : ''}`}
              >
                <Icon className="w-5 h-5" />
                <span className="hidden md:inline">{item.label}</span>
                <span
                  className={`absolute -bottom-2 left-0 right-0 h-0.5 bg-orange-600 transition-all duration-300 ${
                    isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`}
                />
              </button>
            );
          })}
          <button
            onClick={onCartClick}
            className={`flex items-center gap-2 transition-all duration-300 relative ${
              scrolled ? 'text-gray-700 hover:text-orange-600' : 'text-white hover:text-orange-300'
            }`}
          >
            <ShoppingCart className="w-5 h-5" />
            {getTotalItems() > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                {getTotalItems()}
              </span>
            )}
          </button>
          <button
            onClick={() => onNavigate('admin')}
            className={`flex items-center gap-2 transition-all duration-300 ${
              scrolled ? 'text-gray-700 hover:text-orange-600' : 'text-white hover:text-orange-300'
            }`}
          >
            <User className="w-5 h-5" />
          </button>
        </div>
      </div>
    </nav>
  );
}
