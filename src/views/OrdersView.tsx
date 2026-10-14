import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { BUSINESS_INFO } from '../data/products';
import { Order } from '../types';
import { 
  ShoppingBag, 
  Clock, 
  Send, 
  CheckCircle2, 
  RotateCcw, 
  CreditCard, 
  MapPin, 
  Copy, 
  Check, 
  ChevronDown, 
  ChevronUp,
  X
} from 'lucide-react';

export const OrdersView: React.FC = () => {
  const { orders, setActiveTab, addToCart, showToast } = useApp();
  const [selectedOrderForPayment, setSelectedOrderForPayment] = useState<Order | null>(null);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyText = (txt: string, key: string, msg: string) => {
    navigator.clipboard.writeText(txt);
    setCopiedKey(key);
    showToast(msg, 'success');
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const handleResendToWhatsApp = (order: Order) => {
    const url = `https://wa.me/${BUSINESS_INFO.whatsappRaw}?text=${encodeURIComponent(order.whatsappMessage)}`;
    window.open(url, '_blank');
    showToast('Abriendo WhatsApp corporativo de HUAYNA...', 'info');
  };

  const handleReorder = (order: Order) => {
    order.items.forEach(item => {
      addToCart(item.product, item.quantity, item.selectedOptions, item.notes);
    });
    showToast('¡Productos agregados a tu canasta!', 'success');
    setActiveTab('inicio');
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'entregado':
        return {
          label: 'Entregado',
          color: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-300'
        };
      case 'en_camino':
        return {
          label: 'En camino con repartidor',
          color: 'bg-blue-100 text-blue-800 dark:bg-blue-950/70 dark:text-blue-300'
        };
      case 'preparando':
        return {
          label: 'En preparación en cocina',
          color: 'bg-amber-100 text-amber-800 dark:bg-amber-950/70 dark:text-amber-300'
        };
      default:
        return {
          label: 'Pedido Recibido',
          color: 'bg-purple-100 text-purple-800 dark:bg-purple-950/70 dark:text-purple-300'
        };
    }
  };

  return (
    <div className="space-y-4 pb-28">
      {/* Title */}
      <div className="flex items-center justify-between px-1">
        <div>
          <h2 className="text-lg font-bold text-neutral-900 dark:text-white font-display">
            Mis Pedidos
          </h2>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            Historial de pedidos y estado de entrega
          </p>
        </div>
        <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-amber-400">
          {orders.length} {orders.length === 1 ? 'pedido' : 'pedidos'}
        </span>
      </div>

      {orders.length === 0 ? (
        <div className="p-8 text-center bg-white dark:bg-[#071e18] rounded-3xl border border-neutral-200 dark:border-emerald-950 mt-4 space-y-3">
          <div className="w-14 h-14 mx-auto rounded-full bg-emerald-50 dark:bg-emerald-950/80 text-emerald-700 dark:text-amber-400 flex items-center justify-center">
            <ShoppingBag className="w-7 h-7" />
          </div>
          <h3 className="font-bold text-base text-neutral-800 dark:text-white">
            Aún no has realizado pedidos
          </h3>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 max-w-xs mx-auto">
            Elige tus postres o platillos saludables favoritos y haz tu primer pedido con delivery directo por WhatsApp.
          </p>
          <button
            type="button"
            onClick={() => setActiveTab('inicio')}
            className="px-5 py-2.5 rounded-xl bg-emerald-700 text-white text-xs font-bold hover:bg-emerald-800 transition-colors cursor-pointer"
          >
            Explorar Menú HUAYNA
          </button>
        </div>
      ) : (
        <div className="space-y-3.5">
          {orders.map(order => {
            const badge = getStatusBadge(order.status);
            const dateStr = new Date(order.createdAt).toLocaleDateString('es-PE', {
              day: '2-digit',
              month: 'short',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            });

            return (
              <div
                key={order.id}
                className="bg-white dark:bg-[#071e18] rounded-2xl border border-neutral-200/90 dark:border-emerald-950/80 p-4 shadow-xs space-y-3"
              >
                {/* Order Top Bar */}
                <div className="flex items-center justify-between pb-2 border-b border-neutral-100 dark:border-emerald-950/60">
                  <div>
                    <span className="text-xs font-bold text-neutral-900 dark:text-white font-mono">
                      {order.id}
                    </span>
                    <p className="text-[10px] text-neutral-400 flex items-center gap-1 mt-0.5">
                      <Clock className="w-3 h-3" />
                      <span>{dateStr}</span>
                    </p>
                  </div>
                  <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${badge.color}`}>
                    {badge.label}
                  </span>
                </div>

                {/* Items summary */}
                <div className="space-y-1.5 text-xs">
                  {order.items.map((item, i) => (
                    <div key={i} className="flex justify-between text-neutral-700 dark:text-neutral-300">
                      <span className="truncate pr-2">
                        {item.quantity}x {item.product.name}
                        {item.selectedOptions && Object.keys(item.selectedOptions).length > 0 && (
                          <span className="text-[10px] text-neutral-400 ml-1">
                            ({Object.values(item.selectedOptions).join(', ')})
                          </span>
                        )}
                      </span>
                      <span className="tabular-nums font-semibold shrink-0">
                        S/ {item.totalPrice.toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Address & Payment Info */}
                <div className="pt-2 border-t border-neutral-100 dark:border-emerald-950/60 flex items-center justify-between text-[11px] text-neutral-500 dark:text-neutral-400">
                  <div className="flex items-center gap-1 truncate max-w-[65%]">
                    <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span className="truncate">{order.customer.district} · {order.customer.address || 'Recojo en local'}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-sm text-neutral-900 dark:text-white tabular-nums">
                      S/ {order.total.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Actions row: Resend to WhatsApp & Payment Details & Re-order */}
                <div className="pt-2 flex items-center gap-2 flex-wrap">
                  {/* Resend to WhatsApp */}
                  <button
                    type="button"
                    onClick={() => handleResendToWhatsApp(order)}
                    className="flex-1 min-h-[36px] px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Reenviar a WhatsApp</span>
                  </button>

                  {/* Consult Payment info */}
                  <button
                    type="button"
                    onClick={() => setSelectedOrderForPayment(order)}
                    className="px-3 py-1.5 min-h-[36px] rounded-xl border border-neutral-200 dark:border-emerald-900 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <CreditCard className="w-3.5 h-3.5 text-amber-500" />
                    <span>Datos de Pago</span>
                  </button>

                  {/* Reorder */}
                  <button
                    type="button"
                    onClick={() => handleReorder(order)}
                    className="px-2.5 py-1.5 min-h-[36px] rounded-xl border border-neutral-200 dark:border-emerald-900 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-800 text-xs font-semibold flex items-center gap-1 transition-colors"
                    title="Volver a pedir estos mismos productos"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Repetir</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Payment details modal */}
      {selectedOrderForPayment && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="relative w-full max-w-sm bg-white dark:bg-[#071e18] rounded-3xl p-5 border border-neutral-200 dark:border-emerald-950 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-neutral-100 dark:border-emerald-950">
              <h3 className="font-bold text-sm text-neutral-900 dark:text-white">
                Datos de Pago · Orden {selectedOrderForPayment.id}
              </h3>
              <button
                onClick={() => setSelectedOrderForPayment(null)}
                className="w-7 h-7 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-neutral-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Yape info */}
            <div className="p-3.5 rounded-2xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-900/60 space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-purple-700 dark:text-purple-300 uppercase">
                    Yape Oficial
                  </span>
                  <p className="text-base font-black text-purple-950 dark:text-purple-100">
                    {BUSINESS_INFO.yape.number}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => copyText('904887006', 'modal_yape', 'Número copiado')}
                  className="px-2.5 py-1 rounded-lg bg-purple-700 text-white text-[11px] font-bold flex items-center gap-1"
                >
                  {copiedKey === 'modal_yape' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedKey === 'modal_yape' ? 'Listo' : 'Copiar'}</span>
                </button>
              </div>
              <p className="text-[11px] text-purple-900 dark:text-purple-200">
                Titular: {BUSINESS_INFO.yape.holder}
              </p>
            </div>

            {/* BCP Info */}
            <div className="p-3.5 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-blue-700 dark:text-blue-300 uppercase">
                    Cuenta Ahorros BCP
                  </span>
                  <p className="text-xs font-mono font-bold text-blue-950 dark:text-blue-100">
                    {BUSINESS_INFO.bcp.accountNumber}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => copyText(BUSINESS_INFO.bcp.accountNumber.replace(/-/g, ''), 'modal_bcp', 'Cuenta copiada')}
                  className="px-2.5 py-1 rounded-lg bg-blue-700 text-white text-[11px] font-bold flex items-center gap-1"
                >
                  {copiedKey === 'modal_bcp' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedKey === 'modal_bcp' ? 'Listo' : 'Copiar'}</span>
                </button>
              </div>
              <p className="text-[11px] text-blue-900 dark:text-blue-200">
                CCI: {BUSINESS_INFO.bcp.cci}
              </p>
            </div>

            <button
              onClick={() => setSelectedOrderForPayment(null)}
              className="w-full py-2.5 rounded-xl bg-neutral-900 dark:bg-neutral-800 text-white text-xs font-bold"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
