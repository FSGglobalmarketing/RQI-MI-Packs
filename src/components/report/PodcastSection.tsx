import { useState, useRef } from "react";
import { reportData } from "@/data/igneo-report";
import { podcastEpisodes, podcastMonthlyStreams } from "@/data/podcast-data";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid, ReferenceDot } from "recharts";
import { ChevronLeft, ChevronRight, Headphones, TrendingUp, Play } from "lucide-react";
import KpiRow from "./KpiRow";

const TABS = ["Leaderboard", "Streams", "Episodes"] as const;
type Tab = typeof TABS[number];

/* ── Episode Leaderboard ── */
function EpisodeLeaderboard() {
  const sorted = [...podcastEpisodes].sort((a, b) => b.streams - a.streams).slice(0, 15);
  const maxStreams = sorted[0]?.streams || 1;

  return (
    <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2">
      {sorted.map((ep, i) => (
        <div key={ep.title} className="group flex items-center gap-3">
          <span className={`text-xs font-bold w-5 text-right shrink-0 ${i < 3 ? "text-primary" : "text-muted-foreground"}`}>
            {i + 1}
          </span>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-0.5">
              <p className="text-xs font-medium text-foreground truncate">{ep.title}</p>
            </div>
            <div className="relative h-2 rounded-full overflow-hidden bg-muted/30">
              <div
                className="absolute inset-y-0 left-0 rounded-full transition-all duration-500"
                style={{
                  width: `${(ep.streams / maxStreams) * 100}%`,
                  backgroundColor: i < 3 ? "hsl(14 78% 57%)" : "hsl(14 78% 57% / 0.4)",
                }}
              />
            </div>
          </div>
          <span className="text-xs font-mono font-semibold text-foreground tabular-nums w-12 text-right shrink-0">
            {ep.streams.toLocaleString()}
          </span>
        </div>
      ))}
    </div>
  );
}

/* ── Streams Over Time ── */
function StreamsOverTime() {
  const releaseMonths = podcastMonthlyStreams.filter((m) => m.episodeReleased);

  return (
    <ResponsiveContainer width="100%" height={280}>
      <LineChart data={podcastMonthlyStreams} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
        <XAxis dataKey="month" tick={{ fontSize: 9, fill: "hsl(195 15% 65%)" }} interval={5} />
        <YAxis tick={{ fontSize: 9, fill: "hsl(195 15% 65%)" }} />
        <Tooltip
          contentStyle={{ background: "hsl(195 30% 12%)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, fontSize: 11 }}
          labelStyle={{ color: "hsl(14 78% 57%)", fontWeight: 700 }}
          formatter={(value: number) => [`${value} streams`, "Monthly Streams"]}
        />
        <Line type="monotone" dataKey="streams" stroke="hsl(14 78% 57%)" strokeWidth={2.5} dot={false} />
        {releaseMonths.map((m) => (
          <ReferenceDot
            key={m.month}
            x={m.month}
            y={m.streams}
            r={4}
            fill="hsl(14 78% 57%)"
            stroke="hsl(195 30% 12%)"
            strokeWidth={2}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
}

/* ── Episode Catalog Cards ── */
function EpisodeCatalog() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const sorted = [...podcastEpisodes].sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime());

  const scroll = (dir: "left" | "right") => {
    scrollRef.current?.scrollBy({ left: dir === "left" ? -300 : 300, behavior: "smooth" });
  };

  return (
    <div className="relative">
      <div className="flex gap-2 mb-3 justify-end">
        <button onClick={() => scroll("left")} className="p-1.5 rounded-full bg-muted/30 hover:bg-muted/50 text-foreground transition-colors">
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button onClick={() => scroll("right")} className="p-1.5 rounded-full bg-muted/30 hover:bg-muted/50 text-foreground transition-colors">
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
      <div ref={scrollRef} className="flex gap-4 overflow-x-auto pb-3 snap-x snap-mandatory scrollbar-hide" style={{ scrollbarWidth: "none" }}>
        {sorted.map((ep) => (
          <div
            key={ep.title}
            className="snap-start shrink-0 w-[260px] glass-card-dark p-4 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                  <Play className="w-3.5 h-3.5 text-primary" />
                </div>
                <span className="text-[10px] text-muted-foreground">
                  {new Date(ep.releaseDate).toLocaleDateString("en-GB", { month: "short", year: "numeric" })}
                </span>
              </div>
              <h5 className="text-xs font-bold text-foreground mb-1.5 line-clamp-2">{ep.title}</h5>
              <p className="text-[10px] text-muted-foreground line-clamp-3">{ep.description}</p>
            </div>
            <div className="flex items-center gap-1.5 mt-3 pt-2 border-t border-border/30">
              <Headphones className="w-3 h-3 text-primary" />
              <span className="text-xs font-semibold text-foreground">{ep.streams.toLocaleString()}</span>
              <span className="text-[10px] text-muted-foreground">streams</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Main Section ── */
export default function PodcastSection() {
  const p = reportData.podcast;
  const [activeTab, setActiveTab] = useState<Tab>("Leaderboard");
  const totalStreams = podcastEpisodes.reduce((sum, ep) => sum + ep.streams, 0);

  return (
    <section id="podcast" className="section-dark py-20">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center gap-3 mb-2">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground">{p.title}</h2>
          <span className="stage-badge text-xs">{p.stage}</span>
        </div>
        <p className="text-muted-foreground mb-8">{p.subtitle}</p>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Left — Info + KPIs */}
          <div className="space-y-6">
            <p className="text-sm text-muted-foreground leading-relaxed">{p.description}</p>
            <div>
              <h4 className="text-sm font-bold mb-4 text-foreground">Key Results</h4>
              <div className="space-y-3">
                {p.kpis.map((kpi) => (
                  <KpiRow key={kpi.label} value={kpi.value} label={kpi.label} comparison={kpi.comparison} />
                ))}
              </div>
            </div>

            {/* Summary stats */}
            <div className="grid grid-cols-3 gap-3">
              <div className="glass-card-dark p-4 text-center">
                <p className="text-2xl font-extrabold text-primary">{podcastEpisodes.length}</p>
                <p className="text-[10px] text-muted-foreground mt-1">Total episodes</p>
              </div>
              <div className="glass-card-dark p-4 text-center">
                <p className="text-2xl font-extrabold text-primary">{(totalStreams / 1000).toFixed(1)}k</p>
                <p className="text-[10px] text-muted-foreground mt-1">Total streams</p>
              </div>
              <div className="glass-card-dark p-4 text-center">
                <p className="text-2xl font-extrabold text-primary">{Math.round(totalStreams / podcastEpisodes.length)}</p>
                <p className="text-[10px] text-muted-foreground mt-1">Avg per episode</p>
              </div>
            </div>

            {/* Keeping it Real Assets branding */}
            <div className="glass-card-dark flex items-center gap-4 p-4">
              <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center shrink-0">
                <Headphones className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-foreground font-bold text-sm">Keeping it Real Assets</p>
                <p className="text-xs text-muted-foreground">Infrastructure insights from Igneo's investment team</p>
              </div>
            </div>
          </div>

          {/* Right — Tabbed charts */}
          <div className="glass-card-dark">
            <div className="flex gap-1 mb-4 overflow-x-auto">
              {TABS.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap ${
                    activeTab === tab
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {activeTab === "Leaderboard" && (
              <div>
                <p className="text-xs text-muted-foreground mb-3">Top episodes ranked by total streams</p>
                <EpisodeLeaderboard />
              </div>
            )}

            {activeTab === "Streams" && (
              <div>
                <p className="text-xs text-muted-foreground mb-3">Monthly streams with episode release markers (dots)</p>
                <StreamsOverTime />
              </div>
            )}

            {activeTab === "Episodes" && (
              <div>
                <p className="text-xs text-muted-foreground mb-3">Browse all {podcastEpisodes.length} episodes</p>
                <EpisodeCatalog />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
