"use client";

import { useState } from "react";
import { submitInquiry } from "@/features/inquiries/actions";

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);

    const formData = new FormData(e.currentTarget);
    const result = await submitInquiry(formData);

    if (result.success) {
      setMessage({ type: "success", text: result.message || "Success!" });
      (e.target as HTMLFormElement).reset();
    } else {
      setMessage({ type: "error", text: result.error || "An error occurred." });
    }

    setIsSubmitting(false);
  }

  return (
    <div className="bg-white p-8 lg:p-10 rounded-[32px] shadow-[0_20px_60px_rgb(0,0,0,0.06)] border border-[#E9E4DF]">
      <h3 className="text-2xl font-normal text-[#0B4D2B] mb-6" style={{ fontFamily: "var(--font-serif), serif" }}>
        Send us a Message
      </h3>
      
      {message && (
        <div className={`p-4 rounded-xl mb-6 text-sm font-medium ${message.type === "success" ? "bg-green-50 text-green-800 border border-green-200" : "bg-red-50 text-red-800 border border-red-200"}`}>
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-[#4a524d] mb-2">Full Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="w-full px-5 py-3.5 bg-[#F8F5EE] border border-[#E9E4DF] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C9A227] focus:border-transparent transition-all"
            placeholder="John Doe"
          />
        </div>
        
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-[#4a524d] mb-2">Phone Number *</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            required
            className="w-full px-5 py-3.5 bg-[#F8F5EE] border border-[#E9E4DF] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C9A227] focus:border-transparent transition-all"
            placeholder="+91 98765 43210"
          />
        </div>
        
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-[#4a524d] mb-2">Message *</label>
          <textarea
            id="message"
            name="message"
            rows={4}
            required
            className="w-full px-5 py-3.5 bg-[#F8F5EE] border border-[#E9E4DF] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C9A227] focus:border-transparent transition-all resize-none"
            placeholder="How can we help you?"
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-[#0B4D2B] text-white font-semibold tracking-wide py-4 rounded-xl hover:bg-[#C9A227] hover:shadow-lg transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed mt-2"
        >
          {isSubmitting ? "Sending..." : "Submit Inquiry"}
        </button>
      </form>
    </div>
  );
}
