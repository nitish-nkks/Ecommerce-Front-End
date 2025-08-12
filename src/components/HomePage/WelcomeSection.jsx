import React from 'react';

const WelcomeSection = () => {
  return (
    <>
      <style>{`
        .content-section {
          padding: 10px 20px;
          max-width: 1200px;
          margin: 0 auto;
          text-align: center;
        }

        .welcome-section {
          margin-bottom: 60px;
        }

        .welcome-title {
          font-size: 2.5rem;
          font-weight: 800;
          color: #1f2937;
          margin-bottom: 16px;
          background: linear-gradient(135deg, #12b431, #0ea025);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .welcome-subtitle {
          font-size: 1.2rem;
          color: #6b7280;
          max-width: 600px;
          margin: 0 auto 24px;
          line-height: 1.6;
        }

        .cta-button {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: linear-gradient(135deg, #12b431, #0b741bff);
          color: white;
          padding: 14px 28px;
          border-radius: 12px;
          text-decoration: none;
          font-weight: 600;
          font-size: 1rem;
          transition: all 0.3s ease;
          border: none;
          cursor: pointer;
        }

        .cta-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 16px rgba(18, 180, 49, 0.3);
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 24px;
          margin-top: 40px;
        }

        .stat-card {
          background: white;
          padding: 24px;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
          border: 1px solid #e5e7eb;
          transition: transform 0.3s ease;
        }

        .stat-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
        }

        .stat-number {
          font-size: 2rem;
          font-weight: 800;
          color: #12b431;
          margin-bottom: 4px;
        }

        .stat-label {
          color: #6b7280;
          font-weight: 500;
        }

        @media (max-width: 768px) {
          .welcome-title {
            font-size: 2rem;
          }

          .welcome-subtitle {
            font-size: 1rem;
          }

          .content-section {
            padding: 40px 16px;
          }

          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 16px;
          }
        }

        @media (max-width: 480px) {
          .stats-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div className="content-section">
        <div className="welcome-section">
          <p className="welcome-subtitle">
            Your trusted partner in premium livestock nutrition. We provide high-quality feed 
            solutions for poultry, fish, cattle, and other farm animals to ensure optimal 
            health and productivity.
          </p>
          <button className="cta-button">
            Explore Our Products
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <polyline points="9,18 15,12 9,6"></polyline>
            </svg>
          </button>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-number">50K+</div>
            <div className="stat-label">Happy Farmers</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">200+</div>
            <div className="stat-label">Feed Products</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">15+</div>
            <div className="stat-label">Years Experience</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">98%</div>
            <div className="stat-label">Success Rate</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WelcomeSection;