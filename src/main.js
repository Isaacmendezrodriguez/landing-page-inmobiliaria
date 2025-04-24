import './style.css'
import Alpine from 'alpinejs'
import 'aos/dist/aos.css';
import AOS from 'aos';


// Formularios de contacto (no afecta filtros)
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  const feedback = document.getElementById("formFeedback");

  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const nombre = form.nombre.value.trim();
      const email = form.email.value.trim();
      const mensaje = form.mensaje.value.trim();

      if (!nombre || !email || !mensaje) {
        alert("Por favor, completa todos los campos.");
        return;
      }

      // Simula envío exitoso
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        feedback.classList.remove("hidden");
        form.reset();
      } catch (error) {
        alert("Hubo un problema al enviar el mensaje.");
      }
    });
  }
});

// -------
// FUNCIONALIDAD PARA EL FILTRO DE PROPIEDADES
// -------

window.propiedadesApp = function () {
  return {
    ciudadSeleccionada: '',
    precioMin: '',
    precioMax: '',
    propiedades: [
      {
        nombre: "Casa Moderna",
        descripcion: "3 recámaras, 2 baños",
        ciudad: "CDMX",
        precio: 3200000,
        imagen: "/images/propiedades/casa-moderna.webp"
      },
      {
        nombre: "Casa Campestre",
        descripcion: "Jardín amplio, excelente clima",
        ciudad: "Querétaro",
        precio: 2100000,
        imagen: "/images/propiedades/casa-campestre.webp"
      },
      {
        nombre: "Casa Minimalista",
        descripcion: "Diseño moderno, 2 niveles",
        ciudad: "CDMX",
        precio: 2850000,
        imagen: "/images/propiedades/casa-minimalista.webp"
      }
    ]
    ,
    get ciudades() {
      return [...new Set(this.propiedades.map(p => p.ciudad))];
    },
    propiedadesFiltradas() {
      return this.propiedades.filter(p => {
        const ciudadOK = !this.ciudadSeleccionada || p.ciudad === this.ciudadSeleccionada;
        const precioMinOK = !this.precioMin || p.precio >= parseInt(this.precioMin);
        const precioMaxOK = !this.precioMax || p.precio <= parseInt(this.precioMax);
        return ciudadOK && precioMinOK && precioMaxOK;
      });
    },
    limpiarFiltros() {
      this.ciudadSeleccionada = '';
      this.precioMin = '';
      this.precioMax = '';
    }
  }
}

// Inicializar Alpine DESPUÉS de definir `propiedadesApp`
window.Alpine = Alpine
Alpine.start()

// Inicializar AOS
AOS.init({
  duration: 1000,
  once: true
});


// -------
// SLIDER AUTOMÁTICO DE TESTIMONIOS
// -------

document.addEventListener("DOMContentLoaded", () => {
  const track = document.getElementById("testimonial-track");
  const next = document.getElementById("next-testimonial");
  const prev = document.getElementById("prev-testimonial");

  if (!track || !next || !prev) return;

  const totalSlides = track.children.length;
  let current = 0;

  function updateSlider(index) {
    track.style.transform = `translateX(-${index * 100}%)`;
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

  // Slide automático cada 5 segundos
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
