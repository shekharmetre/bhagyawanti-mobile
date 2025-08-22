"use client";

import React, { useMemo, useState } from "react";
import {
  User,
  MapPin,
  Package,
  Truck,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { Order, StepItem } from "@/lib/types";
import { OptionPicker } from "../ui/OptionPicker";
import { SearchForm } from "@/hooks/search-form";
import { TabFilterTabs } from "../ui/TabFilterBar";
import { OrderCard } from "./order-card";
import {
  mockerOrdersData,
  tabs,
  statusToStepKey,
  orderCategory,
} from "@/lib/data";
import { v4 as uuidv4 } from "uuid";


const orderSteps: StepItem[] = [
  { key: "preparing", label: "Preparing", icon: <Package className="w-5 h-5" /> },
  { key: "shipping-soon", label: "Shipping Soon", icon: <Truck className="w-5 h-5" /> },
  { key: "out-for-delivery", label: "Out for Delivery", icon: <MapPin className="w-5 h-5" /> },
  { key: "completed", label: "Completed", icon: <CheckCircle className="w-5 h-5" /> },
  { key: "cancelled", label: "Cancelled", icon: <XCircle className="w-5 h-5" /> },
];

export function Orders({
  mockOrders = mockerOrdersData,
}: {
  mockOrders?: Order[];
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const filteredOrders = useMemo(() => {
    const list = mockOrders ?? [];
    const q = searchTerm.toLowerCase();

    return list.filter((order) => {
      const name = (order.productName ?? "").toLowerCase();
      const id = (order.id ?? "").toLowerCase();
      const matchesSearch = name.includes(q) || id.includes(q);

      const category = order.category ?? "";
      const matchesCategory = selectedCategory === "all" || category === selectedCategory;

      const status = order.status ?? "";
      const matchesStatus = selectedStatus === "all" || status === selectedStatus;

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [mockOrders, searchTerm, selectedCategory, selectedStatus]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "in-progress":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "completed":
        return "bg-green-100 text-green-800 border-green-200";
      case "delivered":
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-500 text-white">
        <div className="px-2 md:px-24 lg:px-36 py-6">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-2xl md:text-3xl font-bold">My Orders</h1>
            <div className="relative">
              <User className="w-8 h-8 bg-white/20 rounded-full p-1" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
            </div>
          </div>
          <p className="text-blue-100">You have a 1 new message</p>
        </div>
      </div>

      {/* Search & Category */}
      <div className="px-2 md:px-24 lg:px-36 py-6">
        <div className="flex flex-wrap gap-2 md:gap-4 mb-6">
          <SearchForm
            className="md:flex-1 min-w-0"
            onSearch={(data) => setSearchTerm(data)}
          />
          <OptionPicker
            options={orderCategory}
            defaultValue="all"
            onChange={(value) => setSelectedCategory(value)}
            classname="flex-none w-28"
          />
        </div>

        {/* Tabs */}
        <TabFilterTabs
          tabs={tabs}
          selectedKey={selectedStatus}
          onSelect={(data) => setSelectedStatus(data)}
        />

        <div className="space-y-4">
          {filteredOrders.length === 0 ? (
            <div className="text-center py-12">
              <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-600 mb-2">No orders found</h3>
              <p className="text-gray-500">
                Try adjusting your search or filter criteria
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredOrders.map((order, idx) => {
                const statusKey = order.status ?? "";
                const stepKey = statusToStepKey[statusKey] || "preparing";
                const safeId = order.id ?? "no-id";
                const keyId = `${safeId}-${stepKey}-${idx}-${uuidv4()}`;

                return (
                  <OrderCard
                    stepKey={stepKey}
                    order={order}
                    orderSteps={orderSteps}
                    getStatusColor={getStatusColor}
                    key={keyId}
                    idKey={keyId}
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
