import { guardarUsuarioDB, leerUsuariosDB } from "./firebase.js";

// Guardamos un usuario de prueba
guardarUsuarioDB("juan", { nombre: "Juan", edad: 25 })
    .then(() => console.log("Usuario guardado correctamente"))
    .catch((error) => console.error("Error guardando usuario:", error));

// Leemos todos los usuarios
leerUsuariosDB()
    .then(data => console.log("Usuarios en la DB:", data))
    .catch(error => console.error("Error leyendo usuarios:", error));
