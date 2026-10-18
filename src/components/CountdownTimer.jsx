import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TARGET_DATE = new Date("2026-10-24T09:00:00+05:30").getTime();

function padZero(n) {
  return String(n).padStart(2, "0");
}

function TimerUnit({ label, value }) {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative bg-[#0a0d1c]/95 border border-[#f59e0b]/30 rounded-xl sm:rounded-2xl w-[68px] sm:w-[84px] md:w-[96px] h-[72px] sm:h-[88px] md:h-[100px] flex items-center justify-center shadow-[0_8px_30px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(254,240,138,0.15)] backdrop-blur-xl overflow-hidden transition-all duration-200 hover:scale-105 hover:border-[#fef08a]/50 group">
        {/* Top gold ambient hairline */}
        <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#f59e0b] to-transparent" />

        {/* Middle split line for flip card effect */}
        <div className="absolute left-2 right-2 top-1/2 h-px bg-white/5" />

        {/* Value with digit flip animation */}
        <AnimatePresence mode="popLayout">
          <motion.span
            key={value}
            initial={{ y: -12, opacity: 0, scale: 0.9 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 12, opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl sm:text-4xl md:text-5xl font-black font-mono text-[#fef08a] leading-none tracking-tight drop-shadow-[0_2px_12px_rgba(245,158,11,0.5)]"
          >
            {padZero(value)}
          </motion.span>
        </AnimatePresence>

        {/* Subtle bottom reflection */}
        <div className="absolute bottom-0 left-0 right-0 h-[30%] bg-gradient-to-t from-[#f59e0b]/[0.03] to-transparent pointer-events-none" />
      </div>

      {/* Label */}
      <span className="label-mono text-[9px] sm:text-[10px] text-[#94a3b8] mt-2.5 tracking-[0.18em] font-bold">
        {label}
      </span>
    </div>
  );
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
    <div
      className={`flex items-start justify-center gap-3 sm:gap-4 md:gap-5 mx-auto select-none ${className}`}
    >
      {units.map(({ label, value }, idx) => (
        <div key={label} className="flex items-start gap-3 sm:gap-4 md:gap-5">
          <TimerUnit label={label} value={value} />
          {/* Colon separator */}
          {idx < units.length - 1 && (
            <div className="hidden sm:flex flex-col items-center justify-center gap-2 pt-5 md:pt-7">
              <motion.span
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="w-1.5 h-1.5 rounded-full bg-[#f59e0b]"
              />
              <motion.span
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="w-1.5 h-1.5 rounded-full bg-[#f59e0b]"
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
