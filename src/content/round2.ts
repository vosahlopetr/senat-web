/**
 * Obsah pro banner mezi koly (RoundTwoBanner) – VYPLNIT V SOBOTU VEČER
 * po sečtení 1. kola (10. října 2026). Banner se na homepage objeví
 * automaticky podle fáze voleb; bez vyplněných dat zobrazí jen obecnou
 * mobilizační výzvu.
 *
 * Lekce z Pavlovy kampaně 2023: mezi koly rozhodly (1) podpora
 * vyřazených kandidátů – přeneslo se ~90 % jejich voličů – a
 * (2) viditelná mobilizace. Podpory sem doplňujte okamžitě, jakmile
 * jsou veřejné a doložitelné (citace + zdroj), nikdy dřív.
 */

export type Round2Endorsement = {
  name: string;
  /** Např. „kandidát na senátora v 1. kole". */
  role: string;
  /** Doslovná veřejná citace – nikdy parafráze bez zdroje. */
  quote?: string;
};

/**
 * Věcné shrnutí výsledku 1. kola – jedna dvě věty, čísla z volby.cz.
 * Např.: „V 1. kole získal Radko Sáblík 34 % hlasů a postupuje do
 * 2. kola spolu s Václavem Láskou (36 %)."
 */
export const ROUND2_RESULTS_NOTE: string | null = null;

/** Podpory pro 2. kolo od vyřazených kandidátů a osobností. */
export const ROUND2_ENDORSEMENTS: readonly Round2Endorsement[] = [];
