import React from 'react';
import { useApp } from '../context/AppContext';
import { ShoppingBag, ArrowRight } from 'lucide-react';

export const FloatingCartBar: React.FC = () => {
  const { cartCount, cartSubtotal, setIsCartOpen, activeTab } = useApp();

  if (cartCount === 0) return null;

  return (
    <div className="fixed bottom-20 left-0 right-0 z-30 px-4 pointer-events-none transition-all duration-300">
      <div className="max-w-md mx-auto pointer-events-auto">
        <button
          type="button"
          onClick={() => setIsCartOpen(true)}
          className="w-full h-13 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-emerald-800 via-emerald-700 to-emerald-900 text-white shadow-xl shadow-emerald-950/25 border border-emerald-600/40 hover:brightness-105 active:scale-[0.98] transition-all flex items-center justify-between cursor-pointer group"
          aria-label="Ver canasta de compras"
        >
          {/* Left item count */}
          <div className="flex items-center gap-2.5">
            <div className="relative w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center text-white shrink-0">
              <ShoppingBag className="w-4 h-4 text-amber-300" />
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-amber-400 text-neutral-950 text-[10px] font-black flex items-center justify-center">
                {cartCount}
              </span>
            </div>
            <div className="text-left">
              <span className="text-xs font-bold tracking-tight text-white block leading-tight">
                Ver Canasta
              </span>
              <span className="text-[10px] text-emerald-200/90 font-medium">
                {cartCount} {cartCount === 1 ? 'producto' : 'productos'} seleccionados
              </span>
            </div>
          </div>

          {/* Right Price & Arrow */}
          <div className="flex items-center gap-2">
            <div className="text-right">
              <span className="text-[10px] text-emerald-200 uppercase tracking-wider block leading-tight font-medium">
                Total
              </span>
              <span className="text-sm font-black tabular-nums text-amber-300">
                S/ {cartSubtotal.toFixed(2)}
              </span>
            </div>
            <div className="w-7 h-7 rounded-lg bg-white/10 group-hover:bg-white/20 flex items-center justify-center transition-colors">
              <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>
        </button>
      </div>
    </div>
  );
};
