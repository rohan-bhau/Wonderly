import Link from "next/link";
import Button from "@/components/ui/Button";

export default function CTABanner() {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="relative overflow-hidden rounded-2xl bg-dark p-8 md:p-16 text-center">
          <div className="absolute inset-0 opacity-[0.03]">
            <div
              className="w-full h-full"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 25% 25%, white 1px, transparent 1px), radial-gradient(circle at 75% 75%, white 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            />
          </div>

          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white font-heading leading-tight">
              Ready for Your Next Adventure?
            </h2>
            <p className="mt-4 text-lg text-white/70 max-w-lg mx-auto">
              Browse our curated collection of tours and start planning your dream trip today.
            </p>
            <div className="mt-8 flex items-center justify-center gap-4">
              <Link href="/tours">
                <Button
                  variant="secondary"
                  size="lg"
                  className="border-white bg-white text-dark hover:bg-white/90 hover:text-dark"
                >
                  Explore Tours
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  variant="secondary"
                  size="lg"
                  className="border-white/50 text-white hover:bg-white hover:text-primary"
                >
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
