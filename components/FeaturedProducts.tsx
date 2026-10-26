import Image from "next/image";

const products = [
  {
    id: 1,
    name: "Kaas Floral Paithani",
    artisan: "Savitri Handlooms",
    location: "Yeola, Maharashtra",
    rating: 4.8,
    reviews: 124,
    price: 8499,
    originalPrice: 10200,
    image:
      "https://images.unsplash.com/photo-1786871204247-60f342ae81a8?w=600&h=720&fit=crop&auto=format",
    alt: "Handwoven Paithani silk textile on a loom",
  },
  {
    id: 2,
    name: "Warli Terracotta Pot",
    artisan: "Ramesh Mati Kala",
    location: "Nashik, Maharashtra",
    rating: 4.6,
    reviews: 87,
    price: 1850,
    originalPrice: null,
    image:
      "https://images.unsplash.com/photo-1715845779797-ee1e42374925?w=600&h=720&fit=crop&auto=format",
    alt: "Artisan's hands on a pottery wheel shaping clay",
  },
  {
    id: 3,
    name: "Kolhapuri Pearl Set",
    artisan: "Anita Jewel Works",
    location: "Kolhapur, Maharashtra",
    rating: 4.9,
    reviews: 203,
    price: 3299,
    originalPrice: 4500,
    image:
      "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?w=600&h=720&fit=crop&auto=format",
    alt: "Gold and purple beaded traditional jewellery",
  },
  {
    id: 4,
    name: "Bamboo Craft Lantern",
    artisan: "Tribal Craft Co.",
    location: "Gadchiroli, Maharashtra",
    rating: 4.5,
    reviews: 56,
    price: 1299,
    originalPrice: null,
    image:
      "https://images.unsplash.com/photo-1764218057040-5427eb0f1f5a?w=600&h=720&fit=crop&auto=format",
    alt: "Colorful decorated handmade lanterns",
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
        <Image
          src={product.image}
          alt={product.alt}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        />
        {/* Wishlist — static icon, no toggle state */}
        <button
          className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full transition-all duration-200 hover:scale-110"
          style={{ backgroundColor: "rgba(250,247,242,0.9)" }}
          aria-label="Add to wishlist"
        >
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#4A3C2E"
            strokeWidth="1.75"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>

        {/* Add to Cart — CSS hover reveal */}
        <div className="absolute bottom-0 left-0 right-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <button
            className="w-full py-3 text-sm font-medium tracking-wide transition-colors duration-150 hover:bg-[#B85C38]"
            style={{ backgroundColor: "#2C2416", color: "#FAF7F2" }}
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="mt-3 flex flex-col gap-0.5">
        <h3
          className="font-serif text-base font-medium leading-snug"
          style={{ color: "#2C2416" }}
        >
          {product.name}
        </h3>
        <p className="text-xs" style={{ color: "#6B5B4E" }}>
          {product.artisan}
        </p>
        <p className="text-xs" style={{ color: "#9C8878" }}>
          {product.location}
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
          <a
            href="#"
            className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-[#B85C38]"
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
          </a>
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
            <div key={p.id} className="flex-shrink-0 w-56">
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
