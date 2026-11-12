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
          DEFAULT: "#5C4989",
          deep: "#43366E",
          soft: "#7D6DB3",
          mist: "#EDEAF6",
        },
        coral: {
          DEFAULT: "#5C4989",
          soft: "#E9E5F5",
          deep: "#43366E",
        },
        teal: {
          DEFAULT: "#32584D",
          soft: "#E1EAE4",
          deep: "#22403A",
        },
        gold: {
          DEFAULT: "#F6D85D",
          soft: "#FDF7DA",
          deep: "#9C7B1D",
        },
        rose: {
          DEFAULT: "#7D6DB3",
          soft: "#E9E4F5",
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
        soft: "0 18px 50px -24px rgba(67, 54, 110, 0.28)",
        lift: "0 28px 70px -30px rgba(67, 54, 110, 0.38)",
        glow: "0 0 0 1px rgba(92, 73, 137, 0.14), 0 24px 60px -28px rgba(92, 73, 137, 0.5)",
      },
      backgroundImage: {
        "grid-warm":
          "linear-gradient(to right, rgba(92, 73, 137, 0.055) 1px, transparent 1px), linear-gradient(to bottom, rgba(92, 73, 137, 0.055) 1px, transparent 1px)",
        "dots-warm":
          "radial-gradient(rgba(92, 73, 137, 0.14) 1px, transparent 1px)",
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
