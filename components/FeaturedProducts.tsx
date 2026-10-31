import Image from "next/image";
import Link from "next/link";
import AddToCartButton from "@/components/AddToCartButton";
import { crafts } from "@/lib/crafts";

const products = [
  {
    ...crafts[0],
    id: 1,
    rating: 4.8,
    reviews: 124,
    originalPrice: 10200,
  },
  {
    ...crafts[1],
    id: 2,
    rating: 4.6,
    reviews: 87,
    originalPrice: null,
  },
  {
    ...crafts[2],
    id: 3,
    rating: 4.9,
    reviews: 203,
    originalPrice: 4500,
  },
  {
    ...crafts[5],
    id: 4,
    rating: 4.5,
    reviews: 56,
    originalPrice: null,
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          width="11"
          height="11"
          viewBox="0 0 24 24"
          fill={star <= Math.round(rating) ? "#B85C38" : "none"}
          stroke="#B85C38"
          strokeWidth="1.5"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );
}

function ProductCard({ product }: { product: (typeof products)[0] }) {
  return (
    <div className="group flex flex-col" style={{ minWidth: 220 }}>
      {/* Image container */}
      <div
        className="relative overflow-hidden"
        style={{
          paddingBottom: "120%",
          backgroundColor: "#E8DDD0",
          borderRadius: 2,
        }}
      >
        <Link
          href={`/crafts/${product.slug}`}
          aria-label={`View ${product.title}`}
          className="absolute inset-0 block"
        >
          <Image
            src={product.image}
            alt={product.alt}
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
        </Link>
        {/* Add to Cart — CSS hover reveal */}
        <div className="absolute bottom-0 left-0 right-0 translate-y-0 transition-transform duration-300 sm:translate-y-full sm:group-hover:translate-y-0">
          <AddToCartButton
            product={{
              id: `craft-${product.slug}`,
              name: product.title,
              artisan: product.artisan,
              price: product.price,
              image: product.image,
              alt: product.alt,
            }}
            className="w-full py-3 text-sm font-medium tracking-wide transition-colors duration-150 hover:bg-terracotta focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ivory"
            style={{ backgroundColor: "#2C2416", color: "#FAF7F2" }}
          >
            Add to Cart
          </AddToCartButton>
        </div>
      </div>

      {/* Info */}
      <div className="mt-3 flex flex-col gap-0.5">
        <h3
          className="font-serif text-base font-medium leading-snug"
          style={{ color: "#2C2416" }}
        >
          <Link
            href={`/crafts/${product.slug}`}
            className="transition-colors hover:text-terracotta focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta"
          >
            {product.title}
          </Link>
        </h3>
        <p className="text-xs" style={{ color: "#6B5B4E" }}>
          {product.artisan}
        </p>
        <p className="text-xs" style={{ color: "#9C8878" }}>
          {product.place}
        </p>
        <div className="flex items-center gap-1.5 mt-1">
          <StarRating rating={product.rating} />
          <span className="text-xs" style={{ color: "#9C8878" }}>
            ({product.reviews})
          </span>
        </div>
        <div className="flex items-center gap-2 mt-1">
          <span
            className="text-base font-semibold"
            style={{ color: "#2C2416" }}
          >
            ₹{product.price.toLocaleString("en-IN")}
          </span>
          {product.originalPrice && (
            <span className="text-sm line-through" style={{ color: "#9C8878" }}>
              ₹{product.originalPrice.toLocaleString("en-IN")}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

const FeaturedProducts = () => {
  return (
    <section className="py-20 lg:py-28" style={{ backgroundColor: "#F4EFE8" }}>
      <div className="px-6 lg:px-[6vw]">
        {/* Header */}
        <div className="flex items-end justify-between mb-10 lg:mb-14">
          <div>
            <p
              className="text-xs tracking-[0.2em] uppercase mb-2 font-medium"
              style={{ color: "#B85C38" }}
            >
              Handpicked
            </p>
            <h2
              className="font-serif text-3xl lg:text-4xl font-semibold"
              style={{ color: "#2C2416" }}
            >
              Featured Crafts
            </h2>
          </div>
          <Link
            href="/crafts"
            className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-terracotta"
            style={{ color: "#6B5B4E" }}
          >
            View all crafts
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                d="M5 12h14M12 5l7 7-7 7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>

        {/* Desktop 4-col grid */}
        <div className="hidden lg:grid lg:grid-cols-4 gap-8">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>

        {/* Mobile horizontal scroll carousel */}
        <div className="lg:hidden flex gap-5 overflow-x-auto scrollbar-hide pb-4 -mx-6 px-6">
          {products.map((p) => (
            <div key={p.id} className="shrink-0 w-56">
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
