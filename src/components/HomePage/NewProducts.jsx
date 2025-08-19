import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { createProductCartAnimation } from '../../utils/cartAnimation';
import { getProducts } from '../../api/api';

const NewProducts = ({ wishlistItems = [], onWishlistToggle, onAddToCart }) => {
  const [newProductsSlide, setNewProductsSlide] = useState(0);

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
      onAddToCart(product);
      
      // Trigger animation from the clicked button
      const event = window.event || {};
      if (event.target) {
        createProductCartAnimation(event.target.closest('button'), product);
      }
    }
  };

    const [newProducts, setNewProducts] = useState([]);

    useEffect(() => {
        getProducts()
            .then((res) => {
                const products = res.data?.data || [];

                const mappedProducts = products
                    .filter((p) => p.isNewProduct) // ✅ Keep only featured products
                    .map((p) => ({
                        id: p.id,
                        name: p.name,
                        image: p.image || "/src/assets/placeholder.png",
                        price: p.price,
                        originalPrice: p.price,
                        oldPrice: `Rs${p.price.toLocaleString()}`,
                        currentPrice:
                            p.discountPercentage > 0
                                ? `Rs${(p.price * (1 - p.discountPercentage / 100)).toFixed(2)}`
                                : null,
                        discount: p.discountPercentage,
                        badge: p.isNewProduct
                                ? "NEW" : null,
                        brand: null,
                        category: p.categoryName,
                        subcategory: null,
                    }));

                setNewProducts(mappedProducts);
            })
            .catch((err) => {
                console.error("Error fetching products:", err);
            });
    }, []);


  //const newProducts = [
  //  {
  //    id: 12,
  //    name: "AMOXIRUM TAB",
  //    image: "/src/assets/scb1.png",
  //    price: 159.50,
  //    originalPrice: 200.48,
  //    currentPrice: "Rs159.50",
  //    oldPrice: "Rs200.48",
  //    discount: 20,
  //    badge: "NEW",
  //    brand: "VetCare",
  //    category: "Medicine",
  //    subcategory: "Antibiotics"
  //  },
  //  {
  //    id: 13,
  //    name: "Calgophos",
  //    image: "/src/assets/scb2.png", 
  //    price: 2281.10,
  //    originalPrice: 2820.00,
  //    currentPrice: "Rs2,281.10",
  //    oldPrice: "Rs2,820.00",
  //    discount: 19,
  //    badge: "NEW",
  //    brand: "NutriVet",
  //    category: "Supplements",
  //    subcategory: "Minerals"
  //  },
  //  {
  //    id: 14,
  //    name: "SOKRENA W.S.",
  //    image: "/src/assets/scb3.png",
  //    price: 3854.92,
  //    originalPrice: 4701.12,
  //    currentPrice: "Rs3,854.92",
  //    oldPrice: "Rs4,701.12", 
  //    discount: 18,
  //    badge: "NEW",
  //    brand: "PoultryPro",
  //    category: "Poultry",
  //    subcategory: "Growth Promoters"
  //  },
  //  {
  //    id: 15,
  //    name: "Vimeral Forte",
  //    image: "/src/assets/scb4.png",
  //    price: 688.00,
  //    originalPrice: 800.00,
  //    currentPrice: "Rs688.00",
  //    oldPrice: "Rs800.00",
  //    discount: 14, 
  //    badge: "NEW",
  //    brand: "VitalVet",
  //    category: "Supplements",
  //    subcategory: "Vitamins"
  //  },
  //  {
  //    id: 16,
  //    name: "Fish Feed Pro",
  //    image: "/src/assets/scb1.png",
  //    price: 1250.00,
  //    originalPrice: 1500.00,
  //    currentPrice: "Rs1,250.00",
  //    oldPrice: "Rs1,500.00",
  //    discount: 17,
  //    badge: "NEW",
  //    brand: "AquaFeed",
  //    category: "Fish",
  //    subcategory: "Feed"
  //  },
  //  {
  //    id: 17,
  //    name: "Cattle Nutrition Plus", 
  //    image: "/src/assets/scb2.png",
  //    price: 2800.00,
  //    originalPrice: 3200.00,
  //    currentPrice: "Rs2,800.00",
  //    oldPrice: "Rs3,200.00",
  //    discount: 12,
  //    badge: "NEW",
  //    brand: "CattleCare",
  //    category: "Cattle",
  //    subcategory: "Feed Supplements"
  //  }
  //];

  const goToPrevNewProducts = () => {
    setNewProductsSlide(Math.max(0, newProductsSlide - 1));
  };

  const goToNextNewProducts = () => {
    const maxSlide = Math.max(0, newProducts.length - 4);
    setNewProductsSlide(Math.min(maxSlide, newProductsSlide + 1));
  };

  return (
    <>
      <style>{`
        .new-products-section {
          padding: 10px 20px;
          background: linear-gradient(135deg, #f0fdfa 0%, #ecfdf5 100%);
          width: 100%;
          position: relative;
          overflow: hidden;
        }

        .new-products-section::before {
          content: '';
          position: absolute;
          top: -50%;
          right: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(16, 185, 129, 0.05) 0%, transparent 70%);
          animation: floatReverse 25s ease-in-out infinite;
        }

        .new-products-container {
          max-width: 1400px;
          margin: 0 auto;
          position: relative;
          z-index: 2;
        }

        .new-products-header {
          text-align: center;
          margin-bottom: 50px;
          position: relative;
        }

        .new-products-header::after {
          content: '';
          position: absolute;
          bottom: -20px;
          left: 50%;
          transform: translateX(-50%);
          width: 80px;
          height: 4px;
          background: linear-gradient(90deg, #10b981, #059669);
          border-radius: 2px;
        }

        .new-products-title {
          font-size: 3rem;
          font-weight: 900;
          color: #1f2937;
          margin-bottom: 10px;
          background: linear-gradient(135deg, #10b981, #059669, #047857);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-shadow: 0 4px 8px rgba(16, 185, 129, 0.1);
          letter-spacing: -0.02em;
        }

        .new-products-subtitle {
          font-size: 1.25rem;
          color: #4b5563;
          max-width: 700px;
          margin: 0 auto;
          line-height: 1.7;
          font-weight: 400;
        }

        .new-products-scroll-container {
          position: relative;
          overflow-x: auto;
          overflow-y: visible;
          border-radius: 20px;
          background: white;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
          padding: 20px;
          width: 100%;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }

        .new-products-scroll-container::-webkit-scrollbar {
          display: none;
        }

        .new-products-scroll-wrapper {
          display: flex;
          flex-wrap: nowrap;
          transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          gap: 24px;
          min-width: 100%;
        }

        .new-product {
          min-width: 280px;
          max-width: 280px;
          background: white;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
          transition: all 0.3s ease;
          border: 1px solid #e5e7eb;
          position: relative;
          flex: 0 0 280px;
          display: flex;
          flex-direction: column;
        }

        .new-product:hover {
          transform: translateY(-8px);
          box-shadow: 0 12px 32px rgba(16, 185, 129, 0.15);
        }

        .new-product-image {
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

        .new-product-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .new-product:hover .new-product-image img {
          transform: scale(1.05);
        }

        .new-product-placeholder {
          background: linear-gradient(135deg, #10b981, #059669);
          color: white;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }

        .new-product-badge {
          position: absolute;
          top: 12px;
          left: 12px;
          background: #10b981;
          color: white;
          padding: 4px 8px;
          border-radius: 12px;
          font-size: 0.7rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .wishlist-heart {
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
          z-index: 2;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }

        .wishlist-heart:hover {
          background: white;
          transform: scale(1.1);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        .wishlist-heart.filled {
          background: #dc2626;
          color: white;
        }

        .wishlist-heart.filled:hover {
          background: #b91c1c;
        }

        .new-product-content {
          padding: 16px;
          background: #e3e8ef;
          border-bottom-left-radius: 12px;
          border-bottom-right-radius: 12px;
        }

        .new-product-name {
         font-size: 0.95rem;
          font-weight: 600;
          color: #1f2937;
          margin-bottom: 6px;
          line-height: 1.2;
          white-space: nowrap;        /* Prevents text from wrapping */
          overflow: hidden;           /* Hides overflowing text */
          text-overflow: ellipsis;    /* Adds the "..." */
          max-width: 250px;           /* Adjust width as needed */
          display: inline-block;      /* Required for ellipsis to work */
          vertical-align: middle;
        }

        .new-product-price {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-bottom: 10px;
        }

        .new-current-price {
          font-size: 1rem;
          font-weight: 700;
          color: #059669;
        }

        .new-old-price {
          font-size: 0.8rem;
          color: #9ca3af;
          text-decoration: line-through;
        }

        .new-discount {
          background: #dc2626;
          color: white;
          padding: 2px 6px;
          border-radius: 6px;
          font-size: 0.65rem;
          font-weight: 500;
        }

        .new-product-buttons {
          display: flex;
          gap: 6px;
          justify-content: flex-end;
          margin-top: 4px;
        }

        .new-btn {
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

        .new-add-cart {
          background: #059669;
          color: white;
        }

        .new-add-cart:hover {
          background: #047857;
          transform: translateY(-1px);
        }

        .new-buy-now {
          background: #3b82f6;
          color: white;
        }

        .new-buy-now:hover {
          background: #059669;
          transform: translateY(-1px);
        }

        .new-nav {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(255, 255, 255, 0.95);
          border: none;
          width: 45px;
          height: 45px;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.1rem;
          color: #374151;
          transition: all 0.3s ease;
          z-index: 10;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .new-nav:hover {
          background: white;
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
          transform: translateY(-50%) scale(1.1);
        }

        .new-nav.prev {
          left: 10px;
        }

        .new-nav.next {
          right: 10px;
        }

        @keyframes floatReverse {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(20px) rotate(-180deg); }
        }

        @media (max-width: 968px) {
          .new-products-section {
            padding: 40px 16px;
          }

          .new-products-title {
            font-size: 2rem;
          }

          .new-product {
            flex: 0 0 250px;
          }
        }

        @media (max-width: 768px) {
          .new-product {
            flex: 0 0 220px;
          }

          .new-nav {
            width: 35px;
            height: 35px;
            font-size: 1rem;
          }
        }

        @media (max-width: 480px) {
          .new-product {
            flex: 0 0 200px;
          }
        }
      `}</style>

      <div className="new-products-section">
        <div className="new-products-container">
          <div className="new-products-header">
            <h2 className="new-products-title">New Products</h2>
            <p className="new-products-subtitle">
              Discover the latest additions to our premium animal feed collection
            </p>
          </div>
          
          <div className="new-products-scroll-container">
            <div 
              className="new-products-scroll-wrapper"
              style={{
                transform: `translateX(-${newProductsSlide * 304}px)`
              }}
            >
              {newProducts.map((product) => (
                <div key={product.id} className="new-product">
                  <div className="new-product-image">
                    <img
                      src={product.image}
                      alt={product.name}
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.parentNode.innerHTML = `<div class="new-product-placeholder">${product.name}</div>`;
                      }}
                    />
                    <div className="new-product-badge">{product.badge}</div>
                    <button 
                      className={`wishlist-heart ${isInWishlist(product.id) ? 'filled' : ''}`}
                      onClick={() => handleWishlistClick(product)}
                      title={isInWishlist(product.id) ? 'Remove from wishlist' : 'Add to wishlist'}
                    >
                      <Heart size={18} fill={isInWishlist(product.id) ? 'currentColor' : 'none'} />
                    </button>
                  </div>
                  <div className="new-product-content">
                    <h3 className="new-product-name">{product.name}</h3>                  
                          <div className="new-product-price">
                              {product.discount === null || product.discount === 0 && (
                                  <span className="new-current-price">{product.oldPrice}</span>
                              )}
                              {product.discount != null && product.discount !== 0 && (
                                  <span className="new-old-price">{product.oldPrice}</span>
                              )}
                              <span className="new-current-price">{product.currentPrice}</span>
                              {product.discount != null && product.discount !== 0 && (
                                  <span className="new-discount">
                                      {`-${product.discount}%`}
                                  </span>
                              )}
                          </div>
                    <div className="new-product-buttons">
                      <button 
                        className="new-btn new-add-cart"
                        onClick={() => handleAddToCart(product)}
                        title="Add to Cart"
                      >
                        🛒 ADD TO CART
                      </button>
                      <button className="new-btn new-buy-now">🛍️ BUY NOW</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <button className="new-nav prev" onClick={goToPrevNewProducts}>
              ‹
            </button>
            <button className="new-nav next" onClick={goToNextNewProducts}>
              ›
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewProducts;