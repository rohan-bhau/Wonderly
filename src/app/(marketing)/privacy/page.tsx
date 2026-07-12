import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy — Wanderly",
  description: "Wanderly privacy policy — how we collect, use, and protect your personal information.",
};

export default function PrivacyPage() {
  return (
    <div className="bg-surface min-h-screen py-12 md:py-20">
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-3xl md:text-4xl font-bold text-dark font-heading tracking-tight mb-6">
          Privacy Policy
        </h1>
        <p className="text-sm text-body/60 mb-8">Last updated: January 1, 2026</p>

        <div className="space-y-6 text-body leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-dark font-heading mb-3">1. Information We Collect</h2>
            <p>
              We collect information you provide directly to us, including your name, email address, and
              any other information you choose to provide when creating an account, booking a tour, or
              contacting us.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-dark font-heading mb-3">2. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Process your tour bookings and reservations</li>
              <li>Send you booking confirmations and updates</li>
              <li>Respond to your questions and support requests</li>
              <li>Send you promotional emails (with your consent)</li>
              <li>Improve our services and website experience</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-dark font-heading mb-3">3. Information Sharing</h2>
            <p>
              We do not sell, trade, or transfer your personal information to third parties without your
              consent, except as required by law or to provide our services (e.g., sharing booking details
              with tour operators).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-dark font-heading mb-3">4. Data Security</h2>
            <p>
              We implement reasonable security measures to protect your personal information. However, no
              method of transmission over the Internet is 100% secure, and we cannot guarantee absolute
              security.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-dark font-heading mb-3">5. Cookies</h2>
            <p>
              We use cookies and similar tracking technologies to enhance your browsing experience,
              analyze site traffic, and serve personalized content. You can control cookie preferences
              through your browser settings.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-dark font-heading mb-3">6. Your Rights</h2>
            <p>
              You have the right to access, update, or delete your personal information at any time.
              You may also opt out of marketing communications by clicking the unsubscribe link in our
              emails or contacting us directly.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-dark font-heading mb-3">7. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at{" "}
              <a href="mailto:privacy@wanderly.app" className="text-primary hover:underline">
                privacy@wanderly.app
              </a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
