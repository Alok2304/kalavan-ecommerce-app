import { createHmac, timingSafeEqual } from "node:crypto";

export async function POST(request: Request) {
  const secret = process.env.RAZORPAY_KEY_SECRET;
  const keyId = process.env.RAZORPAY_KEY_ID;
  if (!secret || !keyId) return Response.json({ error: "Payment verification is not configured." }, { status: 503 });

  let body: { orderId?: string; paymentId?: string; signature?: string };
  try { body = await request.json(); } catch { return Response.json({ error: "Invalid payment response." }, { status: 400 }); }
  const { orderId, paymentId, signature } = body;
  if (!orderId || !paymentId || !signature || !/^order_[\w]+$/.test(orderId) || !/^pay_[\w]+$/.test(paymentId)) {
    return Response.json({ error: "Payment details are incomplete." }, { status: 400 });
  }
  const expected = createHmac("sha256", secret).update(`${orderId}|${paymentId}`).digest("hex");
  const actualBuffer = Buffer.from(signature, "hex");
  const expectedBuffer = Buffer.from(expected, "hex");
  if (actualBuffer.length !== expectedBuffer.length || !timingSafeEqual(actualBuffer, expectedBuffer)) {
    return Response.json({ error: "Payment could not be verified." }, { status: 400 });
  }

  const auth = `Basic ${Buffer.from(`${keyId}:${secret}`).toString("base64")}`;
  const [orderResponse, paymentResponse] = await Promise.all([
    fetch(`https://api.razorpay.com/v1/orders/${orderId}`, { headers: { Authorization: auth }, cache: "no-store" }),
    fetch(`https://api.razorpay.com/v1/payments/${paymentId}`, { headers: { Authorization: auth }, cache: "no-store" }),
  ]);
  if (!orderResponse.ok || !paymentResponse.ok) return Response.json({ error: "Payment verification is temporarily unavailable." }, { status: 502 });
  const [order, payment] = await Promise.all([orderResponse.json(), paymentResponse.json()]);
  if (payment.order_id !== order.id || payment.status !== "captured" || payment.amount !== order.amount || order.currency !== "INR") {
    return Response.json({ error: "Payment is not captured for this order." }, { status: 400 });
  }
  return Response.json({ invoiceUrl: `/invoice?order_id=${encodeURIComponent(order.id)}&payment_id=${encodeURIComponent(payment.id)}` });
}
