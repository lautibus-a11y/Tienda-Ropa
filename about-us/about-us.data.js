// ==========================================================================
// AURORA STUDIO — SOBRE NOSOTROS DATA (Fuente de Verdad Editable en Español)
// Todos los textos, imágenes, etapas del recorrido y estadísticas se editan
// aquí sin tocar la lógica de renderizado ni los estilos.
// ==========================================================================

window.ABOUT_US_DATA = {
    brandName: "AURORA Studio",

    // SECCIÓN 01 — HERO EDITORIAL
    hero: {
        eyebrow: "03 // Sobre Nosotros",
        brand: "AURORA STUDIO",
        titleLead: "Diseño Urbano",
        titleHighlight: "Con Identidad",
        subtitle: "Sastrería contemporánea y textiles técnicos concebidos desde nuestro taller independiente en Buenos Aires.",
        ctaLabel: "DESCUBRÍ NUESTRA HISTORIA",
        ctaTarget: "#au-story",
        image: {
            src: "assets/images/products/abr-01.jpg",
            alt: "Editorial AURORA Studio — Abrigo oversized de lana técnica en luz arquitectónica",
            width: 800,
            height: 1071,
            sizes: "(max-width: 768px) 100vw, 92vw"
        }
    },

    // SECCIÓN 02 — HISTORIA DE MARCA
    story: {
        eyebrow: "Nuestra Historia",
        foundedLabel: "Fundada en",
        foundedYear: "2018",
        foundedLocation: "Buenos Aires, Argentina",
        title: "MÁS QUE SOLO INDUMENTARIA.",
        editorialQuote: "“No diseñamos para una temporada; construimos siluetas que evolucionan con quien las viste.”",
        leadPrefix: "En ",
        leadBrand: "AURORA Studio",
        leadSuffix: " entendemos la indumentaria como arquitectura cotidiana: líneas limpias, materiales nobles y funcionalidad real para el ritmo urbano.",
        body: "Cada pieza nace en series cortas junto a talleres locales independientes. Desde la elección de algodones de alto gramaje y paños regenerados hasta cada costura termosellada, priorizamos durabilidad, calce preciso y carácter atemporal por encima de la producción masiva.",
        primaryImage: {
            src: "assets/images/products/chaq-02.jpg",
            alt: "Proceso de sastrería contemporánea y moldería en AURORA Studio",
            width: 800,
            height: 1071,
            caption: "Sastrería estructural · Serie 01"
        },
        secondaryImage: {
            src: "assets/images/products/abr-02.jpg",
            alt: "Detalle de caída y gabardina técnica en el taller de AURORA Studio",
            width: 800,
            height: 1071,
            caption: "Taller Buenos Aires"
        }
    },

    // SECCIÓN 03 — NUESTRO RECORRIDO (Línea de Tiempo Interactiva)
    // NOTA: Etapas de demostración editables — reemplazar con hitos confirmados de la marca.
    journey: {
        eyebrow: "Nuestro Recorrido",
        titleLead: "Un Camino",
        titleHighlight: "En Evolución",
        demoNotice: "Hitos de demostración editables en about-us.data.js",
        stages: [
            {
                year: "2018",
                title: "EL COMIENZO",
                description: "Primeros bocetos, moldería experimental y pruebas textiles en un taller independiente enfocado en prendas urbanas esenciales.",
                image: {
                    src: "assets/images/products/rem-01.jpg",
                    alt: "Etapa 2018 — Primeras piezas esenciales de algodón pesado",
                    width: 800,
                    height: 1071
                }
            },
            {
                year: "2020",
                title: "PRIMERA COLECCIÓN",
                description: "Lanzamiento de la primera cápsula numerada integrando tejidos técnicos repelentes al agua y cortes estructurados.",
                image: {
                    src: "assets/images/products/chaq-01.jpg",
                    alt: "Etapa 2020 — Primera colección cápsula urbana",
                    width: 800,
                    height: 1071
                }
            },
            {
                year: "2023",
                title: "UNA NUEVA IDENTIDAD",
                description: "Consolidación del lenguaje visual de AURORA Studio: sastrería contemporánea, paleta monocromática y acentos arquitectónicos.",
                image: {
                    src: "assets/images/products/vest-03.jpg",
                    alt: "Etapa 2023 — Consolidación de identidad editorial y sastrería",
                    width: 800,
                    height: 1071
                }
            },
            {
                year: "2026",
                title: "EL PRÓXIMO CAPÍTULO",
                description: "Expansión hacia textiles regenerados, calzado escultórico de edición limitada y una experiencia digital pensada primero para móvil.",
                image: {
                    src: "assets/images/products/calz-01.jpg",
                    alt: "Etapa 2026 — Nueva generación de prendas y calzado escultórico",
                    width: 800,
                    height: 1071
                }
            }
        ]
    },

    // SECCIÓN 04 — NÚMEROS QUE NOS DEFINEN
    // NOTA: Valores de demostración editables — actualizar con métricas reales cuando se confirmen.
    statistics: {
        eyebrow: "Números Que Nos Definen",
        titleLead: "Cifras En",
        titleHighlight: "Perspectiva",
        items: [
            { prefix: "+", value: 5, suffix: "", label: "AÑOS DE EXPERIENCIA" },
            { prefix: "+", value: 10, suffix: "K", label: "CLIENTES FELICES" },
            { prefix: "+", value: 30, suffix: "", label: "COLECCIONES" },
            { prefix: "+", value: 15, suffix: "", label: "PAÍSES" }
        ]
    },

    // SECCIÓN 05 — NUESTRA COMUNIDAD
    community: {
        eyebrow: "Nuestra Comunidad",
        title: "SUMATE A NUESTRO MUNDO.",
        // Cuenta ficticia de demostración: no apunta a un perfil real de Instagram.
        hashtag: "#AURORASTUDIO_DEMO",
        handle: "@aurorastudio_demo",
        description: "Nuestra comunidad lleva cada silueta a las calles con identidad propia. Etiquetanos para formar parte del archivo editorial.",
        ctaLabel: "SEGUINOS",
        ctaHref: "https://instagram.com/",
        posts: [
            {
                src: "assets/images/products/chaq-01.jpg",
                alt: "Look comunidad AURORA — Chaqueta Minimalist Neo",
                width: 800,
                height: 1071,
                handle: "@valen.m",
                look: "Chaqueta Minimalist Neo"
            },
            {
                src: "assets/images/products/vest-03.jpg",
                alt: "Look comunidad AURORA — Vestido Blazer Estructurado",
                width: 800,
                height: 1071,
                handle: "@sofia.ba",
                look: "Vestido Blazer Estructurado"
            },
            {
                src: "assets/images/products/pant-03.jpg",
                alt: "Look comunidad AURORA — Jogger Urbano Premium",
                width: 800,
                height: 1071,
                handle: "@tomas.k",
                look: "Jogger Urbano Premium"
            },
            {
                src: "assets/images/products/calz-01.jpg",
                alt: "Look comunidad AURORA — Sneaker Chunky Future 01",
                width: 800,
                height: 1071,
                handle: "@nico.urbn",
                look: "Sneaker Chunky Future 01"
            },
            {
                src: "assets/images/products/abr-02.jpg",
                alt: "Look comunidad AURORA — Trench Impermeable Urban",
                width: 800,
                height: 1071,
                handle: "@camila.r",
                look: "Trench Impermeable Urban"
            },
            {
                src: "assets/images/products/rem-01.jpg",
                alt: "Look comunidad AURORA — Remera Oversized Heavy Cotton",
                width: 800,
                height: 1071,
                handle: "@mateo.st",
                look: "Remera Oversized 240 GSM"
            }
        ]
    },

    // SECCIÓN 06 — CIERRE EDITORIAL CTA
    cta: {
        eyebrow: "AURORA Studio · Colección Actual",
        phraseLines: ["TU ESTILO.", "TU IDENTIDAD.", "TU HISTORIA."],
        highlightIndex: 1,
        buttonLabel: "EXPLORAR COLECCIÓN",
        image: {
            src: "assets/images/products/chaq-02.jpg",
            alt: "Campaña final AURORA Studio — Explorá la colección completa",
            width: 800,
            height: 1071
        }
    }
};
