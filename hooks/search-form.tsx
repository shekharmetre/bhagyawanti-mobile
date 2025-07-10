// components/SearchForm.tsx
"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { usePathname } from "next/navigation";
import { useFilterStore } from "@/store/filter";
import { useState } from "react";

export function SearchForm({ className }: { className?: string }) {
  const pathname = usePathname();
  const setSearchQuery = useFilterStore((state) => state.setSearchQuery);
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(searchValue);
    if (pathname !== "/products") {
      window.location.href = "/products";
    }
  };

  return (
    <form onSubmit={handleSearch} className={`relative ${className}`}>
      <Input
        type="text"
        placeholder="Search products..."
        className="w-full rounded-full bg-muted px-4 pr-8"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
      />
      <button
        type="submit"
        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
      >
        <Search className="h-4 w-4" />
      </button>
    </form>
  );
}
