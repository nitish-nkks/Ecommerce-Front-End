import React, { useState, useMemo, useCallback } from 'react';
import {
  Phone, User, Lock, Eye, EyeOff, ArrowLeft, Wheat, Users, Award, TrendingUp, Mail
} from 'lucide-react';
import { registerCustomer } from '../../api/api';

const MIN_PASSWORD_LENGTH = 6;
const PHONE_DIGITS = 10;

const useRegistrationForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    phone: ''
  });
  const [status, setStatus] = useState({
    isLoading: false,
    successMessage: '',
    errorMessage: ''
  });

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    if (name === 'phone') {
      const digitsOnly = value.replace(/\D/g, '').slice(0, PHONE_DIGITS);
      setFormData((prev) => ({ ...prev, phone: digitsOnly }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  }, []);

  const isEmailValid = useMemo(() => /^[^@\s]+@gmail\.com$/i.test(formData.email.trim()), [formData.email]);
  const isPhoneValid = useMemo(() => /^\d{10}$/.test(formData.phone), [formData.phone]);
  const isPasswordValid = useMemo(() => formData.password.length >= MIN_PASSWORD_LENGTH, [formData.password]);
  const isNameValid = useMemo(() => formData.firstName.trim() && formData.lastName.trim(), [formData.firstName, formData.lastName]);

  const isFormValid = isNameValid && isEmailValid && isPhoneValid && isPasswordValid;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid || status.isLoading) return;

    setStatus({ isLoading: true, successMessage: '', errorMessage: '' });

    const payload = {
      firstName: formData.firstName.trim(),
      lastName: formData.lastName.trim(),
      email: formData.email.trim(),
      passwordHash: formData.password,
      phoneNumber: `+91${formData.phone}`
    };

    try {
      const res = await registerCustomer(payload);
      const data = res?.data ?? res;

      if ((res?.status >= 200 && res?.status < 300) || data?.success) {
        setStatus({ isLoading: false, successMessage: 'Account created successfully!', errorMessage: '' });
        setFormData({ firstName: '', lastName: '', email: '', password: '', phone: '' });
      } else {
        setStatus({ isLoading: false, successMessage: '', errorMessage: data?.message || 'Registration failed' });
      }
    } catch (err) {
      const serverMsg = err?.response?.data?.message || err?.message || 'An unexpected server error occurred.';
      setStatus({ isLoading: false, successMessage: '', errorMessage: serverMsg });
      console.error('Registration Error:', err);
    }
  };

  return {
    formData,
    status,
    handleInputChange,
    handleSubmit,
    validity: {
      isEmailValid,
      isPhoneValid,
      isPasswordValid,
      isFormValid
    }
  };
};

// --- Reusable Components ---
const FormInput = React.memo(({ name, type = 'text', value, onChange, placeholder, icon: Icon, children, ...props }) => (
  <div style={styles.inputGroup}>
    {Icon && <Icon style={styles.inputIcon} size={18} />}
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      style={{ ...styles.input, paddingLeft: Icon ? '44px' : '16px' }}
      {...props}
    />
    {children}
  </div>
));

const FeatureCard = React.memo(({ icon: Icon, title, description, iconBgColor, iconColor }) => (
  <div style={styles.featureCard}>
    <div style={{ ...styles.featureIcon, backgroundColor: iconBgColor }}>
      <Icon size={20} style={{ color: iconColor }} />
    </div>
    <h3 style={styles.featureTitle}>{title}</h3>
    <p style={styles.featureDescription}>{description}</p>
  </div>
));

const StatItem = React.memo(({ value, label, color, style }) => (
  <div style={{ ...styles.statItem, ...style }}>
    <div style={{ ...styles.statNumber, color }}>{value}</div>
    <div style={styles.statLabel}>{label}</div>
  </div>
));


// --- Main Components ---
const LeftSide = React.memo(({ onBackToLogin }) => (
  <div style={styles.leftSide}>
    <div style={styles.backgroundPattern}>
      <div style={{ ...styles.bgCircle, top: '40px', left: '40px', width: '80px', height: '80px', backgroundColor: '#059669' }} />
      <div style={{ ...styles.bgCircle, top: '160px', right: '64px', width: '64px', height: '64px', backgroundColor: '#10b981' }} />
      <div style={{ ...styles.bgCircle, bottom: '80px', left: '80px', width: '96px', height: '96px', backgroundColor: '#65a30d' }} />
      <div style={{ ...styles.bgCircle, bottom: '160px', right: '40px', width: '48px', height: '48px', backgroundColor: '#16a34a' }} />
    </div>

    <button onClick={onBackToLogin} style={styles.backButton} aria-label="Back to Login">
      <ArrowLeft size={18} />
    </button>

    <div style={styles.brandSection}>
      <div style={styles.brandLogo}><Wheat size={48} style={{ color: 'white' }} /></div>
      <div style={styles.brandText}>
        <h1 style={styles.brandTitle}>Join <span style={styles.brandName}>Feedora</span></h1>
        <p style={styles.brandSubtitle}>Premium livestock nutrition solutions for healthier animals and better yields</p>
      </div>

      <div style={styles.featuresGrid}>
        <FeatureCard icon={Wheat} title="Quality Feed" description="Premium nutrition for all livestock" iconBgColor="#dcfce7" iconColor="#059669" />
        <FeatureCard icon={Users} title="Expert Support" description="24/7 veterinary guidance" iconBgColor="#d1fae5" iconColor="#10b981" />
        <FeatureCard icon={Award} title="Certified" description="ISO certified products" iconBgColor="#ecfccb" iconColor="#65a30d" />
        <FeatureCard icon={TrendingUp} title="Results" description="Proven growth outcomes" iconBgColor="#dcfce7" iconColor="#059669" />
      </div>

      <div style={styles.statsCard}>
        <div style={styles.statsGrid}>
          <StatItem value="50K+" label="Happy Farmers" color="#059669" />
          <StatItem value="200+" label="Feed Products" color="#10b981" style={{ borderLeft: '1px solid #e5e7eb', borderRight: '1px solid #e5e7eb' }} />
          <StatItem value="15+" label="Years Experience" color="#65a30d" />
        </div>
      </div>
    </div>
  </div>
));

const RegistrationForm = ({ onBackToLogin }) => {
  const { formData, status, handleInputChange, handleSubmit, validity } = useRegistrationForm();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div style={styles.rightSide}>
      <div style={styles.formContainer}>
        <div style={styles.formHeader}>
          <h2 style={styles.formTitle}>Create Account</h2>
          <p style={styles.formSubtitle}>Fill in your details to get started</p>
        </div>

        <form style={styles.formContent} onSubmit={handleSubmit} noValidate>
          <div style={styles.inputGroup}>
            <span style={styles.countryCodeDisplay}>IN +91</span>
            <input
              type="tel"
              name="phone"
              placeholder="12345 67890"
              value={formData.phone}
              onChange={handleInputChange}
              style={{ ...styles.input, paddingLeft: '70px' }}
              aria-label="phone"
              required
              autoFocus
            />
          </div>
          <FormInput name="firstName" placeholder="First name" value={formData.firstName} onChange={handleInputChange} icon={User} required />
          <FormInput name="lastName" placeholder="Last name" value={formData.lastName} onChange={handleInputChange} icon={User} required />
          <FormInput name="email" type="email" placeholder="Email (must end with @gmail.com)" value={formData.email} onChange={handleInputChange} icon={Mail} required />

          <div style={styles.inputGroup}>
            <Lock style={styles.inputIcon} size={18} />
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              placeholder="Password (min 6 characters)"
              value={formData.password}
              onChange={handleInputChange}
              style={{ ...styles.input, paddingLeft: '44px', paddingRight: '48px' }}
              minLength={MIN_PASSWORD_LENGTH}
              required
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)} style={styles.passwordToggle} aria-label={showPassword ? "Hide password" : "Show password"}>
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <div aria-live="polite">
            {status.successMessage && <div style={{ color: 'green', padding: '8px 12px', borderRadius: 6 }}>{status.successMessage}</div>}
            {status.errorMessage && <div style={{ color: 'red', padding: '8px 12px', borderRadius: 6 }}>{status.errorMessage}</div>}
          </div>

          <button
            type="submit"
            style={{
              ...styles.submitButton,
              opacity: !validity.isFormValid || status.isLoading ? 0.6 : 1,
              cursor: !validity.isFormValid || status.isLoading ? 'not-allowed' : 'pointer'
            }}
            disabled={!validity.isFormValid || status.isLoading}
          >
            {status.isLoading ? 'Creating account...' : 'Create Account'}
          </button>

          <div style={styles.verificationNote}>
            <p style={styles.verificationText}>We'll send you a verification code via SMS if required. Message rates may apply.</p>
          </div>

          <div style={styles.loginLink}>
            <p style={styles.loginText}>Already a customer?</p>
            <button type="button" onClick={onBackToLogin} style={styles.loginButton}>Sign in instead</button>
          </div>
        </form>
      </div>
    </div>
  );
};

const Registration = ({ onBackToLogin }) => (
  <div style={styles.container}>
    <LeftSide onBackToLogin={onBackToLogin} />
    <RegistrationForm onBackToLogin={onBackToLogin} />
  </div>
);

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    background: 'linear-gradient(135deg, #f8fafc 0%, #e0f2fe 100%)',
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
  },
  leftSide: {
    width: '50%',
    background: 'linear-gradient(135deg, #ecfdf5 0%, #f0fdf4 50%, #f7fee7 100%)',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: '0 48px',
    overflow: 'hidden'
  },
  backgroundPattern: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.05
  },
  bgCircle: {
    position: 'absolute',
    borderRadius: '50%'
  },
  backButton: {
    position: 'absolute',
    top: '24px',
    left: '24px',
    background: 'rgba(255, 255, 255, 0.9)',
    border: 'none',
    borderRadius: '12px',
    padding: '12px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    color: '#6b7280',
    backdropFilter: 'blur(10px)'
  },
  brandSection: {
    position: 'relative',
    zIndex: 10
  },
  brandLogo: {
    width: '128px',
    height: '128px',
    background: 'linear-gradient(135deg, #059669, #0ea025)',
    borderRadius: '16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 24px',
    boxShadow: '0 20px 40px rgba(5, 150, 105, 0.3)',
    border: '4px solid white'
  },
  brandText: {
    textAlign: 'center',
    marginBottom: '32px'
  },
  brandTitle: {
    fontSize: '1.875rem',
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: '8px',
    margin: '0 0 8px 0'
  },
  brandName: {
    background: 'linear-gradient(135deg, #059669, #0ea025)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text'
  },
  brandSubtitle: {
    color: '#6b7280',
    fontSize: '0.875rem',
    lineHeight: '1.5',
    margin: 0
  },
  featuresGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '16px',
    marginBottom: '24px'
  },
  featureCard: {
    background: 'rgba(255, 255, 255, 0.7)',
    backdropFilter: 'blur(10px)',
    borderRadius: '12px',
    padding: '16px',
    textAlign: 'center',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
  },
  featureIcon: {
    width: '40px',
    height: '40px',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 8px'
  },
  featureTitle: {
    fontWeight: '600',
    color: '#1f2937',
    fontSize: '0.875rem',
    marginBottom: '4px',
    margin: '0 0 4px 0'
  },
  featureDescription: {
    fontSize: '0.75rem',
    color: '#6b7280',
    margin: 0
  },
  statsCard: {
    background: 'rgba(255, 255, 255, 0.8)',
    backdropFilter: 'blur(10px)',
    borderRadius: '12px',
    padding: '16px',
    textAlign: 'center',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr'
  },
  statItem: {
    padding: '0 12px'
  },
  statNumber: {
    fontWeight: 'bold',
    fontSize: '1.125rem'
  },
  statLabel: {
    fontSize: '0.75rem',
    color: '#6b7280'
  },
  rightSide: {
    width: '50%',
    background: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '-10px 0 50px rgba(0, 0, 0, 0.1)'
  },
  formContainer: {
    width: '100%',
    maxWidth: '384px',
    padding: '0 32px'
  },
  formHeader: {
    textAlign: 'center',
    marginBottom: '24px'
  },
  formTitle: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: '8px',
    margin: '0 0 8px 0'
  },
  formSubtitle: {
    color: '#6b7280',
    fontSize: '0.875rem',
    margin: 0
  },
  formContent: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  inputGroup: {
    position: 'relative'
  },
  inputIcon: {
    position: 'absolute',
    left: '12px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#9ca3af',
    transition: 'color 0.3s ease',
    zIndex: 2
  },
  countryCode: {
    position: 'absolute',
    left: '12px',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'none',
    border: 'none',
    color: '#374151',
    fontWeight: '600',
    fontSize: '0.875rem',
    cursor: 'pointer',
    zIndex: 2
  },
  countryCodeDisplay: {
    position: 'absolute',
    left: '12px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#6b7280',
    fontWeight: '600',
    fontSize: '0.875rem',
    zIndex: 2,
    pointerEvents: 'none'
  },
  input: {
    width: '100%',
    padding: '12px 16px',
    border: '2px solid #e5e7eb',
    borderRadius: '12px',
    fontSize: '0.875rem',
    transition: 'all 0.3s ease',
    background: '#f9fafb',
    color: '#1f2937',
    boxSizing: 'border-box'
  },
  passwordToggle: {
    position: 'absolute',
    right: '12px',
    top: '50%',
    transform: 'translateY(-50%)',
    border: 'none',
    background: 'none',
    color: '#9ca3af',
    cursor: 'pointer',
    transition: 'color 0.3s ease'
  },
  passwordValidation: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 12px',
    background: '#dbeafe',
    border: '1px solid #bfdbfe',
    borderRadius: '8px'
  },
  validationIcon: {
    width: '16px',
    height: '16px',
    color: '#1d4ed8'
  },
  validationText: {
    fontSize: '0.75rem',
    color: '#1e40af'
  },
  loadingSpinner: {
    position: 'absolute',
    right: '12px',
    top: '50%',
    transform: 'translateY(-50%)',
    width: '16px',
    height: '16px',
    border: '2px solid #e5e7eb',
    borderTop: '2px solid #059669',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite'
  },
  inputRow: {
    display: 'flex',
    gap: '12px'
  },
  submitButton: {
    width: '100%',
    padding: '12px 24px',
    background: 'linear-gradient(135deg, #059669, #0ea025)',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    fontSize: '0.875rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    marginTop: '8px',
    boxShadow: '0 6px 12px rgba(5, 150, 105, 0.3)'
  },
  verificationNote: {
    background: '#fef3c7',
    border: '1px solid #fbbf24',
    borderRadius: '8px',
    padding: '12px'
  },
  verificationText: {
    fontSize: '0.75rem',
    color: '#92400e',
    margin: 0,
    lineHeight: '1.4'
  },
  loginLink: {
    textAlign: 'center',
    padding: '16px',
    background: '#f9fafb',
    borderRadius: '12px',
    border: '1px solid #e5e7eb'
  },
  loginText: {
    color: '#6b7280',
    marginBottom: '8px',
    fontSize: '0.875rem',
    margin: '0 0 8px 0'
  },
  loginButton: {
    color: '#0ea025',
    fontWeight: '600',
    fontSize: '0.875rem',
    transition: 'color 0.3s ease',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    textDecoration: 'none'
  }
};


const styleSheet = document.createElement('style');
styleSheet.type = 'text/css';
styleSheet.innerText = `
  @keyframes spin {
    0% { transform: translateY(-50%) rotate(0deg); }
    100% { transform: translateY(-50%) rotate(360deg); }
  }
  
  input:focus {
    outline: none !important;
    border-color: #059669 !important;
    background: white !important;
    box-shadow: 0 0 0 3px rgba(5, 150, 105, 0.1) !important;
  }
  
  button:hover {
    transform: translateY(-1px);
  }
  
  .back-button:hover {
    background: white !important;
    color: #059669 !important;
    transform: translateX(-2px) !important;
  }
  
  .submit-button:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 8px 16px rgba(5, 150, 105, 0.4);
  }
  
  .login-button:hover {
    color: #10b981 !important;
    text-decoration: underline !important;
  }
  
  @media (max-width: 1024px) {
    .container {
      flex-direction: column !important;
    }
    
    .left-side,
    .right-side {
      width: 100% !important;
    }
    
    .left-side {
      min-height: 40vh !important;
    }
    
    .right-side {
      min-height: 60vh !important;
    }
  }
  
  @media (max-width: 768px) {.form-container {
      padding: 24px 20px !important;
    }
    
    .input-row {
      flex-direction: column !important;
      gap: 0 !important;
    }
    
    .brand-logo {
      width: 96px !important;
      height: 96px !important;
    }
    
    .brand-title {
      font-size: 1.5rem !important;
    }
  }
`;
document.head.appendChild(styleSheet);

export default Registration;