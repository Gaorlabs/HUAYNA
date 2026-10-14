import React from 'react';
import { useApp } from '../context/AppContext';
import { HuaynaLogo } from './HuaynaLogo';
import { BUSINESS_INFO } from '../data/products';
import { 
  ArrowRight, 
  MapPin, 
  Clock, 
  Sun,
  Moon
} from 'lucide-react';
import { ProductCategory } from '../types';

export const SplashScreen: React.FC = () => {
  const { 
    setShowSplash, 
    setSelectedCategory, 
    setActiveTab,
    isDarkMode,
    toggleDarkMode
  } = useApp();

  const handleEnterCatalog = (cat?: ProductCategory) => {
    if (cat) {
      setSelectedCategory(cat);
      setActiveTab('explorar');
    } else {
      setActiveTab('inicio');
    }
    setShowSplash(false);
  };

  return (
    <div className={`fixed inset-0 z-50 overflow-y-auto transition-colors duration-500 flex flex-col items-center justify-between p-5 md:p-8 animate-fadeIn ${
      isDarkMode 
        ? 'bg-gradient-to-b from-[#06241e] via-[#09352c] to-[#041a15] text-white' 
        : 'bg-gradient-to-b from-[#fafbf8] via-[#eef5f1] to-[#e1eee7] text-neutral-900'
    }`}>
      {/* Background ambient lighting */}
      <div className={`absolute top-10 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full blur-3xl pointer-events-none transition-colors duration-500 ${
        isDarkMode ? 'bg-emerald-500/15' : 'bg-emerald-300/30'
      }`} />
      <div className={`absolute bottom-10 right-10 w-72 h-72 rounded-full blur-3xl pointer-events-none transition-colors duration-500 ${
        isDarkMode ? 'bg-amber-500/10' : 'bg-amber-300/20'
      }`} />

      {/* Top micro bar with location, subtle theme toggle and skip button */}
      <div className={`relative z-10 w-full max-w-md flex items-center justify-between text-xs pt-2 pb-4 ${
        isDarkMode ? 'text-emerald-200/80' : 'text-emerald-800'
      }`}>
        <div className="flex items-center gap-1.5 truncate font-medium">
          <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
          <span className="truncate">Av. Varela 409 · Tacna, Perú</span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {/* Subtle Dark/Light Mode Button */}
          <button
            type="button"
            onClick={toggleDarkMode}
            className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors cursor-pointer ${
              isDarkMode
                ? 'bg-white/10 text-amber-400 hover:bg-white/20'
                : 'bg-white text-emerald-800 border border-emerald-200 shadow-2xs hover:bg-emerald-50'
            }`}
            aria-label={isDarkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
            title={isDarkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
          >
            {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          <button
            onClick={() => handleEnterCatalog()}
            className={`text-xs font-semibold px-2.5 py-1.5 rounded-lg border transition-colors cursor-pointer ${
              isDarkMode 
                ? 'text-amber-300 hover:text-amber-200 bg-white/5 border-white/10' 
                : 'text-emerald-800 hover:text-emerald-900 bg-white/80 border-emerald-200 shadow-2xs'
            }`}
          >
            Saltar
          </button>
        </div>
      </div>

      {/* Center Hero Content */}
      <div className="relative z-10 w-full max-w-md flex flex-col items-center text-center my-auto py-4">
        {/* Floating Brand Logo with gentle animation */}
        <div className="animate-float-gentle mb-4">
          <HuaynaLogo size="splash" />
        </div>

        {/* Commercial Title & Slogan */}
        <h1 className={`text-3xl md:text-4xl font-extrabold tracking-tight font-display mb-1.5 transition-colors ${
          isDarkMode ? 'text-white' : 'text-emerald-950'
        }`}>
          HUAYNA
        </h1>
        <p className="text-xs md:text-sm font-bold tracking-widest uppercase text-amber-500 dark:text-amber-400 mb-2">
          • Cafetería & Postres Saludables •
        </p>
        <p className={`text-xs md:text-sm max-w-xs leading-relaxed mb-6 font-normal transition-colors ${
          isDarkMode ? 'text-emerald-100/90' : 'text-neutral-600'
        }`}>
          {BUSINESS_INFO.slogan}
        </p>

        {/* Central Floating Card with Glow and Primary CTA */}
        <div className={`w-full rounded-2xl p-5 shadow-xl backdrop-blur-md animate-glow border transition-colors duration-500 ${
          isDarkMode
            ? 'bg-gradient-to-b from-white/15 to-white/5 border-white/20'
            : 'bg-white/95 border-emerald-200/80 shadow-emerald-900/10'
        }`}>
          <button
            onClick={() => handleEnterCatalog()}
            className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 text-neutral-950 font-bold text-base shadow-lg shadow-amber-500/25 hover:brightness-105 active:scale-[0.98] transition-all flex items-center justify-center gap-2 group cursor-pointer"
          >
            <span>Ingresar al Catálogo</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Quick category shortcuts */}
          <div className={`mt-4 pt-3.5 border-t ${
            isDarkMode ? 'border-white/10' : 'border-neutral-200'
          }`}>
            <p className={`text-[11px] font-medium mb-2.5 ${
              isDarkMode ? 'text-emerald-200/80' : 'text-neutral-600'
            }`}>
              Accesos directos por categoría:
            </p>
            <div className="flex items-center justify-center gap-2 flex-wrap">
              <button
                onClick={() => handleEnterCatalog('panqueques')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                  isDarkMode 
                    ? 'bg-white/10 hover:bg-white/20 text-white' 
                    : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200'
                }`}
              >
                🥞 Panqueques
              </button>
              <button
                onClick={() => handleEnterCatalog('postres')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                  isDarkMode 
                    ? 'bg-white/10 hover:bg-white/20 text-white' 
                    : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200'
                }`}
              >
                🍫 Postres Fit
              </button>
              <button
                onClick={() => handleEnterCatalog('comidas')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                  isDarkMode 
                    ? 'bg-white/10 hover:bg-white/20 text-white' 
                    : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200'
                }`}
              >
                🥗 Comidas
              </button>
              <button
                onClick={() => handleEnterCatalog('batidos')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                  isDarkMode 
                    ? 'bg-white/10 hover:bg-white/20 text-white' 
                    : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-200'
                }`}
              >
                🥤 Batidos
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className={`relative z-10 w-full max-w-md text-center text-xs pb-2 transition-colors ${
        isDarkMode ? 'text-emerald-200/60' : 'text-neutral-500'
      }`}>
        <p className="flex items-center justify-center gap-1.5 mb-1 font-medium">
          <Clock className="w-3.5 h-3.5 text-amber-500" />
          <span>Atención Hoy: 8:00 AM - 9:30 PM</span>
        </p>
        <p className="text-[10px]">
          Frente a las 200 Casas · Misma recta de Pollería El Pollón 💚 Tacna
        </p>
      </div>
    </div>
  );
};
