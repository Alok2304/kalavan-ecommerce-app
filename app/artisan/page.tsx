import Link from "next/link";
import { requireRole } from "@/lib/rbac";

export default async function ArtisanPage() {
  const artisan = await requireRole("artisan", "admin");
  return <main className="mx-auto min-h-screen max-w-5xl px-6 py-32"><p className="text-sm uppercase tracking-widest text-terracotta">Kalavana</p><h1 className="mt-3 font-serif text-4xl text-charcoal">Artisan workspace</h1><p className="mt-4 text-muted">{artisan.artisanId ? "Your artisan profile is linked." : "Your artisan profile has not been linked yet."}</p><Link className="mt-6 inline-block text-terracotta underline" href="/">Return to storefront</Link></main>;
}
