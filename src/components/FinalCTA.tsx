import Link from "next/link";
import Image from "next/image";
import { getCountdownState, isMobilizationWindow } from "@/lib/countdown";
import TrackedLink from "./TrackedLink";

/**
 * Same add-to-calendar pattern as CountdownClient and /jak-volit: the date
 * is the payload, so it links straight to the static ICS file – supports
 * the plan-making effect (Nickerson & Rogers 2010) right where the date
 * is read.
 */
function CalendarDateLink({ children }: { children: React.ReactNode }) {
  return (
    <TrackedLink
      event="ics_download"
      eventData={{ source: "final_cta" }}
      href="/volby-2026.ics"
      title="Přidat termíny voleb do kalendáře"
      className="underline decoration-2 underline-offset-4 transition-opacity hover:opacity-70"
    >
      {children}
    </TrackedLink>
  );
}

/**
 * One master message, one action. In the persuasion phase the block carries
 * the canonical slogan form with the benefit and place welded on („…a líp.
 * Pro Prahu 5 a 13.“) instead of a generic change platitude. In the final
 * month and around the rounds it switches to turnout copy – dates plus a
 * bring-someone prompt: plan-making and social/companionship pressure are
 * the levers that measurably move turnout (Nickerson & Rogers 2010;
 * Gerber, Green & Larimer 2008), while persuasion this close to election
 * day is ≈ 0 (Kalla & Broockman 2018).
 */
export default function FinalCTA() {
  // Clock read at cache-fill time like in Hero and Countdown; a day of
  // staleness around the threshold is harmless. After the election,
  // POST_ELECTION_STATUS switches the whole site, so the stale-date case
  // never shows.
  // eslint-disable-next-line react-hooks/purity -- deliberate clock read at cache-fill time (see comment above)
  const state = getCountdownState(Date.now());
  const mobilize = isMobilizationWindow(state);
  const runoff = state.phase === "between" || state.phase === "during2";

  return (
    <section className="section bg-primary py-16 md:py-24 relative overflow-hidden">
      <div className="container relative z-10 flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-16">
        <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left w-full">
          <h2 className="font-display font-bold text-[clamp(3rem,8vw,4.25rem)] text-cream uppercase tracking-[-0.02em] leading-[0.95] select-none mb-6 md:mb-8 w-full">
            <span className="block whitespace-nowrap">DOSTAŇTE S NÁMI</span>
            <span className="block whitespace-nowrap">
              <span className="marker-strike [&::after]:!bottom-[-0.075em] [&::after]:!left-[-0.05em]">
                ŘEDITELE DO SENÁTU!
              </span>
            </span>
          </h2>

          <p className="text-[clamp(1.32rem,3vw,1.8rem)] lg:text-[clamp(1.1rem,2.5vw,1.5rem)] max-w-[600px] mb-7.5 md:mb-10 text-text-muted font-semibold leading-[1.4] mx-auto lg:mx-0">
            {runoff ? (
              <>
                Rozhoduje druhé kolo{" "}
                <CalendarDateLink>16.–17. října</CalendarDateLink>. Přijďte
                znovu. A vezměte s sebou někoho, komu na Praze 5 a 13 záleží
                stejně jako vám.
              </>
            ) : mobilize ? (
              <>
                Volby jsou <CalendarDateLink>9. a 10. října</CalendarDateLink>.
                Naplánujte si cestu do volební místnosti. A vezměte s sebou
                někoho, komu na Praze 5 a 13 záleží stejně jako vám.
              </>
            ) : (
              <>
                Odvaha dělat věci jinak – a líp. Pro Prahu 5 a 13. Přidejte se
                ke kampani, kterou vedou studenti a lidé z našeho obvodu.
              </>
            )}
          </p>

          <div className="flex gap-4 justify-center lg:justify-start flex-wrap">
            {mobilize ? (
              <>
                <Link
                  href="/jak-volit"
                  className="btn btn-primary md:text-xl md:px-10 md:py-5"
                >
                  JAK VOLIT
                </Link>
                <Link
                  href="?modal=support"
                  className="btn btn-secondary md:text-xl md:px-10 md:py-5"
                >
                  PŘIDEJTE SE K NÁM
                </Link>
              </>
            ) : (
              <Link
                href="?modal=support"
                className="btn btn-primary md:text-xl md:px-10 md:py-5"
              >
                PŘIDEJTE SE K NÁM
              </Link>
            )}
          </div>
        </div>

        <div className="flex-1 w-full flex justify-center lg:justify-center items-center relative z-10 mt-8 lg:mt-0">
          <Image
            src="/images/sablicek.webp"
            alt="Radko Sáblík"
            width={500}
            height={500}
            className="w-full h-auto max-w-[196px] md:max-w-[252px] lg:max-w-[252px] object-contain drop-shadow-[0_8px_30px_oklch(0%_0_0_/_0.2)] select-none pointer-events-none"
            draggable={false}
          />
        </div>
      </div>
    </section>
  );
}
