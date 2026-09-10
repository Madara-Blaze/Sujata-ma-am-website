import Link from "next/link";
import Image from "next/image";
import { Star } from "lucide-react";
import type { Tutor } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import { VerificationBadge, SubjectChip } from "@/components/ui/Badges";
import { TiltCard } from "@/components/motion/TiltCard";

export function TutorCard({ tutor }: { tutor: Tutor }) {
  return (
    <TiltCard>
      <Link href={`/tutors/${tutor.slug}`} className="index-card flex h-full flex-col overflow-hidden">
        <div className="relative h-40 w-full overflow-hidden">
          <Image
            src={tutor.photo}
            alt={tutor.name}
            fill
            sizes="(max-width: 768px) 100vw, 360px"
            className="object-cover"
          />
          {tutor.featured && (
            <span className="absolute left-3 top-3 rounded-full bg-highlighter px-2.5 py-1 text-[11px] font-bold text-ink shadow-card">
              Featured
            </span>
          )}
        </div>
        <div className="flex flex-1 flex-col gap-sm p-lg">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-sans text-body-lg font-bold text-ink">{tutor.name}</h3>
              <p className="text-body-sm text-on-surface-variant">{tutor.currentlyTeachingAt}</p>
            </div>
            <div className="flex shrink-0 items-center gap-1 text-body-sm font-semibold text-ink">
              <Star className="h-4 w-4 fill-highlighter text-highlighter" />
              {tutor.rating.toFixed(1)}
            </div>
          </div>
          <p className="text-body-sm text-on-surface-variant">{tutor.tagline}</p>
          <div className="flex flex-wrap gap-x-3 gap-y-1">
            {tutor.subjects.slice(0, 3).map((s, i) => (
              <SubjectChip key={s} id={s} index={i} />
            ))}
          </div>
          <div className="mt-auto flex items-center justify-between pt-sm">
            <VerificationBadge tier={tutor.verification} />
            <span className="font-mono text-body-sm font-bold text-ink">
              {formatPrice(tutor.hourlyRateCents)}/hr
            </span>
          </div>
        </div>
      </Link>
    </TiltCard>
  );
}
