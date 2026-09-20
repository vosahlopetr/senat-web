"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useDialog } from "./useDialog";
import { type DistrictPin, CATEGORY_META } from "@/content/district-map";

type DistrictPinModalProps = {
  pin: DistrictPin | null;
  onClose: () => void;
};

export default function DistrictPinModal({
  pin,
  onClose,
}: DistrictPinModalProps) {
  const { dialogRef, setOpen, close, handleBackdropClick } = useDialog({
    onClose,
  });

  useEffect(() => {
    if (pin) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [pin, setOpen]);

  if (!pin) return null;

  const meta = CATEGORY_META[pin.category];

  return (
    <dialog
      ref={dialogRef}
      className="m-auto p-0 border-none bg-transparent max-w-[95vw] md:max-w-[42rem] w-full max-h-[92vh] overflow-y-auto backdrop:bg-black/60 backdrop:backdrop-blur-sm outline-none"
      onClick={handleBackdropClick}
      aria-labelledby="district-pin-modal-title"
      aria-describedby="district-pin-modal-subtitle"
    >
      <div className="bg-cream border-[3px] border-accent rounded-[24px] md:rounded-[32px] p-6 pt-10 md:p-8 md:pt-8 relative text-accent shadow-[-8px_8px_0px_var(--color-accent)] focus:outline-none w-full box-border">
        {/* Close button */}
        <button
          type="button"
          className="absolute top-3 right-3 md:top-4 md:right-4 w-11 h-11 flex items-center justify-center text-3xl md:text-4xl font-bold leading-none text-accent bg-transparent border-none cursor-pointer p-0 hover:opacity-70 focus-visible:outline focus-visible:outline-3 focus-visible:outline-accent rounded-full transition-opacity z-10"
          aria-label="Zavřít detail místa"
          onClick={close}
        >
          &times;
        </button>

        <div className="flex flex-col gap-6">
          {/* Header */}
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${meta.badgeClass}`}
              >
                <span
                  className={`w-2 h-2 rounded-full ${meta.dotClass}`}
                  aria-hidden="true"
                />
                {meta.label}
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-accent/10 text-accent border border-accent/20">
                {pin.district}
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-accent/60">
                {pin.quarter}
              </span>
            </div>

            <h3
              id="district-pin-modal-title"
              className="font-display text-[clamp(1.85rem,4.5vw,2.5rem)] uppercase leading-[0.95] text-accent m-0 mb-2"
            >
              {pin.name}
            </h3>
            <p
              id="district-pin-modal-subtitle"
              className="font-body font-semibold text-base md:text-lg text-accent/80 m-0"
            >
              {pin.subtitle}
            </p>
          </div>

          {/* Hear quote card */}
          <div className="p-4 md:p-5 rounded-2xl bg-white/70 border-[2px] border-accent/15 space-y-2">
            <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.08em] text-accent/70">
              <svg
                className="w-4 h-4 text-accent"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
              Co od vás slýchám v ulicích
            </span>
            <p className="font-body text-base md:text-lg leading-relaxed text-accent m-0 italic">
              „{pin.hear}“
            </p>
          </div>

          {/* Push commitment card */}
          <div className="p-4 md:p-5 rounded-2xl bg-green/15 border-[2px] border-green/30 space-y-2">
            <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.08em] text-[#1e5822]">
              <svg
                className="w-4 h-4 text-[#1e5822]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Za co se budu jako senátor bít
            </span>
            <p className="font-body text-base md:text-lg font-medium leading-relaxed text-accent m-0">
              {pin.push}
            </p>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-[0.08em] text-accent/60 m-0">
              Podrobnější souvislosti
            </h4>
            <p className="font-body text-sm md:text-base leading-relaxed text-accent/85 m-0">
              {pin.description}
            </p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 pt-1 border-t border-accent/10">
            {pin.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 rounded-md text-xs font-medium bg-accent/5 text-accent/75 border border-accent/10"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-accent/15">
            <a
              href={pin.mapyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-accent hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent rounded py-1 px-1"
            >
              <svg
                className="w-4 h-4 text-accent"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              Otevřít na Mapy.cz ↗
            </a>

            <div className="flex items-center gap-2">
              {pin.programAnchor && (
                <Link
                  href={pin.programAnchor}
                  onClick={close}
                  className="btn btn-secondary btn-sm !text-xs !py-2 !px-4"
                >
                  Cíl v programu
                </Link>
              )}
              <button
                type="button"
                onClick={close}
                className="btn btn-primary btn-sm !text-xs !py-2 !px-4"
              >
                Rozumím
              </button>
            </div>
          </div>
        </div>
      </div>
    </dialog>
  );
}
