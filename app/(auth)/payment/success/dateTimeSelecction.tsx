"use client";

import { useMemo, useState } from "react";
import { Clock, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { makeISTDate } from "@/lib/helper";

interface DateTimePickerProps {
  onSelect: (date: Date, time: string) => void;
}

const TZ = "Asia/Kolkata";
const fmt = (d: Date, o: Intl.DateTimeFormatOptions) =>
  new Intl.DateTimeFormat("en-IN", { timeZone: TZ, ...o }).format(d);
const sameISTDay = (a: Date, b: Date) =>
  fmt(a, { year: "numeric", month: "2-digit", day: "2-digit" }) ===
  fmt(b, { year: "numeric", month: "2-digit", day: "2-digit" });

export default function DateTimePicker({ onSelect }: DateTimePickerProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [showPicker, setShowPicker] = useState<boolean>(false);

  const timeSlots = [
    "09:00 AM","10:00 AM","11:00 AM","12:00 PM",
    "01:00 PM","02:00 PM","03:00 PM","04:00 PM",
    "05:00 PM","06:00 PM","07:00 PM","08:00 PM",
    "09:00 PM","10:00 PM","11:00 PM",
  ];

  // Next 10 days based on current date; comparisons/labels use IST via fmt/sameISTDay
  const next10Days = useMemo(() => {
    const days: Date[] = [];
    const now = new Date();
    for (let i = 0; i < 10; i++) {
      const d = new Date(now);
      d.setDate(now.getDate() + i);
      days.push(d);
    }
    return days;
  }, []);

  // For “Today” filtering (only future slots)
  const slotToDateIST = (day: Date, slot: string) => {
    const [t, mod] = slot.split(" ");
    let [h, m] = t.split(":").map(Number);
    if (mod === "PM" && h !== 12) h += 12;
    if (mod === "AM" && h === 12) h = 0;

    const y = Number(fmt(day, { year: "numeric" }));
    const mm = Number(fmt(day, { month: "2-digit" }));
    const dd = Number(fmt(day, { day: "2-digit" }));

    const baseUTC = new Date(Date.UTC(y, mm - 1, dd, 0, 0, 0));
    const istOffsetMin = 330;
    return new Date(baseUTC.getTime() + ((h * 60 + m) - istOffsetMin) * 60 * 1000);
  };

  const availableSlots = useMemo(() => {
    if (!selectedDate) return [];
    const now = new Date();
    const isToday = sameISTDay(selectedDate, now);
    if (!isToday) return timeSlots;
    return timeSlots.filter((slot) => slotToDateIST(selectedDate, slot).getTime() > now.getTime());
  }, [selectedDate]);

  const dayChipLabel = (date: Date) => {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(now.getDate() + 1);
    if (sameISTDay(date, now)) return "Today";
    if (sameISTDay(date, tomorrow)) return "Tomorrow";
    return fmt(date, { weekday: "short" });
  };

  // Summary label like "Fri 15 Aug 2025, 07:30 PM"
  const summaryLabel = (() => {
    if (!selectedDate || !selectedTime) return "Select Date & Time";
    const weekday = fmt(selectedDate, { weekday: "short" }); // Fri
    const day = fmt(selectedDate, { day: "2-digit" });       // 15
    const month = fmt(selectedDate, { month: "short" });     // Aug
    const year = fmt(selectedDate, { year: "numeric" });     // 2025
    return `${weekday} ${day} ${month} ${year}, ${selectedTime}`;
  })();

  return (
    <div>
      {/* Summary label row (mobile) */}
      <div className="md:hidden flex justify-end">
        <button
          onClick={() => setShowPicker((v) => !v)}
          className="flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-300 bg-white shadow"
        >
          <span className="text-sm font-medium text-gray-700">{summaryLabel}</span>
          <ChevronDown
            className={`w-4 h-4 transition-transform duration-200 ${showPicker ? "rotate-180" : ""}`}
          />
        </button>
      </div>

      {/* Picker container */}
      <div className={`${showPicker ? "block" : "hidden"} md:block`}>
        <h3 className="text-lg font-semibold flex items-center gap-2 text-gray-900 mb-4">
          <Clock className="w-5 h-5 text-blue-600" />
          Select Date & Time
        </h3>

        {/* Date scroll */}
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {next10Days.map((date, i) => {
            const isSelected = selectedDate && sameISTDay(date, selectedDate);
            return (
              <motion.button
                key={i}
                onClick={() => {
                  setSelectedDate(date);
                  setSelectedTime(null);
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex-shrink-0 p-3 rounded-xl border-2 min-w-[110px] transition-all ${
                  isSelected
                    ? "bg-blue-600 text-white border-blue-600 shadow-lg"
                    : "bg-white border-gray-200 text-gray-700 hover:border-blue-300 hover:bg-blue-50"
                }`}
              >
                <div className="font-semibold text-sm">{dayChipLabel(date)}</div>
                <div className="text-xs mt-1">
                  {fmt(date, { day: "2-digit" })}/{fmt(date, { month: "2-digit" })}
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Time slots */}
        {selectedDate && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            transition={{ duration: 0.3 }}
            className="mt-4"
          >
            <h4 className="font-medium mb-3 text-gray-900">Available Time Slots (IST)</h4>
            <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
              {availableSlots.length === 0 && (
                <div className="col-span-full text-sm text-gray-500">
                  No slots available for this day
                </div>
              )}
              {availableSlots.map((time) => (
                <motion.button
                  key={time}
                  onClick={() => {
                    setSelectedTime(time);
                    if (!selectedDate) return;
                    const istDate = makeISTDate(selectedDate, time);
                    onSelect(istDate, time);    // send to parent
                    setShowPicker(false);       // collapse to Summary on mobile
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-2 rounded-lg border-2 text-sm transition-all ${
                    selectedTime === time
                      ? "bg-green-600 text-white border-green-600 shadow-lg"
                      : "bg-white border-gray-200 hover:border-green-300 hover:bg-green-50 text-gray-700"
                  }`}
                >
                  {time}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
