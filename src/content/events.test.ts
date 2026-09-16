import { describe, expect, it } from "vitest";
import {
  buildEventIcs,
  EVENTS,
  getEventById,
  getEventCategory,
  getEventDateParts,
  getMaxVisibleDateString,
  getPragueDateString,
  getPublicEventById,
  googleCalendarUrl,
  upcomingEvents,
  type CampaignEvent,
} from "./events";

const timedEvent: CampaignEvent = {
  id: "stanek-andel",
  date: "2026-09-12",
  time: "10:00",
  title: "Kontaktní stánek – Anděl",
  place: "pěší zóna Anděl, Praha 5",
  mapUrl: "https://drive.google.com/open?id=123test",
  description: "Přijďte si popovídat; čeká vás Radko Sáblík, káva a tým.",
};

const allDayEvent: CampaignEvent = {
  id: "debata-stodulky",
  date: "2026-09-30",
  title: "Debata ve Stodůlkách",
  place: "KD Mlejn, Praha 13",
};

describe("buildEventIcs", () => {
  it("builds a timed event with Europe/Prague TZID and default 2h duration", () => {
    const ics = buildEventIcs(timedEvent);
    expect(ics).toContain("DTSTART;TZID=Europe/Prague:20260912T100000");
    expect(ics).toContain("DTEND;TZID=Europe/Prague:20260912T120000");
    expect(ics).toContain("UID:akce-stanek-andel@sablikdosenatu.cz");
  });

  it("builds an all-day event with exclusive DTEND on the next day", () => {
    const ics = buildEventIcs(allDayEvent);
    expect(ics).toContain("DTSTART;VALUE=DATE:20260930");
    expect(ics).toContain("DTEND;VALUE=DATE:20261001");
  });

  it("escapes commas and semicolons in TEXT fields", () => {
    const ics = buildEventIcs(timedEvent);
    expect(ics).toContain("LOCATION:pěší zóna Anděl\\, Praha 5");
  });

  it("folds long lines to ≤ 75 octets without splitting UTF-8 sequences", () => {
    const ics = buildEventIcs(timedEvent);
    const physicalLines = ics.split("\r\n");
    const encoder = new TextEncoder();
    for (const line of physicalLines) {
      expect(encoder.encode(line).length).toBeLessThanOrEqual(75);
    }
    // Unfolded content must reconstruct the original description text.
    const unfolded = ics.replaceAll("\r\n ", "");
    expect(unfolded).toContain(
      "Přijďte si popovídat\\; čeká vás Radko Sáblík\\, káva a tým.",
    );
  });

  it("includes mapUrl in description when present", () => {
    const ics = buildEventIcs(timedEvent);
    const unfolded = ics.replaceAll("\r\n ", "");
    expect(unfolded).toContain(
      "Přesné umístění stánku: https://drive.google.com/open?id=123test",
    );
  });

  it("ends every line with CRLF", () => {
    const ics = buildEventIcs(allDayEvent);
    expect(ics.endsWith("\r\n")).toBe(true);
    expect(ics).not.toMatch(/[^\r]\n/);
  });
});

describe("googleCalendarUrl", () => {
  it("encodes timed events with local start/end", () => {
    const url = new URL(googleCalendarUrl(timedEvent));
    expect(url.hostname).toBe("calendar.google.com");
    expect(url.searchParams.get("dates")).toBe(
      "20260912T100000/20260912T120000",
    );
    expect(url.searchParams.get("ctz")).toBe("Europe/Prague");
    expect(url.searchParams.get("location")).toBe("pěší zóna Anděl, Praha 5");
    expect(url.searchParams.get("details")).toContain(
      "Přesné umístění stánku: https://drive.google.com/open?id=123test",
    );
  });

  it("encodes all-day events with exclusive end date", () => {
    const url = new URL(googleCalendarUrl(allDayEvent));
    expect(url.searchParams.get("dates")).toBe("20260930/20261001");
  });
});

describe("campaign schedule integrity", () => {
  it("contains 46 scheduled events", () => {
    expect(EVENTS.length).toBe(46);
  });

  it("ensures every event has a unique ID and valid date format", () => {
    const ids = new Set<string>();
    for (const event of EVENTS) {
      expect(ids.has(event.id)).toBe(false);
      ids.add(event.id);
      expect(event.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(event.title.length).toBeGreaterThan(0);
      expect(event.place.length).toBeGreaterThan(0);
    }
  });
});

describe("7-day visibility and leak prevention", () => {
  it("calculates Prague date and max visible date correctly", () => {
    const now = new Date("2026-09-02T14:00:00+02:00");
    const pragueDate = getPragueDateString(now);
    expect(pragueDate).toBe("2026-09-02");
    expect(getMaxVisibleDateString(pragueDate, 7)).toBe("2026-09-09");
  });

  it("limits upcomingEvents to today through +7 days (8 days total)", () => {
    // Simulated as 2026-09-02 12:00:00 Europe/Prague
    const nowMs = new Date("2026-09-02T12:00:00+02:00").getTime();
    const visible = upcomingEvents(nowMs);

    // Should include 2026-09-02 (today) through 2026-09-09 (7 days ahead)
    const dates = visible.map((e) => e.date);
    expect(dates).toContain("2026-09-02");
    expect(dates).toContain("2026-09-09");

    // Events before today (2026-09-01) must NOT be visible
    expect(dates).not.toContain("2026-09-01");

    // Events after 7 days (2026-09-10 onward) must NOT be visible to prevent leaks
    expect(dates).not.toContain("2026-09-10");
    expect(dates).not.toContain("2026-09-15");
    expect(dates).not.toContain("2026-10-09");

    // All visible events must be between 2026-09-02 and 2026-09-09
    for (const event of visible) {
      expect(event.date >= "2026-09-02").toBe(true);
      expect(event.date <= "2026-09-09").toBe(true);
    }
  });

  it("getPublicEventById returns an event within the 7-day window, but rejects future events", () => {
    const nowMs = new Date("2026-09-02T12:00:00+02:00").getTime();

    // Event on 2026-09-05 is within 7 days
    const inWindow = getPublicEventById(
      "stanek-nove-butovice-2026-09-05",
      nowMs,
    );
    expect(inWindow).toBeDefined();
    expect(inWindow?.title).toBe("Stánek – Nové Butovice");

    // Event on 2026-09-15 is > 7 days ahead, must be hidden from public API
    const futureSecret = getPublicEventById(
      "stanek-tilleho-namesti-2026-09-15",
      nowMs,
    );
    expect(futureSecret).toBeUndefined();

    // Event on 2026-09-01 is past, must be hidden from public API
    const past = getPublicEventById("stanek-luziny-2026-09-01", nowMs);
    expect(past).toBeUndefined();

    // getEventById (internal) still finds it
    expect(getEventById("stanek-tilleho-namesti-2026-09-15")).toBeDefined();
  });
});

describe("getEventDateParts and getEventCategory helpers", () => {
  it("formats date parts accurately", () => {
    const parts = getEventDateParts("2026-09-02");
    expect(parts.day).toBe("2");
    expect(parts.month).toBe("září");
    expect(parts.weekdayShort).toMatch(/^St$/i);
    expect(parts.weekdayLong).toMatch(/^středa$/i);
    expect(parts.year).toBe("2026");
  });

  it("categorizes campaign events correctly by type and district", () => {
    const stanekP13 = EVENTS.find((e) => e.id === "stanek-luziny-2026-09-01")!;
    const catP13 = getEventCategory(stanekP13);
    expect(catP13.badge).toBe("Kontaktní stánek");
    expect(catP13.district).toBe("Praha 13");
    expect(catP13.isSpecial).toBe(false);

    const quizP13 = EVENTS.find(
      (e) => e.id === "stanek-hurka-pub-quiz-2026-10-06",
    )!;
    const catQuiz = getEventCategory(quizP13);
    expect(catQuiz.badge).toBe("Hospodský kvíz & soutěž");
    expect(catQuiz.district).toBe("Praha 13");
    expect(catQuiz.isSpecial).toBe(true);

    const minigolf = EVENTS.find(
      (e) => e.id === "stanek-centralni-park-minigolf-2026-09-28",
    )!;
    const catMinigolf = getEventCategory(minigolf);
    expect(catMinigolf.badge).toBe("Sváteční minigolf");
    expect(catMinigolf.isSpecial).toBe(true);

    const electionRound1 = EVENTS.find(
      (e) => e.id === "volby-1-kolo-2026-10-09",
    )!;
    const catElection1 = getEventCategory(electionRound1);
    expect(catElection1.isElection).toBe(true);
    expect(catElection1.badge).toBe("1. kolo voleb");
  });
});
