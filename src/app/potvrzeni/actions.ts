"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { confirmToken } from "@/lib/confirm";

/**
 * POST target of the /potvrzeni form. Requiring an explicit form submit
 * (instead of confirming on GET) keeps mail scanners that prefetch links
 * from consuming tokens and auto-confirming subscriptions.
 *
 * Redirects into the homepage support modal, which already renders all
 * confirmation outcomes from the `success`/`error` query params.
 */
export async function confirmSubscription(formData: FormData): Promise<void> {
  const rawToken = formData.get("token");
  const token = typeof rawToken === "string" ? rawToken : null;

  const headersList = await headers();
  const ip =
    headersList.get("x-real-ip") ||
    headersList.get("x-forwarded-for")?.split(",").pop()?.trim() ||
    null;

  const result = await confirmToken(token, ip);

  redirect(
    result === "confirmed"
      ? "/?modal=support&success=true"
      : `/?modal=support&error=${result}`,
  );
}
