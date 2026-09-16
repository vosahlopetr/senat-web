import type { Metadata } from "next";
import { cacheLife } from "next/cache";
import Hero from "@/components/Hero";
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

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
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
