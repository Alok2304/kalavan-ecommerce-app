"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

type Invoice = {
  invoiceNumber: string;
  date: string;
  paymentId: string;
  customer: { name: string; email: string; phone: string; address: string; city: string; state: string; postalCode: string; country: string };
  items: { id: string; name: string; artisan: string; price: number; quantity: number }[];
  subtotal: number;
  shipping: number;
  total: number;
  business: { name: string; address: string; gstin: string };
};

const money = (amount: number) => `₹${amount.toLocaleString("en-IN")}`;

function InvoiceContent() {
  const params = useSearchParams();
  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const orderId = params.get("order_id");
    const paymentId = params.get("payment_id");
    if (!orderId || !paymentId) { setError("This invoice link is incomplete."); return; }
    fetch(`/api/invoice?order_id=${encodeURIComponent(orderId)}&payment_id=${encodeURIComponent(paymentId)}`)
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || "We could not load your invoice.");
        setInvoice(data);
      })
      .catch((reason: unknown) => setError(reason instanceof Error ? reason.message : "We could not load your invoice."));
  }, [params]);

  if (error) return <main className="min-h-screen bg-ivory px-6 pt-36 text-center"><h1 className="font-serif text-3xl text-charcoal">Invoice unavailable</h1><p className="mt-4 text-muted">{error}</p><Link href="/crafts" className="mt-8 inline-flex bg-charcoal px-6 py-3 text-sm text-ivory">Explore crafts</Link></main>;
  if (!invoice) return <main className="min-h-screen bg-ivory px-6 pt-36 text-center text-muted">Preparing your invoice…</main>;

  return (
    <main className="min-h-screen bg-ivory px-6 pb-20 pt-32 print:bg-white print:p-0">
      <article className="mx-auto max-w-3xl border border-sand-dark bg-white p-8 sm:p-12 print:border-0 print:p-0">
        <div className="flex flex-wrap items-start justify-between gap-6 border-b border-sand-dark pb-8">
          <div><p className="font-serif text-3xl font-semibold text-charcoal">{invoice.business.name}</p><p className="mt-2 whitespace-pre-line text-sm leading-6 text-muted">{invoice.business.address}</p>{invoice.business.gstin && <p className="mt-2 text-sm text-muted">GSTIN: {invoice.business.gstin}</p>}</div>
          <div className="text-left sm:text-right"><p className="text-xs font-semibold uppercase tracking-[0.2em] text-terracotta">Payment invoice</p><p className="mt-2 font-serif text-xl font-semibold text-charcoal">{invoice.invoiceNumber}</p><p className="mt-1 text-sm text-muted">{new Date(invoice.date).toLocaleDateString("en-IN", { dateStyle: "long" })}</p><p className="mt-1 text-sm text-muted">Paid · Razorpay</p></div>
        </div>
        <section className="grid gap-8 border-b border-sand-dark py-7 sm:grid-cols-2"><div><h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">Billed to</h2><p className="mt-3 font-medium text-charcoal">{invoice.customer.name}</p><p className="mt-1 text-sm leading-6 text-muted">{invoice.customer.email}<br />{invoice.customer.phone}</p></div><div><h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">Delivery address</h2><p className="mt-3 whitespace-pre-line text-sm leading-6 text-charcoal">{invoice.customer.address}<br />{invoice.customer.city}, {invoice.customer.state} {invoice.customer.postalCode}<br />{invoice.customer.country}</p></div></section>
        <div className="overflow-x-auto"><table className="w-full min-w-[520px] text-left text-sm"><thead><tr className="border-b border-sand-dark text-xs uppercase tracking-wider text-muted"><th className="py-4 font-medium">Item</th><th className="py-4 text-right font-medium">Price</th><th className="py-4 text-right font-medium">Qty</th><th className="py-4 text-right font-medium">Amount</th></tr></thead><tbody>{invoice.items.map((item) => <tr key={item.id} className="border-b border-sand-dark"><td className="py-4"><span className="font-medium text-charcoal">{item.name}</span><span className="mt-1 block text-xs text-muted">{item.artisan}</span></td><td className="py-4 text-right">{money(item.price)}</td><td className="py-4 text-right">{item.quantity}</td><td className="py-4 text-right font-medium">{money(item.price * item.quantity)}</td></tr>)}</tbody></table></div>
        <dl className="ml-auto mt-6 max-w-xs space-y-3 text-sm"><div className="flex justify-between"><dt className="text-muted">Subtotal</dt><dd>{money(invoice.subtotal)}</dd></div><div className="flex justify-between"><dt className="text-muted">Shipping</dt><dd>{invoice.shipping ? money(invoice.shipping) : "Free"}</dd></div><div className="flex justify-between border-t border-sand-dark pt-4 text-base font-semibold"><dt>Total paid</dt><dd>{money(invoice.total)}</dd></div></dl>
        <p className="mt-8 border-t border-sand-dark pt-5 text-xs leading-5 text-muted">Payment ID: {invoice.paymentId}<br />This invoice records payment for the items listed above. Tax registration details are provided only when configured by the seller.</p>
        <div className="mt-8 flex flex-wrap gap-3 print:hidden"><button onClick={() => window.print()} className="bg-charcoal px-6 py-3 text-sm font-medium text-ivory hover:bg-terracotta">Print / Save as PDF</button><Link href="/crafts" className="border border-sand-dark px-6 py-3 text-sm text-charcoal">Continue exploring</Link></div>
      </article>
    </main>
  );
}

export default function InvoicePage() {
  return <Suspense fallback={<main className="min-h-screen bg-ivory px-6 pt-36 text-center text-muted">Preparing your invoice…</main>}><InvoiceContent /></Suspense>;
}
