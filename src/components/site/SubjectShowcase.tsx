import Link from "next/link";
import * as Icons from "lucide-react";
import { SUBJECTS } from "@/data/taxonomy";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/utils";

const ACCENT_BG: Record<string, string> = {
  highlighter: "bg-highlighter/45",
  "highlighter-mint": "bg-highlighter-mint/50",
  "highlighter-pink": "bg-highlighter-pink/50",
};

export function SubjectShowcase() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {SUBJECTS.map((s, i) => {
        const Icon = (Icons as unknown as Record<string, Icons.LucideIcon>)[s.icon] ?? Icons.BookOpen;
        return (
          <Reveal key={s.id} index={i % 4} as="div">
            <Link
              href={`/tutors?subject=${s.id}`}
              className="index-card index-card--tilt group flex h-full flex-col gap-sm p-lg"
              style={{ "--tilt": `${i % 2 === 0 ? -1.4 : 1.1}deg` } as React.CSSProperties}
            >
              <span className={cn("grid h-11 w-11 place-items-center rounded-lg", ACCENT_BG[s.accent])}>
                <Icon className="h-5 w-5 text-ink" aria-hidden />
              </span>
              <span className="font-sans text-body-lg font-semibold text-ink">{s.label}</span>
              <span className="text-body-sm text-on-surface-variant">{s.description}</span>
            </Link>
          </Reveal>
        );
      })}
    </div>
  );
}
