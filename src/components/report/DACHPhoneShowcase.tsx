import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import dachPhone1 from "@/assets/dach-phone-1.png";
import dachPhone2 from "@/assets/dach-phone-2.png";

interface AdDetail {
  title: string;
  image: string;
  summary: string;
  stats: { label: string; value: string }[];
}

const ads: AdDetail[] = [
  {
    title: "Mittelstand. Maximale Wirkung.",
    image: dachPhone1,
    summary:
      "This ad promoted Igneo's mid-market positioning in Germany with localised messaging. It drove strong engagement among institutional investors in the DACH region, particularly from the manufacturing and finance sectors.",
    stats: [
      { label: "Impressions", value: "143,841" },
      { label: "Clicks", value: "1,856" },
      { label: "CTR", value: "1.29%" },
      { label: "Engagement rate", value: "1.34%" },
    ],
  },
  {
    title: "Proaktives Management. Nachweislicher Erfolg.",
    image: dachPhone2,
    summary:
      "Highlighting Igneo's proactive management approach and proven track record, this ad resonated strongly with the German-speaking audience. It contributed significantly to the 33% increase in German website visits.",
    stats: [
      { label: "Impressions", value: "143,842" },
      { label: "Clicks", value: "1,862" },
      { label: "CTR", value: "1.29%" },
      { label: "Engagement rate", value: "1.35%" },
    ],
  },
];

export default function DACHPhoneShowcase() {
  const [openAd, setOpenAd] = useState<AdDetail | null>(null);

  return (
    <>
      <div className="dach-phones-wrapper">
        {ads.map((ad, i) => (
          <div key={i} className={`dach-phone-card ${i === 0 ? "dach-phone-left" : "dach-phone-right"}`}>
            <img
              src={ad.image}
              alt={ad.title}
              className="dach-phone-image"
              draggable={false}
            />
            <button
              onClick={() => setOpenAd(ad)}
              className="dach-pulse-button"
              aria-label={`View details for ${ad.title}`}
            >
              <span className="dach-pulse-ring" />
              <span className="dach-pulse-icon">+</span>
            </button>
          </div>
        ))}
      </div>

      <Dialog open={!!openAd} onOpenChange={() => setOpenAd(null)}>
        <DialogContent className="dach-modal sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-foreground text-lg font-extrabold">
              {openAd?.title}
            </DialogTitle>
          </DialogHeader>
          {openAd && (
            <div className="space-y-5">
              <p className="text-sm text-muted-foreground leading-relaxed">
                {openAd.summary}
              </p>
              <div className="grid grid-cols-2 gap-3">
                {openAd.stats.map((s) => (
                  <div key={s.label} className="dach-modal-stat">
                    <span className="text-xl font-extrabold text-foreground">{s.value}</span>
                    <span className="kpi-pill-orange mt-1">{s.label}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
