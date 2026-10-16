import type { Metadata } from "next";
import type { ReactNode } from "react";
import TrackedLink from "@/components/TrackedLink";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Jak volit",
  description:
    "2. kolo voleb do Senátu v obvodu č. 21 – Praha 5 a Praha 13: termíny 16.–17. října 2026, otevírací doba volebních místností, co vzít s sebou a volební lístek č. 6.",
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

/* Vector illustrations for the 4 key steps of voting */
function IdCardIllustration() {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      className="w-14 h-14"
      aria-hidden="true"
    >
      <rect
        x="6"
        y="12"
        width="52"
        height="40"
        rx="8"
        fill="#FFDE43"
        stroke="#13110C"
        strokeWidth="3.5"
      />
      <circle cx="22" cy="27" r="6" fill="#13110C" />
      <path
        d="M13 43c0-4.5 4-8 9-8s9 3.5 9 8"
        stroke="#13110C"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <rect x="36" y="22" width="16" height="3" rx="1.5" fill="#13110C" />
      <rect x="36" y="30" width="16" height="3" rx="1.5" fill="#13110C" />
      <rect x="36" y="38" width="10" height="3" rx="1.5" fill="#13110C" />
    </svg>
  );
}

function BallotPapersIllustration() {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      className="w-14 h-14"
      aria-hidden="true"
    >
      <rect
        x="18"
        y="8"
        width="34"
        height="44"
        rx="5"
        fill="#FDFBF7"
        stroke="#13110C"
        strokeWidth="3.5"
        transform="rotate(6 35 30)"
      />
      <rect
        x="7"
        y="18"
        width="48"
        height="36"
        rx="7"
        fill="#FFDE43"
        stroke="#13110C"
        strokeWidth="3.5"
      />
      <path
        d="M9 22l22 17 22-17"
        stroke="#13110C"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="31" cy="40" r="4.5" fill="#13110C" />
    </svg>
  );
}

function VotingBoothIllustration() {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      className="w-14 h-14"
      aria-hidden="true"
    >
      <line
        x1="6"
        y1="10"
        x2="58"
        y2="10"
        stroke="#13110C"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M10 10v42c4.5-2 9 2 13.5 0V10"
        fill="#FFDE43"
        stroke="#13110C"
        strokeWidth="3"
      />
      <path
        d="M40.5 10v42c4.5-2 9 2 13.5 0V10"
        fill="#FFDE43"
        stroke="#13110C"
        strokeWidth="3"
      />
      <rect
        x="23"
        y="17"
        width="18"
        height="26"
        rx="3"
        fill="#FDFBF7"
        stroke="#13110C"
        strokeWidth="2.5"
      />
      <text
        x="32"
        y="36"
        textAnchor="middle"
        fontFamily="var(--font-display), Impact, sans-serif"
        fontWeight="bold"
        fontSize="17"
        fill="#13110C"
      >
        6
      </text>
    </svg>
  );
}

function BallotBoxIllustration() {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      className="w-14 h-14"
      aria-hidden="true"
    >
      <rect
        x="9"
        y="25"
        width="46"
        height="33"
        rx="7"
        fill="#FDFBF7"
        stroke="#13110C"
        strokeWidth="3.5"
      />
      <rect
        x="21"
        y="21"
        width="22"
        height="7"
        rx="2"
        fill="#13110C"
        stroke="#13110C"
        strokeWidth="2"
      />
      <rect
        x="24"
        y="8"
        width="16"
        height="14"
        rx="3"
        fill="#FFDE43"
        stroke="#13110C"
        strokeWidth="2.5"
      />
      <path
        d="M24 10l8 7 8-7"
        stroke="#13110C"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx="32"
        cy="43"
        r="8"
        fill="#FFDE43"
        stroke="#13110C"
        strokeWidth="2.5"
      />
      <path
        d="M28.5 43l2.5 2.5 4.5-5"
        stroke="#13110C"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function JakVolitPage() {
  return (
    <main id="main" className="pt-32 pb-24 md:pt-40 md:pb-32 px-4 md:px-8">
      <div className="max-w-[900px] mx-auto bg-cream text-accent p-6 sm:p-10 md:p-16 rounded-[3rem] border-[3px] border-accent shadow-[-6px_6px_0px_var(--color-accent)]">
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

          {/* 4-Step Visual Illustrated Guide */}
          <section aria-label="Rychlý přehled postupu volby" className="my-10">
            <h2 className="sr-only">Postup volby krok za krokem</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 bg-white/70 rounded-2xl border-[3px] border-accent shadow-[-3px_3px_0px_var(--color-accent)] flex flex-col items-center text-center">
                <div className="mb-3">
                  <IdCardIllustration />
                </div>
                <h3 className="font-display uppercase text-xl text-accent mb-1 tracking-tight">
                  1. Doklad s sebou
                </h3>
                <p className="text-sm font-medium text-accent/80 leading-snug">
                  Platná občanka nebo pas. Volíte ve svém okrsku podle trvalého
                  bydliště.
                </p>
              </div>

              <div className="p-5 bg-white/70 rounded-2xl border-[3px] border-accent shadow-[-3px_3px_0px_var(--color-accent)] flex flex-col items-center text-center">
                <div className="mb-3">
                  <BallotPapersIllustration />
                </div>
                <h3 className="font-display uppercase text-xl text-accent mb-1 tracking-tight">
                  2. Lístky na místě
                </h3>
                <p className="text-sm font-medium text-accent/80 leading-snug">
                  Lístky nechodí do schránky! Obdržíte je i se žlutou obálkou od
                  komise.
                </p>
              </div>

              <div className="p-5 bg-white/70 rounded-2xl border-[3px] border-accent shadow-[-3px_3px_0px_var(--color-accent)] flex flex-col items-center text-center">
                <div className="mb-3">
                  <VotingBoothIllustration />
                </div>
                <h3 className="font-display uppercase text-xl text-accent mb-1 tracking-tight">
                  3. Za plentou č. 6
                </h3>
                <p className="text-sm font-medium text-accent/80 leading-snug">
                  Do obálky vložíte lístek Radka Sáblíka (č. 6). Nic se
                  nekroužkuje ani neškrtá.
                </p>
              </div>

              <div className="p-5 bg-white/70 rounded-2xl border-[3px] border-accent shadow-[-3px_3px_0px_var(--color-accent)] flex flex-col items-center text-center">
                <div className="mb-3">
                  <BallotBoxIllustration />
                </div>
                <h3 className="font-display uppercase text-xl text-accent mb-1 tracking-tight">
                  4. Vhození do urny
                </h3>
                <p className="text-sm font-medium text-accent/80 leading-snug">
                  Úřední obálku vhodíte do zapečetěné urny se státním znakem
                  České republiky.
                </p>
              </div>
            </div>
          </section>

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
              komise za vámi přijde domů s přenosnou schránkou. Oficiální
              informace naleznete také na stránkách{" "}
              <ExtLink href={MV_VOLBY_URL}>Ministerstva vnitra ČR</ExtLink>.
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
