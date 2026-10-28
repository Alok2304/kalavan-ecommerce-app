import { SignIn } from "@clerk/nextjs";
import { Suspense } from "react";

const SignInPage = () => {
  return (
    <main className="px-4 pb-16 pt-32 sm:px-6 lg:px-8">
      <section className="mx-auto grid w-full max-w-5xl overflow-hidden rounded-2xl border border-sand-dark/70 bg-white shadow-[0_24px_80px_rgba(44,36,22,0.08)] md:min-h-[570px] md:grid-cols-[0.9fr_1.1fr]">
        <div className="relative flex flex-col justify-between overflow-hidden bg-terracotta px-8 py-10 text-ivory sm:px-12 sm:py-12 md:px-14 md:py-14">
          <div
            aria-hidden="true"
            className="absolute -right-24 -top-24 h-72 w-72 rounded-full border border-white/15"
          />
          <div
            aria-hidden="true"
            className="absolute -bottom-32 -left-24 h-80 w-80 rounded-full border border-white/15"
          />

          <div className="relative">
            <p className="mb-10 text-xs font-medium uppercase tracking-[0.24em] text-ivory/75 md:mb-16">
              Kalavana · Maharashtrian crafts
            </p>
            <p className="mb-4 text-sm font-medium tracking-wide text-ivory/75">
              Welcome back
            </p>
            <h1 className="max-w-sm font-serif text-4xl leading-tight sm:text-5xl">
              Good things are made by hand.
            </h1>
            <p className="mt-5 max-w-sm text-sm leading-7 text-ivory/80 sm:text-base">
              Sign in to find your saved pieces and discover the makers behind
              every craft.
            </p>
          </div>

          <p className="relative mt-12 text-xs tracking-wide text-ivory/70">
            Thoughtfully made in Maharashtra, for homes everywhere.
          </p>
        </div>

        <div className="flex items-center justify-center px-5 py-10 sm:px-10 md:px-12">
          <Suspense fallback={null}>
            <SignIn
              appearance={{
                variables: {
                  colorPrimary: "#b85c38",
                  colorBackground: "#ffffff",
                  colorForeground: "#2c2416",
                  colorMutedForeground: "#6b5b4e",
                  colorInput: "#d4c9bc",
                  colorInputForeground: "#2c2416",
                  borderRadius: "0.5rem",
                  fontFamily: "Arial, sans-serif",
                },
              }}
            />
          </Suspense>
        </div>
      </section>
    </main>
  );
};

export default SignInPage;
