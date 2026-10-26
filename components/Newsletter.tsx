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

        <form
          className="flex flex-col sm:flex-row gap-3"
          action="#"
          method="POST"
        >
          <input
            type="email"
            name="email"
            placeholder="Your email address"
            required
            className="flex-1 px-4 py-3 text-sm outline-none"
            style={{
              backgroundColor: "rgba(250,247,242,0.08)",
              border: "1px solid rgba(212,201,188,0.3)",
              color: "#FAF7F2",
            }}
          />
          <button
            type="submit"
            className="px-7 py-3 text-sm font-medium tracking-wide flex-shrink-0 transition-colors duration-200 hover:bg-[#D4795A]"
            style={{ backgroundColor: "#B85C38", color: "#FAF7F2" }}
          >
            Subscribe
          </button>
        </form>

        <p className="text-xs mt-4" style={{ color: "#9C8878" }}>
          No spam. Unsubscribe anytime.
        </p>
      </div>
    </section>
  );
};

export default Newsletter;
