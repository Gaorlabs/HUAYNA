import React, { useState } from 'react';
import { Product } from '../types';
import { Sparkles, Heart } from 'lucide-react';

interface ProductVisualProps {
  product: Product;
  aspect?: 'square' | 'wide' | 'tall';
  className?: string;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
}

// Curated high quality food photography matching each HUAYNA menu item
const PRODUCT_PHOTO_MAP: Record<string, string> = {
  'panc-banana': 'https://images.unsplash.com/photo-1528207776546-365bb710ee93?auto=format&fit=crop&w=600&q=80',
  'panc-frutos-rojos': 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&w=600&q=80',
  'panc-paradise': 'https://images.unsplash.com/photo-1506084868230-bb9d95c24759?auto=format&fit=crop&w=600&q=80',
  'postre-cuchareable-cacao': 'https://images.unsplash.com/photo-1579372786545-d24232daf58c?auto=format&fit=crop&w=600&q=80',
  'postre-cuchareable-carrot': 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80',
  'postre-torta-cacao-fit': 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=600&q=80',
  'postre-alfajor-healthy': 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=600&q=80',
  'postre-queque-platano': 'https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?auto=format&fit=crop&w=600&q=80',
  'comida-chaufa-quinua-pollo': 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80',
  'comida-chaufa-marino': 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80',
  'comida-bowl-teriyaki-fit': 'https://images.unsplash.com/photo-1543339308-43e59d6b73a6?auto=format&fit=crop&w=600&q=80',
  'batido-fresa-colageno': 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=600&q=80',
  'batido-cacao-peanut': 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=600&q=80',
  'batido-verde-detox': 'https://images.unsplash.com/photo-1610970881699-44a5587cabec?auto=format&fit=crop&w=600&q=80',
  'bebida-green-low': 'https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=600&q=80',
  'bebida-americano-espresso': 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80',
  'empanada-queso': 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=600&q=80',
  'empanada-queso-aceituna': 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=600&q=80',
  'empanada-pollo': 'https://images.unsplash.com/photo-1509722747041-616f39b57569?auto=format&fit=crop&w=600&q=80',
};

// Category fallback imagery
const CATEGORY_FALLBACK_PHOTOS: Record<string, string> = {
  panqueques: 'https://images.unsplash.com/photo-1528207776546-365bb710ee93?auto=format&fit=crop&w=600&q=80',
  postres: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80',
  comidas: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80',
  batidos: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=600&q=80',
  bebidas: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=600&q=80',
  empanadas: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=600&q=80',
};

export const ProductVisual: React.FC<ProductVisualProps> = ({
  product,
  aspect = 'wide',
  className = '',
  isFavorite = false,
  onToggleFavorite
}) => {
  const [imageError, setImageError] = useState(false);

  const aspectClass = {
    square: 'aspect-square',
    wide: 'aspect-[4/3]',
    tall: 'aspect-[3/4]'
  }[aspect];

  // Specific visual styling recipes matching HUAYNA's real menu
  const getVisualDetails = () => {
    switch (product.category) {
      case 'panqueques':
        return {
          bg: 'from-amber-100/90 via-orange-50 to-amber-200/50 dark:from-stone-900 dark:via-stone-800 dark:to-amber-950/40',
          accent: '#b45309',
          iconName: '🥞'
        };
      case 'postres':
        return {
          bg: 'from-amber-950/20 via-stone-200/70 to-emerald-900/20 dark:from-stone-950 dark:via-stone-900 dark:to-emerald-950/40',
          accent: '#78350f',
          iconName: '🧁'
        };
      case 'comidas':
        return {
          bg: 'from-emerald-100/90 via-teal-50 to-stone-100 dark:from-emerald-950/40 dark:via-stone-900 dark:to-stone-800',
          accent: '#065f46',
          iconName: '🥗'
        };
      case 'batidos':
        return {
          bg: 'from-rose-100/80 via-pink-50 to-amber-100/50 dark:from-rose-950/40 dark:via-stone-900 dark:to-stone-800',
          accent: '#be123c',
          iconName: '🥤'
        };
      case 'bebidas':
        return {
          bg: 'from-teal-100/80 via-emerald-50 to-lime-100/50 dark:from-teal-950/30 dark:via-stone-900 dark:to-emerald-950/30',
          accent: '#047857',
          iconName: '🧃'
        };
      case 'empanadas':
        return {
          bg: 'from-amber-100/90 via-orange-50 to-amber-200/50 dark:from-stone-900 dark:via-amber-950/30 dark:to-stone-800',
          accent: '#b45309',
          iconName: '🥟'
        };
      default:
        return {
          bg: 'from-stone-100 to-stone-200 dark:from-stone-800 dark:to-stone-900',
          accent: '#10b981',
          iconName: '🌿'
        };
    }
  };

  const details = getVisualDetails();
  const photoUrl = product.imageUrl || PRODUCT_PHOTO_MAP[product.id] || CATEGORY_FALLBACK_PHOTOS[product.category];

  return (
    <div className={`relative overflow-hidden rounded-2xl bg-neutral-100 dark:bg-neutral-900 ${aspectClass} ${className} select-none group border border-black/5 dark:border-white/10`}>
      {/* Real Food Photography Image */}
      {!imageError && photoUrl ? (
        <img
          src={photoUrl}
          alt={product.name}
          loading="lazy"
          onError={() => setImageError(true)}
          className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-500 ease-out"
        />
      ) : (
        /* Artistic Fallback with gradient */
        <div className={`w-full h-full bg-gradient-to-br ${details.bg} flex items-center justify-center relative`}>
          <div className="w-16 h-16 rounded-2xl bg-white/90 dark:bg-neutral-800/90 shadow-md backdrop-blur-sm flex items-center justify-center text-4xl shadow-emerald-950/10">
            {details.iconName}
          </div>
        </div>
      )}

      {/* Subtle bottom gradient vignette to ensure contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/5 to-transparent pointer-events-none" />

      {/* Top Left Tag: Destacado / TOP */}
      {product.popular && (
        <div className="absolute top-2 left-2 z-20 flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-900/90 text-amber-300 text-[10px] font-black tracking-wider backdrop-blur-md shadow-xs border border-amber-400/40">
          <Sparkles className="w-2.5 h-2.5 text-amber-300 fill-amber-300" />
          <span>TOP</span>
        </div>
      )}

      {/* Favorite Button on top right */}
      {onToggleFavorite && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite();
          }}
          className={`absolute top-2 right-2 z-20 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md transition-all shadow-xs cursor-pointer active:scale-90 ${
            isFavorite
              ? 'bg-rose-50/95 text-rose-600 dark:bg-rose-950/90 dark:text-rose-400 shadow-sm'
              : 'bg-black/35 hover:bg-black/50 text-white/90'
          }`}
          aria-label={isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
        >
          <Heart className={`w-4 h-4 transition-transform ${isFavorite ? 'fill-current scale-110 text-rose-500' : ''}`} />
        </button>
      )}
    </div>
  );
};
