/* ── Sentiment & Social Listening Data ── */
/* Aggregated from Mentionlytics export: Feb – Mar 2026 */
/* Filtered for RQI Investors brand only (excluding job listings & aggregator duplicates) */
/* NOTE: In web mentions, Followers/Rank column contains the domain ranking */

export interface SentimentMention {
  title: string;
  source: string;
  channel: "Web";
  category: string;
  sentiment: "positive" | "neutral" | "negative";
  country: string;
  date: string;
  link: string;
  engagement?: number;
  followers?: number;
  domainRank?: number;
  snippet?: string;
  author?: string;
}

/* ── KPI Summaries ── */
export const sentimentKpis = {
  totalMentions: 20,
  positiveRate: "50%",
  countriesReached: 4,
  topChannel: "Web — 100%",
};

/* ── Sentiment Breakdown ── */
export const sentimentBreakdown = {
  positive: 10,
  neutral: 9,
  negative: 2,
};

/* ── Monthly Timeline ── */
export const mentionsByMonth: {
  month: string;
  positive: number;
  neutral: number;
  negative: number;
  total: number;
}[] = [
  { month: "Feb 26", positive: 0, neutral: 1, negative: 0, total: 1 },
  { month: "Mar 26", positive: 10, neutral: 8, negative: 2, total: 20 },
];

/* ── Channel Breakdown ── */
export const channelBreakdown: {
  channel: string;
  mentions: number;
  positive: number;
  neutral: number;
  negative: number;
}[] = [
  { channel: "Web", mentions: 20, positive: 10, neutral: 9, negative: 2 },
];

/* ── Top Countries ── */
export const countryBreakdown: { country: string; mentions: number }[] = [
  { country: "Germany", mentions: 5 },
  { country: "United States", mentions: 4 },
  { country: "Singapore", mentions: 3 },
  { country: "Australia", mentions: 2 },
];

/* ── Notable Highlights (curated — News & Websites only, excluding job listings) ── */
export const recentHighlights: SentimentMention[] = [
  /* ─── Positive ─── */
  { title: "Upcoming Dividend Run For RQI? - ProInvestor", source: "proinvestor.com", channel: "Web", category: "Websites", sentiment: "positive", country: "DE", date: "2026-03-30", link: "https://proinvestor.com/investornyt/1426968/upcoming-dividend-run-for-rqi", domainRank: 234985, snippet: "Analysis of upcoming dividend run opportunities for Cohen & Steers Quality Income Realty Fund (RQI)." },
  { title: "Why Not T-Bills? - by Paul Drake - Focused Investing", source: "substack.com", channel: "Web", category: "News", sentiment: "positive", country: "", date: "2026-03-27", link: "https://focusedinvesting.substack.com/p/why-not-t-bills", domainRank: 450, snippet: "Discussion of REIT funds including RQI as an investment alternative for retirees." },
  { title: "Malaysia $3.3 Billion Military Pension Fund LTAT to Allocate 20% Portfolio to Foreign Assets", source: "caproasia.com", channel: "Web", category: "Websites", sentiment: "positive", country: "", date: "2026-03-27", link: "https://www.caproasia.com/2026/03/27/malaysia-3-3-billion-military-pension-fund-armed-forces-fund-board-ltat-to-allocate-20-portfolio-to-foreign-assets/", snippet: "RQI Investors Partners Launched RQI Global Value Fund referenced in context of major Asian institutional allocations." },
  { title: "First Sentier Group $20B — RQI Investors Partners Launched RQI Global Value Fund", source: "caproasia.com", channel: "Web", category: "Websites", sentiment: "positive", country: "", date: "2026-03-27", link: "https://www.caproasia.com/2026/03/27/australia-asset-manager-first-sentier-group-20-billion-quantitative-equities-investor-rqi-investors-partners-launched-rqi-global-value-fund-quantitative-investment-strategy-to-investors-in-hong-kon/", snippet: "RQI Investors is an Australian-based active quantitative equities manager delivering investment performance by combining quantitative analysis with human insight." },
  { title: "iCapital & BlackRock Aladdin Wealth Form Partnership — RQI Global Value Fund", source: "caproasia.com", channel: "Web", category: "Websites", sentiment: "positive", country: "", date: "2026-03-27", link: "https://www.caproasia.com/2026/03/27/united-states-1-1-trillion-alternative-investment-marketplace-icapital-blackrock-aladdin-wealth-form-partnership/", snippet: "RQI Investors Partners Launched RQI Global Value Fund to Investors in Hong Kong with distribution partners including DBS, Hang Seng Bank & Bank of East Asia." },
  
  { title: "Cohen & Steers Quality Income Realty Fund (RQI) Stock Dividend History & Growth", source: "stockinvest.us", channel: "Web", category: "Websites", sentiment: "positive", country: "US", date: "2026-03-10", link: "https://stockinvest.us/dividends/RQI", domainRank: 74192, snippet: "Comprehensive dividend history and growth analysis for RQI." },
  { title: "Top investment teams built on diverse views, transparency", source: "financialstandard.com.au", channel: "Web", category: "News", sentiment: "positive", country: "AU", date: "2026-03-09", link: "https://www.financialstandard.com.au/news/top-investment-teams-built-on-diverse-views-transparency-179811797", domainRank: 903371, snippet: "RQI Investors head of portfolio management Joanna Nash believes good culture is very important for investment teams." },
  { title: "Quality Income Realty Fund posts 2.94% NAV return | RQI SEC Filing", source: "stocktitan.net", channel: "Web", category: "News", sentiment: "positive", country: "US", date: "2026-03-06", link: "https://www.stocktitan.net/sec-filings/RQI/n-csr-cohen-steers-quality-income-realty-fund-inc-sec-filing-3137755d5409.html", domainRank: 29588, snippet: "Quality Income Realty Fund (NYSE: RQI) reports NAV +2.94% in 2025; $710M borrowings." },
  { title: "Dividend Calendar as of Mar 6th — Benzinga", source: "benzinga.com", channel: "Web", category: "News", sentiment: "positive", country: "DE", date: "2026-03-05", link: "https://www.benzinga.com/dividends", domainRank: 9122, snippet: "RQI — COHEN & STEERS QUALITY, 12 dividends, $0.09, 9.44% yield." },
  { title: "Will AI take your job? | Investor Strategy News", source: "ioandc.com", channel: "Web", category: "Websites", sentiment: "positive", country: "", date: "2026-03-01", link: "https://ioandc.com/will-ai-take-your-job/", domainRank: 3841781, snippet: "Joanna Nash, senior quant portfolio manager at RQI Investors, uses AI to develop more efficient and effective ways to assess investments." },

  /* ─── Neutral ─── */
  { title: "Special Stock Report: Mazda (5.06%) and Mitsubishi UFJ Financial Group", source: "moomoo.com", channel: "Web", category: "Websites", sentiment: "neutral", country: "DE", date: "2026-03-30", link: "https://www.moomoo.com/news/post/67594613/special-stock-report-mazda-5-06-and-mitsubishi-ufj-financial", domainRank: 18062, snippet: "First Sentier Investors RQI Pty Ltd holding 0.33% (2,078,202 shares) for pure investment purposes." },
  
  { title: "How Our 7-Funds Portfolio Earns 7.8% And Potentially Beats The Market", source: "seekingalpha.com", channel: "Web", category: "News", sentiment: "neutral", country: "US", date: "2026-03-28", link: "https://seekingalpha.com/article/4885508-how-our-7-funds-portfolio-earns-7-percent-and-potentially-beats-the-market", domainRank: 4522, snippet: "Portfolio strategy analysis featuring dividend-growing stocks with long-term horizon, including RQI." },
  { title: "Stewart Investors Worldwide All Cap Fund (PCT)", source: "stewartinvestors.com", channel: "Web", category: "Websites", sentiment: "neutral", country: "", date: "2026-03-27", link: "https://www.stewartinvestors.com/au/en/adviser/our-strategies/our-funds/FSF1675AU.html", snippet: "The Stewart Investors Worldwide All Cap Fund will change to the RQI Global Diversified Alpha Fund effective April 2026." },
  { title: "Cohen & Steers Quality Income Realty Fund To Go Ex-Dividend On April 14th", source: "futunn.com", channel: "Web", category: "Websites", sentiment: "neutral", country: "SG", date: "2026-03-26", link: "https://news.futunn.com/en/post/70627848/cohen-steers-quality-income-realty-fund-to-go-ex-dividend", domainRank: 35890, snippet: "Cohen & Steers Quality Income Realty Fund (RQI.US) ex-dividend date update." },
  { title: "Cohen & Steers Quality Income Realty Fund To Go Ex-Dividend On June 9th", source: "futunn.com", channel: "Web", category: "Websites", sentiment: "neutral", country: "SG", date: "2026-03-26", link: "https://news.futunn.com/en/post/70627930/cohen-steers-quality-income-realty-fund-to-go-ex-dividend", domainRank: 35890, snippet: "Cohen & Steers Quality Income Realty Fund (RQI.US) future dividend schedule." },
  { title: "BMO Capital Markets Issues Positive Forecast for DraftKings", source: "defenseworld.net", channel: "Web", category: "News", sentiment: "neutral", country: "", date: "2026-03-04", link: "https://www.defenseworld.net/2026/03/04/bmo-capital-markets-issues-positive-forecast-for-draftkings-nasdaqdkng-stock-price.html", snippet: "Cohen & Steers Quality Income Realty Fund (NYSE:RQI) shares pass above 200 Day Moving Average." },
  { title: "Governance | FS Sustainability", source: "fssustainability.com.au", channel: "Web", category: "Websites", sentiment: "neutral", country: "AU", date: "2026-03-03", link: "https://www.fssustainability.com.au/section/governance", domainRank: 6760742, snippet: "First Sentier Investors RQI Pty Ltd referenced in governance context." },
  { title: "CEF Faceoff: These 8% Dividends Look the Same. But One Is the Clear Winner", source: "nasdaq.com", channel: "Web", category: "News", sentiment: "neutral", country: "DE", date: "2026-03-02", link: "https://www.nasdaq.com/articles/cef-faceoff-these-8-dividends-look-same-one-clear-winner", domainRank: 5555, snippet: "Comparative analysis of RQI vs RFI discount and premium movements." },
  { title: "ACP or HQH or RQI - Pick the Best tool", source: "tickeron.com", channel: "Web", category: "Websites", sentiment: "neutral", country: "US", date: "2026-03-01", link: "https://tickeron.com/pick-the-best/ACP-or-HQH-or-RQI/", domainRank: 222386, snippet: "Comparative analysis tool for ACP, HQH and RQI investment funds." },
  { title: "Breaking: Company and actual controller investigated by CSRC", source: "futunn.com", channel: "Web", category: "Websites", sentiment: "neutral", country: "SG", date: "2026-02-25", link: "https://news.futunn.com/en/post/69225326/breaking-this-company-and-its-actual-controller-have-been-investigated", domainRank: 35890, snippet: "Investors advised to make rational decisions and be mindful of investment risks." },

  /* ─── Negative ─── */
  { title: "US Stock Market Today: Live Updates 30.03.2026", source: "ts2.tech", channel: "Web", category: "Websites", sentiment: "negative", country: "", date: "2026-03-30", link: "https://ts2.tech/en/stock-market-today-30-03-2026/", snippet: "Growing investor skepticism due to heavy investments in cloud and AI infrastructure." },
  { title: "RQI Investors: Active quant funds | First Sentier Investors", source: "firstsentierinvestors.com.au", channel: "Web", category: "Websites", sentiment: "negative", country: "AU", date: "2026-03-27", link: "https://www.firstsentierinvestors.com.au/au/en/adviser/our-funds/rqi-investors.html", domainRank: 1391183, snippet: "Risk disclosure: Generally, the higher the potential return of an investment, the greater the risk." },
  { title: "Diversified Alpha Strategy | RQI Investors", source: "firstsentierinvestors.com.au", channel: "Web", category: "Websites", sentiment: "negative", country: "AU", date: "2026-03-26", link: "https://www.firstsentierinvestors.com.au/au/en/adviser/our-funds/rqi-investors/diversified-alpha-strategy.html", domainRank: 1391183, snippet: "Risk disclosure for RQI Investors Diversified Alpha Strategy." },
  { title: "COHEN & STEERS QUALITY (RQI) Stock Analysis Report", source: "benzinga.com", channel: "Web", category: "News", sentiment: "negative", country: "DE", date: "2026-03-10", link: "https://jp.benzinga.com/quote/RQI/report", domainRank: 9122, snippet: "RQI Sharpe ratio over the past 5 years is -0.3331." },
];
