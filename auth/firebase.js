// Importar Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
// Importaciones de Auth: Agregamos signOut y onAuthStateChanged
import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signOut, // <<-- AGREGADO
    onAuthStateChanged // <<-- AGREGADO
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

// Inicializar
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

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


/* 
 LOG OUT
 */
const logoutLink = document.getElementById('logout-link');

onAuthStateChanged(auth, (user) => {
    if (logoutLink) {
        if (user) {
            // Usuario logueado: Muestra el enlace de Log Out
            logoutLink.style.display = 'block'; 
        } else {
            // Usuario no logueado: Oculta el enlace de Log Out
            logoutLink.style.display = 'none';
        }
    }
});

/* ==========================
    LOG OUT
========================== */
if (logoutLink) {
    logoutLink.addEventListener('click', (e) => {
        e.preventDefault(); // Evita la navegación predeterminada del enlace

        signOut(auth).then(() => {
            // Cierre de sesión exitoso.
            alert("Sesión cerrada. ¡Vuelve pronto!");
            // Redirige al usuario a la página de inicio o login
            window.location.href = "../index.html"; // Asegúrate de que esta sea la URL de inicio
        }).catch((error) => {
            // Ocurrió un error.
            console.error("Error al cerrar sesión:", error);
            alert("Hubo un error al cerrar la sesión.");
        });
    });
}
