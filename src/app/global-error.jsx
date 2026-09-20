"use client";

import { getDictionary } from "@/i18n";

// Last resort: an error in the root layout itself, where the site's chrome
// (and its CSS) is not available - so this page carries its own markup and
// the palette inline. Vietnamese, since there is no layout to tell us more.
export default function GlobalError({ error, reset }) {
  const t = getDictionary("vi").errors;

  return (
    <html lang="vi">
      <body
        style={{
          margin: 0,
          minHeight: "100svh",
          display: "flex",
          alignItems: "center",
          backgroundColor: "rgb(22, 36, 59)",
          color: "rgb(235, 241, 250)",
          fontFamily: '"Manrope", system-ui, sans-serif',
        }}
      >
        <main style={{ padding: "2rem", maxWidth: "40rem" }}>
          <p
            style={{
              margin: 0,
              fontSize: "0.9rem",
              letterSpacing: "0.05em",
              textTransform: "uppercase",
              color: "rgb(120, 147, 186)",
            }}
          >
            {t.errorLabel}
          </p>
          <h1 style={{ margin: "1rem 0", fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 500 }}>
            {t.errorTitle}
          </h1>
          <p style={{ margin: "0 0 2rem", lineHeight: 1.4, color: "rgb(196, 211, 233)" }}>
            {t.errorText}
          </p>
          <button
            type="button"
            onClick={reset}
            style={{
              padding: "0.9rem 2rem",
              border: "none",
              borderRadius: "4rem",
              background: "rgba(242, 237, 230, 0.75)",
              color: "rgb(22, 36, 59)",
              fontFamily: "inherit",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            {t.retry}
          </button>
        </main>
      </body>
    </html>
  );
}
