import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

/**
 * Server-side Supabase client (RLS-aware, uses the signed-in user's
 * session). Only instantiated when Supabase env vars are present; the app
 * runs on seed data otherwise. Import lazily inside server actions / route
 * handlers.
 */
export async function createSupabaseServerClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) throw new Error("Supabase env vars are not configured");

  const cookieStore = await cookies();
  return createServerClient(url, key, {
    cookies: {
      getAll: () => cookieStore.getAll(),
      setAll: (all: { name: string; value: string; options?: Record<string, unknown> }[]) => {
        try {
          all.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
        } catch {
          // set() throws in Server Components; safe to ignore (middleware refreshes).
        }
      },
    },
  });
}

export function isSupabaseEnabled(): boolean {
  return (
    process.env.DATA_SOURCE === "supabase" &&
    Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL) &&
    Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
  );
}
