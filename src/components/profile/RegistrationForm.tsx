"use client";

import { useState } from "react";
import { SUBJECTS } from "@/data/taxonomy";

export function RegistrationForm() {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="index-card p-xl text-center">
        <p className="hand text-3xl">you&apos;re on the list!</p>
        <p className="mt-sm text-body-md text-on-surface-variant">
          We&apos;ll email you next steps — including identity verification and setting your rate.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
      className="index-card space-y-lg p-xl"
    >
      <div className="grid gap-lg sm:grid-cols-2">
        <label className="block">
          <span className="text-body-sm font-semibold text-ink">Full name</span>
          <input required type="text" className="input-notebook mt-1" placeholder="Jane Rivera" />
        </label>
        <label className="block">
          <span className="text-body-sm font-semibold text-ink">Email</span>
          <input required type="email" className="input-notebook mt-1" placeholder="jane@school.edu" />
        </label>
        <label className="block">
          <span className="text-body-sm font-semibold text-ink">Where do you currently teach?</span>
          <input required type="text" className="input-notebook mt-1" placeholder="Lincoln High School" />
        </label>
        <label className="block">
          <span className="text-body-sm font-semibold text-ink">Years teaching</span>
          <input required type="number" min={0} className="input-notebook mt-1" placeholder="5" />
        </label>
      </div>
      <label className="block">
        <span className="text-body-sm font-semibold text-ink">What would you teach as a side gig?</span>
        <select required multiple className="input-notebook mt-1 h-32">
          {SUBJECTS.map((s) => (
            <option key={s.id} value={s.id}>
              {s.label}
            </option>
          ))}
        </select>
        <span className="mt-1 block text-body-sm text-on-surface-variant">Hold ⌘/Ctrl to select more than one.</span>
      </label>
      <label className="block">
        <span className="text-body-sm font-semibold text-ink">A few sentences about your teaching style</span>
        <textarea required rows={4} className="input-notebook mt-1" placeholder="I focus on…" />
      </label>
      <button type="submit" className="btn-primary w-full sm:w-auto">
        Submit application
      </button>
      <p className="text-body-sm text-on-surface-variant">
        Every applicant goes through ID verification, and most subjects require a background check before
        their first paid session.
      </p>
    </form>
  );
}
