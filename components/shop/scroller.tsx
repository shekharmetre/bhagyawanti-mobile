"use client";

import {
    AlertCircle,
    ChevronDown,
    LocateIcon,
    SlidersHorizontal,
} from "lucide-react";
import { Button } from "../ui/button";
import { useShopFilterStore } from "@/store/shop-filter";
import clsx from "clsx";
import { useEffect } from "react";
import { useApiQuery } from "@/hooks/api/secureapi";
import { getCurrentLocation } from "@/hooks/use-location";

type Location = {
    lat: number;
    lng: number;
};

export function Scroller() {
    const {
        openNow,
        nearMe,
        verified,
        districtLocation,
        sortBy,
        toggleOpenNow,
        toggleVerified,
        setSortBy,
        setNearMe,
        setDistrictLocation,
    } = useShopFilterStore();

    // Unified location handling - loads from localStorage on mount
    useEffect(() => {
        // Try to load from localStorage first
        const loadFromStorage = () => {
            try {
                const saved = typeof window !== 'undefined'
                    ? localStorage.getItem('currentLocation')
                    : null;
                if (saved) {
                    const location = JSON.parse(saved) as Location;
                    setNearMe(location);
                    return location;
                }
            } catch (e) {
                console.error("Error loading location from storage:", e);
            }
            return null;
        };

        // Fallback to geolocation if no stored location
        const loadFromGeolocation = async () => {
            try {
                if (navigator.geolocation) {
                    const position = await new Promise<GeolocationPosition>((resolve, reject) => {
                        navigator.geolocation.getCurrentPosition(resolve, reject);
                    });
                    const location = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    };
                    setNearMe(location);
                    return location;
                }
            } catch (error) {
                console.error("Geolocation error:", error);
            }
            return null;
        };

        const initializeLocation = async () => {
            const storedLocation = loadFromStorage();
            if (!storedLocation) {
                await loadFromGeolocation();
            }
        };

        initializeLocation();
    }, [setNearMe]);

    // Fetch district when location changes
    const { isLoading: isDistrictLoading, isError, data, error } = useApiQuery<{ district: string }>({
        endpoint: `/test/get-district?lat=${nearMe?.lat}&lng=${nearMe?.lng}`,
        queryKey: ["district", nearMe?.lat, nearMe?.lng],
        enabled: !!nearMe?.lat && !!nearMe?.lng,
        onSuccess: (data) => {
            if (data && data?.district) {
                setDistrictLocation(data.district);
            }
        },
        onError: (error) => {
            console.error("Failed to fetch district:", error);
        }
    });

    const handleNearMeClick = async () => {
        try {
            const locaton = await getCurrentLocation()
            // ✅ Set to Zustand store
            setNearMe({ lat: locaton.lat, lng: locaton.lon });
        } catch (error) {
            console.error("Geolocation error:", error);
            alert(error instanceof Error ? error.message : "Could not get your location.");
        }
    };

    return (
        <div
            id="floating-filter"
            className="flex items-center gap-4 mt-3 overflow-x-auto px-2 py-1"
        >
            <div className="h-6 w-px bg-gray-300" />

            {/* Near Me */}
            <Button
                onClick={handleNearMeClick}
                variant="link"
                className={clsx(
                    "flex items-center md:p-2 p-1 w-fit justify-center border-2 px-3 rounded-lg gap-2",
                    nearMe ? "bg-blue-100 border-blue-500 text-blue-700" : "bg-gray-100"
                )}
            >
                <LocateIcon className="w-5 h-5" />
                <span className="font-semibold">Near Me</span>
            </Button>

            {/* Open Now */}
            <Button
                onClick={toggleOpenNow}
                variant="link"
                className={clsx(
                    "flex items-center md:p-2 p-1 w-fit justify-center border-2 px-3 rounded-lg gap-2",
                    openNow ? "bg-blue-100 border-blue-500 text-blue-700" : "bg-gray-100"
                )}
            >
                <AlertCircle className="w-5 h-5" />
                <span className="font-semibold">Open now</span>
            </Button>

            {/* District */}
            <Button
                variant="link"
                className={clsx(
                    "flex items-center border-2 px-3 rounded-lg gap-2",
                    districtLocation
                        ? "border-blue-600 text-blue-500"
                        : "border-gray-300 bg-gray-100"
                )}
                disabled={isDistrictLoading}
            >
                <span>
                    {isDistrictLoading
                        ? "Loading..."
                        : data && data?.data?.district || "Select District"}
                </span>
                <ChevronDown />
            </Button>

            {/* Verified */}
            <Button
                onClick={toggleVerified}
                variant="link"
                className={clsx(
                    "flex items-center md:p-2 p-1 w-fit justify-center border-2 px-3 rounded-lg gap-2",
                    verified ? "bg-blue-100 border-blue-500 text-blue-700" : "bg-gray-100"
                )}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className="w-5 h-5 text-green-600"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                    />
                </svg>
                <span className="font-semibold">Verified</span>
            </Button>

            {/* Sort By */}
            <Button
                onClick={() => setSortBy("rating")}
                variant="ghost"
                className={clsx(
                    "flex items-center md:p-2 p-1 w-fit justify-center border-2 px-3 rounded-lg gap-2",
                    sortBy ? "border-blue-600 text-blue-500" : "bg-gray-100"
                )}
            >
                <span className="font-semibold">
                    Sort By{sortBy ? `: ${sortBy}` : ""}
                </span>
                <ChevronDown className="w-5 h-5" />
            </Button>

            {/* All Filters */}
            <Button
                variant="link"
                className="flex items-center bg-gray-100 md:p-2 p-1 w-fit justify-center border-2 px-3 rounded-lg gap-2"
            >
                <SlidersHorizontal />
                <span className="font-semibold">All Filters</span>
            </Button>
        </div>
    );
}