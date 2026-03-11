import { reportData } from "@/data/igneo-report";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend, Cell, PieChart, Pie, ReferenceArea } from "recharts";
import { useState, useCallback, useRef, useEffect } from "react";
import KpiRow from "./KpiRow";

interface KpiItem {
  value: string;
  label: string;
  comparison: string;
}

interface CampaignProps {
  id: string;
  title: string;
  stage: string;
  subtitle: string;
  description: string;
  goals: string[];
  formats: string[];
  keyResults: KpiItem[];
  variant: "dark" | "cream";
  phoneImage?: React.ReactNode;
}

interface CampaignChartPageProps {
  id: string;
  title: string;
  variant: "dark" | "cream";
  children: React.ReactNode;
}

/* ── Page 1: Info ── */
export function CampaignSection({ id, title, stage, subtitle, description, goals, formats, keyResults, variant, phoneImage }: CampaignProps) {
  const isDark = variant === "dark";
  return (
    <section id={id} className={`${isDark ? "section-dark flow-section-dark" : "section-cream flow-section-cream"} py-24 relative`}>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-[1]">
        <div className="grid lg:grid-cols-2 gap-10 items-start">
          {/* Left column: all content */}
          <div className="space-y-6">
            <div>
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <h2 className={`text-3xl sm:text-4xl font-extrabold ${isDark ? "text-foreground" : "text-secondary-foreground"}`}>{title}</h2>
                <span className="stage-badge text-xs">{stage}</span>
              </div>
              <p className={`mb-0 ${isDark ? "text-muted-foreground" : "text-secondary-foreground/70"}`}>{subtitle}</p>
            </div>

            <p className={`text-sm leading-relaxed ${isDark ? "text-muted-foreground" : "text-secondary-foreground/70"}`}>{description}</p>

            <div>
              <h4 className={`text-sm font-bold mb-3 ${isDark ? "text-foreground" : "text-secondary-foreground"}`}>Goals</h4>
              <ul className="space-y-2">
                {goals.map((g) => (
                  <li key={g} className={`text-sm flex items-start gap-2 ${isDark ? "text-muted-foreground" : "text-secondary-foreground/70"}`}>
                    <span className="text-primary mt-0.5 shrink-0">+</span>{g}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className={`text-sm font-bold mb-3 ${isDark ? "text-foreground" : "text-secondary-foreground"}`}>Formats</h4>
              <div className="flex flex-wrap gap-2">
                {formats.map((f) => (
                  <span key={f} className={isDark ? "glass-pill-dark" : "glass-pill-cream"}>{f}</span>
                ))}
              </div>
            </div>

            {/* Key Results — KPI list style matching Performance section */}
            <div>
              <h4 className={`text-sm font-bold mb-4 ${isDark ? "text-foreground" : "text-secondary-foreground"}`}>Key Results</h4>
              <div className="space-y-3">
                {keyResults.map((kpi) => (
                  <KpiRow key={kpi.label} value={kpi.value} label={kpi.label} comparison={kpi.comparison} variant={variant} />
                ))}
              </div>
            </div>
          </div>

          {/* Right column: phone mockup */}
          <div className="flex items-start justify-center">
            {phoneImage}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Page 2: Chart (full width) ── */
export function CampaignChartPage({ id, title, variant, children, backgroundImage }: CampaignChartPageProps & { backgroundImage?: string }) {
  const isDark = variant === "dark";
  return (
    <section id={`${id}-data`} className={`${isDark ? "section-dark" : "section-cream"} py-24 relative overflow-hidden`}>
      {backgroundImage && (
        <>
          <div className="absolute inset-0">
            <img src={backgroundImage} alt="" className="w-full h-full object-cover object-center opacity-30" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/50 to-background/70" />
        </>
      )}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <h3 className={`text-2xl font-extrabold mb-8 ${isDark ? "text-foreground" : "text-secondary-foreground"}`}>
          Deep dive: <span className="font-bold">{title}</span>
        </h3>
        <div className="space-y-8">
          {children}
        </div>
      </div>
    </section>
  );
}

/* ── Scroll-contained chart wrapper ── */
function ChartScrollWrapper({ children, onWheel }: { children: React.ReactNode; onWheel: (e: React.WheelEvent) => void }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const handler = (e: WheelEvent) => {
      e.preventDefault();
      e.stopPropagation();
    };
    el.addEventListener("wheel", handler, { passive: false });
    return () => el.removeEventListener("wheel", handler);
  }, []);

  return (
    <div ref={ref} onWheel={onWheel} style={{ userSelect: "none" }}>
      {children}
    </div>
  );
}

/* ── Sorted tooltip used by all charts ── */
function SortedTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  const sorted = [...payload].sort((a: any, b: any) => (b.value ?? 0) - (a.value ?? 0));
  return (
    <div style={{ backgroundColor: "#111", borderRadius: 10, padding: "12px 16px", minWidth: 220, border: "1px solid rgba(255,255,255,0.12)" }}>
      <p style={{ color: "#0F9AFF", fontWeight: 700, fontSize: 13, marginBottom: 8 }}>{label}</p>
      {sorted.map((entry: any) => (
        <div key={entry.dataKey} style={{ display: "flex", justifyContent: "space-between", gap: 16, marginBottom: 2 }}>
          <span style={{ fontSize: 11, color: "rgba(255,255,255,0.6)" }}>{entry.name || entry.dataKey}</span>
          <span style={{ fontSize: 11, color: "rgba(255,255,255,0.85)", fontVariantNumeric: "tabular-nums" }}>{typeof entry.value === "number" ? entry.value.toLocaleString() : entry.value}</span>
        </div>
      ))}
    </div>
  );
}

/* ── Zoom hook ── */
function useChartZoom(allData: any[], labelKey: string) {
  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(allData.length - 1);
  const [refAreaLeft, setRefAreaLeft] = useState<number | null>(null);
  const [refAreaRight, setRefAreaRight] = useState<number | null>(null);
  const dragging = useRef(false);

  const visibleData = allData.slice(left, right + 1);
  const isZoomed = left !== 0 || right !== allData.length - 1;

  const handleWheel = useCallback((e: React.WheelEvent) => {
    const zoomIn = e.deltaY < 0;
    setLeft(l => {
      setRight(r => {
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
      setRefAreaLeft(allData.findIndex(d => d[labelKey] === e.activeLabel));
      dragging.current = true;
    }
  }, [allData, labelKey]);

  const onMouseMove = useCallback((e: any) => {
    if (dragging.current && e?.activeLabel) {
      setRefAreaRight(allData.findIndex(d => d[labelKey] === e.activeLabel));
    }
  }, [allData, labelKey]);

  const onMouseUp = useCallback(() => {
    if (refAreaLeft !== null && refAreaRight !== null) {
      const l = Math.min(refAreaLeft, refAreaRight);
      const r = Math.max(refAreaLeft, refAreaRight);
      if (r - l >= 2) { setLeft(l); setRight(r); }
    }
    setRefAreaLeft(null);
    setRefAreaRight(null);
    dragging.current = false;
  }, [refAreaLeft, refAreaRight]);

  const resetZoom = useCallback(() => {
    setLeft(0);
    setRight(allData.length - 1);
  }, [allData.length]);

  return { visibleData, isZoomed, handleWheel, onMouseDown, onMouseMove, onMouseUp, resetZoom, refAreaLeft, refAreaRight, allData };
}

/* ── North America Chart ── */
export function NorthAmericaChart() {
  const allData = [
    { month: "Jan", page1: 30, page2: 40, page3: 35, page4: 50 },
    { month: "Feb", page1: 35, page2: 45, page3: 38, page4: 55 },
    { month: "Mar", page1: 40, page2: 50, page3: 40, page4: 60 },
    { month: "Apr", page1: 45, page2: 55, page3: 42, page4: 80 },
    { month: "May", page1: 50, page2: 58, page3: 40, page4: 100 },
    { month: "Jun", page1: 55, page2: 60, page3: 38, page4: 160 },
    { month: "Jul", page1: 70, page2: 55, page3: 40, page4: 180 },
    { month: "Aug", page1: 80, page2: 50, page3: 42, page4: 170 },
    { month: "Sep", page1: 90, page2: 48, page3: 40, page4: 150 },
    { month: "Oct", page1: 100, page2: 45, page3: 38, page4: 140 },
    { month: "Nov", page1: 110, page2: 42, page3: 36, page4: 130 },
    { month: "Dec", page1: 135, page2: 40, page3: 35, page4: 120 },
  ];

  const zoom = useChartZoom(allData, "month");

  return (
    <div className="metric-card flow-corner-br">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h4 className="text-sm font-bold text-foreground">Page ranking positions for North American content</h4>
          <p className="text-xs text-muted-foreground/60 mt-1">Monthly page ranking distribution across search result pages.</p>
        </div>
        {zoom.isZoomed && <button onClick={zoom.resetZoom} className="text-xs font-semibold text-primary hover:underline shrink-0">Reset zoom</button>}
      </div>
      <ChartScrollWrapper onWheel={zoom.handleWheel}>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={zoom.visibleData} onMouseDown={zoom.onMouseDown} onMouseMove={zoom.onMouseMove} onMouseUp={zoom.onMouseUp}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#94a3b8" }} />
            <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} />
            <Tooltip content={<SortedTooltip />} />
            <Legend wrapperStyle={{ fontSize: 11 }} />
            <Line type="monotone" dataKey="page1" stroke="#0F9AFF" strokeWidth={2.5} dot={false} animationDuration={1500} name="Page 1" />
             <Line type="monotone" dataKey="page2" stroke="#56658B" strokeWidth={2} dot={false} animationDuration={1500} name="Page 2" />
             <Line type="monotone" dataKey="page3" stroke="#D37669" strokeWidth={2} dot={false} animationDuration={1500} name="Page 3" />
             <Line type="monotone" dataKey="page4" stroke="#F99C46" strokeWidth={1.5} dot={false} animationDuration={1500} name="Page 4" />
            {zoom.refAreaLeft !== null && zoom.refAreaRight !== null && (
              <ReferenceArea x1={allData[Math.min(zoom.refAreaLeft, zoom.refAreaRight)]?.month} x2={allData[Math.max(zoom.refAreaLeft, zoom.refAreaRight)]?.month} strokeOpacity={0.3} fill="rgba(15,154,255,0.1)" />
            )}
          </LineChart>
        </ResponsiveContainer>
      </ChartScrollWrapper>
      <p className="text-[10px] text-muted-foreground/40 mt-2 text-center">Scroll to zoom · Drag to select range</p>
    </div>
  );
}

export function NorthAmericaExtra() {
  const d = reportData.campaigns.northAmerica;
  return (
    <div className="metric-card grid grid-cols-3 gap-3">
      {[d.searchAppearances, ...d.pageRankKPIs].map((kpi: any) => (
        <div key={kpi.label} className="text-center">
          <span className="text-2xl font-extrabold text-foreground">{kpi.value}</span>
          <span className="kpi-pill-good block mt-1 mx-auto w-fit">{kpi.label}</span>
          <span className="stat-positive block mt-1 text-xs">{kpi.comparison}</span>
        </div>
      ))}
    </div>
  );
}

/* ── DACH Charts ── */
const DACH_COLORS = ["#0F9AFF", "#56658B", "#D37669", "#F99C46"];

export function DACHCharts() {
  const countries = [
    { name: "Germany", value: 66 },
    { name: "Switzerland", value: 29 },
    { name: "France", value: 3 },
    { name: "Other", value: 2 },
  ];
  const companies = [
    { company: "Mercedes-Benz AG", views: 4143 },
    { company: "Volkswagen", views: 2110 },
    { company: "Allianz", views: 1556 },
    { company: "Porsche AG", views: 1376 },
    { company: "Sparkasse", views: 955 },
  ];

  return (
    <>
      <div className="glass-card-cream flow-corner-bl">
        <h4 className="text-sm font-bold text-secondary-foreground mb-4">Audience by Country</h4>
        <ResponsiveContainer width="100%" height={340}>
          <PieChart>
            <Pie data={countries} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} animationDuration={1200}>
              {countries.map((_, i) => (
                <Cell key={i} fill={DACH_COLORS[i]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="glass-card-cream flow-corner-tr">
        <h4 className="text-sm font-bold text-secondary-foreground mb-4">Top Companies by Ad Views</h4>
        <ResponsiveContainer width="100%" height={340}>
          <BarChart data={companies} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
            <XAxis type="number" tick={{ fontSize: 11, fill: "#64748b" }} />
            <YAxis dataKey="company" type="category" width={120} tick={{ fontSize: 11, fill: "#64748b" }} />
            <Tooltip contentStyle={{ backgroundColor: "#111", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "10px", color: "#fff" }} />
            <Bar dataKey="views" fill="#0F9AFF" radius={[0, 6, 6, 0]} animationDuration={1200} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}

/* ── UK & Nordics Chart (deep dive) ── */
const UK_CHART_DATA = [
  { name: "Proactive mgmt.", impressions: 55000, clicks: 2100, ctr: 3.8 },
  { name: "Middle market (Snow)", impressions: 50000, clicks: 1800, ctr: 3.6 },
  { name: "Middle-market (LNG)", impressions: 60000, clicks: 3200, ctr: 5.3 },
  { name: "Höegh Esperanza", impressions: 50229, clicks: 2174, ctr: 4.3 },
];

function formatKUK(v: number) {
  if (v >= 1_000_000) return `${(v / 1_000_000).toFixed(1)}M`;
  if (v >= 1000) return `${(v / 1000).toFixed(1)}k`;
  return String(v);
}

export function UKNordicsChart() {
  return (
    <div className="metric-card flow-corner-bl">
      <h4 className="text-sm font-bold text-foreground mb-4">Ad Performance — Impressions vs Clicks</h4>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={UK_CHART_DATA}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
          <XAxis dataKey="name" tick={{ fontSize: 9, fill: "#94a3b8" }} interval={0} />
          <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} tickFormatter={formatKUK} />
          <Tooltip content={<SortedTooltip />} cursor={{ fill: "rgba(255,255,255,0.04)" }} />
          <Legend wrapperStyle={{ fontSize: 11 }} />
          <Bar dataKey="impressions" fill="#56658B" radius={[4, 4, 0, 0]} animationDuration={1200} name="Impressions" />
          <Bar dataKey="clicks" fill="#0F9AFF" radius={[4, 4, 0, 0]} animationDuration={1200} name="Clicks" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function UKNordicsLearnings() {
  const learnings = reportData.campaigns.ukNordics.keyLearnings;
  return (
    <div className="glass-card-dark flow-corner-br border border-foreground/10">
      <h4 className="text-base font-bold text-foreground mb-4 flex items-center gap-2">
        <span className="text-primary">→</span> Key Learnings
      </h4>
      <ul className="space-y-3">
        {learnings.map((l: string) => (
          <li key={l} className="text-sm text-muted-foreground flex items-start gap-3">
            <span className="text-primary mt-0.5 shrink-0 font-bold">+</span>{l}
          </li>
        ))}
      </ul>
    </div>
  );
}
