import { cn } from "@/lib/utils";
import type { ReactNode, CSSProperties } from "react";

export function IndexCard({
  children,
  className,
  ruled = true,
  tilt,
}: {
  children: ReactNode;
  className?: string;
  ruled?: boolean;
  tilt?: number;
}) {
  const style = tilt !== undefined ? ({ "--tilt": `${tilt}deg` } as CSSProperties) : undefined;
  return (
    <div
      style={style}
      className={cn("index-card index-card--tilt p-lg", ruled && "index-card--ruled pl-8", className)}
    >
      {children}
    </div>
  );
}
