import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { createProductCartAnimation } from '../../utils/cartAnimation';
import { getProducts } from '../../api/api';

const BestSellers = ({ wishlistItems = [], onWishlistToggle, onAddToCart }) => {
  const [bestSellingSlide, setBestSellingSlide] = useState(0);

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

    const [bestSellingProducts, setBestSellingProducts] = useState([]);

    useEffect(() => {
        getProducts()
            .then((res) => {
                const products = res.data?.data || [];

                const mappedProducts = products
                    .filter((p) => p.isBestSeller) 
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
                        badge: p.isBestSeller
                                ? "Best Seller"
                                : null,
                        brand: null,
                        category: p.categoryName,
                        subcategory: null,
                    }));

                setBestSellingProducts(mappedProducts);
            })
            .catch((err) => {
                console.error("Error fetching products:", err);
            });
    }, []);

  //const bestSellingProducts = [
  //  {
  //    id: 7,
  //    name: "T C Powder (100g) – Broad Spectrum Antibiotic",
  //    image: "/src/assets/scb2.png",
  //    price: 77.10,
  //    originalPrice: 99.23,
  //    currentPrice: "Rs77.10",
  //    oldPrice: "Rs99.23",
  //    discount: 22,
  //    badge: "Limited Deal",
  //    brand: "VetCare",
  //    category: "Medicine",
  //    subcategory: "Antibiotics"
  //  },
  //  {
  //    id: 8,
  //    name: "E Care Se - Vitamin E Feed Supplement (200gm)",
  //    image: "/src/assets/scb1.png",
  //    price: 288.82,
  //    originalPrice: 563.00,
  //    currentPrice: "Rs288.82",
  //    oldPrice: "Rs563.00",
  //    discount: 49,
  //    badge: "Limited Deal",
  //    brand: "VitalVet",
  //    category: "Supplements",
  //    subcategory: "Vitamins"
  //  },
  //  {
  //    id: 9,
  //    name: "Electrol C- Electrolyte for Poultry (1 Kg)",
  //    image: "/src/assets/p1.png",
  //    price: 144.30,
  //    originalPrice: 290.00,
  //    currentPrice: "Rs144.30",
  //    oldPrice: "Rs290.00",
  //    discount: 50,
  //    badge: "Limited Deal",
  //    brand: "PoultryPro",
  //    category: "Poultry",
  //    subcategory: "Growth Promoters"
  //  },
  //  {
  //    id: 10,
  //    name: "Vendox N (50gm) – Ideal Antibiotic for Mixed Infection",
  //    image: "/src/assets/p2.png",
  //    price: 126.81,
  //    originalPrice: 195.00,
  //    currentPrice: "Rs126.81",
  //    oldPrice: "Rs195.00",
  //    discount: 35,
  //    badge: "Limited Deal",
  //    brand: "VetCare",
  //    category: "Medicine",
  //    subcategory: "Antibiotics"
  //  },
  //  {
  //    id: 11,
  //    name: "Calgophos",
  //    image: "/src/assets/scb2.png", 
  //    price: 2281.10,
  //    originalPrice: 2820.00,
  //    currentPrice: "Rs2,281.10",
  //    oldPrice: "Rs2,820.00",
  //    discount: 19,
  //    badge: "Best Seller",
  //    brand: "NutriVet",
  //    category: "Supplements",
  //    subcategory: "Minerals"
  //  },
  //];

  const goToPrevBestSelling = () => {
    setBestSellingSlide(Math.max(0, bestSellingSlide - 1));
  };

  const goToNextBestSelling = () => {
    const maxSlide = Math.max(0, bestSellingProducts.length - 4);
    setBestSellingSlide(Math.min(maxSlide, bestSellingSlide + 1));
  };

  return (
    <>
      <style>{`
        .best-sellers-section {
          padding: 10px 20px;
          background: linear-gradient(135deg, #f5fff5 0%, #e6f7ed 100%);
          width: 100%;
          position: relative;
          overflow: hidden;
        }

        .best-sellers-section::before {
          content: '';
          position: absolute;
          top: -50%;
          right: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(18, 180, 49, 0.05) 0%, transparent 70%);
          animation: floatReverse 25s ease-in-out infinite;
        }

        .best-sellers-container {
          max-width: 1400px;
          margin: 0 auto;
          position: relative;
          z-index: 2;
        }

        .best-sellers-header {
          text-align: center;
          margin-bottom: 50px;
          position: relative;
        }

        .best-sellers-header::after {
          content: '';
          position: absolute;
          bottom: -20px;
          left: 50%;
          transform: translateX(-50%);
          width: 80px;
          height: 4px;
          background: linear-gradient(90deg, #12b431, #0ea025);
          border-radius: 2px;
        }

        .best-sellers-title {
          font-size: 3rem;
          font-weight: 900;
          color: #1f2937;
          margin-bottom: 10px;
          background: linear-gradient(135deg, #12b431, #0ea025, #16a34a);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-shadow: 0 4px 8px rgba(18, 180, 49, 0.1);
          letter-spacing: -0.02em;
        }

        .best-sellers-subtitle {
          font-size: 1.25rem;
          color: #4b5563;
          max-width: 700px;
          margin: 0 auto;
          line-height: 1.7;
          font-weight: 400;
        }

        .best-sellers-scroll-container {
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

        .best-sellers-scroll-container::-webkit-scrollbar {
          display: none;
        }

        .best-sellers-scroll-wrapper {
          display: flex;
          flex-wrap: nowrap;
          transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          gap: 24px;
          min-width: 100%;
        }

        .best-selling-product {
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

        .best-selling-product:hover {
          transform: translateY(-8px);
          box-shadow: 0 12px 32px rgba(18, 180, 49, 0.15);
        }

        .best-selling-product-image {
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

        .best-selling-product-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }

        .best-selling-product:hover .best-selling-product-image img {
          transform: scale(1.05);
        }

        .best-selling-product-placeholder {
          background: linear-gradient(135deg, #12b431, #0ea025);
          color: white;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }

        .best-selling-product-badge {
          position: absolute;
          top: 12px;
          left: 12px;
          background: #f59e0b;
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

        .best-selling-product-content {
          padding: 16px;
          background: #e3e8ef;
          border-bottom-left-radius: 12px;
          border-bottom-right-radius: 12px;
        }

        .best-selling-product-name {
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

        .best-selling-product-price {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-bottom: 10px;
        }

        .best-selling-current-price {
          font-size: 1rem;
          font-weight: 700;
          color: #059669;
        }

        .best-selling-old-price {
          font-size: 0.8rem;
          color: #9ca3af;
          text-decoration: line-through;
        }

        .best-selling-discount {
          background: #dc2626;
          color: white;
          padding: 2px 6px;
          border-radius: 6px;
          font-size: 0.65rem;
          font-weight: 500;
        }

        .best-selling-product-buttons {
          display: flex;
          gap: 6px;
          justify-content: flex-end;
          margin-top: 4px;
        }

        .best-selling-btn {
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

        .best-selling-add-cart {
          background: #059669;
          color: white;
        }

        .best-selling-add-cart:hover {
          background: #047857;
          transform: translateY(-1px);
        }

        .best-selling-buy-now {
          background: #3b82f6;
          color: white;
        }

        .best-selling-buy-now:hover {
          background: #2563eb;
          transform: translateY(-1px);
        }

        .best-selling-nav {
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

        .best-selling-nav:hover {
          background: white;
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
          transform: translateY(-50%) scale(1.1);
        }

        .best-selling-nav.prev {
          left: 10px;
        }

        .best-selling-nav.next {
          right: 10px;
        }

        @keyframes floatReverse {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(20px) rotate(-180deg); }
        }

        @media (max-width: 968px) {
          .best-sellers-section {
            padding: 40px 16px;
          }

          .best-sellers-title {
            font-size: 2rem;
          }

          .best-selling-product {
            flex: 0 0 250px;
          }
        }

        @media (max-width: 768px) {
          .best-selling-product {
            flex: 0 0 220px;
          }

          .best-selling-nav {
            width: 35px;
            height: 35px;
            font-size: 1rem;
          }
        }

        @media (max-width: 480px) {
          .best-selling-product {
            flex: 0 0 200px;
          }
        }
      `}</style>

      <div className="best-sellers-section">
        <div className="best-sellers-container">
          <div className="best-sellers-header">
            <h2 className="best-sellers-title">Best Sellers</h2>
            <p className="best-sellers-subtitle">
              Our most popular products, chosen by farmers like you.
            </p>
          </div>
          
          <div className="best-sellers-scroll-container">
            <div 
              className="best-sellers-scroll-wrapper"
              style={{
                transform: `translateX(-${bestSellingSlide * 304}px)`
              }}
            >
              {bestSellingProducts.map((product) => (
                <div key={product.id} className="best-selling-product">
                  <div className="best-selling-product-image">
                    <img
                      src={product.image}
                      alt={product.name}
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.parentNode.innerHTML = `<div class="best-selling-product-placeholder">${product.name}</div>`;
                      }}
                    />
                    <div className="best-selling-product-badge">{product.badge}</div>
                    <button 
                      className={`wishlist-heart ${isInWishlist(product.id) ? 'filled' : ''}`}
                      onClick={() => handleWishlistClick(product)}
                      title={isInWishlist(product.id) ? 'Remove from wishlist' : 'Add to wishlist'}
                    >
                      <Heart size={18} fill={isInWishlist(product.id) ? 'currentColor' : 'none'} />
                    </button>
                  </div>
                  <div className="best-selling-product-content">
                    <h3 className="best-selling-product-name">{product.name}</h3>
                    <div className="best-selling-product-price">
                      {product.discount === null || product.discount === 0 && (
                         <span className="best-selling-current-price">{product.oldPrice}</span>  
                      )}
                      {product.discount != null && product.discount !== 0 && (
                         <span className="best-selling-old-price">{product.oldPrice}</span>
                      )}
                      <span className="best-selling-current-price">{product.currentPrice}</span>  
                      {product.discount != null && product.discount !== 0 && (
                          <span className="featured-discount">
                             {`-${product.discount}%`}
                          </span>
                      )}
                    </div>
                    <div className="best-selling-product-buttons">
                      <button 
                        className="best-selling-btn best-selling-add-cart"
                        onClick={() => handleAddToCart(product)}
                        title="Add to Cart"
                      >
                        🛒 ADD TO CART
                      </button>
                      <button className="best-selling-btn best-selling-buy-now">🛍️ BUY NOW</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <button className="best-selling-nav prev" onClick={goToPrevBestSelling}>
              ‹
            </button>
            <button className="best-selling-nav next" onClick={goToNextBestSelling}>
              ›
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default BestSellers;