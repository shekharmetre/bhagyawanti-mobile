import DailyOffersCarousel from "@/components/home/DailyOffersCarousel";
import { ShopSection } from "@/components/shop";
import { offersCarousel } from "@/lib/data";

import { ShopData } from "@/lib/types";

async function fetchNearbyJsonData(lat: string | number, lng: string | number) {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/geo/api/shop?lat=${lat}&lng=${lng}`, {
            cache: "no-store",
        });

        if (!res.ok) {
            throw new Error("Failed to fetch nearby.json");
        }

        const json = await res.json();

        // Adjust according to your JSON shape
        return json?.data?.data || [];
    } catch (error) {
        console.error("Fetch error:", error);
        return [];
    }
}

// Server component
export default async function Shop() {
    return (
        <div className="lg:px-40 lg:py-10 p-2">
            <ShopSection/>
                  
        </div>
    );
}
