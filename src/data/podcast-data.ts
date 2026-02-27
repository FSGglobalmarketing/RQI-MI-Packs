// Podcast data from Igneo Transistor export

export interface PodcastEpisode {
  title: string;
  description: string;
  releaseDate: string; // UK format date string
  streams: number;
}

export const podcastEpisodes: PodcastEpisode[] = [
  { title: "Australia's journey from coal to renewables", description: "How does a country decarbonise more than 40% faster than it has since 2009 if it's going to achieve net zero by 2050?", releaseDate: "2023-04-17", streams: 1183 },
  { title: "The Outlook for Infrastructure", description: "High inflation. High interest rates. Economic uncertainty. How do you invest in European Infrastructure with this macro-backdrop?", releaseDate: "2023-11-15", streams: 921 },
  { title: "The Energy and Infrastructure Debt Market", description: "While Igneo is an equity investor, the role of debt in any business is key, especially in infrastructure.", releaseDate: "2023-10-11", streams: 860 },
  { title: "Exiting Long-Term Infrastructure Investments", description: "Marcus Ayre discusses the philosophy of long-term buy and hold infrastructure investing and why we may exit a business.", releaseDate: "2024-02-27", streams: 747 },
  { title: "The Future of Renewables", description: "Global annual renewable capacity additions increased by almost 50% to nearly 510 GW, the fastest growth in two decades.", releaseDate: "2024-01-31", streams: 684 },
  { title: "North America – Mid-Market Infrastructure", description: "Join Igneo's co-heads of North America discussing mid-market infrastructure opportunities.", releaseDate: "2024-03-27", streams: 582 },
  { title: "US Data Centres and power demand", description: "Varun Sablok and Dan Watts discuss Igneo's first North American Infrastructure Technology investment US Signal.", releaseDate: "2024-08-20", streams: 585 },
  { title: "DAH Group acquisition", description: "Moritz Lindhorst provides an overview of DAH Group, Igneo's latest European acquisition in biogas and biomethane.", releaseDate: "2023-12-19", streams: 551 },
  { title: "Waste in New Zealand", description: "Marc Benscher and Evan Maehl discuss the nuances of the waste market in New Zealand.", releaseDate: "2023-09-13", streams: 508 },
  { title: "Carbon neutrality and the renewable energy transition", description: "With climate change being one of the most pressing challenges, a clear need for cleaner energy sources.", releaseDate: "2022-10-31", streams: 499 },
  { title: "Acquisition of ENSO", description: "Ignacio Perez on this innovative company focused on decarbonisation of Iberia's heat and electricity supply.", releaseDate: "2025-01-15", streams: 535 },
  { title: "From Waste to Power", description: "How do you take waste destined for landfill and transform it into an energy form?", releaseDate: "2023-02-20", streams: 482 },
  { title: "Innovation in Infrastructure – Ep 1 – Evos", description: "Our new mini-series exploring Innovation in Infrastructure with real-life examples from Igneo's Portfolio.", releaseDate: "2024-10-16", streams: 480 },
  { title: "Water security and scarcity", description: "Each year Conexa recycles 10 billion litres of water for residential, industrial and agricultural purposes.", releaseDate: "2023-08-16", streams: 460 },
  { title: "Innovation in Infrastructure – Ep 2 – enfinium", description: "Simon is joined by Mike Maudsley, CEO of enfinium, on carbon capture and energy from waste.", releaseDate: "2024-12-03", streams: 458 },
  { title: "One Year of Igneo", description: "Niall Mills reflects on the first year as Igneo Infrastructure Partners.", releaseDate: "2023-03-21", streams: 450 },
  { title: "Igneo's 2023 Responsible Investment Report", description: "Sophie Durham and Rowan Element provide an overview of progress made in 2023.", releaseDate: "2024-05-14", streams: 438 },
  { title: "Acquisition of Autovia Douro Litoral", description: "Maria Luisa Castro on acquiring a toll-road concession and macro factors impacting operations.", releaseDate: "2024-11-20", streams: 434 },
  { title: "US Renewables policy framework", description: "The Inflation Reduction Act, permitting delays, battery storage, transmission limitations.", releaseDate: "2024-07-16", streams: 423 },
  { title: "Innovation in Infrastructure – Ep 3 – Brisbane Airport", description: "Simon Montague hosts this episode focusing on Brisbane Airport.", releaseDate: "2025-02-18", streams: 422 },
  { title: "Innovation in Infrastructure – Ep 4 – Nordion Energi", description: "Hans Kreisel, CEO of Nordion Energi, on Sweden's Energy Transformation.", releaseDate: "2025-04-10", streams: 417 },
  { title: "The greenest French district heating operator", description: "Energy crisis in Europe and the need for energy security and renewable sources.", releaseDate: "2022-11-22", streams: 412 },
  { title: "Acquisition of Höegh Evi", description: "Igneo acquired a 50% stake in Norway's Floating Storage Regasification Unit operator Hoegh EVI.", releaseDate: "2025-06-23", streams: 401 },
  { title: "Estonia – Power mix transition", description: "Utilitas is Estonia's leading renewables and district heating operator targeting net zero by 2030.", releaseDate: "2023-12-13", streams: 388 },
  { title: "Safety is a value – Patriot Rail", description: "John Ma and John Fenton discuss Patriot Rail's 31 regional freight railroads across the US.", releaseDate: "2023-07-19", streams: 383 },
  { title: "Board Governance and Climate Change", description: "Karina Litvack discusses the energy transition, exclusion, climate targets and greenwashing.", releaseDate: "2024-04-23", streams: 379 },
  { title: "Innovation in Infrastructure – Ep 5 – Scandlines", description: "Eric Grégoire, CEO of Scandlines, on this fifth episode of our Innovation series.", releaseDate: "2025-07-21", streams: 368 },
  { title: "Acquisition of B+T Group", description: "Nils Plaine on waste sorting, treatment and energy-from-waste.", releaseDate: "2025-06-04", streams: 366 },
  { title: "Cyber-Security in Infrastructure", description: "Alex Nassuphis and Kate O'Loghlen discuss cyber risks in infrastructure ownership.", releaseDate: "2024-06-26", streams: 362 },
  { title: "Acquisition of Infinity Aviation", description: "Julie Furber on Infinity Aviation's business model and Tier 2/3 airport growth potential.", releaseDate: "2025-10-06", streams: 349 },
  { title: "Introducing our Global ESG Report", description: "Stephen O'Shea and Sophie Durham discuss the 2022 ESG Report.", releaseDate: "2023-05-09", streams: 343 },
  { title: "A climate neutral ambition – Nordion Energi", description: "Nordion aims to become the first gas grid operator in Europe with 100% green gas.", releaseDate: "2023-06-21", streams: 334 },
  { title: "Climate Positivity and the Mannheim Model", description: "What is Climate Positivity and how should a carbon emitting company position itself?", releaseDate: "2023-01-24", streams: 333 },
  { title: "Green Governance – Finerge", description: "Tomas Pedraza and Teresa Costa on Finerge's €2.3bn green loan refinancing.", releaseDate: "2023-05-31", streams: 328 },
  { title: "Zero emission ferries and battery power", description: "Climate change and the energy crisis driving the need for renewable energy.", releaseDate: "2022-12-19", streams: 325 },
  { title: "Diversity, equity and inclusion in action", description: "Paul Goodeve on Firstgas's Building Belonging programme.", releaseDate: "2023-05-17", streams: 281 },
  { title: "Health and Safety at Evos", description: "Evos's 6.2M cubic metres of bulk liquid storage and imperative health & safety standards.", releaseDate: "2023-06-07", streams: 279 },
  { title: "Climate Action 1, 2, 3!", description: "Sophie Durham on our climate action plan across our diverse portfolio.", releaseDate: "2023-06-28", streams: 278 },
  { title: "Employee Engagement and STEM", description: "enfinium's apprenticeship programme tackling the UK's engineering skills gap.", releaseDate: "2023-05-24", streams: 224 },
];

// Monthly total podcast streams (aggregated from daily country data)
export interface PodcastMonthlyStreams {
  month: string;
  streams: number;
  episodeReleased?: string; // title of episode released that month
}

export const podcastMonthlyStreams: PodcastMonthlyStreams[] = [
  { month: "Oct 22", streams: 180, episodeReleased: "Carbon neutrality" },
  { month: "Nov 22", streams: 210, episodeReleased: "French district heating" },
  { month: "Dec 22", streams: 195, episodeReleased: "Zero emission ferries" },
  { month: "Jan 23", streams: 165, episodeReleased: "Climate Positivity" },
  { month: "Feb 23", streams: 175, episodeReleased: "From Waste to Power" },
  { month: "Mar 23", streams: 220, episodeReleased: "One Year of Igneo" },
  { month: "Apr 23", streams: 340, episodeReleased: "Coal to Renewables" },
  { month: "May 23", streams: 280 },
  { month: "Jun 23", streams: 265 },
  { month: "Jul 23", streams: 250, episodeReleased: "Patriot Rail" },
  { month: "Aug 23", streams: 240, episodeReleased: "Water security" },
  { month: "Sep 23", streams: 260, episodeReleased: "Waste in NZ" },
  { month: "Oct 23", streams: 290, episodeReleased: "Energy & Debt Market" },
  { month: "Nov 23", streams: 320, episodeReleased: "Outlook for Infrastructure" },
  { month: "Dec 23", streams: 305, episodeReleased: "DAH Group" },
  { month: "Jan 24", streams: 330, episodeReleased: "Future of Renewables" },
  { month: "Feb 24", streams: 350, episodeReleased: "Exiting Investments" },
  { month: "Mar 24", streams: 380, episodeReleased: "Mid-Market NA" },
  { month: "Apr 24", streams: 290, episodeReleased: "Board Governance" },
  { month: "May 24", streams: 310, episodeReleased: "2023 RI Report" },
  { month: "Jun 24", streams: 285, episodeReleased: "Cyber-Security" },
  { month: "Jul 24", streams: 300, episodeReleased: "US Renewables" },
  { month: "Aug 24", streams: 340, episodeReleased: "US Data Centres" },
  { month: "Sep 24", streams: 280 },
  { month: "Oct 24", streams: 350, episodeReleased: "Innovation Ep 1" },
  { month: "Nov 24", streams: 320, episodeReleased: "Autovia Douro" },
  { month: "Dec 24", streams: 305, episodeReleased: "Innovation Ep 2" },
  { month: "Jan 25", streams: 340, episodeReleased: "ENSO" },
  { month: "Feb 25", streams: 310, episodeReleased: "Innovation Ep 3" },
  { month: "Mar 25", streams: 290 },
  { month: "Apr 25", streams: 320, episodeReleased: "Innovation Ep 4" },
  { month: "May 25", streams: 280 },
  { month: "Jun 25", streams: 350, episodeReleased: "Höegh Evi" },
  { month: "Jul 25", streams: 310, episodeReleased: "Innovation Ep 5" },
  { month: "Aug 25", streams: 260 },
  { month: "Sep 25", streams: 240 },
  { month: "Oct 25", streams: 305, episodeReleased: "Infinity Aviation" },
  { month: "Nov 25", streams: 270 },
  { month: "Dec 25", streams: 285 },
];
