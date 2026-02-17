import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend, Cell, PieChart, Pie, ReferenceArea } from "recharts";
import { useState, useCallback, useRef } from "react";

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
  chart?: React.ReactNode;
  extra?: React.ReactNode;
}

export function CampaignSection({ id, title, stage, subtitle, description, goals, formats, keyResults, variant, chart, extra }: CampaignProps) {
  const isDark = variant === "dark";
  return (
    <section id={id} className={`${isDark ? "section-dark" : "section-cream"} py-20`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center gap-3 mb-2">
          <h2 className={`text-3xl sm:text-4xl font-extrabold ${isDark ? "text-foreground" : "text-secondary-foreground"}`}>{title}</h2>
          <span className="stage-badge text-xs">{stage}</span>
        </div>
        <p className={`mb-8 ${isDark ? "text-muted-foreground" : "text-secondary-foreground/70"}`}>{subtitle}</p>

        <div className="grid lg:grid-cols-2 gap-10">
          <div className="space-y-6">
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
                  <span key={f} className={`text-xs px-4 py-1.5 rounded-full border ${isDark ? "border-border text-muted-foreground" : "border-secondary-foreground/20 text-secondary-foreground/70"}`}>{f}</span>
                ))}
              </div>
            </div>

            <div>
              <h4 className={`text-sm font-bold mb-3 ${isDark ? "text-foreground" : "text-secondary-foreground"}`}>Key Results</h4>
              <div className="grid grid-cols-2 gap-3">
                {keyResults.map((kpi) => (
                  <div key={kpi.label} className={`rounded-xl p-4 ${isDark ? "bg-card border border-border" : "bg-background/5 border border-secondary-foreground/10"}`}>
                    <span className={`text-2xl font-extrabold block ${isDark ? "text-foreground" : "text-secondary-foreground"}`}>{kpi.value}</span>
                    <span className={`text-xs block mt-1 ${isDark ? "text-muted-foreground" : "text-secondary-foreground/60"}`}>{kpi.label}</span>
                    <span className="stat-positive block mt-1">{kpi.comparison}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {chart}
            {extra}
          </div>
        </div>
      </div>
    </section>
  );
}

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

  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(allData.length - 1);
  const [refAreaLeft, setRefAreaLeft] = useState<number | null>(null);
  const [refAreaRight, setRefAreaRight] = useState<number | null>(null);
  const dragging = useRef(false);
  const visibleData = allData.slice(left, right + 1);
  const isZoomed = left !== 0 || right !== allData.length - 1;

  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    const zoomIn = e.deltaY < 0;
    setLeft(l => { setRight(r => { const range = r - l; if (zoomIn && range <= 3) return r; const step = zoomIn ? 1 : -1; const newL = Math.max(0, l + step); const newR = Math.min(allData.length - 1, r - step); if (newL >= newR) return r; setLeft(newL); return newR; }); return l; });
  }, [allData.length]);

  const onMouseDown = useCallback((e: any) => { if (e?.activeLabel) { setRefAreaLeft(allData.findIndex(d => d.month === e.activeLabel)); dragging.current = true; } }, [allData]);
  const onMouseMove = useCallback((e: any) => { if (dragging.current && e?.activeLabel) setRefAreaRight(allData.findIndex(d => d.month === e.activeLabel)); }, [allData]);
  const onMouseUp = useCallback(() => { if (refAreaLeft !== null && refAreaRight !== null) { const l = Math.min(refAreaLeft, refAreaRight); const r = Math.max(refAreaLeft, refAreaRight); if (r - l >= 2) { setLeft(l); setRight(r); } } setRefAreaLeft(null); setRefAreaRight(null); dragging.current = false; }, [refAreaLeft, refAreaRight]);

  return (
    <div className="metric-card">
      <div className="flex items-start justify-between mb-4">
        <h4 className="text-sm font-bold text-foreground">Page ranking positions for North American content</h4>
        {isZoomed && <button onClick={() => { setLeft(0); setRight(allData.length - 1); }} className="text-xs font-semibold text-primary hover:underline shrink-0">Reset zoom</button>}
      </div>
      <div onWheel={handleWheel} style={{ userSelect: "none" }}>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={visibleData} onMouseDown={onMouseDown} onMouseMove={onMouseMove} onMouseUp={onMouseUp}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#94a3b8" }} />
            <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} />
            <Tooltip content={({ active, payload, label }) => {
              if (!active || !payload?.length) return null;
              const sorted = [...payload].sort((a: any, b: any) => (b.value ?? 0) - (a.value ?? 0));
              return (
                <div style={{ backgroundColor: "#1a2e35", borderRadius: 10, padding: "12px 16px", minWidth: 200, border: "1px solid rgba(232,97,58,0.3)" }}>
                  <p style={{ color: "#e8613a", fontWeight: 700, fontSize: 13, marginBottom: 8 }}>{label}</p>
                  {sorted.map((entry: any) => (
                    <div key={entry.dataKey} style={{ display: "flex", justifyContent: "space-between", gap: 16, marginBottom: 2 }}>
                      <span style={{ fontSize: 11, color: "rgba(255,255,255,0.6)" }}>{entry.name}</span>
                      <span style={{ fontSize: 11, color: "rgba(255,255,255,0.85)", fontVariantNumeric: "tabular-nums" }}>{entry.value}</span>
                    </div>
                  ))}
                </div>
              );
            }} />
            <Legend wrapperStyle={{ fontSize: 11 }} />
            <Line type="monotone" dataKey="page1" stroke="#e8613a" strokeWidth={2.5} dot={false} animationDuration={1500} name="Page 1" />
            <Line type="monotone" dataKey="page2" stroke="#1e293b" strokeWidth={2} dot={false} animationDuration={1500} name="Page 2" />
            <Line type="monotone" dataKey="page3" stroke="#06b6d4" strokeWidth={2} dot={false} animationDuration={1500} name="Page 3" />
            <Line type="monotone" dataKey="page4" stroke="#94a3b8" strokeWidth={1.5} dot={false} animationDuration={1500} name="Page 4" />
            {refAreaLeft !== null && refAreaRight !== null && (
              <ReferenceArea x1={allData[Math.min(refAreaLeft, refAreaRight)]?.month} x2={allData[Math.max(refAreaLeft, refAreaRight)]?.month} strokeOpacity={0.3} fill="rgba(232,97,58,0.1)" />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>
      <p className="text-[10px] text-muted-foreground/40 mt-2 text-center">Scroll to zoom · Drag to select range</p>
    </div>
  );
}

const DACH_COLORS = ["#e8613a", "#3b82f6", "#94a3b8", "#64748b"];

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
      <div className="bg-background/5 border border-secondary-foreground/10 rounded-xl p-6">
        <h4 className="text-sm font-bold text-secondary-foreground mb-4">Audience by Country</h4>
        <ResponsiveContainer width="100%" height={220}>
          <PieChart>
            <Pie data={countries} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} animationDuration={1200}>
              {countries.map((_, i) => (
                <Cell key={i} fill={DACH_COLORS[i]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="bg-background/5 border border-secondary-foreground/10 rounded-xl p-6">
        <h4 className="text-sm font-bold text-secondary-foreground mb-4">Top Companies by Ad Views</h4>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={companies} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
            <XAxis type="number" tick={{ fontSize: 11, fill: "#64748b" }} />
            <YAxis dataKey="company" type="category" width={120} tick={{ fontSize: 11, fill: "#64748b" }} />
            <Tooltip contentStyle={{ backgroundColor: "#1a2e35", border: "1px solid rgba(232,97,58,0.3)", borderRadius: "10px", color: "#fff" }} />
            <Bar dataKey="views" fill="#e8613a" radius={[0, 6, 6, 0]} animationDuration={1200} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}

export function UKNordicsChart() {
  const data = [
    { name: "Explore Igneo's\nEuropean capabilities", type: "Static", impressions: 55000, clicks: 2100, ctr: 3.8 },
    { name: "Middle-market.\nMaximum impact.", type: "Static", impressions: 50000, clicks: 1800, ctr: 3.6 },
    { name: "Investing in European\nInfrastructure", type: "Video", impressions: 60000, clicks: 3200, ctr: 5.3 },
    { name: "Middle-market.\nMaximum impact. (V)", type: "Video", impressions: 50229, clicks: 2174, ctr: 4.3 },
  ];

  return (
    <div className="metric-card">
      <h4 className="text-sm font-bold text-foreground mb-4">Ad Views vs Clicks to Website</h4>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
          <XAxis dataKey="name" tick={{ fontSize: 9, fill: "#94a3b8" }} interval={0} />
          <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} />
          <Tooltip content={({ active, payload, label }) => {
              if (!active || !payload?.length) return null;
              const sorted = [...payload].sort((a: any, b: any) => (b.value ?? 0) - (a.value ?? 0));
              return (
                <div style={{ backgroundColor: "#1a2e35", borderRadius: 10, padding: "12px 16px", minWidth: 200, border: "1px solid rgba(232,97,58,0.3)" }}>
                  <p style={{ color: "#e8613a", fontWeight: 700, fontSize: 13, marginBottom: 8 }}>{label}</p>
                  {sorted.map((entry: any) => (
                    <div key={entry.dataKey} style={{ display: "flex", justifyContent: "space-between", gap: 16, marginBottom: 2 }}>
                      <span style={{ fontSize: 11, color: "rgba(255,255,255,0.6)" }}>{entry.name}</span>
                      <span style={{ fontSize: 11, color: "rgba(255,255,255,0.85)", fontVariantNumeric: "tabular-nums" }}>{entry.value?.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              );
            }} />
          <Bar dataKey="impressions" fill="#3b82f6" radius={[4, 4, 0, 0]} animationDuration={1200} name="Impressions" />
          <Bar dataKey="clicks" fill="#e8613a" radius={[4, 4, 0, 0]} animationDuration={1200} name="Clicks" />
        </BarChart>
      </ResponsiveContainer>
      <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
        <span className="w-3 h-0.5 bg-primary inline-block" /> Industry average CTR
      </div>
    </div>
  );
}
