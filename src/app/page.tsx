import type { Metadata } from "next";
import { cacheLife } from "next/cache";
import Hero from "@/components/Hero";
import DesktopTravelingHat from "@/components/DesktopTravelingHat";
import Bio from "@/components/Bio";
import LatestArticles from "@/components/LatestArticles";
import FlappySablo from "@/components/FlappySablo";
import Program from "@/components/Program";
import RoundTwoBanner from "@/components/RoundTwoBanner";
import Team from "@/components/Team";
import NewsletterScrollTrigger from "@/components/NewsletterScrollTrigger";
import FAQ from "@/components/FAQ";
import Media from "@/components/Media";
import Social from "@/components/Social";
import Books from "@/components/Books";
import FinalCTA from "@/components/FinalCTA";
import { SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: {
    absolute:
      "Radko Sáblík – Oficiální web kandidáta do Senátu (Praha 5 a 13) | Číslo 6",
  },
  alternates: {
    canonical: `${SITE_URL}/`,
  },
};

export default async function Home() {
  "use cache";
  // "hours" instead of "days": the between-rounds banner (RoundTwoBanner)
  // must appear promptly after round 1 closes – the runoff window is only
  // ~6 days and historically decides this district.
  cacheLife("hours");

  return (
    <main id="main">
      <DesktopTravelingHat />
      <Hero />
      <RoundTwoBanner />
      <Program />
      <Bio />
      <LatestArticles />
      <Team />
      <NewsletterScrollTrigger />
      <Media />
      <FAQ />
      <FlappySablo />
      <Books />
      <Social />
      <FinalCTA />
    </main>
  );
}
