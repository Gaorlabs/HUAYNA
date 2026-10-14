import React, { useState, useEffect, useRef } from 'react';
import { PROMOTIONS } from '../data/products';
import { useApp } from '../context/AppContext';
import { ChevronLeft, ChevronRight, Sparkles, ArrowRight } from 'lucide-react';
import { ProductCategory } from '../types';

export const PromotionsSlider: React.FC = () => {
  const { setSelectedCategory, setActiveTab } = useApp();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Swipe / Drag handling
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const isDragging = useRef<boolean>(false);

  // Auto advance every 4.5 seconds
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % PROMOTIONS.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isPaused]);

  const handlePrev = () => {
    setCurrentIndex(prev => (prev === 0 ? PROMOTIONS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex(prev => (prev + 1) % PROMOTIONS.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
    setIsPaused(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current !== null && touchEndX.current !== null) {
      const distance = touchStartX.current - touchEndX.current;
      if (distance > 50) {
        handleNext(); // swiped left
      } else if (distance < -50) {
        handlePrev(); // swiped right
      }
    }
    touchStartX.current = null;
    touchEndX.current = null;
    setIsPaused(false);
  };

  // Mouse drag support
  const handleMouseDown = (e: React.MouseEvent) => {
    touchStartX.current = e.clientX;
    isDragging.current = true;
    setIsPaused(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    touchEndX.current = e.clientX;
  };

  const handleMouseUp = () => {
    if (isDragging.current && touchStartX.current !== null && touchEndX.current !== null) {
      const distance = touchStartX.current - touchEndX.current;
      if (distance > 50) {
        handleNext();
      } else if (distance < -50) {
        handlePrev();
      }
    }
    touchStartX.current = null;
    touchEndX.current = null;
    isDragging.current = false;
    setIsPaused(false);
  };

  const handlePromoClick = (category: ProductCategory) => {
    setSelectedCategory(category);
    setActiveTab('explorar');
  };

  const currentPromo = PROMOTIONS[currentIndex];

  return (
    <div 
      className="relative w-full overflow-hidden rounded-2xl select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => {
        setIsPaused(false);
        isDragging.current = false;
      }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      {/* Slider Viewport */}
      <div 
        className="flex transition-transform duration-500 ease-out cursor-grab active:cursor-grabbing"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {PROMOTIONS.map((promo, idx) => (
          <div
            key={promo.id}
            className="w-full shrink-0 p-1"
          >
            <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-r ${promo.bgGradient} p-5 text-white min-h-[170px] flex flex-col justify-between shadow-lg shadow-emerald-950/20`}>
              {/* Background botanical graphics */}
              <div className="absolute -right-10 -bottom-10 w-44 h-44 rounded-full bg-emerald-400/10 blur-2xl pointer-events-none" />
              <div className="absolute top-2 right-4 text-emerald-400/20 text-6xl font-display font-black pointer-events-none select-none">
                0{idx + 1}
              </div>

              <div>
                {/* Badge row */}
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-300 text-[10px] font-bold tracking-wider uppercase flex items-center gap-1">
                    <Sparkles className="w-2.5 h-2.5" />
                    {promo.badge}
                  </span>
                  <span className="text-[10px] font-semibold text-emerald-300/80">
                    {promo.discountBadge}
                  </span>
                </div>

                <h3 className="text-lg md:text-xl font-bold font-display tracking-tight text-white leading-snug">
                  {promo.title}
                </h3>
                <p className="text-xs text-neutral-200/90 mt-1 line-clamp-2 max-w-[85%]">
                  {promo.description}
                </p>
              </div>

              <div className="flex items-center justify-between pt-3 mt-2 border-t border-white/10">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePromoClick(promo.categoryLink);
                  }}
                  className="inline-flex items-center gap-1 text-xs font-bold text-amber-300 hover:text-amber-200 cursor-pointer group"
                >
                  <span>Ver promoción en menú</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>

                <span className="text-[11px] text-emerald-200/60 font-medium">
                  {currentIndex + 1} / {PROMOTIONS.length}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Subtle arrow controls */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          handlePrev();
        }}
        className="absolute left-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/30 hover:bg-black/50 text-white backdrop-blur-sm flex items-center justify-center transition-opacity opacity-70 hover:opacity-100 z-10"
        aria-label="Promoción anterior"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      <button
        onClick={(e) => {
          e.stopPropagation();
          handleNext();
        }}
        className="absolute right-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/30 hover:bg-black/50 text-white backdrop-blur-sm flex items-center justify-center transition-opacity opacity-70 hover:opacity-100 z-10"
        aria-label="Siguiente promoción"
      >
        <ChevronRight className="w-4 h-4" />
      </button>

      {/* Pagination indicators */}
      <div className="flex items-center justify-center gap-1.5 py-2">
        {PROMOTIONS.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              idx === currentIndex
                ? 'w-6 bg-emerald-600 dark:bg-amber-400'
                : 'w-2 bg-neutral-300 dark:bg-neutral-700'
            }`}
            aria-label={`Ir a diapositiva ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
