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
// Legacy export retained for any callers; superseded by engagementByCompany.
export const topEngagedAccounts = [
  { account: "Mercer Investments", interactions: 261, isOpp: true },
  { account: "HUB24", interactions: 77, isOpp: false },
  { account: "Team Super", interactions: 51, isOpp: true },
  { account: "Funds SA", interactions: 42, isOpp: true },
  { account: "Commonwealth Super", interactions: 42, isOpp: false },
  { account: "CBUS Super", interactions: 41, isOpp: true },
  { account: "JANA Investment Advisers", interactions: 35, isOpp: true },
  { account: "St Peter's College", interactions: 32, isOpp: false },
  { account: "ANZ Staff Super", interactions: 23, isOpp: false },
  { account: "Future Group", interactions: 23, isOpp: false },
  { account: "Fiducian Financial", interactions: 22, isOpp: false },
  { account: "Evidentia Group", interactions: 20, isOpp: true },
];

// ── Contact engagement by company × channel (Q1 2026) ──
// Source: Raw Data/CRM/Salesforce Activity.xlsx (Prospect Activity sheet),
// filtered to Asset Name containing "RQI" or "Realindex" and Activity Date
// in Q1 2026. RQI Investors (self-account) excluded. Channel mapping:
//   Email   = Activity in {Open, Email Click}
//   Form    = Asset Type = File   (file views / downloads)
//   Link    = Activity = Custom URL Click
//   Web     = Asset Type in {Web Page, Page View, Visitor Page View}
// 559 unique external accounts engaged in Q1; top 15 shown below.
// Opportunity stage from RQI Opportunities Report (live opps only —
// "Lost" excluded). "Won / Funded" includes stages 5 & 7.

export interface CompanyChannelRow {
  account: string;
  email: number;
  web: number;
  form: number;
  link: number;
  total: number;
  isOpp?: boolean;
  oppStage?: string;
}

export const engagementByCompany: CompanyChannelRow[] = [
  { account: "Mercer Investments",         email: 258, web: 0, form:  3, link: 0, total: 261, isOpp: true,  oppStage: "Won / Funded"       },
  { account: "HUB24",                      email:  57, web: 0, form: 20, link: 0, total:  77, isOpp: false },
  { account: "Team Super",                 email:  40, web: 0, form: 11, link: 0, total:  51, isOpp: true,  oppStage: "Initiated Dialogue" },
  { account: "Funds SA",                   email:  26, web: 0, form: 16, link: 0, total:  42, isOpp: true,  oppStage: "DD Long List"       },
  { account: "Commonwealth Super",         email:  30, web: 0, form: 12, link: 0, total:  42, isOpp: false },
  { account: "CBUS Super",                 email:  38, web: 0, form:  3, link: 0, total:  41, isOpp: true,  oppStage: "Won / Funded"       },
  { account: "JANA Investment Advisers",   email:  22, web: 0, form: 13, link: 0, total:  35, isOpp: true,  oppStage: "Initiated Dialogue" },
  { account: "St Peter's College",         email:  32, web: 0, form:  0, link: 0, total:  32, isOpp: false },
  { account: "ANZ Staff Super",            email:  23, web: 0, form:  0, link: 0, total:  23, isOpp: false },
  { account: "Future Group",               email:  23, web: 0, form:  0, link: 0, total:  23, isOpp: false },
  { account: "Fiducian Financial",         email:  22, web: 0, form:  0, link: 0, total:  22, isOpp: false },
  { account: "Financial Guidance",         email:  22, web: 0, form:  0, link: 0, total:  22, isOpp: false },
  { account: "Fire & Emergency Super",     email:  21, web: 0, form:  0, link: 0, total:  21, isOpp: false },
  { account: "Resolution Life / Acenda",   email:   9, web: 0, form: 11, link: 0, total:  20, isOpp: false },
  { account: "Evidentia Group",            email:  20, web: 0, form:  0, link: 0, total:  20, isOpp: true,  oppStage: "Won / Funded"       },
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

// ── Email performance: Q4 2025 vs Q1 2026 ─────────────────────────────
// Source: Raw Data/Email/Q4 vs Q1 email campaign data.csv
// Q4 = 11 sends, Q1 = 6 sends. Open / click rates computed against
// delivered (sent − bounces).

export interface EmailPeriodStats {
  quarter: string;
  campaigns: number;
  sent: number;
  delivered: number;
  uniqueOpens: number;
  openRate: number;       // unique opens / delivered
  uniqueClicks: number;
  ctr: number;            // unique clicks / delivered
  ctor: number;           // unique clicks / unique opens
  optOuts: number;
}

export const emailQuarterCompare: EmailPeriodStats[] = [
  { quarter: "Q4 2025", campaigns: 11, sent: 3113, delivered: 3061, uniqueOpens: 1033, openRate: 0.3375, uniqueClicks: 204, ctr: 0.0666, ctor: 0.1975, optOuts: 33 },
  { quarter: "Q1 2026", campaigns:  6, sent: 2928, delivered: 2910, uniqueOpens: 1040, openRate: 0.3574, uniqueClicks: 237, ctr: 0.0814, ctor: 0.2279, optOuts: 17 },
];

// ── Top Q1 email sends (ranked by unique opens) ───────────────────────
// "WS" = Wholesale, "Insto" = Institutional. Display names are
// shortened/cleaned versions of the raw Pardot campaign filenames.

export interface TopEmail {
  name: string;            // clean display name shown in the table
  campaign: string;        // parent campaign / programme
  sent: number;
  uniqueOpens: number;
  uniqueClicks: number;
  openRate: number;        // decimal
  ctor: number;            // decimal
}

export const topEmailsQ1: TopEmail[] = [
  { name: "RQI Morningstar FMOTY award win",        campaign: "ANZ — Award announcement",          sent: 1056, uniqueOpens: 365, uniqueClicks: 20, openRate: 0.347,  ctor: 0.0548 },
  { name: "RQI Wholesale quarterly newsletter",      campaign: "ANZ — WS quarterly newsletter",     sent:  589, uniqueOpens: 223, uniqueClicks: 51, openRate: 0.3818, ctor: 0.2287 },
  { name: "RQI Institutional newsletter — Jan",      campaign: "ANZ — Insto monthly newsletter",    sent:  313, uniqueOpens: 117, uniqueClicks: 50, openRate: 0.3774, ctor: 0.4274 },
  { name: "RQI Institutional newsletter — Mar",      campaign: "ANZ — Insto monthly newsletter",    sent:  309, uniqueOpens: 117, uniqueClicks: 56, openRate: 0.3811, ctor: 0.4786 },
  { name: "RQI Institutional newsletter — Feb",      campaign: "ANZ — Insto monthly newsletter",    sent:  311, uniqueOpens: 113, uniqueClicks: 50, openRate: 0.3645, ctor: 0.4425 },
  { name: "RQI Morningstar FMOTY award (NSW only)", campaign: "ANZ — Award announcement",          sent:  350, uniqueOpens: 105, uniqueClicks: 10, openRate: 0.3026, ctor: 0.0952 },
];
