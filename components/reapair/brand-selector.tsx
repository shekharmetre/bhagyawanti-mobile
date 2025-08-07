'use client';

import { useState, useEffect } from 'react';
import { AlertCircle, ChevronDown } from 'lucide-react';

const BRANDS = ['VIVO', 'Samsung', 'Realme', 'Apple', 'OnePlus', 'POCO'];

export function BrandSelector({
    selected,
    onSelect,
    disabled,
}: {
    selected?: string;
    onSelect: (brand: string) => void;
    disabled:boolean
}) {
    const [sel, setSel] = useState(selected)
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState('');

    // Show filtered list as user types
    const filtered = BRANDS.filter((b) =>
        b.toLowerCase().includes(search.toLowerCase())
    );


    // Show selected brand on the button, not just the placeholder
    const displayLabel = sel ? sel : 'Choose a brand...';

    return (
        <div className="relative w-full mt-3">
            <label className="font-bold text-sm md:text-lg flex items-center gap-2">
                Select Brand <AlertCircle className="w-5 h-5 text-gray-900" />
            </label>

            <button
            disabled={disabled}
                onClick={() => setOpen(!open)}
                className="border border-gray-300 rounded-md md:p-2 p-1 w-full mt-2 bg-white flex justify-between items-center"
            >
                <span className={`${selected ? 'text-black' : 'text-gray-400'}`}>
                    {displayLabel}
                </span>
                <ChevronDown className="w-4 h-4" />
            </button>

            {open && (
                <div className="absolute w-full mt-1 border rounded-md shadow bg-white z-30">
                    <input
                        placeholder="Search brand..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full p-2 text-sm border-b outline-none"
                    />
                    <ul className="max-h-48 overflow-y-auto">
                        {filtered.length ? (
                            filtered.map((brand) => (
                                <li
                                    key={brand}
                                    onClick={() => {
                                        setSel(brand)
                                        onSelect(brand);
                                        setOpen(false);
                                        setSearch('');
                                    }}
                                    className={`px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm ${brand === selected ? 'bg-gray-100 font-semibold' : ''
                                        }`}
                                >
                                    {brand}
                                </li>
                            ))
                        ) : (
                            <li className="px-4 py-2 text-gray-500 text-sm">No results</li>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
}
