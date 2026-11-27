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
    },
    {
        id: "chaq-03",
        name: "Bomber Modular Ripstop",
        category: "Chaquetas",
        price: 158000,
        originalPrice: 189000,
        badge: "NEW",
        stock: 5,
        rating: 4.8,
        reviewsCount: 29,
        sizes: ["S", "M", "L", "XL"],
        colors: ["Obsidian Black", "Graphite"],
        freeShipping: true,
        installments: true,
        description: "Chaqueta bomber de silueta volumétrica confeccionada en nylon ripstop antidesgarro con bolsillos utilitarios ocultos y cierres metálicos anodizados.",
        details: {
            material: "100% Nylon Ripstop técnico con repelencia al viento y lluvia leve",
            fit: "Boxy Cropped con puños acanalados",
            care: "Lavar a máquina en agua fría ciclo suave",
            origin: "Buenos Aires, Argentina"
        },
        images: [
            "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=650&q=75",
            "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=650&q=75",
            "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=650&q=75"
        ]
    },
    {
        id: "chaq-04",
        name: "Cazadora Cropped Shell",
        category: "Chaquetas",
        price: 139000,
        originalPrice: 162000,
        badge: "TREND",
        stock: 4,
        rating: 4.9,
        reviewsCount: 46,
        sizes: ["XS", "S", "M", "L"],
        colors: ["Bone White", "Carbon"],
        freeShipping: true,
        installments: true,
        description: "Cazadora corta de corte arquitectónico con cuello alto protector, costuras selladas y ajuste elástico en cintura para layering urbano.",
        details: {
            material: "Microfibra técnica tricapa transpirable",
            fit: "Cropped Estructurado",
            care: "Limpiar con paño húmedo o lavado delicado en frío",
            origin: "Diseño de autor AURORA Studio"
        },
        images: [
            "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=650&q=75",
            "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=650&q=75",
            "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=650&q=75"
        ]
    },
    {
        id: "abr-02",
        name: "Trench Impermeable Urban",
        category: "Abrigos",
        price: 228000,
        originalPrice: 265000,
        badge: "NEW",
        stock: 3,
        rating: 4.9,
        reviewsCount: 31,
        sizes: ["S", "M", "L"],
        colors: ["Stone Sand", "Noir"],
        freeShipping: true,
        installments: true,
        description: "Trench largo minimalista con solapa storm-flap, cinto desmontable con hebilla metálica mate y abertura trasera para movilidad fluida.",
        details: {
            material: "Gabardina técnica de algodón orgánico con membrana hidrófuga",
            fit: "Relaxed Longline hasta debajo de la rodilla",
            care: "Limpieza en seco recomendada",
            origin: "Buenos Aires, Argentina"
        },
        images: [
            "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=650&q=75",
            "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=650&q=75",
            "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=650&q=75"
        ]
    },
    {
        id: "abr-03",
        name: "Parka Térmica Aislante",
        category: "Abrigos",
        price: 240000,
        originalPrice: 280000,
        badge: "LIMITED",
        stock: 2,
        rating: 5.0,
        reviewsCount: 19,
        sizes: ["M", "L", "XL"],
        colors: ["Matte Olive", "Pitch Black"],
        freeShipping: true,
        installments: true,
        description: "Parka de alto rendimiento térmico con relleno sintético ultraliviano, capucha ergonómica ajustable y bolsillos internos forrados.",
        details: {
            material: "Exterior Poliamida matte + relleno aislante ecológico",
            fit: "Oversized Técnico para clima frío extremo",
            care: "Lavar en frío sin centrifugado agresivo",
            origin: "Edición Limitada AURORA Studio"
        },
        images: [
            "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=650&q=75",
            "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=650&q=75",
            "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=650&q=75"
        ]
    },
    {
        id: "abr-04",
        name: "Tapado Doble Faz Wool",
        category: "Abrigos",
        price: 255000,
        originalPrice: 295000,
        badge: "EXCLUSIVE",
        stock: 3,
        rating: 4.8,
        reviewsCount: 24,
        sizes: ["XS", "S", "M", "L"],
        colors: ["Charcoal", "Espresso"],
        freeShipping: true,
        installments: false,
        description: "Tapado sastrero confeccionado en paño doble faz cosido a mano, con hombros limpios y caída recta atemporal.",
        details: {
            material: "80% Lana merino peinada, 20% Poliamida de refuerzo",
            fit: "Straight Tailored Fit",
            care: "Tintorería especializada únicamente",
            origin: "Confección artesanal en Buenos Aires"
        },
        images: [
            "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=650&q=75",
            "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=650&q=75",
            "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=650&q=75"
        ]
    },
    {
        id: "vest-03",
        name: "Vestido Blazer Estructurado",
        category: "Vestidos",
        price: 154000,
        originalPrice: 180000,
        badge: "ICON",
        stock: 4,
        rating: 4.9,
        reviewsCount: 53,
        sizes: ["XS", "S", "M", "L"],
        colors: ["Pure Black", "Ivory"],
        freeShipping: true,
        installments: true,
        description: "Vestido sastrero cruzado inspirado en la sastrería masculina, con hombreras sutiles, solapa limpia y forrería satinada integral.",
        details: {
            material: "Crepé sastrero pesado con elastano de recuperación",
            fit: "Tailored Mini estructurado",
            care: "Limpieza en seco profesional",
            origin: "Industria Argentina"
        },
        images: [
            "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=650&q=75",
            "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=650&q=75",
            "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=650&q=75"
        ]
    },
    {
        id: "vest-04",
        name: "Vestido Cut-Out Ribbed",
        category: "Vestidos",
        price: 112000,
        originalPrice: 132000,
        badge: "NEW",
        stock: 6,
        rating: 4.7,
        reviewsCount: 41,
        sizes: ["XS", "S", "M"],
        colors: ["Onyx", "Slate"],
        freeShipping: false,
        installments: true,
        description: "Vestido midi en morley técnico acanalado con abertura geométrica en cintura y cuello cerrado minimalista.",
        details: {
            material: "90% Modal sustentable, 10% Elastano",
            fit: "Bodycon estilizado con largo midi",
            care: "Lavar a mano con agua fría, secar en plano",
            origin: "Confección local sustentable"
        },
        images: [
            "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=650&q=75",
            "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=650&q=75",
            "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=650&q=75"
        ]
    },
    {
        id: "pant-04",
        name: "Pantalón Parachute Nylon",
        category: "Pantalones",
        price: 94000,
        originalPrice: 110000,
        badge: "TREND",
        stock: 6,
        rating: 4.8,
        reviewsCount: 64,
        sizes: ["S", "M", "L", "XL"],
        colors: ["Phantom Black", "Ash Grey"],
        freeShipping: true,
        installments: true,
        description: "Pantalón parachute ultra liviano con pinzas articuladas en rodillas y cordones elásticos con tancas en cintura y botamanga.",
        details: {
            material: "Nylon Taslan arrugado de secado rápido",
            fit: "Baggy Wide regulable",
            care: "Lavar con agua fría, no usar plancha",
            origin: "Buenos Aires, Argentina"
        },
        images: [
            "https://images.unsplash.com/photo-1517445312882-bc9910d016b7?auto=format&fit=crop&w=650&q=75",
            "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&w=650&q=75",
            "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=650&q=75"
        ]
    },
    {
        id: "rem-03",
        name: "Remera Boxy Acid Wash",
        category: "Remeras",
        price: 49000,
        originalPrice: 58000,
        badge: "DROP",
        stock: 9,
        rating: 4.9,
        reviewsCount: 77,
        sizes: ["S", "M", "L", "XL"],
        colors: ["Washed Charcoal", "Chalk"],
        freeShipping: false,
        installments: true,
        description: "Remera boxy fit en jersey de 260 GSM con proceso artesanal de lavado mineral que otorga una textura única a cada prenda.",
        details: {
            material: "100% Algodón peinado Heavyweight 260 GSM",
            fit: "Boxy Oversized con hombros caídos",
            care: "Lavar por separado con agua fría del revés",
            origin: "Buenos Aires, Argentina"
        },
        images: [
            "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=650&q=75",
            "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=650&q=75",
            "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=650&q=75"
        ]
    },
    {
        id: "rem-04",
        name: "Longsleeve Segunda Piel",
        category: "Remeras",
        price: 54000,
        originalPrice: 64000,
        badge: "ESSENTIAL",
        stock: 7,
        rating: 4.8,
        reviewsCount: 45,
        sizes: ["XS", "S", "M", "L"],
        colors: ["Noir", "Titanium"],
        freeShipping: false,
        installments: true,
        description: "Remera manga larga de compresión ligera con costuras flatlock visibles y aberturas ergonómicas para pulgares en puños.",
        details: {
            material: "88% Poliamida reciclada, 12% Elastano stretch 4-way",
            fit: "Second-Skin Fitted",
            care: "Lavar en ciclo delicado sin suavizante",
            origin: "Confección nacional"
        },
        images: [
            "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=650&q=75",
            "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=650&q=75",
            "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=650&q=75"
        ]
    },
    {
        id: "calz-03",
        name: "Runner Tech Monolith",
        category: "Calzado",
        price: 195000,
        originalPrice: 229000,
        badge: "NEW",
        stock: 4,
        rating: 4.9,
        reviewsCount: 36,
        sizes: ["39", "40", "41", "42", "43", "44"],
        colors: ["All Black", "Silver / Ash"],
        freeShipping: true,
        installments: true,
        description: "Zapatilla técnica de inspiración running futurista con jaula de soporte TPU termosellada, cordones quick-lace y entresuela de doble densidad.",
        details: {
            material: "Mesh balístico respirable + refuerzos sintéticos termosellados",
            fit: "Calce ergonómico estándar",
            care: "Limpiar con cepillo suave y agua jabonosa neutra",
            origin: "AURORA Footwear Lab"
        },
        images: [
            "https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=650&q=75",
            "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=650&q=75",
            "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=650&q=75"
        ]
    },
    {
        id: "calz-04",
        name: "Borcego Plataforma Tactical",
        category: "Calzado",
        price: 225000,
        originalPrice: 260000,
        badge: "LIMITED",
        stock: 3,
        rating: 5.0,
        reviewsCount: 28,
        sizes: ["36", "37", "38", "39", "40", "41"],
        colors: ["Matte Leather Black"],
        freeShipping: true,
        installments: true,
        description: "Bota táctica urbana en cuero vacuno mate hidrofugado con cierre lateral YKK, ojalillos metálicos y suela track dentada de 5cm.",
        details: {
            material: "100% Cuero vacuno plena flor + base de caucho TR antideslizante",
            fit: "Horma amplia confortable",
            care: "Nutrir con crema neutra para cuero",
            origin: "Artesanal - Hecho en Argentina"
        },
        images: [
            "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=650&q=75",
            "https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=650&q=75",
            "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=650&q=75"
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


