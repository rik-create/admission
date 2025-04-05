// postcss.config.mjs
export default {
  plugins: [
    require('tailwindcss'),  // Use the tailwindcss plugin here
    require('autoprefixer'),  // Optional, for adding vendor prefixes
  ],
};
