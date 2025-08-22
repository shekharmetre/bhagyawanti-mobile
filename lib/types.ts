import { LucideIcon } from "lucide-react";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  discountPrice?: number;
  images: string[];
  category: Category;
  subcategory: string;
  compatibility?: string[];
  features?: string[];
  rating: number;
  reviews: number;
  inStock: boolean;
  isNew?: boolean;
  isFeatured?: boolean;
  isLatest?: boolean;

}

export type Category =
  | "chargers"
  | "cables"
  | "audio"
  | "protection"
  | "accessories"
  | "adapters"
  | "gaming"
  | "mobile"
  | "sim"
  | "powerbanks";

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CategoryInfo {
  name: string;
  slug: Category;
  description: string;
  image: string;
  link?: string;
}

export interface CartState {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  user: string,
  setUser: (user: string) => void;
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
}


export interface LocationData {
  address: string;
  lat: number;
  lon: number;
  type?: 'current' | 'search' | 'saved';
  label?: string;
  id?: string;
}

export interface FormLocationData {
  receiverName?: string;
  receiverPhone?: string;
  addressType?: string;
  area?: string;
  completeAddress?: string;
  sector?: string;
  landmark?: string;
  pincode?: string;
}

export interface LocationSearchProps {
  onLocationSelected: (location: LocationData) => void;
  currentLocation?: LocationData | null;
}


export type RepairVideoType = {
  id: string;
  name: string;
  description: string;
  videoUrl: string;
  thumbnail: string;
  difficulty: 'Medium' | 'Hard' | 'Expert';
  timeEstimate: string;
  toolsRequired: string[];
  note: string;
  reasons: string[];
  price: string,
  options: string[];
};

export interface ExtraInfoItem {
  id: string;
  type: "text" | "video";
  content: string;
}

export type ShopData = {
  id: string;
  name: string;
  address: string;
  rating: number;
  user_ratings_total: number;
  open_now: boolean;
  location: {
    lat: number;
    lng: number;
  };
  types: string[];
  photos: string[];
  icon: string;
  isSponsered: boolean;
  maps_url: string;
};


export type AddressType = 'Home' | 'Work' | 'Other';

export type addressFormData = {
  receiverName: string;
  receiverPhone: string;
  addressType: 'Home' | 'Work' | 'Other'; // limited to your addressTypes
  area?: string; // optional since you're getting it from initialAddress?.address
  completeAddress: string;
  sector: string;
  landmark: string;
  pincode: string;
};


export type CarouselItem = {
  image: string;
  href: string;
  alt: string;
};

// ---- Product related ----


// ---- Shop related ----
export interface ShopLocation {
  lat: number;
  lng: number;
}


// ---- Order Items ----
export type OrderItem = {
  id: string;       // Product ID
  item: Product;    // The actual product details
  quantity: number; // Quantity in this order
  totalPrice: number; // price * quantity
};

// ---- Main Order ----
export interface Order {
  id: string;
  productName?: string; // Often for single‑item orders
  category: "repair" | "accessories";
  status:
  | "in-progress"
  | "completed"
  | "shipping-soon"
  | "cancelled"
  | "out-for-delivery";
  orderDate: string;        // ISO date string
  issue?: string;           // For repairs
  location?: string;        // Optional textual location
  shopData?: ShopData;      // Shop details if in‑shop repair
  price: number;            // Total price after discounts
  quantity?: number;        // Overall quantity if multi‑item
  image?: string;           // Order thumbnail
  progress: number;         // e.g., percentage for tracking
  color: string;            // Color chosen
  delivery?: "in-shop" | "home-delivery";
  items?: OrderItem[];      // Array of cart items (for accessories)
  payment?: "Success" | "Failed" | "Pay on delivery";
}


export type OptionPickerCategory = {
  id: string;
  label: string;
  icon: any; // LucideIcon ideally
};

export interface StepItem {
  key: string;
  label: string;
  icon?: React.ReactNode;
}









