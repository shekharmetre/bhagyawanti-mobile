"use client"

import { motion } from "framer-motion"
import KeenSliderWrapper from "../ui/slider"
import ProductShow from "../products/product-page"
import { Product } from "@/lib/types"

interface NewArrivalProps {
    products: Product[]
    badgeText?: string
    title?: string
    subtitle?: string
    showPercentage? : boolean
    showPagination?: boolean
}

export default function NewArrivalWrapper({
    products,
    badgeText = "New",
    title = "New Arrivals",
    subtitle = "New vibes, new accessories. Fresh picks just for you — discover our latest arrivals.",
    showPercentage = false,
    showPagination = true
}: NewArrivalProps) {
    return (
        <section className="mt-5 md:max-w-7xl mx-auto md:mt-20 px-2 text-black rounded-xl">
            <motion.h2
                className="text-3xl font-serif md:text-4xl font-bold text-start md:text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
            >
                {title}
            </motion.h2>

            <motion.p
                className="text-sm text-start md:text-center text-gray-400 font-semibold md:text-lg mt-2 max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
            >
                {subtitle}
            </motion.p>

            <KeenSliderWrapper
                autoplay
                showPagination={showPagination}
                paginationClassName="mt-6 gap-3"
                showArrows={true}
                config={{
                    slides: {
                        perView: 2.5,
                        spacing: 16,
                    },
                    breakpoints: {
                        '(max-width: 768px)': {
                            slides: {
                                perView: 1.8,
                                spacing: 0,
                            },
                        },
                        '(min-width: 1024px)': {
                            slides: {
                                perView: 5.5,
                                spacing: 20,
                            },
                        },
                    },
                }}
            >
                {
                    products &&
                    products.map((item, index) => (
                        <ProductShow showPercentage={showPercentage} key={`${item.id}-${index}`} product={item} />

                    ))
                }

            </KeenSliderWrapper>
        </section>
    )
}
