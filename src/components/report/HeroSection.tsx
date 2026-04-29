import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { reportData } from "@/data/igneo-report";
import heroSlide1 from "@/assets/hero-slide-1.jpg";
import heroSlide2 from "@/assets/hero-slide-2.jpg";
import heroSlide3 from "@/assets/hero-slide-3.jpg";

export interface HeroSlide {
  image: string;
  label: string;
  heading: string;
  description: string;
  sectionId: string;
}

const slides: HeroSlide[] = [
  {
    image: heroSlide2,
    label: "Brand",
    heading: "Fund Manager of the Year",
    description:
      "Morningstar recognised RQI with the prestigious Fund Manager of the Year Award — a testament to our sustained, systematic investment approach.",
    sectionId: "fmoty",
  },
  {
    image: heroSlide1,
    label: "Campaign",
    heading: "Asia Campaign Phase II",
    description:
      "Our continued push into Hong Kong and Singapore, supporting fund launches with Hang Seng Bank and DBS Bank across digital and OOH channels.",
    sectionId: "asia-campaign",
  },
  {
    image: heroSlide3,
    label: "Content",
    heading: "RQI Demystified",
    description:
      "Short, jargon-free videos and dedicated webpages that simplify our investment strategies for a broader audience.",
    sectionId: "demystified",
  },
];

export default function HeroSection() {
  const d = reportData;
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = slides.length;

  const next = useCallback(() => setCurrent((c) => (c + 1) % total), [total]);
  const prev = useCallback(() => setCurrent((c) => (c - 1 + total) % total), [total]);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, 6000);
    return () => clearInterval(id);
  }, [paused, next]);

  const handleJump = () => {
    const el = document.getElementById(slides[current].sectionId);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="overview"
      className="relative w-full h-[80vh] min-h-[520px] max-h-[800px] overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Background slides */}
      {slides.map((slide, i) => (
        <div
          key={i}
          className="absolute inset-0 transition-opacity duration-[1200ms] ease-in-out"
          style={{ opacity: i === current ? 1 : 0 }}
        >
          <img
            src={slide.image}
            alt={slide.heading}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ash/90 via-ash/50 to-transparent" />
        </div>
      ))}

      {/* Title + date on bottom left */}
      <div className="absolute inset-0 z-10 flex items-end pb-16 sm:pb-20">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 w-full flex justify-between items-end">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="stage-badge inline-block">{d.quarter}</span>
              <span className="text-sm font-medium text-foreground/60">{d.dataPeriod}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground leading-tight">
              Global Marketing<br />Impact Report
            </h1>
          </div>

          {/* Card on bottom right */}
          <div className="relative max-w-sm rounded-xl border border-white/10 bg-ash/60 backdrop-blur-md p-5 sm:p-6 transition-all duration-500">
            <span className="inline-block text-[10px] font-semibold uppercase tracking-widest text-mint mb-1.5">
              {slides[current].label}
            </span>
            <h2 className="text-base font-bold text-foreground leading-snug mb-1.5" style={{ marginBottom: 6 }}>
              {slides[current].heading}
            </h2>
            <p className="text-xs text-foreground/70 leading-relaxed mb-4">
              {slides[current].description}
            </p>

            <div className="flex items-center justify-between">
              {/* Slide indicators */}
              <div className="flex items-center gap-2">
                {slides.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === current ? "w-8 bg-mint" : "w-3 bg-white/30 hover:bg-white"
                    }`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={handleJump}
                className="px-4 py-1.5 rounded-full text-xs font-semibold bg-mint text-background hover:bg-mint/90 transition-colors"
              >
                Jump to section
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Nav arrows */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 h-10 w-10 rounded-full bg-ash/40 backdrop-blur-sm border border-white/10 flex items-center justify-center text-foreground/70 hover:text-foreground hover:bg-ash/60 transition-colors"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 h-10 w-10 rounded-full bg-ash/40 backdrop-blur-sm border border-white/10 flex items-center justify-center text-foreground/70 hover:text-foreground hover:bg-ash/60 transition-colors"
        aria-label="Next slide"
      >
        <ChevronRight className="h-5 w-5" />
      </button>
    </section>
  );
}
