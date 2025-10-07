import { useEffect, useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { supabase, SiteContent } from '../lib/supabase';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export default function HomePage({ onNavigate }: HomePageProps) {
  const [content, setContent] = useState<{ title: string; subtitle: string }>({
    title: 'Produits authentiques bientôt disponibles',
    subtitle: 'Découvrez notre collection unique de produits sénégalais',
  });
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    loadContent();
    setTimeout(() => setShowContent(true), 100);
  }, []);

  const loadContent = async () => {
    const { data } = await supabase
      .from('site_content')
      .select('*')
      .in('section', ['hero_title', 'hero_subtitle']);

    if (data) {
      const titleContent = data.find((c: SiteContent) => c.section === 'hero_title');
      const subtitleContent = data.find((c: SiteContent) => c.section === 'hero_subtitle');

      setContent({
        title: titleContent?.content || content.title,
        subtitle: subtitleContent?.content || content.subtitle,
      });
    }
  };

  return (
    <div className="min-h-screen">
      <div className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-orange-500 via-orange-600 to-red-600">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00em0wLTEwYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHptMC0xMGMwLTIuMjEtMS43OS00LTQtNHMtNCAxLjc5LTQgNCAxLjc5IDQgNCA0IDQtMS43OSA0LTR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20"></div>

        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className={`relative z-10 text-center px-4 transform transition-all duration-1000 ${
          showContent ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-6 py-2 rounded-full mb-8 animate-bounce">
            <Sparkles className="w-5 h-5 text-yellow-300" />
            <span className="text-white font-semibold">Nouveauté</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            {content.title}
          </h1>

          <p className="text-xl md:text-2xl text-white/90 mb-12 max-w-2xl mx-auto">
            {content.subtitle}
          </p>

          <button
            onClick={() => onNavigate('shop')}
            className="group relative inline-flex items-center gap-3 bg-white text-orange-600 px-8 py-4 rounded-full text-lg font-semibold shadow-2xl hover:shadow-orange-300/50 transition-all duration-300 hover:scale-105 overflow-hidden"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            <span className="relative group-hover:text-white transition-colors duration-300">Découvrir la boutique</span>
            <ArrowRight className="relative w-6 h-6 group-hover:translate-x-2 group-hover:text-white transition-all duration-300" />

            <span className="absolute inset-0 border-4 border-white/50 rounded-full animate-ping opacity-75"></span>
          </button>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-1">
            <div className="w-1.5 h-3 bg-white rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: 'Qualité Garantie', desc: 'Produits authentiques et certifiés', icon: '✨' },
            { title: 'Livraison Rapide', desc: 'Partout à Dakar et en banlieue', icon: '🚚' },
            { title: 'Support 24/7', desc: 'Notre équipe à votre écoute', icon: '💬' },
          ].map((feature, index) => (
            <div
              key={index}
              className="group p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
