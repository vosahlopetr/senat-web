import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { CONTACT_EMAIL } from "@/lib/site-config";

export const metadata: Metadata = buildPageMetadata({
  title: "Zásady ochrany osobních údajů",
  description:
    "Informace týkající se zpracování osobních údajů v souladu s GDPR.",
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <main id="main" className="pt-32 pb-24 md:pt-40 md:pb-32 px-4 md:px-8">
      <div className="max-w-[900px] mx-auto bg-cream text-accent p-8 md:p-16 rounded-[3rem] border-[3px] border-accent shadow-[-6px_6px_0px_var(--color-accent)]">
        <h1 className="font-display text-[clamp(2.5rem,5vw,4rem)] uppercase leading-[0.9] mb-10">
          Zásady ochrany osobních údajů
        </h1>

        <div className="space-y-6 font-body text-lg md:text-xl font-medium text-[oklch(17.8%_0.01_88.8_/_0.85)]">
          <p>
            Tým volební kampaně Radka Sáblíka Vám tímto poskytuje informace
            týkající se zpracování Vašich osobních údajů v souladu s Nařízením
            Evropského parlamentu a Rady (EU) č. 2016/679, o ochraně fyzických
            osob v souvislosti se zpracováním osobních údajů a o volném pohybu
            těchto údajů a o zrušení směrnice 95/46/ES (obecné nařízení o
            ochraně osobních údajů), (dále jen „GDPR“).
          </p>

          <p>
            Tyto zásady se týkají ochrany osobních údajů fyzických osob v
            souvislosti s jejich zpracováním a jsou účinné od 14. června 2026.
          </p>

          <h2 className="font-display text-[clamp(2rem,4vw,3rem)] uppercase leading-[0.9] text-accent mt-16 mb-6">
            I. Správce
          </h2>

          <p>
            Správcem Vašich osobních údajů je tým volební kampaně Radka Sáblíka.
            V záležitostech správy Vašich údajů nás můžete kontaktovat
            prostřednictvím:
          </p>
          <ul className="list-disc pl-8 space-y-2 marker:text-accent">
            <li>
              e-mailové adresy:{" "}
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="text-accent underline underline-offset-4 hover:opacity-80 transition-opacity"
              >
                {CONTACT_EMAIL}
              </a>
              ,
            </li>
            <li>
              písemně na adrese:{" "}
              <strong>
                Oblastní sdružení ODS Praha 5, Janáčkovo nábřeží 1211/11, Praha
                - Smíchov 150 00
              </strong>
              .
            </li>
          </ul>

          <h2 className="font-display text-[clamp(2rem,4vw,3rem)] uppercase leading-[0.9] text-accent mt-16 mb-6">
            II. Jaké osobní údaje zpracováváme?
          </h2>

          <p>
            Zpracováváme osobní údaje v rámci plnění předmětu naší činnosti v
            souladu s obecně závaznými právními předpisy. Jedná se zejm. o
            osobní údaje smluvních partnerů, dárců, dobrovolníků, podporovatelů,
            odběratelů newsletteru, jakož i dalších osob, které si přejí být v
            kontaktu s kampaní Radka Sáblíka.
          </p>
          <p>Zpracovávanými osobními údaji jsou:</p>
          <ul className="list-disc pl-8 space-y-2 marker:text-accent">
            <li>
              <strong>základní osobní identifikační údaje:</strong> jméno,
              příjmení, titul, datum narození, trvalé bydliště, podpis,
            </li>
            <li>
              <strong>kontaktní údaje:</strong> korespondenční adresa, e-mail,
              telefonní číslo, adresa na sociální síti,
            </li>
            <li>
              <strong>
                údaje související s plněním smluvního vztahu vč. poskytnutí
                daru:
              </strong>{" "}
              IČO, DIČ, adresa sídla nebo místa podnikání, fakturační adresa,
              bankovní spojení,
            </li>
            <li>
              <strong>další osobní údaje</strong>, které nám poskytnete na
              základě Vašeho souhlasu (např. pro účely zasílání newsletterů v
              rámci volební kampaně nebo při zapojení do kampaně jako
              dobrovolník).
            </li>
          </ul>
          <p>
            Zpracování Vašich osobních údajů probíhá manuálně, jakož i zcela
            nebo částečně automatizovaně.
          </p>

          <h2 className="font-display text-[clamp(2rem,4vw,3rem)] uppercase leading-[0.9] text-accent mt-16 mb-6">
            III. K jakým účelům zpracováváme Vaše osobní údaje, jaký k tomu máme
            důvod a jak dlouho Vaše osobní údaje ukládáme?
          </h2>

          <p>
            Rozsah zpracování Vašich osobních údajů a lhůta jejich uložení
            závisí na účelu, pro který jsou zpracovávány, a na právním důvodu
            jejich zpracování. Vaše osobní údaje zpracováváme vždy jen po dobu
            nezbytnou pro splnění účelu zpracování. Vaše osobní údaje mohou být
            následně uloženy po dobu, po kterou takovou povinnost ukládají
            obecně závazné právní předpisy, nebo po dobu nezbytnou pro hájení
            našich oprávněných zájmů nebo třetí osoby. Uložení Vašich osobních
            údajů probíhá vždy v souladu s GDPR a obecně závaznými právními
            předpisy.
          </p>

          <h3 className="font-bold text-2xl text-accent mt-10 mb-4">
            1. Zpracování osobních údajů z důvodu plnění zákonné povinnosti,
            smluvní povinnosti nebo hájení oprávněných zájmů
          </h3>
          <p>
            Zpracováváme Vaše osobní údaje z důvodu plnění povinností, které nám
            ukládají obecně závazné právní předpisy. Může se jednat o povinnosti
            stanovené volebními zákony, účetními a daňovými zákony, aj.
          </p>
          <p>
            Pokud jste s námi uzavřel(a) smlouvu (darovací, dobrovolnickou aj.),
            zpracováváme Vaše osobní údaje z důvodu naplnění účelu takové
            smlouvy.
          </p>
          <p>
            Zpracováváme Vaše osobní údaje také v tom případě, že je jejich
            zpracování nezbytné z důvodu našich oprávněných zájmů či třetí
            strany nebo k výkonu práv, které nám přiznávají obecně závazné
            právní předpisy.
          </p>

          <h3 className="font-bold text-2xl text-accent mt-10 mb-4">
            2. Zpracování osobních údajů z důvodu Vaší registrace jako
            podporovatel či dobrovolník
          </h3>
          <p>
            Pokud jste se registroval(a) jako podporovatel nebo dobrovolník
            volební kampaně Radka Sáblíka, zpracováváme Vaše osobní údaje za
            účelem:
          </p>
          <ul className="list-disc pl-8 space-y-2 marker:text-accent">
            <li>
              zajištění Vašeho optimálního zapojení se do volební kampaně a
              souvisejících akcí,
            </li>
            <li>koordinace dobrovolnických aktivit a komunikace s Vámi.</li>
          </ul>
          <p>
            Právním důvodem pro zpracování Vašich osobních údajů o jménu,
            příjmení, místu bydliště a e-mailové adrese (vč. dalších kontaktních
            údajů) je skutečnost, že jste naším podporovatelem či dobrovolníkem.
            Po dobu, po kterou budete zapojeni do kampaně, souhlasíte fakticky
            se zpracováním těchto svých osobních údajů uvedenými způsoby. Ve
            zbývajícím rozsahu je právním důvodem zpracování Vašich osobních
            údajů pro uvedené účely Váš výslovný souhlas.
          </p>

          <h3 className="font-bold text-2xl text-accent mt-10 mb-4">
            3. Zpracování osobních údajů na základě Vašeho souhlasu
          </h3>
          <p>
            Pokud jste nám udělil(a) souhlas se zpracováním Vašich osobních
            údajů, zpracováváme Vaše osobní údaje pro konkrétní účel nebo účely,
            se kterým(i) jste souhlasil(a).
          </p>
          <p>
            Může se jednat např. o zasílání informací a novinek prostřednictvím
            SMS zpráv nebo e-mailem (např. newslettery z volební kampaně) či o
            marketingové účely.
          </p>
          <p>
            Pokud je zpracování Vašich osobních údajů založeno na Vašem
            dobrovolném souhlasu, máte právo svůj souhlas kdykoli odvolat.
          </p>
          <p>
            Odvoláním souhlasu není dotčena zákonnost zpracování vycházejícího
            ze souhlasu, který byl dán před jeho odvoláním, ani zákonnost
            zpracování založená jiným právním důvodem než je Váš dobrovolný
            souhlas.
          </p>

          <h2 className="font-display text-[clamp(2rem,4vw,3rem)] uppercase leading-[0.9] text-accent mt-16 mb-6">
            IV. Komu předáváme Vaše osobní údaje?
          </h2>

          <p>
            Zpracování osobních údajů je zajišťováno pověřenými členy týmu
            volební kampaně Radka Sáblíka i externími osobami, které pro nás
            vykonávají činnosti související se zajištěním chodu kampaně.
          </p>
          <p>
            K e-mailovému rozesílání informací a novinek využíváme různé
            nástroje. V případě této webové stránky a kampaně využíváme
            platformu Resend (spravovanou společností Plus Five Five, Inc.). V
            případě, že jste příjemcem e-mailových informací a novinek,
            předáváme této společnosti za uvedeným účelem Váš elektronický
            kontakt (Vaši e-mailovou adresu).
          </p>
          <p>
            Pro měření návštěvnosti a výkonu webu využíváme služby Vercel
            Analytics a Vercel Speed Insights (spravované společností Vercel
            Inc.). Tyto nástroje nám pomáhají pochopit, jak je web využíván, a
            zlepšovat jeho rychlost a dostupnost. Zpracovávaná data jsou
            agregovaná a nejsou využívána k reklamním účelům.
          </p>
          <p>
            Pokud dochází ke zpracování Vašich osobních údajů externími osobami,
            jsou tito zpracovatelé oprávněni zpracovávat Vaše údaje pouze v
            rámci našich pokynů a k účelům, k nimž jsme oprávněni Vaše údaje
            zpracovávat my. Jinými způsoby nebo k jiným účelům nejsou externí
            osoby oprávněny Vaše údaje využít.
          </p>
          <p>
            K předávání Vašich osobních údajů dochází také v rámci plnění
            povinností, které nám ukládají obecně závazné právní předpisy, a to
            úřadům nebo orgánům uvedeným v těchto předpisech.
          </p>

          <h2 className="font-display text-[clamp(2rem,4vw,3rem)] uppercase leading-[0.9] text-accent mt-16 mb-6">
            V. Soubory cookies a data z webu
          </h2>

          <p>
            Při vstupu na naše webové stránky jsou shromažďována data pro
            statistické účely, zejm. pro sledování aktivity uživatelů našich
            webových stránek a jejich zájem o jednotlivé podstránky. Data mohou
            obsahovat anonymizované síťové identifikátory, datum a čas návštěvy
            a konkrétní URL adresu, na níž jste se připojili. Všechna takto
            získaná data využíváme výhradně ke zlepšování našich stránek a
            nejsou využívána pro reklamní účely.
          </p>
          <p>
            Naše webové stránky mohou používat soubory cookies a podobné
            technologie. Technické cookies jsou nezbytné pro správné fungování
            webu a zpracováváme je v souladu s GDPR vždy. Analytické údaje
            získáváme prostřednictvím služby Vercel Analytics za účelem
            zlepšování webu; tato služba pracuje s agregovanými údaji o
            návštěvnosti a nevyužívá je k cílení reklam. Nastavení cookies
            můžete kdykoliv upravit v prohlížeči.
          </p>
          <p>Marketingové cookies na tomto webu nepoužíváme.</p>

          <h2 className="font-display text-[clamp(2rem,4vw,3rem)] uppercase leading-[0.9] text-accent mt-16 mb-6">
            VI. Jaká máte práva v souvislosti se zpracováním Vašich osobních
            údajů?
          </h2>

          <p>V souvislosti se zpracováním Vašich osobních údajů máte právo:</p>
          <ul className="list-disc pl-8 space-y-2 marker:text-accent mb-6">
            <li>na přístup ke svým osobním údajům,</li>
            <li>na jejich opravu a výmaz,</li>
            <li>na omezení zpracování,</li>
            <li>
              na oznámení správce ohledně opravy, výmazu nebo omezení zpracování
              osobních údajů,
            </li>
            <li>na přenositelnost údajů,</li>
            <li>vznést námitku proti zpracování,</li>
            <li>
              nebýt předmětem žádného rozhodnutí založeného výhradně na
              automatizovaném zpracování, včetně profilování,
            </li>
            <li>
              podat stížnost u Úřadu pro ochranu osobních údajů jakožto
              dozorového orgánu.
            </li>
          </ul>
          <p>
            To vše za podmínek stanovených GDPR a obecně závaznými právními
            předpisy.
          </p>
          <p>
            V případě zpracování založeného na Vašem dobrovolném souhlasu máte
            právo tento souhlas kdykoli odvolat, čímž však není dotčena
            zákonnost zpracování založená na souhlasu uděleném před jeho
            odvoláním.
          </p>
        </div>
      </div>
    </main>
  );
}
