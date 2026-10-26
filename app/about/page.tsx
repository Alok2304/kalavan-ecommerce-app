import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About Kalavana | Made by Maharashtra",
  description:
    "Learn how Kalavana connects Maharashtra’s artisan communities with people who value authentic craft, fair livelihoods and living traditions.",
};

const values = [
  {
    number: "01",
    title: "Authenticity first",
    description:
      "Every craft is sourced directly from verified makers and carries the story of its material, place and tradition.",
  },
  {
    number: "02",
    title: "Artisans at the centre",
    description:
      "We build transparent partnerships that respect the maker’s time, knowledge and right to a fair livelihood.",
  },
  {
    number: "03",
    title: "Tradition, kept alive",
    description:
      "Each purchase helps sustain skills passed through generations and makes room for them in contemporary homes.",
  },
];

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-ivory">
      <main className="pt-22">
        <section className="px-6 py-16 lg:px-[6vw] lg:py-24">
          <div className="mx-auto max-w-7xl">
            {/* <nav aria-label="Breadcrumb" className="mb-12">
              <ol className="flex items-center gap-2 text-xs tracking-wide text-muted">
                <li>
                  <Link
                    href="/"
                    className="transition-colors hover:text-terracotta"
                  >
                    Home
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li className="text-charcoal">About</li>
              </ol>
            </nav> */}

            <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
              <div>
                <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-terracotta">
                  Our story
                </p>
                <h1 className="font-serif text-5xl font-semibold leading-[1.08] text-charcoal sm:text-6xl">
                  Made by Maharashtra.
                  <br />
                  <em className="font-normal text-terracotta">
                    Shared with the world.
                  </em>
                </h1>
                <p className="mt-7 max-w-xl text-base leading-8 text-muted">
                  Kalavana is a home for authentic Maharashtrian craft. We bring
                  independent artisans and thoughtful customers together, so
                  every handmade object can be valued for the skill, culture and
                  human story it carries.
                </p>
                <Link
                  href="/crafts"
                  className="mt-9 inline-flex items-center gap-3 bg-charcoal px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.14em] text-ivory transition-colors hover:bg-terracotta"
                >
                  Explore the crafts
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    aria-hidden="true"
                  >
                    <path
                      d="M5 12h14M13 6l6 6-6 6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
              </div>

              <div className="relative">
                <div className="aspect-4/5 overflow-hidden bg-sand">
                  <Image
                    src="https://images.unsplash.com/photo-1546360521-3bd663cc4374?auto=format&fit=crop&w=1200&q=85"
                    alt="Portrait of a Maharashtrian man wearing a traditional yellow turban"
                    className="h-full w-full object-cover"
                    width={1200}
                    height={1500}
                  />
                </div>
                <div className="absolute -bottom-5 -left-5 hidden max-w-56 bg-terracotta px-6 py-5 text-ivory shadow-lg sm:block">
                  <p className="font-serif text-xl leading-snug">
                    Craft is culture held in human hands.
                  </p>
                </div>
                {/* <p className="mt-3 text-right text-[10px] tracking-wide text-muted">
                  Photograph by Atharva Tulsi on Unsplash
                </p> */}
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-sand-dark bg-ivory-dark px-6 py-16 lg:px-[6vw] lg:py-20">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-terracotta">
                Why we exist
              </p>
              <h2 className="mt-4 font-serif text-3xl font-semibold text-charcoal lg:text-4xl">
                More than a marketplace
              </h2>
            </div>
            <div className="grid gap-6 text-base leading-8 text-muted sm:grid-cols-2">
              <p>
                Maharashtra’s craft traditions are shaped by generations of
                knowledge, yet many skilled makers remain separated from the
                people who value their work.
              </p>
              <p>
                We make that connection direct and transparent—helping artisans
                reach wider audiences while giving every customer confidence in
                where their craft came from.
              </p>
            </div>
          </div>
        </section>

        <section className="px-6 py-20 lg:px-[6vw] lg:py-28">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 max-w-xl">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-terracotta">
                What guides us
              </p>
              <h2 className="mt-4 font-serif text-3xl font-semibold text-charcoal lg:text-4xl">
                Thoughtful by design
              </h2>
            </div>

            <div className="grid border-y border-sand-dark md:grid-cols-3">
              {values.map((value, index) => (
                <article
                  key={value.number}
                  className={`py-8 md:px-8 md:py-10 ${index > 0 ? "border-t border-sand-dark md:border-l md:border-t-0" : ""}`}
                >
                  <p className="text-xs font-semibold tracking-[0.2em] text-terracotta">
                    {value.number}
                  </p>
                  <h3 className="mt-7 font-serif text-2xl font-semibold text-charcoal">
                    {value.title}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-muted">
                    {value.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-charcoal px-6 py-16 text-center lg:px-[6vw] lg:py-20">
          <div className="mx-auto max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-terracotta-light">
              Discover something meaningful
            </p>
            <h2 className="mt-5 font-serif text-3xl font-semibold text-ivory sm:text-4xl">
              Bring home a piece of living tradition
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-sand-dark">
              Meet the makers, understand the process and choose a craft that
              was made to last.
            </p>
            <Link
              href="/crafts"
              className="mt-8 inline-flex border border-sand-dark px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.14em] text-ivory transition-colors hover:border-terracotta hover:bg-terracotta"
            >
              Shop all crafts
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AboutPage;
