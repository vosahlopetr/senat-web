import Link from "next/link";
import { getArticles } from "@/lib/articles";
import ArticleCard from "./ArticleCard";
import StickerPeel from "./StickerPeelLazy";

export default async function LatestArticles() {
  const articles = (await getArticles()).slice(0, 3);

  if (articles.length === 0) {
    return null;
  }

  return (
    <section className="section bg-primary relative overflow-visible">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-center md:justify-between items-center gap-6 mb-8 md:mb-12 text-center md:text-left">
          <h2 className="font-display font-bold text-[clamp(2.5rem,5vw,4.75rem)] leading-[0.9] text-cream uppercase m-0">
            To nejnovější z kampaně
          </h2>
          <div className="hidden md:block">
            <Link href="/aktuality" className="btn btn-primary btn-sm">
              Všechny aktuality
            </Link>
          </div>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <li key={article.slug}>
              <ArticleCard article={article} />
            </li>
          ))}
        </ul>
        <div className="mt-10 flex justify-center md:hidden">
          <Link href="/aktuality" className="btn btn-primary btn-sm">
            Všechny aktuality
          </Link>
        </div>
      </div>
      <StickerPeel
        imageSrc="/images/icon-decorative.webp"
        imageWidth={1274}
        imageHeight={1357}
        sizes="(max-width: 768px) 25vw, 250px"
        width="100%"
        rotate={0}
        peelBackHoverPct={30}
        peelBackActivePct={40}
        lightingIntensity={0}
        initialPosition={{ x: 0, y: 0 }}
        peelDirection={0}
        className="w-[clamp(90px,25vw,140px)] max-w-[140px] md:max-w-[250px] md:w-[clamp(140px,20vw,250px)] bottom-0 right-[5%] z-[999] translate-y-1/2"
      />
    </section>
  );
}
