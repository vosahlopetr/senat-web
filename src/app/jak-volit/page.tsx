import type { Metadata } from "next";
import type { ReactNode } from "react";
import TrackedLink from "@/components/TrackedLink";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Jak volit",
  description:
    "Kdy a jak se volí do Senátu v obvodu č. 21 – Praha 5 a Praha 13: termíny 9.–10. října 2026, co vzít s sebou, voličský průkaz a proč rozhodne druhé kolo 16.–17. října.",
  path: "/jak-volit",
});

const ROUNDS = [
  {
    label: "1. kolo",
    date: "pátek 9. a sobota 10. října 2026",
    note: "společně s komunálními volbami",
  },
  {
    label: "2. kolo",
    date: "pátek 16. a sobota 17. října 2026",
    note: "pokud nikdo nezíská nadpoloviční většinu hlasů – u nás se to zatím nestalo ani jednou",
  },
] as const;

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
          Jak volit?
        </h1>

        <div className="space-y-6 font-body text-lg md:text-xl font-medium text-[oklch(17.8%_0.01_88.8_/_0.85)]">
          <p className="text-center max-w-3xl mx-auto">
            Senátní volby se v našem obvodu vyhrávají o pár tisíc hlasů. A první
            kolo tu ještě nikdy nerozhodlo. Každý hlas má obrovskou váhu. Tady
            je vše, co potřebujete vědět, abyste o ten svůj nepřišli.
          </p>

          <h2 className="font-display text-[clamp(2rem,4vw,3rem)] uppercase leading-[0.9] text-accent mt-16 mb-6">
            Termíny
          </h2>
          <ul className="list-none p-0 m-0 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {ROUNDS.map((round) => (
              <li
                key={round.label}
                className="border-[3px] border-accent/20 rounded-2xl px-6 py-6"
              >
                <p className="!m-0 text-sm font-bold uppercase tracking-[0.08em] text-accent/60">
                  {round.label}
                </p>
                <p className="!m-0 !mt-1 font-bold text-accent">{round.date}</p>
                <p className="!m-0 !mt-2 text-base">{round.note}</p>
              </li>
            ))}
          </ul>
          <p className="!mt-4 text-sm md:text-base">
            <TrackedLink
              event="ics_download"
              eventData={{ source: "jak_volit_terminy" }}
              href="/volby-2026.ics"
              className="font-semibold underline decoration-2 underline-offset-4 transition-opacity hover:opacity-70"
            >
              Přidat oba termíny do kalendáře
            </TrackedLink>{" "}
            – soubor otevře Google, Apple i Outlook kalendář.
          </p>
          <p>
            Volební místnosti jsou otevřené{" "}
            <strong>v pátek 14:00–22:00 a v sobotu 8:00–14:00</strong>. S sebou
            potřebujete jen{" "}
            <strong>platný občanský průkaz nebo cestovní pas</strong>. Volí se v
            okrsku podle vašeho trvalého bydliště. Adresu své místnosti najdete
            na pozvánce ve schránce nebo na volebních stránkách{" "}
            <ExtLink href={PRAHA5_VOLBY_URL}>Prahy 5</ExtLink> a{" "}
            <ExtLink href={PRAHA13_VOLBY_URL}>Prahy 13</ExtLink>.
          </p>

          <h2 className="font-display text-[clamp(2rem,4vw,3rem)] uppercase leading-[0.9] text-accent mt-16 mb-6">
            Kdo volí senátora v obvodu č. 21
          </h2>
          <p>
            Občané ČR starší 18 let s trvalým pobytem na{" "}
            <strong>Praze 5</strong> nebo na <strong>Praze 13</strong> – přesně
            tyto dvě městské části tvoří celý obvod č. 21. Osmnáctiny přitom
            stačí oslavit nejpozději druhý den voleb; pro druhé kolo dokonce až
            17. října, takže někteří prvovoliči přijdou poprvé rovnou k
            rozhodujícímu kolu.
          </p>
          <p>
            Ve stejný den probíhají i komunální volby, takže jedním příchodem do
            volební místnosti zvládnete oboje. A pokud bydlíte v cípu Malé
            Strany, který patří k Praze 5: letos poprvé volíte senátora u nás,
            ne v obvodu Praha 1.
          </p>

          <h2 className="font-display text-[clamp(2rem,4vw,3rem)] uppercase leading-[0.9] text-accent mt-16 mb-6">
            Jak se hlasuje: jeden kandidát, jeden lístek
          </h2>
          <ul className="list-disc pl-8 space-y-3 marker:text-accent">
            <li>
              Každý kandidát má{" "}
              <strong>svůj samostatný hlasovací lístek</strong> – stejně jako v
              minulých senátních volbách. Lístky dostanete nejpozději 6. října
              do schránky; kdybyste je zapomněli doma, novou sadu vám dají přímo
              ve volební místnosti.
            </li>
            {/* Barvy obálek (žlutá senátní / šedá komunální) podle dosavadní
                praxe souběhu voleb a portal.gov.cz – ověřit v září proti
                pokynům MV pro 2026, jakmile vyjdou. */}
            <li>
              Za plentou vložíte <strong>lístek jednoho kandidáta</strong> do
              žluté úřední obálky pro senátní volby a vhodíte ji do urny. Nic se
              nekroužkuje ani neškrtá.
            </li>
            <li>
              Komunální volby mají vlastní šedý lístek i šedou obálku. Pozor, ať
              se vám sady nepomíchají. Lístek ve špatné obálce je neplatný.
            </li>
            <li>
              Novinka: lístky letos nesou QR kód, přes který si nevidomí a
              slabozrací můžou obsah lístku ověřit v mobilu.
            </li>
            <li>
              Nemůžete přijít ze zdravotních důvodů? Požádejte úřad své městské
              části (stačí telefonicky), v den voleb i přímo okrskovou komisi. a
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

          <h2 className="font-display text-[clamp(2rem,4vw,3rem)] uppercase leading-[0.9] text-accent mt-16 mb-6">
            Nebudete doma? Voličský průkaz
          </h2>
          <ul className="list-disc pl-8 space-y-3 marker:text-accent">
            <li>
              S voličským průkazem můžete hlasovat v kterékoli volební místnosti
              – ale pozor, <strong>jen uvnitř našeho obvodu č. 21</strong>. Mimo
              Prahu 5 a Prahu 13 senátní hlas odevzdat nejde.
            </li>
            <li>
              O průkaz požádejte úřad své městské části: online přes Portál
              občana nebo datovou schránkou, případně písemně s ověřeným
              podpisem <strong>do pátku 2. října</strong>; osobně na úřadě{" "}
              <strong>do středy 7. října do 16:00</strong>. Podrobnosti a vzor
              žádosti má{" "}
              <ExtLink href={MV_VOLBY_URL}>web Ministerstva vnitra</ExtLink>.
            </li>
            <li>
              Průkaz si můžete vyřídit i jen pro druhé kolo (písemně do 9.
              října, osobně do 14. října do 16:00). Pokud už teď víte, že budete
              16.–17. října na cestách, vyřešte to rovnou.
            </li>
            <li>
              Pro komunální volby voličské průkazy neexistují – tam se hlasuje
              jen v místě trvalého bydliště.
            </li>
          </ul>

          <h2 className="font-display text-[clamp(2rem,4vw,3rem)] uppercase leading-[0.9] text-accent mt-16 mb-6">
            Druhé kolo rozhodne. Přijďte dvakrát
          </h2>
          <p>
            Pokud žádný kandidát nezíská v prvním kole nadpoloviční většinu,
            postupují první dva do druhého kola <strong>16.–17. října</strong>.
            U nás druhé kolo rozhodlo pokaždé. A bývá těsné: v roce 2020 se v
            něm pořadí z prvního kola otočilo a o vítězi rozhodlo{" "}
            <strong>2&nbsp;305 hlasů</strong>. Hlasovací lístky pro druhé kolo
            dostanete až ve volební místnosti.
          </p>
        </div>
      </div>
    </main>
  );
}
