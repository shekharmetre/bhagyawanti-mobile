'use client';

import { AlertCircle, X } from 'lucide-react';
import Image from 'next/image';
import React, { useState, useCallback } from 'react';
import { useRouter } from "next/navigation";

import { BrandSelector } from './brand-selector';
import { ModelSelector } from './model-select';
import RepairSection from './repair-section';
import { ExtraInfoItem, RepairVideoType } from '@/lib/types';
import RepairExtraDetails from './add-more';
import { Button } from '../ui/button';
import { showToast } from '@/hooks/filtered-toast';
import { useRepairSelectionStore } from '@/store/repair';

interface IntroMobileProps {
  pBrand?: string;
  pModelName?: string;
  introInfo?: (data: {
    selection: string;
    brand: string;
    modelName: string;
    video: RepairVideoType | null;
    optional: ExtraInfoItem[];
  }) => void;
  openGuideTab?: () => void;
}

export function SelectRepair({
  pBrand,
  pModelName,
}: IntroMobileProps) {
  const router = useRouter();

  const [formData, setFormData] = useState({
    selection: 'repair',
    brand: pBrand ?? '',
    modelName: pModelName ?? '',
    video: null as RepairVideoType | null,
    optional: [] as ExtraInfoItem[],
  });

  const [loading, setLoading] = useState(false);

  const handleClear = useCallback(() => {
    if (loading) return;
    setFormData((prev) => ({ ...prev, brand: '', modelName: '' }));
  }, [loading]);

  const validateForm = useCallback((): string[] => {
    const missingFields: string[] = [];
    if (!formData.brand) missingFields.push('Brand');
    if (!formData.modelName) missingFields.push('Model Name');
    if (!formData.video) missingFields.push('Repair Issue');
    return missingFields;
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

    // Save form data to Zustand
    useRepairSelectionStore.getState().setRepairSelection({
      selection: "repair",
      brand: formData.brand ?? "",
      modelName: formData.modelName ?? "",
      video: formData.video ?? null,
      optional: formData.optional ?? [],
    });

    // After saving, just redirect to /shop after a tiny delay (for any loading UI)
    setTimeout(() => {
      setLoading(false);
      router.push('/shop');
    }, 800); // You can adjust or remove the timeout as needed
  }, [formData, loading, validateForm, router]);


  const handleHowItWorksClick = useCallback(() => {
    if (loading) return;
    router.push('/how-it-works');
  }, [loading, router]);

  // tsparticles init function


  return (
    <div className="relative min-h-[700px]">
      {/* Particles background */}


      {/* Your original form container with white translucent background */}
      <div className="relative z-10 bg-white bg-opacity-90 border-2 border-dotted mt-2 p-3 rounded-md select-none">
        {/* Selection */}
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
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              setFormData((prev) => ({ ...prev, selection: e.target.value }))
            }
            className="border border-gray-300 rounded-md md:p-2 p-1 w-full mt-2 bg-white disabled:bg-gray-100 disabled:cursor-not-allowed"
          >
            <option value="repair">Book Repair</option>
            <option value="guidance">Repair Guidance</option>
          </select>
        </div>

        <BrandSelector
          selected={formData.brand}
          disabled={loading}
          onSelect={(brand) => setFormData((prev) => ({ ...prev, brand }))}
        />

        <ModelSelector
          brand={formData.brand}
          selected={formData.modelName}
          onSelect={(modelName) =>
            setFormData((prev) => ({ ...prev, modelName }))
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
              className={`w-4 h-4 cursor-pointer ${loading ? 'pointer-events-none opacity-40' : ''
                }`}
              onClick={handleClear}
            />
          </div>
        </div>

        {/* Repair Section */}
        <RepairSection
          selectedRepair={(video: RepairVideoType) =>
            setFormData((prev) => ({ ...prev, video }))
          }
          disabled={loading}
        />

        {/* Extra Details */}
        <RepairExtraDetails
          onChange={(items: ExtraInfoItem[]) =>
            setFormData((prev) => ({ ...prev, optional: items }))
          }
          disabled={loading}
        />

        {/* Reserve and Pay / How It Works Section */}
        <div className="space-y-3 mt-7">

          {/* Button: Find Retailer & Continue to Pay */}
          <Button
            disabled={loading}
            onClick={handleProceed}
            className="w-full flex justify-center bg-gradient-to-br from-blue-600 to-orange-400 font-bold text-base py-3 rounded-xl shadow-lg hover:scale-[1.03] active:scale-95 transition"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg
                  className="w-5 h-5 animate-spin text-white"
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
                Finding shop...
              </span>
            ) : (
              <>
                <span>Find Retailer &amp; Continue to Pay</span>
              </>
            )}
          </Button>

          {/* New "How It Works" clickable button */}
          <div
            onClick={handleHowItWorksClick}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleHowItWorksClick();
              }
            }}
            className="mt-6 cursor-pointer rounded-xl border border-gray-300 py-3 text-center font-semibold text-gray-700 hover:bg-gray-100 transition select-none"
          >
            How It Works
          </div>
        </div>
      </div>
    </div>
  );
}
