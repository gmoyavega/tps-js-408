// Importar Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
// Importaciones de Auth: Agregamos signOut y onAuthStateChanged
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    sendPasswordResetEmail
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import {
    getFirestore,
    collection,
    addDoc
} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

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
const db = getFirestore(app);


// Ejecutamos todo el código que interactúa con el DOM (elementos HTML)
document.addEventListener('DOMContentLoaded', () => {

    /* ==========================
        REGISTRO
    ========================== */
    const registerForm = document.getElementById("registerForm");
    if (registerForm) {
        registerForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const nombre = document.getElementById("nombre").value;
            const apellido = document.getElementById("apellido").value;
            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;
            const password2 = document.getElementById("password2").value;
            const phone = document.getElementById("phone").value;
            const recaptchaResponse = grecaptcha.getResponse();

            if (recaptchaResponse.length === 0) {
                alert("Por favor, verifica que no eres un robot.");
                return;
            }

            if (password !== password2) {
                alert("Las contraseñas no coinciden");
                return;
            }

            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    return addDoc(collection(db, "users"), {
                        uid: user.uid,
                        nombre: nombre,
                        apellido: apellido,
                        phone: phone
                    });
                })
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
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;
            const recaptchaResponse = grecaptcha.getResponse();

            if (recaptchaResponse.length === 0) {
                alert("Por favor, verifica que no eres un robot.");
                return;
            }

            signInWithEmailAndPassword(auth, email, password)
                .then(() => {
                    alert("Bienvenido!");
                    window.location.href = "../principal.html";
                })
                .catch((error) => {
                    let message = "Ocurrió un error inesperado.";
                    switch (error.code) {
                        case "auth/invalid-credential":
                            message = "Las credenciales proporcionadas no son válidas. Por favor, verifica tu correo y contraseña.";
                            break;
                        case "auth/wrong-password":
                            message = "La contraseña es incorrecta. Por favor, inténtalo de nuevo.";
                            break;
                        case "auth/user-not-found":
                            message = "No se encontró ningún usuario con este correo electrónico.";
                            break;
                        case "auth/invalid-email":
                            message = "El formato del correo electrónico no es válido.";
                            break;
                        default:
                            message = "Error: " + error.message;
                            break;
                    }
                    alert(message);
                });
        });
    }


    /* ==========================
        FORGOT PASSWORD
    ========================== */
    const forgotPasswordForm = document.getElementById("forgotPasswordForm");
    if (forgotPasswordForm) {
        forgotPasswordForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const email = document.getElementById("email").value;

            sendPasswordResetEmail(auth, email)
                .then(() => {
                    alert("Se ha enviado un correo para restablecer tu contraseña.");
                    window.location.href = "login.html";
                })
                .catch((error) => {
                    alert("Error: " + error.message);
                });
        });
    }

    /* ==========================
        LOG OUT (VISIBILIDAD Y FUNCIÓN)
    ========================== */

    const loginLink = document.getElementById('login-link');
    const registerLink = document.getElementById('register-link');
    const logoutLink = document.getElementById('logout-link');

    // OBTENEMOS EL ELEMENTO <li> PADRE (que es el que hay que ocultar/mostrar)
    const loginListItem = loginLink ? loginLink.parentElement : null;
    const registerListItem = registerLink ? registerLink.parentElement : null;
    const logoutListItem = logoutLink ? logoutLink.parentElement : null;

    // Lógica para mostrar/ocultar al cambiar el estado de autenticación
    onAuthStateChanged(auth, (user) => {
        if (loginListItem && logoutListItem) {
            if (user) {
                // Usuario logueado: Muestra el LI de logout y oculta el de login.
                loginListItem.style.display = 'none';
                logoutListItem.style.display = 'flex';
            } else {
                // Usuario no logueado: Oculta el LI de logout y muestra el de login.
                loginListItem.style.display = 'flex';
                logoutListItem.style.display = 'none';
            }
        }
        if (registerListItem) {
            registerListItem.style.display = 'none';
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
