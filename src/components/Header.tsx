import React from 'react';
import { useApp } from '../context/AppContext';
import { HuaynaLogo } from './HuaynaLogo';
import { Moon, Sun, User as UserIcon, Home, ShoppingBag, Sparkles } from 'lucide-react';

export const Header: React.FC = () => {
  const { 
    setShowSplash, 
    isDarkMode, 
    toggleDarkMode, 
    user, 
    setIsAuthOpen, 
    cartCount, 
    setIsCartOpen 
  } = useApp();

  return (
    <header className="sticky top-0 z-30 bg-white/90 dark:bg-[#071c17]/90 backdrop-blur-md border-b border-neutral-200/80 dark:border-emerald-950/80 transition-colors">
      <div className="max-w-md mx-auto px-4 h-14 flex items-center justify-between gap-2">
        {/* Left: Brand Logo & Title (Click to go to Splash or Home) */}
        <div 
          onClick={() => setShowSplash(true)}
          className="flex items-center gap-2 cursor-pointer group shrink-0"
          title="Regresar a la Portada"
        >
          <HuaynaLogo size="sm" showSubtitle={false} />
          <div className="flex flex-col">
            <span className="font-display font-bold text-base tracking-tight text-emerald-950 dark:text-emerald-100 group-hover:text-emerald-700 dark:group-hover:text-amber-400 transition-colors leading-none">
              HUAYNA
            </span>
            <span className="text-[9px] font-semibold tracking-wider text-amber-600 dark:text-amber-400 uppercase leading-tight">
              Cafetería Fit
            </span>
          </div>
        </div>

        {/* Center / Action: "Volver a Portada" Button */}
        <button
          onClick={() => setShowSplash(true)}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 border border-emerald-200 dark:border-emerald-800/60 transition-all cursor-pointer whitespace-nowrap active:scale-95"
          aria-label="Regresar a la Portada"
        >
          <Home className="w-3.5 h-3.5 text-emerald-600 dark:text-amber-400" />
          <span className="hidden sm:inline">Volver a</span> Portada
        </button>

        {/* Right Actions: Dark/Light Mode + User Profile + Cart Badge */}
        <div className="flex items-center gap-1.5 shrink-0">
          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className="w-9 h-9 rounded-lg flex items-center justify-center text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
            aria-label={isDarkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-emerald-800" />}
          </button>

          {/* User Profile / Login */}
          <button
            onClick={() => setIsAuthOpen(true)}
            className={`h-9 px-2.5 rounded-lg flex items-center gap-1.5 text-xs font-semibold transition-all cursor-pointer ${
              user 
                ? 'bg-emerald-100/80 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-200 border border-emerald-300 dark:border-emerald-800' 
                : 'text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800'
            }`}
            aria-label="Mi Cuenta"
          >
            <UserIcon className="w-4 h-4 text-emerald-700 dark:text-amber-400" />
            <span className="max-w-[70px] truncate hidden xs:inline">
              {user ? user.name.split(' ')[0] : 'Ingresar'}
            </span>
          </button>

          {/* Cart Icon */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative w-9 h-9 rounded-lg flex items-center justify-center text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
            aria-label="Ver canasta"
          >
            <ShoppingBag className="w-4 h-4 text-emerald-800 dark:text-emerald-400" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-amber-500 text-neutral-950 text-[10px] font-extrabold flex items-center justify-center shadow-sm">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
