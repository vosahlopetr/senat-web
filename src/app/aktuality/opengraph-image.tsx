import { ogImageAlt, ogImageSize } from "@/lib/og-image";
import { createArticleOgImage } from "@/lib/og-image-template";
import { SITE_NAME } from "@/lib/seo";

export const alt = ogImageAlt;
export const size = ogImageSize;
export const contentType = "image/png";

export default function Image() {
  return createArticleOgImage({
    title: "Aktuality",
    subtitle: SITE_NAME,
  });
}
