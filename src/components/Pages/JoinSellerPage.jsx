// src/components/Pages/JoinSellerPage.jsx
import React, { useState } from 'react';
import { Store, User, Phone, Mail, MapPin, Eye, EyeOff, Upload, ArrowLeft, CheckCircle } from 'lucide-react';

const JoinSellerPage = ({ onBackToHome }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [formData, setFormData] = useState({
    // Personal Info
    fullName: '',
    email: '',
    phoneNumber: '',
    password: '',
    confirmPassword: '',
    
    // Basic Info
    shopName: '',
    address: '',
    
    // Warehouse Info
    warehouseName: '',
    contactPerson: '',
    contactMobile: '',
    addressLine1: '',
    addressLine2: '',
    country: '',
    state: '',
    city: '',
    warehouseZipcode: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Seller registration data:', formData);
    // Handle form submission
  };

  const isStepValid = (step) => {
    switch(step) {
      case 1:
        return formData.fullName && formData.email && formData.phoneNumber && 
               formData.password && formData.confirmPassword && 
               formData.password === formData.confirmPassword;
      case 2:
        return formData.shopName && formData.address;
      case 3:
        return formData.warehouseName && formData.contactPerson && 
               formData.contactMobile && formData.addressLine1 && 
               formData.country && formData.state && formData.city && 
               formData.warehouseZipcode;
      default:
        return false;
    }
  };

  return (
    <div className="join-seller-container">
      <style jsx>{`
        .join-seller-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #f8fafc 0%, #e0f2fe 100%);
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        }

        .seller-header {
          background: linear-gradient(135deg, #12b431 0%, #0ea025 100%);
          color: white;
          padding: 24px 0;
          position: relative;
        }

        .back-button {
          position: absolute;
          top: 24px;
          left: 24px;
          background: rgba(255, 255, 255, 0.2);
          border: none;
          border-radius: 12px;
          padding: 12px;
          cursor: pointer;
          transition: all 0.3s ease;
          color: white;
          backdrop-filter: blur(10px);
        }

        .back-button:hover {
          background: rgba(255, 255, 255, 0.3);
          transform: translateX(-2px);
        }

        .header-content {
          max-width: 1200px;
          margin: 0 auto;
          text-align: center;
          padding: 0 20px;
        }

        .header-icon {
          width: 80px;
          height: 80px;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 16px;
          color: white;
          backdrop-filter: blur(10px);
        }

        .header-title {
          font-size: 2.5rem;
          font-weight: 800;
          margin-bottom: 8px;
        }

        .header-subtitle {
          font-size: 1.1rem;
          opacity: 0.9;
          max-width: 600px;
          margin: 0 auto;
        }

        .seller-main {
          max-width: 800px;
          margin: 0 auto;
          padding: 40px 20px;
        }

        .progress-bar {
          display: flex;
          justify-content: center;
          margin-bottom: 40px;
        }

        .progress-step {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .step-circle {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          color: white;
          transition: all 0.3s ease;
        }

        .step-circle.active {
          background: #12b431;
        }

        .step-circle.completed {
          background: #059669;
        }

        .step-circle.inactive {
          background: #d1d5db;
          color: #6b7280;
        }

        .step-line {
          width: 80px;
          height: 2px;
          background: #d1d5db;
          margin: 0 16px;
        }

        .step-line.completed {
          background: #059669;
        }

        .form-card {
          background: white;
          border-radius: 16px;
          padding: 32px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          margin-bottom: 24px;
        }

        .form-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: #1f2937;
          margin-bottom: 8px;
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .form-subtitle {
          color: #6b7280;
          margin-bottom: 24px;
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        .form-label {
          display: block;
          margin-bottom: 6px;
          font-weight: 600;
          color: #374151;
          font-size: 0.875rem;
        }

        .form-label.required::after {
          content: ' *';
          color: #ef4444;
        }

        .form-input {
          width: 100%;
          padding: 12px 16px;
          border: 2px solid #e5e7eb;
          border-radius: 8px;
          font-size: 0.95rem;
          transition: all 0.3s ease;
          background: #f9fafb;
          box-sizing: border-box;
        }

        .form-input:focus {
          outline: none;
          border-color: #12b431;
          background: white;
          box-shadow: 0 0 0 3px rgba(18, 180, 49, 0.1);
        }

        .password-input-group {
          position: relative;
        }

        .password-toggle {
          position: absolute;
          right: 12px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          color: #9ca3af;
          cursor: pointer;
          transition: color 0.3s ease;
        }

        .password-toggle:hover {
          color: #6b7280;
        }

        .country-select {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .country-flag {
          font-size: 1.2rem;
        }

        .form-actions {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
          margin-top: 32px;
        }

        .btn {
          padding: 12px 24px;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.875rem;
        }

        .btn-secondary {
          background: #f3f4f6;
          color: #374151;
          border: 1px solid #d1d5db;
        }

        .btn-secondary:hover {
          background: #e5e7eb;
        }

        .btn-secondary:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .btn-primary {
          background: linear-gradient(135deg, #12b431, #0ea025);
          color: white;
          border: none;
        }

        .btn-primary:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(18, 180, 49, 0.3);
        }

        .btn-primary:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          transform: none;
        }

        .password-requirements {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-top: 8px;
          padding: 8px 12px;
          background: #f0f9ff;
          border-radius: 8px;
          border: 1px solid #e0f2fe;
        }

        .password-requirements.error {
          background: #fef2f2;
          border-color: #fecaca;
        }

        .password-requirements.success {
          background: #f0fdf4;
          border-color: #bbf7d0;
        }

        .password-requirements svg {
          color: #0284c7;
        }

        .password-requirements.error svg {
          color: #dc2626;
        }

        .password-requirements.success svg {
          color: #059669;
        }

        .password-requirements span {
          font-size: 0.8rem;
          color: #0369a1;
        }

        .password-requirements.error span {
          color: #dc2626;
        }

        .password-requirements.success span {
          color: #059669;
        }

        @media (max-width: 768px) {
          .header-title {
            font-size: 2rem;
          }
          
          .seller-main {
            padding: 24px 16px;
          }
          
          .form-card {
            padding: 24px;
          }
          
          .form-row {
            grid-template-columns: 1fr;
          }
          
          .form-actions {
            flex-direction: column;
          }
          
          .btn {
            width: 100%;
            justify-content: center;
          }
          
          .progress-bar {
            flex-direction: column;
            align-items: center;
          }
          
          .step-line {
            width: 2px;
            height: 40px;
            margin: 8px 0;
          }
        }
      `}</style>

      {/* Header */}
      <div className="seller-header">
        <button onClick={onBackToHome} className="back-button">
          <ArrowLeft size={20} />
        </button>
        
        <div className="header-content">
          <div className="header-icon">
            <Store size={40} />
          </div>
          <h1 className="header-title">Join as Seller</h1>
          <p className="header-subtitle">
            Start selling your feed products on Feedora and reach thousands of farmers across India
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="seller-main">
        {/* Progress Bar */}
        <div className="progress-bar">
          <div className="progress-step">
            <div className={`step-circle ${currentStep >= 1 ? 'active' : 'inactive'}`}>
              1
            </div>
            <div className={`step-line ${currentStep > 1 ? 'completed' : ''}`}></div>
          </div>
          <div className="progress-step">
            <div className={`step-circle ${currentStep >= 2 ? 'active' : currentStep > 2 ? 'completed' : 'inactive'}`}>
              2
            </div>
            <div className={`step-line ${currentStep > 2 ? 'completed' : ''}`}></div>
          </div>
          <div className="progress-step">
            <div className={`step-circle ${currentStep >= 3 ? 'active' : 'inactive'}`}>
              3
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Step 1: Personal Info */}
          {currentStep === 1 && (
            <div className="form-card">
              <h2 className="form-title">
                <User size={24} />
                Personal Information
              </h2>
              <p className="form-subtitle">Tell us about yourself to get started</p>

              <div className="form-group">
                <label className="form-label required">Your name</label>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label required">Your Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label required">Your phone number</label>
                <div className="country-select">
                  <span className="country-flag">🇮🇳</span>
                  <span style={{fontWeight: '600', color: '#374151'}}>+91</span>
                  <input
                    type="tel"
                    name="phoneNumber"
                    placeholder="Phone Number"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    className="form-input"
                    style={{flex: 1, marginLeft: '8px'}}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label required">Password</label>
                <div className="password-input-group">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="form-input"
                    required
                    minLength="6"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="password-toggle"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {formData.password && formData.password.length < 8 && (
                  <div className="password-requirements error">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                    <span>Password must contain at least 8 digits.</span>
                  </div>
                )}
              </div>

              <div className="form-group">
                <label className="form-label required">Confirm Password</label>
                <div className="password-input-group">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="form-input"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="password-toggle"
                  >
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                  <div className="password-requirements error">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                    <span>Passwords do not match.</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Step 2: Basic Info */}
          {currentStep === 2 && (
            <div className="form-card">
              <h2 className="form-title">
                <Store size={24} />
                Basic Information
              </h2>
              <p className="form-subtitle">Tell us about your business</p>

              <div className="form-group">
                <label className="form-label required">Shop Name</label>
                <input
                  type="text"
                  name="shopName"
                  placeholder="Shop Name"
                  value={formData.shopName}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label required">Address</label>
                <textarea
                  name="address"
                  placeholder="Address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="form-input"
                  rows="3"
                  required
                ></textarea>
              </div>
            </div>
          )}

          {/* Step 3: Warehouse Info */}
          {currentStep === 3 && (
            <div className="form-card">
              <h2 className="form-title">
                <MapPin size={24} />
                Warehouse Information
              </h2>
              <p className="form-subtitle">Provide your warehouse details for shipping</p>

              <div className="form-group">
                <label className="form-label required">Name</label>
                <input
                  type="text"
                  name="warehouseName"
                  placeholder="Name"
                  value={formData.warehouseName}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label required">Contact Person</label>
                <input
                  type="text"
                  name="contactPerson"
                  placeholder="Contact Person"
                  value={formData.contactPerson}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label required">Contact Mobile Number</label>
                <div className="country-select">
                  <span className="country-flag">🇮🇳</span>
                  <span style={{fontWeight: '600', color: '#374151'}}>+91</span>
                  <input
                    type="tel"
                    name="contactMobile"
                    placeholder="Contact Mobile Number"
                    value={formData.contactMobile}
                    onChange={handleInputChange}
                    className="form-input"
                    style={{flex: 1, marginLeft: '8px'}}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label required">Address Line 1</label>
                <textarea
                  name="addressLine1"
                  placeholder="Address Line 1"
                  value={formData.addressLine1}
                  onChange={handleInputChange}
                  className="form-input"
                  rows="2"
                  required
                ></textarea>
              </div>

              <div className="form-group">
                <label className="form-label">Address Line 2</label>
                <textarea
                  name="addressLine2"
                  placeholder="Address Line 2"
                  value={formData.addressLine2}
                  onChange={handleInputChange}
                  className="form-input"
                  rows="2"
                ></textarea>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label required">Country</label>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className="form-input"
                    required
                  >
                    <option value="">Select your Country</option>
                    <option value="IN">🇮🇳 India</option>
                    <option value="US">🇺🇸 United States</option>
                    <option value="GB">🇬🇧 United Kingdom</option>
                    <option value="CA">🇨🇦 Canada</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label required">State</label>
                  <select
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className="form-input"
                    required
                  >
                    <option value="">Nothing selected</option>
                    <option value="MH">Maharashtra</option>
                    <option value="DL">Delhi</option>
                    <option value="KA">Karnataka</option>
                    <option value="TN">Tamil Nadu</option>
                    <option value="UP">Uttar Pradesh</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label required">City</label>
                  <select
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="form-input"
                    required
                  >
                    <option value="">Nothing selected</option>
                    <option value="Mumbai">Mumbai</option>
                    <option value="Delhi">Delhi</option>
                    <option value="Bangalore">Bangalore</option>
                    <option value="Chennai">Chennai</option>
                    <option value="Lucknow">Lucknow</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label required">Warehouse Zipcode</label>
                  <input
                    type="text"
                    name="warehouseZipcode"
                    placeholder="Warehouse Zipcode"
                    value={formData.warehouseZipcode}
                    onChange={handleInputChange}
                    className="form-input"
                    required
                  />
                </div>
              </div>
            </div>
          )}

          {/* Form Actions */}
          <div className="form-actions">
            <button
              type="button"
              onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
              className="btn btn-secondary"
              disabled={currentStep === 1}
            >
              <ArrowLeft size={16} />
              Previous
            </button>

            {currentStep < 3 ? (
              <button
                type="button"
                onClick={() => setCurrentStep(currentStep + 1)}
                className="btn btn-primary"
                disabled={!isStepValid(currentStep)}
              >
                Next
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <polyline points="9,18 15,12 9,6"></polyline>
                </svg>
              </button>
            ) : (
              <button
                type="submit"
                className="btn btn-primary"
                disabled={!isStepValid(currentStep)}
              >
                <CheckCircle size={16} />
                Register Your Shop
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default JoinSellerPage;