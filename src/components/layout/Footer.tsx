"use client";

import { useState } from "react";
import Link from "next/link";
import { Mail, Phone, Send } from "lucide-react";
import Button from "@/components/ui/Button";

const sitemap = {
  Explore: [
    { href: "/tours", label: "All Tours" },
    { href: "/tours?category=Adventure", label: "Adventure" },
    { href: "/tours?category=Beach", label: "Beach" },
    { href: "/tours?category=Mountain", label: "Mountain" },
    { href: "/tours?category=City", label: "City Tours" },
  ],
  Company: [
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact" },
    { href: "/blog", label: "Blog" },
    { href: "/privacy", label: "Privacy Policy" },
    { href: "/terms", label: "Terms & Conditions" },
  ],
  Support: [
    { href: "/contact", label: "Help Center" },
    { href: "/contact", label: "FAQs" },
    { href: "/contact", label: "24/7 Support" },
  ],
};

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <footer className="bg-dark text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="text-xl font-bold text-white font-heading">
              Wanderly
            </Link>
            <p className="mt-3 text-sm text-white/70 max-w-xs">
              Discover curated tours and unforgettable travel experiences around the world.
            </p>
            <div className="mt-4 space-y-2">
              <div className="flex items-center gap-2 text-sm text-white/70">
                <Mail className="w-4 h-4" />
                <span>hello@wanderly.app</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-white/70">
                <Phone className="w-4 h-4" />
                <span>+1 (555) 123-4567</span>
              </div>
            </div>
          </div>
          {Object.entries(sitemap).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-sm font-semibold text-white mb-3">{title}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/70 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-8 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <form
            onSubmit={handleNewsletter}
            className="flex items-center gap-2 w-full md:w-auto"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email for updates"
              className="px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-sm text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-primary w-full md:w-64"
            />
            <Button type="submit" size="sm">
              <Send className="w-4 h-4" />
            </Button>
          </form>
          <p className="text-sm text-white/50">
            &copy; {new Date().getFullYear()} Wanderly. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
