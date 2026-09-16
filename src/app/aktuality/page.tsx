import { getArticles } from "@/lib/articles";
import ArticleCard from "@/components/ArticleCard";
import { buildPageMetadata, SITE_URL } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Aktuality",
  description:
    "Nejnovější zprávy a aktuality z kampaně Radka Sáblíka pro obvod č. 21.",
  path: "/aktuality",
});

export default async function ArticlesPage() {
  const articles = await getArticles();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: articles.map((article, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `${SITE_URL}/aktuality/${article.slug}`,
    })),
  };

  return (
    <main id="main" className="section py-20 pt-32 min-h-[70vh]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <div className="container">
        <header className="mb-16 md:mb-24 text-center">
          <h1 className="font-display text-[clamp(4rem,10vw,8rem)] leading-[0.9] text-cream uppercase mb-6">
            Aktuality
          </h1>
          <p className="font-body text-[clamp(1.125rem,2.5vw,1.5rem)] text-text-muted max-w-[800px] mx-auto font-semibold">
            Nejnovější zprávy z kampaně a dění kolem nás
          </p>
        </header>

        {articles.length === 0 ? (
          <div className="text-center py-12">
            <p className="font-body text-xl text-cream/70">
              Zatím tu nejsou žádné aktuality. Brzy něco přidáme!
            </p>
          </div>
        ) : (
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <li key={article.slug}>
                <ArticleCard article={article} headingLevel="h2" />
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
