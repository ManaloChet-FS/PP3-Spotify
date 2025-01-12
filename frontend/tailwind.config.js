/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "spotifyGreen": "#1DB954",
        "spotifyGreenDarker": "#1aa64b"
      }
    },
  },
  plugins: [],
}

