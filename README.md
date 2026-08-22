# IEEE UniAutónoma Student Branch — sitio web

Sitio estático preparado para GitHub Pages.

## Estructura
- `index.html`: inicio, participación y contacto
- `acerca.html`: quiénes somos y propósito
- `equipo.html`: Junta Directiva con perfiles interactivos
- `capitulos.html`: IEEE Computer Society
- `eventos.html`: actividades
- `tienda.html`: merch con compra coordinada por WhatsApp
- `data.js`: datos editables de equipo, contacto y productos
- `styles.css`: diseño compartido y animaciones
- `script.js`: navegación, dropdown, perfiles, filtros y tienda
- `assets/`: identidad visual y fotografías
- `assets/products/`: imágenes individuales de productos

## Actualizaciones rápidas
### Equipo
Edita `members` en `data.js`. La estructura de las tarjetas y los perfiles se genera automáticamente.

### Tienda
Edita `merch` en `data.js`. Cada producto tiene `name`, `category`, `description` e `image`. Para cambiar una fotografía, sustituye el archivo en `assets/products/` o cambia la ruta `image`.

### WhatsApp de ventas
En `data.js`, cambia `whatsappNumber: ''` por el número oficial con código de país y sin símbolos, por ejemplo `573001234567`. Los botones de todos los productos quedarán conectados automáticamente a ese número.

### Canales oficiales
Correo, Instagram, formulario y WhatsApp están centralizados en `data.js`.

## Publicación
Sube el contenido de esta carpeta a la raíz del repositorio. En GitHub Pages utiliza `main` y `/(root)`.
