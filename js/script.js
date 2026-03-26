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

//js de formulario


const $form = document.querySelector('.contact_form');
const $toast = document.getElementById('toast');

$form.addEventListener('submit', async (event) => {
  event.preventDefault();
  
  const formData = new FormData($form);
  
  try {
    const response = await fetch($form.action, {
      method: $form.method,
      body: formData,
      headers: { 'Accept': 'application/json' }
    });

    if (response.ok) {
      $form.reset();
      
      // Mostrar el toast
      $toast.classList.add('show');
      
      // Ocultarlo después de 4 segundos
      setTimeout(() => {
        $toast.classList.remove('show');
      }, 4000);

    } else {
      alert('Hubo un error al enviar. Intentá de nuevo.');
    }
  } catch (error) {
    alert('Error de conexión. Revisá tu internet.');
  }
});