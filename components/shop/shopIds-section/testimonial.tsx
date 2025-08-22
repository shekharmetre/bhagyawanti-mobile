'use client'

import { Star, Quote, ArrowLeft, ArrowRight } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

interface RetailerReview {
    id: number;
    name: string;
    role?: string;                    // Customer role optional or could be like "Verified Buyer"
    shopName?: string;                 // Store or shop name
    image: string;                   // Customer image or shop logo
    content: string;                 // Review or feedback content
    rating: number;                  // Rating (1-5 stars)
    purchaseDetails?: string;        // E.g., "Bought mobile, accessories, and repair service"
    serviceExperience?: string;     // Comments about repair/service quality
    productExperience?: string;     // Comments about mobile/accessory product
    date?: string;                  // Date of review or purchase
    verified?: boolean;     
    company? : string ;
    companyLogo? : string;       // Verified buyer or service user
}


const testimonials: RetailerReview[] = [
    {
        id: 1,
        name: "Amit Kumar",
        shopName: "MobileFix Hub",
        image: "https://randomuser.me/api/portraits/men/75.jpg",
        content: "Great experience with MobileFix Hub. They repaired my phone swiftly and the accessory quality is top notch.",
        rating: 5,
        purchaseDetails: "Screen repair & original tempered glass",
        serviceExperience: "Quick turnaround and fair pricing.",
        productExperience: "The tempered glass fits perfectly and is super durable.",
        date: "2024-07-15",
        verified: true
    },
    {
        id: 2,
        name: "Priya Sharma",
        shopName: "Gadget World",
        image: "https://randomuser.me/api/portraits/women/68.jpg",
        content: "The staff was friendly and guided me well regarding mobile cases. Repair took a bit longer but worth it for the quality.",
        rating: 4,
        purchaseDetails: "Mobile case purchase and battery replacement",
        serviceExperience: "Battery replacement was effective but took 3 days.",
        productExperience: "Loved the variety and quality of mobile cases.",
        date: "2024-05-22",
        verified: true
    },
    {
        id: 3,
        name: "Rohan Singh",
        shopName: "TechFixers",
        image: "https://randomuser.me/api/portraits/men/88.jpg",
        content: "Efficient repair services. The accessories I bought work flawlessly with my phone.",
        rating: 5,
        purchaseDetails: "Camera lens repair and mobile charger",
        serviceExperience: "Repair done in a day with great professionalism.",
        productExperience: "Charger works perfectly and charges fast.",
        date: "2024-06-05",
        verified: false
    },
    {
        id: 4,
        name: "Neha Patel",
        role: "Customer",
        company: "PhoneCare Pros",
        image: "https://randomuser.me/api/portraits/women/59.jpg",
        content: "Friendly staff and brilliant service. My mobile works like new after repair.",
        rating: 5,
        companyLogo: "PC",
        purchaseDetails: "Battery and software fix",
        serviceExperience: "Excellent explanation and timely repair.",
        productExperience: "Bought a new USB-C cable, very good quality.",
        date: "2024-07-01",
        verified: true
    },
    {
        id: 5,
        name: "Karan Mehta",
        role: "Customer",
        company: "Accessory Hub",
        image: "https://randomuser.me/api/portraits/men/45.jpg",
        content: "Love the accessories range! The repair shop nearby did a fantastic job as well.",
        rating: 5,
        companyLogo: "AH",
        purchaseDetails: "Phone cover and screen repair",
        serviceExperience: "Quick and affordable repair.",
        productExperience: "Phone cover is stylish and durable.",
        date: "2024-06-28",
        verified: true
    },
    {
        id: 6,
        name: "Ritu Singh",
        role: "Customer",
        company: "Mobile Expert",
        image: "https://randomuser.me/api/portraits/women/40.jpg",
        content: "Exceptional after-sales support and fast shipping of accessories.",
        rating: 5,
        companyLogo: "ME",
        purchaseDetails: "Mobile case + Wireless charger",
        serviceExperience: "Very responsive support team.",
        productExperience: "Charger is efficient and compact.",
        date: "2024-07-10",
        verified: true
    }
];



export const TestimonialSection = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextTestimonial = () => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    };

    const prevTestimonial = () => {
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    };

    const renderStars = (rating: number) => (
        Array.from({ length: 5 }, (_, i) => (
            <Star
                key={i}
                className={`w-4 h-4 ${i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                    }`}
            />
        ))
    );

    const t = testimonials[currentIndex];

    // Animation variants for fade + slide up
    const fadeUpVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
    };

    return (
        <section className="md:py-16 bg-gradient-to-br from-background via-background/50 to-primary/5 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-grid-primary/10 mask-fade-bottom" />
            <div className="absolute top-20 left-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute bottom-20 right-10 w-40 h-40 bg-accent/20 rounded-full blur-3xl animate-pulse delay-1000" />

            <div className="container mx-auto px-4 relative z-10">
                {/* Header */}
                <div className="text-center">
                    <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
                        <Quote className="w-4 h-4" />
                        Customer Stories
                    </div>
                    <motion.p
                        className="md:text-xl text-sm font-semibold text-muted-foreground max-w-3xl mx-auto py-6"
                        initial="hidden"
                        animate="visible"
                        variants={fadeUpVariants}
                    >
                        Don't just take our word for it. Here's what industry leaders have to say about their experience with our platform.
                    </motion.p>
                </div>

                {/* Featured Testimonial */}
                <motion.div
                    className="max-w-6xl mx-auto mb-16"
                    initial="hidden"
                    animate="visible"
                    variants={fadeUpVariants}
                >
                    <div className="relative bg-card border border-border/50 rounded-3xl p-2 lg:p-12 shadow-elegant backdrop-blur-sm">
                        <div className="absolute top-6 left-6 text-primary/20">
                            <Quote className="w-12 h-12" />
                        </div>

                        <div className="grid lg:grid-cols-3 md:gap-8 gap-2 items-center">
                            {/* Testimonial Content */}
                            <div className="lg:col-span-2">
                                <div className="flex items-center gap-1 mb-4">
                                    {renderStars(t.rating)}
                                </div>
                                <blockquote className="text-md lg:text-2xl font-medium text-foreground leading-relaxed mb-6">
                                    "{t.content}"
                                </blockquote>

                                <div className="hidden md:flex items-center gap-4">
                                    <div className="relative">
                                        <Image
                                        width={200}
                                        height={200}

                                            src={t.image}
                                            alt={t.name}
                                            className="w-16 h-16 rounded-full object-cover ring-4 ring-primary/20"
                                        />
                                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                                            <Quote className="w-3 h-3 text-primary-foreground" />
                                        </div>
                                    </div>

                                    <div className="flex-1">
                                        <h4 className="font-semibold text-foreground text-lg">
                                            {t.name}
                                        </h4>
                                        <p className="text-muted-foreground">
                                            {t.role} at {t.shopName}
                                        </p>
                                    </div>

                                    <div className="hidden sm:block">
                                        <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center text-white font-bold text-sm">
                                            {t.name}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Profile Image Large */}
                            <div className="lg:col-span-1 flex justify-center">
                                <div className="relative">
                                    <div className="w-48 h-48 rounded-3xl overflow-hidden ring-8 ring-primary/10 shadow-elegant">
                                        <Image width={500} height={500}
                                            src={t.image}
                                            alt={t.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="absolute -bottom-4 -right-4 bg-card border border-border rounded-2xl p-4 shadow-lg">
                                        <div className="flex items-center gap-1">
                                            {renderStars(t.rating)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Navigation */}
                        <div className="flex items-center justify-between mt-8">
                            <div className="flex items-center gap-2">
                                {testimonials.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentIndex(index)}
                                        className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentIndex
                                                ? "bg-primary w-8"
                                                : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                                            }`}
                                    />
                                ))}
                            </div>

                            <div className="flex items-center gap-2">
                                <button
                                    onClick={prevTestimonial}
                                    className="w-10 h-10 rounded-full bg-muted hover:bg-muted/80 flex items-center justify-center transition-colors"
                                    aria-label="Previous testimonial"
                                >
                                    <ArrowLeft className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={nextTestimonial}
                                    className="w-10 h-10 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 flex items-center justify-center transition-colors"
                                    aria-label="Next testimonial"
                                >
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Testimonial Grid */}
                <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {testimonials.slice(0, 6).map((testimonial, index) => (
                        <motion.div
                            key={testimonial.id}
                            className={`group bg-card border border-border/50 rounded-2xl p-6 hover:shadow-elegant transition-all duration-300 hover:-translate-y-1 ${index === currentIndex ? "ring-2 ring-primary/50" : ""
                                }`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: index * 0.1 }}
                            whileHover={{ scale: 1.03 }}
                        >
                            <div className="flex items-center gap-1 mb-4">
                                {renderStars(testimonial.rating)}
                            </div>

                            <blockquote className="text-foreground mb-6 line-clamp-2">
                                "{testimonial.content}"
                            </blockquote>

                            <div className="flex items-center gap-3">
                                <Image width={500} height={500}
                                    src={testimonial.image}
                                    alt={testimonial.name}
                                    className="w-12 h-12 rounded-full object-cover ring-2 ring-primary/20"
                                />
                                <div className="flex-1">
                                    <h4 className="font-semibold text-foreground text-sm">
                                        {testimonial.name}
                                    </h4>
                                    <p className="text-muted-foreground text-xs">
                                        {testimonial.role}
                                    </p>
                                    <p className="text-primary text-xs font-medium">
                                        {testimonial.shopName}
                                    </p>
                                </div>
                                <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center text-white font-bold text-xs">
                                    {testimonial.name}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
