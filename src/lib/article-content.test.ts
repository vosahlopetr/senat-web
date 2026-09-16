import { describe, expect, it } from "vitest";
import { calculateReadingTime } from "@/lib/article-content";

/** `count` filler words of prose (one word ≈ "slovo"). */
function prose(count: number): string {
  return Array.from({ length: count }, () => "slovo").join(" ");
}

/** Wraps prose in the repo's MDX conventions: imports, metadata, JSX. */
function mdxDocument(body: string): string {
  return `import YouTubeEmbed from "@/components/YouTubeEmbed";

export const metadata = {
  title: "Radko Sáblík kandiduje do Senátu",
  date: "2026-03-04",
  summary:
    "Ředitel Smíchovské střední vyslyšel výzvu svých studentů i ODS a rozhodl se přijmout kandidaturu.",
  image: "/images/heroimage.jpg",
};

${body}

<div className="relative w-full aspect-video rounded-[20px] overflow-hidden">
  <YouTubeEmbed
    videoId="DEw-sh-WIew"
    thumbnailUrl="https://i.ytimg.com/vi/DEw-sh-WIew/maxresdefault.jpg"
  />
</div>
`;
}

describe("calculateReadingTime", () => {
  it("ignores imports, the metadata export, and JSX tags", () => {
    // 10 words of prose in a full MDX document: without stripping, the
    // boilerplate alone would push this over one minute.
    expect(calculateReadingTime(mdxDocument(prose(10)))).toBe("1 min čtení");
  });

  it("counts prose identically with and without MDX boilerplate", () => {
    const body = prose(450); // ceil(450 / 200 wpm) = 3 minutes
    expect(calculateReadingTime(mdxDocument(body))).toBe(
      calculateReadingTime(body),
    );
  });

  it("uses the correct Czech plural forms", () => {
    expect(calculateReadingTime(prose(150))).toBe("1 min čtení");
    expect(calculateReadingTime(prose(450))).toBe("3 minuty čtení");
    expect(calculateReadingTime(prose(1_500))).toBe("8 minut čtení");
  });

  it("returns at least one minute for empty content", () => {
    expect(calculateReadingTime("")).toBe("1 min čtení");
    expect(calculateReadingTime(mdxDocument(""))).toBe("1 min čtení");
  });
});
