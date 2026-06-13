/* ============================================================
   LOYAL CLOTHING — Product Data
   All product information as a structured JS array.
   ============================================================ */

const PRODUCTS = [
  {
    id: 1,
    name: "Essential Oversized Tee",
    category: "t-shirts",
    price: 1499,
    oldPrice: null,
    badge: "new",
    colors: [
      { name: "Charcoal", hex: "#2C2C2C" },
      { name: "Off White", hex: "#F0ECE2" },
      { name: "Sage", hex: "#8F9E8B" }
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    description: "Our signature oversized tee crafted from 240 GSM heavyweight cotton. Drop shoulders, ribbed collar, and a relaxed boxy fit that drapes perfectly.",
    fabric: "100% Combed Cotton — 240 GSM",
    fit: "Oversized — Model is 6'0\" wearing size M",
    care: "Machine wash cold. Tumble dry low. Do not bleach.",
    images: ["assets/images/product-tee.png"]
  },
  {
    id: 2,
    name: "Heavyweight Hoodie",
    category: "hoodies",
    price: 2999,
    oldPrice: 3499,
    badge: "sale",
    colors: [
      { name: "Black", hex: "#1A1A1A" },
      { name: "Cream", hex: "#F5F0E8" }
    ],
    sizes: ["S", "M", "L", "XL"],
    description: "Premium heavyweight hoodie built for all seasons. Double-layered hood, kangaroo pocket, and embroidered Loyal branding at the chest.",
    fabric: "100% French Terry Cotton — 400 GSM",
    fit: "Regular — Model is 5'11\" wearing size L",
    care: "Machine wash cold inside out. Hang dry recommended.",
    images: ["assets/images/product-hoodie.png"]
  },
  {
    id: 3,
    name: "Relaxed Cargo Pants",
    category: "pants",
    price: 2499,
    oldPrice: null,
    badge: null,
    colors: [
      { name: "Olive", hex: "#4A5240" },
      { name: "Black", hex: "#1A1A1A" }
    ],
    sizes: ["S", "M", "L", "XL"],
    description: "Utility-inspired cargo pants with a relaxed tapered silhouette. Six functional pockets, adjustable drawcord waist, and elastic cuffs.",
    fabric: "98% Cotton, 2% Elastane — Ripstop Weave",
    fit: "Relaxed Taper — Model is 6'1\" wearing size M",
    care: "Machine wash cold. Tumble dry low.",
    images: ["assets/images/product-cargo.png"]
  },
  {
    id: 4,
    name: "Minimal Logo Tee",
    category: "t-shirts",
    price: 1299,
    oldPrice: null,
    badge: null,
    colors: [
      { name: "White", hex: "#FFFFFF" },
      { name: "Black", hex: "#1A1A1A" }
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    description: "Clean, minimal tee with a subtle embroidered Loyal logo at the left chest. Made from soft ringspun cotton for everyday comfort.",
    fabric: "100% Ringspun Cotton — 180 GSM",
    fit: "Regular — Model is 5'10\" wearing size M",
    care: "Machine wash cold. Tumble dry low.",
    images: ["assets/images/product-logo-tee.png"]
  },
  {
    id: 5,
    name: "Streetwear Joggers",
    category: "pants",
    price: 2199,
    oldPrice: null,
    badge: "new",
    colors: [
      { name: "Charcoal", hex: "#2C2C2C" },
      { name: "Grey Marl", hex: "#A8A8A8" }
    ],
    sizes: ["S", "M", "L", "XL"],
    description: "Premium joggers with a structured fit. Elastic waistband with drawcord, zippered side pockets, and tapered ankle cuffs.",
    fabric: "80% Cotton, 20% Polyester — 320 GSM French Terry",
    fit: "Slim Taper — Model is 5'11\" wearing size M",
    care: "Machine wash cold inside out. Hang dry.",
    images: ["assets/images/product-joggers.png"]
  },
  {
    id: 6,
    name: "Washed Vintage Hoodie",
    category: "hoodies",
    price: 3299,
    oldPrice: null,
    badge: null,
    colors: [
      { name: "Washed Olive", hex: "#6B7B5E" },
      { name: "Washed Black", hex: "#3A3A3A" }
    ],
    sizes: ["M", "L", "XL"],
    description: "Garment-dyed hoodie with a sun-faded vintage finish. Each piece is uniquely washed for a one-of-a-kind look that gets better with age.",
    fabric: "100% Cotton — 380 GSM Garment Dyed",
    fit: "Oversized — Model is 6'0\" wearing size L",
    care: "Machine wash cold separately. Colors may vary.",
    images: ["assets/images/product-vintage-hoodie.png"]
  },
  {
    id: 7,
    name: "Drop Shoulder Polo",
    category: "t-shirts",
    price: 1799,
    oldPrice: null,
    badge: null,
    colors: [
      { name: "Navy", hex: "#1B2838" },
      { name: "Off White", hex: "#F0ECE2" }
    ],
    sizes: ["S", "M", "L", "XL"],
    description: "Elevated polo with a contemporary drop-shoulder cut. Ribbed collar and cuffs, three-button placket, and a subtly textured piqué fabric.",
    fabric: "100% Cotton Piqué — 220 GSM",
    fit: "Relaxed — Model is 6'0\" wearing size M",
    care: "Machine wash cold. Do not bleach.",
    images: ["assets/images/product-polo.png"]
  },
  {
    id: 8,
    name: "Wide Leg Trousers",
    category: "pants",
    price: 2699,
    oldPrice: 2999,
    badge: "sale",
    colors: [
      { name: "Beige", hex: "#C8B89A" },
      { name: "Black", hex: "#1A1A1A" }
    ],
    sizes: ["S", "M", "L", "XL"],
    description: "Clean, structured wide-leg trousers. Flat front with a hook-and-bar closure, side pockets, and a pressed center crease for a polished look.",
    fabric: "65% Polyester, 35% Viscose — Structured Weave",
    fit: "Wide Leg — Model is 5'11\" wearing size M",
    care: "Dry clean recommended. Iron on low.",
    images: ["assets/images/product-trousers.png"]
  }
];

/**
 * Get all unique categories from products
 * @returns {string[]}
 */
function getCategories() {
  return [...new Set(PRODUCTS.map(p => p.category))];
}

/**
 * Filter products by category
 * @param {string} category - Category to filter by, or 'all' for all products
 * @returns {object[]}
 */
function filterProducts(category) {
  if (category === 'all') return PRODUCTS;
  return PRODUCTS.filter(p => p.category === category);
}

/**
 * Get a single product by ID
 * @param {number} id
 * @returns {object|undefined}
 */
function getProductById(id) {
  return PRODUCTS.find(p => p.id === id);
}

/**
 * Format price in INR
 * @param {number} price
 * @returns {string}
 */
function formatPrice(price) {
  return '₹' + price.toLocaleString('en-IN');
}
