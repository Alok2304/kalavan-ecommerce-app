import "server-only";
import { cacheLife } from "next/cache";

import type { Craft } from "@/lib/crafts";

type ProductRow = {
  slug: string;
  title: string;
  description: string;
  price_inr: number;
  image_url: string;
  image_alt: string;
  artisan_name: string;
  location: string;
};

function config() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) {
    throw new Error("Supabase is not configured. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY.");
  }
  return { url: url.replace(/\/$/, ""), key };
}

function toCraft(row: ProductRow): Craft {
  return {
    slug: row.slug,
    title: row.title,
    artisan: row.artisan_name,
    place: row.location,
    price: row.price_inr,
    image: row.image_url,
    alt: row.image_alt,
    description: row.description,
  };
}

async function requestProducts(cache: RequestCache): Promise<Craft[]> {
  const settings = config();
  const response = await fetch(
    `${settings.url}/rest/v1/products?select=slug,title,description,price_inr,image_url,image_alt,artisan_name,location&active=eq.true&order=created_at.asc`,
    { headers: { apikey: settings.key }, cache },
  );
  if (!response.ok) throw new Error(`Supabase product query failed (${response.status}).`);
  const rows = (await response.json()) as ProductRow[];
  return rows.map(toCraft);
}

/** Reads the catalog and keeps it warm for navigations. */
export async function getProducts(): Promise<Craft[]> {
  "use cache";
  cacheLife("hours");
  return requestProducts("force-cache");
}

/** Reads fresh catalog data for checkout validation. */
export async function getFreshProducts(): Promise<Craft[]> {
  return requestProducts("no-store");
}

/** Clerk webhook profile sync. The service key is only used on the server. */
export async function syncClerkProfile(profile: {
  id: string;
  email: string | null;
  name: string | null;
  imageUrl: string | null;
}) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("Supabase service role is not configured.");

  const response = await fetch(`${url.replace(/\/$/, "")}/rest/v1/profiles?on_conflict=clerk_user_id`, {
    method: "POST",
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      Prefer: "resolution=merge-duplicates",
    },
    body: JSON.stringify({
      clerk_user_id: profile.id,
      email: profile.email,
      full_name: profile.name,
      avatar_url: profile.imageUrl,
      ...(adminUserIds().has(profile.id) ? { role: "admin" } : {}),
    }),
  });
  if (!response.ok) throw new Error(`Supabase profile sync failed (${response.status}).`);
}

function adminUserIds() {
  return new Set((process.env.CLERK_ADMIN_USER_IDS ?? "").split(",").map((id) => id.trim()).filter(Boolean));
}

export type AppRole = "admin" | "customer" | "artisan";

export async function getProfileRole(clerkUserId: string): Promise<{ role: AppRole; artisanId: string | null } | null> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  const response = await fetch(`${url.replace(/\/$/, "")}/rest/v1/profiles?select=role,artisan_id&clerk_user_id=eq.${encodeURIComponent(clerkUserId)}&limit=1`, {
    headers: { apikey: key, Authorization: `Bearer ${key}` }, cache: "no-store",
  });
  if (!response.ok) return null;
  const rows = await response.json() as { role: AppRole; artisan_id: string | null }[];
  return rows[0] ? { role: rows[0].role, artisanId: rows[0].artisan_id } : null;
}

export async function deleteClerkProfile(clerkUserId: string) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("Supabase service role is not configured.");

  const response = await fetch(
    `${url.replace(/\/$/, "")}/rest/v1/profiles?clerk_user_id=eq.${encodeURIComponent(clerkUserId)}`,
    { method: "DELETE", headers: { apikey: key, Authorization: `Bearer ${key}` } },
  );
  if (!response.ok) throw new Error(`Supabase profile deletion failed (${response.status}).`);
}

export async function saveCashOnDeliveryOrder(order: {
  orderNumber: string;
  customer: Record<string, string>;
  items: { slug: string; title: string; artisan: string; price: number; quantity: number }[];
  subtotal: number;
  shipping: number;
  total: number;
}) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("Supabase service role is not configured.");

  const response = await fetch(`${url.replace(/\/$/, "")}/rest/v1/orders`, {
    method: "POST",
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      Prefer: "return=minimal",
    },
    body: JSON.stringify({
      order_number: order.orderNumber,
      customer: order.customer,
      items: order.items,
      subtotal_inr: order.subtotal,
      shipping_inr: order.shipping,
      total_inr: order.total,
      payment_method: "cash_on_delivery",
    }),
    cache: "no-store",
  });
  if (!response.ok) throw new Error(`Supabase order save failed (${response.status}).`);
}
