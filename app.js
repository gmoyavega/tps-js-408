const form = document.getElementById('contactForm');
const btn = document.getElementById('button');

// 🔴 ¡IMPORTANTE! REEMPLAZA ESTA URL con la URL que obtienes al implementar
// tu Google Apps Script como "Aplicación Web" con acceso "Cualquiera".
const scriptURL = 'https://script.google.com/macros/s/AKfycbw6O-OfF3Ypvk7THLfp7G36AdDF9jB3IYv9bYIeuZ9GfwDbEVfWckZM4U5AVpZrm3CBLw/exec';

form.addEventListener('submit', e => {
    e.preventDefault(); // Detiene el envío de formulario tradicional
    
    // Deshabilita el botón para evitar envíos múltiples
    btn.disabled = true;
    btn.textContent = 'Enviando...';

    // Usamos fetch para enviar los datos como POST
    fetch(scriptURL, { 
        method: 'POST', 
        body: new FormData(form),
        // Se añade 'redirect: "follow"' para manejar mejor la redirección del GAS
        redirect: 'follow' 
    })
    .then(response => {
        // Asumimos éxito si no hubo error de red/CORS
        console.log('Success!', response);
        alert('¡Mensaje enviado! Verifica la Hoja de Cálculo.');
        
        form.reset();
        btn.disabled = false;
        btn.textContent = 'Enviar Mensaje';
    })
    .catch(error => {
        // Esto captura errores de red o el error de CORS que viste inicialmente
        console.error('Error!', error.message);
        alert('Ocurrió un error al enviar el mensaje. Revisa la consola para más detalles.');
        
        btn.disabled = false;
        btn.textContent = 'Enviar Mensaje';
    });
});

