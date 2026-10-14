import React, { useState } from 'react';
import { CATEGORIES } from '../data/products';

interface CategoryVisualProps {
  categoryId: string;
  size?: 'sm' | 'md' | 'lg' | 'card' | 'pill';
  className?: string;
  isSelected?: boolean;
  showText?: boolean;
  onClick?: () => void;
}

export const CategoryVisual: React.FC<CategoryVisualProps> = ({
  categoryId,
  size = 'md',
  className = '',
  isSelected = false,
  showText = false,
  onClick
}) => {
  const [imgError, setImgError] = useState(false);
  const category = CATEGORIES.find(c => c.id === categoryId);

  const defaultDetails = () => {
    switch (categoryId) {
      case 'panqueques':
        return {
          gradient: 'from-amber-600 to-orange-700',
          accent: '#d97706',
          icon: '🥞',
          badge: 'Avena & Frutas',
        };
      case 'postres':
        return {
          gradient: 'from-amber-900 to-stone-900',
          accent: '#78350f',
          icon: '🧁',
          badge: 'Sin Azúcar · Fit',
        };
      case 'comidas':
        return {
          gradient: 'from-emerald-700 to-teal-900',
          accent: '#059669',
          icon: '🥗',
          badge: 'Quinua & Pollo',
        };
      case 'batidos':
        return {
          gradient: 'from-rose-600 to-pink-800',
          accent: '#e11d48',
          icon: '🥤',
          badge: 'WPC 80% Proteico',
        };
      case 'bebidas':
        return {
          gradient: 'from-teal-600 to-emerald-800',
          accent: '#0d9488',
          icon: '🧃',
          badge: 'Café & Detox',
        };
      case 'empanadas':
        return {
          gradient: 'from-amber-700 to-orange-800',
          accent: '#b45309',
          icon: '🥟',
          badge: 'Masa Integral',
        };
      default:
        return {
          gradient: 'from-emerald-800 to-teal-950',
          accent: '#10b981',
          icon: '✨',
          badge: 'Todo el Menú',
        };
    }
  };

  const details = defaultDetails();
  const imageUrl = category?.image;

  if (size === 'card') {
    return (
      <div
        onClick={onClick}
        className={`relative overflow-hidden rounded-3xl h-36 w-full cursor-pointer select-none transition-all duration-300 group shadow-sm hover:shadow-md border active:scale-98 ${
          isSelected 
            ? 'ring-2 ring-emerald-500 dark:ring-amber-400 border-transparent shadow-md' 
            : 'border-neutral-200/80 dark:border-emerald-950/80'
        } ${className}`}
      >
        {/* Background photo */}
        {!imgError && imageUrl ? (
          <img
            src={imageUrl}
            alt={category?.label || categoryId}
            onError={() => setImgError(true)}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
          />
        ) : (
          <div className={`absolute inset-0 bg-gradient-to-br ${details.gradient} flex items-center justify-center`}>
            <span className="text-4xl">{details.icon}</span>
          </div>
        )}

        {/* Gradient Scrim for maximum contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/10 group-hover:from-black/90 transition-colors" />

        {/* Badge Top Left */}
        {category?.badge && (
          <div className="absolute top-2.5 left-2.5 z-10 px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-[9px] font-black uppercase tracking-wider text-white border border-white/30">
            {category.badge}
          </div>
        )}

        {/* Content bottom */}
        <div className="absolute inset-x-0 bottom-0 p-3 z-10">
          <div className="flex items-center justify-between">
            <h4 className="text-white font-extrabold text-sm tracking-tight drop-shadow-sm group-hover:text-amber-300 transition-colors">
              {category?.label || categoryId}
            </h4>
            <span className="text-[10px] text-white/90 bg-black/40 backdrop-blur-sm px-1.5 py-0.5 rounded-md font-semibold">
              {category?.itemCount} items
            </span>
          </div>
          {category?.tagline && (
            <p className="text-[11px] text-neutral-200/90 line-clamp-1 mt-0.5 font-medium drop-shadow-xs">
              {category.tagline}
            </p>
          )}
        </div>
      </div>
    );
  }

  if (size === 'pill') {
    return (
      <button
        type="button"
        onClick={onClick}
        className={`flex items-center gap-2 p-1 pr-3 rounded-2xl border transition-all shrink-0 cursor-pointer select-none active:scale-95 ${
          isSelected
            ? 'bg-emerald-800 dark:bg-amber-500 text-white dark:text-neutral-950 border-emerald-700 dark:border-amber-400 shadow-xs'
            : 'bg-white dark:bg-[#071e18] text-neutral-800 dark:text-neutral-200 border-neutral-200/80 dark:border-emerald-950/80 hover:border-emerald-400'
        } ${className}`}
      >
        <div className="w-8 h-8 rounded-xl overflow-hidden relative shrink-0">
          {!imgError && imageUrl ? (
            <img
              src={imageUrl}
              alt=""
              onError={() => setImgError(true)}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className={`w-full h-full bg-gradient-to-br ${details.gradient} flex items-center justify-center text-sm`}>
              {details.icon}
            </div>
          )}
        </div>
        <span className="text-xs font-bold whitespace-nowrap">
          {category?.label || categoryId}
        </span>
      </button>
    );
  }

  // Default compact visual circle / rounded container
  const dimensions = {
    sm: 'w-10 h-10',
    md: 'w-14 h-14',
    lg: 'w-20 h-20'
  }[size as 'sm' | 'md' | 'lg'] || 'w-14 h-14';

  return (
    <div
      onClick={onClick}
      className={`relative overflow-hidden rounded-2xl ${dimensions} select-none shadow-2xs group-hover:shadow-md transition-all duration-300 border border-black/5 dark:border-white/10 ${className}`}
    >
      {!imgError && imageUrl ? (
        <img
          src={imageUrl}
          alt={category?.label || categoryId}
          onError={() => setImgError(true)}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
      ) : (
        <div className={`absolute inset-0 bg-gradient-to-br ${details.gradient} flex items-center justify-center text-xl`}>
          {details.icon}
        </div>
      )}

      {/* Subtle overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
    </div>
  );
};
