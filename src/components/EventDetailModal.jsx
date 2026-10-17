import { useEffect } from "react";
import {
  X,
  CalendarDays,
  Clock,
  MapPin,
  Users,
  Trophy,
  IndianRupee,
  ShieldCheck,
  FileText,
  ArrowRight,
} from "lucide-react";
import { playSpellSound, playWandClick } from "../utils/audio";

export default function EventDetailModal({ event, isOpen, onClose, onRegister }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !event) return null;

  const handleEnroll = () => {
    playSpellSound();
    onClose();
    if (onRegister) onRegister(event.slug);
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Clean Parchment Modal Frame */}
      <div className="relative w-full max-w-4xl max-h-[92vh] bg-[#0c0f1d] border border-[#f59e0b]/40 rounded-2xl shadow-[0_0_50px_rgba(0,0,0,0.95)] overflow-hidden flex flex-col z-10 animate-fade-in my-auto">
        {/* Header bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#2a3154] bg-[#080a14]">
          <div className="flex items-center gap-3">
            <span className="font-magical text-base sm:text-lg font-bold text-shimmer">
              EVENT SPECIFICATIONS
            </span>
            <span className="text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full border border-white/20 bg-white/5 text-[#cbd5e1]">
              {event.category}
            </span>
          </div>
          <button
            onClick={() => {
              playWandClick();
              onClose();
            }}
            className="p-1.5 rounded-lg border border-[#2a3154] text-[#cbd5e1] hover:text-white hover:border-[#f59e0b] hover:bg-[#f59e0b]/10 transition-all cursor-pointer"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-6 space-y-7 flex-1">
          {/* Hero Banner / Split */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {event.image && (
              <div className="md:col-span-5 rounded-xl overflow-hidden border border-[#f59e0b]/30 shadow-lg relative aspect-[4/3] md:aspect-[3/4] bg-[#05060d]">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c0f1d] via-transparent to-transparent opacity-50" />
              </div>
            )}

            <div className={event.image ? "md:col-span-7" : "md:col-span-12"}>
              <span className="label-mono text-[#f59e0b] text-xs tracking-wider block mb-1 font-semibold">
                {event.subtitle || "Championship Event"}
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#fef08a] mb-3 leading-tight">
                {event.title}
              </h2>
              <p className="text-[#cbd5e1] text-sm sm:text-base leading-relaxed mb-6 font-body">
                {event.description}
              </p>

              {/* Quick Info Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                <div className="p-3 rounded-lg bg-[#14182c]/80 border border-[#2a3154]">
                  <div className="flex items-center gap-1.5 text-xs text-[#cbd5e1] font-mono">
                    <Trophy size={14} className="text-[#f59e0b]" />
                    <span>PRIZE POOL</span>
                  </div>
                  <span className="font-display text-lg font-bold text-[#fef08a] block mt-1">
                    {event.prize}
                  </span>
                </div>

                <div className="p-3 rounded-lg bg-[#14182c]/80 border border-[#2a3154]">
                  <div className="flex items-center gap-1.5 text-xs text-[#cbd5e1] font-mono">
                    <Users size={14} className="text-[#818cf8]" />
                    <span>TEAM SIZE</span>
                  </div>
                  <span className="font-body text-sm font-semibold text-white block mt-1">
                    {event.teamSize}
                  </span>
                </div>

                <div className="p-3 rounded-lg bg-[#14182c]/80 border border-[#2a3154]">
                  <div className="flex items-center gap-1.5 text-xs text-[#cbd5e1] font-mono">
                    <IndianRupee size={14} className="text-[#10b981]" />
                    <span>ENTRY FEE</span>
                  </div>
                  <span className="font-body text-sm font-semibold text-white block mt-1">
                    {event.fee}
                  </span>
                </div>

                <div className="p-3 rounded-lg bg-[#14182c]/80 border border-[#2a3154]">
                  <div className="flex items-center gap-1.5 text-xs text-[#cbd5e1] font-mono">
                    <CalendarDays size={14} className="text-[#a855f7]" />
                    <span>DATE</span>
                  </div>
                  <span className="font-body text-xs text-white block mt-1 font-medium">
                    {event.date}
                  </span>
                </div>

                <div className="p-3 rounded-lg bg-[#14182c]/80 border border-[#2a3154]">
                  <div className="flex items-center gap-1.5 text-xs text-[#cbd5e1] font-mono">
                    <Clock size={14} className="text-[#f59e0b]" />
                    <span>TIME</span>
                  </div>
                  <span className="font-body text-xs text-white block mt-1 font-medium">
                    {event.time} ({event.duration})
                  </span>
                </div>

                <div className="p-3 rounded-lg bg-[#14182c]/80 border border-[#2a3154]">
                  <div className="flex items-center gap-1.5 text-xs text-[#cbd5e1] font-mono">
                    <MapPin size={14} className="text-[#ef4444]" />
                    <span>VENUE</span>
                  </div>
                  <span className="font-body text-xs text-white block mt-1 font-medium truncate" title={event.venue}>
                    {event.venue}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Rules Section */}
          <div className="border-t border-[#2a3154] pt-6">
            <h3 className="font-display text-xl font-bold text-[#fef08a] mb-4 flex items-center gap-2">
              <FileText size={18} className="text-[#f59e0b]" />
              Competition Rules & Guidelines
            </h3>
            <div className="space-y-2.5">
              {event.rules?.map((rule, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3 rounded-lg bg-[#111424] border border-[#1f2542] text-xs sm:text-sm text-[#cbd5e1]"
                >
                  <span className="font-mono text-xs text-[#f59e0b] px-1.5 py-0.5 rounded bg-[#f59e0b]/10 border border-[#f59e0b]/30 shrink-0 font-bold">
                    {String(idx + 1).padStart(2, "0")}
                  </span>
                  <span>{rule}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Eligibility Section */}
          {event.eligibility && (
            <div className="border-t border-[#2a3154] pt-6">
              <h3 className="font-display text-xl font-bold text-[#fef08a] mb-3 flex items-center gap-2">
                <ShieldCheck size={18} className="text-[#818cf8]" />
                Eligibility Criteria
              </h3>
              <ul className="list-disc list-inside space-y-1.5 text-xs sm:text-sm text-[#cbd5e1]">
                {event.eligibility.map((item, idx) => (
                  <li key={idx} className="leading-relaxed">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 border-t border-[#2a3154] bg-[#080a14] flex flex-wrap items-center justify-between gap-4">
          <span className="text-xs font-mono text-[#cbd5e1]">
            Valid college photo ID required upon entry.
          </span>
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-[#2a3154] text-xs font-mono text-[#cbd5e1] hover:text-white cursor-pointer"
            >
              CLOSE
            </button>
            <button
              onClick={handleEnroll}
              className="btn-gold !py-2.5 !px-5 text-xs sm:text-sm tracking-wider flex items-center gap-2 cursor-pointer shadow-[0_0_15px_rgba(245,158,11,0.4)]"
            >
              <span>REGISTER FOR {event.title.toUpperCase()}</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
