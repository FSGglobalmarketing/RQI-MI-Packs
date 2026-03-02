import { useState, useRef, useEffect } from "react";

type DeviceMode = "iphone" | "ipad";

interface HeatmapDot {
  x: number; // percentage 0-100
  y: number; // percentage 0-100
  intensity: number; // 0-1
  radius: number; // px
  clicks?: number;
}

const DUMMY_HEATMAP: HeatmapDot[] = [
  { x: 50, y: 12, intensity: 0.95, radius: 38, clicks: 342 },
  { x: 72, y: 8, intensity: 0.7, radius: 28, clicks: 187 },
  { x: 30, y: 28, intensity: 0.55, radius: 32, clicks: 114 },
  { x: 65, y: 35, intensity: 0.85, radius: 36, clicks: 276 },
  { x: 48, y: 52, intensity: 0.45, radius: 26, clicks: 89 },
  { x: 20, y: 60, intensity: 0.3, radius: 22, clicks: 52 },
  { x: 55, y: 72, intensity: 0.65, radius: 30, clicks: 156 },
  { x: 80, y: 45, intensity: 0.4, radius: 24, clicks: 71 },
  { x: 35, y: 85, intensity: 0.5, radius: 28, clicks: 98 },
  { x: 60, y: 92, intensity: 0.35, radius: 20, clicks: 44 },
];

const DEVICE_SIZES = {
  iphone: { width: 300, height: 610, radius: 44, bezel: 6 },
  ipad: { width: 680, height: 460, radius: 28, bezel: 6 },
} as const;

function intensityToColor(intensity: number) {
  if (intensity > 0.75) return "rgba(255, 60, 20, 0.55)";
  if (intensity > 0.5) return "rgba(255, 140, 30, 0.45)";
  if (intensity > 0.3) return "rgba(255, 200, 50, 0.35)";
  return "rgba(255, 230, 100, 0.25)";
}

interface DeviceMockupProps {
  iframeSrc?: string;
  alt?: string;
}

export default function DeviceMockup({
  iframeSrc = "/mockups/na-campaign.html",
  alt = "Campaign preview",
}: DeviceMockupProps) {
  const [device, setDevice] = useState<DeviceMode>("iphone");
  const [showHeatmap, setShowHeatmap] = useState(true);
  const [hoveredDot, setHoveredDot] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  const size = DEVICE_SIZES[device];

  // Auto-scale to fit container
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const measure = () => {
      const parentWidth = el.parentElement?.clientWidth ?? size.width;
      const maxWidth = Math.min(parentWidth - 16, size.width);
      setScale(Math.min(1, maxWidth / size.width));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [device, size.width]);

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Toggle switch */}
      <div className="flex items-center gap-1 p-1 rounded-full bg-white/5 border border-white/10">
        <button
          onClick={() => setDevice("iphone")}
          className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
            device === "iphone"
              ? "bg-primary text-white shadow-md"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          📱 iPhone
        </button>
        <button
          onClick={() => setDevice("ipad")}
          className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
            device === "ipad"
              ? "bg-primary text-white shadow-md"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          📱 iPad
        </button>
      </div>

      {/* Heatmap toggle */}
      <button
        onClick={() => setShowHeatmap((v) => !v)}
        className={`text-[10px] font-medium px-3 py-1 rounded-full border transition-all ${
          showHeatmap
            ? "border-primary/40 bg-primary/10 text-primary"
            : "border-white/10 text-muted-foreground hover:text-foreground"
        }`}
      >
        {showHeatmap ? "🔥 Heatmap On" : "Heatmap Off"}
      </button>

      {/* Device frame */}
      <div
        ref={containerRef}
        className="relative transition-all duration-500 ease-out"
        style={{
          width: size.width * scale,
          height: size.height * scale,
        }}
      >
        <div
          className="origin-top-left"
          style={{
            width: size.width,
            height: size.height,
            transform: `scale(${scale})`,
            borderRadius: size.radius,
            border: `${size.bezel}px solid #333`,
            background: "#000",
            overflow: "hidden",
            boxShadow: "0 25px 70px -10px rgba(0,0,0,0.6)",
            position: "relative",
          }}
        >
          {/* Dynamic Island (iPhone only) */}
          {device === "iphone" && (
            <div
              className="absolute top-[10px] left-1/2 -translate-x-1/2 z-20"
              style={{
                width: 90,
                height: 24,
                background: "#000",
                borderRadius: 9999,
              }}
            />
          )}

          {/* Camera (iPad) */}
          {device === "ipad" && (
            <div
              className="absolute top-1/2 right-[6px] -translate-y-1/2 z-20"
              style={{
                width: 8,
                height: 8,
                background: "#1a1a1a",
                borderRadius: 9999,
                border: "1px solid #444",
              }}
            />
          )}

          {/* Iframe content */}
          <iframe
            src={iframeSrc}
            title={alt}
            className="absolute inset-0 w-full h-full border-0"
            style={{ borderRadius: size.radius - size.bezel }}
          />

          {/* Heatmap overlay */}
          {showHeatmap && (
            <div
              className="absolute inset-0 z-10 pointer-events-none transition-opacity duration-300"
              style={{ borderRadius: size.radius - size.bezel, overflow: "hidden" }}
            >
              {/* Semi-transparent overlay */}
              <div className="absolute inset-0 bg-black/10" />

              {DUMMY_HEATMAP.map((dot, i) => (
                <div
                  key={i}
                  className="absolute pointer-events-auto cursor-pointer transition-transform duration-200"
                  style={{
                    left: `${dot.x}%`,
                    top: `${dot.y}%`,
                    transform: `translate(-50%, -50%) scale(${hoveredDot === i ? 1.3 : 1})`,
                  }}
                  onMouseEnter={() => setHoveredDot(i)}
                  onMouseLeave={() => setHoveredDot(null)}
                >
                  {/* Glow ring */}
                  <div
                    className="rounded-full animate-pulse"
                    style={{
                      width: dot.radius * 2,
                      height: dot.radius * 2,
                      background: `radial-gradient(circle, ${intensityToColor(dot.intensity)}, transparent 70%)`,
                      filter: `blur(${dot.radius * 0.3}px)`,
                    }}
                  />
                  {/* Center dot */}
                  <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
                    style={{
                      width: 6,
                      height: 6,
                      background: intensityToColor(dot.intensity).replace(/[\d.]+\)$/, "0.9)"),
                      boxShadow: `0 0 8px ${intensityToColor(dot.intensity)}`,
                    }}
                  />
                  {/* Tooltip on hover */}
                  {hoveredDot === i && dot.clicks && (
                    <div
                      className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-1 rounded text-[10px] font-bold z-30"
                      style={{
                        background: "rgba(0,0,0,0.85)",
                        color: "#fff",
                        border: "1px solid rgba(255,84,36,0.4)",
                      }}
                    >
                      {dot.clicks} clicks
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Home indicator (iPhone) */}
          {device === "iphone" && (
            <div
              className="absolute bottom-[6px] left-1/2 -translate-x-1/2 z-20"
              style={{
                width: 90,
                height: 4,
                borderRadius: 9999,
                background: "rgba(255,255,255,0.3)",
              }}
            />
          )}
        </div>
      </div>

      {/* Legend */}
      {showHeatmap && (
        <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full" style={{ background: "rgba(255, 60, 20, 0.8)" }} />
            High
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full" style={{ background: "rgba(255, 140, 30, 0.7)" }} />
            Medium
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full" style={{ background: "rgba(255, 230, 100, 0.6)" }} />
            Low
          </span>
          <span className="ml-2 opacity-60">Hover for details</span>
        </div>
      )}
    </div>
  );
}
