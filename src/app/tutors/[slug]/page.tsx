import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Star, MapPin, BriefcaseBusiness } from "lucide-react";
import { getTutorBySlug, getAllTutors } from "@/lib/repository";
import { VerificationBadge, SubjectChip } from "@/components/ui/Badges";
import { GigGrid } from "@/components/tutors/GigGrid";
import { ReviewsSection } from "@/components/tutors/ReviewsSection";
import { BookingSidebar } from "@/components/tutors/BookingSidebar";
import { Reveal } from "@/components/motion/Reveal";

export async function generateStaticParams() {
  const tutors = await getAllTutors();
  return tutors.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const tutor = await getTutorBySlug(slug);
  if (!tutor) return {};
  return { title: tutor.name, description: tutor.tagline };
}

export default async function TutorProfilePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const tutor = await getTutorBySlug(slug);
  if (!tutor) notFound();

  return (
    <div className="container-max py-12 md:py-16">
      <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
        <div>
          <Reveal>
            <div className="flex flex-col gap-lg sm:flex-row sm:items-center">
              <div className="relative h-28 w-28 shrink-0 overflow-hidden rounded-2xl">
                <Image src={tutor.photo} alt={tutor.name} fill sizes="112px" className="object-cover" />
              </div>
              <div>
                <h1 className="font-sans text-headline-lg font-bold text-ink">{tutor.name}</h1>
                <p className="mt-1 text-body-md text-on-surface-variant">{tutor.tagline}</p>
                <div className="mt-sm flex flex-wrap items-center gap-x-4 gap-y-2 text-body-sm text-on-surface-variant">
                  <span className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-highlighter text-highlighter" /> {tutor.rating.toFixed(1)} (
                    {tutor.reviewCount} reviews)
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" /> {tutor.city}, {tutor.state}
                  </span>
                  <span className="flex items-center gap-1">
                    <BriefcaseBusiness className="h-4 w-4" /> {tutor.yearsExperience} yrs teaching
                  </span>
                </div>
                <div className="mt-sm">
                  <VerificationBadge tier={tutor.verification} />
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal index={1}>
            <div className="index-card index-card--ruled mt-xl p-lg pl-8">
              <p className="hand text-xl">about {tutor.name.split(" ")[0]}</p>
              <p className="mt-sm text-body-md leading-relaxed text-on-surface-variant">{tutor.bio}</p>
              <p className="mt-md text-body-sm text-on-surface-variant">
                Currently teaching at <span className="font-semibold text-ink">{tutor.currentlyTeachingAt}</span>
              </p>
              <div className="mt-md flex flex-wrap gap-x-3 gap-y-1">
                {tutor.subjects.map((s, i) => (
                  <SubjectChip key={s} id={s} index={i} />
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal index={2}>
            <div className="mt-xl">
              <p className="hand text-2xl">gigs offered</p>
              <div className="mt-lg">
                <GigGrid gigs={tutor.gigs} />
              </div>
            </div>
          </Reveal>

          <Reveal index={3}>
            <div className="mt-xl">
              <ReviewsSection reviews={tutor.reviews} />
            </div>
          </Reveal>
        </div>

        <div>
          <BookingSidebar tutor={tutor} />
        </div>
      </div>
    </div>
  );
}
