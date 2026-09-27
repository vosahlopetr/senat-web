"use client";

import { useEffect, useRef, useCallback } from "react";
import PropellerHat from "./PropellerHat";

export default function DesktopTravelingHat() {
  const hatRef = useRef<HTMLDivElement>(null);
  const isLandedRef = useRef(false);

  const handleClick = useCallback(() => {
    if (!isLandedRef.current) {
      const target = document.getElementById("hat-card01-target");
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const el = hatRef.current;
    if (!el) return;

    if (prefersReducedMotion) {
      isLandedRef.current = true;
      const cardTarget = document.getElementById("hat-card01-target");
      if (cardTarget) {
        const cardRect = cardTarget.getBoundingClientRect();
        const scrollX = window.scrollX ?? window.pageXOffset ?? 0;
        const scrollY = window.scrollY ?? window.pageYOffset ?? 0;
        const docX = cardRect.left + scrollX;
        const docY = cardRect.top + scrollY;
        const endW = cardRect.width || 144;
        el.style.width = `${Math.round(endW)}px`;
        el.style.height = `${Math.round(endW)}px`;
        el.style.transform = `translate3d(${Math.round(docX)}px, ${Math.round(docY)}px, 0)`;
        el.style.opacity = "1";
      }
      return;
    }

    let rafId = 0;
    let startTime: number | null = null;
    const hoverDuration = 800; // 0.8s gentle hover at top of hero before flight
    const flightDuration = 5200; // 5.2s slow, visible flight down to Card 01

    function animate(now: number) {
      const heroStart = document.getElementById("hat-hero-start");
      const cardTarget = document.getElementById("hat-card01-target");

      if (!el || !heroStart || !cardTarget) {
        rafId = requestAnimationFrame(animate);
        return;
      }

      if (startTime === null) {
        startTime = now;
      }

      const elapsed = now - startTime;

      // Absolute document coordinates (independent of user scroll)
      const heroRect = heroStart.getBoundingClientRect();
      const cardRect = cardTarget.getBoundingClientRect();

      const scrollX = window.scrollX ?? window.pageXOffset ?? 0;
      const scrollY = window.scrollY ?? window.pageYOffset ?? 0;

      const startDocX = heroRect.left + scrollX;
      const startDocY = heroRect.top + scrollY;

      const endDocX = cardRect.left + scrollX;
      const endDocY = cardRect.top + scrollY;

      const startW = heroRect.width || 144;
      const endW = cardRect.width || 144;

      if (elapsed < hoverDuration) {
        // Hovering at top of Hero
        const hoverT = elapsed / hoverDuration;
        const bob = Math.sin(hoverT * Math.PI * 4) * 6;
        el.style.width = `${Math.round(startW)}px`;
        el.style.height = `${Math.round(startW)}px`;
        el.style.transform = `translate3d(${Math.round(startDocX)}px, ${Math.round(startDocY + bob)}px, 0) rotate(0deg) scale(1)`;
        el.style.opacity = "1";
        rafId = requestAnimationFrame(animate);
        return;
      }

      const flightElapsed = elapsed - hoverDuration;
      const rawP = Math.min(flightElapsed / flightDuration, 1.0);

      // Smooth cubic easeInOut
      const p =
        rawP < 0.5
          ? 4 * rawP * rawP * rawP
          : 1 - Math.pow(-2 * rawP + 2, 3) / 2;

      // Flight path with gentle aerodynamic drift & sway
      const arcOffset = Math.sin(p * Math.PI) * -25;
      const x = startDocX + (endDocX - startDocX) * p + arcOffset;
      const y = startDocY + (endDocY - startDocY) * p;

      // Scale smoothly from Hero start size down to Card 01 landing size
      const currentSize = startW + (endW - startW) * p;
      el.style.width = `${Math.round(currentSize)}px`;
      el.style.height = `${Math.round(currentSize)}px`;

      // Aerodynamic banking tilt and landing cushion
      const tilt = Math.sin(p * Math.PI * 2) * -8;
      const settleScale = rawP > 0.94 && rawP < 0.98 ? 1.04 : 1.0;

      if (rawP >= 1.0) {
        isLandedRef.current = true;
        // Permanently landed on Card 01 top-right corner of the "01" digit
        el.style.width = `${Math.round(endW)}px`;
        el.style.height = `${Math.round(endW)}px`;
        el.style.transform = `translate3d(${Math.round(endDocX)}px, ${Math.round(endDocY)}px, 0) rotate(0deg) scale(1)`;
        el.style.opacity = "1";
        return; // Flight complete!
      }

      el.style.transform = `translate3d(${Math.round(x)}px, ${Math.round(y)}px, 0) rotate(${tilt.toFixed(1)}deg) scale(${settleScale})`;
      el.style.opacity = "1";

      rafId = requestAnimationFrame(animate);
    }

    rafId = requestAnimationFrame(animate);

    const handleResize = () => {
      if (isLandedRef.current) {
        const cardTarget = document.getElementById("hat-card01-target");
        if (cardTarget && el) {
          const cardRect = cardTarget.getBoundingClientRect();
          el.style.transform = `translate3d(${Math.round(cardRect.left + window.scrollX)}px, ${Math.round(cardRect.top + window.scrollY)}px, 0) rotate(0deg) scale(1)`;
        }
      }
    };
    window.addEventListener("resize", handleResize);

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      ref={hatRef}
      onClick={handleClick}
      className="block absolute top-0 left-0 z-40 pointer-events-auto filter drop-shadow-[0_16px_32px_rgba(0,0,0,0.5)] cursor-pointer will-change-transform opacity-0 transition-opacity duration-300"
      style={{
        transform: "translate3d(-9999px, -9999px, 0)",
      }}
      title="Vrtulová čepice Radka Sáblíka"
    >
      <PropellerHat className="w-full h-full" />
    </div>
  );
}
