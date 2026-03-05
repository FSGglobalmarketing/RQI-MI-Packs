/* ── Sentiment & Social Listening Data ── */
/* Aggregated from Brandwatch export: Jan 2026 – Mar 2026 */
/* Filtered for Igneo Infrastructure Partners only */
/* NOTE: In web mentions, Followers/Rank column contains the domain ranking */

export interface SentimentMention {
  title: string;
  source: string;
  channel: "Web" | "Twitter";
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

/* ── KPI Summaries (computed from Brandwatch CSV) ── */
export const sentimentKpis = {
  totalMentions: 93,
  positiveRate: "13%",
  countriesReached: 10,
  topChannel: "Web — 97%",
};

/* ── Sentiment Breakdown (computed from Brandwatch CSV) ── */
export const sentimentBreakdown = {
  positive: 12,
  neutral: 77,
  negative: 4,
};

/* ── Monthly Timeline (computed from Brandwatch CSV date ranges) ── */
export const mentionsByMonth: {
  month: string;
  positive: number;
  neutral: number;
  negative: number;
  total: number;
}[] = [
  { month: "Jan 26", positive: 8, neutral: 50, negative: 4, total: 62 },
  { month: "Feb 26", positive: 4, neutral: 22, negative: 0, total: 26 },
  { month: "Mar 26", positive: 1, neutral: 4, negative: 0, total: 5 },
];

/* ── Channel Breakdown (computed from Brandwatch CSV) ── */
export const channelBreakdown: {
  channel: string;
  mentions: number;
  positive: number;
  neutral: number;
  negative: number;
}[] = [
  { channel: "Web", mentions: 90, positive: 11, neutral: 76, negative: 3 },
  { channel: "Twitter", mentions: 3, positive: 1, neutral: 1, negative: 1 },
];

/* ── Top Countries (computed from Brandwatch CSV) ── */
export const countryBreakdown: { country: string; mentions: number }[] = [
  { country: "Germany", mentions: 40 },
  { country: "United Kingdom", mentions: 25 },
  { country: "Italy", mentions: 12 },
  { country: "France", mentions: 4 },
  { country: "Denmark", mentions: 3 },
  { country: "Spain", mentions: 2 },
  { country: "Netherlands", mentions: 2 },
  { country: "Romania", mentions: 1 },
  { country: "Austria", mentions: 2 },
  { country: "Cyprus", mentions: 1 },
];

/* ── Notable Highlights (curated from Brandwatch CSV — editorial & news only, excluding job listings) ── */
export const recentHighlights: SentimentMention[] = [
  /* ─── Web: Positive ─── */
  { title: "Rigassificatore Olt Snam chiude l'acquisizione dell'impianto al largo di Livorno | operazione da 129 milioni", source: "zazoom.it", channel: "Web", category: "News", sentiment: "positive", country: "IT", date: "2026-03-05", link: "https://www.zazoom.it/2026-03-05/rigassificatore-olt-snam-chiude-lacquisizione-dellimpianto-al-largo-di-livorno-operazione-da-129-milioni/18774225/", domainRank: 123655 },
  { title: "Landmark Dividend Announces Successful Exit of Vault Digital Infrastructure Portfolio", source: "businesswire.com", channel: "Web", category: "News", sentiment: "positive", country: "DE", date: "2026-02-24", link: "https://www.businesswire.com/news/home/20260223213383/en/Landmark-Dividend-Announces-Successful-Exit-of-Vault-Digital-Infrastructure-Portfolio", domainRank: 14771 },
  { title: "Portugal Greenlights PPP for Central Algarve Hospital Project — CVC DIF sells highway concessions to Igneo", source: "infrapppworld.com", channel: "Web", category: "News", sentiment: "positive", country: "FR", date: "2026-02-18", link: "https://www.infrapppworld.com/update/portugal-greenlights-ppp-for-central-algarve-hospital-project", domainRank: 1716794 },
  { title: "Intervista ad Alessandro Visentin (City Green Light) — nuova fase con Igneo Infrastructure Partners", source: "energiaincitta.it", channel: "Web", category: "News", sentiment: "positive", country: "IT", date: "2026-01-29", link: "https://www.energiaincitta.it/intervista-ad-alessandro-visentin-city-green-light/", domainRank: 9807729 },
  { title: "Portugal Relaunches Tender for Key Porto-Lisbon High-Speed Rail Section — Igneo highway concessions", source: "infrapppworld.com", channel: "Web", category: "News", sentiment: "positive", country: "FR", date: "2026-01-21", link: "https://www.infrapppworld.com/update/portugal-relaunches-tender-for-key-porto-lisbon-high-speed-rail-section", domainRank: 1716794 },
  { title: "Strait Link and its Bass Strait shipping sold to Igneo", source: "shipsmonthly.com", channel: "Web", category: "News", sentiment: "positive", country: "GB", date: "2026-01-12", link: "https://shipsmonthly.com/news/strait-link-and-its-bass-strait-shipping-sold-to-igneo/", domainRank: 3678683 },
  { title: "Strait Link Sold to Igneo Infrastructure Partners", source: "ferryshippingnews.com", channel: "Web", category: "News", sentiment: "positive", country: "NL", date: "2026-01-09", link: "https://ferryshippingnews.com/strait-link-sold-to-igneo-infrastructure-partners/", domainRank: 4599106 },
  { title: "CREDIT AGRICOLE Aktie — Terra-Gen (jointly owned by Masdar and Igneo) closes Lockhart financing", source: "boersentreff.de", channel: "Web", category: "News", sentiment: "positive", country: "DE", date: "2026-01-10", link: "https://www.boersentreff.de/credit_agricole-aktie.htm", domainRank: 2248370 },
  { title: "Terra-Gen boots up 515 MWh of energy storage in Southern California — jointly owned by Igneo", source: "energyjobline.com", channel: "Web", category: "News", sentiment: "positive", country: "DE", date: "2026-01-07", link: "https://news.energyjobline.com/renewables/terra-gen-boots-up-515-mwh-of-energy-storage-in-southern-california/", domainRank: 252375 },

  /* ─── Web: Neutral ─── */
  { title: "Rigassificatore, a Snam il 100% — acquisizione partecipazione Igneo Infrastructure Partners", source: "gazzettadilivorno.it", channel: "Web", category: "Websites", sentiment: "neutral", country: "IT", date: "2026-03-05", link: "https://www.gazzettadilivorno.it/amp/livorno-rigassificatore-a-snam-il-100.htm", domainRank: 5535163 },
  { title: "Snam sale al 100% del rigassificatore di Livorno per 129 milioni — partecipazione Igneo", source: "ansa.it", channel: "Web", category: "News", sentiment: "neutral", country: "IT", date: "2026-03-05", link: "https://www.ansa.it/sito/notizie/economia/2026/03/05/snam-sale-al-100-del-rigassificatore-di-livorno-per-129-milioni_a2cb10e0-9935-436b-85ef-1a2aa7a3f2f4.html", domainRank: 551 },
  { title: "Debito globale a livelli record: 109 mila miliardi — Igneo e Snam", source: "juorno.it", channel: "Web", category: "News", sentiment: "neutral", country: "IT", date: "2026-03-05", link: "https://www.juorno.it/debito-globale-a-livelli-record-109-mila-miliardi-locse-avverte-italia-e-governi/", domainRank: 615549 },
  { title: "Snam: Rab 2026 attesa a 28,8 mld — acquisizione partecipazione Igneo in OLT", source: "ilsole24ore.com", channel: "Web", category: "News", sentiment: "neutral", country: "IT", date: "2026-03-05", link: "https://en.ilsole24ore.com/radiocor/nRC_05.03.2026_08.12_11910119", domainRank: 1839 },
  { title: "Letztmalig kostenlosen Glasfaseranschluss sichern — Westconnect/Igneo JV", source: "presseportal.de", channel: "Web", category: "News", sentiment: "neutral", country: "DE", date: "2026-02-26", link: "https://www.presseportal.de/pm/169636/6224814", domainRank: 11109 },
  { title: "Glasfaser in Moers — Westconnect (E.ON/Igneo JV) baut aus", source: "presseportal.de", channel: "Web", category: "News", sentiment: "neutral", country: "DE", date: "2026-02-26", link: "https://www.presseportal.de/pm/169636/6224417", domainRank: 11109 },
  { title: "Green Economy — Igneo infrastructure partners e rigassificatore FSRU Toscana", source: "greenreport.it", channel: "Web", category: "Websites", sentiment: "neutral", country: "IT", date: "2026-02-21", link: "https://www.greenreport.it/news/green-economy?start=1568", domainRank: 532279 },
  { title: "Kostenloser Glasfaseranschluss: Der Ausbau des Glasfasernetzes in Birresborn — Westconnect/Igneo", source: "presseportal.de", channel: "Web", category: "News", sentiment: "neutral", country: "DE", date: "2026-02-20", link: "https://www.presseportal.de/pm/169636/6220975", domainRank: 11109 },
  { title: "Westconnect schließt erste Kundinnen und Kunden in Windeck an — E.ON/Igneo JV", source: "presseportal.de", channel: "Web", category: "News", sentiment: "neutral", country: "DE", date: "2026-02-20", link: "https://www.presseportal.de/pm/169636/6220536", domainRank: 11109 },
  { title: "Westconnect Fibre Optic Tool for Vodafone — E.ON/Igneo Infrastructure Partners JV", source: "teltarif.de", channel: "Web", category: "News", sentiment: "neutral", country: "DE", date: "2026-02-18", link: "https://www.teltarif.de/en/vodafone-westconnect-glasfaserausbau/news/102042.html", domainRank: 21673 },
  { title: "Scandlines udliciterer sine enorme toldfri butikker — owned by Igneo, 3i, Federated Hermes", source: "standby.dk", channel: "Web", category: "Websites", sentiment: "neutral", country: "DK", date: "2026-01-27", link: "https://standby.dk/scandlines-udliciterer-sine-enorme-toldfri-butikker/", domainRank: 133163 },
  { title: "Acker in branchenfremde Hände? Investoren kaufen sich ein, Thüringen verzichtet", source: "thueringer-allgemeine.de", channel: "Web", category: "News", sentiment: "neutral", country: "DE", date: "2026-01-25", link: "https://www.thueringer-allgemeine.de/wirtschaft/article411027119/acker-in-branchenfremde-haende-investoren-kaufen-sich-ein-thueringen-verzichtet-auf-regelungen.html", domainRank: 29451 },
  { title: "Kulturland Genossenschaft: Land gewinnen — Igneo Infrastructure Partners / Mitsubishi", source: "brandeins.de", channel: "Web", category: "News", sentiment: "neutral", country: "DE", date: "2026-01-25", link: "https://www.brandeins.de/magazine/brand-eins-wirtschaftsmagazin/2025/geschenke/kulturland-genossenschaft-land-gewinnen", domainRank: 97267 },
  { title: "Landwirtschaft — Wem gehört der Acker? Drei Länder, drei Antworten", source: "sueddeutsche.de", channel: "Web", category: "News", sentiment: "neutral", country: "DE", date: "2026-01-23", link: "https://www.sueddeutsche.de/wirtschaft/landwirtschaft-wem-gehoert-der-acker-drei-laender-drei-antworten-dpa.urn-newsml-dpa-com-20090101-260123-930-584651", domainRank: 3129 },
  { title: "Who owns the land? Three countries, three answers — sale of DAH to Igneo", source: "diesachsen.de", channel: "Web", category: "News", sentiment: "neutral", country: "DE", date: "2026-01-23", link: "https://www.diesachsen.de/en/economy/who-owns-the-land-three-countries-three-answers-3096421", domainRank: 386888 },
  { title: "Telephone and Data Systems Inc — Igneo Infrastructure Partners data center operations", source: "metatrader.com", channel: "Web", category: "Websites", sentiment: "neutral", country: "CY", date: "2026-01-20", link: "https://www.metatrader.com/zh/symbols/nyse/tds-pu/dividends", domainRank: 660480 },
  { title: "Londra: Capital, infrastructură și securitate energetică — Igneo Infrastructure Partners", source: "energynomics.ro", channel: "Web", category: "Websites", sentiment: "neutral", country: "RO", date: "2026-01-12", link: "https://www.energynomics.ro/eveniment-energynomics/londra-capital-infrastructura-si-securitate-energetica/", domainRank: 1201964 },
  { title: "Sakarya, nuovo contratto offshore — Snam rileva quota Igneo in OLT Offshore LNG Toscana", source: "industrychemistry.com", channel: "Web", category: "News", sentiment: "neutral", country: "IT", date: "2026-01-09", link: "https://www.industrychemistry.com/saipem-nuovo-contratto-offshore-per-lo-sviluppo-del-campo-di-gas-di-sakarya-per-un-valore-di-circa-425-milioni-di-dollari/", domainRank: 1434427 },
  { title: "Small scale e domanda di Gnl da Livorno — Snam accordo con Igneo Infrastructure Partners", source: "canaleenergia.com", channel: "Web", category: "Websites", sentiment: "neutral", country: "IT", date: "2026-01-07", link: "https://www.canaleenergia.com/rubriche/transizione-ecologica/small-scale-domanda-gnl-livorno-terminale-in-crescita/", domainRank: 2015960 },
  { title: "Terra-Gen Announces Commercial Operations of Lockhart CL I & II Battery Energy Storage System", source: "01net.it", channel: "Web", category: "News", sentiment: "neutral", country: "IT", date: "2026-01-07", link: "https://www.01net.it/terra-gen-announces-commercial-operations-of-lockhart-cl-i-ii-battery-energy-storage-system-project/", domainRank: 517665 },

  /* ─── Web: Negative ─── */
  { title: "Hinweise des Tages — Übernahme der DAH durch Igneo sorgt weiterhin für Kritik", source: "nachdenkseiten.de", channel: "Web", category: "Websites", sentiment: "negative", country: "DE", date: "2026-01-28", link: "https://www.nachdenkseiten.de/?p=145435", domainRank: 26978 },
  { title: "Ausverkauf der Heimat: Australischer Investor kontrolliert 20.000 Hektar deutsches Ackerland", source: "kettner-edelmetalle.de", channel: "Web", category: "Websites", sentiment: "negative", country: "DE", date: "2026-01-28", link: "https://www.kettner-edelmetalle.de/news/ausverkauf-der-heimat-australischer-investor-kontrolliert-20000-hektar-deutsches-ackerland-28-01-2026", domainRank: 69657 },
  { title: "Ausland kauft Ostdeutschlands Agrarflächen auf: Jetzt gibt es Kritik aus Brüssel", source: "berliner-zeitung.de", channel: "Web", category: "News", sentiment: "negative", country: "DE", date: "2026-01-26", link: "https://www.berliner-zeitung.de/wirtschaft-verantwortung/ausland-kauft-ostdeutschlands-agrarflaechen-auf-jetzt-gibt-es-kritik-aus-bruessel-li.10015962", domainRank: 7780 },

  /* ─── Twitter ─── */
  {
    title: "KKR, APG e Igneo Infrastructure Partners contratan asesores para analizar la compra de INDAQUA",
    source: "twitter.com",
    channel: "Twitter",
    category: "Tweets",
    sentiment: "neutral",
    country: "ES",
    date: "2026-01-29",
    link: "https://x.com/pepepebravo/status/2016767434326163616",
    author: "Pepe Bravo",
    followers: 2005,
    engagement: 83,
  },
  {
    title: "Ausverkauf Ost: Australischer Investor kauft riesige Flächen im Osten der Bundesrepublik",
    source: "twitter.com",
    channel: "Twitter",
    category: "Tweets",
    sentiment: "negative",
    country: "DE",
    date: "2026-01-27",
    link: "https://x.com/AufgewachtS/status/2016046122943304151",
    author: "AUFGEWACHT - DIE DEUTSCHE STIMME",
    followers: 688,
    engagement: 81,
  },
  {
    title: "Strait Link solgt til Igneo Infrastructure Partners",
    source: "twitter.com",
    channel: "Twitter",
    category: "Tweets",
    sentiment: "positive",
    country: "DK",
    date: "2026-01-10",
    link: "https://x.com/Faergenyt/status/2009939367939162521",
    author: "Færgenyt",
    followers: 38,
    engagement: 3,
  },
];
