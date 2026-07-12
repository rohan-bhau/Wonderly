"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Calendar, ArrowLeft, User } from "lucide-react";
import Button from "@/components/ui/Button";
import type { IBlogPost } from "@/types";

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [post, setPost] = useState<IBlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/blog/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setPost(data.data.post);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="bg-surface min-h-screen">
        <div className="max-w-3xl mx-auto px-4 py-12">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-border/50 rounded w-3/4" />
            <div className="h-4 bg-border/50 rounded w-1/4" />
            <div className="h-[400px] bg-border/50 rounded-2xl" />
            <div className="space-y-3">
              <div className="h-4 bg-border/50 rounded w-full" />
              <div className="h-4 bg-border/50 rounded w-full" />
              <div className="h-4 bg-border/50 rounded w-2/3" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="bg-surface min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-heading font-bold text-dark mb-2">Post not found</h1>
          <p className="text-body mb-6">The article you&apos;re looking for doesn&apos;t exist.</p>
          <Link href="/blog">
            <Button>Back to Blog</Button>
          </Link>
        </div>
      </div>
    );
  }

  const paragraphs = post.content.split("\n").filter(Boolean);

  return (
    <div className="bg-surface min-h-screen">
      <article className="max-w-3xl mx-auto px-4 py-12">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-body hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </Link>

        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-dark font-heading tracking-tight leading-tight mb-4">
            {post.title}
          </h1>
          <div className="flex items-center gap-4 text-sm text-body/60">
            <div className="flex items-center gap-1.5">
              <User className="w-4 h-4" />
              <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              <span>
                {new Date(post.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
          </div>
        </header>

        <div className="rounded-2xl overflow-hidden mb-10">
          <img
            src={post.coverImage || "/placeholder.svg"}
            alt={post.title}
            className="w-full h-[400px] object-cover"
          />
        </div>

        <div className="prose prose-gray max-w-none">
          {paragraphs.map((para, i) => {
            if (para.startsWith("## ")) {
              return (
                <h2 key={i} className="text-xl font-semibold text-dark font-heading mt-8 mb-3">
                  {para.replace("## ", "")}
                </h2>
              );
            }
            if (para.startsWith("- ")) {
              return (
                <li key={i} className="text-body leading-relaxed ml-4 list-disc">
                  {para.replace("- ", "")}
                </li>
              );
            }
            return (
              <p key={i} className="text-body leading-relaxed mb-4">
                {para}
              </p>
            );
          })}
        </div>
      </article>
    </div>
  );
}
