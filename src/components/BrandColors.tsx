"use client";

import { useEffect, useRef, useState } from "react";

type BrandColorsProps = {
  /** Tuples of [name, hex, usage] to render as click-to-copy rows. */
  colors: ReadonlyArray<readonly [string, string, string]>;
};

/** Click-to-copy swatch list for the Pro média brand kit. */
export default function BrandColors({ colors }: BrandColorsProps) {
  const [copiedHex, setCopiedHex] = useState<string | null>(null);
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (resetTimer.current) clearTimeout(resetTimer.current);
    };
  }, []);

  const copy = async (hex: string) => {
    try {
      await navigator.clipboard.writeText(hex);
      setCopiedHex(hex);
      if (resetTimer.current) clearTimeout(resetTimer.current);
      resetTimer.current = setTimeout(() => setCopiedHex(null), 2000);
    } catch (error) {
      console.error("Failed to copy color:", error);
    }
  };

  return (
    <ul className="list-none p-0 space-y-2">
      {colors.map(([name, hex, usage]) => (
        <li key={hex}>
          <button
            type="button"
            onClick={() => copy(hex)}
            aria-label={`Zkopírovat ${hex}`}
            title={`Kliknutím zkopírujete ${hex}`}
            className="flex items-center gap-3 cursor-pointer text-left bg-transparent border-none p-0 font-medium group"
          >
            <span
              className="inline-block w-8 h-8 rounded-lg border-[2px] border-accent/20 shrink-0 group-hover:border-accent transition-colors"
              style={{ backgroundColor: hex }}
              aria-hidden="true"
            />
            <span>
              <strong>{name}</strong> –{" "}
              <code className="underline underline-offset-4 decoration-accent/30 group-hover:decoration-accent transition-colors">
                {hex}
              </code>{" "}
              <span aria-live="polite">
                {copiedHex === hex ? (
                  <span className="font-bold text-green">Zkopírováno ✓</span>
                ) : (
                  <>({usage})</>
                )}
              </span>
            </span>
          </button>
        </li>
      ))}
    </ul>
  );
}
