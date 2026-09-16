"use client";

import Link from "next/link";
import Image from "next/image";
import { Suspense, useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { lockBodyScroll, unlockBodyScroll } from "@/lib/scroll-lock";
import { NAV_LINKS } from "@/lib/site-config";

function isNavLinkActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

function HeaderInner({ pathname }: { pathname: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    lockBodyScroll();
    return () => unlockBodyScroll();
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  useEffect(() => {
    const XL_BREAKPOINT = 1280;
    const onResize = () => {
      if (window.innerWidth >= XL_BREAKPOINT && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [isOpen]);

  return (
    <header
      className="bg-[oklch(98.6%_0.013_86.8)] py-[0.75rem] xl:py-[0.82rem] sticky -top-[1px] z-[1000] shadow-[0_4px_20px_oklch(0%_0_0_/_0.05)]"
      role="banner"
    >
      <div className="flex justify-between items-center flex-nowrap gap-4 w-full max-w-[1440px] mx-auto px-[1.125rem] xl:px-[1.875rem] relative">
        <Link
          href="/"
          onClick={(e) => {
            // The logo sits above the mobile menu overlay, so it must also
            // close the menu – otherwise it navigates underneath it.
            setIsOpen(false);
            if (pathname === "/" && !e.metaKey && !e.ctrlKey && !e.shiftKey) {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
          className="block w-[6.6rem] xl:w-[10.5rem] relative z-10 shrink-0 transition-transform duration-250 hover:-translate-y-[2px] group"
          aria-label="Sáblík do Senátu – domovská stránka"
        >
          <Image
            src="/images/logo.svg"
            alt="Sáblík do Senátu"
            width={290}
            height={110}
            loading="eager"
            className="w-full h-auto block brightness-[0.08] transition-[filter] duration-250 pointer-events-none select-none group-hover:brightness-[0.15]"
          />
        </Link>
        <div className="flex items-center justify-end gap-3 xl:gap-6 flex-1 min-w-0">
          <nav
            className="flex items-center justify-end flex-1 min-w-0 xl:gap-2"
            aria-label="Hlavní navigace"
          >
            <button
              ref={menuButtonRef}
              onClick={() => setIsOpen(!isOpen)}
              className="flex flex-col gap-[0.35rem] w-12 h-12 items-center justify-center cursor-pointer z-10 relative xl:hidden"
              aria-label={isOpen ? "Zavřít menu" : "Otevřít menu"}
              aria-expanded={isOpen}
              aria-controls="main-nav-menu"
            >
              <span
                className={`block w-[2.2rem] h-[0.25rem] bg-accent rounded-sm transition-all duration-250 ${isOpen ? "translate-y-[0.6rem] rotate-45" : ""}`}
              ></span>
              <span
                className={`block w-[2.2rem] h-[0.25rem] bg-accent rounded-sm transition-all duration-250 ${isOpen ? "opacity-0" : ""}`}
              ></span>
              <span
                className={`block w-[2.2rem] h-[0.25rem] bg-accent rounded-sm transition-all duration-250 ${isOpen ? "-translate-y-[0.6rem] -rotate-45" : ""}`}
              ></span>
            </button>
            <ul
              id="main-nav-menu"
              className={`fixed inset-0 bg-cream flex flex-col justify-center items-center gap-6 transition-[transform,visibility] duration-400 z-5 border-b-[3px] border-accent xl:static xl:translate-y-0 xl:visible xl:flex-row xl:flex-wrap xl:bg-transparent xl:gap-[0.125rem] xl:gap-y-[0.35rem] xl:p-0 xl:justify-end xl:items-center xl:border-none ${isOpen ? "translate-y-0 visible" : "-translate-y-full invisible"}`}
            >
              {NAV_LINKS.map((link) => {
                const active = isNavLinkActive(pathname, link.href);
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      prefetch={link.prefetch}
                      onClick={() => setIsOpen(false)}
                      aria-current={active ? "page" : undefined}
                      className="inline-flex items-center font-body font-bold text-[2rem] xl:text-[1.25rem] xl:font-semibold text-accent uppercase no-underline tracking-[0.02em] xl:tracking-[0.03em] transition-colors px-[1.25rem] py-[0.6rem] xl:px-[0.75rem] relative z-[1] group"
                    >
                      {link.label}
                      <span
                        className={`absolute left-[0.8rem] right-[0.8rem] xl:left-[0.3rem] xl:right-[0.3rem] bottom-[0.3em] h-[1.75em] bg-red -z-10 transform -rotate-[1.5deg] origin-left transition-transform duration-250 ease-out ${active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100 group-focus-visible:scale-x-100"}`}
                      ></span>
                    </Link>
                  </li>
                );
              })}
              <li className="flex flex-col gap-4 mt-8 w-[80%] max-w-[300px] list-none xl:hidden">
                <Link
                  href="?modal=support"
                  onClick={() => setIsOpen(false)}
                  className="btn btn-primary btn-lg"
                >
                  PŘIDEJTE SE
                </Link>
              </li>
            </ul>
          </nav>
          <div className="hidden xl:flex gap-4 items-center">
            <Link href="?modal=support" className="btn btn-primary">
              PŘIDEJTE SE
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

function HeaderWithPathname() {
  const pathname = usePathname();
  return <HeaderInner pathname={pathname} />;
}

export default function Header() {
  return (
    <Suspense fallback={<HeaderInner pathname="" />}>
      <HeaderWithPathname />
    </Suspense>
  );
}
