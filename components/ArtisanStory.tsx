import Image from "next/image";
import Link from "next/link";

const ArtisanStory = () => {
  return (
    <section
      className="py-20 lg:py-28 px-6 lg:px-[6vw]"
      style={{ backgroundColor: "#FAF7F2" }}
    >
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        {/* Left: photograph */}
        <div className="relative">
          <div
            className="overflow-hidden"
            style={{ borderRadius: 2, backgroundColor: "#E8DDD0" }}
          >
            <Image
              src="https://images.unsplash.com/photo-1678082310070-26bdadc06a34?w=800&h=960&fit=crop&auto=format"
              alt="Woman artisan surrounded by handcrafted bowls"
              className="w-full object-cover"
              style={{ aspectRatio: "5/6" }}
              width={400}
              height={480}
            />
          </div>
          {/* Decorative offset block */}
          <div
            className="absolute -bottom-4 -right-4 w-24 h-24 hidden lg:block"
            style={{
              backgroundColor: "#B85C38",
              opacity: 0.15,
              borderRadius: 2,
            }}
          />
        </div>

        {/* Right: text */}
        <div className="max-w-lg">
          <p
            className="text-[10px] tracking-[0.25em] font-medium uppercase mb-5"
            style={{ color: "#B85C38" }}
          >
            The Hands Behind the Craft
          </p>
          <h2
            className="font-serif text-3xl lg:text-4xl font-semibold leading-snug mb-6"
            style={{ color: "#2C2416" }}
          >
            Meet the Artisan
          </h2>
          <p
            className="text-base leading-relaxed mb-8"
            style={{ color: "#6B5B4E" }}
          >
            Every Kalavana product carries the skill, time and tradition of the
            person who made it.
          </p>

          {/* Artisan profile */}
          <div
            className="flex items-center gap-4 py-5 border-t border-b mb-8"
            style={{ borderColor: "#D4C9BC" }}
          >
            <div
              className="w-14 h-14 rounded-full overflow-hidden flex-shrink-0"
              style={{ backgroundColor: "#E8DDD0" }}
            >
              <Image
                src="https://images.unsplash.com/photo-1678082310070-26bdadc06a34?w=120&h=120&fit=crop&auto=format"
                alt="Savitri, Paithani Weaver"
                className="w-full h-full object-cover"
                width={48}
                height={48}
              />
            </div>
            <div>
              <p
                className="font-serif text-lg font-medium"
                style={{ color: "#2C2416" }}
              >
                Savitri
              </p>
              <p className="text-sm" style={{ color: "#6B5B4E" }}>
                Paithani Weaver
              </p>
              <p className="text-xs" style={{ color: "#9C8878" }}>
                Yeola, Maharashtra
              </p>
            </div>
          </div>

          <Link
            href="/artisans"
            className="inline-flex items-center gap-2 border border-charcoal px-7 py-3 text-sm font-medium tracking-wide text-charcoal transition-colors duration-200 hover:bg-charcoal hover:text-ivory"
          >
            Meet Our Artisans
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
      </div>
    </section>
  );
};

export default ArtisanStory;
