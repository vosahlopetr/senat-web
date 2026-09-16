import type { MDXComponents } from "mdx/types";
import Link from "next/link";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    h1: ({ children }) => (
      <h1 className="font-display text-[clamp(2.5rem,8vw,5rem)] text-black uppercase mb-8 leading-[0.9]">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="font-display text-[clamp(1.5rem,4vw,3rem)] text-black uppercase mt-12 mb-4 leading-tight">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="font-display text-[clamp(1.25rem,3vw,2rem)] text-black uppercase mt-8 mb-3 leading-tight">
        {children}
      </h3>
    ),
    p: ({ children }) => (
      <p className="font-body text-lg text-black/90 mb-6 leading-relaxed">
        {children}
      </p>
    ),
    a: ({ href, children }) => {
      const SAFE_SCHEMES = /^(https?:|mailto:|tel:|#|\/[^/])/;
      const isInternal =
        href &&
        !href.startsWith("//") &&
        (href.startsWith("/") || href.startsWith("#"));

      if (isInternal) {
        return (
          <Link
            href={href}
            className="text-black underline hover:text-primary transition-colors"
          >
            {children}
          </Link>
        );
      }

      if (!href || !SAFE_SCHEMES.test(href)) {
        return <span className="text-black underline">{children}</span>;
      }

      return (
        <a
          href={href}
          rel="noopener noreferrer"
          className="text-black underline hover:text-primary transition-colors"
        >
          {children}
        </a>
      );
    },
    ul: ({ children }) => (
      <ul className="list-disc pl-6 font-body text-lg text-black/90 mb-6 space-y-2">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal pl-6 font-body text-lg text-black/90 mb-6 space-y-2">
        {children}
      </ol>
    ),
    li: ({ children }) => <li>{children}</li>,
    blockquote: ({ children }) => (
      <blockquote className="px-6 py-4 my-8 italic text-xl font-body text-black/80 bg-black/5 rounded-xl">
        {children}
      </blockquote>
    ),
    img: (props) => (
      <span className="block my-8 rounded-[20px] overflow-hidden border-[3px] border-black/10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          {...props}
          className="w-full h-auto object-cover"
          alt={props.alt || ""}
        />
      </span>
    ),
    hr: () => <hr className="my-10 border-t-2 border-black/20" />,
  };
}
