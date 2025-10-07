import { useState, useEffect } from 'react';
import { Star, Check, Trash2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Review {
  id: string;
  product_id: string;
  customer_name: string;
  customer_email: string;
  rating: number;
  comment: string;
  is_approved: boolean;
  created_at: string;
}

interface ReviewManagerProps {
  onUpdate: () => void;
}

export default function ReviewManager({ onUpdate }: ReviewManagerProps) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [filter, setFilter] = useState<'pending' | 'approved'>('pending');

  useEffect(() => {
    loadReviews();
  }, [filter]);

  const loadReviews = async () => {
    const { data } = await supabase
      .from('reviews')
      .select('*')
      .eq('is_approved', filter === 'approved')
      .order('created_at', { ascending: false });

    if (data) setReviews(data);
  };

  const handleApprove = async (id: string) => {
    const { error } = await supabase
      .from('reviews')
      .update({ is_approved: true })
      .eq('id', id);

    if (!error) {
      loadReviews();
      onUpdate();
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Supprimer cet avis ?')) return;

    const { error } = await supabase
      .from('reviews')
      .delete()
      .eq('id', id);

    if (!error) {
      loadReviews();
      onUpdate();
    }
  };

  const StarRating = ({ rating }: { rating: number }) => (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={16}
          className={star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
        />
      ))}
    </div>
  );

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-xl flex items-center justify-center">
            <Star className="text-white" size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Avis Clients</h2>
            <p className="text-sm text-gray-500">{reviews.length} avis</p>
          </div>
        </div>
      </div>

      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setFilter('pending')}
          className={`px-6 py-3 rounded-lg font-semibold transition-all ${
            filter === 'pending'
              ? 'bg-gradient-to-r from-yellow-600 to-orange-600 text-white shadow-lg'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
          title="Avis en attente de modération"
        >
          En attente
        </button>
        <button
          onClick={() => setFilter('approved')}
          className={`px-6 py-3 rounded-lg font-semibold transition-all ${
            filter === 'approved'
              ? 'bg-gradient-to-r from-yellow-600 to-orange-600 text-white shadow-lg'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
          title="Avis approuvés et visibles"
        >
          Approuvés
        </button>
      </div>

      <div className="space-y-4">
        {reviews.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-xl">
            <Star size={64} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500 text-lg">Aucun avis</p>
            <p className="text-gray-400 text-sm">
              {filter === 'pending'
                ? 'Les avis en attente apparaîtront ici'
                : 'Les avis approuvés apparaîtront ici'}
            </p>
          </div>
        ) : (
          reviews.map((review) => (
            <div
              key={review.id}
              className="bg-gradient-to-br from-white to-yellow-50 p-6 rounded-xl border-2 border-yellow-100 hover:border-yellow-300 transition-all hover:shadow-lg"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-bold text-gray-800">{review.customer_name}</h3>
                    <StarRating rating={review.rating} />
                  </div>
                  <p className="text-sm text-gray-500 mb-3">{review.customer_email}</p>
                  <p className="text-gray-700">{review.comment}</p>
                  <p className="text-xs text-gray-400 mt-2">
                    {new Date(review.created_at).toLocaleString('fr-FR')}
                  </p>
                </div>
                <div className="flex gap-2">
                  {!review.is_approved && (
                    <button
                      onClick={() => handleApprove(review.id)}
                      className="p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-colors"
                      title="Approuver cet avis"
                    >
                      <Check size={20} />
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(review.id)}
                    className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                    title="Supprimer cet avis"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
