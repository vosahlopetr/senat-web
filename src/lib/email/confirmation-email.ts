import {
  OG_ACCENT,
  OG_ACCENT_MUTED,
  OG_ACCENT_SUBTLE,
  OG_CREAM,
  OG_GREEN,
  OG_PRIMARY,
} from "@/lib/og-image";

/** Matches `rounded-[32px]` cards (SupportModal md, Footer, Team, etc.). */
const EMAIL_CARD_RADIUS = "32px";
/** Matches `.btn` `rounded-full` / `--radius-pill` (2.4375rem). */
const EMAIL_BTN_RADIUS = "39px";

export const CONFIRMATION_EMAIL_SUBJECT =
  "Potvrzení registrace k odběru novinek";

type ConfirmationEmailOptions = {
  siteUrl: string;
  confirmationLink: string;
};

export function renderConfirmationEmail({
  siteUrl,
  confirmationLink,
}: ConfirmationEmailOptions): string {
  return `
<!DOCTYPE html>
<html lang="cs" style="color-scheme: light only; supported-color-schemes: light only;">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="color-scheme" content="light only">
  <meta name="supported-color-schemes" content="light only">
  <title>Potvrzení registrace</title>
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
        background-color: ${OG_PRIMARY} !important;
      }
      .email-card {
        background-color: #FFFFFF !important;
        border-color: ${OG_ACCENT} !important;
      }
      .email-card td {
        background-color: #FFFFFF !important;
      }
      .email-heading {
        color: ${OG_ACCENT} !important;
      }
      .email-text {
        color: ${OG_ACCENT_MUTED} !important;
      }
      .email-text-subtle {
        color: ${OG_ACCENT_SUBTLE} !important;
      }
      .email-btn {
        background-color: ${OG_GREEN} !important;
        color: ${OG_ACCENT} !important;
        border-color: ${OG_ACCENT} !important;
        box-shadow: -3px 3px 0px ${OG_ACCENT} !important;
      }
      .email-footer,
      .email-footer p,
      .email-footer a {
        color: ${OG_CREAM} !important;
      }
      .email-logo {
        -apple-color-filter: none !important;
      }
    }
  </style>
</head>
<body class="email-body" style="margin: 0; padding: 0; background-color: ${OG_PRIMARY}; font-family: 'Satoshi', 'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif; color: ${OG_ACCENT}; -webkit-font-smoothing: antialiased;">
  <table class="email-outer" width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="${OG_PRIMARY}" style="background-color: ${OG_PRIMARY}; padding: 40px 20px;">
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
        <table class="email-card" border="0" cellspacing="0" cellpadding="0" bgcolor="#FFFFFF" style="max-width: 600px; width: 100%; background-color: #FFFFFF; border: 3px solid ${OG_ACCENT}; border-radius: ${EMAIL_CARD_RADIUS}; overflow: hidden;">
          <tr>
            <td style="padding: 48px 32px 32px; text-align: center;">
              <h1 class="email-heading" style="font-family: 'Graph Condensed', 'Impact', 'Arial Narrow', sans-serif; font-weight: 700; text-transform: uppercase; color: ${OG_ACCENT}; margin: 0 0 12px; font-size: 40px; line-height: 1; letter-spacing: 0.02em;">Pojďte do toho s námi!</h1>
              <p class="email-text" style="font-size: 20px; line-height: 1.4; color: ${OG_ACCENT_MUTED}; margin: 0 0 24px; font-weight: 500;">
                Děkujeme za zájem o novinky. Pro dokončení registrace a potvrzení souhlasu prosím klikněte na tlačítko níže:
              </p>
              <div style="margin: 24px 0;">
                <a class="email-btn" href="${confirmationLink}" style="background-color: ${OG_GREEN}; color: ${OG_ACCENT}; font-weight: 700; font-family: 'Satoshi', 'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif; font-size: 20px; text-transform: uppercase; text-decoration: none; padding: 14px 24px; border: 3px solid ${OG_ACCENT}; border-radius: ${EMAIL_BTN_RADIUS}; display: inline-block; box-shadow: -3px 3px 0px ${OG_ACCENT}; letter-spacing: 0.05em;">Potvrdit e-mail</a>
              </div>
              <p class="email-text-subtle" style="font-size: 16px; line-height: 1.4; color: ${OG_ACCENT_SUBTLE}; margin: 24px 0 0; font-weight: 500;">
                Pokud jste o tento e-mail nepožádali, můžete ho bezpečně ignorovat.
              </p>
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
            <td style="padding: 20px; text-align: center; font-size: 14px; line-height: 1.5; color: ${OG_CREAM};">
              <p style="margin: 0 0 10px 0; font-weight: 700; letter-spacing: -0.02em;">
                Copyright 2026. Všechna práva vyhrazena.<br />
                <a href="${siteUrl}/privacy" style="color: ${OG_CREAM}; text-decoration: underline; text-underline-offset: 2px;">Zásady ochrany osobních údajů.</a>
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
