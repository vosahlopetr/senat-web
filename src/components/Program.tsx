import Image from "next/image";
import Link from "next/link";

const cile = [
  {
    id: "01",
    title: "Moderní",
    highlight: "školství a sport mládeže",
    icon: "📚",
    text: "Prosazuji moderní školství, které žáky nedusí, ale rozvíjí jejich talent. S mladými lidmi pracuji každý den 38 let. Stejně jako na Smíchovské střední škole chci prosadit méně biflování, více praxe a stabilní financování sportu mládeže.",
    bgImage: "/images/school.png",
  },
  {
    id: "02",
    title: "Podpora mladých k ",
    highlight: "podnikání",
    icon: "🚀",
    text: "Podporuji mladé lidi v podnikání a inovacích. Na naší škole studenti běžně zakládají startupy a využívají náš inkubátor Next Zone. Tuto zkušenost chci přenést do celé společnosti: prosadím méně překážek pro začínající podnikatele a více praxe ve výuce.",
    bgImage: "/images/budoucnost.webp",
  },
  {
    id: "03",
    title: "Zdravý rozum a ",
    highlight: "méně byrokracie",
    icon: "✂️",
    text: "Bojuji za zjednodušení pravidel a méně byrokracie. Z vlastní zkušenosti ředitele vím, jak moc nás svazují zbytečné papíry. V Senátu budu každý zákon měřit tím, zda lidem povinnosti ubírá, nebo přidává. Zákony, které jen tvoří byrokracii, budu vracet.",
    bgImage: "/images/svoboda.webp",
  },
  {
    id: "04",
    title: "Praha 5 a 13 -",
    highlight: "srdeční záležitost",
    icon: "❤️",
    text: "Budu se aktivně bít za Prahu 5 a Prahu 13. Hlavními prioritami v obvodu č. 21 jsou bezpečnost kolem Anděla, řešení dopravy a nedostatek lékařů. Jako senátor propojím radnice, magistrát a ministerstva, dokud se tyto problémy nezačnou reálně řešit.",
    bgImage: "/images/city.png",
  },
  {
    id: "05",
    title: "Pomoc pro ",
    highlight: "starší generaci",
    icon: "🤝",
    text: "Prosazuji důstojný život a bezpečí pro seniory. Místo populistických slev nabízím reálnou pomoc: podporu výstavby domů s pečovatelskou službou a mezigenerační programy, kde studenti učí seniory pracovat s technologiemi a bránit se kyberpodvodům.",
    bgImage: "/images/generace.webp",
  },
];

function CilItem({ item }: { item: (typeof cile)[number] }) {
  return (
    <li className="flex flex-col md:flex-row md:items-center gap-6 md:gap-12 px-6 py-8 md:px-8 md:py-10 lg:px-10 lg:py-12 mb-5 rounded-[32px] border-[3px] border-cream relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image
          src={item.bgImage || "/images/heroimage.jpg"}
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, 80vw"
          quality={60}
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>
      <div
        className="font-display text-[clamp(3.5rem,10vw,6rem)] leading-[0.8] text-cream font-bold shrink-0 relative z-10 tabular-nums md:text-right"
        aria-hidden="true"
      >
        {item.id}
      </div>
      <div className="flex flex-col gap-4 flex-1 relative z-10">
        <h3 className="font-display font-bold text-[clamp(2rem,5vw,2.75rem)] md:text-[clamp(1.75rem,3.5vw,2.5rem)] leading-none text-cream uppercase">
          {item.title} <span className="marker-strike">{item.highlight}</span>
          {(item as { suffix?: string }).suffix} {item.icon}
        </h3>
        <p className="font-body text-[clamp(1.125rem,2vw,1.35rem)] font-medium text-cream leading-[1.5]">
          {item.text}
        </p>
      </div>
    </li>
  );
}

export default function Program() {
  return (
    <section
      id="program"
      className="section relative overflow-visible z-10"
      aria-labelledby="program-heading"
    >
      <div className="container relative z-10">
        <header className="mb-8">
          <h2
            id="program-heading"
            className="font-display text-[clamp(2.5rem,7vw,4.25rem)] md:text-[clamp(2.5rem,6vw,4.25rem)] text-cream uppercase mb-5 text-center leading-[0.9]"
          >
            Moje cíle 🎯
          </h2>
          <p className="text-center text-text-muted text-[clamp(1.125rem,2.5vw,1.5rem)] max-w-[800px] mx-auto font-semibold">
            Celý život učím své studenty, že když se jim něco nelíbí, musí to
            jít změnit. A přesně to dělám. Tohle je mých pět slibů pro Pětku a
            Třináctku.
          </p>
        </header>

        <ul className="list-none p-0 m-0">
          {cile.map((item) => (
            <CilItem key={item.id} item={item} />
          ))}
        </ul>

        <div className="flex justify-center mt-8">
          <Link href="/cile" className="btn btn-secondary">
            Celý program podrobně
          </Link>
        </div>
      </div>
    </section>
  );
}
