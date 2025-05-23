// vite.config.js
import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        casaModerna: resolve(__dirname, 'propiedad-casa-moderna.html'),
        casaCampestre: resolve(__dirname, 'propiedad-casa-campestre.html'),
        casaMinimalista: resolve(__dirname, 'propiedad-casa-minimalista.html')
        // Añade una entrada para cada archivo HTML que tengas en la raíz
      }
    }
  }
  // ... cualquier otra configuración de Vite que tengas
})