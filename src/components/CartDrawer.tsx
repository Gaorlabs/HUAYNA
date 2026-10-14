import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { BUSINESS_INFO, DISTRICTS } from '../data/products';
import { CustomerInfo, PaymentMethodType, DistrictDelivery } from '../types';
import confetti from 'canvas-confetti';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag,
  Send,
  User as UserIcon,
  Phone,
  MapPin,
  CreditCard,
  Copy,
  Check,
  Bike,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const { 
    isCartOpen, 
    setIsCartOpen, 
    cart, 
    updateQuantity, 
    removeFromCart, 
    clearCart, 
    cartSubtotal,
    user,
    createOrder,
    setLatestConfirmedOrder,
    showToast
  } = useApp();

  const [selectedDistrict, setSelectedDistrict] = useState<DistrictDelivery>(DISTRICTS[0]);

  const [customer, setCustomer] = useState<CustomerInfo>({
    name: user?.name || '',
    phone: user?.phone || '',
    address: user?.address || '',
    district: selectedDistrict.name,
    reference: user?.reference || '',
    notes: ''
  });

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>('yape');
  const [cashAmount, setCashAmount] = useState<string>('');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  if (!isCartOpen) return null;

  // Total includes products subtotal + transparent delivery fee according to district (NO tip)
  const deliveryFee = selectedDistrict.fee;
  const grandTotal = cartSubtotal + deliveryFee;

  const copyToClipboard = (text: string, key: string, msg: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    showToast(msg, 'success');
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const validate = () => {
    const errors: Record<string, string> = {};
    if (!customer.name.trim()) errors.name = 'Ingresa tu nombre y apellido';
    if (!customer.phone.trim() || customer.phone.replace(/\D/g, '').length < 8) {
      errors.phone = 'Ingresa tu número de celular o WhatsApp';
    }
    if (selectedDistrict.id !== 'recojo' && !customer.address.trim()) {
      errors.address = 'Ingresa tu dirección exacta de entrega';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleDistrictChange = (distId: string) => {
    const found = DISTRICTS.find(d => d.id === distId);
    if (found) {
      setSelectedDistrict(found);
      setCustomer(prev => ({ ...prev, district: found.name }));
    }
  };

  const handleConfirmOrder = async () => {
    if (cart.length === 0) return;
    if (!validate()) {
      showToast('Por favor completa tus datos para el envío', 'warning');
      return;
    }

    setIsSubmitting(true);
    const orderNumber = `#HY-${Math.floor(10000 + Math.random() * 90000)}`;
    const now = new Date();
    const formattedDate = `${now.toLocaleDateString('es-PE')} ${now.toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit' })}`;

    // Build structured WhatsApp message for HUAYNA business phone
    let message = `🌿 *NUEVO PEDIDO - HUAYNA CAFETERÍA SALUDABLE* 🌿\n`;
    message += `📋 *Pedido:* ${orderNumber}\n`;
    message += `📅 *Fecha:* ${formattedDate}\n\n`;

    message += `👤 *DATOS DEL CLIENTE:*\n`;
    message += `• *Nombre:* ${customer.name}\n`;
    message += `• *Teléfono:* ${customer.phone}\n`;
    message += `• *Distrito / Modalidad:* ${selectedDistrict.name}\n`;
    if (selectedDistrict.id !== 'recojo') {
      message += `• *Dirección:* ${customer.address}\n`;
    }
    if (customer.reference) {
      message += `• *Referencia:* ${customer.reference}\n`;
    }

    message += `\n🛒 *DETALLE DEL PEDIDO:*\n`;
    cart.forEach(item => {
      message += `• ${item.quantity}x ${item.product.name}`;
      if (item.selectedOptions && Object.keys(item.selectedOptions).length > 0) {
        const opts = Object.values(item.selectedOptions).join(', ');
        message += ` (${opts})`;
      }
      message += ` - S/ ${item.totalPrice.toFixed(2)}\n`;
      if (item.notes) {
        message += `   ↳ Nota: ${item.notes}\n`;
      }
    });

    message += `\n📊 *RESUMEN DE PAGO:*\n`;
    message += `• Subtotal productos: S/ ${cartSubtotal.toFixed(2)}\n`;
    message += `• Costo de envío (${selectedDistrict.name}): S/ ${deliveryFee.toFixed(2)}\n`;
    message += `💰 *TOTAL A PAGAR: S/ ${grandTotal.toFixed(2)}*\n\n`;

    message += `💳 *MÉTODO DE PAGO SELECCIONADO:*\n`;
    if (paymentMethod === 'yape') {
      message += `• *Yape:* Pago al 904 887 006 (Titular: ${BUSINESS_INFO.yape.holder}) - Adjunto captura de constancia aquí.\n`;
    } else if (paymentMethod === 'bcp') {
      message += `• *BCP:* Transferencia a cuenta ${BUSINESS_INFO.bcp.accountNumber} - Adjunto constancia.\n`;
    } else {
      message += `• *Efectivo:* ${cashAmount ? `Pagaré con S/ ${cashAmount}` : 'Monto exacto contra-entrega'}\n`;
    }

    message += `\n📍 *HUAYNA:* Av. Varela 409, Tacna (Frente a las 200 Casas)`;

    // Save order locally and in state
    const created = await createOrder({
      id: orderNumber,
      items: cart,
      subtotal: cartSubtotal,
      deliveryFee: deliveryFee,
      discount: 0,
      tip: 0,
      total: grandTotal,
      customer: {
        ...customer,
        district: selectedDistrict.name
      },
      paymentMethod,
      status: 'recibido',
      whatsappMessage: message
    });

    // Celebration Confetti
    try {
      confetti({ particleCount: 90, spread: 70, origin: { y: 0.6 } });
    } catch {}

    // Open WhatsApp directly with the business phone (+51 904 887 006)
    const whatsappUrl = `https://wa.me/${BUSINESS_INFO.whatsappRaw}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');

    showToast('¡Pedido listo! Abriendo WhatsApp de HUAYNA...', 'success');
    setIsSubmitting(false);
    setIsCartOpen(false);
    if (created) {
      setLatestConfirmedOrder(created);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end animate-fadeIn">
      <div 
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md h-full bg-white dark:bg-[#071c17] shadow-2xl flex flex-col justify-between overflow-hidden"
      >
        {/* Drawer Header */}
        <div className="p-4 border-b border-neutral-100 dark:border-emerald-950 flex items-center justify-between bg-neutral-50/90 dark:bg-emerald-950/40">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-emerald-800 dark:text-amber-400" />
            <h3 className="font-extrabold text-base text-neutral-900 dark:text-neutral-100">
              Tu Canasta de Pedido
            </h3>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-200 font-extrabold">
              {cart.reduce((a, b) => a + b.quantity, 0)}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {cart.length > 0 && (
              <button
                type="button"
                onClick={clearCart}
                className="text-xs font-semibold text-rose-600 dark:text-rose-400 hover:underline px-2 py-1 cursor-pointer"
              >
                Vaciar
              </button>
            )}
            <button
              type="button"
              onClick={() => setIsCartOpen(false)}
              className="w-8 h-8 rounded-full bg-neutral-200/80 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-300 hover:bg-neutral-300 dark:hover:bg-neutral-700 flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Cerrar canasta"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Order Flow */}
        <div className="flex-1 overflow-y-auto p-4 space-y-5">
          {cart.length === 0 ? (
            <div className="h-72 flex flex-col items-center justify-center text-center p-6 text-neutral-400">
              <ShoppingBag className="w-14 h-14 stroke-[1.2] mb-3 text-neutral-300 dark:text-neutral-700" />
              <p className="text-sm font-bold text-neutral-800 dark:text-neutral-200">
                Tu canasta está vacía
              </p>
              <p className="text-xs text-neutral-500 mt-1 max-w-xs">
                Selecciona uno o más productos de nuestro menú saludable para hacer tu pedido.
              </p>
              <button
                type="button"
                onClick={() => setIsCartOpen(false)}
                className="mt-4 px-6 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 dark:bg-amber-500 dark:hover:bg-amber-400 text-white dark:text-neutral-950 text-xs font-bold shadow-sm cursor-pointer"
              >
                Explorar Menú
              </button>
            </div>
          ) : (
            <>
              {/* 1. Lista de Productos Seleccionados */}
              <div>
                <h4 className="text-xs font-black uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-2 flex items-center justify-between">
                  <span>1. Productos seleccionados</span>
                  <span className="text-[11px] font-semibold text-emerald-700 dark:text-amber-400">
                    {cart.length} {cart.length === 1 ? 'producto' : 'productos'}
                  </span>
                </h4>

                <div className="divide-y divide-neutral-100 dark:divide-emerald-950/60 bg-neutral-50/80 dark:bg-neutral-900/40 rounded-2xl p-2.5 border border-neutral-200/80 dark:border-emerald-950/80 shadow-xs">
                  {cart.map(item => (
                    <div key={item.id} className="py-2.5 first:pt-1 last:pb-1 flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h5 className="text-xs font-extrabold text-neutral-900 dark:text-neutral-100 truncate">
                            {item.product.name}
                          </h5>
                          <span className="text-xs font-black tabular-nums text-emerald-800 dark:text-amber-400 ml-2">
                            S/ {item.totalPrice.toFixed(2)}
                          </span>
                        </div>

                        {item.selectedOptions && Object.keys(item.selectedOptions).length > 0 && (
                          <p className="text-[10px] text-emerald-700 dark:text-emerald-400 mt-0.5">
                            {Object.values(item.selectedOptions).join(', ')}
                          </p>
                        )}

                        <div className="flex items-center justify-between mt-2">
                          {/* Compact Stepper */}
                          <div className="flex items-center gap-1 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-xl p-0.5 shadow-2xs">
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, -1)}
                              className="w-6 h-6 rounded-lg bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-200 flex items-center justify-center hover:bg-neutral-200 active:scale-90 transition-transform cursor-pointer"
                              aria-label="Disminuir"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="w-5 text-center text-xs font-black tabular-nums text-neutral-900 dark:text-neutral-100">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, 1)}
                              className="w-6 h-6 rounded-lg bg-emerald-700 dark:bg-amber-500 text-white dark:text-neutral-950 flex items-center justify-center hover:bg-emerald-800 active:scale-90 transition-transform cursor-pointer"
                              aria-label="Aumentar"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <button
                            type="button"
                            onClick={() => removeFromCart(item.id)}
                            className="text-neutral-400 hover:text-rose-600 p-1 transition-colors cursor-pointer"
                            aria-label="Eliminar"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 2. Lugar de Entrega y Precio de Envío (Tacna) */}
              <div className="space-y-2 pt-1">
                <h4 className="text-xs font-black uppercase tracking-wider text-neutral-700 dark:text-neutral-300 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Bike className="w-4 h-4 text-emerald-600 dark:text-amber-400" />
                    <span>2. Distrito & Envío (Tacna)</span>
                  </span>
                  <span className="text-[11px] font-bold text-emerald-800 dark:text-amber-400">
                    {deliveryFee > 0 ? `Envío S/ ${deliveryFee.toFixed(2)}` : 'Recojo Gratis'}
                  </span>
                </h4>

                {/* District Dropdown Selector */}
                <div className="relative">
                  <select
                    value={selectedDistrict.id}
                    onChange={(e) => handleDistrictChange(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-2xl border border-neutral-200 dark:border-emerald-950 bg-white dark:bg-neutral-900 text-xs font-bold text-neutral-800 dark:text-neutral-100 shadow-xs focus:outline-none focus:ring-2 focus:ring-emerald-600 dark:focus:ring-amber-400 appearance-none cursor-pointer"
                  >
                    {DISTRICTS.map(d => (
                      <option key={d.id} value={d.id}>
                        {d.name} {d.fee > 0 ? `(+ S/ ${d.fee.toFixed(2)})` : '(Gratis / Av. Varela 409)'} · {d.estimatedTime}
                      </option>
                    ))}
                  </select>
                  <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-neutral-400 text-xs">
                    ▼
                  </div>
                </div>
              </div>

              {/* 3. Datos del Cliente (Nombre, Teléfono, Dirección) */}
              <div className="space-y-2.5 pt-1">
                <h4 className="text-xs font-black uppercase tracking-wider text-neutral-700 dark:text-neutral-300 flex items-center gap-1.5">
                  <UserIcon className="w-4 h-4 text-emerald-600 dark:text-amber-400" />
                  <span>3. Datos para el Envío</span>
                </h4>

                <div>
                  <label className="block text-[11px] font-bold text-neutral-600 dark:text-neutral-300 mb-1">
                    Nombre y Apellido *
                  </label>
                  <input
                    type="text"
                    value={customer.name}
                    onChange={(e) => setCustomer(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Ej: Daniel Quispe"
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-xs bg-neutral-50 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-emerald-600 transition-all ${
                      formErrors.name ? 'border-rose-500' : 'border-neutral-200 dark:border-neutral-800'
                    }`}
                  />
                  {formErrors.name && (
                    <p className="text-[10px] text-rose-500 mt-0.5">{formErrors.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-neutral-600 dark:text-neutral-300 mb-1">
                    Número de Celular / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    value={customer.phone}
                    onChange={(e) => setCustomer(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="Ej: 904 887 006"
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-xs bg-neutral-50 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-emerald-600 transition-all ${
                      formErrors.phone ? 'border-rose-500' : 'border-neutral-200 dark:border-neutral-800'
                    }`}
                  />
                  {formErrors.phone && (
                    <p className="text-[10px] text-rose-500 mt-0.5">{formErrors.phone}</p>
                  )}
                </div>

                {selectedDistrict.id !== 'recojo' && (
                  <div>
                    <label className="block text-[11px] font-bold text-neutral-600 dark:text-neutral-300 mb-1">
                      Dirección exacta de entrega en Tacna *
                    </label>
                    <input
                      type="text"
                      value={customer.address}
                      onChange={(e) => setCustomer(prev => ({ ...prev, address: e.target.value }))}
                      placeholder="Ej: Av. Bolognesi 340 / Urb. La Natividad Mz B Lte 4"
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-xs bg-neutral-50 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-emerald-600 transition-all ${
                        formErrors.address ? 'border-rose-500' : 'border-neutral-200 dark:border-neutral-800'
                      }`}
                    />
                    {formErrors.address && (
                      <p className="text-[10px] text-rose-500 mt-0.5">{formErrors.address}</p>
                    )}
                  </div>
                )}

                <div>
                  <label className="block text-[11px] font-bold text-neutral-600 dark:text-neutral-300 mb-1">
                    Referencia de entrega (Opcional)
                  </label>
                  <input
                    type="text"
                    value={customer.reference}
                    onChange={(e) => setCustomer(prev => ({ ...prev, reference: e.target.value }))}
                    placeholder="Ej: Portón verde, frente a la farmacia, llamar al timbre"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-800 text-xs bg-neutral-50 dark:bg-neutral-900 text-neutral-800 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                </div>
              </div>

              {/* 4. Resumen con Precio de Envío (Sin Propina) */}
              <div className="bg-neutral-50/90 dark:bg-neutral-900/60 p-3.5 rounded-2xl border border-neutral-200/80 dark:border-emerald-950/80 space-y-1.5 text-xs">
                <div className="flex justify-between text-neutral-600 dark:text-neutral-400">
                  <span>Subtotal productos:</span>
                  <span className="font-bold tabular-nums text-neutral-900 dark:text-neutral-200">
                    S/ {cartSubtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-neutral-600 dark:text-neutral-400">
                  <span>Envío ({selectedDistrict.name}):</span>
                  <span className="font-bold tabular-nums text-neutral-900 dark:text-neutral-200">
                    {deliveryFee > 0 ? `S/ ${deliveryFee.toFixed(2)}` : 'Gratis'}
                  </span>
                </div>
                <div className="pt-2 border-t border-neutral-200 dark:border-neutral-800 flex justify-between font-extrabold text-sm text-neutral-900 dark:text-white">
                  <span>Total a Pagar:</span>
                  <span className="tabular-nums text-base text-emerald-800 dark:text-amber-400 font-black">
                    S/ {grandTotal.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* 5. Método de Pago (Yape para copiar / BCP / Efectivo) */}
              <div className="space-y-2 pt-1">
                <h4 className="text-xs font-black uppercase tracking-wider text-neutral-700 dark:text-neutral-300 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <CreditCard className="w-4 h-4 text-emerald-600 dark:text-amber-400" />
                    <span>4. Método de Pago</span>
                  </span>
                  <span className="text-[10px] text-neutral-400">Toca para copiar datos</span>
                </h4>

                {/* Tabs Selector */}
                <div className="grid grid-cols-3 gap-1.5 p-1 bg-neutral-100 dark:bg-neutral-900 rounded-2xl">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('yape')}
                    className={`py-2 px-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                      paymentMethod === 'yape'
                        ? 'bg-[#742384] text-white shadow-xs'
                        : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900'
                    }`}
                  >
                    Yape
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('bcp')}
                    className={`py-2 px-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                      paymentMethod === 'bcp'
                        ? 'bg-[#002a8f] text-white shadow-xs'
                        : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900'
                    }`}
                  >
                    BCP
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('efectivo')}
                    className={`py-2 px-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                      paymentMethod === 'efectivo'
                        ? 'bg-emerald-700 text-white shadow-xs'
                        : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900'
                    }`}
                  >
                    Efectivo
                  </button>
                </div>

                {/* Yape Box con botón Copiar Número */}
                {paymentMethod === 'yape' && (
                  <div className="p-3.5 rounded-2xl bg-purple-50/90 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-900/50 flex items-center justify-between gap-3 shadow-2xs">
                    <div>
                      <span className="text-[10px] font-black uppercase text-purple-700 dark:text-purple-300">
                        Número Yape Oficial
                      </span>
                      <p className="text-base font-black text-purple-950 dark:text-purple-100 tabular-nums tracking-wide">
                        {BUSINESS_INFO.yape.number}
                      </p>
                      <p className="text-[10px] text-purple-800/80 dark:text-purple-300/80">
                        Titular: {BUSINESS_INFO.yape.holder}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => copyToClipboard('904887006', 'yape_cart', '¡Número Yape copiado!')}
                      className="px-3.5 py-2 rounded-xl bg-purple-700 hover:bg-purple-800 text-white text-xs font-extrabold flex items-center gap-1.5 cursor-pointer shadow-xs active:scale-95 transition-all shrink-0"
                    >
                      {copiedKey === 'yape_cart' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      <span>{copiedKey === 'yape_cart' ? '¡Copiado!' : 'Copiar'}</span>
                    </button>
                  </div>
                )}

                {/* BCP Box */}
                {paymentMethod === 'bcp' && (
                  <div className="p-3.5 rounded-2xl bg-blue-50/90 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50 space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-[10px] font-black uppercase text-blue-700 dark:text-blue-300">
                          Cuenta Corriente BCP Soles
                        </span>
                        <p className="text-xs font-mono font-bold text-blue-950 dark:text-blue-100">
                          {BUSINESS_INFO.bcp.accountNumber}
                        </p>
                        <p className="text-[10px] text-blue-800/80 dark:text-blue-300/80">
                          Titular: {BUSINESS_INFO.bcp.accountHolder}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => copyToClipboard(BUSINESS_INFO.bcp.accountNumber.replace(/-/g, ''), 'bcp_acc', '¡Cuenta BCP copiada!')}
                        className="px-3 py-1.5 rounded-xl bg-blue-700 text-white text-xs font-bold flex items-center gap-1 cursor-pointer active:scale-95 transition-all shadow-xs shrink-0"
                      >
                        {copiedKey === 'bcp_acc' ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>Copiar</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* Efectivo Box */}
                {paymentMethod === 'efectivo' && (
                  <div className="p-3.5 rounded-2xl bg-emerald-50/90 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50 text-xs space-y-2">
                    <p className="text-neutral-700 dark:text-neutral-300">
                      Pagas en efectivo al repartidor al momento de recibir tu pedido.
                    </p>
                    <div>
                      <label className="block text-[11px] font-bold text-neutral-600 dark:text-neutral-300 mb-1">
                        ¿Con cuánto pagarás para llevar tu vuelto? (Opcional)
                      </label>
                      <input
                        type="number"
                        value={cashAmount}
                        onChange={(e) => setCashAmount(e.target.value)}
                        placeholder={`Ej: ${Math.ceil(grandTotal + 10)}`}
                        className="w-full px-3 py-2 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-xs"
                      />
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* Footer Checkout Summary & Primary WhatsApp Action Button */}
        {cart.length > 0 && (
          <div className="p-4 border-t border-neutral-100 dark:border-emerald-950/80 bg-neutral-50/95 dark:bg-emerald-950/40 space-y-3">
            <div className="flex justify-between items-baseline text-sm font-extrabold text-neutral-900 dark:text-white">
              <span>Total con Envío ({selectedDistrict.name}):</span>
              <span className="tabular-nums text-lg text-emerald-800 dark:text-amber-400 font-black">
                S/ {grandTotal.toFixed(2)}
              </span>
            </div>

            {/* Direct WhatsApp Action Button with high contrast */}
            <button
              type="button"
              disabled={isSubmitting}
              onClick={handleConfirmOrder}
              className="w-full h-13 rounded-2xl bg-gradient-to-r from-emerald-700 via-emerald-800 to-emerald-900 hover:brightness-105 active:scale-[0.98] text-white font-extrabold text-sm shadow-lg shadow-emerald-950/20 flex items-center justify-between px-4.5 transition-all cursor-pointer disabled:opacity-60"
            >
              <div className="flex items-center gap-2.5">
                <Send className="w-4.5 h-4.5 text-amber-300 shrink-0" />
                <span>Pedir por WhatsApp</span>
              </div>
              <span className="tabular-nums font-black text-amber-300 text-base">
                S/ {grandTotal.toFixed(2)}
              </span>
            </button>
            <p className="text-[10px] text-center text-neutral-500 dark:text-neutral-400">
              Redirige directo al WhatsApp de HUAYNA (+51 904 887 006)
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
