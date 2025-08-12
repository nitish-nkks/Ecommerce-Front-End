import React from 'react';
import { ArrowLeft, FileText, Package, CreditCard, UserCheck, AlertTriangle, Scale, Mail } from 'lucide-react';

const TermsOfService = ({ onNavigate }) => {
  return (
    <>
      <style jsx>{`
        .policy-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #037f35 0%, #0da432 100%);
          font-family: 'Inter', 'Segoe UI', 'Roboto', 'Helvetica Neue', sans-serif;
          position: relative;
          overflow-x: hidden;
        }

        .policy-container::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E") repeat;
          z-index: 1;
        }

        .policy-content {
          max-width: 1400px;
          margin: 0 auto;
          padding: 40px 32px;
          position: relative;
          z-index: 2;
        }

        .back-button {
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(255, 255, 255, 0.15);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: white;
          cursor: pointer;
          font-size: 0.95rem;
          font-weight: 500;
          padding: 12px 20px;
          border-radius: 25px;
          transition: all 0.3s ease;
          margin-bottom: 32px;
        }

        .back-button:hover {
          background: rgba(255, 255, 255, 0.25);
          color: #ffffff;
          transform: translateX(-3px) translateY(-1px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
        }

        .policy-header {
          margin-bottom: 50px;
          text-align: center;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(15px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 24px;
          padding: 40px 30px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
        }

        .policy-title {
          font-size: 3.5rem;
          font-weight: 900;
          color: #ffffff;
          margin-bottom: 15px;
          letter-spacing: -0.02em;
          text-shadow: 0 2px 20px rgba(0, 0, 0, 0.3);
          background: linear-gradient(135deg, #ffffff 0%, #e0e7ff 100%);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .policy-subtitle {
          font-size: 1.2rem;
          color: rgba(255, 255, 255, 0.8);
          font-weight: 500;
          text-shadow: 0 1px 10px rgba(0, 0, 0, 0.2);
        }

        .policy-body {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border-radius: 24px;
          padding: 60px 70px;
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
          border: 1px solid rgba(255, 255, 255, 0.3);
          position: relative;
          overflow: hidden;
        }

        .policy-body::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, #667eea, #764ba2, #f093fb, #f5576c, #4facfe, #00f2fe);
          background-size: 400% 400%;
          animation: gradientShift 8s ease infinite;
        }

        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .section {
          margin-bottom: 45px;
          background: rgba(255, 255, 255, 0.6);
          border-radius: 20px;
          padding: 30px;
          border: 1px solid rgba(255, 255, 255, 0.3);
          backdrop-filter: blur(10px);
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .section:hover {
          transform: translateY(-2px);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
          background: rgba(255, 255, 255, 0.8);
        }

        .section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 2px;
          background: linear-gradient(90deg, #667eea, #764ba2);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .section:hover::before {
          opacity: 1;
        }

        .section-title {
          font-size: 1.6rem;
          font-weight: 700;
          color: #1a202c;
          margin-bottom: 20px;
          letter-spacing: -0.01em;
          display: flex;
          align-items: center;
          gap: 15px;
        }
        
        .section-icon {
          color: #667eea;
          background: rgba(102, 126, 234, 0.1);
          padding: 8px;
          border-radius: 12px;
          transition: all 0.3s ease;
        }

        .section:hover .section-icon {
          transform: rotate(5deg) scale(1.1);
          background: rgba(102, 126, 234, 0.2);
        }

        .section-text {
          font-size: 1.15rem;
          color: #2d3748;
          line-height: 1.8;
          margin-bottom: 20px;
          font-weight: 400;
        }

        .section-list {
          margin: 20px 0;
          padding-left: 0;
          list-style: none;
        }

        .section-list li {
          font-size: 1.05rem;
          color: #2d3748;
          line-height: 1.7;
          margin-bottom: 12px;
          padding-left: 30px;
          position: relative;
          transition: all 0.2s ease;
        }

        .section-list li::before {
          content: '✓';
          position: absolute;
          left: 0;
          color: #667eea;
          font-weight: bold;
          font-size: 1.1rem;
          background: rgba(102, 126, 234, 0.1);
          width: 20px;
          height: 20px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.8rem;
        }

        .section-list li:hover {
          color: #1a202c;
          transform: translateX(5px);
        }

        .highlight {
          background: linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1));
          color: #1a202c;
          padding: 25px 30px;
          border-radius: 20px;
          border: 2px solid rgba(102, 126, 234, 0.3);
          margin: 30px 0;
          font-weight: 500;
          font-size: 1.1rem;
          position: relative;
          backdrop-filter: blur(10px);
          box-shadow: 0 8px 25px rgba(102, 126, 234, 0.15);
        }

        .highlight::before {
          content: '💡';
          position: absolute;
          top: -10px;
          left: 25px;
          background: white;
          padding: 5px 10px;
          border-radius: 15px;
          font-size: 1.2rem;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        }

        .contact-info {
          background: linear-gradient(135deg, rgba(102, 126, 234, 0.05), rgba(118, 75, 162, 0.05));
          padding: 35px;
          border-radius: 24px;
          margin-top: 40px;
          border: 1px solid rgba(102, 126, 234, 0.2);
          backdrop-filter: blur(10px);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.08);
          position: relative;
          overflow: hidden;
        }

        .contact-info::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: linear-gradient(90deg, #667eea, #764ba2);
        }

        @media (max-width: 768px) {
          .policy-content {
            padding: 24px 20px;
          }

          .policy-title {
            font-size: 2.5rem;
          }

          .policy-header {
            padding: 30px 20px;
          }

          .policy-body {
            padding: 40px 30px;
          }

          .section {
            padding: 25px 20px;
          }

          .section-title {
            font-size: 1.3rem;
            gap: 10px;
          }

          .section-icon {
            padding: 6px;
          }

          .back-button {
            padding: 10px 16px;
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
            <h1 className="policy-title">Terms of Service</h1>
            <p className="policy-subtitle">Last updated: January 2024</p>
          </div>

          <div className="policy-body">
            <div className="highlight">
              By using Feedora's services, you agree to these terms. Please read them carefully.
            </div>

            <div className="section">
              <h2 className="section-title">
                <FileText className="section-icon" size={24} />
                Acceptance of Terms
              </h2>
              <p className="section-text">
                By accessing and using Feedora's website and services, you accept and agree to be bound by the terms and provision of this agreement.
              </p>
            </div>

            <div className="section">
              <h2 className="section-title">
                <Package className="section-icon" size={24} />
                Products and Services
              </h2>
              <p className="section-text">
                Feedora provides high-quality animal feed and nutrition products. We reserve the right to:
              </p>
              <ul className="section-list">
                <li>Modify or discontinue products without prior notice</li>
                <li>Limit quantities of products available for purchase</li>
                <li>Refuse service to anyone at our sole discretion</li>
                <li>Update prices and product information at any time</li>
              </ul>
            </div>

            <div className="section">
              <h2 className="section-title">
                <CreditCard className="section-icon" size={24} />
                Orders and Payment
              </h2>
              <p className="section-text">
                All orders are subject to acceptance and availability. Payment must be received before products are shipped. We accept major credit cards and other specified payment methods.
              </p>
            </div>

            <div className="section">
              <h2 className="section-title">
                <UserCheck className="section-icon" size={24} />
                User Responsibilities
              </h2>
              <ul className="section-list">
                <li>Provide accurate and complete information</li>
                <li>Use products only for their intended purposes</li>
                <li>Follow all applicable laws and regulations</li>
                <li>Not misuse our website or services</li>
              </ul>
            </div>

            <div className="section">
              <h2 className="section-title">
                <AlertTriangle className="section-icon" size={24} />
                Limitation of Liability
              </h2>
              <p className="section-text">
                Feedora shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of our products or services.
              </p>
            </div>

            <div className="section">
              <h2 className="section-title">
                <Scale className="section-icon" size={24} />
                Governing Law
              </h2>
              <p className="section-text">
                These terms shall be governed by and construed in accordance with the laws of India and subject to the jurisdiction of Indian courts.
              </p>
            </div>

            <div className="contact-info">
              <h3 className="section-title">
                <Mail className="section-icon" size={20} />
                Contact Us
              </h3>
              <p className="section-text">
                For questions about these Terms of Service, contact us at:
                <br />
                Email: legal@feedora.com
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

export default TermsOfService;