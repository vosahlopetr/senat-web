import { describe, expect, it, vi } from "vitest";

vi.mock("@/lib/articles", () => ({
  getArticles: vi.fn().mockResolvedValue([
    {
      slug: "test-article",
      title: "Test Article",
      date: "2026-09-06",
      dateModified: "2026-09-07",
      summary: "Test summary",
      image: "/images/reverzni-graffiti.webp",
    },
    {
      slug: "youtube-article",
      title: "YouTube Article",
      date: "2026-08-01",
      summary: "Test summary",
      image: "https://i.ytimg.com/vi/123/maxresdefault.jpg",
    },
  ]),
}));

import sitemap from "./sitemap";

describe("sitemap generator", () => {
  it("generates a comprehensive and valid sitemap", async () => {
    const entries = await sitemap();
    expect(entries.length).toBe(10); // 8 static routes + 2 mock articles

    const urls = entries.map((e) => e.url);

    // Verify key static routes are present
    expect(urls).toContain("https://www.sablikdosenatu.cz");
    expect(urls).toContain("https://www.sablikdosenatu.cz/cile");
    expect(urls).toContain("https://www.sablikdosenatu.cz/o-mne");
    expect(urls).toContain("https://www.sablikdosenatu.cz/jak-volit");
    expect(urls).toContain("https://www.sablikdosenatu.cz/akce");
    expect(urls).toContain("https://www.sablikdosenatu.cz/aktuality");
    expect(urls).toContain("https://www.sablikdosenatu.cz/pro-media");
    expect(urls).toContain("https://www.sablikdosenatu.cz/privacy");

    // Verify inactive or private pages are excluded
    expect(urls).not.toContain("https://www.sablikdosenatu.cz/potvrzeni");
    expect(urls).not.toContain("https://www.sablikdosenatu.cz/post-election");

    // Every entry must have a valid url and lastModified date
    for (const entry of entries) {
      expect(entry.url).toMatch(/^https:\/\/www\.sablikdosenatu\.cz/);
      expect(entry.lastModified).toBeInstanceOf(Date);
      expect(Number.isNaN((entry.lastModified as Date).getTime())).toBe(false);

      if (entry.images) {
        for (const img of entry.images) {
          expect(img).toMatch(/^https:\/\/www\.sablikdosenatu\.cz/);
        }
      }
    }

    // Verify static routes have their declared images
    const homeEntry = entries.find(
      (e) => e.url === "https://www.sablikdosenatu.cz",
    );
    expect(homeEntry?.images).toContain(
      "https://www.sablikdosenatu.cz/images/heroimage.jpg",
    );

    // Verify article with dateModified uses dateModified for lastModified
    const articleEntry = entries.find(
      (e) => e.url === "https://www.sablikdosenatu.cz/aktuality/test-article",
    );
    expect(articleEntry?.lastModified).toEqual(new Date("2026-09-07"));
    expect(articleEntry?.images).toContain(
      "https://www.sablikdosenatu.cz/images/reverzni-graffiti.webp",
    );

    // Verify remote image is converted to local canonical OG image
    const youtubeEntry = entries.find(
      (e) =>
        e.url === "https://www.sablikdosenatu.cz/aktuality/youtube-article",
    );
    expect(youtubeEntry?.lastModified).toEqual(new Date("2026-08-01"));
    expect(youtubeEntry?.images).toContain(
      "https://www.sablikdosenatu.cz/aktuality/youtube-article/opengraph-image",
    );
  });
});
