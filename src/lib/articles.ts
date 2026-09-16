import fs from "fs";
import path from "path";
import { getArticleModule } from "@/lib/article-content";

export interface ArticleMetadata {
  title: string;
  date: string;
  dateModified?: string;
  summary: string;
  image?: string;
  slug: string;
  readingTime?: string;
}

const articlesDirectory = path.join(process.cwd(), "src/content/articles");

export function getArticleSlugs(): string[] {
  try {
    if (!fs.existsSync(articlesDirectory)) {
      return [];
    }

    return fs
      .readdirSync(articlesDirectory)
      .filter((file) => file.endsWith(".mdx"))
      .map((file) => file.replace(/\.mdx$/, ""));
  } catch {
    return [];
  }
}

export async function getArticles(): Promise<ArticleMetadata[]> {
  const articles = await Promise.all(
    getArticleSlugs().map(async (slug): Promise<ArticleMetadata> => {
      try {
        const { metadata, readingTime } = await getArticleModule(slug);
        return {
          slug,
          title: metadata.title || slug,
          date: metadata.date || "",
          dateModified: metadata.dateModified,
          summary: metadata.summary || "",
          image: metadata.image,
          readingTime,
        };
      } catch (error) {
        // A malformed article must not take down every listing page.
        console.error(`Error loading article ${slug}:`, error);
        return {
          slug,
          title: slug,
          date: "",
          summary: "",
        };
      }
    }),
  );

  return articles.sort((a, b) => (a.date < b.date ? 1 : -1));
}
