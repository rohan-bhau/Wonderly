"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import Button from "@/components/ui/Button";

const heroSlides = [
  {
    image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1600&q=80",
    alt: "Travel adventure",
  },
  {
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80",
    alt: "Mountain landscape",
  },
  {
    image: "https://images.unsplash.com/photo-1533104816931-20fa691ff6ca?w=1600&q=80",
    alt: "Coastal view",
  },
  {
    image: "https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=1600&q=80",
    alt: "Tropical beach",
  },
];

export default function Hero() {
  const router = useRouter();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [search, setSearch] = useState("");

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      router.push(`/tours?search=${encodeURIComponent(search.trim())}`);
    } else {
      router.push("/tours");
    }
  };

  return (
    <section className="relative h-[85vh] min-h-[600px] overflow-hidden">
      {heroSlides.map((slide, index) => (
        <div
          key={slide.image}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <div
            className="absolute inset-0 bg-cover bg-center scale-110"
            style={{
              backgroundImage: `url(${slide.image})`,
              transform: index === currentSlide ? "scale(1)" : "scale(1.1)",
              transition: "transform 7s ease-out",
            }}
          />
        </div>
      ))}
      <div className="absolute inset-0 bg-gradient-to-b from-dark/60 via-dark/40 to-dark/70" />

      <div className="relative z-10 h-full max-w-7xl mx-auto px-4 flex flex-col items-center justify-center text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white font-heading leading-tight max-w-4xl">
          Explore the World with Wanderly
        </h1>
        <p className="mt-4 text-lg md:text-xl text-white/80 max-w-2xl">
          Discover curated tours, unforgettable experiences, and your next great adventure.
        </p>

        <form
          onSubmit={handleSearch}
          className="mt-8 w-full max-w-2xl flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-2xl p-2 border border-white/20"
        >
          <div className="flex-1 flex items-center gap-2 px-4">
            <Search className="w-5 h-5 text-white/60 shrink-0" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Where do you want to go?"
              className="w-full bg-transparent text-white placeholder:text-white/50 text-sm focus:outline-none"
            />
          </div>
          <Button type="submit" size="md" className="shrink-0">
            Search Tours
          </Button>
        </form>

        <div className="mt-8 flex items-center gap-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentSlide
                  ? "bg-white w-8"
                  : "bg-white/40 hover:bg-white/60"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
