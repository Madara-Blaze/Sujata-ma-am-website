"use client";

import { useState } from "react";

export function AuthForm() {
  const [mode, setMode] = useState<"login" | "signup">("login");

  return (
    <div className="index-card p-xl">
      <div className="segmented mb-lg w-full">
        <button
          onClick={() => setMode("login")}
          data-active={mode === "login"}
          className="segmented-item flex-1 justify-center"
        >
          Log in
        </button>
        <button
          onClick={() => setMode("signup")}
          data-active={mode === "signup"}
          className="segmented-item flex-1 justify-center"
        >
          Sign up
        </button>
      </div>
      <form className="space-y-md" onSubmit={(e) => e.preventDefault()}>
        {mode === "signup" && (
          <label className="block">
            <span className="text-body-sm font-semibold text-ink">Full name</span>
            <input required type="text" className="input-notebook mt-1" placeholder="Jane Rivera" />
          </label>
        )}
        <label className="block">
          <span className="text-body-sm font-semibold text-ink">Email</span>
          <input required type="email" className="input-notebook mt-1" placeholder="you@example.com" />
        </label>
        <label className="block">
          <span className="text-body-sm font-semibold text-ink">Password</span>
          <input required type="password" className="input-notebook mt-1" placeholder="••••••••" />
        </label>
        <button type="submit" className="btn-primary w-full">
          {mode === "login" ? "Log in" : "Create account"}
        </button>
      </form>
      <p className="mt-lg text-center text-body-sm text-on-surface-variant">
        Authentication isn&apos;t wired up yet — this screen is a preview of the flow.
      </p>
    </div>
  );
}
