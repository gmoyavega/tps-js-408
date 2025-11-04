// 1. Configuración: ¡Verifica estos dos valores de nuevo!
// CRÍTICO: Debe ser el ID (la cadena alfanumérica larga)
const SPREADSHEET_ID = '10rKsoSBO_sdfT0ayRof0SpUJnu1wPBrQijwzWKpZGN5-kM69veBVw3xc'; 
// CRÍTICO: Debe ser el nombre exacto de la pestaña
const SHEET_NAME = 'Hoja1'; 

/**
 * Función principal para manejar solicitudes HTTP POST (envío de formulario).
 */
function doPost(e) {
  try {
    // Paso 1: Obtener los datos del formulario (e.parameter)
    const datosRecibidos = e.parameter;

    // Extracción de todos los 5 campos de tu HTML
    const nombre = datosRecibidos.nombre;
    const email = datosRecibidos.email;
    const telefono = datosRecibidos.telefono;
    const asunto = datosRecibidos.asunto;    
    const mensaje = datosRecibidos.mensaje;  

    // Paso 2: Abrir la Hoja de Cálculo
    // Si esta línea falla, el ID o los permisos son incorrectos.
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    const sheet = spreadsheet.getSheetByName(SHEET_NAME);

    // Si la hoja no se encuentra (nombre incorrecto)
    if (!sheet) {
        throw new Error(`Error: La pestaña con el nombre "${SHEET_NAME}" no fue encontrada.`);
    }

    // Paso 3: Crear el array de la nueva fila (Asegúrate de tener 6 columnas en tu hoja)
    const timestamp = new Date(); 
    
    // Orden de las columnas: Fecha, Nombre, Email, Teléfono, Asunto, Mensaje
    const newRow = [
      timestamp, 
      nombre,    
      email,     
      telefono,  
      asunto,    
      mensaje    
    ];

    // Paso 4: Escribir la fila en la hoja
    sheet.appendRow(newRow);

    // Paso 5: Respuesta de éxito (para que app.js no arroje error)
    return ContentService.createTextOutput(JSON.stringify({
      result: 'success',
      message: `Datos guardados.`
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    // Paso 6: Captura cualquier error, lo registra y lo envía al cliente.
    Logger.log('ERROR CRÍTICO INTERNO: ' + error.message); 
    
    return ContentService.createTextOutput(JSON.stringify({
      result: 'error',
      message: 'Fallo al guardar. Revisa los logs de Apps Script.',
      details: error.message 
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService.createTextOutput("Servicio de POST activo.")
    .setMimeType(ContentService.MimeType.TEXT);
}

   
