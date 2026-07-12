import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Tours — Wanderly",
  description: "Manage your curated travel experiences on Wanderly.",
};

export default function ItemsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
