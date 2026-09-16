"use client";

import { useState } from "react";
import type { FAQPage, WithContext } from "schema-dts";

const faqs = [
  {
    question: "Co znamenají ty nápisy na chodnících?",
    answer:
      "Jde o takzvané reverzní (neboli vodní) grafitti. Využili jsme k tomu vysokotlaký čistič a šablonu, přes kterou jsme čistou vodou umyli zašlou špínu z chodníku. Nepoužili jsme žádné barvy, chemikálie ani spreje. Je to naprosto ekologický a udržitelný způsob komunikace, který na rozdíl od billboardů a plastových bannerů nevytváří žádný odpad. Postupovali jsme maximálně ohleduplně: vybírali jsme jen silně znečištěná místa a vyhnuli se památkám i soukromému majetku. Nápisy časem samy zmizí, jak se povrch znovu přirozeně zašpiní.",
  },
  {
    question: "Pokud se stanete senátorem, budete nadále ředitelem školy?",
    answer:
      "Ano, po celou dobu mého senátorského mandátu plánuji zůstat ředitelem Smíchovské střední. Škola je moje srdeční záležitost a laboratoř pro inovace, které chci prosazovat na celostátní úrovni. Mám kolem sebe skvělý tým zástupců, pedagogů a dalších kolegů, který zajistí, že škola poběží dál na 100 %.",
  },
  {
    question:
      "Škola má být apolitická, nezneužíváte své studenty pro svou kampaň?",
    answer:
      "Ne. Škola jako instituce je a zůstane striktně apolitická. Moji studenti se do kampaně zapojují naprosto dobrovolně, ve svém volném čase a z vlastního přesvědčení. Jsou to dospělí nebo dospívající lidé s vlastním názorem. Jsem hrdý na to, že je zajímá veřejné dění a chtějí se na něm podílet. Přesně k tomu je přece celou dobu vedu – aby byli aktivní a nebáli se měnit svět kolem sebe.",
  },
  {
    question: "Proč kandidujete do Senátu a nestačí vám pozice ředitele?",
    answer:
      "Protože už mě nebaví jen přihlížet, jak se věci vlečou. Ve školství jsem narazil na strop toho, co můžu změnit z pozice ředitele. Chci rozhýbat zkostnatělý systém, omezit byrokracii a dát mladým lidem šanci ukázat, co v nich je. Senát je místo, kde můžu tyhle změny reálně prosadit a přenést energii z naší školy do celé společnosti.",
  },
  {
    question: "Co konkrétně chcete v Senátu prosadit?",
    answer:
      "Mám pět jasných cílů: moderní školství a sport mládeže, podporu mladých v podnikání, méně byrokracie, lepší Prahu 5 a 13 (více hlídek na Andělu, dostupní lékaři, místa ve školkách, Radlická radiála) a pomoc pro starší generaci. Ke každému zákonu, který přijde do Senátu, budu klást jednu otázku: přidává lidem papíry, nebo jim je ubírá? A jako senátor za obvod budu úřadům, magistrátu i vládě systematicky připomínat, co Praha 5 a 13 potřebuje.",
  },
  {
    question: "Jak budete dostupný lidem z Prahy 5 a 13?",
    answer:
      "Nebudu senátor, kterého uvidíte jednou za šest let na billboardu. Moje škola stojí na Smíchově – do Senátu to mám dvacet minut pěšky. Otevřu senátorskou kancelář s pravidelnými hodinami pro veřejnost na Praze 5 i na Praze 13 a každý měsíc uspořádám otevřenou debatu v jiné části obvodu, od Barrandova po Stodůlky. Napsat mi můžete kdykoli a odpovídám sám.",
  },
  {
    question: "K čemu je vlastně Senát dobrý?",
    answer:
      "Senát je pojistka. Bez jeho souhlasu nejde změnit Ústava ani volební zákony a vrací Sněmovně zákony šité horkou jehlou. Právě teď, kdy má vládní většina Sněmovnu pevně v rukou, je ta pojistka důležitější než kdy dřív. V Senátu budu hájit zdravý rozum: každý zákon poměřím tím, jestli lidem život ulehčí, nebo přitíží. A u toho budu hlídat zájmy Prahy 5 a 13.",
  },
  {
    question:
      "Kde stojíte v domácí a zahraniční politice, hodnotách a obraně demokracie?",
    answer:
      "Jsem nekompromisním obráncem demokracie, lidských práv (včetně práv žen a komunity LGBTQIA+) a našeho pevného ukotvení v EU a NATO. Mrzí mě, jak domácí politika v poslední době zhrubla – což jde v prvé řadě za bývalým prezidentem Zemanem – a že se z ní vytratily hodnoty na úkor průzkumů veřejného mínění. Světová situace je šílená: ohrožuje nás masový vrah Putin, islámští fanatici z Hamásu či Íránu, ale i pravděpodobně částečně senilní prezident USA pan Trump. Evropa bohužel nemá žádného výrazného lídra a odklání se od hodnot k zástupným problémům. Lidé se měli delší čas velmi dobře a brali to jako samozřejmost. Ale za svobodu a demokracii se bojovat musí, jinak o ně přijdeme. K tomu chci přispět nejen silnými slovy, ale i vzděláváním. Proto naše studenty učíme kyberbezpečnost a mediální gramotnost a proto jsem napsal trilogii o holokaustu.",
  },
  {
    question:
      "Kandidujete za koalici ODS, STAN a KDU-ČSL, ale vystupujete docela nezávisle. Jak to jde dohromady?",
    answer:
      "Jsem člověk, který věří ve svobodu, zodpovědnost a zdravý rozum. To jsou hodnoty, které sdílím s ODS, jejímž jsem členem, i se Starosty a Lidovci, kteří se za mou kandidaturu postavili. Zároveň jsem ale vždycky říkal věci na rovinu a dělal je po svém, i když to znamenalo jít proti proudu. A to se nezmění ani v Senátu. Budu hlasovat podle svého nejlepšího vědomí a svědomí.",
  },
  {
    question: "Jak můžu podpořit vaši kampaň?",
    answer:
      "Senátní volby se často rozhodují o pár stovek hlasů a každá pomoc má obrovský smysl. Můžete se přidat jako dobrovolník (třeba rozdávat letáky u metra nebo přesvědčit své sousedy) – stačí se připojit do naší WhatsApp skupiny. Pokud nás chcete podpořit finančně, budeme moc vděční za jakýkoliv dar na náš transparentní účet.",
    answerNode: (
      <div className="space-y-4">
        <p>
          Senátní volby se často rozhodují o pár stovek hlasů a každá pomoc má
          obrovský smysl. Zapojit se můžete dvěma způsoby:
        </p>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong>Jako dobrovolník:</strong> pomozte nám rozdávat letáky,
            vhazovat noviny do schránek nebo přesvědčit lidi ve vašem okolí.
            Nejsnazší cesta je přidat se do naší{" "}
            <a
              href="https://chat.whatsapp.com/G8uZKOJQJDu8ORBnooi1pv"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold underline underline-offset-4 hover:text-green transition-colors"
            >
              dobrovolnické WhatsApp skupiny
            </a>
            .
          </li>
          <li>
            <strong>Finančně:</strong> kampaň něco stojí a my si vážíme každé
            koruny. Podpořit nás můžete{" "}
            <a
              href="https://moje.ods.cz/dary/oblast"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold underline underline-offset-4 hover:text-green transition-colors"
            >
              darem přes zabezpečený portál
            </a>
            . Výdaje transparentně zveřejňujeme.
          </li>
        </ul>
      </div>
    ),
  },
];

const faqJsonLd: WithContext<FAQPage> = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  })),
};

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleOpen = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="section bg-cream text-accent"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <div className="container max-w-[48rem]">
        <header className="mb-10 md:mb-14 text-center">
          <h2
            id="faq-heading"
            className="font-display font-bold text-[clamp(2.5rem,6vw,4rem)] leading-[0.9] uppercase mb-4"
          >
            Často kladené dotazy
          </h2>
        </header>

        <div className="flex flex-col gap-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            const triggerId = `faq-trigger-${index}`;
            const panelId = `faq-panel-${index}`;
            return (
              <div
                key={index}
                className="border-[3px] border-accent rounded-[28px] overflow-hidden transition-all duration-150 bg-white shadow-[-4px_4px_0px_var(--color-accent)] hover:translate-x-[4px] hover:-translate-y-[4px] hover:shadow-[-8px_8px_0px_var(--color-accent)] [&:has(button:active)]:-translate-x-[2px] [&:has(button:active)]:translate-y-[2px] [&:has(button:active)]:shadow-[0px_0px_0px_var(--color-accent)]"
              >
                {/* ARIA accordion pattern: the heading wraps the trigger button
                    (a heading inside a button is invalid HTML). */}
                <h3 className="m-0">
                  <button
                    id={triggerId}
                    onClick={() => toggleOpen(index)}
                    className="w-full text-left px-6 py-5 md:px-8 md:py-6 flex justify-between items-center gap-4 focus:outline-none focus-visible:bg-accent/5 transition-colors font-body font-bold text-[1.15rem] md:text-[1.35rem] leading-[1.3]"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                  >
                    <span className="pr-4">{faq.question}</span>
                    <span
                      className="shrink-0 w-8 h-8 flex items-center justify-center relative transition-transform duration-300"
                      style={{
                        transform: isOpen ? "rotate(135deg)" : "rotate(0deg)",
                      }}
                      aria-hidden="true"
                    >
                      <span className="absolute w-4 h-[3px] bg-accent" />
                      <span className="absolute w-[3px] h-4 bg-accent" />
                    </span>
                  </button>
                </h3>

                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={triggerId}
                  aria-hidden={!isOpen}
                  inert={!isOpen}
                  className="grid transition-[grid-template-rows] duration-300 ease-in-out"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <div className="px-6 pb-6 md:px-8 md:pb-8 pt-0 font-body text-[1.1rem] md:text-[1.2rem] leading-[1.6] text-accent/90">
                      {faq.answerNode || faq.answer}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
