// Single source of truth for the brand. Every page/component reads from
// here rather than hardcoding the name/domain — renaming the platform or
// plugging in a real domain later is a one-line change in this file.
export const siteConfig = {
  name: "Sidenote",
  shortName: "Sidenote",
  tagline: "Turn your teaching into a side gig.",
  description:
    "Find verified, working teachers for tutoring and skill-coaching — from K-12 academics to adult skills. Book directly, no agency markup.",
  keywords: ["tutoring", "teachers", "side gig", "freelance teaching", "K-12 tutoring", "skill coaching"],
  // No production domain is chosen yet — resolved from an env var with a
  // safe local fallback. Never hardcode a literal domain elsewhere.
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  supportEmail: "hello@example.com",
  legalEntityName: "Sidenote",
  social: {
    twitter: "",
    instagram: "",
    linkedin: "",
  },
  nav: [
    { href: "/tutors", label: "Find a tutor" },
    { href: "/teach", label: "Become a tutor" },
    { href: "/resources", label: "Resources" },
    { href: "/pricing", label: "Pricing" },
  ],
} as const;

export type SiteConfig = typeof siteConfig;
