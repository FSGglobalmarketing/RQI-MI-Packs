import { useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend,
} from "recharts";
import KpiRow from "./KpiRow";
import {
  salesforceMarketingKpis, activityBreakdown, monthlyTrend,
  jobTitleBreakdown, topEngagedAccounts, oppAccountMatches, topCampaigns,
} from "@/data/salesforce-data";
import { CheckCircle2 } from "lucide-react";

const TABS = ["Activity", "Targeting", "Opp Match", "Campaigns"] as const;
type Tab = (typeof TABS)[number];

function SalesforceSection() {
  const [activeTab, setActiveTab] = useState<Tab>("Activity");

  return (
    <section id="salesforce" className="py-16 sm:py-20 border-t border-border" style={{ backgroundColor: "hsl(var(--ash))", color: "hsl(0 0% 100%)" }}>
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-wrap items-center gap-3 mb-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Salesforce Engagement
          </h2>
          <span className="stage-badge self-center">Marketing Funnel</span>
        </div>
        <p className="text-white/60 mb-8 max-w-3xl">
          Q1 saw 2,434 marketing interactions from 709 unique contacts across 559 accounts — a +11.5% increase in activity vs Q4. File downloads grew +73%, indicating deeper content engagement. 19 accounts in the active opportunity pipeline had direct marketing touches.
        </p>

        {/* KPIs - 2 rows */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          {salesforceMarketingKpis.map((kpi) => (
            <KpiRow key={kpi.label} value={kpi.value} label={kpi.label} comparison={kpi.comparison} variant="dark" />
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                activeTab === tab
                  ? "bg-white text-black"
                  : "bg-white/10 text-white/70 hover:bg-white/15"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="rounded-2xl p-6 overflow-hidden" style={{ backgroundColor: "hsl(0 0% 12%)" }}>
          {activeTab === "Activity" && <ActivityTab />}
          {activeTab === "Targeting" && <TargetingTab />}
          {activeTab === "Opp Match" && <OppMatchTab />}
          {activeTab === "Campaigns" && <CampaignsTab />}
        </div>
      </div>
    </section>
  );
}

/* Shared chart styles for ash background */
const CHART_GRID = "rgba(255,255,255,0.08)";
const CHART_TICK_LIGHT = "rgba(255,255,255,0.9)";
const CHART_TICK_DIM = "rgba(255,255,255,0.5)";
const CHART_TOOLTIP = { background: "#1a1a1a", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, fontSize: 13, color: "#fff" };
const BAR_Q1 = "hsl(var(--primary))";
const BAR_Q4 = "rgba(255,255,255,0.25)";

/* ── Activity Breakdown ── */
function ActivityTab() {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4 text-white">
          Interaction Types — Q1 vs Q4
        </h3>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={activityBreakdown} margin={{ left: 0, right: 30, top: 5, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={CHART_GRID} />
            <XAxis dataKey="type" tick={{ fontSize: 11, fill: CHART_TICK_LIGHT }} />
            <YAxis tick={{ fontSize: 12, fill: CHART_TICK_DIM }} />
            <Tooltip contentStyle={CHART_TOOLTIP} />
            <Legend wrapperStyle={{ color: "rgba(255,255,255,0.7)" }} />
            <Bar dataKey="q1" name="Q1 2026" fill={BAR_Q1} radius={[6, 6, 0, 0]} barSize={28} />
            <Bar dataKey="q4" name="Q4 2025" fill={BAR_Q4} radius={[6, 6, 0, 0]} barSize={28} />
          </BarChart>
        </ResponsiveContainer>
        <p className="text-xs text-white/50 mt-3">
          Email clicks grew +17.2% and file downloads surged +73.5% — signalling stronger content engagement in Q1. The Morningstar FMOTY and Demystified campaigns drove deeper interactions.
        </p>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4 text-white">Monthly Interaction Volume</h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={monthlyTrend} margin={{ left: 0, right: 30, top: 5, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={CHART_GRID} />
            <XAxis dataKey="month" tick={{ fontSize: 12, fill: CHART_TICK_LIGHT }} />
            <YAxis tick={{ fontSize: 12, fill: CHART_TICK_DIM }} />
            <Tooltip contentStyle={CHART_TOOLTIP} />
            <Bar dataKey="interactions" name="Interactions" fill={BAR_Q1} radius={[6, 6, 0, 0]} barSize={40} />
          </BarChart>
        </ResponsiveContainer>
        <p className="text-xs text-white/50 mt-3">
          March spike driven by Morningstar FMOTY announcement and newsletter distribution. February dip is typical seasonally.
        </p>
      </div>
    </div>
  );
}

/* ── Targeting Effectiveness ── */
function TargetingTab() {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-lg font-semibold mb-4 text-white">
          Who Are We Reaching? — Job Title Breakdown
        </h3>
        <ResponsiveContainer width="100%" height={340}>
          <BarChart data={jobTitleBreakdown} layout="vertical" margin={{ left: 10, right: 30, top: 5, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke={CHART_GRID} />
            <XAxis type="number" tick={{ fontSize: 12, fill: CHART_TICK_DIM }} />
            <YAxis type="category" dataKey="title" width={140} tick={{ fontSize: 11, fill: CHART_TICK_LIGHT }} />
            <Tooltip contentStyle={CHART_TOOLTIP} />
            <Bar dataKey="count" name="Interactions" fill={BAR_Q1} radius={[0, 6, 6, 0]} barSize={16} />
          </BarChart>
        </ResponsiveContainer>
        <p className="text-xs text-white/50 mt-3">
          Directors and Principals dominate — aligned with wholesale gatekeeper targeting. CIOs (43 interactions) and Portfolio Managers (62) confirm institutional reach.
        </p>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4 text-white">
          Top Engaged Accounts
        </h3>
        <div className="overflow-hidden rounded-xl border border-white/10">
          <table className="w-full text-sm table-fixed">
            <thead>
              <tr className="bg-white/5">
                <th className="text-left p-3 font-medium text-white/50 w-[50%]">Account</th>
                <th className="text-right p-3 font-medium text-white/50 w-[25%]">Interactions</th>
                <th className="text-center p-3 font-medium text-white/50 w-[25%]">In Pipeline?</th>
              </tr>
            </thead>
            <tbody>
              {topEngagedAccounts.map((item, i) => (
                <tr key={i} className="border-t border-white/10">
                  <td className="p-3 font-medium text-white truncate">{item.account}</td>
                  <td className="p-3 text-right tabular-nums text-white">{item.interactions}</td>
                  <td className="p-3 text-center">
                    {item.isOpp ? (
                      <CheckCircle2 className="w-4 h-4 text-primary mx-auto" />
                    ) : (
                      <span className="text-white/30 text-xs">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-white/50 mt-3">
          Mercer (261 interactions) leads engagement — they are in active DD. Several high-engagement accounts not yet in pipeline may represent new opportunity leads for distribution.
        </p>
      </div>
    </div>
  );
}

/* ── Opportunity Account Match ── */
function OppMatchTab() {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-2 text-white">
        Opportunity Accounts with Marketing Touches
      </h3>
      <p className="text-sm text-white/50 mb-4">
        19 accounts in the active Salesforce pipeline had direct marketing interactions in Q1 — validating that campaigns are reaching target prospects. Below are the 12 with highest activity.
      </p>
      <div className="overflow-hidden rounded-xl border border-white/10">
        <table className="w-full text-sm table-fixed">
          <thead>
            <tr className="bg-white/5">
              <th className="text-left p-3 font-medium text-white/50 w-[40%]">Account</th>
              <th className="text-right p-3 font-medium text-white/50 w-[20%]">Interactions</th>
              <th className="text-left p-3 font-medium text-white/50 w-[40%]">Opp Stage</th>
            </tr>
          </thead>
          <tbody>
            {oppAccountMatches.map((item, i) => (
              <tr key={i} className="border-t border-white/10">
                <td className="p-3 font-medium text-white truncate">{item.account}</td>
                <td className="p-3 text-right tabular-nums text-white">{item.interactions}</td>
                <td className="p-3">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                    item.stage === "Funded" ? "bg-primary/15 text-primary" :
                    item.stage === "Won" ? "bg-green-500/15 text-green-400" :
                    "bg-white/10 text-white/60"
                  }`}>
                    {item.stage}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-white/50 mt-4">
        Evidentia Group (Won) and Emergency Services & State Super + Infocus (Funded) all had marketing touches before conversion — suggesting marketing contributed to pipeline progression.
      </p>
    </div>
  );
}

/* ── Campaigns ── */
function CampaignsTab() {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4 text-white">
        Top Campaigns Driving Activity
      </h3>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={topCampaigns} layout="vertical" margin={{ left: 10, right: 30, top: 5, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke={CHART_GRID} />
          <XAxis type="number" tick={{ fontSize: 12, fill: CHART_TICK_DIM }} />
          <YAxis type="category" dataKey="campaign" width={200} tick={{ fontSize: 11, fill: CHART_TICK_LIGHT }} />
          <Tooltip contentStyle={CHART_TOOLTIP} />
          <Bar dataKey="interactions" name="Interactions" fill={BAR_Q1} radius={[0, 6, 6, 0]} barSize={18} />
        </BarChart>
      </ResponsiveContainer>
      <p className="text-xs text-white/50 mt-3">
        Always-on ANZ campaigns drive the majority of interactions. The Morningstar FMOTY campaign is early but showing traction. Newsletter engagement remains strong with institutional contacts.
      </p>
    </div>
  );
}

export default SalesforceSection;
