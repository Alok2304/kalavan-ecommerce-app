import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | Kalavana",
  description:
    "Learn what information Kalavana collects, how we use it, and the choices you have when using our website.",
};

const sections = [
  {
    id: "information",
    number: "01",
    title: "Information we collect",
    content: (
      <>
        <p>
          We collect information you choose to give us when you create an
          account, place an order, or send feedback. This can include your name,
          email address, profile image, phone number, delivery address, and the
          details of your order or feedback.
        </p>
        <p>
          When you use the website, essential technologies used for sign-in and
          site operation may store information in your browser. Your cart is
          saved in your browser&apos;s local storage on that device, whether or
          not you are signed in.
        </p>
      </>
    ),
  },
  {
    id: "use",
    number: "02",
    title: "How we use information",
    content: (
      <p>
        We use information to provide account access, prepare and deliver your
        orders, respond to feedback and support requests, maintain the website,
        and protect it from misuse. We do not use your order or feedback details
        to send marketing messages through this website.
      </p>
    ),
  },
  {
    id: "sharing",
    number: "03",
    title: "Who helps us run Kalavana",
    content: (
      <>
        <p>
          We use service providers to operate parts of the website. Clerk
          provides account sign-in and identity services. Supabase stores our
          product catalogue, account profile records, orders, and feedback.
          These providers process information as needed to provide their
          services to us.
        </p>
        <p>
          We may also disclose information when required by law or when needed
          to protect the rights, safety, and security of our customers, makers,
          or website.
        </p>
      </>
    ),
  },
  {
    id: "retention",
    number: "04",
    title: "How long we keep information",
    content: (
      <p>
        We keep information for as long as needed to provide the service it was
        collected for, manage orders and accounts, resolve questions, and meet
        applicable legal requirements. Cart information stored in your browser
        remains there until you remove it or clear your browser storage.
      </p>
    ),
  },
  {
    id: "choices",
    number: "05",
    title: "Your choices",
    content: (
      <>
        <p>
          You can clear your browser&apos;s local storage to remove saved cart
          information. You can also contact us to ask about accessing, correcting,
          or deleting information associated with your account, order, or
          feedback. We may need to retain some information where the law requires
          it or to complete an existing order.
        </p>
        <p>
          To make a privacy request, use our{" "}
          <Link
            href="/feedback"
            className="font-medium text-terracotta underline decoration-terracotta/40 underline-offset-4 transition-colors hover:text-charcoal"
          >
            feedback form
          </Link>
          {" "}
          and mention that your message is a privacy request.
        </p>
      </>
    ),
  },
  {
    id: "security",
    number: "06",
    title: "Security and updates",
    content: (
      <>
        <p>
          We use technical and organizational measures intended to protect
          information. No online service can guarantee absolute security.
        </p>
        <p>
          We may update this policy as our services or practices change. The
          date at the top of this page shows when it was most recently revised.
        </p>
      </>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-ivory px-6 pb-20 pt-32 lg:px-[6vw] lg:pb-28">
      <div className="mx-auto max-w-7xl">
        <header className="border-b border-sand-dark pb-12 lg:pb-16">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-terracotta">
            Your privacy matters
          </p>
          <h1 className="mt-5 max-w-3xl font-serif text-5xl font-semibold leading-[1.08] text-charcoal sm:text-6xl">
            Privacy, with <em className="font-normal text-terracotta">care.</em>
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-muted">
            This policy explains what information Kalavana collects when you
            browse, shop, create an account, or get in touch, and how we use it.
          </p>
          <p className="mt-6 text-xs font-medium uppercase tracking-[0.16em] text-muted">
            Last updated: 4 November 2026
          </p>
        </header>

        <div className="grid gap-12 pt-12 lg:grid-cols-[0.65fr_1.35fr] lg:gap-20 lg:pt-16">
          <aside className="h-fit border border-sand-dark bg-ivory-dark p-6 lg:sticky lg:top-32">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-terracotta">
              In this policy
            </p>
            <nav aria-label="Privacy policy sections">
              <ol className="space-y-3">
                {sections.map((section) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className="flex gap-3 text-sm text-charcoal-light transition-colors hover:text-terracotta"
                    >
                      <span className="text-xs tracking-wide text-terracotta">
                        {section.number}
                      </span>
                      {section.title}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </aside>

          <div className="divide-y divide-sand-dark">
            {sections.map((section) => (
              <section
                key={section.id}
                id={section.id}
                className="scroll-mt-32 py-8 first:pt-0 last:pb-0"
              >
                <p className="text-xs font-semibold tracking-[0.18em] text-terracotta">
                  {section.number}
                </p>
                <h2 className="mt-3 font-serif text-2xl font-semibold text-charcoal sm:text-3xl">
                  {section.title}
                </h2>
                <div className="mt-4 space-y-4 text-sm leading-7 text-charcoal-light sm:text-base sm:leading-8">
                  {section.content}
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
