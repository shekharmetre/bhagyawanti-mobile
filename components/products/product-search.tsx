"use client";

import { useState, useMemo } from "react";
import { useDebounce } from "use-debounce";
import ProductGrid from "./ProductGrid";
import { Product as ProductType } from "@/lib/types";
import { SearchForm } from "@/hooks/search-form";
import { products as defaultProducts } from "@/lib/data";

interface ProductPageProps {
  product?: ProductType[];
}

export function ProductPage({ product = defaultProducts }: ProductPageProps) {
  const [query, setQuery] = useState("");

  // ✅ Destructure the debounced value
  const [debouncedQuery] = useDebounce(query, 300);

  const filteredProducts = useMemo(() => {
    const lowerQuery = debouncedQuery.toLowerCase();
    return product.filter((p) => {
      const nameMatch = p.name.toLowerCase().includes(lowerQuery);
      const idMatch =
        typeof p.id === "string" &&
        p.id.toLowerCase().includes(lowerQuery);
      return nameMatch || idMatch;
    });
  }, [product, debouncedQuery]);

  return (
    <div className="flex-1">
      <div className="flex flex-col-reverse md:gap-0 gap-5 md:flex-row md:justify-between md:items-center md:mb-5 mb-2">
        <h1 className="text-2xl font-bold mb-6">All Products</h1>
        <SearchForm onSearch={setQuery} />
      </div>
      <ProductGrid allProducts={filteredProducts} />
    </div>
  );
}
