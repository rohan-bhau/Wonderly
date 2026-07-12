import Hero from "@/components/sections/Hero";
import Categories from "@/components/sections/Categories";
import FeaturedTours from "@/components/sections/FeaturedTours";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import Stats from "@/components/sections/Stats";
import Testimonials from "@/components/sections/Testimonials";
import BlogHighlights from "@/components/sections/BlogHighlights";
import NewsletterSignup from "@/components/sections/NewsletterSignup";
import FAQ from "@/components/sections/FAQ";
import CTABanner from "@/components/sections/CTABanner";

export default function Home() {
  return (
    <>
      <Hero />
      <Categories />
      <FeaturedTours />
      <WhyChooseUs />
      <Stats />
      <Testimonials />
      <BlogHighlights />
      <NewsletterSignup />
      <FAQ />
      <CTABanner />
    </>
  );
}
