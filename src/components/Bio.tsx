import Image from "next/image";
import Link from "next/link";

export default function Bio() {
  return (
    <section id="kdo-jsem" className="section bg-cream text-primary">
      <div className="container">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-14">
          <div className="flex-1 lg:order-none order-2">
            <h2 className="font-display font-bold text-[clamp(2rem,4vw,3.5rem)] leading-[0.91] text-accent uppercase mb-5">
              Kdo je vlastně Sáblík?
            </h2>
            <p className="font-body font-bold text-[clamp(1.15rem,2vw,1.625rem)] leading-[1.2] text-[oklch(17.8%_0.01_88.8_/_0.7)] mb-6 max-w-[43rem]">
              Ředitel, vizionář a rebel. Ale hlavně člověk, který věří lidem
              kolem sebe.
            </p>
            <p className="text-[1.125rem] leading-[1.6] text-accent mb-6 max-w-[46rem]">
              Svůj život jsem zasvětil vzdělávání a přípravě mladých lidí na
              skutečný život.
            </p>
            <ul className="flex flex-col gap-4 text-[1.125rem] leading-[1.6] text-accent mb-8 max-w-[46rem]">
              <li className="flex gap-3">
                <span className="font-bold text-accent shrink-0 text-xl mt-[-2px]">
                  •
                </span>
                <span>
                  <strong>Skoro čtvrtstoletí práce za mnou:</strong> Od roku
                  2002 vedu{" "}
                  <a
                    href="https://ssps.cz"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline decoration-2 underline-offset-4 hover:opacity-70 transition-opacity"
                  >
                    Smíchovskou střední
                  </a>
                  , ze které jsme se studenty vybudovali elitní školu a jednu z
                  nejžádanějších v Česku.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-accent shrink-0 text-xl mt-[-2px]">
                  •
                </span>
                <span>
                  <strong>Vytvořili jsme skutečné inovace:</strong> Vlastní
                  inkubátor startupů{" "}
                  <a
                    href="https://www.nextzone.io"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline decoration-2 underline-offset-4 hover:opacity-70 transition-opacity"
                  >
                    Next Zone
                  </a>
                  , mediální dům, polygony pro kybernetickou bezpečnost a AI.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-accent shrink-0 text-xl mt-[-2px]">
                  •
                </span>
                <span>
                  <strong>Mám politické i expertní zkušenosti:</strong> Byl jsem
                  poradce dvou ministrů školství, klíčový expert pro národní
                  Strategii 2030+, místostarosta a zastupitel.
                </span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-accent shrink-0 text-xl mt-[-2px]">
                  •
                </span>
                <span>
                  <strong>Nikdy se nevzdávám:</strong> I přes 57 udání a odpor k
                  inovacím od těch, kterým se změny nelíbí, chci s pomocí
                  studentů prosadit svůj přístup po celém Česku.
                </span>
              </li>
            </ul>
            {/* 
            <div className="relative w-full max-w-[46rem] aspect-video rounded-[24px] overflow-hidden border-[3px] border-accent shadow-[-3px_3px_0px_var(--color-accent)] mb-8">
              <YouTubeEmbed
                videoId="DEw-sh-WIew"
                thumbnailUrl="https://i.ytimg.com/vi/DEw-sh-WIew/maxresdefault.jpg"
              />
            </div>
            */}
            <div className="flex justify-center lg:justify-start mt-4">
              <Link href="/o-mne" className="btn btn-primary">
                Přečtěte si celý můj příběh
              </Link>
            </div>
          </div>
          <div className="relative max-w-[22rem] md:max-w-[18rem] lg:max-w-[23.125rem] lg:flex-[0_0_23.125rem] mx-auto lg:m-0 lg:order-none order-1">
            <Image
              src="/images/studio1.jpg"
              alt="Radko Sáblík s oceněním za inovace ve školství"
              width={400}
              height={500}
              sizes="(max-width: 768px) 90vw, 400px"
              quality={60}
              className="w-full object-cover rounded-[32px] border-[3px] border-accent shadow-[-3px_3px_0px_var(--color-accent)] block select-none"
              draggable="false"
            />
            <Image
              src="/assets/signature.svg"
              alt="Podpis Radko Sáblíka"
              width={300}
              height={100}
              style={{
                width: "100%",
                height: "auto",
                maxWidth: "85%",
                filter:
                  "drop-shadow(2px 0px 0px var(--color-cream)) drop-shadow(0px 2px 0px var(--color-cream)) drop-shadow(-2px 0px 0px var(--color-cream)) drop-shadow(0px -2px 0px var(--color-cream))",
              }}
              className="absolute -bottom-4 -right-4 md:-right-8 h-auto -rotate-[10deg] z-[2] select-none"
              draggable="false"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
