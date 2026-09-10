import { Star } from "lucide-react";
import type { Review } from "@/lib/types";
import { IndexCard } from "@/components/notebook/IndexCard";
import { Reveal } from "@/components/motion/Reveal";

export function ReviewsSection({ reviews }: { reviews: Review[] }) {
  if (!reviews.length) return null;
  return (
    <div>
      <p className="hand text-2xl">what students say</p>
      <div className="mt-lg grid gap-4 sm:grid-cols-2">
        {reviews.map((r, i) => (
          <Reveal key={r.id} index={i}>
            <IndexCard tilt={i % 2 === 0 ? -1.2 : 1} className="h-full">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star
                    key={s}
                    className={`h-4 w-4 ${s < r.rating ? "fill-highlighter text-highlighter" : "text-outline"}`}
                  />
                ))}
              </div>
              <p className="mt-sm font-sans text-body-lg font-bold text-ink">{r.title}</p>
              <p className="mt-1 text-body-sm text-on-surface-variant">{r.body}</p>
              <p className="mt-md text-body-sm font-semibold text-ink">
                {r.author} <span className="font-normal text-on-surface-variant">· {r.role}</span>
              </p>
            </IndexCard>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
