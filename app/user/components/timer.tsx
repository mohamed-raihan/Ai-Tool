// components/TestTimer.tsx
"use client";

import { useEffect, useState } from "react";

interface TestTimerProps {
  duration: number; // in seconds
  onTimeUp: () => void;
}

export default function TestTimer({ duration, onTimeUp }: TestTimerProps) {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    console.log("submitting");
    
    if (timeLeft <= 0) {
      onTimeUp();
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, onTimeUp]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  return (
    <div className="text-xl font-semibold text-center text-gray-100 rounded-lg">
      {formatTime(timeLeft)}
    </div>
  );
}
