import { motion } from "framer-motion";

const candles = [
  { id: 1, left: "6%", top: "14%", scale: 0.85, delay: 0, duration: 5.5 },
  { id: 2, left: "18%", top: "28%", scale: 1.1, delay: 1.2, duration: 6.2 },
  { id: 3, left: "82%", top: "16%", scale: 0.95, delay: 0.8, duration: 5.8 },
  { id: 4, left: "91%", top: "32%", scale: 0.75, delay: 2.1, duration: 6.5 },
  { id: 5, left: "30%", top: "10%", scale: 0.7, delay: 1.5, duration: 5.0 },
  { id: 6, left: "70%", top: "22%", scale: 0.8, delay: 2.7, duration: 6.0 },
  { id: 7, left: "12%", top: "65%", scale: 0.65, delay: 1.8, duration: 5.7 },
  { id: 8, left: "88%", top: "72%", scale: 0.7, delay: 0.4, duration: 6.3 },
];

export default function FloatingCandles() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-[4]">
      {candles.map((candle) => (
        <motion.div
          key={candle.id}
          className="absolute"
          style={{
            left: candle.left,
            top: candle.top,
            transform: `scale(${candle.scale})`,
          }}
          animate={{
            y: [-12, 12, -12],
            rotate: [-1.2, 1.2, -1.2],
          }}
          transition={{
            duration: candle.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: candle.delay,
          }}
        >
          {/* Flame Halo / Glow */}
          <div
            className="absolute -top-7 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgba(254, 240, 138, 0.5) 0%, rgba(245, 158, 11, 0.25) 45%, transparent 75%)",
              filter: "blur(6px)",
            }}
          />

          {/* Wick */}
          <div className="w-[1.5px] h-2 bg-stone-700 mx-auto -mb-0.5" />

          {/* Flame */}
          <div
            className="w-2.5 h-4.5 rounded-full mx-auto shadow-sm"
            style={{
              background: "linear-gradient(180deg, #ffffff 0%, #fef08a 35%, #f59e0b 75%, #ef4444 100%)",
              borderRadius: "50% 50% 35% 35% / 70% 70% 30% 30%",
              boxShadow: "0 0 10px #f59e0b, 0 0 20px rgba(245, 158, 11, 0.8)",
              animation: `candle-flame ${2.2 + (candle.id % 3) * 0.4}s ease-in-out infinite`,
            }}
          />

          {/* Candle Wax Cylinder */}
          <div
            className="w-3.5 h-14 rounded-t-sm relative shadow-md"
            style={{
              background:
                "linear-gradient(90deg, #e2e8f0 0%, #fef3c7 40%, #fcd34d 75%, #d97706 100%)",
              boxShadow: "inset 0 1px 2px rgba(255,255,255,0.8), 0 4px 10px rgba(0,0,0,0.5)",
            }}
          >
            {/* Wax Drips */}
            <div className="absolute top-1 -left-0.5 w-1 h-3 rounded-full bg-amber-100 opacity-80" />
            <div className="absolute top-2 -right-0.5 w-1 h-4 rounded-full bg-amber-100 opacity-70" />
          </div>
        </motion.div>
      ))}
    </div>
  );
}
