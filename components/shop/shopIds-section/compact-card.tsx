"use client";

import { ShoppingCart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Product } from "@/lib/types";
import { motion } from "framer-motion";
import { products } from "@/lib/data"; // default product data

const cardWidthClasses = `
  min-w-[20vw]
  sm:min-w-[40vw]
  md:min-w-[22vw]
  lg:min-w-[14vw]
`;

interface ProductCardMinimalProps {
  product?: Product;
  key? : string
}

export const ProductCardMinimal = ({ product = products[0],key="default one " }: ProductCardMinimalProps) => {

  // Motion Variants for smooth fade-in + slight rise
  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <motion.div
  key={key}
      className={
        "group p-1 sm:p-2 bg-card border border-border rounded-lg overflow-hidden hover:border-primary/20 transition-all duration-300 flex-shrink-0 " +
        cardWidthClasses
      }
      initial="hidden"
      animate="visible"
      exit="hidden"
      variants={variants}
      whileHover={{ scale: 1.03 }}
      layout
    >
      {/* Product Image */}
      <div className="relative overflow-hidden bg-muted"   key={key}>
        <Image
          width={300}
          height={300}
          src={product.images[0]}
          alt={product.name}
          className="w-full h-20 sm:h-24 md:h-32 lg:h-40 rounded-md object-cover transition-transform duration-300 group-hover:scale-105"
          priority={false} // Set true if you want image preloading, adjust as needed
        />
        {product.isFeatured && (
          <div className="absolute top-2 left-2 sm:top-3 sm:left-3">
            <div className="w-2 h-2 bg-primary rounded-full"></div>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-1 sm:p-2 md:p-3">
        <div className="flex items-start justify-between mb-1">
          <div className="flex-1 md:min-w-0">
            <h3
              className="font-medium text-[11px] sm:text-xs md:text-sm text-card-foreground group-hover:text-primary transition-colors line-clamp-2 max-w-[14ch] md:max-w-full"
              title={product.name}
            >
              {product.name}
            </h3>

            <p className="text-[9px] sm:text-[11px] md:text-xs text-muted-foreground mt-0.5 truncate">
              {product.category}
            </p>
          </div>
          <div className="flex items-center gap-[2px] ml-2">
            <Star className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-product-rating fill-current" />
            <span className="text-[9px] sm:text-[10px] text-muted-foreground">{product.rating}</span>
          </div>
        </div>
        <div className="flex items-center justify-between mt-1 md:mt-2">
          <div className="flex items-baseline gap-1 md:gap-2">
            <span className="font-semibold text-product-price text-xs md:text-base">
              Rs.{product.price}
            </span>
            {product.price && (
              <span className="text-[9px] sm:text-xs text-muted-foreground line-through">
                Rs.{product.price}
              </span>
            )}
          </div>
          <Button
            size="sm"
            variant="outline"
            className="h-6 w-6 p-0 hover:bg-primary hover:text-primary-foreground"
            disabled={!product.inStock}
          >
            <ShoppingCart className="h-2.5 w-2.5" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};
