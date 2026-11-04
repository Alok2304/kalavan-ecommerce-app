"use client";

import Image from "next/image";
import Link from "next/link";
import { Suspense, useState } from "react";
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
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav>
      <style>{`.nav-item:hover .nav-dropdown, .nav-item:focus-within .nav-dropdown { display: block; }`}</style>

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
              <button
                type="button"
                className="flex size-11 flex-col items-center justify-center gap-1.5 rounded-sm text-charcoal hover:bg-ivory-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta lg:hidden"
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
                onClick={() => setMenuOpen((open) => !open)}
              >
                <span className={`block h-0.5 w-5 bg-current transition-transform ${menuOpen ? "translate-y-2 rotate-45" : ""}`} />
                <span className={`block h-0.5 w-5 bg-current transition-opacity ${menuOpen ? "opacity-0" : ""}`} />
                <span className={`block h-0.5 w-5 bg-current transition-transform ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`} />
              </button>
            </div>
          </div>

          {/* Mobile menu — CSS-toggle controlled */}
          {menuOpen && <div id="mobile-menu" className="max-h-[calc(100svh-6rem)] overflow-y-auto border-t border-sand-dark bg-ivory lg:hidden">
            <ul className="space-y-1 px-4 py-3">
              {NAV_LINKS.map((link) => {
                const dropdown = getDropdown(link);
                return <li key={link}>
                  <Link
                    href={getNavHref(link)}
                    onClick={() => setMenuOpen(false)}
                    className="block rounded-sm px-3 py-3 text-sm font-semibold text-charcoal hover:bg-ivory-dark hover:text-terracotta"
                  >
                    {link}
                  </Link>
                  {dropdown && <ul className="grid grid-cols-2 gap-1 pb-2 pl-3">
                    {dropdown.map((item) => <li key={item}><Link href="/crafts" onClick={() => setMenuOpen(false)} className="block rounded-sm px-3 py-2 text-sm text-muted hover:bg-ivory-dark hover:text-terracotta">{item}</Link></li>)}
                  </ul>}
                </li>;
              })}
            </ul>
            <div className="border-t border-sand-dark px-4 py-3">
              <p className="px-3 pb-1 text-xs font-semibold uppercase tracking-[0.16em] text-terracotta">On the home page</p>
              {[["Shop by category", "#categories"], ["Featured products", "#featured"], ["Meet our artisans", "#artisans"], ["Crafts of Maharashtra", "#crafts"], ["Our craft story", "#craft-story"], ["Why Kalavana", "#trust"], ["Newsletter", "#newsletter"]].map(([label, href]) => <Link key={href} href={`/${href}`} onClick={() => setMenuOpen(false)} className="block rounded-sm px-3 py-2.5 text-sm text-muted hover:bg-ivory-dark hover:text-terracotta">{label}</Link>)}
            </div>
          </div>}
        </nav>
      </header>
    </nav>
  );
};

export default Navbar;
