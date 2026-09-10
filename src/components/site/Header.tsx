"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, NotebookPen } from "lucide-react";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/config/site";
import { ThemeToggle } from "@/components/site/ThemeToggle";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-outline-variant bg-background/90 backdrop-blur-md">
      <div className="container-max flex h-20 items-center justify-between">
        <Link href="/" className="flex items-center gap-sm">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary/10 text-primary">
            <NotebookPen className="h-5 w-5" aria-hidden />
          </span>
          <span className="font-sans text-headline-md font-bold tracking-tight text-ink">
            {siteConfig.shortName}
          </span>
        </Link>

        <nav className="hidden items-center gap-lg lg:flex">
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "py-1 text-body-md font-medium transition-colors",
                pathname === item.href
                  ? "border-b-2 border-primary text-primary"
                  : "text-on-surface-variant hover:text-primary",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-sm lg:flex">
          <ThemeToggle />
          <Link href="/login" className="btn-ghost">
            Log in
          </Link>
          <Link href="/teach" className="btn-primary">
            Become a tutor
          </Link>
        </div>

        <button
          onClick={() => setOpen((o) => !o)}
          className="grid h-10 w-10 place-items-center rounded-lg border border-outline lg:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-outline-variant bg-background lg:hidden">
          <div className="container-max flex flex-col gap-md py-md">
            {siteConfig.nav.map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="text-body-md font-medium text-on-surface">
                {item.label}
              </Link>
            ))}
            <div className="mt-sm flex items-center gap-sm">
              <Link href="/login" onClick={() => setOpen(false)} className="btn-ghost flex-1">
                Log in
              </Link>
              <Link href="/teach" onClick={() => setOpen(false)} className="btn-primary flex-1">
                Become a tutor
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
