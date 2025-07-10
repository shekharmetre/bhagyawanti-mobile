
import Categories from "@/components/home/Categories";
import Testimonials from "@/components/home/Testimonials";
import NewArrivalWrapper from "@/components/home/new-arrival";
import { products } from "@/lib/data";
import { Stats } from "@/components/home/stats";
import { Why } from "@/components/home/why";
import { Hero } from "@/components/home/Hero";
import DailyOffersCarousel from "@/components/home/DailyOffersCarousel";

export default function Home() {
  const newArrival = products.filter(Item => Item.isNew)

  return (
    <div className="md:px-24 px-2">
      <Hero />
      < DailyOffersCarousel/>
      <Stats />
      
      <Categories />
      <NewArrivalWrapper showPagination={true} showPercentage={true} products={newArrival} />
      <NewArrivalWrapper showPagination={false} products={products} badgeText="Latest Products" title="Latest Products" subtitle="Discover our handpicked selection of primium mobile accessories" />

      {/* <ShopBrandsDemo /> */}
      <Why />
      <Testimonials />
    </div>
  );
}