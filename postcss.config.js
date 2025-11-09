const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');
const flexbugs = require('postcss-flexbugs-fixes');
const presetEnv = require('postcss-preset-env');

module.exports = {
  plugins: [
    flexbugs(),
    tailwindcss('./tailwind.config.js'),
    autoprefixer(),
    presetEnv({
      autoprefixer: false,
      stage: 3,
      features: { 'custom-properties': false }
    }),
  ]
};