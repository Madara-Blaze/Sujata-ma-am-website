import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export function Corkboard({ children, className }: { children: ReactNode; className?: string }) {
  return <section className={cn("corkboard", className)}>{children}</section>;
}
