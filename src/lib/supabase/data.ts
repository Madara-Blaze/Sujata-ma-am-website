import type { Tutor } from "@/lib/types";
import { createSupabaseServerClient } from "@/lib/supabase/server";

// Thin mapping layer between the `tutors` table and the app's Tutor shape.
// Kept separate from repository.ts so the fallback-to-seed logic there stays
// simple regardless of how the Supabase read is implemented.

export async function fetchAllTutors(): Promise<Tutor[]> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.from("tutors").select("*");
  if (error) throw error;
  return (data ?? []) as unknown as Tutor[];
}

export async function fetchTutorBySlug(slug: string): Promise<Tutor | null> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.from("tutors").select("*").eq("slug", slug).maybeSingle();
  if (error) throw error;
  return (data as unknown as Tutor) ?? null;
}
