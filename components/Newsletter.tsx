import Link from "next/link";

const Newsletter = () => {
  return (
    <section
      className="py-20 lg:py-24 px-6 lg:px-[6vw]"
      style={{ backgroundColor: "#2C2416" }}
    >
      <div className="max-w-xl mx-auto text-center">
        <p
          className="text-[10px] tracking-[0.25em] uppercase mb-4 font-medium"
          style={{ color: "#D4795A" }}
        >
          Stay Connected
        </p>
        <h2
          className="font-serif text-3xl lg:text-4xl font-semibold mb-4"
          style={{ color: "#FAF7F2" }}
        >
          Bring a Piece of Maharashtra Home
        </h2>
        <p
          className="text-sm leading-relaxed mb-8"
          style={{ color: "#D4C9BC" }}
        >
          Discover new crafts, artisan stories and curated collections.
        </p>

        <Link
          href="/crafts"
          className="inline-flex min-h-12 items-center justify-center bg-terracotta px-7 py-3 text-sm font-medium tracking-wide text-ivory transition-colors hover:bg-terracotta-light focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ivory"
        >
          Explore the collection
        </Link>
      </div>
    </section>
  );
};

export default Newsletter;
