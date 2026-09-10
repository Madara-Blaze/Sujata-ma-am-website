import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

/**
 * Design tokens for Sidenote's "notebook" system: a warm paper background,
 * a handwriting display face, and marker/tape/index-card motifs. Colors are
 * space-separated RGB triplets defined in globals.css so the Tailwind
 * `<alpha-value>` opacity modifiers (bg-primary/40 etc.) keep working.
 */
const config: Config = {
  darkMode: "class",
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "rgb(var(--c-primary) / <alpha-value>)", // ballpoint blue
        "primary-dim": "rgb(var(--c-primary-dim) / <alpha-value>)",
        "on-primary": "rgb(var(--c-on-primary) / <alpha-value>)",
        "primary-container": "rgb(var(--c-primary-container) / <alpha-value>)",
        "on-primary-container": "rgb(var(--c-on-primary-container) / <alpha-value>)",
        secondary: "rgb(var(--c-secondary) / <alpha-value>)",
        "on-secondary": "rgb(var(--c-on-secondary) / <alpha-value>)",
        margin: "rgb(var(--c-margin) / <alpha-value>)", // red margin rule
        highlighter: "rgb(var(--c-highlighter) / <alpha-value>)", // yellow marker
        "highlighter-mint": "rgb(var(--c-highlighter-mint) / <alpha-value>)",
        "highlighter-pink": "rgb(var(--c-highlighter-pink) / <alpha-value>)",
        ink: "rgb(var(--c-ink) / <alpha-value>)",
        error: "rgb(var(--c-error) / <alpha-value>)",
        "on-error": "rgb(var(--c-on-error) / <alpha-value>)",
        "error-container": "rgb(var(--c-error-container) / <alpha-value>)",
        success: "rgb(var(--c-success) / <alpha-value>)",
        background: "rgb(var(--c-background) / <alpha-value>)", // warm paper
        "on-background": "rgb(var(--c-on-background) / <alpha-value>)",
        surface: "rgb(var(--c-surface) / <alpha-value>)",
        "on-surface": "rgb(var(--c-on-surface) / <alpha-value>)",
        "surface-variant": "rgb(var(--c-surface-variant) / <alpha-value>)",
        "on-surface-variant": "rgb(var(--c-on-surface-variant) / <alpha-value>)",
        outline: "rgb(var(--c-outline) / <alpha-value>)",
        "outline-variant": "rgb(var(--c-outline-variant) / <alpha-value>)",
        "surface-container-lowest": "rgb(var(--c-surface-container-lowest) / <alpha-value>)", // index-card white
        "surface-container-low": "rgb(var(--c-surface-container-low) / <alpha-value>)",
        "surface-container": "rgb(var(--c-surface-container) / <alpha-value>)",
        "surface-container-high": "rgb(var(--c-surface-container-high) / <alpha-value>)",
        cork: "rgb(var(--c-cork) / <alpha-value>)", // corkboard brown
        card: "rgb(var(--c-card) / <alpha-value>)",
        border: "rgb(var(--c-outline-variant) / <alpha-value>)",
        foreground: "rgb(var(--c-on-surface) / <alpha-value>)",
        muted: {
          DEFAULT: "rgb(var(--c-surface-container) / <alpha-value>)",
          foreground: "rgb(var(--c-on-surface-variant) / <alpha-value>)",
        },
      },
      borderRadius: {
        DEFAULT: "10px",
        sm: "6px",
        md: "10px",
        lg: "16px",
        xl: "22px",
        full: "9999px",
      },
      spacing: {
        gutter: "24px",
        xs: "4px",
        sm: "8px",
        md: "16px",
        lg: "24px",
        xl: "40px",
      },
      maxWidth: {
        "max-width": "1280px",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "'Work Sans'", "system-ui", "sans-serif"],
        hand: ["var(--font-hand)", "'Caveat'", "cursive"],
        mono: ["var(--font-mono)", "'JetBrains Mono'", "ui-monospace", "monospace"],
      },
      fontSize: {
        "label-md": ["12px", { lineHeight: "16px", letterSpacing: "0.05em", fontWeight: "600" }],
        "body-sm": ["14px", { lineHeight: "20px", fontWeight: "400" }],
        "body-md": ["16px", { lineHeight: "26px", fontWeight: "400" }],
        "body-lg": ["19px", { lineHeight: "30px", fontWeight: "400" }],
        "headline-md": ["26px", { lineHeight: "34px", fontWeight: "700" }],
        "headline-lg": ["36px", { lineHeight: "42px", fontWeight: "700" }],
        display: ["52px", { lineHeight: "1.05", fontWeight: "700" }],
        "display-xl": ["76px", { lineHeight: "1.02", fontWeight: "700" }],
      },
      boxShadow: {
        card: "0 10px 24px -12px rgba(51, 41, 24, 0.22)",
        lift: "0 20px 40px -18px rgba(51, 41, 24, 0.32)",
        pen: "0 3px 0 0 var(--pen-shadow)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        drift: {
          "0%, 100%": { transform: "translateY(0) rotate(var(--drift-rot, -2deg))" },
          "50%": { transform: "translateY(-8px) rotate(var(--drift-rot, -2deg))" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease forwards",
        drift: "drift 5s ease-in-out infinite",
        marquee: "marquee 32s linear infinite",
      },
    },
  },
  plugins: [tailwindcssAnimate],
};

export default config;
