/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        "red":         "#FF0000",
        "red-light":  "#FF0000CC",
        "main-blue":   "#072AC8",
        "bright-yellow":"#FDD85D",
        "orange":      "#FF844F",
        "pinky-red":   "#F1483D",
        "green":       "#60D394",
        "light-grey":  "#F8F9FA",
        "really-grey": "#595F65",
      },
    },
  },
  plugins: [],
}