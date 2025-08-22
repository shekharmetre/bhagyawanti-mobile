"use client";

import { useRef, useState } from "react";
import { MessageSquare, Mic, Square } from "lucide-react";

interface VoiceNotesCompactProps {
  onChange: (text: string, audioBlob?: Blob) => void;
}

export default function VoiceNotesCompact({ onChange }: VoiceNotesCompactProps) {
  const [recording, setRecording] = useState(false);
  const [notes, setNotes] = useState("");
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunks = useRef<Blob[]>([]);
  const recognitionRef = useRef<any>(null);

  // Handle manual edits in textarea
  const handleTextChange = (val: string) => {
    setNotes(val);
    onChange(val, recording ? undefined : undefined);
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

      // Audio recording
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunks.current = [];

      mediaRecorderRef.current.ondataavailable = (e) => {
        if (e.data.size > 0) audioChunks.current.push(e.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(audioChunks.current, { type: "audio/webm" });
        setAudioUrl(URL.createObjectURL(blob));
        onChange(notes, blob);
      };

      mediaRecorderRef.current.start();

      // Speech-to-Text (Chrome Web Speech API for demo)
      if ("webkitSpeechRecognition" in window) {
        const SpeechRecognition =
          (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = true;
        recognitionRef.current.interimResults = true;
        recognitionRef.current.lang = "en-US";

        recognitionRef.current.onresult = (event: any) => {
          for (let i = event.resultIndex; i < event.results.length; i++) {
            const transcript = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
              setNotes((prev) => {
                const updated = prev + (prev ? " " : "") + transcript;
                onChange(updated);
                return updated;
              });
            }
          }
        };
        recognitionRef.current.start();
      }

      setRecording(true);
    } catch {
      alert("Microphone access denied or unavailable");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current?.state !== "inactive") {
      mediaRecorderRef?.current?.stop();
    }
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setRecording(false);
  };

  return (
    <div className="space-y-3">
      {/* Header Row */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-blue-600" />
          Additional Notes
        </h3>

        {!recording ? (
          <button
            type="button"
            onClick={startRecording}
            className="flex items-center gap-1 px-3 py-1.5 bg-red-500 text-white rounded-md"
          >
            <Mic className="w-4 h-4" /> Record
          </button>
        ) : (
          <button
            type="button"
            onClick={stopRecording}
            className="flex items-center gap-1 px-3 py-1.5 bg-gray-700 text-white rounded-md"
          >
            <Square className="w-4 h-4" /> Stop
          </button>
        )}
      </div>

      {/* Editable text from transcript */}
      <textarea
        placeholder="Any special instructions or requirements for your repair visit?"
        className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 min-h-[100px] text-sm"
        value={notes}
        onChange={(e) => handleTextChange(e.target.value)}
      />

      {/* Optional: recorded audio playback */}
      {audioUrl && (
        <audio controls className="mt-2 w-full">
          <source src={audioUrl} type="audio/webm" />
          Your browser does not support audio playback
        </audio>
      )}
    </div>
  );
}
