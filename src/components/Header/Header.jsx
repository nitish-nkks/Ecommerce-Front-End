// src/components/Header/Header.jsx
import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  User, 
  ShoppingCart, 
  Phone, 
  Menu, 
  X, 
  ChevronDown,
  Globe,
  Truck,
  Heart
} from 'lucide-react';
import { getProductSuggestions, getPopularSearches } from '../../data/globalProducts';
import { getParentCategories } from '../../api/api';

const Header = ({ onLoginClick, onNavigate, currentView, onCategoryClick, onWishlistClick, wishlistCount = 0, language, onCartClick, cartItemCount = 0, cartTotal = 0, onSearchSubmit, user, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  //const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchSuggestions, setShowSearchSuggestions] = useState(false);
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  
  const categoriesRef = useRef(null);
  const languageRef = useRef(null);
  const searchRef = useRef(null);

  

  const handleLogout = () => {
      onLogout();
    };

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



    console.log(categories);

  //const categories = [
  //  { 
  //    name: 'Medicine',
  //    displayName: 'Medicine', 
  //    subcategories: [
  //      { name: 'Antibiotics', items: ['Broad Spectrum', 'Tetracycline', 'Amoxicillin'] },
  //      { name: 'Vaccines', items: ['Poultry Vaccines', 'Cattle Vaccines', 'Fish Vaccines'] },
  //      { name: 'Dewormers', items: ['Oral Dewormers', 'Injectable', 'Feed Additives'] }
  //    ]
  //  },
  //  { 
  //    name: 'Supplements',
  //    displayName: 'Supplements', 
  //    subcategories: [
  //      { name: 'Vitamins', items: ['Vitamin E', 'Multivitamins', 'Mineral Mix'] },
  //      { name: 'Minerals', items: ['Calcium', 'Phosphorus', 'Trace Minerals'] },
  //      { name: 'Probiotics', items: ['Gut Health', 'Immunity Boosters', 'Growth Promoters'] }
  //    ]
  //  },
  //  { 
  //    name: 'Poultry',
  //    displayName: 'Poultry Feed', 
  //    subcategories: [
  //      { name: 'Growth Promoters', items: ['Water Soluble', 'Feed Additives', 'Natural Enhancers'] },
  //      { name: 'Broiler Feed', items: ['Starter Feed', 'Grower Feed', 'Finisher Feed'] },
  //      { name: 'Layer Feed', items: ['Layer Starter', 'Layer Developer', 'Layer Producer'] }
  //    ]
  //  },
  //  { 
  //    name: 'Fish',
  //    displayName: 'Fish Feed', 
  //    subcategories: [
  //      { name: 'Feed', items: ['High Protein', 'Growth Formula', 'Premium Quality'] },
  //      { name: 'Aquaculture', items: ['Floating Feed', 'Sinking Feed', 'Specialty Feed'] },
  //      { name: 'Supplements', items: ['Color Enhancers', 'Growth Boosters', 'Health Supplements'] }
  //    ]
  //  },
  //  { 
  //    name: 'Cattle',
  //    displayName: 'Cattle Feed', 
  //    subcategories: [
  //      { name: 'Feed Supplements', items: ['Nutrition Plus', 'Milk Boosters', 'Weight Gainers'] },
  //      { name: 'Mineral Mix', items: ['Calcium Rich', 'Complete Minerals', 'Trace Elements'] },
  //      { name: 'Concentrates', items: ['High Energy', 'Protein Rich', 'Balanced Feed'] }
  //    ]
  //  }
  //];

  //const languages = [
  //  { code: 'en', name: 'English', flag: '🇺🇸' },
  //  { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
  //  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  //  { code: 'es', name: 'Español', flag: '🇪🇸' },
  //  { code: 'fr', name: 'Français', flag: '🇫🇷' }
  //];

  const translations = {
    en: {
      freeShipping: "FREE SHIPPING FOR ALL ORDERS OF ₹20,000.00",
      helpline: "Helpline 1800 570 3090",
      login: "Login",
      register: "Register",
      flashSale: "Flash Sale",
      joinSeller: "Join as Seller",
      searchPlaceholder: "I am shopping for...",
      registration: "Registration",
      allCategories: "All Categories",
      home: "Home",
      blogs: "Blogs",
      technicalGuidance: "Technical Guidance",
      aboutUs: "About Us",
      contactUs: "Contact Us",
      wishlist: "Wishlist"
    },
    hi: {
      freeShipping: "₹20,000.00 के सभी ऑर्डर पर मुफ्त शिपिंग",
      helpline: "हेल्पलाइन 1800 570 3090",
      login: "लॉगिन",
      register: "रजिस्टर",
      flashSale: "फ्लैश सेल",
      joinSeller: "विक्रेता बनें",
      searchPlaceholder: "मैं खरीदारी कर रहा हूं...",
      registration: "पंजीकरण",
      allCategories: "सभी श्रेणियां",
      home: "होम",
      blogs: "ब्लॉग",
      technicalGuidance: "तकनीकी मार्गदर्शन",
      aboutUs: "हमारे बारे में",
      contactUs: "संपर्क करें",
      wishlist: "विशलिस्ट"
    },
    ar: {
      freeShipping: "شحن مجاني لجميع الطلبات بقيمة ₹20,000.00",
      helpline: "خط المساعدة 1800 570 3090",
      login: "تسجيل الدخول",
      register: "تسجيل",
      flashSale: "تخفيضات سريعة",
      joinSeller: "انضم كبائع",
      searchPlaceholder: "أنا أتسوق للحصول على...",
      registration: "التسجيل",
      allCategories: "جميع الفئات",
      home: "الرئيسية",
      blogs: "المدونات",
      technicalGuidance: "الإرشاد التقني",
      aboutUs: "معلومات عنا",
      contactUs: "اتصل بنا",
      wishlist: "قائمة الأمنيات"
    }
  };

  const t = translations[language] || translations.en;
  //const currentLanguage = languages.find(lang => lang.code === language) || languages[0];

  // Handle search suggestions
  useEffect(() => {
    if (searchQuery.length >= 2) {
      const suggestions = getProductSuggestions(searchQuery, 8);
      setSearchSuggestions(suggestions);
      setShowSearchSuggestions(true);
    } else {
      setSearchSuggestions([]);
      setShowSearchSuggestions(false);
    }
  }, [searchQuery]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (categoriesRef.current && !categoriesRef.current.contains(event.target)) {
        setIsCategoriesOpen(false);
      }
      if (languageRef.current && !languageRef.current.contains(event.target)) {
        //setIsLanguageOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearchSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle navigation with dropdown close
  const handleNavigate = (view) => {
    setIsCategoriesOpen(false);
    //setIsLanguageOpen(false);
    onNavigate(view);
  };

  // Handle category click (main category)
  const handleCategoryClick = (category) => {
    onCategoryClick(category, null);
    setIsCategoriesOpen(false);
  };

  // Handle subcategory item click
  const handleSubcategoryItemClick = (category, subcategory, item) => {
    onCategoryClick(category, { name: subcategory.name, item: item });
    setIsCategoriesOpen(false);
  };

  // Handle "All Categories" button click to show all products
  const handleAllCategoriesClick = () => {
    onCategoryClick(null, null); // Clear category and subcategory filters
    setIsCategoriesOpen(false);
  };

  // Handle search form submission
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      performSearch(searchQuery.trim());
    }
  };

  // Handle search input change
  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle search input focus
  const handleSearchFocus = () => {
    if (searchQuery.length >= 2) {
      setShowSearchSuggestions(true);
    } else if (searchQuery.length === 0) {
      // Show popular searches when input is empty and focused
      const popular = getPopularSearches();
      setSearchSuggestions(popular.map(term => ({ type: 'popular', text: term })));
      setShowSearchSuggestions(true);
    }
  };

  // Handle suggestion click
  const handleSuggestionClick = (suggestion) => {
    if (suggestion.product) {
      setSearchQuery(suggestion.product.name);
      performSearch(suggestion.product.name);
    } else {
      setSearchQuery(suggestion.text);
      performSearch(suggestion.text);
    }
  };

  // Perform search and navigate to results
  const performSearch = (query) => {
    setShowSearchSuggestions(false);
    setSearchQuery(query);
    // Use the onSearchSubmit prop to handle navigation
    if (onSearchSubmit) {
      onSearchSubmit(query);
    }
  };

  // Handle Enter key in search input
  const handleSearchKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearchSubmit(e);
    } else if (e.key === 'Escape') {
      setShowSearchSuggestions(false);
    }
  };

  return (
    <div className="header-container">
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }


        .header-container {
          width: 100%;
          position: sticky;
          top: 0;
          z-index: 1000;
          background: white;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          margin: 0;
          padding: 0;
          overflow: visible;
        }

        .top-bar {
          background: linear-gradient(135deg, #12b431 0%, #007337 100%);
          color: white;
          padding: 8px 0;
          font-size: 0.85rem;
          width: 100%;
          max-width: 100vw;
          margin: 0;
          overflow-x: hidden;
        }

        .top-bar-content {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 20px;
          box-sizing: border-box;
          width: 100%;
        }

        .top-bar-left {
          display: flex;
          align-items: center;
          gap: 24px;
        }

        .top-bar-item {
          display: flex;
          align-items: center;
          gap: 6px;
          font-weight: 500;
        }

      .top-bar-right {
          display: flex;
          justify-content: flex-end; /* pushes items to the right */
          align-items: center;       /* vertically center them */
          gap: 20px;
        }


        .top-bar-link {
          color: white;
          text-decoration: none;
          font-weight: 500;
          transition: opacity 0.3s ease;
          cursor: pointer;
        }

        .top-bar-link:hover {
          opacity: 0.8;
        }

        .language-dropdown {
          position: relative;
        }

        .language-btn {
          display: flex;
          align-items: center;
          gap: 6px;
          background: none;
          border: none;
          color: white;
          font-weight: 500;
          cursor: pointer;
          transition: opacity 0.3s ease;
        }

        .language-btn:hover {
          opacity: 0.8;
        }

        .language-dropdown-content {
          position: absolute;
          top: 100%;
          right: 0;
          background: white;
          min-width: 150px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
          border-radius: 8px;
          z-index: 1000;
          overflow: hidden;
        }

        .language-item {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 16px;
          color: #374151;
          cursor: pointer;
          transition: background 0.3s ease;
          font-size: 0.875rem;
        }

        .language-item:hover {
          background: #f9fafb;
        }

        .language-item.active {
          background: #dcfce7;
          color: #059669;
        }

        .middle-section {
          background: white;
          padding: 12px 0;
          border-bottom: 1px solid #e5e7eb;
          width: 100%;
          margin: 0;
          overflow: visible;
        }

        .middle-content {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 20px;
          gap: 32px;
          box-sizing: border-box;
          width: 100%;
        }

        .logo-container {
          width: 300px;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          overflow: hidden;
          cursor: pointer;
        }

        .logo-image {
          width: 300px;
          height: 235px;
          object-fit: contain;
          display: block;
          margin-top: 15px;
          margin-left: -60px;
        }

        .search-section {
          flex: 1;
          max-width: 500px;
          position: relative;
          z-index: 1001;
        }

        .search-container {
          position: relative;
          width: 100%;
        }

        .search-input {
          width: 100%;
          padding: 12px 60px 12px 20px;
          border: 2px solid #e5e7eb;
          border-radius: 25px;
          font-size: 0.95rem;
          transition: all 0.3s ease;
          background: #f9fafb;
        }

        .search-input:focus {
          outline: none;
          border-color: #12b431;
          background: white;
          box-shadow: 0 0 0 3px rgba(18, 180, 49, 0.1);
        }

        .search-button {
          position: absolute;
          right: 8px;
          top: 50%;
          transform: translateY(-50%);
          width: 40px;
          height: 40px;
          border: none;
          border-radius: 50%;
          background: linear-gradient(135deg, #12b431, #007337);
          color: white;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          box-shadow: 0 2px 8px rgba(18, 180, 49, 0.3);
        }

        .search-button:hover {
          transform: translateY(-50%) scale(1.05);
          box-shadow: 0 4px 12px rgba(18, 180, 49, 0.4);
        }

        .search-button:active {
          transform: translateY(-50%) scale(0.95);
        }

        .search-suggestions {
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          background: white;
          border: 2px solid #12b431;
          border-top: none;
          border-radius: 0 0 12px 12px;
          max-height: 400px;
          overflow-y: auto;
          z-index: 1002;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
        }

        .search-suggestion {
          padding: 12px 16px;
          cursor: pointer;
          border-bottom: 1px solid #f3f4f6;
          display: flex;
          align-items: center;
          gap: 10px;
          transition: background 0.2s ease;
        }

        .search-suggestion:hover {
          background: #f8f9fa;
        }

        .search-suggestion:last-child {
          border-bottom: none;
          border-radius: 0 0 10px 10px;
        }

        .suggestion-type {
          font-size: 0.7rem;
          color: #6b7280;
          text-transform: uppercase;
          font-weight: 600;
          min-width: 60px;
        }

        .suggestion-text {
          flex: 1;
          color: #374151;
          font-size: 0.9rem;
        }

        .suggestion-icon {
          color: #9ca3af;
        }

        .popular-searches-header {
          padding: 10px 16px;
          background: #f8f9fa;
          color: #6b7280;
          font-size: 0.8rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          border-bottom: 1px solid #e5e7eb;
        }

        .user-actions {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .action-button {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 8px 16px;
          border: none;
          border-radius: 8px;
          font-size: 0.875rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          text-decoration: none;
        }

        .login-btn {
          background: transparent;
          color: #374151;
          border: 1px solid #d1d5db;
        }

        .login-btn:hover {
          background: #f3f4f6;
          border-color: #12b431;
          color: #12b431;
        }


        .wishlist-btn {
          background: transparent;
          color: #dc2626;
          border: 1px solid #fecaca;
          padding: 10px;
          border-radius: 50%;
          position: relative;
          transition: all 0.3s ease;
        }

        .wishlist-btn:hover {
          background: #fef2f2;
          border-color: #dc2626;
          transform: scale(1.1);
        }

        .wishlist-count {
          position: absolute;
          top: -4px;
          right: -4px;
          background: #dc2626;
          color: white;
          border-radius: 50%;
          width: 18px;
          height: 18px;
          font-size: 0.7rem;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
        }

        .user-name {
          font-weight: 600;
          color: #374151;
        }

        .logout-btn {
          background: transparent;
          color: #dc2626;
          border: 1px solid #fecaca;
        }

        .logout-btn:hover {
          background: #fef2f2;
          border-color: #dc2626;
        }

        .nav-bar {
          background: linear-gradient(135deg, #12b431 0%, #007337 100%);
          color: white;
          padding: 0;
          width: 100%;
          margin: 0;
          overflow: visible;
        }

        .nav-content {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          box-sizing: border-box;
          width: 100%;
          padding: 0 20px;
        }

        .nav-menu {
          display: flex;
          align-items: center;
          flex: 1;
        }

        .categories-dropdown {
          position: relative;
          z-index: 1002;
        }

        .categories-btn-container {
          display: flex;
          align-items: center;
        }

        .categories-btn {
          display: flex;
          align-items: center;
          background: rgba(0, 0, 0, 0.1);
          color: white;
          border: none;
          cursor: pointer;
          font-weight: 600;
          transition: background 0.3s ease;
        }

        .categories-btn:hover {
          background: rgba(0, 0, 0, 0.2);
        }

        .categories-btn.main-btn {
          gap: 8px;
          padding: 16px 20px;
          border-right: 1px solid rgba(255, 255, 255, 0.2);
        }

        .categories-btn.dropdown-btn {
          padding: 16px 12px;
        }

        .categories-dropdown-content {
          position: absolute;
          top: 100%;
          left: 0;
          background: white;
          min-width: 900px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
          border-radius: 8px;
          z-index: 1003;
          max-height: 500px;
          overflow-y: auto;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0;
        }

        .category-section {
          padding: 16px;
          border-right: 1px solid #f3f4f6;
        }

        .category-section:last-child {
          border-right: none;
        }

        .category-title {
          font-weight: 700;
          color: #12b431;
          margin-bottom: 12px;
          font-size: 0.95rem;
          padding-bottom: 8px;
          border-bottom: 2px solid #dcfce7;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .category-title:hover {
          color: #007337;
          padding-left: 4px;
        }

        .subcategory-group {
          margin-bottom: 16px;
        }

        .subcategory-title {
          font-weight: 600;
          color: #374151;
          margin-bottom: 6px;
          font-size: 0.875rem;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .subcategory-title:hover {
          color: #12b431;
          background: #f0fdf4;
          padding-left: 16px;
          transform: translateX(4px);
        }

        .subcategory-items {
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .subcategory-item {
          padding: 6px 12px;
          color: #6b7280;
          font-size: 0.8rem;
          cursor: pointer;
          transition: all 0.3s ease;
          border-radius: 4px;
          margin-bottom: -6px;
          margin-left: -10px;
        }

        .subcategory-item:hover {
          color: #12b431;
          background: #f0fdf4;
          padding-left: 16px;
          transform: translateX(4px);
        }

        .nav-links {
          display: flex;
          align-items: center;
          margin-left: 32px;
        }

        .nav-link {
          color: white;
          text-decoration: none;
          padding: 16px 20px;
          font-weight: 600;
          transition: all 0.3s ease;
          position: relative;
          background: none;
          border: none;
          cursor: pointer;
          font-family: inherit;
          font-size: inherit;
        }

        .nav-link:hover {
          background: rgba(255, 255, 255, 0.1);
          color: #f9f225;
        }

        .nav-link.active {
          background: rgba(255, 255, 255, 0.15);
          color: #f9f225;
        }

        .nav-link.active::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: #f9f225;
        }

        .cart-info {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 16px 20px;
          color: white;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          border-radius: 8px;
        }

        .cart-info:hover {
          background: rgba(255, 255, 255, 0.1);
          transform: scale(1.05);
        }

        .cart-amount {
          color: #f9f225;
        }

        .mobile-menu-btn {
          display: none;
          background: none;
          border: none;
          color: white;
          padding: 8px;
          cursor: pointer;
        }

        .mobile-menu {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          z-index: 2000;
          display: none;
        }

        .mobile-menu.open {
          display: block;
        }

        .mobile-menu-content {
          position: absolute;
          top: 0;
          left: 0;
          width: 280px;
          height: 100%;
          background: white;
          padding: 20px;
          transform: translateX(-100%);
          transition: transform 0.3s ease;
        }

        .mobile-menu.open .mobile-menu-content {
          transform: translateX(0);
        }

        .mobile-menu-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
          padding-bottom: 16px;
          border-bottom: 1px solid #e5e7eb;
        }

        .mobile-close-btn {
          background: none;
          border: none;
          padding: 4px;
          cursor: pointer;
          color: #6b7280;
        }

        .mobile-nav-links {
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        .mobile-nav-link {
          padding: 12px 0;
          color: #374151;
          text-decoration: none;
          font-weight: 600;
          border-bottom: 1px solid #f3f4f6;
          transition: color 0.3s ease;
          background: none;
          border-left: none;
          border-right: none;
          border-top: none;
          width: 100%;
          text-align: left;
          cursor: pointer;
          font-family: inherit;
          font-size: inherit;
        }

        .mobile-nav-link:hover {
          color: #12b431;
        }

        .mobile-logo-container {
          width: 120px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f8f9fa;
          border: 2px dashed #dee2e6;
          border-radius: 6px;
          overflow: hidden;
        }

        .mobile-logo-placeholder {
          color: #6c757d;
          font-size: 0.75rem;
          font-weight: 500;
          text-align: center;
        }

        .logo-placeholder {
          color: #6c757d;
          font-size: 0.875rem;
          font-weight: 500;
          text-align: center;
          padding: 20px;
        }

        @media (max-width: 768px) {
          .top-bar {
            display: none;
          }
          
          .middle-content {
            gap: 8px;
            padding: 0 10px;
            flex-wrap: nowrap;
            align-items: center;
          }
          
          .logo-container {
            width: 80px;
            height: 30px;
          }
          
          .logo-image {
            width: 80px;
            height: 60px;
            margin-top: 5px;
            margin-left: -20px;
          }
          
          .search-section {
            flex: 1;
            min-width: 0;
            max-width: none;
          }
          
          .search-input {
            font-size: 0.85rem;
            padding: 10px 50px 10px 15px;
          }
          
          .search-button {
            width: 36px;
            height: 36px;
            right: 4px;
          }
          
          .user-actions {
            gap: 4px;
            flex-shrink: 0;
            display: flex;
            align-items: center;
          }
          
          .action-button {
            padding: 6px 8px;
            font-size: 0.75rem;
            white-space: nowrap;
          }
          
          .login-btn {
            padding: 6px 10px;
            min-width: 60px;
          }
          
          .wishlist-btn {
            padding: 6px;
            width: 36px;
            height: 36px;
          }
          
          .user-name {
            font-size: 0.8rem;
            max-width: 80px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          
          .logout-btn {
            padding: 6px 8px;
            font-size: 0.75rem;
          }
          
          .nav-content {
            padding: 0 10px;
          }
          
          .nav-links {
            display: none;
          }
          
          .mobile-menu-btn {
            display: block;
          }
          
          .cart-info {
            padding: 12px 10px;
            font-size: 0.8rem;
          }

          .categories-dropdown-content {
            min-width: 320px;
            grid-template-columns: 1fr;
          }

          .category-section {
            border-right: none;
            border-bottom: 1px solid #f3f4f6;
          }
        }

        @media (max-width: 640px) {
          .middle-content {
            padding: 0 8px;
            gap: 6px;
          }
          
          .search-input {
            font-size: 0.8rem;
            padding: 8px 45px 8px 12px;
          }
          
          .search-button {
            width: 32px;
            height: 32px;
            right: 4px;
          }
          
          .user-actions {
            gap: 3px;
          }
          
          .action-button {
            padding: 5px 6px;
            font-size: 0.7rem;
          }
          
          .login-btn {
            padding: 5px 8px;
            min-width: 50px;
          }
          
          .wishlist-btn {
            padding: 5px;
            width: 32px;
            height: 32px;
          }
          
          .user-name {
            font-size: 0.75rem;
            max-width: 60px;
          }
          
          .logout-btn {
            padding: 5px 6px;
            font-size: 0.7rem;
          }
        }

        @media (max-width: 480px) {
          .middle-content {
            padding: 0 5px;
          }
          
          .search-input {
            font-size: 0.75rem;
            padding: 8px 40px 8px 10px;
          }
          
          .search-button {
            width: 30px;
            height: 30px;
          }
          
          .login-btn {
            padding: 4px 6px;
            min-width: 45px;
            font-size: 0.65rem;
          }
          
          .wishlist-btn {
            width: 30px;
            height: 30px;
          }
          
          .user-name {
            max-width: 50px;
            font-size: 0.7rem;
          }
        }
      `}</style>

      {/* Top Bar */}
      <div className="top-bar">
        <div className="top-bar-content">
          <div></div>
          <div className="top-bar-right">
            <div className="top-bar-item">
              <Truck size={16} />
              <span>{t.freeShipping}</span>
            </div>
            <div className="top-bar-item">
              <Phone size={16} />
              <span>{t.helpline}</span>
            </div>
          </div>
          {/*<div className="top-bar-right">*/}
           
            {/*<span className="top-bar-link" onClick={onJoinSellerClick}>{t.joinSeller}</span>*/}
            {/*<div className="language-dropdown" ref={languageRef}>*/}
            {/*  <button */}
            {/*    className="language-btn"*/}
            {/*    onClick={() => setIsLanguageOpen(!isLanguageOpen)}*/}
            {/*  >*/}
            {/*    <Globe size={16} />*/}
            {/*    <span>{currentLanguage.name}</span>*/}
            {/*    <ChevronDown size={14} />*/}
            {/*  </button>*/}
            {/*  {isLanguageOpen && (*/}
            {/*    <div className="language-dropdown-content">*/}
            {/*      {languages.map((lang) => (*/}
            {/*        <div*/}
            {/*          key={lang.code}*/}
            {/*          className={`language-item ${language === lang.code ? 'active' : ''}`}*/}
            {/*          onClick={() => {*/}
            {/*            onLanguageChange(lang.code);*/}
            {/*            setIsLanguageOpen(false);*/}
            {/*          }}*/}
            {/*        >*/}
            {/*          <span>{lang.flag}</span>*/}
            {/*          <span>{lang.name}</span>*/}
            {/*        </div>*/}
            {/*      ))}*/}
            {/*    </div>*/}
            {/*  )}*/}
            {/*</div>*/}
          {/*</div>*/}
        </div>
      </div>

      {/* Middle Section */}
      <div className="middle-section">
        <div className="middle-content">
          <div className="logo-section" onClick={() => handleNavigate('home')}>
            <div className="logo-container">
              <img 
                src="/src/assets/brand-logo.png" 
                alt="Feedora Logo" 
                className="logo-image"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.parentNode.innerHTML = '<div class="logo-placeholder">Your Logo Here</div>';
                }}
              />
            </div>
          </div>

          <div className="search-section" ref={searchRef}>
            <form onSubmit={handleSearchSubmit} className="search-container">
              <input
                type="text"
                placeholder={t.searchPlaceholder}
                value={searchQuery}
                onChange={handleSearchInputChange}
                onFocus={handleSearchFocus}
                onKeyDown={handleSearchKeyDown}
                className="search-input"
                autoComplete="off"
              />
              <button type="submit" className="search-button">
                <Search size={20} />
              </button>
              
              {showSearchSuggestions && (
                <div className="search-suggestions">
                  {searchQuery.length === 0 && (
                    <div className="popular-searches-header">Popular Searches</div>
                  )}
                  {searchSuggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      className="search-suggestion"
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      <span className="suggestion-type">
                        {suggestion.type === 'popular' ? '🔥' : 
                         suggestion.type === 'product' ? '📦' :
                         suggestion.type === 'brand' ? '🏷️' : '📂'}
                      </span>
                      <span className="suggestion-text">{suggestion.text}</span>
                      <Search className="suggestion-icon" size={14} />
                    </div>
                  ))}
                  {searchSuggestions.length === 0 && searchQuery.length >= 2 && (
                    <div className="search-suggestion">
                      <span className="suggestion-type">🔍</span>
                      <span className="suggestion-text">No suggestions found</span>
                    </div>
                  )}
                </div>
              )}
            </form>
          </div>

          <div className="user-actions">
            <button 
              className="action-button wishlist-btn" 
              title={t.wishlist}
              onClick={onWishlistClick}
            >
              <Heart size={16} />
              {wishlistCount > 0 && (
                <span className="wishlist-count">{wishlistCount}</span>
              )}
            </button>
            {user ? (
              <>
                <span className="user-name">Welcome, {user.firstName}</span>
                <button className="action-button logout-btn" onClick={handleLogout}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <button className="action-button login-btn" onClick={onLoginClick}>
                  <User size={16} />
                  {t.login}
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Navigation Bar */}
      <div className="nav-bar">
        <div className="nav-content">
          <div className="nav-menu">
                      <div className="categories-dropdown" ref={categoriesRef}>
                          <div className="categories-btn-container">
                              <button
                                  className="categories-btn main-btn"
                                  onClick={handleAllCategoriesClick}
                              >
                                  <Menu size={18} />
                                  {t.allCategories}
                              </button>
                              <button
                                  className="categories-btn dropdown-btn"
                                  onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
                              >
                                  <ChevronDown size={16} />
                              </button>
                          </div>

                          {isCategoriesOpen && (
                              <div className="categories-dropdown-content">
                                  {categories?.map((category) => (
                                      <div key={category.id} className="category-section">
                                          <div
                                              className="category-title"
                                              onClick={() => handleCategoryClick(category)}
                                          >
                                              {category.name}
                                          </div>

                                          {category.subCategories?.length > 0 && (
                                              <div className="subcategory-group">
                                                  {category.subCategories.map((subcat) => (
                                                      <div key={subcat.id} className="subcategory-section">
                                                          {/* Pass the subcategory as well */}
                                                          <ul
                                                              className="subcategory-title cursor-pointer"
                                                              onClick={() => handleSubcategoryItemClick(category, subcat)}
                                                          >
                                                              {subcat.name}
                                                          </ul>

                                                          {subcat.subCategories?.length > 0 && (
                                                              <ul className="subcategory-items">
                                                                  {subcat.subCategories.map((subsubcat) => (
                                                                      <li
                                                                          key={subsubcat.id}
                                                                          className="subcategory-item cursor-pointer"
                                                                          onClick={() =>
                                                                              handleSubcategoryItemClick(category, subcat, subsubcat)
                                                                          }
                                                                      >
                                                                          {subsubcat.name}
                                                                      </li>
                                                                  ))}
                                                              </ul>
                                                          )}
                                                      </div>
                                                  ))}
                                              </div>
                                          )}

                                      </div>
                                  ))}
                              </div>
                          )}
                      </div>

                      <div className="nav-links">
                          <button
                              className={`nav-link ${currentView === 'home' ? 'active' : ''}`}
                              onClick={() => handleNavigate('home')}
                          >
                              {t.home}
                          </button>
                          <button
                              className={`nav-link ${currentView === 'blogs' ? 'active' : ''}`}
                              onClick={() => handleNavigate('blogs')}
                          >
                              {t.blogs}
                          </button>
                          <button
                              className={`nav-link ${currentView === 'technical' ? 'active' : ''}`}
                              onClick={() => handleNavigate('technical')}
                          >
                              {t.technicalGuidance}
                          </button>
                          <button
                              className={`nav-link ${currentView === 'about' ? 'active' : ''}`}
                              onClick={() => handleNavigate('about')}
                          >
                              {t.aboutUs}
                          </button>
                          <button
                              className={`nav-link ${currentView === 'flashsale' ? 'active' : ''}`}
                              onClick={() => handleNavigate('flashsale')}
                          >
                              {t.flashSale}
                          </button>
                          <button
                              className={`nav-link ${currentView === 'contact' ? 'active' : ''}`}
                              onClick={() => handleNavigate('contact')}
                          >
                              {t.contactUs}
                          </button>
                      </div>
          </div>

          <button 
            className="mobile-menu-btn"
            onClick={() => setIsMenuOpen(true)}
          >
            <Menu size={24} />
          </button>

          <div className="cart-info" onClick={onCartClick}>
            <ShoppingCart size={18} />
            <span className="cart-amount">₹{cartTotal.toFixed(2)}</span>
            <span>({cartItemCount} Items)</span>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMenuOpen ? 'open' : ''}`}>
        <div className="mobile-menu-content">
          <div className="mobile-menu-header">
            <div className="logo-section">
              <div className="mobile-logo-container">
                <img 
                  src="/src/assets/brand-logo.png" 
                  alt="Feedora Logo" 
                  className="logo-image"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentNode.innerHTML = '<div class="mobile-logo-placeholder">Logo</div>';
                  }}
                />
              </div>
            </div>
            <button 
              className="mobile-close-btn"
              onClick={() => setIsMenuOpen(false)}
            >
              <X size={24} />
            </button>
          </div>

          <div className="mobile-nav-links">
            <button 
              className="mobile-nav-link"
              onClick={() => {
                setIsCategoriesOpen(!isCategoriesOpen);
              }}
            >
              {t.allCategories}
            </button>
            <button 
              className="mobile-nav-link"
              onClick={() => {
                handleNavigate('home');
                setIsMenuOpen(false);
              }}
            >
              {t.home}
            </button>
            <button 
              className="mobile-nav-link"
              onClick={() => {
                handleNavigate('blogs');
                setIsMenuOpen(false);
              }}
            >
              {t.blogs}
            </button>
            <button 
              className="mobile-nav-link"
              onClick={() => {
                handleNavigate('technical');
                setIsMenuOpen(false);
              }}
            >
              {t.technicalGuidance}
            </button>
            <button 
              className="mobile-nav-link"
              onClick={() => {
                handleNavigate('about');
                setIsMenuOpen(false);
              }}
            >
              {t.aboutUs}
            </button>
            <button 
              className="mobile-nav-link"
              onClick={() => {
                handleNavigate('flashsale');
                setIsMenuOpen(false);
              }}
            >
              {t.flashSale}
            </button>
            <button 
              className="mobile-nav-link"
              onClick={() => {
                handleNavigate('contact');
                setIsMenuOpen(false);
              }}
            >
              {t.contactUs}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;