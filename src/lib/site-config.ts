/**
 * Single source of truth for site-wide values that were previously duplicated
 * across components (nav links, social profiles, contact email, election dates).
 * Safe to import from both server and client components.
 */

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.sablikdosenatu.cz";

export const CONTACT_EMAIL = "petr@sablikdosenatu.cz";

export type NavLink = {
  href: string;
  label: string;
  prefetch?: boolean;
};

/** Main navigation, shared by Header and Footer (labels are uppercased via CSS). */
export const NAV_LINKS: readonly NavLink[] = [
  { href: "/o-mne", label: "Kdo jsem" },
  { href: "/#program", label: "Cíle" },
  { href: "/muj-obvod", label: "Můj obvod", prefetch: false },
  { href: "/aktuality", label: "Aktuality" },
  { href: "/akce", label: "Akce", prefetch: false },
];

export type SocialLink = {
  href: string;
  /** Matches the `/images/icon-*.svg` filename. */
  icon: string;
  label: string;
};

/** Official campaign profiles – also used for JSON-LD `sameAs`. */
export const SOCIAL_LINKS: readonly SocialLink[] = [
  {
    href: "https://www.facebook.com/profile.php?id=61576032864105",
    icon: "facebook",
    label: "Facebook",
  },
  {
    href: "https://www.instagram.com/sablikdosenatu/",
    icon: "instagram",
    label: "Instagram",
  },
  {
    href: "https://www.tiktok.com/@sablikdosenatu",
    icon: "tiktok",
    label: "TikTok",
  },
  { href: "https://x.com/RadkoSablik", icon: "x", label: "X (Twitter)" },
  {
    href: "https://www.youtube.com/channel/UCtuA-sFY--TbCcCXD5vx4rw",
    icon: "youtube",
    label: "YouTube",
  },
];

/** Other ways to support the campaign (SupportModal). */
export const VOLUNTEER_URL = "https://chat.whatsapp.com/G8uZKOJQJDu8ORBnooi1pv";
export const DONATION_URL = "https://moje.ods.cz/dary/oblast";

/**
 * Transparentní volební účet koalice ODS, KDU-ČSL a STAN pro volby do Senátu
 * 2026 (Fio banka). Výdaje obvodu č. 21 jsou na účtu značeny předčíslím „21/“.
 */
export const ELECTION_ACCOUNT_URL = "https://ib.fio.cz/ib/transparent?a=-98";

/* Election timeline (Countdown) */
export const ELECTION_START = new Date("2026-10-09T14:00:00+02:00");
export const ELECTION_END = new Date("2026-10-10T14:00:00+02:00");
/** Case of a runoff (no candidate above 50 % in round 1): 16.–17. 10. 2026. */
export const ELECTION_ROUND2_START = new Date("2026-10-16T14:00:00+02:00");
export const ELECTION_ROUND2_END = new Date("2026-10-17T14:00:00+02:00");

/* Newsletter flow */
/** Confirmation-token lifetime. */
export const TOKEN_EXPIRY_MS = 24 * 60 * 60 * 1000;
/** Max subscribe attempts per IP per minute. */
export const SUBSCRIBE_IP_LIMIT = 3;
/** Max confirmation emails per address per hour. */
export const SUBSCRIBE_EMAIL_LIMIT = 3;
/** Max confirmation-link hits per IP per minute. */
export const CONFIRM_IP_LIMIT = 10;
