import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [require("tailwindcss/plugin")],
} satisfies Config

export default config
