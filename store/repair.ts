// app/stores/useRepairSelectionStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";

// Replace these with your actual types
import type { ExtraInfoItem } from "@/lib/types";

// Allow `video` to be string OR null so it matches initial state
interface RepairSelectionData {
  selection: "repair";
  brand: string;
  modelName: string;
  video: {name:string,price:string}; // ✅ allow null
  optional: ExtraInfoItem[];
}

interface RepairSelectionStore {
  repairSelection: RepairSelectionData;
  setRepairSelection: (data: RepairSelectionData) => void;
  resetRepairSelection: () => void;
}

export const useRepairSelectionStore = create<RepairSelectionStore>()(
  persist(
    (set) => ({
      repairSelection: {
        selection: "repair",
        brand: "",
        modelName: "",
        video: null, // ✅ works now because type allows null
        optional: [],
      },
      setRepairSelection: (data) => set({ repairSelection: data }),
      resetRepairSelection: () =>
        set({
          repairSelection: {
            selection: "repair",
            brand: "",
            modelName: "",
            video: null,
            optional: [],
          },
        }),
    }),
    {
      name: "repair-selection-store", // localStorage key
    }
  )
);
