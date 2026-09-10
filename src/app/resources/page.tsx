import type { Metadata } from "next";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = { title: "Resources" };

const ARTICLES = [
  { title: "How to pick the right tutor for your kid", body: "Five questions to ask before your first session — and two red flags to watch for." },
  { title: "What a background check actually covers", body: "A plain-English walkthrough of Sidenote's verification process for teachers." },
  { title: "Setting a fair side-gig rate", body: "How teachers on Sidenote price their time, by subject and experience." },
  { title: "Making the most of a 45-minute session", body: "Simple prep that turns a good tutoring session into a great one." },
];

export default function ResourcesPage() {
  return (
    <div className="container-max py-16 md:py-24">
      <p className="hand">resources</p>
      <h1 className="mt-sm max-w-xl font-sans text-headline-lg font-bold text-ink">
        Notes on tutoring, teaching, and getting the most out of both.
      </h1>
      <div className="mt-xl grid gap-6 md:grid-cols-2">
        {ARTICLES.map((a, i) => (
          <Reveal key={a.title} index={i}>
            <div className="index-card index-card--ruled h-full p-lg pl-8">
              <p className="font-sans text-body-lg font-bold text-ink">{a.title}</p>
              <p className="mt-sm text-body-sm text-on-surface-variant">{a.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
