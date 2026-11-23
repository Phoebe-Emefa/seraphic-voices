"use client";

import Link from "next/link";

const navy = "#04235c";
const gold = "#FFE099";

export default function GlobalError({
  reset: _reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const reload = () => {
    window.location.reload();
  };

  return (
    <html lang="en-CA">
      <body
        style={{
          margin: 0,
          minHeight: "100dvh",
          background: navy,
          color: "#fff",
          fontFamily:
            "var(--font-spacegrotesk), Helvetica, Arial, sans-serif",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "4rem 1.25rem",
        }}
      >
        <main
          role="alert"
          style={{
            textAlign: "center",
            maxWidth: "36rem",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "1.5rem",
          }}
        >
          {/* Local static logo; next/image is unsafe if the root layout has already failed. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/seraphic-voices.png"
            alt="Seraphic Voices of Toronto"
            style={{
              height: "3.5rem",
              width: "auto",
              maxWidth: "12rem",
              objectFit: "contain",
              filter: "brightness(0) invert(1)",
              opacity: 0.95,
            }}
          />
          <div
            style={{
              width: "4.5rem",
              height: "1px",
              background: gold,
            }}
          />
          <h1
            style={{
              margin: 0,
              fontSize: "clamp(1.875rem, 4vw, 2.75rem)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
            }}
          >
            This page could not be loaded
          </h1>
          <p
            style={{
              margin: 0,
              maxWidth: "32ch",
              fontSize: "1.125rem",
              lineHeight: 1.6,
              color: "rgba(255,255,255,0.8)",
            }}
          >
            Something went wrong. Try again in a moment, or return home.
          </p>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.75rem",
              justifyContent: "center",
            }}
          >
            <button
              type="button"
              onClick={reload}
              style={{
                minWidth: "11rem",
                height: "3.25rem",
                padding: "0 1.5rem",
                border: 0,
                borderRadius: 999,
                background: gold,
                color: navy,
                fontWeight: 700,
                fontSize: "1rem",
                cursor: "pointer",
                fontFamily: "inherit",
              }}
            >
              Try again
            </button>
            <Link
              href="/"
              style={{
                minWidth: "11rem",
                height: "3.25rem",
                padding: "0 1.5rem",
                border: "1px solid #fff",
                borderRadius: 999,
                background: "transparent",
                color: "#fff",
                fontWeight: 700,
                fontSize: "1rem",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                boxSizing: "border-box",
              }}
            >
              Home
            </Link>
          </div>
        </main>
      </body>
    </html>
  );
}
