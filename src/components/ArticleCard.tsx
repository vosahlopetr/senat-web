import Link from "next/link";
import Image from "next/image";
import type { ArticleMetadata } from "@/lib/articles";
import { formatDate } from "@/lib/formatDate";

type ArticleCardProps = {
  article: ArticleMetadata;
  /** Match the heading level to the surrounding document outline. */
  headingLevel?: "h2" | "h3";
  /** `sizes` for the cover image, based on the grid the card sits in. */
  imageSizes?: string;
  /** Smaller typography, used in the "next articles" section. */
  compact?: boolean;
};

export default function ArticleCard({
  article,
  headingLevel: Heading = "h3",
  imageSizes = "(max-width: 768px) 100vw, 33vw",
  compact = false,
}: ArticleCardProps) {
  return (
    <Link
      href={`/aktuality/${article.slug}`}
      className="flex flex-col h-full bg-cream border-[3px] border-accent rounded-[28px] transition-all duration-150 shadow-[-4px_4px_0px_var(--color-accent)] hover:translate-x-[4px] hover:-translate-y-[4px] hover:shadow-[-8px_8px_0px_var(--color-accent)] active:-translate-x-[2px] active:translate-y-[2px] active:shadow-[0px_0px_0px_var(--color-accent)] group overflow-hidden"
    >
      {article.image && (
        <div className="relative w-full aspect-[16/9] border-b-[3px] border-accent bg-accent flex-shrink-0">
          <Image
            src={article.image}
            alt={article.title}
            fill
            sizes={imageSizes}
            quality={60}
            className="object-cover"
          />
        </div>
      )}
      <div className="flex flex-col flex-grow p-6 md:p-8">
        <Heading
          className={`font-display font-bold leading-[1.15] text-primary mb-4 transition-colors duration-300 ${
            compact
              ? "text-[clamp(1.25rem,2vw,1.75rem)]"
              : "text-[clamp(1.5rem,2.5vw,2rem)]"
          }`}
        >
          {article.title}
        </Heading>
        <div className="mt-auto flex flex-wrap items-center gap-x-2 gap-y-1">
          <span className="font-body font-bold text-accent text-[1rem] whitespace-nowrap">
            {formatDate(article.date)}
          </span>
          {article.readingTime && (
            <span className="flex items-center gap-2 font-body font-medium text-accent/80 text-[0.875rem] whitespace-nowrap">
              <span className="w-1.5 h-1.5 rounded-full bg-accent/30"></span>
              {article.readingTime}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
