"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/lib/cart";

type RazorpayResult = {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
};
type RazorpayOptions = {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  prefill: { name: string; email: string; contact: string };
  theme: { color: string };
  handler: (result: RazorpayResult) => void;
  modal: { ondismiss: () => void };
};
declare global {
  interface Window {
    Razorpay?: new (options: RazorpayOptions) => {
      open: () => void;
      on: (
        event: string,
        callback: (response: { error?: { description?: string } }) => void,
      ) => void;
    };
  }
}

const money = (amount: number) => `₹${amount.toLocaleString("en-IN")}`;

function loadRazorpay() {
  if (window.Razorpay) return Promise.resolve(true);
  return new Promise<boolean>((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(Boolean(window.Razorpay));
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export default function CheckoutPage() {
  const { items, removeItem } = useCart();
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const shipping = subtotal >= 999 ? 0 : 99;

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!items.length || busy) return;
    setBusy(true);
    setError("");
    const form = new FormData(event.currentTarget);
    const customer = Object.fromEntries(
      [
        "name",
        "email",
        "phone",
        "address",
        "city",
        "state",
        "postalCode",
        "country",
      ].map((key) => [key, String(form.get(key) ?? "")]),
    );

    try {
      const orderResponse = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer,
          items: items.map((item) => ({
            id: item.id,
            quantity: item.quantity,
          })),
        }),
      });
      const order = await orderResponse.json();
      if (!orderResponse.ok)
        throw new Error(order.error || "Could not start checkout.");
      if (!(await loadRazorpay()) || !window.Razorpay)
        throw new Error(
          "Payment checkout could not be loaded. Please check your connection and try again.",
        );

      const checkout = new window.Razorpay({
        key: order.keyId,
        amount: order.amount,
        currency: order.currency,
        name: "Kalavan",
        description: "Handcrafted pieces from Indian artisans",
        order_id: order.orderId,
        prefill: { name: order.name, email: order.email, contact: order.phone },
        theme: { color: "#a84f3d" },
        handler: async (payment) => {
          try {
            const verifyResponse = await fetch("/api/payments/verify", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                orderId: payment.razorpay_order_id,
                paymentId: payment.razorpay_payment_id,
                signature: payment.razorpay_signature,
              }),
            });
            const result = await verifyResponse.json();
            if (!verifyResponse.ok)
              throw new Error(result.error || "Payment verification failed.");
            items.forEach((item) => removeItem(item.id));
            router.push(result.invoiceUrl);
          } catch (reason) {
            setError(
              reason instanceof Error
                ? `${reason.message} If your account was charged, contact us with your payment confirmation.`
                : "Payment verification failed. Please contact us if you were charged.",
            );
            setBusy(false);
          }
        },
        modal: { ondismiss: () => setBusy(false) },
      });
      checkout.on("payment.failed", (response) => {
        setError(
          response.error?.description ||
            "Payment was not completed. Please try again.",
        );
        setBusy(false);
      });
      checkout.open();
    } catch (reason) {
      setError(
        reason instanceof Error
          ? reason.message
          : "Something went wrong. Please try again.",
      );
      setBusy(false);
    }
  }

  return (
    <main className="min-h-screen bg-ivory px-6 pb-24 pt-32 lg:px-[8vw]">
      <div className="mx-auto max-w-6xl">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-terracotta">
          Almost yours
        </p>
        <h1 className="font-serif text-4xl font-semibold text-charcoal">
          Checkout
        </h1>
        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_360px]">
          <form onSubmit={handleSubmit} className="space-y-10">
            <section aria-labelledby="contact-heading">
              <h2
                id="contact-heading"
                className="font-serif text-2xl font-semibold text-charcoal"
              >
                Contact information
              </h2>
              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                <label className="text-sm font-medium text-charcoal sm:col-span-2">
                  Email address
                  <input
                    required
                    type="email"
                    name="email"
                    autoComplete="email"
                    className="mt-2 w-full border border-sand-dark bg-white px-4 py-3 font-normal outline-none focus:border-terracotta"
                    placeholder="you@example.com"
                  />
                </label>
                <label className="text-sm font-medium text-charcoal sm:col-span-2">
                  Phone number
                  <input
                    required
                    type="tel"
                    name="phone"
                    autoComplete="tel"
                    className="mt-2 w-full border border-sand-dark bg-white px-4 py-3 font-normal outline-none focus:border-terracotta"
                    placeholder="10-digit mobile number"
                  />
                </label>
              </div>
            </section>
            <section aria-labelledby="delivery-heading">
              <h2
                id="delivery-heading"
                className="font-serif text-2xl font-semibold text-charcoal"
              >
                Delivery address
              </h2>
              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                <label className="text-sm font-medium text-charcoal sm:col-span-2">
                  Full name
                  <input
                    required
                    name="name"
                    autoComplete="name"
                    className="mt-2 w-full border border-sand-dark bg-white px-4 py-3 font-normal outline-none focus:border-terracotta"
                  />
                </label>
                <label className="text-sm font-medium text-charcoal sm:col-span-2">
                  Street address
                  <input
                    required
                    name="address"
                    autoComplete="street-address"
                    className="mt-2 w-full border border-sand-dark bg-white px-4 py-3 font-normal outline-none focus:border-terracotta"
                  />
                </label>
                <label className="text-sm font-medium text-charcoal">
                  City
                  <input
                    required
                    name="city"
                    autoComplete="address-level2"
                    className="mt-2 w-full border border-sand-dark bg-white px-4 py-3 font-normal outline-none focus:border-terracotta"
                  />
                </label>
                <label className="text-sm font-medium text-charcoal">
                  State
                  <input
                    required
                    name="state"
                    autoComplete="address-level1"
                    className="mt-2 w-full border border-sand-dark bg-white px-4 py-3 font-normal outline-none focus:border-terracotta"
                  />
                </label>
                <label className="text-sm font-medium text-charcoal">
                  PIN code
                  <input
                    required
                    inputMode="numeric"
                    pattern="[0-9]{6}"
                    maxLength={6}
                    name="postalCode"
                    autoComplete="postal-code"
                    className="mt-2 w-full border border-sand-dark bg-white px-4 py-3 font-normal outline-none focus:border-terracotta"
                  />
                </label>
                <label className="text-sm font-medium text-charcoal">
                  Country
                  <input
                    required
                    name="country"
                    autoComplete="country-name"
                    defaultValue="India"
                    className="mt-2 w-full border border-sand-dark bg-white px-4 py-3 font-normal outline-none focus:border-terracotta"
                  />
                </label>
              </div>
            </section>
            <section aria-labelledby="payment-heading">
              <h2
                id="payment-heading"
                className="font-serif text-2xl font-semibold text-charcoal"
              >
                Payment method
              </h2>
              <div className="mt-5 border border-sand-dark bg-ivory-dark p-4">
                <p className="text-sm font-medium text-charcoal">
                  Secure online payment
                </p>
                <p className="mt-1 text-xs leading-5 text-charcoal">
                  Pay by UPI, card, net banking or wallet through Razorpay.
                </p>
              </div>
            </section>
            {error && (
              <p
                role="alert"
                className="border border-terracotta/40 bg-white p-4 text-sm text-terracotta"
              >
                {error}
              </p>
            )}
            {items.length === 0 ? (
              <div className="border-y border-sand-dark py-8">
                <p className="text-sm text-charcoal">
                  Your cart is empty. Add something handmade to continue.
                </p>
                <Link
                  href="/crafts"
                  className="mt-4 inline-flex text-sm font-semibold text-terracotta underline underline-offset-4"
                >
                  Explore crafts
                </Link>
              </div>
            ) : (
              <button
                disabled={busy}
                type="submit"
                className="w-full bg-charcoal px-6 py-4 text-sm font-semibold text-ivory transition-colors hover:bg-terracotta disabled:cursor-wait disabled:opacity-60"
              >
                {busy
                  ? "Connecting to secure checkout…"
                  : `Pay securely · ${money(subtotal + shipping)}`}
              </button>
            )}
          </form>
          <aside className="h-fit border border-sand-dark bg-ivory-dark p-6 lg:sticky lg:top-36">
            <h2 className="font-serif text-xl font-semibold text-charcoal">
              Your order
            </h2>
            {items.length ? (
              <ul className="mt-5 divide-y divide-sand-dark border-y border-sand-dark">
                {items.map((item) => (
                  <li key={item.id} className="flex gap-4 py-4">
                    <div className="relative h-20 w-16 shrink-0 overflow-hidden bg-sand">
                      <Image
                        src={item.image}
                        alt={item.alt}
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-serif text-sm font-semibold text-charcoal">
                        {item.name}
                      </p>
                      <p className="mt-1 text-xs text-charcoal">{item.artisan}</p>
                      <p className="mt-2 text-xs text-charcoal">
                        Qty {item.quantity}
                      </p>
                    </div>
                    <p className="shrink-0 text-sm font-medium text-charcoal">
                      {money(item.price * item.quantity)}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-5 border-y border-sand-dark py-5 text-sm text-charcoal">
                No items in your cart yet.
              </p>
            )}
            <dl className="mt-5 space-y-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-charcoal">Subtotal</dt>
                <dd className="font-medium text-charcoal">{money(subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-charcoal">Shipping</dt>
                <dd className="font-medium text-charcoal">
                  {shipping === 0 ? "Free" : money(shipping)}
                </dd>
              </div>
              <div className="flex justify-between border-t border-sand-dark pt-4 text-base font-semibold">
                <dt>Total</dt>
                <dd>{money(subtotal + shipping)}</dd>
              </div>
            </dl>
            <p className="mt-4 text-xs leading-5 text-charcoal">
              {subtotal >= 999
                ? "Your order qualifies for free shipping."
                : "Free shipping on orders above ₹999."}
            </p>
            <Link
              href="/cart"
              className="mt-5 inline-flex text-sm text-terracotta underline underline-offset-4"
            >
              Edit your cart
            </Link>
          </aside>
        </div>
      </div>
    </main>
  );
}
