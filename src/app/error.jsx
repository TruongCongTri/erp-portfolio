"use client";
import { useEffect } from "react";

import ErrorScreen from "@/components/ErrorScreen/ErrorScreen";

// Shown when a page throws while rendering in the browser. `reset` re-renders
// the route, which is what the "try again" button does.
export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return <ErrorScreen variant="error" reset={reset} />;
}
