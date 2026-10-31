import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { Show, UserButton } from "@clerk/nextjs";
import CartLink from "@/components/CartLink";

const NAV_LINKS = ["Home", "Shop", "Crafts", "Artisans", "About"];

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

function getNavHref(link: string) {
  if (link === "Home") return "/";
  if (link === "Shop" || link === "Crafts") return "/crafts";
  if (link === "Artisans") return "/artisans";
  if (link === "About") return "/about";
  return "#";
}

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
        .nav-item:hover .nav-dropdown { display: block; }
      `}</style>

      <input type="checkbox" id="mobile-toggle" className="hidden" />

      <header className="fixed top-0 left-0 right-0 z-50 border-b border-sand-dark bg-ivory">
        {/* Announcement Bar */}
        <div className="bg-charcoal py-2 text-center text-xs font-medium tracking-widest text-ivory">
          FREE SHIPPING ON ORDERS ABOVE ₹999 &nbsp;|&nbsp; AUTHENTIC HANDMADE
          CRAFTS FROM MAHARASHTRA
        </div>

        <nav>
          <div className="flex items-center justify-between px-6 lg:px-12 h-16">
            {/* Logo */}
            <Link
              href="/"
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
            </Link>

            {/* Center nav */}
            <ul className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map((link) => {
                const dropdown = getDropdown(link);
                return (
                  <li key={link} className="nav-item relative">
                    <Link
                      href={getNavHref(link)}
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
                    </Link>
                    {dropdown && (
                      <div className="nav-dropdown hidden absolute top-full left-0 pt-1 min-w-45 z-50">
                        <div className="border border-sand-dark bg-ivory py-2 shadow-md">
                          {dropdown.map((item) => (
                            <Link
                              key={item}
                              href="/crafts"
                              className="block px-4 py-2 text-sm text-charcoal-light transition-colors duration-100 hover:text-terracotta"
                            >
                              {item}
                            </Link>
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
              <Suspense fallback={null}>
                <Show when="signed-out">
                  <Link
                    href="/sign-in"
                    className="whitespace-nowrap rounded-sm bg-terracotta px-4 py-2 text-sm font-medium text-ivory transition-colors hover:bg-terracotta-light"
                  >
                    Sign in
                  </Link>
                </Show>
                <Show when="signed-in">
                  <CartLink />
                  <UserButton />
                </Show>
              </Suspense>

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

          {/* Mobile menu — CSS-toggle controlled */}
          <div className="mobile-menu hidden border-t border-sand-dark bg-ivory lg:hidden">
            <ul className="py-4">
              {NAV_LINKS.map((link) => (
                <li key={link}>
                  <Link
                    href={getNavHref(link)}
                    className="block px-6 py-3 text-sm font-medium text-charcoal hover:text-terracotta"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </header>
    </nav>
  );
};

export default Navbar;
