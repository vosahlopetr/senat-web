import { buildPageMetadata } from "@/lib/seo";

export const metadata = buildPageMetadata({
  title: "Výsledky voleb",
  path: "/post-election",
  noIndex: true,
});

export default function PostElectionPage() {
  const status = process.env.POST_ELECTION_STATUS;

  // Define states
  const content = {
    victory: {
      headline: "Děkujeme za vaši důvěru!",
      sub: "S obrovskou pokorou přijímáme tento mandát. Začínáme tvořit budoucnost a měnit systém k lepšímu.",
      // Using existing brand primary/cream (blue/white) for a clean, triumphant feel
      themeClass: "bg-primary text-cream",
    },
    loss: {
      headline: "Děkujeme za každý váš hlas.",
      sub: "I když výsledek není takový, jaký jsme si přáli, naše snaha o probuzení systému nekončí. Vážíme si vaší podpory.",
      themeClass: "bg-primary text-cream",
    },
  };

  // Fallback to loss state if something goes wrong but it's active
  const current = content[status as "victory" | "loss"] || content.loss;

  return (
    <main
      className={`flex-1 flex flex-col items-center justify-center min-h-screen p-6 text-center ${current.themeClass}`}
    >
      <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in zoom-in duration-700 ease-out">
        <h1 className="font-display font-bold text-[clamp(3.5rem,8vw,8rem)] leading-[1.05] uppercase tracking-tight">
          {current.headline}
        </h1>
        <p className="font-body font-medium text-[clamp(1.25rem,3vw,2rem)] max-w-3xl mx-auto opacity-90 leading-relaxed">
          {current.sub}
        </p>
      </div>
    </main>
  );
}
