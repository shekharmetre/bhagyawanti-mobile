'use client'

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { StepItem } from "@/lib/types";

interface StepperProps {
    steps: StepItem[];
    current: string;
    className?: string;
    ariaLabel?: string;
}

interface StepProps {
    step: StepItem;
    isActive: boolean;
    isCurrentStep: boolean;
    currentKey: string;
}

export function Step({ step, isActive, isCurrentStep, currentKey }: StepProps) {
    const isCancelledStep = isCurrentStep && currentKey === "cancelled";

    return (
        <div className="flex flex-col items-center gap-1 min-w-0 relative">
            {/* Circle */}
            <div
                className={cn(
                    "grid place-items-center w-7 h-7 rounded-full border-2 transition-colors absolute top-1/1 -translate-y-1/2", // <-- centers vertically on line
                    isActive
                        ? (isCancelledStep
                            ? "border-red-500 bg-red-100 text-red-700 ring-4 ring-red-200"
                            : "border-primary bg-primary/90 text-primary-foreground ring-2 ring-primary/15"
                        )
                        : "border-border bg-background"
                )}
            >
                {step.icon ? (
                    step.icon
                ) : (
                    <div
                        className={cn(
                            "w-2 h-2 rounded-full",
                            isActive
                                ? (isCancelledStep ? "bg-red-500" : "bg-primary-foreground")
                                : "bg-border"
                        )}
                    />
                )}
            </div>

            {/* Label */}
            <span
                className={cn(
                    " mt-5 text-[10px] sm:text-[10px] text-muted-foreground text-center truncate max-w-[6rem]", // mt pushes label below circle
                    isCurrentStep && (isCancelledStep ? "text-red-600 font-bold" : "text-foreground font-medium")
                )}
            >
                {isCancelledStep ? "Cancelled" : step.label}
            </span>
        </div>
    );

}

export function Stepper({ steps, current, className, ariaLabel }: StepperProps) {
    const visibleSteps = steps.slice(0, -1);
    const idx = Math.max(0, visibleSteps.findIndex((s) => s.key === current));
    const lastIndex = Math.max(visibleSteps.length - 1, 1);

    const progressMap: Record<string, number> = {
        "in-progress": 35,
        "shipping-soon": 65,
        "out-for-delivery": 85,
        "completed": 100,
        "cancelled": 100,
    };

    const progress =
        progressMap[current] ??
        Math.max(0, Math.min(100, (idx / lastIndex) * 100));

    return (
        <div
            className={cn("relative w-full mt-6", className)} // more vertical padding for centered layout
            aria-label={ariaLabel ?? "Progress"}
        >
            {/* Base Track */}
            <div className="absolute inset-x-8 top-1/1 -translate-y-1/2 h-1 rounded-full bg-border" />

            {/* Active Track */}
            <motion.div
                className={cn(
                    "absolute left-8 top-1/1 -translate-y-1/2 h-1 rounded-full",
                    current === "cancelled" ? "bg-red-400" : "bg-primary"
                )}
                initial={{ width: 0 }}
                animate={{ width: `calc(${progress}% - 2rem)` }} // subtract padding from both sides
                transition={{ duration: 0.4, ease: "easeOut" }}
            />

            {/* Steps */}
            <div className="relative flex justify-between w-full">
                {visibleSteps.map((s, i) => {
                    const isActive = i <= idx || current === "completed";
                    const isCurrentStep = i === idx;
                    return (
                        <Step
                            key={s.key}
                            step={s}
                            isActive={isActive}
                            isCurrentStep={isCurrentStep}
                            currentKey={current}
                        />
                    );
                })}
            </div>
        </div>
    );
}
