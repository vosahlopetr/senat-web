# Sáblík do Senátu — kampaňový web

Campaign website for Radko Sáblík's 2026 Czech Senate candidacy (district 21).
Built with Next.js 16 (App Router, Cache Components, React Compiler), Tailwind CSS v4, and MDX articles.

## Stack

- **Next.js 16 (stable)** — server components, `'use cache'` + `cacheLife`, `src/proxy.ts` (middleware replacement)
- **Tailwind CSS v4** — design tokens in `src/app/globals.css`
- **MDX** — articles in `src/content/articles/*.mdx`
- **Resend** — newsletter double opt-in (contacts + confirmation emails)
- **Upstash Redis / Vercel KV** — rate limiting and single-use confirmation tokens
- **Vitest** — unit tests

## Getting started

```bash
pnpm install
cp .env.example .env.local   # fill in secrets (see comments in the file)
pnpm dev
```

The site runs without secrets in development: rate limiting and single-use
token tracking are skipped when Redis is not configured, and token signing
falls back to a dev-only secret. In production all required variables are
validated at boot (`src/lib/env.ts`) and rate limiting **fails closed**.

## Scripts

| Command          | Description                 |
| ---------------- | --------------------------- |
| `pnpm dev`       | Development server          |
| `pnpm build`     | Production build            |
| `pnpm lint`      | ESLint                      |
| `pnpm typecheck` | TypeScript (`tsc --noEmit`) |
| `pnpm test`      | Vitest unit tests           |

A husky pre-commit hook runs `lint-staged` (ESLint + Prettier on staged files).

## Architecture notes

### Newsletter flow (the only stateful feature)

1. `subscribeToNewsletter` server action (`src/app/actions.ts`):
   honeypot check → per-IP rate limit → email validation → per-email rate
   limit → Resend contact created as `unsubscribed` → confirmation email with
   an HMAC-signed token link to `/potvrzeni`.
2. `/potvrzeni` (`src/app/potvrzeni/page.tsx`): side-effect-free GET landing
   page (signature + expiry check only) with a confirm button, so mail
   scanners that prefetch links cannot consume tokens. The POSTed server
   action runs `confirmToken` (`src/lib/confirm.ts`): per-IP rate limit →
   HMAC verification (timing-safe) → 24h expiry check → email re-validation
   → single-use enforcement (SHA-256 token hash stored in Redis with
   `SET NX`) → contact flipped to subscribed.
3. `GET /api/confirm` (`src/app/api/confirm/route.ts`): legacy entry point
   from older emails — a pure redirect to `/potvrzeni`, no state changes.

Supporting modules: `src/lib/crypto.ts` (tokens), `src/lib/redis.ts`
(rate limiters + used-token tracking), `src/lib/email/confirmation-email.ts`
(HTML template), `src/lib/env.ts` (validated env access).

### Site-wide config

Nav links, social profiles, contact email, election dates, and rate-limit
constants live in `src/lib/site-config.ts`. Do not hardcode these in
components.

### Post-election kill switch

Setting `POST_ELECTION_STATUS=victory|loss` makes `src/proxy.ts` rewrite all
routes to `/post-election`.

## Deployment

Deployed on Vercel. Required production env vars (see `.env.example`):
`RESEND_API_KEY`, `SECRET_PASSPHRASE`, `KV_REST_API_URL`, `KV_REST_API_TOKEN`.
Missing values fail the boot on purpose.

CI (GitHub Actions, `.github/workflows/ci.yml`) runs lint, typecheck, tests,
and a production build on every push and pull request.
