import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site-config";

export { SITE_URL };
export const SITE_NAME = "Radko Sáblík";
/**
 * Canonical master message: the name-linked device ("Sáblík do Senátu",
 * which also carries the S–S alliteration) fused with the slogan. The
 * benefit + place extension („…a líp. Pro Prahu 5 a 13.“) lives in the
 * description so the title stays within SERP length.
 */
export const DEFAULT_TITLE = "Sáblík do Senátu — Odvaha dělat věci jinak";
export const DEFAULT_DESCRIPTION =
  "Radko Sáblík, ředitel Smíchovské střední a kandidát do Senátu za obvod č. 21 (Praha 5 a 13). Společný kandidát ODS, STAN a KDU-ČSL. Odvaha dělat věci jinak a líp.";
export const DEFAULT_TWITTER = "@RadkoSablik";
export const DEFAULT_OG_IMAGE = {
  url: "/opengraph-image",
  width: 1200,
  height: 630,
  alt: "Sáblík do Senátu – Odvaha dělat věci jinak",
};

type OgImageDescriptor = {
  url: string;
  width?: number;
  height?: number;
  alt?: string;
};

type BuildMetadataOptions = {
  title: string;
  description?: string;
  path?: string;
  image?: OgImageDescriptor;
  noIndex?: boolean;
};

type BuildArticleMetadataOptions = BuildMetadataOptions & {
  publishedTime: string;
  modifiedTime?: string;
  authors?: string[];
  tags?: string[];
};

export const absoluteUrl = (pathOrUrl?: string) => {
  if (!pathOrUrl) return SITE_URL;
  try {
    return new URL(pathOrUrl, SITE_URL).toString();
  } catch {
    return SITE_URL;
  }
};

const normalizeImage = (image?: OgImageDescriptor) => {
  const img = image ?? DEFAULT_OG_IMAGE;
  return {
    url: absoluteUrl(img.url),
    width: img.width ?? DEFAULT_OG_IMAGE.width,
    height: img.height ?? DEFAULT_OG_IMAGE.height,
    alt: img.alt ?? DEFAULT_OG_IMAGE.alt,
  };
};

const buildCanonical = (path?: string) => {
  if (!path) return "/";
  return path.startsWith("/") ? path : `/${path}`;
};

export const buildPageMetadata = ({
  title,
  description,
  path,
  image,
  noIndex,
}: BuildMetadataOptions): Metadata => {
  const metaDescription = description ?? DEFAULT_DESCRIPTION;
  const canonicalPath = buildCanonical(path);
  const ogImage = normalizeImage(image);
  const absoluteCanonical = absoluteUrl(canonicalPath);

  const metadata: Metadata = {
    title,
    description: metaDescription,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      type: "website",
      siteName: SITE_NAME,
      locale: "cs_CZ",
      title,
      description: metaDescription,
      url: absoluteCanonical,
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: metaDescription,
      creator: DEFAULT_TWITTER,
      images: [ogImage.url],
    },
  };

  if (typeof noIndex === "boolean") {
    metadata.robots = {
      index: !noIndex,
      follow: !noIndex,
    };
  }

  return metadata;
};

export const buildArticleMetadata = ({
  title,
  description,
  path,
  image,
  publishedTime,
  modifiedTime,
  authors,
  tags,
  noIndex,
}: BuildArticleMetadataOptions): Metadata => {
  const baseMetadata = buildPageMetadata({
    title,
    description,
    path,
    image,
    noIndex,
  });

  const normalizedAuthors = authors?.length ? authors : ["Radko Sáblík"];

  return {
    ...baseMetadata,
    openGraph: {
      ...(baseMetadata.openGraph ?? {}),
      type: "article",
      publishedTime,
      modifiedTime: modifiedTime ?? publishedTime,
      authors: normalizedAuthors,
      tags,
    },
  };
};

export const rootMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  keywords: [
    "Radko Sáblík",
    "Senát",
    "volby 2026",
    "Praha 5",
    "Praha 13",
    "ODS",
    "STAN",
    "KDU-ČSL",
    "Smíchovská střední",
    "školství",
  ],
  generator: "Next.js",
  applicationName: SITE_NAME,
  referrer: "origin-when-cross-origin",
  authors: [{ name: "Radko Sáblík" }],
  creator: "Radko Sáblík",
  publisher: "Radko Sáblík",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    siteName: SITE_NAME,
    locale: "cs_CZ",
    images: [normalizeImage()],
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    creator: DEFAULT_TWITTER,
    images: [absoluteUrl(DEFAULT_OG_IMAGE.url)],
  },
  appleWebApp: {
    capable: true,
    title: SITE_NAME,
    statusBarStyle: "black-translucent",
  },
};
