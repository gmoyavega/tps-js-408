// 1. Configuración: reemplaza con tus datos
// IMPORTANTE: Debes tener el ID de tu Hoja de Cálculo de Google
const SPREADSHEET_ID = 'Envíos del formulario de contacto'; 
const SHEET_NAME = 'Hoja1'; // Asegúrate de que el nombre de la pestaña sea correcto

/**
 * Se ejecuta cuando el código recibe una solicitud POST (envío de formulario).
 * @param {object} e El objeto de evento que contiene los datos enviados.
 * @returns {object} Una respuesta de texto para el navegador.
 */
function doPost(e) {
  try {
    // Paso 1: Obtener los datos del formulario
    // Los datos se encuentran en 'e.parameter' para envíos de formularios estándar (x-www-form-urlencoded)
    const datosRecibidos = e.parameter;

    // Extrae los campos que esperas. ¡Asegúrate de que estos nombres
    // (ej. 'nombre', 'email') coincidan exactamente con los 'name'
    // de tus campos de formulario en HTML!
    const nombre = datosRecibidos.nombre;
    const email = datosRecibidos.email;
    // const mensaje = datosRecibidos.mensaje; // Si tienes más campos

    // Paso 2: Abrir la Hoja de Cálculo
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = spreadsheet.getSheetByName(SHEET_NAME);

    // Paso 3: Crear el array de la nueva fila de datos
    const timestamp = new Date(); // Añadir la fecha y hora de la recepción
    
    // El orden de los elementos aquí debe coincidir con el orden de tus columnas en la hoja
    const newRow = [
      timestamp,
      nombre,
      email
      // , mensaje // Si tienes más campos, añádelos
    ];

    // Paso 4: Escribir la fila en la hoja
    sheet.appendRow(newRow);

    // Paso 5: Devolver una respuesta de éxito al cliente (tu app de GitHub)
    // Esto es lo que el 'fetch' en 'app.js' recibirá.
    return ContentService.createTextOutput(JSON.stringify({
      result: 'success',
      message: `¡Datos de ${nombre} guardados exitosamente!`
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    // Paso 6: Devolver una respuesta de error si algo falla
    Logger.log(error); // Guarda el error en los logs del Apps Script
    return ContentService.createTextOutput(JSON.stringify({
      result: 'error',
      message: 'Error al procesar la solicitud.',
      details: error.message
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// Opcional: Útil para probar si la URL del script está activa.
function doGet(e) {
  return ContentService.createTextOutput("Servicio activo. Usa POST para enviar datos.")
    .setMimeType(ContentService.MimeType.TEXT);
}
