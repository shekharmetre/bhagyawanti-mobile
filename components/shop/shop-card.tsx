'use client';
import React from 'react';
import {
  Star,
  Phone,
  MessageCircle,
  MapPin,
  Eye,
  CheckCircle,
} from 'lucide-react';
import { ShopData } from '@/lib/types';
import Image from 'next/image';
import { encodeIds, extractFirstSegment } from '@/lib/helper';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ImageLeftRightArrow } from '../ui/image-left-right';
import { AnimatedSuccessButton } from '../ui/animated-success-button';
import { showToast } from '@/hooks/filtered-toast';
import { useRouter } from 'next/navigation';

export const ShopCard = ({ shopData,keyid }: { shopData: ShopData,keyid:string }) => {
  const phoneNumber = '90360929452';
  const navigate = useRouter()
  const buttonVariants = {
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.97 },
  };

  const buttons = [
    {
      href: `tel:${phoneNumber}`,
      icon: <Phone className="h-4 w-4 mr-1" />,
      label: 'Call',
      fullLabel: phoneNumber,
      className: 'bg-blue-50 hover:bg-blue-100 text-blue-700',
    },
    {
      onClick: () => { }, // Replace with actual message handler
      icon: <MessageCircle className="h-4 w-4 mr-1" />,
      label: 'Message',
      fullLabel: 'Get Best Price',
      className: 'bg-green-50 hover:bg-green-100 text-green-700',
    },
    {
      href: `https://wa.me/${phoneNumber}`,
      icon: (
        <svg
          className="h-4 w-4 mr-1"
          fill="currentColor"
          viewBox="0 0 32 32"
        >
          <path d="M16 0C7.163 0 0 7.163 0 16c0 2.821.735 5.47 2.01 7.78L0 32l8.353-2.196A15.925 15.925 0 0 0 16 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm8.995 23.198c-.373 1.05-2.167 1.934-2.987 2.062-.767.12-1.72.173-2.867-.177-2.35-.732-3.883-2.56-4.142-2.827-.26-.267-1.011-1.347-1.011-2.57 0-1.224.637-1.827.862-2.075.226-.25.487-.31.65-.31.162 0 .325 0 .466.007.15.007.35-.057.547.42.2.487.678 1.689.737 1.812.06.125.098.267.02.42-.077.154-.116.25-.228.383-.113.134-.238.3-.34.4-.112.112-.23.234-.1.457.127.224.566.933 1.217 1.51.834.746 1.537.975 1.76 1.084.226.112.354.095.49-.058.137-.154.56-.653.71-.876.15-.224.3-.183.51-.11.21.074 1.332.63 1.56.746.23.117.382.174.44.27.06.094.06 1.076-.313 2.125z" />
        </svg>
      ),
      label: 'WA',
      fullLabel: 'WhatsApp',
      className: 'bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#25D366]',
    },
  ];

  const imagessd = [
    shopData.photos?.[0],
    "/products-images/80w.png",
    "/products-images/boat-og.png",
    shopData.photos?.[0]
  ];

    function handleRedirectToShop(shopId: string) {
        console.log('Clicked Shop ID:', shopId);

      if (!shopId) {
        showToast({ title: "error", description: "There something error please refresh and go ahead" })
        return;
      }
  
      const encodedId = encodeIds(shopId)
      console.log(encodedId,"sdfahsfjkdh")
      navigate.push(`/shop/${encodedId}`)
    }

  return (
    <div key={keyid} className="flex flex-col md:flex-row gap-3 md:gap-6 p-3 rounded-lg border shadow-sm bg-white cursor-pointer" onClick={()=>handleRedirectToShop(shopData.id)}>
      {shopData.photos?.[0] ? (
        <ImageLeftRightArrow images={imagessd} alt={shopData.name} />
      ) : (
        <svg
          width="300"
          height="200"
          viewBox="0 0 300 200"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full md:w-56 h-36 md:h-48 object-cover rounded-md"
        >
          <rect width="300" height="200" fill="#f3f4f6" />
          <rect x="60" y="70" width="180" height="100" fill="#4b5563" rx="8" />
          <polygon points="50,70 150,30 250,70" fill="#1f2937" />
          <rect x="135" y="120" width="30" height="50" fill="#d1d5db" rx="3" />
          <rect x="80" y="90" width="30" height="30" fill="#9ca3af" rx="3" />
          <rect x="190" y="90" width="30" height="30" fill="#9ca3af" rx="3" />
          <rect x="105" y="50" width="90" height="25" fill="#10b981" rx="4" />
          <text
            x="150"
            y="68"
            fontFamily="sans-serif"
            fontSize="12"
            textAnchor="middle"
            fill="white"
          >
            {extractFirstSegment(shopData.name).slice(0, 20)}
          </text>
          <rect x="145" y="95" width="10" height="30" fill="white" rx="2" />
          <circle cx="150" cy="122" r="1.5" fill="#4b5563" />
        </svg>
      )}


      <div className="flex flex-col justify-between flex-1">
        <div className="space-y-1.5 ">
          <h1 className="text-base md:text-xl font-semibold text-gray-900 line-clamp-2">
            {extractFirstSegment(shopData.name)}
          </h1>
  
          <Link
            href={shopData.maps_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-sm text-blue-600 hover:underline"
          >
            <MapPin className="h-4 w-4 mr-1" />
            View Map
          </Link>

          <p className="text-sm text-gray-600">Just 2 km away</p>

          <div className="flex flex-wrap items-center gap-2 mt-2">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 text-yellow-500" />
              <span className="text-sm font-medium text-gray-800">
                {shopData.rating}
              </span>
            </div>

            <span className="flex items-center gap-1 text-xs font-semibold text-green-600 bg-green-100 px-2 py-0.5 rounded">
              <Eye className="h-3 w-3" />
              Popular
            </span>

            <span className="flex items-center gap-1 text-xs font-semibold text-blue-600 bg-blue-100 px-2 py-0.5 rounded">
              <CheckCircle className="h-3 w-3" />
              Verified
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between mt-3">
          <span className="text-xs text-gray-700 flex items-center">
            🇮🇳 Vidya Nagar
          </span>

          <button className="text-blue-600 text-xs flex items-center hover:underline">
            View more
            <svg
              className="h-3 w-3 ml-1"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        <div className="flex flex-wrap gap-2 mt-4">
          {buttons.map((btn, idx) => {
            const ButtonComponent = btn.href ? motion.a : motion.button;
            return (
              <ButtonComponent
                key={idx}
                {...buttonVariants}
                href={btn.href}
                onClick={btn.onClick}
                target={btn.href?.startsWith('http') ? '_blank' : undefined}
                rel="noopener noreferrer"
                className={`flex items-center rounded px-3 py-1 text-xs md:text-sm font-medium transition-all shadow-sm ${btn.className}`}
              >
                {btn.icon}
                <span className="hidden md:inline">{btn.fullLabel}</span>
                <span className="inline md:hidden">{btn.label}</span>
              </ButtonComponent>
            );
          })}
        </div>
      </div>
    </div>
  );
};
