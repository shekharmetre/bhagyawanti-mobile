'use client';

import React, { useState, useEffect, useRef } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { ChevronDown, Info } from "lucide-react";
import { repairVideos } from "@/lib/data";
import { RepairVideoType } from "@/lib/types";

export default function RepairSection({selectedRepair,disabled}:{selectedRepair?:(data:RepairVideoType)=>void;disabled:boolean}) {
  const [sel, setSel] = useState<RepairVideoType | null>(null);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [infoVisible, setInfoVisible] = useState<Record<string, boolean>>({});
  const filtered = repairVideos.filter((b) =>
    b.name.toLowerCase().includes(search.toLowerCase())
  );
  const displayLabel = sel ? sel.name : 'Choose a repair service...';

  // Keen Slider setup
  const [sliderRef] = useKeenSlider({
    loop: true,
    slides: {
      perView: 1.8,
      spacing: 16,
    },
    breakpoints: {
      "(min-width: 768px)": {
        slides: { perView: 2.5, spacing: 20 },
      },
      "(min-width: 1024px)": {
        slides: { perView: 2.5, spacing: 24 },
      },
    },
    renderMode: "performance",
    drag: true,
  });

  // Auto-play/pause videos on intersection
  const videoRefs = useRef<HTMLVideoElement[]>([]);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target as HTMLVideoElement;
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.6 }
    );

    videoRefs.current.forEach((video) => {
      if (video) observer.observe(video);
    });

    return () => {
      videoRefs.current.forEach((video) => {
        if (video) observer.unobserve(video);
      });
    };
  }, []);

  const toggleInfo = (id: string) => {
    setInfoVisible((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="relative w-full mt-3">
      {/* Dropdown */}
      <label className="font-bold text-sm md:text-lg flex items-center gap-2">
        Select Repair Service
      </label>
      <button
      disabled={disabled}
        onClick={() => setOpen(!open)}
        className="border border-gray-300 rounded-md md:p-2 p-1 w-full mt-2 bg-white flex justify-between items-center"
      >
        <span className={`${sel ? 'text-black' : 'text-gray-400'}`}>
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
                    setSel(video);
                    setOpen(false);
                    setSearch('');
                    selectedRepair?.(video)
                  }}
                  className={`px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm ${
                    sel?.id === video.id ? 'bg-gray-100 font-semibold' : ''
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

      {/* Carousel */}
      <section className="w-full py-2 sm:py-8 bg-white">
        <div className="max-w-6xl mx-auto sm:px-4">
          <div ref={sliderRef} className="keen-slider px-[10px]">
            {repairVideos.map((video, idx) => (
              <div
                key={video.id}
                className="keen-slider__slide relative flex flex-col gap-2 rounded-xl overflow-hidden border shadow-sm hover:shadow-md transition"
              >
                {/* ℹ️ Info button */}
                <button
                  onClick={() => toggleInfo(video.id)}
                  className="absolute top-2 right-2 z-10 bg-black/60 hover:bg-black text-white rounded-full p-1"
                >
                  <Info className="h-4 w-4" />
                </button>

                {/* 📹 Video */}
                <div
                  onClick={() => {setSel(video);selectedRepair?.(video)}}
                  className="aspect-video rounded-xl overflow-hidden border bg-black shadow-md cursor-pointer"
                >
                  <video
                    ref={(el) => {
                      if (el) videoRefs.current[idx] = el;
                    }}
                    src={video.videoUrl}
                    muted
                    loop
                    playsInline
                    className="w-full h-full object-cover pointer-events-none"
                  />
                </div>

                {/* ℹ️ Info Box */}
                {infoVisible[video.id] && (
                  <div className="absolute top-10 right-2 z-20 w-48 bg-white shadow-lg rounded-lg p-2 text-xs border">
                    <p>🕒 Est. Time: {video.timeEstimate}</p>
                    <p>📍 Reason: {video.reasons?.[0]}</p>
                  </div>
                )}

                {/* Name + Price */}
                <div className="p-2 text-center">
                  <h3 className="text-xs md:text-sm font-semibold mt-1">{video.name}</h3>
                  <p className="text-sm font-bold text-green-600 mt-1">₹499</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
