import Image from "next/image";

export default function Books() {
  return (
    <section
      id="knihy"
      className="section bg-cream relative overflow-hidden border-t-[3px] border-accent/10"
    >
      <div className="container relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-16">
          <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left w-full">
            <h2 className="font-display font-bold text-[clamp(2.5rem,6vw,4rem)] text-accent uppercase leading-[0.95] mb-6">
              Přečtěte si moje knihy
            </h2>
            <p className="font-body text-[clamp(1.125rem,2vw,1.35rem)] text-[oklch(17.8%_0.01_88.8_/_0.8)] font-medium leading-[1.5] max-w-[36rem] mb-6 lg:mb-8">
              Kromě školství se dlouhodobě věnuji i psaní. Napsal jsem mnoho
              knih a textů – od odborných publikací o budoucnosti vzdělávání až
              po trilogii o holokaustu, kterou se snažím přiblížit tuto těžkou
              historii mladé generaci.
            </p>
            <p className="font-body font-bold text-[1.1rem] text-accent mb-0 lg:mb-4">
              Klikněte na obálku a <br className="block sm:hidden" />
              přečtěte si ukázku v PDF<span className="lg:hidden">:</span>
              <span className="hidden lg:inline"> &rarr;</span>
            </p>
          </div>

          <div className="flex-1 w-full flex flex-col sm:flex-row justify-center items-center sm:items-start gap-8 lg:gap-12">
            <a
              href="/assets/kniha.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="relative flex flex-col items-center gap-4 no-underline"
            >
              <div className="relative w-[200px] md:w-[240px] aspect-[5/7] rounded-xl shadow-[-10px_10px_20px_rgba(0,0,0,0.15)]">
                <Image
                  src="/images/kniha-jedna.webp"
                  alt="Kniha Učit jde i jinak (2018)"
                  fill
                  className="object-cover rounded-xl"
                  sizes="(max-width: 768px) 200px, 240px"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent w-4 rounded-l-xl" />
              </div>
              <span className="font-body font-bold text-accent text-center max-w-[200px]">
                Učit jde i jinak <span className="font-normal">(2018)</span>
              </span>
            </a>

            <a
              href="/assets/kniha2.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="relative flex flex-col items-center gap-4 no-underline"
            >
              <div className="relative w-[200px] md:w-[240px] aspect-[5/7] rounded-xl shadow-[-10px_10px_20px_rgba(0,0,0,0.15)]">
                <Image
                  src="/images/kniha-dve.webp"
                  alt="Kniha Učit jde i jinak 2 (2026)"
                  fill
                  className="object-cover rounded-xl"
                  sizes="(max-width: 768px) 200px, 240px"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent w-4 rounded-l-xl" />
              </div>
              <div className="flex flex-col items-center gap-1">
                <span className="font-body font-bold text-accent text-center max-w-[200px]">
                  Učit jde i jinak 2 <span className="font-normal">(2026)</span>
                </span>
                <span className="font-body text-sm text-[oklch(17.8%_0.01_88.8_/_0.7)] text-center max-w-[220px] leading-tight">
                  Pouze náhled, kniha bude brzy dostupná k zakoupení.
                </span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
