"use client";

import React, { useState, useRef, useEffect } from "react";
import { Bold, Italic, Video, Trash2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ExtraInfoItem } from "@/lib/types";


interface RepairExtraDetailsProps {
  onChange?: (items: ExtraInfoItem[]) => void;
  disabled:boolean;
}

export default function RepairExtraDetails({ onChange ,disabled}: RepairExtraDetailsProps) {
  const [infoItems, setInfoItems] = useState<ExtraInfoItem[]>([]);
  const [text, setText] = useState("");
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Debounce text input
  useEffect(() => {
    if (!text.trim()) return;

    const timeout = setTimeout(() => {
      const tempItem: ExtraInfoItem = {
        id: "typing-preview",
        type: "text",
        content: text,
      };
      onChange?.([...infoItems.filter((item) => item.id !== "typing-preview"), tempItem]);
    }, 800); // trigger after 800ms of no typing

    return () => clearTimeout(timeout);
  }, [text]);

  // Trigger when infoItems change (except from typing preview)
  useEffect(() => {
    onChange?.(infoItems);
  }, [infoItems]);

  const handleAddText = () => {
    if (text.trim()) {
      const newItem: ExtraInfoItem = {
        id: crypto.randomUUID(),
        type: "text",
        content: text,
      };
      setInfoItems((prev) => [
        ...prev.filter((item) => item.id !== "typing-preview"),
        newItem,
      ]);
      setText("");
    }
  };

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      const newItem: ExtraInfoItem = {
        id: crypto.randomUUID(),
        type: "video",
        content: url,
      };
      setInfoItems((prev) => [...prev, newItem]);
    }
  };

  const handleDelete = (id: string) => {
    setInfoItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="border rounded-xl p-4 w-full max-w-5xl mx-auto bg-white space-y-4">
      <h2 className="text-lg font-bold">Add More Info (optional)</h2>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="border rounded-md p-2 w-full">
          <div className="flex justify-between">
            {/* Toolbar */}
            <div className="flex items-center gap-2 mb-2">
              <Button variant="ghost" size="icon" onClick={() => fileInputRef.current?.click()}>
                <Video className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" disabled>
                <Bold className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" disabled>
                <Italic className="w-4 h-4" />
              </Button>
            </div>

            {/* Preview Items */}
            <div className="flex flex-wrap gap-2 ml-4">
              {infoItems.map((item) => (
                <div key={item.id} className="relative">
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="absolute -top-1 -right-1 z-10 text-red-500 hover:text-red-700 bg-white rounded-full"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  {item.type === "text" ? (
                    <div className="w-20 h-20 border rounded-md bg-gray-100 flex items-center justify-center text-xs text-center p-2">
                      {item.content.slice(0, 20)}...
                    </div>
                  ) : (
                    <button
                    disabled={disabled}
                      onClick={() => setActiveVideo(item.content)}
                      className="md:w-20 w-10 h-10 md:h-20 overflow-hidden border rounded-md bg-black"
                    >
                      <video src={item.content} muted className="w-full h-full object-cover" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          <textarea
            placeholder="Add extra repair information..."
            className="w-full border rounded-md p-2 text-sm resize-none mt-2"
            rows={6}
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          <div className="mt-2 text-right md:block hidde">
            <Button size="sm" onClick={handleAddText}>
              Add Text
            </Button>
          </div>
        </div>
      </div>

      {/* Hidden input */}
      <input
        type="file"
        accept="video/*"
        ref={fileInputRef}
        onChange={handleVideoUpload}
        className="hidden"
      />

      {/* Video modal */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center">
          <div className="relative bg-white rounded-md overflow-hidden shadow-xl w-full max-w-lg">
            <button
            disabled={disabled}
              onClick={() => setActiveVideo(null)}
              className="absolute top-2 right-2 bg-white text-black rounded-full shadow-md p-1 cursor-pointer hover:bg-gray-100 z-10"
            >
              <X className="w-4 h-4" />
            </button>
            <video src={activeVideo} controls autoPlay className="w-full h-auto rounded-b-md" />
          </div>
        </div>
      )}
    </div>
  );
}
