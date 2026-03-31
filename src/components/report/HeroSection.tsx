import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { reportData } from "@/data/igneo-report";

/**
 * Hero slide images — each should be 1920 × 800 px (landscape, 2.4:1 ratio).
 * Export as JPG/PNG at 2x (3840 × 1600) for retina crispness.
 */
export interface HeroSlide {
  image: string;          // URL or import path — 1920×800 recommended
  label: string;          // short category / tag
  heading: string;        // main title on the card
  description: string;    // one-liner
}

const slides: HeroSlide[] = [
  {
    image: "/hero/slide-1.jpg",
    label: "Brand",
    heading: "Fund Manager of the Year",
    description:
      "Morningstar recognised RQI with the prestigious Fund Manager of the Year Award — a testament to our sustained, systematic investment approach.",
  },
  {
    image: "/hero/slide-2.jpg",
    label: "Campaign",
    heading: "Asia Campaign Phase II",
    description:
      "Our continued push into Hong Kong and Singapore, supporting fund launches with Hang Seng Bank and DBS Bank across digital and OOH channels.",
  },
  {
    image: "/hero/slide-3.jpg",
    label: "Content",
    heading: "RQI Demystified",
    description:
      "Short, jargon-free videos and dedicated webpages that simplify our investment strategies for a broader audience.",
  },
];

export default function HeroSection() {
  const d = reportData;
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = slides.length;

  const next = useCallback(() => setCurrent((c) => (c + 1) % total), [total]);
  const prev = useCallback(() => setCurrent((c) => (c - 1 + total) % total), [total]);

  // Auto-advance every 6 s
  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, 6000);
    return () => clearInterval(id);
  }, [paused, next]);

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
          {/* Darkening overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-ash/90 via-ash/50 to-transparent" />
        </div>
      ))}

      {/* Static info card */}
      <div className="absolute inset-0 z-10 flex items-end pb-16 sm:pb-20">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
          {/* Quarter + date row */}
          <div className="flex items-center gap-3 mb-6">
            <span className="stage-badge inline-block">{d.quarter}</span>
            <span className="text-sm font-medium text-foreground/60">{d.dataPeriod}</span>
          </div>

          {/* Semi-transparent card */}
          <div className="relative max-w-xl rounded-xl border border-white/10 bg-ash/60 backdrop-blur-md p-6 sm:p-8 transition-all duration-500">
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-mint mb-2">
              {slides[current].label}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-foreground leading-tight mb-2">
              {slides[current].heading}
            </h2>
            <p className="text-sm sm:text-base text-foreground/70 leading-relaxed">
              {slides[current].description}
            </p>

            {/* Slide indicators */}
            <div className="flex items-center gap-2 mt-5">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === current ? "w-8 bg-mint" : "w-3 bg-white/30 hover:bg-white/50"
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
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
