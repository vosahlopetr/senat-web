/**
 * Centralized, validated access to server-side environment variables.
 *
 * Required variables throw at module load in production so a misconfigured
 * deployment fails at boot instead of surfacing as runtime "server_error"s.
 * In development we fall back to safe defaults so the site runs without secrets.
 */
const isProduction = process.env.NODE_ENV === "production";

function requireInProduction(name: string): string | undefined {
  const value = process.env[name];
  if (isProduction && !value) {
    throw new Error(`Environment variable ${name} must be set in production`);
  }
  return value;
}

export const env = {
  isProduction,
  /** Resend API key – required in production. */
  resendApiKey: requireInProduction("RESEND_API_KEY"),
  /** HMAC secret for confirmation tokens – required in production (prevents known-fallback token forgery). */
  secretPassphrase:
    requireInProduction("SECRET_PASSPHRASE") ??
    "fallback-secret-phrase-for-dev",
  /** Upstash Redis / Vercel KV – required in production (rate limiting fails closed without it). */
  kvRestApiUrl: requireInProduction("KV_REST_API_URL"),
  kvRestApiToken: requireInProduction("KV_REST_API_TOKEN"),
  /** Sender identity for confirmation emails. */
  resendFromEmail:
    process.env.RESEND_SEND_FROM_EMAIL ??
    "Sáblík do Senátu <info@sablikdosenatu.cz>",
  /** Absolute origin used in email links. */
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.sablikdosenatu.cz",
} as const;
