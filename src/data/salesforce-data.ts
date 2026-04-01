// ═══════════════════════════════════════════════════════════════════════
// SOURCE: Salesforce_Activity.xlsx (Prospect Activity + Prospect Data)
// + RQI_Opportunities_Report CSV for opportunity cross-reference
// Filtered: RQI/Realindex campaigns only, external accounts only
// ═══════════════════════════════════════════════════════════════════════

export const salesforceMarketingKpis = [
  { value: "2,434", label: "Marketing interactions (Q1)", comparison: "+11.5% vs Q4 (2,178)" },
  { value: "709", label: "Unique contacts engaged", comparison: "-7.6% vs Q4 (767)" },
  { value: "559", label: "Unique accounts reached", comparison: "-3.8% vs Q4 (581)" },
  { value: "19", label: "Opp accounts w/ marketing touch", comparison: "Active pipeline match" },
];

// Activity breakdown Q1 vs Q4
export const activityBreakdown = [
  { type: "Email Opens", q1: 1593, q4: 1518 },
  { type: "Email Clicks", q1: 614, q4: 524 },
  { type: "File Downloads", q1: 262, q4: 151 },
  { type: "Website Visits", q1: 3, q4: 1 },
  { type: "Other", q1: 9, q4: 31 },
];

// Monthly trend Q1
export const monthlyTrend = [
  { month: "Jan 26", interactions: 921 },
  { month: "Feb 26", interactions: 369 },
  { month: "Mar 26", interactions: 1144 },
];

// Job title targeting effectiveness
export const jobTitleBreakdown = [
  { title: "Director", count: 404 },
  { title: "Principal", count: 199 },
  { title: "Financial Advisor", count: 158 },
  { title: "Financial Planner", count: 94 },
  { title: "Managing Director", count: 79 },
  { title: "Fund Research Manager", count: 77 },
  { title: "Investment Analyst", count: 65 },
  { title: "Portfolio Manager", count: 62 },
  { title: "Partner", count: 47 },
  { title: "Chief Investment Officer", count: 43 },
];

// Top engaged accounts (external only, excluding RQI Investors)
export const topEngagedAccounts = [
  { account: "Mercer Investments", interactions: 261, isOpp: true },
  { account: "HUB24", interactions: 77, isOpp: false },
  { account: "Team Super", interactions: 51, isOpp: true },
  { account: "Funds SA", interactions: 42, isOpp: false },
  { account: "Commonwealth Super", interactions: 42, isOpp: false },
  { account: "CBUS Super", interactions: 41, isOpp: false },
  { account: "JANA Investment Advisers", interactions: 35, isOpp: false },
  { account: "St Peter's College", interactions: 33, isOpp: false },
  { account: "ANZ Staff Super", interactions: 23, isOpp: false },
  { account: "Future Group", interactions: 23, isOpp: false },
  { account: "Fiducian Financial", interactions: 22, isOpp: false },
  { account: "Evidentia Group", interactions: 20, isOpp: true },
];

// Opportunity accounts that had marketing touches in Q1
export const oppAccountMatches = [
  { account: "Mercer Investments", interactions: 261, stage: "Active Engagement" },
  { account: "Team Super", interactions: 51, stage: "Active Engagement" },
  { account: "Evidentia Group", interactions: 20, stage: "Won" },
  { account: "Equipsuper", interactions: 16, stage: "DD Long List" },
  { account: "Hostplus Super", interactions: 12, stage: "Initiated Dialogue" },
  { account: "Emergency Services & State Super", interactions: 10, stage: "Funded" },
  { account: "REST Industry Super", interactions: 9, stage: "Active Engagement" },
  { account: "Infocus Securities", interactions: 8, stage: "Funded" },
  { account: "Forward Financial Group", interactions: 7, stage: "DD Long List" },
  { account: "Bastion Financial Group", interactions: 6, stage: "DD Long List" },
  { account: "Lonsec", interactions: 5, stage: "Initiated Dialogue" },
  { account: "Catapult Wealth", interactions: 4, stage: "DD Long List" },
];

// Top campaigns driving activity
export const topCampaigns = [
  { campaign: "ANZ Campaigns (always-on)", interactions: 2140 },
  { campaign: "RQI Monthly Newsletter (Dec)", interactions: 33 },
  { campaign: "RQI Monthly Newsletter (Nov)", interactions: 15 },
  { campaign: "Morningstar FMOTY Award", interactions: 5 },
  { campaign: "LinkedIn", interactions: 3 },
];
