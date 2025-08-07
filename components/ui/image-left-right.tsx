'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

interface ShopCarouselProps {
  images: string[];
  alt: string;
}

export function ImageLeftRightArrow({ images, alt }: ShopCarouselProps) {
  const [current, setCurrent] = useState(0);

  const showPrev = () => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const showNext = () => {
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative w-full md:w-56 h-40 md:h-48 rounded-md overflow-hidden">
      {/* Image Display */}
      <Image
        src={images[current]}
        alt={alt}
        width={500}
        height={500}
        className="w-full md:h-full  md:object-cover object-center"
      />

      {/* Left Arrow */}
      {images.length > 1 && (
        <button
          onClick={showPrev}
          className="absolute top-1/2 left-2 -translate-y-1/2 bg-black/50 p-1 rounded-full text-white hover:bg-black/70"
        >
          <ChevronLeft size={20} />
        </button>
      )}

      {/* Right Arrow */}
      {images.length > 1 && (
        <button
          onClick={showNext}
          className="absolute top-1/2 right-2 -translate-y-1/2 bg-black/50 p-1 rounded-full text-white hover:bg-black/70"
        >
          <ChevronRight size={20} />
        </button>
      )}
    </div>
  );
}
