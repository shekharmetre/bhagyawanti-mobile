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



export const mockShopsData: ShopData[] = [
  {
    id: "shop-001",
    name: "Mobile Hub Express",
    address: "32, MG Road, Bengaluru, Karnataka 560001",
    rating: 4.4,
    user_ratings_total: 250,
    open_now: true,
    location: { lat: 12.9756, lng: 77.6052 },
    types: ["electronics_store", "mobile_store", "repair_service"],
    photos: [
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
      "https://images.unsplash.com/photo-1519125323398-675f0ddb6308"
    ],
    icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/electronics-71.png",
    isSponsered: true,
    maps_url: "https://maps.google.com/?q=12.9756,77.6052"
  },
  {
    id: "shop-002",
    name: "QuickFix Mobile Repairs",
    address: "11, 4th Cross, HSR Layout, Bengaluru 560102",
    rating: 4.8,
    user_ratings_total: 420,
    open_now: false,
    location: { lat: 12.9116, lng: 77.6192 },
    types: ["repair_service", "mobile_store"],
    photos: [
      "https://images.unsplash.com/photo-1464983953574-0892a716854b"
    ],
    icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/repair-71.png",
    isSponsered: false,
    maps_url: "https://maps.google.com/?q=12.9116,77.6192"
  },
  {
    id: "shop-003",
    name: "iGadget World",
    address: "245, Commercial St, Shivaji Nagar, Bengaluru 560001",
    rating: 4.0,
    user_ratings_total: 87,
    open_now: true,
    location: { lat: 12.9848, lng: 77.6089 },
    types: ["electronics_store", "accessories_store"],
    photos: [
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb"
    ],
    icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/shopping-71.png",
    isSponsered: false,
    maps_url: "https://maps.google.com/?q=12.9848,77.6089"
  },
  {
    id: "shop-004",
    name: "Sparx Mobiles & Services",
    address: "5, ITPL Main Rd, Whitefield, Bengaluru 560066",
    rating: 4.6,
    user_ratings_total: 114,
    open_now: true,
    location: { lat: 12.9719, lng: 77.7500 },
    types: ["mobile_store", "repair_service"],
    photos: [
      "https://images.unsplash.com/photo-1482062364825-616fd23b8fc1"
    ],
    icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/mobile-71.png",
    isSponsered: true,
    maps_url: "https://maps.google.com/?q=12.9719,77.7500"
  },
  {
    id: "shop-005",
    name: "City Center Electronics",
    address: "3, Brigade Rd, Ashok Nagar, Bengaluru 560025",
    rating: 3.9,
    user_ratings_total: 67,
    open_now: false,
    location: { lat: 12.9717, lng: 77.6065 },
    types: ["electronics_store"],
    photos: [],
    icon: "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/electronics-71.png",
    isSponsered: false,
    maps_url: "https://maps.google.com/?q=12.9717,77.6065"
  }
];





