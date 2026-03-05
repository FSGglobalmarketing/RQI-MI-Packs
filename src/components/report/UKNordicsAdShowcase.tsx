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
  type: "Static" | "Carousel" | "Video";
  image: string;
  images?: string[];
  impressions: number;
  clicks: number;
  ctr: number;
  duration?: string;
  videoViews?: number;
  viewRate?: string;
  completions?: number;
  completionRate?: string;
  spent?: string;
};

const STATIC_ADS: Ad[] = [
  { name: "Proactive management. Proven success.", type: "Static", image: ukAd1, impressions: 55000, clicks: 2100, ctr: 3.8 },
  { name: "Middle market. Maximum impact.", type: "Static", image: ukAd4, impressions: 50000, clicks: 1800, ctr: 3.6 },
  { name: "Middle-market. Maximum impact.", type: "Static", image: ukAd3, impressions: 60000, clicks: 3200, ctr: 5.3 },
  { name: "Höegh Esperanza", type: "Static", image: ukAd5, impressions: 50229, clicks: 2174, ctr: 4.3 },
];

const CAROUSEL_ADS: Ad[] = [
  { name: "Nordion Energi", type: "Carousel", image: carousel1, images: [carousel1, carousel2, carousel3, carousel4, carousel5], impressions: 45000, clicks: 1950, ctr: 4.3 },
  { name: "Scandlines", type: "Carousel", image: scandlines1, images: [scandlines1, scandlines2, scandlines3, scandlines4, scandlines5, scandlines6], impressions: 48000, clicks: 2050, ctr: 4.3 },
  { name: "European Infrastructure", type: "Carousel", image: euro1, images: [euro1, euro2, euro3], impressions: 42000, clicks: 1780, ctr: 4.2 },
];

const VIDEO_ADS: Ad[] = [
  { name: "Investing in European Infrastructure", type: "Video", image: ukAd3, impressions: 22820, clicks: 2210, ctr: 9.69, duration: "53s", videoViews: 3339, viewRate: "14.63%", completions: 2592, completionRate: "11.36%", spent: "£1,621" },
  { name: "Middle-market. Maximum impact.", type: "Video", image: ukAd4, impressions: 20308, clicks: 1726, ctr: 8.50, duration: "60s", videoViews: 2831, viewRate: "13.94%", completions: 1780, completionRate: "8.77%", spent: "£1,354" },
  { name: "European Infrastructure (66s)", type: "Video", image: ukAd1, impressions: 16307, clicks: 1233, ctr: 7.56, duration: "66s", videoViews: 2542, viewRate: "15.59%", completions: 1183, completionRate: "7.25%", spent: "£1,024" },
];

type Mode = "static" | "carousel" | "video";
const MODES: { key: Mode; label: string }[] = [
  { key: "static", label: "Static" },
  { key: "carousel", label: "Carousel" },
  { key: "video", label: "Video" },
];

function fmtK(v: number) {
  if (v >= 1000) return `${(v / 1000).toFixed(1)}k`;
  return String(v);
}

/* ── Carousel slide viewer for the featured area ── */
function FeaturedCarousel({ images }: { images: string[] }) {
  const [idx, setIdx] = useState(0);
  return (
    <div className="relative">
      <img src={images[idx]} alt={`Slide ${idx + 1}`} className="w-full rounded-lg object-contain" />
      {/* Counter badge */}
      <div className="absolute top-3 right-3 bg-background/80 backdrop-blur-sm rounded-full px-2.5 py-1 text-[11px] font-bold text-foreground">
        {idx + 1} / {images.length}
      </div>
      {/* Nav arrows */}
      {idx > 0 && (
        <button onClick={() => setIdx(idx - 1)} className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-background/90 backdrop-blur-sm border border-foreground/15 flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-colors shadow-lg">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
        </button>
      )}
      {idx < images.length - 1 && (
        <button onClick={() => setIdx(idx + 1)} className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-background/90 backdrop-blur-sm border border-foreground/15 flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-colors shadow-lg">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
        </button>
      )}
      {/* Dots */}
      <div className="flex justify-center gap-1.5 mt-2.5">
        {images.map((_, i) => (
          <button key={i} onClick={() => setIdx(i)} className={`w-2 h-2 rounded-full transition-all ${i === idx ? "bg-primary scale-125" : "bg-foreground/25 hover:bg-foreground/40"}`} />
        ))}
      </div>
    </div>
  );
}

/* ── Metrics bar ── */
function MetricsBar({ ad }: { ad: Ad }) {
  const isVideo = ad.type === "Video";
  return (
    <div className="space-y-2 mt-3">
      <div className={`grid ${isVideo ? "grid-cols-3" : "grid-cols-3"} gap-2 text-center`}>
        <Metric label="Impressions" value={fmtK(ad.impressions)} />
        <Metric label="Clicks" value={fmtK(ad.clicks)} />
        <Metric label="CTR" value={`${ad.ctr}%`} highlight />
      </div>
      {isVideo && (
        <>
          <div className="grid grid-cols-3 gap-2 text-center">
            <Metric label="Video Views" value={fmtK(ad.videoViews!)} />
            <Metric label="Completions" value={fmtK(ad.completions!)} />
            <Metric label="Comp. Rate" value={ad.completionRate!} />
          </div>
          <div className="flex items-center justify-between text-[10px] text-muted-foreground px-1 pt-0.5">
            <span>Duration: {ad.duration}</span>
            <span>Spent: {ad.spent}</span>
          </div>
        </>
      )}
    </div>
  );
}

function Metric({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className="rounded-lg bg-foreground/[0.06] py-2 px-1">
      <p className={`text-sm font-extrabold ${highlight ? "text-primary" : "text-foreground"}`}>{value}</p>
      <p className="text-[9px] text-muted-foreground mt-0.5">{label}</p>
    </div>
  );
}

/* ── Main showcase ── */
export default function UKNordicsAdShowcase() {
  const [mode, setMode] = useState<Mode>("static");
  const [selected, setSelected] = useState(0);

  const ads = mode === "static" ? STATIC_ADS : mode === "carousel" ? CAROUSEL_ADS : VIDEO_ADS;
  const ad = ads[selected];

  const handleModeSwitch = (m: Mode) => {
    setMode(m);
    setSelected(0);
  };

  return (
    <div className="w-full max-w-lg mx-auto space-y-3">
      {/* Header + toggle */}
      <div className="flex items-center justify-between">
        <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Ad Creatives</h4>
        <div className="flex rounded-full bg-foreground/10 p-1">
          {MODES.map((m) => (
            <button
              key={m.key}
              onClick={() => handleModeSwitch(m.key)}
              className={`px-3 py-1.5 rounded-full text-[11px] font-semibold transition-all ${
                mode === m.key
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>
      </div>

      {/* Featured preview */}
      <div className="rounded-xl border border-foreground/10 overflow-hidden bg-foreground/[0.03] p-2.5">
        {ad.images ? (
          <FeaturedCarousel key={`${mode}-${selected}`} images={ad.images} />
        ) : (
          <img src={ad.image} alt={ad.name} className="w-full rounded-lg object-contain" />
        )}

        {/* Title + badge */}
        <div className="flex items-center gap-2 mt-3 px-0.5">
          <p className="text-sm font-semibold text-foreground leading-snug truncate">{ad.name}</p>
          {ad.duration && (
            <span className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground bg-foreground/10 px-1.5 py-0.5 rounded shrink-0">
              {ad.duration}
            </span>
          )}
        </div>

        <MetricsBar ad={ad} />
      </div>

      {/* Thumbnail strip */}
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
        {ads.map((a, i) => (
          <button
            key={`${mode}-${i}`}
            onClick={() => setSelected(i)}
            className={`shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
              selected === i
                ? "border-primary ring-1 ring-primary/30 scale-105"
                : "border-transparent opacity-60 hover:opacity-90"
            }`}
          >
            <img src={a.image} alt={a.name} className="w-16 h-16 object-cover" loading="lazy" />
          </button>
        ))}
      </div>
    </div>
  );
}
