import type { SearchResult } from "@/lib/types";
import { TutorCard } from "@/components/tutors/TutorCard";
import { Reveal } from "@/components/motion/Reveal";

export function TutorsResults({ result }: { result: SearchResult }) {
  if (result.items.length === 0) {
    return (
      <div className="index-card p-xl text-center">
        <p className="hand text-2xl">hmm, nothing here yet</p>
        <p className="mt-sm text-body-md text-on-surface-variant">
          Try clearing a filter or searching a broader subject.
        </p>
      </div>
    );
  }

  return (
    <div>
      <p className="mb-md text-body-sm text-on-surface-variant">
        {result.total} tutor{result.total === 1 ? "" : "s"} found
      </p>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {result.items.map((tutor, i) => (
          <Reveal key={tutor.id} index={i % 3}>
            <TutorCard tutor={tutor} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
