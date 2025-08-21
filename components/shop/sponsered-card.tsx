import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, MapPin, Clock, Phone, ExternalLink, Crown } from "lucide-react";
import { ShopData } from "@/lib/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { encodeIds } from "@/lib/helper";
import { showToast } from "@/hooks/filtered-toast";

interface ShopCardProps {
  shop: ShopData;
}

export function SponserCard({ shop }: ShopCardProps) {
  const navigate = useRouter()


  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <div key="half" className="relative">
          <Star className="h-4 w-4 text-gray-300" />
          <div className="absolute inset-0 overflow-hidden w-1/2">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          </div>
        </div>
      );
    }

    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(
        <Star key={`empty-${i}`} className="h-4 w-4 text-gray-300" />
      );
    }
    return stars;
  };

  // 1. Separate function handling validation, encoding, and redirection
  function handleRedirectToShop(shopId: string) {
    if (!shopId) {
      showToast({ title: "error", description: "There something error please refresh and go ahead" })
      return;
    }

    const encodedId = encodeIds(shopId)
    navigate.push(`/shop/${encodedId}`)
  }

  // 2. Use this function inside your JSX / component
  // Example:
  // <button onClick={() => handleRedirectToShop(shop, navigate, showToast, encodeIds)}>Go to Shop</button>


  return (
    <Card
     
      className={`group cursor-pointer mr-2 relative transition-all duration-300 hover:scale-[1.02] hover:shadow-card-hover bg-yellow-100
        ${shop.isSponsered ? 'bg-yellow-100 border pb-2 border-yellow-300' : ""}
        flex flex-col h-full`}
    >
      <div className="flex flex-col  justify-between h-full">
        {/* Image */}
        {shop.photos && shop.photos.length > 0 ? (
          <Image
            src={shop.photos[0]}
            alt={shop.name}
            width={500}
            height={300}
            className="w-full md:h-48 h-36 object-cover rounded-t-md"
             onClick={()=>handleRedirectToShop(shop.id)}
          />
        ) : (
          <div className="w-full h-48 flex items-center justify-center bg-gray-100">
            <Image width={500} height={100} src={shop.icon} alt="Store" className="h-16 w-16 opacity-80" />
          </div>
        )}

        {/* Badge/Status Row */}

        <span
          className={`absolute top-[34%] md:top-[35%] inline-flex items-center gap-1 md:px-3 px-2 md:py-[5px] py-[3px] rounded-full md:text-[11px] text-[8px] font-semibold shadow-sm
              ${shop.open_now
              ? 'bg-gradient-to-r from-green-500 via-emerald-500 to-teal-400 text-white'
              : 'bg-gradient-to-r from-red-500 via-rose-500 to-pink-400 text-white'
            }`}
        >
          <Clock className="h-3.5 w-3.5" />
          {shop.open_now ? 'Open Now' : 'Closed'}
        </span>

        {shop.isSponsered && (
          <Badge className="absolute top-2 right-2 bg-yellow-300 text-yellow-900 font-medium animate-pulse">
            <Crown className="h-3 w-3 mr-1 md:block hidden" />
            Sponsored
          </Badge>
        )}

        {/* Content */}
        <div className="md:p-4 px-2 py-2 flex flex-col flex-1 justify-between">
          <div className="space-y-2">
            {/* Name & Rating */}
            <div>
              <h3 className="font-semibold md:text-lg text-sm text-gray-900 line-clamp-2 leading-tight">
                {shop.name}
              </h3>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-0.5">{renderStars(shop.rating)}</div>
                <span className="text-sm md:block hidden font-medium text-gray-800">
                  {shop.rating}
                </span>
                <span className="md:text-sm text-[10px] text-gray-500">
                  ({shop.user_ratings_total.toLocaleString()} reviews)
                </span>
              </div>
            </div>

            {/* Address */}
            <div className="flex items-start gap-2">
              <MapPin className="h-4 w-4 text-gray-500 mt-0.5 flex-shrink-0" />
              <p className="md:text-sm text-xs text-gray-600 line-clamp-2 leading-relaxed">
                {shop.address}
              </p>
            </div>

            {/* Types */}
            <div className="flex overflow-x-auto whitespace-nowrap gap-2 mt-1 pb-1 scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-300">
              {shop.types.slice(0, 2).map((type) => (
                <span
                  key={type}
                  className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-medium capitalize
                  bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 text-indigo-900 shadow-sm
                  shrink-0"
                >
                  {type.replace(/_/g, ' ')}
                </span>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2 pt-4 mt-auto">
            <Button
              style={{
                background: "linear-gradient(90deg, rgba(2, 0, 36, 1) 0%, rgba(9, 9, 121, 1) 35%, rgba(0, 212, 255, 1) 100%)"
              }}
              size="sm"
              className="flex-1 text-white hover:opacity-90 transition-opacity"
            >
              <Phone className="h-4 w-4 mr-1" />
              Call Now
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="px-3"
              onClick={() => window.open(shop.maps_url, '_blank')}
            >
              <ExternalLink className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
