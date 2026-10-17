import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Trophy,
  Users,
  Clock,
  MapPin,
  ArrowRight,
  Info,
  Search,
  Sparkles,
} from "lucide-react";
import { events } from "../data/events";
import { playSpellSound, playWandClick } from "../utils/audio";

const categories = ["All", "Tech", "Design", "Gaming", "Fun"];

const categoryAccents = {
  Tech: { badge: "border-[#ef4444]/40 bg-[#ef4444]/15 text-[#fca5a5]" },
  Design: { badge: "border-[#f59e0b]/40 bg-[#f59e0b]/15 text-[#fef08a]" },
  Gaming: { badge: "border-[#a855f7]/40 bg-[#a855f7]/15 text-[#e9d5ff]" },
  Fun: { badge: "border-[#10b981]/40 bg-[#10b981]/15 text-[#6ee7b7]" },
  All: { badge: "border-[#818cf8]/40 bg-[#818cf8]/15 text-[#c7d2fe]" },
};

export default function EventsSection({ onOpenDetail, onRegister }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredEvents = useMemo(() => {
    return events.filter((e) => {
      const matchesCategory =
        activeCategory === "All" || e.category === activeCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        e.title.toLowerCase().includes(q) ||
        (e.subtitle && e.subtitle.toLowerCase().includes(q)) ||
        (e.description && e.description.toLowerCase().includes(q)) ||
        (e.tags && e.tags.some((t) => t.toLowerCase().includes(q)));
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const handleCategoryChange = (cat) => {
    playWandClick();
    setActiveCategory(cat);
  };

  return (
    <section id="events" className="relative py-28 px-4 sm:px-8 bg-[#05060c] overflow-hidden">
      {/* Background Editorial Watermark */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 font-display text-7xl sm:text-9xl font-black text-white/[0.02] tracking-[0.25em] uppercase select-none pointer-events-none whitespace-nowrap">
        COMPETITIONS
      </div>

      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-[radial-gradient(circle,rgba(245,158,11,0.04)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 mb-2">
            <Sparkles size={14} className="text-[#f59e0b]" />
            <span className="label-mono text-[#f59e0b] text-xs tracking-[0.2em] font-semibold">
              FEATURED DISCIPLINES & CONTESTS
            </span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-shimmer mb-4">
            Festival Competitions
          </h2>
          <p className="font-body text-[#cbd5e1] max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
            Nine competitive disciplines spanning overnight hackathons, competitive algorithmic duels, cybersecurity CTFs, battle robotics, esports tournaments, and design sprints.
          </p>
          <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-[#f59e0b] to-transparent mx-auto mt-6 opacity-60" />
        </motion.div>

        {/* Search & Category Filter Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 pb-6 border-b border-[#2a3154]">
          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 w-full md:w-auto">
            {categories.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`px-4 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
                    isActive
                      ? "bg-[#f59e0b] text-[#070810] font-bold shadow-[0_0_15px_rgba(245,158,11,0.4)]"
                      : "bg-[#0d1020] text-[#cbd5e1] border border-[#2a3154] hover:border-[#f59e0b]/50 hover:text-white"
                  }`}
                >
                  <span>{cat.toUpperCase()}</span>
                  <span className="text-[10px] opacity-75">
                    (
                    {cat === "All"
                      ? events.length
                      : events.filter((e) => e.category === cat).length}
                    )
                  </span>
                </button>
              );
            })}
          </div>

          {/* Quick Search Input */}
          <div className="relative w-full md:w-72">
            <Search
              size={15}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400"
            />
            <input
              type="text"
              placeholder="Search competitions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#0c0f1e] border border-[#2a3154] rounded-full pl-10 pr-4 py-2 text-xs font-mono text-white placeholder-stone-500 focus:border-[#f59e0b] focus:ring-1 focus:ring-[#f59e0b]/40 outline-none transition-all"
            />
          </div>
        </div>

        {/* Empty Search Result */}
        {filteredEvents.length === 0 && (
          <div className="p-12 text-center rounded-2xl bg-[#0c0f1e] border border-[#2a3154] text-[#cbd5e1] font-mono text-sm max-w-lg mx-auto">
            No events match your search query. Try clearing the search or choosing another category.
          </div>
        )}

        {/* Events Grid with Silky Smooth Fade Transition & Interactive Depth */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          <AnimatePresence mode="popLayout">
            {filteredEvents.map((event) => {
              const accent = categoryAccents[event.category] || categoryAccents.All;
              return (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.2 }}
                  whileHover={{ y: -6, transition: { duration: 0.25 } }}
                  className="parchment-card rounded-2xl overflow-hidden border border-[#f59e0b]/25 flex flex-col justify-between group hover:border-[#f59e0b]/75 transition-all shadow-[0_10px_30px_rgba(0,0,0,0.6)] hover:shadow-[0_15px_40px_rgba(245,158,11,0.22)] cursor-pointer"
                  onClick={() => {
                    playWandClick();
                    onOpenDetail(event);
                  }}
                >
                  <div>
                    {/* Event Artwork Header */}
                    <div className="relative h-52 sm:h-56 overflow-hidden bg-[#090b14] border-b border-[#2a3154]">
                      {event.image ? (
                        <img
                          src={event.image}
                          alt={event.title}
                          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#12162e] to-[#090b14]" />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0c0f1e] via-[#0c0f1e]/40 to-transparent opacity-90" />

                      {/* Category Tag on Top Left */}
                      <div className="absolute top-3 left-3">
                        <span
                          className={`text-[10px] font-mono uppercase px-2.5 py-1 rounded-full border backdrop-blur-md font-semibold ${accent.badge}`}
                        >
                          {event.category}
                        </span>
                      </div>

                      {/* Prize Badge on Bottom */}
                      <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
                        <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#070810]/95 border border-[#f59e0b]/70 shadow-[0_0_15px_rgba(245,158,11,0.2)]">
                          <Trophy size={14} className="text-[#f59e0b]" />
                          <span className="font-display text-sm font-bold text-[#fef08a]">
                            {event.prize}
                          </span>
                        </div>
                        <span className="text-xs font-mono text-[#cbd5e1] bg-black/85 px-2.5 py-1 rounded border border-white/15 font-semibold">
                          Fee: {event.fee}
                        </span>
                      </div>
                    </div>

                    {/* Body Content */}
                    <div className="p-6">
                      <span className="label-mono text-[10px] text-[#f59e0b] block mb-1 font-semibold">
                        {event.subtitle || "Championship Event"}
                      </span>
                      <h3 className="font-display text-2xl font-bold text-[#fef08a] mb-2 group-hover:text-white transition-colors">
                        {event.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-[#cbd5e1] font-body line-clamp-3 leading-relaxed mb-5">
                        {event.shortDescription || event.description}
                      </p>

                      {/* Quick Specs */}
                      <div className="grid grid-cols-2 gap-2 text-xs font-mono text-[#cbd5e1] pt-3 border-t border-[#2a3154]">
                        <div className="flex items-center gap-1.5 truncate">
                          <Users size={13} className="text-[#818cf8] shrink-0" />
                          <span className="truncate">{event.teamSize}</span>
                        </div>
                        <div className="flex items-center gap-1.5 truncate">
                          <Clock size={13} className="text-[#f59e0b] shrink-0" />
                          <span className="truncate">{event.duration}</span>
                        </div>
                        <div className="flex items-center gap-1.5 truncate col-span-2 text-stone-400">
                          <MapPin size={13} className="text-[#ef4444] shrink-0" />
                          <span className="truncate">{event.venue}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card Action Buttons */}
                  <div
                    className="p-6 pt-0 flex items-center gap-3"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      onClick={() => {
                        playWandClick();
                        onOpenDetail(event);
                      }}
                      className="flex-1 py-2.5 px-3 rounded-lg border border-[#2a3154] text-xs font-mono font-medium text-[#cbd5e1] hover:text-white hover:border-[#f59e0b]/50 hover:bg-[#f59e0b]/10 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Info size={14} className="text-[#f59e0b]" />
                      <span>RULES & SPECS</span>
                    </button>

                    <button
                      onClick={() => {
                        playSpellSound();
                        onRegister(event.slug);
                      }}
                      className="flex-1 py-2.5 px-3 rounded-lg bg-gradient-to-r from-[#f59e0b] to-[#d97706] text-[#070810] text-xs font-mono font-bold hover:brightness-110 shadow-[0_0_15px_rgba(245,158,11,0.3)] transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span>REGISTER</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
