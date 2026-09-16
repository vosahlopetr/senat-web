import { ogImageAlt, ogImageSize } from "@/lib/og-image";
import { createSiteOgImage } from "@/lib/og-image-template";

export const alt = ogImageAlt;
export const size = ogImageSize;
export const contentType = "image/png";

export default function Image() {
  return createSiteOgImage();
}
