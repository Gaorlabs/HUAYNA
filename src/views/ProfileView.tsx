import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { BUSINESS_INFO, DISTRICTS } from '../data/products';
import { 
  User as UserIcon, 
  Award, 
  MapPin, 
  Phone, 
  Mail, 
  Moon, 
  Sun, 
  MessageCircle, 
  Clock, 
  LogOut, 
  ReceiptText, 
  ChevronRight, 
  ChevronDown,
  Sparkles,
  Send
} from 'lucide-react';

export const ProfileView: React.FC = () => {
  const { 
    user, 
    setIsAuthOpen, 
    logout, 
    orders, 
    isDarkMode, 
    toggleDarkMode,
    showToast 
  } = useApp();

  const [showOrderHistory, setShowOrderHistory] = useState(false);

  const handleOpenSupportWhatsApp = () => {
    const text = encodeURIComponent('¡Hola HUAYNA! Tengo una consulta sobre el menú o mi pedido.');
    window.open(`https://wa.me/${BUSINESS_INFO.whatsappRaw}?text=${text}`, '_blank');
  };

  return (
    <div className="space-y-4 pb-28">
      {/* Title */}
      <div className="flex items-center justify-between px-1">
        <div>
          <h2 className="text-lg font-bold text-neutral-900 dark:text-white font-display">
            Mi Cuenta
          </h2>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            Perfil, Puntos Fit y opciones de la app
          </p>
        </div>
      </div>

      {/* User Card */}
      <div className="p-4 rounded-3xl bg-white dark:bg-[#071e18] border border-neutral-200/90 dark:border-emerald-950/80 shadow-xs flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-800 to-teal-700 text-amber-300 flex items-center justify-center font-bold text-lg shadow-sm">
            {user ? user.name.charAt(0).toUpperCase() : <UserIcon className="w-6 h-6 text-white" />}
          </div>
          <div>
            <h3 className="font-bold text-sm text-neutral-900 dark:text-white">
              {user ? user.name : 'Invitado Fit'}
            </h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              {user ? user.email : 'Inicia sesión para acumular puntos'}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setIsAuthOpen(true)}
          className="px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950 text-emerald-800 dark:text-amber-400 text-xs font-bold border border-emerald-200 dark:border-emerald-800/60 hover:bg-emerald-100 transition-colors cursor-pointer"
        >
          {user ? 'Editar' : 'Ingresar'}
        </button>
      </div>

      {/* Loyalty Puntos Fit Card */}
      <div className="p-4 rounded-3xl bg-gradient-to-br from-[#0a3127] via-[#0e4437] to-[#06211a] text-white shadow-md border border-emerald-500/20 relative overflow-hidden">
        <div className="absolute -right-6 -bottom-6 w-28 h-28 rounded-full bg-amber-400/10 blur-xl pointer-events-none" />
        
        <div className="flex items-start justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1">
              <Award className="w-3.5 h-3.5" />
              Club HUAYNA Saludable
            </span>
            <p className="text-2xl font-black text-amber-300 tabular-nums mt-1">
              {user ? user.fitPoints : 0} <span className="text-xs font-semibold text-emerald-200">Puntos Fit</span>
            </p>
          </div>
          <span className="text-[10px] bg-white/10 px-2.5 py-1 rounded-full border border-white/10 text-emerald-100">
            1 pt = S/ 2 gastados
          </span>
        </div>

        <p className="text-xs text-emerald-100/80 mt-2">
          Canjea tus puntos por postres y batidos proteicos gratis en tus próximos pedidos.
        </p>
      </div>

      {/* Quick Settings list */}
      <div className="bg-white dark:bg-[#071e18] rounded-3xl border border-neutral-200/90 dark:border-emerald-950/80 overflow-hidden divide-y divide-neutral-100 dark:divide-emerald-950/60 shadow-xs">
        {/* Dark Mode Row */}
        <div className="p-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-neutral-600 dark:text-neutral-300">
              {isDarkMode ? <Moon className="w-4 h-4 text-amber-400" /> : <Sun className="w-4 h-4 text-amber-500" />}
            </div>
            <div>
              <p className="text-xs font-bold text-neutral-800 dark:text-neutral-200">
                Tema de la aplicación
              </p>
              <p className="text-[10px] text-neutral-500">
                {isDarkMode ? 'Modo Oscuro activado' : 'Modo Claro activado'}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={toggleDarkMode}
            className="px-3 py-1.5 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-xs font-semibold text-neutral-700 dark:text-neutral-200 hover:bg-neutral-200 cursor-pointer"
          >
            Cambiar
          </button>
        </div>

        {/* WhatsApp direct support */}
        <div 
          onClick={handleOpenSupportWhatsApp}
          className="p-3.5 flex items-center justify-between cursor-pointer hover:bg-neutral-50 dark:hover:bg-neutral-800/40 transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 flex items-center justify-center">
              <MessageCircle className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-neutral-800 dark:text-neutral-200">
                Atención al Cliente por WhatsApp
              </p>
              <p className="text-[10px] text-neutral-500">
                {BUSINESS_INFO.phoneDisplay} · Tacna
              </p>
            </div>
          </div>
          <ChevronRight className="w-4 h-4 text-neutral-400" />
        </div>

        {/* Local & Hours */}
        <div className="p-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-amber-100 dark:bg-amber-950/80 text-amber-700 dark:text-amber-400 flex items-center justify-center">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-neutral-800 dark:text-neutral-200">
                Local Físico en Tacna
              </p>
              <p className="text-[10px] text-neutral-500">
                {BUSINESS_INFO.address}
              </p>
            </div>
          </div>
        </div>

        {/* Past receipts collapsible option */}
        <div className="p-3.5">
          <button
            type="button"
            onClick={() => setShowOrderHistory(prev => !prev)}
            className="w-full flex items-center justify-between text-left cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 flex items-center justify-center">
                <ReceiptText className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-neutral-800 dark:text-neutral-200">
                  Comprobantes y recibos anteriores
                </p>
                <p className="text-[10px] text-neutral-500">
                  {orders.length} {orders.length === 1 ? 'comprobante' : 'comprobantes'} guardados
                </p>
              </div>
            </div>
            {showOrderHistory ? <ChevronDown className="w-4 h-4 text-neutral-400" /> : <ChevronRight className="w-4 h-4 text-neutral-400" />}
          </button>

          {showOrderHistory && (
            <div className="mt-3 pt-3 border-t border-neutral-100 dark:border-emerald-950/60 space-y-2">
              {orders.length === 0 ? (
                <p className="text-xs text-neutral-500 text-center py-2">
                  No tienes recibos anteriores registrados aún.
                </p>
              ) : (
                orders.map(o => (
                  <div key={o.id} className="p-2.5 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200/70 dark:border-neutral-800 text-xs flex items-center justify-between">
                    <div>
                      <p className="font-bold text-neutral-800 dark:text-neutral-200 font-mono">{o.id}</p>
                      <p className="text-[10px] text-neutral-500">{o.customer.district} · {o.items.length} items</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-emerald-800 dark:text-amber-400 tabular-nums">S/ {o.total.toFixed(2)}</p>
                      <button
                        type="button"
                        onClick={() => {
                          const url = `https://wa.me/${BUSINESS_INFO.whatsappRaw}?text=${encodeURIComponent(o.whatsappMessage)}`;
                          window.open(url, '_blank');
                        }}
                        className="text-[10px] text-emerald-600 hover:underline flex items-center gap-0.5 justify-end"
                      >
                        <Send className="w-2.5 h-2.5" />
                        Reenviar
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>

      {/* Logout button if authenticated */}
      {user && (
        <button
          type="button"
          onClick={logout}
          className="w-full py-3 rounded-2xl border border-rose-200 dark:border-rose-950 text-rose-600 dark:text-rose-400 text-xs font-bold hover:bg-rose-50 dark:hover:bg-rose-950/30 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Cerrar Sesión</span>
        </button>
      )}
    </div>
  );
};
