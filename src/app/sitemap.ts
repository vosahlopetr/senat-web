import fs from "fs";
import path from "path";
import type { MetadataRoute } from "next";
import { getArticles } from "@/lib/articles";
import { absoluteUrl, SITE_URL } from "@/lib/seo";

function getFileMtime(relativePath: string): Date | undefined {
  try {
    const fullPath = path.join(
      /* turbopackIgnore: true */ process.cwd(),
      relativePath,
    );
    if (fs.existsSync(fullPath)) {
      return fs.statSync(fullPath).mtime;
    }
  } catch {
    // fallback if filesystem access is restricted
  }
  return undefined;
}

const STATIC_ROUTES: {
  path: string;
  sourceFile: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  images?: string[];
}[] = [
  {
    path: "",
    sourceFile: "src/app/page.tsx",
    priority: 1,
    changeFrequency: "weekly",
    images: ["/images/heroimage.jpg"],
  },
  {
    path: "/cile",
    sourceFile: "src/app/cile/page.tsx",
    priority: 0.9,
    changeFrequency: "monthly",
    images: ["/opengraph-image"],
  },
  {
    path: "/o-mne",
    sourceFile: "src/app/o-mne/page.tsx",
    priority: 0.8,
    changeFrequency: "monthly",
    images: ["/images/heroimage.jpg"],
  },
  {
    path: "/muj-obvod",
    sourceFile: "src/app/muj-obvod/page.tsx",
    priority: 0.8,
    changeFrequency: "monthly",
  },
  {
    path: "/jak-volit",
    sourceFile: "src/app/jak-volit/page.tsx",
    priority: 0.8,
    changeFrequency: "monthly",
  },
  {
    path: "/akce",
    sourceFile: "src/content/events.ts",
    priority: 0.7,
    changeFrequency: "weekly",
  },
  {
    path: "/aktuality",
    sourceFile: "src/app/aktuality/page.tsx",
    priority: 0.8,
    changeFrequency: "weekly",
  },
  {
    path: "/pro-media",
    sourceFile: "src/app/pro-media/page.tsx",
    priority: 0.5,
    changeFrequency: "monthly",
    images: ["/images/heroimage.jpg"],
  },
  {
    path: "/privacy",
    sourceFile: "src/app/privacy/page.tsx",
    priority: 0.5,
    changeFrequency: "yearly",
  },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = await getArticles();
  const validArticles = articles.filter(
    (article) => article.date && !isNaN(Date.parse(article.date)),
  );

  const latestArticleDate =
    validArticles.length > 0
      ? new Date(
          validArticles[0].dateModified &&
            !isNaN(Date.parse(validArticles[0].dateModified))
            ? validArticles[0].dateModified
            : validArticles[0].date,
        )
      : undefined;

  const staticRoutes: MetadataRoute.Sitemap = STATIC_ROUTES.map(
    ({ path: routePath, sourceFile, priority, changeFrequency, images }) => {
      const fileMtime = getFileMtime(sourceFile);
      let lastModified = fileMtime;

      if (routePath === "/aktuality" && latestArticleDate) {
        lastModified = latestArticleDate;
      } else if (
        routePath === "" &&
        latestArticleDate &&
        (!fileMtime || latestArticleDate > fileMtime)
      ) {
        lastModified = latestArticleDate;
      }

      return {
        url: `${SITE_URL}${routePath}`,
        ...(lastModified ? { lastModified } : {}),
        changeFrequency,
        priority,
        ...(images && images.length > 0
          ? { images: images.map((img) => absoluteUrl(img)) }
          : {}),
      };
    },
  );

  const articleRoutes: MetadataRoute.Sitemap = validArticles.map((article) => {
    const rawDate =
      article.dateModified && !isNaN(Date.parse(article.dateModified))
        ? article.dateModified
        : article.date;
    const lastModified = new Date(rawDate);

    // Prefer self-hosted same-origin images so Google Image Search attributes images correctly
    const imageUrl =
      article.image && !article.image.startsWith("http")
        ? absoluteUrl(article.image)
        : `${SITE_URL}/aktuality/${article.slug}/opengraph-image`;

    return {
      url: `${SITE_URL}/aktuality/${article.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.6,
      images: [imageUrl],
    };
  });

  return [...staticRoutes, ...articleRoutes];
}
