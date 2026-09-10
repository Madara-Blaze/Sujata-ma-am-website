import Link from "next/link";
import { ArrowRight, ShieldCheck, Wallet, Users, Sparkles } from "lucide-react";
import { Hero3D } from "@/components/site/Hero3D";
import { SubjectShowcase } from "@/components/site/SubjectShowcase";
import { TutorCard } from "@/components/tutors/TutorCard";
import { Reveal } from "@/components/motion/Reveal";
import { Counter } from "@/components/motion/Counter";
import { InkUnderline } from "@/components/motion/InkUnderline";
import { StickyNote } from "@/components/notebook/StickyNote";
import { Corkboard } from "@/components/notebook/Corkboard";
import { TornEdge } from "@/components/notebook/TornEdge";
import { getFeaturedTutors, getMarketplaceStats } from "@/lib/repository";

const HOW_IT_WORKS = [
  {
    title: "Search by subject",
    body: "Browse verified teachers by subject, level, format and price — or search for exactly what you need.",
    tilt: -1.6,
  },
  {
    title: "Message directly",
    body: "See real availability and message the teacher yourself. No middleman, no waiting on a matching algorithm.",
    tilt: 1,
  },
  {
    title: "Book your first session",
    body: "Start with a single session, no long contracts. Most teachers reply within a day.",
    tilt: -0.8,
  },
];

const TRUST = [
  { icon: ShieldCheck, title: "Every teacher verified", body: "ID checks for all, background checks for most subjects working with minors." },
  { icon: Wallet, title: "No agency markup", body: "You pay the teacher's rate — Sidenote takes a small platform fee, shown upfront." },
  { icon: Users, title: "Real, working teachers", body: "Everyone here has a day-job classroom. You're getting a professional, not a hobbyist." },
];

const TESTIMONIALS = [
  { quote: "My daughter's confidence in math turned around in three weeks.", author: "Devon P., parent" },
  { quote: "I found a teacher who actually taught the AP curriculum, not a generic script.", author: "Priya K., student" },
  { quote: "As a teacher, this pays for my classroom supplies without a second job's schedule.", author: "Maria S., tutor" },
];

export default async function HomePage() {
  const [featured, stats] = await Promise.all([getFeaturedTutors(3), getMarketplaceStats()]);

  return (
    <>
      <Hero3D />

      {/* How it works */}
      <section className="container-max py-20 md:py-28">
        <Reveal>
          <p className="hand">how it works</p>
        </Reveal>
        <Reveal index={1}>
          <h2 className="mt-sm max-w-xl font-sans text-headline-lg font-bold text-ink">
            Three steps between you and <InkUnderline>your first session</InkUnderline>.
          </h2>
        </Reveal>
        <div className="mt-xl grid gap-6 md:grid-cols-3">
          {HOW_IT_WORKS.map((step, i) => (
            <Reveal key={step.title} index={i}>
              <div className="index-card index-card--tilt h-full p-lg" style={{ "--tilt": `${step.tilt}deg` } as React.CSSProperties}>
                <span className="font-hand text-4xl text-primary">{i + 1}</span>
                <p className="mt-sm font-sans text-body-lg font-bold text-ink">{step.title}</p>
                <p className="mt-1 text-body-sm text-on-surface-variant">{step.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Subject showcase */}
      <section className="container-max py-12 md:py-16">
        <Reveal>
          <p className="hand">what you can learn</p>
        </Reveal>
        <Reveal index={1}>
          <h2 className="mt-sm max-w-xl font-sans text-headline-lg font-bold text-ink">
            Twelve subjects, one thing in common — <InkUnderline>real classroom teachers</InkUnderline>.
          </h2>
        </Reveal>
        <div className="mt-xl">
          <SubjectShowcase />
        </div>
      </section>

      {/* Stats strip */}
      <section className="container-max py-12">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { value: stats.totalTutors, suffix: "+", label: "Teachers listed" },
            { value: stats.subjectsCovered, suffix: "", label: "Subjects covered" },
            { value: stats.avgRating, suffix: "★", label: "Average rating", decimals: 1 },
            { value: stats.totalReviews, suffix: "+", label: "Student reviews" },
          ].map((s, i) => (
            <Reveal key={s.label} index={i}>
              <div className="index-card p-lg text-center">
                <p className="font-sans text-headline-lg font-bold text-primary">
                  <Counter to={s.value} suffix={s.suffix} decimals={s.decimals ?? 0} />
                </p>
                <p className="mt-1 font-mono text-[11px] uppercase tracking-widest text-on-surface-variant">
                  {s.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Featured tutors */}
      <section className="container-max py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <Reveal>
              <p className="hand">meet a few teachers</p>
            </Reveal>
            <Reveal index={1}>
              <h2 className="mt-sm font-sans text-headline-lg font-bold text-ink">Featured this week</h2>
            </Reveal>
          </div>
          <Link href="/tutors" className="btn-ghost">
            Browse all tutors <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-xl grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((tutor, i) => (
            <Reveal key={tutor.id} index={i}>
              <TutorCard tutor={tutor} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Trust & safety */}
      <section className="bg-surface-container-low py-20">
        <div className="container-max">
          <Reveal>
            <p className="hand">why families trust us</p>
          </Reveal>
          <Reveal index={1}>
            <h2 className="mt-sm max-w-xl font-sans text-headline-lg font-bold text-ink">
              Working teachers, held to a real standard.
            </h2>
          </Reveal>
          <div className="mt-xl grid gap-6 md:grid-cols-3">
            {TRUST.map((t, i) => (
              <Reveal key={t.title} index={i}>
                <div className="index-card h-full p-lg">
                  <span className="grid h-11 w-11 place-items-center rounded-lg bg-primary/10 text-primary">
                    <t.icon className="h-5 w-5" />
                  </span>
                  <p className="mt-sm font-sans text-body-lg font-bold text-ink">{t.title}</p>
                  <p className="mt-1 text-body-sm text-on-surface-variant">{t.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials corkboard */}
      <TornEdge className="bg-surface-container-low" />
      <Corkboard className="py-20">
        <div className="container-max">
          <Reveal>
            <p className="hand text-[#fff2cf]">pinned to the board</p>
          </Reveal>
          <div className="mt-lg grid gap-6 md:grid-cols-3">
            {TESTIMONIALS.map((t, i) => (
              <Reveal key={t.author} index={i}>
                <StickyNote color={i === 1 ? "mint" : i === 2 ? "pink" : "yellow"} tilt={i % 2 === 0 ? -2 : 2}>
                  <p className="font-sans text-body-md font-semibold text-ink">&ldquo;{t.quote}&rdquo;</p>
                  <p className="mt-sm text-body-sm text-ink/70">— {t.author}</p>
                </StickyNote>
              </Reveal>
            ))}
          </div>
        </div>
      </Corkboard>

      {/* Dual CTA + email capture */}
      <section className="container-max py-20 md:py-28">
        <div className="index-card index-card--ruled flex flex-col gap-lg p-xl pl-10 md:flex-row md:items-center md:justify-between">
          <div>
            <Sparkles className="h-6 w-6 text-highlighter" />
            <h2 className="mt-sm font-sans text-headline-lg font-bold text-ink">
              Ready to find your teacher — or become one?
            </h2>
            <p className="mt-1 max-w-md text-body-md text-on-surface-variant">
              Get a weekly note with new subjects, top-rated tutors and tips for getting the most out of a
              session.
            </p>
          </div>
          <form className="flex w-full max-w-sm flex-col gap-sm sm:flex-row">
            <input type="email" required placeholder="you@example.com" className="input-notebook" />
            <button type="submit" className="btn-primary shrink-0">
              Subscribe
            </button>
          </form>
        </div>
        <div className="mt-lg flex flex-wrap gap-3">
          <Link href="/tutors" className="btn-primary">
            Find a tutor <ArrowRight className="h-4 w-4" />
          </Link>
          <Link href="/teach" className="btn-ghost">
            Become a tutor
          </Link>
        </div>
      </section>
    </>
  );
}
