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
            Tímto Vám poskytujeme informace týkající se zpracování Vašich
            osobních údajů v souladu s Nařízením Evropského parlamentu a Rady
            (EU) č. 2016/679, o ochraně fyzických osob v souvislosti se
            zpracováním osobních údajů a o volném pohybu těchto údajů a o
            zrušení směrnice 95/46/ES (obecné nařízení o ochraně osobních
            údajů), (dále jen „GDPR“).
          </p>

          <p>
            Tyto zásady se týkají ochrany osobních údajů fyzických osob v
            souvislosti s jejich zpracováním a jsou účinné od 14. června 2026.
          </p>

          <h2 className="font-display text-[clamp(2rem,4vw,3rem)] uppercase leading-[0.9] text-accent mt-16 mb-6">
            I. Správce
          </h2>

          <p>
            Správcem Vašich osobních údajů je kandidát do Senátu Parlamentu ČR{" "}
            <strong>Ing. Radko Sáblík</strong> V záležitostech správy a ochrany
            Vašich údajů nás můžete kontaktovat prostřednictvím:
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
            Zpracováváme osobní údaje v rámci volební kampaně v souladu s obecně
            závaznými právními předpisy. Jedná se zejm. o osobní údaje smluvních
            partnerů, dárců, dobrovolníků, podporovatelů, odběratelů
            newsletteru, jakož i dalších osob, které vstoupily do kontaktu s
            kampaní Radka Sáblíka.
          </p>
          <p>Zpracovávanými osobními údaji jsou:</p>
          <ul className="list-disc pl-8 space-y-2 marker:text-accent">
            <li>
              <strong>základní identifikační údaje:</strong> jméno, příjmení,
              titul, datum narození, adresa trvalého bydliště, podpis,
            </li>
            <li>
              <strong>kontaktní údaje:</strong> korespondenční adresa, e-mail,
              telefonní číslo, profil na sociální síti,
            </li>
            <li>
              <strong>údaje související s financováním kampaně a dary:</strong>{" "}
              IČO, DIČ, fakturační adresa, číslo bankovního účtu, výše daru a
              veřejně vykazované údaje podle volebního zákona,
            </li>
            <li>
              <strong>další osobní údaje:</strong> údaje, které nám sami
              poskytnete (např. v registračním formuláři dobrovolníka či
              přihlášce k odběru newsletteru).
            </li>
          </ul>
          <p>
            Upozorňujeme, že registrace dobrovolníka, podpora či poskytnutí daru
            mohou vypovídat o Vašich politických názorech (zvláštní kategorie
            osobních údajů dle čl. 9 GDPR). Tyto údaje zpracováváme s maximálním
            důrazem na jejich ochranu, a to výhradně na základě Vašeho
            výslovného souhlasu (čl. 9 odst. 2 písm. a) GDPR) nebo v rámci
            legitimní politické činnosti (čl. 9 odst. 2 písm. d) GDPR).
          </p>
          <p>
            Zpracování osobních údajů probíhá manuálně i za využití
            automatizovaných nástrojů.
          </p>

          <h2 className="font-display text-[clamp(2rem,4vw,3rem)] uppercase leading-[0.9] text-accent mt-16 mb-6">
            III. K jakým účelům osobní údaje zpracováváme, na jakém právním
            základě a jak dlouho je uchováváme?
          </h2>

          <p>
            Rozsah zpracování a doba uložení údajů vychází z konkrétního účelu
            zpracování a odpovídajícího právního základu:
          </p>

          <h3 className="font-bold text-2xl text-accent mt-10 mb-4">
            1. Plnění zákonných povinností, smluv a ochrana oprávněných zájmů
          </h3>
          <p>
            Osobní údaje dárců a smluvních partnerů zpracováváme za účelem
            plnění povinností uložených volebními zákony (zejm. zákonem č.
            247/1995 Sb., o volbách do Parlamentu ČR), daňovými a účetními
            předpisy, a dále pro plnění darovacích a jiných smluv (čl. 6 odst. 1
            písm. b) a c) GDPR). Údaje můžeme zpracovávat i pro účely ochrany
            našich právních nároků (oprávněný zájem dle čl. 6 odst. 1 písm. f)
            GDPR).
          </p>
          <p>
            <strong>Doba uložení:</strong> Údaje o poskytnutých darech a účetní
            doklady uchováváme po dobu stanovenou právními předpisy (zpravidla 5
            až 10 let dle příslušných zákonů a požadavků dohledu Úřadu pro
            dohled nad hospodařením politických stran a politických hnutí).
          </p>

          <h3 className="font-bold text-2xl text-accent mt-10 mb-4">
            2. Zapojení podporovatelů a dobrovolníků
          </h3>
          <p>
            Pokud se zapojíte jako dobrovolník či podporovatel, zpracováváme
            Vaše identifikační a kontaktní údaje za účelem koordinace aktivit,
            komunikace a Vašeho zapojení do kampaně.
          </p>
          <p>
            Právním základem pro toto zpracování je realizace dobrovolnické
            spolupráce (čl. 6 odst. 1 písm. b) GDPR), oprávněný zájem správce na
            efektivním vedení kampaně (čl. 6 odst. 1 písm. f) GDPR) a Váš
            výslovný souhlas udělený při registraci (čl. 6 odst. 1 písm. a) a
            čl. 9 odst. 2 písm. a) GDPR).
          </p>
          <p>
            <strong>Doba uložení:</strong> Údaje uchováváme po dobu trvání
            volební kampaně a nejdéle 6 měsíců po jejím skončení za účelem
            jejího organizačního vypořádání, případně do okamžiku, kdy požádáte
            o ukončení spolupráce či odvoláte udělený souhlas.
          </p>

          <h3 className="font-bold text-2xl text-accent mt-10 mb-4">
            3. Zasílání novinek a newsletterů (souhlas se zpracováním)
          </h3>
          <p>
            Přihlásíte-li se k odběru novinek nebo nám udělíte souhlas se
            zasíláním informací e-mailem, zpracováváme Vaši e-mailovou adresu na
            základě Vašeho dobrovolného souhlasu (čl. 6 odst. 1 písm. a) GDPR).
          </p>
          <p>
            Svůj souhlas můžete kdykoli bezplatně odvolat prostřednictvím odkazů
            v patičce každého doručeného e-mailu nebo zprávou na{" "}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-accent underline underline-offset-4 hover:opacity-80 transition-opacity"
            >
              {CONTACT_EMAIL}
            </a>
            . Odvoláním souhlasu není dotčena zákonnost zpracování před jeho
            odvoláním.
          </p>
          <p>
            <strong>Doba uložení:</strong> Údaje uchováváme do odhlášení odběru,
            odvolání souhlasu nebo do ukončení volební kampaně.
          </p>

          <h2 className="font-display text-[clamp(2rem,4vw,3rem)] uppercase leading-[0.9] text-accent mt-16 mb-6">
            IV. Komu předáváme Vaše osobní údaje a předávání do zahraničí
          </h2>

          <p>
            K Vašim osobním údajům mají přístup pověření členové volebního týmu
            vázaní mlčenlivostí a prověření smluvní zpracovatelé:
          </p>
          <ul className="list-disc pl-8 space-y-2 marker:text-accent">
            <li>
              <strong>Rozesílání e-mailů:</strong> Využíváme platformu Resend
              (společnost Plus Five Five, Inc., USA). Pro tento účel je
              zpracovávána Vaše e-mailová adresa.
            </li>
            <li>
              <strong>Hosting a infrastruktura webu:</strong> Provoz a měření
              agregovaného výkonu zajišťuje služba Vercel (společnost Vercel
              Inc., USA).
            </li>
          </ul>
          <p>
            Vzhledem k tomu, že výše uvedené společnosti sídlí v USA, dochází k
            předávání osobních údajů do třetí země. Předávání probíhá plně v
            souladu s kapitolou V GDPR na základě rozhodnutí Evropské komise o
            odpovídající ochraně (rámec EU-US Data Privacy Framework) a
            standardních smluvních doložek (SCC) schválených Evropskou komisí.
          </p>
          <p>
            V případech stanovených zákonem předáváme osobní údaje také orgánům
            veřejné moci (např. Úřad pro dohled nad hospodařením politických
            stran a politických hnutí, finanční úřady).
          </p>

          <h2 className="font-display text-[clamp(2rem,4vw,3rem)] uppercase leading-[0.9] text-accent mt-16 mb-6">
            V. Soubory cookies a analytika
          </h2>

          <p>Na našich webových stránkách dbáme na ochranu Vašeho soukromí:</p>
          <ul className="list-disc pl-8 space-y-2 marker:text-accent">
            <li>
              <strong>Technické cookies:</strong> Nezbytné pro správné zobrazení
              a bezpečnost webu. Tyto cookies využíváme na základě oprávněného
              zájmu.
            </li>
            <li>
              <strong>Analytika návštěvnosti:</strong> Používáme Vercel
              Analytics a Vercel Speed Insights pro sledování technického výkonu
              webu. Tato řešení pracují výhradně s agregovanými a
              anonymizovanými daty a neslouží k identifikaci konkrétních
              návštěvníků.
            </li>
            <li>
              <strong>Marketingové a sledovací cookies:</strong> Na tomto webu{" "}
              <strong>nepoužíváme</strong> žádné marketingové ani profilovací
              cookies třetích stran.
            </li>
          </ul>

          <h2 className="font-display text-[clamp(2rem,4vw,3rem)] uppercase leading-[0.9] text-accent mt-16 mb-6">
            VI. Jaká máte práva v souvislosti se zpracováním?
          </h2>

          <p>Dle GDPR máte právo:</p>
          <ul className="list-disc pl-8 space-y-2 marker:text-accent mb-6">
            <li>požadovat přístup k Vašim zpracovávaným osobním údajům,</li>
            <li>požadovat opravu nepřesných či doplnění neúplných údajů,</li>
            <li>požadovat výmaz osobních údajů („právo být zapomenut“),</li>
            <li>požadovat omezení zpracování údajů,</li>
            <li>
              na přenositelnost údajů k jinému správci ve strukturovaném
              formátu,
            </li>
            <li>
              <strong>vznést námitku</strong> proti zpracování založenému na
              oprávněném zájmu,
            </li>
            <li>kdykoli odvolat udělený souhlas bez jakýchkoli sankcí,</li>
            <li>
              nebýt předmětem automatizovaného individuálního rozhodování ani
              profilování,
            </li>
            <li>
              podat stížnost u dozorového úřadu, kterým je{" "}
              <strong>Úřad pro ochranu osobních údajů</strong> (Pplk. Sochora
              27, 170 00 Praha 7, web:{" "}
              <a
                href="https://www.uoou.gov.cz"
                target="_blank"
                rel="noopener noreferrer" // doporučeno přidat noopener společně s noreferrer
                className="underline underline-offset-4 hover:opacity-80"
              >
                www.uoou.gov.cz
              </a>
              ).
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
}
