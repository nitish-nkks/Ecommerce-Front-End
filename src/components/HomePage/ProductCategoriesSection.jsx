import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';

const ProductCategoriesSection = ({ categories = []}) => {
    const [categoriesList, setCategoriesList] = useState([]);

    useEffect(() => {
        if (!categories.length) return;

        // Build a lookup for quick access by categoryId
        const categoryMap = {};
        categories.forEach((c) => {
            categoryMap[c.categoryId] = c;
        });

        // Recursive function to collect products (deeply, using map)
        const collectAllProducts = (category) => {
            let products = [...(category.products || [])];

            if (category.subCategories && category.subCategories.length > 0) {
                category.subCategories.forEach((sub) => {
                    // Instead of trusting sub.products (may be empty/shallow),
                    // find the full category in categoryMap
                    const fullSub = categoryMap[sub.subCategoryId];
                    if (fullSub) {
                        products = [...products, ...collectAllProducts(fullSub)];
                    }
                });
            }
            return products;
        };

        // Pick only top-level categories and merge their products
        const mainCategories = categories
            .filter((c) => c.parentCategoryId === null) // ✅ top-level only
            .map((c) => ({
                categoryId: c.categoryId,
                categoryName: c.categoryName,
                products: collectAllProducts(c), // ✅ deep merge products
            }));

        setCategoriesList(mainCategories);
    }, [categories]); // ✅ recompute when categories prop changes


  const scrollProducts = (containerId, direction) => {
    const container = document.getElementById(containerId);
    const isMobile = window.innerWidth <= 768;
    const scrollAmount = isMobile ? 180 : 280;
    
    if (container) {
      container.scrollBy({
        left: direction * scrollAmount,
        behavior: 'smooth'
      });
    }
  };
  return (
    <>
      <style>{`
        .product-categories-section {
          background: #fafafa;
          padding: 60px 20px;
        }

        .product-categories-container {
          max-width: 1400px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 50px;
        }

        .product-category-block {
          display: flex;
          gap: 30px;
          align-items: flex-start;
        }

        .product-category-header {
          flex: 0 0 250px;
        }

        .product-category-image {
          width: 250px;
          height: 300px;
          border-radius: 16px;
          overflow: hidden;
          position: relative;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
        }

        .product-category-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .product-category-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
          padding: 40px 20px 20px;
          color: white;
        }

        .product-category-title {
          font-size: 1.8rem;
          font-weight: 700;
          margin: 0;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }

        .product-scroll-container {
          flex: 1;
          position: relative;
          overflow: hidden;
          border-radius: 16px;
          background: white;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
          padding: 20px;
        }

        .product-scroll-wrapper {
          display: flex;
          gap: 20px;
          overflow-x: auto;
          overflow-y: hidden;
          scroll-behavior: smooth;
          padding-bottom: 10px;
          border-radius: 12px;
        }

        .product-scroll-wrapper::-webkit-scrollbar {
          display: none;
        }

        .product-card {
          flex: 0 0 260px;
          background: #f8f9fa;
          border-radius: 12px;
          padding: 16px;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          border: 1px solid #e9ecef;
        }

        .product-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
        }

        .product-image {
          width: 100%;
          height: 180px;
          background: white;
          border-radius: 8px;
          overflow: hidden;
          margin-bottom: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .product-img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          padding: 10px;
        }

        .product-info {
          text-align: center;
        }

        .product-name {
          font-size: 0.9rem;
          font-weight: 600;
          color: #343a40;
          margin: 0;
          line-height: 1.4;
        }

        .product-nav {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(255, 255, 255, 0.95);
          border: none;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
          color: #374151;
          transition: all 0.3s ease;
          z-index: 10;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .product-nav:hover {
          background: white;
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
          transform: translateY(-50%) scale(1.1);
        }

        .product-nav.prev {
          left: 10px;
        }

        .product-nav.next {
          right: 10px;
        }

        @media (max-width: 968px) {
          .product-category-block {
            flex-direction: column;
            gap: 20px;
          }

          .product-category-header {
            flex: none;
            align-self: center;
          }

          .product-category-image {
            width: 200px;
            height: 240px;
          }

          .product-card {
            flex: 0 0 220px;
          }
        }

        @media (max-width: 768px) {
          .product-categories-section {
            padding: 40px 16px;
          }

          .product-category-image {
            width: 180px;
            height: 200px;
          }

          .product-category-title {
            font-size: 1.4rem;
          }

          .product-scroll-container {
            padding: 15px;
          }

          .product-card {
            flex: 0 0 200px;
            padding: 12px;
          }

          .product-image {
            height: 140px;
          }

          .product-name {
            font-size: 0.8rem;
          }

          .product-nav {
            width: 35px;
            height: 35px;
            font-size: 1rem;
          }
        }

        @media (max-width: 480px) {
          .product-categories-section {
            padding: 30px 12px;
          }

          .product-category-image {
            width: 160px;
            height: 180px;
          }

          .product-scroll-container {
            padding: 12px;
          }

          .product-card {
            flex: 0 0 160px;
            padding: 10px;
          }

          .product-image {
            height: 120px;
          }

          .product-name {
            font-size: 0.75rem;
          }
        }

      `}</style>

      <div className="product-categories-section">
        <div className="product-categories-container">
                  {categoriesList.map((category) => (
                        <div key={category.categoryId} className="product-category-block">
                            {/* Category header */}
            <div className="product-category-header">
              <div className="product-category-image">
                                    <img
                                        src={category.products[0]?.image || "/src/assets/placeholder.png"}
                                        alt={category.categoryName}
                                        className="product-category-img"
                                    />
                <div className="product-category-overlay">
                                        <h3 className="product-category-title">{category.categoryName}</h3>
            </div>
                  </div>
                  </div>

                            {/* Product scroll */}
            <div className="product-scroll-container">
                                <div className="product-scroll-wrapper" id={`category-scroll-${category.categoryId}`}>
                                    {category.products.map((product) => (
                                        <div key={product.productId} className="product-card">
                  <div className="product-image">
                                                <img
                                                    src={product.image || "/src/assets/placeholder.png"}
                                                    alt={product.productName}
                                                    className="product-img"
                                                />
                  </div>
                  <div className="product-info">
                                                <h4 className="product-name">{product.productName}</h4>
                  </div>
                </div>
                                    ))}
              </div>
                                <button
                                    className="product-nav prev"
                                    onClick={() => scrollProducts(`category-scroll-${category.categoryId}`, -1)}
                                >
                                    ‹
                                </button>
                                <button
                                    className="product-nav next"
                                    onClick={() => scrollProducts(`category-scroll-${category.categoryId}`, 1)}
                                >
                                    ›
                                </button>
            </div>
          </div>
                    ))}
        </div>
      </div>
    </>
  );
};

export default ProductCategoriesSection;