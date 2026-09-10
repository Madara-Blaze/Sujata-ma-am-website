import type { Metadata } from "next";
import { FavoritesList } from "@/components/favorites/FavoritesList";

export const metadata: Metadata = { title: "Saved tutors" };

export default function FavoritesPage() {
  return (
    <div className="container-max py-12 md:py-16">
      <p className="hand">your board</p>
      <h1 className="mt-sm font-sans text-headline-lg font-bold text-ink">Saved tutors</h1>
      <div className="mt-xl">
        <FavoritesList />
      </div>
    </div>
  );
}
