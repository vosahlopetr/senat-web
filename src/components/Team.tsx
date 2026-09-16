"use client";

import { useState } from "react";
import Image from "next/image";
import { CONTACT_EMAIL } from "@/lib/site-config";
import { useDialog } from "./useDialog";
// Static import so next/image reads the file's real 1920×1336 dimensions –
// the previous hand-written 1200×800 hint had a different aspect ratio and
// caused a small layout shift when the image loaded.
import teamPhoto from "../../public/images/team_main.jpg";

type PersonKey = "martin" | "petr" | "ondrej";

export default function Team() {
  const [selectedPerson, setSelectedPerson] = useState<PersonKey | null>(null);
  const { dialogRef, setOpen, close, handleBackdropClick } = useDialog();

  const teamData: Record<
    PersonKey,
    { name: string; role: string; quote: string }
  > = {
    martin: {
      name: "Martin",
      role: "šéfuje PR, mediální komunikaci, logistice a spolupráci s partnery naší unikátní studentské kampaně.",
      quote:
        "„Myslím si, že jsou v politice potřeba kompetentní a slušní lidé, kteří nejen slibují, ale mají za sebou konkrétní, hmatatelné výsledky. Právě díky panu řediteli máme jako studenti zdravé sebevědomí a obrovský prostor k seberealizaci. Je pro nás velkým mentorem, což by podle mého názoru měla být v dnešní době primární funkce pedagoga, jelikož škola už dávno není hlavním zdrojem informací pro mladou generaci.“",
    },
    petr: {
      name: "Petr",
      role: "má na starosti strategii, marketing a finance. Zajišťuje, aby naše vize byla vidět a slyšet.",
      quote:
        "„Pan ředitel se dlouhodobě a velmi aktivně snaží změnit zkostnatělé poměry v českém školství. U nás na škole už dokázal, že vzdělávání může vypadat úplně jinak, moderně, prakticky a s maximálním respektem k individualitě studentů. My všichni z jeho týmu jsme přesvědčeni, že právě v roli senátora získá mnohem silnější platformu. Nebude to už jen o šíření dobré praxe z jedné pražské školy směrem k veřejnosti.“",
    },
    ondrej: {
      name: "Ondřej",
      role: "řídí celou agendu a kontaktní kampaň v ulicích volebního obvodu. Organizuje náš rostoucí tým nadšených dobrovolníků.",
      quote:
        "„Pro mě osobně pan ředitel mnohé udělal. Když se zpětně ohlédnu do prvního ročníku, vím, že by mě nikdy ani nenapadlo, co vše je možné dělat, když má člověk prostor a důvěru při seberozvoji. Jeho odvaha dělat si věci po svém a schopnost důvěry v mladé lidi jsou věci, které dodnes inspirují nejen mě, ale i velké množství lidí, kteří s ním spolupracují.“",
    },
  };

  const openPerson = (person: PersonKey) => {
    setSelectedPerson(person);
    setOpen(true);
  };

  return (
    <>
      <section
        id="tym"
        className="section relative overflow-visible bg-cream text-accent"
      >
        <Image
          src="/assets/slabost.svg"
          alt=""
          width={250}
          height={250}
          className="w-[clamp(70px,20vw,120px)] h-auto max-w-[120px] md:max-w-[250px] md:w-[clamp(140px,20vw,250px)] absolute top-8 left-6 md:top-16 md:left-16 -rotate-12 z-0 pointer-events-none select-none object-contain"
          aria-hidden="true"
        />
        <div className="container relative z-10">
          <div className="flex flex-col items-center text-center mb-8 md:mb-10">
            <h2 className="font-display font-bold text-[clamp(2rem,5vw,4.75rem)] leading-none text-accent uppercase mb-6">
              První studentská kampaň
            </h2>
            <p className="font-body font-bold text-[clamp(1.125rem,2vw,1.45rem)] leading-[1.4] text-accent mb-0 max-w-[44rem]">
              Žádná najatá agentura. Tuto kampaň jsme iniciovali a vedeme pouze my,
              studenti Smíchovské střední. Děláme to ve
              volném čase, bez nároku na jakoukoli kompenzaci a z hlubokého osobního
              přesvědčení, že Radko Sáblík patří do Senátu.
            </p>
          </div>

         
          <div className="relative block w-full rounded-[32px] border-[3px] border-accent shadow-[-3px_3px_0px_var(--color-accent)] mb-8 overflow-hidden">
            <Image
              src={teamPhoto}
              alt="Tým Sáblík – studenti Petr, Ondřej a Martin"
              sizes="(max-width: 1280px) 100vw, 1200px"
              placeholder="blur"
              className="w-full h-auto block object-cover"
            />
            {/* Visible name chips replace the invisible-hotspot pattern –
                hidden click zones are a known discoverability tax (NN/g);
                the chip is the affordance AND the accessible name of each
                button (label-in-name), so the aria-labels went away. */}
            <button
              className="group absolute bg-transparent border-none cursor-pointer z-[2] focus-visible:outline focus-visible:outline-4 focus-visible:-outline-offset-4 focus-visible:outline-accent"
              style={{ left: "0%", top: "0%", width: "33%", height: "100%" }}
              onClick={() => openPerson("petr")}
            >
              <span className="pointer-events-none absolute bottom-3 md:bottom-8 left-1/2 -translate-x-1/2 bg-cream text-accent border-[3px] md:border-4 border-accent rounded-full px-4 py-1.5 md:px-8 md:py-2.5 font-display font-bold uppercase text-[clamp(0.9rem,3vw,2.2rem)] whitespace-nowrap shadow-[-3px_3px_0px_var(--color-accent)] md:shadow-[-5px_5px_0px_var(--color-accent)] group-focus-visible:bg-accent group-focus-visible:text-cream">
                Petr
              </span>
            </button>
            <button
              className="group absolute bg-transparent border-none cursor-pointer z-[2] focus-visible:outline focus-visible:outline-4 focus-visible:-outline-offset-4 focus-visible:outline-accent"
              style={{ left: "33%", top: "0%", width: "28%", height: "100%" }}
              onClick={() => openPerson("ondrej")}
            >
              <span className="pointer-events-none absolute bottom-3 md:bottom-8 left-1/2 -translate-x-1/2 bg-cream text-accent border-[3px] md:border-4 border-accent rounded-full px-4 py-1.5 md:px-8 md:py-2.5 font-display font-bold uppercase text-[clamp(0.9rem,3vw,2.2rem)] whitespace-nowrap shadow-[-3px_3px_0px_var(--color-accent)] md:shadow-[-5px_5px_0px_var(--color-accent)] group-focus-visible:bg-accent group-focus-visible:text-cream">
                Ondřej
              </span>
            </button>
            <button
              className="group absolute bg-transparent border-none cursor-pointer z-[2] focus-visible:outline focus-visible:outline-4 focus-visible:-outline-offset-4 focus-visible:outline-accent"
              style={{ left: "61%", top: "0%", width: "39%", height: "100%" }}
              onClick={() => openPerson("martin")}
            >
              <span className="pointer-events-none absolute bottom-3 md:bottom-8 left-1/2 -translate-x-1/2 bg-cream text-accent border-[3px] md:border-4 border-accent rounded-full px-4 py-1.5 md:px-8 md:py-2.5 font-display font-bold uppercase text-[clamp(0.9rem,3vw,2.2rem)] whitespace-nowrap shadow-[-3px_3px_0px_var(--color-accent)] md:shadow-[-5px_5px_0px_var(--color-accent)] group-focus-visible:bg-accent group-focus-visible:text-cream">
                Martin
              </span>
            </button>
          </div>

          <div className="flex justify-center mb-4">
            <a href={`mailto:${CONTACT_EMAIL}`} className="btn btn-primary">
              KONTAKTUJTE NÁS
            </a>
          </div>
        </div>
      </section>

      <dialog
        ref={dialogRef}
        aria-labelledby="team-modal-heading"
        className="m-auto p-0 border-none bg-transparent max-w-[90vw] w-[40rem] overflow-visible backdrop:bg-black/60 backdrop:backdrop-blur-sm"
        onClick={handleBackdropClick}
      >
        <div className="bg-cream border-[3px] border-accent shadow-[-6px_6px_0px_var(--color-accent)] rounded-[32px] p-8 md:p-10 relative text-accent">
          <button
            className="absolute top-8 right-8 w-12 h-12 flex items-center justify-center text-4xl font-bold leading-none text-accent bg-transparent border-none cursor-pointer p-0 -mt-1 hover:opacity-70 focus-visible:outline focus-visible:outline-4 focus-visible:outline-accent rounded-md"
            aria-label="Zavřít"
            onClick={close}
          >
            &times;
          </button>
          <h3
            id="team-modal-heading"
            className="font-display text-[clamp(2rem,5vw,3rem)] uppercase leading-[0.9] mb-2 pr-8"
          >
            {selectedPerson ? teamData[selectedPerson].name : ""}
          </h3>
          <p className="font-body font-extrabold text-[1.125rem] text-accent mb-6 leading-[1.4]">
            {selectedPerson ? teamData[selectedPerson].role : ""}
          </p>
          <blockquote className="font-body text-[1.125rem] font-medium leading-[1.6] text-[oklch(17.8%_0.01_88.8_/_0.85)] italic relative">
            {selectedPerson ? teamData[selectedPerson].quote : ""}
          </blockquote>
        </div>
      </dialog>
    </>
  );
}
