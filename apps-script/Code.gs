/*************************************************************************
 *  Code.gs — Backend del formulario de contacto (Google Apps Script)
 *  Portfolio de Jesús S. Gonzalez
 *
 *  Qué hace:
 *   1. Recibe los datos del formulario (name, email, message).
 *   2. Los guarda como una fila en una Google Sheet.
 *   3. Te envía un email de aviso a tu correo.
 *
 *  Cómo publicarlo (paso a paso al final del archivo).
 *************************************************************************/

// ⚙️  CONFIGURACIÓN — editá estos dos valores
var SHEET_ID    = '';                                   // ID de tu Google Sheet (ver instrucciones)
var NOTIFY_EMAIL = 'jesussgonzalez86@gmail.com';        // dónde querés recibir el aviso

// Nombre de la pestaña dentro de la hoja
var SHEET_NAME = 'Mensajes';


/** Recibe el POST del formulario */
function doPost(e) {
  try {
    var p = (e && e.parameter) ? e.parameter : {};
    var name    = (p.name    || '').toString().trim();
    var email   = (p.email   || '').toString().trim();
    var message = (p.message || '').toString().trim();
    var origin  = (p.origin  || '').toString().trim();

    // Honeypot anti-spam: si el campo oculto viene relleno, es un bot. Ignoramos.
    if ((p.company || '').toString().trim() !== '') {
      return json({ ok: true, ignored: true });
    }

    // Validación mínima en el servidor
    if (!name || !email || !message) {
      return json({ ok: false, error: 'Faltan campos obligatorios.' });
    }

    // 1) Guardar en la hoja
    var sheet = getSheet_();
    sheet.appendRow([new Date(), name, email, message, origin]);

    // 2) Aviso por email
    if (NOTIFY_EMAIL) {
      MailApp.sendEmail({
        to: NOTIFY_EMAIL,
        subject: '📩 Nuevo mensaje del portfolio — ' + name,
        replyTo: email,
        body:
          'Nombre: ' + name + '\n' +
          'Email: ' + email + '\n' +
          'Origen: ' + origin + '\n\n' +
          'Mensaje:\n' + message
      });
    }

    return json({ ok: true });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  }
}

/** Permite abrir la URL en el navegador para comprobar que está activa */
function doGet() {
  return json({ ok: true, status: 'Endpoint activo. Usá POST para enviar mensajes.' });
}

/** Devuelve / crea la pestaña de la hoja con sus encabezados */
function getSheet_() {
  var ss = SHEET_ID ? SpreadsheetApp.openById(SHEET_ID) : SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(['Fecha', 'Nombre', 'Email', 'Mensaje', 'Origen']);
    sheet.setFrozenRows(1);
  }
  return sheet;
}

/** Helper: respuesta JSON */
function json(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}


/*************************************************************************
 *  INSTRUCCIONES DE PUBLICACIÓN
 *  ---------------------------------------------------------------------
 *  1. Creá una Google Sheet nueva (sheets.new). Copiá su ID desde la URL:
 *        https://docs.google.com/spreadsheets/d/  ESTE_ES_EL_ID  /edit
 *     Pegalo arriba en la variable SHEET_ID.
 *
 *  2. Entrá a https://script.google.com  →  «Nuevo proyecto».
 *     Borrá el contenido y pegá TODO este archivo. Guardá (Ctrl+S).
 *
 *  3. Implementar:  botón «Implementar» → «Nueva implementación».
 *        • Tipo: «Aplicación web»
 *        • Ejecutar como: «Yo»
 *        • Quién tiene acceso: «Cualquier persona»
 *     Hacé clic en «Implementar» y autorizá los permisos (tu cuenta Google).
 *
 *  4. Copiá la «URL de la aplicación web» (termina en /exec).
 *     Pegala en assets/js/app.js, en la variable:
 *        var FORM_ENDPOINT = 'https://script.google.com/macros/s/XXXX/exec';
 *
 *  5. ¡Listo! Probá el formulario. Cada mensaje quedará en la hoja y te
 *     llegará un email. Si cambiás este código, volvé a «Implementar» →
 *     «Administrar implementaciones» → editar → «Nueva versión».
 *
 *  Nota: el sitio envía con fetch en modo «no-cors», por eso el formulario
 *  muestra «enviado» en cuanto la petición sale. Verificá en la hoja que
 *  los mensajes están llegando durante las primeras pruebas.
 *************************************************************************/
