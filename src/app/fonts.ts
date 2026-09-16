import localFont from "next/font/local";

export const graphCondensed = localFont({
  src: "./fonts/graph-condensed-bold-web.woff2",
  variable: "--font-graph-condensed",
  weight: "700",
  style: "normal",
  display: "swap",
});

export const satoshi = localFont({
  src: "./fonts/Satoshi-Variable.woff2",
  variable: "--font-satoshi",
  weight: "300 900",
  style: "normal",
  display: "swap",
});
