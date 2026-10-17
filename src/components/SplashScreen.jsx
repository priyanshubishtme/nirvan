import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function SplashScreen({ onFinish }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      if (onFinish) onFinish();
    }, 2400);

    return () => clearTimeout(timer);
  }, [onFinish]);

  const handleDismiss = () => {
    setVisible(false);
    if (onFinish) onFinish();
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: "easeInOut" } }}
          style={{ pointerEvents: visible ? "auto" : "none" }}
          className="fixed inset-0 z-[9999] bg-[#070810] flex flex-col items-center justify-center p-6 text-center select-none"
        >
          {/* Ambient center gold aura */}
          <div className="absolute w-[500px] h-[500px] rounded-full bg-[radial-gradient(circle,rgba(245,158,11,0.15)_0%,transparent_70%)] pointer-events-none blur-3xl animate-pulse" />

          {/* Logo / Crest */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative mb-6"
          >
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-[#0d1020] border border-[#f59e0b]/50 p-3.5 shadow-[0_0_40px_rgba(245,158,11,0.4)] flex items-center justify-center mx-auto">
              <img
                src="/techgeeks-white.svg"
                alt="Tech Geeks Logo"
                className="w-full h-full object-contain filter drop-shadow-[0_0_10px_#f59e0b]"
              />
            </div>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-magical text-4xl sm:text-6xl font-black text-shimmer tracking-wider mb-2"
          >
            NIRVAN '26
          </motion.h1>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="font-display text-sm sm:text-base text-[#fef08a] italic tracking-wide mb-6"
          >
            "Where Ideas Become Innovation"
          </motion.p>

          {/* Lumos Progress Indicator */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "160px" }}
            transition={{ duration: 1.8, ease: "easeInOut" }}
            className="h-0.5 bg-gradient-to-r from-transparent via-[#f59e0b] to-transparent shadow-[0_0_12px_#f59e0b]"
          />

          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="label-mono text-[10px] text-[#cbd5e1] mt-3 tracking-[0.25em]"
          >
            GRAPHIC ERA HILL UNIVERSITY • HALDWANI
          </motion.span>

          {/* Skip Button */}
          <button
            onClick={handleDismiss}
            className="absolute bottom-8 text-xs font-mono text-[#cbd5e1]/60 hover:text-[#fef08a] transition-colors cursor-pointer tracking-widest px-4 py-1.5 rounded-full border border-white/10 hover:border-[#f59e0b]/40"
          >
            ENTER NOW ➔
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
