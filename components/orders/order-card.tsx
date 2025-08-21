"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
  Package,
  MapPin,
  ArrowRight,
  DownloadCloudIcon
} from "lucide-react";
import { Order, OrderItem, ShopData, StepItem } from "@/lib/types";
import { Stepper } from "../ui/stepper";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";
import { v4 as uuidv4 } from "uuid";

// Inline reusable row for icon + text
const InfoRow = ({ icon: Icon, children }: { icon: any; children: React.ReactNode }) => (
  <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
    <Icon className="w-4 h-4" />
    {children}
  </div>
);

// Inline reusable Link button
const ActionLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <Link href={href || "#"} className="underline text-blue-500 font-semibold">
    {children}
  </Link>
);

interface OrderCardProps {
  order: Order;
  orderSteps: StepItem[];
  stepKey: string;
  getStatusColor: (status: string) => string;
  idKey: string;
}

export function OrderCard({
  order,
  orderSteps,
  stepKey,
  getStatusColor,
  idKey
}: OrderCardProps) {
  const OrderItemsList = ({
    items,
    location,
    shopData,
    payment,
    delivery,
    date,
    price
  }: {
    items: OrderItem[];
    location: string | null;
    shopData: ShopData | null;
    delivery: string | null;
    payment: string;
    date: string | null;
    price: number;
  }) => {
    if (!items || items.length === 0) return null;

    return (
      <div>
        <div className="mt-5 overflow-x-auto">
          <div className="flex gap-4">
            {items.map((orderItem) => (
              <div key={orderItem.item.id + uuidv4()} className="flex-shrink-0 flex gap-2">
                <Image
                  src={orderItem.item.images?.[0] || "/placeholder.png"}
                  alt={orderItem.item.name || "Product image"}
                  width={100}
                  height={100}
                  className="md:w-16 md:h-16 w-12 h-14 rounded-md object-cover"
                />
                <div>
                  <div className="text-sm text-gray-800 truncate max-w-[100px]">
                    {orderItem.item.name ?? "N/A"}
                  </div>
                  <div className="text-sm text-gray-600">
                    QTY: {orderItem.quantity ?? "N/A"}
                  </div>
                  <div className="text-sm text-gray-600">
                    Total: ₹{orderItem.totalPrice ?? "N/A"}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <InfoRow icon={Calendar}>{date}</InfoRow>
        {price && (
          <InfoRow icon={() => <span className="w-4 h-4 text-center">₹</span>}>
            Price: ₹{price}
          </InfoRow>
        )}

        <Link
          href={location || "#"}
          className="flex mt-1 underline items-center gap-2 text-sm text-blue-600"
        >
          <MapPin className="w-4 h-4" />
          {location}
        </Link>

        <Badge className="mt-5">{payment}</Badge>

        <div className="flex justify-between mt-6">
          <ActionLink href={shopData && !location ? shopData.maps_url : location || ""}>
            {shopData && !location ? shopData.maps_url : "Find Shops"}
          </ActionLink>
          <ActionLink href={"#"}>Invoice <DownloadCloudIcon /></ActionLink>
        </div>
      </div>
    );
  };

  return (
    <div
      key={idKey}
      className={cn(
        `rounded-2xl shadow-md hover:shadow-lg transition-all h-fit duration-300 p-4`,
        order.color && `bg-[${order.color}]`
      )}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start justify-between w-full">
          <div className="flex items-center md:gap-4 gap-2">
            <div className="relative w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-xl flex items-center justify-center text-2xl">
              {order.image}
              {order.category !== "repair" && (
                <Badge className="absolute -top-3 -right-[50%]">+2</Badge>
              )}
            </div>
            <div className="relative">
              <h3 className="text-lg font-semibold text-gray-800 truncate w-56">
                {order.productName}
              </h3>
              <p className="text-gray-500 text-sm">Order ID: {order.id}</p>
            </div>
          </div>
          <ArrowRight />
        </div>
      </div>

      {/* Stepper */}
      <Stepper steps={orderSteps} current={stepKey} />

      {order.category === "repair" ? (
        <div>
          <div className="flex-col items-start gap-4 mt-2 mb-4">
            <InfoRow icon={Calendar}>{order.orderDate}</InfoRow>
            {order.issue && (
              <InfoRow icon={Package}>{order.issue}</InfoRow>
            )}
            {order.price && (
              <InfoRow icon={() => <span className="w-4 h-4 text-center">₹</span>}>
                Price: ₹{order.price}
              </InfoRow>
            )}
            <Link
              href={order.shopData?.maps_url || "#"}
              className="flex mt-2 underline items-center gap-2 text-sm text-blue-600"
            >
              <MapPin className="w-4 h-4" />
              {order?.shopData?.address}
            </Link>
          </div>

          <div className="flex items-center justify-between">
            <ActionLink href={`/repair-progress/${order.id}`}>Add More</ActionLink>
            <Link href={"#"}>View details</Link>
          </div>
        </div>
      ) : (
        <OrderItemsList
          items={order.items || []}
          location={order.location || null}
          shopData={order.shopData || null}
          delivery={order.delivery || null}
          payment={order.payment || "Pay on delivery"}
          date={order.orderDate || null}
          price={order.price || 0}
        />
      )}
    </div>
  );
}
