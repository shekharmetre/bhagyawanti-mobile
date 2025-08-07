'use client';
import React, { useState } from 'react';
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
} from 'lucide-react';
import { ShopData } from '@/lib/types';
import { useApiMutation } from '@/hooks/api/secureapi';

interface RepairSchedulingModalProps {
    isOpen: boolean;
    onClose: () => void;
    selectedDevice?: {
        brand: string;
        modelName: string;
        repairType: string;
    };
    shopDetail?: ShopData | null;
}

const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM',
    '05:00 PM', '06:00 PM', '07:00 PM',
];

export const RepairSchedulingModal: React.FC<RepairSchedulingModalProps> = ({
    isOpen,
    onClose,
    selectedDevice = {
        brand: 'iPhone',
        modelName: '15 Pro Max',
        repairType: 'Screen Replacement',
    },
    shopDetail,
}) => {
    const [selectedDate, setSelectedDate] = useState<Date>();
    const [selectedTime, setSelectedTime] = useState('');
    const [showDateTime, setShowDateTime] = useState(false);
    const [notes, setNotes] = useState('');

    useApiMutation({ endpoint: '/' }); // Keep or connect appropriately

    const handleSubmit = () => {
        alert(
            `Your repair visit has been scheduled for ${selectedDate?.toLocaleDateString()} at ${selectedTime}.`
        );
        onClose();
    };

    const getNext10Days = () => {
        const days = [];
        const today = new Date();
        for (let i = 0; i < 10; i++) {
            const date = new Date(today);
            date.setDate(today.getDate() + i);
            days.push(date);
        }
        return days;
    };

    const formatDate = (date: Date) => {
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);

        if (date.toDateString() === today.toDateString()) return 'Today';
        else if (date.toDateString() === tomorrow.toDateString()) return 'Tomorrow';
        else {
            return date.toLocaleDateString('en-US', {
                weekday: 'short',
                month: 'short',
                day: 'numeric',
            });
        }
    };

    const next10Days = getNext10Days();

    const summaryLabel = selectedDate && selectedTime
        ? `${formatDate(selectedDate)} ${selectedTime}`
        : 'Select Date & Time';

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4"
                onClick={(e) => e.target === e.currentTarget && onClose()}
            >
                <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto"
                >
                    {/* Header */}
                    <div className="relative p-4 md:p-6 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700">
                        <button
                            onClick={onClose}
                            className="absolute right-4 md:right-6 top-4 md:top-6 p-2 bg-white/10 rounded-full hover:bg-white/20"
                        >
                            <X className="w-5 h-5 md:w-6 md:h-6 text-white" />
                        </button>

                        <div className="flex items-center gap-4 text-white">
                            <motion.div
                                animate={{ rotate: [0, 360] }}
                                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                                className="p-4 bg-white/10 rounded-2xl"
                            >
                                <Wrench className="w-7 h-7 md:w-8 md:h-8" />
                            </motion.div>
                            <div>
                                <h2 className="text-2xl md:text-3xl font-bold">
                                    Schedule Your Repair Visit
                                </h2>
                                <p className="text-blue-100 text-sm md:text-lg hidden md:block">
                                    Choose your preferred date and time
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="p-4 md:p-6 space-y-8">
                        {/* Mobile summary button */}
                        <div className="md:hidden flex justify-end">
                            <button
                                onClick={() => setShowDateTime(!showDateTime)}
                                className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-300 bg-white shadow"
                            >
                                <span className="text-sm font-medium text-gray-700">{summaryLabel}</span>
                                <ChevronDown
                                    className={`w-4 h-4 transition-transform duration-200 ${showDateTime ? 'rotate-180' : ''
                                        }`}
                                />
                            </button>
                        </div>

                        {/* Date/Time Picker */}
                        <div className={`${showDateTime ? 'block' : 'hidden'} md:block`}>
                            <h3 className="text-lg font-semibold flex items-center gap-2 text-gray-900 mb-4">
                                <Clock className="w-5 h-5 text-blue-600" />
                                Select Date & Time
                            </h3>

                            {/* Date scroll */}
                            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                                {next10Days.map((date, index) => {
                                    const isSelected =
                                        selectedDate &&
                                        date.toDateString() === selectedDate.toDateString();
                                    return (
                                        <motion.button
                                            key={index}
                                            onClick={() => setSelectedDate(date)}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className={`flex-shrink-0 p-3 rounded-xl border-2 min-w-[100px] transition-all ${isSelected
                                                ? 'bg-blue-600 text-white border-blue-600 shadow-lg'
                                                : 'bg-white border-gray-200 text-gray-700 hover:border-blue-300 hover:bg-blue-50'
                                                }`}
                                        >
                                            <div className="font-semibold text-sm">{formatDate(date)}</div>
                                            <div className="text-xs mt-1">
                                                {date.getDate()}/{date.getMonth() + 1}
                                            </div>
                                        </motion.button>
                                    );
                                })}
                            </div>

                            {/* Time slot grid */}
                            {selectedDate && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    transition={{ duration: 0.3 }}
                                    className="mt-4"
                                >
                                    <h4 className="font-medium mb-3 text-gray-900">Available Time Slots</h4>
                                    <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
                                        {timeSlots.map((time) => (
                                            <motion.button
                                                key={time}
                                                onClick={() => {
                                                    setSelectedTime(time);
                                                    setShowDateTime(false);
                                                }}
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                className={`p-2 rounded-lg border-2 text-sm transition-all ${selectedTime === time
                                                    ? 'bg-green-600 text-white border-green-600 shadow-lg'
                                                    : 'bg-white border-gray-200 hover:border-green-300 hover:bg-green-50 text-gray-700'
                                                    }`}
                                            >
                                                {time}
                                            </motion.button>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </div>

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
                                            <span className="text-xs font-medium text-red-700">{selectedDevice.repairType}</span>
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
                                                <span className="font-medium">{selectedDevice.repairType}</span>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {/* Notes Section */}
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                        <MessageSquare className="w-5 h-5 text-blue-600" />
                                        Additional Notes
                                    </h3>

                                    <div className="space-y-4">
                                        <textarea
                                            placeholder="Any special instructions or requirements for your repair visit?"
                                            className="w-full p-4 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[120px] text-sm"
                                            value={notes}
                                            onChange={(e) => setNotes(e.target.value)}
                                        />

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
                            <motion.button
                                onClick={handleSubmit}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                disabled={!selectedDate && !selectedTime && !shopDetail}
                                className="md:px-8 px-2 md:py-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white md:text-lg text-md font-semibold rounded-xl shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                🚀 Confirm Repair Appointment
                            </motion.button>
                            <p className="text-sm text-gray-600 mt-3">
                                We’ll confirm your appointment within 30 minutes
                            </p>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};
