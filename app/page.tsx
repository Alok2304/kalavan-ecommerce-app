import type { Metadata } from "next";
import ArtisanStory from "@/components/ArtisanStory";
import CategorySection from "@/components/CategorySection";
import CraftsSection from "@/components/CraftsSection";
import CraftStory from "@/components/CraftStory";
import FeaturedProducts from "@/components/FeaturedProducts";
import Hero from "@/components/Hero";
import Newsletter from "@/components/Newsletter";
import TrustSection from "@/components/TrustSection";

export const metadata: Metadata = {
  title: "Kalavana | Handmade Crafts from Maharashtra",
  description:
    "Discover authentic handmade crafts and meet the artisans who keep Maharashtra's living traditions alive.",
};

const page = () => {
  return (
    <main className="pt-22">
      <Hero />
      <CategorySection />
      <FeaturedProducts />
      <ArtisanStory />
      <CraftsSection />
      <CraftStory />
      <TrustSection />
      <Newsletter />
      <section className="bg-ivory-dark px-6 py-14 lg:px-[6vw] lg:py-16">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 border border-sand-dark bg-ivory p-7 sm:flex-row sm:items-center sm:p-10">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-terracotta">Your voice matters</p>
            <h2 className="mt-3 font-serif text-2xl font-semibold text-charcoal sm:text-3xl">How was your experience?</h2>
            <p className="mt-2 text-sm leading-6 text-muted">Share a little feedback and help us make Kalavana better for everyone.</p>
          </div>
          <a href="/feedback" className="inline-flex min-h-12 shrink-0 items-center justify-center bg-charcoal px-7 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-ivory transition-colors hover:bg-terracotta focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-terracotta">
            Share feedback
          </a>
        </div>
      </section>
    </main>
  );
};

export default page;
