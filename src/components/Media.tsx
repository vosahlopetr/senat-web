import Image from "next/image";

export default function Media() {
  const articles = [
    {
      id: "1",
      url: "https://zpravy.aktualne.cz/domaci/bezny-clanek-gg-lqx7ohphgw0psdwaesgboa/r~aaa29fc785043f251a76fb9e0456515a/",
      logo: "/images/aktualne.png",
      alt: "Aktuálně.cz",
      title:
        "Takový boj tu ještě nebyl. Studenti se rozhodli dostat šéfa své školy do Senátu",
    },
    {
      id: "2",
      url: "https://prazsky.denik.cz/zpravy_region/prumyslovka-jako-laborator-politiky-reditel-chce-do-senatu-s-pomoci-studentu-202.html",
      logo: "/images/denik.png",
      alt: "Pražský deník",
      title:
        "Průmyslovka jako laboratoř politiky: ředitel chce do Senátu s pomocí studentů",
    },
    {
      id: "3",
      url: "https://www.forum24.cz/problem-pro-vaclava-lasku-oblibeny-reditel-zabojuje-o-kreslo-v-senatu-kampan-mu-delaji-studenti",
      logo: "/images/forum.svg",
      alt: "Forum 24",
      title:
        "Problém pro Václava Lásku? Oblíbený ředitel zabojuje o křeslo v senátu",
    },
    {
      id: "4",
      url: "https://www.novinky.cz/clanek/domaci-reditel-smichovske-prumyslovky-sablik-kandiduje-do-senatu-40565487",
      logo: "/images/novinky.png",
      alt: "Novinky.cz",
      title: "Ředitel smíchovské průmyslovky Sáblík kandiduje do Senátu",
    },
    {
      id: "5",
      url: "https://archiv.hn.cz/c1-67851000-nechava-zaky-misto-skoly-zakladat-start-upy-nyni-oblibeny-reditel-kandiduje-do-senatu-kampan-mu-delaji-studenti",
      logo: "/images/hn.gif",
      alt: "Hospodářské noviny",
      title:
        "Nechává žáky místo školy zakládat start-upy. Nyní kandiduje do Senátu",
    },
    {
      id: "6",
      url: "https://www.seznamzpravy.cz/clanek/audio-podcast-ptam-se-ja-prislo-na-me-55-udani-hlavne-od-ucitelu-rika-reditel-kandidujici-do-senatu-312130",
      logo: "/images/sz.png",
      alt: "Seznam Zprávy",
      title:
        "Studentům dávám v pátek volno, můžou podnikat a kandiduje do Senátu",
    },
  ];

  return (
    <section id="media" className="section">
      <div className="container">
        <div className="flex justify-between items-end mb-8 flex-wrap gap-4">
          <div className="flex flex-col gap-2">
            <h2 className="font-display text-[clamp(2.5rem,5vw,4rem)] text-cream uppercase leading-none">
              Napsali o nás
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(280px,100%),1fr))] gap-6">
          {articles.map((article) => (
            <a
              key={article.id}
              href={article.url}
              className="flex flex-col bg-cream text-accent p-6 rounded-[32px] no-underline border-[3px] border-accent shadow-[-4px_4px_0px_var(--color-accent)] transition-all duration-150 hover:translate-x-[4px] hover:-translate-y-[4px] hover:shadow-[-8px_8px_0px_var(--color-accent)] active:-translate-x-[2px] active:translate-y-[2px] active:shadow-[0px_0px_0px_var(--color-accent)]"
            >
              <Image
                src={article.logo}
                alt={article.alt}
                width={250}
                height={64}
                style={{
                  width: "100%",
                  height: "auto",
                  maxWidth: "250px",
                  maxHeight: "4rem",
                }}
                className="object-contain object-left mb-2 self-start mix-blend-multiply select-none"
                draggable="false"
              />
              <h3 className="font-body font-extrabold text-[1.375rem] leading-[1.2] mb-0 mt-auto">
                {article.title}
              </h3>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
