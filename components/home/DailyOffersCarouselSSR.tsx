import React from "react";
import Image from "next/image";

const offers = [
  {
    image: "/category/accessories.png",
    href: "#"
  },
  {
    image: "/category/chargers.png",
    href: "#"
  },
  {
    image: "/category/audio.png",
    href: "#"
  },
  {
    image: "/category/refurbished.png",
    href: "#"
  },
  {
    image: "/category/sim.png",
    href: "#"
  },
];

export default function DailyOffersCarouselSSR() {
  return (
    <section className="w-full py-2 sm:py-8 bg-gradient-to-br from-white via-blue-50 to-purple-50">
      <div className="max-w-5xl mx-auto rounded-2xl sm:p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 px-[10px]">
          {offers.map((offer, idx) => (
            <a
              key={idx}
              href={offer.href}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <div className="w-full h-56 sm:h-44 md:h-56 lg:h-64 xl:h-72 rounded-xl shadow-md overflow-hidden bg-gray-100">
                <Image
                  src={offer.image}
                  alt={`Offer banner ${idx + 1}`}
                  width={300}
                  height={300}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
} 