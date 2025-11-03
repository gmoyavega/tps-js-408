const form = document.getElementById('contactForm');
const btn = document.getElementById('button');

form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Deshabilitar botón y mostrar estado de carga
    btn.disabled = true;
    btn.value = 'Sending...';

    // URL de Google Apps Script
    const scriptURL = 'https://script.google.com/macros/s/AKfycbxCp8WdJzUx13oi6-OI6TJNfRsRos3_e2xztL-zho4oSS6bJ-rw1agndE87dJdAxoc6cA/exec';

    // IDs de EmailJS
    const serviceID = 'default_service';
    const templateID = 'template_tthm3je';

    // Primero enviar a Google Sheets
    fetch(scriptURL, { method: 'POST', body: new FormData(form)})
        .then(response => {
            // Luego enviar el email con EmailJS
            return emailjs.sendForm(serviceID, templateID, form);
        })
        .then(() => {
            // Éxito - ambos servicios funcionaron
            alert('Message sent successfully! The data should appear in your Google Sheet shortly.');
            form.reset();
        })
        .catch(error => {
            // Error en cualquier paso
            console.error('Error!', error);
            alert('An error occurred while sending the message. Please check the console for details and try again.');
        })
        .finally(() => {
            // Siempre restaurar el botón
            btn.disabled = false;
            btn.value = 'Enviar Mensaje';
        });
});
