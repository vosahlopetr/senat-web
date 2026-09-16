import { getArticleModule } from "@/lib/article-content";
import { ogImageSize } from "@/lib/og-image";
import { createArticleOgImage } from "@/lib/og-image-template";
import { SITE_NAME } from "@/lib/seo";

export async function renderArticleOgImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { metadata } = await getArticleModule(slug);

  return createArticleOgImage({
    title: metadata.title || "Aktualita",
    subtitle: SITE_NAME,
  });
}

export { ogImageSize as size };
export const contentType = "image/png";
