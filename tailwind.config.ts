import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "rgb(from var(--bg) r g b)",
        surface: "rgb(from var(--surface) r g b)",
        surface2: "rgb(from var(--surface-2) r g b)",
        border: "rgb(from var(--border) r g b)",
        ink: "rgb(from var(--ink) r g b)",
        muted: "rgb(from var(--muted) r g b)",
        primary: "rgb(from var(--primary) r g b)",
        primaryHover: "rgb(from var(--primary-hover) r g b)",
        primaryStrong: "rgb(from var(--primary-strong) r g b)",
        interactive: "rgb(from var(--interactive) r g b)",
        interactive2: "rgb(from var(--interactive-2) r g b)",
        warn: "rgb(from var(--warn) r g b)",
        danger: "rgb(from var(--danger) r g b)",
      },
      boxShadow: {
        card: "0 1px 0 rgba(18,57,77,0.06), 0 8px 24px rgba(18,57,77,0.06)",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
    },
  },
  plugins: [],
} satisfies Config;