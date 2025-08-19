import React, { useState, useEffect } from "react";
import { getCategories } from '../../api/api';

const CategoriesSection = () => {

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        getCategories()
            .then(res => {
                const categoryList = (res.data?.data || []).filter(cat => cat.parentCategoryId === null);
                setCategories(categoryList);
            })
            .catch(err => console.error(err));
    }, []);


  //const categories = [
  //  {
  //    id: 1,
  //    name: "Livestock Feeds",
  //    image: "/src/assets/scb1.png",
  //    description: "Premium quality feeds for all livestock animals",
  //    icon: "🐄",
  //    color: "from-blue-500 to-blue-600"
  //  },
  //  {
  //    id: 2,
  //    name: "Poultry Feeds", 
  //    image: "/src/assets/scb2.png",
  //    description: "Specialized nutrition for poultry farming",
  //    icon: "🐔",
  //    color: "from-orange-500 to-red-500"
  //  },
  //  {
  //    id: 3,
  //    name: "Shrimp Feeds",
  //    image: "/src/assets/scb3.png", 
  //    description: "High-protein feeds for aquaculture",
  //    icon: "🦐",
  //    color: "from-teal-500 to-green-500"
  //  },
  //  {
  //    id: 4,
  //    name: "Cattle Feed",
  //    image: "/src/assets/scb4.png",
  //    description: "Nutritious feeds for dairy and beef cattle", 
  //    icon: "🐮",
  //    color: "from-purple-500 to-pink-500"
  //  },
  //  {
  //    id: 5,
  //    name: "Livestock Medicine",
  //    image: "/src/assets/scb3.png",
  //    description: "Veterinary medicines for livestock health",
  //    icon: "💊",
  //    color: "from-green-500 to-emerald-500"
  //  },
  //  {
  //    id: 6,
  //    name: "Poultry Medicines",
  //    image: "/src/assets/scb1.png",
  //    description: "Healthcare solutions for poultry farming",
  //    icon: "🏥",
  //    color: "from-yellow-500 to-orange-500"
  //  },
  //  {
  //    id: 7,
  //    name: "Fish & Shrimp Medicines", 
  //    image: "/src/assets/scb3.png",
  //    description: "Aquaculture health and medicine products",
  //    icon: "🐟",
  //    color: "from-cyan-500 to-blue-500"
  //  },
  //  {
  //    id: 8,
  //    name: "Cattle Medicines",
  //    image: "/src/assets/scb4.png", 
  //    description: "Comprehensive cattle healthcare solutions",
  //    icon: "🩺",
  //    color: "from-indigo-500 to-purple-500"
  //  }
  //];

  return (
    <>
      <style>{`
        .category-section {
          padding: 30px 30px;
          background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
          width: 100%;
          position: relative;
          overflow: hidden;
        }

        .category-container {
          max-width: 1400px;
          margin: 0 auto;
          position: relative;
          z-index: 2;
        }

        .category-header1 {
          text-align: center;
          margin-bottom: 20px;
          position: relative;
        }

        .category-header1::after {
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

        .category-title1 {
          font-size: 3rem;
          font-weight: 900;
          color: #1f2937;
          margin-bottom: 16px;
          background: linear-gradient(135deg, #12b431, #0ea025, #16a34a);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-shadow: 0 4px 8px rgba(18, 180, 49, 0.1);
          letter-spacing: -0.02em;
        }

        .category-subtitle {
          font-size: 1.25rem;
          color: #4b5563;
          max-width: 700px;
          margin: 0 auto;
          line-height: 1.7;
          font-weight: 400;
        }

        .category-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
          margin-top: 30px;
        }

        .category-card {
          position: relative;
          background: white;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
          border: 1px solid rgba(255, 255, 255, 0.2);
          height: 220px;
          backdrop-filter: blur(10px);
        }

        .category-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
          border-radius: 16px;
          z-index: 1;
          pointer-events: none;
        }

        .category-card:hover {
          transform: translateY(-12px) scale(1.02);
          box-shadow: 0 20px 60px rgba(18, 180, 49, 0.15);
        }

        .category-image-container {
          position: relative;
          width: 100%;
          height: 140px;
          overflow: hidden;
          background: linear-gradient(135deg, #f3f4f6, #e5e7eb);
        }

        .category-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          filter: brightness(1) saturate(1.1);
        }

        .category-card:hover .category-image {
          transform: scale(1.1);
          filter: brightness(1.1) saturate(1.2);
        }

        .category-placeholder {
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #12b431, #0ea025, #16a34a);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 1.3rem;
          font-weight: 700;
          text-align: center;
          padding: 20px;
          position: relative;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }

        .category-content {
          padding: 16px;
          position: relative;
          height: 80px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          z-index: 2;
          transition: opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .category-name {
          font-size: 1.25rem;
          font-weight: 800;
          color: #1f2937;
          margin-bottom: 6px;
          line-height: 1.3;
          letter-spacing: -0.01em;
          transition: color 0.3s ease;
        }

        .category-description {
          font-size: 0.9rem;
          color: #2a2c30;
          line-height: 1.5;
          font-weight: 400;
          transition: color 0.3s ease;
        }

        .category-card:hover .category-name,
        .category-card:hover .category-description {
          color: white;
        }

        .category-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(18, 180, 49, 0.95), rgba(14, 160, 37, 0.95));
          opacity: 0;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 700;
          font-size: 1.2rem;
          text-align: center;
          padding: 20px;
          backdrop-filter: blur(10px);
        }

        .category-overlay-icon {
          font-size: 2.5rem;
          margin-bottom: 12px;
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1) 0.1s;
        }

        .category-overlay-text {
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1) 0.2s;
        }

        .category-card:hover .category-overlay {
          opacity: 1;
        }

        .category-card:hover .category-overlay-icon,
        .category-card:hover .category-overlay-text {
          opacity: 1;
          transform: translateY(0);
        }

        .category-card:hover .category-content {
          opacity: 0;
        }

        .category-badge {
          position: absolute;
          top: 16px;
          right: 16px;
          background: linear-gradient(135deg, #f59e0b, #d97706);
          color: white;
          padding: 6px 12px;
          border-radius: 20px;
          font-size: 0.75rem;
          font-weight: 700;
          backdrop-filter: blur(10px);
          box-shadow: 0 4px 12px rgba(245, 158, 11, 0.3);
          z-index: 3;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .category-card:hover .category-badge {
          transform: scale(1.1);
        }

        .category-icon {
          position: absolute;
          bottom: 16px;
          left: 16px;
          width: 48px;
          height: 48px;
          background: rgba(18, 180, 49, 0.1);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #12b431;
          font-size: 1.5rem;
          font-weight: bold;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(18, 180, 49, 0.2);
          transition: all 0.3s ease;
        }

        .category-card:hover .category-icon {
          background: rgba(18, 180, 49, 0.2);
          transform: scale(1.1);
        }

        @media (max-width: 968px) {
          .category-section {
            padding: 40px 16px;
          }

          .category-title1 {
            font-size: 2rem;
          }

          .category-grid {
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
          }

          .category-card {
            height: 200px;
          }

          .category-image-container,
          .category-placeholder {
            height: 120px;
          }

          .category-content {
            height: 80px;
            padding: 16px;
          }
        }

        @media (max-width: 768px) {
          .category-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 16px;
          }

          .category-card {
            height: 180px;
          }

          .category-image-container,
          .category-placeholder {
            height: 100px;
          }

          .category-content {
            height: 80px;
            padding: 12px;
          }

          .category-name {
            font-size: 1rem;
          }

          .category-description {
            font-size: 0.8rem;
          }
        }

        @media (max-width: 480px) {
          .category-grid {
            grid-template-columns: 1fr;
          }

          .category-card {
            height: 160px;
          }

          .category-image-container,
          .category-placeholder {
            height: 100px;
          }
        }
      `}</style>

      <div className="category-section">
        <div className="category-container">
          <div className="category-header1">
            <h2 className="category-title1">Category</h2>
            <p className="category-subtitle">
              Explore our comprehensive range of premium livestock nutrition and healthcare solutions
            </p>
          </div>
          
          <div className="category-grid">
            {categories.map((category) => (
              <div key={category.id} className="category-card">
                <div className="category-image-container">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="category-image"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.parentNode.innerHTML = `<div class="category-placeholder">${category.name}</div>`;
                    }}
                  />
                  <div className="category-icon">
                    {category.icon}
                  </div>
                </div>
                <div className="category-content">
                  <h3 className="category-name">{category.name}</h3>
                  <p className="category-description">{category.description}</p>
                </div>
                <div className="category-overlay">
                  <div className="category-overlay-icon">
                    🛒
                  </div>
                  <div className="category-overlay-text">
                    View Products
                  </div>
                </div>
                <div className="category-badge">Premium</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default CategoriesSection;