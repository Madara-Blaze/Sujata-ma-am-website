import type { Metadata } from "next";
import { FilterSidebar } from "@/components/tutors/FilterSidebar";
import { TutorsResults } from "@/components/tutors/TutorsResults";
import { searchTutors } from "@/lib/repository";
import type { Format, Level, Subject, SearchFilters } from "@/lib/types";

export const metadata: Metadata = { title: "Find a tutor" };

export default async function TutorsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const asList = (v: string | string[] | undefined) => (Array.isArray(v) ? v : v ? [v] : []);

  const result = await searchTutors({
    q: typeof params.q === "string" ? params.q : undefined,
    subjects: asList(params.subject) as Subject[],
    levels: asList(params.level) as Level[],
    formats: asList(params.format) as Format[],
    sort: (typeof params.sort === "string" ? params.sort : "relevance") as SearchFilters["sort"],
    pageSize: 24,
  });

  return (
    <div className="container-max py-12 md:py-16">
      <p className="hand">the directory</p>
      <h1 className="mt-sm font-sans text-headline-lg font-bold text-ink">Find your teacher</h1>
      <p className="mt-1 max-w-xl text-body-md text-on-surface-variant">
        Filter by subject, level, format and price. Every listing is a working teacher moonlighting in
        what they already teach.
      </p>

      <div className="mt-xl grid gap-8 lg:grid-cols-[280px_1fr]">
        <FilterSidebar />
        <TutorsResults result={result} />
      </div>
    </div>
  );
}
