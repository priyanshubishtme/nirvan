import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Maximize2, Sparkles } from "lucide-react";
import { playWandClick } from "../utils/audio";

export const galleryItems = [
  {
    id: 1,
    src: "/gallery/hackathon_1.jpg",
    title: "HackSprint Overnight Development",
    category: "Hackathons",
    tag: "HACKATHON",
  },
  {
    id: 2,
    src: "/gallery/ctf_1.jpg",
    title: "CyberQuest Defense Infiltration",
    category: "Cybersecurity",
    tag: "CTF",
  },
  {
    id: 3,
    src: "/gallery/esport_1.jpg",
    title: "Tactical E-Sports Arena",
    category: "Esports",
    tag: "GAMING",
  },
  {
    id: 4,
    src: "/gallery/treasure_1.jpg",
    title: "Campus Cryptic Treasure Hunt",
    category: "Treasure Hunt",
    tag: "ADVENTURE",
  },
  {
    id: 5,
    src: "/gallery/hackathon_3.jpg",
    title: "Collaborative Engineering Sprints",
    category: "Hackathons",
    tag: "TEAMWORK",
  },
  {
    id: 6,
    src: "/gallery/ctf_3.jpg",
    title: "Network Packet Inspection Duel",
    category: "Cybersecurity",
    tag: "SECURITY",
  },
  {
    id: 7,
    src: "/gallery/esport_2.jpg",
    title: "Knockout Esports Bracket Finals",
    category: "Esports",
    tag: "FINALS",
  },
  {
    id: 8,
    src: "/gallery/treasure_2.jpg",
    title: "Decoding Checkpoint Coordinates",
    category: "Treasure Hunt",
    tag: "EXPLORATION",
  },
  {
    id: 9,
    src: "/gallery/hackathon_4.jpg",
    title: "Project Demonstrations & Evaluation",
    category: "Hackathons",
    tag: "PRESENTATION",
  },
];

const galleryTabs = ["All", "Hackathons", "Cybersecurity", "Esports", "Treasure Hunt"];

export default function GallerySection({ onOpenLightbox }) {
  const [activeTab, setActiveTab] = useState("All");
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const dragStartXRef = useRef(null);
  const stageRef = useRef(null);

  const filtered =
    activeTab === "All"
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeTab);

  // When tab changes, reset to center
  useEffect(() => {
    setActiveIndex(0);
  }, [activeTab]);

  // Fast continuous 3D autoscroll every 1.6 seconds (snappy & lively)
  useEffect(() => {
    if (isHovered || filtered.length <= 1) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev < filtered.length - 1 ? prev + 1 : 0));
    }, 1600);
    return () => clearInterval(timer);
  }, [isHovered, filtered.length]);

  const handlePrev = () => {
    playWandClick();
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : filtered.length - 1));
  };

  const handleNext = () => {
    playWandClick();
    setActiveIndex((prev) => (prev < filtered.length - 1 ? prev + 1 : 0));
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [filtered.length]);

  // Mouse move scrub: Moving mouse horizontally brings all gallery cards into view
  const handleMouseMoveScrub = (e) => {
    const stage = stageRef.current;
    if (!stage) return;
    const rect = stage.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, x / rect.width));
    const targetIdx = Math.min(filtered.length - 1, Math.floor(ratio * filtered.length));
    if (targetIdx !== activeIndex) {
      setActiveIndex(targetIdx);
    }
  };

  // Wheel scrub support
  const handleWheel = (e) => {
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
      if (e.deltaX > 20) handleNext();
      else if (e.deltaX < -20) handlePrev();
    } else if (Math.abs(e.deltaY) > 20) {
      if (e.deltaY > 0) handleNext();
      else handlePrev();
    }
  };

  // Touch and drag swipe
  const handlePointerDown = (e) => {
    dragStartXRef.current = e.clientX;
  };

  const handlePointerUp = (e) => {
    if (dragStartXRef.current === null) return;
    const diff = e.clientX - dragStartXRef.current;
    if (diff > 40) {
      handlePrev();
    } else if (diff < -40) {
      handleNext();
    }
    dragStartXRef.current = null;
  };

  return (
    <section id="gallery" className="relative py-28 px-4 sm:px-8 bg-[#05070e] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-[radial-gradient(circle,rgba(245,158,11,0.08)_0%,transparent_70%)] blur-[90px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header with Title and 3D Carousel Arrow Controls */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 mb-2">
              <Sparkles size={14} className="text-[#f59e0b]" />
              <span className="label-mono text-[#f59e0b] text-xs tracking-[0.2em] font-semibold">
                NIRVAN THROUGH THE YEARS
              </span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-shimmer">
              3D Festival Gallery
            </h2>
            <p className="font-body text-[#cbd5e1] text-sm sm:text-base mt-2 max-w-xl">
              Captured moments of intense focus, robot battles, hackathons, and campus camaraderie. Move cursor across the stage or scroll to explore all photos in 3D.
            </p>
          </div>

          {/* Carousel Left & Right Arrow Icons */}
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrev}
              className="p-3.5 rounded-full border border-[#f59e0b]/40 bg-[#0c0f1e]/90 text-[#fef08a] hover:bg-[#f59e0b] hover:text-[#070810] transition-all cursor-pointer shadow-[0_0_15px_rgba(245,158,11,0.2)] hover:scale-110"
              aria-label="Previous gallery photo"
            >
              <ChevronLeft size={22} />
            </button>
            <span className="font-mono text-xs text-[#cbd5e1] select-none">
              <strong className="text-[#fef08a]">{activeIndex + 1}</strong> / {filtered.length}
            </span>
            <button
              onClick={handleNext}
              className="p-3.5 rounded-full border border-[#f59e0b]/40 bg-[#0c0f1e]/90 text-[#fef08a] hover:bg-[#f59e0b] hover:text-[#070810] transition-all cursor-pointer shadow-[0_0_15px_rgba(245,158,11,0.2)] hover:scale-110"
              aria-label="Next gallery photo"
            >
              <ChevronRight size={22} />
            </button>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          {galleryTabs.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => {
                  playWandClick();
                  setActiveTab(tab);
                }}
                className={`px-4 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all cursor-pointer ${
                  isActive
                    ? "bg-[#f59e0b] text-[#070810] font-bold shadow-[0_0_20px_rgba(245,158,11,0.4)]"
                    : "bg-[#0d1020] text-[#cbd5e1] border border-[#2a3154] hover:border-[#f59e0b]/50"
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {/* ── 3D Curved Coverflow Stage (Interactive Mouse Scrubbing) ── */}
        <div
          ref={stageRef}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onMouseMove={handleMouseMoveScrub}
          onWheel={handleWheel}
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          className="relative w-full h-[360px] sm:h-[420px] md:h-[460px] flex items-center justify-center overflow-visible select-none cursor-grab active:cursor-grabbing"
          style={{ perspective: "1100px" }}
        >
          {filtered.map((item, idx) => {
            const offset = idx - activeIndex;
            const isCenter = offset === 0;

            // Render all cards within +/- 4 of center so entire gallery comes into view
            if (Math.abs(offset) > 4) return null;

            // 3D positioning
            let translateX = offset * 185;
            let translateZ = -Math.abs(offset) * 85;
            let rotateY = offset * -26;
            let scale = Math.max(0.68, 1 - Math.abs(offset) * 0.1);
            let opacity = Math.max(0.2, 1 - Math.abs(offset) * 0.22);
            let zIndex = 30 - Math.abs(offset);

            if (isCenter) {
              translateX = 0;
              translateZ = 75;
              rotateY = 0;
              scale = 1.05;
              opacity = 1;
              zIndex = 40;
            }

            return (
              <motion.div
                key={item.id}
                onClick={() => {
                  if (isCenter) {
                    playWandClick();
                    if (onOpenLightbox) {
                      onOpenLightbox(
                        filtered.map((f) => ({ src: f.src, alt: f.title })),
                        idx
                      );
                    }
                  } else {
                    playWandClick();
                    setActiveIndex(idx);
                  }
                }}
                animate={{
                  x: translateX,
                  z: translateZ,
                  rotateY: rotateY,
                  scale: scale,
                  opacity: opacity,
                }}
                transition={{ type: "spring", stiffness: 360, damping: 25 }}
                style={{
                  position: "absolute",
                  zIndex: zIndex,
                  transformStyle: "preserve-3d",
                }}
                className={`w-[280px] sm:w-[380px] md:w-[460px] h-[220px] sm:h-[280px] md:h-[320px] rounded-2xl overflow-hidden border transition-shadow duration-300 ${
                  isCenter
                    ? "border-[#f59e0b] shadow-[0_0_40px_rgba(245,158,11,0.45)] cursor-pointer"
                    : "border-[#2a3154] shadow-[0_15px_30px_rgba(0,0,0,0.8)] cursor-pointer hover:border-[#f59e0b]/60"
                }`}
              >
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-full h-full object-cover object-center select-none"
                />

                {/* Gradient vignette for high contrast typography */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#070810]/95 via-[#070810]/25 to-transparent flex flex-col justify-end p-5 sm:p-6" />

                {/* Tag on Top */}
                <div className="absolute top-3.5 left-3.5">
                  <span className="text-[10px] font-mono uppercase px-3 py-1 rounded-full border border-white/20 bg-[#070810]/90 text-[#fef08a] backdrop-blur-md font-semibold shadow-md">
                    {item.tag}
                  </span>
                </div>

                {/* Center Badge Highlight */}
                {isCenter && (
                  <div className="absolute top-3.5 right-3.5">
                    <span className="text-[10px] font-mono uppercase px-2.5 py-1 rounded-full bg-[#f59e0b] text-[#070810] font-bold shadow-md flex items-center gap-1">
                      <Sparkles size={11} />
                      FEATURED
                    </span>
                  </div>
                )}

                {/* Caption Overlay */}
                <div className="absolute bottom-4 left-4 right-4 sm:bottom-5 sm:left-6 sm:right-6 flex items-end justify-between">
                  <div>
                    <h4 className="font-display text-base sm:text-lg md:text-xl font-bold text-white leading-tight drop-shadow-md">
                      {item.title}
                    </h4>
                    <span className="text-[10px] sm:text-xs font-mono text-[#fde047] block mt-1">
                      {isCenter ? "Click to expand full resolution photo" : "Click to view photo"}
                    </span>
                  </div>
                  <div className={`p-2 sm:p-2.5 rounded-full bg-[#f59e0b] text-[#070810] shadow-md transition-transform ${isCenter ? "scale-110 shadow-[0_0_15px_#f59e0b]" : ""}`}>
                    <Maximize2 size={16} />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ── Interactive Filmstrip Thumbnail Preview Bar (All Photos On Hover) ── */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 mt-8 overflow-x-auto py-2 px-4 no-scrollbar">
          {filtered.map((item, idx) => {
            const isActive = activeIndex === idx;
            return (
              <button
                key={item.id}
                onMouseEnter={() => setActiveIndex(idx)}
                onClick={() => {
                  playWandClick();
                  setActiveIndex(idx);
                }}
                className={`relative rounded-lg overflow-hidden transition-all duration-200 cursor-pointer shrink-0 ${
                  isActive
                    ? "w-14 sm:w-16 h-10 sm:h-12 border-2 border-[#f59e0b] shadow-[0_0_15px_#f59e0b] scale-110"
                    : "w-10 sm:w-12 h-8 sm:h-9 border border-[#2a3154] opacity-50 hover:opacity-100 hover:border-white/50"
                }`}
                aria-label={`Jump to ${item.title}`}
              >
                <img
                  src={item.src}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
