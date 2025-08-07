'use client';
import { ShopData } from '@/lib/types';
import React, { useState, useEffect } from 'react';

type AnimatedSuccessButtonProps = {
  onSuccess: () => void;
  isSelected: boolean;
  fillDurationMs?: number;
  shopdata : ShopData
};

export function AnimatedSuccessButton({
  onSuccess,
  isSelected,
  fillDurationMs = 1200,
}: AnimatedSuccessButtonProps) {
  const [state, setState] = useState<'idle' | 'filling' | 'success'>('idle');

  useEffect(() => {
    if (isSelected) {
      setState('success');
    } else {
      setState('idle');
    }
  }, [isSelected]);

  const handleClick = () => {
    if (state !== 'idle') return;
    setState('filling');
    setTimeout(() => {
      onSuccess();
      setState('success');
    }, fillDurationMs);
  };

  return (
    <button
      onClick={handleClick}
      disabled={state !== 'idle'}
      className={`relative flex flex-col items-center space-y-2 focus:outline-none
        ${
          state === 'success'
            ? 'text-green-600 cursor-default'
            : 'text-blue-600 hover:text-blue-800 cursor-pointer'
        }`}
      style={{ minWidth: 60 }}
      aria-live="polite"
      aria-busy={state === 'filling'}
    >
      <span className="font-medium text-sm select-none">
        {state === 'success' ? (
          <>
            <span className="mr-1">&#10003;</span> Selected
          </>
        ) : (
          'Select'
        )}
      </span>

      {state === 'filling' && (
        <div className="w-28 h-2 bg-gray-300 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-600 rounded-full"
            style={{
              width: '100%',
              animation: `fillProgress ${fillDurationMs}ms linear forwards`,
            }}
          />
        </div>
      )}

      <style jsx>{`
        @keyframes fillProgress {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }
      `}</style>
    </button>
  );
}
