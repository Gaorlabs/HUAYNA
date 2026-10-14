import React from 'react';
import { Product } from '../types';
import { useApp } from '../context/AppContext';
import { ProductVisual } from './ProductVisual';
import { Plus, Minus, Star, ShoppingBag } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { 
    cart, 
    addToCart, 
    updateQuantity, 
    setSelectedProductForDetail, 
    isFavorite, 
    toggleFavorite 
  } = useApp();

  // Find if this product is already in the cart
  const cartItemsForProduct = cart.filter(item => item.product.id === product.id);
  const totalQtyInCart = cartItemsForProduct.reduce((acc, item) => acc + item.quantity, 0);

  const handleCardClick = () => {
    setSelectedProductForDetail(product);
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    // If the product has customizable options, open detail modal for clean choice selection
    if (product.options && product.options.length > 0) {
      setSelectedProductForDetail(product);
    } else {
      addToCart(product, 1);
    }
  };

  const handleIncrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (cartItemsForProduct.length === 1) {
      updateQuantity(cartItemsForProduct[0].id, 1);
    } else {
      setSelectedProductForDetail(product);
    }
  };

  const handleDecrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (cartItemsForProduct.length === 1) {
      updateQuantity(cartItemsForProduct[0].id, -1);
    } else {
      setSelectedProductForDetail(product);
    }
  };

  return (
    <div 
      onClick={handleCardClick}
      className="group relative flex flex-col justify-between bg-white dark:bg-[#071e18] rounded-3xl border border-neutral-200/90 dark:border-emerald-950/80 p-3 shadow-[0_2px_12px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.08)] dark:shadow-none hover:border-emerald-500/40 dark:hover:border-amber-400/40 transition-all duration-300 cursor-pointer overflow-hidden"
    >
      <div>
        {/* Product Visual Container */}
        <div className="relative mb-2.5 rounded-2xl overflow-hidden">
          <ProductVisual
            product={product}
            aspect="wide"
            isFavorite={isFavorite(product.id)}
            onToggleFavorite={() => toggleFavorite(product.id)}
          />
        </div>

        {/* Category & Tags header */}
        <div className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-800 dark:text-emerald-400 uppercase tracking-wider mb-1 truncate">
          <span className="shrink-0">{product.categoryLabel}</span>
          {product.tags[0] && (
            <>
              <span aria-hidden="true" className="text-neutral-300 dark:text-neutral-700 shrink-0">·</span>
              <span className="truncate text-neutral-500 dark:text-neutral-400 font-semibold">{product.tags[0]}</span>
            </>
          )}
        </div>

        {/* Title */}
        <h4 className="font-extrabold text-xs md:text-sm text-neutral-900 dark:text-neutral-100 group-hover:text-emerald-700 dark:group-hover:text-amber-400 transition-colors line-clamp-2 min-h-[2.2rem] leading-snug">
          {product.name}
        </h4>

        {/* Description */}
        <p className="text-[11px] text-neutral-500 dark:text-neutral-400 line-clamp-2 mt-1 leading-relaxed">
          {product.description}
        </p>
      </div>

      {/* Bottom Section: Price & Rating + High-Impact Native Action Button */}
      <div className="mt-3 pt-2.5 border-t border-neutral-100 dark:border-emerald-950/70">
        {/* Price & Rating Row */}
        <div className="flex items-baseline justify-between mb-2.5">
          <div className="flex items-baseline gap-1">
            <span className="text-xs font-bold text-emerald-800 dark:text-amber-400">S/</span>
            <span className="text-lg font-black tabular-nums text-neutral-950 dark:text-white tracking-tight">
              {product.price.toFixed(2)}
            </span>
          </div>

          <div className="flex items-center gap-1 text-[11px] font-semibold text-neutral-500 dark:text-neutral-400">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 shrink-0" />
            <span className="font-bold text-neutral-800 dark:text-neutral-200">{product.rating}</span>
            <span className="text-[10px] text-neutral-400">({product.reviewsCount})</span>
          </div>
        </div>

        {/* Upgraded Native Action Buttons */}
        {totalQtyInCart > 0 ? (
          <div 
            onClick={(e) => e.stopPropagation()}
            className="w-full h-10 rounded-2xl bg-emerald-50 dark:bg-emerald-950/80 border-2 border-emerald-500/30 dark:border-amber-400/30 flex items-center justify-between p-1 shadow-xs"
          >
            <button
              type="button"
              onClick={handleDecrement}
              className="w-8 h-8 rounded-xl bg-white dark:bg-neutral-800 text-emerald-800 dark:text-emerald-200 shadow-xs flex items-center justify-center hover:bg-emerald-100 dark:hover:bg-neutral-700 active:scale-85 transition-all cursor-pointer border border-neutral-200/60 dark:border-neutral-700"
              aria-label="Disminuir cantidad"
            >
              <Minus className="w-4 h-4 stroke-[2.5]" />
            </button>
            
            <div className="flex items-center gap-1 px-2">
              <span className="text-sm font-black tabular-nums text-emerald-950 dark:text-amber-300">
                {totalQtyInCart}
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700/80 dark:text-emerald-400/80">
                en canasta
              </span>
            </div>

            <button
              type="button"
              onClick={handleIncrement}
              className="w-8 h-8 rounded-xl bg-emerald-700 dark:bg-amber-500 text-white dark:text-neutral-950 shadow-xs flex items-center justify-center hover:bg-emerald-800 dark:hover:bg-amber-400 active:scale-85 transition-all cursor-pointer"
              aria-label="Aumentar cantidad"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={handleQuickAdd}
            className="w-full h-10 rounded-2xl bg-gradient-to-r from-emerald-700 to-emerald-800 hover:from-emerald-800 hover:to-emerald-900 dark:from-amber-500 dark:to-amber-600 dark:hover:from-amber-400 dark:hover:to-amber-500 text-white dark:text-neutral-950 text-xs font-extrabold flex items-center justify-center gap-2 shadow-sm hover:shadow-md active:scale-[0.96] transition-all cursor-pointer group-hover:brightness-105"
            aria-label={`Agregar ${product.name} a la canasta`}
          >
            <Plus className="w-4 h-4 stroke-[3]" />
            <span>Agregar</span>
          </button>
        )}
      </div>
    </div>
  );
};
