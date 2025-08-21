'use client'

import React, { useState } from 'react';
import {
    User, Calendar, MapPin, Package, Smartphone, Headphones, ArrowRight, Plus, Eye, Grid, Truck, CheckCircle, XCircle
} from 'lucide-react';
import { mockShopsData, OptionPickerCategory, Order, StepItem } from '@/lib/types';
import { OptionPicker } from '../ui/OptionPicker';
import { SearchForm } from '@/hooks/search-form';
import { TabFilterTabs } from '../ui/TabFilterBar';
import { Stepper } from '../ui/stepper';
import { OrderCard } from './order-card';
import { products } from '@/lib/data';
import { v4 as uuidv4 } from 'uuid';


const mockerOrdersData: Order[] = [
    // === REPAIR orders unchanged ===
    {
        id: 'R-10187',
        productName: 'Samsung A12 5G',
        category: 'repair',
        status: 'in-progress',
        orderDate: 'Jul 27, 2025, 02:45 PM',
        issue: 'Back Camera not focusing',
        shopData: mockShopsData[0],
        image: '📱',
        progress: 60,
        color: '#568F87',
        price: 450
    },
    {
        id: 'R-10188',
        productName: 'iPhone 13 Pro',
        category: 'repair',
        status: 'completed',
        orderDate: 'Jul 26, 2025, 11:30 AM',
        issue: 'Screen replacement',
        image: '📱',
        progress: 100,
        color: '#DFF7DD', // Light Mint Green for repair & completed
        price: 1200,
        shopData: mockShopsData[0],

    },

    // === ACCESSORIES orders UPDATED with "items" arrays ===
    {
        id: 'A-10189',
        productName: 'Mobile Accessory',
        category: 'accessories',
        status: 'completed',
        orderDate: 'Jul 25, 2025, 06:25 PM',
        location: 'Koramangala Bengaluru', //shop location if delivery home to the users location
        price: 202, // total after discounts
        quantity: 2,
        image: '🔌',
        shopData: mockShopsData[1],
        progress: 100,
        delivery: "in-shop",
        color: '#FFF3D6', // Soft Light Yellow for accessories & completed
        items: [
            { id: products[0].id + uuidv4(), item: products[0], quantity: 1, totalPrice: products[0].price * 1 },
            { id: products[1].id + uuidv4(), item: products[1], quantity: 1, totalPrice: products[1].price * 1 },
            { id: products[0].id + uuidv4(), item: products[0], quantity: 1, totalPrice: products[0].price * 1 },
            { id: products[0].id + uuidv4(), item: products[0], quantity: 1, totalPrice: products[0].price * 1 },
        ],
    },
    {
        id: 'A-10190',
        productName: 'Mobile Accessory',
        category: 'accessories',
        status: 'in-progress',
        orderDate: 'Jul 24, 2025, 03:15 PM',
        location: 'Electronic City Bengaluru',
        price: 24900, // total after discounts
        quantity: 3,
        image: '🎧',
        progress: 30,
        shopData: mockShopsData[0],
        delivery: "home-delivery",
        color: '#D0F0FF', // Very Light Blue for accessories & in-progress
        items: [
            { id: products[0].id + uuidv4(), item: products[0], quantity: 1, totalPrice: products[0].price * 1 },
            { id: products[1].id + uuidv4(), item: products[1], quantity: 1, totalPrice: products[1].price * 1 },
            { id: products[0].id + uuidv4(), item: products[0], quantity: 1, totalPrice: products[0].price * 1 },
            { id: products[0].id + uuidv4(), item: products[0], quantity: 1, totalPrice: products[0].price * 1 },
        ],
    },

    // === REPAIR orders unchanged ===
    {
        id: 'R-10191',
        productName: 'Samsung Galaxy S23',
        category: 'repair',
        status: 'cancelled',
        orderDate: 'Jul 23, 2025, 09:20 AM',
        issue: 'Battery replacement',

        image: '📱',
        progress: 0,
        price: 700,
        shopData: mockShopsData[0],
        color: '#FDDDDD' // Soft Pink/Light Red for cancelled
    },
    {
        id: 'R-10192',
        productName: 'Samsung Galaxy S23',
        category: 'repair',
        status: 'shipping-soon',
        orderDate: 'Jul 23, 2025, 09:20 AM',
        issue: 'Battery replacement',
        shopData: mockShopsData[0],
        image: '📱',
        progress: 0,
        price: 1200,
        color: '#D9EAF7' // Very Light Blue Gray for shipping soon
    }
];


const tabs = [
    { key: "all", label: "All Orders", count: mockerOrdersData.length },
    { key: "in-progress", label: "In-Progress", count: mockerOrdersData.filter(o => o.status === "in-progress").length },
    { key: "completed", label: "Completed", count: mockerOrdersData.filter(o => o.status === "completed").length },
    { key: "cancelled", label: "Cancelled", count: mockerOrdersData.filter(o => o.status === "cancelled").length },
];

const categories: OptionPickerCategory[] = [
    { id: "all", label: "All", icon: Grid },
    { id: "repair", label: "Repair", icon: Smartphone },
    { id: "accessories", label: "Accessories", icon: Headphones },
];

const orderSteps: StepItem[] = [
    { key: "preparing", label: "Preparing", icon: <Package className="w-5 h-5" /> },
    { key: "shipping-soon", label: "Shipping Soon", icon: <Truck className="w-5 h-5" /> },
    { key: "out-for-delivery", label: "Out for Delivery", icon: <MapPin className="w-5 h-5" /> },
    { key: "completed", label: "Completed", icon: <CheckCircle className="w-5 h-5" /> },
    { key: "cancelled", label: "Cancelled", icon: <XCircle className="w-5 h-5" /> }, // this step is used ONLY for the label
];

// Map status to step key for Stepper (should match StepItem keys above)
const statusToStepKey: Record<string, StepItem['key']> = {
    'in-progress': 'preparing',
    'shipping-soon': 'shipping-soon',
    'out-for-delivery': 'out-for-delivery',
    'completed': 'completed',
    'cancelled': 'cancelled', // For cancelled, will render "Cancelled" label at last visible step
};

export function Orders({ mockOrders = mockerOrdersData }: { mockOrders?: Order[] }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('all');
    const [selectedStatus, setSelectedStatus] = useState('all');

    const filteredOrders = mockOrders.filter(order => {
        const matchesSearch = order?.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.id.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === 'all' || order.category === selectedCategory;
        const matchesStatus = selectedStatus === 'all' || order.status === selectedStatus;
        return matchesSearch && matchesCategory && matchesStatus;
    });

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'in-progress': return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'completed': return 'bg-green-100 text-green-800 border-green-200';
            case 'delivered': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
            case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
            default: return 'bg-gray-100 text-gray-800 border-gray-200';
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
                        options={categories}
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
                            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {filteredOrders.map((order, idx) => {
                                const stepKey = statusToStepKey[order.status] || 'preparing';
                                const keyId = order.id + statusToStepKey + idx + uuidv4()
                                return (
                                    <OrderCard
                                        stepKey={stepKey}
                                        order={order}
                                        orderSteps={orderSteps}
                                        getStatusColor={getStatusColor}
                                        key={keyId}
                                        idKey = {keyId}
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
