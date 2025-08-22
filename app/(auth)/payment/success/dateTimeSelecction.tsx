"use client";

import { useEffect, useMemo, useState } from "react";
import { Clock, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { makeISTDate } from "@/lib/helper";

interface DateTimePickerProps {
  onSelect: (date: Date, time: string) => void;
}

// Constants+/6
const TZ = "Asia/Kolkata";
const IST_OFFSET_MIN = 330; // IST is UTC+5:30, no DST

// Safe formatter with fallback if timezone is not available
const fmt = (d: Date, o: Intl.DateTimeFormatOptions) => {
  try {
    return new Intl.DateTimeFormat("en-IN", { timeZone: TZ, ...o }).format(d);
  } catch {
    // Fallback without timezone (rare; only if ICU/timezone missing)
    return new Intl.DateTimeFormat("en-IN", o).format(d);
  }
};

const sameISTDay = (a: Date, b: Date) =>
  fmt(a, { year: "numeric", month: "2-digit", day: "2-digit" }) ===
  fmt(b, { year: "numeric", month: "2-digit", day: "2-digit" });

// Parse "hh:mm AM/PM" and build a UTC Date that represents that clock time in IST for the given 'day'.
const slotToUTCFromIST = (day: Date, slot: string) => {
  const [t, mod] = slot.split(" ");
  let [h, m] = t.split(":").map(Number);
  if (mod === "PM" && h !== 12) h += 12;
  if (mod === "AM" && h === 12) h = 0;

  const y = Number(fmt(day, { year: "numeric" }));
  const mm = Number(fmt(day, { month: "2-digit" }));
  const dd = Number(fmt(day, { day: "2-digit" }));

  // Start of day in UTC that corresponds to IST midnight of that date
  // IST midnight = UTC (y-mm-dd 18:30 of previous day). The math below handles it cleanly:
  const baseUTC = new Date(Date.UTC(y, mm - 1, dd, 0, 0, 0));
  const utcMs = baseUTC.getTime() + (h * 60 + m - IST_OFFSET_MIN) * 60_000;
  return new Date(utcMs);
};

// Build the IST-aware Date for onSelect (same as above; provided for c
// rity)
const makeISTDateLocal = (day: Date, time: string) => slotToUTCFromIST(day, time);
// Stable time slots
const TIME_SLOTS = [
  "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
  "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM",
  "05:00 PM", "06:00 PM", "07:00 PM", "08:00 PM",
  "09:00 PM", "10:00 PM", "11:00 PM",
];

export default function DateTimePicker({ onSelect }: DateTimePickerProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [showPicker, setShowPicker] = useState<boolean>(false);
  const [now, setNow] = useState<Date>(() => new Date()); // for live updates of same-day slots

  // Optional: refresh 'now' every 60s so today's available slots update without reload
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 60_000);
    return () => clearInterval(id);
  }, []);

  // Next 10 IST days based on current client time
  const next10Days = useMemo(() => {
    const days: Date[] = [];
    const n = new Date();
    for (let i = 0; i < 10; i++) {
      const d = new Date(n);
      d.setDate(n.getDate() + i);
      days.push(d);
    }
    return days;
  }, []);

  // Available slots (filter out past times if selected date is "today" in IST)
  const availableSlots = useMemo(() => {
    if (!selectedDate) return [];
    const isToday = sameISTDay(selectedDate, now);
    if (!isToday) return TIME_SLOTS;
    return TIME_SLOTS.filter((slot) => slotToUTCFromIST(selectedDate, slot).getTime() > now.getTime());
  }, [selectedDate, now]);

  const dayChipLabel = (date: Date) => {
    const tmr = new Date(now);
    tmr.setDate(now.getDate() + 1);
    if (sameISTDay(date, now)) return "Today";
    if (sameISTDay(date, tmr)) return "Tomorrow";
    return fmt(date, { weekday: "short" });
  };

  const summaryLabel = (() => {
    if (!selectedDate || !selectedTime) return "Select Date & Time";
    const weekday = fmt(selectedDate, { weekday: "short" });
    const day = fmt(selectedDate, { day: "2-digit" });
    const month = fmt(selectedDate, { month: "short" });
    const year = fmt(selectedDate, { year: "numeric" });
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
                className={`flex-shrink-0 p-3 rounded-xl border-2 min-w-[110px] transition-all ${isSelected
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
                  className={`p-2 rounded-lg border-2 text-sm transition-all ${selectedTime === time
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
