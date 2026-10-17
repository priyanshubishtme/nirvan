import { useEffect, useState, useRef } from "react";
import { playWandClick } from "../utils/audio";

export default function ElderWandCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHoveringClickable, setIsHoveringClickable] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);

  useEffect(() => {
    // Only show on devices with a mouse/fine pointer
    if (window.matchMedia("(pointer: coarse)").matches) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      // Add minimal, elegant stardust particles
      if (Math.random() > 0.35) {
        particlesRef.current.push({
          x: e.clientX,
          y: e.clientY,
          vx: (Math.random() - 0.5) * 1.2,
          vy: (Math.random() - 0.5) * 1.2 - 0.3,
          radius: Math.random() * 2 + 1,
          alpha: 1,
          decay: Math.random() * 0.04 + 0.035, // short life: ~300ms
          color: Math.random() > 0.4 ? "#fef08a" : "#f59e0b",
        });
      }

      // Detect if hovering over clickable elements
      const target = e.target;
      if (
        target &&
        (target.tagName === "BUTTON" ||
          target.tagName === "A" ||
          target.closest("button") ||
          target.closest("a") ||
          target.getAttribute("role") === "button" ||
          target.classList.contains("cursor-pointer") ||
          window.getComputedStyle(target).cursor === "pointer")
      ) {
        setIsHoveringClickable(true);
      } else {
        setIsHoveringClickable(false);
      }
    };

    const handleMouseDown = (e) => {
      setIsClicking(true);
      // Spawn burst of 8 sparks on click
      for (let i = 0; i < 8; i++) {
        const angle = (Math.PI * 2 * i) / 8 + Math.random() * 0.3;
        const speed = Math.random() * 3 + 1.5;
        particlesRef.current.push({
          x: e.clientX,
          y: e.clientY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          radius: Math.random() * 2.5 + 1.2,
          alpha: 1,
          decay: 0.04,
          color: i % 2 === 0 ? "#ffffff" : "#fef08a",
        });
      }
    };

    const handleMouseUp = () => {
      setIsClicking(false);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeave);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const p = particlesRef.current[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          particlesRef.current.splice(i, 1);
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

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* ── Particle Trail Canvas ── */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-[99998]"
        style={{ mixBlendMode: "screen" }}
      />

      {/* ── Elder Wand Custom Cursor Pointer ── */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-[99999] transition-transform duration-75"
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
        }}
      >
        {/* Wand Graphics container aligned so top-left tip is precisely at cursor point */}
        <div
          className={`relative transition-all duration-200 ${
            isClicking
              ? "scale-90 rotate-[-15deg]"
              : isHoveringClickable
              ? "scale-115 rotate-[5deg]"
              : "scale-100"
          }`}
          style={{ transformOrigin: "0px 0px" }}
        >
          {/* Elder Wand SVG */}
          <svg
            width="34"
            height="34"
            viewBox="0 0 34 34"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="filter drop-shadow-[0_2px_8px_rgba(245,158,11,0.6)]"
          >
            {/* Wand Shaft (wood grain) */}
            <path
              d="M2 2 L26 26"
              stroke="#451a03"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            {/* Wand Core Highlight */}
            <path
              d="M3 3 L25 25"
              stroke="#b45309"
              strokeWidth="2"
              strokeLinecap="round"
            />
            {/* Elder Wand Distinctive Nodules (Elderberry beads) */}
            <circle cx="8" cy="8" r="2.2" fill="#78350f" stroke="#f59e0b" strokeWidth="0.7" />
            <circle cx="14" cy="14" r="2.4" fill="#78350f" stroke="#f59e0b" strokeWidth="0.7" />
            <circle cx="20" cy="20" r="2.6" fill="#78350f" stroke="#f59e0b" strokeWidth="0.7" />

            {/* Glowing Wand Tip (Lumos Spark) */}
            <circle
              cx="2"
              cy="2"
              r={isHoveringClickable ? "3.2" : "2"}
              fill="#ffffff"
            />
            <circle
              cx="2"
              cy="2"
              r={isHoveringClickable ? "5" : "3.5"}
              fill="#fef08a"
              opacity="0.8"
            />
          </svg>

          {/* Wand Glow Aura */}
          <div
            className={`absolute -top-2 -left-2 rounded-full pointer-events-none transition-all duration-200 ${
              isHoveringClickable
                ? "w-7 h-7 bg-[radial-gradient(circle,rgba(254,240,138,0.9)_0%,rgba(245,158,11,0.4)_50%,transparent_75%)] blur-[2px]"
                : "w-5 h-5 bg-[radial-gradient(circle,rgba(254,240,138,0.7)_0%,rgba(245,158,11,0.25)_50%,transparent_70%)] blur-[1px]"
            }`}
          />

          {/* Click Ripple Effect */}
          {isClicking && (
            <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full border border-[#fef08a] bg-[#f59e0b]/20 animate-ping pointer-events-none" />
          )}
        </div>
      </div>
    </>
  );
}
