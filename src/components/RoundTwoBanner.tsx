import Link from "next/link";
import { getCountdownState } from "@/lib/countdown";
import { ROUND2_ENDORSEMENTS, ROUND2_RESULTS_NOTE } from "@/content/round2";
import TrackedLink from "./TrackedLink";

/**
 * Between-rounds mode: obvod 21 has never been decided in round 1, runoff
 * turnout collapses (25,5 % in 2020) and the 2020 runoff flipped the
 * first-round order by 2 305 votes – the ~6 days between rounds are the
 * whole game. The banner activates automatically when round 1 ends and
 * disappears after the runoff; content (results note, endorsements) comes
 * from src/content/round2.ts, which the team fills on results night.
 *
 * Renders nothing outside the between/during2 phases, so it can sit in the
 * homepage tree all campaign long.
 */
export default function RoundTwoBanner() {
  // Clock read at cache-fill time; the homepage cache profile is "hours"
  // so the banner appears within about an hour of round 1 closing.
  // eslint-disable-next-line react-hooks/purity -- deliberate clock read at cache-fill time (see comment above)
  const state = getCountdownState(Date.now());
  if (state.phase !== "between" && state.phase !== "during2") {
    return null;
  }

  const isVotingNow = state.phase === "during2";

  return (
    <section
      aria-labelledby="round2-heading"
      className="section bg-primary text-cream relative border-y-[3px] border-cream/30"
    >
      <div className="container flex flex-col items-center text-center gap-6">
        <h2
          id="round2-heading"
          className="font-display font-bold uppercase tracking-[-0.02em] leading-[0.95] text-[clamp(2.5rem,7vw,4.25rem)] m-0"
        >
          {isVotingNow ? (
            <>
              <span className="marker-strike">Druhé kolo</span> právě probíhá!
            </>
          ) : (
            <>
              Rozhoduje <span className="marker-strike">druhé kolo</span>!
            </>
          )}
        </h2>

        <p className="m-0 max-w-[720px] font-semibold text-[clamp(1.125rem,2.5vw,1.5rem)] leading-[1.4]">
          {isVotingNow ? (
            <>
              Volební místnosti jsou otevřené v pátek 14:00–22:00 a v sobotu
              8:00–14:00. Stačí občanka nebo pas. Hlasovací lístky dostanete
              přímo v místnosti.
            </>
          ) : (
            <>
              Přijďte znovu{" "}
              <TrackedLink
                event="ics_download"
                eventData={{ source: "round2_banner" }}
                href="/volby-2026.ics"
                title="Přidat termín 2. kola do kalendáře"
                className="underline decoration-2 underline-offset-4 transition-opacity hover:opacity-70"
              >
                16.–17. října
              </TrackedLink>
              . Hlasovací lístky dostanete až ve volební místnosti. A vezměte s
              sebou někoho, komu na Praze 5 a 13 záleží stejně jako vám.
            </>
          )}
        </p>

        {ROUND2_RESULTS_NOTE ? (
          <p className="m-0 max-w-[720px] text-[1.05rem] md:text-[1.15rem] font-medium leading-[1.5] opacity-90">
            {ROUND2_RESULTS_NOTE}
          </p>
        ) : null}

        {ROUND2_ENDORSEMENTS.length > 0 ? (
          <div className="w-full max-w-[880px]">
            <h3 className="font-display uppercase text-[clamp(1.5rem,3.5vw,2rem)] leading-none mb-4">
              Ve 2. kole mě podporují
            </h3>
            <ul className="list-none p-0 m-0 grid grid-cols-1 sm:grid-cols-2 gap-4 text-left">
              {ROUND2_ENDORSEMENTS.map((endorsement) => (
                <li
                  key={endorsement.name}
                  className="border-[3px] border-cream/60 rounded-2xl px-5 py-4 bg-cream/5"
                >
                  {endorsement.quote ? (
                    <p className="m-0 font-medium leading-[1.45]">
                      „{endorsement.quote}“
                    </p>
                  ) : null}
                  <p className="m-0 mt-2 font-extrabold">{endorsement.name}</p>
                  <p className="m-0 text-sm opacity-90">{endorsement.role}</p>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {!isVotingNow ? (
          <p className="m-0 max-w-[720px] text-[1rem] md:text-[1.1rem] font-medium leading-[1.5] opacity-90">
            Nebudete doma? Voličský průkaz pro 2. kolo vyřídíte osobně na úřadě
            své městské části do středy 14. října do 16:00 – platí jen uvnitř
            obvodu č. 21.
          </p>
        ) : null}

        <div className="flex flex-wrap gap-4 justify-center">
          <Link href="/jak-volit" className="btn btn-primary">
            Jak volit ve 2. kole
          </Link>
        </div>
      </div>
    </section>
  );
}
