"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ShopData } from "@/lib/types";
import { useShopFilterStore } from "@/store/shop-filter";
import { ShopCard } from "./shop-card";
import { AlarmClock } from "lucide-react";
import { Button } from "../ui/button";
import { useUniversalModal } from "@/hooks/universal-popup";
import { RepairSchedulingModal } from "./schedule-repair";
import { AnimatedSuccessButton } from "../ui/animated-success-button";
import { useRepairSelectionStore } from "@/store/repair";
import { supabse } from "@/config/supbase-client";


export function HorizontalShopCard({ allProducts, keyId }: { allProducts: ShopData[], keyId: string }) {
  const [filteredShops, setFilteredShops] = useState<ShopData[]>([]);
  const { openModal, closeModal } = useUniversalModal();
  const { districtLocation, nearMe, openNow, sortBy } = useShopFilterStore();
  const [selectedShopId, setSelectedShopId] = useState<ShopData | null>(null);
  const { brand, modelName, selection, optional, video } = useRepairSelectionStore(state => state.repairSelection)
  const [access_token, setAccessToken] = useState("")


  console.log(brand, modelName, selection, optional, video, "this all are repari gsection")

  function ScheduleVisit() {
    openModal(
      <RepairSchedulingModal access_token={access_token} onClose={closeModal} isOpen={true} selectedDevice={{ brand, modelName, repairType: { name: video.name, price: video.price } }} shopDetail={selectedShopId} />
    );
  }

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session }, error,
      } = await supabse.auth.getSession();
      if (session?.user) {
        setAccessToken(session?.access_token);
      }
    };
    getSession();
  }, []);


  console.log(access_token,"this is the aces toen")

  useEffect(() => {
    let filtered = [...allProducts];

    // Filter: Open Now
    if (openNow) {
      filtered = filtered.filter((shop) => shop.open_now);
    }

    // Filter: District match (by address)
    if (districtLocation) {
      filtered = filtered.filter((shop) =>
        shop.address.toLowerCase().includes(districtLocation.toLowerCase())
      );
    }

    // Filter: Near Me (mock location logic)
    if (nearMe) {
      const nearMe = { lat: 17.9, lng: 77.5 }; // example user location
      const maxDistanceKm = 2;

      const getDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
        const toRad = (x: number) => (x * Math.PI) / 180;
        const R = 6371;
        const dLat = toRad(lat2 - lat1);
        const dLon = toRad(lon2 - lon1);
        const a =
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(toRad(lat1)) *
          Math.cos(toRad(lat2)) *
          Math.sin(dLon / 2) *
          Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
      };

      filtered = filtered.filter((shop) => {
        const dist = getDistance(
          nearMe.lat,
          nearMe.lng,
          shop.location.lat,
          shop.location.lng
        );
        return dist <= maxDistanceKm;
      });
    }

    // Sort
    if (sortBy === "rating") {
      filtered.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "distance" && nearMe) {
      const nearMe = { lat: 17.9, lng: 77.5 };
      const getDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
        const toRad = (x: number) => (x * Math.PI) / 180;
        const R = 6371;
        const dLat = toRad(lat2 - lat1);
        const dLon = toRad(lon2 - lon1);
        const a =
          Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(toRad(lat1)) *
          Math.cos(toRad(lat2)) *
          Math.sin(dLon / 2) *
          Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
      };

      filtered.sort((a, b) => {
        const distA = getDistance(nearMe.lat, nearMe.lng, a.location.lat, a.location.lng);
        const distB = getDistance(nearMe.lat, nearMe.lng, b.location.lat, b.location.lng);
        return distA - distB;
      });
    }

    setFilteredShops(filtered);
  }, [allProducts, districtLocation, nearMe, openNow, sortBy]);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <motion.div
      key={keyId}
      variants={container}
      initial="hidden"
      animate="show"
      className="grid lg:grid-cols-2 gap-5"
    >
      <div key={keyId} className="col-span-full mt-10 flex justify-between items-start mb-4">
        <div className="flex flex-col">
          <h2 className="text-2xl font-bold text-primary mb-1">Available Shops</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Showing {filteredShops.length} shop{filteredShops.length !== 1 && "s"} matching your filters
          </p>
        </div>
        <Button variant="secondary"
          onClick={ScheduleVisit}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-black
            md:text-base text-sm
            md:px-6 md:py-2.5
            shadow
          "
        >
          <AlarmClock className="w-5 h-5" />
          <span className="hidden md:inline">Schedule Visit</span>
        </Button>
      </div>
      {filteredShops.length > 0 ? (
        filteredShops.map((shop, index) => (
          <div className="relative">
            <ShopCard key={`${shop.id}-${index}`} shopData={shop} />
            <div className="absolute top-5 right-10">
              <AnimatedSuccessButton
                fillDurationMs={2000}
                shopdata={shop}
                isSelected={selectedShopId?.id === shop.id}
                onSuccess={() => { setSelectedShopId(shop); console.log(shop, "from the map funcoitn ", selectedShopId, "just id from selcted one") }}
              />
            </div>
          </div>
        ))
      ) : (
        <div className="col-span-full py-10 text-center">
          <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
            No shops found
          </h3>
          <p className="mt-1 text-gray-500 dark:text-gray-400">
            Try adjusting your filters.
          </p>
        </div>
      )}
    </motion.div>
  );
}
