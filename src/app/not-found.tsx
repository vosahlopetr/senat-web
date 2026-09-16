import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: "Stránka nenalezena",
  description: "Požadovaná stránka neexistuje nebo byla přesunuta.",
  path: "/404",
  noIndex: true,
});

export default function NotFound() {
  return (
    <main className="relative flex-1 flex flex-col items-center justify-center min-h-[75vh] px-[1.125rem] text-center overflow-hidden py-20">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/heroimage.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center opacity-80 grayscale"
        />
        <div className="absolute inset-0 bg-primary/80" />
      </div>

      <div className="container relative z-10">
        <h1 className="font-display font-bold text-[clamp(6rem,15vw,10rem)] leading-none text-cream mb-4">
          <span className="marker-strike">404</span>
        </h1>
        <h2 className="font-display font-bold text-[clamp(2rem,5vw,3.5rem)] text-cream mb-6 uppercase">
          Nějak se to ztratilo
        </h2>
        <p className="font-body text-[1.25rem] text-cream/80 mb-10 max-w-xl mx-auto font-semibold">
          Omlouváme se, ale to, co hledáte, neexistuje nebo bylo přesunuto.
        </p>
        <Link href="/" className="btn btn-primary">
          ZPĚT NA HLAVNÍ STRANU
        </Link>
      </div>
    </main>
  );
}
