import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms & Conditions — Wanderly",
  description: "Wanderly terms and conditions — rules and guidelines for using our services.",
};

export default function TermsPage() {
  return (
    <div className="bg-surface min-h-screen py-12 md:py-20">
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-bold text-dark font-heading tracking-tight mb-6">
          Terms & Conditions
        </h1>
        <p className="text-sm text-body/60 mb-8">Last updated: January 1, 2026</p>

        <div className="space-y-6 text-body leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-dark font-heading mb-3">1. Acceptance of Terms</h2>
            <p>
              By accessing or using Wanderly, you agree to be bound by these Terms and Conditions. If you
              do not agree with any part of these terms, you may not use our services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-dark font-heading mb-3">2. Booking and Payment</h2>
            <p>
              All tour bookings are subject to availability and confirmation. Prices are listed in USD and
              may change without notice. Full payment is required to secure your booking.
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>A 30% deposit is required at the time of booking</li>
              <li>The remaining balance is due 30 days before departure</li>
              <li>Bookings made within 30 days of departure require full payment</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-dark font-heading mb-3">3. Cancellation Policy</h2>
            <p>
              Cancellations must be submitted in writing via email. Refunds are processed as follows:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>60+ days before departure: Full refund minus $100 processing fee</li>
              <li>30-59 days before departure: 50% refund</li>
              <li>Less than 30 days: No refund</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-dark font-heading mb-3">4. User Responsibilities</h2>
            <p>As a user of Wanderly, you agree to:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Provide accurate and complete information when booking</li>
              <li>Obtain necessary travel documents (passport, visas, etc.)</li>
              <li>Follow all safety instructions provided by tour guides</li>
              <li>Not engage in illegal or disruptive behavior during tours</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-dark font-heading mb-3">5. Limitation of Liability</h2>
            <p>
              Wanderly acts as an intermediary between travelers and tour operators. We are not liable for
              acts of God, weather conditions, political instability, or other events beyond our control.
              Our liability is limited to the cost of the tour booking.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-dark font-heading mb-3">6. Modifications</h2>
            <p>
              We reserve the right to modify these terms at any time. Changes will be effective immediately
              upon posting. Continued use of our services after changes constitutes acceptance of the new
              terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-dark font-heading mb-3">7. Contact</h2>
            <p>
              For questions about these terms, contact us at{" "}
              <a href="mailto:legal@wanderly.app" className="text-primary hover:underline">
                legal@wanderly.app
              </a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
