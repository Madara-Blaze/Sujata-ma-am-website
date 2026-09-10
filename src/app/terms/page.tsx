import type { Metadata } from "next";
import { LegalShell } from "@/components/site/LegalShell";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = { title: "Terms of Service" };

export default function TermsPage() {
  return (
    <LegalShell title="Terms of Service" updated="September 2026">
      <p>
        These terms are a placeholder for {siteConfig.legalEntityName} and should be replaced with real,
        reviewed legal copy before the site accepts real bookings or payments.
      </p>
      <p>
        In short: {siteConfig.name} connects independent teachers with students and families for freelance
        tutoring. Teachers are independent contractors, not employees, and are responsible for their own
        tax reporting. Sessions booked through the platform are agreements between the teacher and the
        student/family — {siteConfig.name} facilitates discovery and payment, not the lesson itself.
      </p>
      <p>
        Get in touch at {siteConfig.supportEmail} with any questions before this copy is finalized.
      </p>
    </LegalShell>
  );
}
