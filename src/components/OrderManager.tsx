import { useState, useEffect } from 'react';
import { ShoppingCart, Check, X, Package } from 'lucide-react';
import { supabase, Order } from '../lib/supabase';

interface OrderManagerProps {
  onUpdate: () => void;
}

export default function OrderManager({ onUpdate }: OrderManagerProps) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filter, setFilter] = useState<'all' | 'pending' | 'confirmed' | 'completed' | 'cancelled'>('all');

  useEffect(() => {
    loadOrders();
  }, [filter]);

  const loadOrders = async () => {
    let query = supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (filter !== 'all') {
      query = query.eq('status', filter);
    }

    const { data } = await query;
    if (data) setOrders(data);
  };

  const handleUpdateStatus = async (id: string, status: Order['status']) => {
    const order = orders.find(o => o.id === id);
    if (!order) return;

    if (status === 'confirmed' && order.status === 'pending') {
      const { data: product } = await supabase
        .from('products')
        .select('stock')
        .eq('id', order.product_id)
        .single();

      if (product && product.stock >= order.quantity) {
        await supabase
          .from('products')
          .update({ stock: product.stock - order.quantity })
          .eq('id', order.product_id);
      } else {
        alert('Stock insuffisant pour cette commande');
        return;
      }
    }

    const { error } = await supabase
      .from('orders')
      .update({ status })
      .eq('id', id);

    if (!error) {
      loadOrders();
      onUpdate();
    }
  };

  const getStatusColor = (status: Order['status']) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-700',
      confirmed: 'bg-blue-100 text-blue-700',
      completed: 'bg-green-100 text-green-700',
      cancelled: 'bg-red-100 text-red-700',
    };
    return colors[status];
  };

  const getStatusLabel = (status: Order['status']) => {
    const labels = {
      pending: 'En attente',
      confirmed: 'Confirmée',
      completed: 'Terminée',
      cancelled: 'Annulée',
    };
    return labels[status];
  };

  const filteredCount = {
    all: orders.length,
    pending: orders.filter(o => o.status === 'pending').length,
    confirmed: orders.filter(o => o.status === 'confirmed').length,
    completed: orders.filter(o => o.status === 'completed').length,
    cancelled: orders.filter(o => o.status === 'cancelled').length,
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center">
            <ShoppingCart className="text-white" size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Commandes</h2>
            <p className="text-sm text-gray-500">{orders.length} commande(s)</p>
          </div>
        </div>
      </div>

      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {(['all', 'pending', 'confirmed', 'completed', 'cancelled'] as const).map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap transition-all ${
              filter === status
                ? 'bg-gradient-to-r from-orange-600 to-red-600 text-white shadow-lg'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            title={`Filtrer les commandes ${status === 'all' ? 'toutes' : getStatusLabel(status).toLowerCase()}`}
          >
            {status === 'all' ? 'Toutes' : getStatusLabel(status)}
            <span className="ml-2 px-2 py-0.5 bg-white/30 rounded-full text-xs">
              {filteredCount[status]}
            </span>
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {orders.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-xl">
            <ShoppingCart size={64} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500 text-lg">Aucune commande</p>
            <p className="text-gray-400 text-sm">Les commandes apparaîtront ici</p>
          </div>
        ) : (
          orders.map((order) => (
            <div
              key={order.id}
              className="bg-gradient-to-br from-white to-orange-50 p-6 rounded-xl border-2 border-orange-100 hover:border-orange-300 transition-all hover:shadow-lg"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-bold text-gray-800 text-lg">{order.customer_name}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${getStatusColor(order.status)}`}>
                      {getStatusLabel(order.status)}
                    </span>
                  </div>
                  <div className="space-y-1 text-sm text-gray-600">
                    <p><strong>Produit:</strong> {order.product_name}</p>
                    <p><strong>Quantité:</strong> {order.quantity}</p>
                    <p><strong>Email:</strong> {order.customer_email}</p>
                    <p><strong>Téléphone:</strong> {order.customer_phone}</p>
                    <p><strong>Total:</strong> <span className="font-bold text-orange-600">{order.total_amount.toLocaleString()} CFA</span></p>
                    <p className="text-xs text-gray-400">
                      {new Date(order.created_at).toLocaleString('fr-FR')}
                    </p>
                  </div>
                </div>

                {order.status === 'pending' && (
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => handleUpdateStatus(order.id, 'confirmed')}
                      className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all shadow-lg"
                      title="Confirmer la commande (décrémente le stock)"
                    >
                      <Check size={16} />
                      Confirmer
                    </button>
                    <button
                      onClick={() => handleUpdateStatus(order.id, 'cancelled')}
                      className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-lg hover:from-red-700 hover:to-pink-700 transition-all shadow-lg"
                      title="Annuler la commande"
                    >
                      <X size={16} />
                      Annuler
                    </button>
                  </div>
                )}

                {order.status === 'confirmed' && (
                  <button
                    onClick={() => handleUpdateStatus(order.id, 'completed')}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:from-blue-700 hover:to-cyan-700 transition-all shadow-lg"
                    title="Marquer comme terminée"
                  >
                    <Package size={16} />
                    Terminer
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
