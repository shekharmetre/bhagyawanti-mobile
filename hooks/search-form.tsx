"use client";

import {  Mic, Search } from "lucide-react";

import { useState, useRef } from "react";
// Declare the SpeechRecognition interfaces
interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
}

interface SpeechRecognitionErrorEvent extends Event {
  error: string;
}

interface SpeechRecognition extends EventTarget {
  new(): SpeechRecognition;
  lang: string;
  interimResults: boolean;
  maxAlternatives: number;
  onresult: (event: SpeechRecognitionEvent) => void;
  onerror: (event: SpeechRecognitionErrorEvent) => void;
  start: () => void;
  stop: () => void;
}

declare global {
  interface Window {
    SpeechRecognition: any;
    webkitSpeechRecognition: any;
  }
}


export function SearchForm({
  className,
  onSearch,
}: {
  className?: string;
  onSearch: (query: string) => void;
}) {
  const [searchValue, setSearchValue] = useState<string>("");
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(searchValue);
  };

  const handleVoiceInput = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Voice input not supported in this browser.");
      return;
    }

    const recognition: SpeechRecognition = new SpeechRecognition();
    recognitionRef.current = recognition;

    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      const transcript = event.results[0][0].transcript;
      setSearchValue(transcript);
      onSearch(transcript);
    };

    recognition.onerror = (event: SpeechRecognitionErrorEvent) => {
      console.error("Speech recognition error:", event.error);
    };

    recognition.start();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex items-center rounded-full bg-muted px-2 py-1 ${className}`}
    >
      <input
        type="text"
        placeholder="Search..."
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        className="md:flex-1 p-1 py-2 border-none outline-none bg-muted focus:ring-0"
      />
      <div className="flex items-center gap-2 md:pl-2">
        <button type="submit" className="bg-orange-500 p-2 rounded-full">
          <Search className="h-4 w-4" />
        </button>
        <button type="button" onClick={handleVoiceInput} className="bg-gray-200 p-2 rounded-full">
          <Mic className="h-4 w-4" />
        </button>
      </div>
    </form>
  );
}
