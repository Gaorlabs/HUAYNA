import React, { useState, useEffect } from 'react';
import { Product } from '../types';
import { useApp } from '../context/AppContext';
import { ProductVisual } from './ProductVisual';
import { X, Plus, Minus, Check, Star, Sparkles, Heart } from 'lucide-react';

interface ProductDetailModalProps {
  product: Product;
  onClose: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ product, onClose }) => {
  const { addToCart, isFavorite, toggleFavorite } = useApp();

  const [quantity, setQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [notes, setNotes] = useState('');

  // Initialize default options
  useEffect(() => {
    if (product.options && product.options.length > 0) {
      const initial: Record<string, string> = {};
      product.options.forEach(opt => {
        if (opt.choices.length > 0) {
          initial[opt.name] = opt.choices[0].label;
        }
      });
      setSelectedOptions(initial);
    }
  }, [product]);

  // Calculate current extra price from selected options
  let extraPrice = 0;
  if (product.options) {
    product.options.forEach(opt => {
      const selectedLabel = selectedOptions[opt.name];
      if (selectedLabel) {
        const choice = opt.choices.find(c => c.label === selectedLabel);
        if (choice) extraPrice += choice.priceDelta;
      }
    });
  }

  const unitPrice = product.price + extraPrice;
  const totalPrice = unitPrice * quantity;

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedOptions, notes);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fadeIn">
      <div 
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg bg-white dark:bg-[#071d17] rounded-t-3xl sm:rounded-3xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col border border-neutral-200 dark:border-emerald-950"
      >
        {/* Header bar with close button */}
        <div className="sticky top-0 z-20 flex items-center justify-between p-4 bg-white/95 dark:bg-[#071d17]/95 backdrop-blur-md border-b border-neutral-100 dark:border-emerald-950/70">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-emerald-800 dark:text-emerald-300">
              {product.categoryLabel}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => toggleFavorite(product.id)}
              className="w-9 h-9 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:text-rose-600 flex items-center justify-center transition-colors"
              aria-label="Favorito"
            >
              <Heart className={`w-4 h-4 ${isFavorite(product.id) ? 'fill-rose-500 text-rose-500' : ''}`} />
            </button>
            <button
              type="button"
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700 flex items-center justify-center transition-colors"
              aria-label="Cerrar detalle"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Modal Body */}
        <div className="overflow-y-auto p-5 space-y-5">
          {/* Visual Showcase */}
          <div className="w-full">
            <ProductVisual product={product} aspect="wide" />
          </div>

          {/* Title & Price Header */}
          <div>
            <div className="flex items-start justify-between gap-3">
              <h2 className="text-xl md:text-2xl font-bold font-display text-neutral-900 dark:text-white leading-tight">
                {product.name}
              </h2>
              <div className="text-right shrink-0">
                <span className="text-xs font-bold text-emerald-800 dark:text-amber-400">S/ </span>
                <span className="text-2xl font-extrabold tabular-nums text-neutral-950 dark:text-white">
                  {unitPrice.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Rating & Reviews */}
            <div className="flex items-center gap-2 mt-1.5 text-xs text-neutral-500 dark:text-neutral-400">
              <div className="flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span className="font-bold text-neutral-800 dark:text-neutral-200">{product.rating}</span>
                <span>({product.reviewsCount} opiniones de clientes)</span>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-neutral-600 dark:text-neutral-300 mt-2.5 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Ingredients Section */}
          {product.ingredients && (
            <div className="p-3.5 rounded-2xl bg-neutral-50 dark:bg-emerald-950/40 border border-neutral-200/70 dark:border-emerald-900/50">
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-900 dark:text-emerald-300 mb-1">
                Ingredientes Naturales & Elaboración
              </h4>
              <p className="text-xs text-neutral-700 dark:text-neutral-300 leading-relaxed">
                {product.ingredients}
              </p>
            </div>
          )}

          {/* Benefits List */}
          {product.benefits && product.benefits.length > 0 && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-2">
                Beneficios Nutricionales
              </h4>
              <ul className="space-y-1.5">
                {product.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-center gap-2 text-xs text-neutral-700 dark:text-neutral-300">
                    <span className="w-4 h-4 rounded-full bg-emerald-100 dark:bg-emerald-900/80 text-emerald-700 dark:text-emerald-300 flex items-center justify-center shrink-0">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </span>
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Options / Variants Selectors */}
          {product.options && product.options.map(option => (
            <div key={option.name} className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-600 dark:text-neutral-300">
                {option.name}
              </h4>
              <div className="grid grid-cols-1 gap-2">
                {option.choices.map(choice => {
                  const isSelected = selectedOptions[option.name] === choice.label;
                  return (
                    <button
                      key={choice.label}
                      type="button"
                      onClick={() => setSelectedOptions(prev => ({ ...prev, [option.name]: choice.label }))}
                      className={`flex items-center justify-between p-3 rounded-xl border text-xs font-medium transition-all text-left ${
                        isSelected
                          ? 'border-emerald-600 bg-emerald-50 dark:border-amber-400 dark:bg-emerald-950 text-emerald-950 dark:text-emerald-100 font-semibold'
                          : 'border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                          isSelected ? 'border-emerald-600 dark:border-amber-400 bg-emerald-600 dark:bg-amber-400' : 'border-neutral-400'
                        }`}>
                          {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white dark:bg-black" />}
                        </div>
                        <span>{choice.label}</span>
                      </div>
                      {choice.priceDelta > 0 && (
                        <span className="text-emerald-700 dark:text-amber-400 font-bold">
                          +S/ {choice.priceDelta.toFixed(2)}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Special instructions / notes */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-1.5">
              Instrucciones Especiales (Opcional)
            </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Ej: poco hielo, sin canela, enviar cubiertos..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 text-xs text-neutral-800 dark:text-neutral-200 focus:outline-none focus:ring-2 focus:ring-emerald-600 dark:focus:ring-amber-400"
            />
          </div>
        </div>

        {/* Bottom Sticky Action Bar */}
        <div className="sticky bottom-0 z-20 p-4 bg-white/95 dark:bg-[#071d17]/95 backdrop-blur-md border-t border-neutral-100 dark:border-emerald-950 flex items-center gap-3">
          {/* Quantity Stepper */}
          <div className="flex items-center gap-2 bg-neutral-100 dark:bg-neutral-800 rounded-xl p-1 shrink-0">
            <button
              type="button"
              onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
              disabled={quantity <= 1}
              className="w-8 h-8 rounded-lg bg-white dark:bg-neutral-700 text-neutral-700 dark:text-neutral-200 flex items-center justify-center disabled:opacity-40 transition-all cursor-pointer"
              aria-label="Menos cantidad"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-6 text-center text-sm font-bold tabular-nums text-neutral-900 dark:text-neutral-100">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => setQuantity(prev => prev + 1)}
              className="w-8 h-8 rounded-lg bg-white dark:bg-neutral-700 text-neutral-700 dark:text-neutral-200 flex items-center justify-center transition-all cursor-pointer"
              aria-label="Más cantidad"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Add to Cart CTA */}
          <button
            type="button"
            onClick={handleAddToCart}
            className="flex-1 h-11 px-4 rounded-xl bg-gradient-to-r from-emerald-700 to-emerald-800 hover:from-emerald-800 hover:to-emerald-900 dark:from-amber-500 dark:to-amber-600 dark:hover:from-amber-400 text-white dark:text-neutral-950 font-bold text-sm shadow-md active:scale-[0.99] transition-all flex items-center justify-between cursor-pointer"
          >
            <span>Agregar a la Canasta</span>
            <span className="tabular-nums font-extrabold">S/ {totalPrice.toFixed(2)}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
