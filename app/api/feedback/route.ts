import { saveWebsiteFeedback } from "@/lib/supabase";

const topics = ["Overall experience", "Shopping and checkout", "Product information", "Website design and usability", "Other"];
function text(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Please check your feedback details and try again." }, { status: 400 });
  }

  const name = text(body.name, 100);
  const email = text(body.email, 254).toLowerCase();
  const rating = body.rating;
  const topic = text(body.topic, 80);
  const message = text(body.message, 2000);
  if (!name || !/^\S+@\S+\.\S+$/.test(email) || !Number.isInteger(rating) || Number(rating) < 1 || Number(rating) > 5 || !topics.includes(topic) || message.length < 10) {
    return Response.json({ error: "Enter a valid name, email, rating, topic and a message of at least 10 characters." }, { status: 400 });
  }

  try {
    await saveWebsiteFeedback({ name, email, rating: Number(rating), topic, message });
    return Response.json({ message: "Thank you for sharing your feedback." });
  } catch (error) {
    console.error("Feedback submission failed:", error);
    return Response.json({ error: "We could not save your feedback right now. Please try again." }, { status: 503 });
  }
}
