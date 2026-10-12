import type { Metadata } from "next";
import type { ReactNode } from "react";
import TrackedLink from "@/components/TrackedLink";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Jak volit",
  description:
    "2. kolo voleb do Senátu v obvodu č. 21 – Praha 5 a Praha 13: termíny 16.–17. října 2026, otevírací doba volebních místností, co vzít s sebou a voličský průkaz.",
  path: "/jak-volit",
});

/* Official election-info pages (URLs checked July 2026). */
const PRAHA5_VOLBY_URL = "https://www.praha5.cz/volby-2026/";
const PRAHA13_VOLBY_URL = "https://www.praha13.cz/urad-mestske-casti/volby/";
const MV_VOLBY_URL =
  "https://mv.gov.cz/volby/clanek/volby-do-zastupitelstev-obci-a-senatu-2026.aspx";

function ExtLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="underline decoration-2 underline-offset-4 transition-opacity hover:opacity-70"
    >
      {children}
    </a>
  );
}

export default function JakVolitPage() {
  return (
    <main id="main" className="pt-32 pb-24 md:pt-40 md:pb-32 px-4 md:px-8">
      <div className="max-w-[900px] mx-auto bg-cream text-accent p-8 md:p-16 rounded-[3rem] border-[3px] border-accent shadow-[-6px_6px_0px_var(--color-accent)]">
        <h1 className="font-display text-center text-[clamp(3.5rem,7vw,5.5rem)] uppercase leading-[0.9] mt-6 sm:mt-0 mb-6 text-accent">
          Jak volit ve 2. kole?
        </h1>

        <div className="space-y-6 font-body text-lg md:text-xl font-medium text-[oklch(17.8%_0.01_88.8_/_0.85)]">
          <p className="text-center max-w-3xl mx-auto">
            První kolo je za námi – o mandátu teď rozhoduje druhé kolo. U nás v
            obvodu č. 21 rozhodlo druhé kolo pokaždé a bývá těsné: v roce 2020
            se v něm pořadí z prvního kola otočilo a o vítězi rozhodlo{" "}
            <strong>2&nbsp;305 hlasů</strong>. Tady je vše, co potřebujete
            vědět, abyste o ten svůj hlas nepřišli.
          </p>

          <h2 className="font-display text-[clamp(2rem,4vw,3rem)] uppercase leading-[0.9] text-accent mt-16 mb-6">
            Kdy a kde se volí
          </h2>
          <p>
            2. kolo se koná{" "}
            <strong>v pátek 16. a v sobotu 17. října 2026</strong>. Volební
            místnosti jsou otevřené{" "}
            <strong>v pátek 14:00–22:00 a v sobotu 8:00–14:00</strong>. S sebou
            potřebujete jen{" "}
            <strong>platný občanský průkaz nebo cestovní pas</strong>. Volí se v
            okrsku podle vašeho trvalého bydliště. Adresu své místnosti najdete
            na pozvánce ve schránce nebo na volebních stránkách{" "}
            <ExtLink href={PRAHA5_VOLBY_URL}>Prahy 5</ExtLink> a{" "}
            <ExtLink href={PRAHA13_VOLBY_URL}>Prahy 13</ExtLink>.
          </p>
          <p>
            <TrackedLink
              event="ics_download"
              eventData={{ source: "jak_volit_terminy" }}
              href="/volby-2026.ics"
              className="font-semibold underline decoration-2 underline-offset-4 transition-opacity hover:opacity-70"
            >
              Přidat termín 2. kola do kalendáře
            </TrackedLink>{" "}
            – soubor otevře Google, Apple i Outlook kalendář.
          </p>

          <h2 className="font-display text-[clamp(2rem,4vw,3rem)] uppercase leading-[0.9] text-accent mt-16 mb-6">
            Kdo volí senátora v obvodu č. 21
          </h2>
          <p>
            Občané ČR starší 18 let s trvalým pobytem na{" "}
            <strong>Praze 5</strong> nebo na <strong>Praze 13</strong> – přesně
            tyto dvě městské části tvoří celý obvod č. 21. Osmnáctiny pro druhé
            kolo stačí oslavit nejpozději 17. října, takže i prvovoliči můžou
            začít rovnou u rozhodujícího kola. A pokud bydlíte v cípu Malé
            Strany, který patří k Praze 5: letos poprvé volíte senátora u nás,
            ne v obvodu Praha 1.
          </p>

          <h2 className="font-display text-[clamp(2rem,4vw,3rem)] uppercase leading-[0.9] text-accent mt-16 mb-6">
            Jak se hlasuje ve 2. kole
          </h2>
          <ul className="list-disc pl-8 space-y-3 marker:text-accent">
            <li>
              Ve 2. kolu se o mandátu utkávají{" "}
              <strong>dva nejúspěšnější kandidáti</strong> z prvního kola – na
              jednoho z nich potřebujete svůj hlas.
            </li>
            <li>
              Hlasovací lístky se před druhým kolem nerozesílají do schránek –{" "}
              <strong>Obdržíte je až ve volební místnosti</strong>, pro každého
              kandidáta jeden.
            </li>
            <li>
              Za plentou vložíte <strong>lístek jednoho kandidáta</strong> do
              úřední obálky a vhodíte ji do urny. Nic se nekroužkuje ani
              neškrtá.
            </li>
            <li>
              Nemůžete přijít ze zdravotních důvodů? Požádejte úřad své městské
              části (stačí telefonicky), v den voleb i přímo okrskovou komisi, a
              komise za vámi přijde domů s přenosnou schránkou.
            </li>
          </ul>
          <div
            id="volebni-listek"
            className="scroll-mt-24 my-12 p-8 sm:p-10 bg-primary border-[3px] border-accent rounded-[2.5rem] shadow-[-6px_6px_0px_var(--color-accent)]"
          >
            <h3 className="font-display text-[3rem] sm:text-[4rem] uppercase leading-[0.9] text-cream m-0 mb-4">
              Volební lístek č. 6
            </h3>
            <p className="!m-0 text-lg sm:text-xl text-cream/90 font-medium">
              Jeden z lístků ponese jméno <strong>Radko Sáblík</strong> a číslo{" "}
              <strong>6</strong>. Budu rád, když za plentou sáhnete právě po
              něm.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
