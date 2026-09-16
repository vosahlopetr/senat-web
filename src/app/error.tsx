"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <main className="flex-1 flex flex-col items-center justify-center min-h-[70vh] px-[1.125rem] text-center pt-20 pb-20">
      <h1 className="font-display font-bold text-[4rem] mb-4 uppercase tracking-tight">
        Něco se pokazilo!
      </h1>
      <p className="font-body text-[1.25rem] text-text/80 mb-10 max-w-xl">
        Omlouváme se, došlo k neočekávané chybě. Náš tým byl upozorněn a pracuje
        na nápravě.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <button onClick={() => reset()} className="btn btn-secondary">
          ZKUSIT ZNOVU
        </button>
        <Link href="/" className="btn btn-primary">
          ZPĚT NA HLAVNÍ STRANU
        </Link>
      </div>
    </main>
  );
}
