import { authorizeApi } from "@/lib/rbac";

export async function PATCH(request: Request, { params }: { params: Promise<{ userId: string }> }) {
  const authorization = await authorizeApi("admin");
  if ("error" in authorization) return authorization.error;
  let body: { role?: unknown; artisanId?: unknown };
  try { body = await request.json(); } catch { return Response.json({ error: "Invalid request." }, { status: 400 }); }
  if (body.role !== "customer" && body.role !== "artisan") {
    return Response.json({ error: "Role must be customer or artisan." }, { status: 400 });
  }
  if (body.role === "artisan" && (typeof body.artisanId !== "string" || !/^[0-9a-f-]{36}$/i.test(body.artisanId))) {
    return Response.json({ error: "A valid artisanId is required for artisan access." }, { status: 400 });
  }
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return Response.json({ error: "Role management is not configured." }, { status: 503 });
  const { userId } = await params;
  const response = await fetch(`${url.replace(/\/$/, "")}/rest/v1/profiles?clerk_user_id=eq.${encodeURIComponent(userId)}`, {
    method: "PATCH", headers: { apikey: key, Authorization: `Bearer ${key}`, "Content-Type": "application/json", Prefer: "return=minimal" },
    body: JSON.stringify({ role: body.role, artisan_id: body.role === "artisan" ? body.artisanId : null }), cache: "no-store",
  });
  if (response.status === 204) return Response.json({ updated: true });
  if (response.ok) return Response.json({ updated: true });
  return Response.json({ error: "Could not update role." }, { status: response.status });
}
