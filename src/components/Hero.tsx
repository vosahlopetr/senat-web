import Image from "next/image";
import Link from "next/link";
import { getCountdownState, isMobilizationWindow } from "@/lib/countdown";
import sablikImage from "../../public/images/sablik3.webp";
import Countdown from "./Countdown";
import ElectionSticker from "./ElectionSticker";

export default function Hero() {
  // Persuasion-stage visitors (most of the campaign) want to join and see
  // the program; in the final month and between rounds the site's job
  // flips to turnout, so voting logistics become the PRIMARY action and
  // the newsletter drops to secondary (persuasion ≈ 0 this late – Kalla &
  // Broockman 2018; logistics/plan-making still move turnout – Nickerson
  // & Rogers 2010). Clock is read at cache-fill time like in Countdown;
  // a day of staleness around the threshold is harmless.
  // eslint-disable-next-line react-hooks/purity -- deliberate clock read at cache-fill time (see comment above)
  const mobilize = isMobilizationWindow(getCountdownState(Date.now()));

  return (
    <section
      className="relative min-h-[85svh] overflow-hidden bg-primary"
      aria-label="Hlavní banner"
    >
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/heroimage.jpg"
          alt=""
          fill
          sizes="100vw"
          quality={60}
          className="object-cover object-[65%_center] lg:object-center"
          loading="eager"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>

      <div className="container lg:[--container-max:83rem] relative flex flex-col lg:flex-row items-center justify-start lg:justify-center min-h-[85svh] pt-10 pb-0 md:pt-12 md:pb-0 lg:pt-20 lg:pb-0 gap-4 text-center lg:text-left">
        {/* Volební číslo 6 – campaign sticker in the top right corner on desktop */}
        <ElectionSticker className="hidden lg:block absolute lg:top-6 lg:right-6 xl:top-8 xl:right-8 z-20 pointer-events-auto" />

        <div className="flex-none lg:flex-1 flex flex-col items-center lg:items-start z-2 w-full">
          <div className="relative w-full">
            <h1 className="relative z-1 font-display font-bold text-cream uppercase tracking-[-0.02em] leading-[0.9] select-none">
              <span className="block text-[clamp(4.375rem,15vw,7.5rem)] md:text-[clamp(4.5rem,8vw,7rem)]">
                ODVAHA DĚLAT
              </span>
              <span className="block text-[clamp(4.375rem,15vw,7.5rem)] md:text-[clamp(4.5rem,8vw,7rem)]">
                VĚCI{" "}
                <span className="marker-strike [&::after]:bottom-[-0.005em]! [&::after]:left-[-0.005em]!">
                  JINAK
                </span>
              </span>
            </h1>

            <div className="relative z-1 flex justify-center w-full mt-2 lg:hidden pointer-events-none">
              <div className="relative">
                {/* Volební číslo 6 – campaign sticker behind Sáblík overlapping the hero title on mobile */}
                <ElectionSticker className="block lg:hidden absolute -top-8 -right-5 sm:-top-10 sm:-right-4 md:-top-12 md:-right-2 z-0 pointer-events-auto" />

                <Image
                  src={sablikImage}
                  alt="Radko Sáblík – kandidát do Senátu"
                  preload
                  quality={75}
                  draggable={false}
                  sizes="85vw"
                  className="relative z-1 select-none pointer-events-none drop-shadow-[0_8px_40px_oklch(0%_0_0/0.35)] mask-[linear-gradient(to_bottom,black_0%,black_80%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,black_0%,black_80%,transparent_100%)]"
                  style={{
                    width: "clamp(260px, 78vw, 420px)",
                    height: "auto",
                  }}
                />
              </div>
            </div>
          </div>

          <div className="w-full lg:mt-8">
            <p className="relative z-4 -mt-[clamp(2.75rem,13vw,4.75rem)] lg:mt-0 text-[clamp(1.1rem,2.5vw,1.5rem)] max-w-150 mb-4 text-text-muted font-semibold leading-[1.4] mx-auto lg:mx-0 [text-shadow:0_1px_18px_oklch(0%_0_0/0.85)] lg:text-shadow-none">
              Jsem Radko Sáblík. 24 let vedu nejžádanější střední školu v zemi -
              Smíchovskou střední, kde stavím na výsledcích, ne na prázdných
              gestech. Teď chci rozhýbat Senát. Kandiduji za obvod
              č.&nbsp;21&nbsp;– Prahu&nbsp;5 a&nbsp;Prahu&nbsp;13 s podporou
              mých studentů, ODS, STAN a KDU-ČSL.
            </p>

            <div className="flex justify-center lg:justify-start mb-6 md:mb-8">
              <Countdown />
            </div>

            <div className="flex gap-4 justify-center lg:justify-start flex-wrap mb-10 md:mb-12 lg:mb-0">
              {mobilize ? (
                <>
                  <Link href="/jak-volit" className="btn btn-primary">
                    Jak volit
                  </Link>
                  <Link href="?modal=support" className="btn btn-secondary">
                    Přidejte se k nám
                  </Link>
                </>
              ) : (
                <>
                  <Link href="?modal=support" className="btn btn-primary">
                    Přidejte se k nám
                  </Link>
                  <Link href="/cile" className="btn btn-secondary">
                    Můj program
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="hidden lg:flex flex-none lg:flex-[1.375] min-w-0 lg:self-stretch items-end justify-center lg:justify-end z-1 w-full pointer-events-none">
          <Image
            src={sablikImage}
            alt="Radko Sáblík – kandidát do Senátu"
            preload
            quality={75}
            draggable={false}
            sizes="(max-width: 640px) 85vw, (max-width: 1024px) 65vw, 900px"
            className="select-none pointer-events-none drop-shadow-[0_8px_40px_oklch(0%_0_0/0.35)]"
            style={{
              width: "100%",
              height: "auto",
            }}
          />
        </div>
      </div>
    </section>
  );
}
