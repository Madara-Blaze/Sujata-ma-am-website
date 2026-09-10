import { cn } from "@/lib/utils";

/** A three-hole-punch column down a card's left edge. */
export function ThreeHolePunch({ className }: { className?: string }) {
  return <div aria-hidden className={cn("paper-punch w-6 shrink-0", className)} />;
}
