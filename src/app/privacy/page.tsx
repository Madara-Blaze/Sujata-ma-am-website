import type { Metadata } from "next";
import { LegalShell } from "@/components/site/LegalShell";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <LegalShell title="Privacy Policy" updated="September 2026">
      <p>
        This is placeholder copy. {siteConfig.name} would collect the information necessary to run a
        tutoring marketplace — account details, messages between students and teachers, and verification
        data for teachers (identity and, where required, background checks).
      </p>
      <p>
        We would never sell personal data. Verification data would be handled by a dedicated processor and
        used only to confirm eligibility to teach on the platform.
      </p>
      <p>Questions before this is finalized: {siteConfig.supportEmail}.</p>
    </LegalShell>
  );
}
