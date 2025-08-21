'use client';
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import {
    Clock,
    Smartphone,
    MessageSquare,
    X,
    ChevronDown,
    Wrench,
    Shield,
    Award,
    Zap,
    CheckCircle
} from 'lucide-react';
import { ShopData } from '@/lib/types';
import { useApiMutation, useAxiosApiMutation } from '@/hooks/api/secureapi';
import { BookingSuccessScreen } from '../ui/booking-success';
import VoiceNotesCompact from '../ui/voice-notest';
import DateTimePicker from '@/app/(auth)/payment/success/dateTimeSelecction';
import { buildOrderDate } from '@/lib/helper';
import { supabse } from '@/config/supbase-client';
import { showToast } from '@/hooks/filtered-toast';
import { useRouter } from 'next/navigation';

interface RepairSchedulingModalProps {
    isOpen: boolean;
    onClose: () => void;
    selectedDevice?: {
        brand: string;
        modelName: string;
        repairType: { name: string, price: string };
    };
    shopDetail?: ShopData | null;
    access_token: string
}


export const RepairSchedulingModal: React.FC<RepairSchedulingModalProps> = ({
    isOpen,
    onClose,
    selectedDevice = {
        brand: 'iPhone',
        modelName: '15 Pro Max',
        repairType: { name: 'Screen Replacement', price: "450" },
    },
    access_token = "",
    shopDetail,
}) => {
    const [selectedDate, setSelectedDate] = useState<Date>();
    const [selectedTime, setSelectedTime] = useState('');
    const [showDateTime, setShowDateTime] = useState(false);
    const router = useRouter()



    const [notes, setNotes] = useState<{ text: string; audio: Blob | null }>({
        text: "",
        audio: null, // ✅ no blob yet, but can be set later
    });
    const [success, setSuccess] = useState(false);
    const { mutate, isPending, data } = useApiMutation({
        endpoint: "/user/auth/payment", // endpoint without "/api/bun" duplication=====
        token: access_token,
        method: "POST",
        onSuccess: (data) => {
            console.log("✅ Booking successful:", data.message);
            setSuccess(true)
        },
        onError: (err) => {
            console.error("❌ Booking failed:", err);
        },
    });
    const handleSubmit = () => {
        if (!access_token) {
            showToast({ title: "success", description: "You are not logged in Please logged in else we will redirect to withut 30 seconds" })
            setTimeout(() => {
                onClose?.()
                router.push("/login?redirect=/shop")
            }, 2000)
        }
        if (!selectedDate) {
            return console.log("not found")
        }
        mutate({ category: "repair", delivery: "in_shop", orderDate: buildOrderDate(new Date(selectedDate), selectedTime), totalPrice: selectedDevice.repairType.price, location: { name: shopDetail?.name, maps_url: shopDetail?.maps_url, address: shopDetail?.address }, device: selectedDevice, notes, })
    };

    if (!isOpen) return null;
    const handleChange = (text: string, audio?: Blob) => {
        setNotes((prev) => ({
            text,                                     // always update text
            audio: audio !== undefined ? audio : prev.audio // ✅ keep existing blob if not recording
        }));

        if (audio) {
            setNotes((prev) => ({
                text,                                     // always update text
                audio: audio !== undefined ? audio : prev.audio // ✅ keep existing blob if not recording
            }));
            console.log("New Audio blob:", audio);
        }
    };




    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
                onClick={(e) => e.target === e.currentTarget && onClose()}
            >
                <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto relative"
                >
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute right-4 top-4 p-2 bg-white/10 rounded-full hover:bg-white/20 z-10"
                    >
                        <X className="w-5 h-5 text-gray-700" />
                    </button>

                    {success ? (<BookingSuccessScreen
                        onClose={onClose}
                        selectedDevice={selectedDevice}
                        selectedDate={selectedDate}
                        selectedTime={selectedTime}
                        shopDetail={shopDetail}
                    />
                    ) : (
                        <div className="p-6 space-y-8">
                            <DateTimePicker
                                onSelect={(date, time) => {
                                    setSelectedDate(date);
                                    setSelectedTime(time);
                                    // date is the exact instant of chosen IST time
                                }}
                            />

                            {/* Device Info and Shop Info */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Left: Device Info & Features */}
                                <div className="space-y-6">
                                    {/* Device Info */}
                                    <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-3 md:p-4 border border-blue-200 max-w-md w-full">
                                        <div className="flex items-center gap-3 mb-3">
                                            <Smartphone className="w-5 h-5 text-blue-600" />
                                            <span className="text-base md:text-lg font-semibold text-gray-900">Device Information</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                                                <Smartphone className="w-6 h-6 text-blue-600" />
                                            </div>
                                            <div>
                                                <div className="font-semibold text-gray-900 text-sm truncate">{selectedDevice.brand}</div>
                                                <div className="text-gray-500 text-xs truncate">{selectedDevice.modelName}</div>
                                            </div>
                                            {/* Repair Issue Badges */}
                                            <div className="bg-red-50 rounded px-2 py-1 border border-red-200 ml-auto flex items-center gap-1">
                                                <Wrench className="w-3 h-3 text-red-600" />
                                                <span className="text-xs font-medium text-red-700">{selectedDevice.repairType.name}</span>
                                            </div>
                                        </div>
                                        {/* Shop Info Row */}
                                        {shopDetail ? (
                                            <div className="flex items-center gap-2 mt-4 p-2 bg-white rounded-xl shadow border border-gray-100">
                                                {/* Shop Image */}
                                                <div className="w-10 h-10 rounded-lg overflow-hidden border border-gray-100 flex-shrink-0">
                                                    <img
                                                        src={shopDetail.photos?.[0] ?? ''}
                                                        alt={shopDetail.name || 'Shop Image'}
                                                        className="object-cover w-full h-full"
                                                    />
                                                </div>

                                                {/* Shop Info */}
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center">
                                                        <span className="text-sm font-semibold text-gray-900 truncate">
                                                            {shopDetail.name ?? 'Unnamed Shop'}
                                                        </span>
                                                        {shopDetail.rating !== undefined && (
                                                            <span className="ml-2 text-xs px-2 py-0.5 bg-yellow-100 text-yellow-800 rounded select-none">
                                                                {shopDetail.rating}&#9733;
                                                            </span>
                                                        )}
                                                    </div>
                                                    <span className="text-xs text-gray-500 truncate block">
                                                        {shopDetail.address ?? 'Address not available'}
                                                    </span>
                                                    <div className="flex items-center gap-1 mt-1">
                                                        <span
                                                            className={`text-xs px-2 py-0.5 font-semibold rounded select-none ${shopDetail.open_now ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                                                }`}
                                                        >
                                                            {shopDetail.open_now ? 'Open Now' : 'Closed'}
                                                        </span>
                                                        <span className="text-[10px] text-gray-400 ml-1 select-none">
                                                            {shopDetail.user_ratings_total
                                                                ? `${shopDetail.user_ratings_total}+ reviews`
                                                                : 'No reviews'}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="text-sm text-red-600 font-medium mt-4">
                                                Please select a Shop before proceeding to the next step.
                                            </div>
                                        )}


                                    </div>


                                    {/* Service Features */}
                                    <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-4 md:p-6 border border-yellow-200">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Service Features</h3>
                                        <div className="space-y-3">
                                            <div className="flex items-center gap-3">
                                                <Zap className="w-5 h-5 text-yellow-600" />
                                                <span className="text-sm text-gray-700">Quick Service & Same Day Repair</span>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <Shield className="w-5 h-5 text-green-600" />
                                                <span className="text-sm text-gray-700">6 Month Warranty Included</span>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <Award className="w-5 h-5 text-purple-600" />
                                                <span className="text-sm text-gray-700">Certified Technicians</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Right Column */}
                                <div className="space-y-6">
                                    {/* Booking Summary */}
                                    {selectedDate && selectedTime && (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 md:p-6 border border-green-200"
                                        >
                                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Booking Summary</h3>
                                            <div className="space-y-2">
                                                <div className="flex justify-between">
                                                    <span className="text-gray-600">Date:</span>
                                                    <span className="font-medium">{selectedDate.toLocaleDateString()}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-600">Time:</span>
                                                    <span className="font-medium">{selectedTime}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-600">Device:</span>
                                                    <span className="font-medium">{selectedDevice.brand} {selectedDevice.modelName}</span>
                                                </div>
                                                <div className="flex justify-between">
                                                    <span className="text-gray-600">Service:</span>
                                                    <span className="font-medium">{selectedDevice.repairType.name}</span>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}

                                    {/* Notes Section */}
                                    <div>

                                        <VoiceNotesCompact onChange={handleChange} />
                                        <div className="space-y-4">


                                            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                                                <h4 className="font-medium text-blue-900 mb-2 flex items-center gap-2">
                                                    <Clock className="w-4 h-4" />
                                                    What happens next?
                                                </h4>
                                                <ul className="text-sm text-blue-800 space-y-1">
                                                    <li>• We'll send confirmation within 30 minutes</li>
                                                    <li>• You'll receive SMS updates about your appointment</li>
                                                    <li>• Bring your device and a valid ID</li>
                                                    <li>• Our technician will contact you before arrival</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Submit Button */}
                            <div className="text-center">
                                <button
                                    onClick={handleSubmit}
                                    disabled={!selectedDate || !selectedTime || !shopDetail || isPending}
                                    type="submit"
                                    className="md:px-8 px-2 md:py-4 py-2 
                  bg-gradient-to-r from-blue-600 to-purple-600 
                  text-white md:text-lg text-md font-semibold 
                  rounded-xl shadow-lg 
                  transition-transform duration-200 
                  hover:scale-105 active:scale-95
                  disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isPending ? ">>>loadinh" : '🚀 Confirm Repair Appointment'}
                                </button>
                                <p className="text-sm text-gray-600 mt-3">
                                    We’ll confirm your appointment within 30 minutes
                                </p>
                            </div>
                        </div>
                    )}
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};
