import { useState, useEffect } from "react";

const TARGET_DATE = new Date("2026-10-24T09:00:00+05:30").getTime();

function padZero(n) {
  return String(n).padStart(2, "0");
}

export default function CountdownTimer({ className = "" }) {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());

  function getTimeLeft() {
    const now = Date.now();
    const diff = Math.max(0, TARGET_DATE - now);
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      mins: Math.floor((diff / (1000 * 60)) % 60),
      secs: Math.floor((diff / 1000) % 60),
    };
  }

  useEffect(() => {
    const interval = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(interval);
  }, []);

  const units = [
    { label: "DAYS", value: timeLeft.days },
    { label: "HOURS", value: timeLeft.hours },
    { label: "MINS", value: timeLeft.mins },
    { label: "SECS", value: timeLeft.secs },
  ];

  return (
    <div className={`flex items-center justify-center gap-3 sm:gap-4 mx-auto select-none ${className}`}>
      {units.map(({ label, value }, idx) => (
        <div key={label} className="flex items-center gap-3 sm:gap-4">
          <div className="flex flex-col items-center justify-center bg-[#0a0d1c]/90 border border-[#f59e0b]/35 rounded-2xl w-[72px] sm:w-[88px] md:w-[96px] py-3 sm:py-3.5 shadow-[0_8px_30px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(254,240,138,0.2)] backdrop-blur-xl relative overflow-hidden transition-transform duration-200 hover:scale-105 hover:border-[#fef08a]/60">
            {/* Top gold ambient hairline */}
            <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#f59e0b] to-transparent" />
            
            {/* Value */}
            <span className="text-3xl sm:text-4xl md:text-5xl font-black font-mono text-[#fef08a] leading-none tracking-tight drop-shadow-[0_2px_12px_rgba(245,158,11,0.5)]">
              {padZero(value)}
            </span>
            
            {/* Label */}
            <span className="label-mono text-[9px] sm:text-[10px] text-[#94a3b8] mt-1.5 tracking-[0.2em] font-bold">
              {label}
            </span>
          </div>

          {/* Golden colon separator between units (except last) */}
          {idx < units.length - 1 && (
            <span className="hidden sm:inline-block font-mono text-xl sm:text-2xl font-bold text-[#f59e0b]/60 -mt-3 select-none">
              :
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
