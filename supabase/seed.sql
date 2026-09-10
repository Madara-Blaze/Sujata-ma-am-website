-- Optional: seeds the `tutors` table with a couple of rows matching
-- src/data/tutors.ts, for testing DATA_SOURCE=supabase locally. The app
-- runs fully without this — see src/lib/repository.ts's seed-data fallback.

insert into public.tutors (slug, name, tagline, bio, subjects, levels, formats, hourly_rate_cents, currently_teaching_at, years_experience, city, state, rating, review_count, featured, verification, photo, logo_initials, contact)
values (
  'maria-santos',
  'Maria Santos',
  'AP Calculus & Statistics, explained without the panic.',
  'I''ve taught AP Calculus and Statistics at a public high school for 11 years.',
  array['math', 'test-prep'],
  array['high-school', 'college'],
  array['online', 'in-person'],
  6000,
  'Lincoln High School',
  11,
  'Austin',
  'TX',
  4.9,
  62,
  true,
  'background-checked',
  'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=800&auto=format&fit=crop',
  'MS',
  '{"email": "maria.tutors@example.com"}'
)
on conflict (slug) do nothing;
