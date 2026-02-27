// Monthly aggregated LinkedIn data derived from daily Igneo LinkedIn export
// Covers Jul 2022 – Dec 2025

export interface LinkedInMonthly {
  month: string; // "MMM YY"
  organic: number;
  sponsored: number;
  clicks: number;
  reactions: number;
  comments: number;
  shares: number;
  engagementRate: number; // decimal
}

export const linkedInMonthlyData: LinkedInMonthly[] = [
  { month: "Jul 22", organic: 18200, sponsored: 648000, clicks: 2340, reactions: 310, comments: 8, shares: 22, engagementRate: 0.01 },
  { month: "Aug 22", organic: 12400, sponsored: 795000, clicks: 3100, reactions: 540, comments: 5, shares: 12, engagementRate: 0.01 },
  { month: "Sep 22", organic: 24100, sponsored: 15200, clicks: 1240, reactions: 520, comments: 6, shares: 30, engagementRate: 0.05 },
  { month: "Oct 22", organic: 52300, sponsored: 86400, clicks: 3850, reactions: 680, comments: 16, shares: 28, engagementRate: 0.04 },
  { month: "Nov 22", organic: 38500, sponsored: 31200, clicks: 2510, reactions: 870, comments: 10, shares: 62, engagementRate: 0.05 },
  { month: "Dec 22", organic: 33800, sponsored: 0, clicks: 2180, reactions: 590, comments: 4, shares: 30, engagementRate: 0.08 },
  { month: "Jan 23", organic: 6200, sponsored: 0, clicks: 380, reactions: 120, comments: 1, shares: 16, engagementRate: 0.07 },
  { month: "Feb 23", organic: 5800, sponsored: 0, clicks: 290, reactions: 95, comments: 2, shares: 8, engagementRate: 0.06 },
  { month: "Mar 23", organic: 4800, sponsored: 0, clicks: 310, reactions: 85, comments: 0, shares: 5, engagementRate: 0.07 },
  { month: "Apr 23", organic: 5200, sponsored: 0, clicks: 340, reactions: 110, comments: 2, shares: 6, engagementRate: 0.08 },
  { month: "May 23", organic: 6900, sponsored: 0, clicks: 410, reactions: 130, comments: 1, shares: 10, engagementRate: 0.07 },
  { month: "Jun 23", organic: 7400, sponsored: 0, clicks: 450, reactions: 140, comments: 3, shares: 8, engagementRate: 0.07 },
  { month: "Jul 23", organic: 8600, sponsored: 0, clicks: 520, reactions: 160, comments: 2, shares: 12, engagementRate: 0.07 },
  { month: "Aug 23", organic: 7300, sponsored: 0, clicks: 390, reactions: 125, comments: 1, shares: 7, engagementRate: 0.06 },
  { month: "Sep 23", organic: 7000, sponsored: 0, clicks: 410, reactions: 145, comments: 3, shares: 9, engagementRate: 0.07 },
  { month: "Oct 23", organic: 9400, sponsored: 0, clicks: 580, reactions: 195, comments: 4, shares: 14, engagementRate: 0.07 },
  { month: "Nov 23", organic: 11200, sponsored: 0, clicks: 680, reactions: 230, comments: 2, shares: 18, engagementRate: 0.07 },
  { month: "Dec 23", organic: 8700, sponsored: 0, clicks: 520, reactions: 175, comments: 1, shares: 10, engagementRate: 0.07 },
  { month: "Jan 24", organic: 9800, sponsored: 0, clicks: 590, reactions: 200, comments: 3, shares: 12, engagementRate: 0.07 },
  { month: "Feb 24", organic: 8500, sponsored: 0, clicks: 480, reactions: 170, comments: 2, shares: 9, engagementRate: 0.07 },
  { month: "Mar 24", organic: 10800, sponsored: 0, clicks: 650, reactions: 220, comments: 4, shares: 15, engagementRate: 0.07 },
  { month: "Apr 24", organic: 14200, sponsored: 58000, clicks: 1850, reactions: 340, comments: 6, shares: 18, engagementRate: 0.03 },
  { month: "May 24", organic: 16400, sponsored: 68000, clicks: 2200, reactions: 380, comments: 5, shares: 22, engagementRate: 0.03 },
  { month: "Jun 24", organic: 18100, sponsored: 75000, clicks: 2450, reactions: 410, comments: 8, shares: 25, engagementRate: 0.03 },
  { month: "Jul 24", organic: 15200, sponsored: 88000, clicks: 2100, reactions: 350, comments: 4, shares: 16, engagementRate: 0.02 },
  { month: "Aug 24", organic: 13500, sponsored: 93000, clicks: 1950, reactions: 310, comments: 3, shares: 14, engagementRate: 0.02 },
  { month: "Sep 24", organic: 14800, sponsored: 98000, clicks: 2300, reactions: 360, comments: 5, shares: 20, engagementRate: 0.02 },
  { month: "Oct 24", organic: 42400, sponsored: 285000, clicks: 6800, reactions: 980, comments: 12, shares: 35, engagementRate: 0.03 },
  { month: "Nov 24", organic: 22500, sponsored: 48000, clicks: 2900, reactions: 480, comments: 5, shares: 18, engagementRate: 0.04 },
  { month: "Dec 24", organic: 56000, sponsored: 185000, clicks: 8200, reactions: 1150, comments: 6, shares: 32, engagementRate: 0.04 },
  { month: "Jan 25", organic: 11500, sponsored: 135000, clicks: 1850, reactions: 320, comments: 2, shares: 8, engagementRate: 0.02 },
  { month: "Feb 25", organic: 18200, sponsored: 62000, clicks: 1650, reactions: 480, comments: 5, shares: 12, engagementRate: 0.03 },
  { month: "Mar 25", organic: 19500, sponsored: 95000, clicks: 2100, reactions: 390, comments: 2, shares: 10, engagementRate: 0.02 },
  { month: "Apr 25", organic: 48000, sponsored: 0, clicks: 5200, reactions: 720, comments: 14, shares: 8, engagementRate: 0.09 },
  { month: "May 25", organic: 22500, sponsored: 0, clicks: 890, reactions: 260, comments: 1, shares: 10, engagementRate: 0.05 },
  { month: "Jun 25", organic: 49000, sponsored: 0, clicks: 2350, reactions: 780, comments: 1, shares: 12, engagementRate: 0.07 },
  { month: "Jul 25", organic: 44000, sponsored: 0, clicks: 2650, reactions: 680, comments: 4, shares: 8, engagementRate: 0.07 },
  { month: "Aug 25", organic: 29000, sponsored: 0, clicks: 1180, reactions: 340, comments: 3, shares: 8, engagementRate: 0.05 },
  { month: "Sep 25", organic: 40000, sponsored: 82000, clicks: 2850, reactions: 670, comments: 8, shares: 10, engagementRate: 0.04 },
  { month: "Oct 25", organic: 78000, sponsored: 710000, clicks: 8400, reactions: 1520, comments: 8, shares: 42, engagementRate: 0.02 },
  { month: "Nov 25", organic: 40000, sponsored: 82000, clicks: 2600, reactions: 720, comments: 8, shares: 12, engagementRate: 0.03 },
  { month: "Dec 25", organic: 62000, sponsored: 520000, clicks: 14500, reactions: 1580, comments: 6, shares: 38, engagementRate: 0.03 },
];

// Quarterly organic vs sponsored for bar chart
export interface LinkedInQuarterly {
  quarter: string;
  organic: number;
  sponsored: number;
}

export const linkedInQuarterlyData: LinkedInQuarterly[] = [
  { quarter: "Q3 '22", organic: 54700, sponsored: 1458200 },
  { quarter: "Q4 '22", organic: 124600, sponsored: 117600 },
  { quarter: "Q1 '23", organic: 16800, sponsored: 0 },
  { quarter: "Q2 '23", organic: 19500, sponsored: 0 },
  { quarter: "Q3 '23", organic: 22900, sponsored: 0 },
  { quarter: "Q4 '23", organic: 29300, sponsored: 0 },
  { quarter: "Q1 '24", organic: 29100, sponsored: 0 },
  { quarter: "Q2 '24", organic: 48700, sponsored: 201000 },
  { quarter: "Q3 '24", organic: 43500, sponsored: 279000 },
  { quarter: "Q4 '24", organic: 120900, sponsored: 518000 },
  { quarter: "Q1 '25", organic: 49200, sponsored: 292000 },
  { quarter: "Q2 '25", organic: 119500, sponsored: 0 },
  { quarter: "Q3 '25", organic: 113000, sponsored: 82000 },
  { quarter: "Q4 '25", organic: 180000, sponsored: 1312000 },
];

// Daily engagement rates for Q4 2025 heatmap (real data from export)
export interface DailyEngagement {
  date: string; // YYYY-MM-DD
  rate: number; // percentage
}

export const q4DailyEngagement: DailyEngagement[] = [
  // October 2025
  { date: "2025-10-01", rate: 1.38 }, { date: "2025-10-02", rate: 4.58 }, { date: "2025-10-03", rate: 0.88 },
  { date: "2025-10-04", rate: 0.45 }, { date: "2025-10-05", rate: 0.23 }, { date: "2025-10-06", rate: 1.73 },
  { date: "2025-10-07", rate: 2.96 }, { date: "2025-10-08", rate: 2.31 }, { date: "2025-10-09", rate: 2.39 },
  { date: "2025-10-10", rate: 3.94 }, { date: "2025-10-11", rate: 0.52 }, { date: "2025-10-12", rate: 0.26 },
  { date: "2025-10-13", rate: 0.54 }, { date: "2025-10-14", rate: 0.86 }, { date: "2025-10-15", rate: 1.03 },
  { date: "2025-10-16", rate: 1.40 }, { date: "2025-10-17", rate: 1.08 }, { date: "2025-10-18", rate: 1.64 },
  { date: "2025-10-19", rate: 0.45 }, { date: "2025-10-20", rate: 0.37 }, { date: "2025-10-21", rate: 0.19 },
  { date: "2025-10-22", rate: 0.71 }, { date: "2025-10-23", rate: 1.35 }, { date: "2025-10-24", rate: 0.86 },
  { date: "2025-10-25", rate: 1.07 }, { date: "2025-10-26", rate: 1.01 }, { date: "2025-10-27", rate: 2.79 },
  { date: "2025-10-28", rate: 2.45 }, { date: "2025-10-29", rate: 1.24 }, { date: "2025-10-30", rate: 4.75 },
  { date: "2025-10-31", rate: 2.09 },
  // November 2025
  { date: "2025-11-01", rate: 3.59 }, { date: "2025-11-02", rate: 1.31 }, { date: "2025-11-03", rate: 2.40 },
  { date: "2025-11-04", rate: 2.17 }, { date: "2025-11-05", rate: 0.57 }, { date: "2025-11-06", rate: 1.82 },
  { date: "2025-11-07", rate: 1.60 }, { date: "2025-11-08", rate: 0.82 }, { date: "2025-11-09", rate: 7.64 },
  { date: "2025-11-10", rate: 0.96 }, { date: "2025-11-11", rate: 1.50 }, { date: "2025-11-12", rate: 1.66 },
  { date: "2025-11-13", rate: 3.09 }, { date: "2025-11-14", rate: 3.14 }, { date: "2025-11-15", rate: 1.48 },
  { date: "2025-11-16", rate: 1.67 }, { date: "2025-11-17", rate: 3.67 }, { date: "2025-11-18", rate: 3.18 },
  { date: "2025-11-19", rate: 3.48 }, { date: "2025-11-20", rate: 2.64 }, { date: "2025-11-21", rate: 1.69 },
  { date: "2025-11-22", rate: 1.46 }, { date: "2025-11-23", rate: 3.17 }, { date: "2025-11-24", rate: 1.20 },
  { date: "2025-11-25", rate: 1.18 }, { date: "2025-11-26", rate: 0.87 }, { date: "2025-11-27", rate: 5.49 },
  { date: "2025-11-28", rate: 3.81 }, { date: "2025-11-29", rate: 4.95 }, { date: "2025-11-30", rate: 1.55 },
  // December 2025
  { date: "2025-12-01", rate: 6.35 }, { date: "2025-12-02", rate: 5.74 }, { date: "2025-12-03", rate: 7.65 },
  { date: "2025-12-04", rate: 5.43 }, { date: "2025-12-05", rate: 4.64 }, { date: "2025-12-06", rate: 6.85 },
  { date: "2025-12-07", rate: 5.04 }, { date: "2025-12-08", rate: 2.53 }, { date: "2025-12-09", rate: 3.23 },
  { date: "2025-12-10", rate: 3.69 }, { date: "2025-12-11", rate: 4.71 }, { date: "2025-12-12", rate: 2.62 },
  { date: "2025-12-13", rate: 2.40 }, { date: "2025-12-14", rate: 2.00 }, { date: "2025-12-15", rate: 1.58 },
  { date: "2025-12-16", rate: 2.00 }, { date: "2025-12-17", rate: 2.37 }, { date: "2025-12-18", rate: 2.12 },
  { date: "2025-12-19", rate: 2.34 }, { date: "2025-12-20", rate: 2.35 }, { date: "2025-12-21", rate: 2.36 },
  { date: "2025-12-22", rate: 2.56 }, { date: "2025-12-23", rate: 2.09 }, { date: "2025-12-24", rate: 2.49 },
  { date: "2025-12-25", rate: 2.19 }, { date: "2025-12-26", rate: 2.48 }, { date: "2025-12-27", rate: 2.24 },
  { date: "2025-12-28", rate: 1.85 }, { date: "2025-12-29", rate: 1.92 }, { date: "2025-12-30", rate: 3.29 },
  { date: "2025-12-31", rate: 2.49 },
];
