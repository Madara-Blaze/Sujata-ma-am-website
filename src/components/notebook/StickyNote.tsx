import { cn } from "@/lib/utils";
import type { ReactNode, CSSProperties } from "react";

export function StickyNote({
  children,
  className,
  color = "yellow",
  tilt = -2,
}: {
  children: ReactNode;
  className?: string;
  color?: "yellow" | "mint" | "pink";
  tilt?: number;
}) {
  const style = { "--tilt": `${tilt}deg` } as CSSProperties;
  return (
    <div
      style={style}
      className={cn(
        "sticky-note",
        color === "mint" && "sticky-note--mint",
        color === "pink" && "sticky-note--pink",
        className,
      )}
    >
      {children}
    </div>
  );
}
