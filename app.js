const form = document.getElementById('contactForm');
const btn = document.getElementById('button');

form.addEventListener('submit', e => {
    e.preventDefault();
    btn.disabled = true;
    btn.value = 'Sending...';

    
    const scriptURL = 'https://script.google.com/macros/s/AKfycbxCp8WdJzUx13oi6-OI6TJNfRsRos3_e2xztL-zho4oSS6bJ-rw1agndE87dJdAxoc6cA/exec';

    fetch(scriptURL, { method: 'POST', body: new FormData(form)})
        .then(response => {
            
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
      

document.getElementById("contactForm")
    .addEventListener('submit', function(event) {
        event.preventDefault();

    btn.value = 'Sending...';

    const serviceID = 'default_service';
    const templateID = 'template_tthm3je';

    emailjs.sendForm(serviceID, templateID, this)
    .then(() => {
        btn.value = 'Send Email';
        alert('Sent!');
    }, (err) => {
    btn.value = 'Send Email';
        alert(JSON.stringify(err));
    });

});
