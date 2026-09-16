export type DistrictId = "praha-5" | "praha-13";

export type PinCategory = "issue" | "landmark" | "education";

export type DistrictPin = {
  id: string;
  name: string;
  quarter: string;
  district: "Praha 5" | "Praha 13";
  districtId: DistrictId;
  category: PinCategory;
  coordinates: { x: number; y: number };
  lat: number;
  lng: number;
  mapyUrl: string;
  subtitle: string;
  /** Co od vás slýchám v ulicích */
  hear: string;
  /** Za co se budu jako senátor bít */
  push: string;
  /** Podrobnější kontext k danému místu */
  description: string;
  tags: readonly string[];
  programAnchor?: string;
};

export type DistrictBoundary = {
  id: DistrictId;
  name: string;
  path: string;
  center: { x: number; y: number };
  residentsCount: string;
  description: string;
};

export type MetroStation = {
  name: string;
  x: number;
  y: number;
  line: "A" | "B";
  labelOffsetY?: number;
  labelOffsetX?: number;
  textAnchor?: "middle" | "start" | "end";
};

export const MAP_VIEWBOX = "0 0 1000 632";
export const MAP_WIDTH = 1000;
export const MAP_HEIGHT = 632;

/**
 * Topologically accurate SVG boundary paths for Senate District 21 (Praha 5 and Praha 13),
 * projected from RÚIAN / OpenStreetMap geographic coordinates.
 */
export const DISTRICT_BOUNDARIES: readonly DistrictBoundary[] = [
  {
    id: "praha-5",
    name: "Praha 5",
    residentsCount: "cca 88 000 obyvatel",
    description: "Smíchov, Košíře, Motol, Radlice, Jinonice, Hlubočepy a Barrandov.",
    center: { x: 740, y: 175 },
    path: "M 371.6,105.3 L 378.8,131.7 L 375.9,153.4 L 378.0,166.1 L 371.6,182.2 L 374.9,185.8 L 377.6,185.4 L 392.2,209.4 L 406.5,205.7 L 413.3,212.5 L 429.5,215.7 L 458.3,234.4 L 467.0,235.4 L 470.6,238.4 L 475.3,235.2 L 484.1,254.6 L 481.4,273.2 L 503.9,271.8 L 513.6,273.4 L 514.0,276.3 L 522.0,278.5 L 522.8,276.4 L 542.6,286.6 L 546.6,292.0 L 558.0,298.7 L 580.5,318.6 L 576.9,330.1 L 563.1,347.8 L 566.1,363.6 L 564.0,373.1 L 572.2,386.2 L 568.1,401.7 L 569.8,404.0 L 582.3,406.6 L 569.4,419.2 L 563.7,434.0 L 559.3,437.1 L 566.0,444.0 L 562.5,451.4 L 569.6,457.0 L 563.3,461.8 L 566.7,474.2 L 575.3,474.0 L 573.2,479.9 L 580.2,496.4 L 579.6,512.5 L 593.0,520.3 L 593.8,534.8 L 586.7,536.9 L 586.7,544.2 L 582.0,544.2 L 581.7,554.5 L 585.9,554.6 L 581.6,556.9 L 584.9,576.0 L 587.1,578.5 L 589.4,580.0 L 607.3,578.4 L 608.8,574.4 L 630.1,565.0 L 646.7,603.3 L 661.2,590.9 L 683.4,565.9 L 714.3,550.2 L 730.5,537.1 L 734.9,536.0 L 751.3,560.9 L 790.4,552.8 L 797.1,557.4 L 818.5,538.1 L 819.0,534.2 L 825.7,532.4 L 853.8,514.5 L 860.6,518.5 L 892.7,461.2 L 914.2,414.7 L 924.6,385.3 L 962.6,253.2 L 959.5,218.3 L 949.5,190.6 L 941.7,150.0 L 928.7,54.1 L 922.1,50.3 L 917.6,28.7 L 889.0,29.7 L 889.2,33.3 L 872.5,35.4 L 853.5,34.9 L 852.8,38.7 L 829.5,51.2 L 821.7,53.0 L 813.1,57.8 L 813.8,59.8 L 799.4,62.0 L 784.1,61.8 L 784.6,56.9 L 733.8,47.2 L 734.1,52.0 L 723.4,53.9 L 717.9,59.9 L 704.1,60.2 L 698.9,63.1 L 683.7,61.0 L 680.1,60.2 L 687.8,57.6 L 698.4,48.8 L 693.8,47.3 L 590.9,59.3 L 589.0,70.0 L 574.9,68.3 L 550.0,74.6 L 542.7,81.2 L 532.8,84.0 L 522.0,84.2 L 519.7,80.4 L 496.9,86.6 L 493.5,84.0 L 488.4,87.3 L 484.7,82.1 L 476.7,85.0 L 476.6,88.6 L 452.2,95.1 L 450.5,86.0 L 394.5,95.0 L 395.6,99.2 L 389.5,104.5 L 375.4,108.3 L 371.6,105.3 Z",
  },
  {
    id: "praha-13",
    name: "Praha 13",
    residentsCount: "cca 65 000 obyvatel",
    description: "Stodůlky, Lužiny, Nové Butovice, Hůrka, Velká Ohrada a Třebonice.",
    center: { x: 350, y: 260 },
    path: "M 37.0,345.9 L 48.1,348.4 L 54.7,361.5 L 55.2,364.8 L 51.4,367.4 L 51.6,369.3 L 54.7,369.1 L 47.7,397.9 L 40.0,398.1 L 40.1,401.0 L 43.6,403.8 L 48.5,427.9 L 58.4,450.8 L 67.2,464.3 L 80.9,478.2 L 123.8,509.5 L 166.2,467.0 L 178.5,461.3 L 226.4,448.2 L 243.1,439.9 L 277.9,394.9 L 282.5,386.5 L 283.7,377.0 L 286.0,376.5 L 290.1,383.6 L 298.9,389.4 L 321.0,391.8 L 332.0,396.5 L 338.7,402.9 L 347.9,418.1 L 357.0,426.3 L 369.5,430.7 L 384.2,432.1 L 396.8,446.8 L 408.7,480.1 L 427.1,493.9 L 429.1,501.5 L 453.6,486.3 L 460.2,504.0 L 455.3,507.7 L 458.5,512.0 L 476.1,510.6 L 475.7,505.7 L 472.6,502.4 L 476.0,501.4 L 488.8,507.6 L 495.4,507.1 L 500.4,503.7 L 502.6,510.6 L 512.1,506.5 L 527.7,492.2 L 540.4,486.1 L 549.2,484.6 L 558.0,476.3 L 566.7,474.2 L 563.3,461.8 L 569.6,457.0 L 562.5,451.4 L 566.0,444.0 L 559.3,437.1 L 563.7,434.0 L 569.4,419.2 L 582.3,406.6 L 569.8,404.0 L 568.1,401.7 L 572.2,386.2 L 564.0,373.1 L 566.1,363.6 L 563.1,347.8 L 576.9,330.1 L 580.5,318.6 L 558.0,298.7 L 546.6,292.0 L 542.6,286.6 L 522.8,276.4 L 522.0,278.5 L 514.0,276.3 L 513.6,273.4 L 503.9,271.8 L 481.4,273.2 L 484.1,254.6 L 475.3,235.2 L 470.6,238.4 L 467.0,235.4 L 458.3,234.4 L 429.5,215.7 L 413.3,212.5 L 406.5,205.7 L 392.2,209.4 L 377.6,185.4 L 352.6,190.2 L 324.1,208.5 L 296.5,218.8 L 263.6,227.6 L 265.2,262.1 L 218.1,284.7 L 223.3,293.5 L 225.0,310.9 L 174.6,318.4 L 108.3,333.8 L 94.8,334.8 L 85.4,339.7 L 84.6,338.2 L 77.6,340.1 L 80.0,333.7 L 79.1,327.9 L 74.7,324.2 L 70.5,324.0 L 53.4,339.4 L 37.6,341.6 L 37.0,345.9 Z",
  },
] as const;

/**
 * Real track outline of Metro Line A from its western terminus at Nemocnice Motol (Praha 5),
 * curving northeast under Obora Hvězda towards Petřiny (Praha 6) and the city center.
 * Extracted from official OpenStreetMap subway route relation #7772996.
 */
export const METRO_A_PATH =
  "M 489.5,89.1 L 497.4,85.2 L 500.5,83.7 L 503.9,82.0 L 506.9,80.4 L 510.4,78.2 L 514.2,75.3 L 516.6,73.3 L 519.7,70.2 L 522.6,66.8 L 524.8,63.9 L 527.6,59.5 L 528.9,57.0 L 530.1,54.3 L 532.0,49.3 L 533.5,43.8 L 534.4,39.1 L 534.7,36.9 L 534.9,34.2 L 535.0,32.1 L 535.0,29.9 L 534.9,27.8 L 534.8,25.7 L 534.6,23.5 L 534.3,21.3 L 533.9,19.1 L 533.4,17.0 L 532.8,14.8 L 532.1,12.7 L 528.6,3.6";

/**
 * Real track outline of Metro Line B in Prague District 21,
 * starting at Zličín and strictly ending at the district border on the Vltava riverbank.
 * Extracted from official OpenStreetMap subway route relation #7772995.
 */
export const METRO_B_PATH =
  "M 177.6,297.8 L 211.8,351.7 L 220.6,360.1 L 231.1,365.9 L 242.8,368.9 L 255.3,368.9 L 329.7,358.6 L 337.1,358.5 L 344.3,360.0 L 351.0,362.8 L 382.7,385.5 L 393.2,389.3 L 402.5,390.1 L 437.3,385.5 L 443.5,383.6 L 449.2,380.6 L 454.2,376.7 L 458.1,372.1 L 472.3,346.7 L 478.3,340.8 L 485.4,337.1 L 495.4,334.7 L 631.1,315.4 L 636.6,313.1 L 657.5,300.1 L 715.7,274.4 L 729.6,266.8 L 747.8,254.9 L 758.3,251.3 L 763.9,250.6 L 771.4,251.1 L 801.4,260.7 L 808.8,265.8 L 824.4,280.9 L 830.3,284.5 L 838.5,287.3 L 850.5,287.7 L 897.5,280.3 L 907.7,275.7 L 914.6,269.2 L 919.7,259.4 L 920.9,249.5 L 917.2,213.4 L 914.4,202.5 L 908.6,193.4 L 890.5,176.4 L 886.4,169.6 L 884.1,162.7 L 883.2,152.6 L 887.1,128.2 L 890.5,119.8 L 893.7,115.4 L 899.1,110.3 L 904.0,107.4 L 909.5,105.4 L 916.7,104.5 L 936.1,107.2";

export const METRO_STATIONS: readonly MetroStation[] = [
  // Metro A (Praha 5)
  {
    name: "Nemocnice Motol",
    x: 489.5,
    y: 89.1,
    line: "A",
    labelOffsetX: -10,
    labelOffsetY: 4,
    textAnchor: "end",
  },
  // Metro B (Praha 5 & Praha 13)
  { name: "Zličín", x: 177.8, y: 298.1, line: "B", labelOffsetX: 0, labelOffsetY: -9, textAnchor: "middle" },
  { name: "Stodůlky", x: 278.4, y: 366.3, line: "B", labelOffsetX: 0, labelOffsetY: -9, textAnchor: "middle" },
  { name: "Luka", x: 372.1, y: 378.0, line: "B", labelOffsetX: 0, labelOffsetY: 16, textAnchor: "middle" },
  { name: "Lužiny", x: 430.8, y: 386.7, line: "B", labelOffsetX: 0, labelOffsetY: 16, textAnchor: "middle" },
  { name: "Hůrka", x: 507.0, y: 333.2, line: "B", labelOffsetX: 0, labelOffsetY: -9, textAnchor: "middle" },
  { name: "Nové Butovice", x: 565.8, y: 325.4, line: "B", labelOffsetX: 0, labelOffsetY: -9, textAnchor: "middle" },
  { name: "Jinonice", x: 676.4, y: 291.3, line: "B", labelOffsetX: 0, labelOffsetY: -9, textAnchor: "middle" },
  { name: "Radlická", x: 787.6, y: 256.3, line: "B", labelOffsetX: 0, labelOffsetY: -9, textAnchor: "middle" },
  { name: "Smíchovské nádraží", x: 917.5, y: 220.3, line: "B", labelOffsetX: 9, labelOffsetY: 4, textAnchor: "start" },
  { name: "Anděl", x: 885.7, y: 134.6, line: "B", labelOffsetX: -9, labelOffsetY: 4, textAnchor: "end" },
] as const;

/** Alias for backward compatibility */
export const METRO_B_STATIONS = METRO_STATIONS;

/**
 * Vltava river outline along the eastern boundary of Praha 5.
 */
export const VLTAVA_PATH =
  "M 922.0,25.0 C 930.0,50.0 941.7,150.0 949.5,190.6 C 959.5,218.3 962.6,253.2 924.6,385.3 C 914.2,414.7 892.7,461.2 860.6,518.5 C 853.8,532.0 818.5,558.0 797.1,565.0";

/**
 * Green valley spine of Prokopské & Dalejské údolí connecting the districts.
 */
export const PROKOPSKE_UDOLI_PATH =
  "M 360.0,430.0 Q 480.0,480.0 570.0,440.0 T 688.0,390.0 T 820.0,420.0";

export const DISTRICT_PINS: readonly DistrictPin[] = [
  // Praha 5 - Smíchov
  {
    id: "andel",
    name: "Anděl & Nádražní",
    quarter: "Smíchov",
    district: "Praha 5",
    districtId: "praha-5",
    category: "issue",
    coordinates: { x: 883.8, y: 121.0 },
    lat: 50.0718,
    lng: 14.4037,
    mapyUrl: "https://mapy.cz/s/kolelahudo",
    subtitle: "Bezpečnost, drogová scéna a veřejný prostor",
    hear: "Smíchov se rychle rozvíjí, ale situace kolem Anděla a křižovatky Nádražní je pro místní obyvatele a rodiny dlouhodobě neúnosná. Trápí je nepořádek, pocit nebezpečí a soustředění nízkoprahových center na jednom místě.",
    push: "Jako senátor svolám pravidelná společná jednání radnice Prahy 5, Magistrátu hl. m. Prahy a Policie ČR. Budu tvrdě tlačit na to, aby se péče o drogově závislé rozložila po celé metropoli a nekoncentrovala se na Smíchově, a aby se posílily stálé pěší hlídky.",
    description: "Křižovatka Anděl je dopravním i společenským srdcem Prahy 5 s obrovskou denní frekvencí lidí. Dlouholeté přehlížení sociálních problémů vedlo k tomu, že se zde koncentrují patologické jevy. Řešení vyžaduje koordinaci magistrátu, městské části a státní policie – přesně v tom může senátor sehrát klíčovou roli nezávislého garanta.",
    tags: ["Bezpečnost", "Policie", "Veřejný prostor", "Drogová scéna"],
    programAnchor: "/cile#obvod",
  },
  {
    id: "sspsg",
    name: "Smíchovská průmyslovka (SSPŠG) & Next Zone",
    quarter: "Smíchov",
    district: "Praha 5",
    districtId: "praha-5",
    category: "education",
    coordinates: { x: 903.8, y: 85.9 },
    lat: 50.0754,
    lng: 14.4069,
    mapyUrl: "https://mapy.cz/s/puzogururu",
    subtitle: "Škola jako moderní inovační centrum",
    hear: "Škola, kterou Radko Sáblík vede již od roku 2002. Místní oceňují otevřenost školy komunitě – studenti zde zdarma učí seniory ovládat chytré telefony, počítače a moderní technologie.",
    push: "Prosazovat principy moderního vzdělávání, které na Smíchově prokazatelně fungují: přenesení reálné odpovědnosti na mladé lidi, podpora studentského podnikání, propojení generací a výuka kyberbezpečnosti a AI.",
    description: "SSPŠG v Preslově ulici se pod vedením Radka Sáblíka stala jednou z nejinovativnějších škol v zemi. Součástí školy je startupový inkubátor Next Zone, studentská AI laboratoř, mediální dům i programy pro seniory. Právě zde vznikl nápad na studentskou kampaň do Senátu.",
    tags: ["Školství", "Inovace", "Senioři", "Startup"],
    programAnchor: "/cile#skolstvi",
  },
  {
    id: "smichov-city",
    name: "Smíchov City",
    quarter: "Smíchov",
    district: "Praha 5",
    districtId: "praha-5",
    category: "landmark",
    coordinates: { x: 891.9, y: 182.3 },
    lat: 50.0655,
    lng: 14.405,
    mapyUrl: "https://mapy.cz/s/guvuvebuco",
    subtitle: "Největší nová čtvrť a moderní infrastruktura",
    hear: "Obrovská proměna bývalého nákladového nádraží. Lidé vítají novou čtvrť s pěší třídou Madelein Albrightové, ale mají obavy z dopravního přetížení a dožadují se rychlého dokončení plánované základní školy a zelených parků.",
    push: "Hlídat, aby soukromá výstavba šla ruku v ruce s veřejnou vybaveností – zejména školami, školkami, parky a novým terminálem Smíchov. Nová výstavba musí obvodu sloužit, ne ho zahltit.",
    description: "Smíchov City představuje nejrozsáhlejší urbanistický projekt v centrální Praze. Vyroste zde bydlení pro tisíce lidí, nová centrála České spořitelny a moderní dopravní terminál. Klíčem k úspěchu je včasné vybudování občanské vybavenosti.",
    tags: ["Rozvoj", "Architektura", "Školy", "Doprava"],
    programAnchor: "/cile#obvod",
  },

  // Praha 5 - Košíře & Motol
  {
    id: "kosire",
    name: "Plzeňská ulice & Bertramka",
    quarter: "Košíře",
    district: "Praha 5",
    districtId: "praha-5",
    category: "issue",
    coordinates: { x: 766.9, y: 133.6 },
    lat: 50.0705,
    lng: 14.385,
    mapyUrl: "https://mapy.cz/s/fafoforofo",
    subtitle: "Dopravní tepna, hluk a chybějící sportoviště",
    hear: "Tranzitní hluk, znečištění ovzduší, stav Plzeňské ulice a málo míst pro sport a bezpečné trávení volného času pro děti i dospělé.",
    push: "Citlivá obnova Plzeňské ulice, která nezpůsobí kolaps průjezdu, více zeleně u zastávek a podpora výstavby komunitních workoutových hřišť a sportovišť v Košířích.",
    description: "Košíře leží v sevřeném údolí Motolského potoka. Plzeňská ulice je klíčovou tramvajovou i automobilovou spojnicí, která však čtvrť rozděluje na dvě poloviny. Potřebuje zklidnění a kvalitnější veřejný prostor.",
    tags: ["Doprava", "Sport", "Životní prostředí", "Revitalizace"],
    programAnchor: "/cile#obvod",
  },
  {
    id: "motol",
    name: "Nemocnice Motol & Sokol Motol",
    quarter: "Motol",
    district: "Praha 5",
    districtId: "praha-5",
    category: "landmark",
    coordinates: { x: 493.3, y: 114.2 },
    lat: 50.0725,
    lng: 14.3412,
    mapyUrl: "https://mapy.cz/s/muhubesoto",
    subtitle: "Zdravotnictví, sport a klidné bydlení",
    hear: "Příjemné zelené bydlení v sousedství lesoparku Cibulka. Obyvatele však trápí úklid chodníků v zimě, nedostatek míst ve školkách a parkování návštěvníků nemocnice v rezidenčních zónách.",
    push: "Radko Sáblík vedl Sokol Motol dvacet let a důvěrně zná každé nároží čtvrti. Bude prosazovat podporu amatérského a mládežnického sportu, koordinaci parkování u FN Motol a včasné plánování kapacit mateřských škol.",
    description: "Motol v sobě spojuje největší nemocniční komplex v republice s klidnými rezidenčními vilovými čtvrtěmi. Je to ukázkový příklad místa, kde se potkává celostátní infrastruktura s každodenními potřebami místních občanů.",
    tags: ["Sport", "Zdravotnictví", "Školky", "Parkování"],
    programAnchor: "/cile#sport",
  },

  // Praha 5 - Radlice & Jinonice
  {
    id: "radlicka",
    name: "Radlická radiála & Dívčí hrady",
    quarter: "Radlice",
    district: "Praha 5",
    districtId: "praha-5",
    category: "issue",
    coordinates: { x: 786.3, y: 257.3 },
    lat: 50.0578,
    lng: 14.3881,
    mapyUrl: "https://mapy.cz/s/lejekusuto",
    subtitle: "Desetiletí odkládaná stavba tunelu",
    hear: "Zácpy v Radlicích, tranzitní kamiony projíždějící obytnými zónami a věčný boj o parkování. A k tomu málo kulturního a společenského vyžití.",
    push: "Dokončení Radlické radiály v podzemní tunelové variantě, která odvede tranzit z ulic Radlic a Jinonic. Jako senátor budu neustále urgovat stát i magistrát, aby stavbu neodsouvaly a zajistily státní spolufinancování.",
    description: "Radlická radiála je chybějící spojkou mezi Městským okruhem na Zlíchově a Pražským okruhem na Třebonicích. Její odkládání dusí celou jižní část Prahy 5 tranzitní dopravou.",
    tags: ["Radlická radiála", "Doprava", "Tunel", "Tranzit"],
    programAnchor: "/cile#obvod",
  },
  {
    id: "jinonice",
    name: "Waltrovka & Nové Jinonice",
    quarter: "Jinonice",
    district: "Praha 5",
    districtId: "praha-5",
    category: "issue",
    coordinates: { x: 665.7, y: 276.7 },
    lat: 50.0558,
    lng: 14.3688,
    mapyUrl: "https://mapy.cz/s/pemedevufe",
    subtitle: "Rychlý růst vyžaduje lékaře a školy",
    hear: "Lidé v Jinonicích podporují moderní výstavbu v areálu bývalé továrny Walter, ale trvají na tom, aby přinesla i odpovídající vybavenost – ordinace praktických lékařů, obchody a bezpečné cesty pro pěší.",
    push: "Zajistit, aby žádný developerský projekt nevznikal bez závazných kontributů na školky, zelené plochy a lékařské kapacity, a bezpečně propojit Jinonice s Vidoulí a Prokopským údolím.",
    description: "Areál Waltrovky je příkladem úspěšné transformace průmyslového brownfieldu. V okolí však rapidně stoupl počet obyvatel, což vytváří tlak na veřejné služby a lékařskou péči.",
    tags: ["Výstavba", "Lékaři", "Infrastruktura", "Školky"],
    programAnchor: "/cile#obvod",
  },

  // Praha 5 - Barrandov & Hlubočepy
  {
    id: "prokopske-udoli",
    name: "Prokopské údolí & Barrandovské skály",
    quarter: "Hlubočepy",
    district: "Praha 5",
    districtId: "praha-5",
    category: "landmark",
    coordinates: { x: 688.8, y: 389.6 },
    lat: 50.0442,
    lng: 14.3725,
    mapyUrl: "https://mapy.cz/s/bavorevula",
    subtitle: "Přírodní klenot spojující Prahu 5 a Prahu 13",
    hear: "Místní jsou na přírodu za humny nesmírně hrdí. Mají však obavy ze stavebního tlaku na okrajích údolí a z ničení cenných ekosystémů neukázněnými návštěvníky.",
    push: "Důsledná ochrana přírodního parku Prokopské a Dalejské údolí před jakoukoliv zástavbou a podpora šetrné údržby stezek a cyklotras mimo chráněná území.",
    description: "Hluboký vápencový kaňon je zelenými plícemi celého senátního obvodu. Tvoří přirozenou rekreační zónu pro obyvatele Smíchova, Jinonic, Barrandova i Stodůlek.",
    tags: ["Příroda", "Ekologie", "Relaxace", "Ochrana památek"],
    programAnchor: "/cile#obvod",
  },
  {
    id: "barrandov",
    name: "Sídliště Barrandov & Tilleho náměstí",
    quarter: "Barrandov",
    district: "Praha 5",
    districtId: "praha-5",
    category: "issue",
    coordinates: { x: 728.8, y: 492.8 },
    lat: 50.0336,
    lng: 14.3789,
    mapyUrl: "https://mapy.cz/s/karepukato",
    subtitle: "Parkování na sídlišti a péče o seniory",
    hear: "Kritický nedostatek parkovacích míst večer a o víkendech, stárnoucí populace a absence domu s pečovatelskou službou přímo na Praze 5.",
    push: "Výstavba parkovacího domu s rozumným tarifem, podpora vzniku nového domu s pečovatelskou službou na Praze 5 a mezigenerační programy studentů pro barrandovské seniory.",
    description: "Sídliště Barrandov má sice výborné tramvajové spojení na Smíchov a do centra, ale vnitřní sídlištní infrastruktura po čtyřiceti letech existence vyžaduje zásadní investice do parkování a služeb pro stárnoucí generaci.",
    tags: ["Parkování", "Senioři", "Sídliště", "Sociální péče"],
    programAnchor: "/cile#seniori",
  },

  // Praha 13 - Hůrka, Lužiny, Stodůlky, Velká Ohrada
  {
    id: "hurka",
    name: "Sluneční náměstí & Hůrka",
    quarter: "Nové Butovice / Hůrka",
    district: "Praha 13",
    districtId: "praha-13",
    category: "landmark",
    coordinates: { x: 507.7, y: 328.3 },
    lat: 50.0505,
    lng: 14.3435,
    mapyUrl: "https://mapy.cz/s/fepovadaha",
    subtitle: "Srdce Prahy 13 a senátorská kancelář",
    hear: "Centrum třináctky s radnicí, knihovnou a metrem. Lidé oceňují dostupnost úřadů, ale upozorňují, že senátoři se po volbách obvykle stahují do centra a na Prahu 13 zapomínají.",
    push: "Otevřu plnohodnotnou senátorskou kancelář přímo na Praze 13 s pravidelnými úředními hodinami pro občany. Praha 13 tvoří 40 % voličů obvodu a zaslouží si stálou přítomnost svého senátora.",
    description: "Sluneční náměstí je administrativním i společenským centrem městské části Praha 13. Radko Sáblík se zavázal, že zde bude pravidelně osobně k dispozici lidem pro řešení problémů se školami, úřady či legislativou.",
    tags: ["Senátorská kancelář", "Radnice", "Služba lidem", "Metro B"],
    programAnchor: "/cile#jak-pracuji",
  },
  {
    id: "luziny",
    name: "Centrální park & Lužiny",
    quarter: "Stodůlky / Lužiny",
    district: "Praha 13",
    districtId: "praha-13",
    category: "landmark",
    coordinates: { x: 432.7, y: 371.1 },
    lat: 50.0461,
    lng: 14.3315,
    mapyUrl: "https://mapy.cz/s/jokadakaso",
    subtitle: "Zelená páteř sídliště a stop zahušťování",
    hear: "Centrální park s rybníky a sportovišti je pýchou Prahy 13. Lidé však mají oprávněné obavy z dalšího necitlivého zahušťování sídliště developerskou výstavbou na úkor zeleně.",
    push: "Jasné NE zahušťování sídlišť bez předchozího zajištění parkovacích míst, lékařů a kapacit ve školkách. Ochrana a modernizace parkových ploch a sportovišť mezi domy.",
    description: "Centrální park Prahy 13 je mimořádně zdařilou rekreační osou jihozápadního města, která vede podél Prokopského potoka až k ústí do Prokopského údolí. Udržení jeho klidu a celistvosti je pro místní zásadní prioritou.",
    tags: ["Park", "Zeleň", "Stop zahušťování", "Rodiny"],
    programAnchor: "/cile#obvod",
  },
  {
    id: "velka-ohrada",
    name: "Velká Ohrada & Opatřilka",
    quarter: "Velká Ohrada",
    district: "Praha 13",
    districtId: "praha-13",
    category: "issue",
    coordinates: { x: 447.0, y: 445.1 },
    lat: 50.0385,
    lng: 14.3338,
    mapyUrl: "https://mapy.cz/s/hefupojofo",
    subtitle: "Dostupnost lékařů a služby pro rodiny",
    hear: "Kompaktní sídliště na kopci nad Dalejským údolím. Trpí dlouhými čekacími lhůtami u praktických lékařů a pediatrů a horší obslužností městskou hromadnou dopravou v nočních hodinách.",
    push: "Jednat se zdravotními pojišťovnami a ministerstvem zdravotnictví o bonifikaci a otevírání nových ordinací pediatrů a praktických lékařů pro dospělé na Praze 13.",
    description: "Sídliště Velká Ohrada vzniklo na přelomu 80. a 90. let. Dnes zde žije přes 12 000 obyvatel. Nedostatek pediatrů je zde palčivým tématem pro desítky mladých rodin.",
    tags: ["Lékaři", "Pediatři", "Zdravotnictví", "Rodiny"],
    programAnchor: "/cile#obvod",
  },
  {
    id: "zlicin",
    name: "Zličín & Třebonice",
    quarter: "Zličín / Třebonice",
    district: "Praha 13",
    districtId: "praha-13",
    category: "issue",
    coordinates: { x: 176.5, y: 305.9 },
    lat: 50.0528,
    lng: 14.2905,
    mapyUrl: "https://mapy.cz/s/dalupuzuro",
    subtitle: "Západní brána do Prahy a P+R kapacity",
    hear: "Konečná stanice metra B a obrovský přestupní uzel ze Středočeského kraje. Parkoviště P+R jsou brzy ráno plná, což vede k parkování dojíždějících řidičů v okolních ulicích.",
    push: "Rozšíření parkovacích domů P+R na vjezdech do města a zrychlení dostavby západního segmentu Pražského okruhu, aby tranzit nezatěžoval městské komunikace obvodu.",
    description: "Zličín je klíčovým multimodálním terminálem pro celou západní část Prahy a přilehlé okresy Praha-západ a Beroun. Bez dostatečných kapacit pro přestup na MHD trpí ulice celého obvodu.",
    tags: ["P+R", "Doprava", "Metro B", "Okruh"],
    programAnchor: "/cile#obvod",
  },
] as const;

export const CATEGORY_META: Record<
  PinCategory,
  {
    label: string;
    badgeClass: string;
    dotClass: string;
    borderClass: string;
    fillHex: string;
    icon: string;
  }
> = {
  issue: {
    label: "Palčivé téma",
    badgeClass: "bg-red/20 text-[#a31a1a] border-red/40",
    dotClass: "bg-red",
    borderClass: "border-red",
    fillHex: "oklch(61.2% 0.208 22.2)",
    icon: "exclamation",
  },
  landmark: {
    label: "Významné místo",
    badgeClass: "bg-yellow/20 text-[#855302] border-yellow/40",
    dotClass: "bg-yellow",
    borderClass: "border-yellow",
    fillHex: "oklch(59.29% 0.1237 70.24)",
    icon: "star",
  },
  education: {
    label: "Vzdělávání & Inovace",
    badgeClass: "bg-green/20 text-[#1e5822] border-green/40",
    dotClass: "bg-green",
    borderClass: "border-green",
    fillHex: "oklch(69.3% 0.206 140.6)",
    icon: "lightbulb",
  },
};
