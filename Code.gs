// 1. Configuración: ¡REEMPLAZA ESTE VALOR AHORA!
// 🚩 ¡CORRECCIÓN CRÍTICA! DEBE ser el ID de la hoja, no el nombre del archivo.
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
    const datosRecibidos = e.parameter;

    // 🚩 ¡CORRECCIÓN! Extrayendo todos los campos presentes en tu HTML:
    const nombre = datosRecibidos.nombre;
    const email = datosRecibidos.email;
    const telefono = datosRecibidos.telefono; // Nuevo campo
    const asunto = datosRecibidos.asunto;     // Nuevo campo
    const mensaje = datosRecibidos.mensaje;   // Nuevo campo

    // Paso 2: Abrir la Hoja de Cálculo
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = spreadsheet.getSheetByName(Hoja1);

    // Verificación de seguridad adicional
    if (!sheet) {
        throw new Error(`La hoja con el nombre "${SHEET_NAME}" no fue encontrada.`);
    }

    // Paso 3: Crear el array de la nueva fila de datos
    const timestamp = new Date(); 
    
    // 🚩 ¡CORRECCIÓN! La nueva fila incluye todos los campos del formulario.
    const newRow = [
      timestamp, // 1. Marca de tiempo
      nombre,    // 2. Nombre
      email,     // 3. Email
      telefono,  // 4. Teléfono
      asunto,    // 5. Asunto
      mensaje    // 6. Mensaje
    ];

    // Paso 4: Escribir la fila en la hoja
    sheet.appendRow(newRow);

    // Paso 5: Devolver una respuesta de éxito
    return ContentService.createTextOutput(JSON.stringify({
      result: 'success',
      message: `¡Datos de ${nombre} guardados exitosamente!`
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    // Paso 6: Devolver una respuesta de error si algo falla
    Logger.log('ERROR EN SCRIPT: ' + error.message); 
    return ContentService.createTextOutput(JSON.stringify({
      result: 'error',
      message: 'Error al procesar la solicitud. Revisa los Logs de Ejecución en Apps Script.',
      details: error.message
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService.createTextOutput("Servicio activo. Usa POST para enviar datos.")
    .setMimeType(ContentService.MimeType.TEXT);
}
