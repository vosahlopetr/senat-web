"use client";

/**
 * Adapted from React Bits' StickerPeel component (https://reactbits.dev).
 * Copyright (c) 2026 David Haz – MIT + Commons Clause License Condition v1.0
 * (https://github.com/DavidHDev/react-bits/blob/main/LICENSE.md). This notice
 * must be retained per the license.
 *
 * Local changes vs. upstream: next/image instead of <img>, static peel CSS
 * moved to globals.css (upstream injected an identical <style> block per
 * instance), drag rotation via gsap.quickTo instead of a tween per drag
 * tick, and unused props/CSS variables removed.
 */

import { useRef, useEffect, useId, CSSProperties } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";

gsap.registerPlugin(Draggable);

export interface StickerPeelProps {
  imageSrc: string;
  /** Intrinsic pixel dimensions of `imageSrc` (required by next/image). */
  imageWidth: number;
  imageHeight: number;
  /** `sizes` for next/image – describe the rendered width at the call site. */
  sizes: string;
  rotate?: number;
  peelBackHoverPct?: number;
  peelBackActivePct?: number;
  width?: number | string;
  lightingIntensity?: number;
  initialPosition?: "center" | { x: number; y: number };
  peelDirection?: number;
  className?: string;
}

/** Per-instance values consumed by the `.sticker-*` rules in globals.css. */
interface CSSVars extends CSSProperties {
  "--sticker-p"?: string;
  "--sticker-peelback-hover"?: string;
  "--sticker-peelback-active"?: string;
  "--sticker-start"?: string;
  "--sticker-end"?: string;
}

const STICKER_PADDING_PX = 12;

const StickerPeel: React.FC<StickerPeelProps> = ({
  imageSrc,
  imageWidth,
  imageHeight,
  sizes,
  rotate = 30,
  peelBackHoverPct = 30,
  peelBackActivePct = 40,
  width = 200,
  lightingIntensity = 0.1,
  initialPosition = "center",
  peelDirection = 0,
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const dragTargetRef = useRef<HTMLDivElement>(null);
  const pointLightRef = useRef<SVGFEPointLightElement>(null);
  const pointLightFlippedRef = useRef<SVGFEPointLightElement>(null);
  const draggableInstanceRef = useRef<Draggable | null>(null);

  // SVG filter ids are document-global; namespace them per instance so two
  // stickers on the same page cannot collide.
  const instanceId = useId().replace(/[^a-zA-Z0-9_-]/g, "");
  const pointLightId = `sticker-point-light-${instanceId}`;
  const pointLightFlippedId = `sticker-point-light-flipped-${instanceId}`;
  const expandAndFillId = `sticker-expand-fill-${instanceId}`;

  useEffect(() => {
    const target = dragTargetRef.current;
    if (!target) return;

    if (initialPosition === "center") {
      return;
    }

    gsap.set(target, { x: initialPosition.x, y: initialPosition.y });
  }, [initialPosition]);

  useEffect(() => {
    const target = dragTargetRef.current;
    if (!target) return;

    // quickTo reuses one tween across drag ticks; recreated per drag session
    // because the settle tween in onDragEnd overwrites (kills) it.
    let rotationTo: ReturnType<typeof gsap.quickTo> | null = null;

    const draggable = Draggable.create(target, {
      type: "x,y",
      inertia: true,
      onDragStart() {
        rotationTo = gsap.quickTo(target, "rotation", {
          duration: 0.15,
          ease: "power1.out",
        });
      },
      onDrag(this: Draggable) {
        rotationTo?.(gsap.utils.clamp(-24, 24, this.deltaX * 0.4));
      },
      onDragEnd() {
        rotationTo = null;
        gsap.to(target, {
          rotation: 0,
          duration: 0.8,
          ease: "power2.out",
          overwrite: "auto",
        });
      },
    });

    draggableInstanceRef.current = draggable[0];

    const handleResize = () => {
      if (draggableInstanceRef.current) {
        draggableInstanceRef.current.update();
      }
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleResize);
      if (draggableInstanceRef.current) {
        draggableInstanceRef.current.kill();
      }
    };
  }, []);

  useEffect(() => {
    const updateLight = (e: Event) => {
      const mouseEvent = e as MouseEvent;
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;

      const x = mouseEvent.clientX - rect.left;
      const y = mouseEvent.clientY - rect.top;

      if (pointLightRef.current) {
        gsap.set(pointLightRef.current, { attr: { x, y } });
      }

      const normalizedAngle = Math.abs(peelDirection % 360);
      if (pointLightFlippedRef.current) {
        if (normalizedAngle !== 180) {
          gsap.set(pointLightFlippedRef.current, {
            attr: { x, y: rect.height - y },
          });
        } else {
          gsap.set(pointLightFlippedRef.current, {
            attr: { x: -1000, y: -1000 },
          });
        }
      }
    };

    const container = containerRef.current;
    const eventType = "mousemove";

    if (container) {
      container.addEventListener(eventType, updateLight);
      return () => container.removeEventListener(eventType, updateLight);
    }
  }, [peelDirection]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleTouchStart = () => {
      container.classList.add("touch-active");
    };

    const handleTouchEnd = () => {
      container.classList.remove("touch-active");
    };

    container.addEventListener("touchstart", handleTouchStart);
    container.addEventListener("touchend", handleTouchEnd);
    container.addEventListener("touchcancel", handleTouchEnd);

    return () => {
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchend", handleTouchEnd);
      container.removeEventListener("touchcancel", handleTouchEnd);
    };
  }, []);

  const cssVars: CSSVars = {
    "--sticker-p": `${STICKER_PADDING_PX}px`,
    "--sticker-peelback-hover": `${peelBackHoverPct}%`,
    "--sticker-peelback-active": `${peelBackActivePct}%`,
    "--sticker-start": `calc(-1 * ${STICKER_PADDING_PX}px)`,
    "--sticker-end": `calc(100% + ${STICKER_PADDING_PX}px)`,
  };

  const imageStyle: CSSProperties = {
    transform: `rotate(calc(${rotate}deg - ${peelDirection}deg))`,
    width: typeof width === "number" ? `${width}px` : width,
    height: "auto",
  };

  const backImageStyle: CSSProperties = {
    ...imageStyle,
    filter: `url(#${expandAndFillId})`,
    opacity: 1,
  };

  return (
    <div className={`absolute ${className}`}>
      <div
        className="cursor-grab active:cursor-grabbing transform-gpu"
        ref={dragTargetRef}
        style={cssVars}
      >
        <svg width="0" height="0">
          <defs>
            <filter id={pointLightId} colorInterpolationFilters="sRGB">
              <feGaussianBlur in="SourceAlpha" stdDeviation="1" result="blur" />
              <feSpecularLighting
                result="spec"
                in="blur"
                specularExponent="100"
                specularConstant={lightingIntensity}
                lightingColor="white"
              >
                <fePointLight ref={pointLightRef} x="100" y="100" z="300" />
              </feSpecularLighting>
              <feComposite
                in="spec"
                in2="SourceAlpha"
                operator="in"
                result="maskedSpec"
              />
              <feComposite
                in="SourceGraphic"
                in2="maskedSpec"
                operator="arithmetic"
                k1="0"
                k2="1"
                k3="1"
                k4="0"
              />
            </filter>

            <filter id={pointLightFlippedId} colorInterpolationFilters="sRGB">
              <feGaussianBlur
                in="SourceAlpha"
                stdDeviation="10"
                result="blur"
              />
              <feSpecularLighting
                result="spec"
                in="blur"
                specularExponent="100"
                specularConstant={lightingIntensity * 7}
                lightingColor="white"
              >
                <fePointLight
                  ref={pointLightFlippedRef}
                  x="100"
                  y="100"
                  z="300"
                />
              </feSpecularLighting>
              <feComposite
                in="spec"
                in2="SourceAlpha"
                operator="in"
                result="maskedSpec"
              />
              <feComposite
                in="SourceGraphic"
                in2="maskedSpec"
                operator="arithmetic"
                k1="0"
                k2="1"
                k3="1"
                k4="0"
              />
            </filter>

            <filter id={expandAndFillId} colorInterpolationFilters="sRGB">
              <feOffset dx="0" dy="0" in="SourceAlpha" result="shape" />
              <feFlood floodColor="rgb(220,220,220)" result="flood" />
              <feComposite operator="in" in="flood" in2="shape" result="base" />

              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.8"
                numOctaves="3"
                result="noise"
              />
              <feColorMatrix
                type="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.15 0"
                in="noise"
                result="coloredNoise"
              />
              <feComposite
                operator="in"
                in="coloredNoise"
                in2="base"
                result="texturedNoise"
              />
              <feComposite operator="over" in="texturedNoise" in2="base" />
            </filter>
          </defs>
        </svg>

        <div
          className="sticker-container relative select-none touch-none sm:touch-auto"
          ref={containerRef}
          style={{
            WebkitUserSelect: "none",
            userSelect: "none",
            WebkitTouchCallout: "none",
            WebkitTapHighlightColor: "transparent",
            transform: `rotate(${peelDirection}deg)`,
            transformOrigin: "center",
          }}
        >
          <div className="sticker-main">
            <div style={{ filter: `url(#${pointLightId})` }}>
              <Image
                src={imageSrc}
                alt=""
                width={imageWidth}
                height={imageHeight}
                sizes={sizes}
                aria-hidden="true"
                className="block w-full h-auto"
                style={imageStyle}
                draggable={false}
                onContextMenu={(e) => e.preventDefault()}
              />
            </div>
          </div>

          <div className="sticker-flap absolute w-full h-full left-0">
            <div style={{ filter: `url(#${pointLightFlippedId})` }}>
              <Image
                src={imageSrc}
                alt=""
                width={imageWidth}
                height={imageHeight}
                sizes={sizes}
                aria-hidden="true"
                className="block w-full h-auto"
                style={backImageStyle}
                draggable={false}
                onContextMenu={(e) => e.preventDefault()}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StickerPeel;
