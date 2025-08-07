import { create } from "zustand";

// Define the proper type for clarity
type Location = { lat: number | null; lng: number | null };

interface ShopLocationState {
  location: Location;
  setLocation: (location: Location) => void;
}

export const useShopLocationStore = create<ShopLocationState>((set) => ({
  location: { lat: null, lng: null },
  setLocation: (location) => set({ location }),
}));
