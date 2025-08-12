// src/components/Pages/SearchResultsPage.jsx
import React, { useState, useMemo } from 'react';
import { Search, Filter, ShoppingCart, Heart, Eye, Plus, Minus, X } from 'lucide-react';
import { searchProducts, getAllCategories, getAllBrands } from '../../data/globalProducts';
import { createProductCartAnimation } from '../../utils/cartAnimation';

const SearchResultsPage = ({ 
  searchQuery = '', 
  wishlistItems = [], 
  onWishlistToggle, 
  onAddToCart, 
  cartItems = [],
  onNavigate 
}) => {
  const [filters, setFilters] = useState({
    category: '',
    brand: '',
    minPrice: '',
    maxPrice: '',
    sortBy: 'relevance'
  });
  const [showFilters, setShowFilters] = useState(false);

  // Search and filter products
  const searchResults = useMemo(() => {
    let results = searchProducts(searchQuery, {
      category: filters.category,
      brand: filters.brand,
      minPrice: filters.minPrice ? parseFloat(filters.minPrice) : undefined,
      maxPrice: filters.maxPrice ? parseFloat(filters.maxPrice) : undefined
    });

    // Sort results
    switch (filters.sortBy) {
      case 'price-low':
        results.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        results.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        results.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'discount':
        results.sort((a, b) => (b.discount || 0) - (a.discount || 0));
        break;
      default: // relevance
        // Keep original order (most relevant first)
        break;
    }

    return results;
  }, [searchQuery, filters]);

  const categories = getAllCategories();
  const brands = getAllBrands();

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

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      category: '',
      brand: '',
      minPrice: '',
      maxPrice: '',
      sortBy: 'relevance'
    });
  };

  return (
    <div style={{ minHeight: '100vh', background: '#f9fafb' }}>
      <style jsx>{`
        .search-results-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 20px;
        }

        .search-header {
          background: white;
          border-radius: 16px;
          padding: 30px;
          margin-bottom: 30px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        }

        .search-title {
          font-size: 2rem;
          font-weight: 700;
          color: #1f2937;
          margin-bottom: 10px;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .search-subtitle {
          color: #6b7280;
          font-size: 1.1rem;
        }

        .results-info {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          flex-wrap: wrap;
          gap: 10px;
        }

        .results-count {
          font-size: 1rem;
          color: #374151;
          font-weight: 500;
        }

        .search-controls {
          display: flex;
          gap: 15px;
          align-items: center;
        }

        .filter-toggle {
          display: flex;
          align-items: center;
          gap: 8px;
          background: #12b431;
          color: white;
          border: none;
          padding: 10px 16px;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .filter-toggle:hover {
          background: #0ea025;
          transform: translateY(-1px);
        }

        .sort-select {
          padding: 10px 14px;
          border: 2px solid #e5e7eb;
          border-radius: 8px;
          background: white;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .sort-select:focus {
          outline: none;
          border-color: #12b431;
          box-shadow: 0 0 0 3px rgba(18, 180, 49, 0.1);
        }

        .main-content {
          display: grid;
          grid-template-columns: 300px 1fr;
          gap: 30px;
        }

        .filters-sidebar {
          background: white;
          border-radius: 16px;
          padding: 25px;
          height: fit-content;
          position: sticky;
          top: 20px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        }

        .filters-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          padding-bottom: 15px;
          border-bottom: 1px solid #e5e7eb;
        }

        .filters-title {
          font-size: 1.2rem;
          font-weight: 700;
          color: #1f2937;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .clear-filters {
          color: #6b7280;
          background: none;
          border: none;
          cursor: pointer;
          font-size: 0.875rem;
          text-decoration: underline;
        }

        .clear-filters:hover {
          color: #12b431;
        }

        .filter-group {
          margin-bottom: 25px;
        }

        .filter-label {
          font-size: 0.9rem;
          font-weight: 600;
          color: #374151;
          margin-bottom: 8px;
          display: block;
        }

        .filter-select,
        .filter-input {
          width: 100%;
          padding: 8px 12px;
          border: 2px solid #e5e7eb;
          border-radius: 8px;
          font-size: 14px;
          transition: all 0.3s ease;
        }

        .filter-select:focus,
        .filter-input:focus {
          outline: none;
          border-color: #12b431;
          box-shadow: 0 0 0 3px rgba(18, 180, 49, 0.1);
        }

        .price-inputs {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }

        .results-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
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

        .product-content {
          padding: 20px;
          background: white;
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .product-source {
          font-size: 0.7rem;
          color: #6b7280;
          text-transform: uppercase;
          font-weight: 600;
          margin-bottom: 4px;
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
          font-size: 1.2rem;
          font-weight: 700;
          color: #059669;
        }

        .original-price {
          font-size: 0.9rem;
          color: #9ca3af;
          text-decoration: line-through;
        }

        .discount {
          background: #dc2626;
          color: white;
          padding: 2px 6px;
          border-radius: 4px;
          font-size: 0.7rem;
          font-weight: 600;
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
          border-radius: 8px;
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

        .cart-btn.add-to-cart {
          background: linear-gradient(135deg, #12b431 0%, #0ea025 100%);
          color: white;
        }

        .cart-btn.add-to-cart:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(18, 180, 49, 0.3);
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
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-weight: 600;
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

        .no-results {
          text-align: center;
          padding: 60px 20px;
          color: #6b7280;
        }

        .no-results-icon {
          font-size: 4rem;
          margin-bottom: 20px;
        }

        .mobile-filters {
          display: none;
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: white;
          z-index: 1000;
          overflow-y: auto;
        }

        .mobile-filters.open {
          display: block;
        }

        .mobile-filters-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 20px;
          border-bottom: 1px solid #e5e7eb;
        }

        @media (max-width: 1024px) {
          .main-content {
            grid-template-columns: 1fr;
          }

          .filters-sidebar {
            display: none;
          }

          .mobile-filters {
            display: block;
          }
        }

        @media (max-width: 768px) {
          .results-grid {
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 16px;
          }

          .search-controls {
            flex-direction: column;
            align-items: stretch;
          }
        }
      `}</style>

      <div className="search-results-container">
        {/* Search Header */}
        <div className="search-header">
          <h1 className="search-title">
            <Search size={32} />
            Search Results
          </h1>
          <p className="search-subtitle">
            {searchQuery ? `Results for "${searchQuery}"` : 'Browse all products'}
          </p>
        </div>

        {/* Results Info & Controls */}
        <div className="results-info">
          <div className="results-count">
            Found {searchResults.length} product{searchResults.length !== 1 ? 's' : ''}
          </div>
          
          <div className="search-controls">
            <button 
              className="filter-toggle"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter size={16} />
              Filters
            </button>
            
            <select
              className="sort-select"
              value={filters.sortBy}
              onChange={(e) => handleFilterChange('sortBy', e.target.value)}
            >
              <option value="relevance">Most Relevant</option>
              <option value="name">Name A-Z</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="discount">Highest Discount</option>
            </select>
          </div>
        </div>

        {/* Main Content */}
        <div className="main-content">
          {/* Filters Sidebar */}
          <div className="filters-sidebar">
            <div className="filters-header">
              <h3 className="filters-title">
                <Filter size={20} />
                Filters
              </h3>
              <button className="clear-filters" onClick={clearFilters}>
                Clear All
              </button>
            </div>

            <div className="filter-group">
              <label className="filter-label">Category</label>
              <select
                className="filter-select"
                value={filters.category}
                onChange={(e) => handleFilterChange('category', e.target.value)}
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label className="filter-label">Brand</label>
              <select
                className="filter-select"
                value={filters.brand}
                onChange={(e) => handleFilterChange('brand', e.target.value)}
              >
                <option value="">All Brands</option>
                {brands.map(brand => (
                  <option key={brand} value={brand}>{brand}</option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label className="filter-label">Price Range</label>
              <div className="price-inputs">
                <input
                  type="number"
                  placeholder="Min"
                  className="filter-input"
                  value={filters.minPrice}
                  onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                />
                <input
                  type="number"
                  placeholder="Max"
                  className="filter-input"
                  value={filters.maxPrice}
                  onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Results Grid */}
          <div>
            {searchResults.length > 0 ? (
              <div className="results-grid">
                {searchResults.map(product => (
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
                      {product.discount && (
                        <div className="product-badge">-{product.discount}%</div>
                      )}
                      <div className="product-actions">
                        <button
                          className={`action-btn wishlist ${isInWishlist(product.id) ? 'filled' : ''}`}
                          onClick={() => handleWishlistClick(product)}
                          title={isInWishlist(product.id) ? 'Remove from wishlist' : 'Add to wishlist'}
                        >
                          <Heart size={16} fill={isInWishlist(product.id) ? 'currentColor' : 'none'} />
                        </button>
                      </div>
                    </div>

                    <div className="product-content">
                      <div className="product-source">{product.source}</div>
                      <div className="product-brand">{product.brand}</div>
                      <h3 className="product-name">{product.name}</h3>
                      
                      <div className="product-price">
                        <span className="current-price">₹{product.price.toFixed(2)}</span>
                        {product.originalPrice && (
                          <span className="original-price">₹{product.originalPrice.toFixed(2)}</span>
                        )}
                        {product.discount && (
                          <span className="discount">-{product.discount}%</span>
                        )}
                      </div>

                      <div className="product-buttons">
                        {getItemInCart(product.id) && getItemInCart(product.id).quantity > 0 ? (
                          <div className="quantity-selector">
                            <button 
                              className="quantity-btn decrease"
                              onClick={() => handleQuantityChange(product, -1)}
                            >
                              <Minus size={14} />
                            </button>
                            <span className="quantity-display">
                              {getItemInCart(product.id).quantity}
                            </span>
                            <button 
                              className="quantity-btn increase"
                              onClick={() => handleQuantityChange(product, 1)}
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                        ) : (
                          <button 
                            className="cart-btn add-to-cart"
                            onClick={() => handleAddToCart(product)}
                          >
                            <ShoppingCart size={14} />
                            Add to Cart
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-results">
                <div className="no-results-icon">🔍</div>
                <h3>No products found</h3>
                <p>Try adjusting your search terms or filters.</p>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Filters */}
        <div className={`mobile-filters ${showFilters ? 'open' : ''}`}>
          <div className="mobile-filters-header">
            <h3>Filters</h3>
            <button onClick={() => setShowFilters(false)}>
              <X size={24} />
            </button>
          </div>
          {/* Mobile filter content would go here */}
        </div>
      </div>
    </div>
  );
};

export default SearchResultsPage;