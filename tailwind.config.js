/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily:{
        montserrat: "Montserrat",
        merriweather: "Merriweather Sans",
        poppins: "Poppins"
      },
      colors:{
        cream: "#F1F7ED",
        vulcan: "#13111a",
        oxford: "#101d42",
        bluef : "#12EAEA",
        purplef: "#CA3CFF",
      },
      screens:{
        'mil' : '1024px'
      }
    },
  },
  plugins: [],
}

