// src/components/Pages/ProductDetailsModal.jsx
import React, { useState } from 'react';
import { X, Heart, ShoppingCart, Star, Plus, Minus, Share2, Facebook, Twitter, Linkedin } from 'lucide-react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";

const ProductDetailsModal = ({ product, isOpen, onClose, wishlistItems = [], onWishlistToggle, onAddToCart, onUpdateQuantity, cartItems = [], onNavigate }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedTab, setSelectedTab] = useState('description');
  console.log('ProductDetailsModal rendered with product:', product);
  if (!isOpen || !product) return null;

  const isInWishlist = wishlistItems.some(item => item.id === product.id);

  const handleWishlistClick = () => {
    if (onWishlistToggle) {
      onWishlistToggle(product);
    }
  };

  //const handleQuantityChange = (action) => {
  //  if (action === 'increase' && quantity < product.stock) {
  //    setQuantity(prev => prev + 1);
  //  } else if (action === 'decrease' && quantity > 1) {
  //    setQuantity(prev => prev - 1);
  //  }
  //};

  const totalPrice = (product.price * quantity).toFixed(2);
  const totalSavings = product.originalPrice ? ((product.originalPrice - product.price) * quantity).toFixed(2) : 0;

  const handleShare = (platform) => {
    const url = window.location.href;
    const title = encodeURIComponent(product.name);
    const text = encodeURIComponent(product.description);

    switch (platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank', 'width=600,height=400');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${title}&url=${url}`, '_blank', 'width=600,height=400');
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank', 'width=600,height=400');
        break;
    }
  };

    const handleAddToCart = (product) => {
        const minQty = product.minOrderQuantity || 1;
        if (onAddToCart) {
            onAddToCart(product, minQty);
        }
    };

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
    const [open, setOpen] = useState(false);
    const handleWarningClose = () => setOpen(false);

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

  return (
    <div className="modal-overlay">
      <style jsx>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.7);
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          animation: fadeIn 0.3s ease;
        }

        .modal-content {
          background: white;
          border-radius: 20px;
          max-width: 1000px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
          position: relative;
          animation: slideIn 0.3s ease;
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 25px 30px;
          border-bottom: 1px solid #e5e7eb;
        }

        .modal-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: #1f2937;
        }

        .close-btn {
          background: #f3f4f6;
          border: none;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          color: #6b7280;
        }

        .close-btn:hover {
          background: #e5e7eb;
          transform: scale(1.1);
        }

        .modal-body {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          padding: 30px;
        }

        .product-image-section {
          position: relative;
        }

        .main-image {
          width: 100%;
          height: 400px;
          background: linear-gradient(135deg, #f3f4f6, #e5e7eb);
          border-radius: 16px;
          overflow: hidden;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .main-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .image-badge {
          position: absolute;
          top: 15px;
          left: 15px;
          background: #dc2626;
          color: white;
          padding: 6px 12px;
          border-radius: 12px;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
        }

        .product-details-section {
          display: flex;
          flex-direction: column;
        }

        .product-brand {
          font-size: 0.9rem;
          color: #6b7280;
          text-transform: uppercase;
          letter-spacing: 1px;
          font-weight: 600;
          margin-bottom: 8px;
        }

        .product-title {
          font-size: 1.8rem;
          font-weight: 700;
          color: #1f2937;
          margin-bottom: 12px;
          line-height: 1.3;
        }

        .rating-section {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 16px;
        }

        .stars {
          display: flex;
          gap: 2px;
        }

        .star {
          color: #fbbf24;
        }

        .rating-text {
          font-size: 0.9rem;
          color: #6b7280;
        }

        .price-section {
          margin-bottom: 20px;
        }

        .current-price {
          font-size: 2rem;
          font-weight: 800;
          color: #059669;
          margin-right: 12px;
        }

        .original-price {
          font-size: 1.2rem;
          color: #9ca3af;
          text-decoration: line-through;
          margin-right: 8px;
        }

        .discount-badge {
          background: #dc2626;
          color: white;
          padding: 4px 8px;
          border-radius: 8px;
          font-size: 0.8rem;
          font-weight: 600;
        }

        .savings-text {
          font-size: 0.9rem;
          color: #059669;
          font-weight: 600;
          margin-top: 4px;
        }

        .stock-info {
          font-size: 0.9rem;
          color: #059669;
          font-weight: 600;
          margin-bottom: 20px;
        }

        .quantity-section {
          margin-bottom: 25px;
        }

        .quantity-label {
          font-size: 1rem;
          font-weight: 600;
          color: #374151;
          margin-bottom: 10px;
        }

        .quantity-controls {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .quantity-btn {
          background: #f3f4f6;
          border: none;
          border-radius: 8px;
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
          color: #374151;
        }

        .quantity-btn:hover:not(:disabled) {
          background: #e5e7eb;
          transform: scale(1.1);
        }

        .quantity-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .quantity-input {
          width: 60px;
          text-align: center;
          padding: 8px;
          border: 2px solid #e5e7eb;
          border-radius: 8px;
          font-weight: 600;
          font-size: 1rem;
        }

        .action-buttons {
          display: flex;
          gap: 12px;
          margin-bottom: 25px;
        }

        .primary-btn {
          flex: 1;
          background: linear-gradient(135deg, #12b431 0%, #0ea025 100%);
          color: white;
          border: none;
          padding: 14px 20px;
          border-radius: 12px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          font-size: 0.95rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .primary-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(18, 180, 49, 0.3);
        }

        .secondary-btn {
          flex: 1;
          background: #3b82f6;
          color: white;
          border: none;
          padding: 14px 20px;
          border-radius: 12px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          font-size: 0.95rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .secondary-btn:hover {
          background: #2563eb;
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(59, 130, 246, 0.3);
        }

        .wishlist-btn {
          background: ${isInWishlist ? '#dc2626' : '#f3f4f6'};
          color: ${isInWishlist ? 'white' : '#374151'};
          border: none;
          border-radius: 50%;
          width: 50px;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .wishlist-btn:hover {
          transform: scale(1.1);
          background: ${isInWishlist ? '#b91c1c' : '#e5e7eb'};
        }

        .share-section {
          margin-bottom: 25px;
        }

        .share-title {
          font-size: 1rem;
          font-weight: 600;
          color: #374151;
          margin-bottom: 10px;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .share-buttons {
          display: flex;
          gap: 8px;
        }

        .share-btn {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .share-btn.facebook {
          background: #1877f2;
          color: white;
        }

        .share-btn.twitter {
          background: #1da1f2;
          color: white;
        }

        .share-btn.linkedin {
          background: #0077b5;
          color: white;
        }

        .share-btn:hover {
          transform: scale(1.1);
          opacity: 0.9;
        }

        .total-section {
          background: #f9fafb;
          padding: 20px;
          border-radius: 12px;
          margin-bottom: 25px;
        }

        .total-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 8px;
        }

        .total-row:last-child {
          margin-bottom: 0;
          padding-top: 12px;
          border-top: 1px solid #e5e7eb;
          font-weight: 700;
          font-size: 1.1rem;
        }

        .total-label {
          color: #6b7280;
        }

        .total-value {
          font-weight: 600;
          color: #1f2937;
        }

        .savings-value {
          color: #059669;
          font-weight: 600;
        }

        .tabs-section {
          grid-column: 1 / -1;
          border-top: 1px solid #e5e7eb;
          padding-top: 25px;
        }

        .tabs-nav {
          display: flex;
          gap: 0;
          margin-bottom: 20px;
          border-bottom: 1px solid #e5e7eb;
        }

        .tab-btn {
          background: none;
          border: none;
          padding: 12px 24px;
          cursor: pointer;
          transition: all 0.3s ease;
          font-weight: 600;
          color: #6b7280;
          border-bottom: 2px solid transparent;
        }

        .tab-btn.active {
          color: #12b431;
          border-bottom-color: #12b431;
        }

        .tab-btn:hover {
          color: #374151;
        }

        .tab-content {
          padding: 20px 0;
        }

        .description-text {
          font-size: 1rem;
          line-height: 1.7;
          color: #4b5563;
          margin-bottom: 20px;
        }

        .features-list {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 12px;
          margin-bottom: 20px;
        }

        .feature-item {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 12px;
          background: #f3f4f6;
          border-radius: 8px;
          font-size: 0.9rem;
          color: #374151;
        }

        .feature-check {
          color: #059669;
          font-weight: 700;
        }

        .specifications-table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 10px;
        }

        .specifications-table th,
        .specifications-table td {
          padding: 12px;
          text-align: left;
          border-bottom: 1px solid #e5e7eb;
        }

        .specifications-table th {
          background: #f9fafb;
          font-weight: 600;
          color: #374151;
        }

        .specifications-table td {
          color: #6b7280;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideIn {
          from { 
            opacity: 0;
            transform: scale(0.9);
          }
          to { 
            opacity: 1;
            transform: scale(1);
          }
        }

        @media (max-width: 768px) {
          .modal-content {
            margin: 10px;
            max-height: 95vh;
          }

          .modal-body {
            grid-template-columns: 1fr;
            gap: 20px;
            padding: 20px;
          }

          .main-image {
            height: 300px;
          }

          .product-title {
            font-size: 1.4rem;
          }

          .current-price {
            font-size: 1.6rem;
          }

          .action-buttons {
            flex-direction: column;
          }

          .features-list {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="modal-header">
          <h2 className="modal-title">Product Details</h2>
          <button className="close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="modal-body">
          {/* Product Image Section */}
          <div className="product-image-section">
            <div className="main-image">
              <img
                src={product.image}
                alt={product.name}
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.parentNode.style.background = 'linear-gradient(135deg, #f59e0b, #dc2626)';
                  e.target.parentNode.innerHTML = `<div style="color: white; font-weight: 600; text-align: center; padding: 40px; font-size: 1.2rem;">${product.name}</div>`;
                }}
              />
              {product.discount > 0 && (
                <div className="image-badge">-{product.discount}%</div>
              )}
            </div>
          </div>

          {/* Product Details Section */}
          <div className="product-details-section">
            <div className="product-brand">{product.brand}</div>
            <h1 className="product-title">{product.name}</h1>

            {/* Rating */}
            <div className="rating-section">
              <div className="stars">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className="star"
                    fill={i < Math.floor(product.rating) ? "#fbbf24" : "none"}
                  />
                ))}
              </div>
              <span className="rating-text">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>

            {/* Price */}
            {/*<div className="price-section">*/}
            {/*  <div>*/}
            {/*    <span className="current-price">₹{product.price.toFixed(2)}</span>*/}
            {/*    {product.originalPrice && (*/}
            {/*      <span className="original-price">₹{product.originalPrice.toFixed(2)}</span>*/}
            {/*    )}*/}
            {/*    {product.discount > 0 && (*/}
            {/*      <span className="discount-badge">-{product.discount}%</span>*/}
            {/*    )}*/}
            {/*  </div>*/}
            {/*  {totalSavings > 0 && (*/}
            {/*    <div className="savings-text">*/}
            {/*      You save ₹{((product.originalPrice - product.price) * quantity).toFixed(2)}*/}
            {/*    </div>*/}
            {/*  )}*/}
            {/*</div>*/}
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
            {/* Stock Info */}
            <div className="stock-info">
              {product.inStock ? `${product.stock} units available` : 'Out of stock'}
            </div>

            {/* Quantity Selector */}
            {/*<div className="quantity-section">*/}
            {/*  <div className="quantity-label">Quantity:</div>*/}
            {/*  <div className="quantity-controls">*/}
            {/*    <button */}
            {/*      className="quantity-btn"*/}
            {/*      onClick={() => handleQuantityChange('decrease')}*/}
            {/*      disabled={quantity <= 1}*/}
            {/*    >*/}
            {/*      <Minus size={16} />*/}
            {/*    </button>*/}
            {/*    <input*/}
            {/*      className="quantity-input"*/}
            {/*      type="number"*/}
            {/*      value={quantity}*/}
            {/*      onChange={(e) => {*/}
            {/*        const value = Math.max(1, Math.min(product.stock, parseInt(e.target.value) || 1));*/}
            {/*        setQuantity(value);*/}
            {/*      }}*/}
            {/*    />*/}
            {/*    <button */}
            {/*      className="quantity-btn"*/}
            {/*      onClick={() => handleQuantityChange('increase')}*/}
            {/*      disabled={quantity >= product.stock}*/}
            {/*    >*/}
            {/*      <Plus size={16} />*/}
            {/*    </button>*/}
            {/*  </div>*/}
            {/*</div>*/}

            {/* Action Buttons */}
            {/*<div className="action-buttons">*/}
            {/*  <button className="primary-btn" onClick={() => handleAddToCart(product)} disabled={!product.inStock}>*/}
            {/*    <ShoppingCart size={18} />*/}
            {/*    Add to Cart*/}
            {/*  </button>*/}
            {/*  <button className="secondary-btn" onClick={() => handleBuyNow(product)} disabled={!product.inStock}>*/}
            {/*    Buy Now*/}
            {/*  </button>*/}
            {/*  <button */}
            {/*    className="wishlist-btn"*/}
            {/*    onClick={handleWishlistClick}*/}
            {/*    title={isInWishlist ? 'Remove from wishlist' : 'Add to wishlist'}*/}
            {/*  >*/}
            {/*    <Heart size={20} fill={isInWishlist ? 'currentColor' : 'none'} />*/}
            {/*  </button>*/}
            {/*</div>*/}
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
            {/* Total Section */}
            {/*<div className="total-section">*/}
            {/*  <div className="total-row">*/}
            {/*    <span className="total-label">Subtotal ({quantity} items):</span>*/}
            {/*    <span className="total-value">₹{totalPrice}</span>*/}
            {/*  </div>*/}
            {/*  {totalSavings > 0 && (*/}
            {/*    <div className="total-row">*/}
            {/*      <span className="total-label">You save:</span>*/}
            {/*      <span className="savings-value">₹{totalSavings}</span>*/}
            {/*    </div>*/}
            {/*  )}*/}
            {/*  <div className="total-row">*/}
            {/*    <span className="total-label">Total:</span>*/}
            {/*    <span className="total-value">₹{totalPrice}</span>*/}
            {/*  </div>*/}
            {/*</div>*/}

            {/* Share Section */}
            <div className="share-section">
              <div className="share-title">
                <Share2 size={16} />
                Share this product:
              </div>
              <div className="share-buttons">
                <button className="share-btn facebook" onClick={() => handleShare('facebook')}>
                  <Facebook size={16} />
                </button>
                <button className="share-btn twitter" onClick={() => handleShare('twitter')}>
                  <Twitter size={16} />
                </button>
                <button className="share-btn linkedin" onClick={() => handleShare('linkedin')}>
                  <Linkedin size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Tabs Section */}
          <div className="tabs-section">
            <div className="tabs-nav">
              <button 
                className={`tab-btn ${selectedTab === 'description' ? 'active' : ''}`}
                onClick={() => setSelectedTab('description')}
              >
                Description
              </button>
              <button 
                              className={`tab-btn ${selectedTab === 'specifications' ? 'active' : ''}`}
                              onClick={() => {
                                  setSelectedTab('specifications');

                                  const modalContent = document.querySelector('.modal-content');
                                  const target = document.getElementById('specifications-table');

                                  if (modalContent && target) {
                                      modalContent.scrollTo({
                                          top: target.offsetTop,
                                          behavior: 'smooth'
                                      });
                                  }
                              }}

              >
                Specifications
              </button>
              <button 
                className={`tab-btn ${selectedTab === 'features' ? 'active' : ''}`}
                              onClick={() => {
                                  setSelectedTab('features');
                                  document.getElementById('features-list')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                              }}
              >
                Features
              </button>
            </div>

            <div className="tab-content">
              {selectedTab === 'description' && (
                <div>
                  <p className="description-text">{product.description}</p>
                </div>
              )}

              {selectedTab === 'specifications' && (
                <div>
                  {/*{product.specifications && (*/}
                  {/*  <table className="specifications-table">*/}
                  {/*    <tbody>*/}
                  {/*      */}{/*{Object.entries(product.productSpecification).map(([key, value]) => (*/}
                  {/*      */}{/*  <tr key={key}>*/}
                  {/*      */}{/*    <th>{key}</th>*/}
                  {/*      */}{/*    <td>{value}</td>*/}
                  {/*      */}{/*  </tr>*/}
                  {/*                            */}{/*))}*/}
                  {/*                            {product.productSpecification.dosageApplication}*/}
                  {/*    </tbody>*/}
                  {/*  </table>*/}

                                  {/*)}*/}
                                  
                                      {product.productSpecification && (
                                          <table className="specifications-table">
                                              <tbody>
                                                  {Object.entries(product.productSpecification).map(([key, value]) => (
                                                      value !== null && value !== "" && (
                                                          <tr key={key}>
                                                              <th>
                                                                  {key
                                                                      .replace(/([A-Z])/g, " $1")     // split camelCase
                                                                      .replace(/^./, str => str.toUpperCase())} {/* capitalize first letter */}
                                                              </th>
                                                              <td>{value}</td>
                                                          </tr>
                                                      )
                                                  ))}
                                              </tbody>
                                          </table>
                                      )}
                                 

                </div>
              )}

              {selectedTab === 'features' && (
                <div>
                  <div className="features-list">
                    {product.features && product.features.map((feature, index) => (
                      <div key={index} className="feature-item">
                        <span className="feature-check">✓</span>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
          </div>
          {/* Custom Login Required Modal */}
          <Dialog open={open} onClose={handleWarningClose}>
              <DialogTitle>Login Required</DialogTitle>
              <DialogContent>
                  Login is required to proceed with buying this product.
              </DialogContent>
              <DialogActions>
                  <Button onClick={handleWarningClose}>Cancel</Button>
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

export default ProductDetailsModal;