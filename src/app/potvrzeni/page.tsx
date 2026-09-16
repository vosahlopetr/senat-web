import type { Metadata } from "next";
import { Suspense } from "react";
import Link from "next/link";
import { verifyToken } from "@/lib/crypto";
import { buildPageMetadata } from "@/lib/seo";
import { TOKEN_EXPIRY_MS } from "@/lib/site-config";
import { confirmSubscription } from "./actions";

export const metadata: Metadata = buildPageMetadata({
  title: "Potvrzení registrace",
  description: "Potvrzení registrace k odběru novinek kampaně.",
  path: "/potvrzeni",
  noIndex: true,
});

type SearchParams = Promise<{ token?: string | string[] }>;

/**
 * Content depending on `searchParams` (runtime data) lives behind Suspense
 * so the page shell prerenders under Cache Components. Rendering is
 * side-effect free – it only checks the token signature and expiry (no
 * Redis, nothing consumed), so link-prefetching mail scanners cannot burn
 * the token. The actual confirmation happens in the POSTed
 * `confirmSubscription` server action.
 */
async function ConfirmContent({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { token: rawToken } = await searchParams;
  const token = typeof rawToken === "string" ? rawToken : null;

  const tokenData = token ? verifyToken(token) : null;
  // eslint-disable-next-line react-hooks/purity -- deliberate clock read: this content renders per request and must judge expiry against the current time
  const nowMs = Date.now();
  const isExpired =
    tokenData !== null && nowMs - tokenData.timestamp > TOKEN_EXPIRY_MS;

  let heading: string;
  let text: React.ReactNode;

  if (!tokenData) {
    heading = "Neplatný odkaz";
    text =
      "Ověřovací odkaz je neplatný nebo poškozený. Zkuste to prosím znovu.";
  } else if (isExpired) {
    heading = "Odkaz vypršel";
    text = "Ověřovací odkaz vypršel. Zaregistrujte se prosím znovu.";
  } else {
    heading = "Poslední krok";
    text = (
      <>
        Kliknutím na tlačítko potvrdíte registraci k odběru novinek pro{" "}
        <strong className="text-cream">{tokenData.email}</strong>.
      </>
    );
  }

  return (
    <>
      <h1 className="font-display font-bold text-[clamp(3.5rem,10vw,8rem)] leading-[0.9] text-cream uppercase mb-6">
        {heading}
      </h1>
      <p className="font-body font-semibold text-[clamp(1.125rem,2.5vw,1.5rem)] text-text-muted max-w-[44rem] mx-auto mb-10 leading-[1.4]">
        {text}
      </p>

      {tokenData && !isExpired ? (
        <form action={confirmSubscription}>
          <input type="hidden" name="token" value={token ?? ""} />
          <button type="submit" className="btn btn-primary btn-lg">
            Potvrdit e-mail
          </button>
        </form>
      ) : (
        <Link href="/?modal=support" className="btn btn-primary">
          Zaregistrovat se znovu
        </Link>
      )}
    </>
  );
}

export default function PotvrzeniPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  return (
    <main id="main" className="bg-primary min-h-screen pt-24 md:pt-32">
      <div className="container text-center flex flex-col items-center py-16 md:py-24">
        <Suspense fallback={null}>
          <ConfirmContent searchParams={searchParams} />
        </Suspense>
      </div>
    </main>
  );
}
