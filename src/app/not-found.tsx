import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 — Page Not Found | Wanderly",
};

export default function NotFound() {
  return (
    <div className="bg-surface min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <p className="text-8xl font-bold text-primary font-heading mb-4">404</p>
        <h1 className="text-2xl font-bold text-dark font-heading mb-2">
          Page Not Found
        </h1>
        <p className="text-body mb-8 leading-relaxed">
          Oops! The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Let&apos;s get you back on track.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary-light transition-colors"
          >
            Go Home
          </Link>
          <Link
            href="/tours"
            className="inline-flex items-center gap-2 px-6 py-3 border border-border text-dark rounded-xl font-medium hover:bg-white transition-colors"
          >
            Browse Tours
          </Link>
        </div>
      </div>
    </div>
  );
}
