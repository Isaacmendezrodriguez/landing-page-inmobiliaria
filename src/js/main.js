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
    ciudadSeleccionada: '',
    precioMin: '',
    precioMax: '',
    propiedades: [
      { 
        id: "casa-moderna", // ID para la primera
        nombre: "Casa Moderna",
        descripcion: "3 recámaras, 2 baños",
        ciudad: "CDMX",
        precio: 3200000,
        imagen: "/images/propiedades/casa-moderna.webp",
        imagenes: [
          "/images/propiedades/casa-moderna.webp", // Puedes incluir la principal aquí también
          "/images/propiedades/casa-moderna/sala.webp",
          "/images/propiedades/casa-moderna/cocina.webp",
          "/images/propiedades/casa-moderna/recamara1.webp",
          "/images/propiedades/casa-moderna/jardin.webp"
          // Añade más rutas si tienes más imágenes para Casa Moderna
        ],
        

      },
      { 
        id: "casa-campestre", // <--- AÑADE ESTE ID
        nombre: "Casa Campestre",
        descripcion: "Jardín amplio, exc clima",
        ciudad: "Querétaro",
        precio: 2100000,
        imagen: "/images/propiedades/casa-campestre.webp"
      },
      { 
        id: "casa-minimalista", // <--- AÑADE ESTE ID
        nombre: "Casa Minimalista",
        descripcion: "Diseño moderno, 2 niveles",
        ciudad: "CDMX",
        precio: 2850000,
        imagen: "/images/propiedades/casa-minimalista.webp"
      }
    ],
    get ciudades() {
      return [...new Set(this.propiedades.map(p => p.ciudad))];
    },
    propiedadesFiltradas() {
      return this.propiedades.filter(p => {
        const ciudadOK    = !this.ciudadSeleccionada || p.ciudad === this.ciudadSeleccionada;
        const precioMinOK = !this.precioMin          || p.precio >= this.precioMin;
        const precioMaxOK = !this.precioMax          || p.precio <= this.precioMax;
        return ciudadOK && precioMinOK && precioMaxOK;
      });
    },
    limpiarFiltros() {
      this.ciudadSeleccionada = '';
      this.precioMin          = '';
      this.precioMax          = '';
    }
  };
};

// Componente de detalle de propiedad
window.detallePropiedad = function() {
  return {
    nombre:   '',
    imagenes: [],
    init() {
      // Carga la primera propiedad por defecto
      const primera = window.propiedadesApp().propiedades[0];
      this.nombre   = primera.nombre;
      this.imagenes = primera.imagenes || [primera.imagen];

      // Inicializa Swiper para el detalle
      new Swiper('.mySwiper', {
        loop: true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
      });
    }
  };
};

// Arranca Alpine y AOS
Alpine.start();
AOS.init({
  duration: 1000,
  once:     true
});

// SLIDER AUTOMÁTICO DE TESTIMONIOS
document.addEventListener("DOMContentLoaded", () => {
  const track = document.getElementById("testimonial-track");
  const next  = document.getElementById("next-testimonial");
  const prev  = document.getElementById("prev-testimonial");

  if (!track || !next || !prev) return;

  const totalSlides = track.children.length;
  let current = 0;

  function updateSlider(idx) {
    track.style.transform = `translateX(-${idx * 100}%)`;
  }

  next.addEventListener("click", () => {
    current = (current + 1) % totalSlides;
    updateSlider(current);
    resetAutoSlide();
  });

  prev.addEventListener("click", () => {
    current = (current - 1 + totalSlides) % totalSlides;
    updateSlider(current);
    resetAutoSlide();
  });

  let autoSlide = setInterval(() => {
    current = (current + 1) % totalSlides;
    updateSlider(current);
  }, 5000);

  function resetAutoSlide() {
    clearInterval(autoSlide);
    autoSlide = setInterval(() => {
      current = (current + 1) % totalSlides;
      updateSlider(current);
    }, 5000);
  }
});
