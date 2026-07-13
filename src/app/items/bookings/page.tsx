"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ExternalLink, Loader2, MapPin, Users, Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import type { IBooking, ITour } from "@/types";

export default function BookedToursPage() {
  const [bookings, setBookings] = useState<IBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [cancelId, setCancelId] = useState<string | null>(null);
  const [cancelling, setCancelling] = useState(false);

  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/bookings/mine");
        const data = await res.json();
        if (data.success) {
          setBookings(data.data.bookings);
        }
      } catch {
        //
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  const handleCancel = async () => {
    if (!cancelId) return;
    setCancelling(true);
    try {
      const res = await fetch(`/api/bookings/${cancelId}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setBookings((prev) => prev.filter((b) => b._id !== cancelId));
        toast.success("Booking cancelled successfully");
      } else {
        toast.error(data.message || "Failed to cancel booking");
      }
    } catch {
      toast.error("Something went wrong");
    } finally {
      setCancelling(false);
      setCancelId(null);
    }
  };

  return (
    <div className="bg-surface min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-dark font-heading">
              My Booked Tours
            </h1>
            <p className="text-body mt-1">
              View all your booked tour packages
            </p>
          </div>
          <Link href="/tours">
            <Button>Browse Tours</Button>
          </Link>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : bookings.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-sm">
            <h3 className="text-xl font-semibold text-dark font-heading mb-2">
              No bookings yet
            </h3>
            <p className="text-body mb-6 max-w-md mx-auto">
              You haven&apos;t booked any tours yet. Start by exploring our
              amazing tours!
            </p>
            <Link href="/tours">
              <Button>Browse Tours</Button>
            </Link>
          </div>
        ) : (
          <>
            <div className="hidden md:block bg-white rounded-2xl shadow-sm overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border/50">
                    <th className="text-left px-6 py-4 text-sm font-medium text-body">
                      Tour
                    </th>
                    <th className="text-left px-6 py-4 text-sm font-medium text-body">
                      Guests
                    </th>
                    <th className="text-left px-6 py-4 text-sm font-medium text-body">
                      Phone
                    </th>
                    <th className="text-left px-6 py-4 text-sm font-medium text-body">
                      Status
                    </th>
                    <th className="text-left px-6 py-4 text-sm font-medium text-body">
                      Booked On
                    </th>
                    <th className="text-right px-6 py-4 text-sm font-medium text-body">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((booking) => {
                    const tour = booking.tourId as ITour;
                    return (
                      <tr
                        key={booking._id}
                        className="border-b border-border/20 hover:bg-surface/50 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={tour.images?.[0] || "/placeholder.svg"}
                              alt={tour.title}
                              className="w-14 h-14 rounded-xl object-cover"
                            />
                            <div>
                              <p className="font-medium text-dark text-sm line-clamp-1">
                                {tour.title}
                              </p>
                              <p className="text-xs text-body/60 line-clamp-1">
                                {tour.location}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-dark">
                          {booking.guests}
                        </td>
                        <td className="px-6 py-4 text-sm text-body">
                          {booking.phone}
                        </td>
                        <td className="px-6 py-4">
                          <Badge
                            className={
                              booking.status === "confirmed"
                                ? "bg-green-100 text-green-700"
                                : "bg-red-100 text-red-700"
                            }
                          >
                            {booking.status}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 text-sm text-body">
                          {new Date(booking.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            }
                          )}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <Link
                              href={`/tours/${tour._id}`}
                              className="p-2 text-primary hover:text-primary-light transition-colors inline-flex"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </Link>
                            {booking.status === "confirmed" && (
                              <button
                                onClick={() => setCancelId(booking._id)}
                                className="p-2 text-red-400 hover:text-red-600 transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
              {bookings.map((booking) => {
                const tour = booking.tourId as ITour;
                return (
                  <div
                    key={booking._id}
                    className="bg-white rounded-2xl shadow-sm p-4"
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <img
                        src={tour.images?.[0] || "/placeholder.svg"}
                        alt={tour.title}
                        className="w-16 h-16 rounded-xl object-cover shrink-0"
                      />
                      <div className="min-w-0">
                        <p className="font-medium text-dark text-sm line-clamp-1">
                          {tour.title}
                        </p>
                        <Badge
                          className={`mt-1 ${
                            booking.status === "confirmed"
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {booking.status}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-body mb-2">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {tour.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                        {booking.guests} guest{booking.guests > 1 ? "s" : ""}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-body/60">
                        Booked{" "}
                        {new Date(booking.createdAt).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          }
                        )}
                      </p>
                      <div className="flex items-center gap-1">
                        <Link
                          href={`/tours/${tour._id}`}
                          className="p-2 text-primary hover:text-primary-light transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Link>
                        {booking.status === "confirmed" && (
                          <button
                            onClick={() => setCancelId(booking._id)}
                            className="p-2 text-red-400 hover:text-red-600 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}

        {cancelId && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
            <div className="bg-white rounded-2xl shadow-lg p-6 max-w-sm w-full">
              <h3 className="text-lg font-semibold text-dark font-heading mb-2">Cancel Booking</h3>
              <p className="text-sm text-body mb-6">
                Are you sure you want to cancel this booking? This action cannot be undone.
              </p>
              <div className="flex items-center gap-3 justify-end">
                <Button
                  variant="secondary"
                  onClick={() => setCancelId(null)}
                  disabled={cancelling}
                >
                  Keep Booking
                </Button>
                <Button
                  onClick={handleCancel}
                  disabled={cancelling}
                  className="bg-red-600 hover:bg-red-700 text-white"
                >
                  {cancelling ? "Cancelling..." : "Cancel Booking"}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
