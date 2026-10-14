export type ProductCategory = 
  | 'panqueques' 
  | 'postres' 
  | 'comidas' 
  | 'bebidas' 
  | 'batidos' 
  | 'empanadas';

export type ActiveTab = 'inicio' | 'explorar' | 'favoritos' | 'perfil';

export interface ProductOptionChoice {
  label: string;
  priceDelta: number;
}

export interface ProductOption {
  name: string;
  choices: ProductOptionChoice[];
}

export interface CategoryMeta {
  id: ProductCategory | 'all';
  label: string;
  tagline: string;
  image: string;
  itemCount: number;
  icon?: string;
  badge?: string;
}

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  categoryLabel: string;
  price: number;
  description: string;
  ingredients?: string;
  benefits?: string[];
  tags: string[];
  rating: number;
  reviewsCount: number;
  image: string;
  imageUrl?: string;
  options?: ProductOption[];
  popular?: boolean;
  isNew?: boolean;
}

export interface CartItem {
  id: string; // unique item instance id (product.id + options hash)
  product: Product;
  quantity: number;
  selectedOptions: Record<string, string>;
  extraPrice: number;
  unitPrice: number;
  totalPrice: number;
  notes?: string;
}

export interface DistrictDelivery {
  id: string;
  name: string;
  fee: number;
  estimatedTime: string;
}

export type PaymentMethodType = 'yape' | 'bcp' | 'efectivo';

export interface CustomerInfo {
  name: string;
  phone: string;
  address: string;
  district: string;
  reference: string;
  notes?: string;
}

export interface Order {
  id: string;
  createdAt: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  couponCode?: string;
  tip: number;
  total: number;
  customer: CustomerInfo;
  paymentMethod: PaymentMethodType;
  paymentDetails?: {
    cashAmount?: number;
    transactionRef?: string;
  };
  status: 'recibido' | 'preparando' | 'en_camino' | 'entregado';
  whatsappMessage: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  address?: string;
  district?: string;
  reference?: string;
  fitPoints: number;
}

export interface Promotion {
  id: string;
  title: string;
  tagline: string;
  badge: string;
  description: string;
  discountBadge: string;
  categoryLink: ProductCategory;
  bgGradient: string;
  accentColor: string;
}
