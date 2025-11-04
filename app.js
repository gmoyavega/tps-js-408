const form = document.getElementById('contactForm');
const btn = document.getElementById('button');

// 🔴 ¡IMPORTANTE! Reemplaza esta URL con la URL de tu Web App de GAS.
const scriptURL = 'https://script.google.com/macros/s/AKfycbyRt3LwJS9x8bhJ3AJCx0sQH8YL40jW8w8A1G6wIDEJO4wymWowHYj4dgYCLHPn9Dq8bQ/exec';

form.addEventListener('submit', e => {
    e.preventDefault(); 
    
    btn.disabled = true;
    btn.textContent = 'Enviando...';
    
    // 🚩 CORRECCIÓN: Usamos URLSearchParams para asegurar que el formato de envío
    // sea compatible con cómo Google Apps Script espera el objeto 'e.parameter'.
    const formData = new FormData(form);
    const searchParams = new URLSearchParams(formData);

    fetch(scriptURL, { 
        method: 'POST', 
        // Enviamos los datos en formato URL-encoded, que es ideal para GAS
        body: searchParams,
        // Añadir cabeceras para asegurar que el servidor (GAS) sepa cómo interpretar el cuerpo
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        redirect: 'follow' 
    })
    .then(response => {
        // En este punto, la comunicación es exitosa.
        console.log('Success! La respuesta de Google fue:', response);
        alert('¡Mensaje enviado! Los datos deberían estar en tu Hoja de Cálculo.');
        
        form.reset();
        btn.disabled = false;
        btn.textContent = 'Enviar Mensaje';
    })
    .catch(error => {
        console.error('Error!', error.message);
        alert('Ocurrió un error al enviar el mensaje. Revisa la consola para más detalles.');
        
        btn.disabled = false;
        btn.textContent = 'Enviar Mensaje';
    });
});

