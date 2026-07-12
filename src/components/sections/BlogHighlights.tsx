"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { Skeleton } from "@/components/ui/Skeleton";
import type { IBlogPost } from "@/types";

export default function BlogHighlights() {
  const [posts, setPosts] = useState<IBlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/blog?limit=3")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setPosts(data.data.posts);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const formatDate = (date: Date | string) =>
    new Date(date).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });

  return (
    <section className="py-16 md:py-24 bg-surface">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-dark font-heading">
              Travel Blog
            </h2>
            <p className="mt-3 text-body max-w-xl">
              Tips, guides, and stories from our travel experts
            </p>
          </div>
          <Link
            href="/blog"
            className="hidden md:flex items-center gap-2 text-sm font-medium text-primary hover:text-primary-light transition-colors"
          >
            Read All Articles
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {loading
            ? Array.from({ length: 3 }).map((_, i) => (
                <Card key={i} className="overflow-hidden">
                  <Skeleton className="h-48 w-full rounded-none" />
                  <div className="p-5 space-y-3">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-5 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-3/4" />
                  </div>
                </Card>
              ))
            : posts.map((post) => (
                <Link key={post._id} href={`/blog/${post.slug}`} className="group">
                  <Card className="overflow-hidden h-full flex flex-col">
                    <div className="overflow-hidden">
                      <img
                        src={post.coverImage || "/placeholder.svg"}
                        alt={post.title}
                        className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-5 flex-1 flex flex-col">
                      <div className="flex items-center gap-2 text-xs text-body mb-3">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{formatDate(post.createdAt)}</span>
                      </div>
                      <h3 className="font-heading font-semibold text-lg text-dark group-hover:text-primary transition-colors leading-tight">
                        {post.title}
                      </h3>
                      <p className="mt-2 text-sm text-body line-clamp-2 flex-1">
                        {post.excerpt}
                      </p>
                      <div className="mt-4 flex items-center gap-1 text-sm font-medium text-primary">
                        Read More
                        <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </Card>
                </Link>
              ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <Link href="/blog">
            <Button variant="secondary">Read All Articles</Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
