import React from 'react';
import { ArrowLeft, RefreshCw, CheckCircle2, Clock, CreditCard, AlertCircle, MessageCircle, HelpCircle } from 'lucide-react';

const RefundPolicy = ({ onNavigate }) => {
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
          color: #0ea5e9;
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
          background: linear-gradient(135deg, #f0f9ff, #e0f2fe);
          color: #0369a1;
          padding: 16px 20px;
          border-radius: 12px;
          border-left: 4px solid #0ea5e9;
          margin: 20px 0;
          font-weight: 500;
        }

        .timeline-box {
          background: linear-gradient(135deg, #f0fdf4, #dcfce7);
          padding: 20px;
          border-radius: 12px;
          border-left: 4px solid #22c55e;
          margin: 20px 0;
        }

        .timeline-item {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 12px;
          font-weight: 500;
          color: #059669;
        }

        .timeline-number {
          background: #22c55e;
          color: white;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.8rem;
          font-weight: 700;
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
            <h1 className="policy-title">Refund Policy</h1>
            <p className="policy-subtitle">Last updated: January 2024</p>
          </div>

          <div className="policy-body">
            <div className="highlight">
              We stand behind our products and offer fair refunds when our return policy conditions are met.
            </div>

            <div className="section">
              <h2 className="section-title">
                <CheckCircle2 className="section-icon" size={24} />
                Refund Eligibility
              </h2>
              <p className="section-text">
                Refunds are available for returned items that meet our return policy requirements within 30 days of purchase.
              </p>
            </div>

            <div className="section">
              <h2 className="section-title">
                <Clock className="section-icon" size={24} />
                Refund Timeline
              </h2>
              <div className="timeline-box">
                <div className="timeline-item">
                  <div className="timeline-number">1</div>
                  <span>Return initiated and items shipped back</span>
                </div>
                <div className="timeline-item">
                  <div className="timeline-number">2</div>
                  <span>Items received and inspected (2-3 business days)</span>
                </div>
                <div className="timeline-item">
                  <div className="timeline-number">3</div>
                  <span>Refund approved and processed (1-2 business days)</span>
                </div>
                <div className="timeline-item">
                  <div className="timeline-number">4</div>
                  <span>Refund appears in your account (5-10 business days as per RBI guidelines)</span>
                </div>
              </div>
            </div>

            <div className="section">
              <h2 className="section-title">
                <CreditCard className="section-icon" size={24} />
                Refund Methods
              </h2>
              <p className="section-text">
                Refunds will be issued using the same payment method used for the original purchase:
              </p>
              <ul className="section-list">
                <li>Credit/Debit Cards: 5-7 business days</li>
                <li>UPI/Net Banking: 2-4 business days</li>
                <li>Bank Transfer/NEFT: 3-5 business days</li>
                <li>Store Credit: Immediate (for exchanges)</li>
                <li>Cash on Delivery: Bank transfer within 7-10 business days</li>
              </ul>
            </div>

            <div className="section">
              <h2 className="section-title">
                <RefreshCw className="section-icon" size={24} />
                Partial Refunds
              </h2>
              <p className="section-text">
                Partial refunds may be issued for:
              </p>
              <ul className="section-list">
                <li>Items with minor damage upon return</li>
                <li>Items returned after 30 days but within 60 days</li>
                <li>Items missing original packaging (deduction applies)</li>
              </ul>
            </div>

            <div className="section">
              <h2 className="section-title">
                <AlertCircle className="section-icon" size={24} />
                Non-Refundable Items
              </h2>
              <ul className="section-list">
                <li>Opened or used feed products (for safety reasons)</li>
                <li>Custom or special-order items</li>
                <li>Gift cards and promotional items</li>
                <li>Shipping and handling fees (unless our error)</li>
              </ul>
            </div>

            <div className="section">
              <h2 className="section-title">
                <MessageCircle className="section-icon" size={24} />
                Refund Disputes
              </h2>
              <p className="section-text">
                If you disagree with a refund decision, please contact our customer service team within 14 days. We will review your case and work toward a fair resolution.
              </p>
            </div>

            <div className="contact-info">
              <h3 className="section-title">
                <HelpCircle className="section-icon" size={20} />
                Questions About Refunds?
              </h3>
              <p className="section-text">
                Our customer service team is here to help:
                <br />
                Email: refunds@feedora.com
                <br />
                Phone: +91 98765 43210
                <br />
                Live Chat: Available on our website
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RefundPolicy;