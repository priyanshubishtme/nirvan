import { useState } from "react";
import { motion } from "framer-motion";
import { Award, ExternalLink, Download, Handshake, CheckCircle2 } from "lucide-react";
import { sponsors } from "../data/sponsors";
import { playSpellSound, playWandClick } from "../utils/audio";

export default function SponsorsSection() {
  const [downloaded, setDownloaded] = useState(false);

  const handleDownloadProspectus = () => {
    playSpellSound();
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 4000);
  };

  return (
    <section id="sponsors" className="relative py-28 px-4 sm:px-8 bg-[#05060c] overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Clean, Normal Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="label-mono text-[#f59e0b] text-xs tracking-[0.2em] block mb-2 font-semibold">
            SPONSORS & PARTNERS
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-shimmer mb-4">
            Our Sponsors & Partners
          </h2>
          <p className="font-body text-[#cbd5e1] max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
            Proudly supported by leading technology enterprises, developer tools, and university ecosystems empowering student innovators.
          </p>
          <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-[#f59e0b] to-transparent mx-auto mt-6 opacity-60" />
        </motion.div>

        {/* Title Sponsors */}
        <div className="mb-14">
          <span className="label-mono text-[#fef08a] text-center block mb-6 text-xs tracking-widest font-bold">
            TITLE SPONSORS
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {sponsors.title.map((s) => (
              <a
                key={s.name}
                href={s.website}
                target="_blank"
                rel="noreferrer"
                className="parchment-card p-6 sm:p-8 rounded-2xl border border-[#f59e0b]/40 text-center flex flex-col items-center justify-center group hover:border-[#fef08a] transition-all shadow-[0_4px_25px_rgba(245,158,11,0.15)] cursor-pointer"
              >
                <div className="w-12 h-12 rounded-xl bg-[#f59e0b]/10 border border-[#f59e0b]/30 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                  <Award className="text-[#f59e0b]" size={24} />
                </div>
                <h3 className="font-display text-2xl font-bold text-[#fef08a] group-hover:text-white transition-colors">
                  {s.name}
                </h3>
                <span className="label-mono text-[9px] text-[#cbd5e1] mt-1 flex items-center gap-1">
                  <span>PREMIER TITLE SPONSOR</span>
                  <ExternalLink size={10} />
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* Gold Sponsors */}
        <div className="mb-14">
          <span className="label-mono text-[#cbd5e1] text-center block mb-6 text-xs tracking-widest font-bold">
            GOLD SPONSORS
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {sponsors.gold.map((s) => (
              <a
                key={s.name}
                href={s.website}
                target="_blank"
                rel="noreferrer"
                className="p-5 rounded-xl bg-[#0c0f1e] border border-[#2a3154] text-center flex flex-col items-center justify-center group hover:border-[#f59e0b]/50 hover:bg-[#12162e] transition-all cursor-pointer"
              >
                <span className="font-display text-base sm:text-lg font-bold text-[#fef08a] group-hover:text-white transition-colors">
                  {s.name}
                </span>
                <span className="label-mono text-[8px] text-stone-400 mt-1">
                  GOLD PARTNER
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* Community & Ecosystem Partners */}
        <div>
          <span className="label-mono text-[#818cf8] text-center block mb-6 text-xs tracking-widest font-bold">
            ECOSYSTEM & COMMUNITY PARTNERS
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto">
            {sponsors.community.map((s) => (
              <a
                key={s.name}
                href={s.website}
                target="_blank"
                rel="noreferrer"
                className="p-4 rounded-xl bg-[#0c0f1e] border border-[#2a3154] text-center flex items-center justify-center gap-2 group hover:border-[#818cf8]/50 hover:bg-[#12162e] transition-all cursor-pointer"
              >
                <Handshake size={16} className="text-[#818cf8]" />
                <span className="font-display text-base font-bold text-[#c7d2fe]">
                  {s.name}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
