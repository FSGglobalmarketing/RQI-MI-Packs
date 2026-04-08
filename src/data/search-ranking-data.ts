/**
 * Organic search keyword ranking data by region.
 * Source: BrightEdge non-branded keyword positions (pages 1-3).
 * Domain www.firstsentierinvestors.com = RQI Investors.
 */

const MONTHS = [
  "Mar 25", "Apr 25", "May 25", "Jun 25", "Jul 25", "Aug 25",
  "Sep 25", "Oct 25", "Nov 25", "Dec 25", "Jan 26", "Feb 26", "Mar 26",
];

export type SearchRegion = "global" | "uk" | "aus" | "sg" | "de";

export interface SearchRegionMeta {
  label: string;
  flag: string;
}

export const REGION_META: Record<SearchRegion, SearchRegionMeta> = {
  global: { label: "Global", flag: "" },
  uk: { label: "United Kingdom", flag: "" },
  aus: { label: "Australia", flag: "" },
  sg: { label: "Singapore", flag: "" },
  de: { label: "Germany", flag: "" },
};

/* Raw data per region — keys are clean brand names */
const SG_RAW: Record<string, number[]> = {
  AQR: [38, 36, 35, 34, 34, 35, 37, 37, 37, 37, 37, 38, 38],
  RQI: [33, 34, 34, 33, 33, 35, 36, 33, 32, 30, 30, 30, 28],
  Osmosis: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  Acadian: [2, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0],
  Arrowstreet: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  PIMCO: [29, 29, 36, 37, 31, 34, 32, 29, 28, 24, 26, 31, 33],
  Robeco: [100, 101, 100, 101, 103, 108, 112, 114, 110, 105, 103, 101, 102],
  Macquarie: [48, 49, 49, 48, 47, 49, 49, 51, 52, 51, 50, 60, 60],
  Platinum: [6, 6, 6, 6, 6, 6, 6, 6, 7, 7, 6, 6, 7],
  Plato: [0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  Fidelity: [85, 88, 90, 92, 89, 91, 94, 96, 93, 90, 88, 87, 89],
};

const UK_RAW: Record<string, number[]> = {
  AQR: [109, 113, 117, 121, 125, 132, 135, 134, 136, 146, 143, 143, 136],
  RQI: [45, 55, 49, 51, 45, 47, 50, 46, 43, 38, 38, 38, 39],
  Acadian: [18, 17, 16, 21, 21, 32, 36, 35, 35, 33, 32, 31, 29],
  Osmosis: [12, 14, 14, 13, 13, 17, 18, 17, 18, 19, 19, 18, 18],
  Arrowstreet: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  Robeco: [442, 461, 490, 514, 543, 554, 581, 591, 545, 517, 543, 566, 586],
  Macquarie: [137, 145, 160, 153, 143, 142, 143, 145, 150, 148, 142, 141, 126],
  PIMCO: [107, 107, 98, 96, 85, 91, 86, 90, 90, 88, 96, 103, 117],
  Platinum: [3, 3, 5, 7, 5, 4, 3, 3, 5, 6, 6, 6, 4],
  Plato: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  Fidelity: [312, 320, 335, 342, 350, 358, 365, 370, 362, 355, 348, 352, 360],
};

const AUS_RAW: Record<string, number[]> = {
  AQR: [28, 29, 30, 34, 33, 34, 34, 34, 34, 34, 30, 31, 34],
  Acadian: [60, 59, 68, 82, 93, 115, 129, 130, 137, 145, 145, 148, 156],
  RQI: [13, 18, 14, 12, 14, 13, 13, 13, 11, 9, 10, 11, 10],
  Arrowstreet: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  Osmosis: [1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  Macquarie: [194, 209, 214, 219, 228, 246, 256, 257, 244, 248, 253, 258, 267],
  Robeco: [76, 80, 85, 82, 88, 99, 107, 106, 97, 93, 99, 102, 109],
  Platinum: [17, 18, 17, 17, 24, 17, 20, 22, 23, 28, 28, 27, 27],
  PIMCO: [20, 25, 23, 25, 28, 21, 21, 20, 19, 19, 20, 18, 29],
  Plato: [34, 32, 30, 30, 29, 28, 29, 27, 28, 28, 28, 27, 26],
  Fidelity: [145, 150, 155, 160, 158, 162, 168, 172, 170, 165, 163, 160, 165],
};

const DE_RAW: Record<string, number[]> = {
  AQR: [4, 9, 9, 4, 8, 8, 8, 8, 8, 8, 8, 8, 8],
  RQI: [1, 2, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  Acadian: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  Arrowstreet: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  Osmosis: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  Robeco: [409, 431, 427, 466, 490, 524, 560, 541, 406, 350, 431, 485, 557],
  PIMCO: [236, 193, 195, 212, 218, 205, 211, 205, 190, 205, 231, 230, 251],
  Macquarie: [55, 67, 63, 61, 58, 62, 63, 60, 73, 77, 77, 76, 72],
  Platinum: [5, 6, 6, 6, 4, 6, 7, 7, 5, 6, 6, 4, 4],
  Plato: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  Fidelity: [180, 185, 190, 195, 200, 205, 210, 215, 208, 202, 198, 195, 200],
};

function rawToChart(raw: Record<string, number[]>): Record<string, string | number>[] {
  return MONTHS.map((month, i) => {
    const point: Record<string, string | number> = { month };
    for (const [name, values] of Object.entries(raw)) {
      point[name] = values[i];
    }
    return point;
  });
}

/** Compute global by summing all regions for each competitor at each month */
function buildGlobal(): Record<string, number[]> {
  const allRegions = [SG_RAW, UK_RAW, AUS_RAW, DE_RAW];
  const allKeys = new Set<string>();
  allRegions.forEach((r) => Object.keys(r).forEach((k) => allKeys.add(k)));

  const global: Record<string, number[]> = {};
  for (const key of allKeys) {
    global[key] = MONTHS.map((_, i) =>
      allRegions.reduce((sum, region) => sum + (region[key]?.[i] ?? 0), 0)
    );
  }
  return global;
}

const GLOBAL_RAW = buildGlobal();

export const SEARCH_DATA: Record<SearchRegion, Record<string, string | number>[]> = {
  global: rawToChart(GLOBAL_RAW),
  uk: rawToChart(UK_RAW),
  aus: rawToChart(AUS_RAW),
  sg: rawToChart(SG_RAW),
  de: rawToChart(DE_RAW),
};

/** All competitor keys that appear across any region */
export const ALL_COMPETITORS = Array.from(
  new Set(
    Object.values({ ...SG_RAW, ...UK_RAW, ...AUS_RAW, ...DE_RAW })
      .length
      ? Object.keys({ ...SG_RAW, ...UK_RAW, ...AUS_RAW, ...DE_RAW })
      : []
  )
);

/** Get competitor keys that have data (non-zero) in a given region */
export function getActiveCompetitors(region: SearchRegion): string[] {
  const data = SEARCH_DATA[region];
  const keys = Object.keys(data[0] || {}).filter((k) => k !== "month");
  return keys.filter((key) =>
    data.some((row) => (row[key] as number) > 0)
  );
}
