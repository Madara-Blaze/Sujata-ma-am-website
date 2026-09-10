import { ShieldCheck, BadgeCheck } from "lucide-react";
import type { VerificationTier } from "@/lib/types";
import { subjectLabel } from "@/data/taxonomy";
import { cn } from "@/lib/utils";

export function VerificationBadge({ tier }: { tier: VerificationTier }) {
  if (tier === "unverified") return null;
  const isBackgroundChecked = tier === "background-checked";
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-semibold",
        isBackgroundChecked ? "bg-success/15 text-success" : "bg-primary/15 text-primary",
      )}
    >
      {isBackgroundChecked ? <ShieldCheck className="h-3.5 w-3.5" /> : <BadgeCheck className="h-3.5 w-3.5" />}
      {isBackgroundChecked ? "Background checked" : "ID verified"}
    </span>
  );
}

const ACCENT_CLASS: Record<number, string> = {
  0: "highlight",
  1: "highlight highlight--mint",
  2: "highlight highlight--pink",
};

export function SubjectChip({ id, index = 0 }: { id: string; index?: number }) {
  return (
    <span className={cn("text-body-sm font-semibold text-ink", ACCENT_CLASS[index % 3])}>
      {subjectLabel(id)}
    </span>
  );
}
