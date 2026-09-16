"use client";

import { useEffect, useRef, useState } from "react";

interface ScrollBlockProps {
  text: string;
}

/**
 * Blocks render fully visible by default, so the manifesto stays readable
 * with no JS, before hydration and for prefers-reduced-motion users. Only
 * after hydration – and only for blocks still below the reveal line – do we
 * switch to the dimmed pre-animation state and fade in on scroll.
 */
const ScrollBlock = ({ text }: ScrollBlockProps) => {
  const blockRef = useRef<HTMLParagraphElement>(null);
  const [phase, setPhase] = useState<"static" | "hidden" | "visible">("static");

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const currentRef = blockRef.current;
    if (!currentRef) return;

    // Mirrors the observer trigger (25% up from the bottom of the viewport):
    // blocks already at or above that line keep their visible static state,
    // so there is no dip-and-fade for content in view at hydration.
    const revealLine = window.innerHeight * 0.75;
    if (currentRef.getBoundingClientRect().top < revealLine) {
      return;
    }

    setPhase("hidden");

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setPhase("visible");
          observer.disconnect();
        }
      },
      {
        root: null,
        rootMargin: "0px 0px -25% 0px", // Trigger when 25% up from bottom
        threshold: 0.1,
      },
    );

    observer.observe(currentRef);

    return () => {
      observer.disconnect();
    };
  }, []);

  // Using Tailwind transition classes
  // The typography matches the 'manifesto' section from index.html:
  // font-family: var(--font-body); font-weight: 700; font-size: clamp(1.25rem, 3vw, 2.25rem); line-height: 1.15; color: var(--color-cream); max-width: 58rem;

  return (
    <p
      ref={blockRef}
      className={`font-body font-bold text-[1.5rem] md:text-[clamp(1.75rem,3vw,2.25rem)] leading-[1.4] md:leading-[1.25] text-cream max-w-[58rem] mx-auto py-16 md:py-24 transition-all duration-1000 ease-out transform ${
        phase === "hidden"
          ? "opacity-20 translate-y-8"
          : "opacity-100 translate-y-0"
      }`}
    >
      {text}
    </p>
  );
};

interface ScrollTellingProps {
  story: string[];
}

export default function ScrollTelling({ story }: ScrollTellingProps) {
  return (
    <div className="w-full relative bg-primary">
      {/* A spacer at the top to allow smooth scrolling into the story */}
      <div className="h-[5vh]" />

      <div className="container relative z-10">
        <div className="flex flex-col">
          {story.map((text, index) => (
            <ScrollBlock key={index} text={text} />
          ))}
        </div>
      </div>

      {/* A spacer at the bottom */}
      <div className="h-[20vh]" />
    </div>
  );
}
