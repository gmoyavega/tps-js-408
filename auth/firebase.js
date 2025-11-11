// Importar Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
// Importaciones de Auth: Agregamos signOut y onAuthStateChanged
import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

// Configuración de tu proyecto
const firebaseConfig = {
    apiKey: "AIzaSyC2BSFYZBvIF7cxUr7xUvZKmlhg0ACk504",
    authDomain: "tp-js-48675.firebaseapp.com",
    projectId: "tp-js-48675",
    storageBucket: "tp-js-48675.firebasestorage.app",
    messagingSenderId: "930594601481",
    appId: "1:930594601481:web:d67813a0ffdd977144d6d8",
    measurementId: "G-GN0C2S2GSS"
};

// Inicializar la App y Auth fuera del DOMContentLoaded
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


// Ejecutamos todo el código que interactúa con el DOM (elementos HTML)
document.addEventListener('DOMContentLoaded', () => {

    /* ==========================
        REGISTRO
    ========================== */
    const btnRegister = document.getElementById("buttonregister");
    if (btnRegister) {
        btnRegister.addEventListener("click", (e) => {
            e.preventDefault();

            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;
            const password2 = document.getElementById("password2").value;

            if (password !== password2) {
                alert("Las contraseñas no coinciden");
                return;
            }

            createUserWithEmailAndPassword(auth, email, password)
                .then(() => {
                    alert("Usuario creado con éxito");
                    window.location.href = "login.html";
                })
                .catch((error) => {
                    alert("Error: " + error.message);
                });
        });
    }

    /* ==========================
        LOGIN
    ========================== */
    const btnLogin = document.getElementById("buttonlogin");
    if (btnLogin) {
        btnLogin.addEventListener("click", (e) => {
            e.preventDefault();

            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;

            signInWithEmailAndPassword(auth, email, password)
                .then(() => {
                    alert("Bienvenido!");
                    window.location.href = "../paginas/principal.html";
                })
                .catch((error) => {
                    alert("Error: " + error.message);
                });
        });
    }


    /* ==========================
        LOG OUT (VISIBILIDAD Y FUNCIÓN)
    ========================== */

    const logoutLink = document.getElementById('logout-link');

    // OBTENEMOS EL ELEMENTO <li> PADRE (que es el que hay que ocultar/mostrar)
    const logoutListItem = logoutLink ? logoutLink.parentElement : null; 

    // Lógica para mostrar/ocultar al cambiar el estado de autenticación
    onAuthStateChanged(auth, (user) => {
        if (logoutListItem) { 
            if (user) {
                // Usuario logueado: Muestra el LI. Usamos 'flex' para la alineación CSS.
                logoutListItem.style.display = 'flex'; 
            } else {
                // Usuario no logueado: Oculta el LI.
                logoutListItem.style.display = 'none';
            }
        }
    });

    // Lógica para el clic de Cerrar Sesión
    if (logoutLink) {
        logoutLink.addEventListener('click', (e) => {
            e.preventDefault(); 

            signOut(auth).then(() => {
                alert("Sesión cerrada. ¡Vuelve pronto!");
                // Redirige al usuario a la página de inicio
                window.location.href = "../index.html"; 
            }).catch((error) => {
                console.error("Error al cerrar sesión:", error);
                alert("Hubo un error al cerrar la sesión.");
            });
        });
    }

});
