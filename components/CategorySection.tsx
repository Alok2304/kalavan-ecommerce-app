const categories = [
  {
    name: "Textiles",
    image:
      "https://images.unsplash.com/photo-1773847099204-238d283b2845?w=600&h=750&fit=crop&auto=format",
    alt: "Hands tying fringe on a colorful woven rug",
  },
  {
    name: "Pottery & Ceramics",
    image:
      "https://images.unsplash.com/photo-1493106641515-6b5631de4bb9?w=600&h=750&fit=crop&auto=format",
    alt: "Person molding a clay vase on a wheel",
  },
  {
    name: "Woodcraft",
    image:
      "https://images.unsplash.com/photo-1712210332599-0cb76e647e43?w=600&h=750&fit=crop&auto=format",
    alt: "Artisan with handcrafted wooden sculptures",
  },
  {
    name: "Jewellery",
    image:
      "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?w=600&h=750&fit=crop&auto=format",
    alt: "Gold and purple beaded traditional necklace",
  },
  {
    name: "Home Decor",
    image:
      "https://images.unsplash.com/photo-1764218057040-5427eb0f1f5a?w=600&h=750&fit=crop&auto=format",
    alt: "Colorful decorated lanterns and baskets",
  },
  {
    name: "Festive Crafts",
    image:
      "https://images.unsplash.com/photo-1641792113723-667c35b6766b?w=600&h=750&fit=crop&auto=format",
    alt: "Colorful traditional kites and festive crafts",
  },
];

function CategoryCard({
  name,
  image,
  alt,
}: {
  name: string;
  image: string;
  alt: string;
}) {
  return (
    <a
      href="#"
      className="group block relative overflow-hidden cursor-pointer"
      style={{ borderRadius: 2 }}
    >
      {/* Image */}
      <div
        className="relative overflow-hidden"
        style={{ paddingBottom: "130%", backgroundColor: "#E8DDD0" }}
      >
        <img
          src={image}
          alt={alt}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Overlay */}
        <div
          className="absolute inset-0 transition-opacity duration-300 group-hover:opacity-0"
          style={{
            background:
              "linear-gradient(to top, rgba(44,36,22,0.5) 0%, transparent 50%)",
          }}
        />
      </div>
      {/* Label */}
      <div className="mt-3 text-center">
        <span className="text-sm font-medium tracking-wide text-charcoal transition-colors duration-200 group-hover:text-terracotta">
          {name}
        </span>
      </div>
    </a>
  );
}

const CategorySection = () => {
  return (
    <section
      className="py-20 lg:py-28 px-6 lg:px-[6vw]"
      style={{ backgroundColor: "#FAF7F2" }}
    >
      {/* Header */}
      <div className="flex items-end justify-between mb-10 lg:mb-14">
        <div>
          <p
            className="text-xs tracking-[0.2em] uppercase mb-2 font-medium"
            style={{ color: "#B85C38" }}
          >
            Browse
          </p>
          <h2
            className="font-serif text-3xl lg:text-4xl font-semibold"
            style={{ color: "#2C2416" }}
          >
            Shop by Category
          </h2>
        </div>
        <a
          href="#"
          className="hidden items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-terracotta sm:inline-flex"
        >
          View all
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

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-5">
        {categories.map((cat) => (
          <CategoryCard key={cat.name} {...cat} />
        ))}
      </div>
    </section>
  );
};

export default CategorySection;
