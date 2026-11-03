import { verifyWebhook } from "@clerk/nextjs/webhooks";
import type { NextRequest } from "next/server";
import { deleteClerkProfile, syncClerkProfile } from "@/lib/supabase";

type ClerkUserData = {
  id: string;
  first_name?: string | null;
  last_name?: string | null;
  image_url?: string | null;
  email_addresses?: { id: string; email_address: string }[];
  primary_email_address_id?: string | null;
};

export async function POST(request: NextRequest) {
  let event;
  try {
    event = await verifyWebhook(request);
  } catch {
    return Response.json({ error: "Invalid webhook signature." }, { status: 400 });
  }

  const data = event.data as ClerkUserData;
  if (event.type === "user.created" || event.type === "user.updated") {
    const email = data.email_addresses?.find((item) => item.id === data.primary_email_address_id)?.email_address ?? null;
    const name = [data.first_name, data.last_name].filter(Boolean).join(" ") || null;
    try {
      await syncClerkProfile({ id: data.id, email, name, imageUrl: data.image_url ?? null });
    } catch {
      return Response.json({ error: "Profile sync failed." }, { status: 500 });
    }
  } else if (event.type === "user.deleted") {
    try {
      await deleteClerkProfile(data.id);
    } catch {
      return Response.json({ error: "Profile deletion failed." }, { status: 500 });
    }
  }

  return Response.json({ received: true });
}
