// components/FilterTabs.tsx
import React from "react";

interface TabItem {
  key: string;
  label: string;
  count?: number;
}



interface FilterTabsProps {
  tabs: TabItem[];
  selectedKey: string;
  onSelect: (key: string) => void;
}

export function TabFilterTabs({ tabs, selectedKey, onSelect }: FilterTabsProps) {
  return (
    <div className="flex gap-2 mb-6 bg-white p-2 rounded-xl shadow-sm overflow-x-scroll">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => onSelect(tab.key)}
          className={`flex-shrink-0 px-4 py-2 rounded-lg font-medium transition-all text-sm md:text-base ${
            selectedKey === tab.key
              ? "bg-blue-500 text-white shadow-md"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          {tab.label}
          {tab.count !== undefined && ` (${tab.count})`}
        </button>
      ))}
    </div>
  );
}
