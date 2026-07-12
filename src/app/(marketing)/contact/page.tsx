"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, Phone, MapPin, Send, CheckCircle } from "lucide-react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactInput = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
  });

  async function onSubmit(data: ContactInput) {
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) {
        setError(json.message || "Failed to send message");
        return;
      }
      setSubmitted(true);
    } catch {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-surface min-h-screen">
      <section className="bg-white pt-20 pb-16 md:pt-28 md:pb-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-[48px] font-bold text-dark font-heading tracking-tight leading-tight">
              Contact Us
            </h1>
            <p className="mt-4 text-lg text-body">
              Have a question or need help planning your trip? We&apos;d love to hear from you.
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 -mt-6 relative z-10 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm p-8">
              {submitted ? (
                <div className="text-center py-12">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-dark font-heading mb-2">
                    Message Sent!
                  </h3>
                  <p className="text-body mb-6">
                    Thank you for reaching out. We&apos;ll get back to you within 24 hours.
                  </p>
                  <Button onClick={() => setSubmitted(false)} variant="secondary">
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <h2 className="text-xl font-semibold text-dark font-heading mb-4">
                    Send us a message
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="Name"
                      placeholder="Your name"
                      error={errors.name?.message}
                      {...register("name")}
                    />
                    <Input
                      label="Email"
                      type="email"
                      placeholder="you@example.com"
                      error={errors.email?.message}
                      {...register("email")}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-dark mb-1">Message</label>
                    <textarea
                      {...register("message")}
                      rows={6}
                      placeholder="Tell us how we can help..."
                      className="w-full rounded-xl border border-border bg-white px-4 py-2.5 text-sm text-dark placeholder:text-placeholder focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                    />
                    {errors.message && (
                      <p className="mt-1 text-xs text-red-500">{errors.message.message}</p>
                    )}
                  </div>
                  {error && (
                    <p className="text-sm text-red-500">{error}</p>
                  )}
                  <Button type="submit" size="lg" disabled={loading}>
                    <Send className="w-4 h-4 mr-2" />
                    {loading ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="font-heading font-semibold text-dark mb-4">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-dark">Email</p>
                    <p className="text-sm text-body">hello@wanderly.app</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-dark">Phone</p>
                    <p className="text-sm text-body">+1 (555) 123-4567</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-dark">Office</p>
                    <p className="text-sm text-body">
                      123 Travel Street, Suite 100<br />
                      New York, NY 10001
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h3 className="font-heading font-semibold text-dark mb-2">Office Hours</h3>
              <div className="space-y-2 text-sm text-body">
                <div className="flex justify-between">
                  <span>Mon – Fri</span>
                  <span className="font-medium text-dark">9:00 AM – 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span className="font-medium text-dark">10:00 AM – 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span className="font-medium text-dark">Closed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
