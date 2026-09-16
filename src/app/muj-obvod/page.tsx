import type { Metadata } from "next";
import Link from "next/link";
import { buildPageMetadata } from "@/lib/seo";
import DistrictMap from "@/components/DistrictMap";

export const metadata: Metadata = buildPageMetadata({
  title: "Můj obvod – Praha 5 a Praha 13",
  description:
    "Interaktivní mapa senátního obvodu č. 21 (Praha 5 a Praha 13). Co lidi v jednotlivých čtvrtích trápí a za co se bude Radko Sáblík v Senátu bít: od bezpečnosti na Andělu přes kapacity pediatrů až po dostavbu Radlické radiály.",
  path: "/muj-obvod",
});

export default function MujObvodPage() {
  return (
    <main id="main" className="pt-32 pb-24 md:pt-40 md:pb-32 px-4 md:px-8">
      <div className="max-w-[1180px] mx-auto space-y-12">
        <h1 className="font-display text-center text-[clamp(3.5rem,7vw,5.5rem)] uppercase leading-[0.9] text-cream m-0">
          Můj obvod
        </h1>

        {/* Interactive Map Component */}
        <section aria-labelledby="map-section-title">
          <h2 id="map-section-title" className="sr-only">
            Interaktivní mapa obvodu č. 21
          </h2>
          <DistrictMap />
        </section>

        {/* Narrative editorial: Two sides of the valley */}
        <div className="bg-cream text-accent p-8 md:p-14 rounded-[3rem] border-[3px] border-accent shadow-[-6px_6px_0px_var(--color-accent)] space-y-8">
          <h2 className="font-display text-[clamp(2rem,4.5vw,3rem)] uppercase leading-[0.95] text-accent m-0">
            Dva břehy Prokopského údolí – jeden obvod
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-body text-base md:text-lg text-accent/85 leading-relaxed">
            <div className="space-y-4">
              <h3 className="font-display text-2xl uppercase text-accent m-0">
                Praha 5: Historie, dynamika i výzvy
              </h3>
              <p className="m-0">
                Smíchov, Košíře, Radlice, Jinonice i Barrandov tvoří pestrou mozaiku.
                Najdete tu historickou zástavbu, zelené svahy i největší novou čtvrť
                v Praze – Smíchov City. Spolu s tím ale Praha 5 nese obrovskou zátěž:
                problémy kolem Anděla, neúnosný tranzit kvůli odkládání Radlické radiály
                a chybějící dům s pečovatelskou službou.
              </p>
              <p className="m-0">
                Jako ředitel školy na Smíchově jsem v denním kontaktu s místními institucemi,
                firmami i rodinami. Vím, že problémy nelze zamést pod koberec – vyžadují
                tah na branku a odvahu jednat s magistrátem i policií.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="font-display text-2xl uppercase text-accent m-0">
                Praha 13: Domov pro rodiny
              </h3>
              <p className="m-0">
                Na Praze 13 bydlí čtyři z deseti voličů našeho obvodu. Lidé si tu
                chválí metro B, Centrální park a blízkost přírody. Zároveň je ale
                trápí nedostatek pediatrů, praktických lékařů a hrozba bezohledného
                zahušťování sídlišť.
              </p>
              <p className="m-0">
                Zaslouží si senátora, který je nebude mít jen na volebním letáku. Proto otevřu
                senátorskou kancelář přímo v Nových Butovicích a debaty budu pravidelně
                pořádat po celém obvodu – od Barrandova po Stodůlky a Zličín.
              </p>
            </div>
          </div>

          {/* Feedback & Contact Call to action */}
          <div className="pt-8 border-t border-accent/15 flex flex-col md:flex-row items-center justify-between gap-6 bg-white/50 p-6 md:p-8 rounded-[2rem] border-[2px] border-accent/10">
            <div className="space-y-1 text-center md:text-left">
              <h3 className="font-display text-2xl md:text-3xl uppercase leading-tight text-accent m-0">
                Nevidíte tu svůj problém?
              </h3>
              <p className="font-body text-sm md:text-base text-accent/80 m-0 max-w-[550px]">
                Napište mi ho. Kampaň stavíme na tom, co nám říkáte na ulicích. Přijďte na
                některou z debat nebo nám zanechte vzkaz.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 shrink-0">
              <Link href="/akce" className="btn btn-secondary !py-3 !px-5 text-sm">
                Kde mě potkáte
              </Link>
              <Link
                href="?modal=support"
                className="btn btn-primary !py-3 !px-5 text-sm"
              >
                Napsat zprávu
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
