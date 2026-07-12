import { Suspense } from "react";
import type { Metadata } from "next";
import TourListing from "@/components/sections/TourListing";

export const metadata: Metadata = {
  title: "Explore Tours — Wanderly",
  description: "Discover curated travel experiences from around the world. Filter by category, price, rating, and more.",
};

export default function ToursPage() {
  return (
    <Suspense>
      <TourListing />
    </Suspense>
  );
}
