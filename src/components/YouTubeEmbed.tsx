"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function YouTubeEmbed({
  videoId,
  thumbnailUrl,
  priority = false,
}: {
  videoId: string;
  thumbnailUrl: string;
  /** Only set for above-the-fold embeds – preloads the thumbnail. */
  priority?: boolean;
}) {
  const pathname = usePathname();
  // Track WHERE playback started instead of a boolean so playback state is
  // derived from the route: navigating away automatically shows the thumbnail
  // again without effects or setState-during-render.
  const [playingPathname, setPlayingPathname] = useState<string | null>(null);
  const isPlaying = playingPathname === pathname;

  if (isPlaying) {
    return (
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
        title="Přehrát video"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="absolute inset-0 w-full h-full border-0"
      />
    );
  }

  return (
    <button
      className="absolute inset-0 w-full h-full cursor-pointer group flex items-center justify-center border-none p-0 outline-none focus-visible:ring-4 focus-visible:ring-accent"
      onClick={() => setPlayingPathname(pathname)}
      aria-label="Přehrát video"
    >
      <Image
        src={thumbnailUrl}
        alt="Náhled videa"
        fill
        sizes="(max-width: 768px) 100vw, 80vw"
        className="object-cover object-center"
        priority={priority}
      />
      <div className="absolute inset-0 flex items-center justify-center bg-black/10 group-hover:bg-black/0 transition-colors duration-300">
        <div className="w-[68px] h-[48px] bg-black/80 rounded-[14px] flex items-center justify-center group-hover:bg-[#FF0000] transition-colors duration-300">
          <svg
            className="w-8 h-8 text-white ml-1"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>
    </button>
  );
}
