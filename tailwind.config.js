/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",                     // Para tu index.html en la raíz
    "./*.html",                         // Para CUALQUIER otro archivo .html en la raíz (como test-grid.html, propiedad-casa-moderna.html)
    "./src/**/*.{js,ts,jsx,tsx,html,vue}" // Para archivos JS, TS, HTML, Vue, etc., DENTRO de la carpeta src y sus subcarpetas
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}