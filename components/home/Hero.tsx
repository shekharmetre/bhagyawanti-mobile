import { ArrowRightIcon } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import particle from "@/public/particle.png";
import Link from "next/link";

export const Hero = () => {
  return (
    <div
      className="relative md:mt-2 w-full bg-cover bg-no-repeat bg-center flex items-center justify-center px-2 py-4 md:py-6"
  
    >
      <div className="w-full max-w-6xl text-center flex flex-col items-center space-y-4">
        {/* Badge */}
        <div className="flex items-center border border-white/70 rounded-full shadow-[0px_24px_24px_#534ba024] backdrop-blur-md px-2 py-1">
          <div className="bg-blue-700 text-white text-xs px-2 py-0.5 rounded-full shadow">
            New
          </div>
          <div className="ml-2 text-[#131313] text-xs flex items-center">
            Now live in your city
            <ArrowRightIcon className="ml-2 w-4 h-4" />
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#2f2b43] leading-tight">
          Bringing <span className="text-blue-700">Mobiles & Repairs</span>,
          <br className="hidden sm:block" />
          To Your Local Area
        </h1>

        {/* Description */}
        <p className="text-sm sm:text-base text-[#6871a2] max-w-2xl leading-relaxed">
          Search mobile accessories, book repair services, and more with Bhagyawanti Mobile.
          Just ₹5 to lock your item — verified store, 100% availability guaranteed.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 mt-2 w-full justify-center">
          <Link href="/products">
            <Button className="bg-blue-700 px-4 py-2 rounded-full text-white font-semibold text-sm w-full sm:w-auto">
              Book Item Now
            </Button>
          </Link>
          <Link href="/stores">
            <Button
              variant="outline"
              className="px-4 py-2 border border-[#D9D9D9] rounded-full text-[#6B7280] font-semibold text-sm w-full sm:w-auto"
            >
              Explore Stores
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
