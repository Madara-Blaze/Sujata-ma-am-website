import type { Tutor, SearchFilters, SearchResult } from "@/lib/types";

// Pure search / filter / sort logic shared by the seed layer and the
// Supabase layer. Operates on an in-memory Tutor[] (dataset is small; at
// real scale this would move to SQL full-text + indexed filters).

export function runSearch(all: Tutor[], filters: SearchFilters): SearchResult {
  const {
    q,
    subjects = [],
    levels = [],
    formats = [],
    maxPriceCents,
    minRating,
    featured = false,
    sort = "relevance",
    page = 1,
    pageSize = 9,
  } = filters;

  let items = [...all];

  if (q && q.trim()) {
    const needle = q.trim().toLowerCase();
    items = items
      .map((t) => ({ t, score: relevanceScore(t, needle) }))
      .filter((x) => x.score > 0)
      .sort((a, b) => b.score - a.score)
      .map((x) => x.t);
  }

  if (featured) items = items.filter((t) => t.featured);
  if (subjects.length) items = items.filter((t) => t.subjects.some((s) => subjects.includes(s)));
  if (levels.length) items = items.filter((t) => t.levels.some((l) => levels.includes(l)));
  if (formats.length) items = items.filter((t) => t.formats.some((f) => formats.includes(f)));
  if (typeof maxPriceCents === "number") items = items.filter((t) => t.hourlyRateCents <= maxPriceCents);
  if (typeof minRating === "number") items = items.filter((t) => t.rating >= minRating);

  items = sortItems(items, sort, Boolean(q && q.trim()));

  const total = items.length;
  const start = (page - 1) * pageSize;
  return { items: items.slice(start, start + pageSize), total, page, pageSize };
}

function relevanceScore(t: Tutor, needle: string): number {
  let score = 0;
  const hay = (weight: number, text: string) => {
    if (text.toLowerCase().includes(needle)) score += weight;
  };
  hay(10, t.name);
  hay(6, t.tagline);
  hay(5, t.subjects.join(" "));
  hay(4, t.bio);
  hay(3, t.city);
  hay(3, t.currentlyTeachingAt);
  if (t.featured) score += 1;
  return score;
}

function sortItems(items: Tutor[], sort: string, hasQuery: boolean): Tutor[] {
  const copy = [...items];
  switch (sort) {
    case "rating":
      return copy.sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount);
    case "price-low":
      return copy.sort((a, b) => a.hourlyRateCents - b.hourlyRateCents);
    case "price-high":
      return copy.sort((a, b) => b.hourlyRateCents - a.hourlyRateCents);
    case "experience":
      return copy.sort((a, b) => b.yearsExperience - a.yearsExperience);
    case "relevance":
    default:
      if (hasQuery) return copy;
      return copy.sort((a, b) => Number(b.featured) - Number(a.featured) || b.rating - a.rating);
  }
}

export function pickFeatured(all: Tutor[], limit = 3): Tutor[] {
  return [...all]
    .sort((a, b) => Number(b.featured) - Number(a.featured) || b.rating - a.rating)
    .slice(0, limit);
}

export interface MarketplaceStats {
  totalTutors: number;
  subjectsCovered: number;
  avgRating: number;
  totalReviews: number;
}

export function computeStats(all: Tutor[]): MarketplaceStats {
  if (!all.length) return { totalTutors: 0, subjectsCovered: 0, avgRating: 0, totalReviews: 0 };
  const subjects = new Set(all.flatMap((t) => t.subjects));
  const avgRating = Math.round((all.reduce((s, t) => s + t.rating, 0) / all.length) * 10) / 10;
  const totalReviews = all.reduce((s, t) => s + t.reviewCount, 0);
  return { totalTutors: all.length, subjectsCovered: subjects.size, avgRating, totalReviews };
}
