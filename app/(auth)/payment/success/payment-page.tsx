'use client';

import { useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowLeft, Package } from "lucide-react";
import Link from "next/link";
import Confetti from "@/components/ui/confetti";
import SuccessAnimation from "@/components/checkout/success-animation";
import { useSearchParams } from 'next/navigation';
import { useApiMutation } from '@/hooks/api/secureapi';
import { useCartStore } from '@/store/cart';
import OrderSummaryCard from '@/components/checkout/order-summary';

export default function PaymentPage() {
  const searchParams = useSearchParams();
  const token = searchParams?.get('token');
  const clearCart = useCartStore((state) => state.clearCart);

  const { mutate, data, isPending, isError, error } = useApiMutation({
    endpoint: '/user/verify-payment',
    onSuccess: (data) => {
      console.log(data)
      clearCart();
    },
    onError: (err) => {
      console.log(error,"error when fetcchign from payment")
      console.error("Payment verification failed:", err);
    }
  });

  useEffect(() => {
    if (token) {
      mutate({ token });
    }
  }, [token, mutate]);
  console.log(data?.data.user)
  

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-teal-500/20 dark:from-blue-900/30 dark:via-purple-900/30 dark:to-teal-900/30 overflow-hidden relative py-12 px-4 sm:px-6 md:py-16 lg:py-20">
      <Confetti />
      <div className="max-w-4xl mx-auto">
        {/* Central UI */}
        <div className="text-center mb-8 md:mb-12 relative z-10">
          {isPending ? (
            <>
              <h1 className="text-2xl md:text-4xl font-bold mb-2 text-gray-700 dark:text-gray-300">
                Verifying Payment...
              </h1>
              <p className="text-lg text-gray-500 dark:text-gray-400">
                Please wait while we confirm your order.
              </p>
            </>
          ) : isError ? (
            <>
              <h1 className="text-3xl font-bold text-red-500">Verification Failed ❌</h1>
              <p className="text-lg text-gray-700 dark:text-gray-300">
                Something went wrong. Please contact support if you were charged.
              </p>
            </>
          ) : data ? (
            <>
              <SuccessAnimation />
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-6 mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
                Payment Successful 🎉
              </h1>
              <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300">
                Thank you! Your order has been placed.
              </p>
            </>
          ) : null}
        </div>

        {/* Order Summary */}
        {data && (
          <div className="mb-12">
            <OrderSummaryCard order={data.data.user} />
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
          <Link href="/products">
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Continue Shopping
            </Button>
          </Link>
          <Link href="/orders">
            <Button variant="default" size="lg" className="w-full sm:w-auto">
              <Package className="mr-2 h-4 w-4" />
              Track Your Order
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
