import React from 'react';
import { useApp } from '../context/AppContext';
import { PRODUCTS, CATEGORIES, BUSINESS_INFO } from '../data/products';
import { PromotionsSlider } from '../components/PromotionsSlider';
import { ProductCard } from '../components/ProductCard';
import { CategoryVisual } from '../components/CategoryVisual';
import { 
  Sparkles, 
  MapPin, 
  Clock, 
  Phone, 
  ArrowRight, 
  ChevronRight,
  ShieldCheck,
  Zap
} from 'lucide-react';

export const HomeView: React.FC = () => {
  const { setSelectedCategory, setActiveTab } = useApp();

  const featuredProducts = PRODUCTS.filter(p => p.popular);

  const handleSelectCategory = (catId: string) => {
    setSelectedCategory(catId);
    setActiveTab('explorar');
  };

  return (
    <div className="space-y-6 pb-28">
      {/* 1. Promotions Hero Slider */}
      <section className="pt-2">
        <PromotionsSlider />
      </section>

      {/* 2. Visual Categories with Real Images (Interactive & Photo-First) */}
      <section>
        <div className="flex items-center justify-between mb-3 px-1">
          <div>
            <h3 className="font-extrabold text-base text-neutral-900 dark:text-neutral-100 flex items-center gap-1.5">
              <span>Categorías del Menú</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-amber-400">
                100% Saludable
              </span>
            </h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              Toca una categoría para ver sus opciones
            </p>
          </div>

          <button
            onClick={() => {
              setSelectedCategory('all');
              setActiveTab('explorar');
            }}
            className="text-xs font-bold text-emerald-700 dark:text-amber-400 hover:underline flex items-center gap-0.5 cursor-pointer"
          >
            <span>Ver todo</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Swipeable Horizontal Visual Cards on Mobile, Responsive Grid on Tablet/Desktop */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {CATEGORIES.filter(c => c.id !== 'all').map(cat => (
            <CategoryVisual
              key={cat.id}
              categoryId={cat.id}
              size="card"
              onClick={() => handleSelectCategory(cat.id)}
            />
          ))}
        </div>
      </section>

      {/* 3. Featured Products "Los Más Pedidos en Tacna" */}
      <section>
        <div className="flex items-center justify-between mb-3 px-1">
          <div>
            <h3 className="font-extrabold text-base text-neutral-900 dark:text-white flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-500 fill-amber-400" />
              <span>Los Más Pedidos en Tacna</span>
            </h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              Favoritos de nuestros clientes saludables
            </p>
          </div>

          <button
            onClick={() => {
              setSelectedCategory('all');
              setActiveTab('explorar');
            }}
            className="text-xs font-bold text-emerald-700 dark:text-amber-400 hover:underline flex items-center gap-0.5 cursor-pointer"
          >
            <span>Ver menú completo</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {featuredProducts.slice(0, 4).map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 4. Local Tacna Trust & Direct Delivery Banner */}
      <section className="bg-gradient-to-br from-emerald-900 via-emerald-950 to-neutral-950 text-white rounded-3xl p-4.5 shadow-md relative overflow-hidden">
        {/* Glow accent */}
        <div className="absolute top-0 right-0 w-36 h-36 bg-amber-400/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black uppercase tracking-wider text-amber-400 px-2.5 py-0.5 rounded-full bg-amber-400/15 border border-amber-400/30">
              Delivery Directo en Tacna
            </span>
            <div className="flex items-center gap-1 text-xs text-emerald-300">
              <Zap className="w-3.5 h-3.5 fill-current" />
              <span className="font-bold">25-45 min</span>
            </div>
          </div>

          <div>
            <h4 className="font-extrabold text-base leading-snug">
              ¿Listo para comer rico y saludable hoy?
            </h4>
            <p className="text-xs text-neutral-300 mt-1 leading-relaxed">
              Pide directo a nuestro WhatsApp corporativo con pago por Yape o BCP. Delivery a todos los distritos de Tacna.
            </p>
          </div>

          <div className="pt-2 border-t border-white/10 grid grid-cols-2 gap-2 text-[11px] text-neutral-300">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span className="truncate">Av. Varela 409, Tacna</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>Lun - Sáb: 8am - 9:30pm</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
