import Image from "next/image";
import { notFound } from "next/navigation";
import AddToCartButton from "@/components/AddToCartButton";
import { getCraftBySlug } from "@/lib/crafts";

export default async function CraftDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const craft = getCraftBySlug(id);

  if (!craft) notFound();

  return (
    <section className="mx-auto grid max-w-7xl items-start gap-10 lg:grid-cols-2 lg:gap-16">
      <div className="relative aspect-4/5 overflow-hidden bg-sand">
        <Image
          src={craft.image}
          alt={craft.alt}
          className="h-full w-full object-cover"
          width={1400}
          height={1750}
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
        <span className="absolute left-4 top-4 bg-ivory/95 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-terracotta">
          Handmade in Maharashtra
        </span>
      </div>

      <div className="lg:sticky lg:top-32">
        <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-terracotta">
          {craft.artisan} · {craft.place}
        </p>
        <h1 className="font-serif text-4xl font-semibold leading-tight text-charcoal lg:text-5xl">
          {craft.title}
        </h1>
        <p className="mt-6 border-b border-sand-dark pb-6 text-sm leading-7 text-muted">
          {craft.description}
        </p>
        <p className="py-6 text-2xl font-semibold text-charcoal">
          ₹{craft.price.toLocaleString("en-IN")}
        </p>
        <AddToCartButton
          product={{
            id: `craft-${craft.slug}`,
            name: craft.title,
            artisan: craft.artisan,
            price: craft.price,
            image: craft.image,
            alt: craft.alt,
          }}
          className="h-14 w-full bg-charcoal px-6 text-sm font-semibold uppercase tracking-[0.14em] text-ivory transition-colors hover:bg-terracotta"
        >
          Add to bag
        </AddToCartButton>
        <p className="mt-4 text-xs leading-6 text-muted">
          Crafted by independent artisans. Every piece carries the unique
          details of its handmade process.
        </p>
      </div>
    </section>
  );
}
