import fs from "fs";
import path from "path";
import { cache } from "react";

export type ArticleFrontmatter = {
  title?: string;
  date?: string;
  dateModified?: string;
  summary?: string;
  image?: string;
};

const WORDS_PER_MINUTE = 200;

/**
 * Estimates reading time from raw MDX source. MDX boilerplate – import
 * lines, the `export const metadata = {...};` block, and JSX/HTML tags –
 * is stripped first so only prose counts toward the estimate.
 */
export function calculateReadingTime(content: string): string {
  const cleanContent = content
    .replace(/^import\s.*$/gm, "")
    // Matches the repo's frontmatter convention: the object literal is
    // multi-line and terminated by `};` at the start of a line.
    .replace(/^export\s+const\s+metadata\s*=\s*\{[\s\S]*?^\};?[ \t]*$/m, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/[#*`_>\[\]()]/g, "");
  const wordCount = cleanContent.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(wordCount / WORDS_PER_MINUTE));

  if (minutes === 1) return "1 min čtení";
  if (minutes >= 2 && minutes <= 4) return `${minutes} minuty čtení`;
  return `${minutes} minut čtení`;
}

/**
 * Single loader for one article: the compiled MDX component, its metadata
 * export, and the reading-time estimate. Memoized per request via
 * `cache()` so a page, its OG image, and listings share one load.
 */
export const getArticleModule = cache(async (slug: string) => {
  const mdxModule = await import(`@/content/articles/${slug}.mdx`);
  const metadata = (mdxModule.metadata || {}) as ArticleFrontmatter;

  const filePath = path.join(
    process.cwd(),
    "src/content/articles",
    `${slug}.mdx`,
  );
  const fileContent = fs.readFileSync(filePath, "utf8");
  const readingTime = calculateReadingTime(fileContent);

  return {
    Post: mdxModule.default,
    metadata,
    readingTime,
  };
});
