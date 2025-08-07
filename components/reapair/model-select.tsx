'use client';

import { useState, useMemo, useEffect } from 'react';
import { AlertCircle, ChevronDown } from 'lucide-react';

const MODELS: Record<string, string[]> = {
  VIVO: ['Y91', 'Y20', 'V21'],
  Samsung: ['Galaxy M12', 'Galaxy S21', 'A52'],
  Apple: ['iPhone 11', 'iPhone 12', 'iPhone 13'],
  Realme: ['Narzo 50', 'Realme 9', 'Realme C35'],
  OnePlus: ['Nord CE', 'OnePlus 9', 'OnePlus 11R'],
  POCO: ['X3', 'M4 Pro', 'F5'],
};

export function ModelSelector({
  brand,
  selected,
  onSelect,

}: {
  brand?: string;
  selected?: string;
  onSelect: (model: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [sel, setSel] = useState(selected);

  const models = useMemo(() => MODELS[brand || ''] || [], [brand]);
  const filtered = useMemo(
    () => models.filter((m) => m.toLowerCase().includes(search.toLowerCase())),
    [models, search]
  );

  useEffect(() => {
    setSel(selected);
  }, [selected]);

  const isDisabled = !brand || !MODELS[brand];
  const displayLabel = sel ? sel : 'Choose a model...';

  return (
    <div className="relative w-full mt-4">
      <label className="font-bold text-sm md:text-lg flex items-center gap-2">
        Select Model <AlertCircle className="w-5 h-5 text-gray-900" />
      </label>

      {isDisabled && (
        <div className="text-sm text-red-600 mt-1 mb-1">
          Please select a valid brand first
        </div>
      )}

      <button
        disabled={isDisabled}
        onClick={() => setOpen(!open)}
        className={`border border-gray-300 rounded-md md:p-2 p-1 w-full bg-white flex justify-between items-center ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'mt-2'
          }`}
      >
        <span className={`${sel ? 'text-black' : 'text-gray-400'}`}>
          {displayLabel}
        </span>
        <ChevronDown className="w-4 h-4" />
      </button>

      {open && !isDisabled && (
        <div className="absolute w-full mt-1 border rounded-md shadow bg-white z-30">
          <input
            placeholder="Search model..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-2 text-sm border-b outline-none"
          />
          <ul className="max-h-48 overflow-y-auto">
            {filtered.length ? (
              filtered.map((model) => (
                <li
                  key={model}
                  onClick={() => {
                    setSel(model);
                    onSelect(model);
                    setOpen(false);
                    setSearch('');
                  }}
                  className={`px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm ${model === sel ? 'bg-gray-100 font-semibold' : ''
                    }`}
                >
                  {model}
                </li>
              ))
            ) : (
              <li className="px-4 py-2 text-gray-500 text-sm">No models found</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
