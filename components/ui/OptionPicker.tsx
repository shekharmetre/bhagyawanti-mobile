import { useState } from "react";
import { Grid, Smartphone, Headphones, ChevronDown } from "lucide-react";
import type { OptionPickerCategory } from "@/lib/types";

const defaultCategories: OptionPickerCategory[] = [
  { id: "all", label: "All", icon: Grid },
  { id: "repair", label: "Repair", icon: Smartphone },
  { id: "accessories", label: "Accessories", icon: Headphones },
];

interface OptionPickerProps {
  options?: OptionPickerCategory[];
  onChange?: (categoryId: string) => void;
  defaultValue?: string;
  classname? : string
}

export function OptionPicker({
  options = defaultCategories,
  onChange,
  defaultValue = "all",
  classname = "w-64 relative"
}: OptionPickerProps) {
  const [selectedCategory, setSelectedCategory] = useState(defaultValue);
  const [isOpen, setIsOpen] = useState(false);

  const selectedOption = options.find(opt => opt.id === selectedCategory);

  const handleSelect = (id: string) => {
    setSelectedCategory(id);
    onChange?.(id);
    setIsOpen(false);
  };

  return (
    <div className={classname}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(prev => !prev)}
        className="w-full flex items-center justify-between rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-700 shadow-sm hover:shadow-md focus:border-blue-500 focus:ring-2 focus:ring-blue-500 transition"
      >
        <div className="flex items-center gap-2">
          {selectedOption && <selectedOption.icon className="w-4 h-4 text-blue-500" />}
          <span>{selectedOption?.label}</span>
        </div>
        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute mt-2 w-full bg-white border border-gray-200 rounded-xl shadow-lg z-10 overflow-hidden">
          {options.map((opt) => (
            <button
              key={opt.id}
              onClick={() => handleSelect(opt.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 text-left text-sm hover:bg-blue-50 transition ${
                opt.id === selectedCategory ? "bg-blue-100 text-blue-600" : "text-gray-700"
              }`}
            >
              <opt.icon className="w-4 h-4 text-blue-500" />
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
