import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { BUSINESS_INFO } from '../data/products';
import { 
  CheckCircle2, 
  Send, 
  X, 
  Copy, 
  Check, 
  ShoppingBag, 
  Clock, 
  MapPin, 
  CreditCard,
  ArrowRight
} from 'lucide-react';

export const OrderConfirmationModal: React.FC = () => {
  const { latestConfirmedOrder, setLatestConfirmedOrder, showToast } = useApp();
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (!latestConfirmedOrder) return null;

  const copyText = (txt: string, key: string, msg: string) => {
    navigator.clipboard.writeText(txt);
    setCopiedKey(key);
    showToast(msg, 'success');
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const handleOpenWhatsApp = () => {
    const url = `https://wa.me/${BUSINESS_INFO.whatsappRaw}?text=${encodeURIComponent(latestConfirmedOrder.whatsappMessage)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
      <div 
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-sm bg-white dark:bg-[#071e18] rounded-3xl p-5 border border-neutral-200 dark:border-emerald-950 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={() => setLatestConfirmedOrder(null)}
          className="absolute right-4 top-4 w-7 h-7 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-500 hover:bg-neutral-200 flex items-center justify-center"
          aria-label="Cerrar confirmación"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Celebration Header */}
        <div className="text-center pt-2">
          <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-3 shadow-lg shadow-emerald-900/10">
            <CheckCircle2 className="w-9 h-9 stroke-[2.3]" />
          </div>

          <span className="text-[11px] font-bold tracking-wider uppercase text-emerald-700 dark:text-amber-400">
            ¡Pedido Registrado con Éxito!
          </span>
          <h3 className="text-lg font-extrabold text-neutral-900 dark:text-white font-display mt-0.5">
            Orden {latestConfirmedOrder.id}
          </h3>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
            Se ha abierto el WhatsApp oficial de HUAYNA (+51 904 887 006)
          </p>
        </div>

        {/* Status banner */}
        <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-900/60 flex items-center gap-2.5 text-xs text-emerald-900 dark:text-emerald-200">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping shrink-0" />
          <div>
            <p className="font-bold">Estado: En preparación en cocina</p>
            <p className="text-[11px] text-emerald-700/80 dark:text-emerald-300/70">
              Tiempo estimado de entrega: 25 - 40 min
            </p>
          </div>
        </div>

        {/* Summary Details */}
        <div className="p-3.5 rounded-2xl bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200/80 dark:border-neutral-800 space-y-2 text-xs">
          <div className="flex items-center justify-between text-neutral-500">
            <span>Cliente:</span>
            <span className="font-semibold text-neutral-800 dark:text-neutral-200">
              {latestConfirmedOrder.customer.name}
            </span>
          </div>
          <div className="flex items-center justify-between text-neutral-500">
            <span>Dirección:</span>
            <span className="font-semibold text-neutral-800 dark:text-neutral-200 truncate max-w-[200px]">
              {latestConfirmedOrder.customer.address}
            </span>
          </div>
          <div className="flex items-center justify-between text-neutral-500">
            <span>Método de pago:</span>
            <span className="font-semibold uppercase text-neutral-800 dark:text-neutral-200">
              {latestConfirmedOrder.paymentMethod}
            </span>
          </div>

          <div className="pt-2 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between text-sm font-bold">
            <span className="text-neutral-900 dark:text-white">Total Pagado / a Pagar:</span>
            <span className="text-emerald-800 dark:text-amber-400 font-extrabold tabular-nums">
              S/ {latestConfirmedOrder.total.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Payment reminder if Yape / BCP */}
        {latestConfirmedOrder.paymentMethod === 'yape' && (
          <div className="p-3 rounded-2xl bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-900/50 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase text-purple-700 dark:text-purple-300">
                Número Yape Oficial
              </p>
              <p className="text-sm font-black text-purple-950 dark:text-purple-100">
                {BUSINESS_INFO.yape.number}
              </p>
            </div>
            <button
              type="button"
              onClick={() => copyText('904887006', 'modal_yape', 'Número copiado')}
              className="px-2.5 py-1 rounded-lg bg-purple-700 text-white text-xs font-bold flex items-center gap-1 cursor-pointer"
            >
              {copiedKey === 'modal_yape' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
              <span>{copiedKey === 'modal_yape' ? 'Listo' : 'Copiar'}</span>
            </button>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-2 pt-1">
          <button
            type="button"
            onClick={handleOpenWhatsApp}
            className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md flex items-center justify-center gap-2 cursor-pointer transition-colors"
          >
            <Send className="w-3.5 h-3.5 text-amber-300" />
            <span>Reabrir Chat de WhatsApp</span>
          </button>

          <button
            type="button"
            onClick={() => setLatestConfirmedOrder(null)}
            className="w-full py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 text-xs font-semibold text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors cursor-pointer"
          >
            Seguir explorando el menú
          </button>
        </div>
      </div>
    </div>
  );
};
