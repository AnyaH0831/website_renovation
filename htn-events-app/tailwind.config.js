/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
      'neon-pink':' #f72585ff',
      'raspberry-plum': '#b5179eff',
      'indigo-bloom': '#7209b7ff',
      'ultrasonic-blue': '#560badff',
      'true-azure': '#480ca8ff',
      'vivid-royal': '#3a0ca3ff',
      'bright-indigo': '#3f37c9ff',
      'electric-sapphire': '#4361eeff',
      'blue-energy': '#4895efff',
      'sky-aqua': '#4cc9f0ff',

      "cherry-rose":"#b7094c",
      "dark-raspberry":"#a01a58",
      "royal-plum":"#892b64",
      "velvet-purple":"#723c70",
      "dusty-grape":"#5c4d7d",
      "dusk-blue":"#455e89",
      "rich-cerulean":"#2e6f95",
      "cerulean":"#1780a1",
      "pacific-cyan":"#0091ad"
      }
    },
  },
  plugins: [],
}