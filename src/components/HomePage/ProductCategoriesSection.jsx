import React from 'react';

const ProductCategoriesSection = () => {
  const scrollProducts = (containerId, direction) => {
    const container = document.getElementById(containerId);
    const scrollAmount = 280;
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
          scroll-behavior: smooth;
          padding-bottom: 10px;
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
          .product-category-image {
            width: 160px;
            height: 180px;
          }

          .product-card {
            flex: 0 0 180px;
          }
        }
      `}</style>

      <div className="product-categories-section">
        <div className="product-categories-container">
          {/* Poultry Feeds */}
          <div className="product-category-block">
            <div className="product-category-header">
              <div className="product-category-image">
                <img src="/src/assets/scb1.png" alt="Poultry Feeds" className="product-category-img" />
                <div className="product-category-overlay">
                  <h3 className="product-category-title">Poultry Feeds</h3>
                </div>
              </div>
            </div>
            <div className="product-scroll-container">
              <div className="product-scroll-wrapper" id="poultry-scroll">
                <div className="product-card">
                  <div className="product-image">
                    <img src="/src/assets/p1.png" alt="Nutrichoice Finisher Pellets" className="product-img" />
                  </div>
                  <div className="product-info">
                    <h4 className="product-name">NUTRICHOICE FINISHER PELLETS – 50 KG</h4>
                  </div>
                </div>
                <div className="product-card">
                  <div className="product-image">
                    <img src="/src/assets/p2.png" alt="Super Vriddhi Finisher Crumbs" className="product-img" />
                  </div>
                  <div className="product-info">
                    <h4 className="product-name">SUPER VRIDDHI FINISHER CRUMBS – 50 KG</h4>
                  </div>
                </div>
                <div className="product-card">
                  <div className="product-image">
                    <img src="/src/assets/p1.png" alt="Layer Feed Phase II" className="product-img" />
                  </div>
                  <div className="product-info">
                    <h4 className="product-name">LAYER FEED PHASE II – 50 KG</h4>
                  </div>
                </div>
                <div className="product-card">
                  <div className="product-image">
                    <img src="/src/assets/p2.png" alt="Layer Feed Phase I" className="product-img" />
                  </div>
                  <div className="product-info">
                    <h4 className="product-name">LAYER FEED PHASE I – 50 KG</h4>
                  </div>
                </div>
              </div>
              <button className="product-nav prev" onClick={() => scrollProducts('poultry-scroll', -1)}>‹</button>
              <button className="product-nav next" onClick={() => scrollProducts('poultry-scroll', 1)}>›</button>
            </div>
          </div>

          {/* Fish Feeds */}
          <div className="product-category-block">
            <div className="product-category-header">
              <div className="product-category-image">
                <img src="/src/assets/scb3.png" alt="Fish Feeds" className="product-category-img" />
                <div className="product-category-overlay">
                  <h3 className="product-category-title">Fish & Shrimp Feeds</h3>
                </div>
              </div>
            </div>
            <div className="product-scroll-container">
              <div className="product-scroll-wrapper" id="fish-scroll">
                <div className="product-card">
                  <div className="product-image">
                    <img src="/src/assets/p3.png" alt="Sathi Sinking Fish Feed 18/3" className="product-img" />
                  </div>
                  <div className="product-info">
                    <h4 className="product-name">SATHI SINKING FISH FEED 18/3 – 50 KG</h4>
                  </div>
                </div>
                <div className="product-card">
                  <div className="product-image">
                    <img src="/src/assets/p1.png" alt="Sathi Sinking Fish Feed 20/3" className="product-img" />
                  </div>
                  <div className="product-info">
                    <h4 className="product-name">SATHI SINKING FISH FEED 20/3 – 50 KG</h4>
                  </div>
                </div>
                <div className="product-card">
                  <div className="product-image">
                    <img src="/src/assets/p2.png" alt="Anmol Premium Sinking Fish Feed" className="product-img" />
                  </div>
                  <div className="product-info">
                    <h4 className="product-name">ANMOL PREMIUM SINKING FISH FEED – 50 KG</h4>
                  </div>
                </div>
                <div className="product-card">
                  <div className="product-image">
                    <img src="/src/assets/p3.png" alt="Fishwell Powder" className="product-img" />
                  </div>
                  <div className="product-info">
                    <h4 className="product-name">FISHWELL POWDER 38/5 – 10 KG</h4>
                  </div>
                </div>
              </div>
              <button className="product-nav prev" onClick={() => scrollProducts('fish-scroll', -1)}>‹</button>
              <button className="product-nav next" onClick={() => scrollProducts('fish-scroll', 1)}>›</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCategoriesSection;