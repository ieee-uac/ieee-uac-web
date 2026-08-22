// Estructura del menú principal
export const navLinks = [
  { label: "Inicio", href: "/" },
  {
    label: "Acerca de",
    children: [
      { label: "Quiénes somos", href: "/acerca/" },
      { label: "Junta directiva", href: "/equipo/" },
      { label: "Capítulos y grupos", href: "/capitulos/" },
    ],
  },
  { label: "Actividades", href: "/eventos/" },
  { label: "Tienda", href: "/tienda/" },
  { label: "Contacto", href: "/#contacto" },
];
