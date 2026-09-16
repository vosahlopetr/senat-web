import Image from "next/image";
import Link from "next/link";
import sablikImage from "../../public/images/sablikhappy.webp";

/**
 * Conversion block at the end of every article: readers finishing an article
 * are at peak attention, so give them one clear next step (SupportModal covers
 * newsletter, volunteering and donations) plus a quiet path for reporters.
 * Portrait placement mirrors Hero: bottom-locked on desktop, faded under the
 * body copy on mobile.
 */
export default function ArticleCTA() {
  return (
    <aside
      aria-label="Zapojte se do kampaně"
      className="relative mt-16 overflow-hidden bg-primary border-[3px] border-accent rounded-[28px] shadow-[-6px_6px_0px_var(--color-accent)]"
    >
      <div className="relative flex flex-col lg:flex-row items-center justify-start lg:justify-center pt-8 pb-0 md:pt-10 lg:pt-10 px-8 md:px-10 gap-4 lg:gap-8 text-center lg:text-left">
        <div className="flex-none lg:flex-1 flex flex-col items-center lg:items-start z-[2] w-full min-w-0">
          <div className="relative w-full">
            <h2 className="relative z-[1] font-display font-bold text-[clamp(2.75rem,7vw,4rem)] leading-[0.95] tracking-[-0.02em] text-cream uppercase mb-4">
              Pojďte do toho{" "}
              <span className="marker-strike [&::after]:!bottom-[-0.005em]">
                s&nbsp;námi
              </span>
            </h2>

            <div className="relative z-[1] flex justify-center w-full mt-2 lg:hidden pointer-events-none">
              <Image
                src={sablikImage}
                alt="Radko Sáblík – kandidát do Senátu"
                quality={75}
                draggable={false}
                sizes="85vw"
                className="select-none pointer-events-none drop-shadow-[0_8px_40px_oklch(0%_0_0_/_0.35)] [mask-image:linear-gradient(to_bottom,black_0%,black_80%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,black_0%,black_80%,transparent_100%)]"
                style={{
                  width: "clamp(240px, 72vw, 360px)",
                  height: "auto",
                }}
              />
            </div>
          </div>

          <div className="w-full pb-8 md:pb-10 lg:pb-10">
            <p className="relative z-[4] -mt-[clamp(2.75rem,13vw,4.75rem)] lg:mt-0 font-body font-semibold text-[1.125rem] md:text-[1.25rem] leading-[1.5] text-text-muted max-w-[34rem] mx-auto lg:mx-0 mb-8 [text-shadow:0_1px_18px_oklch(0%_0_0_/_0.85)] lg:[text-shadow:none]">
              Tahle kampaň stojí na lidech. Vede ji parta studentů a
              dobrovolníků. Nechte nám e-mail a dozvíte se jako první, co
              chystáme a s&nbsp;čím jde zrovna pomoct.
            </p>
            <div className="relative z-[4] flex flex-col items-center lg:items-start gap-4">
              <Link
                href="?modal=support"
                className="btn btn-primary w-full sm:w-auto"
              >
                Chci být u toho
              </Link>
            </div>
            <p className="relative z-[4] mt-8 pt-5 border-t border-cream/15 font-body text-sm md:text-base text-cream/70">
              Píšete o kampani? Podklady najdete na stránce{" "}
              <Link
                href="/pro-media"
                className="text-cream underline underline-offset-4 decoration-2 transition-opacity hover:opacity-70"
              >
                Pro média
              </Link>
              .
            </p>
          </div>
        </div>

        <div className="hidden lg:flex flex-none lg:flex-1 lg:self-stretch items-end justify-center lg:justify-end z-[1] w-full pointer-events-none">
          <Image
            src={sablikImage}
            alt="Radko Sáblík – kandidát do Senátu"
            quality={75}
            draggable={false}
            sizes="(max-width: 1024px) 45vw, 440px"
            className="select-none pointer-events-none drop-shadow-[0_8px_40px_oklch(0%_0_0_/_0.35)]"
            style={{
              width: "clamp(300px, 40vw, 440px)",
              height: "auto",
            }}
          />
        </div>
      </div>
    </aside>
  );
}
