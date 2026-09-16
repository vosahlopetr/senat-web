import type { Metadata, Viewport } from "next";
import { cacheLife } from "next/cache";
import Link from "next/link";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import NextTopLoader from "nextjs-toploader";
import type { Graph } from "schema-dts";
import { graphCondensed, satoshi } from "./fonts";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SupportModal from "@/components/SupportModal";
import { DEFAULT_DESCRIPTION, rootMetadata, SITE_URL } from "@/lib/seo";
import { SOCIAL_LINKS } from "@/lib/site-config";
import "./globals.css";

const socialProfileUrls = SOCIAL_LINKS.map((social) => social.href);

export const metadata: Metadata = rootMetadata;

export const viewport: Viewport = {
  // Brand primary – keep in sync with `--color-primary` / OG_PRIMARY.
  themeColor: "#15197d",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  colorScheme: "dark",
};

const jsonLd: Graph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: "Radko Sáblík",
      alternateName: ["Sáblík do Senátu"],
      url: SITE_URL,
      description: DEFAULT_DESCRIPTION,
      publisher: {
        "@id": `${SITE_URL}/#organization`,
      },
    },
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "Sáblík do Senátu",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/images/logo.svg`,
      },
      sameAs: socialProfileUrls,
    },
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: "Radko Sáblík",
      url: SITE_URL,
      jobTitle:
        "Ředitel Smíchovské střední průmyslové školy a gymnázia, kandidát do Senátu",
      image: `${SITE_URL}/opengraph-image`,
      description:
        "Radko Sáblík je ředitel Smíchovské střední průmyslové školy a gymnázia. V roce 2026 kandiduje do Senátu Parlamentu ČR za obvod č. 21 (Praha 5 a Praha 13) jako společný kandidát koalice ODS, STAN a KDU-ČSL.",
      alumniOf: [
        {
          "@type": "CollegeOrUniversity",
          name: "ČVUT v Praze",
        },
        {
          "@type": "CollegeOrUniversity",
          name: "Univerzita Karlova v Praze",
        },
      ],
      worksFor: {
        "@type": "EducationalOrganization",
        name: "Smíchovská střední průmyslová škola a gymnázium",
        url: "https://www.ssps.cz",
      },
      memberOf: {
        "@type": "Organization",
        name: "ODS – Občanská demokratická strana",
        url: "https://www.ods.cz",
      },
      affiliation: [
        {
          "@type": "Organization",
          name: "ODS – Občanská demokratická strana",
          url: "https://www.ods.cz",
        },
        {
          "@type": "Organization",
          name: "STAN – Starostové a nezávislí",
          url: "https://www.starostove-nezavisli.cz",
        },
        {
          "@type": "Organization",
          name: "KDU-ČSL – Křesťanská a demokratická unie – Československá strana lidová",
          url: "https://www.kdu.cz",
        },
      ],
      sameAs: socialProfileUrls,
    },
  ],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  "use cache";
  cacheLife("days");

  // Read inside a cached scope: safe on Vercel because changing an env var
  // forces a redeploy, which resets the cache. On other hosts a flip of
  // POST_ELECTION_STATUS could be served stale for up to a day.
  const electionStatus = process.env.POST_ELECTION_STATUS;
  const isPostElection =
    electionStatus === "victory" || electionStatus === "loss";

  return (
    <html
      lang="cs"
      className={`${graphCondensed.variable} ${satoshi.variable}`}
    >
      <body className="antialiased font-body font-normal text-[1.125rem] leading-[1.6] text-text bg-primary">
        <NextTopLoader color="var(--color-accent)" showSpinner={false} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <Link href="#main" className="skip-link">
          Přeskočit na obsah
        </Link>

        <div className="flex flex-col min-h-screen w-full relative">
          {!isPostElection && <Header />}

          <div className="flex flex-col flex-1 w-full overflow-x-clip">
            {children}

            {!isPostElection && (
              <>
                <SupportModal />

                <Footer />
              </>
            )}
          </div>
        </div>

        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
