import { useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend,
} from "recharts";
import { CheckCircle2 } from "lucide-react";
import {
  salesforceMarketingKpis, activityBreakdown, monthlyTrend,
  topCampaigns, engagementByCompany,
  emailQuarterCompare, topEmailsQ1,
} from "@/data/salesforce-data";

const TABS = ["Activity", "Email", "Engagement", "Strategies", "Campaigns"] as const;
type Tab = (typeof TABS)[number];

// Channel colours for company × channel stack
const BAR_CHANNEL_EMAIL = "hsl(var(--primary))";   // mint
const BAR_CHANNEL_FORM  = "#56658B";               // slate
const BAR_CHANNEL_LINK  = "#F99C46";               // brand orange
const BAR_CHANNEL_WEB   = "#D37669";               // coral

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
  const [activeTab, setActiveTab] = useState<Tab>("Activity");

  return (
    <section
      id="salesforce"
      className="py-16 sm:py-20 border-t border-border"
      style={{ backgroundColor: SECTION_BG, color: "hsl(0 0% 100%)" }}
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <span className="stage-badge text-xs inline-block mb-3">Marketing Funnel</span>
        <h2 className="text-2xl sm:text-3xl font-bold text-white">Client Engagement</h2>
        <p className="text-sm leading-relaxed text-white mb-6">Tracking Salesforce contact activity across marketing</p>

        {/* Two-column hero: narrative left, KPI 2×2 right */}
        <div className="grid lg:grid-cols-2 gap-8 mb-6 items-start">
          <div className="space-y-4">
            <p className="text-sm leading-relaxed text-white">
              Q1 saw 2,434 marketing interactions from 709 unique contacts across 559 accounts — a +11.5% increase in activity vs Q4. File downloads grew +73%, signalling deeper content engagement off the back of Morningstar FMOTY and the Demystified campaigns.
            </p>
            <p className="text-sm leading-relaxed text-white">
              Mercer Investments was by far the most engaged account (261 interactions) and is in active DD. 19 accounts in the live Salesforce pipeline had direct marketing touches in Q1 — evidence that campaigns are reaching prospects that matter.
            </p>
            <p className="text-sm leading-relaxed text-white">
              Always-on ANZ campaigns dominate absolute volume. Newsletter engagement remains strong with institutional contacts, while the FMOTY campaign is early but already showing pull.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {salesforceMarketingKpis.map((kpi) => (
              <div
                key={kpi.label}
                className="rounded-lg px-4 py-3"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <div className="flex items-baseline gap-2">
                  <span className="text-primary text-sm">+</span>
                  <span className="text-xl sm:text-2xl font-extrabold text-white tabular-nums">
                    {kpi.value}
                  </span>
                </div>
                <div className="text-[11px] font-semibold text-white mt-1">{kpi.label}</div>
                <div className="text-[10px] text-white/55">{kpi.comparison}</div>
              </div>
            ))}
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
          {activeTab === "Activity" && <ActivityTab />}
          {activeTab === "Email" && <EmailTab />}
          {activeTab === "Engagement" && <EngagementTab />}
          {activeTab === "Strategies" && <StrategiesTab />}
          {activeTab === "Campaigns" && <CampaignsTab />}
        </div>
      </div>
    </section>
  );
}

/* ── Activity ── */
function ActivityTab() {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-1 text-white">Contact engagement types — Q1 vs Q4</h3>
        <p className="text-xs text-white mb-4">
          Salesforce contact activity on RQI/Realindex-tagged assets and campaigns: email opens, email clicks, file downloads, website visits, etc. Q1 grew +11.5% vs Q4 with file downloads up +73%.
        </p>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={activityBreakdown} margin={{ left: 0, right: 30, top: 5, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={CHART_GRID} />
            <XAxis dataKey="type" tick={{ fontSize: 11, fill: CHART_TICK_LIGHT }} />
            <YAxis tick={{ fontSize: 12, fill: CHART_TICK_DIM }} />
            <Tooltip contentStyle={CHART_TOOLTIP} cursor={CHART_CURSOR} />
            <Legend wrapperStyle={{ color: "rgba(255,255,255,0.7)" }} />
            <Bar dataKey="q1" name="Q1 2026" fill={BAR_Q1} radius={[6, 6, 0, 0]} barSize={28} />
            <Bar dataKey="q4" name="Q4 2025" fill={BAR_Q4} radius={[6, 6, 0, 0]} barSize={28} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-1 text-white">Monthly contact-engagement volume</h3>
        <p className="text-xs text-white mb-4">
          March spike driven by the Morningstar FMOTY announcement and newsletter distribution. February dip is typical seasonally.
        </p>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={monthlyTrend} margin={{ left: 0, right: 30, top: 5, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={CHART_GRID} />
            <XAxis dataKey="month" tick={{ fontSize: 12, fill: CHART_TICK_LIGHT }} />
            <YAxis tick={{ fontSize: 12, fill: CHART_TICK_DIM }} />
            <Tooltip contentStyle={CHART_TOOLTIP} cursor={CHART_CURSOR} />
            <Bar dataKey="interactions" name="Interactions" fill={BAR_Q1} radius={[6, 6, 0, 0]} barSize={40} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
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
          RQI/Realindex Pardot sends. Q1 sent <span className="text-white font-semibold">5.9% fewer emails</span> than Q4 but unique opens held flat, open rate edged up <span className="text-white font-semibold">+2.0 pts</span> and click-to-open rate jumped <span className="text-white font-semibold">+3.0 pts</span> — fewer-but-better engagements. Opt-outs nearly halved.
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
                  <span className={`text-[11px] font-semibold tabular-nums ${isPositive ? "text-primary" : "text-white/55"}`}>
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

/* ── Engagement — Contact engagement by company × channel ── */
function EngagementTab() {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-1 text-white">Contact engagement by company × channel</h3>
        <p className="text-xs text-white mb-4">
          Top 15 Salesforce accounts by Q1 RQI-tagged contact interactions, split by channel
          (email opens + clicks, file views / form submissions, tracked custom-URL clicks,
          Pardot-tagged web visits). Source: Salesforce Activity export, filtered to assets
          containing "RQI" or "Realindex".
        </p>
        <ResponsiveContainer width="100%" height={520}>
          <BarChart data={engagementByCompany} layout="vertical" margin={{ left: 20, right: 30, top: 5, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke={CHART_GRID} />
            <XAxis type="number" tick={{ fontSize: 11, fill: CHART_TICK_DIM }} />
            <YAxis
              type="category"
              dataKey="account"
              width={200}
              tick={{ fontSize: 11, fill: CHART_TICK_LIGHT }}
            />
            <Tooltip contentStyle={CHART_TOOLTIP} cursor={CHART_CURSOR} />
            <Legend wrapperStyle={{ color: "rgba(255,255,255,0.75)", paddingTop: 4 }} />
            <Bar dataKey="email" name="Email"        stackId="a" fill={BAR_CHANNEL_EMAIL} />
            <Bar dataKey="form"  name="Form / File"  stackId="a" fill={BAR_CHANNEL_FORM} />
            <Bar dataKey="link"  name="Link click"   stackId="a" fill={BAR_CHANNEL_LINK} />
            <Bar dataKey="web"   name="Web"          stackId="a" fill={BAR_CHANNEL_WEB} radius={[0, 6, 6, 0]} />
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
                <th className="text-right p-3 font-medium text-white/70">Email</th>
                <th className="text-right p-3 font-medium text-white/70">Form / File</th>
                <th className="text-right p-3 font-medium text-white/70">Link</th>
                <th className="text-right p-3 font-medium text-white/70">Web</th>
                <th className="text-right p-3 font-medium text-white/70">Total</th>
              </tr>
            </thead>
            <tbody>
              {engagementByCompany.map((row) => (
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
                  <td className="p-3 text-right tabular-nums text-white">{row.email.toLocaleString()}</td>
                  <td className="p-3 text-right tabular-nums text-white">{row.form.toLocaleString()}</td>
                  <td className="p-3 text-right tabular-nums text-white">{row.link.toLocaleString()}</td>
                  <td className="p-3 text-right tabular-nums text-white">{row.web.toLocaleString()}</td>
                  <td className="p-3 text-right tabular-nums font-bold text-primary">{row.total.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ── Strategies — pending email→strategy mapping ── */
function StrategiesTab() {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-white">Contact engagement by strategy</h3>
      <p className="text-xs text-white/70">
        Q1 RQI-tagged interactions classified by strategy. Will populate once each Q1 send /
        asset is tagged to its underlying strategy (e.g. Global Value, Indices, Demystified).
      </p>
      <div
        className="rounded-xl px-6 py-12 text-center"
        style={{ background: "rgba(255,255,255,0.03)", border: "1px dashed rgba(255,255,255,0.12)" }}
      >
        <p className="text-sm font-semibold text-white mb-1">Strategy mapping — pending</p>
        <p className="text-xs text-white/60">Awaiting strategy + campaign tagging for each Q1 email.</p>
      </div>
    </div>
  );
}

/* ── Campaigns ── */
function CampaignsTab() {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-1 text-white">Top campaigns driving contact engagement</h3>
      <p className="text-xs text-white mb-4">
        Always-on ANZ campaigns drive the bulk of interactions. The Morningstar FMOTY campaign is early but showing traction. Newsletter engagement remains strong with institutional contacts.
      </p>
      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={topCampaigns} layout="vertical" margin={{ left: 10, right: 30, top: 5, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke={CHART_GRID} />
          <XAxis type="number" tick={{ fontSize: 12, fill: CHART_TICK_DIM }} />
          <YAxis type="category" dataKey="campaign" width={220} tick={{ fontSize: 11, fill: CHART_TICK_LIGHT }} />
          <Tooltip contentStyle={CHART_TOOLTIP} cursor={CHART_CURSOR} />
          <Bar dataKey="interactions" name="Interactions" fill={BAR_Q1} radius={[0, 6, 6, 0]} barSize={18} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
