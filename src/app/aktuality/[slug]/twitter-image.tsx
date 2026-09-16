import { ogImageAlt } from "@/lib/og-image";
import {
  renderArticleOgImage,
  size,
  contentType,
} from "@/lib/article-og-route";

export { size, contentType };
export const alt = ogImageAlt;

export default renderArticleOgImage;
