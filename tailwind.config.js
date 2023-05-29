const originThemes = ["light", "dark", "cupcake", "bumblebee", "emerald", "corporate", "synthwave", "retro", "cyberpunk", "valentine", "halloween", "garden", "forest", "aqua", "lofi", "pastel", "fantasy", "wireframe", "black", "luxury", "dracula", "cmyk", "autumn", "business", "acid", "lemonade", "night", "coffee", "winter"]
const EarthTheme = {
    Earth:{
      primary: "#A9907E",
      secondary: "#F3DEBA",
      accent: "#ABC4AA",
      neutral: "#675D50",
      "base-100": "#285430",
      "base-300":"#5F8D4E",
      "base-200":"#A4BE7B",
      "--rounded-box": "1rem", // border radius rounded-box utility class, used in card and other large boxes
      "--rounded-btn": "0.5rem", // border radius rounded-btn utility class, used in buttons and similar element
      "--rounded-badge": "1.9rem", // border radius rounded-badge utility class, used in badges and similar
      "--animation-btn": "0.25s", // duration of animation when you click on button
      "--animation-input": "0.2s", // duration of animation for inputs like checkbox, toggle, radio, etc
      "--btn-text-case": "uppercase", // set default text transform for buttons
      "--btn-focus-scale": "0.95", // scale transform of button when you focus on it
      "--border-btn": "1px", // border width of buttons
      "--tab-border": "1px", // border width of tabs
      "--tab-radius": "0.5rem", // border radius of tabs
    }
  }
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/renderer/index.html', './src/renderer/src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'media', // or 'media' or 'class'
  // prefix:'tw-',
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [EarthTheme,...originThemes],
    // logs:false,
    // prefix: 'daisy-'
  },
}
