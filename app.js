const form = document.getElementById('contactForm');
const btn = document.getElementById('button');
const scriptURL = 'https://script.google.com/macros/s/AKfycbwVfijbqxR1aWBltx0dlZZj8yxkKSXq9ITDsgFsXqoaRci1I2pYYqS9_bTvaksfPKUibg/exec';

form.addEventListener('submit', e => {
    e.preventDefault(); 
    
    // Validación básica del formulario antes de enviar
    if (!form.checkValidity()) {
        alert('Por favor, completa todos los campos requeridos correctamente.');
        return;
    }
    
    btn.disabled = true;
    btn.textContent = 'Enviando...';
    
    const formData = new FormData(form);
    const searchParams = new URLSearchParams(formData);
    
    // ✅ DEBUG: Ver los datos que se envían
    console.log('Datos a enviar:', Object.fromEntries(searchParams));
    
    fetch(scriptURL, { 
        method: 'POST', 
        body: searchParams,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        redirect: 'follow' 
    })
    .then(response => {
        // Verificar si la respuesta es OK
        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }
        return response.text(); // o response.json() si tu script devuelve JSON
    })
    .then(data => {
        console.log('Success! Respuesta completa:', data);
        alert('¡Mensaje enviado correctamente!');
        
        form.reset();
        btn.disabled = false;
        btn.textContent = 'Enviar Mensaje';
    })
    .catch(error => {
        console.error('Error completo:', error);
        alert(`Error al enviar: ${error.message}`);
        
        btn.disabled = false;
        btn.textContent = 'Enviar Mensaje';
    });
});
