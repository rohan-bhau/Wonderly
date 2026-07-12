"use client";

import { useEffect, useState, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Search, Clock, MapPin, ArrowRight, Heart, SlidersHorizontal, X } from "lucide-react";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Rating from "@/components/ui/Rating";
import PriceDisplay from "@/components/ui/PriceDisplay";
import IconText from "@/components/ui/IconText";
import { CardSkeleton } from "@/components/ui/Skeleton";
import Pagination from "@/components/ui/Pagination";
import type { ITour } from "@/types";

const categories = [
  "Adventure",
  "Beach",
  "Mountain",
  "Cultural",
  "Wildlife",
  "City",
];

const sortOptions = [
  { value: "newest", label: "Newest First" },
  { value: "price_asc", label: "Price (Low to High)" },
  { value: "price_desc", label: "Price (High to Low)" },
  { value: "rating", label: "Highest Rated" },
];

const ratingOptions = [
  { value: "", label: "Any Rating" },
  { value: "4", label: "4+ Stars" },
  { value: "3", label: "3+ Stars" },
];

const ITEMS_PER_PAGE = 12;

interface PaginationData {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export default function TourListing() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [tours, setTours] = useState<ITour[]>([]);
  const [pagination, setPagination] = useState<PaginationData | null>(null);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [category, setCategory] = useState(searchParams.get("category") || "");
  const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") || "");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") || "");
  const [rating, setRating] = useState(searchParams.get("rating") || "");
  const [sort, setSort] = useState(searchParams.get("sort") || "newest");
  const [page, setPage] = useState(parseInt(searchParams.get("page") || "1"));

  const debounceRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    const controller = new AbortController();
    const fetchTours = async () => {
      setLoading(true);
      try {
        const params = new URLSearchParams();
        params.set("limit", String(ITEMS_PER_PAGE));
        if (search) params.set("search", search);
        if (category) params.set("category", category);
        if (minPrice) params.set("minPrice", minPrice);
        if (maxPrice) params.set("maxPrice", maxPrice);
        if (sort) params.set("sort", sort);
        if (page) params.set("page", String(page));

        const res = await fetch(`/api/tours?${params.toString()}`, {
          signal: controller.signal,
        });
        const data = await res.json();
        if (data.success) {
          setTours(data.data.tours);
          setPagination(data.data.pagination);
        }
      } catch {
        if (!controller.signal.aborted) {
          setTours([]);
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };
    fetchTours();
    return () => controller.abort();
  }, [search, category, minPrice, maxPrice, sort, page]);

  useEffect(() => {
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (category) params.set("category", category);
    if (minPrice) params.set("minPrice", minPrice);
    if (maxPrice) params.set("maxPrice", maxPrice);
    if (rating) params.set("rating", rating);
    if (sort !== "newest") params.set("sort", sort);
    if (page > 1) params.set("page", String(page));
    const query = params.toString();
    const newUrl = query ? `/tours?${query}` : "/tours";
    router.replace(newUrl, { scroll: false });
  }, [search, category, minPrice, maxPrice, rating, sort, page, router]);

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setSearch(value);
    }, 400);
  };

  const handleFilterChange = (
    setter: (val: string) => void,
    value: string
  ) => {
    setter(value);
    setPage(1);
  };

  const clearFilters = () => {
    setSearch("");
    setCategory("");
    setMinPrice("");
    setMaxPrice("");
    setRating("");
    setSort("newest");
    setPage(1);
  };

  const hasActiveFilters = search || category || minPrice || maxPrice || rating;

  const startItem = pagination ? (pagination.page - 1) * pagination.limit + 1 : 0;
  const endItem = pagination ? Math.min(pagination.page * pagination.limit, pagination.total) : 0;

  return (
    <div className="bg-surface min-h-screen">
      <section className="bg-white pt-16 pb-12 md:pt-20 md:pb-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-[48px] font-bold text-dark font-heading tracking-tight leading-tight">
              Explore curated tours
            </h1>
            <p className="mt-4 text-lg text-body max-w-xl">
              Discover hand-picked travel experiences around the world
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 -mt-6 relative z-10">
        <div className="bg-filter-bg border border-[rgba(189,201,198,0.3)] rounded-2xl shadow-sm p-4 md:p-6">
          <div className="flex flex-col md:flex-row gap-3 md:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-body" />
              <input
                type="text"
                placeholder="Where to?"
                value={search}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-border bg-white text-sm text-dark placeholder:text-placeholder focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            <select
              value={category}
              onChange={(e) => handleFilterChange(setCategory, e.target.value)}
              className="px-4 py-2.5 rounded-xl border border-border bg-white text-sm text-dark focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent min-w-[160px]"
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            <div className="flex items-center gap-2">
              <input
                type="number"
                placeholder="Min $"
                value={minPrice}
                onChange={(e) => handleFilterChange(setMinPrice, e.target.value)}
                className="w-24 px-3 py-2.5 rounded-xl border border-border bg-white text-sm text-dark placeholder:text-placeholder focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <span className="text-body text-sm">—</span>
              <input
                type="number"
                placeholder="Max $"
                value={maxPrice}
                onChange={(e) => handleFilterChange(setMaxPrice, e.target.value)}
                className="w-24 px-3 py-2.5 rounded-xl border border-border bg-white text-sm text-dark placeholder:text-placeholder focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            <select
              value={rating}
              onChange={(e) => handleFilterChange(setRating, e.target.value)}
              className="px-4 py-2.5 rounded-xl border border-border bg-white text-sm text-dark focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent min-w-[130px]"
            >
              {ratingOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                showFilters || hasActiveFilters
                  ? "bg-primary text-white"
                  : "bg-filter-bg text-body hover:bg-border"
              }`}
            >
              <SlidersHorizontal className="w-4 h-4" />
              More Filters
              {hasActiveFilters && (
                <span className="w-2 h-2 rounded-full bg-white" />
              )}
            </button>

            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-1 text-sm text-body hover:text-primary transition-colors"
              >
                <X className="w-4 h-4" />
                Clear
              </button>
            )}
          </div>

          <div className="flex items-center gap-4">
            {pagination && (
              <span className="text-sm text-body">
                Showing {startItem}–{endItem} of {pagination.total} results
              </span>
            )}

            <select
              value={sort}
              onChange={(e) => handleFilterChange(setSort, e.target.value)}
              className="px-4 py-2 rounded-xl border border-border bg-white text-sm text-dark focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              {sortOptions.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {showFilters && (
          <div className="mb-6 p-4 bg-filter-bg rounded-2xl border border-[rgba(189,201,198,0.3)]">
            <div className="flex flex-wrap gap-4 items-end">
              <div>
                <label className="block text-xs font-medium text-body mb-1">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => handleFilterChange(setCategory, e.target.value)}
                  className="px-4 py-2 rounded-xl border border-border bg-white text-sm text-dark focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent min-w-[160px]"
                >
                  <option value="">All Categories</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-body mb-1">
                  Price Range
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    placeholder="Min"
                    value={minPrice}
                    onChange={(e) => handleFilterChange(setMinPrice, e.target.value)}
                    className="w-24 px-3 py-2 rounded-xl border border-border bg-white text-sm text-dark placeholder:text-placeholder focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                  <span className="text-body">—</span>
                  <input
                    type="number"
                    placeholder="Max"
                    value={maxPrice}
                    onChange={(e) => handleFilterChange(setMaxPrice, e.target.value)}
                    className="w-24 px-3 py-2 rounded-xl border border-border bg-white text-sm text-dark placeholder:text-placeholder focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-body mb-1">
                  Rating
                </label>
                <select
                  value={rating}
                  onChange={(e) => handleFilterChange(setRating, e.target.value)}
                  className="px-4 py-2 rounded-xl border border-border bg-white text-sm text-dark focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent min-w-[130px]"
                >
                  {ratingOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {loading
            ? Array.from({ length: 12 }).map((_, i) => <CardSkeleton key={i} />)
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

                      <h3 className="font-heading font-semibold text-lg text-dark leading-tight group-hover:text-primary transition-colors line-clamp-2">
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

        {!loading && tours.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-dark font-heading mb-2">
              No tours found
            </h3>
            <p className="text-body mb-6 max-w-md mx-auto">
              We couldn&apos;t find any tours matching your filters. Try adjusting your
              search criteria or browse all tours.
            </p>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="text-primary font-medium hover:text-primary-light transition-colors underline underline-offset-2"
              >
                Clear all filters
              </button>
            )}
          </div>
        )}

        {pagination && pagination.totalPages > 1 && (
          <div className="mt-12">
            <Pagination
              currentPage={pagination.page}
              totalPages={pagination.totalPages}
              onPageChange={(newPage) => {
                setPage(newPage);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            />
          </div>
        )}
      </section>
    </div>
  );
}
