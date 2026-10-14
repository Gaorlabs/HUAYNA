import { Product, DistrictDelivery, Promotion, CategoryMeta } from '../types';

export const BUSINESS_INFO = {
  name: 'HUAYNA',
  tagline: 'Cafetería & Postres Saludables',
  slogan: 'Postres y delicias saludables en Tacna · Sin culpas, endulzados naturalmente',
  address: 'Av. Varela 409, frente a las 200 Casas, recta de Pollería El Pollón',
  city: 'Tacna, Perú',
  phoneDisplay: '+51 904 887 006',
  whatsappRaw: '51904887006',
  instagram: '@huaynacafeteriasaludable',
  tiktok: '@huaynacafeteriasaludable',
  openingHours: 'Lunes a Sábado: 8:00 AM - 9:30 PM | Domingos: 9:00 AM - 8:00 PM',
  yape: {
    number: '904 887 006',
    holder: 'HUAYNA CAFETERÍA SALUDABLE',
    note: 'Yapea y envía la captura de pantalla al WhatsApp para procesar tu orden al instante.'
  },
  bcp: {
    accountNumber: '540-98342155-0-82',
    accountHolder: 'HUAYNA CAFETERÍA SALUDABLE SAC',
    cci: '002-540009834215508249',
    type: 'Cuenta de Ahorros Soles BCP'
  }
};

export const DISTRICTS: DistrictDelivery[] = [
  { id: 'cercado', name: 'Tacna Cercado', fee: 4.00, estimatedTime: '25-35 min' },
  { id: 'albarracin', name: 'Coronel Gregorio Albarracín (Cono Sur)', fee: 6.00, estimatedTime: '30-45 min' },
  { id: 'pocollay', name: 'Pocollay', fee: 5.00, estimatedTime: '25-40 min' },
  { id: 'alto_alianza', name: 'Alto de la Alianza', fee: 5.00, estimatedTime: '30-40 min' },
  { id: 'ciudad_nueva', name: 'Ciudad Nueva', fee: 6.00, estimatedTime: '35-45 min' },
  { id: 'calana', name: 'Calana / Pachía', fee: 8.00, estimatedTime: '40-50 min' },
  { id: 'recojo', name: 'Recojo en Local (Av. Varela 409)', fee: 0.00, estimatedTime: 'Listo en 20 min' },
];

export const PROMOTIONS: Promotion[] = [
  {
    id: 'promo-1',
    title: 'Dúo Cuchareables Fit',
    tagline: 'Endulzado con alulosa & dulce de leche casero',
    badge: 'Más Vendido',
    description: 'Elige tus 2 cuchareables favoritos (Cacao o Carrot Cake) y llévate un descuento especial.',
    discountBadge: 'Ahorra S/ 4',
    categoryLink: 'postres',
    bgGradient: 'from-emerald-900 to-teal-950',
    accentColor: '#e5a93c'
  },
  {
    id: 'promo-2',
    title: 'Desayuno Proteico Power',
    tagline: 'Panqueques de avena + Batido Fit',
    badge: 'Desayunos',
    description: 'Pancake Banana o Frutos Rojos con harina de avena + 1 Batido Proteico WPC 80%.',
    discountBadge: 'Combo Especial',
    categoryLink: 'panqueques',
    bgGradient: 'from-amber-950 to-stone-900',
    accentColor: '#f59e0b'
  },
  {
    id: 'promo-3',
    title: 'Almuerzo Saludable Tacna',
    tagline: 'Chaufa de quinua con pechuga de pollo',
    badge: 'Saludable',
    description: '300g quinua aromatizada + 200g pechuga de pollo + ensalada fresca + Green Low detox.',
    discountBadge: 'Full Energía',
    categoryLink: 'comidas',
    bgGradient: 'from-emerald-950 to-slate-900',
    accentColor: '#10b981'
  }
];

export const PRODUCTS: Product[] = [
  // --- PANQUEQUES ---
  {
    id: 'panc-banana',
    name: 'Banana Pancake',
    category: 'panqueques',
    categoryLabel: 'Panqueques',
    price: 15.00,
    description: 'Pancake con harina de avena, con un frosting de granola y decorado con plátano y fudge cacao artesanal.',
    ingredients: 'Harina de avena integral, plátanos frescos de estación, frosting artesanal de granola, fudge de cacao puro sin azúcar añadido.',
    benefits: ['Alto en fibra digestiva', 'Energía limpia y sostenida', 'Sin harinas refinadas'],
    tags: ['Harina de Avena', 'Sin Azúcar Añadida', 'Fibra Natural'],
    rating: 4.9,
    reviewsCount: 42,
    image: 'pancakes-banana',
    popular: true,
    options: [
      {
        name: 'Extra Topping',
        choices: [
          { label: 'Tradicional (Incluido)', priceDelta: 0 },
          { label: 'Extra Plátano y Granola (+S/ 2)', priceDelta: 2 },
          { label: 'Extra Fudge Cacao Proteico (+S/ 3)', priceDelta: 3 }
        ]
      }
    ]
  },
  {
    id: 'panc-frutos-rojos',
    name: 'Panqueques Frutos Rojos',
    category: 'panqueques',
    categoryLabel: 'Panqueques',
    price: 17.00,
    description: 'Pancake a base de harina de avena, con un frosting de yogurt griego, syrup de berries y frutos rojos frescos.',
    ingredients: 'Harina de avena, yogurt griego natural artesanal, syrup casero de berries sin azúcar, arándanos y fresas.',
    benefits: ['Rico en antioxidantes', 'Probióticos del yogurt griego', 'Bajo índice glucémico'],
    tags: ['Yogurt Griego', 'Antioxidantes', 'Avena'],
    rating: 5.0,
    reviewsCount: 56,
    image: 'pancakes-berries',
    popular: true
  },
  {
    id: 'panc-paradise',
    name: 'Panqueques Paradise',
    category: 'panqueques',
    categoryLabel: 'Panqueques',
    price: 15.00,
    description: 'Elaborado con harina de avena, con frosting de yogurt griego, mango y piña picados.',
    ingredients: 'Harina de avena, yogurt griego seleccionado, piña y mango frescos picados en trozos tropicales.',
    benefits: ['Vitaminas C y A', 'Digestivo y refrescante', 'Aporte proteico natural'],
    tags: ['Frutas Tropicales', 'Yogurt Griego', 'Sin Azúcar'],
    rating: 4.8,
    reviewsCount: 29,
    image: 'pancakes-tropical'
  },

  // --- POSTRES ---
  {
    id: 'postre-cuchareable-cacao',
    name: 'Cuchareable de Cacao',
    category: 'postres',
    categoryLabel: 'Postres Fit',
    price: 18.00,
    description: 'Cuchareable elaborado con harina de avena y almendras, endulzado con alulosa, relleno de un dulce de leche casero sin azúcar y un fudge cremoso artesanal.',
    ingredients: 'Harina de almendras y avena, alulosa natural pura, dulce de leche casero sin azúcar, fudge de cacao orgánico al 70%.',
    benefits: ['Endulzado con alulosa keto-friendly', '0% picos de glucosa', 'Textura cremosa irresistible'],
    tags: ['Harina de Almendras', 'Con Alulosa', 'Keto Friendly', 'Dulce de Leche Fit'],
    rating: 5.0,
    reviewsCount: 88,
    image: 'cuchareable-cacao',
    popular: true
  },
  {
    id: 'postre-cuchareable-carrot',
    name: 'Cuchareable de Carrot Cake',
    category: 'postres',
    categoryLabel: 'Postres Fit',
    price: 18.00,
    description: 'Queque de zanahorita con especias como kion, canela, nuez moscada, harina de almendras y avena con un frosting de la casa a base de yogurt griego, decorado con nueces y aguaymanto.',
    ingredients: 'Zanahoria fresca rallada, harina de almendras y avena, canela, kion, nuez moscada, frosting de yogurt griego, nueces y aguaymanto.',
    benefits: ['Especias antiinflamatorias', 'Superalimento aguaymanto peruano', 'Grasas saludables'],
    tags: ['Yogurt Griego', 'Almendra & Avena', 'Aguaymanto', 'Sin Azúcar'],
    rating: 4.9,
    reviewsCount: 64,
    image: 'cuchareable-carrot',
    popular: true
  },
  {
    id: 'postre-torta-cacao-fit',
    name: 'Torta de Cacao Fit',
    category: 'postres',
    categoryLabel: 'Postres Fit',
    price: 15.00,
    description: 'Elaborado con harina de avena y almendra, endulzado con panela, proteína de suero de leche y un fudge proteico.',
    ingredients: 'Harina de avena y almendras, proteína de suero de leche aislada WPC, panela orgánica, cacao puro y fudge proteico.',
    benefits: ['Aporte proteico para recuperación muscular', 'Cacao puro rico en polifenoles', 'Satisface el antojo fitness'],
    tags: ['Proteico', 'Harina de Almendra', 'Fudge Proteico'],
    rating: 4.9,
    reviewsCount: 39,
    image: 'torta-cacao'
  },
  {
    id: 'postre-alfajor-healthy',
    name: 'Alfajor Healthy',
    category: 'postres',
    categoryLabel: 'Postres Fit',
    price: 5.00,
    description: 'Elaborado con harina de avena y almendra, endulzado con alulosa, dulce de leche sin azúcar, no contiene gluten.',
    ingredients: 'Harina de almendras, avena certificada sin gluten, dulce de leche artesanal sin azúcar, alulosa.',
    benefits: ['100% Libre de gluten', 'Snack individual perfecto', 'Textura suave y desgranable'],
    tags: ['Sin Gluten', 'Con Alulosa', 'Sin Azúcar'],
    rating: 4.8,
    reviewsCount: 71,
    image: 'alfajor-healthy'
  },
  {
    id: 'postre-queque-platano',
    name: 'Queque de Plátano Fit',
    category: 'postres',
    categoryLabel: 'Postres Fit',
    price: 8.00,
    description: 'Elaborado con harina integral, plátanos triturados, endulzado con alulosa. No contiene lactosa y sin azúcar.',
    ingredients: 'Harina integral de trigo molido a piedra, plátanos seda maduros, alulosa, aceite vegetal prensado en frío.',
    benefits: ['Sin lactosa', 'Sin azúcar añadida', 'Rico en potasio'],
    tags: ['Sin Lactosa', 'Sin Azúcar', 'Harina Integral'],
    rating: 4.7,
    reviewsCount: 33,
    image: 'queque-platano'
  },
  {
    id: 'postre-queque-arandano',
    name: 'Queque de Arándano',
    category: 'postres',
    categoryLabel: 'Postres Fit',
    price: 9.00,
    description: 'Elaborado con un mix de harinas sin gluten, arándanos, endulzado con alulosa, sin azúcar, sin gluten, sin lácteos.',
    ingredients: 'Mix de harinas libres de gluten (arroz, almendra), arándanos frescos enteros, alulosa, sin lácteos.',
    benefits: ['100% Sin gluten', 'Sin lácteos (apto intolerantes)', 'Poder antioxidante'],
    tags: ['Sin Gluten', 'Sin Lácteos', 'Sin Azúcar'],
    rating: 4.9,
    reviewsCount: 45,
    image: 'queque-arandano'
  },
  {
    id: 'postre-brownie-healthy',
    name: 'Brownie Healthy',
    category: 'postres',
    categoryLabel: 'Postres Fit',
    price: 6.00,
    description: 'Mix de harinas sin gluten, chocolate sin azúcar, aceite de coco, cacao orgánico.',
    ingredients: 'Mix de harinas sin gluten, chocolate amargo 70% sin azúcar, aceite de coco virgen prensado en frío, cacao orgánico.',
    benefits: ['Rico en grasas saludables de coco', 'Libre de gluten', 'Intenso sabor a chocolate puro'],
    tags: ['Sin Gluten', 'Aceite de Coco', 'Cacao Orgánico'],
    rating: 4.9,
    reviewsCount: 82,
    image: 'brownie-healthy'
  },
  {
    id: 'postre-brownie-hierro',
    name: 'Brownie Alto en Hierro',
    category: 'postres',
    categoryLabel: 'Postres Fit',
    price: 8.50,
    description: 'Mix de harinas sin gluten, chocolate sin azúcar, aceite de coco, cacao orgánico y hierro hemínico.',
    ingredients: 'Mix de harinas sin gluten, chocolate sin azúcar, cacao orgánico, aceite de coco y hierro hemínico bioasimilable.',
    benefits: ['Previene y combate la anemia', 'Hierro hemínico de máxima absorción', 'Aprobado para niños y adultos con sabor delicioso'],
    tags: ['Alto en Hierro', 'Anti-Anemia', 'Sin Gluten', 'Superalimento'],
    rating: 5.0,
    reviewsCount: 94,
    image: 'brownie-hierro',
    popular: true
  },

  // --- COMIDAS ---
  {
    id: 'comida-chaufa-quinua',
    name: 'Chaufa de Quinua',
    category: 'comidas',
    categoryLabel: 'Comidas Saludables',
    price: 18.00,
    description: '200 gr de pechuga de pollo, 300 gr de quinua, aromatizado con especias y salsas, acompañado de un plato de ensalada.',
    ingredients: 'Quinua real tricolor perlada 300g, pechuga de pollo marinada a las hierbas 200g, pimientos, cebollita china, sillao bajo en sodio y ensalada fresca.',
    benefits: ['Proteína completa con todos los aminoácidos', 'Rico en fósforo y magnesio', 'Plato balanceado y saciante'],
    tags: ['Quinua Peruana', '200g Pechuga Pollo', 'Alto en Proteína', 'Almuerzo Fit'],
    rating: 5.0,
    reviewsCount: 110,
    image: 'chaufa-quinua',
    popular: true
  },
  {
    id: 'comida-pollo-plancha',
    name: 'Pollo a la Plancha',
    category: 'comidas',
    categoryLabel: 'Comidas Saludables',
    price: 16.00,
    description: '200 gr de filete de pollo, acompañado de arroz integral o blanco y un mix de vegetales frescos.',
    ingredients: 'Filete magro de pechuga de pollo a la plancha 200g, guarnición a elección (arroz integral o blanco) y ensalada de vegetales crujientes con vinagreta de la casa.',
    benefits: ['Bajo en grasa saturada', 'Ideal para control de peso', 'Proteína magra'],
    tags: ['200g Filete Magro', 'Arroz Integral', 'Vegetales Frescos'],
    rating: 4.8,
    reviewsCount: 52,
    image: 'pollo-plancha',
    options: [
      {
        name: 'Guarnición de Arroz',
        choices: [
          { label: 'Arroz Integral Saludable', priceDelta: 0 },
          { label: 'Arroz Blanco', priceDelta: 0 }
        ]
      }
    ]
  },
  {
    id: 'comida-sandwich-pollo',
    name: 'Sandwich de Pollo en Masa Madre',
    category: 'comidas',
    categoryLabel: 'Comidas Saludables',
    price: 15.00,
    description: 'Pan de masa madre, acompañado de 150 gr de filete de pollo, palta, tomate, lechuga.',
    ingredients: 'Pan artesanal de fermentación lenta (masa madre), 150g filete de pechuga de pollo deshilachado/filetado, palta fuerte madura, tomate y lechuga hidropónica.',
    benefits: ['Pan de masa madre de fácil digestión', 'Grasas monoinsaturadas de palta fresca', 'Nutritivo y completo'],
    tags: ['Pan Masa Madre', 'Palta Fresca', '150g Pollo'],
    rating: 4.9,
    reviewsCount: 67,
    image: 'sandwich-pollo',
    popular: true
  },

  // --- BEBIDAS ---
  {
    id: 'bebida-green-low',
    name: 'Green Low Detox',
    category: 'bebidas',
    categoryLabel: 'Bebidas & Cafetería',
    price: 8.00,
    description: 'Bebida desintoxicante a base de piña, apio, cilantro, kion.',
    ingredients: 'Piña golden dulce natural, tallo de apio fresco, cilantro, raíz de kion (jengibre). Sin agua añadida.',
    benefits: ['Potente diurético y depurativo', 'Acelera el metabolismo', 'Propiedades digestivas y antiinflamatorias'],
    tags: ['Detox Natural', 'Sin Azúcar', '100% Extracto'],
    rating: 4.8,
    reviewsCount: 48,
    image: 'green-low'
  },
  {
    id: 'bebida-jugo-fresa',
    name: 'Jugo Natural de Fresa',
    category: 'bebidas',
    categoryLabel: 'Bebidas & Cafetería',
    price: 10.00,
    description: 'Fresas frescas de temporada licuadas al momento, endulzado natural o alulosa opcional.',
    ingredients: 'Fresas seleccionadas, agua purificada o leche a elección.',
    benefits: ['Vitamina C pura', 'Refrescante e hidratante'],
    tags: ['100% Fruta', 'Hecho al Momento'],
    rating: 4.8,
    reviewsCount: 30,
    image: 'jugo-fresa',
    options: [
      {
        name: 'Tipo de Preparación',
        choices: [
          { label: 'Al agua pura (Sin recargo)', priceDelta: 0 },
          { label: 'Con Leche de Almendras (+S/ 4)', priceDelta: 4 },
          { label: 'Con Leche Deslactosada (+S/ 4)', priceDelta: 4 }
        ]
      }
    ]
  },
  {
    id: 'bebida-jugo-mango',
    name: 'Jugo Natural de Mango',
    category: 'bebidas',
    categoryLabel: 'Bebidas & Cafetería',
    price: 10.00,
    description: 'Mango dulce de estación licuado cremoso al momento.',
    ingredients: 'Pulpa de mango maduro natural.',
    benefits: ['Rico en betacarotenos', 'Sabor dulce natural'],
    tags: ['100% Fruta', 'Sin Azúcar Añadida'],
    rating: 4.9,
    reviewsCount: 26,
    image: 'jugo-mango',
    options: [
      {
        name: 'Tipo de Preparación',
        choices: [
          { label: 'Al agua pura (Sin recargo)', priceDelta: 0 },
          { label: 'Con Leche de Almendras (+S/ 4)', priceDelta: 4 },
          { label: 'Con Leche Deslactosada (+S/ 4)', priceDelta: 4 }
        ]
      }
    ]
  },
  {
    id: 'bebida-jugo-pina',
    name: 'Jugo Natural de Piña',
    category: 'bebidas',
    categoryLabel: 'Bebidas & Cafetería',
    price: 10.00,
    description: 'Piña golden fresca, digestiva y ligera.',
    ingredients: 'Piña golden madura seleccionada.',
    benefits: ['Contiene bromelina digestiva', 'Hidratante'],
    tags: ['100% Fruta', 'Digestivo'],
    rating: 4.7,
    reviewsCount: 19,
    image: 'jugo-pina'
  },
  {
    id: 'bebida-jugo-papaya',
    name: 'Jugo Natural de Papaya',
    category: 'bebidas',
    categoryLabel: 'Bebidas & Cafetería',
    price: 10.00,
    description: 'Papaya aromática seleccionada, ideal para el estómago y digestión ligera.',
    ingredients: 'Papaya fresca de calidad.',
    benefits: ['Papaína para la digestión estomacal', 'Calma el tracto digestivo'],
    tags: ['Digestivo', '100% Natural'],
    rating: 4.8,
    reviewsCount: 22,
    image: 'jugo-papaya',
    options: [
      {
        name: 'Tipo de Preparación',
        choices: [
          { label: 'Al agua pura (Sin recargo)', priceDelta: 0 },
          { label: 'Con Leche de Almendras (+S/ 4)', priceDelta: 4 },
          { label: 'Con Leche Deslactosada (+S/ 4)', priceDelta: 4 }
        ]
      }
    ]
  },
  {
    id: 'bebida-cappuccino',
    name: 'Cappuccino Artesanal',
    category: 'bebidas',
    categoryLabel: 'Bebidas & Cafetería',
    price: 11.00,
    description: 'Espresso de café peruano de especialidad con leche cremada y canela espolvoreada.',
    ingredients: 'Café de especialidad tostado fresco, leche texturizada, toque de canela.',
    benefits: ['Antioxidantes del café', 'Energía y foco mental'],
    tags: ['Café de Especialidad', 'Artesanal'],
    rating: 4.9,
    reviewsCount: 38,
    image: 'cafe-cappuccino'
  },
  {
    id: 'bebida-latte',
    name: 'Café Latte',
    category: 'bebidas',
    categoryLabel: 'Bebidas & Cafetería',
    price: 12.00,
    description: 'Doble shot de espresso con leche vaporizada sedosa.',
    ingredients: 'Espresso seleccionado, leche entera o vegetal a elección.',
    benefits: ['Suave y reconfortante'],
    tags: ['Café de Especialidad'],
    rating: 4.9,
    reviewsCount: 27,
    image: 'cafe-latte',
    options: [
      {
        name: 'Tipo de Leche',
        choices: [
          { label: 'Leche Deslactosada', priceDelta: 0 },
          { label: 'Leche de Almendras (+S/ 4)', priceDelta: 4 },
          { label: 'Leche Entera', priceDelta: 0 }
        ]
      }
    ]
  },
  {
    id: 'bebida-americano',
    name: 'Café Americano',
    category: 'bebidas',
    categoryLabel: 'Bebidas & Cafetería',
    price: 7.00,
    description: 'Shot de café espresso prolongado con agua caliente a 92°C.',
    ingredients: 'Granos de café de altura peruana.',
    benefits: ['Cero calorías', 'Pura energía natural'],
    tags: ['0 Calorías', 'Café de Especialidad'],
    rating: 4.7,
    reviewsCount: 18,
    image: 'cafe-americano'
  },
  {
    id: 'bebida-espresso',
    name: 'Espresso',
    category: 'bebidas',
    categoryLabel: 'Bebidas & Cafetería',
    price: 6.00,
    description: 'Extracción concentrada e intensa con crema avellana perfecta.',
    ingredients: 'Café de especialidad molido fino.',
    benefits: ['Intenso y energizante'],
    tags: ['Intenso', 'Especialidad'],
    rating: 4.8,
    reviewsCount: 15,
    image: 'cafe-espresso'
  },
  {
    id: 'bebida-chocolate-caliente',
    name: 'Chocolate Caliente Artesanal',
    category: 'bebidas',
    categoryLabel: 'Bebidas & Cafetería',
    price: 8.00,
    description: 'Pasta pura de cacao al 100% derretida con canela, clavo de olor y leche espumada.',
    ingredients: 'Cacao orgánico puro peruano, canela, clavo y leche.',
    benefits: ['Mejora el estado de ánimo', 'Rico en magnesio y teobromina'],
    tags: ['Cacao Puro 100%', 'Artesanal'],
    rating: 4.9,
    reviewsCount: 41,
    image: 'chocolate-caliente'
  },
  {
    id: 'bebida-inka-cola',
    name: 'Gaseosa Inka Cola Personal',
    category: 'bebidas',
    categoryLabel: 'Bebidas & Cafetería',
    price: 2.50,
    description: 'Botella personal 500ml helada.',
    tags: ['Bebida Embotellada'],
    rating: 4.5,
    reviewsCount: 12,
    image: 'soda-inka'
  },
  {
    id: 'bebida-coca-cola',
    name: 'Gaseosa Coca Cola Personal',
    category: 'bebidas',
    categoryLabel: 'Bebidas & Cafetería',
    price: 2.50,
    description: 'Botella personal 500ml helada.',
    tags: ['Bebida Embotellada'],
    rating: 4.5,
    reviewsCount: 10,
    image: 'soda-coca'
  },

  // --- BATIDOS PROTEICOS ---
  {
    id: 'batido-banana-fit',
    name: 'Batido Banana Fit Proteico',
    category: 'batidos',
    categoryLabel: 'Batidos Proteicos',
    price: 13.00,
    description: '1 scoop de proteína WPC 80%, plátano, avena, leche deslactosada y cacao.',
    ingredients: '1 scoop de proteína Whey Protein Concentrate WPC 80% (aprox 24g de proteína), plátano, hojuelas de avena, cacao puro y leche deslactosada.',
    benefits: ['26g de proteína total', 'Ideal para post-entrenamiento', 'Recuperación de masa muscular'],
    tags: ['WPC 80% Proteína', '26g Proteína', 'Post-Workout'],
    rating: 5.0,
    reviewsCount: 77,
    image: 'batido-banana',
    popular: true
  },
  {
    id: 'batido-berrie-fit',
    name: 'Batido Berrie Fit Proteico',
    category: 'batidos',
    categoryLabel: 'Batidos Proteicos',
    price: 13.00,
    description: 'Batido a base de frutos rojos, 1 scoop de proteína WPC 80% y yogurt griego.',
    ingredients: 'Frutos rojos (arándanos, fresas, moras), 1 scoop de proteína WPC 80% y auténtico yogurt griego.',
    benefits: ['Poderoso antioxidante', 'Textura espesa y cremosa', 'Saciedad prolongada y aporte proteico'],
    tags: ['Frutos Rojos', 'WPC 80%', 'Yogurt Griego'],
    rating: 4.9,
    reviewsCount: 63,
    image: 'batido-berrie',
    popular: true
  },

  // --- EMPANADAS INTEGRALES ---
  {
    id: 'empanada-queso',
    name: 'Empanada Integral de Queso',
    category: 'empanadas',
    categoryLabel: 'Empanadas Integrales',
    price: 5.00,
    description: 'Masa integral horneada rellena de generoso queso fresco andino derretido.',
    ingredients: 'Masa artesanal de harina de trigo integral y avena horneada, queso fresco artesanal.',
    benefits: ['Horneada, nunca frita', 'Harina integral rica en fibra', 'Queso fresco natural'],
    tags: ['Horneada', 'Masa Integral', 'Sin Frituras'],
    rating: 4.8,
    reviewsCount: 35,
    image: 'empanada-queso'
  },
  {
    id: 'empanada-queso-aceituna',
    name: 'Empanada Integral Queso con Aceituna',
    category: 'empanadas',
    categoryLabel: 'Empanadas Integrales',
    price: 6.00,
    description: 'Masa integral crujiente con queso fresco y aceitunas negras tacneñas de primera calidad.',
    ingredients: 'Masa de harina integral horneada, queso andino derretido, aceitunas negras botija de los valles de Tacna.',
    benefits: ['Aceituna de Tacna con polifenoles', 'Grasas saludables', 'Sabor auténtico tacneño'],
    tags: ['Aceituna Tacneña', 'Masa Integral', 'Horneada'],
    rating: 4.9,
    reviewsCount: 44,
    image: 'empanada-aceituna',
    popular: true
  },
  {
    id: 'empanada-pollo',
    name: 'Empanada Integral de Pollo',
    category: 'empanadas',
    categoryLabel: 'Empanadas Integrales',
    price: 8.00,
    description: 'Masa integral con relleno jugoso de pechuga de pollo deshilachada con verduras salteadas.',
    ingredients: 'Masa integral horneada, pechuga de pollo marinada, cebollas y pimientos salteados a fuego suave.',
    benefits: ['Relleno magro rico en proteína', 'Almuerzo o media tarde ligero y saciante'],
    tags: ['Pechuga de Pollo', 'Masa Integral', 'Horneada'],
    rating: 4.9,
    reviewsCount: 51,
    image: 'empanada-pollo'
  }
];

export const CATEGORIES: CategoryMeta[] = [
  { 
    id: 'all', 
    label: 'Todo el Menú', 
    tagline: 'Todo lo saludable de HUAYNA',
    image: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=600&q=80',
    itemCount: 18,
    icon: 'Sparkles',
    badge: 'Completo'
  },
  { 
    id: 'panqueques', 
    label: 'Panqueques', 
    tagline: 'Avena, plátano & frutos frescos',
    image: 'https://images.unsplash.com/photo-1528207776546-365bb710ee93?auto=format&fit=crop&w=600&q=80',
    itemCount: 3,
    icon: 'Layers',
    badge: 'Top Desayunos'
  },
  { 
    id: 'postres', 
    label: 'Postres Fit', 
    tagline: 'Cuchareables con alulosa & cacao',
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80',
    itemCount: 5,
    icon: 'Cake',
    badge: 'Favoritos'
  },
  { 
    id: 'comidas', 
    label: 'Comidas Saludables', 
    tagline: 'Quinua, pechuga & bowls fit',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80',
    itemCount: 3,
    icon: 'UtensilsCrossed',
    badge: 'Almuerzos'
  },
  { 
    id: 'batidos', 
    label: 'Batidos Proteicos', 
    tagline: 'WPC 80% proteína & fruta real',
    image: 'https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=600&q=80',
    itemCount: 3,
    icon: 'Dumbbell',
    badge: 'Fit Energy'
  },
  { 
    id: 'bebidas', 
    label: 'Bebidas & Café', 
    tagline: 'Green detox & café de especialidad',
    image: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=600&q=80',
    itemCount: 2,
    icon: 'Coffee',
    badge: 'Refrescante'
  },
  { 
    id: 'empanadas', 
    label: 'Empanadas Integrales', 
    tagline: 'Masa integral andina horneada',
    image: 'https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=600&q=80',
    itemCount: 3,
    icon: 'Croissant',
    badge: 'Horneadas'
  }
];
