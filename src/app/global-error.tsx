"use client";

import { graphCondensed, satoshi } from "./fonts";
import Link from "next/link";
import "../app/globals.css";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  console.error("Global error:", error);
  return (
    <html
      lang="cs"
      className={`${graphCondensed.variable} ${satoshi.variable}`}
    >
      <body className="antialiased font-body font-normal text-[1.125rem] leading-[1.6] text-text bg-primary overflow-x-hidden">
        <main className="flex flex-col items-center justify-center min-h-screen px-[1.125rem] text-center">
          <h1 className="font-display font-bold text-[4rem] mb-4 uppercase tracking-tight">
            Kritická chyba
          </h1>
          <p className="font-body text-[1.25rem] text-text/80 mb-10 max-w-xl">
            Aplikace zaznamenala kritickou chybu, ze které se nelze zotavit.
            Zkuste prosím načíst stránku znovu.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button onClick={() => reset()} className="btn btn-secondary">
              OBNOVIT STRÁNKU
            </button>
            <Link href="/" className="btn btn-primary">
              ZPĚT NA HLAVNÍ STRANU
            </Link>
          </div>
        </main>
      </body>
    </html>
  );
}
