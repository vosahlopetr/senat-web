import { buildEventIcs, getPublicEventById } from "@/content/events";

/**
 * Per-event „přidat do kalendáře" file. Works alongside the Google
 * Calendar template link on /akce – Apple/Outlook users get the ICS,
 * everyone else the GCal link.
 *
 * For security and leak prevention, only events within the current 7-day
 * visibility window can be downloaded. Future events beyond the window return 404.
 */
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const event = getPublicEventById(id, Date.now());
  if (!event) {
    return new Response("Akce nenalezena", {
      status: 404,
      headers: {
        "Cache-Control": "no-store",
      },
    });
  }

  return new Response(buildEventIcs(event), {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": `attachment; filename="akce-${id}.ics"`,
      "Cache-Control": "public, max-age=3600",
    },
  });
}
