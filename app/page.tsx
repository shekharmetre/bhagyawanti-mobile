
import Categories from "@/components/home/Categories";
import Testimonials from "@/components/home/Testimonials";
import NewArrivalWrapper from "@/components/home/new-arrival";
import { products } from "@/lib/data";
import { Stats } from "@/components/home/stats";
import { Why } from "@/components/home/why";
import { Hero } from "@/components/home/Hero";
import DailyOffersCarousel from "@/components/home/DailyOffersCarousel";
import { LatestStoriesSection } from "@/components/home/latest-stories";
import AskQueryComponent from "@/components/home/ask-your-query";

export default function Home() {
  const newArrival = products.filter(Item => Item.isNew)

  return (
    <div className="md:px-24 px-2">
      <Hero />
      < DailyOffersCarousel containerClassName="" imageClassName="h-[20rem]"/>
      <Stats />
      
      <Categories />
      <NewArrivalWrapper showPagination={true} showPercentage={true} products={products} />
      <NewArrivalWrapper showPagination={false} products={products} badgeText="Latest Products" title="Latest Products" subtitle="Discover our handpicked selection of primium mobile accessories" />
      {/* <AskQueryComponent /> */}
       <LatestStoriesSection />
      {/* <ShopBrandsDemo /> */}
      <Why />
     
      <Testimonials />

    </div>
  );
}