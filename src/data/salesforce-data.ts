// ═══════════════════════════════════════════════════════════════════════
// CLIENT ENGAGEMENT — EMAIL-DRIVEN (FSSA / Igneo methodology)
// Source: Raw Data/Email/* (Pardot per-recipient Sent / Opens / Clicks
// exports, 1 file per send). Q4 = 11 Q4-2025 sends, Q1 = 6 Q1-2026
// sends, taken from Raw Data/Email/Q4 vs Q1 email campaign data.csv.
// Per-company / per-strategy / per-campaign aggregates parsed from the
// per-recipient files (Sent / Opens / Clicks sheets, Company column).
// Opportunity stage joined from Raw Data/RQI Opportunities Report.csv,
// excluding stage "Lost".
// ═══════════════════════════════════════════════════════════════════════

// Headline KPI cards on the section hero. Numbers chosen to mirror
// the FSSA layout: total interactions / share of mix / peak month /
// concentration.
export const salesforceMarketingKpis = [
  // Q1 unique opens + unique clicks across all 6 Q1 sends.
  { value: "1,277", label: "Email engagements (Q1)",  comparison: "+2.4% vs Q4 (1,237)" },
  // Email is essentially 100% of the mix (no other Pardot channels in Q1).
  { value: "100%",  label: "Email share of mix",       comparison: "RQI ran no paid / web sends" },
  // Peak Q1 send-month (Mar 26: FMOTY national + Insto + FMOTY NSW).
  { value: "Mar",   label: "Peak month",               comparison: "1,715 sends · FMOTY launch" },
  // Top engaged opp account in Q1 by opens.
  { value: "47",    label: "Mercer opens",             comparison: "Mercer Investments — Won / Funded" },
];

// ── Activity tab: Q4 vs Q1 email metrics ──
// Sums from emailQuarterCompare; "Other" left out — RQI Q1 was email-only.
export const activityBreakdown = [
  { type: "Sent",     q1: 2928, q4: 3113 },
  { type: "Opens",    q1: 1040, q4: 1033 },
  { type: "Clicks",   q1:  237, q4:  204 },
  { type: "Opt-outs", q1:   17, q4:   33 },
];

// ── Activity tab: monthly Q1 send volume ──
// Computed from the Q1 sends in the CSV, grouped by send-month:
//   Jan 26 — WS quarterly (589) + Insto Jan (313) = 902
//   Feb 26 — Insto Feb (311) = 311
//   Mar 26 — Insto Mar (309) + FMOTY NSW (350) + FMOTY national (1,056) = 1,715
export const monthlyTrend = [
  { month: "Jan 26", interactions:  902 },
  { month: "Feb 26", interactions:  311 },
  { month: "Mar 26", interactions: 1715 },
];

// ── Engagement tab: per-company Q1 email engagement ──
// Each row: aggregated Sent / Opens / Clicks across the Q1 Pardot
// recipient files. RQI Investors / First Sentier Investors (internal
// accounts) excluded. Top 15 by Q1 unique opens. Opp stage from
// RQI Opportunities Report (live opps only). NB: two Q1 sends
// (Insto Mar newsletter and FMOTY NSW-only) were not present in
// the recipient export at parse time, so per-company opens for those
// two sends are not reflected in these rows.

export interface CompanyEmailRow {
  account: string;
  sent: number;
  opens: number;
  clicks: number;
  total: number;
  isOpp?: boolean;
  oppStage?: string;
}

export const engagementByCompany: CompanyEmailRow[] = [
  { account: "Mercer Investments",                   sent: 52, opens: 47, clicks: 47, total: 146, isOpp: true,  oppStage: "Won / Funded"       },
  { account: "CBUS Super",                           sent: 30, opens: 15, clicks:  1, total:  46, isOpp: true,  oppStage: "Won / Funded"       },
  { account: "NSW Treasury Corporation",             sent:  8, opens:  7, clicks:  1, total:  16, isOpp: false },
  { account: "QIC",                                  sent: 22, opens:  7, clicks:  0, total:  29, isOpp: false },
  { account: "Lonsec",                               sent:  9, opens:  6, clicks:  0, total:  15, isOpp: true,  oppStage: "DD Long List"       },
  { account: "Team Super",                           sent:  6, opens:  6, clicks:  1, total:  13, isOpp: true,  oppStage: "Initiated Dialogue" },
  { account: "RSM Financial Services",               sent: 10, opens:  6, clicks:  0, total:  16, isOpp: true,  oppStage: "DD Long List"       },
  { account: "Pgfs",                                 sent:  6, opens:  6, clicks:  0, total:  12, isOpp: false },
  { account: "HESTA",                                sent: 20, opens:  6, clicks:  1, total:  27, isOpp: false },
  { account: "Frontier Advisors",                    sent: 30, opens:  5, clicks:  1, total:  36, isOpp: false },
  { account: "Funds SA",                             sent:  8, opens:  5, clicks:  1, total:  14, isOpp: true,  oppStage: "DD Long List"       },
  { account: "CARE Super",                           sent: 16, opens:  5, clicks:  3, total:  24, isOpp: false },
  { account: "Peritus Private Wealth",               sent:  5, opens:  5, clicks:  1, total:  11, isOpp: true,  oppStage: "Initiated Dialogue" },
  { account: "Preston Wealth",                       sent:  6, opens:  5, clicks:  0, total:  11, isOpp: false },
  { account: "Cambridge Associates (Australia)",     sent:  6, opens:  4, clicks:  0, total:  10, isOpp: false },
];

// ── Strategies tab: Q1 email engagement by strategy ──
// Strategy classification derived from filename keywords:
//   Brand / General      → monthly + quarterly newsletters
//   FMOTY / Brand        → Morningstar Fund-Manager-of-the-Year sends
//   Global Value         → Global Value Campaign + ratings announcements
//   Asia campaign        → HK / Asia event eDMs
//   Cross-brand events   → Igneo Roundtable invites cross-promoted via RQI list
// "interactions" = unique opens + unique clicks for the period.

export interface StrategyRow { strategy: string; interactions: number; sent: number; opens: number; clicks: number; }

export const interactionsByStrategy: StrategyRow[] = [
  { strategy: "Brand / Newsletter",        sent: 1213, opens: 453, clicks: 151, interactions: 604 },
  { strategy: "FMOTY / Brand",             sent: 1406, opens: 470, clicks:  30, interactions: 500 },
  { strategy: "Global Value",              sent:    0, opens:   0, clicks:   0, interactions:   0 },
  { strategy: "Asia campaign",             sent:    0, opens:   0, clicks:   0, interactions:   0 },
  { strategy: "Cross-brand events",        sent:    0, opens:   0, clicks:   0, interactions:   0 },
];

// ── Campaigns tab: top Q1 campaigns by engagement ──
// "interactions" = unique opens + unique clicks (per the Pardot export).
// Sent comes from emailQuarterCompare-aligned CSV totals.
export const topCampaigns = [
  { campaign: "Morningstar FMOTY (national)",      sent: 1056, opens: 365, clicks: 20, interactions: 385 },
  { campaign: "Insto monthly newsletter (Jan/Feb/Mar)", sent: 933,  opens: 347, clicks: 156, interactions: 503 },
  { campaign: "Wholesale quarterly newsletter",     sent:  589, opens: 223, clicks: 51, interactions: 274 },
  { campaign: "Morningstar FMOTY (NSW only)",       sent:  350, opens: 105, clicks: 10, interactions: 115 },
];

// ── Email performance: Q4 2025 vs Q1 2026 ──
// Trusted totals from Raw Data/Email/Q4 vs Q1 email campaign data.csv.
// Open / click rates computed against delivered (sent − bounces).

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

// ── Top Q1 email sends (ranked by unique opens) ──
// "WS" = Wholesale, "Insto" = Institutional. Display names are
// shortened/cleaned versions of the raw Pardot campaign filenames.

export interface TopEmail {
  name: string;
  campaign: string;
  sent: number;
  uniqueOpens: number;
  uniqueClicks: number;
  openRate: number;
  ctor: number;
}

export const topEmailsQ1: TopEmail[] = [
  { name: "RQI Morningstar FMOTY award win",         campaign: "ANZ — Award announcement",          sent: 1056, uniqueOpens: 365, uniqueClicks: 20, openRate: 0.347,  ctor: 0.0548 },
  { name: "RQI Wholesale quarterly newsletter",       campaign: "ANZ — WS quarterly newsletter",     sent:  589, uniqueOpens: 223, uniqueClicks: 51, openRate: 0.3818, ctor: 0.2287 },
  { name: "RQI Institutional newsletter — Jan",       campaign: "ANZ — Insto monthly newsletter",    sent:  313, uniqueOpens: 117, uniqueClicks: 50, openRate: 0.3774, ctor: 0.4274 },
  { name: "RQI Institutional newsletter — Mar",       campaign: "ANZ — Insto monthly newsletter",    sent:  309, uniqueOpens: 117, uniqueClicks: 56, openRate: 0.3811, ctor: 0.4786 },
  { name: "RQI Institutional newsletter — Feb",       campaign: "ANZ — Insto monthly newsletter",    sent:  311, uniqueOpens: 113, uniqueClicks: 50, openRate: 0.3645, ctor: 0.4425 },
  { name: "RQI Morningstar FMOTY award (NSW only)",  campaign: "ANZ — Award announcement",          sent:  350, uniqueOpens: 105, uniqueClicks: 10, openRate: 0.3026, ctor: 0.0952 },
];

// ── Legacy exports (kept for any stale imports) ──
export const topEngagedAccounts: { account: string; interactions: number; isOpp: boolean }[] = [];
export const oppAccountMatches: { account: string; interactions: number; stage: string }[] = [];
export const jobTitleBreakdown: { title: string; count: number }[] = [];
