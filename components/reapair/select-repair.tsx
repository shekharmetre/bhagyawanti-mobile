'use client';

import { AlertCircle, X } from 'lucide-react';
import Image from 'next/image';
import React, { useState, useCallback, useEffect } from 'react';
import { useRouter } from "next/navigation";

import { BrandSelector } from './brand-selector';
import { ModelSelector } from './model-select';
import RepairSection from './repair-section';
import { ExtraInfoItem } from '@/lib/types';
import RepairExtraDetails from './add-more';
import { Button } from '../ui/button';
import { showToast } from '@/hooks/filtered-toast';
import { useRepairSelectionStore } from '@/store/repair';

interface SelectRepairProps {
  pBrand?: string;
  pModelName?: string;
}

export function SelectRepair({
  pBrand,
  pModelName,
}: SelectRepairProps) {
  const router = useRouter();

  const [formData, setFormData] = useState({
    selection: 'repair',
    brand: pBrand ?? '',
    modelName: pModelName ?? '',
    video: { name: "", price: "" },
    optional: [] as ExtraInfoItem[],
  });
  const [loading, setLoading] = useState(false);
  const [initializing, setInitializing] = useState(true);

  // Load saved data
  useEffect(() => {
    try {
      const saved = useRepairSelectionStore.getState().repairSelection;
      if (saved && typeof saved === "object") {
        setFormData(prev => ({
          ...prev,
          ...saved,
          video: {
            name: saved.video?.name || "",
            price: saved.video?.price || ""
          }
        }));
      }
    } catch (err) {
      console.error("Error reading saved form data from Zustand:", err);
    } finally {
      setInitializing(false);
    }
  }, []);

  const handleClear = useCallback(() => {
    if (loading) return;
    setFormData(prev => ({ ...prev, brand: '', modelName: '' }));
  }, [loading]);

  const validateForm = useCallback((): string[] => {
    const missing: string[] = [];
    if (!formData.brand) missing.push('Brand');
    if (!formData.modelName) missing.push('Model Name');
    if (!formData.video?.name) missing.push('Repair Issue');
    return missing;
  }, [formData]);

  const handleProceed = useCallback(() => {
    if (loading) return;

    const missingFields = validateForm();
    if (missingFields.length > 0) {
      showToast({
        title: 'Please complete all fields',
        description: `Missing: ${missingFields.join(', ')}`,
      });
      return;
    }

    setLoading(true);

    useRepairSelectionStore.getState().setRepairSelection({
      selection: "repair",
      brand: formData.brand,
      modelName: formData.modelName,
      video: {
        name: formData.video?.name || "",
        price: formData.video?.price || ""
      },
      optional: formData.optional,
    });

    setTimeout(() => {
      router.push("/shop");
      setLoading(false);
    }, 2000);
  }, [formData, loading, validateForm, router]);

  const handleHowItWorksClick = useCallback(() => {
    if (loading) return;
    router.push('/how-it-works');
  }, [loading, router]);

  if (initializing) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full text-center animate-fade-in">
          <svg
            className="w-8 h-8 mx-auto mb-3 text-blue-500 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
            />
          </svg>
          <h2 className="text-lg font-semibold text-gray-800">
            Loading Your Saved Repair Info...
          </h2>
          <p className="text-sm text-gray-500 mt-2">
            Please wait while we fetch your data.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-[700px]">
      <div className="relative z-10 bg-white bg-opacity-90 border-2 border-dotted mt-2 p-3 rounded-md select-none">

        {/* Service selection */}
        <div>
          <label
            htmlFor="service-selection"
            className="font-bold text-sm md:text-lg flex items-center gap-2"
          >
            How can we assist you today?
            <AlertCircle className="w-5 h-5 text-gray-900" />
          </label>
          <select
            id="service-selection"
            value={formData.selection}
            disabled={loading}
            onChange={(e) =>
              setFormData(prev => ({ ...prev, selection: e.target.value }))
            }
            className="border border-gray-300 rounded-md md:p-2 p-1 w-full mt-2 bg-white disabled:bg-gray-100"
          >
            <option value="repair">Book Repair</option>
            <option value="guidance">Repair Guidance</option>
          </select>
        </div>

        <BrandSelector
          selected={formData.brand}
          disabled={loading}
          onSelect={(brand) => setFormData(prev => ({ ...prev, brand }))}
        />

        <ModelSelector
          brand={formData.brand}
          selected={formData.modelName}
          onSelect={(modelName) =>
            setFormData(prev => ({ ...prev, modelName }))
          }
        />

        {/* Device Info */}
        <div className="mt-5">
          <label className="font-bold text-sm md:text-lg flex items-center gap-2">
            Device
            <AlertCircle className="w-5 h-5 text-gray-900" />
          </label>

          <div className="mt-3 bg-[#d8deff] p-2 rounded-md flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="bg-white rounded p-1.5">
                <Image
                  src="/repair/mobiles.png"
                  alt="mobile"
                  width={32}
                  height={32}
                  className="w-8 -rotate-12"
                  priority
                />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800 truncate">
                  {formData.brand || 'Not selected'}
                </p>
                <p className="text-xs text-gray-700 truncate">
                  {formData.modelName || 'Not selected'}
                </p>
              </div>
            </div>
            <X
              className={`w-4 h-4 cursor-pointer ${loading ? 'opacity-40' : ''}`}
              onClick={handleClear}
            />
          </div>
        </div>

        {/* Repair section */}
        <RepairSection
          video={formData.video}
          selectedRepair={(video: string, price: string) => {
            console.log(video,price,"selecred")
            setFormData(prev => ({ ...prev, video: { name: video, price } }))
          } }
          disabled={loading}
        />

        <RepairExtraDetails
          onChange={(items: ExtraInfoItem[]) =>
            setFormData(prev => ({ ...prev, optional: items }))
          }
          disabled={loading}
        />

        {/* Reserve & Continue */}
        <div className="space-y-3 mt-7">
          <Button
            disabled={loading}
            onClick={handleProceed}
            className="w-full flex justify-center bg-gradient-to-br from-blue-600 to-orange-400 font-bold text-base py-3 rounded-xl shadow-lg"
          >
            {loading ? "Finding shop..." : "Find Retailer & Continue to Pay"}
          </Button>

          <div
            onClick={handleHowItWorksClick}
            className="mt-6 cursor-pointer border py-3 text-center font-semibold text-gray-700 hover:bg-gray-100 rounded-xl"
          >
            How It Works
          </div>
        </div>
      </div>
    </div>
  );
}
