/**
 * Organic search keyword ranking data by region.
 * Source: BrightEdge ranked-keyword counts (Mar 25 → Mar 26).
 *   AU: firstsentierinvestors.com.au
 *   DE / SG / UK: firstsentierinvestors.com
 * All four markets refreshed Q1 2026 on the same methodology.
 * Fidelity dropped from peer set (not in new BrightEdge tracking).
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
  RQI:         [ 8,  8,  9,  9, 10, 10, 10,  9,  9,  9, 10,  8,  8],
  Robeco:      [60, 61, 61, 61, 62, 63, 62, 62, 61, 61, 59, 60, 59],
  PIMCO:       [ 7, 10, 11,  9,  9,  9,  9, 10,  7,  8, 13, 12, 13],
  Macquarie:   [ 7,  7,  7,  7,  7,  6,  8,  9,  8,  8, 11, 11, 11],
  AQR:         [10,  9,  8,  8,  8,  8,  7,  7,  7,  7,  7,  7,  7],
  Acadian:     [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
  Osmosis:     [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
  Platinum:    [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
  Plato:       [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
  Arrowstreet: [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
};

const UK_RAW: Record<string, number[]> = {
  RQI:         [ 11,   9,   8,   8,   9,   9,   9,  10,   8,   8,   8,   8,   7],
  Robeco:      [274, 280, 289, 295, 293, 298, 305, 282, 278, 287, 289, 297, 288],
  PIMCO:       [ 46,  44,  42,  42,  42,  42,  44,  44,  39,  41,  45,  50,  47],
  AQR:         [ 39,  38,  42,  43,  45,  45,  46,  45,  46,  44,  44,  42,  43],
  Macquarie:   [ 39,  42,  48,  43,  46,  47,  48,  54,  55,  52,  52,  46,  40],
  Acadian:     [  8,   9,  10,   9,  11,  12,  12,  12,  12,  12,  12,  14,  15],
  Osmosis:     [  1,   1,   1,   1,   3,   3,   3,   4,   4,   4,   4,   4,   3],
  Platinum:    [  0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0],
  Plato:       [  0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0],
  Arrowstreet: [  0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0],
};

// Australia — refreshed Q1 2026 from BrightEdge AU export
// (Raw Data/Search/Aus Ranking Keywords.xlsx). Tracks
// firstsentierinvestors.com.au (the AU-specific domain) — peer set and
// methodology are different from the legacy CSV: RQI now leads the
// AU peer set on ranked-keyword count.
const AUS_RAW: Record<string, number[]> = {
  RQI:         [44, 41, 40, 53, 59, 67, 66, 65, 64, 67, 67, 69, 66],
  Robeco:      [41, 42, 43, 43, 46, 52, 52, 48, 46, 49, 50, 55, 60],
  Macquarie:   [53, 59, 60, 63, 67, 71, 70, 64, 62, 63, 61, 57, 59],
  PIMCO:       [15, 13, 15, 17, 13, 13, 12, 12, 11, 11,  9, 19, 19],
  Acadian:     [ 3,  3,  5,  8, 10, 12, 13, 14, 12, 13, 14, 14, 14],
  Plato:       [17, 15, 16, 16, 13, 14, 11, 11, 11, 11, 11, 11, 10],
  Platinum:    [ 7,  4,  5, 10,  6,  7,  7,  7,  8,  8,  9,  9,  9],
  AQR:         [ 5,  5,  6,  6,  6,  6,  7,  7,  7,  5,  5,  7,  8],
  Arrowstreet: [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
};

const DE_RAW: Record<string, number[]> = {
  RQI:         [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
  Robeco:      [21, 22, 20, 18, 21, 22, 22, 19, 18, 19, 22, 23, 21],
  PIMCO:       [ 8,  6,  8,  7,  5,  5,  6,  5,  5,  5,  6,  7,  8],
  AQR:         [ 5,  4,  4,  6,  8,  7,  8,  8,  5,  4,  4,  4,  4],
  Macquarie:   [ 2,  2,  2,  1,  1,  1,  1,  1,  2,  2,  2,  2,  0],
  Acadian:     [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
  Osmosis:     [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
  Platinum:    [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
  Plato:       [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
  Arrowstreet: [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
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
