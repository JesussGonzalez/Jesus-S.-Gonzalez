/* =============================================================
   app.js — interacciones del portfolio
   - Tema/fuente persistentes (aplicados desde Tweaks)
   - Render de servicios, stack y propuesta de valor
   - Navbar: scroll state + menú mobile
   - Smooth scroll con cierre de menú
   - Reveal on scroll (IntersectionObserver)
   - Efecto de brillo en cards
   - Validación de formulario (cliente)
   ============================================================= */
(function () {
  'use strict';

  /* ---- 0. Tema y fuente persistentes ---- */
  // El panel de Tweaks guarda en localStorage; los aplicamos al cargar
  // para que el sitio recuerde la dirección visual elegida.
  try {
    var savedTheme = localStorage.getItem('jg_theme');
    var savedFont = localStorage.getItem('jg_font');
    if (savedTheme) document.documentElement.setAttribute('data-theme', savedTheme);
    if (savedFont) document.documentElement.setAttribute('data-font', savedFont);
  } catch (e) {}

  /* ---- 1. Datos: Servicios ---- */
  var ICON = {
    web: '<path d="M2 3h20v14H2z"/><path d="M8 21h8M12 17v4"/>',
    landing: '<path d="M4 4h16v6H4z"/><path d="M4 14h7v6H4zM15 14h5v6h-5z"/>',
    portfolio: '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-5-5L5 21"/>',
    redesign: '<path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4z"/>',
    automation: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>',
    integration: '<path d="M9 17H7A5 5 0 0 1 7 7h2M15 7h2a5 5 0 0 1 0 10h-2M8 12h8"/>'
  };

  var SERVICES = [
    { icon: 'web', title: 'Páginas web responsive', desc: 'Sitios que se ven perfectos en celular, tablet y desktop, con tiempos de carga óptimos.', benefit: 'Tu negocio luce profesional en cualquier pantalla.' },
    { icon: 'landing', title: 'Landing pages para negocios', desc: 'Páginas enfocadas en un objetivo claro: que el visitante te contacte, reserve o compre.', benefit: 'Más consultas con la misma cantidad de visitas.' },
    { icon: 'portfolio', title: 'Portfolios profesionales', desc: 'Presenta tu trabajo o servicios con una estética cuidada que transmite confianza.', benefit: 'Una primera impresión que te diferencia.' },
    { icon: 'redesign', title: 'Rediseño y optimización web', desc: 'Modernizo sitios existentes, mejoro su velocidad, accesibilidad y experiencia de uso.', benefit: 'Renová tu web sin empezar de cero.' },
    { icon: 'automation', title: 'Automatización con Apps Script', desc: 'Automatizo tareas repetitivas con Google Apps Script: reportes, correos y planillas.', benefit: 'Ahorrás horas de trabajo manual cada semana.' },
    { icon: 'integration', title: 'Integraciones y formularios', desc: 'Conecto tu sitio con WhatsApp, Google Sheets, formularios y APIs externas.', benefit: 'Tus datos y leads, organizados en un solo lugar.' }
  ];

  var STACK = [
    { name: 'HTML5', note: 'Semántica' },
    { name: 'CSS3', note: 'Layouts' },
    { name: 'Sass', note: 'Modular' },
    { name: 'JavaScript', note: 'ES moderno' },
    { name: 'React.js', note: 'Componentes' },
    { name: 'Node.js', note: 'Backend' },
    { name: 'Bootstrap', note: 'UI' },
    { name: 'Tailwind', note: 'Utility' },
    { name: 'Git', note: 'Versionado' },
    { name: 'GitHub', note: 'Deploy' },
    { name: 'Apps Script', note: 'Automatizar' },
    { name: 'APIs REST', note: 'Integración' }
  ];

  var VALUES = [
    { title: 'Diseño adaptable a celulares', desc: 'Mobile-first real: tu web funciona donde está la mayoría de tus clientes.' },
    { title: 'Código limpio y mantenible', desc: 'Estructura ordenada y estándar, fácil de escalar y de modificar a futuro.' },
    { title: 'Optimización de velocidad', desc: 'Imágenes y código optimizados para una carga rápida y mejor posicionamiento.' },
    { title: 'Comunicación clara', desc: 'Te mantengo al tanto en cada etapa, con plazos definidos y sin tecnicismos.' },
    { title: 'Enfoque en resultados', desc: 'Cada decisión apunta a un objetivo de negocio: más consultas, ventas o eficiencia.' },
    { title: 'Integración con tus herramientas', desc: 'WhatsApp, Sheets, formularios y APIs conectados para que todo fluya.' }
  ];

  function svgIcon(paths) {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' + paths + '</svg>';
  }

  var checkSvg = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>';

  /* ---- 2. Render dinámico ---- */
  var servicesGrid = document.getElementById('servicesGrid');
  if (servicesGrid) {
    servicesGrid.innerHTML = SERVICES.map(function (s, i) {
      return '<article class="card reveal" data-delay="' + (i % 3) + '">' +
        '<div class="card-icon">' + svgIcon(ICON[s.icon]) + '</div>' +
        '<h3>' + s.title + '</h3>' +
        '<p>' + s.desc + '</p>' +
        '<div class="card-benefit">' + checkSvg + '<span>' + s.benefit + '</span></div>' +
        '</article>';
    }).join('');
  }

  var stackGrid = document.getElementById('stackGrid');
  if (stackGrid) {
    stackGrid.innerHTML = STACK.map(function (t) {
      return '<div class="chip reveal"><span class="chip-dot"></span><span>' + t.name +
        '<small>' + t.note + '</small></span></div>';
    }).join('');
  }

  var valuesGrid = document.getElementById('valuesGrid');
  if (valuesGrid) {
    valuesGrid.innerHTML = VALUES.map(function (v, i) {
      var n = (i + 1) < 10 ? '0' + (i + 1) : '' + (i + 1);
      return '<div class="value reveal" data-delay="' + (i % 2) + '">' +
        '<span class="value-num">' + n + '</span>' +
        '<div><h3>' + v.title + '</h3><p>' + v.desc + '</p></div>' +
        '</div>';
    }).join('');
  }

  /* ---- 3. Navbar: scroll state ---- */
  var nav = document.getElementById('nav');
  function onScroll() {
    if (window.scrollY > 12) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---- 4. Menú mobile ---- */
  var toggle = document.getElementById('navToggle');
  var menu = document.getElementById('mobileMenu');
  function closeMenu() {
    menu.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Abrir menú');
  }
  function openMenu() {
    menu.classList.add('open');
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', 'Cerrar menú');
  }
  toggle.addEventListener('click', function () {
    if (menu.classList.contains('open')) closeMenu(); else openMenu();
  });
  menu.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', closeMenu);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && menu.classList.contains('open')) { closeMenu(); toggle.focus(); }
  });

  /* ---- 5. Reveal on scroll (robusto) ----
     El contenido es visible por defecto. La animación de entrada solo se
     activa si requestAnimationFrame confirma que la página se está pintando;
     en un contexto que no renderiza, todo queda visible sin animar. */
  var revealEls = Array.prototype.slice.call(document.querySelectorAll('.reveal'));
  function revealVisible() {
    var vh = window.innerHeight || document.documentElement.clientHeight;
    for (var i = revealEls.length - 1; i >= 0; i--) {
      var el = revealEls[i];
      if (el.getBoundingClientRect().top < vh * 0.92) {
        el.classList.add('in');
        revealEls.splice(i, 1);
      }
    }
  }
  requestAnimationFrame(function () {
    document.documentElement.classList.add('anim');
    revealVisible();
    window.addEventListener('scroll', revealVisible, { passive: true });
    window.addEventListener('resize', revealVisible);
    // Respaldo: revela cualquier elemento que aún no se haya mostrado.
    setTimeout(function () {
      document.querySelectorAll('.reveal:not(.in)').forEach(function (el) { el.classList.add('in'); });
    }, 1600);
  });

  /* ---- 6. Brillo que sigue al cursor en cards ---- */
  document.querySelectorAll('.card').forEach(function (card) {
    card.addEventListener('pointermove', function (e) {
      var r = card.getBoundingClientRect();
      card.style.setProperty('--mx', (e.clientX - r.left) + 'px');
      card.style.setProperty('--my', (e.clientY - r.top) + 'px');
    });
  });

  /* ---- 7. Validación + envío del formulario ---- */
  // ▶ Pegá aquí la URL de tu Web App de Google Apps Script (ver Code.gs).
  //   Mientras esté vacío, el formulario solo simula el envío.
  var FORM_ENDPOINT = 'https://script.google.com/macros/s/AKfycbzZ0jBHP0H3fXGg2bkm49fFuZPX-UCWwRYm78Io9zttEg69CYY9cBjMWne4TlEtdxFPRQ/exec';

  var form = document.getElementById('contactForm');
  var okAlert = document.getElementById('formSuccess');
  var errAlert = document.getElementById('formError');
  var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  function setInvalid(fieldId, invalid) {
    var f = document.getElementById(fieldId);
    if (f) f.classList.toggle('invalid', invalid);
  }

  function validate() {
    var name = document.getElementById('name');
    var email = document.getElementById('email');
    var message = document.getElementById('message');
    var ok = true;

    var nameBad = name.value.trim().length < 2;
    setInvalid('field-name', nameBad); if (nameBad) ok = false;

    var emailBad = !emailRe.test(email.value.trim());
    setInvalid('field-email', emailBad); if (emailBad) ok = false;

    var msgBad = message.value.trim().length < 10;
    setInvalid('field-message', msgBad); if (msgBad) ok = false;

    return ok;
  }

  if (form) {
    // validación en vivo una vez que el campo fue tocado
    ['name', 'email', 'message'].forEach(function (id) {
      var el = document.getElementById(id);
      el.addEventListener('blur', function () {
        if (el.value.trim() !== '') validate();
      });
      el.addEventListener('input', function () {
        var field = document.getElementById('field-' + id);
        if (field && field.classList.contains('invalid')) validate();
      });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      okAlert.classList.remove('show');
      errAlert.classList.remove('show');

      if (!validate()) {
        errAlert.classList.add('show');
        var firstBad = form.querySelector('.field.invalid input, .field.invalid textarea');
        if (firstBad) firstBad.focus();
        return;
      }

      // Honeypot: si está relleno, es un bot. Cortamos sin enviar (fingimos éxito).
      var honeypot = document.getElementById('company');
      if (honeypot && honeypot.value.trim() !== '') {
        okAlert.classList.add('show');
        form.reset();
        return;
      }

      var submitBtn = form.querySelector('.form-submit');
      var btnLabel = submitBtn.innerHTML;

      function setSending(on) {
        submitBtn.disabled = on;
        submitBtn.style.opacity = on ? '0.7' : '';
        submitBtn.style.pointerEvents = on ? 'none' : '';
        submitBtn.innerHTML = on ? 'Enviando…' : btnLabel;
      }
      function showSuccess() {
        okAlert.classList.add('show');
        form.reset();
        setSending(false);
      }
      function showError() {
        errAlert.querySelector('span').textContent = 'No se pudo enviar el mensaje. Probá de nuevo o escribime por WhatsApp.';
        errAlert.classList.add('show');
        setSending(false);
      }

      // Sin endpoint configurado: simulación (modo demo).
      if (!FORM_ENDPOINT) { showSuccess(); return; }

      // Envío real a Google Apps Script.
      // Usamos FormData (sin cabeceras personalizadas) para evitar el preflight CORS.
      setSending(true);
      var data = new FormData();
      data.append('name', document.getElementById('name').value.trim());
      data.append('email', document.getElementById('email').value.trim());
      data.append('message', document.getElementById('message').value.trim());
      data.append('origin', location.href);

      fetch(FORM_ENDPOINT, { method: 'POST', mode: 'no-cors', body: data })
        .then(function () { showSuccess(); })   // respuesta opaca (no-cors): el envío llegó
        .catch(function () { showError(); });
    });
  }

  /* ---- 8. Año del footer ---- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
