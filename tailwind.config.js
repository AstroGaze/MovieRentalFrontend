/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "custom-blue": "#1DA1F2", // Twitter Blue
        "custom-red": "#FF0000",
        sebasWhite: "#F1F1F1", // Pure Red
        // Add more custom colors as needed
      },
    },
  },
  plugins: [],
};
