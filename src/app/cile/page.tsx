import type { Metadata } from "next";
import Link from "next/link";
import Geopolitics from "@/components/Geopolitics";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Kompletní program",
  description:
    "Kompletní program Radka Sáblíka pro Senát: moderní školství, podpora mladých v podnikání, méně byrokracie, Praha 5 a 13 – srdeční záležitost a pomoc pro starší generaci.",
  path: "/cile",
});

type Cil = {
  id: string;
  emoji: string;
  title: string;
  why: string;
  actions: string[];
};

const CILE: readonly Cil[] = [
  {
    id: "skolstvi",
    emoji: "📚",
    title: "Moderní školství a sport mládeže",
    why: "Prosazuji moderní školství, které žáky a studenty nedusí, ale pomáhá jim najít talent a obstát v reálném světě. Ve školství pracuji 38 let a 24 let vedu Smíchovskou střední školu. Vím, co školy brzdí a umím to změnit, protože to u nás reálně děláme.",
    actions: [
      "Budu apelovat na zeštíhlení povinného učiva a větší svobodu škol v tom, jak učí: méně biflování, více porozumění, praxe a práce s talentem.",
      "Navrhnu razantní snížení výkaznictví pro ředitele a učitele. Každá nová povinnost pro školy musí projít testem: pomáhá dětem, nebo jen úřadům?",
      "Podpořím zavádění umělé inteligence do výuky – bezpečně a s rozumem. Na Smíchovské střední škole s ní pracujeme roky, vím, co funguje.",
      "Zasadím se o stabilní financování sportu mládeže, aby pohyb nebyl luxus. Zdravé a sebevědomé děti nevyrostou u obrazovek.",
    ],
  },
  {
    id: "podnikani",
    emoji: "🚀",
    title: "Podpora mladých k podnikání",
    why: "Podporuji mladé lidi v podnikání a inovacích. U nás na škole studenti běžně zakládají startupy a vedou reálné projekty v našem inkubátoru Next Zone. Vím, kolik energie v mladých lidech je, když dostanou důvěru a prostor. Tuto energii chci přenést do celé země.",
    actions: [
      "Prosadím jednodušší pravidla pro studentské a začínající podnikání: méně překážek při rozjezdu, srozumitelné povinnosti, žádné zbytečné pokuty za formality.",
      "Podpořím vznik inkubátorů a coworkingů při středních a vysokých školách po vzoru Next Zone, aby první firma nevznikala navzdory škole, ale kvůli ní.",
      "Zasadím se o to, aby praxe a reálné projekty byly běžnou součástí výuky. Podnikavost se nenaučí z učebnice.",
    ],
  },
  {
    id: "byrokracie",
    emoji: "✂️",
    title: "Zdravý rozum a méně byrokracie",
    why: "Bojuji za zjednodušení pravidel a razantní snížení byrokracie. Z vlastní zkušenosti ředitele vím, jak moc nás svazuje. Bylo na mě podáno 57 udání, protože dělám věci po svém, ale inspekce mi pokaždé dala za pravdu. Stejnou zkušenost mají živnostníci, lékaři i starostové: místo práce vyplňují papíry.",
    actions: [
      "Každý zákon, který přijde do Senátu, poměřím jednoduchým metrem: přidává lidem povinnosti a papíry, nebo jim je ubírá? Špatné zákony budu vracet.",
      "Budu aktivně navrhovat rušení duplicitních hlášení a výkazů. Stát se má ptát jednou, ne pětkrát na pěti formulářích.",
      "Podpořím digitalizaci, která má hlavu a patu: úřad si má data předat sám, ne je vymáhat po občanovi.",
    ],
  },
  {
    id: "obvod",
    emoji: "❤️",
    title: "Praha 5 a 13 – srdeční záležitost",
    why: "Budu se aktivně bít za zájmy obyvatel Prahy 5 a Prahy 13. Největšími problémy v obvodu jsou bezpečnost kolem Anděla, přetížená doprava a parkování, málo lékařů a málo míst ve školkách. Jako senátor s šestiletým mandátem propojím radnice, magistrát a ministerstva a budu urgovat řešení, dokud se věci nepohnou.",
    actions: [
      "Anděl a okolí: podpořím posílení hlídek městské i státní policie a budu tlačit na magistrát, aby se péče o drogově závislé rozložila po celé Praze a nekoncentrovala na Smíchově. Svolám pravidelná jednání radnice, policie a magistrátu a budu hlídat, aby se dohody plnily.",
      "Zdravotní péče: budu jednat s pojišťovnami, magistrátem a ministerstvem zdravotnictví o nových kapacitách praktických lékařů a pediatrů pro Prahu 5 i 13. Také o výstavbě domu s pečovatelskou službou, který na Praze 5 dlouhodobě chybí.",
      "Doprava: dostavba Radlické radiály se odkládá roky. Budu v Senátu i na magistrátu prosazovat, aby stát na stavbu přispěl a příprava se už nezdržovala. K tomu patří i zklidnění Plzeňské a lepší parkování u stanic metra B.",
      "Školky a školy: kapacity mateřských a základních škol v obvodu nestačí, hlavně pro mladé rodiny. Propojím radnice, magistrát a ministerstvo školství, aby se plánování kapacit řešilo dopředu, ne až po krizi.",
    ],
  },
  {
    id: "seniori",
    emoji: "🤝",
    title: "Pomoc pro starší generaci",
    why: "Prosazuji důstojný život a bezpečí pro seniory. Senioři nepotřebují jen populistické slevy. Potřebují dostupného lékaře, důstojné bydlení a pocit, že jsou pořád potřební. A potřebují se cítit bezpečně – na ulici i na internetu.",
    actions: [
      "Budu prosazovat výstavbu domu s pečovatelskou službou na Praze 5 a dostatečné kapacity sociálních služeb v celém obvodu.",
      "Rozšířím mezigenerační programy, které už dnes fungují u nás ve škole: studenti učí seniory pracovat s počítačem, mobilem i umělou inteligencí. A učí se od nich zpátky.",
      "Zaměřím se na ochranu seniorů před podvodníky a kyberpodvody: osvěta v obvodu ve spolupráci se školami, policií, radnicemi a neziskovkami.",
    ],
  },
] as const;

const SENATOR_POWERS = [
  {
    label: "Zákony",
    text: "Senátor navrhuje nové zákony, opravuje špatné a vrací Sněmovně legislativní zmetky. Bez souhlasu Senátu nejde změnit Ústava ani volební pravidla.",
  },
  {
    label: "Pojistka",
    text: "Senát schvaluje ústavní soudce a mezinárodní smlouvy. Je to poslední brzda, když se vládní většina utrhne ze řetězu. A právě teď je potřeba víc než kdy dřív.",
  },
  {
    label: "Hlas obvodu",
    text: "Senátor má šestiletý mandát mluvit za 165 tisíc lidí: svolávat radnice, magistrát, policii a ministerstva k jednomu stolu, dávat místním problémům váhu a veřejně urgovat, dokud se věci nepohnou.",
  },
  {
    label: "Služba lidem",
    text: "Kancelář v obvodu, osobní dostupnost a pomoc, když si nevíte rady s úřady či školami.",
  },
] as const;

const VALUES = [
  "Jsem nekompromisním obráncem demokracie, lidských práv (včetně práv žen a komunity LGBTQIA+) a našeho pevného ukotvení v EU a NATO. Svoboda a demokracie nejsou samozřejmost. Musíme za ně aktivně bojovat, jinak o ně přijdeme.",
  "Mladé generaci plně důvěřuji, a proto dlouhodobě podporuji volební právo už od 16 let. Za tuto změnu jsem v obou komorách Parlamentu už mnohokrát aktivně vystupoval. Pokud chceme, aby mladí lidé přebírali odpovědnost, musíme jim dát reálnou šanci spolurozhodovat o své budoucnosti.",
  "Světová situace je šílená. Ohrožuje nás masový vrah Putin, islámští fanatici z Hamásu či Íránu, ale i nevyzpytatelný a pravděpodobně částečně senilní prezident USA Trump. Evropa bohužel nemá výrazného lídra a odklání se od skutečných hodnot k zástupným problémům. O to víc musíme být silní my.",
  "Mrzí mě, jak domácí politika zhrubla – což jde v prvé řadě za bývalým prezidentem Zemanem – a že se z ní vytratily hodnoty na úkor průzkumů veřejného mínění. Slušnost není slabost a politika se dá dělat bez urážek a podrazů.",
  "Odolná společnost místo silných slov: dezinformace a nenávist porazíme vzděláním – kyberbezpečností, mediální gramotností a pamětí. Proto jsem napsal trilogii o holokaustu.",
  "Svobodná a nezávislá média, včetně těch veřejnoprávních, k demokracii patří. Stát má lidem sloužit, ne je úkolovat.",
] as const;

const HOW_I_WORK = [
  "Otevřu senátorskou kancelář s pravidelnými hodinami pro veřejnost na Praze 5 i na Praze 13. Pomůžu Vám s tím, co znám nejlíp: školy, přijímačky a jednání s úřady. A naši studenti zdarma naučí seniory zvládnout mobil, počítač i AI.",
  "Každý měsíc uspořádám otevřenou debatu v jiné části obvodu – od Barrandova po Stodůlky.",
  "U každého důležitého hlasování veřejně vysvětlím, jak jsem hlasoval a proč.",
  "Každý rok zveřejním přehled své práce: co se povedlo, co ne a proč.",
  "Zůstanu ředitelem Smíchovské střední školy a tedy i nadále mezi mladými lidmi",
] as const;

export default function CilePage() {
  return (
    <main id="main" className="pt-32 pb-24 md:pt-40 md:pb-32 px-4 md:px-8">
      <div className="max-w-[900px] mx-auto bg-cream text-accent p-8 md:p-16 rounded-[3rem] border-[3px] border-accent shadow-[-6px_6px_0px_var(--color-accent)]">
        <h1 className="font-display text-[clamp(2.5rem,5vw,4rem)] uppercase leading-[0.9] mb-10">
          Kompletní program
        </h1>

        <div className="space-y-6 font-body text-lg md:text-xl font-medium text-[oklch(17.8%_0.01_88.8_/_0.85)]">
          <p>
            Nebudu Vám slibovat, co senátor splnit nemůže. Senátor nepostaví
            parkoviště, nepřidá strážníky ani neotevře ordinaci. Kdo tvrdí opak,
            neříká pravdu. Tady je na rovinu, co senátor skutečně může. A pod
            tím mých pět cílů s tím, co pro ně konkrétně udělám.
          </p>

          <h2 className="font-display text-[clamp(2rem,4vw,3rem)] uppercase leading-[0.9] text-accent mt-16 mb-6">
            Co senátor skutečně může
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-5 !mt-8 list-none p-0">
            {SENATOR_POWERS.map((power) => (
              <li
                key={power.label}
                className="border-[3px] border-accent/20 rounded-2xl px-6 py-6"
              >
                <p className="!m-0 text-sm font-bold uppercase tracking-[0.08em] text-accent/60">
                  {power.label}
                </p>
                <p className="!m-0 !mt-2 text-base md:text-lg">{power.text}</p>
              </li>
            ))}
          </ul>

          {CILE.map((cil, index) => (
            <section key={cil.id} aria-labelledby={`${cil.id}-h`}>
              <h2
                id={cil.id}
                className="font-display text-[clamp(2rem,4vw,3rem)] uppercase leading-[0.9] text-accent mt-16 mb-6 scroll-mt-28"
              >
                <span aria-hidden="true">{index + 1}. </span>
                <span id={`${cil.id}-h`}>{cil.title}</span>{" "}
                <span aria-hidden="true">{cil.emoji}</span>
              </h2>
              <p>{cil.why}</p>
              <p className="!mb-1 !mt-6 text-sm font-bold uppercase tracking-[0.08em] text-accent/60">
                Co konkrétně udělám
              </p>
              <ul className="list-disc pl-8 space-y-3 marker:text-accent !mt-2">
                {cil.actions.map((action) => (
                  <li key={action}>{action}</li>
                ))}
              </ul>
            </section>
          ))}

          <section aria-labelledby="hodnoty">
            <h2
              id="hodnoty"
              className="font-display text-[clamp(2rem,4vw,3rem)] uppercase leading-[0.9] text-accent mt-16 mb-6 scroll-mt-28"
            >
              Za čím si stojím
            </h2>
            <p>
              Senát je komora hodnot. A vy máte právo vědět, kde stojím, ještě
              než mi dáte hlas.
            </p>
            <ul className="list-disc pl-8 space-y-3 marker:text-accent">
              {VALUES.map((value) => (
                <li key={value}>{value}</li>
              ))}
            </ul>

            <Geopolitics />
          </section>

          <section aria-labelledby="jak-budu-senatorovat">
            <h2
              id="jak-budu-senatorovat"
              className="font-display text-[clamp(2rem,4vw,3rem)] uppercase leading-[0.9] text-accent mt-16 mb-6"
            >
              Jak budu senátorovat
            </h2>
            <ul className="list-disc pl-8 space-y-3 marker:text-accent">
              {HOW_I_WORK.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <div className="!mt-14 flex flex-wrap gap-4 justify-center">
            <Link href="?modal=support" className="btn btn-primary text-center">
              Přidejte se k nám
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
