import Link from "next/link";

const Footer = () => (
  <footer
    className="border-t px-6 py-14 lg:px-[6vw]"
    style={{ backgroundColor: "#FAF7F2", borderColor: "#D4C9BC" }}
  >
    <div className="mb-12 grid grid-cols-2 gap-8 lg:grid-cols-4 lg:gap-12">
      <div className="col-span-2 flex flex-col gap-4 lg:col-span-2">
        <div>
          <p
            className="font-serif text-xl font-semibold"
            style={{ color: "#2C2416" }}
          >
            Kalavana
          </p>
          <p
            className="text-[9px] uppercase tracking-[0.2em]"
            style={{ color: "#B85C38" }}
          >
            Maharashtrian Crafts
          </p>
        </div>
        <p
          className="max-w-xs text-xs leading-relaxed"
          style={{ color: "#6B5B4E" }}
        >
          Connecting artisans with the world, one handmade piece at a time.
        </p>
      </div>
      <div>
        <h2
          className="mb-4 text-xs font-semibold uppercase tracking-[0.15em]"
          style={{ color: "#2C2416" }}
        >
          Shop
        </h2>
        <Link
          href="/crafts"
          className="text-sm text-charcoal-light transition-colors hover:text-terracotta"
        >
          All crafts
        </Link>
      </div>
      <div>
        <h2
          className="mb-4 text-xs font-semibold uppercase tracking-[0.15em]"
          style={{ color: "#2C2416" }}
        >
          Discover
        </h2>
        <ul className="flex flex-col gap-2.5">
          <li>
            <Link
              href="/artisans"
              className="text-sm text-charcoal-light transition-colors hover:text-terracotta"
            >
              Artisans
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className="text-sm text-charcoal-light transition-colors hover:text-terracotta"
            >
              About Kalavana
            </Link>
          </li>
        </ul>
      </div>
    </div>
    <div
      className="flex flex-col items-center justify-between gap-3 border-t pt-6 sm:flex-row"
      style={{ borderColor: "#D4C9BC" }}
    >
      <p className="text-xs" style={{ color: "#9C8878" }}>
        © 2026 Kalavana. All rights reserved.
      </p>
      <p className="text-xs" style={{ color: "#9C8878" }}>
        Crafted with care · Made in Maharashtra
      </p>
    </div>
  </footer>
);

export default Footer;
