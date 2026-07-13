"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import {
  Clock,
  MapPin,
  Users,
  Signal,
  Calendar,
  Check,
  X,
  Star,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  Heart,
  Loader2,
} from "lucide-react";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Rating from "@/components/ui/Rating";
import PriceDisplay from "@/components/ui/PriceDisplay";
import IconText from "@/components/ui/IconText";
import Button from "@/components/ui/Button";
import { useAuth } from "@/components/layout/AuthContext";
import type { ITour, IReview } from "@/types";

const difficultyColors: Record<string, string> = {
  easy: "bg-green-100 text-green-700",
  moderate: "bg-yellow-100 text-yellow-700",
  challenging: "bg-red-100 text-red-700",
};

function ReviewForm({ tourId, onReviewAdded }: { tourId: string; onReviewAdded: () => void }) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch(`/api/tours/${tourId}/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rating, comment }),
      });
      const data = await res.json();
      if (data.success) {
        setComment("");
        setRating(5);
        onReviewAdded();
      } else {
        setError(data.message || "Failed to submit review");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="font-heading font-semibold text-lg text-dark">Write a Review</h3>
      <div>
        <label className="block text-sm font-medium text-body mb-1">Rating</label>
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              className="p-0.5"
            >
              <Star
                className={`w-6 h-6 ${
                  star <= rating
                    ? "fill-accent text-accent"
                    : "text-border"
                }`}
              />
            </button>
          ))}
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-body mb-1">
          Your Review
        </label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={4}
          placeholder="Share your experience..."
          className="w-full px-4 py-3 rounded-xl border border-border bg-white text-sm text-dark placeholder:text-placeholder focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
          required
        />
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
      <Button type="submit" disabled={submitting}>
        {submitting ? "Submitting..." : "Submit Review"}
      </Button>
    </form>
  );
}

export default function TourDetailsPage() {
  const params = useParams();
  const { user } = useAuth();
  const [tour, setTour] = useState<ITour | null>(null);
  const [relatedTours, setRelatedTours] = useState<ITour[]>([]);
  const [reviews, setReviews] = useState<IReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [expandedDay, setExpandedDay] = useState<number | null>(1);

  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingData, setBookingData] = useState({
    phone: "",
    guests: 1,
    specialRequests: "",
  });
  const [bookingSubmitting, setBookingSubmitting] = useState(false);
  const [booked, setBooked] = useState(false);

  const tourId = params.id as string;

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const [tourRes, reviewsRes] = await Promise.all([
          fetch(`/api/tours/${tourId}`),
          fetch(`/api/tours/${tourId}/reviews`),
        ]);
        const tourData = await tourRes.json();
        const reviewsData = await reviewsRes.json();
        if (tourData.success) {
          setTour(tourData.data.tour);
          setRelatedTours(tourData.data.relatedTours || []);
        }
        if (reviewsData.success) {
          setReviews(reviewsData.data.reviews);
        }
      } catch {
        // handled by null/empty state
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [tourId]);

  useEffect(() => {
    if (!user) return;
    const check = async () => {
      try {
        const res = await fetch(`/api/bookings/check?tourId=${tourId}`);
        const data = await res.json();
        if (data.success) setBooked(data.data.booked);
      } catch {
        //
      }
    };
    check();
  }, [user, tourId]);

  const refreshReviews = async () => {
    try {
      const res = await fetch(`/api/tours/${tourId}/reviews`);
      const data = await res.json();
      if (data.success) {
        setReviews(data.data.reviews);
      }
    } catch {
      //
    }
  };

  if (loading) {
    return (
      <div className="bg-surface min-h-screen">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="animate-pulse space-y-8">
            <div className="h-[400px] bg-border/50 rounded-2xl" />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                <div className="h-8 bg-border/50 rounded w-3/4" />
                <div className="h-4 bg-border/50 rounded w-1/4" />
                <div className="h-4 bg-border/50 rounded w-full" />
                <div className="h-4 bg-border/50 rounded w-full" />
                <div className="h-4 bg-border/50 rounded w-2/3" />
              </div>
              <div className="h-64 bg-border/50 rounded-2xl" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!tour) {
    return (
      <div className="bg-surface min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-heading font-bold text-dark mb-2">Tour not found</h1>
          <p className="text-body mb-6">The tour you&apos;re looking for doesn&apos;t exist or has been removed.</p>
          <Link
            href="/tours"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary-light transition-colors"
          >
            Browse Tours
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-surface min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <section>
              <div className="relative rounded-2xl overflow-hidden">
                <img
                  src={tour.images[selectedImage] || "/placeholder.svg"}
                  alt={tour.title}
                  className="w-full h-[400px] md:h-[500px] object-cover"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="text-sm px-4 py-1.5">{tour.category}</Badge>
                </div>
              </div>
              {tour.images.length > 1 && (
                <div className="flex gap-2 mt-3 overflow-x-auto pb-2">
                  {tour.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImage(i)}
                      className={`shrink-0 rounded-xl overflow-hidden border-2 transition-colors ${
                        i === selectedImage
                          ? "border-primary"
                          : "border-transparent hover:border-border"
                      }`}
                    >
                      <img
                        src={img}
                        alt={tour.title + " " + (i + 1)}
                        className="w-20 h-16 object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </section>

            <section>
              <h1 className="text-3xl md:text-4xl font-bold text-dark font-heading tracking-tight">
                {tour.title}
              </h1>
              <div className="flex items-center gap-4 mt-3 flex-wrap">
                <Rating rating={tour.averageRating} reviewCount={tour.reviewCount} />
                <IconText icon={<MapPin className="w-4 h-4" />} text={tour.location} />
              </div>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-dark font-heading mb-3">Overview</h2>
              <p className="text-body leading-relaxed whitespace-pre-line">
                {tour.fullDescription}
              </p>
            </section>

            {tour.itinerary.length > 0 && (
              <section>
                <h2 className="text-xl font-semibold text-dark font-heading mb-4">Itinerary</h2>
                <div className="space-y-3">
                  {tour.itinerary.map((item) => (
                    <div key={item.day} className="bg-white rounded-2xl shadow-sm overflow-hidden">
                      <button
                        onClick={() =>
                          setExpandedDay(expandedDay === item.day ? null : item.day)
                        }
                        className="w-full flex items-center justify-between p-4 text-left"
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold shrink-0">
                            {item.day}
                          </span>
                          <span className="font-medium text-dark">{item.title}</span>
                        </div>
                        {expandedDay === item.day ? (
                          <ChevronUp className="w-5 h-5 text-body shrink-0" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-body shrink-0" />
                        )}
                      </button>
                      {expandedDay === item.day && (
                        <div className="px-4 pb-4 pl-14">
                          <p className="text-body text-sm leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {tour.inclusions.length > 0 && (
                <section>
                  <h2 className="text-xl font-semibold text-dark font-heading mb-3">Inclusions</h2>
                  <ul className="space-y-2">
                    {tour.inclusions.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-body">
                        <Check className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}
              {tour.exclusions.length > 0 && (
                <section>
                  <h2 className="text-xl font-semibold text-dark font-heading mb-3">Exclusions</h2>
                  <ul className="space-y-2">
                    {tour.exclusions.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-body">
                        <X className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </div>

            <section>
              <h2 className="text-xl font-semibold text-dark font-heading mb-4">
                Reviews ({reviews.length})
              </h2>

              {reviews.length > 0 ? (
                <div className="space-y-4">
                  {reviews.map((review) => (
                    <div
                      key={review._id}
                      className="bg-white rounded-2xl shadow-sm p-4"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-dark text-sm">
                          {review.userName}
                        </span>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-accent text-accent" />
                          <span className="text-sm text-accent font-medium">
                            {review.rating}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-body leading-relaxed">{review.comment}</p>
                      <p className="text-xs text-body/60 mt-2">
                        {new Date(review.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-body text-sm">No reviews yet. Be the first to review!</p>
              )}

              {user && user._id !== tour.createdBy && (
                <div className="mt-6 bg-white rounded-2xl shadow-sm p-6">
                  <ReviewForm tourId={tourId} onReviewAdded={refreshReviews} />
                </div>
              )}
              {user && user._id === tour.createdBy && (
                <p className="mt-4 text-sm text-body/60 text-center">
                  You cannot review your own tour.
                </p>
              )}
            </section>
          </div>

          <aside className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              <Card className="p-6">
                <PriceDisplay price={tour.price} className="mb-4" />

                <div className="space-y-3">
                  <IconText
                    icon={<Calendar className="w-4 h-4" />}
                    text={`Departure: ${new Date(tour.departureDate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}`}
                  />
                  <IconText
                    icon={<Clock className="w-4 h-4" />}
                    text={`Duration: ${tour.duration}`}
                  />
                  <IconText
                    icon={<Users className="w-4 h-4" />}
                    text={`Group size: ${tour.groupSize} people`}
                  />
                  <IconText
                    icon={<Signal className="w-4 h-4" />}
                    text={`Difficulty: ${tour.difficulty}`}
                  />
                  <IconText
                    icon={<MapPin className="w-4 h-4" />}
                    text={tour.location}
                  />
                </div>

                <hr className="my-4 border-border/50" />

                <Button
                  className="w-full"
                  size="lg"
                  disabled={booked}
                  onClick={() => {
                    if (!user) {
                      toast.error("Please login first to book a tour");
                      return;
                    }
                    if (user.role === "admin") {
                      toast.error("Admins cannot book tours");
                      return;
                    }
                    if (user._id === tour.createdBy) {
                      toast.error("You cannot book your own tour");
                      return;
                    }
                    setBookingOpen(true);
                  }}
                >
                  {booked ? "Already Booked" : "Book Now"}
                </Button>
              </Card>

              <Card className="p-6">
                <h3 className="font-heading font-semibold text-dark mb-3">Quick Info</h3>
                <div className="space-y-2 text-sm text-body">
                  <div className="flex justify-between">
                    <span>Category</span>
                    <span className="font-medium text-dark">{tour.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Difficulty</span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        difficultyColors[tour.difficulty] || "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {tour.difficulty}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Group Size</span>
                    <span className="font-medium text-dark">Up to {tour.groupSize}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Departure</span>
                    <span className="font-medium text-dark">
                      {new Date(tour.departureDate).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                </div>
              </Card>
            </div>
          </aside>
        </div>

        {bookingOpen && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
            <div className="bg-white rounded-2xl shadow-lg p-6 max-w-md w-full">
              <h3 className="text-lg font-semibold text-dark font-heading mb-2">
                Book This Tour
              </h3>
              <p className="text-sm text-body mb-6">
                Fill in your details to confirm the booking.
              </p>
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  setBookingSubmitting(true);
                  try {
                    const res = await fetch("/api/bookings", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({
                        tourId: tour._id,
                        ...bookingData,
                      }),
                    });
                    const data = await res.json();
                    if (data.success) {
                      toast.success("Booking confirmed successfully!");
                      setBooked(true);
                      setBookingOpen(false);
                      setBookingData({
                        phone: "",
                        guests: 1,
                        specialRequests: "",
                      });
                    } else {
                      toast.error(data.message || "Booking failed");
                    }
                  } catch {
                    toast.error("Something went wrong");
                  } finally {
                    setBookingSubmitting(false);
                  }
                }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-sm font-medium text-body mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    value={bookingData.phone}
                    onChange={(e) =>
                      setBookingData({ ...bookingData, phone: e.target.value })
                    }
                    placeholder="Enter your phone number"
                    className="w-full px-4 py-3 rounded-xl border border-border bg-white text-sm text-dark placeholder:text-placeholder focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-body mb-1">
                    Number of Guests
                  </label>
                  <input
                    type="number"
                    required
                    min={1}
                    max={tour.groupSize}
                    value={bookingData.guests}
                    onChange={(e) =>
                      setBookingData({
                        ...bookingData,
                        guests: parseInt(e.target.value) || 1,
                      })
                    }
                    className="w-full px-4 py-3 rounded-xl border border-border bg-white text-sm text-dark placeholder:text-placeholder focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                  <p className="text-xs text-body/60 mt-1">
                    Max {tour.groupSize} guests
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-body mb-1">
                    Special Requests (optional)
                  </label>
                  <textarea
                    value={bookingData.specialRequests}
                    onChange={(e) =>
                      setBookingData({
                        ...bookingData,
                        specialRequests: e.target.value,
                      })
                    }
                    rows={3}
                    placeholder="Any special requirements..."
                    className="w-full px-4 py-3 rounded-xl border border-border bg-white text-sm text-dark placeholder:text-placeholder focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                  />
                </div>
                <div className="flex items-center gap-3 justify-end pt-2">
                  <Button
                    variant="secondary"
                    type="button"
                    onClick={() => setBookingOpen(false)}
                    disabled={bookingSubmitting}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disabled={bookingSubmitting}>
                    {bookingSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Booking...
                      </>
                    ) : (
                      "Confirm Booking"
                    )}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}

        {relatedTours.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-bold text-dark font-heading mb-6">Related Tours</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedTours.map((related) => (
                <Link
                  key={related._id}
                  href={`/tours/${related._id}`}
                  className="group"
                >
                  <Card className="overflow-hidden h-full flex flex-col">
                    <div className="relative overflow-hidden">
                      <img
                        src={related.images[0] || "/placeholder.svg"}
                        alt={related.title}
                        className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-3 left-3">
                        <Badge>{related.category}</Badge>
                      </div>
                      <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center hover:bg-white/50 transition-colors">
                        <Heart className="w-4 h-4 text-white" />
                      </button>
                    </div>
                    <div className="p-4 flex-1 flex flex-col gap-3">
                      <Rating
                        rating={related.averageRating || 0}
                        reviewCount={related.reviewCount || 0}
                      />
                      <h3 className="font-heading font-semibold text-lg text-dark leading-tight group-hover:text-primary transition-colors line-clamp-2">
                        {related.title}
                      </h3>
                      <p className="text-sm text-body line-clamp-2 flex-1">
                        {related.shortDescription}
                      </p>
                      <hr className="border-border/50" />
                      <div className="flex items-center gap-4">
                        <IconText
                          icon={<Clock className="w-4 h-4" />}
                          text={related.duration}
                        />
                        <IconText
                          icon={<MapPin className="w-4 h-4" />}
                          text={related.location}
                        />
                      </div>
                      <div className="flex items-center justify-between pt-1">
                        <PriceDisplay price={related.price} />
                        <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                          <ArrowRight className="w-4 h-4 text-primary group-hover:text-white" />
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
