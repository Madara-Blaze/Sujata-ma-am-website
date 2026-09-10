"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Search, MapPin } from "lucide-react";

export function HeroSearch() {
  const router = useRouter();
  const [q, setQ] = useState("");

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (q.trim()) params.set("q", q.trim());
    router.push(`/tutors${params.toString() ? `?${params}` : ""}`);
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-2 sm:flex-row">
      <div className="flex flex-1 items-center gap-sm rounded-lg border border-outline bg-surface-container-lowest px-md py-sm">
        <Search className="h-5 w-5 shrink-0 text-on-surface-variant" aria-hidden />
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Subject or skill — “algebra”, “Spanish”, “guitar”…"
          className="w-full bg-transparent text-body-md text-on-surface outline-none placeholder:text-on-surface-variant/70"
        />
      </div>
      <div className="hidden items-center gap-sm rounded-lg border border-outline bg-surface-container-lowest px-md py-sm sm:flex">
        <MapPin className="h-5 w-5 shrink-0 text-on-surface-variant" aria-hidden />
        <span className="text-body-md text-on-surface-variant">Online or nearby</span>
      </div>
      <button type="submit" className="btn-primary shrink-0">
        Find a tutor
      </button>
    </form>
  );
}
