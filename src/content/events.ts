/**
 * Kontaktní kampaň – datované akce.
 *
 * ÚDRŽBA (kampaňový tým): sem patří každá potvrzená akce, jakmile má
 * datum a místo – stánky, debaty, sousedská setkání.
 *
 * Každá akce automaticky dostane vlastní „přidat do kalendáře“ odkaz
 * (ICS na /akce/ics/<id> + Google Kalendář) – stačí vyplnit pole níže.
 *
 * BEZPEČNOST / PREVENCE ÚNIKŮ:
 * Veřejnost na webu vidí pouze akce na maximálně 7 dní (1 týden) dopředu
 * od aktuálního data. Všechny ostatní termíny zůstávají bezpečně na serveru.
 */

export type CampaignEvent = {
  /** Stable id – also the ICS filename segment (/akce/ics/<id>). */
  id: string;
  /** ISO date, e.g. "2026-09-12". Past events are hidden automatically. */
  date: string;
  /** Start time "HH:MM" (Europe/Prague). Omit for all-day events. */
  time?: string;
  /** End time "HH:MM". Defaults to two hours after `time`. */
  endTime?: string;
  title: string;
  place: string;
  /** Optional link to map/photo of exact location (e.g. Google Drive). */
  mapUrl?: string;
  description?: string;
};

export const EVENT_VISIBILITY_WINDOW_DAYS = 7;

export const EVENTS: readonly CampaignEvent[] = [
  // 01. 09. (Út): Lužiny (1/5)
  {
    id: "stanek-luziny-2026-09-01",
    date: "2026-09-01",
    time: "15:30",
    endTime: "18:00",
    title: "Stánek – Lužiny",
    place: "Stanice metra Lužiny, Praha 13",
    mapUrl: "https://maps.app.goo.gl/DyAi8wUZ7Abbb6hK9",
    description:
      "Přijďte si popovídat s Radkem Sáblíkem u našeho stánku u metra Lužiny.",
  },
  // 02. 09. (St): Luka (1/5)
  {
    id: "stanek-luka-2026-09-02",
    date: "2026-09-02",
    time: "15:30",
    endTime: "18:00",
    title: "Stánek – Luka",
    place: "Stanice metra Luka, Praha 13",
    mapUrl: "https://maps.app.goo.gl/pYNYHMj6eFTknN8J7",
    description:
      "Přijďte si popovídat s Radkem Sáblíkem u našeho stánku u metra Luka.",
  },
  // 03. 09. (Čt): Hůrka (1/5)
  {
    id: "stanek-hurka-2026-09-03",
    date: "2026-09-03",
    time: "15:30",
    endTime: "18:00",
    title: "Stánek – Hůrka",
    place: "Stanice metra Hůrka, Sluneční náměstí, Praha 13",
    mapUrl: "https://maps.app.goo.gl/M3SA4pX3HEfuLzEb9",
    description:
      "Přijďte si popovídat s Radkem Sáblíkem u našeho stánku u metra Hůrka.",
  },
  // 04. 09. (Pá): Na Knížecí (1/4)
  {
    id: "stanek-na-knizeci-2026-09-04",
    date: "2026-09-04",
    time: "15:30",
    endTime: "18:00",
    title: "Stánek – Na Knížecí",
    place: "Na Knížecí (Anděl), Praha 5",
    mapUrl: "https://maps.app.goo.gl/Ep2AQTtk9FVJjqf49",
    description:
      "Přijďte si popovídat s Radkem Sáblíkem u našeho stánku Na Knížecí.",
  },
  // 05. 09. (So): Nové Butovice (1/4)
  {
    id: "stanek-nove-butovice-2026-09-05",
    date: "2026-09-05",
    time: "09:30",
    endTime: "15:00",
    title: "Stánek – Nové Butovice",
    place: "Stanice metra Nové Butovice, Praha 13",
    mapUrl: "https://maps.app.goo.gl/2eshFVsEefqeTgJR6",
    description:
      "Přijďte si popovídat s Radkem Sáblíkem u našeho stánku u metra Nové Butovice.",
  },
  // 07. 09. (Po): Tilleho náměstí (1/3)
  {
    id: "stanek-tilleho-namesti-2026-09-07",
    date: "2026-09-07",
    time: "15:30",
    endTime: "18:00",
    title: "Stánek – Tilleho náměstí",
    place: "Tilleho náměstí, Barrandov, Praha 5",
    mapUrl: "https://maps.app.goo.gl/23L38en2peWx6LTg7",
    description:
      "Přijďte si popovídat se studenty u našeho stánku na Tilleho náměstí na Barrandově.",
  },
  // 08. 09. (Út): Jinonice (1/2)
  {
    id: "stanek-jinonice-2026-09-08",
    date: "2026-09-08",
    time: "15:30",
    endTime: "18:00",
    title: "Stánek – Jinonice",
    place: "Stanice metra Jinonice, Praha 5",
    mapUrl: "https://maps.app.goo.gl/zAXWhRczNPtGVZsMA",
    description:
      "Přijďte si popovídat se studenty u našeho stánku u metra Jinonice.",
  },
  // 09. 09. (St): Lužiny (2/5)
  {
    id: "stanek-luziny-2026-09-09",
    date: "2026-09-09",
    time: "15:30",
    endTime: "18:00",
    title: "Stánek – Lužiny",
    place: "Stanice metra Lužiny, Praha 13",
    mapUrl: "https://maps.app.goo.gl/DyAi8wUZ7Abbb6hK9",
    description:
      "Přijďte si popovídat s Radkem Sáblíkem a studenty u našeho stánku u metra Lužiny.",
  },
  // 10. 09. (Čt): Luka (2/5)
  {
    id: "stanek-luka-2026-09-10",
    date: "2026-09-10",
    time: "15:30",
    endTime: "18:00",
    title: "Stánek – Luka",
    place: "Stanice metra Luka, Praha 13",
    mapUrl: "https://maps.app.goo.gl/pYNYHMj6eFTknN8J7",
    description:
      "Přijďte si popovídat s Radkem Sáblíkem a studenty u našeho stánku u metra Luka.",
  },
  // 11. 09. (Pá): Nové Butovice (2/4)
  {
    id: "stanek-nove-butovice-2026-09-11",
    date: "2026-09-11",
    time: "15:30",
    endTime: "18:00",
    title: "Stánek – Nové Butovice",
    place: "Stanice metra Nové Butovice, Praha 13",
    mapUrl: "https://maps.app.goo.gl/2eshFVsEefqeTgJR6",
    description:
      "Přijďte si popovídat s Radkem Sáblíkem a studenty u našeho stánku u metra Nové Butovice.",
  },
  // 12. 09. (So): Kavalírka (1/1)
  {
    id: "stanek-kavalirka-2026-09-12",
    date: "2026-09-12",
    time: "09:30",
    endTime: "12:00",
    title: "Stánek – Kavalírka",
    place: "Zastávka Kavalírka, Plzeňská, Praha 5",
    mapUrl: "https://maps.app.goo.gl/6BJMBPQmE9HVh2YRA",
    description:
      "Přijďte si popovídat se studenty u našeho stánku na Kavalírce.",
  },
  // 13. 09. (Ne): Motol (1/2)
  {
    id: "stanek-motol-2026-09-13",
    date: "2026-09-13",
    time: "09:30",
    endTime: "12:00",
    title: "Stánek – Motol",
    place: "Zastávka Motol / Nemocnice Motol, Praha 5",
    mapUrl: "https://maps.app.goo.gl/SZ48rtgbRPkorLkv9",
    description:
      "Přijďte si popovídat s Radkem Sáblíkem a studenty u našeho stánku v Motole.",
  },
  // 14. 09. (Po): Na Knížecí (2/4)
  {
    id: "stanek-na-knizeci-2026-09-14",
    date: "2026-09-14",
    time: "15:30",
    endTime: "18:00",
    title: "Stánek – Na Knížecí",
    place: "Na Knížecí (Anděl), Praha 5",
    mapUrl: "https://maps.app.goo.gl/Ep2AQTtk9FVJjqf49",
    description:
      "Přijďte si popovídat s Radkem Sáblíkem a studenty u našeho stánku Na Knížecí.",
  },
  // 15. 09. (Út): Tilleho náměstí
  {
    id: "stanek-tilleho-namesti-2026-09-15",
    date: "2026-09-15",
    time: "15:30",
    endTime: "18:00",
    title: "Stánek – Tilleho náměstí",
    place: "Tilleho náměstí, Barrandov, Praha 5",
    mapUrl: "https://maps.app.goo.gl/23L38en2peWx6LTg7",
    description:
      "Přijďte si popovídat s Radkem Sáblíkem a studenty u našeho stánku na Tilleho náměstí na Barrandově.",
  },
  // 16. 09. (St): Kavalírka
  {
    id: "stanek-kavalirka-2026-09-16",
    date: "2026-09-16",
    time: "15:30",
    endTime: "18:00",
    title: "Stánek – Kavalírka",
    place: "Zastávka Kavalírka, Plzeňská, Praha 5",
    mapUrl: "https://maps.app.goo.gl/6BJMBPQmE9HVh2YRA",
    description:
      "Přijďte si popovídat s Radkem Sáblíkem a studenty u našeho stánku na Kavalírce.",
  },
  // 17. 09. (Čt): Stodůlky
  {
    id: "stanek-stodulky-2026-09-17",
    date: "2026-09-17",
    time: "15:30",
    endTime: "18:00",
    title: "Stánek – Stodůlky",
    place: "Stanice metra Stodůlky, Praha 13",
    mapUrl: "https://maps.app.goo.gl/uQYcQ4oJAuojdYWQ6",
    description:
      "Přijďte si popovídat s Radkem Sáblíkem a studenty u našeho stánku u metra Stodůlky.",
  },
  // 18. 09. (Pá): Lužiny
  {
    id: "stanek-luziny-2026-09-18",
    date: "2026-09-18",
    time: "15:30",
    endTime: "18:00",
    title: "Stánek – Lužiny",
    place: "Stanice metra Lužiny, Praha 13",
    mapUrl: "https://maps.app.goo.gl/DyAi8wUZ7Abbb6hK9",
    description:
      "Přijďte si popovídat s Radkem Sáblíkem a studenty u našeho stánku u metra Lužiny.",
  },
  // 19. 09. (So): Centrální park
  {
    id: "stanek-centralni-park-2026-09-19",
    date: "2026-09-19",
    time: "09:30",
    endTime: "12:00",
    title: "Stánek a procházka – Centrální park",
    place: "Centrální park Stodůlky, Praha 13",
    mapUrl: "https://maps.app.goo.gl/gyfeEkvhBK4SbwJx7",
    description:
      "Přijďte si popovídat s Radkem Sáblíkem a studenty u našeho stánku nebo při procházce v Centrálním parku.",
  },

  // 21. 09. (Po): Nemocnice Motol
  {
    id: "stanek-motol-2026-09-21",
    date: "2026-09-21",
    time: "15:30",
    endTime: "18:00",
    title: "Stánek – Nemocnice Motol",
    place: "Zastávka Motol / Nemocnice Motol, Praha 5",
    mapUrl: "https://maps.app.goo.gl/SZ48rtgbRPkorLkv9",
    description:
      "Přijďte si popovídat s Radkem Sáblíkem a studenty u našeho stánku u Nemocnice Motol.",
  },
  // 22. 09. (Út): Hůrka
  {
    id: "stanek-hurka-2026-09-22",
    date: "2026-09-22",
    time: "15:30",
    endTime: "18:00",
    title: "Stánek – Hůrka",
    place: "Stanice metra Hůrka, Sluneční náměstí, Praha 13",
    mapUrl: "https://maps.app.goo.gl/M3SA4pX3HEfuLzEb9",
    description:
      "Přijďte si popovídat s Radkem Sáblíkem a studenty u našeho stánku u metra Hůrka.",
  },
  // 23. 09. (St): Klamovka
  {
    id: "stanek-klamovka-2026-09-23",
    date: "2026-09-23",
    time: "15:30",
    endTime: "18:00",
    title: "Stánek – Klamovka",
    place: "Zastávka Klamovka, Plzeňská, Praha 5",
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Klamovka,+Praha+5",
    description:
      "Přijďte si popovídat s Radkem Sáblíkem a studenty u našeho stánku na Klamovce.",
  },
  // 24. 09. (Čt): Stodůlky
  {
    id: "stanek-stodulky-2026-09-24",
    date: "2026-09-24",
    time: "15:30",
    endTime: "18:00",
    title: "Stánek – Stodůlky",
    place: "Stanice metra Stodůlky, Praha 13",
    mapUrl: "https://maps.app.goo.gl/uQYcQ4oJAuojdYWQ6",
    description:
      "Přijďte si popovídat s Radkem Sáblíkem a studenty u našeho stánku u metra Stodůlky.",
  },
  // 25. 09. (Pá): Luka
  {
    id: "stanek-luka-2026-09-25",
    date: "2026-09-25",
    time: "15:30",
    endTime: "18:00",
    title: "Stánek – Luka",
    place: "Stanice metra Luka, Praha 13",
    mapUrl: "https://maps.app.goo.gl/pYNYHMj6eFTknN8J7",
    description:
      "Přijďte si popovídat s Radkem Sáblíkem a studenty u našeho stánku u metra Luka.",
  },
  // 26. 09. (So): Centrální park
  {
    id: "stanek-centralni-park-2026-09-26",
    date: "2026-09-26",
    time: "12:00",
    endTime: "16:00",
    title: "Stánek a procházka – Centrální park",
    place: "Centrální park Stodůlky, Praha 13",
    mapUrl: "https://maps.app.goo.gl/gyfeEkvhBK4SbwJx7",
    description:
      "Přijďte si popovídat s Radkem Sáblíkem a studenty u našeho stánku nebo při procházce v Centrálním parku.",
  },
  // 27. 09. (Ne): Jinonice (2/2)
  {
    id: "stanek-jinonice-2026-09-27",
    date: "2026-09-27",
    time: "09:30",
    endTime: "15:00",
    title: "Stánek – Jinonice",
    place: "Stanice metra Jinonice, Praha 5",
    mapUrl: "https://maps.app.goo.gl/zAXWhRczNPtGVZsMA",
    description:
      "Přijďte si popovídat s Radkem Sáblíkem a studenty u našeho stánku u metra Jinonice.",
  },
  // 28. 09. (Po): Centrální park (1/2) - STÁTNÍ SVÁTEK + minigolf
  {
    id: "stanek-centralni-park-minigolf-2026-09-28",
    date: "2026-09-28",
    time: "15:30",
    endTime: "18:00",
    title: "Kontaktní kampaň a minigolf – Centrální park (státní svátek)",
    place: "Centrální park Stodůlky, Praha 13",
    mapUrl: "https://maps.app.goo.gl/wugiUhMTsS5ZwEpW8",
    description:
      "Sváteční setkání s Radkem Sáblíkem a studenty a studenty a minigolf v Centrálním parku (Svatováclavský den). Přijďte si zahrát, dát kávu a popovídat si.",
  },
  // 29. 09. (Út): Nové Butovice (4/4)
  {
    id: "stanek-nove-butovice-2026-09-29",
    date: "2026-09-29",
    time: "15:30",
    endTime: "18:00",
    title: "Stánek – Nové Butovice",
    place: "Stanice metra Nové Butovice, Praha 13",
    mapUrl: "https://maps.app.goo.gl/2eshFVsEefqeTgJR6",
    description:
      "Přijďte si popovídat s Radkem Sáblíkem a studenty u našeho stánku u metra Nové Butovice.",
  },
  // 30. 09. (St): Kavalírka (1/1)
  {
    id: "stanek-kavalirka-2026-09-30",
    date: "2026-09-30",
    time: "15:30",
    endTime: "18:00",
    title: "Stánek – Kavalírka",
    place: "Zastávka Kavalírka, Plzeňská, Praha 5",
    mapUrl: "https://maps.app.goo.gl/6BJMBPQmE9HVh2YRA",
    description:
      "Přijďte si popovídat s Radkem Sáblíkem a studenty u našeho stánku na Kavalírce.",
  },
  // 01. 10. (Čt): Motol (2/2)
  {
    id: "stanek-motol-2026-10-01",
    date: "2026-10-01",
    time: "15:30",
    endTime: "18:00",
    title: "Stánek – Motol",
    place: "Zastávka Motol / Nemocnice Motol, Praha 5",
    mapUrl: "https://maps.app.goo.gl/SZ48rtgbRPkorLkv9",
    description:
      "Přijďte si popovídat s Radkem Sáblíkem a studenty u našeho stánku v Motole.",
  },
  // 02. 10. (Pá): Na Knížecí (4/4)
  {
    id: "stanek-na-knizeci-2026-10-02",
    date: "2026-10-02",
    time: "15:30",
    endTime: "18:00",
    title: "Stánek – Na Knížecí",
    place: "Na Knížecí (Anděl), Praha 5",
    mapUrl: "https://maps.app.goo.gl/Ep2AQTtk9FVJjqf49",
    description:
      "Přijďte si popovídat s Radkem Sáblíkem a studenty u našeho stánku Na Knížecí.",
  },
  // 03. 10. (So): Centrální park (2/2) + minigolf
  {
    id: "stanek-centralni-park-minigolf-2026-10-03",
    date: "2026-10-03",
    time: "09:30",
    endTime: "15:00",
    title: "Kontaktní kampaň a minigolf – Centrální park",
    place: "Centrální park Stodůlky, Praha 13",
    mapUrl: "https://maps.app.goo.gl/wugiUhMTsS5ZwEpW8",
    description:
      "Odpolední setkání s Radkem Sáblíkem a studenty a studenty a minigolf v Centrálním parku. Přijďte si zahrát a popovídat si.",
  },
  // 04. 10. (Ne): Lužiny (5/5)
  {
    id: "stanek-luziny-2026-10-04",
    date: "2026-10-04",
    time: "09:30",
    endTime: "15:00",
    title: "Stánek – Lužiny",
    place: "Stanice metra Lužiny, Praha 13",
    mapUrl: "https://maps.app.goo.gl/DyAi8wUZ7Abbb6hK9",
    description:
      "Přijďte si popovídat s Radkem Sáblíkem a studenty u našeho stánku u metra Lužiny.",
  },
  // 05. 10. (Po): Tilleho náměstí (3/3)
  {
    id: "stanek-tilleho-namesti-2026-10-05",
    date: "2026-10-05",
    time: "15:30",
    endTime: "18:00",
    title: "Stánek – Tilleho náměstí",
    place: "Tilleho náměstí, Barrandov, Praha 5",
    mapUrl: "https://maps.app.goo.gl/23L38en2peWx6LTg7",
    description:
      "Přijďte si popovídat s Radkem Sáblíkem a studenty u našeho stánku na Tilleho náměstí na Barrandově.",
  },
  // 06. 10. (Út): Hůrka (5/5) - pub quiz
  {
    id: "stanek-hurka-pub-quiz-2026-10-06",
    date: "2026-10-06",
    time: "15:30",
    endTime: "18:00",
    title: "Stánek a pub quiz – Hůrka",
    place: "Stanice metra Hůrka, Sluneční náměstí, Praha 13",
    mapUrl: "https://maps.app.goo.gl/M3SA4pX3HEfuLzEb9",
    description:
      "Kontaktní stánek Radka Sáblíka a studentů a pub quiz na Slunečním náměstí u metra Hůrka. Přijďte si popovídat a zasoutěžit.",
  },
  // 07. 10. (St): Stodůlky (3/3)
  {
    id: "stanek-stodulky-2026-10-07",
    date: "2026-10-07",
    time: "15:30",
    endTime: "18:00",
    title: "Stánek – Stodůlky",
    place: "Stanice metra Stodůlky, Praha 13",
    mapUrl: "https://maps.app.goo.gl/uQYcQ4oJAuojdYWQ6",
    description:
      "Přijďte si popovídat s Radkem Sáblíkem a studenty u našeho stánku u metra Stodůlky.",
  },
  // 08. 10. (Čt): Luka (5/5)
  {
    id: "stanek-luka-2026-10-08",
    date: "2026-10-08",
    time: "15:30",
    endTime: "18:00",
    title: "Stánek – Luka",
    place: "Stanice metra Luka, Praha 13",
    mapUrl: "https://maps.app.goo.gl/pYNYHMj6eFTknN8J7",
    description:
      "Závěrečný předvolební kontaktní stánek před 1. kolem senátních voleb u metra Luka.",
  },
  // 09. 10. (Pá): VOLBY 1. kolo
  {
    id: "volby-1-kolo-2026-10-09",
    date: "2026-10-09",
    time: "14:00",
    endTime: "22:00",
    title: "Volby do Senátu – 1. kolo (pátek)",
    place: "Volební místnosti obvodu č. 21 (Praha 5, Praha 13 a Řeporyje)",
    description:
      "První volební den 1. kola senátních voleb. Volební místnosti jsou otevřeny od 14:00 do 22:00. Nezapomeňte si vzít platný občanský průkaz nebo pas.",
  },
  // 10. 10. (So): VOLBY 1. kolo
  {
    id: "volby-1-kolo-2026-10-10",
    date: "2026-10-10",
    time: "08:00",
    endTime: "14:00",
    title: "Volby do Senátu – 1. kolo (sobota)",
    place: "Volební místnosti obvodu č. 21 (Praha 5, Praha 13 a Řeporyje)",
    description:
      "Druhý volební den 1. kola senátních voleb. Hlasovat můžete do 14:00, poté začíná sčítání hlasů.",
  },
  // 11. 10. (Ne): Lužiny (2. kolo)
  {
    id: "stanek-2kolo-luziny-2026-10-11",
    date: "2026-10-11",
    time: "09:30",
    endTime: "15:00",
    title: "Stánek před 2. kolem – Lužiny",
    place: "Stanice metra Lužiny, Praha 13",
    mapUrl: "https://maps.app.goo.gl/DyAi8wUZ7Abbb6hK9",
    description:
      "Kontaktní kampaň před 2. kolem voleb do Senátu. Přijďte si popovídat s Radkem Sáblíkem a studenty u metra Lužiny.",
  },
  // 12. 10. (Po): Hůrka (2. kolo)
  {
    id: "stanek-2kolo-hurka-2026-10-12",
    date: "2026-10-12",
    time: "15:30",
    endTime: "18:00",
    title: "Stánek před 2. kolem – Hůrka",
    place: "Stanice metra Hůrka, Sluneční náměstí, Praha 13",
    mapUrl: "https://maps.app.goo.gl/M3SA4pX3HEfuLzEb9",
    description:
      "Kontaktní kampaň před 2. kolem voleb do Senátu. Přijďte si popovídat s Radkem Sáblíkem a studenty na Hůrce.",
  },
  // 13. 10. (Út): Tilleho náměstí (2. kolo)
  {
    id: "stanek-2kolo-tilleho-namesti-2026-10-13",
    date: "2026-10-13",
    time: "15:30",
    endTime: "18:00",
    title: "Stánek před 2. kolem – Tilleho náměstí",
    place: "Tilleho náměstí, Barrandov, Praha 5",
    mapUrl: "https://maps.app.goo.gl/23L38en2peWx6LTg7",
    description:
      "Kontaktní kampaň před 2. kolem voleb do Senátu na Barrandově.",
  },
  // 14. 10. (St): Luka (2. kolo)
  {
    id: "stanek-2kolo-luka-2026-10-14",
    date: "2026-10-14",
    time: "15:30",
    endTime: "18:00",
    title: "Stánek před 2. kolem – Luka",
    place: "Stanice metra Luka, Praha 13",
    mapUrl: "https://maps.app.goo.gl/pYNYHMj6eFTknN8J7",
    description:
      "Kontaktní kampaň před 2. kolem voleb do Senátu. Přijďte si popovídat s Radkem Sáblíkem a studenty u metra Luka.",
  },
  // 15. 10. (Čt): Na Knížecí (2. kolo)
  {
    id: "stanek-2kolo-na-knizeci-2026-10-15",
    date: "2026-10-15",
    time: "15:30",
    endTime: "18:00",
    title: "Stánek před 2. kolem – Na Knížecí",
    place: "Na Knížecí (Anděl), Praha 5",
    mapUrl: "https://maps.app.goo.gl/Ep2AQTtk9FVJjqf49",
    description:
      "Závěrečný kontaktní stánek před rozhodujícím 2. kolem senátních voleb Na Knížecí.",
  },
  // 16. 10. (Pá): VOLBY 2. kolo
  {
    id: "volby-2-kolo-2026-10-16",
    date: "2026-10-16",
    time: "14:00",
    endTime: "22:00",
    title: "Volby do Senátu – 2. kolo (pátek)",
    place: "Volební místnosti obvodu č. 21 (Praha 5, Praha 13 a Řeporyje)",
    description:
      "První den 2. kola (finále) senátních voleb. Hlasovací lístky obdržíte přímo ve volební místnosti. Otevřeno od 14:00 do 22:00.",
  },
  // 17. 10. (So): VOLBY 2. kolo
  {
    id: "volby-2-kolo-2026-10-17",
    date: "2026-10-17",
    time: "08:00",
    endTime: "14:00",
    title: "Volby do Senátu – 2. kolo (sobota)",
    place: "Volební místnosti obvodu č. 21 (Praha 5, Praha 13 a Řeporyje)",
    description:
      "Rozhodující den voleb do Senátu. Hlasovat můžete do 14:00, poté začíná konečné sčítání hlasů.",
  },
] as const;

const EVENT_DATE_FORMATTER = new Intl.DateTimeFormat("cs-CZ", {
  timeZone: "Europe/Prague",
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
});

/** Formats an event ISO date ("YYYY-MM-DD") into capitalized Czech long format. */
export function formatEventDate(dateStr: string): string {
  const formatted = EVENT_DATE_FORMATTER.format(
    new Date(`${dateStr}T12:00:00+02:00`),
  );
  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
}

const EVENT_PARTS_FORMATTER = new Intl.DateTimeFormat("cs-CZ", {
  timeZone: "Europe/Prague",
  weekday: "short",
  day: "numeric",
  month: "long",
  year: "numeric",
});

const EVENT_WEEKDAY_LONG_FORMATTER = new Intl.DateTimeFormat("cs-CZ", {
  timeZone: "Europe/Prague",
  weekday: "long",
});

export type EventDateParts = {
  weekdayShort: string;
  weekdayLong: string;
  day: string;
  month: string;
  year: string;
};

/**
 * Decomposes an event ISO date ("YYYY-MM-DD") into individual localized parts
 * for structured and visual calendar date blocks.
 */
export function getEventDateParts(dateStr: string): EventDateParts {
  const date = new Date(`${dateStr}T12:00:00+02:00`);
  const parts = EVENT_PARTS_FORMATTER.formatToParts(date);
  const weekdayLong = EVENT_WEEKDAY_LONG_FORMATTER.format(date);

  let weekdayShort = "";
  let day = "";
  let month = "";
  let year = "";

  for (const part of parts) {
    if (part.type === "weekday") weekdayShort = part.value;
    else if (part.type === "day") day = part.value;
    else if (part.type === "month") month = part.value;
    else if (part.type === "year") year = part.value;
  }

  const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

  return {
    weekdayShort: cap(weekdayShort.replace(/\.$/, "")),
    weekdayLong: cap(weekdayLong),
    day,
    month,
    year,
  };
}

export type EventCategory = {
  badge: string;
  district: "Praha 5" | "Praha 13" | "Celý obvod";
  isSpecial: boolean;
  isElection: boolean;
};

/**
 * Returns categorized attributes for an event to aid UI labeling,
 * district grouping, and special format highlighting.
 */
export function getEventCategory(event: CampaignEvent): EventCategory {
  const isElection = event.id.startsWith("volby-");
  const isQuiz =
    event.title.toLowerCase().includes("pub quiz") ||
    event.id.includes("pub-quiz");
  const isMinigolf =
    event.title.toLowerCase().includes("minigolf") ||
    event.id.includes("minigolf");
  const isSecondRound = event.id.includes("2kolo");

  let badge = "Kontaktní stánek";
  if (isElection) {
    badge =
      isSecondRound || event.title.includes("2. kolo")
        ? "Finále – 2. kolo voleb"
        : "1. kolo voleb";
  } else if (isQuiz) {
    badge = "Hospodský kvíz & soutěž";
  } else if (isMinigolf) {
    badge = "Sváteční minigolf";
  } else if (isSecondRound) {
    badge = "Kontaktní stánek (před 2. kolem)";
  }

  let district: "Praha 5" | "Praha 13" | "Celý obvod" = "Celý obvod";
  if (event.place.includes("Praha 5")) {
    district = "Praha 5";
  } else if (event.place.includes("Praha 13")) {
    district = "Praha 13";
  }

  return {
    badge,
    district,
    isSpecial: isQuiz || isMinigolf,
    isElection,
  };
}

/** Formats a Date into YYYY-MM-DD in Europe/Prague timezone. */
export function getPragueDateString(date: Date): string {
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Prague",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  return formatter.format(date);
}

/** Computes the maximum visible event date (today + windowDays in UTC days). */
export function getMaxVisibleDateString(
  todayStr: string,
  windowDays: number = EVENT_VISIBILITY_WINDOW_DAYS,
): string {
  const [year, month, day] = todayStr.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  date.setUTCDate(date.getUTCDate() + windowDays);
  return date.toISOString().slice(0, 10);
}

/**
 * Returns events that are currently visible to the public:
 * - Event day has not fully passed (Europe/Prague end of day >= nowMs)
 * - Event date is at most 7 days into the future (today + windowDays)
 */
export function upcomingEvents(
  nowMs: number,
  windowDays: number = EVENT_VISIBILITY_WINDOW_DAYS,
): readonly CampaignEvent[] {
  const todayPrague = getPragueDateString(new Date(nowMs));
  const maxVisibleDate = getMaxVisibleDateString(todayPrague, windowDays);

  return EVENTS.filter((event) => {
    const eventEndOfDay = new Date(`${event.date}T23:59:59+02:00`).getTime();
    const hasNotPassed = eventEndOfDay >= nowMs;
    const isWithinWindow = event.date <= maxVisibleDate;
    return hasNotPassed && isWithinWindow;
  });
}

/**
 * Returns events currently visible to the public based on the server's current clock.
 * Calls upcomingEvents(Date.now(), windowDays).
 */
export function getUpcomingEventsForNow(
  windowDays: number = EVENT_VISIBILITY_WINDOW_DAYS,
): readonly CampaignEvent[] {
  return upcomingEvents(Date.now(), windowDays);
}
export function getEventById(id: string): CampaignEvent | undefined {
  return EVENTS.find((event) => event.id === id);
}

/**
 * Finds an event by ID ONLY if it is currently within the public visibility window.
 * Returns undefined for events that have passed or are scheduled > 7 days in the future.
 */
export function getPublicEventById(
  id: string,
  nowMs: number,
  windowDays: number = EVENT_VISIBILITY_WINDOW_DAYS,
): CampaignEvent | undefined {
  const visible = upcomingEvents(nowMs, windowDays);
  return visible.find((event) => event.id === id);
}

/* ---------------------------------------------------------------------- */
/* Calendar-link helpers                                                    */
/* ---------------------------------------------------------------------- */

const DEFAULT_DURATION_MINUTES = 120;

function parseTimeParts(event: CampaignEvent): {
  start: string;
  end: string;
} | null {
  if (!event.time) return null;
  const date = event.date.replaceAll("-", "");
  const start = `${date}T${event.time.replace(":", "")}00`;
  if (event.endTime) {
    return { start, end: `${date}T${event.endTime.replace(":", "")}00` };
  }
  const [hours, minutes] = event.time.split(":").map(Number);
  const endTotal = hours * 60 + minutes + DEFAULT_DURATION_MINUTES;
  const endHours = Math.floor(endTotal / 60) % 24;
  const endMinutes = endTotal % 60;
  const pad = (value: number) => String(value).padStart(2, "0");
  return { start, end: `${date}T${pad(endHours)}${pad(endMinutes)}00` };
}

/** All-day events span a single day (DTEND is exclusive). */
function allDayParts(event: CampaignEvent): { start: string; end: string } {
  const date = event.date.replaceAll("-", "");
  const next = new Date(`${event.date}T12:00:00+02:00`);
  next.setDate(next.getDate() + 1);
  const end = next.toISOString().slice(0, 10).replaceAll("-", "");
  return { start: date, end };
}

/**
 * Google Calendar template link – the cross-platform complement to the
 * ICS file (opens directly in the calendar most people already use).
 */
export function googleCalendarUrl(event: CampaignEvent): string {
  const timed = parseTimeParts(event);
  const dates = timed
    ? `${timed.start}/${timed.end}`
    : (() => {
        const { start, end } = allDayParts(event);
        return `${start}/${end}`;
      })();

  const detailsParts = [
    event.description,
    event.mapUrl ? `Přesné umístění stánku: ${event.mapUrl}` : null,
    "Více na https://www.sablikdosenatu.cz/akce",
  ].filter(Boolean);

  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: event.title,
    dates,
    location: event.place,
    details: detailsParts.join("\n\n").trim(),
    ctz: "Europe/Prague",
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

/* ---------------------------------------------------------------------- */
/* ICS generation (per-event files served from /akce/ics/<id>)             */
/* ---------------------------------------------------------------------- */

/** RFC 5545 TEXT escaping. */
function escapeIcsText(value: string): string {
  return value
    .replaceAll("\\", "\\\\")
    .replaceAll(";", "\\;")
    .replaceAll(",", "\\,")
    .replaceAll(/\r?\n/g, "\\n");
}

/** RFC 5545 line folding at 74 octets (byte-safe for UTF-8). */
function foldIcsLine(line: string): string {
  const encoder = new TextEncoder();
  const bytes = encoder.encode(line);
  if (bytes.length <= 74) return line;

  const decoder = new TextDecoder();
  const chunks: string[] = [];
  let offset = 0;
  while (offset < bytes.length) {
    let end = Math.min(offset + 74, bytes.length);
    // Never split inside a multi-byte UTF-8 sequence.
    while (end < bytes.length && (bytes[end] & 0b1100_0000) === 0b1000_0000) {
      end -= 1;
    }
    chunks.push(decoder.decode(bytes.slice(offset, end)));
    offset = end;
  }
  return chunks.join("\r\n ");
}

export function buildEventIcs(event: CampaignEvent): string {
  const timed = parseTimeParts(event);
  const dtLines = timed
    ? [
        `DTSTART;TZID=Europe/Prague:${timed.start}`,
        `DTEND;TZID=Europe/Prague:${timed.end}`,
      ]
    : (() => {
        const { start, end } = allDayParts(event);
        return [`DTSTART;VALUE=DATE:${start}`, `DTEND;VALUE=DATE:${end}`];
      })();

  const descriptionParts = [
    event.description,
    event.mapUrl ? `Přesné umístění stánku: ${event.mapUrl}` : null,
    "Více na https://www.sablikdosenatu.cz/akce",
  ].filter(Boolean);

  const description = descriptionParts.join("\n\n");

  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//sablikdosenatu.cz//Akce kampane//CS",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:akce-${event.id}@sablikdosenatu.cz`,
    `DTSTAMP:${event.date.replaceAll("-", "")}T000000Z`,
    ...dtLines,
    `SUMMARY:${escapeIcsText(event.title)}`,
    `LOCATION:${escapeIcsText(event.place)}`,
    `DESCRIPTION:${escapeIcsText(description)}`,
    "URL:https://www.sablikdosenatu.cz/akce",
    "STATUS:CONFIRMED",
    "CLASS:PUBLIC",
    "END:VEVENT",
    "END:VCALENDAR",
  ];

  return lines.map(foldIcsLine).join("\r\n") + "\r\n";
}
