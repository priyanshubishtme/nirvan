import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, MapPin, ChevronDown, ChevronUp, Calendar, Wand2, Sparkles } from "lucide-react";
import { schedule } from "../data/schedule";
import { playWandClick } from "../utils/audio";

const dayOptions = [
  { key: "day1", label: "Day 1", date: "Oct 24, 2026", focus: "Opening Ceremony & Workshops" },
  { key: "day2", label: "Day 2", date: "Oct 25, 2026", focus: "HackSprint & Tournaments" },
  { key: "day3", label: "Day 3", date: "Oct 26, 2026", focus: "Project Expo & Valediction" },
];

const categoryFilters = ["All", "Tech", "Design", "Gaming", "Keynote"];

export default function ScheduleSection() {
  const [activeDay, setActiveDay] = useState("day1");
  const [activeCategory, setActiveCategory] = useState("All");
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(0);

  const currentItems = (schedule[activeDay]?.items || []).filter((item) => {
    if (activeCategory === "All") return true;
    return item.category === activeCategory;
  });

  const handleDaySelect = (key) => {
    playWandClick();
    setActiveDay(key);
    setExpandedIndex(null);
    setHoveredIndex(0);
  };

  const handleCategorySelect = (cat) => {
    playWandClick();
    setActiveCategory(cat);
    setExpandedIndex(null);
    setHoveredIndex(0);
  };

  const toggleExpand = (idx) => {
    playWandClick();
    setExpandedIndex(expandedIndex === idx ? null : idx);
  };

  const getCategoryColor = (cat) => {
    switch (cat) {
      case "Keynote":
        return "text-[#fef08a] border-[#f59e0b]/40 bg-[#f59e0b]/15";
      case "Tech":
        return "text-[#818cf8] border-[#818cf8]/40 bg-[#818cf8]/15";
      case "Design":
        return "text-[#f472b6] border-[#f472b6]/40 bg-[#f472b6]/15";
      case "Gaming":
        return "text-[#10b981] border-[#10b981]/40 bg-[#10b981]/15";
      default:
        return "text-[#cbd5e1] border-[#2a3154] bg-[#12162e]";
    }
  };

  return (
    <section id="schedule" className="relative py-28 px-4 sm:px-8 bg-[#070810] overflow-hidden">
      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="label-mono text-[#f59e0b] text-xs tracking-[0.2em] block mb-2 font-semibold">
            EVENT TIMELINE
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-shimmer mb-4">
            Festival Schedule
          </h2>
          <p className="font-body text-[#cbd5e1] max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
            Plan your itinerary across all three days. Filter by day or category to locate specific sessions and venues.
          </p>
          <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-[#f59e0b] to-transparent mx-auto mt-6 opacity-60" />
        </motion.div>

        {/* Dual Interactive Controls: Day Tabs (Left/Top) & Category Filter (Right/Bottom) */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 pb-6 border-b border-[#2a3154]">
          {/* Day Selector */}
          <div className="flex items-center gap-2 w-full md:w-auto">
            {dayOptions.map(({ key, label, date }) => {
              const isActive = activeDay === key;
              return (
                <button
                  key={key}
                  onClick={() => handleDaySelect(key)}
                  className={`flex-1 md:flex-initial px-4 py-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                    isActive
                      ? "bg-[#101428] border-[#f59e0b] shadow-[0_0_15px_rgba(245,158,11,0.25)]"
                      : "bg-[#090b14] border-[#2a3154] hover:border-[#f59e0b]/40"
                  }`}
                >
                  <span
                    className={`font-mono text-xs font-bold block ${
                      isActive ? "text-[#fef08a]" : "text-[#cbd5e1]"
                    }`}
                  >
                    {label}
                  </span>
                  <span className="text-[10px] font-mono text-stone-400 block">
                    {date}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Category Filter Buttons */}
          <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto justify-start md:justify-end">
            {categoryFilters.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => handleCategorySelect(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
                    isActive
                      ? "bg-[#f59e0b] text-[#070810] font-bold"
                      : "bg-[#0c0f1e] text-[#cbd5e1] border border-[#2a3154] hover:border-white/30"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Background Editorial Watermark */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 font-display text-7xl sm:text-9xl font-black text-white/[0.02] tracking-[0.25em] uppercase select-none pointer-events-none whitespace-nowrap">
          CHRONOLOGY
        </div>

        {/* Clean, Polished Timeline List */}
        <motion.div
          key={`${activeDay}-${activeCategory}`}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="relative border-l-2 border-[#f59e0b]/35 ml-3 sm:ml-8 pl-5 sm:pl-8 space-y-6"
        >
          {currentItems.length === 0 ? (
            <div className="p-8 text-center rounded-xl bg-[#0d1020] border border-[#2a3154] text-[#cbd5e1] font-mono text-sm">
              No sessions scheduled for this category on this day.
            </div>
          ) : (
            currentItems.map((item, idx) => {
              const isExpanded = expandedIndex === idx;
              const isHovered = hoveredIndex === idx;
              return (
                <div
                  key={idx}
                  onMouseEnter={() => setHoveredIndex(idx)}
                  className="relative group"
                >
                  {/* Timeline Perfectly Centered Node Dot */}
                  <div
                    className={`absolute -left-[28px] sm:-left-[40px] top-6 w-3.5 h-3.5 rounded-full transition-all duration-300 flex items-center justify-center ${
                      isHovered
                        ? "bg-[#f59e0b] shadow-[0_0_16px_#f59e0b] scale-125 border-2 border-white ring-4 ring-[#f59e0b]/20"
                        : "bg-[#070810] border-2 border-[#f59e0b]"
                    }`}
                  >
                    {isHovered && <span className="w-1 h-1 rounded-full bg-[#070810]" />}
                  </div>

                  {/* Interactive Card */}
                  <div
                    onClick={() => toggleExpand(idx)}
                    className={`parchment-card p-5 sm:p-6 rounded-2xl border transition-all duration-300 cursor-pointer ${
                      isHovered
                        ? "border-[#f59e0b] shadow-[0_10px_30px_rgba(245,158,11,0.2)] bg-[#11152a]"
                        : "border-[#2a3154] hover:border-[#f59e0b]/50"
                    }`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-[#0a0c18] border border-[#f59e0b]/40 font-mono text-xs font-bold text-[#fef08a]">
                          <Clock size={12} className="text-[#f59e0b]" />
                          {item.time}
                        </span>
                        <span
                          className={`text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full border ${getCategoryColor(
                            item.category
                          )}`}
                        >
                          {item.category}
                        </span>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1 text-xs font-mono text-stone-300">
                          <MapPin size={12} className="text-[#ef4444]" />
                          {item.venue}
                        </span>
                        {isExpanded ? (
                          <ChevronUp size={16} className="text-[#f59e0b]" />
                        ) : (
                          <ChevronDown size={16} className="text-stone-400 group-hover:text-white" />
                        )}
                      </div>
                    </div>

                    <h3 className="font-display text-lg sm:text-xl font-bold text-[#fef08a] mb-1 group-hover:text-white transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#cbd5e1] font-body leading-relaxed">
                      {item.description}
                    </p>

                    {/* Expandable Details */}
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="mt-4 pt-3 border-t border-white/10 text-xs font-mono text-stone-300 space-y-1.5"
                      >
                        <div className="flex items-center justify-between">
                          <span>VENUE COORDINATOR:</span>
                          <span className="text-[#fef08a]">Available at Lab Reception</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>ELIGIBILITY:</span>
                          <span className="text-white">All Registered Fest Delegates</span>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </motion.div>
      </div>
    </section>
  );
}
