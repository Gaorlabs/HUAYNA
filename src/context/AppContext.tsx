import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, Order, User, ProductCategory, ActiveTab } from '../types';
import { PRODUCTS } from '../data/products';

interface ToastInfo {
  id: string;
  message: string;
  type?: 'success' | 'info' | 'warning';
}

interface AppContextType {
  // Splash & View mode
  showSplash: boolean;
  setShowSplash: (show: boolean) => void;
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  isPhoneFrameEnabled: boolean;
  setIsPhoneFrameEnabled: (enabled: boolean) => void;
  latestConfirmedOrder: Order | null;
  setLatestConfirmedOrder: (order: Order | null) => void;

  // Dark Mode
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  setDarkMode: (dark: boolean) => void;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, selectedOptions?: Record<string, string>, notes?: string) => void;
  updateQuantity: (cartItemId: string, delta: number) => void;
  removeFromCart: (cartItemId: string) => void;
  clearCart: () => void;
  cartSubtotal: number;
  cartCount: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;

  // Checkout & Modals
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  selectedProductForDetail: Product | null;
  setSelectedProductForDetail: (p: Product | null) => void;
  isAuthOpen: boolean;
  setIsAuthOpen: (open: boolean) => void;

  // Search & Filters
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  activeDietTag: string | null;
  setActiveDietTag: (tag: string | null) => void;

  // Favorites
  favorites: string[];
  toggleFavorite: (productId: string) => void;
  isFavorite: (productId: string) => boolean;

  // Auth & User
  user: User | null;
  token: string | null;
  login: (email: string, pass: string) => Promise<{ success: boolean; error?: string }>;
  register: (userData: any) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => Promise<boolean>;

  // Orders
  orders: Order[];
  createOrder: (orderPayload: Partial<Order>) => Promise<Order | null>;
  loadOrders: () => Promise<void>;

  // Toasts
  toasts: ToastInfo[];
  showToast: (message: string, type?: 'success' | 'info' | 'warning') => void;
  removeToast: (id: string) => void;
}

const AppContext = createContext<AppContextType | null>(null);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Splash starts true on first visit
  const [showSplash, setShowSplash] = useState<boolean>(() => {
    return true;
  });

  const [activeTab, setActiveTab] = useState<ActiveTab>('inicio');
  const [isPhoneFrameEnabled, setIsPhoneFrameEnabled] = useState<boolean>(true);
  const [latestConfirmedOrder, setLatestConfirmedOrder] = useState<Order | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeDietTag, setActiveDietTag] = useState<string | null>(null);

  // Dark Mode
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('huayna_theme');
    if (saved) return saved === 'dark';
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('huayna_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('huayna_theme', 'light');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => setIsDarkMode(prev => !prev);

  // Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('huayna_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('huayna_cart', JSON.stringify(cart));
    } catch (e) {
      // ignore
    }
  }, [cart]);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedProductForDetail, setSelectedProductForDetail] = useState<Product | null>(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  // Favorites
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('huayna_favs');
      return saved ? JSON.parse(saved) : ['postre-cuchareable-cacao', 'comida-chaufa-quinua'];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('huayna_favs', JSON.stringify(favorites));
    } catch (e) {}
  }, [favorites]);

  const toggleFavorite = (productId: string) => {
    setFavorites(prev => {
      const exists = prev.includes(productId);
      const next = exists ? prev.filter(id => id !== productId) : [...prev, productId];
      showToast(exists ? 'Eliminado de favoritos' : '¡Guardado en tus favoritos! 💚', 'info');
      return next;
    });
  };

  const isFavorite = (productId: string) => favorites.includes(productId);

  // Auth
  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem('huayna_token') || null;
  });

  const [user, setUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem('huayna_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Verify token on mount
  useEffect(() => {
    if (token) {
      fetch('/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(res => res.ok ? res.json() : Promise.reject())
        .then(data => {
          if (data && data.user) {
            setUser(data.user);
            localStorage.setItem('huayna_user', JSON.stringify(data.user));
          }
        })
        .catch(() => {
          // Token invalid
          setToken(null);
          setUser(null);
          localStorage.removeItem('huayna_token');
          localStorage.removeItem('huayna_user');
        });
    }
  }, [token]);

  const login = async (email: string, pass: string) => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password: pass })
      });
      const data = await res.json();
      if (!res.ok) {
        return { success: false, error: data.error || 'Credenciales inválidas' };
      }
      setToken(data.token);
      setUser(data.user);
      localStorage.setItem('huayna_token', data.token);
      localStorage.setItem('huayna_user', JSON.stringify(data.user));
      showToast(`¡Bienvenido de nuevo, ${data.user.name}! 🌿`, 'success');
      loadOrders();
      return { success: true };
    } catch (err) {
      return { success: false, error: 'Error de conexión con el servidor' };
    }
  };

  const register = async (userData: any) => {
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });
      const data = await res.json();
      if (!res.ok) {
        return { success: false, error: data.error || 'Error al crear la cuenta' };
      }
      setToken(data.token);
      setUser(data.user);
      localStorage.setItem('huayna_token', data.token);
      localStorage.setItem('huayna_user', JSON.stringify(data.user));
      showToast(`¡Cuenta creada! Ganaste 50 Puntos Fit de bienvenida 🎉`, 'success');
      return { success: true };
    } catch (err) {
      return { success: false, error: 'Error al registrar usuario' };
    }
  };

  const logout = () => {
    if (token) {
      fetch('/api/auth/logout', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` }
      }).catch(() => {});
    }
    setToken(null);
    setUser(null);
    localStorage.removeItem('huayna_token');
    localStorage.removeItem('huayna_user');
    showToast('Sesión cerrada correctamente', 'info');
  };

  const updateProfile = async (updateData: Partial<User>) => {
    if (!token) return false;
    try {
      const res = await fetch('/api/auth/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(updateData)
      });
      if (res.ok) {
        const d = await res.json();
        setUser(d.user);
        localStorage.setItem('huayna_user', JSON.stringify(d.user));
        showToast('Datos de perfil actualizados', 'success');
        return true;
      }
    } catch {}
    return false;
  };

  // Orders
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('huayna_orders');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const loadOrders = async () => {
    try {
      const headers: Record<string, string> = {};
      if (token) headers['Authorization'] = `Bearer ${token}`;
      const url = user?.phone ? `/api/orders?phone=${encodeURIComponent(user.phone)}` : '/api/orders';
      const res = await fetch(url, { headers });
      if (res.ok) {
        const d = await res.json();
        if (d.orders && d.orders.length > 0) {
          // Merge local and backend
          setOrders(prev => {
            const map = new Map<string, Order>();
            prev.forEach(o => map.set(o.id, o));
            d.orders.forEach((o: Order) => map.set(o.id, o));
            const merged = Array.from(map.values()).sort(
              (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            );
            localStorage.setItem('huayna_orders', JSON.stringify(merged));
            return merged;
          });
        }
      }
    } catch (e) {
      // offline fallback
    }
  };

  useEffect(() => {
    loadOrders();
  }, [token, user]);

  const createOrder = async (orderPayload: Partial<Order>): Promise<Order | null> => {
    try {
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const res = await fetch('/api/orders', {
        method: 'POST',
        headers,
        body: JSON.stringify(orderPayload)
      });

      let finalOrder: Order;
      if (res.ok) {
        const d = await res.json();
        finalOrder = d.order;
      } else {
        // Fallback local creation
        finalOrder = {
          id: orderPayload.id || `#HY-${Math.floor(10000 + Math.random() * 90000)}`,
          createdAt: new Date().toISOString(),
          items: orderPayload.items || [],
          subtotal: orderPayload.subtotal || 0,
          deliveryFee: orderPayload.deliveryFee || 0,
          discount: orderPayload.discount || 0,
          tip: orderPayload.tip || 0,
          total: orderPayload.total || 0,
          customer: orderPayload.customer!,
          paymentMethod: orderPayload.paymentMethod || 'yape',
          status: 'recibido',
          whatsappMessage: orderPayload.whatsappMessage || ''
        };
      }

      setOrders(prev => {
        const next = [finalOrder, ...prev.filter(o => o.id !== finalOrder.id)];
        localStorage.setItem('huayna_orders', JSON.stringify(next));
        return next;
      });

      // Clear cart
      clearCart();

      return finalOrder;
    } catch (e) {
      console.error(e);
      return null;
    }
  };

  // Cart operations
  const addToCart = (
    product: Product,
    quantity = 1,
    selectedOptions: Record<string, string> = {},
    notes = ''
  ) => {
    let extraPrice = 0;
    if (product.options) {
      product.options.forEach(opt => {
        const selectedChoiceLabel = selectedOptions[opt.name];
        if (selectedChoiceLabel) {
          const choice = opt.choices.find(c => c.label === selectedChoiceLabel);
          if (choice) extraPrice += choice.priceDelta;
        }
      });
    }

    const unitPrice = product.price + extraPrice;
    const optionKey = Object.entries(selectedOptions)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([k, v]) => `${k}:${v}`)
      .join('|');
    const itemId = `${product.id}__${optionKey}`;

    setCart(prev => {
      const existingIdx = prev.findIndex(item => item.id === itemId);
      if (existingIdx > -1) {
        const updated = [...prev];
        const current = updated[existingIdx];
        const newQty = current.quantity + quantity;
        updated[existingIdx] = {
          ...current,
          quantity: newQty,
          totalPrice: newQty * unitPrice,
          notes: notes || current.notes
        };
        return updated;
      } else {
        const newItem: CartItem = {
          id: itemId,
          product,
          quantity,
          selectedOptions,
          extraPrice,
          unitPrice,
          totalPrice: quantity * unitPrice,
          notes
        };
        return [...prev, newItem];
      }
    });

    showToast(`Agregado: ${product.name} (+${quantity})`, 'success');
  };

  const updateQuantity = (cartItemId: string, delta: number) => {
    setCart(prev => {
      return prev
        .map(item => {
          if (item.id === cartItemId) {
            const nextQty = item.quantity + delta;
            if (nextQty <= 0) return null;
            return {
              ...item,
              quantity: nextQty,
              totalPrice: nextQty * item.unitPrice
            };
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const removeFromCart = (cartItemId: string) => {
    setCart(prev => prev.filter(item => item.id !== cartItemId));
    showToast('Producto retirado de la canasta', 'info');
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartSubtotal = cart.reduce((acc, item) => acc + item.totalPrice, 0);
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Toasts
  const [toasts, setToasts] = useState<ToastInfo[]>([]);

  const showToast = (message: string, type: 'success' | 'info' | 'warning' = 'info') => {
    const id = `${Date.now()}_${Math.random()}`;
    setToasts(prev => [...prev.slice(-3), { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 3200);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  return (
    <AppContext.Provider
      value={{
        showSplash,
        setShowSplash,
        activeTab,
        setActiveTab,
        isPhoneFrameEnabled,
        setIsPhoneFrameEnabled,
        latestConfirmedOrder,
        setLatestConfirmedOrder,
        isDarkMode,
        toggleDarkMode,
        setDarkMode: (val: boolean) => setIsDarkMode(val),
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        cartSubtotal,
        cartCount,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        selectedProductForDetail,
        setSelectedProductForDetail,
        isAuthOpen,
        setIsAuthOpen,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        activeDietTag,
        setActiveDietTag,
        favorites,
        toggleFavorite,
        isFavorite,
        user,
        token,
        login,
        register,
        logout,
        updateProfile,
        orders,
        createOrder,
        loadOrders,
        toasts,
        showToast,
        removeToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
