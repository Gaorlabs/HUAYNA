import React from 'react';
import { useApp } from '../context/AppContext';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { Heart, Sparkles, ArrowRight } from 'lucide-react';

export const FavoritesView: React.FC = () => {
  const { favorites, setActiveTab } = useApp();

  const favoriteProducts = PRODUCTS.filter(p => favorites.includes(p.id));

  return (
    <div className="space-y-4 pb-28">
      {/* Title */}
      <div className="flex items-center justify-between px-1">
        <div>
          <h2 className="text-lg font-bold text-neutral-900 dark:text-white font-display flex items-center gap-2">
            <span>Tus Favoritos Fit</span>
            <Heart className="w-5 h-5 fill-rose-500 text-rose-500" />
          </h2>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            Guarda lo que más te gusta para pedir en un toque
          </p>
        </div>
        <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-rose-50 dark:bg-rose-950/70 text-rose-600 dark:text-rose-300">
          {favoriteProducts.length} {favoriteProducts.length === 1 ? 'guardado' : 'guardados'}
        </span>
      </div>

      {favoriteProducts.length === 0 ? (
        <div className="p-8 text-center bg-white dark:bg-[#071e18] rounded-3xl border border-neutral-200 dark:border-emerald-950 mt-4 space-y-3">
          <div className="w-14 h-14 mx-auto rounded-full bg-rose-50 dark:bg-rose-950/80 text-rose-500 flex items-center justify-center">
            <Heart className="w-7 h-7 stroke-[1.5]" />
          </div>
          <h3 className="font-bold text-base text-neutral-800 dark:text-white">
            Aún no tienes favoritos
          </h3>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 max-w-xs mx-auto">
            Toca el corazón en cualquier producto para guardarlo aquí y tener acceso rápido cada vez que se te antoje algo fit.
          </p>
          <button
            type="button"
            onClick={() => setActiveTab('inicio')}
            className="px-5 py-2.5 rounded-xl bg-emerald-700 text-white text-xs font-bold hover:bg-emerald-800 transition-colors cursor-pointer"
          >
            Ver Menú Saludable
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3">
          {favoriteProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};
