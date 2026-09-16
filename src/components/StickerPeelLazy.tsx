"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { StickerPeelProps } from "./Sticker";

// GSAP + Draggable are only worth loading for the interactive peel effect,
// so the real component stays out of the initial bundle.
const StickerPeel = dynamic(() => import("./Sticker"), { ssr: false });

/**
 * Defers the GSAP-powered StickerPeel until the sticker nears the viewport,
 * and skips it entirely for users who prefer reduced motion. Until (or
 * unless) the interactive version loads, a static image renders in the same
 * spot so there is no layout or visual shift.
 */
export default function StickerPeelLazy(props: StickerPeelProps) {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const [loadInteractive, setLoadInteractive] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setLoadInteractive(true);
          observer.disconnect();
        }
      },
      { rootMargin: "600px" },
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  if (loadInteractive) {
    return <StickerPeel {...props} />;
  }

  const {
    imageSrc,
    imageWidth,
    imageHeight,
    sizes,
    className = "",
    rotate = 30,
    peelDirection = 0,
  } = props;

  return (
    <div ref={sentinelRef} className={`absolute ${className}`}>
      <Image
        src={imageSrc}
        alt=""
        width={imageWidth}
        height={imageHeight}
        sizes={sizes}
        className="block w-full h-auto select-none pointer-events-none"
        style={{ transform: `rotate(${rotate - peelDirection}deg)` }}
        aria-hidden="true"
      />
    </div>
  );
}
