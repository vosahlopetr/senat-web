import Image from "next/image";
import { SOCIAL_LINKS } from "@/lib/site-config";

export default function Social() {
  const socials = SOCIAL_LINKS;

  return (
    <section
      id="social"
      className="py-12 md:py-16 lg:py-20 relative flex justify-center items-center overflow-hidden"
    >
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/social.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>
      <div className="container relative z-10">
        <div className="bg-cream border-[3px] border-accent shadow-[-6px_6px_0px_var(--color-accent)] rounded-[32px] p-8 md:p-10 max-w-[44rem] mx-auto text-accent">
          <h2 className="font-display font-bold text-[clamp(3rem,8vw,4.25rem)] leading-[0.95] text-accent mb-4 uppercase">
            Sledujte Sáblíka <br className="lg:hidden" aria-hidden="true" />
            na sítích
          </h2>
          <p className="font-body text-[clamp(1.125rem,2vw,1.35rem)] leading-[1.5] text-accent mb-10 max-w-[36rem] font-medium">
            Přidej se ke stovkám lidí, kteří už naši kampaň aktivně sledují.
            Zapoj se do diskuze a buď u toho s námi.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {socials.map((social, index) => (
              <a
                key={social.label}
                href={social.href}
                className={`flex items-center justify-center py-4 px-6 font-body font-bold text-base tracking-[0.05em] uppercase text-accent no-underline border-[2px] border-accent rounded-full transition-all duration-150 bg-transparent hover:bg-accent hover:text-cream focus-visible:bg-accent focus-visible:text-cream ${
                  index === socials.length - 1 && socials.length % 2 !== 0
                    ? "md:col-span-2 md:w-[calc(50%-0.5rem)] md:mx-auto"
                    : ""
                }`}
              >
                {social.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
