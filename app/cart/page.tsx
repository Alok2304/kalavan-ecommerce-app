"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/cart";

export default function CartPage() {
  const { items, setQuantity, removeItem } = useCart();
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <main className="min-h-screen bg-ivory px-6 pb-24 pt-32 lg:px-[8vw]">
      <div className="mx-auto max-w-5xl">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-terracotta">
          Your selection
        </p>
        <h1 className="font-serif text-4xl font-semibold text-charcoal">
          Shopping cart
        </h1>
        {!items.length ? (
          <div className="mt-10 border-y border-sand-dark py-12 text-center">
            <p className="text-muted">Your cart is empty.</p>
            <Link
              href="/crafts"
              className="mt-5 inline-flex bg-charcoal px-5 py-3 text-sm font-medium text-ivory hover:bg-terracotta"
            >
              Explore crafts
            </Link>
          </div>
        ) : (
          <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_280px]">
            <ul className="divide-y divide-sand-dark border-y border-sand-dark">
              {items.map((item) => (
                <li key={item.id} className="flex gap-5 py-6">
                  <div className="relative h-28 w-24 shrink-0 overflow-hidden bg-sand sm:h-36 sm:w-30">
                    <Image
                      src={item.image}
                      alt={item.alt}
                      fill
                      sizes="120px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col sm:flex-row sm:justify-between">
                    <div>
                      <h2 className="font-serif text-lg font-semibold text-charcoal">
                        {item.name}
                      </h2>
                      <p className="mt-1 text-sm text-muted">{item.artisan}</p>
                      <p className="mt-3 font-semibold text-charcoal">
                        ₹{item.price.toLocaleString("en-IN")}
                      </p>
                    </div>
                    <div className="mt-4 flex items-center gap-4 sm:mt-0 sm:flex-col sm:items-end sm:justify-between">
                      <div className="flex items-center border border-sand-dark">
                        <button
                          type="button"
                          aria-label={`Decrease ${item.name} quantity`}
                          onClick={() =>
                            setQuantity(item.id, item.quantity - 1)
                          }
                          className="px-3 py-1.5"
                        >
                          −
                        </button>
                        <span className="min-w-8 text-center text-sm">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          aria-label={`Increase ${item.name} quantity`}
                          onClick={() =>
                            setQuantity(item.id, item.quantity + 1)
                          }
                          className="px-3 py-1.5"
                        >
                          +
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        className="text-sm text-muted underline underline-offset-4 hover:text-terracotta"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <aside className="h-fit border border-sand-dark bg-ivory-dark p-6">
              <h2 className="font-serif text-xl font-semibold">
                Order summary
              </h2>
              <div className="mt-5 flex justify-between border-t border-sand-dark pt-4 font-semibold">
                <span>Subtotal</span>
                <span>₹{total.toLocaleString("en-IN")}</span>
              </div>
              <p className="mt-3 text-xs leading-5 text-charcoal">
                Shipping and taxes are calculated at checkout.
              </p>
              <Link
                href="/checkout"
                className="mt-6 flex w-full items-center justify-center bg-charcoal px-5 py-3 text-sm font-medium text-ivory transition-colors hover:bg-terracotta"
              >
                Continue to checkout
              </Link>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
}
