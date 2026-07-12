import { Shield, BadgeCheck, HeadphonesIcon, Lock } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Verified Agents",
    description:
      "All our travel partners are thoroughly vetted and certified for your safety and satisfaction.",
  },
  {
    icon: BadgeCheck,
    title: "Best Price Guarantee",
    description:
      "We match any legitimate price and offer the best value for premium travel experiences.",
  },
  {
    icon: HeadphonesIcon,
    title: "24/7 Support",
    description:
      "Our dedicated support team is available around the clock to assist you during your journey.",
  },
  {
    icon: Lock,
    title: "Secure Booking",
    description:
      "Your payments and personal data are protected with enterprise-grade encryption.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-dark font-heading">
            Why Choose Wanderly
          </h2>
          <p className="mt-3 text-body max-w-xl mx-auto">
            We make travel planning effortless and secure
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="text-center p-6 bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-14 h-14 mx-auto rounded-xl bg-primary/5 flex items-center justify-center mb-4">
                  <Icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-semibold text-dark text-lg">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm text-body leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
