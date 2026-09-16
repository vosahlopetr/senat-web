import React from "react";
import Image from "next/image";

const PRO = [
  {
    name: "Česko",
    src: "https://upload.wikimedia.org/wikipedia/commons/c/cb/Flag_of_the_Czech_Republic.svg",
  },
  {
    name: "EU",
    src: "https://upload.wikimedia.org/wikipedia/commons/b/b7/Flag_of_Europe.svg",
  },
  {
    name: "NATO",
    src: "https://upload.wikimedia.org/wikipedia/commons/3/37/Flag_of_NATO.svg",
  },
  {
    name: "Ukrajina",
    src: "https://upload.wikimedia.org/wikipedia/commons/4/49/Flag_of_Ukraine.svg",
  },
  {
    name: "Tchaj-wan",
    src: "https://upload.wikimedia.org/wikipedia/commons/7/72/Flag_of_the_Republic_of_China.svg",
  },
  {
    name: "LGBTQIA+",
    src: "https://upload.wikimedia.org/wikipedia/commons/4/48/Gay_Pride_Flag.svg",
  },
];

const ANTI = [
  {
    name: "Rusko",
    src: "https://upload.wikimedia.org/wikipedia/commons/f/f3/Flag_of_Russia.svg",
  },
  {
    name: "Čína",
    src: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Flag_of_the_People%27s_Republic_of_China.svg",
  },
  {
    name: "Írán",
    src: "https://upload.wikimedia.org/wikipedia/commons/c/ca/Flag_of_Iran.svg",
  },
];

export default function Geopolitics() {
  return (
    <div className="mt-12 border-[3px] border-accent rounded-[2rem] overflow-hidden flex flex-col shadow-[-6px_6px_0px_var(--color-accent)]">
      {/* PRO SECTION */}
      <div className="bg-cream p-8 md:p-12 flex flex-col md:flex-row items-center gap-8">
        <div className="md:w-1/3 text-center md:text-left">
          <h3 className="font-display text-[clamp(3rem,6vw,5rem)] uppercase font-bold text-accent leading-[0.8]">
            PRO
          </h3>
          <p className="mt-4 font-bold text-accent/60 uppercase tracking-widest text-sm">
            Demokracii a svobodu
          </p>
        </div>
        <div className="md:w-2/3 flex flex-wrap gap-4 md:gap-6 justify-center md:justify-end">
          {PRO.map((item) => (
            <div key={item.name} className="flex flex-col items-center gap-3">
              <div className="w-20 h-14 md:w-28 md:h-20 rounded-lg overflow-hidden border-[2px] border-accent/10 shadow-sm">
                <Image
                  src={item.src}
                  alt={`Vlajka ${item.name}`}
                  width={112}
                  height={80}
                  unoptimized
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-accent">
                {item.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ANTI SECTION */}
      <div className="bg-accent p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 border-t-[3px] border-accent">
        <div className="md:w-1/3 order-1 md:order-2 text-center md:text-right">
          <h3 className="font-display text-[clamp(3rem,6vw,5rem)] uppercase font-bold text-cream leading-[0.8]">
            PROTI
          </h3>
          <p className="mt-4 font-bold text-cream/60 uppercase tracking-widest text-sm">
            Diktaturám a teroru
          </p>
        </div>
        <div className="md:w-2/3 order-2 md:order-1 flex flex-wrap gap-4 md:gap-6 justify-center md:justify-start">
          {ANTI.map((item) => (
            <div key={item.name} className="flex flex-col items-center gap-3">
              <div className="w-20 h-14 md:w-28 md:h-20 rounded-lg overflow-hidden border-[2px] border-cream/20 relative">
                <Image
                  src={item.src}
                  alt={`Vlajka ${item.name}`}
                  width={112}
                  height={80}
                  unoptimized
                  className="w-full h-full object-cover grayscale opacity-40"
                />
                <div className="absolute inset-0 pointer-events-none">
                  <svg
                    className="w-full h-full text-red-500 drop-shadow-sm"
                    preserveAspectRatio="none"
                    viewBox="0 0 100 100"
                  >
                    <line
                      x1="0"
                      y1="0"
                      x2="100"
                      y2="100"
                      stroke="currentColor"
                      strokeWidth="6"
                      vectorEffect="non-scaling-stroke"
                    />
                    <line
                      x1="100"
                      y1="0"
                      x2="0"
                      y2="100"
                      stroke="currentColor"
                      strokeWidth="6"
                      vectorEffect="non-scaling-stroke"
                    />
                  </svg>
                </div>
              </div>
              <span className="text-[10px] md:text-xs font-bold uppercase tracking-wider text-cream/50">
                {item.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
