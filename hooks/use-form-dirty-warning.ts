"use client";

import { useEffect } from "react";

/**
 * Hook to warn users when they try to leave the page with unsaved form changes
 * @param isDirty - Whether the form has unsaved changes
 * @param message - Custom warning message (optional)
 */
export function useFormDirtyWarning(
  isDirty: boolean,
  message: string = "You have unsaved changes. Are you sure you want to leave?"
) {
  useEffect(() => {
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
  }, [isDirty, message]);
}
