import { useState, useEffect, useRef } from "react";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend, PieChart, Pie, Cell,
} from "recharts";
import KpiRow from "./KpiRow";
import {
  salesforceKpis, pipelineStages, regionBreakdown,
  productSplit, q1WonFunded, crmActivity,
} from "@/data/salesforce-data";
import { TrendingUp, Building2, Award, Target, Users, BarChart3 } from "lucide-react";

const TABS = ["Pipeline", "Regions", "Products", "Won & Funded"] as const;
type Tab = (typeof TABS)[number];

const PIE_COLORS = [
  "hsl(var(--primary))",
  "hsl(var(--accent))",
  "hsl(210 30% 60%)",
  "hsl(210 20% 45%)",
  "hsl(210 15% 70%)",
];

function SalesforceSection() {
  const [activeTab, setActiveTab] = useState<Tab>("Pipeline");

  return (
    <section id="salesforce" className="section-cream py-16 sm:py-20 border-t border-border">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-wrap items-center gap-3 mb-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
            Salesforce Engagement
          </h2>
          <span className="stage-badge self-center">Conversion</span>
        </div>
        <p className="text-muted-foreground mb-8 max-w-3xl">
          Q1 saw a steady pipeline with 48 new RQI opportunities matching Q4. Diversified Alpha saw significant growth (+1,600%), while the short-list stage strengthened from 1 to 5 opportunities. 6 accounts were won or funded.
        </p>

        {/* KPI Row */}
        <KpiRow kpis={salesforceKpis} />

        {/* CRM Activity Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 mb-8">
          {[
            { label: "CRM Activities", q1: crmActivity.q1.activities, q4: crmActivity.q4.activities, change: crmActivity.change.activities },
            { label: "Email Clicks", q1: crmActivity.q1.emailClicks, q4: crmActivity.q4.emailClicks, change: crmActivity.change.emailClicks },
            { label: "Unique Accounts", q1: crmActivity.q1.uniqueAccounts, q4: crmActivity.q4.uniqueAccounts, change: crmActivity.change.uniqueAccounts },
          ].map((item) => (
            <div key={item.label} className="glass-card-cream rounded-xl p-4 text-center">
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{item.label}</p>
              <p className="text-2xl font-bold text-foreground">{item.q1.toLocaleString()}</p>
              <p className="text-xs text-emerald-600 font-medium mt-1">{item.change} vs Q4</p>
            </div>
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
                  ? "bg-foreground text-background"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <div className="glass-card-cream rounded-2xl p-6 overflow-hidden">
          {activeTab === "Pipeline" && <PipelineChart />}
          {activeTab === "Regions" && <RegionChart />}
          {activeTab === "Products" && <ProductChart />}
          {activeTab === "Won & Funded" && <WonFundedTable />}
        </div>
      </div>
    </section>
  );
}

/* ── Pipeline Funnel (horizontal bar) ── */
function PipelineChart() {
  // Exclude "Lost" and "Target" for cleaner funnel view
  const data = pipelineStages.filter(
    (s) => s.shortLabel !== "Lost" && s.shortLabel !== "Target"
  );
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4 text-foreground">
        Pipeline Stage Distribution — Q1 vs Q4
      </h3>
      <ResponsiveContainer width="100%" height={320}>
        <BarChart data={data} layout="vertical" margin={{ left: 10, right: 30, top: 5, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="hsl(var(--border))" />
          <XAxis type="number" tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
          <YAxis
            type="category"
            dataKey="shortLabel"
            width={80}
            tick={{ fontSize: 12, fill: "hsl(var(--foreground))" }}
          />
          <Tooltip
            contentStyle={{
              background: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: 12,
              fontSize: 13,
            }}
          />
          <Legend />
          <Bar dataKey="q1" name="Q1 2026" fill="hsl(var(--primary))" radius={[0, 6, 6, 0]} barSize={14} />
          <Bar dataKey="q4" name="Q4 2025" fill="hsl(var(--muted-foreground))" radius={[0, 6, 6, 0]} barSize={14} />
        </BarChart>
      </ResponsiveContainer>
      <p className="text-xs text-muted-foreground mt-3">
        Q1 shows stronger short-listing activity (5 vs 1 in Q4). Won/Funded lower at 6 vs 12 — typical Q1 pattern.
      </p>
    </div>
  );
}

/* ── Regional Breakdown ── */
function RegionChart() {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4 text-foreground">
        Opportunities by Region — Q1 vs Q4
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={regionBreakdown} margin={{ left: 0, right: 30, top: 5, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis dataKey="region" tick={{ fontSize: 12, fill: "hsl(var(--foreground))" }} />
          <YAxis tick={{ fontSize: 12, fill: "hsl(var(--muted-foreground))" }} />
          <Tooltip
            contentStyle={{
              background: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: 12,
              fontSize: 13,
            }}
          />
          <Legend />
          <Bar dataKey="q1" name="Q1 2026" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} barSize={24} />
          <Bar dataKey="q4" name="Q4 2025" fill="hsl(var(--muted-foreground))" radius={[6, 6, 0, 0]} barSize={24} />
        </BarChart>
      </ResponsiveContainer>
      <p className="text-xs text-muted-foreground mt-3">
        ANZ remains the strongest region. Asia grew from 7 to 10. EMEA decreased from 9 to 3 — likely timing of European outreach cycles.
      </p>
    </div>
  );
}

/* ── Product Split ── */
function ProductChart() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <h3 className="text-lg font-semibold mb-4 text-foreground">Q1 2026 Product Split</h3>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={productSplit}
              dataKey="q1"
              nameKey="product"
              cx="50%"
              cy="50%"
              outerRadius={90}
              innerRadius={50}
              paddingAngle={3}
              label={({ product, q1 }) => `${product}: ${q1}`}
            >
              {productSplit.map((_, i) => (
                <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-4 text-foreground">Q4 2025 Product Split</h3>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={productSplit}
              dataKey="q4"
              nameKey="product"
              cx="50%"
              cy="50%"
              outerRadius={90}
              innerRadius={50}
              paddingAngle={3}
              label={({ product, q4 }) => `${product}: ${q4}`}
            >
              {productSplit.map((_, i) => (
                <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="md:col-span-2">
        <p className="text-xs text-muted-foreground">
          Diversified Alpha grew from 1 opportunity in Q4 to 17 in Q1 (+1,600%) — indicating successful positioning of the strategy with institutional investors. Value remains the core product but share is diversifying.
        </p>
      </div>
    </div>
  );
}

/* ── Won & Funded Table ── */
function WonFundedTable() {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4 text-foreground">
        Q1 2026 — Won & Funded
      </h3>
      <div className="overflow-hidden rounded-xl border border-border">
        <table className="w-full text-sm table-fixed">
          <thead>
            <tr className="bg-muted/50">
              <th className="text-left p-3 font-medium text-muted-foreground w-[35%]">Institution</th>
              <th className="text-left p-3 font-medium text-muted-foreground w-[15%]">Status</th>
              <th className="text-left p-3 font-medium text-muted-foreground w-[25%]">Region</th>
              <th className="text-left p-3 font-medium text-muted-foreground w-[25%]">Product</th>
            </tr>
          </thead>
          <tbody>
            {q1WonFunded.map((item, i) => (
              <tr key={i} className="border-t border-border">
                <td className="p-3 font-medium text-foreground truncate">{item.institution}</td>
                <td className="p-3">
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                    item.stage === "Funded"
                      ? "bg-emerald-100 text-emerald-800"
                      : "bg-blue-100 text-blue-800"
                  }`}>
                    {item.stage}
                  </span>
                </td>
                <td className="p-3 text-muted-foreground truncate">{item.region}</td>
                <td className="p-3 text-muted-foreground truncate">{item.product}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-muted-foreground mt-3">
        All Q1 wins are in ANZ. ESSSuper and Harrison Family Trust represent institutional Diversified Alpha wins — signalling growing demand for the strategy.
      </p>
    </div>
  );
}

export default SalesforceSection;
