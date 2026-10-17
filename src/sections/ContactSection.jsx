import { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { playSpellSound, playWandClick } from "../utils/audio";

const faqs = [
  {
    q: "Who is eligible to participate in NIRVAN '26?",
    a: "NIRVAN '26 is open to all enrolled undergraduate and postgraduate students from recognized colleges and universities across India. A valid college photo ID card is mandatory during campus entry.",
  },
  {
    q: "Can teams have members from different institutions?",
    a: "Yes! Cross-college delegations and inter-disciplinary teams are fully permitted for HackSprint, UI/UX Arena, and CTF CyberQuest.",
  },
  {
    q: "Is lodging or accommodation provided for outstation teams?",
    a: "Yes, campus hostel accommodation is available on a first-come, first-served basis for verified outstation teams. Please specify your travel schedule during registration or email us directly.",
  },
  {
    q: "What equipment do I need to bring for the hackathons and competitions?",
    a: "Participants must bring their own laptops, chargers, and any specialized peripherals. High-speed campus Wi-Fi and power stations are provided throughout the Innovation Hub.",
  },
  {
    q: "Can I participate in multiple events across the three days?",
    a: "Yes, as long as the event schedules do not conflict. You can inspect the Festival Schedule above to plan your participation.",
  },
];

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    college: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    playSpellSound();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", college: "", message: "" });
    }, 5000);
  };

  const toggleFaq = (idx) => {
    playWandClick();
    setOpenFaq(openFaq === idx ? null : idx);
  };

  return (
    <section id="contact" className="relative py-28 px-4 sm:px-8 bg-[#070810] overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="label-mono text-[#f59e0b] text-xs tracking-[0.2em] block mb-2 font-semibold">
            GET IN TOUCH
          </span>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-shimmer mb-4">
            Contact & Venue
          </h2>
          <p className="font-body text-[#cbd5e1] max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
            Have questions regarding registrations, travel, rules, or sponsorship opportunities? Connect with our student organizing team.
          </p>
          <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-[#f59e0b] to-transparent mx-auto mt-6 opacity-60" />
        </motion.div>

        {/* Contact Split Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-20">
          {/* Left: Campus Information & Coordinates */}
          <div className="lg:col-span-5 space-y-6">
            <div className="parchment-card p-6 sm:p-8 rounded-2xl border border-[#f59e0b]/30 space-y-6">
              <div className="pb-4 border-b border-[#2a3154]">
                <h3 className="font-display text-xl font-bold text-[#fef08a]">
                  Campus Location
                </h3>
                <span className="label-mono text-[9px] text-[#cbd5e1] mt-0.5 block">
                  GRAPHIC ERA HILL UNIVERSITY
                </span>
              </div>

              <div className="space-y-4 text-sm font-body text-[#cbd5e1]">
                <div className="flex items-start gap-3">
                  <MapPin className="text-[#ef4444] shrink-0 mt-1" size={18} />
                  <div>
                    <strong className="text-white block font-display">
                      Haldwani Campus
                    </strong>
                    <p className="text-xs text-[#cbd5e1] mt-0.5 leading-relaxed">
                      Kalyanpur, Lamachaur, Haldwani, Uttarakhand 263139
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Mail className="text-[#f59e0b] shrink-0" size={18} />
                  <div>
                    <span className="text-[10px] font-mono uppercase block text-stone-400">
                      EMAIL INQUIRIES
                    </span>
                    <a
                      href="mailto:nirvan@gehu.in"
                      className="text-[#fef08a] hover:underline font-mono text-xs sm:text-sm"
                    >
                      nirvan@gehu.in
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Phone className="text-[#818cf8] shrink-0" size={18} />
                  <div>
                    <span className="text-[10px] font-mono uppercase block text-stone-400">
                      STUDENT HELPLINE
                    </span>
                    <span className="text-white font-mono text-xs sm:text-sm">
                      +91 1256489632
                    </span>
                  </div>
                </div>
              </div>

              {/* Campus Map Embed */}
              <div className="rounded-xl overflow-hidden border border-[#2a3154] h-48 bg-[#090b14] relative">
                <iframe
                  title="GEHU Haldwani Campus Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3484.2889240465207!2d79.44437657597955!3d29.21557997535122!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39a09b30cbe9f65d%3A0xb36412e604f3db66!2sGraphic%20Era%20Hill%20University%2C%20Haldwani!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: "invert(90%) hue-rotate(180deg) brightness(85%)" }}
                  allowFullScreen=""
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          {/* Right: Clean Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="parchment-card p-6 sm:p-8 rounded-2xl border border-[#f59e0b]/30">
              <div className="flex items-center gap-2 mb-6">
                <Send className="text-[#f59e0b]" size={20} />
                <h3 className="font-display text-2xl font-bold text-[#fef08a]">
                  Send a Message
                </h3>
              </div>

              {submitted ? (
                <div className="text-center py-10 space-y-4 animate-fade-in">
                  <div className="w-16 h-16 rounded-full bg-[#f59e0b]/20 border border-[#f59e0b] mx-auto flex items-center justify-center">
                    <CheckCircle2 size={36} className="text-[#fef08a]" />
                  </div>
                  <h4 className="font-display text-2xl font-bold text-[#fef08a]">
                    Message Sent Successfully!
                  </h4>
                  <p className="text-xs sm:text-sm text-[#cbd5e1] max-w-md mx-auto">
                    Your inquiry has been received. Our student coordination team will reply to your email address shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="label-mono text-[10px] text-[#cbd5e1] block mb-1">
                        YOUR FULL NAME *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className="w-full bg-[#111424] border border-[#2a3154] rounded-lg px-3.5 py-2.5 text-white font-mono text-sm focus:border-[#f59e0b] focus:ring-1 focus:ring-[#f59e0b]/40 outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="label-mono text-[10px] text-[#cbd5e1] block mb-1">
                        EMAIL ADDRESS *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className="w-full bg-[#111424] border border-[#2a3154] rounded-lg px-3.5 py-2.5 text-white font-mono text-sm focus:border-[#f59e0b] focus:ring-1 focus:ring-[#f59e0b]/40 outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="label-mono text-[10px] text-[#cbd5e1] block mb-1">
                      COLLEGE / INSTITUTION
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Graphic Era Hill University, IIT, NIT"
                      value={formData.college}
                      onChange={(e) =>
                        setFormData({ ...formData, college: e.target.value })
                      }
                      className="w-full bg-[#111424] border border-[#2a3154] rounded-lg px-3.5 py-2.5 text-white font-mono text-sm focus:border-[#f59e0b] focus:ring-1 focus:ring-[#f59e0b]/40 outline-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="label-mono text-[10px] text-[#cbd5e1] block mb-1">
                      YOUR MESSAGE *
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Ask about competition rules, schedules, delegation travel, or accommodations..."
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      className="w-full bg-[#111424] border border-[#2a3154] rounded-lg px-3.5 py-2.5 text-white font-mono text-sm focus:border-[#f59e0b] focus:ring-1 focus:ring-[#f59e0b]/40 outline-none transition-all"
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn-gold w-full text-center py-3 tracking-widest font-bold flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>SEND MESSAGE</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* FAQ Accordion — Calming, Smooth & Soothing for the Eyes */}
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <span className="label-mono text-[#f59e0b] text-xs tracking-widest block mb-2 font-semibold">
              COMMON QUESTIONS
            </span>
            <h3 className="font-display text-3xl font-bold text-white">
              Frequently Asked Questions
            </h3>
            <p className="text-xs text-stone-400 mt-1">
              Tap any inquiry to reveal details.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                    isOpen
                      ? "border-[#f59e0b]/40 bg-[#0c0f1e] shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
                      : "border-[#1e2438] bg-[#080a14] hover:border-[#2a3154]"
                  }`}
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer transition-colors"
                  >
                    <span className={`font-display text-base font-bold transition-colors ${
                      isOpen ? "text-[#fef08a]" : "text-stone-200 hover:text-white"
                    }`}>
                      {faq.q}
                    </span>
                    <div className={`p-1 rounded-full transition-transform duration-300 ${isOpen ? "rotate-180 text-[#f59e0b]" : "text-stone-400"}`}>
                      <ChevronDown size={18} />
                    </div>
                  </button>

                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      className="px-5 pb-5 text-xs sm:text-sm font-body text-stone-300 leading-relaxed border-t border-white/5 pt-3"
                    >
                      {faq.a}
                    </motion.div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
