"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { SUBJECTS, LEVELS, FORMATS } from "@/data/taxonomy";
import { cn } from "@/lib/utils";

function toggleInList(list: string[], value: string) {
  return list.includes(value) ? list.filter((v) => v !== value) : [...list, value];
}

export function FilterSidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const activeSubjects = searchParams.getAll("subject");
  const activeLevels = searchParams.getAll("level");
  const activeFormats = searchParams.getAll("format");
  const sort = searchParams.get("sort") ?? "relevance";

  function updateParam(key: string, values: string[]) {
    const params = new URLSearchParams(searchParams.toString());
    params.delete(key);
    values.forEach((v) => params.append(key, v));
    params.delete("page");
    router.push(`${pathname}?${params.toString()}`);
  }

  function updateSort(value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "relevance") params.delete("sort");
    else params.set("sort", value);
    router.push(`${pathname}?${params.toString()}`);
  }

  function clearAll() {
    router.push(pathname);
  }

  const hasFilters = activeSubjects.length || activeLevels.length || activeFormats.length;

  return (
    <aside className="index-card index-card--ruled space-y-lg p-lg pl-8">
      <div className="flex items-center justify-between">
        <p className="hand text-lg">filters</p>
        {hasFilters ? (
          <button onClick={clearAll} className="text-body-sm font-semibold text-primary hover:underline">
            Clear all
          </button>
        ) : null}
      </div>

      <div>
        <p className="font-mono text-label-md font-bold uppercase tracking-widest text-on-surface-variant">
          Subject
        </p>
        <div className="mt-sm flex flex-col gap-2">
          {SUBJECTS.map((s) => (
            <label key={s.id} className="flex items-center gap-2 text-body-sm text-on-surface">
              <input
                type="checkbox"
                className="h-4 w-4 accent-primary"
                checked={activeSubjects.includes(s.id)}
                onChange={() => updateParam("subject", toggleInList(activeSubjects, s.id))}
              />
              {s.label}
            </label>
          ))}
        </div>
      </div>

      <div>
        <p className="font-mono text-label-md font-bold uppercase tracking-widest text-on-surface-variant">
          Level
        </p>
        <div className="mt-sm flex flex-wrap gap-2">
          {LEVELS.map((l) => (
            <button
              key={l.id}
              onClick={() => updateParam("level", toggleInList(activeLevels, l.id))}
              className={cn(
                "rounded-full border px-3 py-1 text-body-sm font-medium transition-colors",
                activeLevels.includes(l.id)
                  ? "border-primary bg-primary text-on-primary"
                  : "border-outline text-on-surface-variant hover:border-primary hover:text-primary",
              )}
            >
              {l.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="font-mono text-label-md font-bold uppercase tracking-widest text-on-surface-variant">
          Format
        </p>
        <div className="mt-sm flex flex-wrap gap-2">
          {FORMATS.map((f) => (
            <button
              key={f.id}
              onClick={() => updateParam("format", toggleInList(activeFormats, f.id))}
              className={cn(
                "rounded-full border px-3 py-1 text-body-sm font-medium transition-colors",
                activeFormats.includes(f.id)
                  ? "border-primary bg-primary text-on-primary"
                  : "border-outline text-on-surface-variant hover:border-primary hover:text-primary",
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="font-mono text-label-md font-bold uppercase tracking-widest text-on-surface-variant">
          Sort by
        </p>
        <select
          value={sort}
          onChange={(e) => updateSort(e.target.value)}
          className="input-notebook mt-sm"
        >
          <option value="relevance">Recommended</option>
          <option value="rating">Highest rated</option>
          <option value="price-low">Price: low to high</option>
          <option value="price-high">Price: high to low</option>
          <option value="experience">Most experienced</option>
        </select>
      </div>
    </aside>
  );
}
