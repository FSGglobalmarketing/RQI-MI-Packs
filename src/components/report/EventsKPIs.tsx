import { useMemo } from "react";
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import type { EventItem } from "@/data/igneo-report";
import { Mic, DollarSign, Users, CalendarDays } from "lucide-react";

interface EventsKPIsProps {
  events: EventItem[];
}

/* RQI gradient accent palette */
const COLORS = [
  "#0F9AFF",  // RQI Blue
  "#56658B",  // Slate blue
  "#D37669",  // Coral
  "#F99C46",  // Amber
  "#FFCC00",  // Gold
  "#666666",  // Grey
];

export default function EventsKPIs({ events }: EventsKPIsProps) {
  const stats = useMemo(() => {
    const withSpeaking = events.filter((e) => e.hasSpeakingSlot);
    const speakingRatio = events.length > 0 ? Math.round((withSpeaking.length / events.length) * 100) : 0;

    // Audience mix
    const audienceMap: Record<string, number> = {};
    events.forEach((e) => {
      const key = e.audience.includes("Institutional") ? "Institutional"
        : e.audience.includes("Wholesale") ? "Wholesale"
        : e.audience.includes("Adviser") ? "Adviser"
        : "Other";
      audienceMap[key] = (audienceMap[key] || 0) + 1;
    });
    const audienceData = Object.entries(audienceMap)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);

    // Spend by region
    const regionSpend: Record<string, number> = {};
    events.forEach((e) => {
      if (e.sponsorshipCost) {
        const multiplier = e.currency === "GBP" ? 1.95 : e.currency === "EUR" ? 1.65 : e.currency === "CAD" ? 1.1 : 1;
        regionSpend[e.region] = (regionSpend[e.region] || 0) + Math.round(e.sponsorshipCost * multiplier);
      }
    });
    const spendData = Object.entries(regionSpend)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value);

    // Monthly density
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const monthCounts = new Array(12).fill(0);
    events.forEach((e) => {
      if (e.startDate) {
        const m = new Date(e.startDate).getMonth();
        monthCounts[m]++;
      }
    });
    const monthlyData = monthNames.map((name, i) => ({ name, events: monthCounts[i] }));

    // Total estimated spend
    const totalSpend = Object.values(regionSpend).reduce((a, b) => a + b, 0);

    return { speakingRatio, withSpeaking, audienceData, spendData, monthlyData, totalSpend };
  }, [events]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {/* Speaking Slots */}
      <div className="glass-card-cream flow-corner-br p-5 rounded-2xl">
        <div className="flex items-center gap-2 mb-3">
          <Mic className="w-4 h-4 text-primary" />
          <h4 className="text-xs font-bold uppercase tracking-wider text-secondary-foreground/50">Speaking Slots</h4>
        </div>
        <p className="text-3xl font-extrabold text-secondary-foreground">{stats.speakingRatio}%</p>
        <p className="text-xs text-secondary-foreground/50 mt-1">
          {stats.withSpeaking.length} of {events.length} events
        </p>
      </div>

      {/* Estimated Spend */}
      <div className="glass-card-cream p-5 rounded-2xl">
        <div className="flex items-center gap-2 mb-3">
          <DollarSign className="w-4 h-4 text-primary" />
          <h4 className="text-xs font-bold uppercase tracking-wider text-secondary-foreground/50">Est. Spend (AUD)</h4>
        </div>
        <p className="text-3xl font-extrabold text-secondary-foreground">
          ${(stats.totalSpend / 1000).toFixed(0)}k
        </p>
        <div className="mt-2 space-y-1">
          {stats.spendData.slice(0, 3).map((d) => (
            <div key={d.name} className="flex justify-between text-xs text-secondary-foreground/60">
              <span>{d.name}</span>
              <span className="font-medium">${(d.value / 1000).toFixed(0)}k</span>
            </div>
          ))}
        </div>
      </div>

      {/* Audience Mix */}
      <div className="glass-card-cream flow-corner-tl p-5 rounded-2xl">
        <div className="flex items-center gap-2 mb-3">
          <Users className="w-4 h-4 text-primary" />
          <h4 className="text-xs font-bold uppercase tracking-wider text-secondary-foreground/50">Audience Mix</h4>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-20 h-20">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={stats.audienceData} dataKey="value" innerRadius={20} outerRadius={35} paddingAngle={2} strokeWidth={0}>
                  {stats.audienceData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-1">
            {stats.audienceData.map((d, i) => (
              <div key={d.name} className="flex items-center gap-1.5 text-xs text-secondary-foreground/70">
                <span className="w-2 h-2 rounded-full" style={{ background: COLORS[i % COLORS.length] }} />
                {d.name} ({d.value})
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Monthly Density */}
      <div className="glass-card-cream p-5 rounded-2xl">
        <div className="flex items-center gap-2 mb-3">
          <CalendarDays className="w-4 h-4 text-primary" />
          <h4 className="text-xs font-bold uppercase tracking-wider text-secondary-foreground/50">Monthly Density</h4>
        </div>
        <div className="h-20">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={stats.monthlyData} barSize={12}>
              <XAxis dataKey="name" tick={{ fontSize: 9, fill: "hsl(var(--secondary-foreground) / 0.4)" }} axisLine={false} tickLine={false} />
              <YAxis hide />
              <Tooltip
                contentStyle={{ fontSize: 11, background: "hsl(var(--secondary))", border: "1px solid hsl(var(--secondary-foreground) / 0.1)", borderRadius: 8 }}
                cursor={{ fill: "hsl(var(--secondary-foreground) / 0.05)" }}
              />
              <Bar dataKey="events" fill="#0F9AFF" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
