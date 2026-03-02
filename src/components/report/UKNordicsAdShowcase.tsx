import { useState } from "react";
import ukAd1 from "@/assets/uk-nordics-ad-1.jpg";
import ukAd2 from "@/assets/uk-nordics-ad-2.jpg";
import ukAd3 from "@/assets/uk-nordics-ad-3.jpg";
import ukAd4 from "@/assets/uk-nordics-ad-4.jpg";
import ukAd5 from "@/assets/uk-nordics-ad-5.jpg";

const ADS = [
  { name: "Proactive management. Proven success.", image: ukAd1, impressions: 55000, clicks: 2100, ctr: 3.8 },
  { name: "Middle market. Maximum impact.", image: ukAd4, impressions: 50000, clicks: 1800, ctr: 3.6 },
  { name: "Middle-market. Maximum impact.", image: ukAd3, impressions: 60000, clicks: 3200, ctr: 5.3 },
  { name: "Höegh Esperanza", image: ukAd5, impressions: 50229, clicks: 2174, ctr: 4.3 },
];

function fmtK(v: number) {
  if (v >= 1000) return `${(v / 1000).toFixed(1)}k`;
  return String(v);
}

export default function UKNordicsAdShowcase() {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <div className="space-y-3 w-full max-w-md mx-auto">
      <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Ad Creatives</h4>
      {ADS.map((ad, i) => {
        const isOpen = expanded === i;
        return (
          <button
            key={i}
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
                <img
                  src={ad.image}
                  alt={ad.name}
                  className="w-full rounded-lg object-cover aspect-square mb-3"
                />
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
