// src/App.jsx
import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Login from './components/LoginPage/LoginPage';
import Registration from './components/RegistrationPage/RegistrationPage';
import HomePage from './components/Pages/HomePage';
import BlogsPage from './components/Pages/BlogsPage';
import TechnicalGuidancePage from './components/Pages/TechnicalGuidancePage';
import ContactPage from './components/Pages/ContactPage';
import JoinSellerPage from './components/Pages/JoinSellerPage';
import AboutPage from './components/Pages/AboutPage';
import FlashSalePage from './components/Pages/FlashSalePage';
import WishlistPage from './components/Pages/WishlistPage';
import ProductsPage from './components/Pages/ProductsPage';
import SearchResultsPage from './components/Pages/SearchResultsPage';
import PrivacyPolicy from './components/Pages/PrivacyPolicy';
import TermsOfService from './components/Pages/TermsOfService';
import ReturnPolicy from './components/Pages/ReturnPolicy';
import RefundPolicy from './components/Pages/RefundPolicy';
import ShippingPolicy from './components/Pages/ShippingPolicy';
import CheckoutPage from './components/Pages/CheckoutPage';
import OrderHistoryPage from './components/Pages/OrderHistoryPage';
import OrderTrackingPage from './components/Pages/OrderTrackingPage';
import CartModal from './components/CartModal/CartModal';
import OrderSuccessModal from './components/OrderSuccessModal/OrderSuccessModal';
import { addToCart as addToCartApi } from './api/api';

function App() {
  const [currentView, setCurrentView] = useState('home');
  const [language, setLanguage] = useState('en');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [selectedSubsubcategory, setSelectedSubsubcategory] = useState(null);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [showCartModal, setShowCartModal] = useState(false);
  const [orders, setOrders] = useState([]);
  const [showOrderSuccess, setShowOrderSuccess] = useState(false);
  const [lastOrderData, setLastOrderData] = useState(null);
  const [trackingData, setTrackingData] = useState(null);
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSplashScreen, setShowSplashScreen] = useState(false);

  useEffect(() => {
    const guestId = localStorage.getItem('guestId');
    if (!guestId) {
      localStorage.setItem('guestId', uuidv4());
    }
  }, []);

  // Mobile splash screen effect
  useEffect(() => {
    const checkIfMobile = () => {
      const isMobileWidth = window.innerWidth <= 768;
      const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      return isMobileWidth || isMobileDevice;
    };
    
    console.log('Window width:', window.innerWidth);
    console.log('User agent:', navigator.userAgent);
    console.log('Is mobile device:', checkIfMobile());
    
    // Only show splash screen on mobile devices
    if (checkIfMobile()) {
      setShowSplashScreen(true);
      const timer = setTimeout(() => {
        console.log('Hiding splash screen');
        setShowSplashScreen(false);
      }, 2500);
      
      return () => clearTimeout(timer);
    } else {
      console.log('Desktop device detected, no splash screen');
    }
  }, []);

  // Handle browser back/forward buttons and initial URL
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      let view = path.substring(1) || 'home';
      
      // Handle specific routes that might need mapping
      if (path === '/registration') {
        view = 'registration';
      } else if (path === '/login') {
        view = 'login';
      } else if (path === '/join-seller') {
        view = 'join-seller';
      } else if (path.startsWith('/products')) {
        view = 'products';
      } else if (path === '/checkout') {
        view = 'checkout';
      } else if (path === '/order-history') {
        view = 'order-history';
      } else if (path === '/order-tracking') {
        view = 'order-tracking';
      } else if (path.startsWith('/search')) {
        view = 'search';
        // Update search query from URL
        const urlParams = new URLSearchParams(window.location.search);
        const urlSearchQuery = urlParams.get('q') || '';
        setSearchQuery(urlSearchQuery);
      } else if (path === '/' || path === '') {
        view = 'home';
      }
      
      console.log('Setting view to:', view, 'from path:', path);
      setCurrentView(view);
    };

    // Set initial view based on URL
    handlePopState();
    
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleLoginClick = () => {
    setCurrentView('login');
    updateURL('login');
  };

  const handleRegisterClick = () => {
    setCurrentView('registration');
    updateURL('registration');
  };

  const handleJoinSellerClick = () => {
    setCurrentView('join-seller');
    updateURL('join-seller');
  };

  const handleBackToHome = () => {
    setCurrentView('home');
    updateURL('home');
  };

  const handleNavigate = (view, data = null) => {
    if (data) {
      setTrackingData(data);
    }
    setCurrentView(view);
    updateURL(view);
    window.scrollTo(0, 0);
  };

  const handleCategoryClick = (category, subcategory, subsubcategory = null) => {
    setSelectedCategory(category);
    setSelectedSubcategory(subcategory);
    setSelectedSubsubcategory(subsubcategory);
    setCurrentView('products');
    updateURL(
          `products${category ? `/${category.name.toLowerCase().replace(/ /g, '-')}` : ''}${subcategory ? `/${subcategory.name.toLowerCase().replace(/ /g, '-')}` : ''
          }${subsubcategory ? `/${subsubcategory.name.toLowerCase().replace(/ /g, '-')}` : ''}`
    );
  };

  const handleWishlistClick = () => {
    setCurrentView('wishlist');
    updateURL('wishlist');
  };

  const handleSearchSubmit = (query) => {
    setSearchQuery(query);
    setCurrentView('search');
    const url = query ? `/search?q=${encodeURIComponent(query)}` : '/search';
    window.history.pushState(null, '', url);
  };

  const addToWishlist = (item) => {
    setWishlistItems(prev => [...prev, { ...item, id: Date.now() }]);
  };

  const removeFromWishlist = (itemId) => {
    setWishlistItems(prev => prev.filter(item => item.id !== itemId));
  };

  const handleWishlistToggle = (product) => {
    const isInWishlist = wishlistItems.some(item => item.id === product.id);
    
    if (isInWishlist) {
      setWishlistItems(prev => prev.filter(item => item.id !== product.id));
    } else {
      setWishlistItems(prev => [...prev, product]);
    }
  };

  // Cart management functions
  const addToCart = async (product, quantity = 1) => {
    const guestId = localStorage.getItem('guestId');
    try {
      await addToCartApi({
        productId: product.id,
        quantity,
        guestId: user ? null : guestId,
      });
      setCartItems(prev => {
        const existingItem = prev.find(item => item.id === product.id);
        
        if (existingItem) {
          const newQuantity = existingItem.quantity + quantity;
          if (newQuantity <= 0) {
            // Remove item if quantity becomes 0 or less
            return prev.filter(item => item.id !== product.id);
          }
          return prev.map(item =>
            item.id === product.id
              ? { ...item, quantity: newQuantity }
              : item
          );
        } else if (quantity > 0) {
          return [...prev, { ...product, quantity }];
        }
        return prev;
      });
    } catch (error) {
      console.error('Failed to add item to cart:', error);
    }
  };

  const updateCartItemQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setCartItems(prev =>
      prev.map(item =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const removeFromCart = (productId) => {
    setCartItems(prev => prev.filter(item => item.id !== productId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartTotal = () => {
        return cartItems.reduce((total, item) => {
            const discountedPrice = item.price - (item.price * (item.discount || 0) / 100);
            return total + (discountedPrice * item.quantity);
        }, 0);
  };

  const getCartItemCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const handleCartClick = () => {
    setShowCartModal(true);
  };

  const handleCheckout = () => {
    if (!user) {
      setCurrentView('login');
      updateURL('login');
    } else {
      setCurrentView('checkout');
      setShowCartModal(false);
      updateURL('checkout');
    }
  };

  const handleOrderPlaced = (orderData) => {
    // Create new order
    const newOrder = {
      id: 'ORD-' + Date.now().toString().slice(-6),
      date: new Date().toISOString().split('T')[0],
      status: 'processing',
      items: cartItems.map(item => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price
      })),
      total: orderData.total,
      shippingAddress: `${orderData.city}, ${orderData.state}`,
      paymentMethod: orderData.paymentMethod === 'card' ? 'Card ending in 1234' : 'Cash on Delivery',
      trackingNumber: 'TRK' + Date.now().toString().slice(-9)
    };

    // Add to orders list
    setOrders(prev => [newOrder, ...prev]);
    
    // Set last order data for success modal
    setLastOrderData({
      ...orderData,
      orderId: newOrder.id,
      itemCount: cartItems.reduce((sum, item) => sum + item.quantity, 0)
    });

    // Clear cart
    clearCart();

    // Show success modal
    setShowOrderSuccess(true);
  };

  const handleOrderHistoryClick = () => {
    setShowOrderSuccess(false);
    setCurrentView('order-history');
    updateURL('order-history');
  };

  const updateURL = (path) => {
    const url = path === 'home' ? '/' : `/${path}`;
    window.history.pushState(null, '', url);
  };

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
    console.log('Language changed to:', newLanguage);
  };

  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setCurrentView('home');
    updateURL('home');
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('role');
  };

  const renderCurrentView = () => {
        switch (currentView) {
      case 'login':
        return (
          <Login 
            onBackToHome={handleBackToHome}
            onSwitchToRegister={handleRegisterClick}
            onLoginSuccess={handleLoginSuccess}
          />
        );
      case 'registration':
        return (
          <Registration 
            onBackToLogin={handleLoginClick}
            onBackToHome={handleBackToHome}
          />
        );
      case 'join-seller':
        return <JoinSellerPage onBackToHome={handleBackToHome} />;
      case 'blogs':
        return <BlogsPage />;
      case 'technical':
        return <TechnicalGuidancePage />;
      case 'about':
        return <AboutPage />;
      case 'contact':
        return <ContactPage />;
      case 'flashsale':
        return (
          <FlashSalePage 
            wishlistItems={wishlistItems} 
            onWishlistToggle={handleWishlistToggle}
            onAddToCart={addToCart}
            cartItems={cartItems}
          />
        );
      case 'products':
        return (
          <ProductsPage 
            selectedCategory={selectedCategory?.name}
            selectedSubcategory={selectedSubcategory?.name}
            selectedSubsubcategory={selectedSubsubcategory?.name}
            wishlistItems={wishlistItems}
            onWishlistToggle={handleWishlistToggle}
            onAddToCart={addToCart}
            cartItems={cartItems}
            onNavigate={handleNavigate}
          />
        );
      case 'checkout':
        return (
          <CheckoutPage
            cartItems={cartItems}
            onNavigate={handleNavigate}
            onUpdateQuantity={updateCartItemQuantity}
            onRemoveItem={removeFromCart}
            getCartTotal={getCartTotal}
            onOrderPlaced={handleOrderPlaced}
            user={user}
          />
        );
      case 'order-history':
        return (
          <OrderHistoryPage
            onNavigate={handleNavigate}
            orders={orders}
          />
        );
      case 'order-tracking':
        return (
          <OrderTrackingPage
            onNavigate={handleNavigate}
            trackingNumber={trackingData?.trackingNumber}
          />
        );
      case 'wishlist':
        return (
          <WishlistPage 
            wishlistItems={wishlistItems}
            onRemoveFromWishlist={removeFromWishlist}
            onWishlistToggle={handleWishlistToggle}
            onAddToCart={addToCart}
            cartItems={cartItems}
          />
        );
      case 'search':
                const urlParams = new URLSearchParams(window.location.search);
                const searchQuery = urlParams.get('q') || '';
        return (
          <SearchResultsPage
            searchQuery={searchQuery}
            wishlistItems={wishlistItems}
            onWishlistToggle={handleWishlistToggle}
            onAddToCart={addToCart}
            cartItems={cartItems}
            onNavigate={handleNavigate}
          />
        );
      case 'privacy':
        return <PrivacyPolicy onNavigate={handleNavigate} />;
      case 'terms':
        return <TermsOfService onNavigate={handleNavigate} />;
      case 'return-policy':
        return <ReturnPolicy onNavigate={handleNavigate} />;
      case 'refund':
        return <RefundPolicy onNavigate={handleNavigate} />;
      case 'shipping':
        return <ShippingPolicy onNavigate={handleNavigate} />;
      default:
        return (
          <HomePage 
            onCategoryClick={handleCategoryClick} 
            wishlistItems={wishlistItems} 
            onWishlistToggle={handleWishlistToggle}
            onAddToCart={addToCart}
                        cartItems={cartItems}
                        onNavigate={handleNavigate}
          />
        );
    }
  };

  const showHeader = !['login', 'registration', 'join-seller'].includes(currentView);
  const showFooter = !['login', 'registration', 'join-seller'].includes(currentView);

  return (
    <div className="App">
      <style>{`
        body, html {
          overflow-x: hidden;
          max-width: 100vw;
        }
        
        .App {
          overflow-x: hidden;
          max-width: 100vw;
        }
        
        * {
          box-sizing: border-box;
        }
        
        .splash-screen {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: white;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          opacity: 1;
          visibility: visible;
        }
        
        .splash-logo {
          width: 300px;
          height: auto;
          animation: logoScale 1.5s ease-in-out infinite alternate;
        }
        
        @keyframes logoScale {
          0% { transform: scale(1); }
          100% { transform: scale(1.1); }
        }
        
        
        @media (max-width: 768px) {
          .splash-logo {
            width: 250px;
          }
        }
      `}</style>

      {/* Mobile Splash Screen */}
      {showSplashScreen && (
        <div className="splash-screen">
          <div style={{ textAlign: 'center' }}>
            <img 
              src="/src/assets/brand-logo.png" 
              alt="Brand Logo" 
              className="splash-logo"
              onLoad={() => console.log('Logo loaded successfully')}
              onError={(e) => {
                console.log('Logo failed to load, showing text fallback');
                e.target.style.display = 'none';
                // Show text fallback only when logo fails
                e.target.parentNode.innerHTML = '<div style="color: #12b431; font-size: 2.5rem; font-weight: bold; text-align: center;">FEEDORA</div><div style="color: #666; font-size: 1rem; margin-top: 10px; text-align: center;">Loading...</div>';
              }}
              style={{ maxWidth: '300px', height: 'auto' }}
            />
          </div>
        </div>
      )}

      {showHeader && (
        <Header 
          onLoginClick={handleLoginClick}
          onRegisterClick={handleRegisterClick}
          onNavigate={handleNavigate}
          currentView={currentView}
          onJoinSellerClick={handleJoinSellerClick}
          onCategoryClick={handleCategoryClick}
          onWishlistClick={handleWishlistClick}
          wishlistCount={wishlistItems.length}
          language={language}
          onLanguageChange={handleLanguageChange}
          onCartClick={handleCartClick}
          cartItemCount={getCartItemCount()}
          cartTotal={getCartTotal()}
          onSearchSubmit={handleSearchSubmit}
          user={user}
          onLogout={handleLogout}
        />
      )}
      {renderCurrentView()}
      {showFooter && <Footer onNavigate={handleNavigate} />}
      
      {/* Cart Modal */}
      <CartModal
        isOpen={showCartModal}
        onClose={() => setShowCartModal(false)}
        cartItems={cartItems}
        onUpdateQuantity={updateCartItemQuantity}
        onRemoveItem={removeFromCart}
        onClearCart={clearCart}
        onCheckout={handleCheckout}
        getCartTotal={getCartTotal}
      />

      {/* Order Success Modal */}
      <OrderSuccessModal
        isOpen={showOrderSuccess}
        onClose={() => setShowOrderSuccess(false)}
        orderData={lastOrderData}
        onViewOrderHistory={handleOrderHistoryClick}
        onGoHome={() => {
          setShowOrderSuccess(false);
          handleNavigate('home');
        }}
      />
    </div>
  );
}

export default App;