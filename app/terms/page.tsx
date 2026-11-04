import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service | Kalavana",
  description:
    "Read the terms that apply when you browse, create an account, or place an order with Kalavana.",
};

const sections = [
  {
    id: "acceptance",
    number: "01",
    title: "Using Kalavana",
    content: (
      <p>
        These terms apply when you visit or use the Kalavana website. By using
        the site, you agree to these terms. If you do not agree, please do not
        use the site. You must be able to enter into a binding agreement where
        you live to place an order or create an account.
      </p>
    ),
  },
  {
    id: "accounts",
    number: "02",
    title: "Your account",
    content: (
      <p>
        Keep your sign-in details secure and provide accurate information when
        creating an account. You are responsible for activity carried out
        through your account. Let us know through the feedback form if you
        believe someone has used your account without permission.
      </p>
    ),
  },
  {
    id: "products",
    number: "03",
    title: "Products, prices, and availability",
    content: (
      <>
        <p>
          Kalavana showcases handmade crafts and the makers behind them. We aim
          to present product descriptions, images, prices, and availability
          accurately. Handmade items may have small differences in colour,
          finish, texture, or dimensions, and screen settings can affect how
          colours appear.
        </p>
        <p>
          Prices and availability may change. If a listed price or product
          detail is incorrect, or an item is unavailable, we may contact you to
          confirm the order or cancel it before dispatch.
        </p>
      </>
    ),
  },
  {
    id: "orders",
    number: "04",
    title: "Orders and payment",
    content: (
      <>
        <p>
          When you place an order, provide accurate contact and delivery details.
          Submitting the checkout form sends us an order request. We will show
          you an order number when it has been recorded. We may contact you to
          verify details or explain that we cannot fulfil the order.
        </p>
        <p>
          The website currently accepts cash on delivery. Payment is due when
          your order is delivered. Shipping charges and any applicable taxes
          are shown during checkout before you place the order.
        </p>
        <p>
          To ask about changing or cancelling an order, contact us as soon as
          possible through the{" "}
          <Link
            href="/feedback"
            className="font-medium text-terracotta underline decoration-terracotta/40 underline-offset-4 transition-colors hover:text-charcoal"
          >
            feedback form
          </Link>
          . We will let you know what is possible based on the order&apos;s
          status. Any return, refund, or cancellation terms communicated for a
          specific order will apply to that order.
        </p>
      </>
    ),
  },
  {
    id: "site-use",
    number: "05",
    title: "Acceptable use",
    content: (
      <p>
        Do not misuse the website, attempt to access it or its systems without
        permission, interfere with its operation, submit false order details, or
        use the site in a way that violates applicable law or another
        person&apos;s rights.
      </p>
    ),
  },
  {
    id: "content",
    number: "06",
    title: "Website content",
    content: (
      <p>
        Website text, branding, photographs, and other content are owned by
        Kalavana or used with permission. You may browse the site for personal,
        non-commercial use. Please do not copy, republish, or commercially use
        website content without the rights holder&apos;s permission.
      </p>
    ),
  },
  {
    id: "availability",
    number: "07",
    title: "Availability and responsibility",
    content: (
      <p>
        We work to keep the website available and information useful, but the
        site may occasionally be interrupted or contain errors. To the extent
        permitted by applicable law, Kalavana is not responsible for indirect
        losses arising from use of the website. Nothing in these terms limits
        rights or remedies that cannot legally be limited.
      </p>
    ),
  },
  {
    id: "changes",
    number: "08",
    title: "Changes and contact",
    content: (
      <>
        <p>
          We may revise these terms as the website or our services change. The
          latest revision date will appear at the top of this page. Continued
          use of the website after a change means the updated terms apply to
          future use.
        </p>
        <p>
          If you have a question about these terms or an order, contact us
          through the{" "}
          <Link
            href="/feedback"
            className="font-medium text-terracotta underline decoration-terracotta/40 underline-offset-4 transition-colors hover:text-charcoal"
          >
            feedback form
          </Link>
          .
        </p>
      </>
    ),
  },
];

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-ivory px-6 pb-20 pt-32 lg:px-[6vw] lg:pb-28">
      <div className="mx-auto max-w-7xl">
        <header className="border-b border-sand-dark pb-12 lg:pb-16">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-terracotta">
            Clear expectations
          </p>
          <h1 className="mt-5 max-w-3xl font-serif text-5xl font-semibold leading-[1.08] text-charcoal sm:text-6xl">
            Terms of <em className="font-normal text-terracotta">service.</em>
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-muted">
            These terms explain the basics of using Kalavana, shopping for
            handmade crafts, and placing an order with us.
          </p>
          <p className="mt-6 text-xs font-medium uppercase tracking-[0.16em] text-muted">
            Last updated: 4 November 2026
          </p>
        </header>

        <div className="grid gap-12 pt-12 lg:grid-cols-[0.65fr_1.35fr] lg:gap-20 lg:pt-16">
          <aside className="h-fit border border-sand-dark bg-ivory-dark p-6 lg:sticky lg:top-32">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.18em] text-terracotta">
              In these terms
            </p>
            <nav aria-label="Terms of service sections">
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
