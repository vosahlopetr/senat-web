import type { MetadataRoute } from "next";
import { DEFAULT_DESCRIPTION } from "@/lib/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Sáblík do Senátu",
    short_name: "Sáblík do Senátu",
    description: DEFAULT_DESCRIPTION,
    start_url: "/",
    display: "standalone",
    // Brand primary – keep in sync with `--color-primary` / OG_PRIMARY.
    background_color: "#15197d",
    theme_color: "#15197d",
    orientation: "portrait",
    lang: "cs",
    id: "/",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "48x48",
        type: "image/x-icon",
      },
      {
        src: "/icon1.png",
        sizes: "96x96",
        type: "image/png",
      },
      {
        src: "/icon2.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon3.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
      {
        src: "/apple-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
      {
        src: "/images/logo.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
