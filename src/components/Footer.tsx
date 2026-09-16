import Link from "next/link";
import Image from "next/image";
import {
  CONTACT_EMAIL,
  ELECTION_ACCOUNT_URL,
  NAV_LINKS,
  SOCIAL_LINKS,
  type NavLink,
} from "@/lib/site-config";

export default function Footer() {
  const navLinks: readonly NavLink[] = [
    ...NAV_LINKS,
    { href: "/jak-volit", label: "Jak volit" },
    { href: `mailto:${CONTACT_EMAIL}`, label: "Kontakt" },
  ];

  return (
    <footer className="py-12 pb-6 section mt-auto" role="contentinfo">
      <div className="container">
        <div className="p-8 md:p-10 lg:p-12 rounded-[32px] border-[3px] border-cream flex flex-col gap-8">
          <div className="flex flex-col md:flex-row md:justify-between gap-8">
            <div className="flex flex-col gap-3 flex-1 md:flex-none md:basis-[28rem]">
              <Link
                href="/"
                className="w-[10rem] md:w-[16rem] max-w-full h-auto"
                aria-label="Sáblík do Senátu – domovská stránka"
              >
                <Image
                  src="/images/logo.svg"
                  alt="Sáblík do Senátu"
                  width={300}
                  height={150}
                  style={{ width: "100%", height: "auto" }}
                  className="w-full h-auto block select-none"
                  draggable="false"
                />
              </Link>

              <p className="text-[1.125rem] leading-[1.5] text-text max-w-[28rem]">
                Kandidát do Senátu za obvod č. 21. Ředitel Smíchovské střední,
                za kterého se postavili jeho vlastní studenti, aby společně
                přinesli do politiky reálné výsledky a energii tvořit
                budoucnost.
              </p>

              <div className="flex flex-col gap-3 mt-4">
                <p className="font-bold text-[0.875rem] text-cream tracking-[-0.02em]">
                  Copyright 2026. Všechna práva vyhrazena.
                  <br />
                  <Link
                    href="/privacy"
                    className="text-cream underline underline-offset-[0.15em] transition-opacity hover:opacity-70"
                  >
                    Zásady ochrany osobních údajů
                  </Link>
                  {" · "}
                  <Link
                    href="/pro-media"
                    className="text-cream underline underline-offset-[0.15em] transition-opacity hover:opacity-70"
                  >
                    Pro média
                  </Link>
                  {" · "}
                  <a
                    href={ELECTION_ACCOUNT_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cream underline underline-offset-[0.15em] transition-opacity hover:opacity-70"
                    aria-label="Transparentní volební účet kampaně (otevře se v novém okně)"
                  >
                    Transparentní účet
                  </a>
                </p>
                <p className="text-[0.75rem] leading-[1.35] text-cream tracking-[-0.02em] max-w-[28rem]">
                  Politická reklama. Zadavatel / Zpracovatel: Sáblík do Senátu{" "}
                  <br />
                  <span className="italic font-light">
                    koalice ODS, STAN a KDU-ČSL
                  </span>
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-5 flex-1 md:items-end">
              <nav aria-label="Patičková navigace">
                <ul className="flex flex-wrap gap-x-6 gap-y-2 items-center md:justify-end">
                  {navLinks.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        prefetch={link.prefetch}
                        className="inline-flex items-center font-body font-bold text-[1.125rem] text-cream uppercase tracking-[0.03em] no-underline transition-colors relative z-[1] group"
                      >
                        {link.label}
                        <span className="absolute -left-[0.2rem] -right-[0.2rem] bottom-[0.1em] h-[1.2em] bg-red -z-10 transform -rotate-[1.5deg] scale-x-0 origin-left transition-transform duration-250 ease-out group-hover:scale-x-100 group-focus-visible:scale-x-100"></span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
              <div className="mt-4">
                <Link
                  href="?modal=support"
                  className="btn btn-primary w-full text-center md:w-auto"
                >
                  PŘIDEJTE SE
                </Link>
              </div>

              <div className="flex flex-col gap-4 mt-4 md:items-end">
                <div className="font-body font-bold text-[clamp(1.5rem,2.5vw,2.6875rem)] text-cream tracking-[-0.04em]">
                  sledujte Sáblíka
                </div>
                <ul className="flex gap-3">
                  {SOCIAL_LINKS.map((social) => (
                    <li key={social.icon}>
                      <a
                        href={social.href}
                        className="flex items-center justify-center w-[3rem] h-[3rem] md:w-[3.125rem] md:h-[3.125rem] border-[3px] border-cream rounded-full transition-all duration-250 hover:bg-cream focus-visible:bg-cream group"
                        aria-label={social.label}
                      >
                        <Image
                          src={`/images/icon-${social.icon}.svg`}
                          alt=""
                          width={24}
                          height={24}
                          aria-hidden="true"
                          className="w-5 h-5 md:w-6 md:h-6 transition-filter duration-250 group-hover:brightness-[0.08] group-focus-visible:brightness-[0.08] select-none"
                          draggable="false"
                        />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
