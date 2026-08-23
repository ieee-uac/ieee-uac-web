// src/lib/url.js
// Antepone la ruta base a un enlace interno.
// Escribe siempre las rutas como '/acerca/' o '/assets/x.jpg';
// esta función se encarga del prefijo según dónde esté publicado el sitio.
const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

export const url = (path) => BASE + path;
