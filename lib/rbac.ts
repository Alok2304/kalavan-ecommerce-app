import "server-only";

import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { getProfileRole, type AppRole } from "@/lib/supabase";

export async function currentAccess() {
  const { userId } = await auth();
  if (!userId) return null;
  const profile = await getProfileRole(userId);
  return profile ? { userId, ...profile } : null;
}

export async function requireRole(...roles: AppRole[]) {
  const access = await currentAccess();
  if (!access) redirect("/sign-in");
  if (!roles.includes(access.role)) redirect("/");
  return access;
}

export async function authorizeApi(...roles: AppRole[]) {
  const access = await currentAccess();
  if (!access) return { error: Response.json({ error: "Authentication required." }, { status: 401 }) };
  if (!roles.includes(access.role)) return { error: Response.json({ error: "Forbidden." }, { status: 403 }) };
  return { access };
}
