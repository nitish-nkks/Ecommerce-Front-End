// Global Product Database
// Consolidated products from all pages for search functionality

export const globalProducts = [
  // Featured Products (IDs 1-6)
  {
    id: 1,
    name: "AMOXIRUM TAB - Premium Antibiotic",
    description: "High-quality antibiotic tablets for livestock. Effective against bacterial infections in poultry, cattle, and other farm animals.",
    image: "/src/assets/scb1.png",
    price: 159.50,
    originalPrice: 200.48,
    currentPrice: "Rs159.50",
    oldPrice: "Rs200.48",
    discount: 20,
    badge: "HOT DEAL",
    brand: "VetCare",
    category: "Medicine",
    subcategory: "Antibiotics",
    tags: ["antibiotic", "livestock", "poultry", "cattle", "bacterial", "infection", "veterinary"],
    source: "featured"
  },
  {
    id: 2,
    name: "Calgophos - Calcium Supplement",
    description: "Essential calcium and phosphorus supplement for strong bones and improved milk production in dairy animals.",
    image: "/src/assets/scb2.png", 
    price: 2281.10,
    originalPrice: 2820.00,
    currentPrice: "Rs2,281.10",
    oldPrice: "Rs2,820.00",
    discount: 19,
    badge: "HOT DEAL",
    brand: "NutriVet",
    category: "Supplements",
    subcategory: "Minerals",
    tags: ["calcium", "phosphorus", "bones", "milk", "dairy", "supplement", "minerals"],
    source: "featured"
  },
  {
    id: 3,
    name: "SOKRENA W.S. - Poultry Growth Promoter",
    description: "Specialized water-soluble growth promoter for poultry. Enhances feed conversion and overall bird performance.",
    image: "/src/assets/scb3.png",
    price: 3854.92,
    originalPrice: 4701.12,
    currentPrice: "Rs3,854.92",
    oldPrice: "Rs4,701.12", 
    discount: 18,
    badge: "HOT DEAL",
    brand: "PoultryPro",
    category: "Poultry",
    subcategory: "Growth Promoters",
    tags: ["poultry", "growth", "water-soluble", "feed", "conversion", "performance"],
    source: "featured"
  },
  {
    id: 4,
    name: "Vimeral Forte - Multi-Vitamin",
    description: "Complete vitamin and mineral supplement for all types of livestock. Boosts immunity and overall health.",
    image: "/src/assets/scb4.png",
    price: 688.00,
    originalPrice: 800.00,
    currentPrice: "Rs688.00",
    oldPrice: "Rs800.00",
    discount: 14, 
    badge: "HOT DEAL",
    brand: "VitalVet",
    category: "Supplements",
    subcategory: "Vitamins",
    tags: ["vitamin", "mineral", "livestock", "immunity", "health", "complete"],
    source: "featured"
  },
  {
    id: 5,
    name: "Fish Feed Pro - High Protein",
    description: "High-protein fish feed for optimal growth in aquaculture. Specially formulated for tropical fish farming.",
    image: "/src/assets/scb1.png",
    price: 1250.00,
    originalPrice: 1500.00,
    currentPrice: "Rs1,250.00",
    oldPrice: "Rs1,500.00",
    discount: 17,
    badge: "NEW",
    brand: "AquaFeed",
    category: "Fish",
    subcategory: "Feed",
    tags: ["fish", "protein", "aquaculture", "growth", "tropical", "farming"],
    source: "featured"
  },
  {
    id: 6,
    name: "Cattle Nutrition Plus Premium", 
    description: "Complete nutrition supplement for cattle. Improves milk production and overall cattle health significantly.",
    image: "/src/assets/scb2.png",
    price: 2800.00,
    originalPrice: 3200.00,
    currentPrice: "Rs2,800.00",
    oldPrice: "Rs3,200.00",
    discount: 12,
    badge: "POPULAR",
    brand: "CattleCare",
    category: "Cattle",
    subcategory: "Feed Supplements",
    tags: ["cattle", "nutrition", "milk", "production", "health", "supplement"],
    source: "featured"
  },

  // Best Sellers (IDs 7-11)
  {
    id: 7,
    name: "T C Powder - Broad Spectrum Antibiotic",
    description: "Tetracycline-based broad spectrum antibiotic powder. Effective treatment for various bacterial infections.",
    image: "/src/assets/scb2.png",
    price: 77.10,
    originalPrice: 99.23,
    currentPrice: "Rs77.10",
    oldPrice: "Rs99.23",
    discount: 22,
    badge: "Limited Deal",
    brand: "VetCare",
    category: "Medicine",
    subcategory: "Antibiotics",
    tags: ["tetracycline", "antibiotic", "powder", "bacterial", "infection", "broad spectrum"],
    source: "bestsellers"
  },
  {
    id: 8,
    name: "E Care Se - Vitamin E Feed Supplement",
    description: "Vitamin E and Selenium supplement for reproductive health and immunity boost in all livestock animals.",
    image: "/src/assets/scb1.png",
    price: 288.82,
    originalPrice: 563.00,
    currentPrice: "Rs288.82",
    oldPrice: "Rs563.00",
    discount: 49,
    badge: "Limited Deal",
    brand: "VitalVet",
    category: "Supplements",
    subcategory: "Vitamins",
    tags: ["vitamin e", "selenium", "reproductive", "immunity", "livestock"],
    source: "bestsellers"
  },
  {
    id: 9,
    name: "Electrol C - Electrolyte for Poultry",
    description: "Essential electrolyte supplement for poultry health. Maintains proper fluid balance and prevents dehydration.",
    image: "/src/assets/p1.png",
    price: 144.30,
    originalPrice: 290.00,
    currentPrice: "Rs144.30",
    oldPrice: "Rs290.00",
    discount: 50,
    badge: "Limited Deal",
    brand: "PoultryPro",
    category: "Poultry",
    subcategory: "Growth Promoters",
    tags: ["electrolyte", "poultry", "fluid", "balance", "dehydration", "health"],
    source: "bestsellers"
  },
  {
    id: 10,
    name: "Vendox N - Mixed Infection Antibiotic",
    description: "Ideal antibiotic for treating mixed bacterial infections. Broad-spectrum coverage for various pathogens.",
    image: "/src/assets/p2.png",
    price: 126.81,
    originalPrice: 195.00,
    currentPrice: "Rs126.81",
    oldPrice: "Rs195.00",
    discount: 35,
    badge: "Limited Deal",
    brand: "VetCare",
    category: "Medicine",
    subcategory: "Antibiotics",
    tags: ["antibiotic", "mixed infection", "bacterial", "broad spectrum", "pathogen"],
    source: "bestsellers"
  },
  {
    id: 11,
    name: "Calgophos - Best Seller",
    description: "Top-rated calcium and phosphorus supplement. Most trusted choice for dairy farmers worldwide.",
    image: "/src/assets/scb2.png", 
    price: 2281.10,
    originalPrice: 2820.00,
    currentPrice: "Rs2,281.10",
    oldPrice: "Rs2,820.00",
    discount: 19,
    badge: "Best Seller",
    brand: "NutriVet",
    category: "Supplements",
    subcategory: "Minerals",
    tags: ["calcium", "phosphorus", "dairy", "farmers", "trusted", "supplement"],
    source: "bestsellers"
  },

  // Products Page (IDs 1-8 with additional details)
  {
    id: 101,
    name: "AMOXIRUM TAB - Premium Antibiotic",
    description: "High-quality antibiotic tablets for livestock. Effective against bacterial infections in poultry, cattle, and other farm animals.",
    image: "/src/assets/scb1.png",
    price: 159.50,
    originalPrice: 200.48,
    discount: 20,
    category: "Medicine",
    subcategory: "Antibiotics",
    brand: "VetCare",
    rating: 4.8,
    reviews: 234,
    stock: 45,
    inStock: true,
    tags: ["amoxicillin", "antibiotic", "veterinary", "livestock", "bacterial infection"],
    source: "products",
    features: ["Fast acting", "Broad spectrum", "Safe for all livestock", "Veterinary approved"],
    specifications: {
      "Active Ingredient": "Amoxicillin",
      "Dosage": "500mg",
      "Pack Size": "100 tablets",
      "Shelf Life": "3 years"
    }
  },

  // Flash Sale Products (IDs 18-25)
  {
    id: 18,
    name: "AMOXIRUM TAB - Flash Sale Special",
    description: "Flash sale special price on premium antibiotic tablets. Limited time offer for livestock health.",
    image: "/src/assets/scb1.png",
    price: 159.50,
    originalPrice: 200.48,
    salePrice: 159.50,
    discount: 20,
    stock: 45,
    sold: 189,
    badge: "FLASH SALE",
    brand: "VetCare",
    category: "Medicine",
    subcategory: "Antibiotics",
    tags: ["flash sale", "antibiotic", "limited time", "special price", "livestock"],
    source: "flashsale"
  },
  {
    id: 19,
    name: "Calgophos - Flash Sale",
    description: "Special flash sale pricing on premium calcium supplement. Don't miss this limited-time offer.",
    image: "/src/assets/scb2.png",
    price: 2281.10,
    originalPrice: 2820.00,
    salePrice: 2281.10,
    discount: 19,
    stock: 23,
    sold: 267,
    badge: "LIMITED DEAL",
    brand: "NutriVet",
    category: "Supplements",
    subcategory: "Minerals",
    tags: ["flash sale", "calcium", "limited offer", "special pricing", "minerals"],
    source: "flashsale"
  },

  // Additional unique products for comprehensive search
  {
    id: 30,
    name: "ProBio Plus - Probiotic Supplement",
    description: "Advanced probiotic supplement for improved gut health and digestion in all livestock animals.",
    image: "/src/assets/scb3.png",
    price: 450.00,
    originalPrice: 550.00,
    discount: 18,
    brand: "BioVet",
    category: "Supplements",
    subcategory: "Probiotics",
    tags: ["probiotic", "gut health", "digestion", "livestock", "beneficial bacteria"],
    source: "catalog"
  },
  {
    id: 31,
    name: "Aqua Clean - Water Treatment",
    description: "Water treatment solution for aquaculture. Maintains water quality and prevents disease in fish farming.",
    image: "/src/assets/p1.png",
    price: 680.00,
    originalPrice: 800.00,
    discount: 15,
    brand: "AquaCare",
    category: "Fish",
    subcategory: "Water Treatment",
    tags: ["water treatment", "aquaculture", "disease prevention", "water quality", "fish farming"],
    source: "catalog"
  },
  {
    id: 32,
    name: "Poultry Starter Feed",
    description: "Complete starter feed for young poultry. High protein content for rapid growth and development.",
    image: "/src/assets/scb4.png",
    price: 1200.00,
    originalPrice: 1400.00,
    discount: 14,
    brand: "FeedMaster",
    category: "Poultry",
    subcategory: "Starter Feed",
    tags: ["starter feed", "young poultry", "high protein", "growth", "development"],
    source: "catalog"
  }
];

// Search utility functions
export const searchProducts = (query, filters = {}) => {
  if (!query && !filters.category) return globalProducts;
  
  const searchTerm = query.toLowerCase().trim();
  
  return globalProducts.filter(product => {
    // Category filter
    if (filters.category && product.category.toLowerCase() !== filters.category.toLowerCase()) {
      return false;
    }
    
    // Brand filter
    if (filters.brand && product.brand.toLowerCase() !== filters.brand.toLowerCase()) {
      return false;
    }
    
    // Price range filter
    if (filters.minPrice && product.price < filters.minPrice) {
      return false;
    }
    if (filters.maxPrice && product.price > filters.maxPrice) {
      return false;
    }
    
    // Search query filter
    if (searchTerm) {
      const searchableText = [
        product.name,
        product.description || '',
        product.brand,
        product.category,
        product.subcategory,
        ...(product.tags || [])
      ].join(' ').toLowerCase();
      
      return searchableText.includes(searchTerm);
    }
    
    return true;
  });
};

// Get product suggestions for autocomplete
export const getProductSuggestions = (query, limit = 5) => {
  if (!query || query.length < 2) return [];
  
  const searchTerm = query.toLowerCase();
  const suggestions = [];
  
  globalProducts.forEach(product => {
    if (suggestions.length >= limit) return;
    
    // Check if product name starts with search term (highest priority)
    if (product.name.toLowerCase().startsWith(searchTerm)) {
      suggestions.push({
        type: 'product',
        text: product.name,
        product: product
      });
      return;
    }
    
    // Check if brand starts with search term
    if (product.brand.toLowerCase().startsWith(searchTerm)) {
      suggestions.push({
        type: 'brand',
        text: `${product.brand} - ${product.name}`,
        product: product
      });
      return;
    }
    
    // Check if category matches
    if (product.category.toLowerCase().includes(searchTerm)) {
      suggestions.push({
        type: 'category',
        text: `${product.category} - ${product.name}`,
        product: product
      });
    }
  });
  
  return suggestions;
};

// Get all unique categories for filters
export const getAllCategories = () => {
  const categories = [...new Set(globalProducts.map(p => p.category))];
  return categories.sort();
};

// Get all unique brands for filters
export const getAllBrands = () => {
  const brands = [...new Set(globalProducts.map(p => p.brand))];
  return brands.sort();
};

// Get popular search terms
export const getPopularSearches = () => [
  "Antibiotic",
  "Calcium",
  "Poultry Feed",
  "Fish Feed",
  "Vitamins",
  "Growth Promoter",
  "Cattle Feed",
  "Probiotics"
];