// src/components/Pages/WishlistPage.jsx
import React from 'react';
import { Heart, ShoppingCart, Trash2, Plus, Minus } from 'lucide-react';
import { createProductCartAnimation } from '../../utils/cartAnimation';

const WishlistPage = ({ wishlistItems = [], onRemoveFromWishlist, onWishlistToggle, onAddToCart, cartItems = [] }) => {

  const handleRemoveFromWishlist = (item) => {
    if (onWishlistToggle) {
      onWishlistToggle(item);
    } else if (onRemoveFromWishlist) {
      onRemoveFromWishlist(item.id);
    }
  };

  const handleAddToCart = (item) => {
    if (onAddToCart) {
      // Ensure the item has the required price field for cart calculations
      const cartItem = {
        ...item,
        price: item.price || parseFloat(item.currentPrice?.replace(/[^\d.]/g, '')) || 0,
        brand: item.brand || 'Unknown Brand',
        category: item.category || 'General',
        subcategory: item.subcategory || 'General'
      };
      onAddToCart(cartItem, 1);
      
      // Trigger animation from the clicked button
      const event = window.event || {};
      if (event.target) {
        createProductCartAnimation(event.target.closest('button'), cartItem);
      }
    }
  };

  const handleQuantityChange = (item, change) => {
    if (onAddToCart) {
      // Ensure the item has the required price field for cart calculations
      const cartItem = {
        ...item,
        price: item.price || parseFloat(item.currentPrice?.replace(/[^\d.]/g, '')) || 0,
        brand: item.brand || 'Unknown Brand',
        category: item.category || 'General',
        subcategory: item.subcategory || 'General'
      };
      onAddToCart(cartItem, change);
    }
  };

  const getItemInCart = (itemId) => {
    return cartItems.find(item => item.id === itemId);
  };
  return (
    <div style={{ minHeight: '100vh', background: '#f9fafb', marginTop: '120px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '12px', 
          marginBottom: '32px' 
        }}>
          <Heart size={24} color="#dc2626" fill="#dc2626" />
          <h1 style={{ 
            fontSize: '2.5rem', 
            fontWeight: '700', 
            color: '#1f2937' 
          }}>
            My Wishlist
          </h1>
          <span style={{
            background: '#dcfce7',
            color: '#059669',
            padding: '4px 12px',
            borderRadius: '20px',
            fontSize: '0.875rem',
            fontWeight: '600'
          }}>
            {wishlistItems.length} items
          </span>
        </div>

        {wishlistItems.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '60px 20px',
            background: 'white',
            borderRadius: '12px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.07)'
          }}>
            <Heart size={48} color="#d1d5db" style={{ marginBottom: '16px' }} />
            <h3 style={{ 
              fontSize: '1.5rem', 
              fontWeight: '600', 
              color: '#374151',
              marginBottom: '8px'
            }}>
              Your wishlist is empty
            </h3>
            <p style={{ color: '#6b7280', marginBottom: '24px' }}>
              Start adding products you love to your wishlist!
            </p>
            <button
              onClick={() => window.history.back()}
              style={{
                background: 'linear-gradient(135deg, #12b431, #007337)',
                color: 'white',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '8px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-1px)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(18, 180, 49, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px'
          }}>
            {wishlistItems.map((item) => (
              <div 
                key={item.id}
                style={{
                  background: 'white',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.07)',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.07)';
                }}
              >
                <div style={{ 
                  height: '200px', 
                  background: 'linear-gradient(135deg, #f3f4f6, #e5e7eb)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#9ca3af',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  {item.image ? (
                    <img 
                      src={item.image} 
                      alt={item.name}
                      style={{ 
                        width: '100%', 
                        height: '100%', 
                        objectFit: 'cover' 
                      }}
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                  ) : null}
                  <div style={{ 
                    display: item.image ? 'none' : 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    height: '100%',
                    fontSize: '1.1rem',
                    fontWeight: '600'
                  }}>
                    {item.name || 'Product Image'}
                  </div>
                </div>
                
                <div style={{ padding: '20px' }}>
                  <h3 style={{ 
                    fontSize: '1.1rem', 
                    fontWeight: '600', 
                    color: '#1f2937',
                    marginBottom: '8px'
                  }}>
                    {item.name}
                  </h3>
                  
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '12px',
                    marginBottom: '16px'
                  }}>
                    <span style={{ 
                      fontSize: '1.25rem', 
                      fontWeight: '700', 
                      color: '#12b431'
                    }}>
                      {item.currentPrice || (item.price ? `₹${item.price.toFixed(2)}` : '₹0')}
                    </span>
                    {(item.oldPrice || item.originalPrice) ? (
                      <span style={{ 
                        fontSize: '1rem', 
                        color: '#9ca3af',
                        textDecoration: 'line-through'
                      }}>
                        {item.oldPrice || `₹${item.originalPrice.toFixed(2)}`}
                      </span>
                    ) : null}
                    {item.discount && (
                      <span style={{
                        background: '#dc2626',
                        color: 'white',
                        padding: '2px 6px',
                        borderRadius: '4px',
                        fontSize: '0.7rem',
                        fontWeight: '600'
                      }}>
                        -{item.discount}%
                      </span>
                    )}
                  </div>

                  <div style={{ 
                    display: 'flex', 
                    gap: '8px' 
                  }}>
                    {getItemInCart(item.id) && getItemInCart(item.id).quantity > 0 ? (
                      <div style={{
                        flex: 1,
                        display: 'flex',
                        alignItems: 'center',
                        background: '#f3f4f6',
                        borderRadius: '8px',
                        padding: '4px',
                        gap: '4px'
                      }}>
                        <button 
                          style={{
                            background: '#fef2f2',
                            border: '1px solid #fecaca',
                            borderRadius: '6px',
                            width: '32px',
                            height: '32px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            color: '#dc2626',
                            transition: 'all 0.2s ease'
                          }}
                          onClick={() => handleQuantityChange(item, -1)}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = '#fee2e2';
                            e.currentTarget.style.borderColor = '#fca5a5';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = '#fef2f2';
                            e.currentTarget.style.borderColor = '#fecaca';
                          }}
                        >
                          <Minus size={14} />
                        </button>
                        <span style={{
                          flex: 1,
                          textAlign: 'center',
                          fontWeight: '600',
                          color: '#1f2937',
                          padding: '4px 8px'
                        }}>
                          {getItemInCart(item.id).quantity}
                        </span>
                        <button 
                          style={{
                            background: '#f0fdf4',
                            border: '1px solid #bbf7d0',
                            borderRadius: '6px',
                            width: '32px',
                            height: '32px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            color: '#059669',
                            transition: 'all 0.2s ease'
                          }}
                          onClick={() => handleQuantityChange(item, 1)}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = '#dcfce7';
                            e.currentTarget.style.borderColor = '#86efac';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = '#f0fdf4';
                            e.currentTarget.style.borderColor = '#bbf7d0';
                          }}
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleAddToCart(item)}
                        title="Add to Cart"
                        style={{
                          flex: 1,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '6px',
                          padding: '10px',
                          background: 'linear-gradient(135deg, #12b431, #007337)',
                          color: 'white',
                          border: 'none',
                          borderRadius: '6px',
                          fontWeight: '600',
                          cursor: 'pointer',
                          fontSize: '0.875rem',
                          transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'translateY(-1px)';
                          e.currentTarget.style.boxShadow = '0 4px 12px rgba(18, 180, 49, 0.3)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'translateY(0)';
                          e.currentTarget.style.boxShadow = 'none';
                        }}
                      >
                        <ShoppingCart size={14} />
                        Add to Cart
                      </button>
                    )}
                    <button
                      onClick={() => handleRemoveFromWishlist(item)}
                      style={{
                        padding: '10px',
                        background: '#fef2f2',
                        color: '#dc2626',
                        border: '1px solid #fecaca',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = '#fecaca';
                        e.currentTarget.style.transform = 'scale(1.05)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = '#fef2f2';
                        e.currentTarget.style.transform = 'scale(1)';
                      }}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;