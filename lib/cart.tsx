"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
} from "react";
import { useUser } from "@clerk/nextjs";

export type CartProduct = {
  id: string;
  name: string;
  artisan: string;
  price: number;
  image: string;
  alt: string;
};

type CartLine = CartProduct & { quantity: number };
type CartContextValue = {
  items: CartLine[];
  addItem: (product: CartProduct) => void;
  setQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const EMPTY_CART: CartLine[] = [];
const storageKey = (userId: string) => `kalavana-cart-${userId}`;
const snapshots = new Map<string, CartLine[]>();
const subscribers = new Map<string, Set<() => void>>();

function readCart(userId: string): CartLine[] {
  const cached = snapshots.get(userId);
  if (cached) return cached;

  let items: CartLine[] = [];
  try {
    const saved = window.localStorage.getItem(storageKey(userId));
    const parsed: unknown = saved ? JSON.parse(saved) : [];
    if (Array.isArray(parsed)) {
      items = parsed.filter(
        (item): item is CartLine =>
          typeof item === "object" &&
          item !== null &&
          typeof item.id === "string" &&
          typeof item.name === "string" &&
          typeof item.artisan === "string" &&
          typeof item.price === "number" &&
          typeof item.image === "string" &&
          typeof item.alt === "string" &&
          Number.isInteger(item.quantity) &&
          item.quantity > 0,
      );
    }
  } catch {
    items = [];
  }

  snapshots.set(userId, items);
  return items;
}

function notifySubscribers(userId: string) {
  subscribers.get(userId)?.forEach((notify) => notify());
}

function subscribeToCart(userId: string, notify: () => void) {
  const listeners = subscribers.get(userId) ?? new Set<() => void>();
  listeners.add(notify);
  subscribers.set(userId, listeners);

  const onStorage = (event: StorageEvent) => {
    if (event.key === storageKey(userId)) {
      snapshots.delete(userId);
      notifySubscribers(userId);
    }
  };
  window.addEventListener("storage", onStorage);

  return () => {
    listeners.delete(notify);
    if (listeners.size === 0) subscribers.delete(userId);
    window.removeEventListener("storage", onStorage);
  };
}

function updateCart(userId: string, update: (items: CartLine[]) => CartLine[]) {
  const items = update(readCart(userId));
  snapshots.set(userId, items);
  window.localStorage.setItem(storageKey(userId), JSON.stringify(items));
  notifySubscribers(userId);
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const { user } = useUser();
  const userId = user?.id;

  const subscribe = useCallback(
    (notify: () => void) => (userId ? subscribeToCart(userId, notify) : () => {}),
    [userId],
  );
  const getSnapshot = useCallback(
    () => (userId ? readCart(userId) : EMPTY_CART),
    [userId],
  );
  const items = useSyncExternalStore(subscribe, getSnapshot, () => EMPTY_CART);

  const addItem = useCallback(
    (product: CartProduct) => {
      if (!userId) return;
      updateCart(userId, (current) => {
        const found = current.find((item) => item.id === product.id);
        return found
          ? current.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item,
            )
          : [...current, { ...product, quantity: 1 }];
      });
    },
    [userId],
  );

  const setQuantity = useCallback(
    (id: string, quantity: number) => {
      if (!userId) return;
      updateCart(userId, (current) =>
        quantity <= 0
          ? current.filter((item) => item.id !== id)
          : current.map((item) =>
              item.id === id ? { ...item, quantity } : item,
            ),
      );
    },
    [userId],
  );

  const removeItem = useCallback(
    (id: string) => {
      if (!userId) return;
      updateCart(userId, (current) => current.filter((item) => item.id !== id));
    },
    [userId],
  );

  const value = useMemo(
    () => ({ items, addItem, setQuantity, removeItem }),
    [items, addItem, setQuantity, removeItem],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider");
  return context;
}
