import React from 'react';

const BrandMarquee = () => {
  const brands = [
    {
      id: 1,
      name: "Purina",
      logo: "/src/assets/b1 (1).jpg"
    },
    {
      id: 2,
      name: "Royal Canin",
      logo: "/src/assets/b1 (2).png"
    },
    {
      id: 3,
      name: "Hill's",
      logo: "/src/assets/b1 (3).png"
    },
    {
      id: 4,
      name: "Blue Buffalo",
      logo: "/src/assets/b1 (4).png"
    },
    {
      id: 5,
      name: "Nutro",
      logo: "/src/assets/b1 (1).jpg"
    },
    {
      id: 6,
      name: "Iams",
      logo: "/src/assets/b1 (2).png"
    },
    {
      id: 7,
      name: "Wellness",
      logo: "/src/assets/b1 (3).png"
    },
    {
      id: 8,
      name: "Orijen",
      logo: "/src/assets/b1 (4).png"
    }
  ];

  // Duplicate brands for seamless loop
  const duplicatedBrands = [...brands, ...brands];

  return (
    <>
      <style>{`
        .brand-marquee-section {
          padding: 30px 20px;
          background: transparent;
          width: 100%;
          position: relative;
          overflow: hidden;
        }

        .brand-marquee-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: -50%;
          width: 200%;
          height: 100%;
          background: linear-gradient(90deg, 
            transparent 0%, 
            rgba(18, 180, 49, 0.02) 25%, 
            rgba(59, 130, 246, 0.02) 50%, 
            rgba(18, 180, 49, 0.02) 75%, 
            transparent 100%
          );
          animation: shimmer 8s ease-in-out infinite;
        }

        .brand-marquee-container {
          max-width: 1400px;
          margin: 0 auto;
          position: relative;
          z-index: 2;
        }

        .brand-marquee-header {
          text-align: center;
          margin-bottom: 60px;
          position: relative;
        }

        .brand-marquee-header::after {
          content: '';
          position: absolute;
          bottom: -20px;
          left: 50%;
          transform: translateX(-50%);
          width: 80px;
          height: 4px;
          background: linear-gradient(90deg, #12b431, #3b82f6);
          border-radius: 2px;
        }

        .brand-marquee-title {
          font-size: 2.5rem;
          font-weight: 800;
          color: #1f2937;
          margin-bottom: 10px;
          background: linear-gradient(135deg, #12b431, #3b82f6, #16a34a);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          letter-spacing: -0.02em;
        }

        .brand-marquee-subtitle {
          font-size: 1.1rem;
          color: #6b7280;
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.6;
          font-weight: 400;
        }

        .marquee-wrapper {
          position: relative;
          overflow: hidden;
          background: transparent;
          padding: 40px 0;
        }


        .marquee-content {
          display: flex;
          align-items: center;
          gap: 80px;
          animation: marqueeScroll 30s linear infinite;
          width: fit-content;
        }

        .marquee-content:hover {
          animation-play-state: paused;
        }

        .brand-item {
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 200px;
          height: 120px;
          position: relative;
          overflow: hidden;
        }

        .brand-item::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, 
            transparent 0%, 
            rgba(255, 255, 255, 0.4) 50%, 
            transparent 100%
          );
          transition: left 0.5s ease;
        }

        .brand-item:hover::before {
          left: 100%;
        }

        .brand-item:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
          border-color: #e5e7eb;
          background: white;
        }

        .brand-logo {
          max-width: 400px;
          max-height: 150px;
          object-fit: contain;
          transition: all 0.3s ease;
        }

        .brand-item:hover .brand-logo {
          transform: scale(1.05);
        }

        
        @keyframes marqueeScroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @keyframes shimmer {
          0%, 100% {
            transform: translateX(0);
          }
          50% {
            transform: translateX(25%);
          }
        }

        @media (max-width: 968px) {
          .brand-marquee-section {
            padding: 40px 16px;
          }

          .brand-marquee-title {
            font-size: 2rem;
          }

          .brand-item {
            width: 140px;
            height: 70px;
          }

          .brand-logo {
            max-width: 100px;
            max-height: 50px;
          }

          .marquee-content {
            gap: 60px;
          }
        }

        @media (max-width: 768px) {
          .brand-marquee-title {
            font-size: 1.75rem;
          }

          .brand-item {
            width: 120px;
            height: 60px;
          }

          .brand-logo {
            max-width: 80px;
            max-height: 40px;
          }

          .marquee-content {
            gap: 40px;
          }

          .marquee-wrapper {
            padding: 30px 0;
          }
        }

        @media (max-width: 480px) {
          .brand-item {
            width: 100px;
            height: 50px;
          }

          .brand-logo {
            max-width: 70px;
            max-height: 35px;
          }

          .marquee-content {
            gap: 30px;
          }
        }
      `}</style>

      <div className="brand-marquee-section">
        <div className="brand-marquee-container">
         
          
          <div className="marquee-wrapper">
            <div className="marquee-content">
              {duplicatedBrands.map((brand, index) => (
                <div key={`${brand.id}-${index}`} className="brand-item">
                  <img
                    className="brand-logo"
                    src={brand.logo}
                    alt={brand.name}
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.parentNode.innerHTML = `<div class="brand-placeholder">${brand.name}</div>`;
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BrandMarquee;