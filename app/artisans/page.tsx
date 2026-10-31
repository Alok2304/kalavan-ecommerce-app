import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { crafts } from "@/lib/crafts";

export const metadata: Metadata = {
  title: "Meet the Artisans | Kalavana",
  description:
    "Meet the independent studios and artisan collectives behind Kalavana's handmade crafts from across Maharashtra.",
};

const artisans = Array.from(
  crafts
    .reduce((groups, craft) => {
      const group = groups.get(craft.artisan) ?? [];
      group.push(craft);
      groups.set(craft.artisan, group);
      return groups;
    }, new Map<string, typeof crafts>())
    .entries(),
).map(([name, work]) => ({ name, work }));

function ArtisanCard({ artisan }: { artisan: (typeof artisans)[number] }) {
  const featuredCraft = artisan.work[0];

  return (
    <article className="group border-b border-sand-dark pb-7">
      <Link
        href={`/crafts/${featuredCraft.slug}`}
        className="relative block aspect-4/3 overflow-hidden bg-sand"
        aria-label={`Explore work by ${artisan.name}`}
      >
        <Image
          src={featuredCraft.image}
          alt={featuredCraft.alt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <span className="absolute bottom-3 left-3 bg-ivory/95 px-3 py-1.5 text-xs font-medium text-charcoal">
          {featuredCraft.place}
        </span>
      </Link>

      <div className="pt-5">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-terracotta">
          {artisan.work.length > 1
            ? `${artisan.work.length} crafts in the collection`
            : "Independent maker"}
        </p>
        <h2 className="mt-2 font-serif text-2xl font-semibold text-charcoal">
          {artisan.name}
        </h2>
        <p className="mt-3 text-sm leading-6 text-muted">
          {artisan.work.map((craft) => craft.title).join(" · ")}
        </p>
        <Link
          href={`/crafts/${featuredCraft.slug}`}
          className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-charcoal transition-colors hover:text-terracotta"
        >
          Explore their work
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </article>
  );
}

export default function ArtisansPage() {
  return (
    <main className="min-h-screen bg-ivory pb-24 pt-22 lg:pb-32">
      <header className="border-b border-sand-dark bg-ivory-dark px-6 py-16 lg:px-[6vw] lg:py-24">
        <div className="mx-auto max-w-7xl">
          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-terracotta">
            The people behind the making
          </p>
          <div className="grid items-end gap-7 lg:grid-cols-[1fr_auto]">
            <div>
              <h1 className="max-w-3xl font-serif text-4xl font-semibold leading-tight text-charcoal sm:text-5xl lg:text-6xl">
                Meet the artisans
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-charcoal">
                Get to know the independent studios and collectives carrying
                Maharashtra’s craft traditions forward, one handmade piece at a
                time.
              </p>
            </div>
            {/* <p className="text-sm text-muted">
              <span className="font-semibold text-charcoal">{artisans.length}</span> artisan partners
            </p> */}
          </div>
        </div>
      </header>

      <section
        className="px-6 pt-12 lg:px-[6vw] lg:pt-16"
        aria-labelledby="artisan-list-heading"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-9 border-b border-sand-dark pb-5">
            <h2
              id="artisan-list-heading"
              className="font-serif text-2xl font-semibold text-charcoal"
            >
              Our artisan partners
            </h2>
            <p className="mt-2 text-sm text-muted">
              Browse makers by name, home, and the crafts they create.
            </p>
          </div>
          <div className="grid gap-x-7 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-9">
            {artisans.map((artisan) => (
              <ArtisanCard key={artisan.name} artisan={artisan} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
