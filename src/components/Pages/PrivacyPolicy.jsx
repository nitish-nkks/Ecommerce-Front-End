import React from 'react';
import { ArrowLeft, Shield, Eye, Lock, Users, Phone, Mail } from 'lucide-react';

const PrivacyPolicy = ({ onNavigate }) => {
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
          color: #12b431;
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
          background: linear-gradient(135deg, #dcfce7, #bbf7d0);
          color: #059669;
          padding: 16px 20px;
          border-radius: 12px;
          border-left: 4px solid #12b431;
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
            <h1 className="policy-title">Privacy Policy</h1>
            <p className="policy-subtitle">Last updated: January 2024</p>
          </div>

          <div className="policy-body">
            <div className="highlight">
              At Feedora, we are committed to protecting your privacy and ensuring the security of your personal information.
            </div>

            <div className="section">
              <h2 className="section-title">
                <Eye className="section-icon" size={24} />
                Information We Collect
              </h2>
              <p className="section-text">
                We collect information you provide directly to us, such as when you create an account, make a purchase, or contact us for support.
              </p>
              <ul className="section-list">
                <li>Personal information (name, email, phone number)</li>
                <li>Billing and shipping addresses</li>
                <li>Payment information (processed securely through third-party providers)</li>
                <li>Order history and preferences</li>
              </ul>
            </div>

            <div className="section">
              <h2 className="section-title">
                <Users className="section-icon" size={24} />
                How We Use Your Information
              </h2>
              <p className="section-text">
                Your information helps us provide better services and improve your experience:
              </p>
              <ul className="section-list">
                <li>Process and fulfill your orders</li>
                <li>Provide customer support</li>
                <li>Send important updates about your orders</li>
                <li>Improve our products and services</li>
                <li>Comply with legal obligations</li>
              </ul>
            </div>

            <div className="section">
              <h2 className="section-title">
                <Lock className="section-icon" size={24} />
                Information Security
              </h2>
              <p className="section-text">
                We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
              </p>
            </div>

            <div className="section">
              <h2 className="section-title">
                <Shield className="section-icon" size={24} />
                Third-Party Sharing
              </h2>
              <p className="section-text">
                We do not sell, trade, or rent your personal information to third parties. We may share information with trusted service providers who assist us in operating our business, subject to confidentiality agreements.
              </p>
            </div>

            <div className="section">
              <h2 className="section-title">
                <Users className="section-icon" size={24} />
                Your Rights
              </h2>
              <p className="section-text">
                You have the right to access, update, or delete your personal information. Contact us if you wish to exercise these rights.
              </p>
            </div>

            <div className="contact-info">
              <h3 className="section-title">
                <Mail className="section-icon" size={20} />
                Contact Us
              </h3>
              <p className="section-text">
                If you have questions about this Privacy Policy, please contact us at:
                <br />
                Email: privacy@feedora.com
                <br />
                Phone: +91 98765 43210
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicy;