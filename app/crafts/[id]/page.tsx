import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Kaas Floral Paithani | Kalavana",
  description:
    "Discover the Kaas Floral Paithani, handwoven in pure mulberry silk by master artisans in Yeola, Maharashtra.",
};

const specifications = [
  ["Material", "Pure mulberry silk"],
  ["Weave", "Traditional handloom Paithani"],
  ["Motif", "Kaas florals with peacock border"],
  ["Length", "6.2 m, including blouse piece"],
  ["Weight", "Approximately 720 g"],
  ["Origin", "Yeola, Maharashtra"],
  ["Craft time", "28 days"],
  ["Care", "Dry clean only"],
];

const productImages = [
  {
    src: "https://images.unsplash.com/photo-1717586756136-d9a3eeb1fa6f?auto=format&fit=crop&w=1400&q=85",
    alt: "Close detail of a richly woven floral Indian textile",
  },
  {
    src: "https://images.unsplash.com/photo-1588140686379-1b76a52103dc?auto=format&fit=crop&w=700&q=85",
    alt: "Detailed red, white and blue handwoven textile",
  },
  {
    src: "https://images.unsplash.com/photo-1640292343595-889db1c8262e?auto=format&fit=crop&w=700&q=85",
    alt: "Artisan working at a traditional weaving loom",
  },
];

function Rating() {
  return (
    <div className="flex items-center gap-2" aria-label="Rated 4.8 out of 5">
      <div className="flex items-center gap-0.5 text-terracotta">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="m12 2.4 2.87 5.82 6.42.93-4.65 4.53 1.1 6.4L12 17.06l-5.74 3.02 1.1-6.4-4.65-4.53 6.42-.93L12 2.4Z" />
          </svg>
        ))}
      </div>
      <span className="text-sm text-muted">4.8 · 124 reviews</span>
    </div>
  );
}

const page = () => {
  return (
    <div className="min-h-screen bg-ivory">
      <main className="px-6 pb-24 pt-32 lg:px-[6vw] lg:pb-32">
        <nav aria-label="Breadcrumb" className="mx-auto mb-8 max-w-7xl">
          <ol className="flex flex-wrap items-center gap-2 text-xs tracking-wide text-muted">
            <li>
              <Link
                href="/"
                className="transition-colors hover:text-terracotta"
              >
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link
                href="#"
                className="transition-colors hover:text-terracotta"
              >
                Textiles
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-charcoal">Kaas Floral Paithani</li>
          </ol>
        </nav>

        <section className="mx-auto grid max-w-7xl items-start gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(24rem,0.85fr)] lg:gap-16">
          {/* Product gallery */}
          <div className="min-w-0">
            <div className="group relative aspect-4/5 overflow-hidden bg-sand">
              <Image
                src={productImages[0].src}
                alt={productImages[0].alt}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
								width={1400}
								height={1750}
              />
              <div className="absolute left-4 top-4 bg-ivory/95 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-terracotta">
                Handwoven
              </div>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-4">
              {productImages.map((image, index) => (
                <div
                  key={image.src}
                  className={`aspect-square overflow-hidden bg-sand ${index === 0 ? "ring-1 ring-charcoal ring-offset-2 ring-offset-ivory" : ""}`}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                    width={1400}
                    height={1750}
                  />
                </div>
              ))}
            </div>
            <p className="mt-4 text-[10px] tracking-wide text-muted">
              Photography by Jainica Dhingra, Souravi Sinha and Akhil Pawar on
              Unsplash
            </p>
          </div>

          {/* Product information */}
          <div className="lg:sticky lg:top-32">
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-terracotta">
              Savitri Handlooms · Yeola
            </p>
            <h1 className="font-serif text-4xl font-semibold leading-tight text-charcoal lg:text-5xl">
              Kaas Floral Paithani
            </h1>
            <div className="mt-5 flex flex-wrap items-center justify-between gap-4 border-b border-sand-dark pb-6">
              <Rating />
              <p className="text-xs font-medium uppercase tracking-wider text-muted">
                Made to order
              </p>
            </div>

            <div className="flex items-baseline gap-3 py-6">
              <span className="text-2xl font-semibold text-charcoal">
                ₹8,499
              </span>
              <span className="text-sm text-muted line-through">₹10,200</span>
              <span className="bg-terracotta-pale px-2 py-1 text-xs font-semibold text-terracotta">
                Save 16%
              </span>
            </div>

            <p className="max-w-xl text-sm leading-7 text-muted">
              A luminous pure-silk Paithani inspired by the wildflower plateaus
              of Kaas. Every motif is individually woven by hand, creating a
              richly detailed heirloom that carries the rhythm and patience of
              Yeola&apos;s master weavers.
            </p>

            <form className="mt-7">
              <fieldset>
                <legend className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-charcoal">
                  Border colour
                </legend>
                <div className="flex flex-wrap gap-3">
                  {["Rust", "Wine", "Forest"].map((colour, index) => (
                    <label key={colour} className="cursor-pointer">
                      <input
                        type="radio"
                        name="colour"
                        value={colour.toLowerCase()}
                        defaultChecked={index === 0}
                        className="peer sr-only"
                      />
                      <span className="block border border-sand-dark px-5 py-2.5 text-sm text-muted transition-colors peer-checked:border-charcoal peer-checked:bg-charcoal peer-checked:text-ivory">
                        {colour}
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <div className="mt-6 grid grid-cols-[6rem_1fr] gap-3">
                <label>
                  <span className="sr-only">Quantity</span>
                  <select
                    name="quantity"
                    aria-label="Quantity"
                    className="h-14 w-full border border-sand-dark bg-transparent px-4 text-sm text-charcoal outline-none focus:border-charcoal"
                    defaultValue="1"
                  >
                    <option value="1">Qty 1</option>
                    <option value="2">Qty 2</option>
                    <option value="3">Qty 3</option>
                  </select>
                </label>
                <button
                  type="submit"
                  className="h-14 bg-charcoal px-6 text-sm font-semibold uppercase tracking-[0.14em] text-ivory transition-colors hover:bg-terracotta"
                >
                  Add to bag
                </button>
              </div>
            </form>

            <div className="mt-6 grid grid-cols-2 gap-3 border-y border-sand-dark py-5 text-xs text-muted">
              <p className="flex items-center gap-2">
                <svg
                  width="17"
                  height="17"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  aria-hidden="true"
                >
                  <path d="M3 6h13v11H3zM16 10h3l2 3v4h-5z" />
                  <circle cx="7" cy="19" r="2" />
                  <circle cx="18" cy="19" r="2" />
                </svg>
                Free insured delivery
              </p>
              <p className="flex items-center gap-2">
                <svg
                  width="17"
                  height="17"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  aria-hidden="true"
                >
                  <path d="M12 3 4 6v5c0 5 3.4 8.7 8 10 4.6-1.3 8-5 8-10V6l-8-3Z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
                Authenticity certified
              </p>
            </div>

            <div className="mt-8">
              <h2 className="font-serif text-2xl font-semibold text-charcoal">
                Product specifications
              </h2>
              <dl className="mt-5 border-t border-sand-dark">
                {specifications.map(([term, description]) => (
                  <div
                    key={term}
                    className="grid grid-cols-[7.5rem_1fr] gap-5 border-b border-sand-dark py-3.5 text-sm"
                  >
                    <dt className="text-muted">{term}</dt>
                    <dd className="font-medium text-charcoal">{description}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <details className="group border-b border-sand-dark py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-semibold text-charcoal">
                Artisan story
                <span className="text-xl font-normal transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="pt-4 text-sm leading-7 text-muted">
                Savitri and her family have preserved the Paithani tradition for
                three generations. Your purchase directly supports their
                workshop and the next generation of weavers.
              </p>
            </details>
            <details className="group border-b border-sand-dark py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-semibold text-charcoal">
                Shipping and returns
                <span className="text-xl font-normal transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="pt-4 text-sm leading-7 text-muted">
                This made-to-order piece ships in 4–5 weeks. Returns are
                accepted within seven days of delivery when the product is
                unused and retains its original packaging.
              </p>
            </details>
          </div>
        </section>
      </main>
    </div>
  );
};

export default page;
