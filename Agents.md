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

