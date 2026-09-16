import crypto from "node:crypto";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { env } from "@/lib/env";
import {
  CONFIRM_IP_LIMIT,
  SUBSCRIBE_EMAIL_LIMIT,
  SUBSCRIBE_IP_LIMIT,
} from "@/lib/site-config";

let redis: Redis | null = null;

export function getRedis(): Redis | null {
  if (redis) return redis;
  if (env.kvRestApiUrl && env.kvRestApiToken) {
    redis = new Redis({ url: env.kvRestApiUrl, token: env.kvRestApiToken });
  }
  return redis;
}

export type RateLimitScope = "subscribe-ip" | "subscribe-email" | "confirm-ip";

const LIMITER_CONFIG: Record<
  RateLimitScope,
  { limit: number; window: Parameters<typeof Ratelimit.slidingWindow>[1] }
> = {
  "subscribe-ip": { limit: SUBSCRIBE_IP_LIMIT, window: "60 s" },
  "subscribe-email": { limit: SUBSCRIBE_EMAIL_LIMIT, window: "1 h" },
  "confirm-ip": { limit: CONFIRM_IP_LIMIT, window: "60 s" },
};

const limiters = new Map<RateLimitScope, Ratelimit>();

function getLimiter(scope: RateLimitScope): Ratelimit | null {
  const cached = limiters.get(scope);
  if (cached) return cached;

  const client = getRedis();
  if (!client) return null;

  const { limit, window } = LIMITER_CONFIG[scope];
  const limiter = new Ratelimit({
    redis: client,
    limiter: Ratelimit.slidingWindow(limit, window),
    prefix: `@upstash/ratelimit/newsletter/${scope}`,
  });
  limiters.set(scope, limiter);
  return limiter;
}

/**
 * Returns true when the request must be rejected.
 *
 * Fails CLOSED in production: a missing key (no client IP), missing Redis
 * config, or a Redis outage all count as rate limited. In development the
 * check fails open so the site works without secrets.
 */
export async function isRateLimited(
  scope: RateLimitScope,
  key: string | null,
): Promise<boolean> {
  const failClosed = env.isProduction;

  if (!key) {
    if (failClosed)
      console.error(`Rate limit (${scope}): missing key, rejecting request`);
    return failClosed;
  }

  const limiter = getLimiter(scope);
  if (!limiter) {
    if (failClosed) {
      console.error(
        `Rate limit (${scope}): Redis not configured, rejecting request`,
      );
      return true;
    }
    console.warn(
      `Rate limit (${scope}): Redis not configured, skipping in development`,
    );
    return false;
  }

  try {
    const { success } = await limiter.limit(key);
    return !success;
  } catch (error) {
    console.error(`Rate limit (${scope}) error:`, error);
    return failClosed;
  }
}

export type TokenUseResult = "ok" | "already-used" | "unavailable";

function usedTokenKey(token: string): string {
  const hash = crypto.createHash("sha256").update(token).digest("hex");
  return `newsletter:used-token:${hash}`;
}

/**
 * Marks a confirmation token as used (single-use enforcement).
 * Stores a SHA-256 hash of the token with a TTL covering its remaining
 * lifetime, using SET NX so a replayed token is detected atomically.
 */
export async function markTokenUsed(
  token: string,
  ttlMs: number,
): Promise<TokenUseResult> {
  const client = getRedis();
  if (!client) return "unavailable";

  const result = await client.set(usedTokenKey(token), "1", {
    nx: true,
    px: Math.max(ttlMs, 1000),
  });
  return result === "OK" ? "ok" : "already-used";
}

/**
 * Compensating rollback for `markTokenUsed`: when confirmation fails after
 * the token was marked used (e.g. the Resend update errors), release it so
 * the supporter can retry the same link instead of hitting "used_token".
 */
export async function releaseTokenUse(token: string): Promise<void> {
  const client = getRedis();
  if (!client) return;

  try {
    await client.del(usedTokenKey(token));
  } catch (error) {
    // Worst case the token stays burned – never mask the original failure.
    console.error("Failed to release confirmation token:", error);
  }
}
