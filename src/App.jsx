import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import SplashScreen from "./components/SplashScreen";
import ScrollProgressBar from "./components/ScrollProgressBar";
import Navbar from "./components/Navbar";
import HeroSection from "./sections/HeroSection";
import AboutSection from "./sections/AboutSection";
import EventsSection from "./sections/EventsSection";
import ScheduleSection from "./sections/ScheduleSection";
import SpeakersSection from "./sections/SpeakersSection";
import GallerySection, { galleryItems } from "./sections/GallerySection";
import SponsorsSection from "./sections/SponsorsSection";
import ContactSection from "./sections/ContactSection";
import Footer from "./components/Footer";
import EventDetailModal from "./components/EventDetailModal";
import RegisterModal from "./components/RegisterModal";
import GalleryLightbox from "./components/GalleryLightbox";
import WandTrail from "./components/WandTrail";
import { events } from "./data/events";

export default function App() {
  const [registerOpen, setRegisterOpen] = useState(false);
  const [preSelectedEvent, setPreSelectedEvent] = useState("");
  const [selectedEventDetail, setSelectedEventDetail] = useState(null);

  // Gallery Lightbox State
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState(
    galleryItems.map((g) => ({ src: g.src, alt: g.title }))
  );
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const location = useLocation();

  // Handle URL hashes and routes gracefully on single-page scroll
  useEffect(() => {
    const path = location.pathname.toLowerCase();
    const hash = window.location.hash;

    if (path.startsWith("/events/")) {
      const slug = path.replace("/events/", "").trim();
      const match = events.find((e) => e.slug.toLowerCase() === slug);
      if (match) {
        setSelectedEventDetail(match);
      }
      const el = document.getElementById("events");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else if (path.length > 1) {
      const sectionId = path.replace("/", "");
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    } else if (hash) {
      const sectionId = hash.replace("#", "");
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  }, [location]);

  const handleOpenRegister = (slug = "") => {
    setPreSelectedEvent(slug || (events[0] ? events[0].slug : ""));
    setRegisterOpen(true);
  };

  const handleOpenDetail = (event) => {
    setSelectedEventDetail(event);
  };

  const handleOpenLightbox = (images, index) => {
    setLightboxImages(images);
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <div className="relative min-h-screen bg-[#070810] text-[#f8fafc] selection:bg-[#f59e0b]/30 selection:text-[#fef08a] overflow-x-hidden font-body">
      {/* Hogwarts-Style Splash Intro Screen */}
      <SplashScreen />

      {/* Golden Scroll Progress Bar */}
      <ScrollProgressBar />

      {/* Magical Wand Stardust Particle Cursor Trail */}
      <WandTrail />

      {/* De-cluttered, Sleek Top Navigation */}
      <Navbar onOpenRegister={() => handleOpenRegister("")} />

      {/* Master Single Page Flow */}
      <main className="w-full">
        {/* 01: Hero Section */}
        <HeroSection onOpenRegister={() => handleOpenRegister("")} />

        {/* ─── Divider ─── */}
        <div className="section-divider" />

        {/* 02: About Festival & Core Disciplines */}
        <AboutSection onOpenRegister={() => handleOpenRegister("")} />

        {/* ─── Divider ─── */}
        <div className="section-divider" />

        {/* 03: Featured Events & Competitions */}
        <EventsSection
          onOpenDetail={handleOpenDetail}
          onRegister={(slug) => handleOpenRegister(slug)}
        />

        {/* ─── Divider ─── */}
        <div className="section-divider" />

        {/* 04: Interactive Schedule & Timeline */}
        <ScheduleSection />

        {/* ─── Divider ─── */}
        <div className="section-divider" />

        {/* 05: Keynote Speakers & Mentors */}
        <SpeakersSection />

        {/* ─── Divider ─── */}
        <div className="section-divider" />

        {/* 06: NIRVAN Through the Years (Gallery Carousel) */}
        <GallerySection onOpenLightbox={handleOpenLightbox} />

        {/* ─── Divider ─── */}
        <div className="section-divider" />

        {/* 07: Sponsors & Partners */}
        <SponsorsSection />

        {/* ─── Divider ─── */}
        <div className="section-divider" />

        {/* 08: Contact & Venue */}
        <ContactSection />
      </main>

      {/* Festival Footer */}
      <Footer />

      {/* ── Global Modals ── */}
      {/* Event Details Modal */}
      <EventDetailModal
        event={selectedEventDetail}
        isOpen={!!selectedEventDetail}
        onClose={() => setSelectedEventDetail(null)}
        onRegister={(slug) => handleOpenRegister(slug)}
      />

      {/* Registration Modal */}
      <RegisterModal
        isOpen={registerOpen}
        onClose={() => setRegisterOpen(false)}
        preSelectedEvent={preSelectedEvent}
      />

      {/* Fullscreen Lightbox */}
      <GalleryLightbox
        images={lightboxImages}
        currentIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onPrev={() =>
          setLightboxIndex((prev) =>
            prev > 0 ? prev - 1 : lightboxImages.length - 1
          )
        }
        onNext={() =>
          setLightboxIndex((prev) =>
            prev < lightboxImages.length - 1 ? prev + 1 : 0
          )
        }
      />
    </div>
  );
}
