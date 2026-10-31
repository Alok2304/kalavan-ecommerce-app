import { crafts } from "@/lib/crafts";

export async function GET(request: Request) {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const secret = process.env.RAZORPAY_KEY_SECRET;
  if (!keyId || !secret) return Response.json({ error: "Invoice service is not configured." }, { status: 503 });
  const url = new URL(request.url);
  const orderId = url.searchParams.get("order_id") ?? "";
  const paymentId = url.searchParams.get("payment_id") ?? "";
  if (!/^order_[\w]+$/.test(orderId) || !/^pay_[\w]+$/.test(paymentId)) {
    return Response.json({ error: "This invoice link is invalid." }, { status: 400 });
  }

  const auth = `Basic ${Buffer.from(`${keyId}:${secret}`).toString("base64")}`;
  const [orderResponse, paymentResponse] = await Promise.all([
    fetch(`https://api.razorpay.com/v1/orders/${orderId}`, { headers: { Authorization: auth }, cache: "no-store" }),
    fetch(`https://api.razorpay.com/v1/payments/${paymentId}`, { headers: { Authorization: auth }, cache: "no-store" }),
  ]);
  if (!orderResponse.ok || !paymentResponse.ok) return Response.json({ error: "We could not retrieve this invoice." }, { status: 404 });
  const [order, payment] = await Promise.all([orderResponse.json(), paymentResponse.json()]);
  if (payment.order_id !== order.id || payment.status !== "captured" || payment.amount !== order.amount || order.currency !== "INR") {
    return Response.json({ error: "An invoice is available only for a captured payment." }, { status: 403 });
  }

  const notes = order.notes ?? {};
  const lines = String(notes.items ?? "").split(",").map((entry: string) => {
    const separator = entry.lastIndexOf(":");
    const slug = entry.slice(0, separator);
    const quantity = Number(entry.slice(separator + 1));
    const craft = crafts.find((item) => item.slug === slug);
    return craft && Number.isInteger(quantity) && quantity > 0 && quantity <= 20
      ? { id: craft.slug, name: craft.title, artisan: craft.artisan, price: craft.price, quantity }
      : null;
  });
  if (!lines.length || lines.some((line: unknown) => !line)) return Response.json({ error: "Invoice items could not be validated." }, { status: 422 });
  const items = lines as { id: string; name: string; artisan: string; price: number; quantity: number }[];
  const subtotal = items.reduce((sum, line) => sum + line.price * line.quantity, 0);
  const shipping = Number(notes.shipping);
  if (![0, 99].includes(shipping) || shipping !== (subtotal >= 999 ? 0 : 99) || (subtotal + shipping) * 100 !== order.amount) {
    return Response.json({ error: "Invoice totals could not be validated." }, { status: 422 });
  }

  return Response.json({
    invoiceNumber: order.receipt,
    date: new Date(payment.created_at * 1000).toISOString(),
    paymentId: payment.id,
    customer: {
      name: notes.customer_name,
      email: notes.customer_email,
      phone: notes.customer_phone,
      address: notes.address,
      city: notes.city,
      state: notes.state,
      postalCode: notes.postal_code,
      country: notes.country,
    },
    items,
    subtotal,
    shipping,
    total: order.amount / 100,
    business: {
      name: process.env.INVOICE_BUSINESS_NAME || "Kalavan",
      address: process.env.INVOICE_BUSINESS_ADDRESS || "",
      gstin: process.env.INVOICE_GSTIN || "",
    },
  }, { headers: { "Cache-Control": "no-store" } });
}
