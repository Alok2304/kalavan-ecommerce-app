"use client";

import { useCart, type CartProduct } from "@/lib/cart";
import type { ButtonHTMLAttributes } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & { product: CartProduct };

export default function AddToCartButton({ product, className, children = "Add to Cart", ...buttonProps }: Props) {
  const { addItem } = useCart();
  return <button {...buttonProps} type="button" onClick={(event) => { buttonProps.onClick?.(event); addItem(product); }} className={className}>{children}</button>;
}
