"use server";

import { headers } from "next/headers";
import { generateToken } from "@/lib/crypto";
import { env } from "@/lib/env";
import { isRateLimited } from "@/lib/redis";
import { getResend } from "@/lib/resend";
import { isValidEmail } from "@/lib/validation";
import {
  CONFIRMATION_EMAIL_SUBJECT,
  renderConfirmationEmail,
} from "@/lib/email/confirmation-email";

export type NewsletterResponse = {
  success: boolean;
  error?: "invalid_email" | "rate_limited" | "server_error";
};

export async function subscribeToNewsletter(
  formData: FormData,
): Promise<NewsletterResponse> {
  const website = formData.get("website");
  if (typeof website === "string" && website.length > 0) {
    // Honeypot field filled - trick bot into thinking it succeeded
    return { success: true };
  }

  const headersList = await headers();
  const ip =
    headersList.get("x-real-ip") ||
    headersList.get("x-forwarded-for")?.split(",").pop()?.trim() ||
    null;

  if (await isRateLimited("subscribe-ip", ip)) {
    return { success: false, error: "rate_limited" };
  }

  const rawEmail = formData.get("email");
  const email =
    typeof rawEmail === "string" ? rawEmail.trim().toLowerCase() : "";

  if (!isValidEmail(email)) {
    return { success: false, error: "invalid_email" };
  }

  // Per-address limit prevents spamming confirmation emails to a victim
  // address from rotating IPs (email harassment / Resend quota burn).
  if (await isRateLimited("subscribe-email", email)) {
    return { success: false, error: "rate_limited" };
  }

  try {
    const resend = getResend();

    const { error } = await resend.contacts.create({
      email: email,
      unsubscribed: true,
    });

    if (error) {
      // Resend rejects creating a contact that already exists. A supporter
      // who lost the first confirmation email must still be able to request
      // a new one, so verify the contact exists and continue. The existing
      // contact's `unsubscribed` state is deliberately left untouched.
      const { data: existingContact } = await resend.contacts.get({ email });
      if (!existingContact) {
        console.error("Resend error:", error);
        return { success: false, error: "server_error" };
      }
    }

    const token = generateToken(email);
    const confirmationLink = `${env.siteUrl}/potvrzeni?token=${encodeURIComponent(token)}`;

    const { error: emailError } = await resend.emails.send({
      from: env.resendFromEmail,
      to: email,
      subject: CONFIRMATION_EMAIL_SUBJECT,
      html: renderConfirmationEmail({ siteUrl: env.siteUrl, confirmationLink }),
    });

    if (emailError) {
      console.error("Resend email error:", emailError);
      return { success: false, error: "server_error" };
    }

    return { success: true };
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    return { success: false, error: "server_error" };
  }
}
