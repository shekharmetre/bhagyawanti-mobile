"use client";

import { addressFormData, LocationData } from "@/lib/types";
import { create } from "zustand";

interface ShopFilterState {
  openNow: boolean;
  verified: boolean;
  districtLocation: string | null;
  sortBy: string | null;
  nearMe: { lat: number; lng: number } | null;
  addressForm: addressFormData;

  // Actions
  toggleOpenNow: () => void;
  toggleVerified: () => void;
  setDistrictLocation: (location: string | null) => void;
  setSortBy: (sort: string | null) => void;
  setNearMe: (coords: { lat: number; lng: number } | null) => void;
  setAddressForm: (data: addressFormData) => void;
  resetFilters: () => void;
}

export const useShopFilterStore = create<ShopFilterState>((set) => ({
  openNow: false,
  verified: false,
  districtLocation: null,
  sortBy: null,
  nearMe: null,
  addressForm: {
    receiverName: '',
    receiverPhone: '',
    addressType: 'Home',
    area: '',
    completeAddress: '',
    sector: '',
    landmark: '',
    pincode: '',
    coords: { lat: '', lng: '' },
  },

  toggleOpenNow: () => set((state) => ({ openNow: !state.openNow })),
  toggleVerified: () => set((state) => ({ verified: !state.verified })),
  setDistrictLocation: (location) => set({ districtLocation: location }),
  setSortBy: (sort) => set({ sortBy: sort }),
  setNearMe: (coords) => set({ nearMe: coords }),
  setAddressForm: (data) => set({ addressForm: data }),

  resetFilters: () =>
    set({
      openNow: false,
      verified: false,
      districtLocation: null,
      sortBy: null,
      nearMe: null,
    }),
}));
