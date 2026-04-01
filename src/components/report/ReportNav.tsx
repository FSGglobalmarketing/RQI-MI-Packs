import { useState, useEffect, useRef, useCallback } from "react";
import rqiLogo from "@/assets/RQI_Positive_White.svg";

const navItems = [
  { id: "overview", label: "Overview" },
  { id: "performance", label: "KPI Framework" },
  { id: "salesforce", label: "CRM" },
  { id: "search-visibility", label: "Search" },
  { id: "asia-campaign", label: "Asia Campaign" },
  { id: "fmoty", label: "FMOTY" },
  { id: "demystified", label: "Demystified" },
  { id: "website", label: "Website" },
  { id: "linkedin", label: "LinkedIn" },
  { id: "events", label: "Events" },
  { id: "sentiment", label: "Sentiment" },
];

/* Funnel stage groupings — indices into navItems */
const funnelStages = [
  { label: "Summary", startIdx: 0, endIdx: 1 },
  { label: "Awareness", startIdx: 2, endIdx: 5 },
  { label: "Consideration", startIdx: 6, endIdx: 7 },
  { label: "Conversion", startIdx: 8, endIdx: 8 },
  { label: "Monitoring", startIdx: 9, endIdx: 9 },
];

export default function ReportNav() {
  const [active, setActive] = useState("overview");
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [, setTick] = useState(0);
  const navRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      const sections = navItems.map((n) => document.getElementById(n.id));
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = sections[i];
        if (el && el.getBoundingClientRect().top <= 120) {
          setActive(navItems[i].id);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    const onResize = () => setTick((t) => t + 1);
    window.addEventListener("resize", onResize);
    // Force bracket recalculation after first paint
    requestAnimationFrame(() => setTick((t) => t + 1));
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  /* Compute bracket positions from DOM refs */
  const getBracketStyle = (startIdx: number, endIdx: number) => {
    const startEl = navRefs.current[startIdx];
    const endEl = navRefs.current[endIdx];
    if (!startEl || !endEl) return { left: 0, width: 0 };
    const parent = startEl.parentElement;
    if (!parent) return { left: 0, width: 0 };
    const parentRect = parent.getBoundingClientRect();
    const startRect = startEl.getBoundingClientRect();
    const endRect = endEl.getBoundingClientRect();
    return {
      left: startRect.left - parentRect.left,
      width: endRect.right - startRect.left,
    };
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-ash/95 backdrop-blur-md shadow-lg border-b border-border" : "bg-transparent"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[67px]">
          <img src={rqiLogo} alt="RQI Investors" className="h-14 w-auto" />

          {/* Desktop nav */}
          <div className="hidden lg:flex flex-col items-end">
            {/* Nav links row */}
            <div className="relative flex items-center gap-0.5">
              {navItems.map((item, i) => (
                <a
                  key={item.id}
                  ref={(el) => { navRefs.current[i] = el; }}
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`px-3 py-1.5 rounded-md text-[11px] tracking-wide uppercase transition-all whitespace-nowrap ${
                    active === item.id
                      ? "text-primary bg-primary/10 font-semibold border border-primary/30"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </div>

            {/* Funnel stage brackets */}
            <div className="relative flex items-center gap-0.5 h-6 w-full">
              {funnelStages.map((stage) => {
                const style = getBracketStyle(stage.startIdx, stage.endIdx);
                const activeIdx = navItems.findIndex((n) => n.id === active);
                const isActiveStage = activeIdx >= stage.startIdx && activeIdx <= stage.endIdx;
                return (
                  <div
                    key={stage.label}
                    className="absolute flex flex-col items-center"
                    style={{ left: style.left, width: style.width }}
                  >
                    {/* Bracket line */}
                    <svg
                      className="w-full h-3"
                      viewBox="0 0 100 12"
                      preserveAspectRatio="none"
                      fill="none"
                    >
                      <path
                        d="M2 0 L2 6 L98 6 L98 0"
                        stroke={isActiveStage ? "hsl(var(--primary))" : "hsl(var(--muted))"}
                        strokeWidth="1.5"
                        vectorEffect="non-scaling-stroke"
                        fill="none"
                      />
                      <path
                        d="M50 6 L50 12"
                        stroke={isActiveStage ? "hsl(var(--primary))" : "hsl(var(--muted))"}
                        strokeWidth="1.5"
                        vectorEffect="non-scaling-stroke"
                        fill="none"
                      />
                    </svg>
                    <span
                      className={`text-[9px] tracking-widest uppercase ${
                        isActiveStage ? "text-primary font-semibold" : "text-muted-foreground"
                      }`}
                    >
                      {stage.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-2 text-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {mobileOpen ? (
                <path d="M18 6L6 18M6 6l12 12" />
              ) : (
                <path d="M3 12h18M3 6h18M3 18h18" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden pb-4 grid grid-cols-2 gap-1">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  setMobileOpen(false);
                  document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
                }}
                className={`px-3 py-2 rounded-md text-sm ${
                  active === item.id ? "text-primary bg-primary/10" : "text-muted-foreground"
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
