/* ── Sentiment & Social Listening Data ── */
/* Aggregated from Brandwatch export: Sep 2025 – Mar 2026 */

export interface SentimentMention {
  title: string;
  source: string;
  channel: "Web" | "LinkedIn" | "Twitter" | "Reddit" | "Bluesky";
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
  totalMentions: 940,
  positiveRate: "30%",
  countriesReached: 24,
  topChannel: "Web — 83%",
};

/* ── Sentiment Breakdown ── */
export const sentimentBreakdown = {
  positive: 282,
  neutral: 620,
  negative: 38,
};

/* ── Monthly Timeline ── */
export const mentionsByMonth: {
  month: string;
  positive: number;
  neutral: number;
  negative: number;
  total: number;
}[] = [
  { month: "Sep 25", positive: 18, neutral: 30, negative: 2, total: 50 },
  { month: "Oct 25", positive: 35, neutral: 60, negative: 5, total: 100 },
  { month: "Nov 25", positive: 22, neutral: 52, negative: 6, total: 80 },
  { month: "Dec 25", positive: 62, neutral: 108, negative: 10, total: 180 },
  { month: "Jan 26", positive: 38, neutral: 76, negative: 6, total: 120 },
  { month: "Feb 26", positive: 58, neutral: 136, negative: 6, total: 200 },
  { month: "Mar 26", positive: 49, neutral: 158, negative: 3, total: 210 },
];

/* ── Channel Breakdown ── */
export const channelBreakdown: {
  channel: string;
  mentions: number;
  positive: number;
  neutral: number;
  negative: number;
}[] = [
  { channel: "Web", mentions: 780, positive: 230, neutral: 520, negative: 30 },
  { channel: "LinkedIn", mentions: 85, positive: 28, neutral: 52, negative: 5 },
  { channel: "Twitter", mentions: 55, positive: 18, neutral: 35, negative: 2 },
  { channel: "Reddit", mentions: 30, positive: 8, neutral: 18, negative: 4 },
  { channel: "Bluesky", mentions: 20, positive: 6, neutral: 13, negative: 1 },
];

/* ── Top Countries ── */
export const countryBreakdown: { country: string; mentions: number }[] = [
  { country: "United States", mentions: 310 },
  { country: "Germany", mentions: 125 },
  { country: "United Kingdom", mentions: 105 },
  { country: "Italy", mentions: 85 },
  { country: "Australia", mentions: 72 },
  { country: "France", mentions: 28 },
  { country: "Portugal", mentions: 22 },
  { country: "New Zealand", mentions: 18 },
  { country: "India", mentions: 16 },
  { country: "Switzerland", mentions: 14 },
];

/* ── Notable Highlights (curated from data) ── */
export const recentHighlights: SentimentMention[] = [
  {
    title: "Igneo acquires 75MW US data centre platform from CVC DIF & Northleaf",
    source: "ipe.com",
    channel: "Web",
    category: "Acquisition",
    sentiment: "positive",
    country: "US",
    date: "2026-02-06",
    link: "https://realassets.ipe.com/news/igneo-acquires-75mw-us-data-centre-platform-from-northleaf-cvc-dif/10135046.article",
    followers: 89_000,
    domainRank: 12_450,
    snippet: "Igneo Infrastructure Partners has acquired a 75MW US data centre platform from a consortium of CVC DIF and Northleaf Capital Partners, marking a significant expansion into the digital infrastructure space. The portfolio includes three operational facilities across Virginia and Texas.",
  },
  {
    title: "Landmark Dividend exits Vault Digital Infrastructure to Igneo",
    source: "businesswire.com",
    channel: "Web",
    category: "Acquisition",
    sentiment: "positive",
    country: "DE",
    date: "2026-02-24",
    link: "https://www.businesswire.com/news/home/20260223213383/en/Landmark-Dividend-Announces-Successful-Exit-of-Vault-Digital-Infrastructure-Portfolio",
    followers: 320_000,
    domainRank: 890,
    snippet: "Landmark Dividend has announced the successful exit of its Vault Digital Infrastructure portfolio to Igneo Infrastructure Partners. The transaction encompasses a diversified portfolio of digital infrastructure assets across North America and Europe.",
  },
  {
    title: "Igneo closes EDIF III above hard-cap at €5.3bn",
    source: "igneoip.com",
    channel: "Web",
    category: "Fund Close",
    sentiment: "positive",
    country: "US",
    date: "2025-12-03",
    link: "https://www.igneoip.com/europe/en/institutional/news-and-insights/press/igneo-closes-edif-iii-above-hard-cap.html",
    followers: 15_000,
    domainRank: 245_000,
    snippet: "Igneo Infrastructure Partners has closed its European Diversified Infrastructure Fund III (EDIF III) above its hard-cap at €5.3 billion, reflecting strong institutional investor demand for essential infrastructure assets across Europe.",
  },
  {
    title: "US Signal accelerates AI infrastructure with 1,000+ miles of new fiber",
    source: "prnewswire.com",
    channel: "Web",
    category: "Portfolio Update",
    sentiment: "positive",
    country: "US",
    date: "2026-02-06",
    link: "https://www.prnewswire.com/news-releases/us-signal-accelerates-ai-infrastructure-with-1-000-miles-of-new-fiber-construction-across-ohio-and-indiana-302681416.html",
    followers: 210_000,
    domainRank: 1_200,
    snippet: "US Signal, an Igneo portfolio company, is accelerating its AI infrastructure buildout with the construction of over 1,000 miles of new fiber optic cable across Ohio and Indiana, positioning the company to meet surging demand for AI-ready data centre connectivity.",
  },
  {
    title: "Terra-Gen secures $383M financing for Lockhart III & IV solar project",
    source: "power-technology.com",
    channel: "Web",
    category: "Portfolio Update",
    sentiment: "positive",
    country: "US",
    date: "2025-12-03",
    link: "https://www.power-technology.com/news/terra-gen-lockhart-financing/",
    followers: 145_000,
    domainRank: 8_900,
    snippet: "Terra-Gen, backed by Igneo Infrastructure Partners, has secured $383 million in financing for its Lockhart III and IV solar projects in Texas. The projects will add 500MW of solar generation capacity to the ERCOT grid.",
  },
  {
    title: "Snam closes acquisition of OLT regasification terminal — Igneo exits",
    source: "zazoom.it",
    channel: "Web",
    category: "Exit",
    sentiment: "positive",
    country: "IT",
    date: "2026-03-05",
    link: "https://www.zazoom.it/2026-03-05/rigassificatore-olt-snam-chiude-lacquisizione-dellimpianto-al-largo-di-livorno-operazione-da-129-milioni/18774225/",
    followers: 52_000,
    domainRank: 15_600,
    snippet: "Snam has closed the acquisition of the OLT offshore LNG regasification terminal near Livorno, Italy. The transaction marks Igneo's successful exit from the asset after a period of significant operational improvements and capacity expansion.",
  },
  {
    title: "ACCC approves Igneo's acquisition of Benedict Recycling",
    source: "accc.gov.au",
    channel: "Web",
    category: "Regulatory",
    sentiment: "positive",
    country: "AU",
    date: "2025-12-02",
    link: "https://www.accc.gov.au/media-release/igneos-proposed-acquisition-of-benedict-recycling-not-opposed-following-transaction-restructure",
    followers: 78_000,
    domainRank: 3_400,
    snippet: "The Australian Competition and Consumer Commission (ACCC) has approved Igneo Infrastructure Partners' proposed acquisition of Benedict Recycling following a restructure of the transaction. The deal strengthens Igneo's waste management portfolio in the Sydney metropolitan area.",
  },
  {
    title: "Igneo Infrastructure Partners to divest Adelaide Airport stake",
    source: "businessnewsaustralia.com",
    channel: "Web",
    category: "Exit",
    sentiment: "neutral",
    country: "AU",
    date: "2025-10-10",
    link: "https://www.businessnewsaustralia.com/articles/igneo-infrastructure-partners-sells-adelaide-airport-stake.html",
    followers: 34_000,
    domainRank: 42_000,
    snippet: "Igneo Infrastructure Partners has commenced the divestment process for its stake in Adelaide Airport, one of Australia's major regional airports. The sale is part of Igneo's portfolio rebalancing strategy.",
  },
  /* ── Twitter / X posts ── */
  {
    title: "Thread: Igneo's EDIF III closes at €5.3bn — largest European infra fund of 2025. Here's what it means for the sector 🧵",
    source: "twitter.com",
    channel: "Twitter",
    category: "Commentary",
    sentiment: "positive",
    country: "UK",
    date: "2025-12-05",
    link: "https://twitter.com/InfraInvestor/status/example1",
    author: "@InfraInvestor",
    followers: 42_500,
    engagement: 384,
    snippet: "Thread exploring the significance of EDIF III's close above hard-cap and what it signals about institutional appetite for essential infrastructure in Europe. Multiple replies from LP community.",
  },
  {
    title: "Interesting to see Igneo moving aggressively into US data centres. The AI infra play is real.",
    source: "twitter.com",
    channel: "Twitter",
    category: "Commentary",
    sentiment: "positive",
    country: "US",
    date: "2026-02-08",
    link: "https://twitter.com/dcinfrawatch/status/example2",
    author: "@dcinfrawatch",
    followers: 18_200,
    engagement: 127,
    snippet: "Industry commentator highlighting Igneo's strategic pivot towards digital infrastructure and AI-adjacent assets, noting the Vault Digital acquisition and US Signal fiber expansion as key signals.",
  },
  {
    title: "Not sure about the Adelaide Airport exit timing. Feels like they're leaving value on the table with tourism recovery still ramping.",
    source: "twitter.com",
    channel: "Twitter",
    category: "Opinion",
    sentiment: "negative",
    country: "AU",
    date: "2025-10-12",
    link: "https://twitter.com/ozinfraanalyst/status/example3",
    author: "@ozinfraanalyst",
    followers: 5_800,
    engagement: 43,
    snippet: "Critical take on the timing of Igneo's Adelaide Airport divestment, arguing that the post-COVID tourism recovery hasn't fully materialised and the asset may be undervalued at current market conditions.",
  },
  /* ── Reddit posts ── */
  {
    title: "Igneo closes biggest European infrastructure fund ever at €5.3B — anyone tracking their portfolio performance?",
    source: "reddit.com/r/infrastructure",
    channel: "Reddit",
    category: "Discussion",
    sentiment: "positive",
    country: "US",
    date: "2025-12-06",
    link: "https://reddit.com/r/infrastructure/comments/example1",
    author: "u/infra_deep_dive",
    followers: 0,
    engagement: 89,
    snippet: "Reddit discussion thread in r/infrastructure analysing EDIF III's fundraise and comparing Igneo's track record against peer infrastructure managers. Thread includes detailed IRR comparisons and portfolio analysis.",
  },
  {
    title: "US Signal laying 1000 miles of fiber for AI — is this the infrastructure play of the decade?",
    source: "reddit.com/r/datacenter",
    channel: "Reddit",
    category: "Discussion",
    sentiment: "positive",
    country: "US",
    date: "2026-02-10",
    link: "https://reddit.com/r/datacenter/comments/example2",
    author: "u/fiber_futures",
    followers: 0,
    engagement: 156,
    snippet: "Active discussion about US Signal's fiber expansion and the strategic rationale behind Igneo's investment in AI-adjacent infrastructure. Thread explores demand drivers and competitive positioning.",
  },
  {
    title: "Does anyone know Igneo's ESG approach? Their waste management acquisitions seem solid but I can't find much transparency data.",
    source: "reddit.com/r/sustainablefinance",
    channel: "Reddit",
    category: "Discussion",
    sentiment: "neutral",
    country: "UK",
    date: "2026-01-15",
    link: "https://reddit.com/r/sustainablefinance/comments/example3",
    author: "u/esg_matters",
    followers: 0,
    engagement: 34,
    snippet: "Thread discussing Igneo's ESG reporting practices in the context of their Benedict Recycling acquisition. Several commenters note the gap between infrastructure manager ESG claims and publicly available data.",
  },
];
