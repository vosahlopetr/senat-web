import crypto from "node:crypto";
import { env } from "@/lib/env";

const secret = env.secretPassphrase;

export function generateToken(email: string): string {
  // Use JSON & base64url to prevent delimiter fragility
  const payload = Buffer.from(
    JSON.stringify({ email, timestamp: Date.now() }),
  ).toString("base64url");
  const signature = crypto
    .createHmac("sha256", secret)
    .update(payload)
    .digest("base64url");
  return `${payload}.${signature}`;
}

export function verifyToken(
  token: string,
): { email: string; timestamp: number } | null {
  const parts = token.split(".");
  if (parts.length !== 2) return null;
  const [payload, signature] = parts;

  const expectedSignature = crypto
    .createHmac("sha256", secret)
    .update(payload)
    .digest("base64url");

  // Prevent timing attacks and RangeError crashes
  const signatureBuf = Buffer.from(signature);
  const expectedBuf = Buffer.from(expectedSignature);

  if (signatureBuf.byteLength !== expectedBuf.byteLength) return null;
  if (!crypto.timingSafeEqual(signatureBuf, expectedBuf)) {
    return null;
  }

  try {
    const decoded = JSON.parse(
      Buffer.from(payload, "base64url").toString("utf8"),
    );
    if (
      decoded &&
      typeof decoded.email === "string" &&
      typeof decoded.timestamp === "number"
    ) {
      return decoded;
    }
  } catch {
    return null;
  }
  return null;
}
