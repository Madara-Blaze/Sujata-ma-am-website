import type { Metadata } from "next";
import { AuthForm } from "@/components/auth/AuthForm";

export const metadata: Metadata = { title: "Log in" };

export default function LoginPage() {
  return (
    <div className="container-max flex min-h-[70vh] items-center justify-center py-16">
      <div className="w-full max-w-sm">
        <p className="hand text-center">welcome back</p>
        <h1 className="mt-sm text-center font-sans text-headline-md font-bold text-ink">Log in to Sidenote</h1>
        <div className="mt-lg">
          <AuthForm />
        </div>
      </div>
    </div>
  );
}
