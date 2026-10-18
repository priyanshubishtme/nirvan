import { useState } from "react";
import { motion } from "framer-motion";
import { Award, ExternalLink, Handshake, Star } from "lucide-react";
import { sponsors } from "../data/sponsors";
import { playSpellSound, playWandClick } from "../utils/audio";

export default function SponsorsSection() {
  return (
    <section id="sponsors" className="relative py-24 sm:py-28 px-4 sm:px-8 bg-[#05060c] overflow-hidden">
      {/* Ambient background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[radial-gradient(circle,rgba(245,158,11,0.04)_0%,transparent_70%)] blur-[80px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-2">
            <Star size={14} className="text-[#f59e0b]" />
            <span className="label-mono text-[#f59e0b] text-xs tracking-[0.2em] font-semibold">
              SPONSORS & PARTNERS
            </span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-shimmer mb-4">
            Our Sponsors & Partners
          </h2>
          <p className="font-body text-[#cbd5e1] max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
            Proudly supported by leading technology enterprises, developer tools, and university ecosystems empowering student innovators.
          </p>
          <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-[#f59e0b] to-transparent mx-auto mt-6 opacity-60" />
        </motion.div>

        {/* Title Sponsors */}
        <div className="mb-16">
          <span className="label-mono text-[#fef08a] text-center block mb-8 text-xs tracking-widest font-bold">
            TITLE SPONSORS
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {sponsors.title.map((s, idx) => (
              <motion.a
                key={s.name}
                href={s.website}
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -6, scale: 1.02, transition: { duration: 0.3 } }}
                className="parchment-card p-6 sm:p-8 rounded-2xl border border-[#f59e0b]/40 text-center flex flex-col items-center justify-center group hover:border-[#fef08a] transition-all shadow-[0_4px_25px_rgba(245,158,11,0.15)] cursor-pointer glow-pulse"
              >
                <div className="w-14 h-14 rounded-xl bg-[#f59e0b]/10 border border-[#f59e0b]/30 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-transform">
                  <Award className="text-[#f59e0b]" size={28} />
                </div>
                <h3 className="font-display text-2xl font-bold text-[#fef08a] group-hover:text-white transition-colors">
                  {s.name}
                </h3>
                <span className="label-mono text-[9px] text-[#cbd5e1] mt-1.5 flex items-center gap-1.5 group-hover:text-[#fef08a] transition-colors">
                  <span>PREMIER TITLE SPONSOR</span>
                  <ExternalLink size={10} className="transition-transform group-hover:translate-x-0.5" />
                </span>
              </motion.a>
            ))}
          </div>
        </div>

        {/* Gold Sponsors */}
        <div className="mb-16">
          <span className="label-mono text-[#cbd5e1] text-center block mb-8 text-xs tracking-widest font-bold">
            GOLD SPONSORS
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {sponsors.gold.map((s, idx) => (
              <motion.a
                key={s.name}
                href={s.website}
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                whileHover={{ y: -4, scale: 1.03 }}
                className="p-5 rounded-xl bg-[#0c0f1e] border border-[#2a3154] text-center flex flex-col items-center justify-center group hover:border-[#f59e0b]/50 hover:bg-[#12162e] transition-all cursor-pointer hover:shadow-[0_8px_25px_rgba(245,158,11,0.15)]"
              >
                <span className="font-display text-base sm:text-lg font-bold text-[#fef08a] group-hover:text-white transition-colors">
                  {s.name}
                </span>
                <span className="label-mono text-[8px] text-stone-400 mt-1">
                  GOLD PARTNER
                </span>
              </motion.a>
            ))}
          </div>
        </div>

        {/* Community & Ecosystem Partners */}
        <div>
          <span className="label-mono text-[#818cf8] text-center block mb-8 text-xs tracking-widest font-bold">
            ECOSYSTEM & COMMUNITY PARTNERS
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto">
            {sponsors.community.map((s, idx) => (
              <motion.a
                key={s.name}
                href={s.website}
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                whileHover={{ y: -3, scale: 1.02 }}
                className="p-4 rounded-xl bg-[#0c0f1e] border border-[#2a3154] text-center flex items-center justify-center gap-2.5 group hover:border-[#818cf8]/50 hover:bg-[#12162e] transition-all cursor-pointer hover:shadow-[0_8px_25px_rgba(129,140,248,0.1)]"
              >
                <Handshake size={16} className="text-[#818cf8] group-hover:scale-110 transition-transform" />
                <span className="font-display text-base font-bold text-[#c7d2fe] group-hover:text-white transition-colors">
                  {s.name}
                </span>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
