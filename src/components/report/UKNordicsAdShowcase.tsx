import { useState } from "react";
import ukAd1 from "@/assets/uk-nordics-ad-1.jpg";
import ukAd3 from "@/assets/uk-nordics-ad-3.jpg";
import ukAd4 from "@/assets/uk-nordics-ad-4.jpg";
import ukAd5 from "@/assets/uk-nordics-ad-5.jpg";
import carousel1 from "@/assets/uk-nordics-carousel-1.jpg";
import carousel2 from "@/assets/uk-nordics-carousel-2.jpg";
import carousel3 from "@/assets/uk-nordics-carousel-3.jpg";
import carousel4 from "@/assets/uk-nordics-carousel-4.jpg";
import carousel5 from "@/assets/uk-nordics-carousel-5.jpg";
import scandlines1 from "@/assets/uk-nordics-scandlines-1.jpg";
import scandlines2 from "@/assets/uk-nordics-scandlines-2.jpg";
import scandlines3 from "@/assets/uk-nordics-scandlines-3.jpg";
import scandlines4 from "@/assets/uk-nordics-scandlines-4.jpg";
import scandlines5 from "@/assets/uk-nordics-scandlines-5.jpg";
import scandlines6 from "@/assets/uk-nordics-scandlines-6.jpg";
import euro1 from "@/assets/uk-nordics-euro-1.jpg";
import euro2 from "@/assets/uk-nordics-euro-2.jpg";
import euro3 from "@/assets/uk-nordics-euro-3.jpg";

type Ad = {
  name: string;
  type: "Static" | "Carousel";
  image: string;
  images?: string[];
  impressions: number;
  clicks: number;
  ctr: number;
};

const STATIC_ADS: Ad[] = [
  { name: "Proactive management. Proven success.", type: "Static", image: ukAd1, impressions: 55000, clicks: 2100, ctr: 3.8 },
  { name: "Middle market. Maximum impact.", type: "Static", image: ukAd4, impressions: 50000, clicks: 1800, ctr: 3.6 },
  { name: "Middle-market. Maximum impact.", type: "Static", image: ukAd3, impressions: 60000, clicks: 3200, ctr: 5.3 },
  { name: "Höegh Esperanza", type: "Static", image: ukAd5, impressions: 50229, clicks: 2174, ctr: 4.3 },
];

const CAROUSEL_ADS: Ad[] = [
  {
    name: "Nordion Energi",
    type: "Carousel",
    image: carousel1,
    images: [carousel1, carousel2, carousel3, carousel4, carousel5],
    impressions: 45000,
    clicks: 1950,
    ctr: 4.3,
  },
  {
    name: "Scandlines",
    type: "Carousel",
    image: scandlines1,
    images: [scandlines1, scandlines2, scandlines3, scandlines4, scandlines5, scandlines6],
    impressions: 48000,
    clicks: 2050,
    ctr: 4.3,
  },
  {
    name: "European Infrastructure",
    type: "Carousel",
    image: euro1,
    images: [euro1, euro2, euro3],
    impressions: 42000,
    clicks: 1780,
    ctr: 4.2,
  },
];

function fmtK(v: number) {
  if (v >= 1000) return `${(v / 1000).toFixed(1)}k`;
  return String(v);
}

function CarouselSlider({ images }: { images: string[] }) {
  const [idx, setIdx] = useState(0);
  return (
    <div className="relative group/slider">
      <img
        src={images[idx]}
        alt={`Carousel slide ${idx + 1}`}
        className="w-full rounded-lg object-cover aspect-square"
      />
      {/* Slide counter */}
      <div className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm rounded-full px-2 py-0.5 text-[10px] font-semibold text-foreground">
        {idx + 1} / {images.length}
      </div>
      {/* Dots */}
      <div className="flex justify-center gap-1.5 mt-2">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={(e) => { e.stopPropagation(); setIdx(i); }}
            className={`w-2 h-2 rounded-full transition-all ${i === idx ? "bg-primary scale-110" : "bg-foreground/20"}`}
          />
        ))}
      </div>
      {/* Prev arrow */}
      {idx > 0 && (
        <button
          onClick={(e) => { e.stopPropagation(); setIdx(idx - 1); }}
          className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-background/90 backdrop-blur-sm border border-foreground/15 flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-colors shadow-lg"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
        </button>
      )}
      {/* Next arrow */}
      {idx < images.length - 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); setIdx(idx + 1); }}
          className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-background/90 backdrop-blur-sm border border-foreground/15 flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-colors shadow-lg"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
        </button>
      )}
    </div>
  );
}

export default function UKNordicsAdShowcase() {
  const [mode, setMode] = useState<"static" | "carousel">("static");
  const [expanded, setExpanded] = useState<number | null>(null);

  const ads = mode === "static" ? STATIC_ADS : CAROUSEL_ADS;

  return (
    <div className="space-y-3 w-full max-w-md mx-auto">
      {/* Toggle */}
      <div className="flex items-center justify-between">
        <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Ad Creatives</h4>
        <div className="flex rounded-full bg-foreground/10 p-1">
          <button
            onClick={() => { setMode("static"); setExpanded(null); }}
            className={`px-4 py-1.5 rounded-full text-[11px] font-semibold transition-all ${
              mode === "static"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Static
          </button>
          <button
            onClick={() => { setMode("carousel"); setExpanded(null); }}
            className={`px-4 py-1.5 rounded-full text-[11px] font-semibold transition-all ${
              mode === "carousel"
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Carousel
          </button>
        </div>
      </div>

      {ads.map((ad, i) => {
        const isOpen = expanded === i;
        return (
          <button
            key={`${mode}-${i}`}
            onClick={() => setExpanded(isOpen ? null : i)}
            className={`w-full text-left rounded-xl overflow-hidden border transition-all duration-300 ${
              isOpen
                ? "border-primary/40 ring-1 ring-primary/20"
                : "border-foreground/8 hover:border-foreground/20"
            }`}
          >
            <div className="flex gap-3 p-2.5">
              <img
                src={ad.image}
                alt={ad.name}
                className="w-16 h-16 rounded-lg object-cover shrink-0"
                loading="lazy"
              />
              <div className="flex-1 min-w-0 py-0.5">
                <p className="text-xs font-semibold text-foreground leading-snug truncate">{ad.name}</p>
                <div className="flex items-center gap-3 mt-1.5">
                  <span className="text-[10px] text-muted-foreground">{fmtK(ad.impressions)} imp</span>
                  <span className="text-[10px] text-muted-foreground">{fmtK(ad.clicks)} clicks</span>
                  <span className="text-[10px] text-primary font-bold">{ad.ctr}%</span>
                </div>
              </div>
            </div>

            {isOpen && (
              <div className="px-2.5 pb-3 animate-fade-in">
                {ad.images ? (
                  <div className="mb-3">
                    <CarouselSlider images={ad.images} />
                  </div>
                ) : (
                  <img
                    src={ad.image}
                    alt={ad.name}
                    className="w-full rounded-lg object-cover aspect-square mb-3"
                  />
                )}
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="glass-card-dark py-2 px-1">
                    <p className="text-sm font-extrabold text-foreground">{fmtK(ad.impressions)}</p>
                    <p className="text-[9px] text-muted-foreground">Impressions</p>
                  </div>
                  <div className="glass-card-dark py-2 px-1">
                    <p className="text-sm font-extrabold text-foreground">{fmtK(ad.clicks)}</p>
                    <p className="text-[9px] text-muted-foreground">Clicks</p>
                  </div>
                  <div className="glass-card-dark py-2 px-1">
                    <p className="text-sm font-extrabold text-primary">{ad.ctr}%</p>
                    <p className="text-[9px] text-muted-foreground">CTR</p>
                  </div>
                </div>
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
}
