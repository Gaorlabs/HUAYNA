import React from 'react';
import { useApp } from '../context/AppContext';
import { PRODUCTS, CATEGORIES } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { CategoryVisual } from '../components/CategoryVisual';
import { Search, X, Filter, Sparkles, SlidersHorizontal } from 'lucide-react';

export const ExploreView: React.FC = () => {
  const { 
    selectedCategory, 
    setSelectedCategory, 
    searchQuery, 
    setSearchQuery,
    activeDietTag,
    setActiveDietTag
  } = useApp();

  const dietaryTags = [
    'Todos',
    'Sin Azúcar',
    'Sin Gluten',
    'Avena',
    'Proteína',
    'Yogurt Griego',
    'Masa Madre',
    'Detox'
  ];

  // Filtering logic
  const filteredProducts = PRODUCTS.filter(product => {
    // 1. Category filter
    if (selectedCategory !== 'all' && product.category !== selectedCategory) {
      return false;
    }

    // 2. Dietary tag filter
    if (activeDietTag && activeDietTag !== 'Todos') {
      const matchTag = product.tags.some(t => t.toLowerCase().includes(activeDietTag.toLowerCase()));
      const matchDesc = product.description.toLowerCase().includes(activeDietTag.toLowerCase());
      const matchIngr = product.ingredients?.toLowerCase().includes(activeDietTag.toLowerCase());
      if (!matchTag && !matchDesc && !matchIngr) {
        return false;
      }
    }

    // 3. Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const matchName = product.name.toLowerCase().includes(q);
      const matchDesc = product.description.toLowerCase().includes(q);
      const matchCat = product.categoryLabel.toLowerCase().includes(q);
      const matchIngr = product.ingredients?.toLowerCase().includes(q);
      if (!matchName && !matchDesc && !matchCat && !matchIngr) {
        return false;
      }
    }

    return true;
  });

  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setActiveDietTag(null);
  };

  return (
    <div className="space-y-4 pb-28">
      {/* Search Bar */}
      <div className="relative">
        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Buscar cuchareable, pancake, chaufa, batido..."
          className="w-full pl-10 pr-9 py-2.5 rounded-2xl border border-neutral-200 dark:border-emerald-950 bg-white dark:bg-[#071e18] text-xs text-neutral-800 dark:text-neutral-100 shadow-xs focus:outline-none focus:ring-2 focus:ring-emerald-600 dark:focus:ring-amber-400 transition-all"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => setSearchQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-neutral-200 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-200 flex items-center justify-center text-xs"
          >
            <X className="w-3 h-3" />
          </button>
        )}
      </div>

      {/* Horizontal Category Scroll with Photography Thumbnails */}
      <div className="overflow-x-auto no-scrollbar -mx-4 px-4 flex items-center gap-2 pb-1.5">
        {CATEGORIES.map(cat => {
          const isSelected = selectedCategory === cat.id;
          return (
            <CategoryVisual
              key={cat.id}
              categoryId={cat.id}
              size="pill"
              isSelected={isSelected}
              onClick={() => setSelectedCategory(cat.id)}
            />
          );
        })}
      </div>

      {/* Dietary Clean Filter Chips */}
      <div className="overflow-x-auto no-scrollbar -mx-4 px-4 flex items-center gap-1.5 pb-1 text-xs">
        <span className="text-[11px] font-semibold text-neutral-400 shrink-0 flex items-center gap-1">
          <Filter className="w-3 h-3" />
          Filtro:
        </span>
        {dietaryTags.map(tag => {
          const isSelected = (activeDietTag === tag) || (!activeDietTag && tag === 'Todos');
          return (
            <button
              key={tag}
              type="button"
              onClick={() => setActiveDietTag(tag === 'Todos' ? null : tag)}
              className={`px-2.5 py-1 rounded-lg text-[11px] font-medium whitespace-nowrap transition-colors shrink-0 cursor-pointer ${
                isSelected
                  ? 'bg-emerald-100 text-emerald-900 dark:bg-emerald-900/60 dark:text-emerald-200 font-bold'
                  : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
              }`}
            >
              {tag}
            </button>
          );
        })}
      </div>

      {/* Results Header Count */}
      <div className="flex items-center justify-between px-1 text-xs text-neutral-500 dark:text-neutral-400">
        <span>
          Mostrando <strong>{filteredProducts.length}</strong> {filteredProducts.length === 1 ? 'producto' : 'productos'}
        </span>
        {(searchQuery || selectedCategory !== 'all' || activeDietTag) && (
          <button
            type="button"
            onClick={clearAllFilters}
            className="text-emerald-700 dark:text-amber-400 font-semibold hover:underline"
          >
            Limpiar filtros
          </button>
        )}
      </div>

      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 gap-3">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="p-8 text-center bg-white dark:bg-[#071e18] rounded-2xl border border-neutral-200 dark:border-emerald-950 mt-4 space-y-3">
          <Search className="w-10 h-10 mx-auto text-neutral-300 dark:text-neutral-600" />
          <h4 className="font-bold text-sm text-neutral-800 dark:text-neutral-200">
            No se encontraron productos
          </h4>
          <p className="text-xs text-neutral-500 max-w-xs mx-auto">
            No hay opciones para los filtros seleccionados. Intenta buscar otro término o categoría.
          </p>
          <button
            type="button"
            onClick={clearAllFilters}
            className="px-4 py-2 rounded-xl bg-emerald-700 text-white text-xs font-bold"
          >
            Restablecer Filtros
          </button>
        </div>
      )}
    </div>
  );
};
