// Función que observa las secciones
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        // Si la sección es visible en al menos un 10%
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, {
    threshold: 0.1 // 10% de visibilidad para disparar la animación
});

// Seleccionamos todos los elementos con la clase .reveal
const elementsToAnimate = document.querySelectorAll('.reveal');

// Le decimos al observer que vigile cada uno
elementsToAnimate.forEach((el) => observer.observe(el));

// Actualizar el año del footer automáticamente
const yearSpan = document.getElementById('year');
const currentYear = new Date().getFullYear();
yearSpan.textContent = currentYear;
