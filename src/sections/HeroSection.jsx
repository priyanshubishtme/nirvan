import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Clock, Sparkles, MapPin, CalendarDays } from "lucide-react";
import CountdownTimer from "../components/CountdownTimer";
import { playSpellSound, playWandClick } from "../utils/audio";

const TITLE_LETTERS = ["N", "I", "R", "V", "A", "N", " ", "'", "2", "6"];

export default function HeroSection({ onOpenRegister }) {
  const [hoveredLetter, setHoveredLetter] = useState(null);
  const canvasRef = useRef(null);

  // Modern, high-performance ambient stardust canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const particles = Array.from({ length: 42 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.5 + 0.4,
      vx: (Math.random() - 0.5) * 0.2,
      vy: -Math.random() * 0.3 - 0.1,
      alpha: Math.random() * 0.5 + 0.2,
      color: Math.random() > 0.4 ? "#f59e0b" : "#818cf8",
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.y < 0) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 6;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const scrollTo = (id) => {
    playWandClick();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] sm:min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 pt-24 pb-16 overflow-hidden bg-[#04060e]"
    >
      {/* ── Background Layer 1: Modern Tech Grid & Celestial Radial Vignette ── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(rgba(245, 158, 11, 0.15) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#0f152e_0%,#080a18_55%,#04060e_100%)] pointer-events-none" />

      {/* Luminous Warm Radial Aura centered behind title */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-[radial-gradient(circle,rgba(245,158,11,0.12)_0%,rgba(129,140,248,0.05)_45%,transparent_75%)] blur-[110px] pointer-events-none z-[1]" />

      {/* Modern Ambient Top Light Beam */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-b from-[#f59e0b]/10 to-transparent blur-[80px] pointer-events-none z-[1]" />

      {/* Floating Stardust Particles Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-[2]"
      />

      {/* ── Main Hero Content (Symmetrical, Modern, High-Impact) ── */}
      <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center">
        {/* Sleek Modern Conclave Badge */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-[#f59e0b]/35 bg-[#0a0d1e]/85 backdrop-blur-md mb-6 shadow-[0_0_20px_rgba(245,158,11,0.15)]"
        >
          <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse shadow-[0_0_8px_#10b981]" />
          <span className="font-mono text-xs font-semibold text-[#fef08a] tracking-wider">
            OCTOBER 24 – 26, 2026
          </span>
          <span className="text-white/20">•</span>
          <span className="font-mono text-xs text-[#cbd5e1] flex items-center gap-1">
            <MapPin size={12} className="text-[#818cf8]" />
            GEHU HALDWANI
          </span>
        </motion.div>

        {/* ── Grand Title: NIRVAN '26 ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="mb-3 relative cursor-default select-none"
        >
          <h1 className="font-magical text-6xl sm:text-8xl md:text-9xl font-black text-shimmer leading-none tracking-wider drop-shadow-[0_4px_45px_rgba(245,158,11,0.45)] flex items-center justify-center flex-wrap">
            {TITLE_LETTERS.map((char, i) => {
              if (char === " ") {
                return <span key={i} className="w-4 sm:w-6" />;
              }
              const isHovered = hoveredLetter === i;
              return (
                <motion.span
                  key={i}
                  onMouseEnter={() => {
                    playWandClick();
                    setHoveredLetter(i);
                  }}
                  onMouseLeave={() => setHoveredLetter(null)}
                  animate={{
                    y: isHovered ? -16 : 0,
                    scale: isHovered ? 1.15 : 1,
                    rotate: isHovered ? (i % 2 === 0 ? 6 : -6) : 0,
                    color: isHovered ? "#ffffff" : undefined,
                    textShadow: isHovered
                      ? "0 0 25px #fef08a, 0 0 50px #f59e0b"
                      : "0 4px 30px rgba(245,158,11,0.3)",
                  }}
                  transition={{ type: "spring", stiffness: 450, damping: 14 }}
                  className="inline-block transition-colors duration-200 cursor-pointer hover:text-white"
                >
                  {char}
                </motion.span>
              );
            })}
          </h1>
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-[#fef08a] italic mb-8 drop-shadow-md"
        >
          "Where Ideas Become Innovation"
        </motion.p>

        {/* ── Countdown Timer (Perfect Symmetrical Center Alignment) ── */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mb-10 w-full flex flex-col items-center justify-center"
        >
          <div className="flex items-center justify-center gap-2 mb-3.5 text-stone-400">
            <Clock size={13} className="text-[#f59e0b]" />
            <span className="label-mono text-[10px] text-[#cbd5e1] tracking-[0.2em] font-semibold">
              COUNTDOWN UNTIL FESTIVAL COMMENCES
            </span>
          </div>
          <CountdownTimer />
        </motion.div>

        {/* ── Balanced Action Buttons ── */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <button
            onClick={() => scrollTo("events")}
            className="btn-gold flex items-center gap-2 cursor-pointer shadow-[0_0_25px_rgba(245,158,11,0.35)]"
          >
            <span>EXPLORE EVENTS</span>
            <ArrowRight size={16} />
          </button>

          <button
            onClick={() => {
              playSpellSound();
              onOpenRegister();
            }}
            className="btn-outline-magic flex items-center gap-2 cursor-pointer"
          >
            <Sparkles size={16} className="text-[#f59e0b]" />
            <span>REGISTER NOW</span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
