import React, { useState } from 'react';

function Footer({ onNavigate }) {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  const handleNavigation = (view) => {
    if (onNavigate) {
      onNavigate(view);
      window.scrollTo(0, 0);
    }
  };

  return (
    <>
      <style>
        {`
          .feedora-footer {
            background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
            color: #333;
            padding: 40px 20px 20px;
            font-family: 'Inter', 'Segoe UI', 'Roboto', 'Helvetica Neue', sans-serif;
            margin-top: 40px;
            border-top: 1px solid #dee2e6;
          }

          .feedora-footer-container {
            max-width: 1200px;
            margin: 0 auto;
          }

          .feedora-footer-content {
            display: grid;
            grid-template-columns: 2fr 1fr 1fr 1fr 1fr;
            gap: 30px;
            margin-bottom: 30px;
          }

          .feedora-footer-section {
            display: flex;
            flex-direction: column;
          }

          .feedora-footer-section h4 {
            font-size: 18px;
            font-weight: 700;
            margin-bottom: 20px;
            color: #1a1a1a;
            text-transform: uppercase;
            letter-spacing: 1px;
            font-family: 'Inter', sans-serif;
          }

          .feedora-footer-section p {
            color: #555;
            line-height: 1.7;
            margin-bottom: 16px;
            font-size: 15px;
            font-weight: 400;
          }

          .feedora-footer-section ul {
            list-style: none;
            padding: 0;
            margin: 0;
          }

          .feedora-footer-section ul li {
            margin-bottom: 8px;
          }

          .feedora-footer-section ul li a {
            color: #555;
            text-decoration: none;
            font-size: 15px;
            font-weight: 500;
            transition: all 0.3s ease;
            display: block;
          }

          .feedora-footer-section ul li a:hover {
            color: #12b431;
            padding-left: 5px;
          }

          .feedora-company-section {
            grid-column: 1;
          }

          .feedora-company-info p {
            font-size: 16px;
            margin-bottom: 12px;
            font-weight: 400;
            line-height: 1.6;
          }

          .feedora-contact-info {
            margin-top: 15px;
          }

          .feedora-contact-item {
            display: flex;
            align-items: center;
            gap: 10px;
            margin-bottom: 8px;
            font-size: 15px;
            color: #555;
            font-weight: 500;
          }

          .feedora-contact-icon {
            font-size: 14px;
            width: 16px;
            text-align: center;
          }

          .feedora-brand-logo {
            height: 200px;
            width: auto;
            margin-bottom: -70px;
            object-fit: contain;
            margin-top: -70px;
            margin-left: -160px;
          }

          .feedora-newsletter-form {
            margin-top: 15px;
            width: 100%;
            max-width: 600px;
          }

          .feedora-newsletter-input {
            display: flex;
            margin-top: 10px;
            width: 100%;
            max-width: 600px;
          }

          .feedora-newsletter-input input {
            flex: 1;
            padding: 10px 12px;
            border: 1px solid #ddd;
            border-radius: 4px 0 0 4px;
            background: white;
            color: #333;
            font-size: 14px;
            outline: none;
          }

          .feedora-newsletter-input input::placeholder {
            color: #999;
          }

          .feedora-newsletter-btn {
            padding: 10px 15px;
            background: #12b431;
            border: none;
            border-radius: 0 4px 4px 0;
            color: white;
            font-weight: 600;
            cursor: pointer;
            transition: background 0.3s ease;
            font-size: 14px;
          }

          .feedora-newsletter-btn:hover {
            background: #007337;
          }

          .feedora-success-message {
            color: #28a745;
            font-size: 12px;
            margin-top: 8px;
            font-weight: 500;
          }

          .feedora-social-links {
            display: flex;
            gap: 10px;
            margin-top: 15px;
          }

          .feedora-social-link {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            width: 35px;
            height: 35px;
            background: rgba(0, 0, 0, 0.1);
            border-radius: 6px;
            color: white;
            text-decoration: none;
            transition: all 0.3s ease;
            font-size: 16px;
          }

          .feedora-social-link:hover {
            transform: translateY(-2px);
            opacity: 0.9;
          }

          .feedora-facebook { background: #1877f2; }
          .feedora-twitter { background: #1da1f2; }
          .feedora-instagram { background: #e4405f; }
          .feedora-linkedin { background: #0077b5; }
          .feedora-youtube { background: #ff0000; }
          .feedora-whatsapp { background: #25d366; }

          .feedora-footer-bottom {
            border-top: 1px solid #dee2e6;
            padding-top: 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 15px;
          }

          .feedora-copyright {
            font-size: 15px;
            color: #555;
            font-weight: 500;
          }

          .feedora-legal-links {
            display: flex;
            gap: 20px;
            flex-wrap: wrap;
          }

          .feedora-legal-links a {
            color: #555;
            text-decoration: none;
            font-size: 15px;
            font-weight: 500;
            transition: color 0.3s ease;
          }

          .feedora-legal-links a:hover {
            color: #12b431;
          }

          /* Mobile Responsive Styles */
          @media (max-width: 968px) {
            .feedora-footer-content {
              grid-template-columns: 1fr 1fr;
              gap: 20px;
            }

            .feedora-company-section {
              grid-column: 1 / -1;
              order: -1;
            }

            .feedora-brand-logo {
              height: 180px;
              margin-bottom: -60px;
              margin-top: -60px;
              margin-left: -140px;
            }
          }

          @media (max-width: 768px) {
            .feedora-footer {
              padding: 30px 16px 16px;
            }

            .feedora-footer-content {
              grid-template-columns: 1fr 1fr;
              gap: 20px;
            }

            .feedora-company-section {
              grid-column: 1 / -1;
              text-align: center;
              order: -1;
            }

            .feedora-brand-logo {
              height: 160px;
              margin: 0 auto 30px;
            }

            .feedora-company-info {
              max-width: 100%;
              margin: 0 auto;
            }

            .feedora-newsletter-form {
              max-width: 100%;
              margin: 20px auto 0;
            }

            .feedora-newsletter-input {
              max-width: 100%;
            }

            .feedora-social-links {
              justify-content: center;
            }

            .feedora-footer-section h4 {
              font-size: 16px;
              margin-bottom: 15px;
              text-align: left;
            }

            .feedora-footer-section ul li a {
              text-align: left;
            }

            .feedora-footer-bottom {
              flex-direction: column;
              text-align: center;
              gap: 10px;
            }

            .feedora-legal-links {
              justify-content: center;
            }
          }

          @media (max-width: 480px) {
            .feedora-footer {
              padding: 24px 12px 12px;
            }

            .feedora-footer-content {
              grid-template-columns: 1fr 1fr;
              gap: 16px;
            }

            .feedora-brand-logo {
              height: 140px;
              margin-bottom: 24px;
            }

            .feedora-footer-section h4 {
              font-size: 14px;
              margin-bottom: 12px;
            }

            .feedora-footer-section p {
              font-size: 14px;
              text-align: center;
            }

            .feedora-footer-section ul li a {
              font-size: 14px;
            }

            .feedora-newsletter-input input {
              font-size: 14px;
              padding: 8px 10px;
            }

            .feedora-newsletter-btn {
              font-size: 14px;
              padding: 8px 12px;
            }

            .feedora-social-links {
              gap: 8px;
            }

            .feedora-social-link {
              width: 32px;
              height: 32px;
              font-size: 14px;
            }

            .feedora-contact-item {
              font-size: 14px;
              justify-content: center;
              text-align: center;
            }

            .feedora-copyright {
              font-size: 13px;
            }

            .feedora-legal-links a {
              font-size: 13px;
            }

            .feedora-legal-links {
              gap: 12px;
            }
          }

        `}
      </style>

      <footer className="feedora-footer">
        <div className="feedora-footer-container">
          <div className="feedora-footer-content">
            {/* Company Info */}
            <div className="feedora-footer-section feedora-company-section">
              <img 
                src="/src/assets/brand-logo.png" 
                alt="Feedora Brand Logo" 
                className="feedora-brand-logo"
                onError={(e) => {
                  e.target.style.display = 'none';
                  const fallbackText = document.createElement('h4');
                  fallbackText.textContent = 'Feedora';
                  fallbackText.style.fontSize = '16px';
                  fallbackText.style.fontWeight = '600';
                  fallbackText.style.marginBottom = '15px';
                  fallbackText.style.color = '#333';
                  fallbackText.style.textTransform = 'uppercase';
                  fallbackText.style.letterSpacing = '0.5px';
                  e.target.parentNode.insertBefore(fallbackText, e.target.nextSibling);
                }}
              />
              <div className="feedora-company-info">
                <p>Premium animal feed and nutrition solutions for livestock, pets, and aquaculture. Quality you can trust.</p>
                <div className="feedora-contact-info">
                  <div className="feedora-contact-item">
                    <span className="feedora-contact-icon">📍</span>
                    <span>123 Feed Street, Agriculture City, AC 12345</span>
                  </div>
                  <div className="feedora-contact-item">
                    <span className="feedora-contact-icon">📞</span>
                    <span>+1 (555) 123-FEED</span>
                  </div>
                  <div className="feedora-contact-item">
                    <span className="feedora-contact-icon">✉️</span>
                    <span>info@feedora.com</span>
                  </div>
                </div>
              </div>
              
              <form className="feedora-newsletter-form" onSubmit={handleNewsletterSubmit}>
                <p style={{marginBottom: '10px', fontSize: '14px', fontWeight: '500'}}>Subscribe to Newsletter</p>
                <div className="feedora-newsletter-input">
                  <input
                    type="email"
                    placeholder="Your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <button type="submit" className="feedora-newsletter-btn">
                    Subscribe
                  </button>
                </div>
                {isSubscribed && (
                  <div className="feedora-success-message">
                    ✅ Successfully subscribed!
                  </div>
                )}
              </form>

              <div className="feedora-social-links">
                <a href="https://facebook.com" className="feedora-social-link feedora-facebook" title="Facebook">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a href="https://twitter.com" className="feedora-social-link feedora-twitter" title="Twitter">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
                <a href="https://instagram.com" className="feedora-social-link feedora-instagram" title="Instagram">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a href="https://youtube.com" className="feedora-social-link feedora-youtube" title="YouTube">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
                <a href="https://whatsapp.com" className="feedora-social-link feedora-whatsapp" title="WhatsApp">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.465 3.488"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="feedora-footer-section">
              <h4>Quick Links</h4>
              <ul>
                <li><a href="#" onClick={(e) => { e.preventDefault(); handleNavigation('home'); }}>Home</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); handleNavigation('about'); }}>About Us</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); handleNavigation('contact'); }}>Contact</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); handleNavigation('blogs'); }}>Blog</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); handleNavigation('technical'); }}>Technical Guide</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); handleNavigation('flashsale'); }}>Flash Sale</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); handleNavigation('wishlist'); }}>Wishlist</a></li>
              </ul>
            </div>

            {/* Product Categories */}
            <div className="feedora-footer-section">
              <h4>Categories</h4>
              <ul>
                <li><a href="#cattle-feed">Cattle Feed</a></li>
                <li><a href="#poultry-feed">Poultry Feed</a></li>
                <li><a href="#fish-feed">Fish Feed</a></li>
                <li><a href="#pet-food">Pet Food</a></li>
                <li><a href="#goat-feed">Goat Feed</a></li>
                <li><a href="#supplements">Supplements</a></li>
              </ul>
            </div>

            {/* Customer Service */}
            <div className="feedora-footer-section">
              <h4>Customer Service</h4>
              <ul>
                <li><a href="#help">Help Center</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); handleNavigation('order-tracking'); }}>Track Your Order</a></li>
                <li><a href="#bulk-orders">Bulk Orders</a></li>
                <li><a href="#returns">Returns</a></li>
                <li><a href="#support">Support</a></li>
                <li><a href="#faq">FAQ</a></li>
              </ul>
            </div>

            {/* Policies */}
            <div className="feedora-footer-section">
              <h4>Policies</h4>
              <ul>
                <li><a href="#" onClick={(e) => { e.preventDefault(); handleNavigation('privacy'); }}>Privacy Policy</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); handleNavigation('terms'); }}>Terms of Service</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); handleNavigation('shipping'); }}>Shipping Policy</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); handleNavigation('return-policy'); }}>Return Policy</a></li>
                <li><a href="#" onClick={(e) => { e.preventDefault(); handleNavigation('refund'); }}>Refund Policy</a></li>
                <li><a href="#cookies">Cookie Policy</a></li>
              </ul>
            </div>
          </div>

          <div className="feedora-footer-bottom">
            <div className="feedora-copyright">
              © 2024 Feedora. All rights reserved. | Premium Animal Nutrition Since 2020
            </div>
            <div className="feedora-legal-links">
              <a href="#security">Security</a>
              <a href="#accessibility">Accessibility</a>
              <a href="#sitemap">Sitemap</a>
              <a href="#careers">Careers</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;