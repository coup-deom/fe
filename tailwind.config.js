/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      // Or if using `src` directory:
      "./src/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {},
    plugins: [require("tailwindcss-safe-area")],
  }
  