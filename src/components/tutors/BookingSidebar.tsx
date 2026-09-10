"use client";

import { useState } from "react";
import { Heart, Mail, CalendarDays } from "lucide-react";
import type { Tutor } from "@/lib/types";
import { formatPrice, cn } from "@/lib/utils";
import { useFavorites } from "@/lib/use-favorites";

export function BookingSidebar({ tutor }: { tutor: Tutor }) {
  const { isFavorite, toggle } = useFavorites();
  const [sent, setSent] = useState(false);
  const saved = isFavorite(tutor.id);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Interface-first: no backend wired yet. This confirms the intent so the
    // flow reads real, without pretending a message was actually delivered.
    setSent(true);
  }

  return (
    <div className="index-card sticky top-28 space-y-lg p-lg">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-mono text-headline-md font-bold text-ink">{formatPrice(tutor.hourlyRateCents)}</p>
          <p className="text-body-sm text-on-surface-variant">per hour</p>
        </div>
        <button
          onClick={() => toggle(tutor.id)}
          aria-pressed={saved}
          aria-label="Save tutor"
          className={cn(
            "grid h-10 w-10 place-items-center rounded-full border transition-colors",
            saved ? "border-margin bg-margin/10 text-margin" : "border-outline text-on-surface-variant hover:text-margin",
          )}
        >
          <Heart className={cn("h-5 w-5", saved && "fill-margin")} />
        </button>
      </div>

      <div>
        <p className="flex items-center gap-2 font-mono text-label-md font-bold uppercase tracking-widest text-on-surface-variant">
          <CalendarDays className="h-4 w-4" /> Weekly availability
        </p>
        <ul className="mt-sm space-y-1 text-body-sm text-on-surface">
          {tutor.availability.map((a) => (
            <li key={a.day} className="flex justify-between border-b border-dashed border-outline-variant py-1 last:border-0">
              <span className="font-semibold">{a.day}</span>
              <span className="text-on-surface-variant">{a.slots.join(" · ")}</span>
            </li>
          ))}
        </ul>
      </div>

      {sent ? (
        <div className="rounded-lg bg-success/10 p-md text-body-sm text-success">
          Request sent! {tutor.name.split(" ")[0]} typically replies within a day.
        </div>
      ) : (
        <form onSubmit={onSubmit} className="space-y-sm">
          <textarea
            required
            rows={3}
            placeholder={`Tell ${tutor.name.split(" ")[0]} what you'd like help with…`}
            className="input-notebook resize-none"
          />
          <button type="submit" className="btn-primary w-full">
            <Mail className="h-4 w-4" /> Request a session
          </button>
        </form>
      )}
    </div>
  );
}
