import React from 'react';
import { useApp } from '../context/AppContext';
import { Home, Compass, Heart, User as UserIcon } from 'lucide-react';
import { ActiveTab } from '../types';

export const BottomNav: React.FC = () => {
  const { activeTab, setActiveTab, favorites, user } = useApp();

  const tabs: { id: ActiveTab; label: string; icon: React.ElementType; badge: number | null }[] = [
    {
      id: 'inicio',
      label: 'Inicio',
      icon: Home,
      badge: null
    },
    {
      id: 'explorar',
      label: 'Explorar',
      icon: Compass,
      badge: null
    },
    {
      id: 'favoritos',
      label: 'Favoritos',
      icon: Heart,
      badge: favorites.length > 0 ? favorites.length : null
    },
    {
      id: 'perfil',
      label: 'Mi Perfil',
      icon: UserIcon,
      badge: user ? user.fitPoints : null
    }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-[#061e18]/95 backdrop-blur-xl border-t border-neutral-200/90 dark:border-emerald-950/80 shadow-[0_-4px_24px_rgba(0,0,0,0.06)]">
      <div className="max-w-md mx-auto grid grid-cols-4 h-16 px-1">
        {tabs.map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative flex flex-col items-center justify-center h-full min-h-[44px] transition-all cursor-pointer group select-none active:scale-95 ${
                isActive
                  ? 'text-emerald-700 dark:text-amber-400 font-bold'
                  : 'text-neutral-500 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-200 font-medium'
              }`}
            >
              {/* Active Tab indicator bar at top */}
              {isActive && (
                <span className="absolute top-0 w-8 h-1 rounded-b-full bg-emerald-600 dark:bg-amber-400 shadow-xs" />
              )}

              <div className="relative">
                <Icon
                  className={`w-5 h-5 transition-transform duration-200 ${
                    isActive ? 'scale-115 stroke-[2.3]' : 'group-hover:scale-105'
                  }`}
                />
                {tab.badge !== null && tab.id === 'favoritos' && (
                  <span className="absolute -top-1.5 -right-2 min-w-[16px] h-4 px-1 rounded-full bg-rose-500 text-white text-[9px] font-bold flex items-center justify-center shadow-xs">
                    {tab.badge}
                  </span>
                )}
                {tab.badge !== null && tab.id === 'perfil' && (
                  <span className="absolute -top-1.5 -right-2.5 px-1 py-0.2 rounded-full bg-amber-500 text-neutral-950 text-[8px] font-extrabold flex items-center justify-center shadow-xs">
                    ★
                  </span>
                )}
              </div>

              <span className="text-[11px] tracking-tight mt-1 whitespace-nowrap">
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
