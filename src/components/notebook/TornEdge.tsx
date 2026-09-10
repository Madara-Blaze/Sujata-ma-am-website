import { cn } from "@/lib/utils";

/** A torn-paper transition strip between two stacked sections. */
export function TornEdge({ className, flip = false }: { className?: string; flip?: boolean }) {
  return (
    <div
      aria-hidden
      className={cn(
        "torn-edge-b h-6 w-full bg-background",
        flip && "rotate-180",
        className,
      )}
    />
  );
}
