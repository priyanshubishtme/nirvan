import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mic,
  CalendarDays,
  Clock,
  MapPin,
  ExternalLink,
  X,
  UserCheck,
  Sparkles,
} from "lucide-react";
import { speakers } from "../data/speakers";
import { playSpellSound, playWandClick } from "../utils/audio";

const categories = ["All", "Keynote", "Workshop", "Panel"];

export default function SpeakersSection() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedSpeaker, setSelectedSpeaker] = useState(null);

  const filtered =
    activeCategory === "All"
      ? speakers
      : speakers.filter((s) => s.category === activeCategory);

  const handleSpeakerClick = (speaker) => {
    playSpellSound();
    setSelectedSpeaker(speaker);
  };

  return (
    <section id="speakers" className="relative py-28 px-4 sm:px-8 bg-[#05060c] overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-shimmer mb-4">
            Guest Speakers & Mentors
          </h2>
          <p className="font-body text-[#cbd5e1] max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
            Learn from industry pioneers, engineering leaders, and researchers driving innovations in AI, robotics, and cyber defense.
          </p>
          <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-[#f59e0b] to-transparent mx-auto mt-6 opacity-60" />
        </motion.div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => {
                  playWandClick();
                  setActiveCategory(cat);
                }}
                className={`px-4 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all cursor-pointer ${
                  isActive
                    ? "bg-[#f59e0b] text-[#070810] font-bold shadow-[0_0_15px_rgba(245,158,11,0.4)]"
                    : "bg-[#0d1020] text-[#cbd5e1] border border-[#2a3154] hover:border-[#f59e0b]/50"
                }`}
              >
                {cat.toUpperCase()}
              </button>
            );
          })}
        </div>

        {/* Speakers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {filtered.map((speaker, idx) => (
            <motion.div
              key={speaker.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className="parchment-card rounded-2xl overflow-hidden border border-[#f59e0b]/25 p-6 flex flex-col justify-between group hover:border-[#f59e0b]/60 transition-all shadow-[0_10px_30px_rgba(0,0,0,0.6)]"
            >
              <div>
                {/* Speaker Portrait Avatar */}
                <div className="relative w-20 h-20 mx-auto mb-4 rounded-2xl p-1 bg-gradient-to-tr from-[#f59e0b] via-[#818cf8] to-[#fef08a] shadow-[0_0_20px_rgba(245,158,11,0.25)]">
                  <div className="w-full h-full rounded-[14px] bg-[#0c0f1e] flex items-center justify-center font-display text-2xl font-black text-[#fef08a]">
                    {speaker.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                </div>

                <div className="text-center mb-4">
                  <span className="text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full border border-[#f59e0b]/30 bg-[#f59e0b]/10 text-[#fef08a] inline-block mb-1.5 font-semibold">
                    {speaker.category}
                  </span>
                  <h3 className="font-display text-xl font-bold text-[#fef08a]">
                    {speaker.name}
                  </h3>
                  <div className="text-xs text-[#cbd5e1] font-mono mt-0.5">
                    <span>{speaker.role}</span>
                    <span className="text-stone-500 mx-1">•</span>
                    <span className="text-[#818cf8] font-semibold">{speaker.org}</span>
                  </div>
                </div>

                <p className="text-xs text-[#cbd5e1] font-body leading-relaxed line-clamp-3 text-center mb-5">
                  {speaker.bio}
                </p>
              </div>

              {/* Action Button: View Profile */}
              <div className="pt-4 border-t border-[#2a3154]">
                <button
                  onClick={() => handleSpeakerClick(speaker)}
                  className="w-full py-2.5 px-4 rounded-xl border border-[#2a3154] text-xs font-mono text-[#cbd5e1] hover:text-white hover:border-[#f59e0b] hover:bg-[#f59e0b]/10 transition-all flex items-center justify-center gap-2 cursor-pointer font-medium"
                >
                  <UserCheck size={14} className="text-[#f59e0b]" />
                  <span>VIEW FULL PROFILE & SESSIONS</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Interactive Speaker Profile Modal (Flow 5 from Wireframe) */}
      <AnimatePresence>
        {selectedSpeaker && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/85 backdrop-blur-md"
              onClick={() => setSelectedSpeaker(null)}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-lg bg-[#0d1020] border border-[#f59e0b]/40 rounded-2xl shadow-2xl p-6 sm:p-8 z-10 animate-fade-in"
            >
              <button
                onClick={() => setSelectedSpeaker(null)}
                className="absolute top-4 right-4 p-1.5 rounded-lg border border-[#2a3154] text-stone-400 hover:text-white hover:border-[#f59e0b] cursor-pointer"
              >
                <X size={18} />
              </button>

              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-tr from-[#f59e0b] to-[#818cf8] p-0.5">
                  <div className="w-full h-full rounded-[10px] bg-[#0c0f1e] flex items-center justify-center font-display text-xl font-bold text-[#fef08a]">
                    {selectedSpeaker.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-[#f59e0b] uppercase font-semibold">
                    {selectedSpeaker.category} SPEAKER
                  </span>
                  <h3 className="font-display text-2xl font-bold text-white leading-tight">
                    {selectedSpeaker.name}
                  </h3>
                  <p className="text-xs font-mono text-[#cbd5e1]">
                    {selectedSpeaker.role} • {selectedSpeaker.org}
                  </p>
                </div>
              </div>

              <div className="space-y-4 text-sm font-body text-[#cbd5e1] leading-relaxed mb-6">
                <p>{selectedSpeaker.bio}</p>
              </div>

              {/* Sessions list */}
              <div className="border-t border-[#2a3154] pt-4 space-y-2.5">
                <span className="label-mono text-[10px] text-[#f59e0b] block font-bold">
                  SCHEDULED SESSIONS AT NIRVAN '26
                </span>
                {selectedSpeaker.sessions?.map((sess, sIdx) => (
                  <div
                    key={sIdx}
                    className="p-3 rounded-xl bg-[#080a14] border border-[#1f2542] text-xs"
                  >
                    <div className="flex items-center justify-between font-mono text-[#fef08a] mb-1">
                      <span>{sess.day}</span>
                      <span>{sess.time}</span>
                    </div>
                    <span className="font-display text-sm font-semibold text-white">
                      {sess.title}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
