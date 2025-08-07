import { Metadata } from "next";
import ProductFilters from "@/components/products/ProductFilters";
import { ProductPage } from "@/components/products/product-search";
export const metadata: Metadata = {
  title: "Products | MobileHub",
  description: "Browse our wide selection of mobile accessories and gadgets",
};

export default function ProductsPage() {
  return (
    <>
      {/* Desktop Layout */}
      <div className="">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="bg-white md:block hidden shadow-md rounded-lg p-6 mb-8">
              <h2 className="text-lg font-semibold mb-4">Filters</h2>
              <ProductFilters />
            </div>
          <ProductPage />
          </div>
        </div>
      </div>
    </>
  );
}