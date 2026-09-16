/* eslint-disable @next/next/no-img-element -- Satori (ImageResponse) renders
 * its own element tree outside the DOM; next/image cannot run there. */
import { ImageResponse } from "next/og";
import { cacheLife } from "next/cache";
import {
  OG_CREAM,
  OG_PRIMARY,
  getOgLogoDataUri,
  ogImageSize,
} from "@/lib/og-image";

const PNG_CONTENT_TYPE = "image/png";

/**
 * `ImageResponse`'s default Cache-Control, replicated verbatim (see
 * next/dist/compiled/@vercel/og). The cached-bytes pattern below returns a
 * plain Response, which would otherwise drop this header – harmless for the
 * prerendered routes (Next's cache layer sets `s-maxage=...` when serving
 * them), but the per-article images render on demand and rely on it for
 * edge/browser caching.
 */
const OG_CACHE_CONTROL =
  process.env.NODE_ENV === "development"
    ? "no-cache, no-store"
    : "public, immutable, no-transform, max-age=31536000";

const OG_RESPONSE_HEADERS = {
  "Content-Type": PNG_CONTENT_TYPE,
  "Cache-Control": OG_CACHE_CONTROL,
};

type ArticleOgImageOptions = {
  title: string;
  subtitle?: string;
};

/**
 * Satori rendering happens inside `use cache` scopes (returning the PNG
 * bytes, which are cache-serializable) so metadata image routes prerender
 * under Cache Components instead of rendering on every crawler hit.
 * `cacheLife("max")` is safe: the images derive only from bundled assets
 * and article metadata, which change exclusively via a redeploy.
 */
async function renderSiteOgImageBytes(): Promise<ArrayBuffer> {
  "use cache";
  cacheLife("max");

  const logoDataUri = getOgLogoDataUri();

  const image = new ImageResponse(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        backgroundColor: OG_PRIMARY,
        gap: "36px",
      }}
    >
      <img src={logoDataUri} width={600} height={228} alt="Sáblík do Senátu" />
      {/* Canonical slogan form: master message + benefit + place, so every
          share carries the full claim, not just the name device. */}
      <p
        style={{
          margin: 0,
          color: OG_CREAM,
          fontSize: 34,
          fontWeight: 700,
          lineHeight: 1.2,
          textAlign: "center",
          textTransform: "uppercase",
          letterSpacing: "0.01em",
        }}
      >
        Odvaha dělat věci jinak – a líp. Pro Prahu 5 a 13.
      </p>
    </div>,
    {
      ...ogImageSize,
    },
  );
  return image.arrayBuffer();
}

/** Logo-only image shared by the root `opengraph-image` and `twitter-image` routes. */
export async function createSiteOgImage(): Promise<Response> {
  return new Response(await renderSiteOgImageBytes(), {
    headers: OG_RESPONSE_HEADERS,
  });
}

async function renderArticleOgImageBytes(
  title: string,
  subtitle?: string,
): Promise<ArrayBuffer> {
  "use cache";
  cacheLife("max");

  const logoDataUri = getOgLogoDataUri();

  const image = new ImageResponse(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        backgroundColor: OG_PRIMARY,
        padding: "64px",
        gap: "40px",
      }}
    >
      <img src={logoDataUri} width={420} height={160} alt="" />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "16px",
          maxWidth: "1000px",
        }}
      >
        <p
          style={{
            margin: 0,
            color: OG_CREAM,
            fontSize: 56,
            fontWeight: 700,
            lineHeight: 1.1,
            textAlign: "center",
            textTransform: "uppercase",
          }}
        >
          {title}
        </p>
        {subtitle ? (
          <p
            style={{
              margin: 0,
              color: OG_CREAM,
              fontSize: 28,
              fontWeight: 600,
              opacity: 0.85,
              textAlign: "center",
            }}
          >
            {subtitle}
          </p>
        ) : null}
      </div>
    </div>,
    {
      ...ogImageSize,
    },
  );
  return image.arrayBuffer();
}

export async function createArticleOgImage({
  title,
  subtitle,
}: ArticleOgImageOptions): Promise<Response> {
  return new Response(await renderArticleOgImageBytes(title, subtitle), {
    headers: OG_RESPONSE_HEADERS,
  });
}
