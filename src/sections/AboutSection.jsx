import { motion } from "framer-motion";
import {
  Code,
  Terminal,
  Bot,
  PenTool,
  Users,
  Award,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { playWandClick } from "../utils/audio";

const disciplines = [
  {
    title: "Software & Hackathons",
    subtitle: "Overnight Development",
    icon: Code,
    accent: "#ef4444",
    border: "border-[#ef4444]/30",
    bg: "from-[#ef4444]/15 via-[#ef4444]/5 to-transparent",
    event: "HackSprint (12H Overnight)",
    description:
      "Rapid prototyping, full-stack architecture, and building production-grade solutions under a strict 12-hour timer.",
  },
  {
    title: "Algorithms & Cybersecurity",
    subtitle: "Logic & Digital Defense",
    icon: Terminal,
    accent: "#818cf8",
    border: "border-[#818cf8]/30",
    bg: "from-[#818cf8]/15 via-[#818cf8]/5 to-transparent",
    event: "CodeRush & CTF CyberQuest",
    description:
      "Speed competitive coding on complex algorithmic problems, dynamic programming, reverse engineering, and web vulnerability analysis.",
  },
  {
    title: "Robotics & Combat Systems",
    subtitle: "Mechanical Engineering",
    icon: Bot,
    accent: "#10b981",
    border: "border-[#10b981]/30",
    bg: "from-[#10b981]/15 via-[#10b981]/5 to-transparent",
    event: "RoboWar & E-Sports Arena",
    description:
      "Heavyweight combat bots clashing in a knockout arena, embedded sensor integration, and high-intensity tactical esports brackets.",
  },
  {
    title: "UI/UX & Product Design",
    subtitle: "Human-Centered Innovation",
    icon: PenTool,
    accent: "#f59e0b",
    border: "border-[#f59e0b]/30",
    bg: "from-[#f59e0b]/15 via-[#f59e0b]/5 to-transparent",
    event: "UI/UX Arena & Workshops",
    description:
      "Design sprints from live mystery briefs to interactive prototypes, emphasizing typography, visual hierarchy, and intuitive user journeys.",
  },
];

export default function AboutSection({ onOpenRegister }) {
  const scrollTo = (id) => {
    playWandClick();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="about" className="relative py-28 px-4 sm:px-8 bg-[#070810] overflow-hidden">
      {/* Soft atmospheric ambient light */}
      <div className="absolute top-1/3 -left-48 w-96 h-96 rounded-full bg-[#f59e0b]/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/3 -right-48 w-96 h-96 rounded-full bg-[#818cf8]/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Clean, Normal Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="label-mono text-[#f59e0b] text-xs tracking-[0.2em] block mb-2 font-semibold">
            ABOUT THE FESTIVAL
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-shimmer mb-4">
            About NIRVAN '26
          </h2>
          <p className="font-body text-[#cbd5e1] max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
            Where Ideas Become Innovation. The annual flagship technical festival bringing together university developers, designers, and innovators.
          </p>
          <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-[#f59e0b] to-transparent mx-auto mt-6 opacity-60" />
        </motion.div>

        {/* Narrative & Campus Feature */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-24">
          {/* Real Campus & Hackathon Visual Frame */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6 relative"
          >
            <div className="relative rounded-2xl overflow-hidden border border-[#f59e0b]/30 shadow-[0_15px_40px_rgba(0,0,0,0.8)] bg-[#0d1020]">
              <img
                src="/gallery/hackathon_1.jpg"
                alt="NIRVAN Hackathon Teams in Action"
                className="w-full h-[360px] sm:h-[420px] object-cover filter contrast-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#070810]/95 via-transparent to-transparent" />

              <div className="absolute bottom-5 left-5 right-5 p-4 rounded-xl bg-[#090b16]/90 border border-white/10 backdrop-blur-md">
                <span className="label-mono text-[9px] text-[#f59e0b] block font-bold">
                  CAMPUS VENUE
                </span>
                <h4 className="font-display text-base font-bold text-white mt-0.5">
                  Graphic Era Hill University, Haldwani Campus
                </h4>
                <p className="text-xs text-[#cbd5e1] mt-1 font-body">
                  Modern computer laboratories, innovation hubs, high-bandwidth campus networks, and dedicated combat zones.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Core Festival Mission */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6 space-y-5"
          >
            <div>
              <span className="label-mono text-[#818cf8] text-xs tracking-wider block mb-1">
                ENGINEERING EXCELLENCE
              </span>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-[#fef08a] leading-tight">
                Three Days of Intense Challenges, Collaboration & Creativity
              </h3>
            </div>

            <p className="text-[#cbd5e1] text-sm sm:text-base leading-relaxed font-body">
              NIRVAN '26 is engineered to challenge students beyond classroom curriculum. Participants build prototypes from scratch, optimize algorithms against live test suites, engineer durable combat robots, and present working systems to a jury of industry leaders.
            </p>

            {/* University & Organizing Guild Badges — Clean, Perfectly Aligned */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-4 p-4 rounded-xl bg-[#0c0f1e] border border-[#2a3154] hover:border-[#f59e0b]/40 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-[#080a14] border border-[#f59e0b]/30 p-2 shrink-0 flex items-center justify-center shadow-[0_0_15px_rgba(245,158,11,0.2)]">
                  <img
                    src="/gehu_logo.svg"
                    alt="Graphic Era Crest"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="min-w-0">
                  <h4 className="font-display text-sm sm:text-base font-bold text-white">
                    Graphic Era Hill University
                  </h4>
                  <p className="text-xs text-[#cbd5e1] mt-0.5 leading-relaxed">
                    Haldwani Campus, Uttarakhand • Fostering industry-aligned education, cutting-edge research, and tech initiatives.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-xl bg-[#0c0f1e] border border-[#2a3154] hover:border-[#818cf8]/40 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-[#080a14] border border-[#818cf8]/30 p-2 shrink-0 flex items-center justify-center shadow-[0_0_15px_rgba(129,140,248,0.2)]">
                  <img
                    src="/techgeeks-white.svg"
                    alt="Tech Geeks Logo"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="min-w-0">
                  <h4 className="font-display text-sm sm:text-base font-bold text-[#fef08a]">
                    Organized by Tech Geeks Club
                  </h4>
                  <p className="text-xs text-[#cbd5e1] mt-0.5 leading-relaxed">
                    The student technical organization hosting hackathons, developer conferences, and peer mentoring.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Four Core Disciplines with 3D Interactive Cards */}
        <div>
          <div className="text-center mb-12">
            <span className="label-mono text-[#f59e0b] text-xs tracking-wider block mb-1 font-semibold">
              COMPETITION TRACKS
            </span>
            <h3 className="font-display text-3xl sm:text-4xl font-bold text-[#fef08a]">
              Core Competition Categories
            </h3>
            <p className="font-body text-[#cbd5e1] text-xs sm:text-sm mt-2 max-w-md mx-auto">
              Hover over cards to explore specialized tracks, primary events, and technologies.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {disciplines.map((d, idx) => {
              const Icon = d.icon;
              return (
                <motion.div
                  key={d.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  whileHover={{
                    y: -10,
                    scale: 1.02,
                    boxShadow: `0 20px 35px -10px ${d.accent}30, 0 0 20px ${d.accent}20`,
                    borderColor: d.accent,
                  }}
                  className={`parchment-card p-6 rounded-2xl border ${d.border} bg-gradient-to-b ${d.bg} flex flex-col justify-between group transition-all duration-300 relative overflow-hidden`}
                >
                  {/* Subtle decorative background watermark */}
                  <div className="absolute -right-6 -bottom-6 opacity-5 group-hover:opacity-15 transition-opacity pointer-events-none">
                    <Icon size={120} style={{ color: d.accent }} />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-5">
                      <div
                        className="w-12 h-12 rounded-xl border flex items-center justify-center transition-transform group-hover:scale-110 group-hover:rotate-6 duration-300 shadow-md"
                        style={{
                          backgroundColor: `${d.accent}15`,
                          borderColor: `${d.accent}50`,
                        }}
                      >
                        <Icon size={24} style={{ color: d.accent }} />
                      </div>
                      <span className="label-mono text-[10px] text-[#cbd5e1] px-2 py-0.5 rounded bg-black/40 border border-white/10 font-mono">
                        TRACK 0{idx + 1}
                      </span>
                    </div>

                    <h4 className="font-display text-lg font-bold text-[#fef08a] mb-1 group-hover:text-white transition-colors">
                      {d.title}
                    </h4>
                    <span
                      className="font-mono text-xs font-semibold block mb-3"
                      style={{ color: d.accent }}
                    >
                      {d.subtitle}
                    </span>
                    <p className="text-xs text-[#cbd5e1] leading-relaxed font-body mb-5">
                      {d.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                    <span className="text-xs font-mono text-white font-medium truncate pr-2">
                      {d.event}
                    </span>
                    <button
                      onClick={() => scrollTo("events")}
                      className="p-1.5 rounded-lg border border-white/10 text-[#f59e0b] hover:text-[#070810] hover:bg-[#f59e0b] hover:border-[#f59e0b] transition-all cursor-pointer shrink-0"
                      title="View competition details"
                    >
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
