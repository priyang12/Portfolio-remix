/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        xs: "350px",
      },
      padding: {
        sm: "40px",
        md: "60px",
        lg: "800px",
        xl: "100px",
        "2xl": "200px",
        "3xl": "300px",
      },
      margin: {
        sm: "40px",
        md: "60px",
        lg: "800px",
        xl: "100px",
        "2xl": "200px",
        "3xl": "300px",
      },
      gap: {
        sm: "1rem",
        md: "1.5rem",
        lg: "2rem",
        xl: "2.5rem",
        "2xl": "3rem",
        "3xl": "3.5rem",
      },
      fontFamily: {
        VT323: ["VT323", "monospace"],
        Roboto: ["Roboto", "sans-serif"],
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
  daisyui: {
    theme: ["black", "night"],
  },
};
