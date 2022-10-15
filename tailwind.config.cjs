const config = {
  content: ["./src/**/*.{html,js,svelte,ts}",'@stand-io/bienes-components/**/*.{svelte,js}','../**/@stand-io/bienes-components/**/*.{svelte,js}'],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#80a4ed",
          secondary: "#48483a",
          accent: "#d33e43",
          neutral: "#3d4451",
          "base-100": "#ffffff",
        },
      }
    ],
  },
  theme: {
    extend: {},
  },

  plugins: [require('daisyui')],
};

module.exports = config;
