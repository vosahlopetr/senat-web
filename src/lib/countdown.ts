import {
  ELECTION_END,
  ELECTION_ROUND2_END,
  ELECTION_ROUND2_START,
  ELECTION_START,
} from "@/lib/site-config";

export type CountdownState = {
  phase: "before" | "during" | "between" | "during2" | "after";
  daysLeft: number;
};

/**
 * Final stretch before round 1. Urgency framing and voting logistics only
 * become relevant close to the deadline (early facilitation/persuasion
 * decays – Kalla & Broockman 2018), so UI elements switch from
 * persuasion-stage content to mobilization inside this window.
 */
export const URGENCY_WINDOW_DAYS = 30;

/**
 * True once the site's job shifts from introducing the candidate to getting
 * people to the polls: the last month before round 1 and everything after
 * (election days, between rounds, runoff).
 */
export function isMobilizationWindow(state: CountdownState): boolean {
  return state.phase !== "before" || state.daysLeft <= URGENCY_WINDOW_DAYS;
}

/**
 * Senate elections have two rounds a week apart. Between the rounds the
 * decisive job of the site is runoff mobilization (turnout historically
 * collapses in round 2), so the countdown keeps counting toward round 2.
 * If the race ends in round 1, POST_ELECTION_STATUS switches the whole
 * site to the post-election page and this state never shows.
 */
export function getCountdownState(nowMs: number): CountdownState {
  if (nowMs > ELECTION_ROUND2_END.getTime()) {
    return { phase: "after", daysLeft: 0 };
  }

  if (nowMs >= ELECTION_ROUND2_START.getTime()) {
    return { phase: "during2", daysLeft: 0 };
  }

  if (nowMs > ELECTION_END.getTime()) {
    const diffMs = ELECTION_ROUND2_START.getTime() - nowMs;
    return {
      phase: "between",
      daysLeft: Math.ceil(diffMs / (1000 * 60 * 60 * 24)),
    };
  }

  const diffMs = ELECTION_START.getTime() - nowMs;
  if (diffMs <= 0) {
    return { phase: "during", daysLeft: 0 };
  }

  return {
    phase: "before",
    daysLeft: Math.ceil(diffMs / (1000 * 60 * 60 * 24)),
  };
}

/** Czech plural for days remaining ("1 den", "2 dny", "5 dní"). */
export function daysSuffix(daysLeft: number): string {
  if (daysLeft === 1) return "den";
  if (daysLeft >= 2 && daysLeft <= 4) return "dny";
  return "dní";
}
