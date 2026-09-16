import CountdownClient from "./CountdownClient";

/**
 * Server component: captures the render-time timestamp so the correct
 * countdown is in the server HTML – no hidden placeholder or client-only
 * flash. The timestamp is captured when the enclosing `use cache` page
 * scope fills its cache; the client component re-syncs after hydration to
 * correct any staleness from the page cache.
 */
export default function Countdown() {
  // eslint-disable-next-line react-hooks/purity -- deliberate clock read at cache-fill time; CountdownClient re-reads the real time after hydration (see useSyncExternalStore there)
  return <CountdownClient initialNowMs={Date.now()} />;
}
