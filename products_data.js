// ==========================================================================
// AURORA STUDIO — PRODUCTS_DATA & PERSISTENCIA LOCAL (Single Source of Truth)
// Conforme a las directrices de Arquitectura SOLID y Seguridad de AGENTS.md
// ==========================================================================

const PRODUCTS_DATA = [
    {
        id: "chaq-01",
        name: "Chaqueta Minimalist Neo",
        category: "Chaquetas",
        price: 145000,
        originalPrice: 175000,
        badge: "HOT",
        stock: 4,
        rating: 4.9,
        reviewsCount: 84,
        sizes: ["S", "M", "L", "XL"],
        colors: ["Noir Matte", "Slate Grey", "Off-White"],
        freeShipping: true,
        installments: true,
        description: "Chaqueta urbana confeccionada con tejido técnico impermeable y forro térmico micro-ventilado. Su silueta arquitectónica y cortes limpios definen la estética futurista de la nueva era.",
        details: {
            material: "100% Poliamida reciclada con tratamiento DWR repelente al agua",
            fit: "Corte Boxy relajado estructurado",
            care: "Lavar a máquina con agua fría en ciclo delicado. No usar secadora.",
            origin: "Fabricado éticamente en Buenos Aires, Argentina"
        },
        images: [
            "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=650&q=75",
            "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80&w=650&q=75",
            "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=650&q=75"
        ]
    },
    {
        id: "abr-01",
        name: "Abrigo Oversized Tech",
        category: "Abrigos",
        price: 210000,
        originalPrice: 245000,
        badge: "NEW",
        stock: 3,
        rating: 5.0,
        reviewsCount: 42,
        sizes: ["M", "L", "XL"],
        colors: ["Deep Charcoal", "Sand Ash"],
        freeShipping: true,
        installments: true,
        description: "Abrigo largo con silueta envolvente y capucha escultural. Desarrollado con paño de lana tecnológico que bloquea el viento y retiene el calor corporal sin agregar peso excesivo.",
        details: {
            material: "70% Lana regenerada, 30% Poliéster técnico termoaislante",
            fit: "Maxi Oversized con hombros caídos",
            care: "Limpieza a seco especializada en tintorería",
            origin: "Diseño de autor exclusivo AURORA"
        },
        images: [
            "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80&w=650&q=75",
            "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=650&q=75",
            "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=650&q=75"
        ]
    },
    {
        id: "vest-01",
        name: "Vestido Asimétrico Silk",
        category: "Vestidos",
        price: 125000,
        originalPrice: 150000,
        badge: "TREND",
        stock: 6,
        rating: 4.8,
        reviewsCount: 67,
        sizes: ["XS", "S", "M"],
        colors: ["Midnight Black", "Champagne"],
        freeShipping: true,
        installments: false,
        description: "Vestido midi con caída fluida y escote asimétrico cortado al bies. Combina satén de seda pesado con terminaciones termoselladas para un drapeado continuo e impecable.",
        details: {
            material: "Seda sintética orgánica de tacto ultra suave",
            fit: "Slim Fit al cuerpo con caída fluida hacia el dobladillo",
            care: "Lavar a mano con agua fría y jabón neutro",
            origin: "Confección artesanal de alta gama"
        },
        images: [
            "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=650&q=75",
            "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=650&q=75",
            "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80&w=650&q=75"
        ]
    },
    {
        id: "pant-01",
        name: "Pantalón Cargo Tech-Wear",
        category: "Pantalones",
        price: 98000,
        originalPrice: 115000,
        badge: "LIMITED",
        stock: 5,
        rating: 4.9,
        reviewsCount: 112,
        sizes: ["S", "M", "L", "XL"],
        colors: ["Pitch Black", "Military Olive"],
        freeShipping: true,
        installments: true,
        description: "Pantalón técnico con 6 bolsillos utilitarios modulares, correas ajustables de nylon balístico y puños elastizados con cierre hermético YKK.",
        details: {
            material: "Ripstop anti-desgarro elástizado de alta resistencia",
            fit: "Tapered Fit con tiro medio-alto",
            care: "Lavar al revés con cierres abrochados",
            origin: "Industria Argentina"
        },
        images: [
            "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=650&q=75",
            "https://images.unsplash.com/photo-1517445312882-bc9910d016b7?auto=format&fit=crop&q=80&w=650&q=75",
            "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&q=80&w=650&q=75"
        ]
    },
    {
        id: "calz-01",
        name: "Sneaker Chunky Future 01",
        category: "Calzado",
        price: 180000,
        originalPrice: 215000,
        badge: "DROP",
        stock: 2,
        rating: 5.0,
        reviewsCount: 95,
        sizes: ["39", "40", "41", "42", "43"],
        colors: ["Triple Black / Neon Yellow", "Bone White"],
        freeShipping: true,
        installments: true,
        description: "Zapatilla de estética vanguardista con suela escultórica de amortiguación reactiva EVA y capellada multicapa en cuero nobuk y mesh transpirable.",
        details: {
            material: "Cuero vacuno genuino combinado con textiles técnicos y suela de caucho vulcanizado",
            fit: "Calce estándar (fiel al talle)",
            care: "Limpiar con paño húmedo y protector de gamuza",
            origin: "Edición Limitada AURORA Studio"
        },
        images: [
            "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=650&q=75",
            "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=650&q=75",
            "https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&q=80&w=650&q=75"
        ]
    },
    {
        id: "chaq-02",
        name: "Blazer Oversized Sastre",
        category: "Chaquetas",
        price: 165000,
        originalPrice: 190000,
        badge: "ICON",
        stock: 5,
        rating: 4.7,
        reviewsCount: 38,
        sizes: ["XS", "S", "M", "L"],
        colors: ["Pure Black", "Concrete Grey"],
        freeShipping: false,
        installments: true,
        description: "Sastrería contemporánea con hombreras marcadas, solapa en punta y cruce simple. Diseñado para un look andrógino, elegante y adaptable tanto al día como a la noche.",
        details: {
            material: "Gabardina pesada de lana y viscosa con forrería en satén",
            fit: "Oversized sastrero estructurado",
            care: "Limpieza en seco profesional",
            origin: "Fabricación nacional"
        },
        images: [
            "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80&w=650&q=75",
            "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=650&q=75",
            "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=650&q=75"
        ]
    },
    {
        id: "calz-02",
        name: "Botineta Minimalist Leather",
        category: "Calzado",
        price: 210000,
        originalPrice: 235000,
        badge: "EXCLUSIVE",
        stock: 3,
        rating: 4.9,
        reviewsCount: 51,
        sizes: ["37", "38", "39", "40"],
        colors: ["Glossy Noir", "Burnt Umber"],
        freeShipping: true,
        installments: false,
        description: "Botineta de caña media en cuero vacuno pulido con tacón geométrico angular de 6cm. Cierre interno invisible y plantilla con memoria de impacto.",
        details: {
            material: "100% Cuero vacuno premium seleccionado con suela de cuero flex",
            fit: "Horma anatómica confortable",
            care: "Aplicar pomada incolora y lustrar con paño suave",
            origin: "Artesanal - Hecho a mano"
        },
        images: [
            "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=650&q=75",
            "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=650&q=75",
            "https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&q=80&w=650&q=75"
        ]
    },
    {
        id: "rem-02",
        name: "Top Arquitectónico Minimal",
        category: "Remeras",
        price: 38000,
        originalPrice: 46000,
        badge: "ESSENTIAL",
        stock: 8,
        rating: 4.8,
        reviewsCount: 73,
        sizes: ["XS", "S", "M"],
        colors: ["Onyx Black", "Optic White", "Titanium"],
        freeShipping: false,
        installments: true,
        description: "Top sin mangas con cuello mock neck y corte geométrico en espalda. Confeccionado en rib acanalado de alta densidad que modela sin perder elasticidad.",
        details: {
            material: "92% Algodón peinado premium, 8% Elastano de compresión suave",
            fit: "Form Fitting confortable",
            care: "Lavar con agua fría y prendas de colores similares",
            origin: "Confección local sustentable"
        },
        images: [
            "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&q=80&w=650&q=75",
            "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=650&q=75",
            "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&q=80&w=650&q=75"
        ]
    },
    {
        id: "rem-01",
        name: "Remera Oversized Heavy Cotton",
        category: "Remeras",
        price: 45000,
        originalPrice: 52000,
        badge: "ENVÍO GRATIS",
        stock: 10,
        rating: 4.9,
        reviewsCount: 140,
        sizes: ["S", "M", "L", "XL"],
        colors: ["Washed Black", "Off White", "Raw Umber"],
        freeShipping: true,
        installments: false,
        description: "Remera de alto gramaje (240 GSM) con cuello ancho reforzado de 3cm y mangas de caída holgada. Estética streetwear pura con tratamiento de teñido vintage.",
        details: {
            material: "100% Algodón Heavyweight orgánico pre-encogido",
            fit: "Boxy Streetwear Oversized",
            care: "Lavar del revés para preservar el color",
            origin: "Buenos Aires, Argentina"
        },
        images: [
            "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=650&q=75",
            "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&q=80&w=650&q=75",
            "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&q=80&w=650&q=75"
        ]
    },
    {
        id: "pant-02",
        name: "Pantalón Sastrero Wide Leg",
        category: "Pantalones",
        price: 89000,
        originalPrice: 102000,
        badge: "3 CUOTAS SIN INTERÉS",
        stock: 6,
        rating: 4.7,
        reviewsCount: 58,
        sizes: ["XS", "S", "M", "L"],
        colors: ["Black Noir", "Pinstripe Grey"],
        freeShipping: false,
        installments: true,
        description: "Pantalón de corte sastre con pinzas profundas frontales y pierna extra ancha de caída recta. Cintura alta con presillas reforzadas.",
        details: {
            material: "Crepé sastrero con excelente caída y resistencia a arrugas",
            fit: "High Rise Wide Leg holgado",
            care: "Lavar a máquina en ciclo suave",
            origin: "Industria Argentina"
        },
        images: [
            "https://images.unsplash.com/photo-1517445312882-bc9910d016b7?auto=format&fit=crop&q=80&w=650&q=75",
            "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=650&q=75",
            "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&q=80&w=650&q=75"
        ]
    },
    {
        id: "vest-02",
        name: "Vestido Minimalist Long",
        category: "Vestidos",
        price: 142000,
        originalPrice: 165000,
        badge: "3 CUOTAS SIN INTERÉS",
        stock: 4,
        rating: 4.8,
        reviewsCount: 39,
        sizes: ["S", "M", "L"],
        colors: ["Pure Black", "Chalk White"],
        freeShipping: false,
        installments: true,
        description: "Vestido columna hasta los tobillos con cuello halter y espalda descubierta. Tejido doble punto de sujeción impecable.",
        details: {
            material: "Punto Roma pesado de alta densidad",
            fit: "Column Fit con tajo lateral",
            care: "Lavar con agua fría, secar en plano a la sombra",
            origin: "Buenos Aires, Argentina"
        },
        images: [
            "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=650&q=75",
            "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=650&q=75",
            "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80&w=650&q=75"
        ]
    },
    {
        id: "pant-03",
        name: "Jogger Urbano Premium",
        category: "Pantalones",
        price: 75000,
        originalPrice: 88000,
        badge: "HOT",
        stock: 7,
        rating: 4.9,
        reviewsCount: 88,
        sizes: ["S", "M", "L", "XL"],
        colors: ["Washed Charcoal", "Black"],
        freeShipping: false,
        installments: false,
        description: "Pantalón deportivo con detalles de sastrería: costuras nervadas delanteras, cordón con punteras metálicas grabadas y bolsillos con cierre oculto.",
        details: {
            material: "Frisa invisible 100% algodón peinado esmerilado",
            fit: "Slim Relaxed con puño acanalado",
            care: "Lavar con agua fría, no planchar estampas",
            origin: "Hecho en Argentina"
        },
        images: [
            "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&q=80&w=650&q=75",
            "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=650&q=75",
            "https://images.unsplash.com/photo-1517445312882-bc9910d016b7?auto=format&fit=crop&q=80&w=650&q=75"
        ]
    }
];

// ==========================================================================
// UTILIDADES COMPARTIDAS (Persistencia en LocalStorage & Moneda)
// ==========================================================================
const formatMoney = (amount) => {
    return new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS',
        maximumFractionDigits: 0
    }).format(amount);
};

const getStoredCart = () => {
    try {
        const stored = localStorage.getItem('AURORA_CART');
        if (stored) return JSON.parse(stored);
    } catch (e) {
        console.warn('LocalStorage no disponible, usando memoria temporal.');
    }
    return [
        { id: "chaq-01", quantity: 1, size: "M" },
        { id: "vest-01", quantity: 1, size: "S" }
    ];
};

const saveStoredCart = (cart) => {
    try {
        localStorage.setItem('AURORA_CART', JSON.stringify(cart));
    } catch (e) {
        console.warn('Error al guardar carrito en LocalStorage:', e);
    }
};

const getStoredWishlist = () => {
    try {
        const stored = localStorage.getItem('AURORA_WISHLIST');
        if (stored) return new Set(JSON.parse(stored));
    } catch (e) {}
    return new Set();
};

const saveStoredWishlist = (wishlistSet) => {
    try {
        localStorage.setItem('AURORA_WISHLIST', JSON.stringify(Array.from(wishlistSet)));
    } catch (e) {}
};

// Exposición global explícita en window para compatibilidad universal
if (typeof window !== 'undefined') {
    window.PRODUCTS_DATA = PRODUCTS_DATA;
    window.formatMoney = formatMoney;
    window.getStoredCart = getStoredCart;
    window.saveStoredCart = saveStoredCart;
    window.getStoredWishlist = getStoredWishlist;
    window.saveStoredWishlist = saveStoredWishlist;
}


