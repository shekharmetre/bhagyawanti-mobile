"use client";

import React, { useEffect, useRef, useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { RepairVideoType } from "@/lib/types";
import { Info } from "lucide-react"; // icon library

interface RepairVideoCarouselProps {
  videos: RepairVideoType[];
  repairSelected?: (data: RepairVideoType) => void;
}

export default function RepairVideoCarousel({
  videos,
  repairSelected,
}: RepairVideoCarouselProps) {
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

  const videoRefs = useRef<HTMLVideoElement[]>([]);
  const [infoVisible, setInfoVisible] = useState<Record<string, boolean>>({});

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
      {
        threshold: 0.6,
      }
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
    <section className="w-full py-2 sm:py-8 bg-white">
      <div className="max-w-6xl mx-auto sm:px-4">
        <div ref={sliderRef} className="keen-slider px-[10px]">
          {videos.map((video, idx) => (
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
                onClick={() => repairSelected?.(video)}
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
                  <p>🕒 Est. Time: 30–45 min</p>
                  <p>! : {video.reasons[0]}.</p>
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
  );
}
