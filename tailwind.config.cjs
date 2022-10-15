const config = {
  content: ["./src/**/*.{html,js,svelte,ts}",'@stand-io/bienes-components/**/*.{svelte,js}','../**/@stand-io/bienes-components/**/*.{svelte,js}'],


  
  theme: {
    extend: {},
  },

  plugins: [require('daisyui')],
};

module.exports = config;
