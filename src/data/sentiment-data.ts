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
  },
  /* ── Twitter / X ── */
  {
    title: "Thread: Igneo's EDIF III closes at €5.3bn — largest European infra fund of 2025",
    source: "twitter.com",
    channel: "Twitter",
    category: "Commentary",
    sentiment: "positive",
    country: "UK",
    date: "2025-12-05",
    link: "",
  },
  {
    title: "Interesting to see Igneo moving aggressively into US data centres. The AI infra play is real.",
    source: "twitter.com",
    channel: "Twitter",
    category: "Commentary",
    sentiment: "positive",
    country: "US",
    date: "2026-02-08",
    link: "",
  },
  {
    title: "Not sure about the Adelaide Airport exit timing. Feels like they're leaving value on the table with tourism recovery still ramping.",
    source: "twitter.com",
    channel: "Twitter",
    category: "Opinion",
    sentiment: "negative",
    country: "AU",
    date: "2025-10-12",
    link: "",
  },
  /* ── Reddit ── */
  {
    title: "Igneo closes biggest European infrastructure fund ever at €5.3B — anyone tracking their portfolio performance?",
    source: "reddit.com/r/infrastructure",
    channel: "Reddit",
    category: "Discussion",
    sentiment: "positive",
    country: "US",
    date: "2025-12-06",
    link: "",
  },
  {
    title: "US Signal laying 1000 miles of fiber for AI — is this the infrastructure play of the decade?",
    source: "reddit.com/r/datacenter",
    channel: "Reddit",
    category: "Discussion",
    sentiment: "positive",
    country: "US",
    date: "2026-02-10",
    link: "",
  },
  {
    title: "Does anyone know Igneo's ESG approach? Their waste management acquisitions seem solid but I can't find much transparency data.",
    source: "reddit.com/r/sustainablefinance",
    channel: "Reddit",
    category: "Discussion",
    sentiment: "neutral",
    country: "UK",
    date: "2026-01-15",
    link: "",
  },
  /* ── Negative sentiment from Brandwatch export ── */
  {
    title: "Igneo-backed infrastructure fund linked to controversial German toll road expansion",
    source: "paz.de",
    channel: "Web",
    category: "Websites",
    sentiment: "negative",
    country: "DE",
    date: "2026-02-09",
    link: "",
  },
  {
    title: "Critical analysis of Igneo's role in German infrastructure privatisation",
    source: "nachdenkseiten.de",
    channel: "Web",
    category: "Websites",
    sentiment: "negative",
    country: "DE",
    date: "2026-01-28",
    link: "",
  },
  {
    title: "Kettner Edelmetalle warns against infrastructure fund concentration risks — cites Igneo",
    source: "kettner-edelmetalle.de",
    channel: "Web",
    category: "Websites",
    sentiment: "negative",
    country: "DE",
    date: "2026-01-28",
    link: "",
  },
  {
    title: "AUFGEWACHT – Igneo infrastructure investments face scrutiny in Bundestag debate",
    source: "twitter.com",
    channel: "Twitter",
    category: "Tweets",
    sentiment: "negative",
    country: "DE",
    date: "2026-01-27",
    link: "",
  },
  {
    title: "Berliner Zeitung: Foreign investors tighten grip on German infrastructure",
    source: "berliner-zeitung.de",
    channel: "Web",
    category: "News",
    sentiment: "negative",
    country: "DE",
    date: "2026-01-26",
    link: "",
  },
  {
    title: "Spiegel: Questions raised over Igneo's waste management pricing in Germany",
    source: "spiegel.de",
    channel: "Web",
    category: "News",
    sentiment: "negative",
    country: "DE",
    date: "2025-11-18",
    link: "",
  },
  {
    title: "Yahoo News: Infrastructure fund returns under pressure as interest rates weigh on valuations",
    source: "yahoo.com",
    channel: "Web",
    category: "News",
    sentiment: "negative",
    country: "DE",
    date: "2025-11-17",
    link: "",
  },
  {
    title: "Linksfraktion calls for tighter regulation of infrastructure investors like Igneo",
    source: "twitter.com",
    channel: "Twitter",
    category: "Tweets",
    sentiment: "negative",
    country: "DE",
    date: "2025-11-17",
    link: "",
  },
  {
    title: "Raiffeisen.com: Concerns over agricultural infrastructure ownership by foreign funds",
    source: "raiffeisen.com",
    channel: "Web",
    category: "News",
    sentiment: "negative",
    country: "DE",
    date: "2025-10-21",
    link: "",
  },
  {
    title: "Bettina Theek criticises Igneo's approach to community engagement in infrastructure projects",
    source: "twitter.com",
    channel: "Twitter",
    category: "Tweets",
    sentiment: "negative",
    country: "DE",
    date: "2025-10-21",
    link: "",
  },
  {
    title: "Merkur: Residents protest infrastructure project backed by Igneo fund",
    source: "merkur.de",
    channel: "Web",
    category: "News",
    sentiment: "negative",
    country: "DE",
    date: "2025-09-30",
    link: "",
  },
  {
    title: "RegFlow Hub: Regulatory gaps in oversight of international infrastructure fund managers",
    source: "twitter.com",
    channel: "Twitter",
    category: "Tweets",
    sentiment: "negative",
    country: "DE",
    date: "2025-11-09",
    link: "",
  },
  {
    title: "Wolfsschutz Deutschland criticises Igneo-backed wind farm for wildlife impact",
    source: "wolfsschutz-deutschland.de",
    channel: "Web",
    category: "Websites",
    sentiment: "negative",
    country: "DE",
    date: "2025-09-05",
    link: "",
  },
];
