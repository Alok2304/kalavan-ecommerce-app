import Link from "next/link";
import { requireRole } from "@/lib/rbac";

export default async function AdminPage() {
  await requireRole("admin");
  return (
    <main className="mx-auto min-h-screen max-w-5xl px-6 py-32">
      <p className="text-sm uppercase tracking-widest text-terracotta">
        Kalavana
      </p>
      <h1 className="mt-3 font-serif text-4xl text-charcoal">
        Admin dashboard
      </h1>
      <p className="mt-4 text-muted">
        Manage customer and artisan access through the admin users API.
      </p>
      <Link className="mt-6 inline-block text-terracotta underline" href="/">
        Return to storefront
      </Link>
    </main>
  );
}
