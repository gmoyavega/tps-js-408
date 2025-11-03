const form = document.getElementById('contactForm');
const btn = document.getElementById('button');

form.addEventListener('submit', e => {
    e.preventDefault();
    btn.disabled = true;
    btn.value = 'Sending...';

    // ===========================================================================================
    // IMPORTANT:
    // 1. Follow the instructions in `instructions.md` to deploy your Google Apps Script.
    // 2. Replace the placeholder URL below with the Web App URL you get from the deployment.
    // 3. **Make sure to deploy the script with "Execute as: Me" and "Who has access: Anyone".**
    //    This is crucial to avoid `401 (Unauthorized)` errors.
    // ===========================================================================================
    const scriptURL = 'https://script.google.com/macros/s/AKfycbwN9E8Wxp_AUbH-sTeS9uZybO_f4tyso0Gt1ejdEve3VjDfveC4Eazt3UkevBwgaxeRqw/exec';

    fetch(scriptURL, { method: 'POST', body: new FormData(form)})
        .then(response => {
            // The request was sent. The user can verify the data in their Google Sheet.
            // Google Apps Script web apps often have complex redirect/CORS behavior
            // that can make it tricky to read the response directly from the client.
            // So we'll assume success and let the user know to check the sheet.
            alert('Message sent! The data should appear in your Google Sheet shortly.');
            form.reset();
            btn.disabled = false;
            btn.value = 'Enviar Mensaje';
        })
        .catch(error => {
            console.error('Error!', error.message);
            alert('An error occurred while sending the message. Please check the console for details and try again.');
            btn.disabled = false;
            btn.value = 'Enviar Mensaje';
        });
});
