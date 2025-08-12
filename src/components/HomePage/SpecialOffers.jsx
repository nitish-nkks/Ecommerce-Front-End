import React from 'react';

const SpecialOffers = () => {
  return (
    <>
      <style>{`
        .special-offers-section {
          width: 100%;
          background: #f8fafc;
          padding: 32px 0 24px 0;
        }

        .special-offers-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 16px;
        }

        .special-offers-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 18px;
        }

        .special-offers-title {
          font-size: 2rem;
          font-weight: 800;
          color: #22223b;
          letter-spacing: -0.02em;
          border-bottom: 2px solid #c9c9c9;
          padding-bottom: 2px;
        }

        .special-offers-viewall {
          font-size: 1rem;
          color: #22223b;
          font-weight: 600;
          text-decoration: none;
          margin-left: 12px;
          transition: color 0.2s;
        }

        .special-offers-viewall:hover {
          color: #3b82f6;
        }

        .special-offers-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 18px;
        }

        .special-offer-card {
          background: white;
          border-radius: 12px;
          box-shadow: 0 4px 16px rgba(0,0,0,0.07);
          overflow: hidden;
          position: relative;
          display: flex;
          flex-direction: column;
          min-height: 320px;
          transition: box-shadow 0.3s;
        }

        .special-offer-card:hover {
          box-shadow: 0 8px 32px rgba(59,130,246,0.13);
        }

        .special-offer-badge {
          position: absolute;
          top: 18px;
          left: 18px;
          font-size: 1.3rem;
          font-weight: 700;
          padding: 8px 18px;
          border-radius: 8px;
          z-index: 2;
        }

        .special-offer-badge.blue {
          background: #38bdf8;
          color: #fff;
          box-shadow: 0 2px 8px rgba(56,189,248,0.13);
        }

        .special-offer-badge.green {
          background: #a3e635;
          color: #22223b;
          box-shadow: 0 2px 8px rgba(163,230,53,0.13);
        }

        .special-offer-badge.orange {
          background: #fb923c;
          color: #fff;
          box-shadow: 0 2px 8px rgba(251,146,60,0.13);
        }

        .special-offer-image {
          width: 100%;
          height: 100%;
          flex: 1;
          background: none;
          border-bottom: none;
          display: flex;
          align-items: stretch;
          justify-content: stretch;
          overflow: hidden;
        }

        .special-offer-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 0;
          display: block;
        }

        .special-offer-content {
          position: absolute;
          left: 0;
          bottom: 0;
          width: 100%;
          background: rgba(227,232,239,0.85);
          border-bottom-left-radius: 12px;
          border-bottom-right-radius: 12px;
          padding: 18px;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .special-offer-desc {
          font-size: 1.1rem;
          color: #22223b;
          font-weight: 600;
          margin-bottom: 16px;
        }

        .special-offer-btn {
          padding: 10px 24px;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: 700;
          border: none;
          cursor: pointer;
          transition: background 0.2s, color 0.2s;
          margin-bottom: 4px;
        }

        .special-offer-btn.blue {
          background: #2563eb;
          color: #fff;
        }

        .special-offer-btn.blue:hover {
          background: #1d4ed8;
        }

        .special-offer-btn.green {
          background: #a3e635;
          color: #22223b;
        }

        .special-offer-btn.green:hover {
          background: #84cc16;
        }

        .special-offer-btn.orange {
          background: #fb923c;
          color: #fff;
        }

        .special-offer-btn.orange:hover {
          background: #ea580c;
        }

        @media (max-width: 768px) {
          .special-offers-title {
            font-size: 1.3rem;
          }

          .special-offers-grid {
            grid-template-columns: 1fr 1fr;
            gap: 12px;
          }

          .special-offer-card {
            min-height: 220px;
          }

          .special-offer-content {
            padding: 12px;
          }

          .special-offer-badge {
            font-size: 1rem;
            padding: 6px 12px;
          }
        }

        @media (max-width: 480px) {
          .special-offers-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <div className="special-offers-section">
        <div className="special-offers-container">
          <div className="special-offers-header">
            <h2 className="special-offers-title">Special Deals</h2>
            <a href="#" className="special-offers-viewall">View All</a>
          </div>
          <div className="special-offers-grid">
            <div className="special-offer-card">
              <div className="special-offer-badge green">50% OFF</div>
              <div className="special-offer-image">
                <img src="/src/assets/scb2.png" alt="Poultry Feed" className="special-offer-img" />
              </div>
              <div className="special-offer-content">
                <div className="special-offer-desc">On All <b>Poultry Feed</b></div>
                <button className="special-offer-btn blue">BUY NOW</button>
              </div>
            </div>
            <div className="special-offer-card">
              <div className="special-offer-badge blue">UPTO 45% DISCOUNT</div>
              <div className="special-offer-image">
                <img src="/src/assets/scb4.png" alt="Cattle Medicine" className="special-offer-img" />
              </div>
              <div className="special-offer-content">
                <div className="special-offer-desc">On All <b>Cattle Medicine</b></div>
                <button className="special-offer-btn green">BUY NOW</button>
              </div>
            </div>
            <div className="special-offer-card">
              <div className="special-offer-badge green">Special Discount</div>
              <div className="special-offer-image">
                <img src="/src/assets/scb1.png" alt="Fish Feed" className="special-offer-img" />
              </div>
              <div className="special-offer-content">
                <div className="special-offer-desc">On Fish Feed</div>
                <button className="special-offer-btn orange">BUY NOW</button>
              </div>
            </div>
            <div className="special-offer-card">
              <div className="special-offer-badge blue">UPTO 45% DISCOUNT</div>
              <div className="special-offer-image">
                <img src="/src/assets/scb3.png" alt="Shrimp Medicine" className="special-offer-img" />
              </div>
              <div className="special-offer-content">
                <div className="special-offer-desc">On All <b>Shrimp Medicine</b></div>
                <button className="special-offer-btn blue">BUY NOW</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SpecialOffers;