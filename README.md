# Portfolio — Jesús S. Gonzalez

Sitio web personal de **Jesús S. Gonzalez**, desarrollador web frontend & freelancer.
Diseño moderno, responsive (mobile-first desde 375px), accesible y optimizado para
conseguir clientes en Workana, LinkedIn y contacto directo por WhatsApp.

🔗 **Demo:** https://jesussgonzalez.github.io/Jesus-S.-Gonzalez/

---

## ✨ Características

- **8 secciones**: Hero, Servicios, Stack técnico, Proyectos, Sobre mí, Propuesta de valor, Contacto y Footer.
- **Responsive mobile-first** con menú hamburguesa en pantallas chicas.
- **Animaciones suaves** de entrada al hacer scroll (con degradación: el contenido siempre se ve aunque no se animen).
- **Formulario de contacto** con validación en cliente, estado "Enviando…", mensajes de éxito/error y **protección anti-spam (honeypot)**.
- **Conexión opcional con Google Apps Script** para recibir los mensajes en una Google Sheet + aviso por email.
- **Temas conmutables** (panel de Tweaks): Índigo, Cian neón, Esmeralda y Claro, más 3 combinaciones tipográficas. La elección se guarda en el navegador.
- **Zonas de imagen arrastrables** para la foto de "Sobre mí" y las capturas de proyectos.
- **Accesibilidad**: HTML5 semántico, `aria-*`, labels, skip-link, foco visible, navegación por teclado y buen contraste.

---

## 📂 Estructura del proyecto

```
.
├── index.html              # Estructura HTML5 semántica de toda la página
├── assets/
│   ├── css/
│   │   └── styles.css      # Estilos organizados por secciones (con variables y temas)
│   └── js/
│       ├── app.js          # Interacciones: menú, scroll, reveal, validación y envío del form
│       └── tweaks-app.jsx  # Panel de variaciones visuales (color / tipografía)
├── apps-script/
│   └── Code.gs             # Backend del formulario (Google Apps Script)
├── image-slot.js           # Componente para arrastrar imágenes (foto/proyectos)
├── tweaks-panel.jsx        # Base del panel de ajustes
└── README.md
```

---

## 🚀 Pasos para publicarlo en GitHub Pages

1. Subí los archivos a tu repositorio (`Jesus-S.-Gonzalez`).
2. En GitHub: **Settings → Pages**.
3. En **Source** elegí la rama `main` y la carpeta `/ (root)`. Guardá.
4. Esperá ~1 minuto. Tu sitio queda en:
   `https://TU-USUARIO.github.io/Jesus-S.-Gonzalez/`

---

## 📨 Conectar el formulario con Google Apps Script

Para recibir los mensajes en una planilla y por email:

1. Creá una **Google Sheet** nueva (`sheets.new`) y copiá su **ID** desde la URL:
   `https://docs.google.com/spreadsheets/d/` **`ESTE_ES_EL_ID`** `/edit`
2. Andá a **https://script.google.com** → **Nuevo proyecto**.
3. Pegá todo el contenido de `apps-script/Code.gs` y completá arriba:
   - `SHEET_ID` → el ID del paso 1.
   - `NOTIFY_EMAIL` → tu correo (ya viene con `jesussgonzalez86@gmail.com`).
4. **Implementar → Nueva implementación → Aplicación web**:
   - Ejecutar como: **Yo**
   - Quién tiene acceso: **Cualquier persona**
   - Implementar → **autorizá** los permisos.
5. Copiá la **URL de la aplicación web** (termina en `/exec`).
6. Pegala en `assets/js/app.js`:
   ```js
   var FORM_ENDPOINT = 'https://script.google.com/macros/s/XXXX/exec';
   ```
7. Probá el formulario: el mensaje aparece en la hoja y te llega un email. ✅

> Si modificás `Code.gs`, volvé a **Implementar → Administrar implementaciones → editar → Nueva versión**.
> El envío usa `fetch` en modo `no-cors`, por eso conviene confirmar en la hoja durante las primeras pruebas.

---

## 🎨 Personalización

- **Colores y tipografía**: activá el panel de **Tweaks** (barra superior) para probar temas en vivo. Para fijar uno por defecto, cambiá los atributos del `<html>` en `index.html`:
  ```html
  <html lang="es" data-theme="indigo" data-font="grotesk">
  ```
  Temas: `indigo` · `cyan` · `emerald` · `light` — Fuentes: `grotesk` · `sora` · `system`.
- **Servicios, stack y propuesta de valor**: se generan desde arreglos al inicio de `assets/js/app.js` (`SERVICES`, `STACK`, `VALUES`). Editá ahí los textos.
- **Proyectos**: en `index.html`, sección `#proyectos`. Duplicá una tarjeta `<article class="project">` para sumar uno nuevo.
- **Imágenes**: arrastrá una foto/captura sobre las zonas punteadas (foto de perfil y proyectos); quedan guardadas. Para producción, reemplazá por imágenes optimizadas (WebP, ~1280×800).

---

## ✅ Checklist antes de publicar

- [ ] Reemplazar las capturas de proyectos por imágenes reales optimizadas.
- [ ] Subir una foto profesional en "Sobre mí".
- [ ] Pegar la URL `/exec` en `FORM_ENDPOINT` y probar un envío real.
- [ ] Agregar un `favicon` y una imagen `og:image` real para compartir el link.
- [ ] Revisar que los enlaces de WhatsApp, LinkedIn y GitHub sean correctos.

---

## 🛠️ Tecnologías

HTML5 · CSS3 (variables custom) · JavaScript (ES) · React (solo para el panel de ajustes) · Google Apps Script

---

© Jesús S. Gonzalez — Frontend Developer
