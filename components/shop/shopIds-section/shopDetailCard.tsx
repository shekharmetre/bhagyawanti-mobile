'use client'
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import shopImage from "@/public/download.jpeg";
import { Eye, MapPin, MessageCircle, PhoneCall, Star, TrendingUp } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

// Dummy shop data as before
const dummyShopData = {
    imageUrl: "https://example.com/shop-image.jpg",
    shopName: "Urban Fashion Outlet",
    location: "123 Main Street, Downtown, Cityville",
    rating: 4.7,
    reviewCount: 128,
    trustBadges: [
        "Verified Seller",
        "5+ Years in Business",
        "Secure Payments"
    ],
    contactPhone: "+1 (555) 123-4567",
    whatsappLink: "https://wa.me/15551234567",
    highlights: [
        "Free shipping on orders over Rs.50",
        "30-day return policy",
        "Eco-friendly packaging",
        "Handmade products"
    ],
    description: "Urban Fashion Outlet is your premier destination for trendy clothing and accessories. We specialize in sustainable fashion that doesn't compromise on style. Our collections are carefully curated to bring you the latest trends at affordable prices.",
    inventoryImages: [
        "https://example.com/products/product1.jpg",
        "https://example.com/products/product2.jpg",
        "https://example.com/products/product3.jpg",
        "https://example.com/products/product4.jpg"
    ],
    socialLinks: [
        { platform: "facebook", url: "https://facebook.com/urbanfashionoutlet" },
        { platform: "instagram", url: "https://instagram.com/urbanfashionoutlet" },
        { platform: "twitter", url: "https://twitter.com/ufoutlet" },
        { platform: "pinterest", url: "https://pinterest.com/urbanfashionoutlet" }
    ]
};

// Badge actions definition
const shopActions = [
    {
        label: 'Call',
        icon: PhoneCall,
        color: 'from-emerald-500 to-teal-500',
        value: '9066092942',
        onClick: () => window.open('tel:9066092942', '_self')
    },
    {
        label: 'WhatsApp',
        icon: MessageCircle,
        color: 'from-green-400 to-green-600',
        value: 'WhatsApp',
        onClick: () => window.open('https://wa.me/15551234567', '_blank')
    },
    {
        label: 'View Details',
        icon: Eye,
        color: 'from-blue-500 to-violet-600',
        value: 'View Details',
        onClick: () => alert("View Details clicked!")
    },
    {
        label: 'Location',
        icon: MapPin,
        color: 'from-yellow-400 to-orange-500',
        value: 'Location',
        onClick: () => alert("Location clicked!")
    }
];

const ShopDetailCard = ({
    imageUrl = dummyShopData.imageUrl,
    shopName = dummyShopData.shopName,
    location = dummyShopData.location,
    rating = dummyShopData.rating,
    reviewCount = dummyShopData.reviewCount,
    trustBadges = [],
    contactPhone = dummyShopData.contactPhone,
    whatsappLink = dummyShopData.whatsappLink,
    highlights = dummyShopData.highlights,
    description = dummyShopData.description,
    inventoryImages = [],
    socialLinks = [],
}) => {
    const renderStars = () => {
        return Array.from({ length: 5 }, (_, index) => (
            <motion.div
                key={index}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: index * 0.1, type: "spring", stiffness: 300 }}
            >
                <Star className="w-4 h-4 fill-orange-400 text-orange-400" />
            </motion.div>
        ));
    };

    return (
        <div className="mt-3 md:flex gap-5 hidden">
            <div>
                <Image src={shopImage} alt="shopImage" width={1000} height={1000} className="w-[20rem] rounded-md" />
            </div>
            <div id="right-content-side">
                <h1 className="text-xl mb-1">Bhagyawanti Mobile Repair and Accessories</h1>
                <Link href="#" className="text-blue-400 font-semibold underline text-md">Shop direction</Link>
                <div className="flex gap-2 mt-3">
                    <span className="bg-green-400 px-3 rounded-md text-white font-semibold">5.0</span>
                    <div className="flex items-center gap-1">{renderStars()}</div>
                    <span className="text-gray-600 font-medium">{rating.toLocaleString()} Ratings</span>
                    <motion.div whileHover={{ scale: 1.1, rotate: 5 }}>
                        <Badge className="bg-gradient-to-r from-yellow-400 to-orange-400 text-black font-bold px-8 py-2 rounded-lg hover:shadow-lg transition-shadow">🏆 Trust</Badge>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.1, rotate: -5 }}>
                        <Badge className="bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold px-4 py-2 rounded-lg hover:shadow-lg transition-shadow">✓ Verified</Badge>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.1, rotate: 5 }}>
                        <Badge className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold px-4 py-2 rounded-lg hover:shadow-lg transition-shadow">🔥 Popular</Badge>
                    </motion.div>
                </div>

                <motion.div className="flex mt-6 items-center gap-4 text-gray-600">
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-r from-orange-400 to-red-400 flex items-center justify-center">
                            <span className="text-white text-xs font-bold">IN</span>
                        </div>
                        <MapPin className="w-4 h-4" />
                        <span className="font-medium">{location}</span>
                    </div>
                    <Button
                        variant="link"
                        className="text-blue-600 hover:text-blue-800 p-0 h-auto font-semibold"
                    >
                        View More
                        <TrendingUp className="w-4 h-4 ml-1" />
                    </Button>
                </motion.div>

                <div className='mt-5 flex gap-2'>
                    {shopActions.map(({ label, icon: Icon, color, value, onClick }, idx) => (
                        <motion.div
                            whileHover={{ scale: 1.1 }}
                            className="cursor-pointer"
                            key={label  + "label"}
                            onClick={onClick}
                        >
                            <Badge className={`bg-gradient-to-r ${color} text-white font-bold px-4 py-2 flex items-center gap-2 w-fit rounded-lg hover:shadow-lg transition-shadow`}>
                                <Icon className="w-5 h-5" /> {value}
                            </Badge>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ShopDetailCard;
