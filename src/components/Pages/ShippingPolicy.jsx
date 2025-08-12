import React from 'react';
import { ArrowLeft, Truck, Clock, MapPin, Package2, Search, AlertTriangle, HelpCircle } from 'lucide-react';

const ShippingPolicy = ({ onNavigate }) => {
  return (
    <>
      <style jsx>{`
        .policy-container {
          min-height: 100vh;
          background: #fafbfc;
          font-family: 'Inter', 'Segoe UI', 'Roboto', 'Helvetica Neue', sans-serif;
        }

        .policy-content {
          max-width: 1400px;
          margin: 0 auto;
          padding: 40px 32px;
        }

        .back-button {
          display: flex;
          align-items: center;
          gap: 8px;
          background: none;
          border: none;
          color: #64748b;
          cursor: pointer;
          font-size: 0.95rem;
          font-weight: 500;
          padding: 8px 12px;
          border-radius: 8px;
          transition: all 0.3s ease;
          margin-bottom: 32px;
        }

        .back-button:hover {
          background: #f1f5f9;
          color: #12b431;
          transform: translateX(-2px);
        }

        .policy-header {
          margin-bottom: 40px;
          text-align: center;
        }

        .policy-title {
          font-size: 3rem;
          font-weight: 800;
          color: #111827;
          margin-bottom: 12px;
          letter-spacing: -0.02em;
        }

        .policy-subtitle {
          font-size: 1.1rem;
          color: #64748b;
          font-weight: 400;
        }

        .policy-body {
          background: white;
          border-radius: 16px;
          padding: 50px 60px;
          box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
          border: 1px solid #f1f5f9;
        }

        .section {
          margin-bottom: 40px;
        }

        .section-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: #111827;
          margin-bottom: 20px;
          letter-spacing: -0.01em;
          display: flex;
          align-items: center;
          gap: 12px;
        }
        
        .section-icon {
          color: #10b981;
        }

        .section-text {
          font-size: 1.1rem;
          color: #475569;
          line-height: 1.7;
          margin-bottom: 20px;
        }

        .section-list {
          margin: 16px 0;
          padding-left: 20px;
        }

        .section-list li {
          font-size: 1rem;
          color: #475569;
          line-height: 1.7;
          margin-bottom: 8px;
        }

        .highlight {
          background: linear-gradient(135deg, #ecfdf5, #d1fae5);
          color: #059669;
          padding: 16px 20px;
          border-radius: 12px;
          border-left: 4px solid #10b981;
          margin: 20px 0;
          font-weight: 500;
        }

        .shipping-table {
          background: #f8fafc;
          border-radius: 12px;
          padding: 24px;
          margin: 20px 0;
          border: 1px solid #e2e8f0;
        }

        .table-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 0;
          border-bottom: 1px solid #e2e8f0;
          font-size: 1rem;
        }

        .table-row:last-child {
          border-bottom: none;
        }

        .table-header {
          font-weight: 700;
          color: #374151;
          background: #f1f5f9;
          padding: 16px;
          margin: -24px -24px 16px -24px;
          border-radius: 12px 12px 0 0;
          text-align: center;
        }

        .price {
          font-weight: 600;
          color: #12b431;
        }

        .contact-info {
          background: #f8fafc;
          padding: 24px;
          border-radius: 12px;
          margin-top: 32px;
          border: 1px solid #e2e8f0;
        }

        @media (max-width: 768px) {
          .policy-content {
            padding: 24px 20px;
          }

          .policy-title {
            font-size: 2.2rem;
          }

          .policy-body {
            padding: 30px 25px;
          }

          .section-title {
            font-size: 1.2rem;
          }

          .table-row {
            flex-direction: column;
            text-align: center;
            gap: 8px;
          }
        }
      `}</style>

      <div className="policy-container">
        <div className="policy-content">
          <button 
            className="back-button"
            onClick={() => onNavigate('home')}
          >
            <ArrowLeft size={18} />
            Back to Home
          </button>

          <div className="policy-header">
            <h1 className="policy-title">Shipping Policy</h1>
            <p className="policy-subtitle">Last updated: January 2024</p>
          </div>

          <div className="policy-body">
            <div className="highlight">
              We offer reliable shipping options to get your feed products delivered safely and on time.
            </div>

            <div className="section">
              <h2 className="section-title">
                <Truck className="section-icon" size={24} />
                Shipping Options & Rates
              </h2>
              <div className="shipping-table">
                <div className="table-header">Domestic Shipping (All India)</div>
                <div className="table-row">
                  <span>Standard Shipping (5-7 business days)</span>
                  <span className="price">₹99</span>
                </div>
                <div className="table-row">
                  <span>Express Shipping (2-3 business days)</span>
                  <span className="price">₹199</span>
                </div>
                <div className="table-row">
                  <span>Same Day Delivery (Metro Cities)</span>
                  <span className="price">₹299</span>
                </div>
                <div className="table-row">
                  <span>Free Standard Shipping</span>
                  <span className="price">Orders ₹2,500+</span>
                </div>
              </div>
            </div>

            <div className="section">
              <h2 className="section-title">
                <Clock className="section-icon" size={24} />
                Processing Time
              </h2>
              <p className="section-text">
                Orders are typically processed within 1-2 business days. During peak seasons, festivals, or high-demand periods, processing may take up to 3 business days.
              </p>
              <ul className="section-list">
                <li>Orders placed before 2 PM IST ship the same day</li>
                <li>Orders placed after 2 PM IST ship the next business day</li>
                <li>Weekend orders are processed on Monday</li>
              </ul>
            </div>

            <div className="section">
              <h2 className="section-title">
                <MapPin className="section-icon" size={24} />
                Delivery Areas
              </h2>
              <p className="section-text">
                We currently ship to:
              </p>
              <ul className="section-list">
                <li>All 28 Indian states and 8 union territories</li>
                <li>Remote areas in Northeast and Kashmir (additional 2-3 days)</li>
                <li>Andaman & Nicobar Islands (additional charges apply)</li>
                <li>International shipping to SAARC countries on request</li>
              </ul>
            </div>

            <div className="section">
              <h2 className="section-title">
                <Package2 className="section-icon" size={24} />
                Special Handling
              </h2>
              <p className="section-text">
                Certain products require special handling:
              </p>
              <ul className="section-list">
                <li>Perishable items shipped with temperature control</li>
                <li>Liquid supplements require ground shipping only</li>
                <li>Bulk orders (over 200 kg) via freight shipping</li>
                <li>Hazardous materials follow BIS and transport regulations</li>
              </ul>
            </div>

            <div className="section">
              <h2 className="section-title">
                <Search className="section-icon" size={24} />
                Order Tracking
              </h2>
              <p className="section-text">
                Once your order ships, you'll receive:
              </p>
              <ul className="section-list">
                <li>Email confirmation with tracking number</li>
                <li>SMS updates (if opted in)</li>
                <li>Real-time tracking through our website</li>
                <li>Delivery confirmation</li>
              </ul>
            </div>

            <div className="section">
              <h2 className="section-title">
                <AlertTriangle className="section-icon" size={24} />
                Delivery Issues
              </h2>
              <p className="section-text">
                If you experience delivery problems:
              </p>
              <ul className="section-list">
                <li>Check with neighbors and building management</li>
                <li>Verify shipping address accuracy</li>
                <li>Contact us within 48 hours of expected delivery</li>
                <li>We'll work with carriers to resolve issues quickly</li>
              </ul>
            </div>

            <div className="section">
              <h2 className="section-title">
                <Package2 className="section-icon" size={24} />
                Damaged Packages
              </h2>
              <p className="section-text">
                If your package arrives damaged, please:
              </p>
              <ul className="section-list">
                <li>Take photos of the package and contents</li>
                <li>Keep all packaging materials</li>
                <li>Contact us immediately</li>
                <li>We'll arrange replacement or refund</li>
              </ul>
            </div>

            <div className="contact-info">
              <h3 className="section-title">
                <HelpCircle className="section-icon" size={20} />
                Shipping Questions?
              </h3>
              <p className="section-text">
                Need help with your shipment?
                <br />
                Email: shipping@feedora.com
                <br />
                Phone: +91 98765 43210
                <br />
                Track your order: feedora.com/track-order
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShippingPolicy;