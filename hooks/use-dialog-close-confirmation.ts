import { useCallback, useEffect, useState } from "react";

export interface UseDialogCloseConfirmationOptions {
  isDirty: boolean;
  setOpen: (open: boolean) => void;
  onConfirmedClose?: () => void;
}

export function useDialogCloseConfirmation({
  isDirty,
  setOpen,
  onConfirmedClose,
}: UseDialogCloseConfirmationOptions) {
  const [showConfirmation, setShowConfirmation] = useState(false);

  useEffect(() => {
    const message = "您有尚未儲存的更動。確定要關閉而不儲存嗎？您的更動將會遺失。";
    if (!isDirty) return;

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = message;
      return message;
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isDirty]);

  const handleDialogOpenChange = useCallback(
    (newOpen: boolean) => {
      // If trying to close the dialog and form is dirty
      if (!newOpen && isDirty) {
        setShowConfirmation(true);
        return; // Don't close the dialog yet
      }

      // Normal open/close behavior
      setOpen(newOpen);

      // If closing and not dirty, call onConfirmedClose
      if (!newOpen) {
        onConfirmedClose?.();
      }
    },
    [isDirty, setOpen, onConfirmedClose],
  );

  const handleConfirmClose = useCallback(() => {
    setShowConfirmation(false);
    setOpen(false);
    onConfirmedClose?.();
  }, [setOpen, onConfirmedClose]);

  const handleCancelClose = useCallback(() => {
    setShowConfirmation(false);
  }, []);

  return {
    showConfirmation,
    handleDialogOpenChange,
    handleConfirmClose,
    handleCancelClose,
  };
}
