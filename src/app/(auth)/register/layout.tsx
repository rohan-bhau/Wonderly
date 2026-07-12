import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Account — Wanderly",
  description: "Create your Wanderly account to start booking curated travel experiences.",
};

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
