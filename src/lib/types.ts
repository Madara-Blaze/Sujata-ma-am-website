// Domain model for Sidenote — shared by the local seed layer and the
// Supabase-backed layer so both expose identical shapes to the UI.

export type Subject =
  | "math"
  | "reading-writing"
  | "science"
  | "test-prep"
  | "coding"
  | "languages"
  | "music"
  | "art"
  | "college-essays"
  | "professional-skills"
  | "history-civics"
  | "public-speaking";

export type Level = "elementary" | "middle-school" | "high-school" | "college" | "adult";
export type Format = "online" | "in-person" | "hybrid";
export type VerificationTier = "unverified" | "id-verified" | "background-checked";

export interface AvailabilitySlot {
  day: string;
  slots: string[];
}

export interface Gig {
  title: string;
  description: string;
  priceCents: number;
  format: Format;
  durationMinutes: number;
}

export interface Review {
  id: string;
  author: string;
  role: string;
  rating: number; // 1..5
  title: string;
  body: string;
  createdAt: string;
}

export interface Tutor {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  bio: string;
  subjects: Subject[];
  levels: Level[];
  formats: Format[];
  hourlyRateCents: number;
  currency: string;
  currentlyTeachingAt: string; // "day job" school/institution — builds trust
  yearsExperience: number;
  city: string;
  state: string;
  rating: number;
  reviewCount: number;
  featured: boolean;
  verification: VerificationTier;
  availability: AvailabilitySlot[];
  gigs: Gig[];
  reviews: Review[];
  photo: string;
  logoInitials: string;
  contact: { email: string; website?: string };
}

export interface SearchFilters {
  q?: string;
  subjects?: Subject[];
  levels?: Level[];
  formats?: Format[];
  maxPriceCents?: number;
  minRating?: number;
  featured?: boolean;
  sort?: "relevance" | "rating" | "price-low" | "price-high" | "experience";
  page?: number;
  pageSize?: number;
}

export interface SearchResult {
  items: Tutor[];
  total: number;
  page: number;
  pageSize: number;
}

export interface SubjectMeta {
  id: Subject;
  label: string;
  description: string;
  icon: string;
  accent: "highlighter" | "highlighter-mint" | "highlighter-pink";
}
