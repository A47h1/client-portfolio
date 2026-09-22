/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        parchment: "#FBF7EE",
        parchmentDim: "#F3EDDD",
        ink: "#1F2A1A",
        inkSoft: "#41503C",
        leaf: {
          DEFAULT: "#3F7D3A",
          dark: "#2C5A29",
          light: "#6FAA5F",
        },
        marigold: "#F4B93C",
        poppy: "#E85D3D",
        teal: "#3E8EA8",
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "ui-serif", "Georgia", "serif"],
        body: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        contour:
          "radial-gradient(circle at 1px 1px, rgba(63,125,58,0.14) 1px, transparent 0)",
      },
    },
  },
  plugins: [],
};
