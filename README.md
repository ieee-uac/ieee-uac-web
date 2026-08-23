# IEEE UniAutónoma Student Branch — sitio web

Sitio estático construido con [Astro](https://astro.build). Genera HTML puro: no envía
JavaScript al navegador salvo los pequeños scripts de interacción (menú, diálogo, filtros).

## Comandos

```bash
npm install       # instalar dependencias
npm run dev       # servidor de desarrollo en http://localhost:4321
npm run build     # compilar el sitio en dist/
npm run preview   # servir dist/ tal como quedará en producción
```

> Para revisar cómo se verá el sitio publicado usa siempre `npm run preview`.
> `npm run dev` inyecta una barra de herramientas propia de Astro que no existe en producción.

## Estructura

```
src/
├─ pages/        una página por archivo; la ruta sale del nombre
│                index.astro → /   ·   acerca.astro → /acerca/   ·   etc.
├─ layouts/
│  └─ BaseLayout.astro    <head>, cabecera, pie y scripts comunes
├─ components/   piezas reutilizables (Header, Footer, PageHero, ProductCard…)
├─ data/         contenido editable, sin HTML
├─ styles/       hojas de estilo divididas por responsabilidad
public/
└─ assets/       imágenes, servidas tal cual desde /assets/…
```

## Actualizaciones rápidas

Todo el contenido editable vive en `src/data/`. **No hace falta tocar HTML.**

| Qué cambiar | Dónde |
|---|---|
| Junta Directiva | `src/data/members.js` |
| Productos de la tienda | `src/data/merch.js` |
| Correo, Instagram, formulario, WhatsApp | `src/data/site.js` |
| Enlaces del menú | `src/data/nav.js` |

### Equipo
Edita el array `members`. Cada persona necesita `initial`, `name`, `role` y `bio`. Las tarjetas
y las fichas de perfil se generan solas, en el orden del array.

### Tienda
Edita el array `merch`. Cada producto necesita `name`, `category`, `description` e `image`.
Los botones de filtro **se derivan de las categorías que uses**: si añades una categoría nueva,
su botón aparece solo.

Para cambiar una foto, sustituye el archivo en `public/assets/products/` o cambia la ruta
`image` (siempre empezando por `/assets/…`).

### WhatsApp de ventas
En `src/data/site.js`, cambia `whatsappNumber: ''` por el número oficial con código de país y
sin símbolos, por ejemplo `'573001234567'`. Todos los botones de compra quedan conectados.

## Estilos

Los archivos de `src/styles/` se importan en `BaseLayout.astro` **en un orden concreto**, y ese
orden es la cascada de CSS. `responsive.css` va al final para que los puntos de ruptura
conserven su prioridad. Si reordenas los imports, el sitio cambia de aspecto.

| Archivo | Contenido |
|---|---|
| `tokens.css` | variables de diseño (colores, sombras, radios) |
| `base.css` | reset, botones, tipografía, animaciones |
| `layout.css` | barra superior, cabecera, navegación, pie |
| `components.css` | tarjetas, paneles, diálogo, migas de pan |
| `home.css` | hero de la portada |
| `shop.css` | escaparate y tarjetas de producto |
| `responsive.css` | puntos de ruptura |

## Rutas

Las rutas internas son **absolutas y terminan en barra**: `/acerca/`, `/equipo/`, `/tienda/`.
Las imágenes se referencian como `/assets/…`. Una ruta relativa se rompería, porque las páginas
no viven en la raíz.

## Dos reglas que no son evidentes

**Las tarjetas de equipo y de producto no llevan la clase `reveal`.** En la versión anterior del
sitio esas tarjetas las creaba JavaScript y se marcaban como visibles al instante, así que nunca
animaban. Ahora se generan en el build. Si les añades `reveal`, empezarán a aparecer con
animación al hacer scroll: se vería distinto al sitio actual.

**Los canales oficiales solo se escriben en `src/data/site.js`.** Correo, Instagram, formulario
de inscripción y WhatsApp. Antes el enlace del formulario estaba copiado unas diez veces por el
proyecto; si vuelves a escribirlo a mano en una página, se pierde esa ventaja.

## Publicación

`npm run build` genera `dist/`, que es lo que se publica en GitHub Pages.
