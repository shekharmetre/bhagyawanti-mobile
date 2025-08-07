
import Contact from "@/components/home/contact-us";
import DailyOffersCarousel from "@/components/home/DailyOffersCarousel";
import NewArrivalWrapper from "@/components/home/new-arrival";
import { ProductSection } from "@/components/layout/product-section";
import ProductShow from "@/components/products/product-page";
import { ProductCardMinimal } from "@/components/shop/shopIds-section/compact-card";
import ShopDetailCard from "@/components/shop/shopIds-section/shopDetailCard";
import { TestimonialSection } from "@/components/shop/shopIds-section/testimonial";
import UnistSliderWrapper from "@/components/ui/slide2";
import { offersCarousel } from "@/lib/data";
import { products as newArrivalData } from "@/lib/data";


const dummyProduct = {
    name: "Minimal Headphones",
    category: "Audio",
    image: "/category/chargers.png",
    price: 79.99,
    originalPrice: 119.99,
    rating: 4.6,
    reviews: 132,
    inStock: true,
    featured: true,
};

export default async function ShopPage({ params }: { params: Promise<{ shopId: string }> }) {
    const { shopId } = await params;
    const products = Array.from({ length: 10 }, (_, i) => ({
        ...dummyProduct,
        name: `Product ${i + 1}`,
        featured: i % 3 === 0,
    }));
    return (
        <div className="md:px-20 px-2 lg:px-32">
            {/* big md and lg */}
            <div className=" lg:grid lg:grid-cols-7  md:grid md:grid-cols-1">
                {/* Left Sidebar - only visible on lg */}

                {/* Main content - ShopDetailCard */}
                <div className="col-span-6 w-full md:block lg:col-span-5">
                    <ShopDetailCard />
                    <DailyOffersCarousel imageClassName="lg:h-[15rem] md:h-[10rem] h-[8rem] object-cover" containerClassName="lg:hidden" items={offersCarousel} />
                </div>

                {/* Right Sidebar - only visible on lg */}
                <div className="hidden lg:block" id="latest-offer">
                    sdfsdf
                </div>
            </div>

           <ProductSection products={newArrivalData} newArrivalData={newArrivalData} />
           <TestimonialSection />
           <Contact />
        </div>
    );
}
