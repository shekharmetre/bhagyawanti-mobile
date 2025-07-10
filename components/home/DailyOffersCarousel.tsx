"use client";
import React, { useRef } from "react";
import { useKeenSlider } from "keen-slider/react";
import { motion } from "framer-motion";
import "keen-slider/keen-slider.min.css";

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

export default function DailyOffersCarousel() {
  const [sliderRef] = useKeenSlider({
    loop: true,
    slides: {
      perView: 1,
      spacing: 16,
    },
    breakpoints: {
      "(min-width: 640px)": {
        slides: { perView: 2, spacing: 16 },
      },
      "(min-width: 768px)": {
        slides: { perView: 4, spacing: 20 },
      },
      "(min-width: 1024px)": {
        slides: { perView: 5, spacing: 24 },
      },
    },
    renderMode: "performance",
    drag: true,
    created(slider) {
      let timeout: NodeJS.Timeout;
      function next() {
        slider.next();
        timeout = setTimeout(next, 2500);
      }
      timeout = setTimeout(next, 2500);
      slider.on("destroyed", () => clearTimeout(timeout));
    },
  });

  return (
    <section className="w-full py-2 sm:py-8 bg-gradient-to-br from-white via-blue-50 to-purple-50">
      <div className="max-w-5xl mx-auto rounded-2xl sm:p-6">
        <div
          ref={sliderRef}
          className="keen-slider px-[10px]"
        >
          {offers.map((offer, idx) => (
            <a
              className="keen-slider__slide"
              key={idx}
              href={offer.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              <motion.img
                src={offer.image}
                alt={`Offer banner ${idx + 1}`}
                className="w-full h-56 sm:h-44 md:h-56 lg:h-64 xl:h-72 rounded-xl shadow-md object-cover bg-gray-100"
                draggable={false}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 300 }}
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
} 