import type { Metadata } from "next";
import { LegalShell } from "@/components/site/LegalShell";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = { title: "Cookie Policy" };

export default function CookiesPage() {
  return (
    <LegalShell title="Cookie Policy" updated="September 2026">
      <p>
        This is placeholder copy. {siteConfig.name} would use essential cookies to keep you signed in and a
        light analytics cookie to understand which pages are useful. No third-party ad tracking.
      </p>
      <p>
        Your saved-tutors list on the Favorites page is stored only in your browser (localStorage), not in
        a cookie, and never leaves your device unless you&apos;re signed in.
      </p>
    </LegalShell>
  );
}
