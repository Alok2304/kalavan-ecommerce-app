import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { crafts, getCraftBySlug } from "@/lib/crafts";
import CraftDetails from "./craft-details";

type CraftPageProps = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return crafts.map((craft) => ({ id: craft.slug }));
}

export async function generateMetadata({ params }: CraftPageProps): Promise<Metadata> {
  const { id } = await params;
  const craft = getCraftBySlug(id);
  if (!craft) return { title: "Craft not found | Kalavana" };

  return {
    title: `${craft.title} | Kalavana`,
    description: craft.description,
  };
}

function CraftDetailsFallback() {
  return (
    <section
      aria-label="Loading craft details"
      className="mx-auto grid max-w-7xl items-start gap-10 lg:grid-cols-2 lg:gap-16"
    >
      <div className="aspect-4/5 animate-pulse bg-sand" />
      <div className="space-y-6 lg:pt-4">
        <div className="h-3 w-48 animate-pulse bg-sand" />
        <div className="h-12 w-4/5 animate-pulse bg-sand" />
        <div className="h-24 animate-pulse bg-sand" />
        <div className="h-8 w-28 animate-pulse bg-sand" />
        <div className="h-14 animate-pulse bg-sand" />
      </div>
    </section>
  );
}

export default function CraftDetailPage({ params }: CraftPageProps) {
  return (
    <main className="min-h-screen bg-ivory px-6 pb-24 pt-32 lg:px-[6vw] lg:pb-32">
      <nav aria-label="Breadcrumb" className="mx-auto mb-8 max-w-7xl">
        <ol className="flex items-center gap-2 text-xs tracking-wide text-muted">
          <li>
            <Link href="/" className="transition-colors hover:text-terracotta">
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link
              href="/crafts"
              className="transition-colors hover:text-terracotta"
            >
              Crafts
            </Link>
          </li>
        </ol>
      </nav>
      <Suspense fallback={<CraftDetailsFallback />}>
        <CraftDetails params={params} />
      </Suspense>
    </main>
  );
}
