// Estructura del menú principal
export const navLinks = [
  { label: "Inicio", href: "/" },
  {
    label: "Acerca de",
    children: [
      { label: "Nuestra rama", href: "/acerca/" },
      { label: "Junta directiva", href: "/equipo/" },
      { label: "IEEE Computer Society", href: "/capitulos/" },
    ],
  },
  { label: "Actividades", href: "/eventos/" },
  { label: "Tienda", href: "/tienda/" },
  { label: "Contacto", href: "/#contacto" },
];
