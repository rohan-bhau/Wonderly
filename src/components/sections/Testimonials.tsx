"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const testimonials = [
  {
    name: "Alice Johnson",
    location: "New York, USA",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80",
    text: "Wanderly made our trip to the Amalfi Coast absolutely unforgettable. Every detail was perfectly planned, and the local guides were incredibly knowledgeable. We're already planning our next adventure with them!",
    rating: 5,
  },
  {
    name: "Marcus Chen",
    location: "London, UK",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80",
    text: "The Patagonia trek was life-changing. The gear was top-notch, the guides were experts, and the landscapes were beyond anything I could have imagined. Can't recommend Wanderly enough.",
    rating: 5,
  },
  {
    name: "Sophie Laurent",
    location: "Paris, France",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80",
    text: "I've traveled with many agencies, but Wanderly stands out for their attention to detail and authentic local experiences. The Tokyo food tour was a culinary dream come true!",
    rating: 5,
  },
  {
    name: "James Rodriguez",
    location: "Barcelona, Spain",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80",
    text: "Our Serengeti safari exceeded every expectation. The luxury camps were incredible, and witnessing the Great Migration up close was the most amazing experience of our lives.",
    rating: 5,
  },
  {
    name: "Emma Thompson",
    location: "Sydney, Australia",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&q=80",
    text: "The Bali retreat was exactly what I needed. Perfect balance of surfing, yoga, and cultural experiences. The team took care of everything so I could just relax and enjoy.",
    rating: 5,
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);

  const prev = () =>
    setCurrent((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  const next = () =>
    setCurrent((prev) =>
      prev === testimonials.length - 1 ? 0 : prev + 1
    );

  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-dark font-heading">
            What Our Travelers Say
          </h2>
          <p className="mt-3 text-body max-w-xl mx-auto">
            Real stories from real adventurers
          </p>
        </div>

        <div className="relative max-w-3xl mx-auto">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${current * 100}%)` }}
            >
              {testimonials.map((t, i) => (
                <div key={i} className="w-full shrink-0 px-4">
                  <div className="bg-white rounded-2xl shadow-sm p-8 text-center">
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className="w-16 h-16 rounded-full mx-auto object-cover"
                    />
                    <div className="flex justify-center gap-0.5 mt-4">
                      {Array.from({ length: t.rating }).map((_, j) => (
                        <Star
                          key={j}
                          className="w-4 h-4 fill-accent text-accent"
                        />
                      ))}
                    </div>
                    <p className="mt-4 text-body leading-relaxed italic">
                      &ldquo;{t.text}&rdquo;
                    </p>
                    <div className="mt-6">
                      <p className="font-semibold text-dark">{t.name}</p>
                      <p className="text-sm text-body">{t.location}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-body hover:text-primary transition-colors hidden md:flex"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-body hover:text-primary transition-colors hidden md:flex"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-2 h-2 rounded-full transition-all ${
                  i === current ? "bg-primary w-6" : "bg-border hover:bg-body/30"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
