"use client";

import { useState, type FormEvent } from "react";

const fieldClass =
  "mt-2 w-full border border-sand-dark bg-ivory px-4 py-3 text-sm text-charcoal outline-none transition focus:border-terracotta focus:ring-2 focus:ring-terracotta/20";

export default function FeedbackPage() {
  const [status, setStatus] = useState("");
  const [error, setError] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formElement = event.currentTarget;
    setSubmitting(true);
    setStatus("");
    const form = new FormData(formElement);
    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.get("name"),
          email: form.get("email"),
          rating: Number(form.get("rating")),
          topic: form.get("topic"),
          message: form.get("message"),
        }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error);
      setError(false);
      setStatus(result.message);
      formElement.reset();
    } catch (cause) {
      setError(true);
      setStatus(
        cause instanceof Error
          ? cause.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-ivory px-6 pb-20 pt-32 lg:px-[6vw]">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <section className="pt-4">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-terracotta">
            We’re listening
          </p>
          <h1 className="mt-5 font-serif text-5xl font-semibold leading-tight text-charcoal sm:text-6xl">
            Help us make it{" "}
            <em className="font-normal text-terracotta">better.</em>
          </h1>
          <p className="mt-6 max-w-md text-base leading-8 text-muted">
            Tell us how your experience with Kalavana has been. Your thoughts
            help us create a more thoughtful way to discover Maharashtra’s
            handmade crafts.
          </p>
          <p className="mt-8 border-l-2 border-terracotta pl-4 font-serif text-lg italic text-charcoal">
            Every note is read by our team. Thank you for being here.
          </p>
        </section>

        <form
          onSubmit={submit}
          className="border border-sand-dark bg-white/70 p-6 sm:p-9"
        >
          <div className="mb-7 border-b border-sand pb-5">
            <p className="text-xs uppercase tracking-[0.18em] text-muted">
              Your experience
            </p>
            <h2 className="mt-2 font-serif text-2xl font-semibold text-charcoal">
              Share your feedback
            </h2>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="text-sm font-medium text-charcoal">
              Your name <span className="text-terracotta">*</span>
              <input
                className={fieldClass}
                name="name"
                autoComplete="name"
                maxLength={100}
                required
              />
            </label>
            <label className="text-sm font-medium text-charcoal">
              Email address <span className="text-terracotta">*</span>
              <input
                className={fieldClass}
                type="email"
                name="email"
                autoComplete="email"
                maxLength={254}
                required
              />
            </label>
            <label className="text-sm font-medium text-charcoal">
              How was your experience?{" "}
              <span className="text-terracotta">*</span>
              <select
                className={fieldClass}
                name="rating"
                defaultValue=""
                required
              >
                <option value="" disabled>
                  Select a rating
                </option>
                <option value="5">5 — Excellent</option>
                <option value="4">4 — Very good</option>
                <option value="3">3 — Good</option>
                <option value="2">2 — Could be better</option>
                <option value="1">1 — Poor</option>
              </select>
            </label>
            <label className="text-sm font-medium text-charcoal">
              What is this about? <span className="text-terracotta">*</span>
              <select
                className={fieldClass}
                name="topic"
                defaultValue="Overall experience"
                required
              >
                <option>Overall experience</option>
                <option>Shopping and checkout</option>
                <option>Product information</option>
                <option>Website design and usability</option>
                <option>Other</option>
              </select>
            </label>
          </div>
          <label className="mt-5 block text-sm font-medium text-charcoal">
            Tell us more <span className="text-terracotta">*</span>
            <textarea
              className={`${fieldClass} min-h-36 resize-y`}
              name="message"
              minLength={10}
              maxLength={2000}
              placeholder="What worked well? What could we improve?"
              required
            />
          </label>
          <p className="mt-3 text-xs leading-5 text-charcoal">
            Your name and email help us follow up if needed. We’ll only use
            these details to understand your feedback.
          </p>
          {status && (
            <p
              role="status"
              aria-live="polite"
              className={`mt-5 text-sm ${error ? "text-red-700" : "text-green-800"}`}
            >
              {status}
            </p>
          )}
          <button
            disabled={submitting}
            className="mt-6 inline-flex items-center justify-center bg-charcoal px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.14em] text-ivory transition-colors hover:bg-terracotta disabled:cursor-wait disabled:opacity-60"
          >
            {submitting ? "Sending…" : "Send feedback"}
          </button>
        </form>
      </div>
    </main>
  );
}
