"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { lockBodyScroll, unlockBodyScroll } from "@/lib/scroll-lock";

/**
 * Shared plumbing for native <dialog> modals: syncs React state with
 * showModal()/close(), locks body scroll while open, handles the native
 * close/cancel events (Escape), and detects backdrop clicks.
 *
 * `onClose` runs whenever the dialog closes, regardless of how (Escape,
 * backdrop click, or programmatic) – use it to reset dialog-local state.
 */
export function useDialog({ onClose }: { onClose?: () => void } = {}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);

  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  }, [onClose]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleNativeClose = () => {
      setOpen(false);
      onCloseRef.current?.();
    };
    dialog.addEventListener("close", handleNativeClose);
    dialog.addEventListener("cancel", handleNativeClose);

    return () => {
      dialog.removeEventListener("close", handleNativeClose);
      dialog.removeEventListener("cancel", handleNativeClose);
    };
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (open) {
      if (!dialog.open) dialog.showModal();
      lockBodyScroll();
      return () => unlockBodyScroll();
    }

    if (dialog.open) dialog.close();
  }, [open]);

  // Only flips state: the effect then calls dialog.close(), whose native
  // `close` event runs `onClose` exactly once for every way of closing.
  const close = useCallback(() => {
    setOpen(false);
  }, []);

  const handleBackdropClick = useCallback(
    (e: React.MouseEvent<HTMLDialogElement>) => {
      const dialog = dialogRef.current;
      if (!dialog) return;
      const rect = dialog.getBoundingClientRect();
      if (
        e.clientX < rect.left ||
        e.clientX > rect.right ||
        e.clientY < rect.top ||
        e.clientY > rect.bottom
      ) {
        close();
      }
    },
    [close],
  );

  return { dialogRef, open, setOpen, close, handleBackdropClick };
}
