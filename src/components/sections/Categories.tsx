import Link from "next/link";
import {
  Mountain,
  Palmtree,
  Trees,
  Landmark,
  PawPrint,
  Building2,
} from "lucide-react";

const categories = [
  { name: "Adventure", icon: Mountain, description: "Thrilling expeditions" },
  { name: "Beach", icon: Palmtree, description: "Coastal relaxation" },
  { name: "Mountain", icon: Trees, description: "Peak experiences" },
  { name: "Cultural", icon: Landmark, description: "Heritage & tradition" },
  { name: "Wildlife", icon: PawPrint, description: "Nature encounters" },
  { name: "City", icon: Building2, description: "Urban exploration" },
];

export default function Categories() {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-dark font-heading">
            Popular Categories
          </h2>
          <p className="mt-3 text-body max-w-xl mx-auto">
            Find your perfect adventure across our curated travel categories
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.name}
                href={`/tours?category=${cat.name}`}
                className="group flex flex-col items-center gap-3 p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-all hover:-translate-y-1"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/5 flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                  <Icon className="w-7 h-7 text-primary" />
                </div>
                <div className="text-center">
                  <h3 className="font-semibold text-dark text-sm">{cat.name}</h3>
                  <p className="text-xs text-body mt-0.5">{cat.description}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
