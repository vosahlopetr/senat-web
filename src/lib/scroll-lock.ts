/**
 * Single owner of `document.body.style.overflow`. The mobile menu (Header)
 * and modal dialogs (useDialog) can hold a lock at the same time; a counter
 * ensures the body only unlocks when the last holder releases, instead of
 * the previous last-writer-wins conflicts between independent effects.
 *
 * Client-side only – call from effects/handlers, never during render.
 */
let lockCount = 0;

export function lockBodyScroll(): void {
  lockCount += 1;
  if (lockCount === 1) {
    document.body.style.overflow = "hidden";
  }
}

export function unlockBodyScroll(): void {
  if (lockCount === 0) return;
  lockCount -= 1;
  if (lockCount === 0) {
    document.body.style.overflow = "";
  }
}
