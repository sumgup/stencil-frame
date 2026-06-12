const dir = __dirname.replace(/\\/g, "/");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [`${dir}/index.html`, `${dir}/src/**/*.{js,jsx}`],
  theme: {
    extend: {
      colors: {
        bg: "#080f0a",
        accent: "#c8a96e",
        "accent-dim": "#5a4520",
        text: "#f0ede6",
        "text-sub": "#6a7a6a",
        "text-dim": "#1a2a1a",
        "text-ghost": "#0e1a0f",
      },
      fontFamily: {
        fraunces: ["Fraunces", "serif"],
        serif: ["DM Serif Display", "serif"],
        mono: ["DM Mono", "monospace"],
        sans: ["DM Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};
