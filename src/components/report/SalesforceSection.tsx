import { useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend,
} from "recharts";
import { CheckCircle2 } from "lucide-react";
import {
  salesforceMarketingKpis,
  topCampaigns, engagementByCompany, interactionsByStrategy,
  emailQuarterCompare, topEmailsQ1,
} from "@/data/salesforce-data";

const TABS = ["Email", "Engagement", "Strategies", "Campaigns"] as const;
type Tab = (typeof TABS)[number];

// Per-channel colours kept in case future quarters reintroduce a multi-
// channel split. Currently the Engagement table is email-only.
const BAR_OPENS  = "hsl(var(--primary))";   // mint
const BAR_CLICKS = "#F99C46";               // brand orange
const BAR_SENT   = "#56658B";               // slate

const SECTION_BG = "hsl(var(--ash))";
const INNER_BG   = "hsl(0 0% 12%)";
const CHART_GRID = "rgba(255,255,255,0.07)";
const CHART_TICK_LIGHT = "rgba(255,255,255,0.9)";
const CHART_TICK_DIM   = "rgba(255,255,255,0.55)";
const CHART_TOOLTIP = {
  background: "hsl(0 0% 8%)",
  border: "1px solid rgba(255,255,255,0.12)",
  borderRadius: 12,
  fontSize: 12,
  color: "#fff",
};
const CHART_CURSOR = { fill: "rgba(255,255,255,0.04)" };
const BAR_Q1 = "hsl(var(--primary))";
const BAR_Q4 = "rgba(255,255,255,0.22)";

export default function SalesforceSection() {
  const [activeTab, setActiveTab] = useState<Tab>("Email");

  return (
    <section
      id="salesforce"
      className="py-16 sm:py-20 border-t border-border"
      style={{ backgroundColor: SECTION_BG, color: "hsl(0 0% 100%)" }}
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <span className="stage-badge text-xs inline-block mb-3">Marketing Funnel</span>
        <h2 className="text-2xl sm:text-3xl font-bold text-white">Client Engagement</h2>
        <p className="text-sm leading-relaxed text-white mb-6">Q1 client engagement across our RQI Pardot email campaigns.</p>

        {/* Two-column hero: narrative left, KPI 2×2 right */}
        <div className="grid lg:grid-cols-2 gap-8 mb-6 items-start">
          <div className="space-y-4">
            <p className="text-sm leading-relaxed text-white">
              Q1 engagement improved despite fewer sends. Open rate reached <span className="text-white font-semibold">35.7%</span> and click-to-open rate jumped to <span className="text-white font-semibold">22.8%</span> — both well above industry benchmarks — while opt-outs nearly halved from 33 to 17. Fewer contacts, but a more engaged audience.
            </p>
            <p className="text-sm leading-relaxed text-white">
              At account level, Mercer Investments led with 47 unique opens from 52 sends — a 90% open rate. Super funds and investment consultants dominated the top-engaged accounts, with CBUS Super, HESTA, Frontier Advisors and CARE Super all featuring in the top 15. Engagement spanned both institutional and wholesale audiences.
            </p>
            <p className="text-sm leading-relaxed text-white">
              The Morningstar Fund Manager of the Year win was the biggest single send of the quarter — 1,056 national plus 350 NSW-only — generating 470 opens in March. The Institutional monthly newsletters delivered the sharpest click-to-open rates at 43–48%, reflecting tight content–audience fit across that segment.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {salesforceMarketingKpis.map((kpi) => {
              const isUp = kpi.trend === "up";
              return (
                <div
                  key={kpi.label}
                  className="rounded-lg px-4 py-3"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  <div className="flex items-baseline gap-2">
                    <span className={`text-sm ${isUp ? "text-primary" : "text-accent-orange"}`}>
                      {isUp ? "+" : "−"}
                    </span>
                    <span className="text-xl sm:text-2xl font-extrabold text-white tabular-nums">
                      {kpi.value}
                    </span>
                  </div>
                  <div className="text-[11px] font-semibold text-white mt-1">{kpi.label}</div>
                  <div className="text-[10px] mt-0.5" style={{ color: isUp ? "rgba(255,255,255,0.55)" : "#F99C46" }}>{kpi.comparison}</div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex gap-2 mb-4 overflow-x-auto">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                activeTab === tab
                  ? "bg-primary text-primary-foreground"
                  : "bg-white/10 text-white hover:bg-white/20"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div
          className="rounded-2xl p-6 overflow-hidden"
          style={{ backgroundColor: INNER_BG, border: "1px solid rgba(255,255,255,0.08)" }}
        >
          {activeTab === "Email" && <EmailTab />}
          {activeTab === "Engagement" && <EngagementTab />}
          {activeTab === "Strategies" && <StrategiesTab />}
          {activeTab === "Campaigns" && <CampaignsTab />}
        </div>
      </div>
    </section>
  );
}

/* ── Email — Q4 2025 vs Q1 2026 (Pardot) ── */
function EmailTab() {
  const q4 = emailQuarterCompare[0];
  const q1 = emailQuarterCompare[1];
  const pct = (a: number, b: number) =>
    b === 0 ? "—" : `${a >= b ? "+" : ""}${Math.round(((a - b) / b) * 100)}%`;
  const ratePts = (a: number, b: number) =>
    `${a >= b ? "+" : ""}${((a - b) * 100).toFixed(1)} pts`;

  const headlineKpis = [
    { label: "Emails sent",        q1: q1.sent.toLocaleString(),                 q4: q4.sent.toLocaleString(),                 delta: pct(q1.sent, q4.sent) },
    { label: "Unique opens",       q1: q1.uniqueOpens.toLocaleString(),          q4: q4.uniqueOpens.toLocaleString(),          delta: pct(q1.uniqueOpens, q4.uniqueOpens) },
    { label: "Open rate",          q1: `${(q1.openRate * 100).toFixed(1)}%`,     q4: `${(q4.openRate * 100).toFixed(1)}%`,     delta: ratePts(q1.openRate, q4.openRate) },
    { label: "Click-to-open rate", q1: `${(q1.ctor * 100).toFixed(1)}%`,         q4: `${(q4.ctor * 100).toFixed(1)}%`,         delta: ratePts(q1.ctor, q4.ctor) },
  ];

  const openChart = [
    { metric: "Opens",    q1: q1.uniqueOpens,  q4: q4.uniqueOpens },
    { metric: "Clicks",   q1: q1.uniqueClicks, q4: q4.uniqueClicks },
    { metric: "Opt-outs", q1: q1.optOuts,      q4: q4.optOuts },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-1 text-white">Email performance — Q4 2025 vs Q1 2026</h3>
        <p className="text-xs text-white/70 mb-4">
          RQI Pardot sends. Q1 sent <span className="text-white font-semibold">5.9% fewer emails</span> than Q4 but unique opens held flat, open rate edged up <span className="text-white font-semibold">+2.0 pts</span> and click-to-open rate jumped <span className="text-white font-semibold">+3.0 pts</span> — fewer-but-better engagements. Opt-outs nearly halved.
        </p>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          {headlineKpis.map((k) => {
            const isPositive = !k.delta.startsWith("-");
            return (
              <div
                key={k.label}
                className="rounded-lg px-4 py-3"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <div className="text-[10px] tracking-wider text-white/55">{k.label}</div>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="text-xl font-extrabold text-white tabular-nums">{k.q1}</span>
                  <span className={`text-[11px] font-semibold tabular-nums ${isPositive ? "text-primary" : "text-accent-orange"}`}>
                    {k.delta}
                  </span>
                </div>
                <div className="text-[10px] text-white/45 mt-0.5">Q4: {k.q4}</div>
              </div>
            );
          })}
        </div>

        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={openChart} margin={{ left: 0, right: 30, top: 5, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={CHART_GRID} />
            <XAxis dataKey="metric" tick={{ fontSize: 12, fill: CHART_TICK_LIGHT }} />
            <YAxis tick={{ fontSize: 12, fill: CHART_TICK_DIM }} />
            <Tooltip contentStyle={CHART_TOOLTIP} cursor={CHART_CURSOR} />
            <Legend wrapperStyle={{ color: "rgba(255,255,255,0.75)", paddingTop: 4 }} />
            <Bar dataKey="q1" name="Q1 2026" fill={BAR_Q1} radius={[6, 6, 0, 0]} barSize={32} />
            <Bar dataKey="q4" name="Q4 2025" fill={BAR_Q4} radius={[6, 6, 0, 0]} barSize={32} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-1 text-white">Top Q1 sends</h3>
        <p className="text-xs text-white/70 mb-4">
          Ranked by unique opens. The Institutional monthly newsletters punch above their weight on click-to-open rate (43–48%), suggesting strong content–audience fit even on smaller lists.
        </p>
        <div className="overflow-hidden rounded-xl border" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ background: "rgba(255,255,255,0.04)" }}>
                <th className="text-left p-3 font-medium text-white/70">Email</th>
                <th className="text-right p-3 font-medium text-white/70">Sent</th>
                <th className="text-right p-3 font-medium text-white/70">Opens</th>
                <th className="text-right p-3 font-medium text-white/70">Clicks</th>
                <th className="text-right p-3 font-medium text-white/70">Open rate</th>
                <th className="text-right p-3 font-medium text-white/70">CTOR</th>
              </tr>
            </thead>
            <tbody>
              {topEmailsQ1.map((e) => (
                <tr key={e.name} className="border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                  <td className="p-3 text-white">
                    <div className="font-medium">{e.name}</div>
                    <div className="text-[10px] text-white/45 mt-0.5">{e.campaign}</div>
                  </td>
                  <td className="p-3 text-right tabular-nums text-white">{e.sent.toLocaleString()}</td>
                  <td className="p-3 text-right tabular-nums text-white">{e.uniqueOpens.toLocaleString()}</td>
                  <td className="p-3 text-right tabular-nums text-white">{e.uniqueClicks.toLocaleString()}</td>
                  <td className="p-3 text-right tabular-nums text-white">{(e.openRate * 100).toFixed(1)}%</td>
                  <td className="p-3 text-right tabular-nums font-bold text-primary">{(e.ctor * 100).toFixed(1)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ── Engagement — per-company email engagement (Sent / Opens / Clicks) ── */
function EngagementTab() {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-1 text-white">Email engagement by company</h3>
        <p className="text-xs text-white mb-4">
          Top 15 external accounts by Q1 unique email opens on RQI sends.
          Each row aggregates Sent / Opens / Clicks across the Pardot per-recipient
          exports for Q1. Internal accounts (RQI Investors, First Sentier Investors)
          are excluded. Source: Raw Data/Email/* — Pardot recipient sheets, Company
          column.
        </p>
        <ResponsiveContainer width="100%" height={520}>
          <BarChart data={engagementByCompany} layout="vertical" margin={{ left: 20, right: 30, top: 5, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke={CHART_GRID} />
            <XAxis type="number" tick={{ fontSize: 11, fill: CHART_TICK_DIM }} />
            <YAxis
              type="category"
              dataKey="account"
              width={210}
              tick={{ fontSize: 11, fill: CHART_TICK_LIGHT }}
            />
            <Tooltip contentStyle={CHART_TOOLTIP} cursor={CHART_CURSOR} />
            <Legend wrapperStyle={{ color: "rgba(255,255,255,0.75)", paddingTop: 4 }} />
            <Bar dataKey="sent"   name="Sent"   stackId="a" fill={BAR_SENT} />
            <Bar dataKey="opens"  name="Opens"  stackId="a" fill={BAR_OPENS} />
            <Bar dataKey="clicks" name="Clicks" stackId="a" fill={BAR_CLICKS} radius={[0, 6, 6, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-3">
          <CheckCircle2 className="w-4 h-4 text-primary" />
          <p className="text-xs text-white">
            Rows with a mint dot indicate accounts that have a <span className="text-white font-semibold">live (non-lost) Salesforce opportunity</span>.
          </p>
        </div>
        <div className="overflow-hidden rounded-xl border" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
          <table className="w-full text-sm">
            <thead>
              <tr style={{ background: "rgba(255,255,255,0.04)" }}>
                <th className="text-left  p-3 font-medium text-white/70">Account</th>
                <th className="text-left  p-3 font-medium text-white/70">Opp Stage</th>
                <th className="text-right p-3 font-medium text-white/70">Sent</th>
                <th className="text-right p-3 font-medium text-white/70">Opens</th>
                <th className="text-right p-3 font-medium text-white/70">Clicks</th>
                <th className="text-right p-3 font-medium text-white/70">Open rate</th>
              </tr>
            </thead>
            <tbody>
              {engagementByCompany.map((row) => {
                const openRate = row.sent > 0 ? row.opens / row.sent : 0;
                return (
                  <tr
                    key={row.account}
                    className="border-t"
                    style={{
                      borderColor: "rgba(255,255,255,0.06)",
                      background: row.isOpp ? "hsl(var(--primary) / 0.06)" : undefined,
                    }}
                  >
                    <td className="p-3 font-medium text-white">
                      <div className="flex items-center gap-2">
                        {row.isOpp && (
                          <span
                            title="Live Salesforce opportunity"
                            className="inline-block w-2 h-2 rounded-full shrink-0"
                            style={{ background: "hsl(var(--primary))" }}
                          />
                        )}
                        <span>{row.account}</span>
                      </div>
                    </td>
                    <td className="p-3 text-xs">
                      {row.isOpp && row.oppStage ? (
                        <span
                          className="inline-block px-2 py-0.5 rounded-full font-semibold"
                          style={{
                            background: row.oppStage.includes("Won") || row.oppStage.includes("Funded") ? "hsl(var(--success) / 0.18)" :
                                        row.oppStage.includes("Active") ? "hsl(var(--primary) / 0.18)" :
                                        "rgba(255,255,255,0.08)",
                            color: row.oppStage.includes("Won") || row.oppStage.includes("Funded") ? "hsl(var(--success))" :
                                   row.oppStage.includes("Active") ? "hsl(var(--primary))" :
                                   "rgba(255,255,255,0.85)",
                            fontSize: 10,
                          }}
                        >
                          {row.oppStage}
                        </span>
                      ) : (
                        <span className="text-white/30">—</span>
                      )}
                    </td>
                    <td className="p-3 text-right tabular-nums text-white">{row.sent.toLocaleString()}</td>
                    <td className="p-3 text-right tabular-nums text-white">{row.opens.toLocaleString()}</td>
                    <td className="p-3 text-right tabular-nums text-white">{row.clicks.toLocaleString()}</td>
                    <td className="p-3 text-right tabular-nums font-bold text-primary">{(openRate * 100).toFixed(0)}%</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ── Strategies — Q1 email engagement by strategy ── */
function StrategiesTab() {
  // Only show strategies that actually had Q1 sends.
  const data = interactionsByStrategy.filter((s) => s.sent > 0);
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold mb-1 text-white">Email engagement by strategy</h3>
      <p className="text-xs text-white mb-4">
        Q1 email engagement classified by underlying strategy (filename keywords).
        "Brand / Newsletter" covers the always-on Insto monthly + WS quarterly
        sends; "FMOTY / Brand" is the Morningstar Fund-Manager-of-the-Year
        announcement campaign. Other strategy buckets (Global Value, Asia campaign,
        Cross-brand events) had no Q1 sends.
      </p>
      <ResponsiveContainer width="100%" height={Math.max(220, data.length * 80)}>
        <BarChart data={data} layout="vertical" margin={{ left: 20, right: 30, top: 5, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke={CHART_GRID} />
          <XAxis type="number" tick={{ fontSize: 11, fill: CHART_TICK_DIM }} />
          <YAxis type="category" dataKey="strategy" width={180} tick={{ fontSize: 11, fill: CHART_TICK_LIGHT }} />
          <Tooltip contentStyle={CHART_TOOLTIP} cursor={CHART_CURSOR} />
          <Legend wrapperStyle={{ color: "rgba(255,255,255,0.75)", paddingTop: 4 }} />
          <Bar dataKey="opens"  name="Opens"  stackId="b" fill={BAR_OPENS} />
          <Bar dataKey="clicks" name="Clicks" stackId="b" fill={BAR_CLICKS} radius={[0, 6, 6, 0]} />
        </BarChart>
      </ResponsiveContainer>
      <p className="text-[10px] text-white/55 mt-2">
        Awaiting per-email strategy/campaign tagging from the marketing team to refine
        these buckets — particularly to split out the FMOTY NSW-only send and the
        Mar Insto newsletter (recipient files weren't included in this Q1 export).
      </p>
    </div>
  );
}

/* ── Campaigns ── */
function CampaignsTab() {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-1 text-white">Top campaigns driving email engagement</h3>
      <p className="text-xs text-white mb-4">
        Top Q1 RQI campaigns by total engagements (unique opens + clicks).
        The Morningstar FMOTY launch was the single biggest send by reach but the
        Institutional newsletter cluster carried the highest CTOR (43–48%).
      </p>
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={topCampaigns} layout="vertical" margin={{ left: 10, right: 30, top: 5, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke={CHART_GRID} />
          <XAxis type="number" tick={{ fontSize: 12, fill: CHART_TICK_DIM }} />
          <YAxis type="category" dataKey="campaign" width={240} tick={{ fontSize: 11, fill: CHART_TICK_LIGHT }} />
          <Tooltip contentStyle={CHART_TOOLTIP} cursor={CHART_CURSOR} />
          <Legend wrapperStyle={{ color: "rgba(255,255,255,0.75)", paddingTop: 4 }} />
          <Bar dataKey="opens"  name="Opens"  stackId="c" fill={BAR_OPENS} />
          <Bar dataKey="clicks" name="Clicks" stackId="c" fill={BAR_CLICKS} radius={[0, 6, 6, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
