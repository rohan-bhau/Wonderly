import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Travel Blog — Wanderly",
  description: "Travel stories, guides, and tips from Wanderly travelers around the world.",
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
