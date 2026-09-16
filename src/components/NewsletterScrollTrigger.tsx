"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

export default function NewsletterScrollTrigger() {
  const triggerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          const hasSeenModal = sessionStorage.getItem("newsletter_modal_shown");

          if (!hasSeenModal) {
            sessionStorage.setItem("newsletter_modal_shown", "true");
            router.push("?modal=support", { scroll: false });
          }

          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );

    if (triggerRef.current) {
      observer.observe(triggerRef.current);
    }

    return () => observer.disconnect();
  }, [router]);

  return <div ref={triggerRef} className="h-0 w-full" aria-hidden="true" />;
}
