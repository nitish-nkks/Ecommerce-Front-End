import React, { useState } from 'react';
import { Mail, Phone, Eye, EyeOff, User, Lock, X, Check, ArrowLeft, Shield } from 'lucide-react';
import { loginUser } from '../../api/api';
const Login = ({ onBackToHome, onSwitchToRegister, onLoginSuccess }) => {
  const [loginType, setLoginType] = useState('email');
  const [showPassword, setShowPassword] = useState(false);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    password: '',
    otp: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      alert("Please enter both email and password.");
      return;
    }

    try {
      const guestId = localStorage.getItem("guestId");

      const res = await loginUser(formData.email, formData.password, guestId);

      localStorage.setItem("token", res.data.token);

      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("role", res.data.role);

      if (onLoginSuccess) onLoginSuccess(res.data.user);
    } catch (err) {
      if (err.response && err.response.data?.message) {
        alert(err.response.data.message);
      } else {
        alert("Login failed. Please try again.");
      }
    }
  };

  const handleSendOtp = () => {
    if (formData.phone) {
      setOtpSent(true);
      setShowOtpModal(true);
    }
  };

  const handleVerifyOtp = () => {
    console.log('OTP Verification:', formData.otp);
    setShowOtpModal(false);
  };


  const OtpModal = () => (
    <div className="modal-overlay">
      <div className="modal-content">
        <button
          onClick={() => setShowOtpModal(false)}
          className="modal-close"
        >
          <X size={20} />
        </button>

        <div className="modal-header">
          <div className="modal-icon">
            <Shield size={28} />
          </div>
          <h3>Verify Your Number</h3>
          <p className="modal-subtitle">
            Enter the 6-digit verification code sent to
          </p>
          <span className="phone-number">{formData.phone}</span>
        </div>

        <div className="modal-body">
          <div className="otp-input-container">
            <input
              type="text"
              name="otp"
              placeholder="000000"
              value={formData.otp}
              onChange={handleInputChange}
              className="otp-input"
              maxLength="6"
            />
            <div className="otp-underline"></div>
          </div>

          <button
            onClick={handleVerifyOtp}
            className="verify-btn"
          >
            <Shield size={18} />
            Verify Code
          </button>

          <div className="resend-section">
            <p>Didn't receive the code?</p>
            <button className="resend-btn">
              Resend in 30s
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="login-container">
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .login-container {
          min-height: 100vh;
          display: flex;
          position: relative;
          overflow: hidden;
          background: linear-gradient(135deg, #f8fafc 0%, #e0f2fe 100%);
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
        }

        /* Background Pattern */
        .background-pattern {
          position: absolute;
          inset: 0;
          opacity: 0.1;
          background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2312b431' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='3'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
        }

        /* Left Section */
        .left-section {
          width: 50%;
          min-width: 500px;
          position: relative;
          overflow: hidden;
          background: linear-gradient(135deg, #ecfdf5 0%, #f0fdf4 50%, #f7fee7 100%);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* Particles Animation */
        .particles-container {
          position: absolute;
          inset: 0;
        }

        .particle {
          position: absolute;
          border-radius: 50%;
          opacity: 0.6;
          animation: float ease-in-out infinite;
        }

        .particle-0 {
          background: #f9f225;
          width: 4px;
          height: 4px;
        }

        .particle-1 {
          background: #fb923c;
          width: 6px;
          height: 6px;
        }

        .particle-2 {
          background: #12b431;
          width: 5px;
          height: 5px;
        }

        /* Background Elements */
        .bg-elements {
          position: absolute;
          inset: 0;
        }

        .bg-element {
          position: absolute;
          border-radius: 50%;
          opacity: 0.15;
        }

        .bg-element-1 {
          top: 80px;
          left: 80px;
          width: 120px;
          height: 120px;
          background: linear-gradient(135deg, #10b981, #059669);
          animation: pulse 4s infinite;
          box-shadow: 0 20px 40px rgba(16, 185, 129, 0.2);
        }

        .bg-element-2 {
          top: 200px;
          right: 100px;
          width: 80px;
          height: 80px;
          background: linear-gradient(135deg, #f9f225, #fb923c);
          animation: bounce 3s infinite;
          box-shadow: 0 15px 30px rgba(251, 146, 60, 0.2);
        }

        .bg-element-3 {
          bottom: 120px;
          left: 60px;
          width: 160px;
          height: 160px;
          background: linear-gradient(135deg, #34d399, #10b981);
          animation: ping 5s infinite;
          box-shadow: 0 25px 50px rgba(52, 211, 153, 0.15);
        }

        .bg-element-4 {
          bottom: 60px;
          right: 60px;
          width: 100px;
          height: 100px;
          background: linear-gradient(135deg, #a7f3d0, #6ee7b7);
          animation: pulse 3s infinite;
          box-shadow: 0 18px 35px rgba(167, 243, 208, 0.2);
        }

        /* Left Content */
        .left-content {
          position: relative;
          z-index: 10;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100%;
          padding: 0 40px;
          text-align: center;
          max-width: 500px;
        }

        /* Brand Logo - Updated for image */
        .brand-logo {
          margin-bottom: -110px;
          animation: logoFloat 6s ease-in-out infinite;
        }

        .logo-container {
          position: relative;
        }

        .logo-main {
          width: 300px;
          height: 300px;
         
          display: flex;
          align-items: center;
          justify-content: center;
         
         
          transition: transform 0.3s ease;
          overflow: hidden;
        }

        .logo-main:hover {
          transform: scale(1.05);
        }

        .brand-image {
          width: 100%;
          height: 100%;
         
          border-radius: 17px;
        }

       
        /* Welcome Text */
        .welcome-text {
          text-align: center;
          margin-bottom: 24px;
        }

        .welcome-text h1 {
          font-size: 2.5rem;
          font-weight: 800;
          color: #1f2937;
          margin-bottom: 12px;
          line-height: 1.1;
          text-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }

        .brand-name {
          background: linear-gradient(135deg, #12b431, #0ea025);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          display: block;
        }

        .subtitle {
          font-size: 1.1rem;
          color: #4b5563;
          margin-bottom: 8px;
          font-weight: 500;
          line-height: 1.4;
        }

        .description {
          font-size: 0.95rem;
          color: #6b7280;
          line-height: 1.4;
          max-width: 400px;
          margin: 0 auto;
        }

        /* Feed Icons */
        .feed-icons {
          display: flex;
          gap: 20px;
          margin-bottom: 24px;
          justify-content: center;
        }

        .feed-item {
          text-align: center;
          transition: transform 0.3s ease;
        }

        .feed-item:hover {
          transform: translateY(-3px);
        }

        .feed-icon {
          width: 56px;
          height: 56px;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 22px;
          margin-bottom: 6px;
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
          border: 2px solid white;
          transition: all 0.3s ease;
          cursor: pointer;
          animation: feedBounce 3s infinite ease-in-out;
        }

        .feed-icon:hover {
          transform: scale(1.05) rotate(3deg);
          box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
        }

        .poultry {
          background: linear-gradient(135deg, #12b431, #0ea025);
          animation-delay: 0s;
        }

        .fish {
          background: linear-gradient(135deg, #12b431, #275f2fff);
          animation-delay: 1s;
        }

        .shrimp {
          background: linear-gradient(135deg, #f9f225, #12b431);
          animation-delay: 2s;
        }

        .feed-item p {
          font-size: 0.8rem;
          font-weight: 600;
          color: #4b5563;
          margin: 0;
        }

        /* Trust Indicators */
        .trust-indicators {
          display: flex;
          gap: 16px;
          color: #6b7280;
          justify-content: center;
          flex-wrap: wrap;
        }

        .trust-item {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 6px 12px;
          background: rgba(255, 255, 255, 0.7);
          border-radius: 16px;
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.3);
          transition: all 0.3s ease;
        }

        .trust-item:hover {
          background: rgba(255, 255, 255, 0.9);
          transform: translateY(-1px);
        }

        .trust-item svg {
          color: #12b431;
        }

        .trust-item span {
          font-size: 0.75rem;
          font-weight: 500;
        }

        /* Right Section */
        .right-section {
          width: 50%;
          min-width: 500px;
          background: white;
          box-shadow: -10px 0 50px rgba(0, 0, 0, 0.1);
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .right-section::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, white 0%, #f9fafb 100%);
        }

        .login-form-container {
          position: relative;
          z-index: 10;
          width: 100%;
          max-width: 400px;
          padding: 32px 32px;
          margin-bottom: -70px;
        }

        /* Login Header - Updated for brand image */
        .login-header {
          text-align: center;
          margin-bottom: 24px;
        }

        .login-logo {
          width: 300px;
          height: 180px;
         
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top:-100px;
          
          transition: transform 0.3s ease;
          overflow: hidden;
        }

        .login-logo:hover {
          transform: scale(1.05);
        }

        .login-brand-image {
          width: 100%;
          height: 100%;
          margin-right: -80px;
          border-radius: 14px;
        }

        .login-header h2 {
          font-size: 1.75rem;
          font-weight: 700;
          color: #1f2937;
          margin-bottom: 4px;
        }

        .login-header p {
          color: #6b7280;
          font-size: 0.9rem;
        }

        /* Login Toggle */
        .login-toggle {
          display: flex;
          background: #f3f4f6;
          border-radius: 12px;
          padding: 4px;
          margin-bottom: 20px;
          box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.06);
          border: 1px solid #e5e7eb;
        }

        .toggle-btn {
          flex: 1;
          padding: 10px 16px;
          border: none;
          border-radius: 8px;
          font-size: 0.85rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          background: transparent;
          color: #6b7280;
        }

        .toggle-btn:hover {
          color: #1f2937;
          background: rgba(255, 255, 255, 0.5);
        }

        .toggle-btn.active {
          background: white;
          color: #1f2937;
          box-shadow: 0 3px 8px rgba(0, 0, 0, 0.1);
          transform: translateY(-1px);
        }

        /* Login Form */
        .login-form {
          margin-bottom: 20px;
        }

        .input-group {
          position: relative;
          margin-bottom: 16px;
        }

        .input-icon {
          position: absolute;
          left: 14px;
          top: 50%;
          transform: translateY(-50%);
          color: #9ca3af;
          transition: color 0.3s ease;
          z-index: 2;
        }

        .input-group:focus-within .input-icon {
          color: #12b431;
        }

        .form-input {
          width: 100%;
          padding: 12px 14px 12px 40px;
          border: 2px solid #e5e7eb;
          border-radius: 10px;
          font-size: 0.9rem;
          transition: all 0.3s ease;
          background: #f9fafb;
          color: #1f2937;
        }

        .form-input:focus {
          outline: none;
          border-color: #12b431;
          background: white;
          box-shadow: 0 0 0 3px rgba(18, 180, 49, 0.1);
        }

        .form-input::placeholder {
          color: #9ca3af;
        }

        .password-toggle {
          position: absolute;
          right: 14px;
          top: 50%;
          transform: translateY(-50%);
          border: none;
          background: none;
          color: #9ca3af;
          cursor: pointer;
          transition: color 0.3s ease;
        }

        .password-toggle:hover {
          color: #6b7280;
        }

        /* Form Options */
        .form-options {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }

        .checkbox-label {
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          color: #6b7280;
          font-size: 0.8rem;
          transition: color 0.3s ease;
        }

        .checkbox-label:hover {
          color: #1f2937;
        }

        .checkbox-label input[type="checkbox"] {
          width: 14px;
          height: 14px;
          border-radius: 3px;
          accent-color: #12b431;
        }

        .forgot-password {
          font-size: 0.8rem;
          color: #12b431;
          text-decoration: none;
          font-weight: 600;
          transition: color 0.3s ease;
        }

        .forgot-password:hover {
          color: #0ea025;
          text-decoration: underline;
        }

        /* Submit Buttons */
        .submit-btn {
          width: 100%;
          padding: 12px 20px;
          border: none;
          border-radius: 10px;
          font-size: 0.9rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
          background: linear-gradient(135deg, #12b431, #0ea025);
          color: white;
        }

        .submit-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
        }

        .submit-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          transform: none;
        }
/* Registration Section */
        .registration-section {
          text-align: center;
          padding: 16px;
          background: #f9fafb;
          border-radius: 10px;
          margin-bottom: 16px;
          border: 1px solid #e5e7eb;
        }

        .registration-section p {
          color: #6b7280;
          margin-bottom: 8px;
          font-size: 0.8rem;
        }

        .register-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          padding: 10px 20px;
          border: 2px solid #12b431;
          border-radius: 10px;
          color: #12b431;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.3s ease;
          font-size: 0.85rem;
          background: none;
          cursor: pointer;
        }

        .register-btn:hover {
          background: #12b431;
          color: white;
          transform: translateY(-1px);
          box-shadow: 0 3px 8px rgba(18, 180, 49, 0.3);
        }
        
        /* Updated Modal Styles */
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.7);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 50;
          padding: 20px;
          backdrop-filter: blur(8px);
        }

        .modal-content {
          background: white;
          border-radius: 24px;
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
          max-width: 400px;
          width: 100%;
          padding: 32px;
          position: relative;
          animation: modalSlideIn 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .modal-close {
          position: absolute;
          top: 16px;
          right: 16px;
          border: none;
          background: #f3f4f6;
          color: #6b7280;
          cursor: pointer;
          transition: all 0.3s ease;
          padding: 8px;
          border-radius: 8px;
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .modal-close:hover {
          background: #e5e7eb;
          color: #374151;
          transform: scale(1.05);
        }

        .modal-header {
          text-align: center;
          margin-bottom: 28px;
        }

        .modal-icon {
          width: 72px;
          height: 72px;
          background: linear-gradient(135deg, #12b431, #0ea025);
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 20px;
          color: white;
          box-shadow: 0 12px 24px rgba(18, 180, 49, 0.3);
          border: 3px solid white;
        }

        .modal-header h3 {
          font-size: 1.5rem;
          font-weight: 700;
          color: #1f2937;
          margin-bottom: 8px;
        }

        .modal-subtitle {
          color: #6b7280;
          line-height: 1.5;
          font-size: 0.9rem;
          margin-bottom: 8px;
        }

        .phone-number {
          font-weight: 700;
          color: #12b431;
          font-size: 1rem;
          display: block;
          margin-top: 4px;
        }

        .modal-body {
          margin-bottom: 0;
        }

        .otp-input-container {
          position: relative;
          margin-bottom: 24px;
        }

        .otp-input {
          width: 100%;
          text-align: center;
          font-size: 1.5rem;
          font-weight: 700;
          letter-spacing: 0.5em;
          padding: 16px 20px;
          border: 2px solid #e5e7eb;
          border-radius: 16px;
          background: #f9fafb;
          color: #1f2937;
          transition: all 0.3s ease;
        }

        .otp-input:focus {
          outline: none;
          border-color: #12b431;
          background: white;
          box-shadow: 0 0 0 4px rgba(18, 180, 49, 0.1);
          transform: scale(1.02);
        }

        .otp-input::placeholder {
          color: #d1d5db;
          font-weight: 400;
        }

        .otp-underline {
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 3px;
          background: linear-gradient(135deg, #12b431, #0ea025);
          border-radius: 2px;
          transition: width 0.3s ease;
        }

        .otp-input:focus + .otp-underline {
          width: 60%;
        }

        .verify-btn {
          width: 100%;
          padding: 16px 24px;
          background: linear-gradient(135deg, #12b431, #0ea025);
          color: white;
          border: none;
          border-radius: 16px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-bottom: 20px;
          box-shadow: 0 8px 16px rgba(18, 180, 49, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .verify-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 24px rgba(18, 180, 49, 0.4);
        }

        .verify-btn:active {
          transform: translateY(0);
        }

        .resend-section {
          text-align: center;
          padding: 16px;
          background: #f8fafc;
          border-radius: 12px;
          border: 1px solid #e2e8f0;
        }

        .resend-section p {
          color: #64748b;
          margin-bottom: 8px;
          font-size: 0.85rem;
        }

        .resend-btn {
          color: #12b431;
          font-weight: 600;
          border: none;
          background: none;
          cursor: pointer;
          font-size: 0.9rem;
          transition: all 0.3s ease;
          padding: 6px 12px;
          border-radius: 6px;
        }

        .resend-btn:hover {
          background: rgba(18, 180, 49, 0.1);
          color: #0ea025;
        }

        /* Animations */
        @keyframes float {
          0% { 
            transform: translateY(0px) rotate(0deg); 
          }
          50% { 
            transform: translateY(-15px) rotate(1deg); 
          }
          100% { 
            transform: translateY(0px) rotate(0deg); 
          }
        }

        @keyframes logoFloat {
          0%, 100% { 
            transform: translateY(0px); 
          }
          50% { 
            transform: translateY(-8px); 
          }
        }

        @keyframes feedBounce {
          0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-6px);
          }
          60% {
            transform: translateY(-3px);
          }
        }

        @keyframes bounce {
          0%, 20%, 53%, 80%, 100% {
            transform: translate3d(0, 0, 0);
          }
          40%, 43% {
            transform: translate3d(0, -8px, 0);
          }
          70% {
            transform: translate3d(0, -4px, 0);
          }
          90% {
            transform: translate3d(0, -2px, 0);
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 0.15;
            transform: scale(1);
          }
          50% {
            opacity: 0.25;
            transform: scale(1.05);
          }
        }

        @keyframes ping {
          0% {
            transform: scale(1);
            opacity: 0.15;
          }
          75%, 100% {
            transform: scale(1.1);
            opacity: 0;
          }
        }

        @keyframes modalSlideIn {
          0% { 
            transform: scale(0.8) translateY(40px); 
            opacity: 0; 
          }
          100% { 
            transform: scale(1) translateY(0); 
            opacity: 1; 
          }
        }

        /* Responsive Design */
        @media (max-width: 1200px) {
          .left-section {
            min-width: 400px;
          }
          
          .right-section {
            min-width: 400px;
          }
          
          .welcome-text h1 {
            font-size: 2.2rem;
          }
          
          .login-form-container {
            padding: 24px 24px;
          }
        }

        @media (max-width: 1024px) {
          .login-container {
            flex-direction: column;
          }

          .left-section {
            width: 100%;
            min-width: auto;
            min-height: 40vh;
          }

          .right-section {
            width: 100%;
            min-width: auto;
            min-height: 60vh;
          }

          .welcome-text h1 {
            font-size: 2rem;
          }

          .login-form-container {
            padding: 24px 20px;
          }
          
          .left-content {
            padding: 0 32px;
          }
        }

        @media (max-width: 768px) {
          .left-content {
            padding: 0 20px;
          }

          .welcome-text h1 {
            font-size: 1.8rem;
          }

          .subtitle {
            font-size: 1rem;
          }

          .description {
            font-size: 0.9rem;
          }

          .feed-icons {
            gap: 16px;
          }

          .feed-icon {
            width: 48px;
            height: 48px;
            font-size: 18px;
          }

          .trust-indicators {
            flex-direction: column;
            gap: 10px;
            align-items: center;
          }

          .login-form-container {
            padding: 20px 16px;
          }

          .modal-content {
            margin: 12px;
            padding: 24px;
          }
        }

        @media (max-width: 480px) {
          .logo-main {
            width: 100px;
            height: 100px;
          }

          .logo-badge {
            width: 24px;
            height: 24px;
            font-size: 10px;
          }

          .welcome-text h1 {
            font-size: 1.5rem;
          }

          .feed-icons {
            gap: 12px;
          }

          .feed-icon {
            width: 40px;
            height: 40px;
            font-size: 16px;
          }
          
          .trust-indicators {
            gap: 8px;
          }
          
          .trust-item {
            padding: 4px 8px;
          }
          
          .trust-item span {
            font-size: 0.7rem;
          }
          
          .login-form-container {
            padding: 16px 12px;
          }

          .modal-content {
            padding: 20px;
          }

          .modal-icon {
            width: 60px;
            height: 60px;
          }

          .otp-input {
            font-size: 1.3rem;
            padding: 14px 16px;
          }
        }
      `}</style>

      {/* Background Pattern */}
      <div className="background-pattern"></div>

      {/* Left Side - Animated Feed Theme */}
      <div className="left-section">
        {/* Floating Feed Particles */}
        <div className="particles-container">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className={`particle particle-${i % 3}`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`
              }}
            />
          ))}
        </div>

        {/* Background Elements */}
        <div className="bg-elements">
          <div className="bg-element bg-element-1"></div>
          <div className="bg-element bg-element-2"></div>
          <div className="bg-element bg-element-3"></div>
          <div className="bg-element bg-element-4"></div>
        </div>

        {/* Main Content */}
        <div className="left-content">
          {/* Brand Logo - Updated for your brand image */}
          <div className="brand-logo">
            <div className="logo-container">
              <div className="logo-main">
                {/* Replace src with your brand image path */}
                <img
                  src="/src/assets/brand-logo.png"
                  alt="Brand Logo"
                  className="brand-image"

                />
              </div>
              <div className="logo-badge">✨</div>
            </div>
          </div>

          {/* Welcome Text */}
          <div className="welcome-text">
            <h1>
              Welcome to <br />
              <span className="brand-name">Feedora</span>
            </h1>
            <p className="subtitle">Premium nutrition solutions for your livestock</p>
            <p className="description">Trusted by farmers worldwide for poultry, fish, and shrimp feed excellence</p>
          </div>

          {/* Animated Feed Icons */}
          <div className="feed-icons">
            <div className="feed-item">
              <div className="feed-icon poultry">🐔</div>
              <p>Poultry</p>
            </div>
            <div className="feed-item">
              <div className="feed-icon fish">🐟</div>
              <p>Fish</p>
            </div>
            <div className="feed-item">
              <div className="feed-icon shrimp">🦐</div>
              <p>Shrimp</p>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="trust-indicators">
            <div className="trust-item">
              <Check size={20} />
              <span>ISO Certified</span>
            </div>
            <div className="trust-item">
              <Check size={20} />
              <span>Premium Quality</span>
            </div>
            <div className="trust-item">
              <Check size={20} />
              <span>24/7 Support</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Container */}
      <div className="right-section">
        <div className="login-form-container">
          {/* Login Header with Brand Image */}
          <div className="login-header">
            <div className="login-logo">
              {/* Replace src with your brand image path */}
              <img
                src="/src/assets/logo.png"
                alt="Company Logo"
                className="login-brand-image"

              />
            </div>
            <h2>Login</h2>

          </div>

          {/* Login Type Toggle */}
          <div className="login-toggle">
            <button
              onClick={() => setLoginType('email')}
              className={`toggle-btn ${loginType === 'email' ? 'active' : ''}`}
            >
              <Mail size={16} />
              Email Login
            </button>
            <button
              onClick={() => setLoginType('mobile')}
              className={`toggle-btn ${loginType === 'mobile' ? 'active' : ''}`}
            >
              <Phone size={16} />
              Mobile OTP
            </button>
          </div>

          {/* Login Form */}
          <div className="login-form">
            {loginType === 'email' ? (
              <>
                <div className="input-group">
                  <Mail className="input-icon" size={20} />
                  <input
                    type="email"
                    name="email"
                    placeholder="Enter your email address"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="form-input"
                    required
                  />
                </div>
                <div className="input-group">
                  <Lock className="input-icon" size={20} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="form-input"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="password-toggle"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </>
            ) : (
              <div className="input-group">
                <Phone className="input-icon" size={20} />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Enter your mobile number"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                />
              </div>
            )}

            {loginType === 'email' && (
              <div className="form-options">
                <label className="checkbox-label">
                  <input type="checkbox" />
                  <span>Remember me</span>
                </label>
                <a href="#" className="forgot-password">Forgot password?</a>
              </div>
            )}

            {loginType === 'mobile' ? (
              <button
                onClick={handleSendOtp}
                disabled={!formData.phone}
                className="submit-btn otp-btn"
              >
                Send OTP
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="submit-btn login-btn"
              >
                Sign In
              </button>
            )}
          </div>
          {/* Updated Registration Section */}
          <div className="registration-section">
            <p>New to NutriFeeds Pro?</p>
            <button onClick={onSwitchToRegister} className="register-btn">
              Create Account
            </button>
          </div>
        </div>
      </div>

      {/* OTP Verification Modal */}
      {showOtpModal && <OtpModal />}
    </div>
  );
};

export default Login;