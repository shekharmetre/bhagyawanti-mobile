'use client'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, FileQuestionIcon, LucideSquaresExclude } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";



interface OrderSummaryCardProps {
  order?: any | null;
}

export default function OrderSummaryCard({ order }: OrderSummaryCardProps) {

  const dialogRef = useRef<HTMLDialogElement>(null);

  if (!order) {
    return (
      <Card className="p-6 text-center border border-red-300 bg-red-50 dark:bg-red-950/30 rounded-xl">
        <h2 className="text-xl font-semibold text-red-600 dark:text-red-400 mb-2">
          Order Confirmation Issue
        </h2>
        <p className="text-sm text-gray-700 dark:text-gray-300">
          Your transaction was successful, but we're unable to display your order details right now.
        </p>
        <p className="mt-2 text-sm">
          Please visit the{" "}
          <a
            href="/orders"
            className="text-blue-600 underline hover:text-blue-800"
          >
            Order History
          </a>{" "}
          page to view your order status.
        </p>
      </Card>
    );
  }


  const date = new Date(order.createdAt).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  function makeTxnId(input: string): string {
    const parts = String(input).split("-");
    const last = parts[parts.length - 1] || "";
    return `TXN_ID_${last}`;
  }


  return (
    <Card className="bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 shadow-lg rounded-xl">
      <CardHeader className="pb-2">
        <CardTitle className="text-2xl font-semibold text-center text-green-600 dark:text-green-400">
          Payment Successful
        </CardTitle>
        <p className="text-center text-sm text-muted-foreground">
          Your order has been placed successfully.
        </p>
      </CardHeader>
      <CardContent className="space-y-10">
        <div className="space-y-3 mb-5">
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Order ID</span>
            <span className="font-medium">{makeTxnId(order.txnId)}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Date</span>
            <span className="font-medium">{date}</span>
          </div>

          {order.items && Array.isArray(order.items) && (
            <div className="flex justify-between items-start">
              <span className="text-muted-foreground">Products</span>
              <ul className="text-right font-medium text-sm space-y-1">
                {order.items.map((item: any, index: number) => (
                  <li key={index}>
                    {item.name ?? "Unnamed Item"} × {item.qty ?? 1}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <Separator className="my-3" />

          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Amount To Be Pay</span>
            <span className="text-lg font-bold">
              ₹{order.totalPrice.toLocaleString("en-IN")}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Payment Type</span>
            <span className="font-medium capitalize">{order.payment}</span>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Status</span>
            <div className="flex items-center gap-2 text-green-600 dark:text-green-400 font-medium">
              <CheckCircle className="h-4 w-4" />
              <span>{order.txnStatus}</span>
            </div>
          </div>
        </div>

        <div className="flex gap-3 items-center">
          {/* Link to Shop */}
          <Link href="/shop" className="btn px-4 py-2 text-blue-700 font-semibold  underline hover:opacity-70">
           Find Shops
          </Link>

          {/* Question button */}
          <button
            onClick={() => dialogRef.current?.showModal()}
            className="px-2 py-1 rounded-full bg-gray-200 hover:bg-gray-300"
          >
            ❓
          </button>

          {/* Dialog */}
          <dialog
            ref={dialogRef}
            className="rounded-xl p-5 shadow-lg w-80 max-w-full"
          >
            <p className="mb-3 text-gray-800">
              Find a nearby store to get this item and contact them directly.
            </p>

            <form method="dialog">
              <button className="px-3 py-2 bg-gray-200 rounded hover:bg-gray-300">
                Close
              </button>
            </form>
          </dialog>
        </div>
      </CardContent>
    </Card>
  );
}
