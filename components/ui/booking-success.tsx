'use client';
import React from 'react';
import { motion } from 'framer-motion';

import { CheckCircle } from 'lucide-react';
import Confetti from './confetti';
import { ShopData } from '@/lib/types';

interface BookingSuccessScreenProps {
  onClose: () => void;
  selectedDevice: {
    brand: string;
    modelName: string;
    repairType: {name:string,price:string} | null;
  };
  selectedDate?: Date;
  selectedTime?: string;
  shopDetail?: ShopData | null;
  notes?: string;
}

export const BookingSuccessScreen: React.FC<BookingSuccessScreenProps> = ({
  onClose,
  selectedDevice,
  selectedDate,
  selectedTime,
  shopDetail,
  notes
}) => {

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="relative p-8 text-center space-y-8"
    >
      {/* Confetti */}
      <Confetti  />

      {/* Header */}
      <div className="flex flex-col items-center space-y-3">
        <div className="bg-gradient-to-br from-green-400 to-emerald-500 p-4 rounded-full shadow-lg">
          <CheckCircle className="w-12 h-12 text-white" />
        </div>
        <h2 className="text-3xl font-extrabold text-gray-900">Thank You! 🎉</h2>
        <p className="text-gray-600 max-w-md">
          Your submission has been processed successfully.
          We’ll call you soon. Please visit the shop at your scheduled time if possible.
        </p>
      </div>

      {/* Summary Card */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="backdrop-blur-md bg-white/80 rounded-2xl shadow-xl border border-green-100 p-6 max-w-md mx-auto"
      >
        <h3 className="font-semibold text-lg text-gray-800 mb-4">📋 Booking Summary</h3>
        <ul className="space-y-3 text-gray-700 text-sm">
          <li className="flex justify-between">
            <span className="font-medium">Brand:</span>
            <span>{selectedDevice.brand}</span>
          </li>
          <li className="flex justify-between">
            <span className="font-medium">Model:</span>
            <span>{selectedDevice.modelName}</span>
          </li>
          <li className="flex justify-between">
            <span className="font-medium">Repair Type:</span>
            <span>{selectedDevice?.repairType?.name}</span>
          </li>
          {selectedDate && (
            <li className="flex justify-between">
              <span className="font-medium">Date:</span>
              <span>{selectedDate.toLocaleDateString()}</span>
            </li>
          )}
          {selectedTime && (
            <li className="flex justify-between">
              <span className="font-medium">Time:</span>
              <span>{selectedTime}</span>
            </li>
          )}
          {shopDetail && (
            <li className="flex justify-between">
              <span className="font-medium">Shop:</span>
              <span>{shopDetail.name}</span>
            </li>
          )}
          {notes && (
            <li className="flex justify-between">
              <span className="font-medium">Notes:</span>
              <span>{notes}</span>
            </li>
          )}
        </ul>
      </motion.div>

      {/* Close Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onClose}
        className="mt-4 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl shadow-lg"
      >
        Close
      </motion.button>
    </motion.div>
  );
};
