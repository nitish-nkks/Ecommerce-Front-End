// src/components/OrderSuccessModal/OrderSuccessModal.jsx
import React, { useEffect, useState } from 'react';
import { CheckCircle, Package, Eye, Home } from 'lucide-react';

const OrderSuccessModal = ({ isOpen, onClose, orderData, onViewOrderHistory, onGoHome }) => {
  const REDIRECT_DELAY = 10; // seconds
  const [countdown, setCountdown] = useState(REDIRECT_DELAY);

  useEffect(() => {
    if (isOpen) {
      // Reset countdown on open
      setCountdown(REDIRECT_DELAY);

      // Auto redirect after the delay
      const redirectTimer = setTimeout(() => {
        onViewOrderHistory();
      }, REDIRECT_DELAY * 1000);

      // Update countdown display every second
      const countdownInterval = setInterval(() => {
        setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);

      // Cleanup timers when component unmounts or closes
      return () => {
        clearTimeout(redirectTimer);
        clearInterval(countdownInterval);
      };
    }
  }, [isOpen, onViewOrderHistory]);

  if (!isOpen) return null;

  return (
    <div className="order-success-overlay" onClick={onClose}>
      <style jsx>{`
        /* --- Base & Animations --- */
        .order-success-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.6);
          z-index: 10000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 16px;
          animation: fadeIn 0.3s ease-out;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideUp {
          from { 
            opacity: 0;
            transform: translateY(20px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes bounce {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }

        /* --- Modal Container --- */
        .success-modal {
          background: #ffffff;
          border-radius: 16px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          width: 100%;
          max-width: 460px; /* Reduced max-width for a more compact feel */
          overflow: hidden;
          animation: slideUp 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
        }
        
        /* --- Modal Header --- */
        .success-header {
          background: linear-gradient(135deg, #12b431 0%, #007337 100%);
          color: white;
          padding: 32px 24px;
          text-align: center;
        }

        .success-icon-wrapper {
          margin: 0 auto 16px;
          animation: bounce 0.5s ease-out 0.3s;
        }

        .success-icon {
          width: 64px; /* Slightly smaller icon */
          height: 64px;
          background: rgba(255, 255, 255, 0.15);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .success-title {
          font-size: 1.6rem;
          font-weight: 700;
          margin: 0 0 8px;
        }

        .success-message {
          font-size: 0.95rem;
          opacity: 0.9;
          line-height: 1.6;
        }
        
        /* --- Modal Body --- */
        .order-details-body {
          padding: 24px;
          background: #f8fafc; /* Lighter background for the body */
        }

        .order-info {
          background: #ffffff;
          border-radius: 12px;
          padding: 16px;
          margin-bottom: 20px;
          border-left: 5px solid #12b431;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        }

        .order-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px 0; /* Adjusted padding for better spacing */
        }
        
        .order-row:not(:last-child) {
            border-bottom: 1px solid #f1f5f9;
        }

        .order-label {
          color: #64748b;
          font-size: 0.9rem;
        }

        .order-value {
          color: #1e293b;
          font-weight: 600;
        }

        .order-total {
          color: #007337;
          font-size: 1.1rem;
          font-weight: 700;
        }

        /* --- Action Buttons --- */
        .action-buttons {
          display: flex;
          gap: 12px;
          margin-top: 16px;
        }

        .btn {
          flex: 1;
          padding: 12px 16px;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          font-size: 0.9rem;
          border: 1px solid transparent;
        }

        .btn-secondary {
          background: #ffffff;
          color: #475569;
          border-color: #e2e8f0;
        }

        .btn-secondary:hover {
          background: #f8fafc;
          border-color: #cbd5e1;
        }

        .btn-primary {
          background: #12b431;
          color: white;
        }

        .btn-primary:hover {
          transform: translateY(-2px);
          background: #007337;
          box-shadow: 0 4px 15px rgba(18, 180, 49, 0.3);
        }
        
        /* --- Countdown & Redirect Info --- */
        .countdown-timer {
          text-align: center;
          margin-top: 16px;
          color: #64748b;
          font-size: 0.85rem;
        }
        
        .countdown-timer span {
            font-weight: 700;
            color: #007337;
        }

        /* --- Responsive Design --- */
        @media (max-width: 640px) {
          .success-modal {
            margin: 0;
          }
          .success-header {
            padding: 24px 20px;
          }
          .success-title {
            font-size: 1.4rem;
          }
          .order-details-body {
            padding: 20px 16px;
          }
          .action-buttons {
            flex-direction: column;
          }
        }
      `}</style>

      {/* Clicks inside the modal won't close it */}
      <div className="success-modal" onClick={(e) => e.stopPropagation()}>
        <div className="success-header">
          <div className="success-icon-wrapper">
            <div className="success-icon">
              <CheckCircle size={32} strokeWidth={2.5} />
            </div>
          </div>
          <h2 className="success-title">Order Placed Successfully!</h2>
          <p className="success-message">
            Thank you! Your order is confirmed and will be processed shortly.
          </p>
        </div>

        <div className="order-details-body">
          <div className="order-info">
            <div className="order-row">
              <span className="order-label">Order ID</span>
              <span className="order-value">#{orderData?.orderId || Date.now().toString().slice(-6)}</span>
            </div>
            <div className="order-row">
              <span className="order-label">Items</span>
              <span className="order-value">{orderData?.itemCount || 0}</span>
            </div>
            <div className="order-row">
              <span className="order-label">Payment</span>
              <span className="order-value">{orderData?.paymentMethod === 'card' ? 'Card' : 'Cash on Delivery'}</span>
            </div>
            <div className="order-row">
              <span className="order-label">Total Amount</span>
              <span className="order-value order-total">₹{orderData?.total?.toFixed(2) || '0.00'}</span>
            </div>
          </div>
          
          <div className="action-buttons">
            <button className="btn btn-secondary" onClick={onGoHome}>
              <Home size={16} />
              Continue Shopping
            </button>
            <button className="btn btn-primary" onClick={onViewOrderHistory}>
              <Eye size={16} />
              View Orders
            </button>
          </div>

          <div className="countdown-timer">
            Redirecting to order history in <span>{countdown}</span> second{countdown !== 1 ? 's' : ''}...
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessModal;