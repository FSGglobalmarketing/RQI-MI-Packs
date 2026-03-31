import { useState, useRef, useCallback, useEffect } from "react";
import "@/styles/device-mockup.css";
import currentHomepage from "@/assets/rqi-current-homepage.jpg";
import newHomepage from "@/assets/rqi-new-homepage.jpg";

type DeviceMode = "ipad" | "iphone";

function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  alt,
}: {
  beforeSrc: string;
  afterSrc: string;
  alt: string;
}) {
  const [pos, setPos] = useState(50);
  const wrapRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const updatePos = useCallback((clientX: number) => {
    const el = wrapRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    setPos((x / rect.width) * 100);
  }, []);

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      dragging.current = true;
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
      updatePos(e.clientX);
    },
    [updatePos]
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!dragging.current) return;
      updatePos(e.clientX);
    },
    [updatePos]
  );

  const onPointerUp = useCallback(() => {
    dragging.current = false;
  }, []);

  /* Sync scroll between the two layers */
  const afterRef = useRef<HTMLDivElement>(null);
  const beforeRef = useRef<HTMLDivElement>(null);
  const syncing = useRef(false);

  const syncScroll = useCallback((source: HTMLDivElement | null, target: HTMLDivElement | null) => {
    if (!source || !target || syncing.current) return;
    syncing.current = true;
    target.scrollTop = source.scrollTop;
    syncing.current = false;
  }, []);

  useEffect(() => {
    const afterEl = afterRef.current;
    const beforeEl = beforeRef.current;
    if (!afterEl || !beforeEl) return;

    const onAfterScroll = () => syncScroll(afterEl, beforeEl);
    const onBeforeScroll = () => syncScroll(beforeEl, afterEl);

    afterEl.addEventListener("scroll", onAfterScroll, { passive: true });
    beforeEl.addEventListener("scroll", onBeforeScroll, { passive: true });
    return () => {
      afterEl.removeEventListener("scroll", onAfterScroll);
      beforeEl.removeEventListener("scroll", onBeforeScroll);
    };
  }, [syncScroll]);

  return (
    <div
      ref={wrapRef}
      className="relative w-full h-full select-none"
    >
      {/* After (new) — full layer, scrollable */}
      <div
        ref={afterRef}
        className="absolute inset-0 overflow-y-auto overflow-x-hidden scrollbar-none"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        <img
          src={afterSrc}
          alt={`${alt} — new`}
          draggable={false}
          className="block w-full h-auto pointer-events-none"
        />
      </div>

      {/* Before (current) — clipped layer, scrollable */}
      <div
        ref={beforeRef}
        className="absolute inset-0 overflow-y-auto overflow-x-hidden scrollbar-none"
        style={{
          clipPath: `inset(0 ${100 - pos}% 0 0)`,
          WebkitOverflowScrolling: "touch",
        }}
      >
        <img
          src={beforeSrc}
          alt={`${alt} — current`}
          draggable={false}
          className="block w-full h-auto pointer-events-none"
        />
      </div>

      {/* Labels — sticky to viewport */}
      <div className="absolute top-2 left-2 z-30 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-black/60 text-white pointer-events-none">
        Current
      </div>
      <div className="absolute top-2 right-2 z-30 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-primary/80 text-primary-foreground pointer-events-none">
        New
      </div>

      {/* Divider line */}
      <div
        className="absolute top-0 bottom-0 z-20 w-[3px] -translate-x-1/2 pointer-events-none"
        style={{ left: `${pos}%`, background: "hsl(var(--primary))" }}
      />

      {/* Drag handle — only this element triggers drag */}
      <div
        className="absolute z-30 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize"
        style={{ left: `${pos}%`, top: "50%" }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
      >
        <div className="w-9 h-9 rounded-full bg-primary border-2 border-white shadow-lg flex items-center justify-center">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M5 3L2 8L5 13" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M11 3L14 8L11 13" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      {/* Invisible drag track across full width */}
      <div
        className="absolute top-0 bottom-0 left-0 right-0 z-20 cursor-ew-resize"
        style={{ pointerEvents: "none" }}
      />
      <div
        className="absolute z-20 cursor-ew-resize"
        style={{ left: `${pos}%`, top: 0, bottom: 0, width: "20px", transform: "translateX(-50%)" }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
      />
    </div>
  );
}

export default function SneakPeekSection() {
  const [device, setDevice] = useState<DeviceMode>("ipad");

  return (
    <section id="sneak-peek" className="bg-ash py-24">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12">
          <span className="stage-badge inline-block mb-3">Coming Soon</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground">
            Sneak Peek: RQI's Dedicated Website
          </h2>
          <p className="mt-3 text-sm text-muted-foreground max-w-xl mx-auto">
            Drag the slider to compare the current website with the new design
          </p>
        </div>

        {/* 20 : 60 : 20 grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_3fr_1fr] gap-8 items-center">
          {/* Left text */}
          <div className="space-y-4 text-center lg:text-right">
            <h3 className="text-lg font-bold text-foreground">A New Digital Home</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              A purpose-built platform designed to showcase RQI's investment philosophy, strategies and team — delivering a premium digital experience for advisers, consultants and institutional investors.
            </p>
          </div>

          {/* Centre: device mockup with pill toggle */}
          <div className="flex flex-col items-center gap-5">
            {/* Pill toggle */}
            <div className="device-toggle">
              <button
                className={`device-toggle-btn ${device === "ipad" ? "is-active" : ""}`}
                onClick={() => setDevice("ipad")}
              >
                iPad
              </button>
              <button
                className={`device-toggle-btn ${device === "iphone" ? "is-active" : ""}`}
                onClick={() => setDevice("iphone")}
              >
                iPhone
              </button>
            </div>

            {/* Device shell */}
            <div className="w-full flex justify-center">
              <div className={`device-shell ${device === "ipad" ? "device-ipad" : "device-iphone"}`}>
                {device === "ipad" && <div className="device-camera" />}
                {device === "iphone" && (
                  <>
                    <div className="device-island" />
                    <div className="device-home" />
                  </>
                )}

                {/* Replace device-scroll-viewport with custom container */}
                <div className="absolute inset-0 overflow-hidden" style={{
                  borderRadius: device === "ipad" ? "24px" : "46px",
                }}>
                  <BeforeAfterSlider
                    beforeSrc={currentHomepage}
                    afterSrc={newHomepage}
                    alt="RQI website"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right text */}
          <div className="space-y-4 text-center lg:text-left">
            <h3 className="text-lg font-bold text-foreground">Built for Impact</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Optimised for speed, SEO and accessibility — the new site will serve as the central hub for all RQI content, fund information and thought leadership, with a seamless experience across every device.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
