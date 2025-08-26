import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, MessageCircle, Navigation, Eye } from 'lucide-react';
import { sendContactMessage } from '../../api/api';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [fieldErrors, setFieldErrors] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const phoneRegex = /^\+91\d{10}$/;
  const gmailRegex = /^[^\s@]+@gmail\.com$/i;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setFieldErrors(prev => ({ ...prev, [name]: '' }));
    setErrorMessage('');
    setSuccessMessage('');
  };
  const validateForm = () => {
    const errors = {
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    };
    let valid = true;

    if (!formData.name.trim()) {
      errors.name = 'Full name is required.';
      valid = false;
    }

    if (!formData.email.trim()) {
      errors.email = 'Email is required.';
      valid = false;
    } else if (!gmailRegex.test(formData.email.trim())) {
      errors.email = 'Please use a Valid Gmail address.';
      valid = false;
    }

    if (!formData.phone.trim()) {
      errors.phone = 'Phone number is required.';
      valid = false;
    } else if (!phoneRegex.test(formData.phone.trim())) {
      errors.phone = 'Phone must start with +91 and be followed by 10 digits (example: +911234567890).';
      valid = false;
    }

    if (!formData.subject.trim()) {
      errors.subject = 'Subject is required.';
      valid = false;
    }

    if (!formData.message.trim()) {
      errors.message = 'Message is required.';
      valid = false;
    }

    setFieldErrors(errors);
    return valid;
  };
  const clearFeedback = (timeout = 5000) => {
    setTimeout(() => {
      setSuccessMessage('');
      setErrorMessage('');
    }, timeout);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setErrorMessage('Please fill name, email and message.');
      setLoading(false);
      clearFeedback();
      return;
    }

    const emailTrim = formData.email.trim();
    if (!emailTrim.toLowerCase().endsWith('@gmail.com')) {
      setErrorMessage('Please provide a valid email ending with @gmail.com');
      setLoading(false);
      clearFeedback();
      return;
    }

    let phoneTrim = formData.phone.trim();
    // Automatically prepend +91 if a 10-digit number is entered
    if (/^\d{10}$/.test(phoneTrim)) {
      phoneTrim = '+91' + phoneTrim;
    }

    const phoneRegex = /^\+91\d{10}$/;
    if (!phoneRegex.test(phoneTrim)) {
      setErrorMessage('Please enter a valid 10-digit Indian phone number.');
      setLoading(false);
      clearFeedback();
      return;
    }

    const payload = {
      name: formData.name.trim(),
      email: emailTrim,
      number: phoneTrim,
      subject: formData.subject.trim(),
      message: formData.message.trim()
    };

    try {
      console.log('Sending contact payload ->', payload);

      const res = await sendContactMessage(payload);
      console.log('sendContactMessage returned ->', res);

      const data = res?.data ?? {};

      const httpOk = res?.status >= 200 && res?.status < 300;

      if (httpOk && (data.success === undefined || data.success === true)) {
        setSuccessMessage(data.message ?? 'Your message has been sent successfully!');
        setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
        clearFeedback();
      } else {
        setErrorMessage(data?.message || `Server responded with status ${res?.status || 'unknown'}`);
        clearFeedback();
      }
    } catch (err) {
      console.error('Contact submit error:', err);
      const serverMessage =
        err?.response?.data?.message ||
        err?.response?.data ||
        err?.message ||
        'Server error';
      setErrorMessage(serverMessage);
      clearFeedback();
    } finally {
      setLoading(false);
    }
  };


  const contactInfo = [
    {
      icon: <Phone size={24} />,
      title: "Call Us",
      details: ["+91 1800 570 3090", "+91 98765 43210"],
      description: "Mon-Sat 9AM-6PM"
    },
    {
      icon: <Mail size={24} />,
      title: "Email Us",
      details: ["support@feedora.com", "technical@feedora.com"],
      description: "We'll respond within 24 hours"
    },
    {
      icon: <MapPin size={24} />,
      title: "Visit Us",
      details: ["123 Agricultural Hub", "Mumbai, Maharashtra 400001"],
      description: "Main office & warehouse"
    },
    {
      icon: <Clock size={24} />,
      title: "Business Hours",
      details: ["Monday - Friday: 9AM - 6PM", "Saturday: 9AM - 4PM"],
      description: "Sunday: Closed"
    }
  ];

  return (
    <div className="contact-container">
      <style jsx>{`
        .contact-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
          position: relative;
          overflow-x: hidden;
        }

        .contact-container::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2312b431' fill-opacity='0.03'%3E%3Cpath d='m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E") repeat;
          pointer-events: none;
          z-index: 1;
        }

        .contact-header {
          background: linear-gradient(135deg, #12b431 0%, #0ea025 100%);
          color: white;
          padding: 30px 0;
          text-align: center;
          position: relative;
          z-index: 2;
          overflow: hidden;
          margin-top: 150px;
        }

        .contact-header::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
          animation: float 6s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }

        .contact-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
          position: relative;
          z-index: 3;
        }

        .contact-title {
          font-size: 3.5rem;
          font-weight: 900;
          margin-bottom: 20px;
          text-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
          background: linear-gradient(135deg, #ffffff 0%, #e0f2fe 100%);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          letter-spacing: -0.02em;
        }

        .contact-subtitle {
          font-size: 1.3rem;
          opacity: 0.95;
          max-width: 700px;
          margin: 0 auto;
          font-weight: 400;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
          line-height: 1.6;
        }

        .contact-main {
          max-width: 1400px;
          margin: 0 auto;
          padding: 80px 20px;
          position: relative;
          z-index: 2;
        }

        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 40px;
          margin-bottom: 60px;
        }

        .contact-info {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border-radius: 24px;
          padding: 50px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.3);
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .contact-info::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, #12b431, #0ea025, #12b431);
          background-size: 200% 100%;
          animation: shimmer 3s ease infinite;
        }

        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }

        .contact-info:hover {
          transform: translateY(-5px);
          box-shadow: 0 30px 60px rgba(0, 0, 0, 0.15);
        }

        .contact-info h3 {
          font-size: 1.8rem;
          font-weight: 800;
          color: #1f2937;
          margin-bottom: 30px;
          text-align: center;
          background: linear-gradient(135deg, #12b431, #0ea025);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .info-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }

        .info-card {
          padding: 25px;
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(10px);
          border-radius: 16px;
          border: 1px solid rgba(18, 180, 49, 0.1);
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .info-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 2px;
          background: linear-gradient(90deg, transparent, #12b431, transparent);
          transform: translateX(-100%);
          transition: transform 0.6s ease;
        }

        .info-card:hover::before {
          transform: translateX(100%);
        }

        .info-card:hover {
          transform: translateY(-3px);
          background: rgba(255, 255, 255, 0.95);
          box-shadow: 0 15px 30px rgba(18, 180, 49, 0.15);
          border-color: rgba(18, 180, 49, 0.2);
        }

        .info-header {
          display: flex;
          align-items: center;
          gap: 15px;
          margin-bottom: 15px;
        }

        .info-icon {
          width: 56px;
          height: 56px;
          background: linear-gradient(135deg, #12b431, #0ea025);
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          box-shadow: 0 8px 20px rgba(18, 180, 49, 0.3);
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .info-icon::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          transform: translate(-50%, -50%);
          transition: all 0.4s ease;
        }

        .info-card:hover .info-icon::before {
          width: 100px;
          height: 100px;
        }

        .info-card:hover .info-icon {
          transform: rotate(5deg) scale(1.05);
          box-shadow: 0 12px 30px rgba(18, 180, 49, 0.4);
        }

        .info-title {
          font-weight: 700;
          color: #1f2937;
          font-size: 1.1rem;
        }

        .info-details {
          margin-bottom: 10px;
        }

        .info-details div {
          color: #374151;
          font-weight: 600;
          margin-bottom: 6px;
          font-size: 0.95rem;
          transition: color 0.3s ease;
        }

        .info-card:hover .info-details div {
          color: #12b431;
        }

        .info-description {
          font-size: 0.85rem;
          color: #6b7280;
          font-style: italic;
        }

        .contact-form {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border-radius: 24px;
          padding: 50px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.3);
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .contact-form::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, #0ea025, #12b431, #0ea025);
          background-size: 200% 100%;
          animation: shimmer 3s ease infinite;
        }

        .contact-form:hover {
          transform: translateY(-5px);
          box-shadow: 0 30px 60px rgba(0, 0, 0, 0.15);
        }

        .contact-form h3 {
          font-size: 1.8rem;
          font-weight: 800;
          color: #1f2937;
          margin-bottom: 30px;
          text-align: center;
          background: linear-gradient(135deg, #12b431, #0ea025);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .form-group {
          margin-bottom: 25px;
        }

        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }

        .form-label {
          display: block;
          margin-bottom: 8px;
          font-weight: 600;
          color: #374151;
          font-size: 0.95rem;
        }

        .form-input {
          width: 100%;
          padding: 16px 20px;
          border: 2px solid #e5e7eb;
          border-radius: 12px;
          font-size: 1rem;
          transition: all 0.3s ease;
          background: rgba(249, 250, 251, 0.8);
          backdrop-filter: blur(10px);
          position: relative;
        }

        .form-input:focus {
          outline: none;
          border-color: #12b431;
          background: rgba(255, 255, 255, 0.95);
          box-shadow: 0 0 0 4px rgba(18, 180, 49, 0.1);
          transform: translateY(-2px);
        }

        .form-input:hover {
          border-color: #12b431;
          background: rgba(255, 255, 255, 0.9);
        }

        .form-textarea {
          min-height: 140px;
          resize: vertical;
          font-family: inherit;
        }

        .submit-btn {
          background: linear-gradient(135deg, #12b431, #0ea025);
          color: white;
          border: none;
          padding: 18px 40px;
          border-radius: 50px;
          font-size: 1.1rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          position: relative;
          overflow: hidden;
          box-shadow: 0 8px 25px rgba(18, 180, 49, 0.3);
        }

        .submit-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: left 0.6s ease;
        }

        .submit-btn:hover::before {
          left: 100%;
        }

        .submit-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 40px rgba(18, 180, 49, 0.4);
        }

        .submit-btn:active {
          transform: translateY(-1px);
        }

        .map-section {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(20px);
          border-radius: 24px;
          padding: 50px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.3);
          text-align: center;
          position: relative;
          overflow: hidden;
          transition: all 0.3s ease;
        }

        .map-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: linear-gradient(90deg, #0ea025, #12b431, #0ea025);
          background-size: 200% 100%;
          animation: shimmer 3s ease infinite;
        }

        .map-section:hover {
          transform: translateY(-5px);
          box-shadow: 0 30px 60px rgba(0, 0, 0, 0.15);
        }

        .map-section h3 {
          font-size: 1.8rem;
          font-weight: 800;
          color: #1f2937;
          margin-bottom: 25px;
          background: linear-gradient(135deg, #12b431, #0ea025);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .map-container {
          height: 450px;
          border-radius: 20px;
          overflow: hidden;
          margin-bottom: 20px;
          position: relative;
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
          border: 2px solid rgba(18, 180, 49, 0.1);
          transition: all 0.3s ease;
        }

        .map-container:hover {
          box-shadow: 0 20px 50px rgba(18, 180, 49, 0.2);
          border-color: rgba(18, 180, 49, 0.2);
        }

        .map-iframe {
          width: 100%;
          height: 100%;
          border: none;
          border-radius: 20px;
          transition: all 0.3s ease;
        }

        .map-overlay {
          position: absolute;
          top: 110px;
          left: 10px;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(15px);
          padding: 15px 20px;
          border-radius: 15px;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
          display: flex;
          align-items: center;
          gap: 10px;
          z-index: 10;
          border: 1px solid rgba(18, 180, 49, 0.2);
          transition: all 0.3s ease;
        }

        .map-overlay:hover {
          background: rgba(255, 255, 255, 1);
          transform: translateY(-2px);
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.25);
        }

        .map-overlay-icon {
          color: #12b431;
        }

        .map-overlay-text {
          font-size: 0.95rem;
          font-weight: 700;
          color: #1f2937;
        }

        .map-address {
          color: #4b5563;
          line-height: 1.8;
          font-size: 1.1rem;
          font-weight: 500;
          margin-bottom: 10px;
        }

        .map-address strong {
          color: #12b431;
          font-weight: 700;
        }

        .map-actions {
          display: flex;
          gap: 15px;
          justify-content: center;
          margin-top: 25px;
          flex-wrap: wrap;
        }

        .map-action-btn {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 15px 30px;
          border-radius: 50px;
          text-decoration: none;
          font-weight: 600;
          font-size: 0.95rem;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .directions-btn {
          background: linear-gradient(135deg, #12b431, #0ea025);
          color: white;
          box-shadow: 0 6px 20px rgba(18, 180, 49, 0.3);
        }

        .directions-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: left 0.6s ease;
        }

        .directions-btn:hover::before {
          left: 100%;
        }

        .directions-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 30px rgba(18, 180, 49, 0.4);
        }

        .street-view-btn {
          background: rgba(243, 244, 246, 0.9);
          color: #374151;
          border: 1px solid #e5e7eb;
          backdrop-filter: blur(10px);
        }

        .street-view-btn:hover {
          background: rgba(255, 255, 255, 0.95);
          transform: translateY(-3px);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
          color: #12b431;
          border-color: rgba(18, 180, 49, 0.2);
        }

        @media (max-width: 768px) {
          .contact-title {
            font-size: 2.5rem;
          }

          .contact-subtitle {
            font-size: 1.1rem;
          }

          .contact-header {
            padding: 60px 0;
          }

          .contact-main {
            padding: 60px 15px;
          }
          
          .contact-grid {
            grid-template-columns: 1fr;
            gap: 30px;
          }
          
          .info-grid {
            grid-template-columns: 1fr;
            gap: 15px;
          }
          
          .form-row {
            grid-template-columns: 1fr;
            gap: 15px;
          }
          
          .contact-info,
          .contact-form,
          .map-section {
            padding: 35px 25px;
          }

          .contact-info h3,
          .contact-form h3,
          .map-section h3 {
            font-size: 1.5rem;
          }

          .info-card {
            padding: 20px;
          }

          .info-icon {
            width: 48px;
            height: 48px;
          }

          .form-input {
            padding: 14px 18px;
          }

          .submit-btn {
            padding: 16px 35px;
            font-size: 1rem;
          }

          .map-container {
            height: 320px;
          }

          .map-actions {
            flex-direction: column;
            gap: 10px;
          }

          .map-action-btn {
            justify-content: center;
            padding: 12px 25px;
          }

          .map-overlay {
            top: 15px;
            left: 15px;
            padding: 12px 16px;
          }
        }
      `}</style>

      {/* Header */}
      <div className="contact-header">
        <div className="contact-content">
                  <h1 className="contact-title">
                  </h1>
          <p className="contact-subtitle">
            Get in touch with our experts for personalized feed solutions and technical support
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="contact-main">
        <div className="contact-grid">
          {/* Contact Information */}
          <div className="contact-info">
            <h3>Get in Touch</h3>
            <div className="info-grid">
              {contactInfo.map((info, index) => (
                <div key={index} className="info-card">
                  <div className="info-header">
                    <div className="info-icon">{info.icon}</div>
                    <div className="info-title">{info.title}</div>
                  </div>
                  <div className="info-details">
                    {info.details.map((detail, detailIndex) => (
                      <div key={detailIndex}>{detail}</div>
                    ))}
                  </div>
                  <div className="info-description">{info.description}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div className="contact-form">
            <h3>Send us a Message</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="form-input"
                    required
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="form-input"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className="form-input form-textarea"
                  placeholder="Tell us about your requirements..."
                  required
                ></textarea>
              </div>

              {/* feedback messages */}
              {successMessage && <div style={{ color: 'green', marginBottom: 12 }}>{successMessage}</div>}
              {errorMessage && <div style={{ color: 'red', marginBottom: 12 }}>{errorMessage}</div>}
              <button type="submit" className="submit-btn" disabled={loading} aria-busy={loading}>
                <Send size={18} />
                {loading ? 'Sending...' : 'Send Message'}
              </button>

            </form>
          </div>
        </div>

        {/* Map Section */}
        <div className="map-section">
          <h3>Find Our Location</h3>
          <div className="map-container">
            <div className="map-overlay">
              <MapPin size={20} className="map-overlay-icon" />
              <span className="map-overlay-text">Feedora Headquarters</span>
            </div>
            <iframe
              className="map-iframe"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.8618056387847!2d72.8376304!3d19.0144068!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7c9a7e46b6d5d%3A0x5a8b1e89aa5b4e2a!2sMumbai%2C+Maharashtra%2C+India!5e0!3m2!1sen!2sin!4v1640123456789!5m2!1sen!2sin"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Feedora Location Map"
            ></iframe>
          </div>
          <div className="map-address">
            <strong>Feedora Headquarters</strong><br />
            123 Agricultural Hub, Sector 15<br />
            Mumbai, Maharashtra 400001<br />
            India
          </div>
          <div className="map-actions">
            <a
              href="https://maps.google.com/maps?daddr=Mumbai,+Maharashtra,+India"
              target="_blank"
              rel="noopener noreferrer"
              className="map-action-btn directions-btn"
            >
              <Navigation size={16} />
              Get Directions
            </a>
            <a
              href="https://maps.google.com/maps?q=Mumbai,+Maharashtra,+India&layer=c&cbll=19.0144068,72.8376304"
              target="_blank"
              rel="noopener noreferrer"
              className="map-action-btn street-view-btn"
            >
              <Eye size={16} />
              Street View
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
