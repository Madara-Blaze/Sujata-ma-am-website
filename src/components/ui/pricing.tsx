import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

const TIERS = [
  {
    name: "Students & families",
    price: "Free",
    note: "to browse and message",
    features: ["Search every teacher and subject", "Message tutors directly", "Save favorites", "No booking fees"],
    highlight: false,
  },
  {
    name: "Teachers",
    price: "15%",
    note: "platform fee per session",
    features: ["Keep 85% of your rate", "Set your own schedule & price", "ID + background check included", "Payouts within 2 business days"],
    highlight: true,
  },
  {
    name: "Teachers — Featured",
    price: "$19/mo",
    note: "optional, cancel anytime",
    features: ["Priority placement in search", "Featured badge on your profile", "Monthly performance insights"],
    highlight: false,
  },
];

export function PricingTable() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {TIERS.map((tier) => (
        <div
          key={tier.name}
          className={cn(
            "index-card flex h-full flex-col p-lg",
            tier.highlight && "border-2 border-primary",
          )}
        >
          {tier.highlight && (
            <span className="mb-sm inline-block w-fit rounded-full bg-highlighter px-2.5 py-1 text-[11px] font-bold text-ink">
              Most common
            </span>
          )}
          <p className="font-sans text-body-lg font-bold text-ink">{tier.name}</p>
          <p className="mt-sm font-sans text-headline-lg font-bold text-primary">{tier.price}</p>
          <p className="text-body-sm text-on-surface-variant">{tier.note}</p>
          <ul className="mt-lg space-y-2">
            {tier.features.map((f) => (
              <li key={f} className="flex items-start gap-2 text-body-sm text-on-surface">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                {f}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
