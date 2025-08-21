'use client';

import { useEffect, useState, useCallback } from "react";
import { useDebounce } from "use-debounce";
import { useShopLocationStore } from "@/store/shop-location";
import { showToast } from "@/hooks/filtered-toast";
import { ShopData } from "@/lib/types";
import { SearchForm } from "@/hooks/search-form";
import { Tag, CircleAlert } from "lucide-react";
import UnistSliderWrapper from "../ui/slide2";
import { SponserCard } from "./sponsered-card";
import { HorizontalShopCard } from "./horizontal-card";
import { useApiMutation } from "@/hooks/api/secureapi";

const FALLBACK_LAT = 12.959744;
const FALLBACK_LNG = 77.6208384;
const RADIUS = 1500;

export function ShopSection() {
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 300);

  const location = useShopLocationStore((state) => state.location);
  const setLocation = useShopLocationStore((state) => state.setLocation);

  const [shops, setShops] = useState<ShopData[]>([]);
  const [error, setError] = useState<string | null>(null);

  const { mutate, isPending } = useApiMutation({
    endpoint: "/geo/api/shops",
    onSuccess: (data: any) => {
      setShops(data || []);
      setError(null);
    },
    onError: (err: any) => {
      setError(err?.message || "Something went wrong");
      setShops([]);
    },
  });

  // 🔹 Get location from Zustand or Browser once
  useEffect(() => {
    if (location?.lat && location?.lng) return; // Already in Zustand

    if (!navigator.geolocation) {
      showToast({
        title: "Geolocation not supported",
        description: "Your browser does not support geolocation.",
      });
      // Optional: fallback to default so fetch still runs
      setLocation({ lat: FALLBACK_LAT, lng: FALLBACK_LNG });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      () => {
        showToast({
          title: "Location Permission Denied",
          description: "Please allow location permission for better results.",
        });
        // Optional fallback
        setLocation({ lat: FALLBACK_LAT, lng: FALLBACK_LNG });
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }, [location?.lat, location?.lng, setLocation]);

  // 🔹 Fetch shops only when lat/lng are available AND change
  useEffect(() => {
    if (!location?.lat || !location?.lng) return; // wait until location available
    const body = {
      lat: location.lat,
      lng: location.lng,
      radius: RADIUS,
    };
    mutate(body);
  }, [location?.lat, location?.lng, mutate]);

  const hasSearch = debouncedSearch.trim().length > 1;
  const filteredShops = hasSearch
    ? shops.filter(
        (shop) =>
          shop.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
          (shop.address?.toLowerCase().includes(debouncedSearch.toLowerCase()) ?? false)
      )
    : shops;

  const sponsors = !hasSearch ? filteredShops.slice(0, 8) : [];
  const allProducts = hasSearch ? filteredShops : filteredShops.slice(8);

  if (isPending && shops.length === 0) {
    return <div className="p-4 text-center text-gray-600">Loading shops near you...</div>;
  }

  if (error) {
    return (
      <div className="p-4 text-center text-red-600 font-semibold">
        Error loading shops: {error}
      </div>
    );
  }

  return (
    <section className="px-2 md:px-4 lg:px-8">
      <div className="flex flex-col-reverse md:flex-row md:justify-between md:items-center mb-4 gap-4">
        {!hasSearch && (
          <h2 className="font-sans text-md sm:text-lg md:text-2xl lg:text-3xl font-extrabold">
            Top 10 Mobile Repair & Retail Shops in your area
          </h2>
        )}
        <SearchForm onSearch={(val) => setSearch(val)} />
      </div>

      {!hasSearch && sponsors.length > 0 && (
        <>
          <div className="flex md:gap-3 gap-1 text-sm items-center mb-4">
            <Tag className="rotate-90" color="orange" />
            <strong className="md:block hidden">Special offered shops for you</strong>
            <strong className="md:hidden block">Shops for you</strong>
            <span className="flex items-center gap-1 text-muted-foreground text-md">
              Sponsored <CircleAlert size={16} color="orange" />
            </span>
          </div>

          <UnistSliderWrapper
            autoplay={false}
            spacing={2}
            perView={1.8}
            showArrows={false}
            breakpoints={{
              640: 2.5,
              768: 2.8,
              1024: 5.2,
            }}
          >
            {sponsors.map((item, i) => (
              <SponserCard shop={item} key={`${item.id}-${i}`} />
            ))}
          </UnistSliderWrapper>
        </>
      )}

      <div className="grid grid-cols-1 gap-4">
        <HorizontalShopCard allProducts={allProducts} keyId="sdlkfjskldfj" />
      </div>
    </section>
  );
}
