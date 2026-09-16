"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type CopyTextButtonProps = {
  /** The exact text written to the clipboard. */
  text: string;
  /** Button label; defaults to „Zkopírovat text". */
  label?: string;
};

/** Underlined text button that copies `text` to the clipboard. */
export default function CopyTextButton({
  text,
  label = "Zkopírovat text",
}: CopyTextButtonProps) {
  const [copied, setCopied] = useState(false);
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (resetTimer.current) clearTimeout(resetTimer.current);
    };
  }, []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      if (resetTimer.current) clearTimeout(resetTimer.current);
      resetTimer.current = setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy text:", error);
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      aria-live="polite"
      className="cursor-pointer bg-transparent border-none p-0 inline-flex items-center gap-1.5 text-base font-bold text-accent hover:opacity-80 transition-opacity"
    >
      {copied ? (
        <span className="text-green">Zkopírováno ✓</span>
      ) : (
        <>
          <span className="underline underline-offset-4 decoration-2">
            {label}
          </span>
          <Image
            src="/images/icon-copy.svg"
            alt=""
            width={14}
            height={15}
            aria-hidden="true"
            className="inline-block select-none"
          />
        </>
      )}
    </button>
  );
}
