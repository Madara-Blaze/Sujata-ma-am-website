import { NextRequest, NextResponse } from "next/server";
import { searchTutors } from "@/lib/repository";
import type { Format, Level, Subject, SearchFilters } from "@/lib/types";

// Thin read-only endpoint over the repository — useful for the mobile app or
// third-party integrations later. Not called by the current pages, which
// use the repository directly from Server Components.
export async function GET(req: NextRequest) {
  const params = req.nextUrl.searchParams;
  const filters: SearchFilters = {
    q: params.get("q") ?? undefined,
    subjects: params.getAll("subject") as Subject[],
    levels: params.getAll("level") as Level[],
    formats: params.getAll("format") as Format[],
    sort: (params.get("sort") as SearchFilters["sort"]) ?? "relevance",
  };
  const result = await searchTutors(filters);
  return NextResponse.json(result);
}
