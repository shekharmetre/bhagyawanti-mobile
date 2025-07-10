'use client'
import { SearchForm } from "@/hooks/search-form";
import ProductFilters from "./ProductFilters";
import { FilterIcon } from "lucide-react";
import { useUniversalModal } from "@/hooks/universal-popup";
import { Button } from "../ui/button";

export function ProductSetup() {
    const { openModal, closeModal } = useUniversalModal();
    return (
        <>
            <div className="hidden md:block w-64">
                <div className="bg-white shadow-md rounded-lg p-6 mb-8">
                    <h2 className="text-lg font-semibold mb-4">Filters</h2>
                    <ProductFilters />
                </div>
                <div className="bg-white shadow-md rounded-lg p-6">
                    <SearchForm />
                </div>
            </div>
            <div className="md:hidden mb-8 gap-3 flex items-center justify-between">
                <SearchForm className=" w-full" />
                <Button >  <FilterIcon size={30} /></Button>

            </div>
        </>
    );
}