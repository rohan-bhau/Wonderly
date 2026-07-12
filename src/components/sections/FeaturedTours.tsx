"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Clock, MapPin, ArrowRight, Heart } from "lucide-react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Rating from "@/components/ui/Rating";
import PriceDisplay from "@/components/ui/PriceDisplay";
import IconText from "@/components/ui/IconText";
import { CardSkeleton } from "@/components/ui/Skeleton";
import type { ITour } from "@/types";

export default function FeaturedTours() {
  const [tours, setTours] = useState<ITour[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/tours?featured=true&limit=4")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setTours(data.data.tours);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="py-16 md:py-24 bg-surface">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-dark font-heading">
              Featured Tours
            </h2>
            <p className="mt-3 text-body max-w-xl">
              Hand-picked experiences our travelers love
            </p>
          </div>
          <Link
            href="/tours"
            className="hidden md:flex items-center gap-2 text-sm font-medium text-primary hover:text-primary-light transition-colors"
          >
            View All Tours
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => <CardSkeleton key={i} />)
            : tours.map((tour) => (
                <Link key={tour._id} href={`/tours/${tour._id}`} className="group">
                  <Card className="overflow-hidden h-full flex flex-col">
                    <div className="relative overflow-hidden">
                      <img
                        src={tour.images[0] || "/placeholder.svg"}
                        alt={tour.title}
                        className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3">
                        <Badge>{tour.category}</Badge>
                      </div>
                      <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center hover:bg-white/50 transition-colors">
                        <Heart className="w-4 h-4 text-white" />
                      </button>
                    </div>

                    <div className="p-4 flex-1 flex flex-col gap-3">
                      <Rating
                        rating={tour.averageRating || 0}
                        reviewCount={tour.reviewCount || 0}
                      />

                      <h3 className="font-heading font-semibold text-lg text-dark leading-tight group-hover:text-primary transition-colors">
                        {tour.title}
                      </h3>

                      <p className="text-sm text-body line-clamp-2 flex-1">
                        {tour.shortDescription}
                      </p>

                      <hr className="border-border/50" />

                      <div className="flex items-center gap-4">
                        <IconText
                          icon={<Clock className="w-4 h-4" />}
                          text={tour.duration}
                        />
                        <IconText
                          icon={<MapPin className="w-4 h-4" />}
                          text={tour.location}
                        />
                      </div>

                      <div className="flex items-center justify-between pt-1">
                        <PriceDisplay price={tour.price} />
                        <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                          <ArrowRight className="w-4 h-4 text-primary group-hover:text-white" />
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Link href="/tours">
            <Button variant="secondary">View All Tours</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
