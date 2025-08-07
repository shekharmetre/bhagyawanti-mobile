"use client";
import React from "react";
import { ProductCardMinimal } from "../shop/shopIds-section/compact-card";
import ProductShow from "../products/product-page";
import { products as defaultProducts } from "@/lib/data";
import { Product } from "@/lib/types";

interface Props {
  products?: Product[];
  newArrivalData?: Product[];
  loadingProducts?: boolean;
  loadingNewArrivals?: boolean;
}

const CARD_CLASSES =
  "min-w-[40vw] sm:min-w-[40vw] md:min-w-[22vw] lg:min-w-[14vw] h-48 rounded-lg bg-gray-200 animate-pulse";

// Utility function to chunk array into subarrays of given size
function chunkArray<T>(arr: T[], size: number): T[][] {
  const chunks: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
}

export function ProductSection({
  products,
  newArrivalData,
  loadingProducts = false,
  loadingNewArrivals = false,
}: Props) {
  const SKELETON_COUNT = 7;

  // Compose unique keys for chunked pairs
  function getPairKey(productPair: Product[], idx: number) {
    const ids = productPair.map((p) => p.id).filter(Boolean);
    return ids.length === productPair.length ? ids.join("-") : `pair-${idx}`;
  }

  return (
    <div>
      {/* Section 1: Newly Launched */}
      <div className="mb-8">
        <div className="mb-5">
          <h2 className="text-2xl font-extrabold text-gray-900 mb-1">Newly Launched</h2>
          <p className="text-sm text-gray-500">Latest released one Product</p>
        </div>
        <div className="w-full overflow-x-auto">
          <div className="flex gap-3">
            {products && products.length > 0 ? (
              products.map((product, idx) => (
                <ProductCardMinimal
                  product={product}
                  key={product.id ? `newly-${product.id}` : `newly-idx-${idx}`}
                />
              ))
            ) : (
              <>
                <ProductCardMinimal  product={defaultProducts[0]} key="default-product-newly " />
                {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
                  <div key={`newly-skeleton-${i}`} className={CARD_CLASSES} />
                ))}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Section 2: Today Best Offers */}
      <div className="mb-8">
        <div className="mb-5">
          <h2 className="text-2xl font-extrabold text-gray-900 mb-1">Today Best Offers</h2>
          <p className="text-sm text-gray-500">Latest released one Product</p>
        </div>
        <div className="w-full overflow-x-auto">
          <div className="flex gap-1">
            {newArrivalData && newArrivalData.length > 0 ? (
              newArrivalData.map((item, idx) => (
                <ProductShow
                  product={item}
                  key={item.id ? `offer-${item.id}` : `offer-idx-${idx}`}
                  showPercentage={true}
                  cartOption="hidden"
                />
              ))
            ) : (
              <>
                <ProductShow
                  product={defaultProducts[0]}
                  key="default-product-offer"
                  showPercentage={true}
                  cartOption="hidden"
                />
                {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
                  <div key={`offer-skeleton-${i}`} className={CARD_CLASSES} />
                ))}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Section 3: All Products */}
      <div className="mb-8">
        <div className="mb-5">
          <h2 className="text-2xl font-extrabold text-gray-900 mb-1">All Products</h2>
          <p className="text-sm text-gray-500">Latest released products</p>
        </div>
        <div className="w-full overflow-x-auto">
          <div className="flex gap-3">
            {products && products.length > 0 ? (
              chunkArray(products, 2).map((productPair, idx) => {
                const pairKey = getPairKey(productPair, idx);
                return (
                  <div
                    key={`all-products-pair-${pairKey}`}
                    className="flex flex-col gap-6"
                    style={{ minWidth: "fit-content" }}
                  >
                    {productPair.map((product, i) => (
                      <ProductCardMinimal
                        key={product.id ? `all-${product.id}` : `all-${pairKey}-item-${i}`}
                        product={product}
                      />
                    ))}
                  </div>
                );
              })
            ) : (
              <>
                <ProductCardMinimal product={defaultProducts[0]} key="default-product-all" />
                {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
                  <div key={`all-skeleton-${i}`} className={CARD_CLASSES} />
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
