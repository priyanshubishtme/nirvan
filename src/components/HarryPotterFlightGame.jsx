import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Trophy, RotateCcw } from "lucide-react";
import { playSpellSound, playWandClick } from "../utils/audio";

const SPELLS = [
  "Accio!",
  "Lumos Maxima!",
  "Expecto Patronum!",
  "Wingardium Leviosa!",
  "Expelliarmus!",
];

export default function HarryPotterFlightGame() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  // Game state
  const [housePoints, setHousePoints] = useState(150);
  const [snitchCatches, setSnitchCatches] = useState(0);
  const [activeSpell, setActiveSpell] = useState(null);
  const [isSnitchCaught, setIsSnitchCaught] = useState(false);
  const [notification, setNotification] = useState("Click anywhere to steer Harry & chase the Snitch!");

  // Harry position and target
  const harryRef = useRef({
    x: 180,
    y: 160,
    vx: 1.5,
    vy: 0.8,
    angle: 15,
    targetX: null,
    targetY: null,
    isChasing: false,
  });

  // Snitch position
  const snitchRef = useRef({
    x: 450,
    y: 120,
    vx: 2.2,
    vy: 1.4,
    timer: 0,
    captured: false,
  });

  // Particles trail
  const sparksRef = useRef([]);

  // Catch Snitch handler
  const catchSnitch = useCallback((byHarry = false) => {
    if (snitchRef.current.captured) return;
    snitchRef.current.captured = true;
    setIsSnitchCaught(true);
    playSpellSound();

    const newPoints = housePoints + 150;
    setHousePoints(newPoints);
    setSnitchCatches((prev) => prev + 1);
    setNotification("🏆 GOLDEN SNITCH CAUGHT! +150 POINTS TO GRYFFINDOR!");

    // Burst golden sparks at Snitch position
    const sx = snitchRef.current.x;
    const sy = snitchRef.current.y;
    for (let i = 0; i < 28; i++) {
      const angle = (Math.PI * 2 * i) / 28;
      const speed = Math.random() * 4 + 2;
      sparksRef.current.push({
        x: sx,
        y: sy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        radius: Math.random() * 3 + 1.5,
        alpha: 1,
        color: i % 2 === 0 ? "#ffffff" : "#fef08a",
      });
    }

    // Respawn Snitch after 3.5 seconds
    setTimeout(() => {
      const container = containerRef.current;
      if (container) {
        snitchRef.current.x = Math.random() * (container.clientWidth - 160) + 80;
        snitchRef.current.y = Math.random() * 200 + 60;
        snitchRef.current.vx = (Math.random() - 0.5) * 4;
        snitchRef.current.vy = (Math.random() - 0.5) * 3;
      }
      snitchRef.current.captured = false;
      setIsSnitchCaught(false);
      setNotification("The Golden Snitch has darted back into the air! Catch it!");
    }, 3500);
  }, [housePoints]);

  // Click on hero to steer Harry
  const handleHeroClick = (e) => {
    // If clicked on an interactive button or link, don't override
    if (
      e.target.tagName === "BUTTON" ||
      e.target.tagName === "A" ||
      e.target.closest("button") ||
      e.target.closest("a")
    ) {
      return;
    }

    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    harryRef.current.targetX = clickX;
    harryRef.current.targetY = clickY;
    harryRef.current.isChasing = true;

    // Trigger spell announcement
    const spellName = SPELLS[Math.floor(Math.random() * SPELLS.length)];
    setActiveSpell({ name: spellName, x: clickX, y: clickY });
    playWandClick();

    setTimeout(() => {
      setActiveSpell(null);
    }, 1200);

    // Add target ripple sparks
    for (let i = 0; i < 8; i++) {
      sparksRef.current.push({
        x: clickX,
        y: clickY,
        vx: (Math.random() - 0.5) * 3,
        vy: (Math.random() - 0.5) * 3,
        radius: Math.random() * 2 + 1,
        alpha: 1,
        color: "#f59e0b",
      });
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext("2d");
    let animId;

    const handleResize = () => {
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    // Initial position of Harry
    harryRef.current.x = Math.min(220, container.clientWidth * 0.25);
    harryRef.current.y = 120;

    let time = 0;

    const loop = () => {
      time += 0.02;
      const width = container.clientWidth;
      const height = container.clientHeight;

      const harry = harryRef.current;
      const snitch = snitchRef.current;

      // 1. Update Snitch
      if (!snitch.captured) {
        snitch.timer += 0.04;
        // Snitch flutter behavior
        snitch.x += snitch.vx + Math.sin(snitch.timer * 3) * 1.5;
        snitch.y += snitch.vy + Math.cos(snitch.timer * 4) * 1.2;

        // Bounce within hero bounds
        if (snitch.x < 40) {
          snitch.x = 40;
          snitch.vx = Math.abs(snitch.vx);
        }
        if (snitch.x > width - 60) {
          snitch.x = width - 60;
          snitch.vx = -Math.abs(snitch.vx);
        }
        if (snitch.y < 40) {
          snitch.y = 40;
          snitch.vy = Math.abs(snitch.vy);
        }
        if (snitch.y > Math.min(height - 100, 360)) {
          snitch.y = Math.min(height - 100, 360);
          snitch.vy = -Math.abs(snitch.vy);
        }

        // Random direction bursts
        if (Math.random() < 0.02) {
          snitch.vx = (Math.random() - 0.5) * 4.5;
          snitch.vy = (Math.random() - 0.5) * 3;
        }

        // Snitch sparkle trail
        if (Math.random() > 0.4) {
          sparksRef.current.push({
            x: snitch.x,
            y: snitch.y,
            vx: (Math.random() - 0.5) * 0.8,
            vy: (Math.random() - 0.5) * 0.8,
            radius: Math.random() * 1.8 + 0.8,
            alpha: 0.9,
            color: "#fef08a",
          });
        }
      }

      // 2. Update Harry Flight
      if (harry.targetX !== null && harry.targetY !== null) {
        // Fly towards target
        const dx = harry.targetX - harry.x;
        const dy = harry.targetY - harry.y;
        const dist = Math.hypot(dx, dy);

        if (dist > 8) {
          const speed = Math.min(dist * 0.06, 9);
          harry.vx = (dx / dist) * speed;
          harry.vy = (dy / dist) * speed;
          harry.angle = Math.atan2(dy, dx) * (180 / Math.PI);
        } else {
          // Arrived at target
          harry.targetX = null;
          harry.targetY = null;
          harry.isChasing = false;
        }
      } else {
        // Natural patrol flight
        const targetHoverY = 130 + Math.sin(time) * 45;
        harry.vy += (targetHoverY - harry.y) * 0.015;
        harry.vx += (Math.sin(time * 0.6) * 2 - harry.vx) * 0.02;

        harry.angle = harry.vx * 7;
      }

      harry.x += harry.vx;
      harry.y += harry.vy;

      // Keep Harry in bounds
      if (harry.x < 30) {
        harry.x = 30;
        harry.vx = 2;
      }
      if (harry.x > width - 80) {
        harry.x = width - 80;
        harry.vx = -2;
      }

      // Check collision between Harry and Snitch
      if (!snitch.captured) {
        const distToSnitch = Math.hypot(harry.x - snitch.x, harry.y - snitch.y);
        if (distToSnitch < 45) {
          catchSnitch(true);
        }
      }

      // Trail from Harry's Nimbus 2000 broom bristles & wand
      sparksRef.current.push({
        x: harry.x - (harry.vx >= 0 ? 30 : -30),
        y: harry.y + 12,
        vx: (Math.random() - 0.5) * 0.8 - harry.vx * 0.2,
        vy: (Math.random() - 0.5) * 0.8 + 0.4,
        radius: Math.random() * 2.2 + 0.8,
        alpha: 0.8,
        color: Math.random() > 0.5 ? "#f59e0b" : "#ef4444", // Gryffindor gold & scarlet sparks
      });

      // 3. Render sparks on canvas
      ctx.clearRect(0, 0, width, height);

      for (let i = sparksRef.current.length - 1; i >= 0; i--) {
        const p = sparksRef.current[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= 0.025;

        if (p.alpha <= 0) {
          sparksRef.current.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 6;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      // Update DOM positions of Harry and Snitch via styles
      const harryEl = document.getElementById("flying-harry-avatar");
      if (harryEl) {
        const flip = harry.vx < 0 ? -1 : 1;
        harryEl.style.transform = `translate3d(${harry.x - 45}px, ${harry.y - 40}px, 0) scaleX(${flip}) rotate(${
          harry.angle * flip
        }deg)`;
      }

      const snitchEl = document.getElementById("flying-golden-snitch");
      if (snitchEl) {
        snitchEl.style.transform = `translate3d(${snitch.x - 14}px, ${snitch.y - 14}px, 0)`;
      }

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, [catchSnitch]);

  return (
    <div
      ref={containerRef}
      onClick={handleHeroClick}
      className="absolute inset-0 overflow-hidden z-[5] pointer-events-auto cursor-crosshair select-none"
    >
      {/* ── Particle Trail Canvas ── */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
      />

      {/* ── Minimalist Gryffindor Game HUD Status Bar (Positioned at bottom for pristine layout) ── */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3 px-4 py-1.5 rounded-full bg-[#080b18]/90 border border-[#f59e0b]/40 backdrop-blur-md shadow-[0_0_20px_rgba(245,158,11,0.25)] text-xs font-mono pointer-events-auto">
        <div className="flex items-center gap-1.5 text-[#fef08a] font-bold">
          <Trophy size={13} className="text-[#f59e0b]" />
          <span>GRYFFINDOR:</span>
          <span className="text-[#f59e0b] font-mono font-black text-sm">{housePoints} PTS</span>
        </div>

        <span className="text-white/25">•</span>

        <div className="hidden sm:flex items-center gap-1.5 text-[#cbd5e1] text-[11px]">
          <span className="text-amber-400">🪶</span>
          <span>Snitches Caught: <strong className="text-white">{snitchCatches}</strong></span>
        </div>

        <span className="hidden sm:inline text-white/25">•</span>

        <span className="text-[10px] text-[#fde047] font-semibold tracking-wider uppercase">
          {notification}
        </span>
      </div>

      {/* ── Flying Harry Potter on Nimbus 2000 Avatar ── */}
      <div
        id="flying-harry-avatar"
        className="absolute top-0 left-0 w-24 h-20 pointer-events-none transition-transform duration-75 will-change-transform filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.8)]"
        style={{ transformOrigin: "45px 35px" }}
      >
        <svg
          viewBox="0 0 100 80"
          className="w-full h-full overflow-visible"
        >
          {/* Nimbus 2000 Broomstick Handle */}
          <path
            d="M 5 62 Q 45 42 85 24"
            stroke="#5c2c16"
            strokeWidth="5"
            strokeLinecap="round"
          />
          {/* Gold Inlay Rings on Handle */}
          <line x1="25" y1="53" x2="27" y2="52" stroke="#f59e0b" strokeWidth="6" strokeLinecap="round" />
          <line x1="45" y1="42" x2="47" y2="41" stroke="#f59e0b" strokeWidth="6" strokeLinecap="round" />

          {/* Broomstick Tail Bristles / Twigs */}
          <path
            d="M 5 62 C -10 68, -12 74, -6 78 C 0 76, 12 72, 18 64 Z"
            fill="#854d0e"
            stroke="#451a03"
            strokeWidth="1.5"
          />
          <path
            d="M 4 60 C -8 63, -10 70, 0 72"
            stroke="#ca8a04"
            strokeWidth="1.5"
            strokeLinecap="round"
          />

          {/* Harry's Billowing Black Robe */}
          <path
            d="M 22 55 Q 12 60 18 42 Q 35 32 46 44 Q 38 52 22 55 Z"
            fill="#0f172a"
            stroke="#020617"
            strokeWidth="1.5"
          />

          {/* Gryffindor Scarlet & Gold Scarf Fluttering */}
          <path
            d="M 46 36 Q 30 38 20 46 Q 28 50 48 42 Z"
            fill="#740001"
            stroke="#d3a625"
            strokeWidth="1.2"
          />
          <path
            d="M 32 41 L 34 47"
            stroke="#d3a625"
            strokeWidth="2.5"
          />
          <path
            d="M 24 45 L 26 49"
            stroke="#d3a625"
            strokeWidth="2.5"
          />

          {/* Harry's Torso & Arm Reaching Out with Wand */}
          <path
            d="M 42 42 Q 48 34 56 36 Q 64 38 72 32"
            stroke="#0f172a"
            strokeWidth="7"
            strokeLinecap="round"
          />

          {/* Harry's Hand Holding Wand */}
          <circle cx="73" cy="31" r="3" fill="#fde047" />

          {/* Holly & Phoenix Feather Wand */}
          <line x1="74" y1="30" x2="88" y2="20" stroke="#78350f" strokeWidth="2.2" strokeLinecap="round" />
          {/* Wand Tip Lumos Sparkle */}
          <circle cx="89" cy="19" r="3" fill="#ffffff" />
          <circle cx="89" cy="19" r="6" fill="#fef08a" opacity="0.8" />

          {/* Harry's Head */}
          <circle cx="52" cy="24" r="10" fill="#fcd34d" />

          {/* Iconic Messy Black Hair */}
          <path
            d="M 42 22 Q 44 12 53 13 Q 63 12 63 20 Q 60 14 52 16 Q 44 18 42 22 Z"
            fill="#020617"
          />
          {/* Stray Hair tufts */}
          <path d="M 45 14 Q 48 8 54 11" stroke="#020617" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M 56 12 Q 62 8 64 16" stroke="#020617" strokeWidth="2.5" strokeLinecap="round" />

          {/* Iconic Round Glasses */}
          <circle cx="56" cy="24" r="3.5" fill="none" stroke="#020617" strokeWidth="1.2" />
          <circle cx="61" cy="23" r="3.5" fill="none" stroke="#020617" strokeWidth="1.2" />
          <line x1="59.5" y1="23.5" x2="57.5" y2="23.5" stroke="#020617" strokeWidth="1.2" />

          {/* Lightning Bolt Scar on Forehead */}
          <path
            d="M 53 17 L 55 20 L 53 20 L 55 23"
            stroke="#b91c1c"
            strokeWidth="1"
            fill="none"
          />
        </svg>
      </div>

      {/* ── Interactive Golden Snitch ── */}
      <div
        id="flying-golden-snitch"
        onClick={(e) => {
          e.stopPropagation();
          catchSnitch(false);
        }}
        className={`absolute top-0 left-0 w-8 h-8 cursor-pointer transition-opacity duration-300 will-change-transform z-10 ${
          isSnitchCaught ? "opacity-0 scale-150" : "opacity-100 hover:scale-125"
        }`}
      >
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Left Wing Fluttering */}
          <motion.div
            animate={{ rotate: [-35, 35, -35], scaleY: [0.6, 1.2, 0.6] }}
            transition={{ repeat: Infinity, duration: 0.12, ease: "linear" }}
            className="absolute -left-3.5 top-0 w-4 h-2.5 bg-gradient-to-l from-white/90 to-amber-200/40 rounded-full border border-white/60 blur-[0.3px]"
            style={{ transformOrigin: "right center" }}
          />

          {/* Right Wing Fluttering */}
          <motion.div
            animate={{ rotate: [35, -35, 35], scaleY: [0.6, 1.2, 0.6] }}
            transition={{ repeat: Infinity, duration: 0.12, ease: "linear" }}
            className="absolute -right-3.5 top-0 w-4 h-2.5 bg-gradient-to-r from-white/90 to-amber-200/40 rounded-full border border-white/60 blur-[0.3px]"
            style={{ transformOrigin: "left center" }}
          />

          {/* Golden Sphere Core */}
          <div className="w-5 h-5 rounded-full bg-[radial-gradient(circle_at_35%_35%,#ffffff_0%,#fef08a_30%,#f59e0b_70%,#b45309_100%)] shadow-[0_0_15px_#fef08a,0_0_30px_#f59e0b] border border-amber-200" />
        </div>
      </div>

      {/* ── Active Spell Popover at Target ── */}
      <AnimatePresence>
        {activeSpell && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: -25 }}
            exit={{ opacity: 0, scale: 1.2, y: -40 }}
            transition={{ duration: 0.4 }}
            className="absolute pointer-events-none z-30 font-display font-black text-sm sm:text-base text-[#fef08a] px-3 py-1 rounded-full bg-[#080b18]/90 border border-[#f59e0b] shadow-[0_0_25px_rgba(245,158,11,0.8)]"
            style={{
              left: `${activeSpell.x - 40}px`,
              top: `${activeSpell.y - 20}px`,
            }}
          >
            ✦ {activeSpell.name}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
