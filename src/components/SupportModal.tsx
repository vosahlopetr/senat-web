"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { track } from "@vercel/analytics";
import { subscribeToNewsletter } from "@/app/actions";
import {
  DONATION_URL,
  ELECTION_ACCOUNT_URL,
  VOLUNTEER_URL,
} from "@/lib/site-config";
import { useDialog } from "./useDialog";

function SupportModalContent() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const { dialogRef, setOpen, close, handleBackdropClick } = useDialog({
    onClose: () => {
      setErrorMessage("");
      setIsSuccess(false);
      setIsConfirmed(false);
      setIsExpanded(false);
    },
  });
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const modalParam = searchParams.get("modal")?.trim().toLowerCase();
    const successParam = searchParams.get("success");
    const errorParam = searchParams.get("error");

    if (modalParam === "support") {
      let confirmationError = "";
      if (errorParam) {
        if (errorParam === "invalid_token") {
          confirmationError = "Ověřovací odkaz je neplatný.";
        } else if (errorParam === "used_token") {
          confirmationError =
            "Tento ověřovací odkaz už byl použit – registrace je potvrzená.";
        } else if (errorParam === "expired_token") {
          confirmationError =
            "Ověřovací odkaz vypršel. Zaregistrujte se prosím znovu.";
        } else if (errorParam === "rate_limited") {
          confirmationError =
            "Příliš mnoho pokusů najednou. Zkuste to prosím znovu za chvíli.";
        } else {
          confirmationError =
            "Při ověřování došlo k chybě. Zkuste to prosím znovu.";
        }
      }
      const confirmed = successParam === "true";

      /* eslint-disable react-hooks/set-state-in-effect -- the URL params are
         a one-shot external signal (stripped right below via router.replace),
         so they must be latched into state here; deferring these setters
         (the old setTimeout hack) only hid this from the lint rule. */
      setOpen(true);
      if (confirmed) setIsConfirmed(true);
      if (confirmationError) setErrorMessage(confirmationError);
      /* eslint-enable react-hooks/set-state-in-effect */

      // Conversion funnel: every open goes through this URL-param effect.
      track("support_modal_open");

      // Remove modal param from URL without refreshing or scrolling
      const newSearchParams = new URLSearchParams(searchParams.toString());
      newSearchParams.delete("modal");
      newSearchParams.delete("success");
      newSearchParams.delete("error");
      const newUrl =
        pathname +
        (newSearchParams.toString() ? `?${newSearchParams.toString()}` : "");
      router.replace(newUrl, { scroll: false });
    }
  }, [searchParams, pathname, router, setOpen]);

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true);
    setErrorMessage("");

    const result = await subscribeToNewsletter(formData);
    setIsSubmitting(false);

    if (result.success) {
      setIsSuccess(true);
      track("newsletter_subscribe");
    } else {
      switch (result.error) {
        case "invalid_email":
          setErrorMessage(
            "Pro úspěšnou registraci prosím zadejte platný e-mail.",
          );
          break;
        case "rate_limited":
          setErrorMessage(
            "Zaslali jste příliš mnoho žádostí najednou. Zkuste to prosím znovu za chvíli.",
          );
          break;
        case "server_error":
        default:
          setErrorMessage(
            "Něco se pokazilo na straně serveru. Zkuste to prosím znovu.",
          );
          break;
      }
    }
  };

  return (
    <dialog
      ref={dialogRef}
      className="m-auto p-0 border-none bg-transparent max-w-[95vw] md:max-w-[90vw] w-[54rem] max-h-[95vh] md:max-h-[90vh] overflow-y-auto backdrop:bg-black/60 backdrop:backdrop-blur-md outline-none"
      onClick={handleBackdropClick}
    >
      <div className="bg-cream border-[3px] border-accent rounded-[24px] md:rounded-[32px] p-5 pt-12 md:p-8 md:pt-10 relative text-accent focus:outline-none w-full box-border">
        <button
          className="absolute top-3 right-3 md:top-5 md:right-5 w-12 h-12 md:w-14 md:h-14 flex items-center justify-center text-4xl md:text-5xl font-bold leading-none text-accent bg-transparent border-none cursor-pointer p-0 hover:opacity-70 focus-visible:outline focus-visible:outline-4 focus-visible:outline-accent rounded-md z-10 transition-opacity"
          aria-label="Zavřít"
          onClick={close}
        >
          &times;
        </button>

        <div className="flex flex-col gap-6 md:gap-8">
          <div className="text-center max-w-[36rem] mx-auto w-full">
            <h3 className="font-display text-[clamp(2rem,7vw,2.5rem)] uppercase leading-none mb-2 md:mb-3">
              Pojďte do toho s námi!
            </h3>
            <p className="font-body font-medium text-[1.1rem] md:text-[1.25rem] text-[oklch(17.8%_0.01_88.8_/_0.85)] leading-[1.4] mb-4 md:mb-6">
              Přihlaste se k odběru novinek, ať společně dotáhneme kampaň do
              vítězného konce.
            </p>

            {isConfirmed ? (
              <div className="p-6 md:p-8 bg-green/10 border-[3px] border-green text-green rounded-2xl font-body font-bold text-center text-[1.1rem] md:text-[1.25rem] shadow-[-4px_4px_0px_var(--color-green)]">
                Děkujeme! Vaše registrace byla úspěšně dokončena.
              </div>
            ) : isSuccess ? (
              <div className="p-6 md:p-8 bg-green/10 border-[3px] border-green text-green rounded-2xl font-body font-bold text-center text-[1.1rem] md:text-[1.25rem] shadow-[-4px_4px_0px_var(--color-green)]">
                Téměř hotovo! Zkontrolujte svůj e-mail a klikněte na potvrzovací
                odkaz.
              </div>
            ) : (
              <form
                className="flex flex-col gap-3 md:gap-4 text-left"
                action={handleSubmit}
              >
                {/* Honeypot: hidden from sighted users AND screen readers
                    (aria-hidden + tabIndex=-1) so only bots autofill it. */}
                <div
                  className="absolute opacity-0 -z-10 pointer-events-none"
                  aria-hidden="true"
                >
                  <label htmlFor="website">Website</label>
                  <input
                    type="text"
                    name="website"
                    id="website"
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>
                <input
                  type="text"
                  inputMode="email"
                  name="email"
                  placeholder="Váš e-mail"
                  autoComplete="email"
                  autoFocus
                  className={`p-3 md:p-4 border-[3px] rounded-xl font-body text-base md:text-lg font-medium w-full box-border focus:outline-none focus:ring-4 focus:ring-accent/10 disabled:opacity-50 disabled:cursor-not-allowed transition-all ${errorMessage ? "border-red focus:border-red bg-red/5 text-red placeholder:text-red/50 focus:ring-red/10" : "border-accent/40 focus:border-accent hover:border-accent/60"}`}
                  required
                  disabled={isSubmitting}
                  onChange={() => setErrorMessage("")}
                />
                <div className="text-sm md:text-base leading-[1.4] mb-1 mt-1 py-2 -my-2">
                  <span className="text-[oklch(17.8%_0.01_88.8_/_0.8)] font-medium">
                    Odesláním souhlasíte se{" "}
                    <a
                      href="/privacy"
                      className="text-accent underline decoration-[2px] underline-offset-4 hover:opacity-70 transition-opacity"
                    >
                      zpracováním osobních údajů
                    </a>
                    .
                  </span>
                </div>
                {errorMessage && (
                  <p className="text-red text-sm md:text-base font-bold mb-1">
                    {errorMessage}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary w-full disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-[-3px_3px_0px_var(--color-accent)] text-lg md:text-xl py-3 md:py-3.5 rounded-xl mt-1 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <svg
                        className="animate-spin h-5 w-5 text-accent"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Zpracovávám...
                    </>
                  ) : (
                    "Zaregistrovat k odběru"
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Volunteering and donations as equal tiers with value copy –
              not footnote links. Volunteering is the highest-value ask in a
              Senate race (personal contact decides these elections). */}
          <div className="pt-5 md:pt-6 mt-2 border-t-[3px] border-accent/10">
            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              className="w-full flex items-center justify-between text-left font-body font-bold text-[1.05rem] md:text-[1.15rem] hover:opacity-70 transition-opacity focus-visible:outline focus-visible:outline-4 focus-visible:outline-accent rounded-md py-1"
            >
              <span>Další možnosti zapojení</span>
              <svg
                className={`w-6 h-6 transform transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            <div
              className={`transition-all duration-300 overflow-hidden ${
                isExpanded
                  ? "mt-4 opacity-100 max-h-[1000px]"
                  : "mt-0 opacity-0 max-h-0"
              }`}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="border-[3px] border-accent/20 rounded-2xl px-5 py-5 flex flex-col gap-2 text-left">
                  <p className="m-0 font-body font-bold text-[1.1rem]">
                    <span aria-hidden="true">🤝 </span>Pomozte v ulicích
                  </p>
                  <p className="m-0 text-[0.95rem] leading-[1.45] text-[oklch(17.8%_0.01_88.8_/_0.8)]">
                    Hodina na stánku nebo letáky ve vašem domě. V senátních
                    volbách rozhoduje osobní kontakt. Přidejte se k
                    dobrovolníkům na WhatsAppu.
                  </p>
                  <a
                    href={VOLUNTEER_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => track("volunteer_click")}
                    className="mt-auto inline-flex items-center justify-center border-[2px] border-accent rounded-full px-5 py-2.5 font-body font-bold text-sm uppercase tracking-[0.05em] text-accent no-underline transition-colors hover:bg-accent hover:text-cream focus-visible:bg-accent focus-visible:text-cream"
                  >
                    Chci pomáhat
                  </a>
                </div>
                <div className="border-[3px] border-accent/20 rounded-2xl px-5 py-5 flex flex-col gap-2 text-left">
                  <p className="m-0 font-body font-bold text-[1.1rem]">
                    <span aria-hidden="true">💰 </span>Přispějte na kampaň
                  </p>
                  <p className="m-0 text-[0.95rem] leading-[1.45] text-[oklch(17.8%_0.01_88.8_/_0.8)]">
                    Studentská kampaň běží na malém rozpočtu. Každého příspěvku
                    si nesmírně vážíme. Daruje se přes oficiální portál ODS.
                  </p>
                  <a
                    href={DONATION_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => track("donate_click")}
                    className="mt-auto inline-flex items-center justify-center border-[2px] border-accent rounded-full px-5 py-2.5 font-body font-bold text-sm uppercase tracking-[0.05em] text-accent no-underline transition-colors hover:bg-accent hover:text-cream focus-visible:bg-accent focus-visible:text-cream"
                  >
                    Chci přispět
                  </a>
                </div>
              </div>
              <div
                className={`transition-all duration-300 overflow-hidden ${
                  isExpanded ? "opacity-100 max-h-[100px]" : "opacity-0 max-h-0"
                }`}
              >
                <p className="mt-4 text-center text-sm text-[oklch(17.8%_0.01_88.8_/_0.65)] font-medium">
                  Hospodaření kampaně je veřejné na{" "}
                  <a
                    href={ELECTION_ACCOUNT_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent underline decoration-2 underline-offset-4 hover:opacity-70 transition-opacity"
                  >
                    transparentním volebním účtu
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </dialog>
  );
}

export default function SupportModal() {
  return (
    <Suspense fallback={null}>
      <SupportModalContent />
    </Suspense>
  );
}
