import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import BrandColors from "@/components/BrandColors";
import CopyTextButton from "@/components/CopyTextButton";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Pro média",
  description:
    "Podklady pro novináře: tisková zpráva, fotografie kandidáta v tiskové kvalitě, fakta o kampani a kontakt na PR tým kampaně Radka Sáblíka.",
  path: "/pro-media",
});

const PRESS_EMAIL = "martin@sablikdosenatu.cz";

const PRESS_PHOTOS = [
  {
    preview: "/press/nahledy/sablik-headline.webp",
    file: "/press/sablik-headline.jpg",
    label: "Radko Sáblík při práci",
    dimensions: "7008 × 4672 px",
  },
  {
    preview: "/press/nahledy/sablik-komensky.webp",
    file: "/press/sablik-komensky.jpg",
    label: "Radko Sáblík s portrétem J. A. Komenského",
    dimensions: "7008 × 4672 px",
  },
  {
    preview: "/press/nahledy/sablik-schody.webp",
    file: "/press/sablik-schody.jpg",
    label: "Radko Sáblík na schodišti",
    dimensions: "4988 × 2806 px",
  },
  {
    preview: "/press/nahledy/sablik-dvere.webp",
    file: "/press/sablik-dvere.jpg",
    label: "Radko Sáblík – portrét na výšku",
    dimensions: "4275 × 6412 px",
    // Portrait photo in a 16:9 frame – anchor the crop on the face.
    previewPosition: "50% 10%",
  },
  {
    preview: "/press/nahledy/sablik-studentsky-tym.webp",
    file: "/press/sablik-studentsky-tym.jpg",
    label: "Studentský tým kampaně",
    dimensions: "3813 × 2654 px",
  },
] as const;

const BOILERPLATE_SHORT =
  "Ing. Radko Sáblík (* 1962), ředitel Smíchovské střední, kandiduje do Senátu v obvodu č. 21 – Praha 5 a Praha 13 – za koalici ODS, Starostů a Lidovců. Jeho kampaň iniciovali a vedou studenti.";

const BOILERPLATE_STANDARD =
  "Ing. Radko Sáblík (* 1962) je od roku 2002 ředitelem Smíchovské střední v Praze. V senátních volbách 9.–10. října 2026 kandiduje v obvodu č. 21 – Praha 5 a Praha 13 – jako společný kandidát koalice ODS, Starostů a Lidovců. Jeho kampaň je unikátní tím, že ji iniciovali a vedou studenti Smíchovské střední, nikoli profesionální agentura. Byl poradcem dvou ministrů školství, expertem národní Strategie 2030+ a je předsedou Unie Škol Inovativních. Heslo kampaně zní „Odvaha dělat věci jinak – a líp. Pro Prahu 5 a 13.“";

const QUICK_FACTS = [
  ["Kandidát", "Ing. Radko Sáblík (* 1. března 1962, Praha)"],
  ["Povolání", "ředitel Smíchovské střední, od listopadu 2002"],
  ["Volební obvod", "č. 21 – Praha 5 a Praha 13"],
  ["Volby", "9.–10. října 2026 (1. kolo)"],
  ["Nominace", "koalice ODS, Starostové a nezávislí a KDU-ČSL"],
  ["Kampaň", "iniciovali a vedou studenti Smíchovské střední"],
  ["Slogan", "„Odvaha dělat věci jinak – a líp. Pro Prahu 5 a 13.“"],
] as const;

const INTERVIEW_TOPICS = [
  {
    title: "Kampaň, kterou vedou studenti",
    hook: "jak vypadá senátní kampaň řízená středoškoláky o přestávkách – a proč jim ředitel svěřil vlastní kandidaturu",
    questions: [
      "Co jste studentům řekl, když za vámi poprvé přišli s tím, že máte kandidovat do Senátu?",
      "Nebojíte se výtky, že do kampaně zapojujete studenty vlastní školy?",
    ],
  },
  {
    title: "Souboj o obvod 21 – férově",
    hook: "s protikandidátem Václavem Láskou si podal ruku na kampaň bez osobních útoků a podrazů – a voliče chce přesvědčit prací, ne pomluvami",
    questions: [
      "O čem jste se s Václavem Láskou bavili u kávy v Portheimce?",
      "Politika umí být tvrdá. Co uděláte, když na vás někdo zaútočí první?",
      "Proč by si volič na Praze 5 a 13 měl vybrat vás, a ne úřadujícího senátora?",
    ],
  },
  {
    title: "„Seškrtejme učivo o polovinu“",
    hook: "proč by se obsah výuky měl radikálně zredukovat a co se má učit místo něj",
    questions: [
      "Polovina učiva pryč – co by z osnov mělo zmizet jako první?",
      "Co říkáte rodičům, kteří se bojí, že jejich děti pak budou umět míň?",
      "Kdybyste měl jeden den neomezenou moc nad ministerstvem školství, co uděláte?",
    ],
  },
  {
    title: "„Kdo připravuje studenta na konkrétní pozici, páchá na něm zločin“",
    hook: "odborné školství připravuje na profese, které zaniknou – co s tím",
    questions: [
      "Zločin je silné slovo. Proč tak tvrdě?",
      "Jak má vypadat odborná škola, když ne jako příprava na konkrétní profesi?",
    ],
  },
  {
    title: "Třetina školy bez povinné docházky",
    hook: "program pro aktivní a talentované studenty – maturity dopadají lépe, ne hůř",
    questions: [
      "Třetina vašich studentů nemusí do školy. Jak poznáte, že to není jen úleva pro flákače?",
      "Jak dopadají u maturity studenti, kteří tráví ve škole nejmíň času?",
      "Co by se stalo, kdyby tenhle režim zítra zavedla každá střední v Česku?",
    ],
  },
  {
    title: "Přes 50 udání za inovace",
    hook: "co potká ředitele, který dělá věci jinak, a proč ho Česká školní inspekce nakonec pochválila",
    questions: [
      "Kdo vás udává a co jim na vás vadí?",
      "Bylo období, kdy jste chtěl s ředitelováním praštit? Co vás udrželo?",
      "Jak dopadly kontroly, které ta udání prošetřovaly?",
    ],
  },
  {
    title: "Umělá inteligence ve výuce",
    hook: "na Smíchovské střední s ní pracovali ještě před ChatGPT; implementace AI ve výuce",
    questions: [
      "Kdy je umělá inteligence ve škole hrozba?",
      "Co musí umět učitel, aby ho AI nenahradila?",
    ],
  },
  {
    title: "Startupy místo pátku ve škole",
    hook: "kombinovaná výuka 4+1, vlastní inkubátor Next Zone a studentské firmy už na střední",
    questions: [
      "Pátek bez rozvrhu – co vaši studenti ten den reálně dělají?",
      "Jaký nejúspěšnější projekt z vašeho školního inkubátoru vzešel?",
    ],
  },
] as const;

const BRAND_COLORS = [
  ["Modrá", "#15197D", "pozadí, plochy"],
  ["Krémová", "#FFF8ED", "texty a logo"],
  ["Černá", "#13110C", "text, obrysy, stíny"],
] as const;

const LOGO_VARIANTS = [
  {
    name: "Krémová – na tmavé pozadí",
    slug: "logo-kremova",
    previewBg: "#15197D",
  },
  {
    name: "Černá – na světlé pozadí",
    slug: "logo-cerna",
    previewBg: "#FFF8ED",
  },
  {
    name: "Bílá – na tmavé pozadí",
    slug: "logo-bila",
    previewBg: "#13110C",
  },
] as const;

const PAST_INTERVIEWS = [
  {
    label:
      "„Školu mám plnou ‚divných‘ studentů. Právě ‚divní‘ lidé ale mění svět“",
    source: "Ekonom.cz",
    href: "https://ekonom.cz/c1-67884950-skolu-mam-plnou-bdquo-divnych-ldquo-studentu-prave-bdquo-divni-ldquo-lide-ale-meni-svet-rika-radko-sablik",
  },
  {
    label: "„Funguje to, ale jiní ředitelé mě nenávidí“",
    source: "Hospodářské noviny",
    href: "https://hn.cz/c1-67506770-funguje-to-ale-jini-reditele-me-nenavidi-o-nastrahach-internetu-uci-sami-studenti-rika-radko-sablik",
  },
  {
    label: "„Seškrtejme obsah učiva o polovinu a zrušme tarify“",
    source: "Deník.cz",
    href: "https://www.denik.cz/skolstvi-a-vzdelavani/radko-sablik-vzdelavani.html",
  },
  {
    label: "„Kolem krku máte provaz, jehož konec svírají byrokrati“",
    source: "Aktuálně.cz",
    href: "https://zpravy.aktualne.cz/domaci/radko-sablik/r~3e13fbc4589b11eea9eeac1f6b220ee8/",
  },
] as const;

const downloadCardClass =
  "flex items-center justify-between gap-4 border-[3px] border-accent/20 rounded-2xl px-6 py-5 font-body font-bold text-lg text-accent no-underline transition-colors hover:border-accent focus-visible:border-accent";

export default function ProMediaPage() {
  return (
    <main id="main" className="pt-32 pb-24 md:pt-40 md:pb-32 px-4 md:px-8">
      <div className="max-w-[900px] mx-auto bg-cream text-accent p-8 md:p-16 rounded-[3rem] border-[3px] border-accent shadow-[-6px_6px_0px_var(--color-accent)]">
        <h1 className="font-display text-[clamp(2.5rem,5vw,4rem)] uppercase leading-[0.9] mb-10">
          Pro média
        </h1>

        <div className="space-y-6 font-body text-lg md:text-xl font-medium text-[oklch(17.8%_0.01_88.8_/_0.85)]">
          <p>
            Vše na této stránce je volně ke stažení a k redakčnímu použití. Rádi
            zprostředkujeme rozhovor s Radkem Sáblíkem i se studenty, kteří
            kampaň vedou a tvoří.
          </p>

          <h2 className="font-display text-[clamp(2rem,4vw,3rem)] uppercase leading-[0.9] text-accent mt-16 mb-6">
            Kontakt
          </h2>

          <p>
            Pro tiskové dotazy, rozhovory a akreditace nás kontaktujte. Ozveme
            se zpravidla do 24 hodin.
          </p>

          <ul className="list-disc pl-8 space-y-2 marker:text-accent">
            <li>
              <strong>Martin Slezák</strong> – studentský tým kampaně, PR
            </li>
            <li>
              e-mail:{" "}
              <a
                href={`mailto:${PRESS_EMAIL}`}
                className="text-accent underline underline-offset-4 hover:opacity-80 transition-opacity"
              >
                {PRESS_EMAIL}
              </a>
            </li>
          </ul>

          <h2 className="font-display text-[clamp(2rem,4vw,3rem)] uppercase leading-[0.9] text-accent mt-16 mb-6">
            Rychlá fakta
          </h2>

          <ul className="list-disc pl-8 space-y-2 marker:text-accent">
            {QUICK_FACTS.map(([term, value]) => (
              <li key={term}>
                <strong>{term}:</strong> {value}
              </li>
            ))}
          </ul>

          <h2 className="font-display text-[clamp(2rem,4vw,3rem)] uppercase leading-[0.9] text-accent mt-16 mb-6">
            O kandidátovi
          </h2>

          <p>Představení kandidáta k volnému převzetí:</p>

          <p className="!mb-1 text-sm font-bold uppercase tracking-[0.08em] text-accent/60">
            Krátké
          </p>
          <blockquote className="border-l-4 border-accent/30 pl-6 italic !mt-2">
            {BOILERPLATE_SHORT}
          </blockquote>
          <p className="!mt-2">
            <CopyTextButton text={BOILERPLATE_SHORT} />
          </p>

          <p className="!mb-1 !mt-8 text-sm font-bold uppercase tracking-[0.08em] text-accent/60">
            Podrobné
          </p>
          <blockquote className="border-l-4 border-accent/30 pl-6 italic !mt-2">
            {BOILERPLATE_STANDARD}
          </blockquote>
          <p className="!mt-2">
            <CopyTextButton text={BOILERPLATE_STANDARD} />
          </p>

          <h2 className="font-display text-[clamp(2rem,4vw,3rem)] uppercase leading-[0.9] text-accent mt-16 mb-6">
            Ke stažení
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 !mt-8">
            <a
              href="/press/tiskova-zprava-sablik-do-senatu.pdf"
              download="Tiskova-zprava-Sablik-do-Senatu.pdf"
              className={downloadCardClass}
            >
              <span>
                Tisková zpráva k oznámení kandidatury
                <span className="block text-sm font-medium text-accent/60">
                  PDF, 150 kB
                </span>
              </span>
              <span aria-hidden="true">↓</span>
            </a>
            <a
              href="/press/fotografie-sablik-do-senatu.zip"
              download="Fotografie-Sablik-do-Senatu.zip"
              className={downloadCardClass}
            >
              <span>
                Všechny fotografie v tiskové kvalitě
                <span className="block text-sm font-medium text-accent/60">
                  ZIP, 35 MB
                </span>
              </span>
              <span aria-hidden="true">↓</span>
            </a>
          </div>

          <p className="!mt-8">
            Fotografie jsou volně k použití pro redakční účely s uvedením zdroje
            „Sáblík do Senátu“. Jednotlivé snímky v plném rozlišení:
          </p>

          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6 !mt-8 list-none p-0">
            {PRESS_PHOTOS.map((photo) => (
              <li key={photo.file}>
                <a
                  href={photo.file}
                  download
                  className="block group"
                  aria-label={`Stáhnout: ${photo.label} (${photo.dimensions})`}
                >
                  <span className="block relative w-full aspect-video rounded-2xl overflow-hidden border-[3px] border-accent/20 group-hover:border-accent transition-colors">
                    <Image
                      src={photo.preview}
                      alt={photo.label}
                      fill
                      sizes="(max-width: 640px) 100vw, 420px"
                      quality={60}
                      className="object-cover"
                      style={
                        "previewPosition" in photo
                          ? { objectPosition: photo.previewPosition }
                          : undefined
                      }
                    />
                  </span>
                  <span className="block mt-2 text-base font-bold text-accent underline underline-offset-4 decoration-2 group-hover:opacity-80 transition-opacity">
                    {photo.label} ↓
                  </span>
                  <span className="block text-sm font-medium text-accent/60">
                    JPG, {photo.dimensions}
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <h2 className="font-display text-[clamp(2rem,4vw,3rem)] uppercase leading-[0.9] text-accent mt-16 mb-6">
            Brand kit
          </h2>

          <p>
            Logo nepřebarvujte, nedeformujte a neupravujte. Používejte pouze
            varianty níže.{" "}
            <a
              href="/press/logo/logo-pack-sablik-do-senatu.zip"
              download="Logo-pack-Sablik-do-Senatu.zip"
              className="text-accent font-bold underline underline-offset-4 decoration-2 hover:opacity-80 transition-opacity"
            >
              Stáhnout celý logo pack (SVG + PNG, ZIP) ↓
            </a>
          </p>

          <ul className="grid grid-cols-1 sm:grid-cols-3 gap-6 !mt-8 list-none p-0">
            {LOGO_VARIANTS.map((variant) => (
              <li key={variant.slug}>
                <span
                  className="flex items-center justify-center rounded-2xl border-[3px] border-accent/20 p-6 aspect-video"
                  style={{ backgroundColor: variant.previewBg }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element -- small static SVG previews, no optimization needed */}
                  <img
                    src={`/press/logo/${variant.slug}.svg`}
                    alt={`Logo Sáblík do Senátu – ${variant.name}`}
                    width={290}
                    height={110}
                    className="w-full h-auto max-w-[180px]"
                  />
                </span>
                <span className="block mt-2 text-base font-bold text-accent">
                  {variant.name}
                </span>
                <span className="block text-sm font-medium">
                  <a
                    href={`/press/logo/${variant.slug}.svg`}
                    download
                    className="text-accent underline underline-offset-4 hover:opacity-80 transition-opacity"
                  >
                    SVG ↓
                  </a>{" "}
                  ·{" "}
                  <a
                    href={`/press/logo/${variant.slug}.png`}
                    download
                    className="text-accent underline underline-offset-4 hover:opacity-80 transition-opacity"
                  >
                    PNG ↓
                  </a>
                </span>
              </li>
            ))}
          </ul>

          <h3 className="font-display text-[clamp(1.5rem,3vw,2rem)] uppercase leading-[0.9] text-accent !mt-10 mb-4">
            Barvy
          </h3>

          <BrandColors colors={BRAND_COLORS} />

          <h3 className="font-display text-[clamp(1.5rem,3vw,2rem)] uppercase leading-[0.9] text-accent !mt-10 mb-4">
            Písma
          </h3>

          <ul className="list-disc pl-8 space-y-2 marker:text-accent">
            <li>
              <strong>Graph Condensed</strong> – nadpisy a titulky
            </li>
            <li>
              <strong>Satoshi</strong> – běžný text
            </li>
          </ul>

          <h2 className="font-display text-[clamp(2rem,4vw,3rem)] uppercase leading-[0.9] text-accent mt-16 mb-6">
            Témata k rozhovorům
          </h2>

          <p>
            Věci, ke kterým má Radko Sáblík co říct z praxe, a které už v
            médiích rezonovaly.
            <br />
            Ke každému tématu přikládáme otázky, kterými můžete rovnou začít.
          </p>

          <ul className="list-none p-0 space-y-8">
            {INTERVIEW_TOPICS.map((topic) => (
              <li key={topic.title}>
                <p className="!mb-2">
                  <strong>{topic.title}</strong> – {topic.hook}
                </p>
                <ul className="list-disc pl-8 space-y-1 marker:text-accent text-[1.0625rem] md:text-lg">
                  {topic.questions.map((question) => (
                    <li key={question}>{question}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>

          <h2 className="font-display text-[clamp(2rem,4vw,3rem)] uppercase leading-[0.9] text-accent mt-16 mb-6">
            Vybrané rozhovory
          </h2>

          <ul className="list-disc pl-8 space-y-2 marker:text-accent">
            {PAST_INTERVIEWS.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent underline underline-offset-4 hover:opacity-80 transition-opacity"
                >
                  {item.label}
                </a>{" "}
                ({item.source})
              </li>
            ))}
          </ul>

          <p>
            Aktuální dění v kampani najdete v{" "}
            <Link
              href="/aktuality"
              className="text-accent underline underline-offset-4 hover:opacity-80 transition-opacity"
            >
              přehledu aktualit
            </Link>
            . Všechny texty na webu můžete citovat s uvedením zdroje.
          </p>
        </div>
      </div>
    </main>
  );
}
