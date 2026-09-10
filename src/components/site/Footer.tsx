import Link from "next/link";
import { NotebookPen } from "lucide-react";
import { siteConfig } from "@/config/site";

const COLUMNS = [
  {
    title: "Students",
    links: [
      { href: "/tutors", label: "Find a tutor" },
      { href: "/pricing", label: "Pricing" },
      { href: "/resources", label: "Resources" },
    ],
  },
  {
    title: "Teachers",
    links: [
      { href: "/teach", label: "Become a tutor" },
      { href: "/pricing", label: "How payouts work" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/terms", label: "Terms" },
      { href: "/privacy", label: "Privacy" },
      { href: "/cookies", label: "Cookies" },
    ],
  },
];

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-outline-variant bg-surface-container-low">
      <div className="container-max grid gap-xl py-16 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-sm">
            <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary/10 text-primary">
              <NotebookPen className="h-5 w-5" aria-hidden />
            </span>
            <span className="font-sans text-headline-md font-bold text-ink">{siteConfig.shortName}</span>
          </div>
          <p className="mt-md max-w-xs text-body-sm text-on-surface-variant">{siteConfig.description}</p>
        </div>
        {COLUMNS.map((col) => (
          <div key={col.title}>
            <p className="font-mono text-label-md font-bold uppercase tracking-widest text-on-surface-variant">
              {col.title}
            </p>
            <ul className="mt-md space-y-2">
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-body-sm text-on-surface-variant hover:text-primary">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-outline-variant">
        <div className="container-max flex flex-col gap-2 py-6 text-body-sm text-on-surface-variant sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {siteConfig.legalEntityName}. All rights reserved.
          </p>
          <p className="font-mono text-[11px] uppercase tracking-widest">Made for teachers, by design.</p>
        </div>
      </div>
    </footer>
  );
}
