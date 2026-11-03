import { randomUUID } from "node:crypto";
import { getFreshProducts, saveCashOnDeliveryOrder } from "@/lib/supabase";

type CheckoutItem = { id: string; quantity: number };
type Address = {
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
};

function text(value: unknown, max = 200) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function POST(request: Request) {
  let body: { items?: CheckoutItem[]; customer?: Partial<Address> };
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid checkout details." }, { status: 400 });
  }

  const customer: Address = {
    name: text(body.customer?.name, 100),
    email: text(body.customer?.email, 120),
    phone: text(body.customer?.phone, 20),
    address: text(body.customer?.address, 200),
    city: text(body.customer?.city, 80),
    state: text(body.customer?.state, 80),
    postalCode: text(body.customer?.postalCode, 10),
    country: text(body.customer?.country, 56),
  };
  if (!customer.name || !/^\S+@\S+\.\S+$/.test(customer.email) || !customer.phone ||
      !customer.address || !customer.city || !customer.state || !/^\d{6}$/.test(customer.postalCode) || !customer.country) {
    return Response.json({ error: "Enter complete, valid contact and delivery details." }, { status: 400 });
  }
  if (!Array.isArray(body.items) || body.items.length < 1 || body.items.length > 20) {
    return Response.json({ error: "Your cart is empty or contains too many items." }, { status: 400 });
  }

  try {
    const products = await getFreshProducts();
    const normalized = body.items.map(({ id, quantity }) => {
      const product = products.find((item) => item.slug === id);
      if (!product || !Number.isInteger(quantity) || quantity < 1 || quantity > 20) return null;
      return { product, quantity };
    });
    if (normalized.some((item) => !item)) {
      return Response.json({ error: "One or more products are invalid." }, { status: 400 });
    }

    const validItems = normalized as { product: (typeof products)[number]; quantity: number }[];
    const items = validItems.map(({ product, quantity }) => ({
      slug: product.slug,
      title: product.title,
      artisan: product.artisan,
      price: product.price,
      quantity,
    }));
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shipping = subtotal >= 999 ? 0 : 99;
    const orderNumber = `KAL-${randomUUID().replaceAll("-", "").slice(0, 12).toUpperCase()}`;
    await saveCashOnDeliveryOrder({ orderNumber, customer, items, subtotal, shipping, total: subtotal + shipping });
    return Response.json({ orderNumber, total: subtotal + shipping, paymentMethod: "Cash on Delivery" });
  } catch (error) {
    console.error("Order creation failed:", error);
    return Response.json({ error: "We could not place your order. Please try again." }, { status: 503 });
  }
}
