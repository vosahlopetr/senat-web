import { readFileSync } from "node:fs";
import { join } from "node:path";

/** Satori-compatible hex for `--color-primary` (oklch(30.1% 0.162 269.9)). */
export const OG_PRIMARY = "#15197d";

/** Satori-compatible hex for `--color-cream` (oklch(98.2% 0.016 79.4)). */
export const OG_CREAM = "#FFF8ED";

/** Satori-compatible hex for `--color-accent` (oklch(17.8% 0.01 88.8)). */
export const OG_ACCENT = "#13110c";

/** Satori-compatible hex for `--color-green` (oklch(69.3% 0.206 140.6)). */
export const OG_GREEN = "#43b929";

/** `--color-accent` at 85% opacity on white (modal body text). */
export const OG_ACCENT_MUTED = "#363531";

/** `--color-accent` at 80% opacity on white (disclaimer text). */
export const OG_ACCENT_SUBTLE = "#42413d";

export const ogImageAlt = "Sáblík do Senátu – Odvaha dělat věci jinak";

export const ogImageSize = {
  width: 1200,
  height: 630,
};

export function getOgLogoDataUri() {
  const logoSvg = readFileSync(
    join(process.cwd(), "public/images/logo.svg"),
    "utf8",
  )
    .replaceAll('fill="var(--fill-0, #FFF8ED)"', `fill="${OG_CREAM}"`)
    .replace(/ style="display: block;"/, "")
    .replace(/overflow="visible" /, "");

  return `data:image/svg+xml,${encodeURIComponent(logoSvg)}`;
}
