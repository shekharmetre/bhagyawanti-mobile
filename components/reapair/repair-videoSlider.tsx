"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import { RepairVideoType } from "@/lib/types";
import { Info } from "lucide-react";

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

  // Store refs keyed by video.id to avoid index-related issues
  const videoRefs = useRef<Map<string, HTMLVideoElement>>(new Map());
  const [infoVisible, setInfoVisible] = useState<Record<string, boolean>>({});

  // Stable setter to register/unregister video elements
  const setVideoRef = useCallback((id: string) => {
    return (el: HTMLVideoElement | null) => {
      if (el) {
        videoRefs.current.set(id, el);
      } else {
        videoRefs.current.delete(id);
      }
    };
  }, []);

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

    // Snapshot current refs so cleanup uses the same set
    const currentVideos = Array.from(videoRefs.current.values());

    currentVideos.forEach((vid) => observer.observe(vid));

    return () => {
      currentVideos.forEach((vid) => observer.unobserve(vid));
      observer.disconnect();
    };
  }, [videos.length]); // re-run if the list size changes significantly

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
          {videos.map((video) => (
            <div
              key={video.id}
              className="keen-slider__slide relative flex flex-col gap-2 rounded-xl overflow-hidden border shadow-sm hover:shadow-md transition"
            >
              {/* Info button */}
              <button
                onClick={() => toggleInfo(video.id)}
                className="absolute top-2 right-2 z-10 bg-black/60 hover:bg-black text-white rounded-full p-1"
              >
                <Info className="h-4 w-4" />
              </button>

              {/* Video */}
              <div
                onClick={() => repairSelected?.(video)}
                className="aspect-video rounded-xl overflow-hidden border bg-black shadow-md cursor-pointer"
              >
                <video
                  ref={setVideoRef(video.id)}
                  src={video.videoUrl}
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover pointer-events-none"
                />
              </div>

              {/* Info Box */}
              {infoVisible[video.id] && (
                <div className="absolute top-10 right-2 z-20 w-48 bg-white shadow-lg rounded-lg p-2 text-xs border">
                  <p>🕒 Est. Time: 30–45 min</p>
                  <p>! : {video.reasons?.[0]}</p>
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
