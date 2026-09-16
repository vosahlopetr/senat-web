import { verifyToken } from "@/lib/crypto";
import { env } from "@/lib/env";
import { isRateLimited, markTokenUsed, releaseTokenUse } from "@/lib/redis";
import { getResend } from "@/lib/resend";
import { isValidEmail } from "@/lib/validation";
import { TOKEN_EXPIRY_MS } from "@/lib/site-config";

export type ConfirmResult =
  | "confirmed"
  | "invalid_token"
  | "expired_token"
  | "used_token"
  | "rate_limited"
  | "server_error";

/**
 * Consumes a confirmation token and flips the Resend contact to subscribed:
 * per-IP rate limit → HMAC verification → expiry check → email re-validation
 * → single-use enforcement (fails closed in production when Redis is down)
 * → Resend update, with a compensating token release when that update fails
 * so the supporter can retry the same link.
 *
 * Only ever call this from a POST (the /potvrzeni form action): mail
 * scanners prefetch GET links, and a GET that consumed tokens would let
 * them auto-confirm subscriptions.
 */
export async function confirmToken(
  token: string | null,
  ip: string | null,
): Promise<ConfirmResult> {
  if (await isRateLimited("confirm-ip", ip)) {
    return "rate_limited";
  }

  if (!token) {
    return "invalid_token";
  }

  let tokenMarkedUsed = false;

  try {
    const tokenData = verifyToken(token);
    if (!tokenData) {
      return "invalid_token";
    }
    const { email, timestamp } = tokenData;

    const tokenAge = Date.now() - timestamp;
    if (tokenAge > TOKEN_EXPIRY_MS) {
      return "expired_token";
    }

    // Defense in depth: the payload is HMAC-signed, but never forward an
    // unexpected value to Resend.
    if (!isValidEmail(email)) {
      return "invalid_token";
    }

    // Single-use enforcement: reject replayed confirmation links.
    const useResult = await markTokenUsed(token, TOKEN_EXPIRY_MS - tokenAge);
    if (useResult === "already-used") {
      return "used_token";
    }
    if (useResult === "unavailable" && env.isProduction) {
      console.error("Token confirmation: Redis unavailable, failing closed");
      return "server_error";
    }
    tokenMarkedUsed = useResult === "ok";

    const { error } = await getResend().contacts.update({
      email,
      unsubscribed: false,
    });

    if (error) {
      console.error("Failed to update contact in Resend:", error);
      // The confirmation did not go through – release the token so the
      // supporter can retry the same link instead of seeing "used_token".
      if (tokenMarkedUsed) await releaseTokenUse(token);
      return "server_error";
    }

    return "confirmed";
  } catch (error) {
    console.error("Token confirmation error:", error);
    if (tokenMarkedUsed) await releaseTokenUse(token);
    return "invalid_token";
  }
}
