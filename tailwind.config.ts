import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "hero-pattern": "url('/assets/images/hero-image.jpeg')",
        "dark-linear":
          "linear-gradient(0.51deg, #0D0C0F -6.13%, #292D45 115.01%)",
        "page-hero-linear":
          "linear-gradient(180deg, rgba(26, 0, 0, 0.0659965) -124.09%, #01000A 149.23%)",
      },
      screens: {
        sm: "480px",
        md: "768px",
        lg: "976px",
        xl: "1440px",
      },

      content: {
        navItem:
          'content: "", height: "2px", width: "100%", background-color: "black"',
      },
    },
  },
  plugins: [],
};
export default config;
