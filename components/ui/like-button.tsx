'use client'
import { useState, useEffect } from "react";
import { Heart } from "lucide-react";

interface LikeButtonProps {
  liked?: boolean; // initial state from parent
  onToggle?: (liked: boolean) => void; // callback when toggled
  className?: string; // additional styles from parent
}

export const LikeButton = ({ liked = false, onToggle, className = "" }: LikeButtonProps) => {
  const [isLiked, setIsLiked] = useState(liked);
  const [animate, setAnimate] = useState(false);

  // Update internal state if parent changes liked prop
  useEffect(() => {
    setIsLiked(liked);
  }, [liked]);

  const handleClick = () => {
    const newLiked = !isLiked;
    setIsLiked(newLiked);
    setAnimate(true); // trigger animation
    onToggle?.(newLiked);

    // Reset animation flag after animation duration (e.g., 500ms)
    setTimeout(() => setAnimate(false), 500);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-pressed={isLiked}
      aria-label={isLiked ? "Unlike" : "Like"}
      className={`relative focus:outline-none ${className}`}
    >
      {/* Burst animation */}
      <span
        className={`absolute inset-0 flex justify-center items-center pointer-events-none ${
          animate ? "burst-animation" : "opacity-0"
        }`}
        aria-hidden="true"
      >
        {/* Simple radial bursts */}
        <span className="block w-6 h-6 rounded-full bg-red-500 opacity-70 animate-burst"></span>
      </span>

      {/* Heart Icon */}
      <Heart
        className={`cursor-pointer transition-colors duration-300 ${
          isLiked ? "fill-red-600 text-red-600" : "text-black hover:text-red-500"
        }`}
        size={20}
      />
    </button>
  );
};
