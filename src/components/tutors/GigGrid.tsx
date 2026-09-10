import { Clock } from "lucide-react";
import type { Gig } from "@/lib/types";
import { formatPrice } from "@/lib/utils";

export function GigGrid({ gigs }: { gigs: Gig[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {gigs.map((g) => (
        <div key={g.title} className="index-card index-card--ruled p-lg pl-8">
          <p className="font-sans text-body-lg font-bold text-ink">{g.title}</p>
          <p className="mt-1 text-body-sm text-on-surface-variant">{g.description}</p>
          <div className="mt-md flex items-center justify-between">
            <span className="flex items-center gap-1 font-mono text-body-sm text-on-surface-variant">
              <Clock className="h-3.5 w-3.5" /> {g.durationMinutes} min · {g.format}
            </span>
            <span className="font-mono text-body-md font-bold text-ink">{formatPrice(g.priceCents)}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
