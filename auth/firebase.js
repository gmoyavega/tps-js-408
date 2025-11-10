// Importar Firebase desde CDN
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } 
    from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { getDatabase, ref, set, get, child } 
    from "https://www.gstatic.com/firebasejs/11.0.1/firebase-database.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-analytics.js";

// Configuración de tu proyecto
const firebaseConfig = {
    apiKey: "AIzaSyC2BSFYZBvIF7cxUr7xUvZKmlhg0ACk504",
    authDomain: "tp-js-48675.firebaseapp.com",
    databaseURL: "https://tp-js-48675-default-rtdb.firebaseio.com",
    projectId: "tp-js-48675",
    storageBucket: "tp-js-48675.firebasestorage.app",
    messagingSenderId: "930594601481",
    appId: "1:930594601481:web:d67813a0ffdd977144d6d8",
    measurementId: "G-GN0C2S2GSS"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);
const analytics = getAnalytics(app);

// ==========================
// FUNCIONES DE REGISTRO
// ==========================
function registrarUsuario(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
}

// ==========================
// FUNCIONES DE LOGIN
// ==========================
function loginUsuario(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
}

// ==========================
// FUNCIONES DE BASE DE DATOS
// ==========================
function guardarUsuarioDB(uid, datos) {
    return set(ref(db, "usuarios/" + uid), datos);
}

async function leerUsuariosDB() {
    const dbRef = ref(db);
    const snapshot = await get(child(dbRef, "usuarios"));
    if (snapshot.exists()) {
        return snapshot.val();
    } else {
        return null;
    }
}

// Exportamos todo para usar en otros archivos
export { auth, db, registrarUsuario, loginUsuario, guardarUsuarioDB, leerUsuariosDB };
