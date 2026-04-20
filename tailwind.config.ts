import type { Config } from "tailwindcss";

export default {
  theme: {
    extend: {
      colors: {
        brand: "#3b82f6",
      },
    },
  },
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
} satisfies Config;
