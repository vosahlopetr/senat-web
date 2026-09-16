import { Resend } from "resend";
import { env } from "@/lib/env";

let client: Resend | null = null;

/**
 * Lazily constructed Resend client. The SDK constructor throws when no API
 * key is available, so constructing at module scope would crash module load
 * in development without RESEND_API_KEY. Deferring construction to first use
 * keeps the throw inside callers' try/catch blocks (graceful "server_error").
 */
export function getResend(): Resend {
  if (!client) {
    client = new Resend(env.resendApiKey);
  }
  return client;
}
