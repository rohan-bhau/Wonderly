import { Suspense } from "react";
import TourListing from "@/components/sections/TourListing";

export default function ToursPage() {
  return (
    <Suspense>
      <TourListing />
    </Suspense>
  );
}
