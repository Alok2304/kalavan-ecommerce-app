"use client";

import { useCart, type CartProduct } from "@/lib/cart";
import { usePathname, useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import type { ButtonHTMLAttributes } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & { product: CartProduct };

export default function AddToCartButton({ product, className, children = "Add to Cart", ...buttonProps }: Props) {
  const { addItem } = useCart();
  const { isLoaded, user } = useUser();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <button
      {...buttonProps}
      type="button"
      onClick={(event) => {
        buttonProps.onClick?.(event);
        if (event.defaultPrevented || !isLoaded) return;
        if (!user) {
          const slug = product.id.startsWith("craft-")
            ? product.id.slice("craft-".length)
            : null;
          const returnPath = slug ? `/crafts/${slug}` : pathname;
          router.push(`/sign-in?redirect_url=${encodeURIComponent(returnPath)}`);
          return;
        }
        addItem(product);
      }}
      className={className}
    >
      {children}
    </button>
  );
}
