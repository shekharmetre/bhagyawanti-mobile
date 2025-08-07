"use client";
import React from "react";
import { useKeenSlider } from "keen-slider/react";
import { motion } from "framer-motion";
import "keen-slider/keen-slider.min.css";
import { itemsOffer } from "@/lib/data";
import Image from "next/image";

interface CarouselItem {
  image: string;
  href: string;
  alt?: string;
}

interface DailyOffersCarouselProps {
  items?: CarouselItem[];
  className?: string;
  sectionClassName?: string;
  containerClassName?: string;
  autoPlayInterval?: number;
  imageClassName?:string
}

export default function DailyOffersCarousel({
  items = itemsOffer,
  className = "",
  sectionClassName = "w-full py-2 sm:py-8 ",
  containerClassName = " mx-auto rounded-2xl",
  autoPlayInterval = 2500,
  imageClassName =  "w-full h-40 object-cover rounded-md"
}: DailyOffersCarouselProps) {
  const [sliderRef] = useKeenSlider({
    loop: true,
    slides: {
      perView: 1.8,  // Default for small screens
      spacing: 12,
    },
    breakpoints: {
      "(min-width: 640px)": {
        slides: { 
          perView: 1.8,
          spacing: 12 
        },
      },
      "(min-width: 768px)": {
        slides: { 
          perView: 3.5,
          spacing: 16 
        },
      },
      "(min-width: 1024px)": {
        slides: { 
          perView: 3.5,
          spacing: 20 
        },
      },
    },
    renderMode: "performance",
    drag: true,
    created(slider) {
      let timeout: NodeJS.Timeout;
      function next() {
        slider.next();
        timeout = setTimeout(next, autoPlayInterval);
      }
      timeout = setTimeout(next, autoPlayInterval);
      slider.on("destroyed", () => clearTimeout(timeout));
    },
  });

  return (
    <section className={sectionClassName}>
      <div className={containerClassName}>
        <div ref={sliderRef} className={`keen-slider px-[5px] ${className}`}>
          {items.map((offer, idx) => (
            <a
              className="keen-slider__slide"
              key={`${idx}+${offer.alt}`}
              href={offer.href}
              target="_blank"
              rel="noopener noreferrer"
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Image
                  src={offer.image}
                  alt={offer.alt || `Offer banner ${idx + 1}`}
                  width={500}
                  height={300}
                  className={`${imageClassName}`}
                  draggable={false}
                  unoptimized={true}
                />
              </motion.div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}