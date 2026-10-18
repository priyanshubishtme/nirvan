import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Sparkles, MapPin, ChevronDown } from "lucide-react";
import CountdownTimer from "../components/CountdownTimer";
import { playSpellSound, playWandClick } from "../utils/audio";

const TITLE_LETTERS = ["N", "I", "R", "V", "A", "N"];
const SUBTITLE_LETTERS = ["'", "2", "6"];

export default function HeroSection({ onOpenRegister }) {
  const [hoveredLetter, setHoveredLetter] = useState(null);
  const canvasRef = useRef(null);
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Parallax transforms for layered depth
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const starsY = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const badgeOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  // Enhanced starfield with constellation lines and shooting stars
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

    // Static constellation stars
    const stars = Array.from({ length: 80 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.4 + 0.3,
      baseAlpha: Math.random() * 0.4 + 0.15,
      twinkleSpeed: Math.random() * 0.02 + 0.005,
      twinklePhase: Math.random() * Math.PI * 2,
      color: ["#f59e0b", "#818cf8", "#fef08a", "#a855f7", "#ffffff"][
        Math.floor(Math.random() * 5)
      ],
    }));

    // Floating embers that drift upward
    const embers = Array.from({ length: 18 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 1.8 + 0.5,
      vx: (Math.random() - 0.5) * 0.15,
      vy: -Math.random() * 0.4 - 0.15,
      alpha: Math.random() * 0.6 + 0.2,
      color: Math.random() > 0.3 ? "#f59e0b" : "#fef08a",
    }));

    // Constellation lines between nearby stars
    const constellations = [];
    for (let i = 0; i < stars.length; i++) {
      for (let j = i + 1; j < stars.length; j++) {
        const dx = stars[i].x - stars[j].x;
        const dy = stars[i].y - stars[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120 && Math.random() > 0.65) {
          constellations.push([i, j, dist]);
        }
      }
    }

    // Shooting stars
    let shootingStars = [];
    const spawnShootingStar = () => {
      if (shootingStars.length < 2 && Math.random() > 0.985) {
        shootingStars.push({
          x: Math.random() * width * 0.6,
          y: Math.random() * height * 0.4,
          vx: 4 + Math.random() * 3,
          vy: 2 + Math.random() * 1.5,
          life: 1,
          decay: 0.015 + Math.random() * 0.01,
          length: 40 + Math.random() * 30,
        });
      }
    };

    let time = 0;
    const render = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.016;

      // Draw constellation lines
      constellations.forEach(([i, j, dist]) => {
        const alpha = Math.max(0, 0.08 - (dist / 120) * 0.06);
        ctx.strokeStyle = `rgba(245, 158, 11, ${alpha})`;
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(stars[i].x, stars[i].y);
        ctx.lineTo(stars[j].x, stars[j].y);
        ctx.stroke();
      });

      // Draw twinkling stars
      stars.forEach((s) => {
        const twinkle =
          Math.sin(time * s.twinkleSpeed * 60 + s.twinklePhase) * 0.3 + 0.7;
        const alpha = s.baseAlpha * twinkle;
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.fillStyle = s.color;
        ctx.shadowColor = s.color;
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // Draw floating embers
      embers.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        ctx.save();
        ctx.globalAlpha = p.alpha * (0.6 + Math.sin(time * 2 + p.x) * 0.4);
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 10;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      // Draw shooting stars
      spawnShootingStar();
      shootingStars = shootingStars.filter((ss) => {
        ss.x += ss.vx;
        ss.y += ss.vy;
        ss.life -= ss.decay;
        if (ss.life <= 0) return false;

        const gradient = ctx.createLinearGradient(
          ss.x,
          ss.y,
          ss.x - (ss.vx / Math.abs(ss.vx)) * ss.length,
          ss.y - (ss.vy / Math.abs(ss.vy)) * ss.length
        );
        gradient.addColorStop(0, `rgba(254, 240, 138, ${ss.life})`);
        gradient.addColorStop(1, `rgba(254, 240, 138, 0)`);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(ss.x, ss.y);
        ctx.lineTo(
          ss.x - (ss.vx / Math.abs(ss.vx)) * ss.length * ss.life,
          ss.y - (ss.vy / Math.abs(ss.vy)) * ss.length * ss.life
        );
        ctx.stroke();
        return true;
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

  // Staggered entrance variants
  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
  };
  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 pt-24 pb-20 overflow-hidden bg-[#04060e]"
    >
      {/* ── Background Layer 1: Celestial Radial Vignette ── */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,#0f152e_0%,#080a18_55%,#04060e_100%)] pointer-events-none" />

      {/* Background Layer 2: Subtle grid for depth */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(rgba(245, 158, 11, 0.12) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Luminous Warm Radial Aura centered behind title */}
      <motion.div
        style={{ y: starsY }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[700px] bg-[radial-gradient(circle,rgba(245,158,11,0.1)_0%,rgba(129,140,248,0.04)_45%,transparent_75%)] blur-[120px] pointer-events-none z-[1]"
      />

      {/* Ambient Top Light Beam */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-b from-[#f59e0b]/8 to-transparent blur-[90px] pointer-events-none z-[1]" />

      {/* Floating Stardust + Constellation Canvas */}
      <motion.canvas
        ref={canvasRef}
        style={{ y: starsY }}
        className="absolute inset-0 pointer-events-none z-[2]"
      />

      {/* ── Golden Snitch Floating Element ── */}
      <motion.div
        animate={{
          y: [-8, 12, -8],
          x: [-5, 8, -5],
          rotate: [0, 5, -3, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[18%] right-[12%] sm:right-[18%] z-[3] pointer-events-none select-none"
      >
        <div className="relative">
          {/* Snitch body */}
          <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-br from-[#fef08a] via-[#f59e0b] to-[#d97706] shadow-[0_0_30px_rgba(245,158,11,0.6),0_0_60px_rgba(245,158,11,0.3)] relative">
            <div className="absolute inset-1 rounded-full bg-gradient-to-br from-white/40 to-transparent" />
          </div>
          {/* Wings */}
          <div className="absolute top-1/2 -translate-y-1/2 -left-4 sm:-left-5 w-5 sm:w-6 h-3 sm:h-4 bg-gradient-to-l from-white/50 to-transparent rounded-full blur-[1px] animate-pulse" />
          <div className="absolute top-1/2 -translate-y-1/2 -right-4 sm:-right-5 w-5 sm:w-6 h-3 sm:h-4 bg-gradient-to-r from-white/50 to-transparent rounded-full blur-[1px] animate-pulse" />
        </div>
      </motion.div>

      {/* Second snitch, smaller, different path */}
      <motion.div
        animate={{
          y: [5, -15, 5],
          x: [3, -10, 3],
          rotate: [0, -4, 2, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        className="absolute bottom-[25%] left-[8%] sm:left-[14%] z-[3] pointer-events-none select-none opacity-50"
      >
        <div className="w-4 h-4 rounded-full bg-gradient-to-br from-[#fef08a] via-[#f59e0b] to-[#d97706] shadow-[0_0_20px_rgba(245,158,11,0.4)]">
          <div className="absolute inset-0.5 rounded-full bg-gradient-to-br from-white/30 to-transparent" />
        </div>
      </motion.div>

      {/* ── Main Hero Content ── */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        style={{ y: titleY }}
        className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center"
      >
        {/* Conclave Badge */}
        <motion.div
          variants={fadeUp}
          style={{ opacity: badgeOpacity }}
          className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full border border-[#f59e0b]/30 bg-[#0a0d1e]/80 backdrop-blur-md mb-8 shadow-[0_0_25px_rgba(245,158,11,0.12)]"
        >
          <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse shadow-[0_0_8px_#10b981]" />
          <span className="font-mono text-[10px] sm:text-xs font-semibold text-[#fef08a] tracking-wider">
            OCTOBER 24 – 26, 2026
          </span>
          <span className="text-white/15">|</span>
          <span className="font-mono text-[10px] sm:text-xs text-[#cbd5e1] flex items-center gap-1">
            <MapPin size={11} className="text-[#818cf8]" />
            GEHU HALDWANI
          </span>
        </motion.div>

        {/* ── Grand Title: NIRVAN '26 ── */}
        <motion.div variants={fadeUp} className="mb-2 relative cursor-default select-none">
          <h1 className="font-magical text-[3.5rem] sm:text-8xl md:text-9xl font-black text-shimmer leading-none tracking-wider drop-shadow-[0_4px_50px_rgba(245,158,11,0.5)] flex items-center justify-center flex-wrap">
            {TITLE_LETTERS.map((char, i) => {
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
                    y: isHovered ? -18 : 0,
                    scale: isHovered ? 1.18 : 1,
                    rotate: isHovered ? (i % 2 === 0 ? 8 : -8) : 0,
                    textShadow: isHovered
                      ? "0 0 30px #fef08a, 0 0 60px #f59e0b, 0 0 90px #f59e0b"
                      : "0 4px 30px rgba(245,158,11,0.3)",
                  }}
                  transition={{ type: "spring", stiffness: 500, damping: 12 }}
                  className="inline-block transition-colors duration-200 cursor-pointer hover:text-white"
                >
                  {char}
                </motion.span>
              );
            })}
            <span className="w-3 sm:w-5" />
            {SUBTITLE_LETTERS.map((char, i) => {
              const idx = TITLE_LETTERS.length + i;
              const isHovered = hoveredLetter === idx;
              return (
                <motion.span
                  key={idx}
                  onMouseEnter={() => {
                    playWandClick();
                    setHoveredLetter(idx);
                  }}
                  onMouseLeave={() => setHoveredLetter(null)}
                  animate={{
                    y: isHovered ? -18 : 0,
                    scale: isHovered ? 1.18 : 1,
                    textShadow: isHovered
                      ? "0 0 30px #fef08a, 0 0 60px #f59e0b"
                      : "0 4px 30px rgba(245,158,11,0.3)",
                  }}
                  transition={{ type: "spring", stiffness: 500, damping: 12 }}
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
          variants={fadeUp}
          className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-[#fef08a]/90 italic mb-10 drop-shadow-md tracking-wide"
        >
          Where Ideas Become Innovation
        </motion.p>

        {/* ── Countdown Timer ── */}
        <motion.div
          variants={fadeUp}
          className="mb-12 w-full flex flex-col items-center justify-center"
        >
          <CountdownTimer />
        </motion.div>

        {/* ── Action Buttons ── */}
        <motion.div
          variants={fadeUp}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <button
            onClick={() => scrollTo("events")}
            className="btn-gold flex items-center gap-2.5 cursor-pointer shadow-[0_0_30px_rgba(245,158,11,0.35)] group"
          >
            <span>EXPLORE EVENTS</span>
            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-1"
            />
          </button>

          <button
            onClick={() => {
              playSpellSound();
              onOpenRegister();
            }}
            className="btn-outline-magic flex items-center gap-2.5 cursor-pointer group"
          >
            <Sparkles
              size={16}
              className="text-[#f59e0b] transition-transform group-hover:rotate-12"
            />
            <span>REGISTER NOW</span>
          </button>
        </motion.div>
      </motion.div>

      {/* ── Scroll Down Indicator ── */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        onClick={() => scrollTo("about")}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5 cursor-pointer group"
      >
        <span className="label-mono text-[9px] text-[#94a3b8] tracking-[0.2em] group-hover:text-[#fef08a] transition-colors">
          SCROLL
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={18} className="text-[#f59e0b]/70" />
        </motion.div>
        <div className="w-px h-8 bg-gradient-to-b from-[#f59e0b]/40 to-transparent" />
      </motion.button>
    </section>
  );
}
