import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Shop Maharashtrian Crafts | Kalavana",
  description:
    "Explore authentic textiles, pottery, jewellery, woodcraft and home décor handmade by artisans across Maharashtra.",
};

const crafts = [
  {
    title: "Kaas Floral Paithani",
    artisan: "Savitri Handlooms",
    place: "Yeola, Maharashtra",
    price: 8499,
    image:
      "https://images.unsplash.com/photo-1717586756136-d9a3eeb1fa6f?auto=format&fit=crop&w=900&q=85",
    alt: "Close detail of a richly woven floral Indian textile",
    href: "/product",
  },
  {
    title: "Warli Terracotta Urli",
    artisan: "Ramesh Mati Kala",
    place: "Nashik, Maharashtra",
    price: 1850,
    image:
      "https://images.unsplash.com/photo-1699371830139-cb02e94878f1?auto=format&fit=crop&w=900&q=85",
    alt: "Handmade terracotta vessels displayed in an artisan workshop",
  },
  {
    title: "Kolhapuri Saaj Necklace",
    artisan: "Anita Jewel Works",
    place: "Kolhapur, Maharashtra",
    price: 3299,
    image:
      "https://images.unsplash.com/photo-1620619767323-b95a89183081?auto=format&fit=crop&w=900&q=85",
    alt: "Colourful handcrafted beaded necklaces on a wooden display",
  },
  {
    title: "Sawantwadi Ganjifa Set",
    artisan: "Naik Chitrashala",
    place: "Sawantwadi, Maharashtra",
    price: 2190,
    image:
      "https://images.unsplash.com/photo-1678082309214-3b2941e387f8?auto=format&fit=crop&w=900&q=85",
    alt: "Woman artisan hand painting a traditional craft",
  },
  {
    title: "Hand-thrown Clay Surahi",
    artisan: "Kumbhar Studio",
    place: "Pune, Maharashtra",
    price: 1240,
    image:
      "https://images.unsplash.com/photo-1493106641515-6b5631de4bb9?auto=format&fit=crop&w=900&q=85",
    alt: "Potter shaping a clay vessel by hand",
  },
  {
    title: "Bamboo Weave Lantern",
    artisan: "Tribal Craft Co.",
    place: "Gadchiroli, Maharashtra",
    price: 1299,
    image:
      "https://images.unsplash.com/photo-1764218057040-5427eb0f1f5a?auto=format&fit=crop&w=900&q=85",
    alt: "Colourful handmade lanterns and woven baskets",
  },
  {
    title: "Paithani Table Runner",
    artisan: "Morya Weaves",
    place: "Aurangabad, Maharashtra",
    price: 2750,
    image:
      "https://images.unsplash.com/photo-1588140686379-1b76a52103dc?auto=format&fit=crop&w=900&q=85",
    alt: "Detailed red, white and blue handwoven textile",
  },
  {
    title: "Carved Devrai Figurine",
    artisan: "Shinde Woodcraft",
    place: "Sawantwadi, Maharashtra",
    price: 1680,
    image:
      "https://images.unsplash.com/photo-1712210332599-0cb76e647e43?auto=format&fit=crop&w=900&q=85",
    alt: "Artisan seated among handcrafted wooden sculptures",
  },
  {
    title: "Tamba Serving Bowl",
    artisan: "Tambat Ali Collective",
    place: "Pune, Maharashtra",
    price: 2450,
    image:
      "https://images.unsplash.com/photo-1678082310070-26bdadc06a34?auto=format&fit=crop&w=900&q=85",
    alt: "Artisan surrounded by rows of handcrafted bowls",
  },
  {
    title: "Mor Bagh Silk Stole",
    artisan: "Yeola Loom House",
    place: "Yeola, Maharashtra",
    price: 3890,
    image:
      "https://images.unsplash.com/photo-1717585679395-bbe39b5fb6bc?auto=format&fit=crop&w=900&q=85",
    alt: "A layered collection of colourful handwoven cloth",
  },
  {
    title: "Rustic Matka Trio",
    artisan: "Pragati Pottery",
    place: "Pen, Maharashtra",
    price: 1490,
    image:
      "https://images.unsplash.com/photo-1699371829505-e9fdde74e869?auto=format&fit=crop&w=900&q=85",
    alt: "A collection of brown and white handmade vases",
  },
  {
    title: "Mohan Mala Bracelet",
    artisan: "Suvarna Karigari",
    place: "Kolhapur, Maharashtra",
    price: 1899,
    image:
      "https://images.unsplash.com/photo-1616756141603-6d37d5cde2a2?auto=format&fit=crop&w=900&q=85",
    alt: "Gold and silver handcrafted beaded bracelet",
  },
];

function CartIcon() {
  return (
    <svg
      width="19"
      height="19"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      aria-hidden="true"
    >
      <circle cx="9" cy="20" r="1.5" />
      <circle cx="18" cy="20" r="1.5" />
      <path d="M3 4h2l2.2 10.1a2 2 0 0 0 2 1.6h7.9a2 2 0 0 0 1.9-1.4L21 7H6" />
      <path d="M14 9v4M12 11h4" strokeLinecap="round" />
    </svg>
  );
}

function CraftCard({ craft }: { craft: (typeof crafts)[number] }) {
  const title = (
    <h2 className="font-serif text-lg font-semibold leading-snug text-charcoal transition-colors group-hover:text-terracotta">
      {craft.title}
    </h2>
  );

  return (
    <article className="group flex min-w-0 flex-col">
      <div className="relative aspect-4/5 overflow-hidden bg-sand">
        {craft.href ? (
          <Link
            href={craft.href}
            aria-label={`View ${craft.title}`}
            className="block h-full"
          >
            <Image
              src={craft.image}
              alt={craft.alt}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
							width={900}
							height={1125}
            />
          </Link>
        ) : (
          <Image
            src={craft.image}
            alt={craft.alt}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            width={900}
            height={1125}
          />
        )}

        <button
          type="button"
          aria-label={`Add ${craft.title} to cart`}
          title={`Add ${craft.title} to cart`}
          className="absolute right-3 top-3 flex size-11 items-center justify-center rounded-full border border-sand-dark bg-ivory/95 text-charcoal shadow-sm transition-all duration-200 hover:border-terracotta hover:bg-terracotta hover:text-ivory focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta"
        >
          <CartIcon />
        </button>
      </div>

      <div className="flex flex-1 flex-col pt-4">
        {craft.href ? <Link href={craft.href}>{title}</Link> : title}
        <p className="mt-2 text-sm font-medium text-charcoal-light">
          {craft.artisan}
        </p>
        <div className="mt-1 flex items-center gap-1.5 text-xs text-muted">
          <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            aria-hidden="true"
          >
            <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
            <circle cx="12" cy="10" r="2.5" />
          </svg>
          {craft.place}
        </div>
        <p className="mt-3 text-base font-semibold text-charcoal">
          ₹{craft.price.toLocaleString("en-IN")}
        </p>
      </div>
    </article>
  );
}

const CraftPage = () => {
	return (
    <div className="min-h-screen bg-ivory">
      <main className="pb-24 pt-22 lg:pb-32">
        <header className="border-b border-sand-dark bg-ivory-dark px-6 py-14 lg:px-[6vw] lg:py-20">
          <div className="mx-auto max-w-7xl">
            <nav aria-label="Breadcrumb" className="mb-8">
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
                <li className="text-charcoal">Crafts</li>
              </ol>
            </nav>

            <div className="grid items-end gap-8 lg:grid-cols-[1fr_auto]">
              <div>
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-terracotta">
                  Maharashtra, made by hand
                </p>
                <h1 className="max-w-3xl font-serif text-4xl font-semibold leading-tight text-charcoal sm:text-5xl lg:text-6xl">
                  Crafts with a story
                </h1>
                <p className="mt-5 max-w-2xl text-base leading-7 text-muted">
                  Explore heirloom textiles, earth-born pottery and intricate
                  objects shaped by the hands of independent artisans across
                  Maharashtra.
                </p>
              </div>
              {/* <p className="text-sm text-muted">
                <span className="font-semibold text-charcoal">
                  {crafts.length}
                </span>{" "}
                authentic crafts
              </p> */}
            </div>
          </div>
        </header>

        <section
          className="px-6 pt-12 lg:px-[6vw] lg:pt-16"
          aria-labelledby="crafts-heading"
        >
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 flex flex-col justify-between gap-5 border-b border-sand-dark pb-6 sm:flex-row sm:items-center">
              <h2
                id="crafts-heading"
                className="font-serif text-2xl font-semibold text-charcoal"
              >
                All crafts
              </h2>
              <div
                className="flex flex-wrap gap-2"
                aria-label="Craft categories"
              >
                {[
                  "All",
                  "Textiles",
                  "Pottery",
                  "Jewellery",
                  "Woodcraft",
                  "Home décor",
                ].map((category, index) => (
                  <span
                    key={category}
                    className={`border px-3 py-1.5 text-xs font-medium ${index === 0 ? "border-charcoal bg-charcoal text-ivory" : "border-sand-dark text-muted"}`}
                  >
                    {category}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 xl:gap-y-16">
              {crafts.map((craft) => (
                <CraftCard key={craft.title} craft={craft} />
              ))}
            </div>
            {/* <p className="mt-14 text-center text-[10px] tracking-wide text-muted">
              Craft photography sourced from independent photographers on
              Unsplash
            </p> */}
          </div>
        </section>
      </main>
    </div>
  );
};

export default CraftPage;
