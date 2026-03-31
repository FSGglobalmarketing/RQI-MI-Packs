import { reportData } from "@/data/igneo-report";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceArea } from "recharts";
import { CheckCircle, ArrowRight } from "lucide-react";
import { useState, useCallback, useRef, useEffect } from "react";
import { Switch } from "@/components/ui/switch";
import KpiRow from "./KpiRow";

/* RQI gradient accent palette for chart lines */
const LINE_CONFIG: { key: string; color: string; width: number; opacity: number }[] = [
  { key: "RQI", color: "#0F9AFF", width: 3, opacity: 1 },          // RQI Blue — always prominent
  { key: "CIP", color: "#56658B", width: 1.2, opacity: 0.75 },     // Slate
  { key: "Antin", color: "#999999", width: 1.2, opacity: 0.75 },   // Grey
  { key: "IFM", color: "#D37669", width: 1.2, opacity: 0.75 },     // Coral
  { key: "Infravia", color: "#F99C46", width: 1.2, opacity: 0.75 },// Amber
  { key: "Global Infra", color: "#FFCC00", width: 1.2, opacity: 0.75 }, // Gold
  { key: "CVC", color: "#777777", width: 1.2, opacity: 0.75 },     // Grey
  { key: "DIF", color: "#aaaaaa", width: 1.2, opacity: 0.75 },     // Light grey
  { key: "KKR", color: "#888888", width: 1.2, opacity: 0.75 },     // Grey
  { key: "Blackstone", color: "#555555", width: 1.2, opacity: 0.75 }, // Dark grey
  { key: "Vauban", color: "#666666", width: 1.2, opacity: 0.75 },  // Grey
  { key: "Stonepeak", color: "#444444", width: 1.2, opacity: 0.6 },// Dark grey
  { key: "Ardian", color: "#bbbbbb", width: 1.2, opacity: 0.5 },   // Light grey
];

const DATA_KEYS = LINE_CONFIG.map((l) => l.key);

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  const sorted = [...payload].sort((a: any, b: any) => {
    if (a.dataKey === "RQI") return -1;
    if (b.dataKey === "RQI") return 1;
    return (b.value ?? 0) - (a.value ?? 0);
  });

  return (
    <div className="bg-background rounded-[10px] px-4 py-3 min-w-[320px] max-w-[420px] border border-foreground/12">
      <p className="text-primary font-bold text-[13px] mb-2">{label}</p>
      <div className="grid grid-cols-2 gap-x-6 gap-y-1">
        {sorted.map((entry: any) => (
          <div key={entry.dataKey} className="flex justify-between gap-3">
            <span className={`text-[11px] ${entry.dataKey === "RQI" ? "text-primary font-bold" : "text-foreground/60"}`}>
              {entry.dataKey}
            </span>
            <span className={`text-[11px] tabular-nums ${entry.dataKey === "RQI" ? "text-primary font-bold" : "text-foreground/85"}`}>
              {entry.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ChartScrollContainer({ children, onWheelHandler }: { children: React.ReactNode; onWheelHandler: (e: React.WheelEvent) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const handler = (e: WheelEvent) => { e.preventDefault(); e.stopPropagation(); };
    el.addEventListener("wheel", handler, { passive: false });
    return () => el.removeEventListener("wheel", handler);
  }, []);
  return <div ref={ref} onWheel={onWheelHandler} className="select-none">{children}</div>;
}

export default function SearchVisibility() {
  const s = reportData.searchVisibility;
  const allData = s.chartData;
  const [hiddenLines, setHiddenLines] = useState<Set<string>>(new Set());
  const [showPeers, setShowPeers] = useState(true);

  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(allData.length - 1);
  const [refAreaLeft, setRefAreaLeft] = useState<number | null>(null);
  const [refAreaRight, setRefAreaRight] = useState<number | null>(null);
  const dragging = useRef(false);

  const visibleData = allData.slice(left, right + 1);
  const visibleKeys = DATA_KEYS.filter((k) => !hiddenLines.has(k) && (k === "RQI" || showPeers));
  let yMax = 0;
  visibleData.forEach((d: any) => {
    visibleKeys.forEach((k) => { if (d[k] > yMax) yMax = d[k]; });
  });
  yMax = Math.ceil(yMax * 1.1);

  const handleLegendClick = useCallback((e: any) => {
    const key = e.dataKey || e.value;
    if (!key) return;
    setHiddenLines((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key); else next.add(key);
      return next;
    });
  }, []);

  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    const zoomIn = e.deltaY < 0;
    setLeft((l) => {
      setRight((r) => {
        const range = r - l;
        if (zoomIn && range <= 3) return r;
        const step = zoomIn ? 1 : -1;
        const newL = Math.max(0, l + step);
        const newR = Math.min(allData.length - 1, r - step);
        if (newL >= newR) return r;
        setLeft(newL);
        return newR;
      });
      return l;
    });
  }, [allData.length]);

  const onMouseDown = useCallback((e: any) => {
    if (e?.activeLabel) {
      setRefAreaLeft(allData.findIndex((d) => d.month === e.activeLabel));
      dragging.current = true;
    }
  }, [allData]);

  const onMouseMove = useCallback((e: any) => {
    if (dragging.current && e?.activeLabel) {
      setRefAreaRight(allData.findIndex((d) => d.month === e.activeLabel));
    }
  }, [allData]);

  const onMouseUp = useCallback(() => {
    if (refAreaLeft !== null && refAreaRight !== null) {
      const l = Math.min(refAreaLeft, refAreaRight);
      const r = Math.max(refAreaLeft, refAreaRight);
      if (r - l >= 2) { setLeft(l); setRight(r); }
    }
    setRefAreaLeft(null); setRefAreaRight(null); dragging.current = false;
  }, [refAreaLeft, refAreaRight]);

  const resetZoom = useCallback(() => { setLeft(0); setRight(allData.length - 1); }, [allData.length]);
  const isZoomed = left !== 0 || right !== allData.length - 1;

  return (
    <section id="search-visibility" className="section-cream py-24 flow-section-cream relative">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-[1]">
        {/* Header */}
        <div className="flex flex-wrap items-center gap-3 mb-2">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-secondary-foreground">
            Search engine visibility
          </h2>
          <span className="stage-badge text-xs">Awareness</span>
        </div>
        <p className="text-secondary-foreground/70 mb-8">{s.description}</p>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Left column */}
          <div className="space-y-6">
            <p className="text-sm leading-relaxed text-secondary-foreground/70">{s.goal}</p>

            <div>
              <h4 className="text-sm font-bold mb-3 text-secondary-foreground">Marketing Activities</h4>
              <ul className="space-y-2">
                {s.marketingActivities.map((a) => (
                  <li key={a} className="text-sm flex items-start gap-2 text-secondary-foreground/70">
                    <span className="text-primary mt-0.5 shrink-0">+</span>{a}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-bold mb-3 text-secondary-foreground">Focus Areas</h4>
              <div className="flex flex-wrap gap-2">
                {s.focusAreas.map((f) => (
                  <span key={f} className="glass-pill-cream">{f}</span>
                ))}
              </div>
            </div>

            {/* Key Results — KPI list style with pills */}
            <div>
              <h4 className="text-sm font-bold mb-4 text-secondary-foreground">Key Results</h4>
              <div className="space-y-3">
                {s.kpis.map((kpi) => (
                  <KpiRow key={kpi.label} value={kpi.value} label={kpi.label} comparison={kpi.comparison} variant="cream" />
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="glass-card-cream flow-corner-bl">
                <h4 className="text-sm font-bold mb-3 text-secondary-foreground">Focus in Q4</h4>
                <ul className="space-y-2">
                  {s.focusAreas.map((item) => (
                    <li key={item} className="text-sm flex items-start gap-2 text-secondary-foreground/70">
                      <svg className="w-4 h-4 text-success shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="glass-card-cream flow-corner-tr">
                <h4 className="text-sm font-bold mb-3 text-secondary-foreground">Focus in Q1</h4>
                <ul className="space-y-2">
                  {s.nextQuarter.map((item) => (
                    <li key={item} className="text-sm flex items-start gap-2 text-secondary-foreground/70">
                      <span className="text-primary mt-0.5 shrink-0">+</span>{item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Right column — chart */}
          <div className="glass-card-cream flow-corner-br min-h-[540px] flex flex-col">
            <div className="flex items-start justify-between mb-1">
              <div>
                <h4 className="text-sm font-bold text-secondary-foreground mb-1">Search engine visibility</h4>
                <p className="text-xs text-secondary-foreground/60 mb-4">Number of times we show up in infrastructure searches between pages 1-3.</p>
              </div>
              {isZoomed && (
                <button onClick={resetZoom} className="text-xs font-semibold text-primary hover:underline shrink-0">Reset zoom</button>
              )}
            </div>
            <div className="flex items-center gap-2 mb-4">
              <Switch checked={showPeers} onCheckedChange={setShowPeers} className="scale-75" />
              <span className="text-xs text-secondary-foreground/60">Show peers</span>
            </div>
            <ChartScrollContainer onWheelHandler={handleWheel}>
              <ResponsiveContainer width="100%" height={500}>
                <LineChart data={visibleData} onMouseDown={onMouseDown} onMouseMove={onMouseMove} onMouseUp={onMouseUp}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
                  <XAxis dataKey="month" tick={{ fontSize: 10, fill: "#64748b" }} />
                  <YAxis tick={{ fontSize: 10, fill: "#64748b" }} domain={[0, yMax]} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend
                    wrapperStyle={{ fontSize: 10, cursor: "pointer" }}
                    onClick={handleLegendClick}
                    content={({ payload }) => {
                      if (!payload?.length) return null;
                      const lastDataPoint = visibleData[visibleData.length - 1] || {};
                      const sorted = [...payload].sort((a: any, b: any) => {
                        if (a.dataKey === "RQI") return -1;
                        if (b.dataKey === "RQI") return 1;
                        return (lastDataPoint[b.dataKey as string] ?? 0) - (lastDataPoint[a.dataKey as string] ?? 0);
                      });
                      return (
                        <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 pt-2 text-[10px]">
                          {sorted.map((entry: any) => {
                            const isHidden = hiddenLines.has(entry.dataKey) || (entry.dataKey !== "Igneo" && !showPeers);
                            return (
                              <span
                                key={entry.dataKey}
                                onClick={() => handleLegendClick(entry)}
                                className="cursor-pointer"
                                style={{
                                  color: isHidden ? "#ccc" : entry.color,
                                  textDecoration: isHidden ? "line-through" : undefined,
                                }}
                              >
                                ● {entry.dataKey}
                              </span>
                            );
                          })}
                        </div>
                      );
                    }}
                  />
                  {LINE_CONFIG.map(({ key, color, width, opacity }) => {
                    const isHidden = hiddenLines.has(key) || (key !== "Igneo" && !showPeers);
                    return (
                      <Line key={key} type="monotone" dataKey={key} stroke={color} strokeWidth={width} dot={false} strokeOpacity={isHidden ? 0 : opacity} animationDuration={800} hide={isHidden} />
                    );
                  })}
                  {refAreaLeft !== null && refAreaRight !== null && (
                    <ReferenceArea x1={allData[Math.min(refAreaLeft, refAreaRight)]?.month} x2={allData[Math.max(refAreaLeft, refAreaRight)]?.month} strokeOpacity={0.3} fill="rgba(15,154,255,0.1)" />
                  )}
                </LineChart>
              </ResponsiveContainer>
            </ChartScrollContainer>
            <p className="text-[10px] text-secondary-foreground/40 mt-2 text-center">Scroll to zoom · Drag to select range · Click legend to toggle</p>
          </div>
        </div>
      </div>
    </section>
  );
}
