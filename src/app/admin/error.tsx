"use client";

export default function AdminError({ reset }: { reset: () => void }) {
  return (
    <div
      role="alert"
      style={{
        minHeight: "100dvh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <div style={{ textAlign: "center", maxWidth: "28rem" }}>
        <h1 style={{ fontSize: "1.25rem", margin: "0 0 0.75rem" }}>
          Studio could not load
        </h1>
        <p style={{ color: "#4F4F4F", margin: "0 0 1.5rem" }}>
          Reload the studio and try again.
        </p>
        <button
          type="button"
          onClick={reset}
          style={{
            height: "2.75rem",
            padding: "0 1.25rem",
            border: 0,
            borderRadius: 999,
            background: "#244983",
            color: "#fff",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Try again
        </button>
      </div>
    </div>
  );
}
