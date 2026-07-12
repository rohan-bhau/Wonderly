"use client";

import { useState } from "react";
import { Send, CheckCircle, AlertCircle } from "lucide-react";
import Button from "@/components/ui/Button";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus("success");
        setMessage("You're subscribed! Check your inbox for updates.");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.message || "Something went wrong.");
      }
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  };

  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary to-primary-light p-8 md:p-12 text-center">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-white" />
            <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full bg-white" />
          </div>

          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white font-heading">
              Stay Inspired
            </h2>
            <p className="mt-3 text-white/80">
              Subscribe to our newsletter for travel tips, exclusive deals, and new tour announcements.
            </p>

            <form
              onSubmit={handleSubmit}
              className="mt-8 flex flex-col sm:flex-row items-center gap-3 max-w-lg mx-auto"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                disabled={status === "loading"}
                className="flex-1 w-full px-5 py-3 rounded-xl bg-white/10 border border-white/20 text-sm text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 disabled:opacity-50"
              />
              <Button
                type="submit"
                size="md"
                variant="ghost"
                disabled={status === "loading" || !email.trim()}
                className="bg-white text-primary font-semibold hover:bg-white/90 shrink-0 w-full sm:w-auto"
              >
                {status === "loading" ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                    Subscribing...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Send className="w-4 h-4" />
                    Subscribe
                  </span>
                )}
              </Button>
            </form>

            {status === "success" && (
              <div className="mt-4 flex items-center justify-center gap-2 text-sm text-white">
                <CheckCircle className="w-4 h-4" />
                {message}
              </div>
            )}
            {status === "error" && (
              <div className="mt-4 flex items-center justify-center gap-2 text-sm text-red-200">
                <AlertCircle className="w-4 h-4" />
                {message}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
