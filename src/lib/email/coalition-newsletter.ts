/**
 * One-shot Resend Broadcast: the July 2026 coalition announcement.
 *
 * Sent to the newsletter audience via `scripts/send-coalition-broadcast.mts`,
 * which runs under plain Node (no bundler). The file is therefore fully
 * self-contained: brand colors are inlined (mirroring `src/lib/og-image.ts`)
 * instead of imported through the `@/` alias.
 *
 * The `{{{RESEND_UNSUBSCRIBE_URL}}}` placeholder is filled per recipient by
 * Resend; when someone unsubscribes, Resend flips the contact to
 * `unsubscribed: true`, which the site's double-opt-in flow already respects.
 */

/* Brand colors – keep in sync with src/lib/og-image.ts. */
const PRIMARY = "#15197d";
const CREAM = "#FFF8ED";
const ACCENT = "#13110c";
const GREEN = "#43b929";
const ACCENT_MUTED = "#363531";
const ACCENT_SUBTLE = "#42413d";

/** `bg-black/5` on the white card (P.S. divider line). */
const QUOTE_BG = "#F2F0EB";

const CARD_RADIUS = "32px";
const BTN_RADIUS = "39px";

/** 51 chars – first-person, key message inside the first 30 (mobile cutoff). */
export const COALITION_NEWSLETTER_SUBJECT =
  "Mám velkou novinku: tři strany za jednu kandidaturu";

/** Preview text shown next to the subject; complements, not repeats it. */
export const COALITION_NEWSLETTER_PREHEADER =
  "ODS, Starostové a Lidovci jdou do senátních voleb společně. Se mnou.";

/** Internal broadcast name shown in the Resend dashboard. */
export const COALITION_NEWSLETTER_NAME = "Newsletter – koalice (červenec 2026)";

const UTM = "utm_source=newsletter&utm_medium=email&utm_campaign=koalice";

type CoalitionNewsletterOptions = {
  siteUrl: string;
};

export function renderCoalitionNewsletter({
  siteUrl,
}: CoalitionNewsletterOptions): string {
  const coalitionArticleUrl = `${siteUrl}/aktuality/tri-strany-jedna-kandidatura?${UTM}`;

  return `
<!DOCTYPE html>
<html lang="cs" style="color-scheme: light only; supported-color-schemes: light only;">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="color-scheme" content="light only">
  <meta name="supported-color-schemes" content="light only">
  <title>${COALITION_NEWSLETTER_SUBJECT}</title>
  <style>
    @font-face {
      font-family: 'Graph Condensed';
      font-style: normal;
      font-weight: 700;
      font-display: swap;
      src: url('${siteUrl}/fonts/graph-condensed-bold-web.woff2') format('woff2');
    }
    :root {
      color-scheme: light only;
      supported-color-schemes: light only;
    }
    @media (prefers-color-scheme: dark) {
      .email-body,
      .email-outer,
      .email-outer td {
        background-color: ${PRIMARY} !important;
      }
      .email-card {
        background-color: #FFFFFF !important;
        border-color: ${ACCENT} !important;
      }
      .email-card td {
        background-color: #FFFFFF !important;
      }
      .email-heading {
        color: ${ACCENT} !important;
      }
      .email-text {
        color: ${ACCENT_MUTED} !important;
      }
      .email-text-subtle {
        color: ${ACCENT_SUBTLE} !important;
      }
      .email-btn {
        background-color: ${GREEN} !important;
        color: ${ACCENT} !important;
        border-color: ${ACCENT} !important;
        box-shadow: -3px 3px 0px ${ACCENT} !important;
      }
      .email-footer,
      .email-footer p,
      .email-footer a {
        color: ${CREAM} !important;
      }
      .email-logo {
        -apple-color-filter: none !important;
      }
    }
  </style>
</head>
<body class="email-body" style="margin: 0; padding: 0; background-color: ${PRIMARY}; font-family: 'Satoshi', 'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif; color: ${ACCENT}; -webkit-font-smoothing: antialiased;">
  <div style="display: none; overflow: hidden; line-height: 1px; opacity: 0; max-height: 0; max-width: 0;">
    ${COALITION_NEWSLETTER_PREHEADER}&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;
  </div>
  <table class="email-outer" width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="${PRIMARY}" style="background-color: ${PRIMARY}; padding: 40px 20px;">
    <tr>
      <td align="center">
        <!--[if mso]>
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0"><tr><td align="center">
        <![endif]-->
        <table border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; width: 100%; margin-bottom: 24px;">
          <tr>
            <td align="center" style="padding-bottom: 8px;">
              <a href="${siteUrl}" style="text-decoration: none;">
                <img class="email-logo" src="${siteUrl}/images/logo-email.png" alt="Sáblík do Senátu" width="240" style="display: block; width: 240px; max-width: 100%; height: auto; border: 0; -apple-color-filter: none;" />
              </a>
            </td>
          </tr>
        </table>
        <!--[if mso]>
        </td></tr></table>
        <![endif]-->

        <!--[if mso]>
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0"><tr><td align="center">
        <![endif]-->
        <table class="email-card" border="0" cellspacing="0" cellpadding="0" bgcolor="#FFFFFF" style="max-width: 600px; width: 100%; background-color: #FFFFFF; border: 3px solid ${ACCENT}; border-radius: ${CARD_RADIUS}; overflow: hidden;">
          <tr>
            <td style="padding: 0;">
              <a href="${coalitionArticleUrl}" style="text-decoration: none;">
                <img src="${siteUrl}/images/tri-strany-email.jpg" alt="Koalice ODS, Starostové a Lidovci" width="600" style="display: block; width: 100%; height: auto; border: 0;" />
              </a>
            </td>
          </tr>
          <tr>
            <td style="padding: 36px 32px 40px; text-align: center;">
              <h1 class="email-heading" style="font-family: 'Graph Condensed', 'Impact', 'Arial Narrow', sans-serif; font-weight: 700; text-transform: uppercase; color: ${ACCENT}; margin: 0 0 16px; font-size: 40px; line-height: 1; letter-spacing: 0.02em;">Tři strany, jedna kandidatura</h1>
              <p class="email-text" style="font-size: 18px; line-height: 1.5; color: ${ACCENT_MUTED}; margin: 0 0 16px; font-weight: 500; text-align: left;">
                Mám radost a chci, abyste to věděli mezi prvními: ODS, Starostové a Lidovci se dohodli, že do podzimních senátních voleb na Praze 5 a Praze 13 půjdeme společně. Není to jen podpora na papíře. Tři demokratické strany staví jednoho kandidáta. A tím kandidátem jsem já.
              </p>
              <p class="email-text" style="font-size: 18px; line-height: 1.5; color: ${ACCENT_MUTED}; margin: 0 0 16px; font-weight: 500; text-align: left;">
                Co to znamená pro vás? Hlas pro slušnou politiku se v našem obvodu nebude tříštit. A pro mě je to závazek: hledat, co nás spojuje, ne co nás rozděluje. Přesně tak, jak to chci dělat i v Senátu.
              </p>
              <p class="email-text" style="font-size: 18px; line-height: 1.5; color: ${ACCENT_MUTED}; margin: 0 0 28px; font-weight: 700; text-align: left;">
                – Radko
              </p>
              <div style="margin: 0 0 8px;">
                <a class="email-btn" href="${coalitionArticleUrl}" style="background-color: ${GREEN}; color: ${ACCENT}; font-weight: 700; font-family: 'Satoshi', 'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 20px; text-transform: uppercase; text-decoration: none; padding: 14px 24px; border: 3px solid ${ACCENT}; border-radius: ${BTN_RADIUS}; display: inline-block; box-shadow: -3px 3px 0px ${ACCENT}; letter-spacing: 0.05em;">Chci vědět víc</a>
              </div>
              <table border="0" cellspacing="0" cellpadding="0" width="100%" style="margin: 28px 0 0; border-top: 2px solid ${QUOTE_BG};">
                <tr>
                  <td style="padding: 20px 0 0; text-align: left;">
                    <p class="email-text" style="font-size: 16px; line-height: 1.5; color: ${ACCENT_MUTED}; margin: 0; font-weight: 500;">
                      P.S. Znáte někoho z Prahy 5 nebo 13, koho by tahle novinka zajímala? Přepošlete mu tento e-mail. Nebo mu ukažte <a href="${coalitionArticleUrl}" style="color: ${ACCENT}; font-weight: 700; text-decoration: underline; text-underline-offset: 3px;">celý článek</a>.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
        <!--[if mso]>
        </td></tr></table>
        <![endif]-->

        <!--[if mso]>
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0"><tr><td align="center">
        <![endif]-->
        <table class="email-footer" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; width: 100%; margin-top: 20px;">
          <tr>
            <td style="padding: 20px; text-align: center; font-size: 14px; line-height: 1.5; color: ${CREAM};">
              <p style="margin: 0 0 10px 0; font-weight: 700; letter-spacing: -0.02em;">
                Copyright 2026. Všechna práva vyhrazena.<br />
                <a href="${siteUrl}/privacy" style="color: ${CREAM}; text-decoration: underline; text-underline-offset: 2px;">Zásady ochrany osobních údajů.</a>
              </p>
              <p style="margin: 0 0 10px 0;">
                Nechcete už dostávat novinky? <a href="{{{RESEND_UNSUBSCRIBE_URL}}}" style="color: ${CREAM}; text-decoration: underline; text-underline-offset: 2px;">Odhlásit odběr</a>
              </p>
              <p style="margin: 0; font-size: 12px; line-height: 1.35; letter-spacing: -0.02em;">Politická reklama. Zadavatel / Zpracovatel: Sáblík do Senátu<br /><span style="font-style: italic; font-weight: 300;">koalice ODS, STAN a KDU-ČSL</span></p>
            </td>
          </tr>
        </table>
        <!--[if mso]>
        </td></tr></table>
        <![endif]-->
      </td>
    </tr>
  </table>
</body>
</html>
      `;
}
