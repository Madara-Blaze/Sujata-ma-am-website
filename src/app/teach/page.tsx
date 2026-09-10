import type { Metadata } from "next";
import { Wallet, ShieldCheck, CalendarClock, TrendingUp } from "lucide-react";
import { RegistrationForm } from "@/components/profile/RegistrationForm";
import { Reveal } from "@/components/motion/Reveal";
import { InkUnderline } from "@/components/motion/InkUnderline";
import { Counter } from "@/components/motion/Counter";

export const metadata: Metadata = { title: "Become a tutor" };

const BENEFITS = [
  { icon: Wallet, title: "Keep 85% of what you earn", body: "We take a 15% platform fee to cover payments, support and marketing. No hidden costs." },
  { icon: CalendarClock, title: "Your schedule, your rate", body: "Set your own hours and hourly rate. Take a week off any time — no penalties." },
  { icon: ShieldCheck, title: "We handle trust & safety", body: "ID and background checks are on us. You focus on teaching." },
  { icon: TrendingUp, title: "Built-in demand", body: "Families are already searching by subject — a complete profile gets found fast." },
];

const STEPS = [
  "Apply with your teaching background and the subjects you'd tutor.",
  "Verify your identity (and background check, for most subjects).",
  "Set your rate, availability and write your first gig listing.",
  "Go live — start replying to session requests directly.",
];

export default function TeachPage() {
  return (
    <div>
      <section className="container-max py-16 md:py-24">
        <Reveal>
          <p className="hand">for teachers</p>
        </Reveal>
        <Reveal index={1}>
          <h1 className="mt-sm max-w-2xl font-sans text-display text-ink">
            Turn what you already teach into <InkUnderline>a side gig</InkUnderline>.
          </h1>
        </Reveal>
        <Reveal index={2}>
          <p className="mt-lg max-w-xl text-body-lg text-on-surface-variant">
            You already know the curriculum. Sidenote handles discovery, scheduling and trust — you just
            teach, on your own time, for your own rate.
          </p>
        </Reveal>
        <Reveal index={3}>
          <div className="mt-xl grid max-w-md grid-cols-2 gap-4">
            <div className="index-card p-lg">
              <p className="font-sans text-headline-md font-bold text-primary">
                <Counter to={85} suffix="%" />
              </p>
              <p className="mt-1 text-body-sm text-on-surface-variant">Kept by the teacher</p>
            </div>
            <div className="index-card p-lg">
              <p className="font-sans text-headline-md font-bold text-primary">
                <Counter to={2400} suffix="+" />
              </p>
              <p className="mt-1 text-body-sm text-on-surface-variant">Teachers already listed</p>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="bg-surface-container-low py-16 md:py-20">
        <div className="container-max">
          <div className="grid gap-6 md:grid-cols-2">
            {BENEFITS.map((b, i) => (
              <Reveal key={b.title} index={i}>
                <div className="index-card h-full p-lg">
                  <span className="grid h-11 w-11 place-items-center rounded-lg bg-primary/10 text-primary">
                    <b.icon className="h-5 w-5" />
                  </span>
                  <p className="mt-sm font-sans text-body-lg font-bold text-ink">{b.title}</p>
                  <p className="mt-1 text-body-sm text-on-surface-variant">{b.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="container-max py-16 md:py-20">
        <Reveal>
          <p className="hand">the process</p>
        </Reveal>
        <Reveal index={1}>
          <h2 className="mt-sm font-sans text-headline-lg font-bold text-ink">Four steps to your first gig</h2>
        </Reveal>
        <ol className="mt-xl grid gap-4 md:grid-cols-4">
          {STEPS.map((step, i) => (
            <Reveal key={step} index={i}>
              <li className="index-card h-full p-lg">
                <span className="font-hand text-3xl text-primary">{i + 1}</span>
                <p className="mt-sm text-body-sm text-on-surface-variant">{step}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </section>

      <section className="container-max pb-20 md:pb-28">
        <Reveal>
          <p className="hand">apply now</p>
        </Reveal>
        <Reveal index={1}>
          <h2 className="mt-sm mb-lg font-sans text-headline-lg font-bold text-ink">List your gig</h2>
        </Reveal>
        <RegistrationForm />
      </section>
    </div>
  );
}
