"use client";

import React, { useState, useEffect, useRef } from "react";
import { ChevronDown, Info, CheckCircle2 } from "lucide-react";
import { repairVideos } from "@/lib/data";

interface RepairOptionsListProps {
  options?: string[];
  videoId: string;
}

export function RepairOptionsList({ options = [], videoId }: RepairOptionsListProps) {
  const [openOptions, setOpenOptions] = useState<Record<string, boolean>>({});

  const toggleOptions = (id: string) => {
    setOpenOptions((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  if (!options.length) return null;

  const isOpen = openOptions[videoId] || false;
  const visibleOptions = isOpen ? options : [options[0]];

  return (
    <div className="text-sm text-gray-600 w-full">
      <ul className="max-h-20 overflow-y-hidden w-full list-disc list-inside pr-1">
        {visibleOptions.map((item, idx) => (
          <li key={idx} className="whitespace-normal">
            {item}
          </li>
        ))}
      </ul>

      {options.length > 1 && (
        <button
          className="text-blue-500 text-xs mt-1"
          onClick={() => toggleOptions(videoId)}
        >
          {isOpen ? "Show less" : "Show more"}
        </button>
      )}
    </div>
  );
}

export default function RepairSection({
  selectedRepair,
  disabled,
  video,
}: {
  selectedRepair?: (name: string, price: string) => void;
  disabled: boolean;
  video: { name: string; price: string };
}) {
  // 🔹 FIX: Store `sel` as string (name) instead of object
  const [sel, setSel] = useState(video.name || "");
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [infoVisible, setInfoVisible] = useState<Record<string, boolean>>({});
  const videoRefs = useRef<HTMLVideoElement[]>([]);

  const filtered = repairVideos.filter((b) =>
    b.name.toLowerCase().includes(search.toLowerCase())
  );

  // 🔹 FIX: Display label now works with string sel
  const displayLabel = sel || "Choose a repair service...";

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const vid = entry.target as HTMLVideoElement;
          if (entry.isIntersecting) {
            vid.play().catch(() => {});
          } else {
            vid.pause();
          }
        });
      },
      { threshold: 0.6 }
    );

    videoRefs.current.forEach((vid) => vid && observer.observe(vid));
    return () => videoRefs.current.forEach((vid) => vid && observer.unobserve(vid));
  }, []);

  const toggleInfo = (id: string) => {
    setInfoVisible((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // 🔹 FIX: Match by name now
  const selectedVideo = repairVideos.find((v) => v.name === sel);
  const otherVideos = repairVideos.filter((v) => v.name !== sel);
  const orderedVideos = selectedVideo
    ? [selectedVideo, ...otherVideos]
    : repairVideos;

  const renderCard = (video: any, idx: number) => {
    const isSelected = sel === video.name;
    return (
      <div
        key={video.id+idx}
        className={`max-w-[200px] h-[300px] sm:max-w-[200px] md:max-w-[250px] flex-shrink-0 relative flex flex-col gap-2 rounded-xl overflow-x-auto border transition hover:scale-[1.02] ${
          isSelected
            ? "border-blue-500 ring ring-blue-300 shadow-lg"
            : "border-gray-200 shadow-sm"
        }`}
      >
        {isSelected && (
          <span className="absolute top-2 left-2 bg-blue-500 text-white text-xs px-2 py-0.5 rounded flex items-center gap-1 z-10">
            <CheckCircle2 className="w-3 h-3" /> Selected
          </span>
        )}

        <button
          onClick={() => toggleInfo(video.id)}
          className="absolute top-2 right-2 z-10 bg-black/60 hover:bg-black text-white rounded-full p-1"
        >
          <Info className="h-4 w-4" />
        </button>

        <div className="h-28 w-full rounded-xl overflow-hidden border bg-black shadow-md cursor-pointer">
          <video
            ref={(el) => {
              if (el) videoRefs.current[idx] = el;
            }}
            src={video.videoUrl}
            muted
            loop
            playsInline
            className="w-full object-contain pointer-events-none"
          />
        </div>

        {infoVisible[video.id] && (
          <div className="absolute top-10 right-2 z-20 w-56 bg-white shadow-lg rounded-lg p-3 text-xs border">
            <p>🕒 {video.timeEstimate}</p>
            {video.reasons?.slice(0, 2).map((r, i) => (
              <p key={i}>📍 {r}</p>
            ))}
          </div>
        )}

        <div className="p-3 gap-2 flex flex-col items-start cursor-pointer">
          <div className="text-sm text-gray-600">NAME: {video.name ?? "N/A"}</div>
          <div className="text-sm text-gray-600">
            PRICE: Rs. {video.price ?? "N/A"} /-
          </div>
          <RepairOptionsList options={video.options} videoId={video.id} />
        </div>
      </div>
    );
  };

  return (
    <div className="relative w-full mt-5">
      <label className="font-bold text-sm md:text-lg flex items-center gap-2">
        Select Repair Service
      </label>
      <button
        disabled={disabled}
        onClick={() => setOpen(!open)}
        className="border border-gray-300 rounded-md md:p-2 p-1 w-full mt-2 bg-white flex justify-between items-center"
      >
        <span className={`${sel ? "text-black" : "text-gray-400"}`}>
          {displayLabel}
        </span>
        <ChevronDown className="w-4 h-4" />
      </button>

      {open && (
        <div className="absolute w-full mt-1 border rounded-md shadow bg-white z-30">
          <input
            placeholder="Search repair..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-2 text-sm border-b outline-none"
          />
          <ul className="max-h-48 overflow-y-auto">
            {filtered.length ? (
              filtered.map((video) => (
                <li
                  key={video.id}
                  onClick={() => {
                    setSel(video.name); // 🔹 FIX: store name only
                    setOpen(false);
                    setSearch("");
                    selectedRepair?.(video.name, video.price);
                  }}
                  className={`px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm ${
                    sel === video.name ? "bg-gray-200 font-semibold" : ""
                  }`}
                >
                  {video.name}
                </li>
              ))
            ) : (
              <li className="px-4 py-2 text-gray-500 text-sm">No results</li>
            )}
          </ul>
        </div>
      )}

      <section className="w-full py-4 sm:py-8 bg-gradient-to-tr from-gray-50 to-white rounded-lg">
        <div className="w-full overflow-x-auto">
          <div className="flex gap-4 px-3">
            {orderedVideos.map((vid, idx) => renderCard(vid, idx))}
          </div>
        </div>
      </section>
    </div>
  );
}
