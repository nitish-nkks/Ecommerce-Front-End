import React, { useState, useEffect } from 'react';
import { Clock, Flame, ShoppingCart, Filter, Eye, Heart, Plus, Minus } from 'lucide-react';
import { createProductCartAnimation } from '../../utils/cartAnimation';

const FlashSalePage = ({ wishlistItems = [], onWishlistToggle, onAddToCart, cartItems = [] }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 45,
    seconds: 30
  });

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prevTime => {
        let { hours, minutes, seconds } = prevTime;
        
        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          seconds = 59;
          minutes--;
        } else if (hours > 0) {
          seconds = 59;
          minutes = 59;
          hours--;
        } else {
          // Reset timer when it reaches 0
          hours = 23;
          minutes = 59;
          seconds = 59;
        }
        
        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const categories = [
    { id: 'all', name: 'All Products', icon: '🏷️' },
    { id: 'poultry', name: 'Poultry Feed', icon: '🐔' },
    { id: 'cattle', name: 'Cattle Feed', icon: '🐄' },
    { id: 'fish', name: 'Fish Feed', icon: '🐟' },
    { id: 'supplements', name: 'Supplements', icon: '💊' },
    { id: 'medicine', name: 'Medicine', icon: '🏥' }
  ];

  const flashSaleProducts = [
    {
      id: 18,
      name: "AMOXIRUM TAB - Premium Antibiotic",
      category: "medicine",
      image: "/src/assets/scb1.png",
      price: 159.50,
      originalPrice: 200.48,
      salePrice: 159.50,
      discount: 20,
      stock: 45,
      sold: 189,
      badge: "FLASH SALE",
      brand: "VetCare",
      subcategory: "Antibiotics"
    },
    {
      id: 19,
      name: "Calgophos - Calcium Supplement",
      category: "supplements",
      image: "/src/assets/scb2.png",
      price: 2281.10,
      originalPrice: 2820.00,
      salePrice: 2281.10,
      discount: 19,
      stock: 23,
      sold: 267,
      badge: "LIMITED DEAL",
      brand: "NutriVet",
      subcategory: "Minerals"
    },
    {
      id: 20,
      name: "SOKRENA W.S. - Poultry Growth",
      category: "poultry",
      image: "/src/assets/scb3.png",
      price: 3854.92,
      originalPrice: 4701.12,
      salePrice: 3854.92,
      discount: 18,
      stock: 34,
      sold: 123,
      badge: "HOT DEAL",
      brand: "PoultryPro",
      subcategory: "Growth Promoters"
    },
    {
      id: 21,
      name: "Vimeral Forte - Multi-Vitamin",
      category: "supplements",
      image: "/src/assets/scb4.png",
      price: 688.00,
      originalPrice: 800.00,
      salePrice: 688.00,
      discount: 14,
      stock: 67,
      sold: 445,
      badge: "BEST SELLER",
      brand: "VitalVet",
      subcategory: "Vitamins"
    },
    {
      id: 22,
      name: "Premium Fish Feed Pro",
      category: "fish",
      image: "/src/assets/p1.png",
      price: 1250.00,
      originalPrice: 1500.00,
      salePrice: 1250.00,
      discount: 17,
      stock: 56,
      sold: 234,
      badge: "NEW ARRIVAL",
      brand: "AquaFeed",
      subcategory: "Feed"
    },
    {
      id: 23,
      name: "Cattle Nutrition Plus Premium",
      category: "cattle",
      image: "/src/assets/p2.png",
      price: 2800.00,
      originalPrice: 3200.00,
      salePrice: 2800.00,
      discount: 12,
      stock: 29,
      sold: 356,
      badge: "PREMIUM",
      brand: "CattleCare",
      subcategory: "Feed Supplements"
    },
    {
      id: 24,
      name: "TC Powder - Broad Spectrum",
      category: "medicine",
      image: "/src/assets/scb1.png",
      price: 77.10,
      originalPrice: 99.23,
      salePrice: 77.10,
      discount: 22,
      stock: 78,
      sold: 567,
      badge: "FLASH SALE",
      brand: "VetCare",
      subcategory: "Antibiotics"
    },
    {
      id: 25,
      name: "E Care Se - Vitamin E Supplement",
      category: "supplements",
      image: "/src/assets/scb2.png",
      price: 288.82,
      originalPrice: 563.00,
      salePrice: 288.82,
      discount: 49,
      stock: 34,
      sold: 289,
      badge: "MEGA DEAL",
      brand: "VitalVet",
      subcategory: "Vitamins"
    }
  ];

  const filteredProducts = selectedCategory === 'all' 
    ? flashSaleProducts 
    : flashSaleProducts.filter(product => product.category === selectedCategory);

  const isInWishlist = (productId) => {
    return wishlistItems.some(item => item.id === productId);
  };

  const handleWishlistClick = (product) => {
    if (onWishlistToggle) {
      onWishlistToggle(product);
    }
  };

  const handleAddToCart = (product) => {
    if (onAddToCart) {
      onAddToCart(product, 1);
      
      // Trigger animation from the clicked button
      const event = window.event || {};
      if (event.target) {
        createProductCartAnimation(event.target.closest('button'), product);
      }
    }
  };

  const handleQuantityChange = (product, change) => {
    if (onAddToCart) {
      onAddToCart(product, change);
    }
  };

  const getItemInCart = (productId) => {
    return cartItems.find(item => item.id === productId);
  };

  const getStockPercentage = (stock, sold) => {
    const total = stock + sold;
    return total > 0 ? (sold / total) * 100 : 0;
  };

  return (
    <>
      <style>{`
        .flash-sale-page {
          min-height: 100vh;
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 20%, #f1f5f9 100%);
          padding: 20px;
          position: relative;
        }

        .flash-sale-page::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 400px;
          background: 
            linear-gradient(135deg, rgba(18, 180, 49, 0.85) 0%, rgba(14, 160, 37, 0.8) 50%, rgba(249, 242, 37, 0.85) 100%),
            url('/src/assets/flash-sale-bg.png'),
            url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400"><defs><radialGradient id="bg1" cx="50%" cy="50%" r="50%"><stop offset="0%" style="stop-color:%2312b431;stop-opacity:0.1"/><stop offset="100%" style="stop-color:%230ea025;stop-opacity:0.3"/></radialGradient><radialGradient id="bg2" cx="80%" cy="20%" r="30%"><stop offset="0%" style="stop-color:%23f9f225;stop-opacity:0.2"/><stop offset="100%" style="stop-color:%23f59e0b;stop-opacity:0.1"/></radialGradient></defs><rect width="400" height="400" fill="url(%23bg1)"/><circle cx="320" cy="80" r="120" fill="url(%23bg2)"/><circle cx="50" cy="350" r="80" fill="%2312b431" opacity="0.1"/></svg>');
          background-size: cover, cover, cover;
          background-position: center, center, center;
          background-repeat: no-repeat;
          z-index: 1;
        }

        .flash-sale-page::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 400px;
          background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="%23ffffff" opacity="0.1"/><circle cx="75" cy="75" r="1" fill="%23ffffff" opacity="0.08"/><circle cx="50" cy="10" r="0.8" fill="%23ffffff" opacity="0.12"/><circle cx="10" cy="60" r="1.2" fill="%23ffffff" opacity="0.06"/><circle cx="90" cy="30" r="0.6" fill="%23ffffff" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
          opacity: 0.3;
          z-index: 1;
        }

        .flash-sale-container {
          max-width: 1400px;
          margin: 0 auto;
          position: relative;
          z-index: 2;
        }

        .flash-sale-header {
          text-align: center;
          margin-bottom: 50px;
          background: rgba(255, 255, 255, 0.98);
          backdrop-filter: blur(20px);
          border-radius: 24px;
          padding: 60px 30px;
          box-shadow: 
            0 25px 50px -12px rgba(0, 0, 0, 0.1),
            0 0 0 1px rgba(255, 255, 255, 0.05);
          position: relative;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .flash-sale-header::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, #12b431, #0ea025, #f9f225);
          animation: shimmer 2s ease-in-out infinite;
        }

        .flash-sale-banner {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 24px;
          z-index: 1;
          opacity: 0.4;
        }

        .flash-sale-header h1 {
          font-size: 3.2rem;
          font-weight: 800;
          color: #000000ff;
          margin-bottom: 16px;
          background: linear-gradient(135deg, #12b431, #0ea025, #f9f225);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 16px;
          position: relative;
          z-index: 2;
          letter-spacing: -0.02em;
          line-height: 1.1;
        }

        .flash-sale-header p {
          font-size: 1.125rem;
          color: #080808ff;
          margin-bottom: 40px;
          position: relative;
          z-index: 2;
          font-weight: 500;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
          line-height: 1.6;
        }

        .countdown-timer {
          display: flex;
          justify-content: center;
          gap: 24px;
          margin-top: 8px;
          position: relative;
          z-index: 2;
        }

        .countdown-item {
          background: linear-gradient(135deg, #12b431 0%, #0ea025 100%);
          color: white;
          padding: 24px 20px;
          border-radius: 16px;
          text-align: center;
          min-width: 90px;
          box-shadow: 
            0 10px 25px -5px rgba(18, 180, 49, 0.25),
            0 10px 10px -5px rgba(18, 180, 49, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.1);
          position: relative;
          overflow: hidden;
        }

        .countdown-item::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, #f9f225, #f59e0b);
        }

        .countdown-number {
          font-size: 2.25rem;
          font-weight: 700;
          display: block;
          margin-bottom: 8px;
          font-family: 'SF Mono', Menlo, monospace;
          background: linear-gradient(135deg, #ffffff, #e2e8f0);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .countdown-label {
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          opacity: 0.8;
          font-weight: 600;
        }

        .categories-filter {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border-radius: 24px;
          padding: 32px;
          margin-bottom: 48px;
          box-shadow: 
            0 20px 25px -5px rgba(0, 0, 0, 0.1),
            0 10px 10px -5px rgba(0, 0, 0, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .categories-header {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 20px;
        }

        .categories-header h2 {
          font-size: 1.375rem;
          font-weight: 700;
          color: #1e293b;
          margin: 0;
          letter-spacing: -0.025em;
        }

        .categories-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 15px;
        }

        .category-btn {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px 20px;
          border: 1px solid #e2e8f0;
          background: #f8fafc;
          border-radius: 16px;
          cursor: pointer;
          transition: all 0.2s ease;
          font-weight: 600;
          color: #475569;
          text-align: left;
          position: relative;
          overflow: hidden;
        }

        .category-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
          transition: left 0.5s ease;
        }

        .category-btn:hover::before {
          left: 100%;
        }

        .category-btn.active {
          background: linear-gradient(135deg, #12b431 0%, #0ea025 100%);
          color: white;
          border-color: #12b431;
          transform: translateY(-1px);
          box-shadow: 
            0 10px 25px -5px rgba(18, 180, 49, 0.25),
            0 10px 10px -5px rgba(18, 180, 49, 0.04);
        }

        .category-btn:hover:not(.active) {
          background: white;
          border-color: #cbd5e1;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        }

        .category-icon {
          font-size: 1.25rem;
        }

        .products-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 24px;
          margin-bottom: 40px;
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
          height: 180px;
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

        .discount-badge {
          position: absolute;
          top: 50px;
          left: 12px;
          background: #dc2626;
          color: white;
          padding: 2px 6px;
          border-radius: 6px;
          font-size: 0.65rem;
          font-weight: 500;
        }

        .product-actions {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          display: flex;
          gap: 10px;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .product-card:hover .product-actions {
          opacity: 1;
        }

        .action-btn {
          background: rgba(255, 255, 255, 0.95);
          border: none;
          padding: 12px;
          border-radius: 50%;
          cursor: pointer;
          transition: all 0.3s ease;
          color: #374151;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        }

        .action-btn:hover {
          background: white;
          transform: scale(1.1);
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
        }

        .product-content {
          padding: 16px;
          background: #e3e8ef;
          border-bottom-left-radius: 12px;
          border-bottom-right-radius: 12px;
        }

        .product-wishlist {
          position: absolute;
          top: 12px;
          right: 12px;
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
          z-index: 4;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .product-wishlist:hover {
          background: white;
          transform: scale(1.1);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        .product-wishlist.filled {
          background: #dc2626;
          color: white;
        }

        .product-wishlist.filled:hover {
          background: #b91c1c;
        }

        .product-name {
          font-size: 0.95rem;
          font-weight: 600;
          color: #1f2937;
          margin-bottom: 6px;
          line-height: 1.2;
        }

        .product-pricing {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-bottom: 10px;
        }

        .sale-price {
          font-size: 1rem;
          font-weight: 700;
          color: #059669;
        }

        .original-price {
          font-size: 0.8rem;
          color: #9ca3af;
          text-decoration: line-through;
        }

        .savings {
          background: linear-gradient(135deg, #dcfce7, #fef3c7);
          color: #166534;
          padding: 4px 8px;
          border-radius: 6px;
          font-size: 0.75rem;
          font-weight: 600;
        }

        .product-stock {
          margin-bottom: 20px;
        }

        .stock-info {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        }

        .stock-text {
          font-size: 0.875rem;
          color: #6b7280;
        }

        .sold-count {
          font-size: 0.875rem;
          font-weight: 600;
          color: #12b431;
        }

        .stock-bar {
          height: 6px;
          background: #f3f4f6;
          border-radius: 3px;
          overflow: hidden;
        }

        .stock-progress {
          height: 100%;
          background: linear-gradient(90deg, #12b431, #f9f225);
          border-radius: 3px;
          transition: width 0.3s ease;
        }

        .product-actions-bottom {
          display: flex;
          gap: 10px;
        }

        .product-buttons {
          display: flex;
          gap: 6px;
          justify-content: flex-end;
          margin-top: 4px;
        }

        .flash-btn {
          flex: 0 0 auto;
          padding: 5px 12px 5px 8px;
          border-radius: 7px;
          font-size: 0.82rem;
          font-weight: 600;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .add-to-cart-btn {
          background: #059669;
          color: white;
        }

        .add-to-cart-btn:hover {
          background: #047857;
          transform: translateY(-1px);
        }

        .buy-now-btn {
          background: #3b82f6;
          color: white;
        }

        .buy-now-btn:hover {
          background: #2563eb;
          transform: translateY(-1px);
        }

        .add-to-cart-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
          transition: left 0.5s ease;
        }

        .add-to-cart-btn:hover::before {
          left: 100%;
        }

        .add-to-cart-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 25px rgba(18, 180, 49, 0.25);
        }

        .buy-now-btn {
          background: linear-gradient(135deg, #f9f225 0%, #f59e0b 100%);
          color: #1f2937;
          border: none;
          padding: 14px 20px;
          border-radius: 12px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          white-space: nowrap;
          font-size: 0.875rem;
          position: relative;
          overflow: hidden;
        }

        .buy-now-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
          transition: left 0.5s ease;
        }

        .buy-now-btn:hover::before {
          left: 100%;
        }

        .buy-now-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 25px rgba(249, 242, 37, 0.25);
        }


        @keyframes shimmer {
          0%, 100% { 
            background-position: -200% 0; 
          }
          50% { 
            background-position: 200% 0; 
          }
        }

        @media (max-width: 768px) {
          .flash-sale-header h1 {
            font-size: 2.5rem;
          }

          .countdown-timer {
            gap: 10px;
          }

          .countdown-item {
            padding: 15px 10px;
            min-width: 60px;
          }

          .countdown-number {
            font-size: 1.5rem;
          }

          .categories-grid {
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          }

          .products-grid {
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
            gap: 20px;
          }

          .product-actions-bottom {
            flex-direction: column;
          }
        }

        @media (max-width: 480px) {
          .flash-sale-page {
            padding: 15px;
          }

          .flash-sale-header {
            padding: 30px 15px;
          }

          .categories-filter,
          .product-content {
            padding: 20px;
          }

          .products-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div className="flash-sale-page">
        <div className="flash-sale-container">
          {/* Flash Sale Header */}
          <div className="flash-sale-header">
            <img 
              src="/src/assets/flash-sale-bg.png" 
              alt="Flash Sale Banner" 
              className="flash-sale-banner"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
            <h1>
              <Flame size={40} />
              MEGA FLASH SALE
              <Flame size={40} />
            </h1>
            <p>Incredible deals on premium animal feed products - Limited time only!</p>
            
            <div className="countdown-timer">
              <div className="countdown-item">
                <span className="countdown-number">{String(timeLeft.hours).padStart(2, '0')}</span>
                <span className="countdown-label">Hours</span>
              </div>
              <div className="countdown-item">
                <span className="countdown-number">{String(timeLeft.minutes).padStart(2, '0')}</span>
                <span className="countdown-label">Minutes</span>
              </div>
              <div className="countdown-item">
                <span className="countdown-number">{String(timeLeft.seconds).padStart(2, '0')}</span>
                <span className="countdown-label">Seconds</span>
              </div>
            </div>
          </div>

          {/* Categories Filter */}
          <div className="categories-filter">
            <div className="categories-header">
              <Filter size={24} />
              <h2>Shop by Category</h2>
            </div>
            <div className="categories-grid">
              {categories.map(category => (
                <button
                  key={category.id}
                  className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(category.id)}
                >
                  <span className="category-icon">{category.icon}</span>
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Products Grid */}
          <div className="products-grid">
            {filteredProducts.map(product => (
              <div key={product.id} className="product-card">
                <div className="product-image">
                  <img
                    src={product.image}
                    alt={product.name}
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.parentNode.style.background = 'linear-gradient(135deg, #f59e0b, #dc2626)';
                      e.target.parentNode.innerHTML += `<div style="color: white; font-weight: 600; text-align: center; padding: 20px;">${product.name}</div>`;
                    }}
                  />
                  <div className="product-badge">{product.badge}</div>
                  <div className="discount-badge">-{product.discount}%</div>
                  <button 
                    className={`product-wishlist ${isInWishlist(product.id) ? 'filled' : ''}`}
                    onClick={() => handleWishlistClick(product)}
                    title={isInWishlist(product.id) ? 'Remove from wishlist' : 'Add to wishlist'}
                  >
                    <Heart size={18} fill={isInWishlist(product.id) ? 'currentColor' : 'none'} />
                  </button>
                </div>
                
                <div className="product-content">
                  
                  <h3 className="product-name">{product.name}</h3>
                  
                  <div className="product-pricing">
                    <span className="sale-price">₹{product.salePrice.toFixed(2)}</span>
                    <span className="original-price">₹{product.originalPrice.toFixed(2)}</span>
                    <span className="savings">-{product.discount}%</span>
                  </div>
                  
                  <div className="product-buttons">
                    {getItemInCart(product.id) && getItemInCart(product.id).quantity > 0 ? (
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        background: '#f3f4f6',
                        borderRadius: '8px',
                        padding: '4px',
                        gap: '4px',
                        flex: 1
                      }}>
                        <button 
                          style={{
                            background: '#fef2f2',
                            border: '1px solid #fecaca',
                            borderRadius: '6px',
                            width: '32px',
                            height: '32px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            color: '#dc2626',
                            transition: 'all 0.2s ease'
                          }}
                          onClick={() => handleQuantityChange(product, -1)}
                        >
                          <Minus size={14} />
                        </button>
                        <span style={{
                          flex: 1,
                          textAlign: 'center',
                          fontWeight: '600',
                          color: '#1f2937',
                          padding: '4px 8px'
                        }}>
                          {getItemInCart(product.id).quantity}
                        </span>
                        <button 
                          style={{
                            background: '#f0fdf4',
                            border: '1px solid #bbf7d0',
                            borderRadius: '6px',
                            width: '32px',
                            height: '32px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            color: '#059669',
                            transition: 'all 0.2s ease'
                          }}
                          onClick={() => handleQuantityChange(product, 1)}
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    ) : (
                      <button 
                        className="flash-btn add-to-cart-btn"
                        onClick={() => handleAddToCart(product)}
                      >
                        🛒 ADD TO CART
                      </button>
                    )}
                    <button className="flash-btn buy-now-btn">🛍️ BUY NOW</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </>
  );
};

export default FlashSalePage;