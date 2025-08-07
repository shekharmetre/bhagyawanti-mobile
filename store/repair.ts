// app/stores/useRepairSelectionStore.ts
import { create } from "zustand";

// Replace these with your actual types:
import type { RepairVideoType, ExtraInfoItem } from "@/lib/types";

interface RepairSelectionData {
  selection: 'repair';
  brand: string;
  modelName: string;
  video: RepairVideoType | null;
  optional: ExtraInfoItem[];
}

interface RepairSelectionStore {
  repairSelection: RepairSelectionData;
  setRepairSelection: (data: RepairSelectionData) => void;
  resetRepairSelection: () => void;
}

export const useRepairSelectionStore = create<RepairSelectionStore>((set) => ({
  repairSelection: {
    selection: 'repair',
    brand: "",
    modelName: "",
    video: null,
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
}));
