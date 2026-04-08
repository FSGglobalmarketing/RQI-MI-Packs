import { useState } from "react";
import { ChevronLeft, ChevronRight, Info, X } from "lucide-react";
import macbookMockup from "@/assets/macbook-mockup.png";
import iphoneMockup from "@/assets/iphone-mockup.png";
import asiaOoh from "@/assets/asia-ooh.jpg";
import asiaAdv1 from "@/assets/asia-advertorial-1.jpg";
import asiaAdv2 from "@/assets/asia-advertorial-2.jpg";
import asiaAdv3 from "@/assets/asia-advertorial-3.jpg";
import asiaAdv4 from "@/assets/asia-advertorial-4.jpg";
import asiaNative1 from "@/assets/asia-native-1.jpg";
import asiaNative2 from "@/assets/asia-native-2.jpg";
import asiaNative3 from "@/assets/asia-native-3.jpg";
import asiaNative4 from "@/assets/asia-native-4.jpg";
import asiaLinkedin1 from "@/assets/asia-linkedin-1.jpg";
import asiaLinkedin2 from "@/assets/asia-linkedin-2.jpg";

const MEDIA_TABS = ["Out of Home", "Advertorial", "Native", "LinkedIn"] as const;
type MediaTab = typeof MEDIA_TABS[number];
type DeviceType = "laptop" | "phone" | "none";

interface AdInfo {
  market: string;
  platform: string;
  format: string;
  liveDate: string;
}

const AD_INFO: Record<MediaTab, AdInfo> = {
  "Out of Home": { market: "Hong Kong", platform: "Outdoor", format: "Tram Wrap", liveDate: "Q1 2026" },
  "Advertorial": { market: "Hong Kong", platform: "Desktop & Mobile", format: "Online Advertorial", liveDate: "23 Mar 2026" },
  "Native": { market: "Hong Kong", platform: "Desktop & Mobile", format: "Native Ad", liveDate: "23 Mar 2026" },
  "LinkedIn": { market: "Hong Kong & Singapore", platform: "LinkedIn", format: "Carousel & Image Ad", liveDate: "24 Mar 2026" },
};

const TAB_CONFIG: Record<MediaTab, { device: DeviceType; images: string[] }> = {
  "Out of Home": { device: "none", images: [asiaOoh] },
  "Advertorial": { device: "laptop", images: [asiaAdv1, asiaAdv2, asiaAdv3, asiaAdv4] },
  "Native": { device: "phone", images: [asiaNative1, asiaNative2, asiaNative3, asiaNative4] },
  "LinkedIn": { device: "phone", images: [asiaLinkedin1, asiaLinkedin2] },
};

export default function AsiaMediaShowcase() {
  const [activeTab, setActiveTab] = useState<MediaTab>("Out of Home");
  const [imgIdx, setImgIdx] = useState(0);
  const [showInfo, setShowInfo] = useState(false);
  const config = TAB_CONFIG[activeTab];
  const images = config.images;
  const info = AD_INFO[activeTab];

  const handleTabChange = (tab: MediaTab) => {
    setActiveTab(tab);
    setImgIdx(0);
    setShowInfo(false);
  };

  const prev = () => setImgIdx((i) => (i - 1 + images.length) % images.length);
  const next = () => setImgIdx((i) => (i + 1) % images.length);

  const InfoPin = ({ className = "" }: { className?: string }) => (
    <button
      onClick={() => setShowInfo(!showInfo)}
      className={`absolute z-30 w-7 h-7 rounded-full bg-primary/90 backdrop-blur-sm flex items-center justify-center shadow-lg hover:bg-primary transition-all hover:scale-110 ${className}`}
      title="Ad info"
    >
      {showInfo ? <X className="w-3.5 h-3.5 text-primary-foreground" /> : <Info className="w-3.5 h-3.5 text-primary-foreground" />}
    </button>
  );

  const InfoOverlay = () => (
    <div className="absolute inset-0 z-30 bg-black/75 backdrop-blur-sm flex items-center justify-center rounded-xl p-4 animate-in fade-in duration-200">
      <div className="text-center space-y-2">
        <p className="text-xs font-bold text-primary uppercase tracking-wider">{info.format}</p>
        <div className="space-y-1">
          <p className="text-white text-sm"><span className="text-white/50">Market:</span> {info.market}</p>
          <p className="text-white text-sm"><span className="text-white/50">Platform:</span> {info.platform}</p>
          <p className="text-white text-sm"><span className="text-white/50">Live:</span> {info.liveDate}</p>
        </div>
      </div>
    </div>
  );

  const Arrows = ({ onPrev, onNext }: { onPrev: () => void; onNext: () => void }) =>
    images.length > 1 ? (
      <>
        <button
          onClick={onPrev}
          className="absolute left-[-36px] top-1/2 -translate-y-1/2 z-30 w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-all"
        >
          <ChevronLeft className="w-4 h-4 text-white" />
        </button>
        <button
          onClick={onNext}
          className="absolute right-[-36px] top-1/2 -translate-y-1/2 z-30 w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-all"
        >
          <ChevronRight className="w-4 h-4 text-white" />
        </button>
      </>
    ) : null;

  const Dots = () =>
    images.length > 1 ? (
      <div className="flex justify-center gap-2 mt-3">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setImgIdx(i)}
            className={`w-2 h-2 rounded-full transition-all ${
              i === imgIdx ? "bg-primary scale-125" : "bg-white/30 hover:bg-white/50"
            }`}
          />
        ))}
      </div>
    ) : null;

  return (
    <div className="flex flex-col items-center justify-center h-full space-y-4">
      {/* Tab switcher */}
      <div className="flex gap-1 flex-wrap justify-center">
        {MEDIA_TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => handleTabChange(tab)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap ${
              activeTab === tab
                ? "bg-primary text-primary-foreground"
                : "text-white/50 hover:text-white"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {config.device === "laptop" ? (
        <div className="relative w-full max-w-[600px]">
          <InfoPin className="top-2 right-2" />
          {showInfo && <InfoOverlay />}
          <Arrows onPrev={prev} onNext={next} />
          <img src={macbookMockup} alt="Laptop mockup" className="w-full h-auto relative z-10" />
          <div className="absolute top-[5.5%] left-[11.5%] w-[77%] h-[73%] z-20 overflow-hidden bg-background/80 rounded-[2px] flex items-center justify-center">
            <img src={images[imgIdx]} alt={activeTab} className="w-full h-full object-cover" />
          </div>
          <Dots />
        </div>
      ) : config.device === "phone" ? (
        <div className="relative w-full max-w-[260px]">
          <InfoPin className="top-2 right-[-12px]" />
          {showInfo && <InfoOverlay />}
          <Arrows onPrev={prev} onNext={next} />
          <img src={iphoneMockup} alt="iPhone mockup" className="w-full h-auto relative z-10" />
          <div className="absolute top-[2.8%] left-[5.5%] w-[89%] h-[94.5%] z-20 overflow-hidden rounded-[32px] flex items-center justify-center bg-background/80">
            <img src={images[imgIdx]} alt={activeTab} className="w-full h-full object-cover" />
          </div>
          <Dots />
        </div>
      ) : (
        <div className="relative w-full max-w-[600px]">
          <InfoPin className="top-4 right-4" />
          {showInfo && <InfoOverlay />}
          <div className="rounded-xl overflow-hidden">
            <img src={images[0]} alt="Out of Home — Tram wrap" className="w-full h-auto rounded-xl" />
          </div>
        </div>
      )}
    </div>
  );
}
