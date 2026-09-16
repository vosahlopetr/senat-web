"use client";

import { track } from "@vercel/analytics";
import type { AnchorHTMLAttributes } from "react";

type TrackedLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  /** Vercel Analytics custom-event name, e.g. "ics_download". */
  event: string;
  eventData?: Record<string, string | number | boolean>;
};

/**
 * Plain anchor that reports a privacy-friendly conversion event on click
 * (Vercel Analytics is cookieless). Used from server components for the
 * ICS/calendar links so copy changes can be judged by data.
 */
export default function TrackedLink({
  event,
  eventData,
  onClick,
  children,
  ...anchorProps
}: TrackedLinkProps) {
  return (
    <a
      {...anchorProps}
      onClick={(clickEvent) => {
        track(event, eventData);
        onClick?.(clickEvent);
      }}
    >
      {children}
    </a>
  );
}
