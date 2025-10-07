import { useEffect, useState } from 'react';
import { Heart, Award, Users } from 'lucide-react';
import { supabase, SiteContent } from '../lib/supabase';

export default function AboutPage() {
  const [content, setContent] = useState<{ title: string; content: string }>({
    title: 'À Propos de Notre Boutique',
    content: 'Nous sommes une boutique en ligne basée à Dakar, Sénégal, dédiée à offrir des produits authentiques et de qualité.',
  });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    loadContent();
    setTimeout(() => setVisible(true), 100);
  }, []);

  const loadContent = async () => {
    const { data } = await supabase
      .from('site_content')
      .select('*')
      .eq('page', 'about');

    if (data && data.length > 0) {
      const titleContent = data.find((c: SiteContent) => c.section === 'title');
      const textContent = data.find((c: SiteContent) => c.section === 'content');

      setContent({
        title: titleContent?.content || content.title,
        content: textContent?.content || content.content,
      });
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-4">
        <div className={`max-w-4xl mx-auto transition-all duration-1000 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-gray-800 mb-6 relative inline-block">
              {content.title}
              <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 to-orange-600 transform origin-left animate-[slideIn_0.8s_ease-out]"></span>
            </h1>
          </div>

          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden mb-16">
            <div className="h-64 bg-gradient-to-br from-orange-400 to-orange-600 relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00em0wLTEwYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHptMC0xMGMwLTIuMjEtMS43OS00LTQtNHMtNCAxLjc5LTQgNCAxLjc5IDQgNCA0IDQtMS43OSA0LTR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Heart className="w-32 h-32 text-white/30 animate-pulse" />
              </div>
            </div>

            <div className="p-12">
              <p className="text-lg text-gray-700 leading-relaxed mb-8">
                {content.content.split('. ').map((sentence, index) => (
                  <span
                    key={index}
                    className="inline-block mr-1 animate-[fadeIn_0.8s_ease-out]"
                    style={{ animationDelay: `${index * 0.2}s`, animationFillMode: 'backwards' }}
                  >
                    {sentence}{index < content.content.split('. ').length - 1 ? '. ' : ''}
                  </span>
                ))}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Award,
                title: 'Excellence',
                desc: 'Produits de qualité supérieure sélectionnés avec soin',
                color: 'text-orange-500',
                bg: 'bg-orange-50'
              },
              {
                icon: Users,
                title: 'Communauté',
                desc: 'Une famille de clients satisfaits qui nous fait confiance',
                color: 'text-green-500',
                bg: 'bg-green-50'
              },
              {
                icon: Heart,
                title: 'Passion',
                desc: 'L\'amour du travail bien fait et du service client',
                color: 'text-red-500',
                bg: 'bg-red-50'
              }
            ].map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className={`p-8 rounded-2xl ${item.bg} transform hover:scale-105 transition-all duration-300 hover:shadow-xl`}
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <Icon className={`w-12 h-12 ${item.color} mb-4`} />
                  <h3 className="text-xl font-bold text-gray-800 mb-3">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
