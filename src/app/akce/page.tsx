import type { Metadata } from "next";
import { connection } from "next/server";
import { Suspense } from "react";
import Link from "next/link";
import TrackedLink from "@/components/TrackedLink";
import { buildPageMetadata } from "@/lib/seo";
import { CONTACT_EMAIL, SITE_URL, VOLUNTEER_URL } from "@/lib/site-config";
import {
  getEventDateParts,
  getUpcomingEventsForNow,
  googleCalendarUrl,
} from "@/content/events";

export const metadata: Metadata = buildPageMetadata({
  title: "Akce",
  description:
    "Kde potkáte Radka Sáblíka osobně: kontaktní kampaň v ulicích Prahy 5 a 13 a pozvánky na sousedská setkání. Přijďte si popovídat.",
  path: "/akce",
});

function EventsSkeleton() {
  return (
    <div className="space-y-4 animate-pulse" aria-hidden="true">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="border-[3px] border-accent/20 rounded-[2rem] p-5 md:p-6 bg-cream/30 flex flex-col sm:flex-row gap-5 items-start"
        >
          <div className="w-full sm:w-24 h-24 bg-accent/10 rounded-[1rem] shrink-0" />
          <div className="flex-1 w-full space-y-3">
            <div className="h-8 w-3/4 bg-accent/10 rounded-md" />
            <div className="h-4 w-1/2 bg-accent/10 rounded-md" />
            <div className="h-10 w-44 bg-accent/10 rounded-full mt-4" />
          </div>
        </div>
      ))}
    </div>
  );
}

async function UpcomingEventsSection() {
  // Opt into dynamic server-side rendering so only the server holds the full
  // event calendar, and the client only receives events within the next 7 days.
  await connection();

  const upcoming = getUpcomingEventsForNow();

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": upcoming.map((event) => ({
      "@type": "Event",
      name: event.title,
      startDate: `${event.date}T${event.time ?? "15:30"}:00+02:00`,
      endDate: `${event.date}T${event.endTime ?? "18:00"}:00+02:00`,
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      eventStatus: "https://schema.org/EventScheduled",
      location: {
        "@type": "Place",
        name: event.place,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Praha",
          addressCountry: "CZ",
        },
      },
      organizer: {
        "@type": "Person",
        name: "Radko Sáblík",
        url: SITE_URL,
      },
      description: event.description ?? event.title,
    })),
  };

  if (upcoming.length === 0) {
    return (
      <div className="border-[3px] border-accent/20 rounded-2xl p-8 bg-cream/40 space-y-4">
        <h3 className="font-display text-2xl uppercase text-accent m-0">
          Rozpis na další dny připravujeme
        </h3>
        <p className="!m-0 text-base md:text-lg">
          Konkrétní místa stánků a setkání oznamujeme vždy zhruba týden dopředu.
          Nejrychleji se o nových místech dozvíte v newsletteru nebo na našem
          WhatsAppu.
        </p>
        <div className="flex flex-wrap gap-3 pt-2">
          <Link
            href="?modal=support"
            className="btn bg-green text-accent hover:bg-green/90 btn-sm text-center"
          >
            Dostávat termíny e-mailem
          </Link>
          <a
            href={VOLUNTEER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn bg-green text-accent hover:bg-green/90 btn-sm text-center"
          >
            WhatsApp kampaně
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4 pt-4">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />

      <ul className="list-none p-0 m-0 flex flex-col gap-6">
        {upcoming.map((event) => {
          const dateParts = getEventDateParts(event.date);

          return (
            <li
              key={event.id}
              className="border-[3px] border-accent rounded-[2rem] p-6 md:p-8 bg-cream shadow-[-4px_4px_0px_var(--color-accent)]"
            >
              <div className="flex flex-col sm:flex-row gap-6 sm:gap-6 md:gap-10 items-stretch">
                {/* 1. Typographic Date */}
                <div className="shrink-0 flex sm:flex-col items-baseline sm:items-center sm:justify-center gap-3 sm:gap-1 pb-6 sm:pb-0 sm:pl-4 sm:pr-10 md:pl-6 md:pr-14 border-b-[3px] sm:border-b-0 sm:border-r-[3px] border-accent/20 w-full sm:w-auto">
                  <span className="font-display text-[3.5rem] md:text-[5rem] font-bold leading-none text-accent text-center">
                    {dateParts.day}.
                  </span>
                  <div className="flex sm:flex-col items-baseline sm:items-center gap-2 sm:gap-0">
                    <span className="font-body text-xl md:text-2xl font-bold uppercase tracking-wider text-accent sm:mt-2 text-center">
                      {dateParts.month}
                    </span>
                    <span className="font-body text-base md:text-lg font-bold uppercase tracking-wider text-accent/60 text-center">
                      {dateParts.weekdayShort}
                    </span>
                  </div>
                </div>

                {/* 2. Event details */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-display text-3xl md:text-4xl uppercase leading-[0.95] text-accent m-0 mb-4">
                    {event.title}
                  </h3>

                  {/* 3. Bold labels instead of SVGs */}
                  <div className="flex flex-col gap-2 font-body text-lg text-accent/90">
                    <div>
                      <strong>📍 Kde:</strong> {event.place}
                    </div>
                    <div>
                      <strong>⏰ Kdy:</strong>{" "}
                      {event.time
                        ? `${event.time} – ${event.endTime}`
                        : "Celý den"}
                    </div>
                  </div>

                  {event.description && (
                    <p className="!m-0 !mt-4 text-lg text-[oklch(17.8%_0.01_88.8_/_0.85)]">
                      {event.description}
                    </p>
                  )}

                  {/* 4. Simplified Actions using site's design system */}
                  <div className="!mt-8 flex flex-wrap gap-4 items-center">
                    <TrackedLink
                      event="event_calendar_add"
                      eventData={{ id: event.id, kind: "google" }}
                      href={googleCalendarUrl(event)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn bg-green text-accent hover:bg-green/90 !text-sm sm:!text-base !px-5 md:!px-6 !py-2.5 md:!py-3"
                    >
                      Přidat do kalendáře
                    </TrackedLink>

                    {event.mapUrl && (
                      <TrackedLink
                        event="event_map_open"
                        eventData={{ id: event.id }}
                        href={event.mapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-body font-bold text-accent underline underline-offset-4 hover:text-primary transition-colors text-base"
                      >
                        Ukázat na mapě
                      </TrackedLink>
                    )}
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default function AkcePage() {
  const inviteMailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
    "Pozvánka pro Radka Sáblíka na sousedské setkání",
  )}&body=${encodeURIComponent(
    "Dobrý den pane řediteli,\n\nrádi bychom Vás pozvali na setkání v naší čtvrti.\n\nMísto (čtvrť / ulice): \nPředpokládaný termín: \nPočet účastníků (stačí 5–10 sousedů): \nTémata, která nás nejvíc pálí: \n\nKontakt na mě: \n",
  )}`;

  return (
    <main id="main" className="pt-32 pb-24 md:pt-40 md:pb-32 px-4 md:px-8">
      <div className="max-w-[960px] mx-auto bg-cream text-accent p-6 sm:p-10 md:p-16 rounded-[2.5rem] md:rounded-[3rem] border-[3px] border-accent shadow-[-6px_6px_0px_var(--color-accent)]">
        <h1 className="font-display text-center text-[clamp(3.5rem,7vw,5.5rem)] uppercase leading-[0.9] mt-6 sm:mt-0 mb-6 text-accent">
          Kde se potkáme?
        </h1>

        <div className="space-y-6 font-body text-lg md:text-xl font-medium text-[oklch(17.8%_0.01_88.8_/_0.85)]">
          <p className="text-center max-w-3xl mx-auto">
            Nejlepší část kampaně je ta v ulicích. Žádný billboard nenahradí
            rozhovor tváří v tvář. Celé září a říjen jsem proto s týmem v
            ulicích u stanic metra a na náměstích od Anděla po Stodůlky. Přijďte
            si popovídat o tom, co vás na Praze 5 a 13 trápí.
          </p>

          <Suspense fallback={<EventsSkeleton />}>
            <UpcomingEventsSection />
          </Suspense>

          {/* Section: Pozvěte mě mezi sousedy */}
          <h2 className="font-display text-[clamp(2rem,4vw,3rem)] uppercase leading-[0.9] text-accent mt-16 mb-4">
            Pozvěte mě mezi sousedy
          </h2>
          <p className="!mt-0">
            Pořádáte sousedské posezení ve vnitrobloku, setkání ve vašem domě,
            debatu rodičů o školách a přijímačkách, nebo se scházíte v klubu
            seniorů či sportovním oddílu?
          </p>
          <p>
            Rád za vámi přijedu kamkoliv po Praze 5 a Praze 13. Stačí, když se
            vás sejde <strong>5 až 10 sousedů</strong>. Nepotřebuji žádné pódium
            ani mikrofon – přijdu si s vámi sednout na lavičku nebo ke stolu,
            poslechnout si, co vás v ulici trápí, a na rovinu říct, co z pozice
            senátora dokážu prosadit a co ne. Napište nám, ozveme se do dvou
            dnů.
          </p>

          <div className="!mt-8 flex flex-wrap gap-4 justify-center">
            <a
              href={inviteMailto}
              className="btn bg-green text-accent hover:bg-green/90 text-center !text-[0.9rem] !py-2.5 !px-5"
            >
              Pozvat na sousedské setkání
            </a>
            <Link
              href="?modal=support"
              className="btn bg-white text-accent hover:bg-white/90 text-center !text-[0.9rem] !py-2.5 !px-5"
            >
              Chci dostávat pozvánky
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
