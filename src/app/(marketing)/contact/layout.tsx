import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us — Wanderly",
  description: "Get in touch with Wanderly. We're here to help plan your next adventure.",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
