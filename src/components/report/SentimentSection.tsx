import { useState, useMemo, useCallback } from "react";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell,
} from "recharts";
import KpiRow from "./KpiRow";
import SentimentDetailModal from "./SentimentDetailModal";
import {
  sentimentKpis, sentimentBreakdown, mentionsByMonth,
  channelBreakdown, countryBreakdown, recentHighlights,
  type SentimentMention,
} from "@/data/sentiment-data";

const TABS = ["Timeline", "Sentiment", "Channels", "Geography"] as const;
type Tab = typeof TABS[number];

const SENTIMENT_FILTERS = ["all", "positive", "neutral", "negative"] as const;
type SentimentFilter = typeof SENTIMENT_FILTERS[number];

const CHANNEL_FILTERS = ["all", "Web", "Twitter"] as const;
type ChannelFilter = typeof CHANNEL_FILTERS[number];

const COLORS = {
  positive: "#0F9AFF",
  neutral: "#56658B",
  negative: "#D37669",
};

function formatFollowers(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return String(n);
}

/* ── Timeline: stacked area chart ── */
function TimelineChart() {
  return (
    <div className="flex-1 min-h-0">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={mentionsByMonth} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
          <XAxis dataKey="month" tick={{ fontSize: 9, fill: "hsl(0 0% 60%)" }} />
          <YAxis tick={{ fontSize: 9, fill: "hsl(0 0% 60%)" }} />
          <Tooltip
            contentStyle={{ background: "hsl(0 0% 8%)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, fontSize: 11 }}
            labelStyle={{ color: "#0F9AFF", fontWeight: 700 }}
          />
          <Area type="monotone" dataKey="negative" stackId="1" fill="hsl(14 100% 57% / 0.3)" stroke={COLORS.negative} strokeWidth={1.5} />
          <Area type="monotone" dataKey="neutral" stackId="1" fill="hsl(205 30% 55% / 0.25)" stroke={COLORS.neutral} strokeWidth={1.5} />
          <Area type="monotone" dataKey="positive" stackId="1" fill="hsl(142 60% 45% / 0.35)" stroke={COLORS.positive} strokeWidth={2} />
          <Legend
            wrapperStyle={{ fontSize: 10, paddingTop: 8 }}
            formatter={(value: string) => (
              <span style={{ color: "hsl(195 15% 65%)", textTransform: "capitalize" }}>{value}</span>
            )}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

/* ── Donut chart ── */
function SentimentDonut() {
  const data = [
    { name: "Positive", value: sentimentBreakdown.positive },
    { name: "Neutral", value: sentimentBreakdown.neutral },
    { name: "Negative", value: sentimentBreakdown.negative },
  ];
  const total = data.reduce((s, d) => s + d.value, 0);
  const colors = [COLORS.positive, COLORS.neutral, COLORS.negative];

  return (
    <div className="flex flex-col items-center flex-1 min-h-0">
      <div className="flex-1 w-full min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} cx="50%" cy="50%" innerRadius={70} outerRadius={110} paddingAngle={3} dataKey="value" stroke="none">
              {data.map((_, i) => <Cell key={i} fill={colors[i]} />)}
            </Pie>
            <Tooltip contentStyle={{ background: "hsl(195 30% 12%)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, fontSize: 11 }} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="flex gap-6 mt-2">
        {data.map((d, i) => (
          <div key={d.name} className="flex items-center gap-2 text-xs">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: colors[i] }} />
            <span className="text-muted-foreground">{d.name}</span>
            <span className="font-bold text-foreground">{((d.value / total) * 100).toFixed(0)}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Channel bar chart (clickable) ── */
function ChannelChart({ onBarClick }: { onBarClick: (sentiment: SentimentFilter, channel: ChannelFilter) => void }) {
  const handleClick = (data: any, sentiment: string) => {
    if (data?.channel) {
      onBarClick(sentiment as SentimentFilter, data.channel as ChannelFilter);
    }
  };

  return (
    <div className="flex-1 min-h-0">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={channelBreakdown} layout="vertical" margin={{ top: 10, right: 20, left: 10, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" horizontal={false} />
          <XAxis type="number" tick={{ fontSize: 9, fill: "hsl(195 15% 65%)" }} />
          <YAxis type="category" dataKey="channel" tick={{ fontSize: 11, fill: "hsl(195 15% 65%)" }} width={70} />
          <Tooltip contentStyle={{ background: "hsl(195 30% 12%)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, fontSize: 11 }} cursor={{ fill: "rgba(255,255,255,0.04)" }} />
          <Bar dataKey="positive" stackId="a" fill={COLORS.positive} radius={[0, 0, 0, 0]} className="cursor-pointer" onClick={(data) => handleClick(data, "positive")} />
          <Bar dataKey="neutral" stackId="a" fill={COLORS.neutral} className="cursor-pointer" onClick={(data) => handleClick(data, "neutral")} />
          <Bar dataKey="negative" stackId="a" fill={COLORS.negative} radius={[0, 4, 4, 0]} className="cursor-pointer" onClick={(data) => handleClick(data, "negative")} />
          <Legend
            wrapperStyle={{ fontSize: 10, paddingTop: 8 }}
            formatter={(value: string) => (
              <span style={{ color: "hsl(195 15% 65%)", textTransform: "capitalize" }}>{value}</span>
            )}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

/* ── Geography bar chart ── */
function GeographyChart() {
  return (
    <div className="flex-1 min-h-0">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={countryBreakdown} layout="vertical" margin={{ top: 10, right: 20, left: 10, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" horizontal={false} />
          <XAxis type="number" tick={{ fontSize: 9, fill: "hsl(195 15% 65%)" }} />
          <YAxis type="category" dataKey="country" tick={{ fontSize: 10, fill: "hsl(195 15% 65%)" }} width={100} />
          <Tooltip contentStyle={{ background: "hsl(195 30% 12%)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, fontSize: 11 }} cursor={{ fill: "rgba(255,255,255,0.04)" }} />
          <Bar dataKey="mentions" fill="#0F9AFF" radius={[0, 4, 4, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

/* ── Sentiment dot ── */
function SentimentDot({ sentiment }: { sentiment: string }) {
  const color = sentiment === "positive" ? COLORS.positive : sentiment === "negative" ? COLORS.negative : COLORS.neutral;
  return <span className="inline-block w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: color }} />;
}

/* ── Main Section ── */
export default function SentimentSection() {
  const [activeTab, setActiveTab] = useState<Tab>("Timeline");
  const [sentimentFilter, setSentimentFilter] = useState<SentimentFilter>("all");
  const [channelFilter, setChannelFilter] = useState<ChannelFilter>("all");
  const [selectedMention, setSelectedMention] = useState<SentimentMention | null>(null);

  const handleBarClick = useCallback((sentiment: SentimentFilter, channel: ChannelFilter) => {
    setSentimentFilter(sentiment);
    setChannelFilter(channel);
  }, []);

  const clearFilters = useCallback(() => {
    setSentimentFilter("all");
    setChannelFilter("all");
  }, []);

  const filteredHighlights = useMemo(() => {
    let results = recentHighlights;
    if (sentimentFilter !== "all") {
      results = results.filter((m) => m.sentiment === sentimentFilter);
    }
    if (channelFilter !== "all") {
      results = results.filter((m) => m.channel === channelFilter);
    }
    return results;
  }, [sentimentFilter, channelFilter]);

  const activeFilterCount = (sentimentFilter !== "all" ? 1 : 0) + (channelFilter !== "all" ? 1 : 0);

  return (
    <section id="sentiment" className="section-dark py-24 flow-section-dark relative">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-[1]">
        {/* Header */}
        <div className="flex flex-wrap items-center gap-3 mb-2">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-foreground">Sentiment Monitoring</h2>
          <span className="stage-badge text-xs">Social Listening</span>
        </div>
        <p className="text-muted-foreground mb-6">
          Brand visibility and media sentiment tracking across web, social and news channels — powered by Brandwatch.
        </p>

        {/* KPIs row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <KpiRow value={String(sentimentKpis.totalMentions)} label="Total mentions" comparison="Jan – Mar 2026" />
          <KpiRow value={sentimentKpis.positiveRate} label="Positive sentiment" comparison="Across all channels" />
          <KpiRow value={String(sentimentKpis.countriesReached)} label="Countries reached" comparison="10 markets" />
          <KpiRow value="97%" label="Web coverage share" comparison="Dominant channel" />
        </div>

        {/* Charts row — full width, like the events map */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Left chart — tabbed */}
          <div className="glass-card-dark flow-corner-br min-h-[420px] flex flex-col">
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

            {activeTab === "Timeline" && (
              <div className="flex flex-col flex-1 min-h-0">
                <p className="text-xs text-muted-foreground mb-3">Monthly mentions by sentiment (stacked)</p>
                <TimelineChart />
              </div>
            )}
            {activeTab === "Sentiment" && (
              <div className="flex flex-col flex-1 min-h-0">
                <p className="text-xs text-muted-foreground mb-3">Overall sentiment distribution — Sep 2025 to Mar 2026</p>
                <SentimentDonut />
              </div>
            )}
            {activeTab === "Channels" && (
              <div className="flex flex-col flex-1 min-h-0">
                <p className="text-xs text-muted-foreground mb-3">Click a bar segment to filter coverage below</p>
                <ChannelChart onBarClick={handleBarClick} />
              </div>
            )}
            {activeTab === "Geography" && (
              <div className="flex flex-col flex-1 min-h-0">
                <p className="text-xs text-muted-foreground mb-3">Top 10 countries by mention volume</p>
                <GeographyChart />
              </div>
            )}
          </div>

          {/* Right — summary text + description */}
          <div className="glass-card-dark flow-corner-bl min-h-[420px] flex flex-col justify-between">
            <div>
              <h4 className="text-sm font-bold mb-3 text-foreground">Coverage Summary</h4>
              <p className="text-sm leading-relaxed text-muted-foreground mb-4">
                Monitoring of all public mentions of Igneo Infrastructure Partners across global web, news, and Twitter/X.
                Coverage spans Jan – Mar 2026 with 93 tracked mentions across 10 countries.
              </p>
              <p className="text-sm leading-relaxed text-muted-foreground mb-4">
                Negative sentiment originates exclusively from German-language media, focused on the Deutsche Agrar Holding (DAH) acquisition
                and themes of foreign ownership of agricultural land. High-authority outlets like Berliner Zeitung and Nachdenkseiten account for
                the most impactful negative coverage by domain rank.
              </p>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Positive coverage is driven by the Snam/OLT completion, Strait Link acquisition, Terra-Gen energy storage operations,
                and the Vault Digital Infrastructure portfolio exit, alongside Westconnect fiber rollout press releases across Germany.
              </p>
            </div>
            <div className="mt-4 flex items-center gap-6 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS.positive }} />
                <span>{sentimentBreakdown.positive} positive</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS.neutral }} />
                <span>{sentimentBreakdown.neutral} neutral</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: COLORS.negative }} />
                <span>{sentimentBreakdown.negative} negative</span>
              </div>
            </div>
          </div>
        </div>

        {/* Filter bar */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="text-sm font-bold text-foreground mr-2">Notable Coverage</span>

          {/* Sentiment filters */}
          {SENTIMENT_FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setSentimentFilter(f)}
              className={`px-2.5 py-1 rounded-full text-[10px] font-semibold transition-all capitalize ${
                sentimentFilter === f
                  ? f === "positive" ? "bg-success/20 text-success"
                  : f === "negative" ? "bg-destructive/20 text-destructive"
                  : f === "neutral" ? "bg-muted/30 text-muted-foreground"
                  : "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {f}
            </button>
          ))}

          <span className="text-muted-foreground/30 mx-1">|</span>

          {/* Channel filters */}
          {CHANNEL_FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setChannelFilter(f)}
              className={`px-2.5 py-1 rounded-full text-[10px] font-semibold transition-all ${
                channelFilter === f
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {f === "all" ? "All Channels" : f}
            </button>
          ))}

          {activeFilterCount > 0 && (
            <button onClick={clearFilters} className="px-2.5 py-1 rounded-full text-[10px] font-semibold text-destructive hover:text-destructive/80 transition-all ml-1">
              Clear filters
            </button>
          )}

          <span className="text-xs text-muted-foreground ml-auto">
            {filteredHighlights.length} mention{filteredHighlights.length !== 1 ? "s" : ""}
          </span>
        </div>

        {/* Coverage table — full width like events table */}
        <div className="glass-card-dark flow-corner-bl overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left py-3 px-4 text-foreground font-semibold w-6"></th>
                <th className="text-left py-3 px-4 text-foreground font-semibold">Title</th>
                <th className="text-left py-3 px-4 text-foreground font-semibold">Source</th>
                <th className="text-left py-3 px-4 text-foreground font-semibold">Channel</th>
                <th className="text-left py-3 px-4 text-foreground font-semibold">Country</th>
                <th className="text-left py-3 px-4 text-foreground font-semibold">Date</th>
                <th className="text-right py-3 px-4 text-foreground font-semibold">Reach</th>
                <th className="text-right py-3 px-4 text-foreground font-semibold">Rank</th>
              </tr>
            </thead>
            <tbody>
              {filteredHighlights.length === 0 && (
                <tr>
                  <td colSpan={8} className="text-center py-8 text-muted-foreground text-xs">
                    No mentions match the current filters.
                  </td>
                </tr>
              )}
              {filteredHighlights.map((m, i) => (
                <tr
                  key={i}
                  onClick={() => setSelectedMention(m)}
                  className="border-b border-white/5 hover:bg-white/[0.03] transition-colors cursor-pointer group"
                >
                  <td className="py-3 px-4">
                    <SentimentDot sentiment={m.sentiment} />
                  </td>
                  <td className="py-3 px-4 font-medium text-foreground group-hover:text-primary transition-colors max-w-[400px]">
                    <span className="line-clamp-1">{m.title}</span>
                  </td>
                  <td className="py-3 px-4 text-muted-foreground whitespace-nowrap">{m.source}</td>
                  <td className="py-3 px-4 text-muted-foreground">{m.channel}</td>
                  <td className="py-3 px-4 text-muted-foreground">{m.country}</td>
                  <td className="py-3 px-4 text-muted-foreground whitespace-nowrap">
                    {new Date(m.date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "2-digit" })}
                  </td>
                  <td className="py-3 px-4 text-right">
                    {m.followers !== undefined && m.followers > 0 ? (
                      <span className="text-primary font-semibold">{formatFollowers(m.followers)}</span>
                    ) : (
                      <span className="text-muted-foreground/30">—</span>
                    )}
                  </td>
                  <td className="py-3 px-4 text-right">
                    {m.domainRank !== undefined ? (
                      <span className={`font-semibold ${
                        m.domainRank < 1_000 ? "text-success" : m.domainRank < 10_000 ? "text-primary" : m.domainRank < 50_000 ? "text-warning" : "text-muted-foreground"
                      }`}>
                        #{m.domainRank.toLocaleString()}
                      </span>
                    ) : (
                      <span className="text-muted-foreground/30">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail Modal */}
      {selectedMention && (
        <SentimentDetailModal mention={selectedMention} onClose={() => setSelectedMention(null)} />
      )}
    </section>
  );
}
