"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "How do I book a tour with Wanderly?",
    answer:
      "Simply browse our tours, use the filters to find your perfect trip, and click on any tour to view details. From there, you can proceed with the booking process. If you need assistance, our 24/7 support team is always ready to help.",
  },
  {
    question: "Can I cancel or modify my booking?",
    answer:
      "Yes, you can cancel or modify your booking up to 14 days before the departure date for a full refund. For cancellations within 14 days, partial refunds may apply depending on the specific tour policy. Contact our support team for assistance.",
  },
  {
    question: "What is included in the tour price?",
    answer:
      "Each tour page lists detailed inclusions and exclusions. Generally, accommodation, meals as specified, professional guides, and activity fees are included. Flights, travel insurance, and personal expenses are typically not included unless stated otherwise.",
  },
  {
    question: "How do I know if a tour is right for my fitness level?",
    answer:
      "Each tour is labeled with a difficulty level: Easy, Moderate, or Challenging. The tour description includes detailed information about physical requirements, terrain, and daily activities. Contact us if you need personalized advice.",
  },
  {
    question: "Is travel insurance required?",
    answer:
      "While not mandatory for all tours, we strongly recommend purchasing comprehensive travel insurance that covers medical emergencies, trip cancellation, and personal belongings. Some adventure tours may require proof of insurance before departure.",
  },
  {
    question: "Do you offer group discounts?",
    answer:
      "Yes, we offer group discounts for parties of 6 or more people booking the same tour. Contact our sales team for a custom quote. Private tour options are also available for larger groups.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 md:py-24 bg-surface">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-dark font-heading">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-body max-w-xl mx-auto">
            Everything you need to know before your journey
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-sm overflow-hidden"
            >
              <button
                onClick={() => toggle(index)}
                className="w-full flex items-center justify-between px-6 py-5 text-left transition-colors hover:bg-surface/50"
              >
                <span className="font-medium text-dark pr-4">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-body shrink-0 transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`transition-all duration-300 overflow-hidden ${
                  openIndex === index ? "max-h-96" : "max-h-0"
                }`}
              >
                <p className="px-6 pb-5 text-sm text-body leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
