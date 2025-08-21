'use client';

import React, { useEffect, useState } from 'react';
import {
    CreditCard,
    Wallet,
    Info,
    CheckCircle,
    ArrowRight,
    Shield,
    X,
} from 'lucide-react';
import { useCartStore } from '@/store/cart';
import { showToast } from '@/hooks/filtered-toast';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { isEmail } from '@/lib/helper';
import { supabse } from '@/config/supbase-client';
import { LocationData } from '@/lib/types';

export default function PaymentOptions({ onclose, location }: { onclose?: () => void, location: LocationData }) {

    const [selectedOption, setSelectedOption] = useState<'advance' | 'full' | null>(null);
    const [showAdvanceInfo, setShowAdvanceInfo] = useState(false);
    const [loading, setLoading] = useState(false);
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [email, setEmail] = useState<string | null>(null);

    const { items, totalPrice } = useCartStore();
    const router = useRouter();
    const remainingAmount = totalPrice - 5;

    // 🟢 Fetch user session on mount
    useEffect(() => {
        const getSession = async () => {
            const {
                data: { session },
            } = await supabse.auth.getSession();
            if (session?.user) {
                setEmail(session.user.email as string);
                setAccessToken(session.access_token);
            }
        };
        getSession();
    }, []);

    const handleContinue = async () => {
        if (!accessToken || !isEmail(email as string)) {
            showToast({
                title: "Error",
                description: "You're not authorised. Redirecting to login...",
            });
            onclose?.();
            setTimeout(() => {
                router.push(`/login?redirect=checkout`);
            }, 2000);
            return;
        }

        try {
            setLoading(true);

            const amountToPay =
                selectedOption === "advance" ? 1 : totalPrice;

            const response = await axios.post(
                "/api/bun/user/auth/payment",
                {
                    items,
                    amountToPay,
                    balanceAmount: totalPrice - amountToPay,
                    location,
                    category : "mobile_accessory",
                    delivery : "home_delivery",
                },
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            const paymentData = response.data?.data?.paymentParams;

            console.log(paymentData,"succesdf")

            if (!paymentData) {
                showToast({
                    title: "Payment Error",
                    description: response.data?.error || "This transaction pament alreaedy paid",
                });
                return;
            }

            // Optional: handle PayU form submit here if you want
            console.log("Payment data ready:", paymentData);
            const form = document.createElement('form');
            form.method = 'POST';
            form.action = 'https://secure.payu.in/_payment';

            Object.entries(paymentData).forEach(([key, value]) => {
                const input = document.createElement('input');
                input.type = 'hidden';
                input.name = key;
                input.value = String(value);
                console.log(input, "input value")
                form.appendChild(input);
            });
            document.body.appendChild(form);
            form.submit();

        } catch (err: any) {
            console.log(err,"erro sdon")
            showToast({
                title: "Error",
                description:
                    err?.response?.data?.error ||
                    "Something went wrong. Please try again later.",
            });
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 sm:p-4 z-50">
            <div className="bg-white rounded-lg sm:rounded-2xl shadow-2xl w-full max-w-sm sm:max-w-2xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto">
                <div className="p-4 sm:p-6 border-b border-gray-200 flex justify-between items-center">
                    <div>
                        <h2 className="text-lg sm:text-2xl font-bold text-gray-900">Choose Payment Method</h2>
                        <p className="text-gray-600 mt-1 text-sm sm:text-base">Select how you'd like to proceed with your order</p>
                    </div>
                    <X className='cursor-pointer hover:scale-110' onClick={onclose} />
                </div>

                <div className="p-4 sm:p-6 space-y-4">
                    {/* Advance Registration Option */}
                    <div
                        className={`border-2 rounded-xl p-4 sm:p-6 cursor-pointer transition-all duration-300 ${selectedOption === 'advance'
                            ? 'border-blue-500 bg-blue-50 shadow-lg transform scale-[1.02]'
                            : 'border-gray-200 hover:border-blue-300 hover:bg-blue-25'
                            }`}
                        onClick={() => setSelectedOption('advance')}
                    >
                        <div className="flex items-start justify-between">
                            <div className="flex items-start space-x-3 sm:space-x-4">
                                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                                    <Wallet className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1 sm:mb-2">
                                        Advance Registration
                                    </h3>
                                    <p className="text-gray-600 mb-2 sm:mb-3 text-sm sm:text-base">
                                        Reserve your items with just ₹ 5 and pay the rest later
                                    </p>
                                    <div className="bg-white rounded-lg p-3 sm:p-4 space-y-2">
                                        <div className="flex justify-between text-xs sm:text-sm">
                                            <span className="text-gray-600">Registration Amount:</span>
                                            <span className="font-semibold text-blue-600">₹ 5</span>
                                        </div>
                                        <div className="flex justify-between text-xs sm:text-sm">
                                            <span className="text-gray-600">Remaining Amount:</span>
                                            <span className="font-semibold text-gray-900">₹{remainingAmount.toFixed(2)}</span>
                                        </div>
                                        <div className="border-t pt-2">
                                            <div className="flex justify-between text-xs sm:text-sm font-semibold">
                                                <span>Total Order Value:</span>
                                                <span>₹{totalPrice.toFixed(2)}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setShowAdvanceInfo(!showAdvanceInfo);
                                        }}
                                        className="flex items-center text-blue-600 hover:text-blue-700 text-xs sm:text-sm font-medium mt-2 sm:mt-3 transition-colors"
                                    >
                                        <Info className="w-4 h-4 mr-1" />
                                        How does this work?
                                    </button>

                                    {showAdvanceInfo && (
                                        <div className="mt-3 sm:mt-4 bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4">
                                            <h4 className="font-semibold text-blue-900 mb-1 sm:mb-2 text-sm">Advance Registration Benefits:</h4>
                                            <ul className="text-xs sm:text-sm text-blue-800 space-y-1">
                                                <li>• Reserve your items for up to 30 days</li>
                                                <li>• Pay remaining amount when ready</li>
                                                <li>• Price protection - no price changes</li>
                                                <li>• Priority delivery when you complete payment</li>
                                                <li>• Full refund if you cancel within 7 days</li>
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </div>
                            {selectedOption === 'advance' && (
                                <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-blue-500 flex-shrink-0" />
                            )}
                        </div>
                    </div>

                    {/* Full Payment Option */}
                    <div
                        className={`border-2 rounded-xl p-4 sm:p-6 cursor-pointer transition-all duration-300 ${selectedOption === 'full'
                            ? 'border-green-500 bg-green-50 shadow-lg transform scale-[1.02]'
                            : 'border-gray-200 hover:border-green-300 hover:bg-green-25'
                            }`}
                        onClick={() => setSelectedOption('full')}
                    >
                        <div className="flex items-start justify-between">
                            <div className="flex items-start space-x-3 sm:space-x-4">
                                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center">
                                    <CreditCard className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-1 sm:mb-2">
                                        Complete Payment
                                    </h3>
                                    <p className="text-gray-600 mb-2 sm:mb-3 text-sm sm:text-base">
                                        Pay the full amount now and get your items delivered immediately
                                    </p>
                                    <div className="bg-white rounded-lg p-3 sm:p-4">
                                        <div className="flex justify-between">
                                            <span className="text-xs sm:text-sm text-gray-600">Total Amount:</span>
                                            <span className="text-lg sm:text-2xl font-bold text-green-600">₹{totalPrice.toFixed(2)}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center text-green-600 text-xs sm:text-sm font-medium mt-2 sm:mt-3">
                                        <CheckCircle className="w-4 h-4 mr-2" />
                                        Immediate processing & delivery
                                    </div>
                                </div>
                            </div>
                            {selectedOption === 'full' && (
                                <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 flex-shrink-0" />
                            )}
                        </div>
                    </div>

                    {/* Security Notice */}
                    <div className="bg-gray-50 rounded-lg p-3 sm:p-4 mt-4 sm:mt-6">
                        <div className="flex items-center space-x-2 sm:space-x-3">
                            <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
                            <div>
                                <h4 className="font-semibold text-gray-900 text-sm sm:text-base">Secure Payment</h4>
                                <p className="text-xs sm:text-sm text-gray-600">
                                    Your payment information is encrypted and secure. We accept all major cards and digital wallets.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="p-4 sm:p-6 border-t border-gray-200 bg-gray-50">
                    <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                        <button
                            onClick={() => window.history.back()}
                            className="w-full sm:flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-6 rounded-lg transition-colors text-base"
                        >
                            Back
                        </button>
                        <button
                            onClick={handleContinue}
                            disabled={!selectedOption || loading}
                            className={`w-full sm:flex-1 font-semibold py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 text-base ${selectedOption
                                ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white transform hover:scale-[1.02] hover:shadow-lg'
                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                }`}
                        >
                            <span>{loading ? 'Processing...' : 'Continue'}</span>
                            {!loading && <ArrowRight className="w-4 h-4" />}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
