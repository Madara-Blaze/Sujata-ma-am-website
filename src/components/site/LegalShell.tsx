import type { ReactNode } from "react";
import { siteConfig } from "@/config/site";

export function LegalShell({ title, updated, children }: { title: string; updated: string; children: ReactNode }) {
  return (
    <div className="container-max py-16 md:py-24">
      <div className="mx-auto max-w-2xl">
        <p className="hand">a note from {siteConfig.legalEntityName}</p>
        <h1 className="mt-sm font-sans text-headline-lg font-bold text-ink">{title}</h1>
        <p className="mt-2 text-body-sm text-on-surface-variant">Last updated {updated}</p>
        <div className="index-card mt-xl space-y-lg p-xl text-body-md leading-relaxed text-on-surface-variant">
          {children}
        </div>
      </div>
    </div>
  );
}
