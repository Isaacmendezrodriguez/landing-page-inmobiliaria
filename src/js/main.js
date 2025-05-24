// src/main.js
import 'swiper/css/bundle';
import Swiper from 'swiper/bundle';

import '../css/style.css'

import Alpine from 'alpinejs';
import intersect from '@alpinejs/intersect';
import 'aos/dist/aos.css';
import AOS from 'aos';

// Registra plugins de Alpine
Alpine.plugin(intersect);
window.Alpine = Alpine;

// App de propiedades para el filtro
window.propiedadesApp = function() {
  return {
    filtros: {
      tipo: '',
      precio: '',
      ubicacion: ''
    },
    propiedadesDestacadas: [
      { 
        id: "casa-moderna",
        nombre: "Casa Moderna",
        descripcion: "3 recámaras, 2 baños",
        ciudad: "Polanco",
        tipo: "casa",
        precio: 3250000,
        imagen: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80"
      },
      {
        id: "casa-minimalista",
        nombre: "Casa Minimalista",
        descripcion: "2 recámaras, 2.5 baños",
        ciudad: "Condesa",
        tipo: "casa",
        precio: 2850000,
        imagen: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80"
      },
      {
        id: "casa-campestre",
        nombre: "Casa Campestre",
        descripcion: "4 recámaras, 3 baños",
        ciudad: "Valle de Bravo",
        tipo: "casa",
        precio: 4500000,
        imagen: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80"
      }
    ],
    propiedadesAdicionales: [
      {
        id: "departamento-lujo",
        nombre: "Departamento de Lujo",
        descripcion: "3 recámaras, 3.5 baños",
        ciudad: "Polanco",
        tipo: "departamento",
        precio: 4500000,
        imagen: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=500"
      },
      {
        id: "penthouse-reforma",
        nombre: "Penthouse en Reforma",
        descripcion: "4 recámaras, 4.5 baños",
        ciudad: "Reforma",
        tipo: "departamento",
        precio: 6500000,
        imagen: "https://images.unsplash.com/photo-1567767292278-a4f21aa2d36e?w=500"
      },
      {
        id: "loft-industrial",
        nombre: "Loft Industrial",
        descripcion: "1 recámara, 1.5 baños",
        ciudad: "Santa Fe",
        tipo: "departamento",
        precio: 2800000,
        imagen: "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=500"
      },
      {
        id: "casa-familiar",
        nombre: "Casa Familiar",
        descripcion: "4 recámaras, 3.5 baños",
        ciudad: "Coyoacán",
        tipo: "casa",
        precio: 5200000,
        imagen: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=500"
      },
      {
        id: "casa-playa",
        nombre: "Casa de Playa",
        descripcion: "3 recámaras, 3.5 baños",
        ciudad: "Acapulco",
        tipo: "casa",
        precio: 7800000,
        imagen: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?w=500"
      }
    ],
    get propiedades() {
      return [...this.propiedadesDestacadas, ...this.propiedadesAdicionales];
    },
    propiedadesFiltradas() {
      if (window.location.pathname === '/index.html') {
        return this.propiedadesDestacadas;
      }
      return this.propiedades.filter(propiedad => {
        const cumpleTipo = !this.filtros.tipo || propiedad.tipo === this.filtros.tipo;
        const cumplePrecio = !this.filtros.precio || this.cumplePrecio(propiedad.precio, this.filtros.precio);
        const cumpleUbicacion = !this.filtros.ubicacion || propiedad.ciudad.toLowerCase().includes(this.filtros.ubicacion.toLowerCase());
        
        return cumpleTipo && cumplePrecio && cumpleUbicacion;
      });
    },
    cumplePrecio(precio, rango) {
      switch(rango) {
        case 'menos-3m':
          return precio < 3000000;
        case '3m-5m':
          return precio >= 3000000 && precio <= 5000000;
        case 'mas-5m':
          return precio > 5000000;
        default:
          return true;
      }
    }
  }
}

// Inicializa Alpine.js
Alpine.start();

// Inicializa AOS
AOS.init({
  duration: 800,
  offset: 100,
  once: true
});

// Inicializa Swiper para el slider de testimonios
document.addEventListener('DOMContentLoaded', function () {
  const swiperTestimonios = new Swiper('.testimonios-slider', {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    breakpoints: {
      640: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 3,
      },
    },
  });
});

// Función para manejar el detalle de propiedad
window.detallePropiedad = function(id) {
  return {
    propiedad: null,
    init() {
      const app = window.propiedadesApp();
      this.propiedad = app.propiedades.find(p => p.id === id);
    }
  }
}
