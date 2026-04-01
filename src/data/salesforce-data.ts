// ═══════════════════════════════════════════════════════════════════════
// SOURCE: RQI_Opportunities_Report_-_MKT-2026-04-01-14-07-51.csv
// Filtered: RQI-only opportunities, deduplicated by Institution+Opportunity
// Client = 7-Account Funded; Won = 5-Won; rest = Prospect
// ═══════════════════════════════════════════════════════════════════════

export interface PipelineStage {
  stage: string;
  shortLabel: string;
  q1: number;
  q4: number;
}

export interface RegionBreakdown {
  region: string;
  q1: number;
  q4: number;
}

export interface ProductSplit {
  product: string;
  q1: number;
  q4: number;
}

export interface SalesforceHighlight {
  institution: string;
  stage: string;
  region: string;
  product: string;
}

export const salesforceKpis = [
  { value: "48", label: "New opportunities (Q1)", comparison: "Same as Q4 (48)" },
  { value: "6", label: "Won / Funded (Q1)", comparison: "vs 12 in Q4", status: "below" as const },
  { value: "47", label: "Active pipeline", comparison: "Same as Q4 (47)" },
  { value: "17", label: "Diversified Alpha opps", comparison: "+1,600% vs Q4 (1)" },
];

// Pipeline funnel: stage distribution Q1 vs Q4
export const pipelineStages: PipelineStage[] = [
  { stage: "0-Target Investor", shortLabel: "Target", q1: 1, q4: 0 },
  { stage: "1-Initiated Dialogue", shortLabel: "Dialogue", q1: 16, q4: 12 },
  { stage: "2-Active Engagement", shortLabel: "Active", q1: 10, q4: 11 },
  { stage: "3-DD Long List", shortLabel: "Long List", q1: 10, q4: 11 },
  { stage: "4-DD Short List", shortLabel: "Short List", q1: 5, q4: 1 },
  { stage: "5-Won", shortLabel: "Won", q1: 2, q4: 4 },
  { stage: "7-Account Funded", shortLabel: "Funded", q1: 4, q4: 8 },
  { stage: "Lost", shortLabel: "Lost", q1: 0, q4: 1 },
];

// Regional breakdown
export const regionBreakdown: RegionBreakdown[] = [
  { region: "ANZ", q1: 31, q4: 28 },
  { region: "Asia", q1: 10, q4: 7 },
  { region: "EMEA", q1: 3, q4: 9 },
  { region: "US", q1: 2, q4: 2 },
  { region: "Other", q1: 2, q4: 2 },
];

// Product split
export const productSplit: ProductSplit[] = [
  { product: "Value", q1: 28, q4: 42 },
  { product: "Diversified Alpha", q1: 17, q4: 1 },
  { product: "Other", q1: 3, q4: 5 },
];

// Q1 Won / Funded highlights
export const q1WonFunded: SalesforceHighlight[] = [
  { institution: "Infocus Securities Australia", stage: "Funded", region: "ANZ Wholesale", product: "Value" },
  { institution: "Emergency Services & State Super", stage: "Funded", region: "ANZ Institutional", product: "Diversified Alpha" },
  { institution: "Harrison Family Trust", stage: "Funded", region: "ANZ Institutional", product: "Diversified Alpha + Value" },
  { institution: "Evidentia Group", stage: "Won", region: "ANZ Institutional", product: "Value" },
  { institution: "Crofts Financial Services", stage: "Won", region: "ANZ Wholesale", product: "Value" },
];

// CRM Activity data (from Salesforce_Activity.xlsx — RQI filtered)
export const crmActivity = {
  q1: { activities: 3355, emailClicks: 280, uniqueAccounts: 560 },
  q4: { activities: 3002, emailClicks: 239, uniqueAccounts: 498 },
  change: { activities: "+11.8%", emailClicks: "+17.2%", uniqueAccounts: "+12.4%" },
};
