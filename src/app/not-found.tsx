import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-max flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <p className="hand text-5xl">page torn out</p>
      <p className="mt-md max-w-sm text-body-md text-on-surface-variant">
        This page doesn&apos;t exist — maybe it fell out of the notebook.
      </p>
      <Link href="/" className="btn-primary mt-lg">
        Back to home
      </Link>
    </div>
  );
}
