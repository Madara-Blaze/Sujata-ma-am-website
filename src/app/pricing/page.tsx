import type { Metadata } from "next";
import { PricingTable } from "@/components/ui/pricing";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = { title: "Pricing" };

export default function PricingPage() {
  return (
    <div className="container-max py-16 md:py-24">
      <Reveal>
        <p className="hand">pricing</p>
      </Reveal>
      <Reveal index={1}>
        <h1 className="mt-sm max-w-xl font-sans text-headline-lg font-bold text-ink">
          Simple, honest pricing on both sides.
        </h1>
      </Reveal>
      <Reveal index={2}>
        <p className="mt-lg max-w-xl text-body-md text-on-surface-variant">
          Students never pay a platform fee. Teachers keep the large majority of every session and can add
          a small optional boost to be featured.
        </p>
      </Reveal>
      <div className="mt-xl">
        <PricingTable />
      </div>
    </div>
  );
}
