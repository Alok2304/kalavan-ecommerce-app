import { randomUUID } from "node:crypto";
import { crafts } from "@/lib/crafts";

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
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;
  if (!keyId || !keySecret) {
    return Response.json({ error: "Online payments are not configured yet." }, { status: 503 });
  }

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

  const normalized = body.items.map(({ id, quantity }) => {
    const craft = crafts.find((item) => item.slug === id);
    if (!craft || !Number.isInteger(quantity) || quantity < 1 || quantity > 20) return null;
    return { craft, quantity };
  });
  if (normalized.some((item) => !item)) {
    return Response.json({ error: "One or more products are invalid." }, { status: 400 });
  }

  const validItems = normalized as { craft: (typeof crafts)[number]; quantity: number }[];
  const subtotal = validItems.reduce((sum, item) => sum + item.craft.price * item.quantity, 0);
  const shipping = subtotal >= 999 ? 0 : 99;
  const total = subtotal + shipping;
  const productNotes = validItems.map(({ craft, quantity }) => `${craft.slug}:${quantity}`).join(",");
  if (productNotes.length > 256) return Response.json({ error: "Your cart is too large to check out." }, { status: 400 });

  const receipt = `KAL-${randomUUID().replaceAll("-", "").slice(0, 16).toUpperCase()}`;
  const notes = {
    items: productNotes,
    shipping: String(shipping),
    customer_name: customer.name,
    customer_email: customer.email,
    customer_phone: customer.phone,
    address: customer.address,
    city: customer.city,
    state: customer.state,
    postal_code: customer.postalCode,
    country: customer.country,
  };

  const response = await fetch("https://api.razorpay.com/v1/orders", {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`${keyId}:${keySecret}`).toString("base64")}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ amount: total * 100, currency: "INR", receipt, notes }),
    cache: "no-store",
  });
  if (!response.ok) {
    return Response.json({ error: "We could not start payment. Please try again." }, { status: 502 });
  }
  const order = await response.json();
  return Response.json({ orderId: order.id, amount: order.amount, currency: order.currency, keyId, name: customer.name, email: customer.email, phone: customer.phone });
}
