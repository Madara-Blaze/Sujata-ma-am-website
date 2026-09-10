import { TUTORS } from "@/data/tutors";
import type { Tutor, SearchFilters, SearchResult } from "@/lib/types";
import { runSearch, pickFeatured, computeStats, type MarketplaceStats } from "@/lib/search-core";
import { isSupabaseEnabled } from "@/lib/supabase/server";
import { fetchAllTutors, fetchTutorBySlug } from "@/lib/supabase/data";

export type { MarketplaceStats };

// Single switch point: Supabase-backed when DATA_SOURCE=supabase and env is
// set, otherwise the bundled seed data. Both feed the same pure search core,
// so behavior (filters, sort, relevance) is identical across modes.
async function loadAll(): Promise<Tutor[]> {
  if (isSupabaseEnabled()) {
    try {
      return await fetchAllTutors();
    } catch (err) {
      console.error("[repository] Supabase read failed, falling back to seed:", err);
      return TUTORS;
    }
  }
  return TUTORS;
}

export async function searchTutors(filters: SearchFilters): Promise<SearchResult> {
  return runSearch(await loadAll(), filters);
}

export async function getTutorBySlug(slug: string): Promise<Tutor | null> {
  if (isSupabaseEnabled()) {
    try {
      return await fetchTutorBySlug(slug);
    } catch (err) {
      console.error("[repository] Supabase read failed, falling back to seed:", err);
    }
  }
  return TUTORS.find((t) => t.slug === slug) ?? null;
}

export async function getFeaturedTutors(limit = 3): Promise<Tutor[]> {
  return pickFeatured(await loadAll(), limit);
}

export async function getAllTutors(): Promise<Tutor[]> {
  return loadAll();
}

export async function getMarketplaceStats(): Promise<MarketplaceStats> {
  return computeStats(await loadAll());
}
