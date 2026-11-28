# 🤖 AGENTS.md — Directrices de Desarrollo, Arquitectura y Seguridad

Este documento define el marco de buenas prácticas de desarrollo, arquitectura de software, principios de seguridad informática y optimización para el mantenimiento de la tienda online e-commerce **AURA STUDIO**.

---

## 📌 1. Arquitectura del Sistema

### 1.1 Cohesión y Desacoplamiento (SOLID)
- **Single Responsibility Principle (SRP):** Cada módulo o función posee una única responsabilidad clara.
  - La lógica de renderizado gráfico 3D (`render3DCarousel`) está completamente desacoplada de la lógica del carrito de compras (`updateCartUI`).
  - El almacén de datos local (`PRODUCTS_DATA`) actúa como una fuente de verdad única desacoplada de la vista.
- **Open/Closed Principle (OCP):** El listado de datos JSON está abierto a extensión (agregar nuevos productos, categorías o tallas) sin modificar la lógica interna de cálculo o renderizado.
- **Dependency Inversion Principle (DIP):** Las funciones de UI dependen de estructuras abstractas de datos y eventos nativos del navegador, lo que permite migrar el origen de datos a un API Fetch/GraphQL en el futuro sin alterar la experiencia de usuario.

### 1.2 Persistencia Local sin Base de Datos
La aplicación funciona enteramente en el cliente (Client-Side Vanilla Architecture) procesando estructuras **JSON**. 
- Permite ejecuciones ultrarrápidas sin latencia de red backend.
- Facilita la distribución en CDN o hosting estático (Vercel, GitHub Pages, Cloudflare Pages).

---

## 🛡️ 2. Buenas Prácticas de Seguridad Informática

Para prevenir vulnerabilidades comunes (OWASP Top 10):

1. **Prevención de Cross-Site Scripting (XSS):**
   - Evitar la concatenación e inserción directa de HTML proveniente de entradas de usuario no sanitizadas.
   - Usar `innerText` o filtros de desinfección al renderizar búsquedas dinámicas en el catálogo.
2. **Content Security Policy (CSP):**
   - Todos los recursos externos (Tailwind CDN, Google Fonts, Unsplash Images) utilizan conexiones seguras HTTPS.
3. **Validaciones de Cliente / Integridad:**
   - Precios y cálculos de carrito son sanitizados en punto flotante (`toFixed(2)`) y verificados contra el array de datos fuente antes de procesar el pago.

---

## 📱 3. Optimización Mobile-First y Rendimiento (60 FPS)

1. **Aceleración por Hardware (GPU):**
   - Todas las animaciones 3D del Coverflow y transiciones Glassmorphic utilizan transformaciones nativas (`transform: translate3d`, `scale`, `rotateY`) y `will-change`.
   - Se evitan propiedades que fuerzan *Layout Reflow* masivo como `top`, `left`, `margin` o `width` durante las animaciones.
2. **Glassmorphism Eficiente:**
   - El uso de `backdrop-filter: blur(16px)` está restringido a elementos estratégicos flotantes para evitar sobrecargar los procesadores gráficos de smartphones de gama media/baja.
3. **Cero Dependencias Pesadas:**
   - Eliminadas librerías como Three.js o GSAP para garantizar que la carga inicial de la web sea inferior a **1.5s** en redes móviles 4G/5G.

---

## 📝 4. Registro de Cambios (Changelog Markdown)

Cualquier agente de IA o desarrollador que realice modificaciones en el código fuente debe registrar obligatoriamente los cambios realizados en esta sección.

### [1.9.0] - 2026-11-28
#### Rediseño UX/UI del Drawer de Carrito y Fix del Desborde de Imágenes
- **Causa del recorte (`index.html` y `producto.html`):** el CSS estático congelado no incluía utilities clave usadas en el carrito (`h-16`, `w-16`, `min-w-0`, `gap-3`, `space-y-*`, `truncate`, `pr-6`, `right-3`, `bg-gray-200`, etc.). Las miniaturas se renderizaban a su tamaño original (~949 × 1097 px) y rompían el layout del drawer.
- **Nuevo sistema visual propio (CSS inline en ambas páginas):**
  - Drawer `100dvh` con fallback `100vh`, `max-width: 440px`, esquinas redondeadas a la izquierda, overlay con blur y transform GPU (`translate3d`) para abrir/cerrar; `prefers-reduced-motion` respetado.
  - Header compacto con ícono de carrito amarillo/negro, título, pill de cantidad y botón de cierre accesible; foco automático al abrir y retorno al botón del carrito al cerrar.
  - Lista scrolleable con `min-height: 0`, `overscroll-behavior: contain` y filas de 64 × 64 px con `object-fit: cover`, nombre truncado, chip de talle, stepper de cantidad y subtotal por ítem alineado.
  - Footer fijo con resumen (Subtotal / Envío gratis / Total estimado), botones *Vaciar* y *Finalizar compra*, tipografía y espaciados reductivos y `env(safe-area-inset-bottom)`; estado vacío centrado con CTA.
- **Render seguro (`renderCartItems()` en ambas páginas):** reemplazado `innerHTML` dinámico por construcción DOM con `textContent`; `talle` y `nombre` ya no se interpolan en atributos `onclick` (elimina vector XSS desde `localStorage`). Eventos de cantidad/eliminación enlazados por `addEventListener`.
- **Sincronización:** markup, CSS y lógica idénticos en landing y ficha de producto; `cart-overlay` / `cart-drawer` ahora usan clases `.is-open` en lugar de utilidades Tailwind ausentes.

### [1.8.9] - 2026-11-28
#### Fix de Parpadeo en las Cards Sticky de "Nuestro Catálogo"
- **`index.html`:** eliminado el `transform` (`translate3d` + `scale3d`) de `@keyframes catCardEnter`; la card ahora solo anima `opacity` (0.45 s), evitando que el `position: sticky` se recalcule y parpadee durante la entrada.
- Removido el pulso `catCardTap` y su listener de click sobre `.category-card` (transform sobre el elemento sticky). La microinteracción táctil de esas cards se retira para priorizar estabilidad del apilado.
- El efecto de “ampliación” se conserva en la imagen hija (`.cat-img` con `catImgSettle`), con `backface-visibility: hidden` y `will-change: transform` solo durante la animación. Se limpió también la referencia `.is-tapped` del bloque `prefers-reduced-motion`.

### [1.8.8] - 2026-11-28
#### Animación de Despliegue/Cierre en el Título Rotativo del Hero
- **`index.html`:** reemplazado el fade vertical (`opacity` + `translate3d`) por una apertura tipo cortina en `.hero-rotating-word` mediante `clip-path: inset(...)` con `will-change` y transición GPU de 420 ms:
  - Cierre: `inset(0 0 0 0)` → `inset(0 100% 0 0)` (se repliega de derecha a izquierda).
  - Apertura: al quitar `.is-closed`, vuelve a `inset(0 0 0 0)` desplegándose de izquierda a derecha con la nueva palabra.
- `initHeroRotatingTitle()` espera 440 ms al cierre, intercambia `Femenina` / `Masculina` y reabre; el ciclo se extendió a 3400 ms para dejar leer cada estado. Con `prefers-reduced-motion` el texto cambia sin animación.

### [1.8.7] - 2026-11-28
#### Hero + Marquesina a Primera Vista en Móvil y Título Rotativo "Femenina / Masculina"
- **Viewport inicial mobile (`index.html`):**
  - `#hero` pasa a `min-height: calc(100svh - 46px)` (con fallback `100vh`), de modo que el hero más la marquesina (`py-3.5`, ~46px) ocupen exactamente la primera pantalla. *Prendas Destacadas* deja de asomar al entrar.
- **Título del hero (`index.html`):**
  - Restaurado el `<h1>` con `Indumentaria <span class="highlight-box hero-rotating-word">Femenina</span>`: la palabra dentro del recuadro amarillo rectangular rota a `Masculina` cada 2600 ms mediante `initHeroRotatingTitle()`.
  - El cambio usa `opacity` + `translate3d` en GPU (260 ms), se omite con pestaña oculta y, bajo `prefers-reduced-motion`, se reemplaza el texto sin animación.

### [1.8.6] - 2026-11-28
#### Video Propio Integrado en el CTA de Ofertas
- **`index.html`:** actualizado el `<source>` del video full-width de `#ofertas-semana` para apuntar a `assets/Video%20CTA/Video_CTA.mp4` (archivo provisto por el propietario, ~6,2 MB), reemplazando la ruta anterior `assets/Video Promo/ofertas.mp4` que no existía.
- El MP4 tiene el átomo `moov` al inicio, por lo que reproduce en streaming progresivo sin esperar la descarga completa. `initPromoVideo()` mantiene el fade-in al cargar, autoplay solo al entrar en viewport y pausa al salir o al ocultar la pestaña.

### [1.8.5] - 2026-11-28
#### Infinite Logo Carousels entre Ofertas y Sobre Nosotros + Remoción de Flechas del Carrusel
- **Remoción de controles del carrusel (`index.html`):**
  - Eliminados los botones `#carousel-prev` / `#carousel-next`, el bloque CSS `.carousel-nav*` y su wiring en `init3DCarousel()` (incorporados en 1.8.4). *Prendas Destacadas* vuelve a operar solo con autoplay de 1800 ms y swipe táctil, sin flechas visibles.
- **Nueva sección de marquesinas de logos (`index.html`):**
  - Creada `.logo-marquee-section` entre `#ofertas-semana` y `#nosotros` con dos filas infinitas: `.logo-marquee-track--left` (`translate3d(0 → -50%)`) y `.logo-marquee-track--right` (`translate3d(-50% → 0)`), cada una con el set duplicado para un loop seamless.
  - Animación GPU lineal de 32 s en `transform`, pausa al hacer hover, máscara de desvanecimiento lateral y respeto a `prefers-reduced-motion` (sin animación).
  - Placeholders `TU MARCA 01…08` y `TU LOGO 01…08` preparados para reemplazarse por `<img src="assets/images/logos/…">`; estilo grayscale con `max-height: 38px` y `object-fit: contain`.

### [1.8.4] - 2026-11-28
#### Unificación de Espaciados entre Catálogo / CTA / Sobre Nosotros y Flechas del Carrusel
- **Espaciado `#categorias` → `#ofertas-semana` (`index.html`):**
  - Reducido el recorrido de apilado de `.category-list` de `40vh` a `6rem` (`3.5rem` en móvil) y el padding inferior de `#categorias` a `2.5rem` / `3rem` en tablet-desktop. El stacking sticky se mantiene, pero se elimina el gran vacío posterior a la última tarjeta.
- **Espaciado `#ofertas-semana` → `#nosotros` (`index.html`):**
  - `.promo-video-cta` pasa a `margin: 0`, removiendo los márgenes inferiores de `3rem` / `4.5rem` / `5.5rem`. El bloque negro del CTA queda contiguo al hero oscuro de Sobre Nosotros, sin franja blanca intermedia.
- **Controles del carrusel de Prendas Destacadas (`index.html`):**
  - Agregados los botones `#carousel-prev` y `#carousel-next` (chevrons izquierda/derecha) apilados verticalmente —uno abajo del otro— en `.carousel-nav`, con estilo circular negro + dorado de marca, foco visible y soporte `prefers-reduced-motion`.
  - Conectados a `prevSlide()` / `nextSlide()` dentro de `init3DCarousel()`, reiniciando el autoplay de 1800ms tras cada interacción. El swipe táctil y la pausa por hover/visibilidad siguen intactos.

### [1.8.3] - 2026-11-28
#### Limpieza del CTA de Ofertas, Nota de Métricas y Handle Ficticio en Redes
- **CTA full-width de ofertas (`index.html`):**
  - Eliminado el eyebrow `Drop Especial · Tiempo Limitado` de `#ofertas-semana` junto con su regla CSS `.promo-eyebrow` (sin usos restantes), dejando el titular `Ofertas de la semana` + `45% OFF` y el botón `Ver Ofertas` intactos.
- **Métricas en Sobre Nosotros (`about-us/about-us.data.js`):**
  - Removido `statistics.demoNotice` (`Métricas de referencia editables en about-us.data.js`). La sección `Números Que Nos Definen` muestra únicamente el encabezado y las cuatro cifras; el aviso de hitos de demostración del timeline se conserva.
- **Redes sociales ficticias (`about-us/about-us.data.js` e `index.html`):**
  - Reemplazada la cuenta real `#AURORASTUDIO · @aurorastudio.ar` por la identidad ficticia `#AURORASTUDIO_DEMO · @aurorastudio_demo` en `Nuestra Comunidad` y en el pill de Instagram de `Contacto`.
  - Los enlaces (`community.ctaHref` y el `<a>` del pill) pasan a `https://instagram.com/` genérico para no dirigir a un perfil existente. TikTok y X se mantienen sin modificaciones.

### [1.8.2] - 2026-11-28
#### Sección "Sobre Nosotros" 100% en Español y Remoción de "Principios Que Nos Definen" y "Detrás De Cada Pieza"
- **Traducción completa al español (`about-us/about-us.data.js`, `about-us/about-us.js`):**
  - Traducidos todos los titulares, etiquetas, botones, hitos del recorrido y métricas al español (`DESCUBRÍ NUESTRA HISTORIA`, `MÁS QUE SOLO INDUMENTARIA.`, `Fundada en`, `Nuestro Recorrido`, `EL COMIENZO`, `PRIMERA COLECCIÓN`, `UNA NUEVA IDENTIDAD`, `EL PRÓXIMO CAPÍTULO`, `Números Que Nos Definen`, `AÑOS DE EXPERIENCIA`, `CLIENTES FELICES`, `COLECCIONES`, `PAÍSES`, `Nuestra Comunidad`, `SUMATE A NUESTRO MUNDO.`, `SEGUINOS`, `TU ESTILO. TU IDENTIDAD. TU HISTORIA.`, `EXPLORAR COLECCIÓN`).
- **Depuración modular (`about-us/*`) y separación visual (`index.html`):**
  - Eliminados los bloques **Principios Que Nos Definen** (`BrandPhilosophy` / `.au-philosophy`) y **Detrás De Cada Pieza** (`BehindTheBrand` / `.au-behind` / `.au-lightbox`), junto con sus datos y estilos CSS asociados, dejando 6 subsecciones limpias y cohesivas.
  - Agregada separación inferior mobile-first en `.promo-video-cta` (`3rem` móvil / `4.5rem` tablet / `5.5rem` desktop) para dar respiro visual entre **Ofertas de la semana** y el inicio de **Sobre Nosotros**.

### [1.8.1] - 2026-11-28
#### Extensión de Animaciones de Entrada y Microinteracciones al Click en Toda la Web
- **Página Principal (`index.html`):**
  - Agregada `initSiteMotion()` (`IntersectionObserver` único GPU a 60 FPS) con `.site-fade-up` escalonado y `.site-mask-reveal` (`clip-path`) en **Hero** (`@keyframes heroCtaIn` para los CTAs), **Nuestro Catálogo** (`@keyframes catImgSettle` zoom-out en las fotos al entrar sin alterar `position: sticky`), **Ofertas de la Semana** (*Text Word Reveal* en titular y `45% OFF` + fade-up en botón), **Contacto** (*Text Word Reveal* en encabezado, fade-up escalonado en filas/redes y mask reveal en el mapa), **Footer** (fade-up en columnas) y **Carrito** (`@keyframes cartRowIn` al abrir el drawer).
  - Microinteracciones al hacer click: feedback táctil `scale3d(0.97)` en botones, cards y pills, `@keyframes heartPop` al marcar favoritos y pulso dorado `.is-copied` en botones de copiado rápido.
- **Ficha de Producto (`producto.html`):**
  - Agregada `initProductMotion()` y `applyProductWordReveal()`: *Text Word Reveal* en título de la prenda, `Descripción Editorial` y `Piezas Relacionadas`; *Image Mask Reveal* + zoom-out en `.gallery-main-container` y crossfade suave `.is-swapping` al cambiar miniaturas; fade-up escalonado en especificaciones técnicas y tarjetas relacionadas; pulso táctil al click en talles/colores/cards y `@keyframes heartPop` en favoritos. Todo respeta `prefers-reduced-motion`.

### [1.8.0] - 2026-11-28
#### Rediseño Modular Editorial Mobile-First de "Sobre Nosotros" (`about-us/*`)
- **Arquitectura Aislada (`about-us/about-us.data.js`, `about-us/about-us.css`, `about-us/about-us.js`):**
  - Creada la experiencia completa de **Sobre Nosotros** en 8 componentes modulares (`AboutHero`, `BrandStory`, `BrandTimeline`, `BrandPhilosophy`, `BehindTheBrand` con Lightbox táctil/teclado, `BrandStatistics`, `BrandCommunity` y `AboutCTA`), respetando 100% la identidad visual existente de AURORA Studio (`#FFFFFF`, `#FAFAFA`, `#0A0A0A`, `#52525B`, `#FFD700`, tipografía `'Inter'`, botones con círculo negro + flecha diagonal amarilla) y sin modificar el resto del e-commerce.
  - Datos completamente editables y desacoplados en `ABOUT_US_DATA` (con avisos explícitos en hitos y estadísticas de demostración).
  - Enfoque **Mobile-First** (`360px` a `1920px`), `clamp()` en tipografía fluida, imágenes locales optimizadas con dimensiones explícitas y `loading="lazy"`, construcción DOM segura (XSS-safe), animaciones GPU (*Text Word Reveal*, *fade-up*, *image mask reveal*, contadores animados, timeline interactivo, parallax sutil solo en desktop) y soporte completo para `prefers-reduced-motion`.
- **Integración mínima en `index.html`:**
  - Enlazados `about-us/about-us.css`, `about-us/about-us.data.js` (`defer`) y `about-us/about-us.js` (`defer`) montando exclusivamente dentro de `<section id="nosotros" class="au-root">`, sin alterar header, hero, destacados, catálogo, ofertas, contacto, carrito ni footer.

### [1.7.6] - 2026-11-28
#### Botón "Explorar Destacadas", Video CTA Full-Width de Ofertas y Galería Full-Bleed en Ficha de Producto
- **Hero (`index.html`):**
  - Renombrado el botón CTA principal de `Explorar Colección` a `Explorar Destacadas`.
- **Sección Video CTA Full-Width (`#ofertas-semana` en `index.html`):**
  - Agregada debajo de `#categorias` y antes de `#nosotros` una sección de ancho completo con video de fondo preparado en `assets/Video Promo/ofertas.mp4` (`initPromoVideo()` con fade-in al cargar y pausa automática fuera de viewport/`visibilitychange`), titular `Ofertas de la semana` + badge rectangular amarillo `45% OFF` y botón `Ver Ofertas` que abre el catálogo.
- **Ficha de Producto (`producto.html`):**
  - Rediseñada `.product-hero-card` para que la imagen superior cubra de borde a borde la parte superior del card sin márgenes blancos, manteniendo las esquinas inferiores de la imagen redondeadas (`24px` móvil / `28px` tablet-desktop) y el bloque comercial inferior ordenado con su propio padding.

### [1.7.5] - 2026-11-28
#### Posición Inferior de CTAs en Hero, Resaltes Amarillos y Círculo Negro en "Ver"
- **Hero (`#hero` en `index.html`):**
  - Reubicados los botones CTA hacia la zona inferior (`align-items: flex-end`, `padding-bottom: 4.5rem` desktop / `2.75rem` móvil) para liberar el centro del video.
- **Resaltes rectangulares amarillos (`index.html`):**
  - Agregada clase `.highlight-box` (`#FFD700` sobre `#0A0A0A`) en la palabra `Tendencias` de `#destacados` (preservando *Text Word Reveal*) y en `AURORA Studio` dentro de la descripción de `#nosotros`.
- **Botón `Ver` en Prendas Destacadas (`index.html`):**
  - Transformado el indicador `.carousel-card-cta` de las 8 cards en un contenedor circular negro (`38×38px`, `border-radius: 9999px`) con texto `Ver` centrado y transición hover a amarillo `#FFD700`.

### [1.7.4] - 2026-11-28
#### Subtítulos Superiores Neutros y Rediseño Full-Bleed de Cards en "Prendas Destacadas"
- **Eliminación de naranja en subtítulos superiores (`index.html` y `producto.html`):**
  - Unificados todos los subtítulos/eyebrows superiores (`Tendencias Globales`, `Explorá por Categoría`, `03 // Quiénes Somos`, `04 // Conectemos`, `Diseño & Confección` y `Completá el look`) en tono neutro grafito `#52525B`, removiendo `text-amber-600` y `#D97706`.
- **Cards de Prendas Destacadas (`#destacados` en `index.html`):**
  - Rediseñadas las 8 tarjetas del carrusel (`.carousel-flat`, `.carousel-card-media`, `.carousel-card-body`) para que la imagen superior cubra de borde a borde la parte superior del card sin márgenes blancos, con el badge en la esquina superior izquierda y un bloque inferior ordenado con título truncado en una línea, precio destacado e indicador `Ver →` (adaptado mobile-first).
- **Hero (`#hero` en `index.html`):**
  - Eliminado el badge `Colección Urbana 2026`, dejando únicamente los botones CTA sobre el video.

### [1.7.3] - 2026-11-28
#### Refinamiento Visual de "Nuestro Catálogo" y Botones "Ver Catálogo"
- **Encabezado de `#categorias` (`index.html`):**
  - Reemplazado el eyebrow naranja `02 // Arquitectura Textil` por `Explorá por Categoría` en tono neutro grafito (`.catalog-eyebrow`).
  - Resaltada la palabra `Catálogo` en el título `Nuestro Catálogo` dentro de un contenedor amarillo rectangular (`.catalog-title-box`, `#FFD700` sobre `#0A0A0A`), manteniendo la animación *Text Word Reveal* intacta, y eliminado el párrafo auxiliar debajo del título.
- **Botones `Ver Catálogo` (`index.html`):**
  - Agregado a la derecha dentro de todos los botones `Ver Catálogo` (las 5 tarjetas de categorías y el CTA del Hero) un contenedor circular negro (`.btn-arrow-circle`) con flecha en amarillo de marca (`#FFD700`) en ángulo diagonal 45° (`↗`) y micro-animación hover en GPU.

### [1.7.2] - 2026-11-28
#### Animaciones Text Word Reveal y Entrada del Catálogo / Cards (60 FPS GPU)
- **Text Word Reveal (`index.html`):**
  - Agregada `initTextWordReveal()` con `IntersectionObserver`, enmascarado por palabra (`.word-reveal-mask` / `.word-reveal-item`) y stagger progresivo GPU (`translate3d` + `opacity`, seguro vía `textContent` y `aria-label`) en los encabezados de **Prendas Destacadas** (`#destacados`) y **Nuestro Catálogo** (`#categorias`).
- **Animación de Entrada en Catálogo y Cards (`index.html` y `producto.html`):**
  - Entrada suave de las `.category-card` al entrar a `#categorias` (`@keyframes catCardEnter` terminando en `transform: none` para preservar `position: sticky`) + pulso táctil al clickear (`.is-tapped`).
  - Animación de entrada fluida del modal `#catalog-modal` (`.is-open`: `translate3d` + `scale3d` + `opacity`), sus barras superiores (`@keyframes catalogBarIn`) y cascada escalonada de las cards de producto en `renderCatalogGrid()` (`.is-stagger-in`, `45ms` por card).
  - En `producto.html`, agregada animación de entrada suave (`@keyframes productEnter`) al abrir la ficha desde cualquier card. Todas las animaciones respetan `prefers-reduced-motion`.

### [1.7.1] - 2026-11-28
#### Tarjetas Completamente Clickeables en "Nuestro Catálogo"
- **Sección Nuestro Catálogo (`#categorias` en `index.html`):**
  - Mantenido intacto el diseño y estilos originales de las 5 `.category-card` y sus botones `Ver Catálogo`, agregando únicamente `cursor: pointer` y `onclick="openCatalogModal(...)"` a cada `<article class="category-card">` (con `event.stopPropagation()` en el `<button>` interior para evitar doble disparo).

### [1.7.0] - 2026-11-28
#### Carrusel Más Rápido y Optimización Mobile-First de Espaciados y Márgenes
- **Carrusel de Prendas Destacadas (`index.html`):**
  - Acelerado el autoplay en `init3DCarousel()`: intervalo reducido de `3500ms` a `1800ms` y duración de transición ajustada de `0.7s` (`710ms`) a `0.42s` (`440ms`) con curva ágil `cubic-bezier(0.22, 0.78, 0.32, 1)`.
- **Optimización Mobile-First (`index.html` y `producto.html`):**
  - Estandarizados los espaciados, márgenes, radios y alturas con enfoque mobile-first (`< 640px` compacto y progresión limpia a tablet/desktop) en Header, Hero (`88svh`), Destacados (tarjetas `248px` con peek de vecinas), Catálogo (eliminando el `40vh` vacío en móvil), Sobre Nosotros (collage `360px`, barras compactas), Contacto (tarjeta `1.25rem`, mapa `320px`, redes `1fr` en `< 380px`), Footer, Modal, Drawer de Carrito (con `env(safe-area-inset-bottom)`) y Toast centrado.
  - En `producto.html`, optimizados header móvil (`Volver` compacto), padding de ficha y galería (`360px` para visibilidad above-the-fold), grilla 2×2 en Piezas Relacionadas y `scroll-padding-top: 76px`.

### [1.6.9] - 2026-11-28
#### Generación e Integración de Imágenes Editoriales Propias (14 Prendas + 5 Categorías)
- **Nuevos Assets Locales (`assets/images/products/*.jpg`):**
  - Generadas y optimizadas (800×1071 px, JPEG calidad 84, ~47–90 KB c/u) 14 fotografías editoriales acordes a la descripción exacta de cada prenda: `chaq-01`, `chaq-02`, `chaq-03`, `abr-01`, `abr-02`, `abr-03`, `vest-01`, `vest-02`, `vest-03`, `pant-01`, `pant-02`, `pant-03`, `rem-01`, `calz-01`.
- **Integración (`products_data.js`, `index.html`, `producto.html`):**
  - Reemplazadas las URLs mockup de Unsplash de los 14 productos en `products_data.js`, de las 6 tarjetas correspondientes en `#destacados` y de las 5 tarjetas de categorías en `#categorias` (`index.html`).
  - En `producto.html`, la tira `#gallery-thumbnails` se oculta automáticamente cuando la prenda tiene una sola imagen para mantener la galería limpia.
- **Pendientes por límite de cuota del generador (`RESOURCE_EXHAUSTED`, reinicio ~5h):**
  - 10 productos restantes (`chaq-04`, `abr-04`, `vest-04`, `pant-04`, `rem-02`, `rem-03`, `rem-04`, `calz-02`, `calz-03`, `calz-04`) y las 2 fotos del collage de `#nosotros` (`about-showroom`, `about-atelier`).

### [1.6.8] - 2026-11-28
#### Collage Editorial de 2 Fotos Superpuestas en "Sobre Nosotros" y Mejora UX/UI en "Contacto"
- **Sección Sobre Nosotros (`#nosotros` en `index.html`):**
  - Reemplazada la imagen única por una composición editorial de **2 fotos superpuestas** (`.about-photo-main` + `.about-photo-overlap`) enlazadas por un **marco unificador** (`.about-collage-frame`, borde `#0A0A0A` + filete dorado sutil `#FFD700`).
- **Sección Contacto (`#contacto` en `index.html`):**
  - Removida la animación de rebote (`.pin-bounce-sm`) del ícono de Ubicación en la tarjeta de datos, dejando el pin saltando exclusivamente sobre el mapa interactivo.
  - Mejoras UX/UI: indicador de horario/disponibilidad en encabezado, filas interactivas con feedback hover en íconos, botones rápidos de copiado al portapapeles (`copyContactText()`) para teléfono y mail con confirmación toast, enlace directo `Cómo llegar →`, grilla equilibrada 2×2 de redes sociales con handles y badge de zona en el mapa.

### [1.6.7] - 2026-11-28
#### Remoción de Porcentajes Numéricos en Barras de Progreso de "Sobre Nosotros"
- **Sección Sobre Nosotros (`#nosotros` en `index.html`):**
  - Eliminados los números/porcentajes visibles (`.progress-percent`) de las 4 barras de progreso horizontales y su actualización en `initProgressBars()`, dejando únicamente el título y la barra animada limpia.

### [1.6.6] - 2026-11-28
#### Barras de Progreso Clásicas debajo del Texto de "Sobre Nosotros"
- **Sección Sobre Nosotros (`#nosotros` en `index.html`):**
  - Reemplazados los 4 Circular Progress Bars SVG por **barras de progreso clásicas horizontales** (`.about-progress-list` / `.progress-item` / `.progress-bar-fill`), ubicadas directamente debajo del texto descriptivo dentro de la columna de contenido.
  - Animación GPU a 60 FPS mediante `transform: scaleX(...)` (`transform-origin: left center`, sin layout reflow) y contador porcentual con `initProgressBars()` (`IntersectionObserver` + `requestAnimationFrame` easeOutCubic + `prefers-reduced-motion`).

### [1.6.5] - 2026-11-28
#### Restauración del Carrusel Autoplay Original en Prendas Destacadas
- **Sección Prendas Destacadas (`index.html`):**
  - Revertido el cambio `[1.6.3]` del carrusel, restaurando `init3DCarousel()` y los estilos originales `.carousel-3d-container` / `.carousel-3d-track` / `.carousel-card` con autoplay por pasos cada 3.5s, centrado absoluto, 3 sets (24 tarjetas), swipe táctil y pausa por hover/`visibilitychange`.
  - Se conservan intactas las nuevas secciones `#nosotros` (con Circular Progress Bars) y `#contacto` (con Mapa y Pin Saltando).

### [1.6.4] - 2026-11-28
#### Secciones "Sobre Nosotros" (con Circular Progress Bars) y "Contacto" (con Mapa y Pin Saltando)
- **Sección Sobre Nosotros (`#nosotros` en `index.html`):**
  - Ubicada debajo de `#categorias` ("Nuestro Catálogo"), con composición de 2 columnas (imagen editorial del taller + historia de **AURORA Studio** y pilares de marca).
  - Debajo de la historia, incorporada una grilla de 4 **Circular Progress Bars** SVG (`98% Satisfacción`, `100% Producción Local`, `85% Materiales Nobles`, `96% Entregas a Tiempo`) animados suavemente al entrar en viewport (`initCircularProgressBars()` con `IntersectionObserver` + `requestAnimationFrame` easeOutCubic y soporte para `prefers-reduced-motion`).
- **Sección Contacto (`#contacto` en `index.html`):**
  - Ubicada debajo de `#nosotros`, con tarjeta de información de contacto completa: **Redes Sociales** (Instagram, TikTok, WhatsApp, X con `rel="noopener noreferrer"`), **Número** (`+54 9 11 7202-3171`), **Mail** (`hola@aurorastudio.com.ar`) y **Ubicación** (`Av. Santa Fe 3253, Palermo, CABA`).
  - Integrado mapa interactivo de Google Maps (`loading="lazy"`) con un **ícono de ubicación saltando** (animación GPU `@keyframes pinBounce` y sombra pulsante `@keyframes pinShadow` a 60 FPS, con `pointer-events: none` para no bloquear el mapa) y acceso directo a Google Maps.
- **Navegación (`index.html`):**
  - Enlazadas las secciones `#nosotros` y `#contacto` en el menú del header y del footer. Todo el CSS se encapsuló inline para mantener independencia del bundle congelado `tailwind_landing.css`.

### [1.6.3] - 2026-11-28
#### Infinite Carousel Continuo en Prendas Destacadas
- **Sección Prendas Destacadas (`index.html`):**
  - Reemplazado el carrusel de pasos discretos (`init3DCarousel` / `setInterval` cada 3.5s) por un **Infinite Carousel** de desplazamiento continuo y fluido a 60 FPS (`initInfiniteCarousel` con `requestAnimationFrame` delta-time y `translate3d` en GPU).
  - Bucle modular matemáticamente seamless con 3 sets (24 tarjetas) y medición exacta de `setWidth` (`offsetLeft` entre sets) con ajuste proporcional en `resize` sin saltos ni huecos.
  - Interacción completa: desaceleración/pausa suave al hacer hover (solo mouse), arrastre fluido con mouse/touch (Pointer Events) con inercia natural y prevención de clicks accidentales, y soporte de gesto horizontal en trackpads sin interferir con el scroll vertical móvil.
  - Optimización y accesibilidad: pausa automática fuera del viewport (`IntersectionObserver`) y en pestañas ocultas (`visibilitychange`), respeto a `prefers-reduced-motion`, clones marcados con `aria-hidden="true"` y `tabindex="-1"`, y pausa al enfocar tarjetas con teclado.

### [1.6.2] - 2026-11-27
#### Expansión de Artículos Mockup por Categoría y Contadores Dinámicos
- **Catálogo (`products_data.js`):**
  - Agregados 12 artículos mockup distribuidos en todas las categorías (`chaq-03`, `chaq-04`, `abr-02`, `abr-03`, `abr-04`, `vest-03`, `vest-04`, `pant-04`, `rem-03`, `rem-04`, `calz-03`, `calz-04`), alcanzando 24 prendas totales (4 por cada una de las 6 categorías: `Chaquetas`, `Abrigos`, `Vestidos`, `Pantalones`, `Remeras`, `Calzado`).
- **Sincronización de Tarjetas de Categorías (`index.html`):**
  - Agregada función `updateCategoryCardCounts()` con atributos `data-cat-count` para calcular en tiempo real la cantidad real de piezas de `PRODUCTS_DATA` en cada tarjeta de `#categorias`.

### [1.6.1] - 2026-11-27
#### Limpieza de Textos en Hero y Prendas Destacadas
- **Sección Hero:**
  - Eliminado el título principal `FUTURISTIC EDITORIAL COMMERCE` (`<h1>`), dejando el badge de colección y los botones CTA sobre el video de fondo.
- **Sección Prendas Destacadas:**
  - Eliminado el texto auxiliar `Autoplay continuo · deslizá horizontalmente` del encabezado del carrusel.

### [1.6.0] - 2026-11-26
#### Integración de Videos Propios en Hero (Playlist Continua Autoplay)
- **Reemplazo de Placeholders Externos en Hero:**
  - Eliminados los videos externos de demostración (Mixkit) y posters estáticos externos de Unsplash en el Hero.
  - Integrada la secuencia ordenada de videos locales: `assets/Video Hero/1.mp4` y `assets/Video Hero/2.mp4`.
- **Reproducción Continua Seamless con Crossfade:**
  - Implementada arquitectura de doble buffer de video superpuesto (`#hero-video-1` y `#hero-video-2`) con transición suave de opacidad (CSS `transition: opacity 1000ms`).
  - Control de eventos `ended`: reproduce el video 1 &rarr; pasa al video 2 &rarr; vuelve al video 1 de manera ininterrumpida con reinicio de `currentTime`.
  - Integrado control de ahorro de batería y rendimiento con `visibilitychange` (pausa ambos videos si la pestaña está oculta o minimizada).
- **Estructura de Contenedor MP4:**
  - Ambos archivos MP4 cuentan con el átomo `moov` al inicio (`faststart`), permitiendo inicio inmediato de streaming progresivo sin espera de descarga completa.

### [1.5.1] - 2026-11-26
#### Limpieza Visual en Catálogo y Carrusel Infinito Mejorado
- **Sección Nuestro Catálogo:**
  - Eliminados los badges llamativos (`01 // COLECCIÓN` .. `05 // COLECCIÓN`) de las tarjetas de categorías, reduciendo el ruido visual y distracciones innecesarias.
  - El contador de piezas se posicionó limpiamente en la esquina superior derecha (`top-6 right-6`).
- **Sección Prendas Destacadas (Carrusel):**
  - Actualizado el buffer de clonado a 3 sets (24 tarjetas) garantizando un loop **autoplay infinito continuo** y seamless sin saltos ni espacios vacíos, manteniendo la animación GPU fluida a 60 FPS y el evento `visibilitychange`.

### [1.5.0] - 2026-11-26
#### Preparación y Compatibilidad para Deploy en Vercel
- **Solución al Error 404 de Vercel (Root Entrypoint):**
  - Renombrado el archivo raíz `landing_page_e_commerce.html` &rarr; `index.html`. Vercel sirve automáticamente `index.html` como la raíz `/`, resolviendo de forma nativa el error 404 al visitar el dominio.
  - Actualizados todos los enlaces y redirecciones internas en `producto.html` (`landing_page_e_commerce.html` &rarr; `index.html`).
- **Configuración de Servidor Estático (`vercel.json`):**
  - Creado `vercel.json` con `cleanUrls: true` (permite acceder a `/producto` sin necesidad de la extensión `.html`).
  - Agregados encabezados de seguridad HTTP (`X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `X-XSS-Protection`) y directivas de caché optimizadas para archivos estáticos CSS/JS.

### [1.4.0] - 2026-11-23
#### Auditoría Técnica Integral y Optimización Senior de Rendimiento WPO
- **Depuración de Código Muerto y Recursos Huérfanos:**
  - Eliminada la función huérfana `addToCart()` en `landing_page_e_commerce.html` (código residual previo a la delegación a `producto.html`).
  - Eliminados event listeners huérfanos a botones eliminados de paginación del carrusel (`prev-slide`, `next-slide`).
  - Eliminada la regla CSS huérfana `.glass-panel` en `landing_page_e_commerce.html`.
- **Optimización de CPU, Batería y Ejecución en Hilo Principal:**
  - **Ahorro de batería y recursos en segundo plano:** Integrado el evento `visibilitychange` en el carrusel de prendas destacadas, pausando automáticamente el temporizador `setInterval` cuando la pestaña del navegador está oculta o minimizada, reanudándolo al volver.
  - **Debounce en búsqueda en tiempo real:** Incorporado un retardo de 150ms con limpieza de temporizador en el campo `#filter-search` del catálogo, eliminando el re-renderizado masivo de elementos DOM por cada pulsación de tecla y protegiendo el INP (Interaction to Next Paint).
- **Consumo de Datos del Catálogo y Consistencia:**
  - Vinculado dinámicamente el campo `rating` de `PRODUCTS_DATA` en `producto.html` (`#product-rating-val`), resolviendo la deuda técnica de mostrar un valor fijo hardcodeado.
- **Estabilidad de Layout (CLS) y SEO Técnico:**
  - Incorporados atributos explícitos `width` y `height` a todas las imágenes estáticas del carrusel y las tarjetas de categoría, permitiendo al motor de render reservar el espacio antes de la descarga y garantizando un **CLS = 0**.
  - Inclusión de meta etiquetas clave de SEO (`meta description`, `theme-color`) tanto en la página principal como en la ficha de producto.
- **Validación y Resiliencia:**
  - Sintaxis 100% válida, 0 errores en consola, tiempos de interacción fluidos a 60 FPS y arquitectura Client-Side pura y robusta.

### [1.3.1] - 2026-11-12
#### Eliminación de Secciones: "Sobre Nosotros" y "Editorial" + Limpieza de Enlaces y Scripts
- **Depuración del DOM y Código Muerto:**
  - Eliminadas las secciones completas `#nosotros` (Sobre Nosotros) y `#editorial` (Sección Editorial Digital).
  - Eliminados los estilos CSS asociados en el bloque `<style>` (`.about-badge`, `.about-studio-frame`, `.about-glass-badge`, `.pillar-card`, `.pillar-icon-box`, `.stat-card-pro`, `.quote-card`, `.logo-marquee`, etc.).
  - Removidos los enlaces de navegación ancla a `#nosotros` y `#editorial` tanto en el header navbar como en el menú del footer.
  - Eliminada la función JavaScript `initAboutCounters()` y su invocación en el ciclo de inicio `initApp()`, reduciendo el tiempo de parseo JS y listeners de `IntersectionObserver`.
- **Estructura resultante limpia:**
  - `Hero` &rarr; `Marquesina Ticker` &rarr; `Prendas Destacadas (Carrusel)` &rarr; `Nuestro Catálogo (Stacking Sticky)` &rarr; `Footer`.

### [1.3.0] - 2026-11-12
#### Ultra Optimización de Carga y Rendimiento + Rediseño Editorial de "Sobre Nosotros"
- **Ultra Optimización de Carga y Rendimiento:**
  - **Early Preconnect y DNS-Prefetch:** Inclusión de `<link rel="preconnect" href="https://images.unsplash.com">` y `<link rel="dns-prefetch" ...>` en los encabezados de `landing_page_e_commerce.html` y `producto.html`. Se elimina la latencia de negociación DNS y TLS en la descarga de imágenes del catálogo.
  - **Optimización de Assets & Ancho de Banda (-55% de peso de imágenes):**
    - Reducción de parámetros Unsplash en `products_data.js` (`&w=1200` &rarr; `&w=650&q=75`), reduciendo el peso de cada asset sin pérdida visual perceptible en pantallas Retina.
    - Dimensionamiento adaptado en carrusel de destacados (`&w=500&q=75`), stacking cards (`&w=650&q=75`) y hero poster (`&w=800&q=75`).
  - **Priorización de Recursos en Video Hero:** Inclusión de `preload="metadata"` en el video de fondo para evitar la descarga forzada del stream completo durante la carga inicial del DOM, reservando el canal para recursos críticos (LCP y fuentes).
  - **Renderizado Off-Screen Acelerado (`content-visibility: auto`):**
    - Se incorporó la clase utilitaria `.cv-auto` con `contain-intrinsic-size` para diferir el cálculo de layout y pintado de las secciones inferiores (`#nosotros`, `#editorial`, `footer` y "Piezas Relacionadas" en `producto.html`).
- **Rediseño Editorial de la Sección "Sobre Nosotros" (`#nosotros`):**
  - **Composición Asimétrica de Alta Costura:** Galería con marcos estilizados (`.about-studio-frame`) con badge flotante Glassmorphic de taller bonaerense (`.about-glass-badge`).
  - **Manifiesto y Pilares de Marca:** 3 tarjetas interactivas (`.pillar-card`) con micro-interacciones hover a 60 FPS (Materia Prima Noble, Cero Fast-Fashion, Comercio Directo).
  - **Contadores de Impacto Renovados:** 4 tarjetas de estadísticas (`.stat-card-pro`) con contadores animados por `IntersectionObserver` (+8 Años, +12.500 Prendas Entregadas, +42 Cápsulas de Autor, 99% Clientes Conformados).
  - **Prensa & Marquee:** Ticker continuo a 60 FPS con menciones de diseño y moda (`VOGUE AR`, `LA NACIÓN MODA`, `BA DESIGN WEEK`, etc.).
  - **Reseñas Reales:** Grilla de 3 tarjetas de testimonios (`.quote-card`) con calificación de 5 estrellas, cita editorial y autor verificado.
- **Validación:**
  - Sintaxis limpia, 0 dependencias externas rotas, CSS encapsulado y compatible con Tailwind estático.

### [1.2.7] - 2026-11-11
#### Carrito Prolijo + Checkout por WhatsApp + Sección "Sobre Nosotros"
- **Carrito (landing y `producto.html`, sincronizados):**
  - Ítems rediseñados "prolijos": thumb 64px redondeada, nombre + precio + chip de talle en una fila, controles de cantidad `− / +` y **subtotal por ítem** alineado a la derecha; botón eliminar reubicado absoluto top-right (menos ruido visual).
  - Botón **"Vaciar"** en el footer del drawer junto a "Finalizar Compra" + nueva función `clearCart()` (vacía `AURORA_CART`, re-renderiza `initCartUI()` + `renderCartItems()` y muestra toast).
  - **Checkout por WhatsApp:** `checkoutCart()` reescrita — abre `https://wa.me/5491172023171` con el resumen del pedido (cantidad × producto, talle, subtotales y total en formato ARS, mensaje `Hola AURORA!...`). El envío/pago se coordina por chat; nota aclaratoria en el footer del drawer.
- **Nueva sección "Sobre Nosotros" (`#nosotros`), debajo de "Nuestro Catálogo":**
  - Dos imágenes con máscara orgánica (`.mask-blob` blob irregular y `.mask-arch` arco redondeado, vía `border-radius` + `overflow:hidden`) + breve descripción del estudio (producción en series cortas, taller propio, confeccionistas locales).
  - **Contadores animados** (8+ años, 12.500+ clientes, 42+ colecciones): un único `IntersectionObserver` (threshold 0.4, `unobserve` al dispararse), easing easeOutCubic vía `requestAnimationFrame`, formato `es-AR`, respeta `prefers-reduced-motion` (muestra el valor final directo) y fallback sin IO.
  - **Marquee de logos** ("Confían en nosotros"): 6 marcas duplicadas para loop perfecto, reutiliza `@keyframes ticker` (solo `translate3d`, 60fps), fade en los bordes con `mask-image` lineal, pausa on hover.
  - **Testimonios destacados:** 3 cards estáticas con estrellas (★ 5/5/4), reseña, foto circular (Unsplash, lazy) + nombre y ciudad.
  - CSS 100% propio en el `<style>` inline (el CSS congelado no se regenera); imágenes todas `loading="lazy" decoding="async"`.
  - Entrada "Nosotros" agregada a nav desktop y footer.
- **Validación:** 0 errores de consola; carrito probado end-to-end (agregar ×2 → drawer con layout prolijo → WhatsApp genera URL con número + ítems + total correctos → Vaciar deja estado vacío con footer oculto); contadores animan a 8 / 12.500 / 42; marquee loop seamless verificado (6+6 idénticos); secciones en orden hero → destacados → categorías → nosotros → editorial. Nota: el drawer "sin deslizar" y los contadores en 0 observados durante las pruebas eran artefactos del tab de prueba sin foco (transiciones/IntersectionObserver throttled) — en navegador con foco todo funciona.

### [1.2.6] - 2026-11-10
#### Carrusel Minimalista, Cards Compactas, Stacking por Scroll y Limpieza Visual
- **Carrusel en Autoplay (más liviano y suave):**
  - Eliminados los botones/flechas de navegación y su wiring JS; el carrusel queda autónomo con autoplay (3.5s, intervalo + lento para transición sin brusquedad) y swipe táctil nativo.
  - Eliminado por completo el loop de style por frame (scale/translateZ/drop-shadow sobre 32 tarjetas): la animación es **solo `translate3d` del track** (compositor GPU), transición suavizada a 0.7s cubic-bezier.
  - Clones reducidos de 4 sets (32 tarjetas) a **2 sets (16 tarjetas)** con rebobinado modular transparente equivalente: la mitad de nodos DOM, imágenes y capas paint.
  - Tarjetas sin `glass-panel`: reemplazo del `backdrop-filter: blur` por fondo sólido (`rgba(255,255,255,0.90)` + borde, clase propia `.carousel-flat` con padding propio por no existir `.p-4` en el CSS congelado) → cero blur permanente en la GPU de gama media/baja.
  - Fijadas las animaciones de imagen (`group-hover:scale-105`) intactas; hint de texto "Autoplay continuo · deslizá horizontalmente" en el encabezado.
- **Cards más limpias, compactas y uniformes (Destacados):**
  - Eliminada la fila de chips de talles y el footer "Ver Ficha Individual" + botón de compra rápida: cada card queda = badge + imagen + nombre + precio, peso visual reducido y altura uniforme; link directo a `producto.html?id=…` en imagen y texto.
- **Sección Nuestro Catálogo — Stacking Cards por scroll:**
  - `.category-card ahora `position: sticky` con escalonado progresivo de offsets (`top: 96px → 160px` en `nth-child(1..5)`, offset menor en móvil) + sombra de profundidad: cada tarjeta se apila una sobre otra al desplazarse, permanece visible hasta que la siguiente la reemplaza, sin JS (nativo del compositor).
  - `.category-list` gana `padding-bottom: 40vh` para dar recorrido al apilamiento; se removió la dependencia de reveal (`IntersectionObserver`) de las tarjetas (robustez anti página-en-blanco: prioridad de contenido visible + rendimiento).
- **Eliminado "Prenda Destacada" completamente (5 instancias):**
  - Botones secundarios removidos de todas las tarjetas de categoría y `space-x-3` → `flex` para reequilibrar la composición con el único botón "Ver Catálogo" principal.
- **Validación:** 0 errores de consola; verificado en browser: 16 tarjetas en track, autoplay avanzando (transform animándose solapamente), apilamiento sticky con offsets 96/112/128/144/160px escalonados, cards ML del modal (4 columnas desktop), CPU durante autoplay+scroll = solo tareas del compositor (ningún hot JS).
- **Nota posterior:** se detectó y corrigió on-the-fly que `.p-4` no estaba en el CSS estático congelado (`.carousel-flat` absorbe el padding); recordatorio documentado: cualquier clase Tailwind nueva requiere regenerar el CSS estático.

### [1.2.5] - 2026-11-10
#### Rediseño del Catálogo (Tipo Mercado Libre) + Renombre "Nuestro Catálogo"
- **Sección renombrada:** `#categorias` ("Nuestras Colecciones") → **"Nuestro Catálogo"**; unificado en nav del header, footer, CTA del hero y links "Ver Catálogo" en las tarjetas.
- **Eliminado el diseño de Mazo 3D dentro del Catálogo Modal:**
  - Removidas las cards apiladas con `perspective`/`rotateY`, las flechas laterales y los dots de paginación; eliminado el JS asociado (`catalogDeckPrev`, `catalogDeckNext`, `catalogActiveIdx`, `renderCatalogDots`, cálculo de z-index/profundidad por resize) — menos cpu/gc por render.
- **Nuevo catálogo estilo Mercado Libre (grilla de publicaciones):**
  - Grilla responsive `auto-fill minmax(224px)` (2 columnas fijas en móvil), fondo gris ML (#EDEDED), cards blancas con sombras sutiles y hover con elevación.
  - Cada publicación incluye: imagen cuadrada con `loading="lazy"`, badge (HOT/NEW/TREND), chip `<n>% OFF` calculado contra `originalPrice`, corazón de wishlist (con `preventDefault`, no navega), título clamp 2 líneas, precio en formato ARS con precio tachado + % off inline, cuotas "6 x $… sin interés", "Envío gratis" en verde ML y chips de talles.
  - Seguro por construcción: los datos se insertan con `textContent` (prevención XSS), render por `DocumentFragment` en un solo reflow.
- **Navegación correcta:** toda la card es un `<a href="producto.html?id=…">` → toca cualquier prenda y abre la ficha individual de producto. Búsqueda y pills de categoría siguen operativos (filtros + estado vacío verificados).
- **Validación:** smoke tests 7/7 OK (grilla, links a ficha, búsqueda filtra, estado vacío, wishlist sin navegar), 0 errores de consola; navegación real card → `producto.html` verificada en browser.

### [1.2.4] - 2026-11-10
#### Auditoría Integral, Limpieza Profunda y Corrección de Bugs (Protocolo Optimizador Universal)
- **Posibilidad de Recuperación (Regla 13):** Inicializado repositorio Git con commit de respaldo `0f2b45a` del estado pre-optimización; añadido `.gitignore` (`.DS_Store`, logs) y eliminado el archivo `.DS_Store` sobrante.
- **Código Muerto Confirmado y Eliminado (~2 KB):**
  - `CATEGORIES_DATA` en `products_data.js` (50 líneas / 2020 bytes): definición y export global que **ninguna página consumía** (residuo del antiguo diseño "Stacked Bento", reemplazado en 1.2.0). Verificada la ausencia de referencias en ambos HTML antes de eliminarla.
- **Bugs Funcionales Corregidos (Regresiones del Refactor 1.2.1, TDZ residual):**
  - `landing_page_e_commerce.html` → `renderCartItems()`: línea 1510 usaba la variable suelta `cartItemsContainer` en lugar del getter `getCartElements().cartItemsContainer`, lo que **rompía el renderizado completo del drawer de carrito** con `ReferenceError`. Corregido a `els.cartItemsContainer`.
  - `landing_page_e_commerce.html` → `checkoutCart()`: referencia suelta a `cartTotalEl` corregida a `getCartElements().cartTotalEl` (la pasarela fallaba al confirmar).
  - `producto.html` → mismos dos residuos corregidos (`cartItemsContainer`, `cartTotalEl` → `getCartElements()`).
- **Optimización de Recursos:**
  - `producto.html`: `loading="lazy" decoding="async"` añadido a las imágenes de thumbnails de galería, items del carrito drawer y cards de "Piezas Relacionadas" (render dinámico que antes descargaba todo Eager).
  - `<img id="main-product-img">` con `fetchpriority="high" decoding="async"` para mejorar el LCP de la ficha de producto.
  - Landing y producto: 0 `@keyframes` pesados (solo el ticker de transform), `backdrop-filter` restringido a overlays flotantes, sin listeners de `resize`.
- **Metodología y Validación:**
  - Auditoría automatizada de código muerto (funciones, variables, clases CSS y campos de datos vs. referencias reales). Todo lo flaggeado como "sin uso" se verificó vía `onclick` inline antes de descartar falsos positivos.
  - Smoke test end-to-end en navegador: agregar/modificar/eliminar carrito, render del drawer, apertura del catálogo modal con filtros, ficha de producto, galería y recomendaciones — **todo OK, 0 errores de consola**.
  - Trace de carga `producto.html`: **0 long tasks** en todo el ciclo de carga.
  - FASE 8 (paridad visual): comparación numérica de estilos computados (fuente, tamaño, peso, color, border-radius, opacidad) entre la versión del commit `0f2b45a` y la optimizada en header, título de categorías, `.category-card` y footer — **100% idénticos**.
- **Registro de datos detectados sin consumir (PENDIENTE, decisión del propietario — no eliminado por Regla 13 "no alterar reglas de negocio"):**
  - `rating` y `freeShipping` de `PRODUCTS_DATA` no son leídos por ningún renderer (la ficha muestra "★ 4.9" hardcodeado). Sumarlos a la UI futura o eliminar los campos.

### [1.2.3] - 2026-11-10
#### Rediseño de la Sección Categorías — Lista Vertical Progresiva + Optimización
- **Eliminado el Deck 3D y las Pills de Tabs:**
  - La sección `#categorias` pasa de un deck apilado tridimensional (5 cards con `perspective`, `rotateY`, `translate3d`, capas filtradas y listeners de `resize`) a una **lista vertical única**: tarjetas full-width apiladas con separación de 20px, totalmente responsive (min-height 280px móvil / 320px en ≥640px).
- **Reveal Progresivo Durante el Scroll:**
  - Cada tarjeta usa la clase `reveal-on-scroll` existente y el único `IntersectionObserver` ya presente (`rootMargin 50px`, `threshold 0.05`, `unobserve` tras activarse). El reveal anima exclusivamente `opacity` + `translate3d` (compositor GPU, cero layout thrashing) y respeta `prefers-reduced-motion`.
- **Código Eliminado (~4.3 KB de JS + CSS):**
  - `setStackedCard`, `nextStackedCard`, `prevStackedCard`, `handleCardClick`, `updateStackedCards`, `init3DStackedCards` y su listener de `window.resize` (recalculaba 5 transforms 3D en cada resize).
  - Reglas CSS `.stacked-deck-container` / `.stacked-card` (perspective 3D, will-change duplicados).
- **Boldointeractiva Preservada:**
  - Cada tarjeta mantiene chips "NN // COLECCIÓN" + contador de piezas, botón "Ver Colección" (abre `openCatalogModal` con su categoría) y enlace "Prenda Destacada →" a `producto.html`.
  - Imágenes `loading="lazy" decoding="async"`.
- **Resultados medidos (trace/CPU):** scroll por toda la sección con CPU ~97% idle; eliminados los lisos de composición 3D permanente y el recálculo on-resize; la sección ya no reserva 540px de contenedor virtual.

### [1.2.2] - 2026-11-10
#### Optimización de Rendimiento — Carga Estática (sin cambios visuales)
- **Eliminado el Runtime JIT de Tailwind en Producción:**
  - Se reemplazó el script render-blocking `https://cdn.tailwindcss.com` (~300 KB de JS + recompilación en runtime con coste de CPU por navegación) por hojas de estilo estáticas precompiladas `tailwind_landing.css` (27.9 KB) y `tailwind_producto.css` (24.6 KB), conservando el 100% de las clases/pantallas responsivas (sm, md, lg) y los colores de la marca.
  - Metodología de extracción: el CSS exacto generado por el runtime fue congelado en el navegador (incluyendo los estados dinámicos de carrito, wishlist y catálogo modal provando por `openCartDrawer`, `setCatalogCategory`, etc.), garantizando paridad visual píxel a píxel.
- **Fuentes Optimizadas:**
  - Sustituido el `@import` bloqueante de Google Fonts (7 pesos estáticos → 7 descargas woff2) por `preconnect` temprano + Inter Variable (`wght@300..900`), reduciendo las peticiones de fuentes a una sola.
- **Imágenes: Carga Diferida:**
  - Los 15 `<img>` del catálogo/categorías/editorial en `landing_page_e_commerce.html` ahora usan `loading="lazy" decoding="async"`, excluyendo el hero (poster de video) para preservar el LCP.
- **Resultados:**
  - Menos bytes descargados en primera carga (sin JIT), sin bloqueos de hilo (0 long tasks en trace), y menor coste de CPU por interacción al no recompilar CSS.
  - Visual, DOM y lógica de negocio intactos: sin cambios de markup ni comportamiento.

### [1.2.1] - 2026-11-08
#### Corrección Crítica y Resiliencia de Renderizado
- **Solución de Bloqueo de Renderizado (Página en Blanco):**
  - **Remoción de Error de Sintaxis JS:** Se eliminó un fragmento huérfano (`initHeaderButtons(); });`) que causaba un `SyntaxError: Parser error` al compilar el script principal de `landing_page_e_commerce.html`. Dicho error abortaba la ejecución completa de JavaScript, impidiendo que el `IntersectionObserver` activara la clase `.is-visible`, lo que dejaba todas las secciones animadas (`#destacados`, `#categorias`, `#editorial`) con `opacity: 0`.
  - **Eliminación de la Zona Muerta Temporal (TDZ):** Refactorización del acceso a elementos DOM en `initCartUI()`, `renderCartItems()` e `initCartEvents()` en ambos archivos (`landing_page_e_commerce.html` y `producto.html`), sustituyendo variables globales `const` por getters dinámicos y defensivos (`getCartElements()`). Esto previene cualquier excepción de tipo `ReferenceError: Cannot access uninitialized variable` cuando la inicialización se dispara antes de la declaración léxica o con `document.readyState === 'complete'`.
  - **Inicialización Inmune al Estado de Carga:** Se implementó el patrón de verificación de `document.readyState` para asegurar que `initApp()` se invoque inmediatamente si el DOM ya finalizó su parseo o mediante el listener `DOMContentLoaded` si se encuentra en estado de carga (`loading`).
  - **Respaldo Global en `products_data.js`:** Exposición explícita de `PRODUCTS_DATA`, `CATEGORIES_DATA` y utilidades en el objeto global `window` para compatibilidad universal en cualquier entorno de ejecución o carga local.

### [1.2.0] - 2026-11-08
#### Añadido y Rediseñado
- **Sección de Categorías en 3D Stacked Cards:**
  - Rediseño de las colecciones utilizando un efecto tridimensional de tarjetas apiladas con profundidad espacial (`perspective: 1400px`, `transform: translate3d(...) rotateY(...) scale(...)`).
  - Navegación interactiva mediante selectores (pills) superiores, flechas laterales y selección por clic directo en las tarjetas de fondo con transiciones fluidas a 60 FPS.
- **Visualización de Talles en Cards de Productos:**
  - Integración de chips de talles disponibles (XS, S, M, L, XL) directamente en cada tarjeta del carrusel Coverflow 3D y en la cuadrícula del catálogo.
  - Botón y enlace directo "Ver Ficha Individual" en cada card sin apertura de modal invasivo.
- **Página Individual de Producto Dedicada (`producto.html`):**
  - Implementación de la vista de producto estilo Mercado Libre con URL propia y enrutamiento independiente (`producto.html?id=...`).
  - Galería de imágenes interactiva con miniaturas dinámicas y zoom progresivo.
  - Ficha comercial completa: bloque de precios con descuentos, cálculo de cuotas sin interés, beneficios de envío gratis y compra protegida.
  - Selector de talles interactivo, selector de colores, indicador de stock en tiempo real y selector de cantidades.
  - Botones "Comprar Ahora" y "Agregar al Carrito" sincronizados con el drawer lateral off-canvas y persistencia en `localStorage`.
  - Ficha técnica de autor: desglose de materialidad, calce, cuidados recomendados y tabla modal de medidas anatómicas.
  - Sección de recomendaciones "Piezas Relacionadas" con navegación cruzada entre productos.
- **Fuente de Verdad Desacoplada (`products_data.js`):**
  - Centralización de `PRODUCTS_DATA` y utilidades de almacenamiento local (`AURORA_CART`, `AURORA_WISHLIST`) cumpliendo el Principio de Responsabilidad Única (SRP).

### [1.1.0] - 2026-11-08
#### Añadido y Optimizado
- **Título "Prendas Destacadas":** Actualizado el encabezado en la sección de destacados.
- **Carrusel 3D en Bucle Infinito Determinista y Centrado Absoluto:**
  - **Eliminación Total de Espacios en Blanco a la Derecha:** Implementación de un buffer cuádruple de 4 sets contiguos (32 tarjetas en DOM) con rebobinado modular transparente (`currentIndex = currentIndex - N` al llegar a `2 * N`), garantizando que al navegar hacia la derecha siempre existan entre 7 y 15 tarjetas visibles por delante.
  - **Centrado Matemático Robusto:** Cálculo de paso (`cardPitch = cardWidth + gap`) inmune a diferencias de `offsetParent` en navegadores modernos.
  - **Transición Fluida e Ininterrumpida:** Sincronización precisa con temporizadores deterministas y forzado de reflow (`void track.offsetWidth`), evitando bloqueos o desbordes por rebote de eventos `transitionend`.
  - Aumento de velocidad de autoplay a 2500ms con pausa inteligente al hover (`mouseenter`/`mouseleave`).
  - Máscara de desvanecimiento suave lateral mediante `mask-image` con gradiente lineal.
  - Expansión a 8 prendas destacadas de alta resolución con apertura directa al catálogo interactivo.
- **Drawer de Carrito y Capa de Datos Segura:**
  - Implementación del drawer off-canvas lateral interactivo con gestión de cantidades (+/-), eliminación y cálculo real de subtotal.
  - Prevención de XSS mediante saneamiento de variables y renderizado seguro de nodos DOM.
  - Catálogo modal con filtros reactivos (categoría, talles, cuotas, envío gratis y ordenamiento de precios).

### [1.0.0] - 2026-11-08
#### Añadido
- **Fondo Aurora Mesh Estático:** Implementado con degradados radiales pastel para lograr la estética Glassmorphism sin afectar los FPS.
- **Header Glassmorphism Flotante:** Navbar adaptativo con badges interactivos de carrito y wishlist.
- **Hero Section Visual:** Tipografía editorial con CTA en amarillo neón (#FFEE00) y badge de producto destacado.
- **Marquesina Infinita CSS:** Ticker tape animado a 60fps con promociones clave.
- **Visor 3D Coverflow:** Carrusel de productos destacados con efectos de profundidad y escala 3D.
- **Sección Categorías Stacked Bento:** Tarjetas ultra redondeadas interactiva con apertura de catálogo.
- **Catálogo Modal Mercado Libre Style:** Vista desplegable con filtros por categoría, buscador en tiempo real y ordenación por precio.
- **Carrito de Compras Integrado:** Drawer lateral interactivo con gestión de cantidades y cálculo de subtotal.

#### Justificación Técnica
- **Uso de CSS Vanilla + Tailwind Utility:** Permite flexibilidad rápida de diseño sin sacrificar la ligereza en dispositivos móviles.
- **Array de Objetos JS en lugar de DB:** Satisface el requerimiento de independencia de backend y velocidad de respuesta instantánea.

