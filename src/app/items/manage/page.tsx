"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { Plus, Trash2, ExternalLink, Loader2 } from "lucide-react";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import Pagination from "@/components/ui/Pagination";
import { useAuth } from "@/components/layout/AuthContext";
import type { ITour } from "@/types";

export default function ManageToursPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [tours, setTours] = useState<ITour[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (!authLoading && user && user.role !== "admin") {
      toast.error("You don't have permission to access this page");
      router.push("/");
    }
  }, [user, authLoading, router]);

  if (authLoading) {
    return (
      <div className="bg-surface min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user || user.role !== "admin") return null;
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const fetchTours = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/tours/mine?page=${page}&limit=10`);
        const data = await res.json();
        if (data.success) {
          setTours(data.data.tours);
          setTotalPages(data.data.pagination.totalPages);
        }
      } catch {
        //
      } finally {
        setLoading(false);
      }
    };
    fetchTours();
  }, [page]);

  async function handleDelete() {
    if (!deleteId) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/tours/${deleteId}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setTours((prev) => prev.filter((t) => t._id !== deleteId));
        toast.success("Tour deleted successfully");
      }
    } catch {
      //
    } finally {
      setDeleting(false);
      setDeleteId(null);
    }
  }

  return (
    <div className="bg-surface min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-dark font-heading">My Tours</h1>
            <p className="text-body mt-1">
              {user?.role === "admin"
                ? "All tours in the system (admin view)"
                : "Manage your created tours"}
            </p>
          </div>
          <Link href="/items/add">
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Tour
            </Button>
          </Link>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : tours.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-sm">
            <h3 className="text-xl font-semibold text-dark font-heading mb-2">
              No tours yet
            </h3>
            <p className="text-body mb-6 max-w-md mx-auto">
              You haven&apos;t created any tours yet. Start by adding your first tour!
            </p>
            <Link href="/items/add">
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Create Your First Tour
              </Button>
            </Link>
          </div>
        ) : (
          <>
            <div className="hidden md:block bg-white rounded-2xl shadow-sm overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border/50">
                    <th className="text-left px-6 py-4 text-sm font-medium text-body">Tour</th>
                    <th className="text-left px-6 py-4 text-sm font-medium text-body">Category</th>
                    <th className="text-left px-6 py-4 text-sm font-medium text-body">Price</th>
                    <th className="text-left px-6 py-4 text-sm font-medium text-body">Date</th>
                    <th className="text-right px-6 py-4 text-sm font-medium text-body">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {tours.map((tour) => (
                    <tr key={tour._id} className="border-b border-border/20 hover:bg-surface/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={tour.images[0] || "/placeholder.svg"}
                            alt={tour.title}
                            className="w-14 h-14 rounded-xl object-cover"
                          />
                          <div>
                            <p className="font-medium text-dark text-sm line-clamp-1">{tour.title}</p>
                            <p className="text-xs text-body/60 line-clamp-1">{tour.shortDescription}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <Badge>{tour.category}</Badge>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-dark">
                        ${tour.price.toLocaleString()}
                      </td>
                      <td className="px-6 py-4 text-sm text-body">
                        {new Date(tour.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/tours/${tour._id}`}
                            className="p-2 text-primary hover:text-primary-light transition-colors"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </Link>
                          <button
                            onClick={() => setDeleteId(tour._id)}
                            className="p-2 text-red-400 hover:text-red-600 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
              {tours.map((tour) => (
                <div key={tour._id} className="bg-white rounded-2xl shadow-sm p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <img
                      src={tour.images[0] || "/placeholder.svg"}
                      alt={tour.title}
                      className="w-16 h-16 rounded-xl object-cover shrink-0"
                    />
                    <div className="min-w-0">
                      <p className="font-medium text-dark text-sm line-clamp-1">{tour.title}</p>
                      <Badge className="mt-1">{tour.category}</Badge>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-primary">${tour.price.toLocaleString()}</p>
                      <p className="text-xs text-body/60">
                        {new Date(tour.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      <Link
                        href={`/tours/${tour._id}`}
                        className="p-2 text-primary hover:text-primary-light transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Link>
                      <button
                        onClick={() => setDeleteId(tour._id)}
                        className="p-2 text-red-400 hover:text-red-600 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={setPage}
              />
            </div>
          </>
        )}

        {deleteId && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
            <div className="bg-white rounded-2xl shadow-lg p-6 max-w-sm w-full">
              <h3 className="text-lg font-semibold text-dark font-heading mb-2">Delete Tour</h3>
              <p className="text-sm text-body mb-6">
                Are you sure you want to delete this tour? This action cannot be undone.
              </p>
              <div className="flex items-center gap-3 justify-end">
                <Button
                  variant="secondary"
                  onClick={() => setDeleteId(null)}
                  disabled={deleting}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleDelete}
                  disabled={deleting}
                  className="bg-red-600 hover:bg-red-700 text-white"
                >
                  {deleting ? "Deleting..." : "Delete"}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
