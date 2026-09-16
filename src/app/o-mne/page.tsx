import type { Metadata } from "next";
import ScrollTelling from "@/components/ScrollTelling";
import { aboutStory } from "@/content/about";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Kdo je Sáblík?",
  description:
    "Přečtěte si příběh Radka Sáblíka. Cesta od inženýra přes ředitele elitní průmyslovky až po kandidaturu do Senátu s kampaní vedenou jeho vlastními studenty.",
  path: "/o-mne",
});

export default function AboutPage() {
  return (
    <main id="main" className="bg-primary min-h-screen pt-24 md:pt-32">
      <section className="pt-8 md:pt-16 pb-4 bg-primary text-cream">
        <div className="container text-center flex flex-col items-center">
          <h1 className="font-display font-bold text-[clamp(3.5rem,10vw,8rem)] leading-[0.9] text-cream uppercase mb-6 md:mb-10">
            Můj příběh
          </h1>

          <div className="flex flex-col items-center justify-center text-cream mt-4 md:mt-8">
            <span className="text-sm font-bold uppercase tracking-widest mb-2 font-body">
              Začněte scrollovat
            </span>
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 5v14M19 12l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </section>

      <ScrollTelling story={aboutStory} />
    </main>
  );
}
