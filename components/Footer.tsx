const SHOP_LINKS = [
  "All Products",
  "Categories",
  "New Arrivals",
  "Best Sellers",
];
const DISCOVER_LINKS = [
  "Artisans",
  "Craft Stories",
  "Collections",
  "About Kalavana",
];
const HELP_LINKS = ["Contact", "Shipping", "Returns", "FAQs"];

const Footer = () => {
  return (
    <footer
      className="py-14 px-6 lg:px-[6vw] border-t"
      style={{ backgroundColor: "#FAF7F2", borderColor: "#D4C9BC" }}
    >
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 mb-12">
        {/* Brand */}
        <div className="col-span-2 lg:col-span-1 flex flex-col gap-4">
          <div>
            <p
              className="font-serif text-xl font-semibold"
              style={{ color: "#2C2416" }}
            >
              Kalavana
            </p>
            <p
              className="text-[9px] tracking-[0.2em] uppercase"
              style={{ color: "#B85C38" }}
            >
              Maharashtrian Crafts
            </p>
          </div>
          <p className="text-xs leading-relaxed" style={{ color: "#6B5B4E" }}>
            Connecting artisans with the world, one handmade piece at a time.
          </p>
        </div>

        {/* Shop */}
        <div>
          <h4
            className="text-xs font-semibold tracking-[0.15em] uppercase mb-4"
            style={{ color: "#2C2416" }}
          >
            Shop
          </h4>
          <ul className="flex flex-col gap-2.5">
            {SHOP_LINKS.map((link) => (
              <li key={link}>
                <a
                  href="#"
                  className="text-sm text-charcoal-light transition-colors duration-150 hover:text-terracotta"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Discover */}
        <div>
          <h4
            className="text-xs font-semibold tracking-[0.15em] uppercase mb-4"
            style={{ color: "#2C2416" }}
          >
            Discover
          </h4>
          <ul className="flex flex-col gap-2.5">
            {DISCOVER_LINKS.map((link) => (
              <li key={link}>
                <a
                  href="#"
                  className="text-sm text-charcoal-light transition-colors duration-150 hover:text-terracotta"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Help */}
        <div>
          <h4
            className="text-xs font-semibold tracking-[0.15em] uppercase mb-4"
            style={{ color: "#2C2416" }}
          >
            Help
          </h4>
          <ul className="flex flex-col gap-2.5">
            {HELP_LINKS.map((link) => (
              <li key={link}>
                <a
                  href="#"
                  className="text-sm text-charcoal-light transition-colors duration-150 hover:text-terracotta"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Social */}
        <div>
          <h4
            className="text-xs font-semibold tracking-[0.15em] uppercase mb-4"
            style={{ color: "#2C2416" }}
          >
            Social
          </h4>
          <div className="flex flex-col gap-3">
            <a
              href="#"
              className="inline-flex items-center gap-2 text-sm text-charcoal-light transition-colors duration-150 hover:text-terracotta"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line
                  x1="17.5"
                  y1="6.5"
                  x2="17.51"
                  y2="6.5"
                  strokeLinecap="round"
                />
              </svg>
              Instagram
            </a>
            <a
              href="#"
              className="inline-flex items-center gap-2 text-sm text-charcoal-light transition-colors duration-150 hover:text-terracotta"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
              Facebook
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-3"
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
};

export default Footer;
