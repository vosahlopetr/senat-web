"use client";

import { useSyncExternalStore } from "react";
import { track } from "@vercel/analytics";
import {
  daysSuffix,
  getCountdownState,
  URGENCY_WINDOW_DAYS,
} from "@/lib/countdown";

function subscribeToClock(onTick: () => void) {
  const interval = setInterval(onTick, 60_000);
  return () => clearInterval(interval);
}

/**
 * Same add-to-calendar implementation as /jak-volit: a plain anchor to the
 * static ICS file (opens Google, Apple and Outlook calendars) – supports the
 * plan-making effect (Nickerson & Rogers 2010) right where the date is read.
 */
function CalendarDateLink({ children }: { children: React.ReactNode }) {
  return (
    <a
      href="/volby-2026.ics"
      title="Přidat termíny voleb do kalendáře"
      className="underline decoration-2 underline-offset-4 transition-opacity hover:opacity-70"
      onClick={() => track("ics_download", { source: "countdown" })}
    >
      {children}
    </a>
  );
}

/** Truncated to the minute so the snapshot is stable between ticks. */
function getClientNowMs() {
  return Math.floor(Date.now() / 60_000) * 60_000;
}

export default function CountdownClient({
  initialNowMs,
}: {
  initialNowMs: number;
}) {
  // Server HTML and hydration render from the server-provided timestamp
  // (no mismatch); after hydration the store re-reads the real client time,
  // correcting any staleness from the cached page, and ticks every minute.
  const nowMs = useSyncExternalStore(
    subscribeToClock,
    getClientNowMs,
    () => initialNowMs,
  );
  const state = getCountdownState(nowMs);

  // The date is the payload: plan-making drives turnout (Nickerson & Rogers
  // 2010), while efficacy platitudes ("your vote matters") show no measurable
  // effect even in ideal conditions (Enos & Fowler 2014). Urgency framing
  // only works near the deadline, so the day count joins the date in the
  // final month.
  const text =
    state.phase === "after" ? (
      "Volby proběhly."
    ) : state.phase === "during2" ? (
      "Druhé kolo právě probíhá!"
    ) : state.phase === "between" ? (
      <>
        Rozhoduje se ve 2. kole! <br className="md:hidden" />
        Přijďte znovu <CalendarDateLink>16.–17. října</CalendarDateLink>.
      </>
    ) : state.phase === "during" ? (
      "Volby právě probíhají!"
    ) : state.daysLeft <= URGENCY_WINDOW_DAYS ? (
      <>
        Volby <CalendarDateLink>9. a 10. října</CalendarDateLink> – už za{" "}
        {state.daysLeft} {daysSuffix(state.daysLeft)}.
      </>
    ) : (
      <>
        Volby jsou <CalendarDateLink>9. a 10. října</CalendarDateLink>.
      </>
    );

  return (
    <div className="w-full max-w-[600px] mx-auto lg:mx-0">
      {/* Type scale matches the hero sub-paragraph (one secondary style in
          the hero); emphasis comes from cream vs. muted color, not size. */}
      <div className="text-center lg:text-left font-body text-[clamp(1.1rem,2.5vw,1.5rem)] font-semibold leading-[1.4] text-cream">
        {text}
      </div>
    </div>
  );
}
