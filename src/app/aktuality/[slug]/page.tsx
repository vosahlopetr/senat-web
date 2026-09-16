import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import ArticleCard from "@/components/ArticleCard";
import ArticleCTA from "@/components/ArticleCTA";
import { getArticleModule } from "@/lib/article-content";
import { getArticleSlugs, getArticles } from "@/lib/articles";
import { formatDate } from "@/lib/formatDate";
import { buildArticleMetadata, buildPageMetadata, SITE_URL } from "@/lib/seo";
import type { Metadata } from "next";

export async function generateStaticParams() {
  const slugs = getArticleSlugs();
  return slugs.map((slug) => ({ slug }));
}

function toIsoDate(date?: string) {
  if (!date) return new Date().toISOString();
  const parsed = new Date(date);
  return Number.isNaN(parsed.getTime())
    ? new Date().toISOString()
    : parsed.toISOString();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const slug = (await params).slug;
  try {
    const { metadata } = await getArticleModule(slug);
    const publishedTime = toIsoDate(metadata.date);
    const modifiedTime = toIsoDate(metadata.dateModified || metadata.date);

    return buildArticleMetadata({
      title: metadata.title || "Aktualita",
      description: metadata.summary || "",
      path: `/aktuality/${slug}`,
      publishedTime,
      modifiedTime,
      authors: ["Studenti pro Sáblíka"],
    });
  } catch {
    return buildPageMetadata({
      title: "Aktualita",
      path: `/aktuality/${slug}`,
    });
  }
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const slug = (await params).slug;

  let Post;
  let metadata;
  let readingTime;

  try {
    ({ Post, metadata, readingTime } = await getArticleModule(slug));
  } catch {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `${SITE_URL}/aktuality/${slug}`,
        },
        headline: metadata.title,
        description: metadata.summary,
        datePublished: metadata.date,
        dateModified: metadata.dateModified || metadata.date,
        image: metadata.image
          ? [new URL(metadata.image, SITE_URL).toString()]
          : undefined,
        author: { "@type": "Organization", name: "Studenti pro Sáblíka" },
        publisher: {
          "@type": "Organization",
          name: "Sáblík do Senátu",
          logo: { "@type": "ImageObject", url: `${SITE_URL}/images/logo.svg` },
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Domů",
            item: SITE_URL,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Aktuality",
            item: `${SITE_URL}/aktuality`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: metadata.title,
            item: `${SITE_URL}/aktuality/${slug}`,
          },
        ],
      },
    ],
  };

  const allArticles = await getArticles();
  const nextArticles = allArticles.filter((a) => a.slug !== slug).slice(0, 2);

  return (
    <article
      id="main"
      className="section py-20 relative pt-32 min-h-screen bg-cream text-black"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <div className="container relative z-10 max-w-[850px] mx-auto">
        <Link href="/aktuality" className="btn btn-secondary mb-8">
          ← Zpět na aktuality
        </Link>

        <header className="mb-10 border-b-[3px] border-black/10 pb-10">
          {(metadata.date || readingTime) && (
            <div className="flex items-center gap-3 mb-6">
              {metadata.date && (
                <span className="font-body font-bold text-accent text-[1.1rem] inline-block">
                  {formatDate(metadata.date)}
                </span>
              )}
              {readingTime && (
                <>
                  <span className="w-1.5 h-1.5 rounded-full bg-accent/30 inline-block"></span>
                  <span className="font-body font-medium text-accent/80 text-[1.1rem] inline-block">
                    {readingTime}
                  </span>
                </>
              )}
            </div>
          )}
          <h1 className="font-display text-[clamp(3.5rem,8vw,6rem)] leading-[0.9] text-black uppercase">
            {metadata.title}
          </h1>
        </header>

        {metadata.image && (
          <div className="mb-12 relative w-full aspect-video rounded-[32px] overflow-hidden border-[3px] border-accent block">
            <Image
              src={metadata.image}
              alt={metadata.title || "Ilustrační obrázek k článku"}
              fill
              className="object-cover select-none"
              sizes="(max-width: 850px) 100vw, 850px"
              draggable="false"
              preload
            />
          </div>
        )}

        <div className="article-content">
          <Post />
        </div>

        <ArticleCTA />

        {nextArticles.length > 0 && (
          <div className="mt-20 pt-16 border-t-[3px] border-black/10">
            <h2 className="font-display font-bold text-[clamp(2rem,4vw,3rem)] leading-[0.9] text-black uppercase mb-8">
              Další aktuality
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {nextArticles.map((article) => (
                <ArticleCard
                  key={article.slug}
                  article={article}
                  compact
                  imageSizes="(max-width: 768px) 100vw, 50vw"
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
