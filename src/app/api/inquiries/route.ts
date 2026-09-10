import { NextRequest, NextResponse } from "next/server";

// Stub endpoint for the "Request a session" form. Not wired to email/DB yet
// — this phase is interface-first (see BookingSidebar.tsx). Once Supabase +
// Resend are configured, this should insert into an `inquiries` table and
// send a notification email to the tutor.
export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  if (!body?.tutorId || !body?.message) {
    return NextResponse.json({ error: "tutorId and message are required" }, { status: 400 });
  }
  console.log("[inquiries] received (not persisted — no backend configured):", body);
  return NextResponse.json({ ok: true, persisted: false });
}
