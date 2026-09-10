"use client";

import Link from "next/link";
import { useFavorites } from "@/lib/use-favorites";
import { TUTORS } from "@/data/tutors";
import { TutorCard } from "@/components/tutors/TutorCard";

export function FavoritesList() {
  const { ids, ready } = useFavorites();
  const favorites = TUTORS.filter((t) => ids.includes(t.id));

  if (!ready) return null;

  if (!favorites.length) {
    return (
      <div className="index-card p-xl text-center">
        <p className="hand text-2xl">no saved tutors yet</p>
        <p className="mt-sm text-body-md text-on-surface-variant">
          Tap the heart on any tutor&apos;s profile to save them here.
        </p>
        <Link href="/tutors" className="btn-primary mt-lg inline-flex">
          Browse tutors
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {favorites.map((tutor) => (
        <TutorCard key={tutor.id} tutor={tutor} />
      ))}
    </div>
  );
}
