# Redakční pravidla pro články (aktuality)

Checklist pro každý nový nebo upravovaný článek v této složce. Vychází z výzkumu
(Stanford Web Credibility, NN/g, Chartbeat/Upworthy headline testy, Georgetown
IPDI, Center for Campaign Innovation) – podrobnosti v plánu kampaně.

## Titulek

- Konkrétní a srozumitelný na první přečtení. Nikdy formát „X v podcastu Y" –
  to je label, ne titulek. Vytáhni nejsilnější fakt, číslo nebo výrok z obsahu
  (např. „7 udání a pochvala od inspekce", „Seškrtejme učivo o polovinu").
- Čísla piš číslicí (36 %, 57, 47,5 %), ne slovem – číslice v titulcích
  prokazatelně zvyšují prokliky.
- Jednoduchá, běžná slova. Žádný žargon, žádné úřední formulace.

## Perex a první odstavec (pět W)

- První odstavec musí sám o sobě odpovědět: kdo, co, kdy, kde, proč.
  U všeho, co souvisí s volbami: obvod č. 21 – Praha 5 a Praha 13,
  volby 9.–10. října 2026.
- `summary` v metadatech je samostatný perex – musí fungovat i mimo článek
  (vyhledávače, sociální sítě, přehled aktualit).

## Test místní relevance

- Před publikací si polož otázku: **„Pochopí čtenář z Prahy 13, proč se ho
  to týká?"** Pokud ne, doplň větu, která národní téma přeloží do dopadu na
  obvod – věcně, ne jen jmenovkou („…i na Praze 13"). Odkaz na `/#program`
  nebo `/akce`, kde to dává smysl.
- Nevymýšlej fakta – používej jen tvrzení, která už jsou na webu nebo
  v citovaném zdroji.

## Jazyk

- Věcný, civilní tón. Žádné úřednické vsuvky („K tomu je vydána tato tisková
  zpráva."), žádné marketingové superlativy bez důkazu („fenomenální",
  „naprosto unikátní" – pokud to není doložitelné).
- Krátké odstavce (2–4 věty), popisné H2 mezititulky, odrážky pro výčty.
- Aktivní rod: „Studenti vedou kampaň", ne „Kampaň je vedena studenty".

## Typografie a korektura

- České uvozovky „…“ (vnořené ‚…‘), pomlčka –, mezera před % (36 %).
- Žádné ASCII uvozovky `"` a `'` v textu článku (v kódu a metadatech ano).
- Před publikací celý text přečti nahlas – každý překlep poškozuje
  důvěryhodnost celé kampaně (Stanford: „i jediný překlep škodí").
- Pozor na skloňování jména: Radko Sáblík → za Radkem Sáblíkem, Radka
  Sáblíka, Radkovi Sáblíkovi, s Radkem Sáblíkem.

## Skladba obsahu (mix)

- Přednost mají články, které odpovídají na otázky voličů: postoje k tématům,
  dění v obvodu, akce, biografie. Rekapitulace mediálních vystoupení jsou
  v pořádku, ale nesmí tvořit většinu aktualit (v červenci 2026 byly 4 ze 7 –
  nepřidávej další recap, dokud nepřibude obvodový/tematický obsah).
- Každý článek končí u ArticleCTA (vkládá se automaticky) – text článku proto
  neukončuj vlastní výzvou k akci, ale věcnou tečkou.

## Metadata

- `title`, `date` (YYYY-MM-DD), `summary`, `image` jsou povinné.
- Po změně titulku zaktualizuj i odkazy v `public/llms.txt`.
