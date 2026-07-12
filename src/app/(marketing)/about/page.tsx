import type { Metadata } from "next";
import Link from "next/link";
import Button from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "About Us — Wanderly",
  description: "Learn about Wanderly's mission, our story, and the team behind curated travel experiences.",
};

const stats = [
  { value: "50+", label: "Destinations" },
  { value: "72K+", label: "Happy Travelers" },
  { value: "200+", label: "Curated Tours" },
  { value: "8+", label: "Years Experience" },
];

const team = [
  {
    name: "Sarah Mitchell",
    role: "CEO & Founder",
    image: "/placeholder.svg",
    description: "Former travel journalist with 15 years of industry experience.",
  },
  {
    name: "James Rodriguez",
    role: "Head of Curation",
    image: "/placeholder.svg",
    description: "Expert in crafting unique, authentic travel itineraries.",
  },
  {
    name: "Emma Chen",
    role: "Travel Operations",
    image: "/placeholder.svg",
    description: "Ensures every trip runs smoothly from start to finish.",
  },
  {
    name: "Michael Park",
    role: "Connecting Travelers",
    image: "/placeholder.svg",
    description: "Building a global community of passionate travelers.",
  },
];

export default function AboutPage() {
  return (
    <div className="bg-surface">
      <section className="bg-white pt-20 pb-16 md:pt-28 md:pb-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-[48px] font-bold text-dark font-heading tracking-tight leading-tight">
              About Wanderly
            </h1>
            <p className="mt-4 text-lg text-body leading-relaxed">
              We believe travel has the power to transform lives. Wanderly was founded to make
              extraordinary travel experiences accessible to everyone.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 -mt-6 relative z-10">
        <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-dark font-heading tracking-tight mb-4">
                Our Mission
              </h2>
              <p className="text-body leading-relaxed mb-4">
                At Wanderly, we connect travelers with curated, authentic experiences around the
                world. We partner with local experts to create tours that go beyond the typical
                tourist path, offering genuine cultural immersion and unforgettable memories.
              </p>
              <p className="text-body leading-relaxed mb-6">
                Every tour is carefully vetted, every guide is passionate, and every itinerary is
                designed to inspire. We handle the details so you can focus on the experience.
              </p>
              <Link href="/tours">
                <Button>Explore Tours</Button>
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl overflow-hidden">
                <img src="/placeholder.svg" alt="Travel experience" className="w-full h-48 object-cover" />
              </div>
              <div className="rounded-2xl overflow-hidden mt-8">
                <img src="/placeholder.svg" alt="Travel experience" className="w-full h-48 object-cover" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-16 md:py-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white rounded-2xl shadow-sm p-6 text-center">
              <p className="text-3xl md:text-4xl font-bold text-primary font-heading">{stat.value}</p>
              <p className="text-sm text-body mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-dark font-heading tracking-tight text-center mb-12">
            Meet Our Team
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member) => (
              <div key={member.name} className="bg-surface rounded-2xl p-6 text-center">
                <div className="w-20 h-20 rounded-full bg-primary/10 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-primary font-heading">
                    {member.name.split(" ").map((n) => n[0]).join("")}
                  </span>
                </div>
                <h3 className="font-heading font-semibold text-dark">{member.name}</h3>
                <p className="text-sm text-primary font-medium mt-1">{member.role}</p>
                <p className="text-sm text-body mt-2">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
