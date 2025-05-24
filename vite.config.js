// vite.config.js
import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  base: './',  // Cambiado a relativo para Netlify
  server: {
    port: 3000,
    open: true, // Abre automáticamente el navegador
    host: true // Necesario para acceder desde la red local
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        propiedades: resolve(__dirname, 'propiedades.html'),
        casaModerna: resolve(__dirname, 'propiedad-casa-moderna.html'),
        casaCampestre: resolve(__dirname, 'propiedad-casa-campestre.html'),
        casaMinimalista: resolve(__dirname, 'propiedad-casa-minimalista.html'),
        casaPlaya: resolve(__dirname, 'propiedad-casa-playa.html'),
        casaFamiliar: resolve(__dirname, 'propiedad-casa-familiar.html'),
        penthouseReforma: resolve(__dirname, 'propiedad-penthouse-reforma.html'),
        departamentoLujo: resolve(__dirname, 'propiedad-departamento-lujo.html'),
        loftIndustrial: resolve(__dirname, 'propiedad-loft-industrial.html')
      },
      output: {
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: 'assets/[ext]/[name]-[hash].[ext]'
      }
    }
  }
  // ... cualquier otra configuración de Vite que tengas
})