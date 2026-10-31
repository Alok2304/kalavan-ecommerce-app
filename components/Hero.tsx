import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="relative isolate flex min-h-[calc(100svh-88px)] items-end overflow-hidden bg-charcoal">
      {/* Decorative background image */}
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src="/hero_image.avif"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center opacity-65"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to top, rgba(44,36,22,0.94) 0%, rgba(44,36,22,0.58) 45%, rgba(44,36,22,0.12) 100%)",
          }}
        />
      </div>

      <div className="relative z-10 w-full px-6 pb-16 pt-20 sm:px-10 sm:pb-20 lg:px-[7vw] lg:pb-24">
        <div className="max-w-2xl">
          <p
            className="mb-4 text-xs font-medium uppercase tracking-[0.22em] sm:mb-5"
            style={{ color: "#D4795A" }}
          >
            Crafted in Maharashtra
          </p>
          <h1
            className="mb-5 font-serif text-4xl font-semibold leading-[1.08] sm:mb-6 sm:text-5xl lg:text-6xl"
            style={{ color: "#FAF7F2" }}
          >
            Stories Woven Into
            <br className="hidden sm:block" />
            <em className="not-italic" style={{ color: "#E8C9A0" }}>
              Every Craft
            </em>
          </h1>
          <p
            className="mb-8 max-w-lg text-base leading-relaxed sm:mb-10 sm:text-lg"
            style={{ color: "#D4C9BC" }}
          >
            Discover authentic handmade products created by Maharashtra&apos;s
            local artisans.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
            <Link
              href="/crafts"
              className="inline-flex min-h-12 items-center justify-center gap-2 bg-terracotta px-7 py-3 text-sm font-medium tracking-wide text-ivory transition-colors duration-200 hover:bg-terracotta-light focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ivory"
            >
              Explore Crafts
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path
                  d="M5 12h14M12 5l7 7-7 7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
            <Link
              href="/artisans"
              className="inline-flex min-h-12 items-center justify-center gap-2 border border-sand-dark px-7 py-3 text-sm font-medium tracking-wide text-ivory transition-colors duration-200 hover:border-ivory focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ivory"
            >
              Meet the Artisans
            </Link>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 right-8 z-10 hidden flex-col items-center gap-2 lg:flex lg:right-[7vw]">
        {/* <span
          className="text-[10px] uppercase tracking-widest"
          style={{ color: "#D4C9BC", writingMode: "vertical-rl" }}
        >
          Scroll
        </span> */}
        {/* <div
          className="h-10 w-px"
          style={{ backgroundColor: "#D4C9BC", opacity: 0.5 }}
        /> */}
      </div>
    </section>
  );
};

export default Hero;
