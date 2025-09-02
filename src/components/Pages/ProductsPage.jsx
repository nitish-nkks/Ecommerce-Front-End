// src/components/Pages/ProductsPage.jsx
import React, { useState, useMemo, useEffect } from 'react';
import { Heart, Eye, ShoppingCart, Filter, X, Star, ChevronDown, Search } from 'lucide-react';
import ProductDetailsModal from './ProductDetailsModal';
import { getParentCategories, getProducts } from '../../api/api';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";

const ProductsPage = ({ wishlistItems = [], onWishlistToggle, selectedCategory = null, selectedSubcategory = null, selectedSubsubcategory = null, onAddToCart, onUpdateQuantity, cartItems = [], onNavigate }) => {
  // Log props to debug
  console.log('ProductsPage props:', { selectedCategory, selectedSubcategory, selectedSubsubcategory });
  const [selectedFilters, setSelectedFilters] = useState({
    categories: [],
    priceRange: [0, 10000],
    brands: [],
    inStock: false
  });

  // Reset filters when category props change
  //useEffect(() => {
  //  console.log('ProductsPage useEffect triggered:', { selectedCategory, selectedSubcategory });
  //  setSelectedFilters({
  //    categories: [],
  //    priceRange: [0, 10000],
  //    brands: [],
  //    inStock: false
  //  });
  //  setSearchTerm('');
  //  setSortBy('name');
  //}, [selectedCategory, selectedSubcategory]);

    useEffect(() => {
        console.log('ProductsPage useEffect triggered:', { selectedCategory, selectedSubcategory, selectedSubsubcategory });

        setSelectedFilters({
            categories: [
                ...(selectedCategory ? [selectedCategory] : []),
                ...(selectedSubcategory ? [selectedSubcategory] : []),
                ...(selectedSubsubcategory ? [selectedSubsubcategory] : [])
            ],
            priceRange: [0, 10000],
            brands: [],
            inStock: false
        });

        setSearchTerm('');
        setSortBy('name');
    }, [selectedCategory, selectedSubcategory, selectedSubsubcategory]);

  const [sortBy, setSortBy] = useState('name');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  // Comprehensive product data
  //const allProducts = [
  //  {
  //    id: 1,
  //    name: "AMOXIRUM TAB - Premium Antibiotic",
  //    description: "High-quality antibiotic tablets for livestock. Effective against bacterial infections in poultry, cattle, and other farm animals.",
  //    image: "/src/assets/scb1.png",
  //    price: 159.50,
  //    originalPrice: 200.48,
  //    discount: 20,
  //    category: "Medicine",
  //    subcategory: "Antibiotics",
  //    brand: "VetCare",
  //    rating: 4.8,
  //    reviews: 234,
  //    stock: 45,
  //    inStock: true,
  //    features: ["Fast acting", "Broad spectrum", "Safe for all livestock", "Veterinary approved"],
  //    specifications: {
  //      "Active Ingredient": "Amoxicillin",
  //      "Dosage": "500mg",
  //      "Pack Size": "100 tablets",
  //      "Shelf Life": "3 years"
  //    }
  //  },
  //  {
  //    id: 2,
  //    name: "Calgophos - Calcium Supplement",
  //    description: "Essential calcium and phosphorus supplement for strong bones and improved milk production in dairy animals.",
  //    image: "/src/assets/scb2.png",
  //    price: 2281.10,
  //    originalPrice: 2820.00,
  //    discount: 19,
  //    category: "Supplements",
  //    subcategory: "Minerals",
  //    brand: "NutriVet",
  //    rating: 4.9,
  //    reviews: 156,
  //    stock: 23,
  //    inStock: true,
  //    features: ["High calcium content", "Improved milk yield", "Strong bone development", "Easy absorption"],
  //    specifications: {
  //      "Calcium": "25%",
  //      "Phosphorus": "12%",
  //      "Weight": "1kg",
  //      "Usage": "5g per animal daily"
  //    }
  //  },
  //  {
  //    id: 3,
  //    name: "SOKRENA W.S. - Poultry Growth",
  //    description: "Specialized water-soluble growth promoter for poultry. Enhances feed conversion and overall bird performance.",
  //    image: "/src/assets/scb3.png",
  //    price: 3854.92,
  //    originalPrice: 4701.12,
  //    discount: 18,
  //    category: "Poultry",
  //    subcategory: "Growth Promoters",
  //    brand: "PoultryPro",
  //    rating: 4.7,
  //    reviews: 89,
  //    stock: 34,
  //    inStock: true,
  //    features: ["Water soluble", "Growth enhancement", "Better FCR", "Natural ingredients"],
  //    specifications: {
  //      "Pack Size": "500g",
  //      "Dosage": "1g per liter water",
  //      "Duration": "7-14 days",
  //      "Withdrawal": "3 days"
  //    }
  //  },
  //  {
  //    id: 4,
  //    name: "Vimeral Forte - Multi-Vitamin",
  //    description: "Complete vitamin and mineral supplement for all types of livestock. Boosts immunity and overall health.",
  //    image: "/src/assets/scb4.png",
  //    price: 688.00,
  //    originalPrice: 800.00,
  //    discount: 14,
  //    category: "Supplements",
  //    subcategory: "Vitamins",
  //    brand: "VitalVet",
  //    rating: 4.6,
  //    reviews: 342,
  //    stock: 67,
  //    inStock: true,
  //    features: ["Complete vitamin profile", "Immunity booster", "All livestock", "Premium quality"],
  //    specifications: {
  //      "Vitamin A": "50000 IU",
  //      "Vitamin E": "500 IU",
  //      "Pack Size": "500ml",
  //      "Shelf Life": "2 years"
  //    }
  //  },
  //  {
  //    id: 5,
  //    name: "Premium Fish Feed Pro",
  //    description: "High-protein fish feed for optimal growth in aquaculture. Specially formulated for tropical fish farming.",
  //    image: "/src/assets/p1.png",
  //    price: 1250.00,
  //    originalPrice: 1500.00,
  //    discount: 17,
  //    category: "Fish",
  //    subcategory: "Feed",
  //    brand: "AquaFeed",
  //    rating: 4.8,
  //    reviews: 78,
  //    stock: 56,
  //    inStock: true,
  //    features: ["High protein", "Digestible", "Growth enhancement", "Color enhancement"],
  //    specifications: {
  //      "Protein": "32%",
  //      "Fat": "6%",
  //      "Fiber": "4%",
  //      "Pellet Size": "2mm"
  //    }
  //  },
  //  {
  //    id: 6,
  //    name: "Cattle Nutrition Plus Premium",
  //    description: "Complete nutrition supplement for cattle. Improves milk production and overall cattle health significantly.",
  //    image: "/src/assets/p2.png",
  //    price: 2800.00,
  //    originalPrice: 3200.00,
  //    discount: 12,
  //    category: "Cattle",
  //    subcategory: "Feed Supplements",
  //    brand: "CattleCare",
  //    rating: 4.9,
  //    reviews: 167,
  //    stock: 29,
  //    inStock: true,
  //    features: ["Milk production boost", "Complete nutrition", "Easy mixing", "Cost effective"],
  //    specifications: {
  //      "Crude Protein": "18%",
  //      "Fat": "3.5%",
  //      "Fiber": "15%",
  //      "Pack Size": "25kg"
  //    }
  //  },
  //  {
  //    id: 7,
  //    name: "TC Powder - Broad Spectrum",
  //    description: "Tetracycline-based broad spectrum antibiotic powder. Effective treatment for various bacterial infections.",
  //    image: "/src/assets/scb1.png",
  //    price: 77.10,
  //    originalPrice: 99.23,
  //    discount: 22,
  //    category: "Medicine",
  //    subcategory: "Antibiotics",
  //    brand: "VetCare",
  //    rating: 4.7,
  //    reviews: 203,
  //    stock: 78,
  //    inStock: true,
  //    features: ["Broad spectrum", "Fast relief", "Water soluble", "Veterinary grade"],
  //    specifications: {
  //      "Active Ingredient": "Tetracycline HCl",
  //      "Concentration": "10%",
  //      "Pack Size": "100g",
  //      "Withdrawal": "7 days"
  //    }
  //  },
  //  {
  //    id: 8,
  //    name: "E Care Se - Vitamin E Supplement",
  //    description: "Vitamin E and Selenium supplement for reproductive health and immunity boost in all livestock animals.",
  //    image: "/src/assets/scb2.png",
  //    price: 288.82,
  //    originalPrice: 563.00,
  //    discount: 49,
  //    category: "Supplements",
  //    subcategory: "Vitamins",
  //    brand: "VitalVet",
  //    rating: 4.8,
  //    reviews: 145,
  //    stock: 34,
  //    inStock: true,
  //    features: ["Reproductive health", "Immunity boost", "Antioxidant", "All animals"],
  //    specifications: {
  //      "Vitamin E": "100 IU/ml",
  //      "Selenium": "0.5mg/ml",
  //      "Volume": "100ml",
  //      "Route": "Injectable"
  //    }
  //  }
  //];

    const [allProducts, setAllProducts] = useState([]);

    useEffect(() => {
        getProducts()
            .then((res) => {
                const products = res.data?.data || [];

                const mappedProducts = products
                    //.filter((p) => p.isBestSeller)
                    .map((p) => ({
                        id: p.id,
                        name: p.name,
                        description: p.description,
                        image: p.image || "/src/assets/placeholder.png",
                        price: p.price,
                        originalPrice: p.price,
                        oldPrice: `Rs${p.price.toLocaleString()}`,
                        currentPrice:
                            p.discountPercentage > 0
                                ? `${(p.price * (1 - p.discountPercentage / 100)).toFixed(2)}`
                                : null,
                        discount: p.discountPercentage,
                        category: p.categoryName,
                        categortId: p.categoryId,
                        subcategory: p.categoryName,
                        subsubcategory: p.categoryName,
                        stock: p.stockQuantity,
                        inStock: p.stockQuantity > 0 ? true : false,
                        minOrderQuantity: p.minOrderQuantity,
                    }));

                setAllProducts(mappedProducts);
            })
            .catch((err) => {
                console.error("Error fetching products:", err);
            });
    }, []);

  //const categories = ['Medicine', 'Supplements', 'Poultry', 'Fish', 'Cattle'];
  //const brands = ['VetCare', 'NutriVet', 'PoultryPro', 'VitalVet', 'AquaFeed', 'CattleCare'];

    const [categories, setCategories] = useState([]);

    const buildCategoryTree = (categories) => {
        if (!Array.isArray(categories)) return [];

        // Step 1: create lookup map
        const map = {};
        categories.forEach((cat) => {
            map[cat.id] = { ...cat, subCategories: [] };
        });

        // Step 2: build tree
        const tree = [];
        categories.forEach((cat) => {
            if (cat.parentCategoryId) {
                // attach child to parent
                if (map[cat.parentCategoryId]) {
                    map[cat.parentCategoryId].subCategories.push(map[cat.id]);
                }
            } else {
                // top-level
                tree.push(map[cat.id]);
            }
        });

        return tree;
    };

    useEffect(() => {
        getParentCategories()
            .then((res) => {
                console.log("API Response:", res.data);

                // Handle API response safely
                const rawCategories = Array.isArray(res.data)
                    ? res.data
                    : res.data?.data || [];

                const categoryTree = buildCategoryTree(rawCategories);
                setCategories(categoryTree);
            })
            .catch((err) => {
                console.error("Error fetching categories:", err);
            });
    }, []);

  const isInWishlist = (productId) => {
    return wishlistItems.some(item => item.id === productId);
  };

  const handleWishlistClick = (product) => {
    if (onWishlistToggle) {
      onWishlistToggle(product);
    }
  };

  const handleViewDetails = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

   
  const handleAddToCart = (product) => {  
    const minQty = product.minOrderQuantity || 1;        
    if (onAddToCart) {
        onAddToCart(product, minQty);
    }
  };

    //const handleQuantityChange = (product, change) => {
    //    const minQty = product.minOrderQuantity || 1;
    //    const stockQty = product.stock;

    //    const currentQty = getItemInCart(product.id)?.quantity || minQty;

    //    const newQty = currentQty + change;

    //    console.log('Current quantity:', currentQty, 'newQty:', newQty, 'stockQty: ', stockQty);

    //    if (newQty < minQty) return;
    //    if (stockQty < newQty) return;

    //    if (onAddToCart) {
    //        onAddToCart(product, change);
    //    }
    //}
    const handleQuantityChange = (product, change) => {
        const minQty = product.minOrderQuantity || 1;
        const stockQty = product.stock;

        const currentQty = getItemInCart(product.id)?.quantity || minQty;

        const newQty = currentQty + change;

        console.log('Current quantity:', currentQty, 'newQty:', newQty, 'stockQty: ', stockQty);

        if (newQty < minQty) return;
        if (stockQty < newQty) return;
        console.log("Updating cart item quantity:", product.id, newQty);

        onUpdateQuantity(product.id, newQty);
    };
  //const handleBuyNow = (product) => {
  //  // Add to cart first if not already added
  //  if (!getItemInCart(product.id)) {
  //    handleAddToCart(product);
  //  }

  //    console.log('navigate: ',onNavigate);
  //    // Navigate to checkout
  //  if (onNavigate) {
  //    onNavigate('checkout');
  //  }
  //};
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);

    const handleBuyNow = (product) => {
        // Add to cart first if not already added
        const isLoggedIn = !!localStorage.getItem("token");
        console.log('LoggedIn', isLoggedIn);
        if (!isLoggedIn) {
            setOpen(true); // ⛔ show login modal
            console.log('LoggedIn', isLoggedIn);
            if (!getItemInCart(product.id)) {
                console.log("Product not in cart, adding to cart first:", product);
                handleAddToCart(product);
            }
            return;
        }

        console.log(onNavigate);
        if (onNavigate) {
            console.log('onNavigate', onNavigate);
            onNavigate('checkout');
        }
    };
  const getItemInCart = (productId) => {
    return cartItems.find(item => item.id === productId);
  };

  // Filter and sort products

    const filteredAndSortedProducts = useMemo(() => {
        let filtered = allProducts;

        // ✅ Apply navigation-based category filter (single selection) 
        // only if no multiple filters are selected
        if (selectedFilters.categories.length === 0) {
            if (selectedCategory) {
                filtered = filtered.filter(product =>
                    product.category.toLowerCase() === selectedCategory.toLowerCase()
                );
            }

            if (selectedSubcategory) {
                filtered = filtered.filter(product =>
                    product.subcategory.toLowerCase() === selectedSubcategory.toLowerCase()
                );
            }

            if (selectedSubsubcategory) {
                filtered = filtered.filter(product =>
                    product.subsubcategory.toLowerCase() === selectedSubsubcategory.toLowerCase()
                );
            }
        }

        // ✅ Apply search filter
        if (searchTerm) {
            filtered = filtered.filter(product =>
                product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.brand.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // ✅ Apply multi-select category/subcategory filter
        if (selectedFilters.categories.length > 0) {
            filtered = filtered.filter(product =>
                selectedFilters.categories.includes(product.category) ||
                selectedFilters.categories.includes(product.subcategory) ||
                selectedFilters.categories.includes(product.subsubcategory)
            );
        }

        // ✅ Apply brand filters
        if (selectedFilters.brands.length > 0) {
            filtered = filtered.filter(product =>
                selectedFilters.brands.includes(product.brand)
            );
        }

        // ✅ Apply price range filter
        filtered = filtered.filter(product =>
            product.price >= selectedFilters.priceRange[0] &&
            product.price <= selectedFilters.priceRange[1]
        );

        // ✅ Apply stock filter
        if (selectedFilters.inStock) {
            filtered = filtered.filter(product => product.inStock);
        }

        // ✅ Sorting
        filtered.sort((a, b) => {
            switch (sortBy) {
                case 'price_low':
                    return a.price - b.price;
                case 'price_high':
                    return b.price - a.price;
                case 'rating':
                    return b.rating - a.rating;
                case 'discount':
                    return b.discount - a.discount;
                default:
                    return a.name.localeCompare(b.name);
            }
        });

        return filtered;
    }, [allProducts, selectedFilters, sortBy, searchTerm, selectedCategory, selectedSubcategory, selectedSubsubcategory]);

  //const handleFilterChange = (filterType, value) => {
  //  setSelectedFilters(prev => {
  //    const newFilters = { ...prev };

  //    if (filterType === 'categories' || filterType === 'brands') {
  //      const currentArray = newFilters[filterType];
  //      if (currentArray.includes(value)) {
  //        newFilters[filterType] = currentArray.filter(item => item !== value);
  //      } else {
  //        newFilters[filterType] = [...currentArray, value];
  //      }
  //    } else if (filterType === 'priceRange') {
  //      newFilters.priceRange = value;
  //    } else if (filterType === 'inStock') {
  //      newFilters.inStock = !newFilters.inStock;
  //    }

  //    return newFilters;
  //  });
  //};

    const handleFilterChange = (filterType, value, category = null) => {
        setSelectedFilters(prev => {
            const newFilters = { ...prev };
            console.log('handleFilterChange called with:', { filterType, value, category });
            if (filterType === 'categories') {
                let currentArray = newFilters.categories;

                // If user clicked a main category (with subCategories)
                if (category?.subCategories?.length > 0) {
                    const subNames = getAllSubCategoryNames(category);

                    if (currentArray.includes(value)) {
                        // If already selected → deselect parent + all subs
                        newFilters.categories = currentArray.filter(
                            item => item !== value && !subNames.includes(item)
                        );
                    } else {
                        // Select parent + all subs
                        newFilters.categories = [...currentArray, value, ...subNames];
                    }
                } else {
                    // Normal toggle (for leaf/sub categories)
                    if (currentArray.includes(value)) {
                        newFilters.categories = currentArray.filter(item => item !== value);
                    } else {
                        newFilters.categories = [...currentArray, value];
                    }
                }
            }
            else if (filterType === 'brands') {
                const currentArray = newFilters.brands;
                if (currentArray.includes(value)) {
                    newFilters.brands = currentArray.filter(item => item !== value);
                } else {
                    newFilters.brands = [...currentArray, value];
                }
            }
            else if (filterType === 'priceRange') {
                newFilters.priceRange = value;
            }
            else if (filterType === 'inStock') {
                newFilters.inStock = !newFilters.inStock;
            }
            console.log('Updated filters:', newFilters);
            return newFilters;
        });
    };

    // Helper: recursively collect all subcategory names
    const getAllSubCategoryNames = (category) => {
        let names = [];
        if (category.subCategories) {
            for (let sub of category.subCategories) {
                names.push(sub.name);
                names = [...names, ...getAllSubCategoryNames(sub)];
            }
        }
        return names;
    };


    const renderCategoryOption = (category, level = 0) => {
        return (
            <div key={category.id} style={{ marginLeft: level * 16 }}>
                <div
                    className="filter-option cursor-pointer flex items-center gap-2"
                    onClick={() => handleFilterChange('categories', category.name, category)}
                >
                    <div className={`checkbox ${selectedFilters.categories.includes(category.name) ? 'checked' : ''}`} />
                    <span className="filter-label">{category.name}</span>
                </div>

                {category.subCategories?.length > 0 &&
                    category.subCategories.map((subcat) =>
                        renderCategoryOption(subcat, level + 1)
                    )}
            </div>
        );
    };


  return (
    <div className="products-page">
      <style jsx>{`
        .products-page {
          min-height: 100vh;
          background: #f9fafb;
        }

        .products-header {
          background: linear-gradient(135deg, #12b431 0%, #0ea025 100%);
          color: white;
          padding: 30px 0 40px 0;
        }

        .header-content {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 20px;
          text-align: center;
        }

        .page-title {
          font-size: 2.5rem;
          font-weight: 800;
          margin-bottom: 12px;
        }

        .page-subtitle {
          font-size: 1.1rem;
          opacity: 0.9;
          max-width: 600px;
          margin: 0 auto;
        }

        .products-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 40px 20px;
          display: grid;
          grid-template-columns: 300px 1fr;
          gap: 40px;
        }

        .sidebar {
          background: white;
          padding: 30px;
          border-radius: 16px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
          height: fit-content;
          position: sticky;
          top: 20px;
        }

        .filter-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 25px;
        }

        .filter-title {
          font-size: 1.3rem;
          font-weight: 700;
          color: #1f2937;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .filter-section {
          margin-bottom: 25px;
          border-bottom: 1px solid #e5e7eb;
          padding-bottom: 20px;
        }

        .filter-section:last-child {
          border-bottom: none;
          margin-bottom: 0;
        }

        .filter-section-title {
          font-size: 1rem;
          font-weight: 600;
          color: #374151;
          margin-bottom: 12px;
        }

        .search-box {
          position: relative;
          margin-bottom: 25px;
        }

        .search-input {
          width: 100%;
          padding: 10px 16px 10px 40px;
          border: 2px solid #e5e7eb;
          border-radius: 10px;
          font-size: 14px;
          transition: all 0.3s ease;
        }

        .search-input:focus {
          outline: none;
          border-color: #12b431;
          box-shadow: 0 0 0 3px rgba(18, 180, 49, 0.1);
        }

        .search-icon {
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          color: #6b7280;
        }

        .filter-options {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .filter-option {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 6px 8px;
          border-radius: 6px;
          cursor: pointer;
          transition: background-color 0.2s ease;
        }

        .filter-option:hover {
          background-color: #f3f4f6;
        }

        .checkbox {
          width: 16px;
          height: 16px;
          border: 2px solid #d1d5db;
          border-radius: 3px;
          position: relative;
          transition: all 0.2s ease;
        }

        .checkbox.checked {
          background-color: #12b431;
          border-color: #12b431;
        }

        .checkbox.checked::after {
          content: '✓';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          color: white;
          font-size: 10px;
          font-weight: bold;
        }

        .filter-label {
          font-size: 14px;
          color: #374151;
        }

        .price-range {
          margin: 10px 0;
        }

        .price-display {
          background: #f9fafb;
          padding: 10px 12px;
          border-radius: 8px;
          margin-bottom: 12px;
          border: 1px solid #e5e7eb;
        }

        .price-label {
          font-size: 14px;
          font-weight: 600;
          color: #12b431;
        }

        .price-inputs {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-top: 8px;
        }

        .price-input-group {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .input-label {
          font-size: 11px;
          color: #6b7280;
          text-transform: uppercase;
          font-weight: 600;
          letter-spacing: 0.5px;
        }

        .price-input {
          width: 100%;
          padding: 8px 10px;
          border: 2px solid #e5e7eb;
          border-radius: 6px;
          font-size: 13px;
          font-weight: 500;
          transition: all 0.2s ease;
        }

        .price-input:focus {
          outline: none;
          border-color: #12b431;
          box-shadow: 0 0 0 3px rgba(18, 180, 49, 0.1);
        }

        .price-separator {
          font-size: 12px;
          color: #9ca3af;
          font-weight: 500;
          margin-top: 18px;
        }


        .main-content {
          display: flex;
          flex-direction: column;
        }

        .content-header {
          display: flex;
          justify-content: between;
          align-items: center;
          margin-bottom: 25px;
          gap: 20px;
        }

        .results-info {
          flex: 1;
          font-size: 1rem;
          color: #6b7280;
        }

        .sort-select {
          padding: 8px 12px;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          background: white;
          font-size: 14px;
          cursor: pointer;
        }

        .mobile-filter-btn {
          display: none;
          background: #12b431;
          color: white;
          border: none;
          padding: 10px 16px;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          margin-bottom: 20px;
          align-items: center;
          gap: 8px;
        }

       .products-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, auto));
          justify-content: center; /* centers items if row not full */
          gap: 24px;
        }

        .product-card {
          background: white;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
          transition: all 0.3s ease;
          border: 1px solid #e5e7eb;
          position: relative;
          display: flex;
          flex-direction: column;
        }

        .product-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 12px 32px rgba(59, 130, 246, 0.15);
        }

        .product-image {
          width: 100%;
          height: 200px;
          background: linear-gradient(135deg, #f3f4f6, #e5e7eb);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #6b7280;
          font-size: 1.1rem;
          font-weight: 600;
          position: relative;
          overflow: hidden;
        }

        .product-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .product-card:hover .product-image img {
          transform: scale(1.05);
        }

        .product-actions {
          position: absolute;
          top: 12px;
          right: 12px;
          display: flex;
          gap: 8px;
          z-index: 2;
        }

        .action-btn {
          background: rgba(255, 255, 255, 0.9);
          border: none;
          border-radius: 50%;
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .action-btn:hover {
          background: white;
          transform: scale(1.1);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        .action-btn.wishlist.filled {
          background: #dc2626;
          color: white;
        }

        .action-btn.wishlist.filled:hover {
          background: #b91c1c;
        }

        .action-btn.view {
          background: #3b82f6;
          color: white;
        }

        .action-btn.view:hover {
          background: #2563eb;
        }

        .product-badge {
          position: absolute;
          top: 12px;
          left: 12px;
          background: #dc2626;
          color: white;
          padding: 4px 8px;
          border-radius: 12px;
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .product-content {
          padding: 20px;
          background: white;
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .product-name {
          font-size: 1.1rem;
          font-weight: 600;
          color: #1f2937;
          margin-bottom: 8px;
          line-height: 1.3;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          min-height: calc(1.3em * 2);
        }

        .product-brand {
          font-size: 0.85rem;
          color: #6b7280;
          margin-bottom: 8px;
        }


        .product-price {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 12px;
        }

        .current-price {
          font-size: 1.1rem;
          font-weight: 700;
          color: #059669;
        }

        .original-price {
          font-size: 0.9rem;
          color: #9ca3af;
          text-decoration: line-through;
          margin-right: 8px;
        }

        .discount {
          background: #dc2626;
          color: white;
          padding: 2px 6px;
          border-radius: 4px;
          font-size: 0.7rem;
          font-weight: 600;
        }

        .stock-info {
          font-size: 0.85rem;
          margin-bottom: 15px;
        }

        .stock-info.in-stock {
          color: #059669; /* green */
        }

        .stock-info.out-of-stock {
          color: #dc2626; /* red */
        }
        .product-buttons {
          display: flex;
          gap: 8px;
          margin-top: 12px;
        }

        .cart-btn {
          flex: 1;
          padding: 10px 12px;
          border: none;
          border-radius: 6px;
          font-size: 0.8rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 4px;
          text-transform: uppercase;
          letter-spacing: 0.3px;
        }

        .cart-btn:disabled {
          background-color: #d1d5db; /* gray */
          cursor: not-allowed;
          opacity: 0.6;
        }

        .cart-btn.add-to-cart {
          background: linear-gradient(135deg, #12b431 0%, #0ea025 100%);
          color: white;
        }

        .cart-btn.add-to-cart:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(18, 180, 49, 0.3);
        }

        .cart-btn.buy-now {
          background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
          color: white;
        }

        .cart-btn.buy-now:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
        }

        .quantity-selector {
          display: flex;
          align-items: center;
          background: #f3f4f6;
          border-radius: 8px;
          padding: 4px;
          gap: 4px;
          flex: 1;
        }

        .quantity-btn {
          background: white;
          border: 1px solid #d1d5db;
          border-radius: 6px;
          width: 24px;
          height: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-weight: 400;
          color: #374151;
          transition: all 0.2s ease;
        }

        .quantity-btn:hover {
          background: #e5e7eb;
          border-color: #9ca3af;
        }

        .quantity-btn.decrease {
          background: #fef2f2;
          border-color: #fecaca;
          color: #dc2626;
        }

        .quantity-btn.decrease:hover {
          background: #fee2e2;
          border-color: #fca5a5;
        }

        .quantity-btn.increase {
          background: #f0fdf4;
          border-color: #bbf7d0;
          color: #059669;
        }

        .quantity-btn.increase:hover {
          background: #dcfce7;
          border-color: #86efac;
        }

        .quantity-display {
          flex: 1;
          text-align: center;
          font-weight: 600;
          color: #1f2937;
          padding: 4px 8px;
        }

        .no-products {
          text-align: center;
          padding: 60px 20px;
          color: #6b7280;
        }

        .no-products-icon {
          font-size: 4rem;
          margin-bottom: 20px;
        }

        .login-btn {
          padding: 6px 12px;
          font-size: 14px;
          border-radius: 6px;
          background-color: #16a34a; 
          color: white;
          cursor: pointer;
          transition: background-color 0.2s;
        }

        .login-btn:hover {
          background-color: #15803d;
        }


        @media (max-width: 1024px) {
          .products-container {
            grid-template-columns: 1fr;
            gap: 20px;
          }

          .sidebar {
            display: none;
          }

          .sidebar.mobile-open {
            display: block;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 50;
            background: white;
            height: 100vh;
            overflow-y: auto;
          }

          .mobile-filter-btn {
            display: flex;
          }
        }

        @media (max-width: 768px) {
          .products-grid {
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 16px;
          }

          .content-header {
            flex-direction: column;
            align-items: stretch;
            gap: 12px;
          }
        }
      `}</style>

      {/* Header */}
      <div className="products-header">
        <div className="header-content">
          <h1 className="page-title">
            {selectedCategory ? `${selectedCategory} Products` : 'All Products'}
          </h1>
          <p className="page-subtitle">
            {selectedCategory 
              ? `Explore our premium ${selectedCategory.toLowerCase()} products` 
              : 'Discover our complete range of premium livestock feed and veterinary products'
            }
          </p>
        </div>
      </div>

      {/* Main Container */}
      <div className="products-container">
        {/* Sidebar Filters */}
        <div className={`sidebar ${showFilters ? 'mobile-open' : ''}`}>
          <div className="filter-header">
            <h3 className="filter-title">
              <Filter size={20} />
              Filters
            </h3>
            {showFilters && (
              <button
                className="action-btn"
                onClick={() => setShowFilters(false)}
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Search */}
          <div className="search-box">
            <Search size={16} className="search-icon" />
            <input
              type="text"
              placeholder="Search products..."
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Category Filter */}
                  <div className="filter-section">
                      <h4 className="filter-section-title">Categories</h4>
                      <div className="filter-options">
                          {categories.map((category) =>
                              renderCategoryOption(category)
                          )}
                      </div>
                  </div>


          {/* Price Range Filter */}
          <div className="filter-section">
            <h4 className="filter-section-title">Price Range</h4>
            <div className="price-range">
              <div className="price-display">
                <span className="price-label">₹{selectedFilters.priceRange[0]} - ₹{selectedFilters.priceRange[1]}</span>
              </div>
              <div className="price-inputs">
                <div className="price-input-group">
                  <label className="input-label">Min Price</label>
                  <input
                    type="number"
                    placeholder="0"
                    className="price-input"
                    value={selectedFilters.priceRange[0]}
                    onChange={(e) => handleFilterChange('priceRange', [parseInt(e.target.value) || 0, selectedFilters.priceRange[1]])}
                  />
                </div>
                <div className="price-separator">to</div>
                <div className="price-input-group">
                  <label className="input-label">Max Price</label>
                  <input
                    type="number"
                    placeholder="10000"
                    className="price-input"
                    value={selectedFilters.priceRange[1]}
                    onChange={(e) => handleFilterChange('priceRange', [selectedFilters.priceRange[0], parseInt(e.target.value) || 10000])}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Brand Filter */}
          {/*<div className="filter-section">*/}
          {/*  <h4 className="filter-section-title">Brands</h4>*/}
          {/*  <div className="filter-options">*/}
          {/*    {brands.map(brand => (*/}
          {/*      <div*/}
          {/*        key={brand}*/}
          {/*        className="filter-option"*/}
          {/*        onClick={() => handleFilterChange('brands', brand)}*/}
          {/*      >*/}
          {/*        <div className={`checkbox ${selectedFilters.brands.includes(brand) ? 'checked' : ''}`} />*/}
          {/*        <span className="filter-label">{brand}</span>*/}
          {/*      </div>*/}
          {/*    ))}*/}
          {/*  </div>*/}
          {/*</div>*/}


          {/* Stock Filter */}
          <div className="filter-section">
            <div
              className="filter-option"
              onClick={() => handleFilterChange('inStock', null)}
            >
              <div className={`checkbox ${selectedFilters.inStock ? 'checked' : ''}`} />
              <span className="filter-label">In Stock Only</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="main-content">
          <button
            className="mobile-filter-btn"
            onClick={() => setShowFilters(true)}
          >
            <Filter size={16} />
            Filters
          </button>

          <div className="content-header">
            <div className="results-info">
              Showing {filteredAndSortedProducts.length} products
            </div>
            <select
              className="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="name">Sort by Name</option>
              <option value="price_low">Price: Low to High</option>
              <option value="price_high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="discount">Best Discount</option>
            </select>
          </div>

          {/* Products Grid */}
          {filteredAndSortedProducts.length > 0 ? (
            <div className="products-grid">
              {filteredAndSortedProducts.map(product => (
                <div key={product.id} className="product-card">
                  <div className="product-image">
                    <img
                      src={product.image}
                      alt={product.name}
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.parentNode.style.background = 'linear-gradient(135deg, #f59e0b, #dc2626)';
                        e.target.parentNode.innerHTML = `<div style="color: white; font-weight: 600; text-align: center; padding: 20px; font-size: 0.9rem;">${product.name}</div>`;
                      }}
                    />
                    {product.discount > 0 && (
                      <div className="product-badge">SALE</div>
                    )}
                    <div className="product-actions">
                      <button
                        className={`action-btn wishlist ${isInWishlist(product.id) ? 'filled' : ''}`}
                        onClick={() => handleWishlistClick(product)}
                        title={isInWishlist(product.id) ? 'Remove from wishlist' : 'Add to wishlist'}
                      >
                        <Heart size={16} fill={isInWishlist(product.id) ? 'currentColor' : 'none'} />
                      </button>
                      <button
                        className="action-btn view"
                        onClick={() => handleViewDetails(product)}
                        title="View Details"
                      >
                        <Eye size={16} />
                      </button>
                    </div>
                  </div>

                  <div className="product-content">
                    <div className="product-brand">{product.brand}</div>
                    <h3 className="product-name">{product.name}</h3>
                    

                     <div className="product-price">
                              {product.originalPrice && product.discount > 0 && (
                                  <div className="price-block">
                                      <span className="original-price">₹{product.originalPrice.toFixed(2)}</span>
                                      <span className="current-price">₹{product.currentPrice}</span>
                                  </div>
                              )}

                              {product.originalPrice && product.discount === 0 && (
                                  <span className="current-price"> ₹{product.originalPrice.toFixed(2)}</span>
                              )}      

                      {product.discount > 0 && (
                        <span className="discount">-{product.discount}%</span>
                      )}
                    </div>

                    <div className={`stock-info ${product.inStock ? 'in-stock' : 'out-of-stock'}`}>
                        {product.inStock ? `${product.stock} in stock` : 'Out of stock'}
                    </div>   
                    <div className="product-buttons">
                      {getItemInCart(product.id) && getItemInCart(product.id).quantity > 0 ? (
                        <div className="quantity-selector">
                          <button 
                            className="quantity-btn decrease"
                            onClick={() => handleQuantityChange(product, -1)}
                          >
                            -
                          </button>
                          <span className="quantity-display">
                            {getItemInCart(product.id).quantity}
                          </span>
                          <button 
                            className="quantity-btn increase"
                            onClick={() => handleQuantityChange(product, 1)}
                          >
                            +
                          </button>
                        </div>
                      ) : (
                        <button 
                          className="cart-btn add-to-cart"
                          onClick={() => handleAddToCart(product)}
                          disabled={!product.inStock}
                        >
                          <ShoppingCart size={14} />
                          Add to Cart
                        </button>
                      )}
                      <button 
                        className="cart-btn buy-now"
                        onClick={() => handleBuyNow(product)}
                        disabled={!product.inStock}
                      >
                        Buy Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-products">
              <div className="no-products-icon">🔍</div>
              <h3>No products found</h3>
              <p>Try adjusting your search or filter criteria.</p>
            </div>
          )}
        </div>
      </div>

      {/* Product Details Modal */}
      {showModal && selectedProduct && (
        <ProductDetailsModal
          product={selectedProduct}
          isOpen={showModal}
          onClose={() => {
            setShowModal(false);
            setSelectedProduct(null);
          }}
          wishlistItems={wishlistItems}
          onWishlistToggle={handleWishlistClick}
        />
          )}

          {/* Custom Login Required Modal */}
          <Dialog open={open} onClose={handleClose}>
              <DialogTitle>Login Required</DialogTitle>
              <DialogContent>
                  Login is required to proceed with buying this product.
              </DialogContent>
              <DialogActions>
                  <Button onClick={handleClose}>Cancel</Button>
                  <button
                      className="login-btn"
                      onClick={() => {
                          setOpen(false);
                          onNavigate && onNavigate("login");
                      }}
                  >
                      🔑 LOGIN
                  </button>
              </DialogActions>
          </Dialog>
    </div>
  );
};

export default ProductsPage;