"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Calendar, ArrowRight } from "lucide-react";
import Card from "@/components/ui/Card";
import { CardSkeleton } from "@/components/ui/Skeleton";
import type { IBlogPost } from "@/types";

export default function BlogPage() {
  const [posts, setPosts] = useState<IBlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/blog")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setPosts(data.data.posts);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="bg-surface min-h-screen">
      <section className="bg-white pt-20 pb-16 md:pt-28 md:pb-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-[48px] font-bold text-dark font-heading tracking-tight leading-tight">
              Travel Blog
            </h1>
            <p className="mt-4 text-lg text-body">
              Stories, guides, and tips from travelers around the world.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 -mt-6 relative z-10 pb-16">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-sm">
            <h3 className="text-xl font-semibold text-dark font-heading mb-2">No posts yet</h3>
            <p className="text-body">Check back soon for new travel stories!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Link key={post._id} href={`/blog/${post.slug}`} className="group">
                <Card className="overflow-hidden h-full flex flex-col">
                  <div className="relative overflow-hidden">
                    <img
                      src={post.coverImage || "/placeholder.svg"}
                      alt={post.title}
                      className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-5 flex-1 flex flex-col gap-3">
                    <div className="flex items-center gap-2 text-xs text-body/60">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>
                        {new Date(post.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                      <span>•</span>
                      <span>{post.author}</span>
                    </div>
                    <h3 className="font-heading font-semibold text-lg text-dark leading-tight group-hover:text-primary transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-sm text-body line-clamp-3 flex-1">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center gap-1 text-sm font-medium text-primary group-hover:gap-2 transition-all">
                      Read More
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
