"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart";

export default function CartLink() {
  const { items } = useCart();
  const count = items.reduce((total, item) => total + item.quantity, 0);
  return (
    <Link href="/cart" aria-label={`Shopping cart, ${count} items`} className="relative inline-flex items-center text-charcoal transition-colors hover:text-terracotta">
      <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden="true">
        <circle cx="9" cy="20" r="1.4" /><circle cx="18" cy="20" r="1.4" />
        <path d="M3 4h2l2.2 10.1a2 2 0 0 0 2 1.6h7.9a2 2 0 0 0 1.9-1.4L21 7H6" />
      </svg>
      {count > 0 && <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-terracotta px-1 text-[10px] font-semibold text-ivory">{count}</span>}
    </Link>
  );
}
