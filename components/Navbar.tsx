import Image from "next/image";

const NAV_LINKS = [
  "Home",
  "Shop",
  "Crafts",
  "Artisans",
  "Collections",
  "About",
];

const SHOP_DROPDOWN = [
  "All Products",
  "Textiles",
  "Pottery & Ceramics",
  "Woodcraft",
  "Jewellery",
  "Home Decor",
  "Festive Crafts",
];
const CRAFTS_DROPDOWN = [
  "Paithani",
  "Warli Art",
  "Sawantwadi Craft",
  "Kolhapuri Craft",
  "Terracotta",
  "Bamboo Craft",
];

function getDropdown(link: string) {
  if (link === "Shop") return SHOP_DROPDOWN;
  if (link === "Crafts") return CRAFTS_DROPDOWN;
  return null;
}

const Navbar = () => {
  return (
    <nav>
      {/* CSS-only mobile menu toggle */}
      <style>{`
        #mobile-toggle:checked ~ nav .mobile-menu { display: block; }
        #mobile-toggle:checked ~ nav .hamburger-top { transform: rotate(45deg) translate(5px, 5px); }
        #mobile-toggle:checked ~ nav .hamburger-mid { opacity: 0; }
        #mobile-toggle:checked ~ nav .hamburger-bot { transform: rotate(-45deg) translate(5px, -5px); }
        #search-toggle:checked ~ nav .search-bar { display: flex; }
        .nav-item:hover .nav-dropdown { display: block; }
      `}</style>

      <input type="checkbox" id="mobile-toggle" className="hidden" />
      <input type="checkbox" id="search-toggle" className="hidden" />

      <header className="fixed top-0 left-0 right-0 z-50 border-b border-sand-dark bg-ivory">
        {/* Announcement Bar */}
        <div className="bg-charcoal py-2 text-center text-xs font-medium tracking-widest text-ivory">
          FREE SHIPPING ON ORDERS ABOVE ₹999 &nbsp;|&nbsp; AUTHENTIC HANDMADE
          CRAFTS FROM MAHARASHTRA
        </div>

        <nav>
          <div className="flex items-center justify-between px-6 lg:px-12 h-16">
            {/* Logo */}
            <a
              href="#"
              className="flex shrink-0 items-center gap-2.5 leading-none"
              aria-label="Kalavana home"
            >
              <Image
                src="./kalavana.svg"
                alt=""
                width={42}
                height={26}
                priority
                className="h-8 w-auto object-contain"
              />
              <span className="font-serif text-xl font-semibold tracking-wide text-charcoal">
                Kalavana
              </span>
            </a>

            {/* Center nav */}
            <ul className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map((link) => {
                const dropdown = getDropdown(link);
                return (
                  <li key={link} className="nav-item relative">
                    <a
                      href="#"
                      className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-charcoal transition-colors duration-150 hover:text-terracotta"
                    >
                      {link}
                      {dropdown && (
                        <svg
                          width="10"
                          height="10"
                          viewBox="0 0 10 10"
                          fill="none"
                        >
                          <path
                            d="M2 3.5L5 6.5L8 3.5"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                          />
                        </svg>
                      )}
                    </a>
                    {dropdown && (
                      <div className="nav-dropdown hidden absolute top-full left-0 pt-1 min-w-45 z-50">
                        <div className="border border-sand-dark bg-ivory py-2 shadow-md">
                          {dropdown.map((item) => (
                            <a
                              key={item}
                              href="#"
                              className="block px-4 py-2 text-sm text-charcoal-light transition-colors duration-100 hover:text-terracotta"
                            >
                              {item}
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>

            {/* Right icons */}
            <div className="flex items-center gap-4">
              {/* Search toggle */}
              <label
                htmlFor="search-toggle"
                className="hidden cursor-pointer items-center text-charcoal transition-colors hover:text-terracotta sm:flex"
                aria-label="Toggle search"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                >
                  <circle cx="10.5" cy="10.5" r="6.5" />
                  <path d="M15.5 15.5L20 20" strokeLinecap="round" />
                </svg>
              </label>

              {/* Mobile hamburger */}
              <label
                htmlFor="mobile-toggle"
                className="lg:hidden flex flex-col gap-1.5 p-1 cursor-pointer"
                aria-label="Open menu"
              >
                <span className="hamburger-top block h-0.5 w-5 bg-charcoal transition-all duration-200" />
                <span className="hamburger-mid block h-0.5 w-5 bg-charcoal transition-all duration-200" />
                <span className="hamburger-bot block h-0.5 w-5 bg-charcoal transition-all duration-200" />
              </label>
            </div>
          </div>

          {/* Search bar — CSS-toggle controlled */}
          <div className="search-bar hidden border-t border-sand-dark bg-ivory-dark px-6 py-3 lg:px-12">
            <input
              type="text"
              placeholder="Search for crafts, artisans, products..."
              className="w-full bg-transparent text-sm text-charcoal outline-none"
            />
          </div>

          {/* Mobile menu — CSS-toggle controlled */}
          <div className="mobile-menu hidden border-t border-sand-dark bg-ivory lg:hidden">
            <ul className="py-4">
              {NAV_LINKS.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="block px-6 py-3 text-sm font-medium text-charcoal hover:text-terracotta"
                  >
                    {link}
                  </a>
                </li>
              ))}
              <li className="mt-2 flex items-center gap-6 border-t border-sand-dark px-6 pt-4">
                <label
                  htmlFor="search-toggle"
                  className="flex cursor-pointer items-center gap-1.5 text-sm text-charcoal-light"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.75"
                  >
                    <circle cx="10.5" cy="10.5" r="6.5" />
                    <path d="M15.5 15.5L20 20" strokeLinecap="round" />
                  </svg>
                  Search
                </label>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    </nav>
  );
};

export default Navbar;
