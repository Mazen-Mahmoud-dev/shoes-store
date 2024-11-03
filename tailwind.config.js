/** @type {import('tailwindcss').Config} */
const flowbite = require("flowbite-react/tailwind");
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}",flowbite.content(),],
  theme: {
    extend: {
      colors:{        
        primary:"#1f2937",
        secondary:"#4a5568",
        main:"#0284c7"
      },
      flexBasis: {
        'custom': 'calc(100% - 450px)',
      },
    },
  },
  plugins: [
    flowbite.plugin(),
  ],
}
