"use client";

import { useId } from "react";
import Link from "next/link";

interface ElectionStickerProps {
  className?: string;
}

/**
 * Election number sticker ("VOLTE ČÍSLO 6").
 * Designed as a large, bold campaign vinyl sticker that floats
 * over hero content without affecting layout flow.
 * Clicking navigates to the "Volební lístek č. 6" section on the /jak-volit page.
 */
export default function ElectionSticker({
  className = "",
}: ElectionStickerProps) {
  const rawId = useId();
  const id = rawId.replace(/[^a-zA-Z0-9_-]/g, "");

  const hasDisplayClass =
    /(?:^|\s)(?:hidden|block|inline-block|inline|flex|grid)(?:\s|$)/.test(
      className,
    );
  const displayClass = hasDisplayClass ? "" : "inline-block ";

  const topArcId = `sticker-top-arc-${id}`;
  const bottomArcId = `sticker-bottom-arc-${id}`;
  const yellowGradId = `sticker-yellow-grad-${id}`;
  const sheenGradId = `sticker-sheen-grad-${id}`;
  const shadowId = `sticker-shadow-${id}`;

  return (
    <Link
      href="/jak-volit#volebni-listek"
      aria-label="Volte číslo 6 – Radko Sáblík do Senátu. Jak volit"
      title="Volte číslo 6 – jak volit"
      className={`${displayClass}select-none focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-accent rounded-full cursor-pointer ${className}`.trim()}
    >
      <div className="relative transform-gpu -rotate-6 md:-rotate-8">
        <svg
          viewBox="0 0 180 180"
          className="w-[115px] h-[115px] sm:w-[130px] sm:h-[130px] md:w-[145px] md:h-[145px] lg:w-[160px] lg:h-[160px] xl:w-[175px] xl:h-[175px] overflow-visible"
          aria-hidden="true"
        >
          <defs>
            {/* Top text curve: left-to-right clockwise arc (radius 55 from center 90,90) */}
            <path id={topArcId} d="M 35,90 A 55,55 0 0,1 145,90" fill="none" />
            {/* Bottom text curve: left-to-right counter-clockwise arc (radius 70 from center 90,90, text is upright) */}
            <path
              id={bottomArcId}
              d="M 20,90 A 70,70 0 0,0 160,90"
              fill="none"
            />

            {/* Neo-brutalist sharp hard drop shadow */}
            <filter id={shadowId} x="-30%" y="-30%" width="170%" height="170%">
              <feDropShadow
                dx="-5"
                dy="5"
                stdDeviation="0"
                floodColor="#13110C"
                floodOpacity="1"
              />
            </filter>

            {/* Sticker background gradient: rich luminous campaign yellow */}
            <linearGradient
              id={yellowGradId}
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#FFF066" />
              <stop offset="45%" stopColor="#FFDE43" />
              <stop offset="100%" stopColor="#F5C400" />
            </linearGradient>

            {/* Glossy vinyl sheen overlay */}
            <linearGradient
              id={sheenGradId}
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.4" />
              <stop offset="35%" stopColor="#ffffff" stopOpacity="0.1" />
              <stop offset="55%" stopColor="#ffffff" stopOpacity="0" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0.08" />
            </linearGradient>
          </defs>

          {/* Group carrying the sharp shadow filter */}
          <g filter={`url(#${shadowId})`}>
            {/* Main sticker disc with bold neo-brutalist border */}
            <circle
              cx="90"
              cy="90"
              r="80"
              fill={`url(#${yellowGradId})`}
              stroke="#13110C"
              strokeWidth="4"
            />

            {/* Vinyl gloss reflection */}
            <circle
              cx="90"
              cy="90"
              r="78"
              fill={`url(#${sheenGradId})`}
              pointerEvents="none"
            />

            {/* Top curved text: VOLTE ČÍSLO */}
            <text
              fontFamily="var(--font-graph-condensed), Impact, 'Arial Narrow', sans-serif"
              fontWeight="bold"
              fontSize="21"
              letterSpacing="0.08em"
              fill="#13110C"
              className="uppercase select-none"
            >
              <textPath
                href={`#${topArcId}`}
                startOffset="50%"
                textAnchor="middle"
              >
                VOLTE ČÍSLO
              </textPath>
            </text>

            {/* Bottom curved text: VOLTE ČÍSLO */}
            <text
              fontFamily="var(--font-graph-condensed), Impact, 'Arial Narrow', sans-serif"
              fontWeight="bold"
              fontSize="22"
              letterSpacing="0.19em"
              fill="#13110C"
              className="uppercase select-none"
            >
              <textPath
                href={`#${bottomArcId}`}
                startOffset="50%"
                textAnchor="middle"
              >
                VOLTE ČÍSLO
              </textPath>
            </text>

            {/* Candidate election number 6 - iconic display numeral centered in circle */}
            <text
              x="90"
              y="129"
              textAnchor="middle"
              fontFamily="var(--font-graph-condensed), Impact, 'Arial Narrow', sans-serif"
              fontWeight="bold"
              fontSize="108"
              fill="#13110C"
              className="select-none"
            >
              6
            </text>
          </g>
        </svg>
      </div>
    </Link>
  );
}
