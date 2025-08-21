
import Categories from "@/components/home/Categories";
import Testimonials from "@/components/home/Testimonials";
import NewArrivalWrapper from "@/components/home/new-arrival";
import { offersCarousel, products } from "@/lib/data";
import { Stats } from "@/components/home/stats";
import { Why } from "@/components/home/why";
import { Hero } from "@/components/home/Hero";
import DailyOffersCarousel from "@/components/home/DailyOffersCarousel";
import { LatestStoriesSection } from "@/components/home/latest-stories";
import AskQueryComponent from "@/components/home/ask-your-query";
import { ProductSection } from "@/components/layout/product-section";

export default function Home() {
  const newArrival = products.filter(Item => Item.isNew)

  return (
    <div className="md:px-24 px-2">
      <Hero />
      {/* < DailyOffersCarousel containerClassName="" imageClassName="h-[20rem]"/> */}
      <div className="col-span-6 w-full md:block lg:col-span-5">
        {/* <ShopDetailCard /> */}
        <DailyOffersCarousel imageClassName="lg:h-[15rem] md:h-[10rem] h-[10rem] object-fill" containerClassName="lg:hidden" items={offersCarousel} />
      </div>
      <Stats />

      <Categories />
      <ProductSection products={products} newArrivalData={products} />
      {/* <AskQueryComponent /> */}
      {/* <LatestStoriesSection /> */}
      {/* <ShopBrandsDemo /> */}
      <Why />

      <Testimonials />

    </div>
  );
}