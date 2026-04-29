import { reportData } from "@/data/igneo-report";
import { SEARCH_DATA, REGION_META, getActiveCompetitors, type SearchRegion } from "@/data/search-ranking-data";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceArea } from "recharts";
import { useState, useCallback, useRef, useEffect } from "react";
import { Switch } from "@/components/ui/switch";
import { ChevronDown } from "lucide-react";

/* Brand-aligned palette — RQI uses primary Racing teal, peers get muted tones */
const PEER_COLORS: Record<string, string> = {
  RQI: "hsl(181 39% 35%)",
  AQR: "#56658B",
  Robeco: "#D37669",
  Macquarie: "#F99C46",
  PIMCO: "#FFCC00",
  Acadian: "#7ba98b",
  Platinum: "#999999",
  Osmosis: "#888888",
  Plato: "#bbbbbb",
  Arrowstreet: "#666666",
  Fidelity: "#2563eb",
};

function getColor(key: string) {
  return PEER_COLORS[key] || "#777777";
}

/* Custom X-axis tick with quarter labels */
function SearchQuarterTick({ x, y, payload }: any) {
  const month = payload.value as string;
  let qLabel = "";
  if (month.startsWith("Oct")) qLabel = "Q4";
  if (month.startsWith("Jan")) qLabel = "Q1";
  if (month.startsWith("Apr")) qLabel = "Q2";
  if (month.startsWith("Jul")) qLabel = "Q3";
  return (
    <g transform={`translate(${x},${y})`}>
      <text x={0} y={0} dy={12} textAnchor="middle" fontSize={10} fill="#94a3b8">{month}</text>
      {qLabel && (
        <text x={0} y={0} dy={26} textAnchor="middle" fontSize={8} fontWeight={700} fill="hsl(181 39% 35%)">
          {qLabel}
        </text>
      )}
    </g>
  );
}

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  const sorted = [...payload].sort((a: any, b: any) => {
    if (a.dataKey === "RQI") return -1;
    if (b.dataKey === "RQI") return 1;
    return (b.value ?? 0) - (a.value ?? 0);
  });
  return (
    <div className="bg-secondary-foreground rounded-[10px] px-4 py-3 min-w-[280px] border border-foreground/10">
      <p className="font-bold text-[13px] mb-2" style={{ color: "hsl(181 39% 35%)" }}>{label}</p>
      <div className="grid grid-cols-2 gap-x-6 gap-y-1">
        {sorted.map((entry: any) => (
          <div key={entry.dataKey} className="flex justify-between gap-3">
            <span className={`text-[11px] ${entry.dataKey === "RQI" ? "font-bold" : "opacity-70"}`} style={{ color: entry.dataKey === "RQI" ? "hsl(181 39% 35%)" : "#fff" }}>
              {entry.dataKey}
            </span>
            <span className={`text-[11px] tabular-nums ${entry.dataKey === "RQI" ? "font-bold" : "opacity-90"}`} style={{ color: entry.dataKey === "RQI" ? "hsl(181 39% 35%)" : "#fff" }}>
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

/* Pulsating region selector button */
function RegionDropdown({ region, setRegion }: { region: SearchRegion; setRegion: (r: SearchRegion) => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all bg-primary/10 text-primary border border-primary/20 hover:bg-primary/15"
      >
        {REGION_META[region].label}
        <ChevronDown className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-2 bg-white rounded-xl shadow-lg border border-secondary-foreground/10 py-1 z-50 min-w-[180px]">
          {(Object.keys(REGION_META) as SearchRegion[]).map((r) => (
            <button
              key={r}
              onClick={() => { setRegion(r); setOpen(false); }}
              className={`w-full text-left px-4 py-2.5 text-sm flex items-center gap-2 hover:bg-muted transition-colors ${
                region === r ? "font-bold text-primary" : "text-secondary-foreground"
              }`}
            >
              {REGION_META[r].label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function SearchVisibility() {
  const s = reportData.searchVisibility;
  const [region, setRegion] = useState<SearchRegion>("global");
  const [hiddenLines, setHiddenLines] = useState<Set<string>>(new Set());
  const [showPeers, setShowPeers] = useState(true);

  const allData = SEARCH_DATA[region];
  const activeKeys = getActiveCompetitors(region);

  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(allData.length - 1);
  const [refAreaLeft, setRefAreaLeft] = useState<number | null>(null);
  const [refAreaRight, setRefAreaRight] = useState<number | null>(null);
  const dragging = useRef(false);

  useEffect(() => {
    setLeft(0);
    setRight(SEARCH_DATA[region].length - 1);
    setHiddenLines(new Set());
  }, [region]);

  const visibleData = allData.slice(left, right + 1);
  const visibleKeys = activeKeys.filter((k) => !hiddenLines.has(k) && (k === "RQI" || showPeers));
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
    if (e?.activeLabel) { setRefAreaLeft(allData.findIndex((d) => d.month === e.activeLabel)); dragging.current = true; }
  }, [allData]);
  const onMouseMove = useCallback((e: any) => {
    if (dragging.current && e?.activeLabel) setRefAreaRight(allData.findIndex((d) => d.month === e.activeLabel));
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

  // KPIs: RQI latest + change vs start
  const latestRQI = allData[allData.length - 1]?.["RQI"] as number ?? 0;
  const firstRQI = allData[0]?.["RQI"] as number ?? 0;
  const rqiChange = firstRQI > 0 ? Math.round(((latestRQI - firstRQI) / firstRQI) * 100) : 0;

  // Global peer average (excluding RQI) for benchmarking
  const globalData = SEARCH_DATA["global"];
  const globalPeers = getActiveCompetitors("global").filter(k => k !== "RQI");
  const latestGlobalPeerValues = globalPeers.map(k => Number(globalData[globalData.length - 1]?.[k]) || 0).filter(v => v > 0);
  const globalPeerAvg = latestGlobalPeerValues.length > 0
    ? Math.round(latestGlobalPeerValues.reduce((a, b) => a + b, 0) / latestGlobalPeerValues.length)
    : 0;

  // RQI's global value for peer comparison
  const rqiGlobal = Number(globalData[globalData.length - 1]?.["RQI"]) || 0;
  const vsPeerAvg = globalPeerAvg > 0 ? Math.round(((rqiGlobal - globalPeerAvg) / globalPeerAvg) * 100) : 0;

  return (
    <section id="search-visibility" className="section-cream py-24 flow-section-cream relative">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-[1]">
        {/* Header */}
        <span className="stage-badge text-xs inline-block mb-3">Awareness</span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-secondary-foreground mb-2">
          Organic search performance
        </h2>
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
              <h4 className="text-sm font-bold mb-3 text-secondary-foreground">Our focus in</h4>
              <div className="grid grid-cols-2 gap-4">
              <div className="glass-card-cream flow-corner-bl">
                <h4 className="text-sm font-bold mb-3 text-secondary-foreground">Q1</h4>
                <ul className="space-y-2">
                  {s.focusQ1.map((item) => (
                    <li key={item} className="text-sm flex items-start gap-2 text-secondary-foreground/70">
                      <svg className="w-4 h-4 text-primary shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="glass-card-cream flow-corner-tr">
                <h4 className="text-sm font-bold mb-3 text-secondary-foreground">Q2</h4>
                <ul className="space-y-2">
                  {s.focusQ2.map((item) => (
                    <li key={item} className="text-sm flex items-start gap-2 text-secondary-foreground/70">
                      <span className="text-primary mt-0.5 shrink-0">+</span>{item}
                    </li>
                  ))}
                </ul>
              </div>
              </div>
            </div>
          </div>

          {/* Right column — chart */}
          <div className="glass-card-cream flow-corner-br min-h-[540px] flex flex-col">
            <div className="flex items-start justify-between mb-1">
              <div>
                <h4 className="text-sm font-bold text-secondary-foreground mb-1">Non-branded keyword positions</h4>
                <p className="text-xs text-secondary-foreground/50 mb-4">Number of non-branded keywords ranking on pages 1–3 of Google.</p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                {isZoomed && (
                  <button onClick={resetZoom} className="text-xs font-semibold text-primary hover:underline">Reset zoom</button>
                )}
                <RegionDropdown region={region} setRegion={setRegion} />
              </div>
            </div>
            <div className="flex items-center gap-2 mb-4">
              <Switch checked={showPeers} onCheckedChange={setShowPeers} className="scale-75" />
              <span className="text-xs text-secondary-foreground/50">Show peers</span>
            </div>
            <ChartScrollContainer onWheelHandler={handleWheel}>
              <ResponsiveContainer width="100%" height={500}>
                <LineChart data={visibleData} onMouseDown={onMouseDown} onMouseMove={onMouseMove} onMouseUp={onMouseUp}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
                  <XAxis dataKey="month" tick={<SearchQuarterTick />} height={45} />
                  <YAxis tick={{ fontSize: 10, fill: "#94a3b8" }} domain={[0, yMax]} />
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
                        return (Number(lastDataPoint[b.dataKey as string]) || 0) - (Number(lastDataPoint[a.dataKey as string]) || 0);
                      });
                      return (
                        <div className="flex flex-wrap justify-center gap-x-3 gap-y-1 pt-2 text-[10px]">
                          {sorted.map((entry: any) => {
                            const isHidden = hiddenLines.has(entry.dataKey) || (entry.dataKey !== "RQI" && !showPeers);
                            return (
                              <span
                                key={entry.dataKey}
                                onClick={() => handleLegendClick(entry)}
                                className="cursor-pointer font-medium"
                                style={{
                                  color: isHidden ? "rgba(0,0,0,0.15)" : entry.color,
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
                  {activeKeys.map((key) => {
                    const isHidden = hiddenLines.has(key) || (key !== "RQI" && !showPeers);
                    return (
                      <Line
                        key={key}
                        type="monotone"
                        dataKey={key}
                        stroke={getColor(key)}
                        strokeWidth={key === "RQI" ? 3 : 1.2}
                        dot={false}
                        strokeOpacity={isHidden ? 0 : key === "RQI" ? 1 : 0.75}
                        animationDuration={800}
                        hide={isHidden}
                      />
                    );
                  })}
                  {refAreaLeft !== null && refAreaRight !== null && (
                    <ReferenceArea x1={allData[Math.min(refAreaLeft, refAreaRight)]?.month as string} x2={allData[Math.max(refAreaLeft, refAreaRight)]?.month as string} strokeOpacity={0.3} fill="rgba(52,123,126,0.1)" />
                  )}
                </LineChart>
              </ResponsiveContainer>
            </ChartScrollContainer>
            <p className="text-[10px] text-secondary-foreground/30 mt-2 text-center">Scroll to zoom · Drag to select range · Click legend to toggle</p>
          </div>
        </div>
      </div>
    </section>
  );
}