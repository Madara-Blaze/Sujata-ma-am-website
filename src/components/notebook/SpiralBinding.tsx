import { cn } from "@/lib/utils";

/** A strip of spiral-notebook rings, meant for a card or panel's left edge. */
export function SpiralBinding({ className }: { className?: string }) {
  return <div aria-hidden className={cn("spiral-binding w-4 shrink-0", className)} />;
}
