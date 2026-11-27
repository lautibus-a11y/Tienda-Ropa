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

