import React, { useRef, useState } from 'react';
import { Play, Pause } from 'lucide-react';

interface LaptopVideoProps {
  videoUrl?: string;
  className?: string;
}

const VideoPlayer: React.FC<LaptopVideoProps> = ({
  videoUrl = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
  className = ""
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className={`relative flex justify-center items-center md:py-8 py-1 perspective-[1000px] ${className}`}>
      <div className="relative w-[300px] sm:w-[360px] max-w-full">

        {/* 3D Screen */}
        <div className="transform rotate-x-[30deg] origin-bottom relative z-10">
          <div className="bg-gray-900 rounded-t-2xl p-2 shadow-xl">
            <div 
              className="bg-black rounded-md overflow-hidden h-[180px] sm:h-[200px] relative group cursor-pointer"
              onMouseEnter={() => setShowControls(true)}
              onMouseLeave={() => setShowControls(false)}
              onClick={togglePlay}
            >
              <video
                ref={videoRef}
                className="w-full h-full object-cover"
                muted
                loop
                playsInline
              >
                <source src={videoUrl} type="video/mp4" />
              </video>

              <div className={`absolute inset-0 bg-black/20 flex items-center justify-center transition-opacity duration-300 ${showControls || !isPlaying ? 'opacity-100' : 'opacity-0'}`}>
                <button
                  className="bg-white/90 text-black rounded-full p-4 shadow-lg hover:scale-110 transition"
                >
                  {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6 ml-1" />}
                </button>
              </div>

              {!isPlaying && (
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-600/20" />
              )}
            </div>
          </div>
        </div>

        {/* 3D Keyboard Base */}
        <div className="transform -rotate-x-[60deg] origin-top bg-gray-800 rounded-b-2xl px-4 py-4 shadow-inner relative z-0 mt-[-12px]">
          <div className="space-y-1">
            {/* Simplified keys for demo */}
            <div className="flex justify-center space-x-1">
              {Array.from({ length: 10 }).map((_, i) => (
                <div key={i} className="w-6 h-4 bg-gray-600 rounded-sm shadow-inner" />
              ))}
            </div>
            <div className="flex justify-center space-x-1">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="w-8 h-6 bg-gray-600 rounded shadow-inner" />
              ))}
            </div>
            <div className="flex justify-center mt-2">
              <div className="w-24 h-10 bg-gray-700 rounded-lg shadow-inner border border-gray-600" />
            </div>
          </div>
        </div>

        {/* Floor Shadow */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-64 h-6 bg-black/20 rounded-full blur-lg z-0" />
      </div>
    </div>
  );
};

export { VideoPlayer };
