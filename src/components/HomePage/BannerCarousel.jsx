import React, { useState, useEffect } from 'react';

const BannerCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const bannerImages = [
    {
      id: 1,
      src: "/src/assets/scb1.png",
      alt: "Fish Feed Banner",
      title: "Premium Fish Feed Solutions"
    },
    {
      id: 2,
      src: "/src/assets/scb2.png", 
      alt: "Cattle Feed Banner",
      title: "Quality Cattle Nutrition"
    },
    {
      id: 3,
      src: "/src/assets/scb3.png",
      alt: "Poultry Feed Banner", 
      title: "Advanced Poultry Feed"
    },
    {
      id: 4,
      src: "/src/assets/scb4.png",
      alt: "Animal Health Banner",
      title: "Complete Animal Health Solutions"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => 
        prevSlide === bannerImages.length - 1 ? 0 : prevSlide + 1
      );
    }, 4000);

    return () => clearInterval(timer);
  }, [bannerImages.length]);

  const goToSlide = (slideIndex) => {
    setCurrentSlide(slideIndex);
  };

  const goToPrevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? bannerImages.length - 1 : currentSlide - 1);
  };

  const goToNextSlide = () => {
    setCurrentSlide(currentSlide === bannerImages.length - 1 ? 0 : currentSlide + 1);
  };

  return (
    <>
      <style>{`
        .banner-scroller {
          position: relative;
          width: 100%;
          height: 200px;
          overflow: hidden;
          background: #f1f5f9;
        }

        .banner-wrapper {
          display: flex;
          width: ${bannerImages.length * 100}%;
          height: 100%;
          transform: translateX(-${currentSlide * (100 / bannerImages.length)}%);
          transition: transform 0.8s ease-in-out;
        }

        .banner-slide {
          width: ${100 / bannerImages.length}%;
          height: 100%;
          position: relative;
          flex-shrink: 0;
        }

        .banner-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .banner-placeholder {
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #3b82f6 0%, #1e40af 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 1.5rem;
          font-weight: 600;
          text-align: center;
          padding: 20px;
        }

        .banner-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: linear-gradient(transparent, rgba(0, 0, 0, 0.6));
          color: white;
          padding: 30px 40px 20px;
          text-align: left;
        }

        .banner-title {
          font-size: 1.8rem;
          font-weight: 700;
          margin-bottom: 8px;
          text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }

        .banner-nav {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          background: rgba(255, 255, 255, 0.9);
          border: none;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
          color: #374151;
          transition: all 0.3s ease;
          z-index: 10;
        }

        .banner-nav:hover {
          background: white;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          transform: translateY(-50%) scale(1.1);
        }

        .banner-nav.prev {
          left: 20px;
        }

        .banner-nav.next {
          right: 20px;
        }

        .banner-dots {
          position: absolute;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 8px;
          background: rgba(150, 150, 150, 0.2);
          padding: 8px 12px;
          border-radius: 20px;
          backdrop-filter: blur(10px);
        }

        .banner-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.66);
          cursor: pointer;
          transition: all 0.3s ease;
          border: none;
        }

        .banner-dot.active {
          background: #f9f225;
          transform: scale(1.2);
        }

        .banner-dot:hover {
          background: rgba(255, 255, 255, 0.8);
        }

        @media (max-width: 968px) {
          .banner-scroller {
            height: 250px;
          }
        }

        @media (max-width: 768px) {
          .banner-scroller {
            height: 220px;
          }

          .banner-title {
            font-size: 1.3rem;
          }

          .banner-overlay {
            padding: 20px;
          }

          .banner-nav {
            width: 40px;
            height: 40px;
            font-size: 1rem;
          }

          .banner-nav.prev {
            left: 10px;
          }

          .banner-nav.next {
            right: 10px;
          }
        }

        @media (max-width: 480px) {
          .banner-scroller {
            height: 180px;
          }

          .banner-title {
            font-size: 1.1rem;
          }
        }
      `}</style>

      <div className="banner-scroller">
        <div className="banner-wrapper">
          {bannerImages.map((banner, index) => (
            <div key={banner.id} className="banner-slide">
              <img
                src={banner.src}
                alt={banner.alt}
                className="banner-image"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.parentNode.innerHTML = `<div class="banner-placeholder">${banner.title}</div>`;
                }}
              />
              <div className="banner-overlay">
                <h2 className="banner-title">{banner.title}</h2>
              </div>
            </div>
          ))}
        </div>

        <button className="banner-nav prev" onClick={goToPrevSlide}>
          ‹
        </button>
        <button className="banner-nav next" onClick={goToNextSlide}>
          ›
        </button>

        <div className="banner-dots">
          {bannerImages.map((_, index) => (
            <button
              key={index}
              className={`banner-dot ${currentSlide === index ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default BannerCarousel;