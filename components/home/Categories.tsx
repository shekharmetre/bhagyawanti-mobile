"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { categories } from "@/lib/data";
import { cn } from "@/lib/utils";

export default function Categories() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section className="py-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center lg:text-left mb-10 lg:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold mb-3 lg:mb-4">Shop by Category</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto lg:mx-0">
            Browse our wide selection of mobile accessories categorized for your convenience.
          </p>
        </div>

        <motion.div
          ref={containerRef}
          variants={container}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          // Mobile: 3-cols grid, gap-4; Desktop: 3-cols grid, gap-6, larger cards and text
          className={cn(
            "grid grid-cols-3 gap-4 max-w-2xl mx-auto lg:mx-0",
            "sm:grid-cols-4 sm:gap-6",
            "lg:grid-cols-3 lg:gap-8",
            "lg:max-w-full"
          )}
        >
          {categories.map((category, index) => (
            <motion.div variants={item} key={category.name + index}>
              <Link
                href={category?.link || `/products?category=${category.slug}`}
                passHref
                className="block group"
              >
                {/* Desktop Card (visible on md+ using breakpoints) */}
                <div
                  className={cn(
                    "hidden md:block relative overflow-hidden rounded-xl h-60 shadow-md hover:shadow-xl transition-all duration-300",
                    index === 0 ? "sm:col-span-2 lg:col-span-1" : ""
                  )}
                >
                  <div className="absolute inset-0">
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-xl font-bold mb-1 group-hover:translate-x-2 transition-transform duration-300">
                      {category.name}
                    </h3>
                    <p className="text-gray-200 text-sm mb-3 max-w-xs">
                      {category.description}
                    </p>
                    <div className="flex items-center text-sm font-medium">
                      <span className="mr-1">Shop now</span>
                      <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                </div>
                {/* Mobile Card (visible below md using breakpoints) */}
                <div className="md:hidden flex flex-col items-center text-center">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-3 overflow-hidden">
                    <Image
                      src={category.image}
                      alt={category.name}
                      width={100}
                      height={100}
                      className="w-full h-full object-cover rounded-full transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <p className="text-sm sm:text-base font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {category.name}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
