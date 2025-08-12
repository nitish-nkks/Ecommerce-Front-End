// src/components/CartModal/CartModal.jsx
import React from 'react';
import { X, Plus, Minus, ShoppingCart, Trash2 } from 'lucide-react';

const CartModal = ({ 
  isOpen, 
  onClose, 
  cartItems, 
  onUpdateQuantity, 
  onRemoveItem, 
  onClearCart, 
  onCheckout,
  getCartTotal 
}) => {
  if (!isOpen) return null;

  const handleQuantityChange = (itemId, change) => {
    const item = cartItems.find(item => item.id === itemId);
    if (item) {
      const newQuantity = item.quantity + change;
      onUpdateQuantity(itemId, newQuantity);
    }
  };

  return (
    <div className={`cart-modal-overlay ${isOpen ? 'open' : ''}`} onClick={onClose}>
      <style jsx>{`
        .cart-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          z-index: 9999;
          opacity: 0;
          visibility: hidden;
          transition: all 0.3s ease;
        }

        .cart-modal-overlay.open {
          opacity: 1;
          visibility: visible;
        }

        .cart-modal {
          position: fixed;
          top: 0;
          right: 0;
          width: 450px;
          height: 100vh;
          background: white;
          box-shadow: -4px 0 20px rgba(0, 0, 0, 0.15);
          display: flex;
          flex-direction: column;
          transform: translateX(100%);
          transition: transform 0.3s ease;
          overflow: hidden;
        }

        .cart-modal-overlay.open .cart-modal {
          transform: translateX(0);
        }

        .cart-header {
          padding: 24px;
          border-bottom: 1px solid #e5e7eb;
          display: flex;
          justify-content: between;
          align-items: center;
          background: linear-gradient(135deg, #12b431 0%, #0ea025 100%);
          color: white;
        }

        .cart-title {
          font-size: 1.5rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          gap: 10px;
          flex: 1;
        }

        .close-btn {
          background: rgba(255, 255, 255, 0.2);
          border: none;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: white;
          transition: all 0.3s ease;
        }

        .close-btn:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: scale(1.1);
        }

        .cart-content {
          flex: 1;
          overflow-y: auto;
          padding: 0;
        }

        .cart-items {
          padding: 0;
        }

        .cart-item {
          display: flex;
          align-items: center;
          padding: 20px 24px;
          border-bottom: 1px solid #f3f4f6;
          transition: background 0.2s ease;
        }

        .cart-item:hover {
          background: #f9fafb;
        }

        .cart-item:last-child {
          border-bottom: none;
        }

        .item-image {
          width: 60px;
          height: 60px;
          border-radius: 8px;
          background: linear-gradient(135deg, #f3f4f6, #e5e7eb);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #6b7280;
          font-size: 0.8rem;
          font-weight: 600;
          margin-right: 16px;
          overflow: hidden;
        }

        .item-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .item-details {
          flex: 1;
          margin-right: 16px;
        }

        .item-name {
          font-weight: 600;
          color: #1f2937;
          margin-bottom: 4px;
          font-size: 0.95rem;
          line-height: 1.3;
        }

        .item-brand {
          font-size: 0.8rem;
          color: #6b7280;
          margin-bottom: 6px;
        }

        .item-price {
          font-weight: 700;
          color: #059669;
          font-size: 1rem;
        }

        .quantity-controls {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-right: 12px;
        }

        .quantity-btn {
          background: #f3f4f6;
          border: 1px solid #d1d5db;
          border-radius: 6px;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
          color: #374151;
        }

        .quantity-btn:hover {
          background: #e5e7eb;
          border-color: #9ca3af;
        }

        .quantity-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .quantity-btn:disabled:hover {
          background: #f3f4f6;
          border-color: #d1d5db;
        }

        .quantity-display {
          min-width: 40px;
          text-align: center;
          font-weight: 600;
          color: #1f2937;
          padding: 6px 8px;
          border: 1px solid #e5e7eb;
          border-radius: 6px;
          background: white;
        }

        .remove-btn {
          background: #fef2f2;
          border: 1px solid #fecaca;
          border-radius: 6px;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: #dc2626;
          transition: all 0.2s ease;
        }

        .remove-btn:hover {
          background: #fee2e2;
          border-color: #fca5a5;
          transform: scale(1.1);
        }

        .empty-cart {
          padding: 60px 24px;
          text-align: center;
          color: #6b7280;
        }

        .empty-cart-icon {
          font-size: 3rem;
          margin-bottom: 16px;
        }

        .empty-cart-message {
          font-size: 1.1rem;
          font-weight: 600;
          margin-bottom: 8px;
        }

        .empty-cart-submessage {
          font-size: 0.9rem;
        }

        .cart-footer {
          border-top: 1px solid #e5e7eb;
          padding: 24px;
          background: #f9fafb;
        }

        .cart-summary {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          padding: 16px;
          background: white;
          border-radius: 8px;
          border: 1px solid #e5e7eb;
        }

        .total-label {
          font-size: 1.1rem;
          font-weight: 600;
          color: #374151;
        }

        .total-amount {
          font-size: 1.5rem;
          font-weight: 700;
          color: #12b431;
        }

        .cart-actions {
          display: flex;
          gap: 12px;
        }

        .cart-btn {
          flex: 1;
          padding: 12px 16px;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          font-size: 0.95rem;
        }

        .clear-btn {
          background: #f3f4f6;
          color: #374151;
          border: 1px solid #d1d5db;
        }

        .clear-btn:hover {
          background: #e5e7eb;
          border-color: #9ca3af;
        }

        .checkout-btn {
          background: linear-gradient(135deg, #12b431 0%, #0ea025 100%);
          color: white;
        }

        .checkout-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(18, 180, 49, 0.3);
        }

        @media (max-width: 640px) {
          .cart-modal {
            width: 100vw;
            right: 0;
          }

          .cart-item {
            padding: 16px;
          }

          .item-image {
            width: 50px;
            height: 50px;
            margin-right: 12px;
          }

          .cart-actions {
            flex-direction: column;
          }

          .cart-btn {
            width: 100%;
          }
        }
      `}</style>

      <div className="cart-modal" onClick={(e) => e.stopPropagation()}>
        <div className="cart-header">
          <h2 className="cart-title">
            <ShoppingCart size={24} />
            Shopping Cart ({cartItems.length} items)
          </h2>
          <button className="close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="cart-content">
          {cartItems.length === 0 ? (
            <div className="empty-cart">
              <div className="empty-cart-icon">🛒</div>
              <div className="empty-cart-message">Your cart is empty</div>
              <div className="empty-cart-submessage">Add some products to get started</div>
            </div>
          ) : (
            <div className="cart-items">
              {cartItems.map((item) => (
                <div key={item.id} className="cart-item">
                  <div className="item-image">
                    <img
                      src={item.image}
                      alt={item.name}
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.parentNode.textContent = item.name.substring(0, 8);
                      }}
                    />
                  </div>
                  
                  <div className="item-details">
                    <div className="item-name">{item.name}</div>
                    <div className="item-brand">{item.brand}</div>
                    <div className="item-price">₹{item.price.toFixed(2)}</div>
                  </div>

                  <div className="quantity-controls">
                    <button
                      className="quantity-btn"
                      onClick={() => handleQuantityChange(item.id, -1)}
                      disabled={item.quantity <= 1}
                    >
                      <Minus size={14} />
                    </button>
                    <div className="quantity-display">{item.quantity}</div>
                    <button
                      className="quantity-btn"
                      onClick={() => handleQuantityChange(item.id, 1)}
                    >
                      <Plus size={14} />
                    </button>
                  </div>

                  <button
                    className="remove-btn"
                    onClick={() => onRemoveItem(item.id)}
                    title="Remove item"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="cart-footer">
            <div className="cart-summary">
              <span className="total-label">Total:</span>
              <span className="total-amount">₹{getCartTotal().toFixed(2)}</span>
            </div>

            <div className="cart-actions">
              <button className="cart-btn clear-btn" onClick={onClearCart}>
                <Trash2 size={16} />
                Clear Cart
              </button>
              <button className="cart-btn checkout-btn" onClick={onCheckout}>
                <ShoppingCart size={16} />
                Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartModal;