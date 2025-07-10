import React from "react";
import ProductShow from "../products/product-page";
import { Product } from "@/lib/types";

interface NewArrivalProps {
    products: Product[]
    badgeText?: string
    title?: string
    subtitle?: string
    showPercentage?: boolean
    showPagination?: boolean
}

export default function NewArrivalWrapperSSR({
    products,
    badgeText = "New",
    title = "New Arrivals",
    subtitle = "New vibes, new accessories. Fresh picks just for you — discover our latest arrivals.",
    showPercentage = false
}: NewArrivalProps) {
    return (
        <section className="mt-5 md:max-w-7xl mx-auto md:mt-20 px-2 text-black rounded-xl">
            <h2 className="text-3xl font-serif md:text-4xl font-bold text-start md:text-center">
                {title}
            </h2>

            <p className="text-sm text-start md:text-center text-gray-400 font-semibold md:text-lg mt-2 max-w-2xl mx-auto">
                {subtitle}
            </p>

            <div className="mt-8">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
                    {products &&
                    products.map((item, index) => (
                        <ProductShow showPercentage={showPercentage} key={`${item.id}-${index}`} product={item} />
                    ))
                    }
                </div>
            </div>
        </section>
    )
} 