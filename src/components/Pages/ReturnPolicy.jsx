import React from 'react';
import { ArrowLeft, RotateCcw, CheckCircle, XCircle, Package, Clock, Truck, HelpCircle } from 'lucide-react';

const ReturnPolicy = ({ onNavigate }) => {
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
          color: #3b82f6;
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
          background: linear-gradient(135deg, #dbeafe, #bfdbfe);
          color: #1d4ed8;
          padding: 16px 20px;
          border-radius: 12px;
          border-left: 4px solid #3b82f6;
          margin: 20px 0;
          font-weight: 500;
        }

        .warning-box {
          background: linear-gradient(135deg, #fef2f2, #fecaca);
          color: #dc2626;
          padding: 16px 20px;
          border-radius: 12px;
          border-left: 4px solid #ef4444;
          margin: 20px 0;
          font-weight: 500;
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
            <h1 className="policy-title">Return Policy</h1>
            <p className="policy-subtitle">Last updated: January 2024</p>
          </div>

          <div className="policy-body">
            <div className="highlight">
              We want you to be completely satisfied with your Feedora purchase. Review our return policy below.
            </div>

            <div className="section">
              <h2 className="section-title">
                <Clock className="section-icon" size={24} />
                Return Window
              </h2>
              <p className="section-text">
                Items may be returned within <strong>30 days</strong> of delivery for a full refund, provided they meet our return conditions.
              </p>
            </div>

            <div className="section">
              <h2 className="section-title">
                <CheckCircle className="section-icon" size={24} />
                Eligible Items
              </h2>
              <p className="section-text">
                The following items are eligible for return:
              </p>
              <ul className="section-list">
                <li>Unopened feed packages in original packaging</li>
                <li>Unused supplements and medications</li>
                <li>Equipment and accessories in original condition</li>
                <li>Items with manufacturing defects</li>
              </ul>
            </div>

            <div className="section">
              <h2 className="section-title">
                <XCircle className="section-icon" size={24} />
                Non-Returnable Items
              </h2>
              <div className="warning-box">
                For safety and health reasons, certain items cannot be returned.
              </div>
              <ul className="section-list">
                <li>Opened or used feed products</li>
                <li>Perishable items past expiration date</li>
                <li>Custom or special-order products</li>
                <li>Items damaged by misuse or normal wear</li>
              </ul>
            </div>

            <div className="section">
              <h2 className="section-title">
                <Package className="section-icon" size={24} />
                Return Process
              </h2>
              <p className="section-text">
                To initiate a return:
              </p>
              <ul className="section-list">
                <li>Contact our customer service team</li>
                <li>Provide your order number and reason for return</li>
                <li>Receive return authorization and shipping label</li>
                <li>Package items securely in original packaging</li>
                <li>Ship items using provided return label</li>
              </ul>
            </div>

            <div className="section">
              <h2 className="section-title">
                <RotateCcw className="section-icon" size={24} />
                Processing Time
              </h2>
              <p className="section-text">
                Once we receive your returned items, please allow 5-7 business days for inspection and processing. Refunds will be issued to the original payment method within 7-14 business days as per RBI guidelines.
              </p>
            </div>

            <div className="section">
              <h2 className="section-title">
                <Truck className="section-icon" size={24} />
                Return Shipping
              </h2>
              <p className="section-text">
                We provide prepaid return labels for defective items or our errors. For other returns, original shipping costs are non-refundable and return shipping is at customer's expense.
              </p>
            </div>

            <div className="contact-info">
              <h3 className="section-title">
                <HelpCircle className="section-icon" size={20} />
                Need Help?
              </h3>
              <p className="section-text">
                Contact our customer service team for return assistance:
                <br />
                Email: returns@feedora.com
                <br />
                Phone: +91 98765 43210
                <br />
                Hours: Monday-Friday, 9 AM - 6 PM IST
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReturnPolicy;