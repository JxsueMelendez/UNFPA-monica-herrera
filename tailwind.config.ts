import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#FFF8F2",
        sand: "#F6ECE1",
        line: "#EADDD1",
        ink: {
          DEFAULT: "#241B2F",
          soft: "#5E5069",
          faint: "#8A7C94",
        },
        plum: {
          DEFAULT: "#4B2A5E",
          deep: "#2F163D",
          soft: "#6D4B80",
          mist: "#F1E8F6",
        },
        coral: {
          DEFAULT: "#F26B5E",
          soft: "#FFE3DE",
          deep: "#C8483D",
        },
        teal: {
          DEFAULT: "#218F82",
          soft: "#DDF4EF",
          deep: "#146B61",
        },
        gold: {
          DEFAULT: "#E9A83A",
          soft: "#FDF0D6",
          deep: "#A87318",
        },
        rose: {
          DEFAULT: "#D95C86",
          soft: "#FCE4EC",
        },
      },
      fontFamily: {
        sans: ['"Outfit Variable"', "Outfit", "system-ui", "sans-serif"],
        display: ['"Fraunces Variable"', "Fraunces", "Georgia", "serif"],
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.75rem",
      },
      boxShadow: {
        soft: "0 18px 50px -24px rgba(47, 22, 61, 0.28)",
        lift: "0 28px 70px -30px rgba(47, 22, 61, 0.38)",
        glow: "0 0 0 1px rgba(242, 107, 94, 0.12), 0 24px 60px -28px rgba(242, 107, 94, 0.5)",
      },
      backgroundImage: {
        "grid-warm":
          "linear-gradient(to right, rgba(75, 42, 94, 0.055) 1px, transparent 1px), linear-gradient(to bottom, rgba(75, 42, 94, 0.055) 1px, transparent 1px)",
        "dots-warm":
          "radial-gradient(rgba(75, 42, 94, 0.14) 1px, transparent 1px)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.65", transform: "scale(1.04)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        float: "float 7s ease-in-out infinite",
        "pulse-soft": "pulse-soft 3.5s ease-in-out infinite",
        shimmer: "shimmer 3s linear infinite",
        "fade-up": "fade-up 0.6s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;
